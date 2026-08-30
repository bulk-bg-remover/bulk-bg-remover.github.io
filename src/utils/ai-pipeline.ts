import { removeBackground, preload, type Config } from '@imgly/background-removal';

export type DeviceType = 'webgpu' | 'wasm';
export type ModelTier = 'isnet_fp16' | 'isnet_quint8' | 'isnet';

export interface ModelProgressInfo {
  status: 'init' | 'downloading' | 'loading' | 'ready' | 'error';
  progress: number; // 0 to 100
  file?: string;
  loadedBytes?: number;
  totalBytes?: number;
  message?: string;
  modelTier?: ModelTier;
}

export type ModelProgressListener = (info: ModelProgressInfo) => void;

class BackgroundRemovalPipeline {
  private static instance: BackgroundRemovalPipeline | null = null;
  private isInitializing: boolean = false;
  private activeDevice: DeviceType = 'wasm';
  private activeTier: ModelTier = 'isnet_fp16';
  private listeners: Set<ModelProgressListener> = new Set();
  private fileProgressMap: Map<string, { loaded: number; total: number }> = new Map();
  private initPromise: Promise<void> | null = null;
  
  // Track downloaded tiers persistently and in-session ready tiers
  private downloadedTiers: Set<ModelTier> = new Set();
  private readyTiers: Set<ModelTier> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      try {
        // Load saved model tier preference
        const savedTier = localStorage.getItem('bulk_bg_model_tier') as ModelTier;
        if (savedTier === 'isnet_fp16' || savedTier === 'isnet_quint8' || savedTier === 'isnet') {
          this.activeTier = savedTier;
        }

        // Load previously downloaded models list from localStorage
        const savedDownloaded = localStorage.getItem('bulk_bg_downloaded_models');
        if (savedDownloaded) {
          const list = JSON.parse(savedDownloaded) as ModelTier[];
          list.forEach((t) => {
            if (t === 'isnet_fp16' || t === 'isnet_quint8' || t === 'isnet') {
              this.downloadedTiers.add(t);
            }
          });
        }
      } catch (e) {}
    }
  }

  public static getInstance(): BackgroundRemovalPipeline {
    if (!BackgroundRemovalPipeline.instance) {
      BackgroundRemovalPipeline.instance = new BackgroundRemovalPipeline();
    }
    return BackgroundRemovalPipeline.instance;
  }

  /**
   * Checks if WebGPU is available in the current browser.
   */
  public static async isWebGPUSupported(): Promise<boolean> {
    if (typeof navigator === 'undefined' || !('gpu' in navigator)) {
      return false;
    }
    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      return !!adapter;
    } catch {
      return false;
    }
  }

  public getModelTier(): ModelTier {
    return this.activeTier;
  }

  public isTierDownloaded(tier: ModelTier = this.activeTier): boolean {
    return this.downloadedTiers.has(tier);
  }

  public isTierReady(tier: ModelTier = this.activeTier): boolean {
    return this.readyTiers.has(tier);
  }

  private markTierDownloaded(tier: ModelTier): void {
    this.downloadedTiers.add(tier);
    this.readyTiers.add(tier);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'bulk_bg_downloaded_models',
          JSON.stringify(Array.from(this.downloadedTiers))
        );
      } catch (e) {}
    }
  }

  public async setModelTier(tier: ModelTier): Promise<void> {
    if (this.activeTier === tier && this.isTierReady(tier)) return;
    
    this.activeTier = tier;
    this.initPromise = null;
    this.fileProgressMap.clear();

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bulk_bg_model_tier', tier);
      } catch (e) {}
    }

    // If the tier was already downloaded previously, mark ready immediately
    if (this.isTierDownloaded(tier)) {
      this.readyTiers.add(tier);
      this.notifyListeners({
        status: 'ready',
        progress: 100,
        message: `Model ready (${tier.toUpperCase()})`,
        modelTier: tier,
      });
    }
  }

  public subscribe(listener: ModelProgressListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(info: ModelProgressInfo): void {
    this.listeners.forEach((listener) => {
      try {
        listener({ ...info, modelTier: this.activeTier });
      } catch (e) {
        console.error('Error in model progress listener:', e);
      }
    });
  }

  public getReadyStatus(): { isReady: boolean; device: DeviceType; modelTier: ModelTier; isDownloaded: boolean } {
    return {
      isReady: this.isTierReady(this.activeTier),
      device: this.activeDevice,
      modelTier: this.activeTier,
      isDownloaded: this.isTierDownloaded(this.activeTier),
    };
  }

  /**
   * Initializes / Downloads the selected model tier.
   * If already downloaded in cache, completes instantly without showing download UI.
   */
  public async initialize(forceTier?: ModelTier): Promise<void> {
    const tier = forceTier || this.activeTier;
    
    if (this.readyTiers.has(tier)) {
      return;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._doInitialize(tier);
    return this.initPromise;
  }

  private async _doInitialize(tier: ModelTier): Promise<void> {
    this.isInitializing = true;
    const isFirstTimeDownload = !this.isTierDownloaded(tier);
    const webgpuAvailable = await BackgroundRemovalPipeline.isWebGPUSupported();
    const preferredDevice: DeviceType = webgpuAvailable ? 'webgpu' : 'wasm';
    const imglyDevice: 'gpu' | 'cpu' = webgpuAvailable ? 'gpu' : 'cpu';

    // Only notify downloading if it's the first time downloading this model!
    if (isFirstTimeDownload) {
      this.notifyListeners({
        status: 'init',
        progress: 0,
        message: `Setting up AI Model (${tier.toUpperCase()})...`,
        modelTier: tier,
      });
    }

    const progressHandler = (key: string, current: number, total: number) => {
      // Only fire download progress events if the model is genuinely downloading for the first time
      if (!this.isTierDownloaded(tier)) {
        this.fileProgressMap.set(key, { loaded: current, total: total });

        let totalLoaded = 0;
        let totalBytes = 0;
        this.fileProgressMap.forEach((val) => {
          totalLoaded += val.loaded;
          totalBytes += val.total;
        });

        const percent = totalBytes > 0 ? Math.min(Math.round((totalLoaded / totalBytes) * 100), 99) : 50;
        const loadedMB = (totalLoaded / 1024 / 1024).toFixed(1);
        const totalMB = (totalBytes / 1024 / 1024).toFixed(1);

        this.notifyListeners({
          status: 'downloading',
          progress: percent,
          file: key,
          loadedBytes: totalLoaded,
          totalBytes: totalBytes,
          message: totalBytes > 0
            ? `Downloading AI Model: ${loadedMB} MB / ${totalMB} MB (${percent}%)`
            : `Downloading AI Model (${percent}%)...`,
          modelTier: tier,
        });
      }
    };

    const config: Config = {
      model: tier,
      device: imglyDevice,
      rescale: true,
      progress: progressHandler,
      output: {
        format: 'image/png',
        quality: 1.0,
      },
    };

    try {
      await preload(config);
      this.activeDevice = preferredDevice;
      this.markTierDownloaded(tier);
      this.isInitializing = false;
      this.initPromise = null;

      this.notifyListeners({
        status: 'ready',
        progress: 100,
        message: `AI Engine Ready (${this.activeDevice.toUpperCase()} - ${tier})`,
        modelTier: tier,
      });
    } catch (err: any) {
      console.warn(`GPU preload failed for ${tier}, falling back to CPU/WASM:`, err?.message || err);
      if (imglyDevice === 'gpu') {
        try {
          const fallbackConfig: Config = {
            model: tier,
            device: 'cpu',
            rescale: true,
            progress: progressHandler,
            output: {
              format: 'image/png',
              quality: 1.0,
            },
          };
          await preload(fallbackConfig);
          this.activeDevice = 'wasm';
          this.markTierDownloaded(tier);
          this.isInitializing = false;
          this.initPromise = null;

          this.notifyListeners({
            status: 'ready',
            progress: 100,
            message: `AI Engine Ready (WASM - ${tier})`,
            modelTier: tier,
          });
          return;
        } catch (cpuErr: any) {
          this.isInitializing = false;
          this.initPromise = null;
          this.notifyListeners({
            status: 'error',
            progress: 0,
            message: cpuErr?.message || 'Failed to download AI model.',
            modelTier: tier,
          });
          throw cpuErr;
        }
      }

      this.isInitializing = false;
      this.initPromise = null;
      this.notifyListeners({
        status: 'error',
        progress: 0,
        message: err?.message || 'Failed to initialize AI model.',
        modelTier: tier,
      });
      throw err;
    }
  }

  /**
   * Removes background from image and returns a transparent PNG Blob.
   * Direct inference without triggering fake model download banners.
   */
  public async removeBg(imageSource: File | Blob | string): Promise<Blob> {
    const webgpuAvailable = await BackgroundRemovalPipeline.isWebGPUSupported();
    const imglyDevice: 'gpu' | 'cpu' = webgpuAvailable ? 'gpu' : 'cpu';

    const config: Config = {
      model: this.activeTier,
      device: imglyDevice,
      rescale: true,
      output: {
        format: 'image/png',
        quality: 1.0,
      },
    };

    try {
      const resultBlob = await removeBackground(imageSource, config);
      this.markTierDownloaded(this.activeTier);
      return resultBlob;
    } catch (err: any) {
      console.warn('Inference with GPU failed, retrying with CPU/WASM:', err?.message || err);
      const cpuConfig: Config = {
        ...config,
        device: 'cpu',
      };
      const resultBlob = await removeBackground(imageSource, cpuConfig);
      this.activeDevice = 'wasm';
      this.markTierDownloaded(this.activeTier);
      return resultBlob;
    }
  }
}

export const aiPipeline = BackgroundRemovalPipeline.getInstance();
