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
  private isReady: boolean = false;
  private activeDevice: DeviceType = 'wasm';
  private activeTier: ModelTier = 'isnet_fp16';
  private listeners: Set<ModelProgressListener> = new Set();
  private fileProgressMap: Map<string, { loaded: number; total: number }> = new Map();
  private initPromise: Promise<void> | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedTier = localStorage.getItem('bulk_bg_model_tier') as ModelTier;
        if (savedTier === 'isnet_fp16' || savedTier === 'isnet_quint8' || savedTier === 'isnet') {
          this.activeTier = savedTier;
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

  public async setModelTier(tier: ModelTier): Promise<void> {
    if (this.activeTier === tier && this.isReady) return;
    this.activeTier = tier;
    this.isReady = false;
    this.initPromise = null;
    this.fileProgressMap.clear();

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bulk_bg_model_tier', tier);
      } catch (e) {}
    }

    return this.initialize();
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

  public getReadyStatus(): { isReady: boolean; device: DeviceType; modelTier: ModelTier } {
    return {
      isReady: this.isReady,
      device: this.activeDevice,
      modelTier: this.activeTier,
    };
  }

  /**
   * Preloads the selected ISNet model in browser cache.
   */
  public async initialize(): Promise<void> {
    if (this.isReady) return;
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  private async _doInitialize(): Promise<void> {
    this.isInitializing = true;
    const webgpuAvailable = await BackgroundRemovalPipeline.isWebGPUSupported();
    const preferredDevice: DeviceType = webgpuAvailable ? 'webgpu' : 'wasm';
    const imglyDevice: 'gpu' | 'cpu' = webgpuAvailable ? 'gpu' : 'cpu';

    this.notifyListeners({
      status: 'init',
      progress: 0,
      message: `Initializing ${this.activeTier.toUpperCase()} (${preferredDevice.toUpperCase()})...`,
    });

    const progressHandler = (key: string, current: number, total: number) => {
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
          ? `Downloading ${this.activeTier.toUpperCase()}: ${loadedMB} MB / ${totalMB} MB (${percent}%)`
          : `Downloading AI Model (${percent}%)...`,
      });
    };

    const config: Config = {
      model: this.activeTier,
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
      this.isReady = true;
      this.isInitializing = false;

      this.notifyListeners({
        status: 'ready',
        progress: 100,
        message: `AI Engine Ready (${this.activeDevice.toUpperCase()} - ${this.activeTier})`,
      });
    } catch (err: any) {
      console.warn(`GPU preload failed for ${this.activeTier}, falling back to CPU/WASM:`, err?.message || err);
      if (imglyDevice === 'gpu') {
        try {
          const fallbackConfig: Config = {
            model: this.activeTier,
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
          this.isReady = true;
          this.isInitializing = false;

          this.notifyListeners({
            status: 'ready',
            progress: 100,
            message: `AI Engine Ready (WASM - ${this.activeTier})`,
          });
          return;
        } catch (cpuErr: any) {
          this.isInitializing = false;
          this.initPromise = null;
          this.notifyListeners({
            status: 'error',
            progress: 0,
            message: cpuErr?.message || 'Failed to download AI model.',
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
      });
      throw err;
    }
  }

  /**
   * Removes background from image and returns a transparent PNG Blob.
   * High-quality processing at original image resolution.
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
      progress: (key: string, current: number, total: number) => {
        if (total > 0) {
          const percent = Math.min(Math.round((current / total) * 100), 99);
          this.notifyListeners({
            status: 'downloading',
            progress: percent,
            file: key,
            loadedBytes: current,
            totalBytes: total,
            message: `Processing: ${(current / 1024 / 1024).toFixed(1)}MB / ${(total / 1024 / 1024).toFixed(1)}MB (${percent}%)`,
          });
        }
      },
    };

    try {
      const resultBlob = await removeBackground(imageSource, config);
      this.isReady = true;
      return resultBlob;
    } catch (err: any) {
      console.warn('Inference with GPU failed, retrying with CPU/WASM:', err?.message || err);
      // Fallback to CPU if GPU failed
      const cpuConfig: Config = {
        ...config,
        device: 'cpu',
      };
      const resultBlob = await removeBackground(imageSource, cpuConfig);
      this.isReady = true;
      this.activeDevice = 'wasm';
      return resultBlob;
    }
  }
}

export const aiPipeline = BackgroundRemovalPipeline.getInstance();
