import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  Loader2,
  Download,
  Trash2,
  Sparkles,
  Zap,
  Cpu,
  Archive,
  Palette,
  Eye,
  AlertCircle,
  WifiOff,
} from 'lucide-react';
import { ui, type SupportedLanguage, defaultLang } from '../i18n/ui';
import {
  applyBackgroundColor,
  downloadAllAsZip,
  downloadSingleImage,
  formatBytes,
  getImageDimensions,
  triggerBatchConfetti,
  type BgColorType,
  type ProcessedItem,
} from '../utils/image-helpers';
import { aiPipeline, type ModelProgressInfo, type DeviceType, type ModelTier } from '../utils/ai-pipeline';

interface WorkspaceProps {
  lang: SupportedLanguage;
}

export default function BulkBgWorkspace({ lang = defaultLang }: WorkspaceProps) {
  const t = (ui[lang] || ui[defaultLang]).workspace;

  // Image items queue
  const [items, setItems] = useState<ProcessedItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(0);

  // Background color state
  const [bgColor, setBgColor] = useState<BgColorType>('transparent');
  const [customHex, setCustomHex] = useState<string>('#8B639B');

  // AI Pipeline & Model Loading State
  const [selectedTier, setSelectedTier] = useState<ModelTier>('isnet_fp16');
  const [modelProgress, setModelProgress] = useState<ModelProgressInfo | null>(null);
  const [activeDevice, setActiveDevice] = useState<DeviceType>('wasm');
  const [isModelReady, setIsModelReady] = useState(false);
  const [modelEverLoaded, setModelEverLoaded] = useState(false);
  const [previewModes, setPreviewModes] = useState<Record<string, 'after' | 'before'>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isProcessingRef = useRef(false);

  const handleTierChange = async (tier: ModelTier) => {
    if (tier === selectedTier) return;
    setSelectedTier(tier);
    const isDownloaded = aiPipeline.isTierDownloaded(tier);
    setIsModelReady(isDownloaded || aiPipeline.isTierReady(tier));
    try {
      await aiPipeline.setModelTier(tier);
    } catch (e) {
      console.error('Error switching model tier:', e);
    }
  };

  // Subscribe to model download progress
  useEffect(() => {
    const status = aiPipeline.getReadyStatus();
    setSelectedTier(status.modelTier);
    setIsModelReady(status.isReady || status.isDownloaded);
    setActiveDevice(status.device);

    const unsub = aiPipeline.subscribe((info) => {
      setModelProgress(info);
      if (info.status === 'ready') {
        setIsModelReady(true);
        setModelEverLoaded(true);
        const st = aiPipeline.getReadyStatus();
        setActiveDevice(st.device);
      } else if (info.status === 'downloading' || info.status === 'init') {
        if (!aiPipeline.isTierDownloaded(aiPipeline.getModelTier())) {
          setIsModelReady(false);
        }
      }
    });

    return () => unsub();
  }, []);

  // Update composite outputs whenever background color changes
  useEffect(() => {
    let isCancelled = false;

    const updateCompletedComposites = async () => {
      const updated = await Promise.all(
        items.map(async (item) => {
          if (item.status === 'completed' && item.transparentBlob) {
            try {
              const { blob: outputBlob, url: outputUrl } = await applyBackgroundColor(
                item.transparentBlob,
                bgColor,
                customHex
              );
              if (item.outputUrl && item.outputUrl !== item.originalUrl) {
                URL.revokeObjectURL(item.outputUrl);
              }
              return {
                ...item,
                outputBlob,
                outputUrl,
                outputSize: outputBlob.size,
              };
            } catch (err) {
              console.error('Failed updating composite color:', err);
              return item;
            }
          }
          return item;
        })
      );

      if (!isCancelled) {
        setItems(updated);
      }
    };

    if (items.some((it) => it.status === 'completed' && it.transparentBlob)) {
      updateCompletedComposites();
    }

    return () => {
      isCancelled = true;
    };
  }, [bgColor, customHex]);

  // Handle file addition
  const handleAddFiles = async (files: FileList | File[]) => {
    const validFiles: File[] = [];
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    Array.from(files).forEach((file) => {
      if (validExtensions.includes(file.type) || /\.(png|jpe?g|webp)$/i.test(file.name)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length === 0) return;

    const newItems: ProcessedItem[] = [];
    for (const file of validFiles) {
      try {
        const { width, height, url } = await getImageDimensions(file);
        const id = `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        newItems.push({
          id,
          originalFile: file,
          originalUrl: url,
          originalSize: file.size,
          width,
          height,
          transparentBlob: null,
          outputBlob: null,
          outputUrl: null,
          outputSize: null,
          status: 'queued',
        });
      } catch (err) {
        console.error('Error reading image dimensions:', err);
      }
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  // Process a single image
  const processSingleItem = async (
    item: ProcessedItem,
    currentBgColor: BgColorType,
    currentHex: string
  ): Promise<ProcessedItem> => {
    try {
      // 1. Remove background using @imgly/background-removal high-quality engine
      const transparentBlob = await aiPipeline.removeBg(item.originalFile);

      // 2. Apply chosen background color (transparent / white / black / hex)
      const { blob: outputBlob, url: outputUrl } = await applyBackgroundColor(
        transparentBlob,
        currentBgColor,
        currentHex
      );

      return {
        ...item,
        transparentBlob,
        outputBlob,
        outputUrl,
        outputSize: outputBlob.size,
        status: 'completed',
        progress: 100,
      };
    } catch (err: any) {
      console.error('Item processing error:', err);
      return {
        ...item,
        status: 'error',
        errorMessage: err?.message || 'Processing failed',
      };
    }
  };

  // Process entire batch queue
  const handleProcessBatch = async () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setIsProcessingBatch(true);

    const queuedItems = items.filter((it) => it.status === 'queued' || it.status === 'error');
    if (queuedItems.length === 0) {
      setIsProcessingBatch(false);
      isProcessingRef.current = false;
      return;
    }

    // Initialize selected model tier (shows first-time download banner ONLY if not cached)
    if (!aiPipeline.isTierReady(selectedTier)) {
      try {
        await aiPipeline.initialize(selectedTier);
      } catch (err) {
        console.error('Model initialization failed:', err);
      }
    }

    const status = aiPipeline.getReadyStatus();
    setActiveDevice(status.device);

    for (const currentItem of queuedItems) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === currentItem.id ? { ...it, status: 'processing', progress: 50 } : it
        )
      );

      const processed = await processSingleItem(currentItem, bgColor, customHex);

      setItems((prev) =>
        prev.map((it) => (it.id === currentItem.id ? processed : it))
      );
    }

    setIsProcessingBatch(false);
    isProcessingRef.current = false;
    triggerBatchConfetti();
  };

  // Process single item explicitly (e.g., retry)
  const handleProcessSingle = async (id: string) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;

    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: 'processing' } : it))
    );

    const processed = await processSingleItem(target, bgColor, customHex);
    setItems((prev) => prev.map((it) => (it.id === id ? processed : it)));
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const item = prev.find((it) => it.id === id);
      if (item?.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item?.outputUrl) URL.revokeObjectURL(item.outputUrl);
      return prev.filter((it) => it.id !== id);
    });
  };

  // Clear all images
  const handleClearAll = () => {
    if (items.length === 0) return;
    if (window.confirm(t.confirmClearMsg)) {
      items.forEach((it) => {
        if (it.originalUrl) URL.revokeObjectURL(it.originalUrl);
        if (it.outputUrl) URL.revokeObjectURL(it.outputUrl);
      });
      setItems([]);
    }
  };

  // Download All as ZIP
  const handleDownloadZip = async () => {
    const completedItems = items.filter((it) => it.status === 'completed');
    if (completedItems.length === 0) return;

    setIsZipping(true);
    setZipProgress(0);

    try {
      await downloadAllAsZip(items, (progress) => {
        setZipProgress(progress);
      });
    } catch (err) {
      console.error('ZIP generation failed:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Toggle before / after preview for a card
  const togglePreview = (id: string) => {
    setPreviewModes((prev) => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before',
    }));
  };

  const completedCount = items.filter((it) => it.status === 'completed').length;
  const totalCount = items.length;

  const isSelectedTierDownloaded = aiPipeline.isTierDownloaded(selectedTier);
  const showModelBanner = Boolean(
    !isSelectedTierDownloaded &&
    !isModelReady &&
    modelProgress &&
    modelProgress.status !== 'ready' &&
    (modelProgress.status === 'downloading' ||
      modelProgress.status === 'init' ||
      modelProgress.status === 'loading' ||
      modelProgress.status === 'error')
  );
  const isDownloading = modelProgress?.status === 'downloading';
  const isInitializing = modelProgress?.status === 'init' || modelProgress?.status === 'loading';
  const hasError = modelProgress?.status === 'error';

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Hidden File Input for Native Dialog Selection */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleAddFiles(e.target.files);
          e.target.value = '';
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          AI MODEL QUALITY & PERFORMANCE SELECTOR (User-Friendly UI/UX)
          ═══════════════════════════════════════════════════════════════════ */}
      <div className="rounded-3xl border border-slate-200 dark:border-[#403D88]/40 bg-white/80 dark:bg-[#151329]/80 p-4 sm:p-5 shadow-xs backdrop-blur-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-[#403D88]/30 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#403D88] to-[#8B639B] text-white flex items-center justify-center shadow-xs shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{(t as any).modelTierSectionTitle || 'Select AI Quality & Performance'}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#AF719D]/15 dark:bg-[#403D88]/50 text-[#8B639B] dark:text-[#F8B2B2] border border-[#AF719D]/30">
                  {selectedTier === 'isnet_fp16'
                    ? (t as any).modelTierFp16Title || '🌟 High Quality'
                    : selectedTier === 'isnet_quint8'
                    ? (t as any).modelTierInt8Title || '⚡ Fast & Light'
                    : (t as any).modelTierFp32Title || '🔥 Maximum Detail'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {(t as any).modelTierSectionHelp || 'Choose the AI model best suited for your device speed and image complexity:'}
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-[#8B639B]/20 dark:border-[#8B639B]/40 bg-[#AF719D]/10 dark:bg-[#403D88]/40 text-[#403D88] dark:text-[#F8B2B2]">
            {activeDevice === 'webgpu' ? (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.webgpuActive}</span>
              </>
            ) : (
              <>
                <Cpu className="w-3.5 h-3.5 text-[#8B639B]" />
                <span>{t.wasmActive}</span>
              </>
            )}
          </div>
        </div>

        {/* 3 Interactive Model Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Option 1: FP16 (Recommended) */}
          <button
            type="button"
            onClick={() => handleTierChange('isnet_fp16')}
            disabled={isProcessingBatch}
            className={`relative text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer ${
              selectedTier === 'isnet_fp16'
                ? 'border-[#8B639B] bg-[#AF719D]/10 dark:bg-[#403D88]/40 shadow-sm ring-2 ring-[#8B639B]/20'
                : 'border-slate-200 dark:border-[#403D88]/40 bg-slate-50/60 dark:bg-[#1a183b]/40 hover:border-[#8B639B]/50 hover:bg-[#AF719D]/5'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {(t as any).modelTierFp16Title || '🌟 High Quality'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {(t as any).modelTierFp16Badge || 'Recommended'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {(t as any).modelTierFp16Desc || 'Crisp edges & hair separation. Perfect for 90% of laptops & smartphones.'}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#403D88]/30 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              <span>{(t as any).modelTierSizeLabel || 'Size:'} {(t as any).modelTierFp16Size || '~40 MB'}</span>
              {selectedTier === 'isnet_fp16' && (
                <span className="text-[#8B639B] dark:text-[#F8B2B2] font-bold">{(t as any).modelTierSelectedBadge || '● Selected'}</span>
              )}
            </div>
          </button>

          {/* Option 2: INT8 (Fast & Light) */}
          <button
            type="button"
            onClick={() => handleTierChange('isnet_quint8')}
            disabled={isProcessingBatch}
            className={`relative text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer ${
              selectedTier === 'isnet_quint8'
                ? 'border-[#8B639B] bg-[#AF719D]/10 dark:bg-[#403D88]/40 shadow-sm ring-2 ring-[#8B639B]/20'
                : 'border-slate-200 dark:border-[#403D88]/40 bg-slate-50/60 dark:bg-[#1a183b]/40 hover:border-[#8B639B]/50 hover:bg-[#AF719D]/5'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {(t as any).modelTierInt8Title || '⚡ Fast & Light'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {(t as any).modelTierInt8Badge || '2× Faster'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {(t as any).modelTierInt8Desc || 'Lowest memory usage. Ideal for budget phones, slow internet & quick drafts.'}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#403D88]/30 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              <span>{(t as any).modelTierSizeLabel || 'Size:'} {(t as any).modelTierInt8Size || '~20 MB'}</span>
              {selectedTier === 'isnet_quint8' && (
                <span className="text-[#8B639B] dark:text-[#F8B2B2] font-bold">{(t as any).modelTierSelectedBadge || '● Selected'}</span>
              )}
            </div>
          </button>

          {/* Option 3: FP32 (Maximum Detail) */}
          <button
            type="button"
            onClick={() => handleTierChange('isnet')}
            disabled={isProcessingBatch}
            className={`relative text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between space-y-2 cursor-pointer ${
              selectedTier === 'isnet'
                ? 'border-[#8B639B] bg-[#AF719D]/10 dark:bg-[#403D88]/40 shadow-sm ring-2 ring-[#8B639B]/20'
                : 'border-slate-200 dark:border-[#403D88]/40 bg-slate-50/60 dark:bg-[#1a183b]/40 hover:border-[#8B639B]/50 hover:bg-[#AF719D]/5'
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {(t as any).modelTierFp32Title || '🔥 Maximum Detail'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 text-[#8B639B] dark:text-[#F8B2B2] border border-violet-200 dark:border-violet-800">
                {(t as any).modelTierFp32Badge || 'HD Precision'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {(t as any).modelTierFp32Desc || 'Full 32-bit floating point precision for complex fur & glass on high-end PCs.'}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#403D88]/30 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              <span>{(t as any).modelTierSizeLabel || 'Size:'} {(t as any).modelTierFp32Size || '~80 MB'}</span>
              {selectedTier === 'isnet' && (
                <span className="text-[#8B639B] dark:text-[#F8B2B2] font-bold">{(t as any).modelTierSelectedBadge || '● Selected'}</span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Floating Drag Overlay when images are already in queue */}
      {isDragging && items.length > 0 && (
        <div className="fixed inset-0 z-50 bg-[#403D88]/30 backdrop-blur-xs flex items-center justify-center p-6 pointer-events-none animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1a183b] border-2 border-dashed border-[#8B639B] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center gap-4 text-center max-w-md scale-100">
            <div className="w-16 h-16 rounded-2xl bg-[#AF719D]/20 text-[#8B639B] dark:text-[#F8B2B2] flex items-center justify-center shadow-inner">
              <UploadCloud className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t.dropzoneActive}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t.dropzoneNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Upload Box (Displayed ONLY when queue is empty) */}
      {items.length === 0 && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer shadow-sm ${
            isDragging
              ? 'border-[#8B639B] bg-[#AF719D]/15 dark:bg-[#403D88]/40 scale-[1.01]'
              : 'border-slate-300 dark:border-[#403D88]/60 bg-white/80 dark:bg-[#151329]/80 hover:border-[#8B639B] dark:hover:border-[#AF719D] hover:bg-[#AF719D]/5 dark:hover:bg-[#403D88]/20'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-4 pointer-events-none">
            <div className="w-16 h-16 rounded-2xl bg-[#AF719D]/15 dark:bg-[#403D88]/50 text-[#8B639B] dark:text-[#F8B2B2] flex items-center justify-center shadow-inner">
              <UploadCloud className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                {isDragging ? t.dropzoneActive : t.dropzoneTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                {t.dropzoneSubtitle}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#AF719D]/10 dark:bg-[#403D88]/40 text-xs font-semibold text-[#543862] dark:text-[#F8B2B2] border border-[#AF719D]/20 dark:border-[#8B639B]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#8B639B] dark:text-[#F8B2B2]" />
              <span>{t.dropzoneNote}</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PROMINENT FIRST-TIME MODEL DOWNLOAD BANNER
          ═══════════════════════════════════════════════════════════════════ */}
      {showModelBanner && (
        <div
          className={`relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 space-y-4 transition-all duration-500 ${
            hasError
              ? 'border-rose-300 dark:border-rose-700 bg-gradient-to-br from-rose-50 to-rose-100/80 dark:from-rose-950/60 dark:to-rose-900/30'
              : 'border-[#8B639B]/40 dark:border-[#8B639B]/60 bg-gradient-to-br from-[#AF719D]/15 via-[#8B639B]/10 to-[#403D88]/20 dark:from-[#403D88]/40 dark:via-[#1a183b] dark:to-[#0f0e1d]'
          }`}
        >
          {!hasError && (
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#8B639B]/20 dark:bg-[#AF719D]/20 blur-3xl animate-pulse" />
          )}

          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                hasError
                  ? 'bg-rose-200 dark:bg-rose-800'
                  : 'bg-[#8B639B]/20 dark:bg-[#403D88]/60 text-[#8B639B] dark:text-[#F8B2B2]'
              }`}>
                {hasError ? (
                  <WifiOff className="w-6 h-6 text-rose-600 dark:text-rose-300" />
                ) : isDownloading ? (
                  <Loader2 className="w-6 h-6 text-[#8B639B] dark:text-[#F8B2B2] animate-spin" />
                ) : (
                  <Sparkles className="w-6 h-6 text-[#8B639B] dark:text-[#F8B2B2] animate-pulse" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <h3 className={`text-lg sm:text-xl font-bold ${
                  hasError
                    ? 'text-rose-800 dark:text-rose-200'
                    : 'text-[#403D88] dark:text-[#F8B2B2]'
                }`}>
                  {hasError
                    ? (t as any).modelBannerError || 'Model failed to load. Please refresh and try again.'
                    : (t as any).modelBannerTitle || '⚡ First-Time Setup: Downloading AI Model'}
                </h3>
                {!hasError && (
                  <p className="text-sm text-[#543862] dark:text-slate-300 leading-relaxed max-w-2xl">
                    {(t as any).modelBannerSubtitle || 'The neural network model is downloading to your browser cache. This only happens once — subsequent visits load instantly.'}
                  </p>
                )}
              </div>
            </div>

            {isDownloading && modelProgress && (
              <div className="space-y-2">
                <div className="w-full h-3 rounded-full bg-[#AF719D]/20 dark:bg-[#403D88]/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#403D88] via-[#8B639B] to-[#F8B2B2] transition-all duration-500 ease-out relative"
                    style={{ width: `${Math.max(modelProgress.progress, 2)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#543862] dark:text-[#F8B2B2]">
                    {modelProgress.message || `Downloading AI Model... ${modelProgress.progress}%`}
                  </span>
                  <span className="text-[#8B639B] dark:text-slate-400">
                    {(t as any).modelBannerEstimate || 'Estimated: 10–30 seconds on broadband'}
                  </span>
                </div>
              </div>
            )}

            {isInitializing && (
              <div className="flex items-center gap-3 text-sm text-[#543862] dark:text-[#F8B2B2]">
                <Loader2 className="w-4 h-4 animate-spin text-[#8B639B] dark:text-[#F8B2B2]" />
                <span className="font-medium">
                  {(t as any).modelInitializing || 'Preparing AI engine...'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}



      {/* Workspace Controls & Action Toolbar */}
      {totalCount > 0 && (
        <div className="p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-[#403D88]/40 bg-white dark:bg-[#151329] shadow-sm space-y-5 sm:space-y-6">
          {/* Status Counter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-[#403D88]/30 pb-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {t.totalCount}: <span className="text-[#8B639B] dark:text-[#F8B2B2] font-bold">{totalCount}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 hidden xs:inline">•</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {t.completedCount}:{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{completedCount}</span>
              </span>
            </div>

            <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#8B639B]/20 dark:border-[#8B639B]/40 bg-[#AF719D]/10 dark:bg-[#403D88]/40 text-[#403D88] dark:text-[#F8B2B2]">
              {activeDevice === 'webgpu' ? (
                <>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.webgpuActive}</span>
                </>
              ) : (
                <>
                  <Cpu className="w-3.5 h-3.5 text-[#8B639B]" />
                  <span>{t.wasmActive}</span>
                </>
              )}
            </div>
          </div>

          {/* Background Color Palette Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shrink-0">
              <Palette className="w-4 h-4 text-[#8B639B] dark:text-[#F8B2B2]" />
              {t.bgColorLabel}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setBgColor('transparent')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  bgColor === 'transparent'
                    ? 'border-[#8B639B] bg-[#8B639B] text-white shadow-xs'
                    : 'border-slate-200 dark:border-[#403D88]/60 bg-slate-50 dark:bg-[#1a183b] text-slate-700 dark:text-slate-300 hover:bg-[#AF719D]/10'
                }`}
              >
                {t.bgTransparent}
              </button>

              <button
                type="button"
                onClick={() => setBgColor('white')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  bgColor === 'white'
                    ? 'border-[#8B639B] bg-[#8B639B] text-white shadow-xs'
                    : 'border-slate-200 dark:border-[#403D88]/60 bg-slate-50 dark:bg-[#1a183b] text-slate-700 dark:text-slate-300 hover:bg-[#AF719D]/10'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-white border border-slate-300" />
                {t.bgWhite}
              </button>

              <button
                type="button"
                onClick={() => setBgColor('black')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  bgColor === 'black'
                    ? 'border-[#8B639B] bg-[#8B639B] text-white shadow-xs'
                    : 'border-slate-200 dark:border-[#403D88]/60 bg-slate-50 dark:bg-[#1a183b] text-slate-700 dark:text-slate-300 hover:bg-[#AF719D]/10'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-black border border-slate-600" />
                {t.bgBlack}
              </button>

              <div className="flex items-center gap-1.5 pl-0.5">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    setBgColor('custom');
                  }}
                  className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 bg-transparent"
                  title="Choose custom background color"
                />
                <button
                  type="button"
                  onClick={() => setBgColor('custom')}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    bgColor === 'custom'
                      ? 'border-[#8B639B] bg-[#8B639B] text-white shadow-xs'
                      : 'border-slate-200 dark:border-[#403D88]/60 bg-slate-50 dark:bg-[#1a183b] text-slate-700 dark:text-slate-300 hover:bg-[#AF719D]/10'
                  }`}
                >
                  {customHex.toUpperCase()}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            {/* Secondary Controls (Add More & Clear All) */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 dark:border-[#403D88]/60 text-slate-700 dark:text-slate-300 hover:bg-[#AF719D]/10 dark:hover:bg-[#403D88]/30 transition-colors text-center"
              >
                {t.addMoreBtn}
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-center"
              >
                {t.clearAllBtn}
              </button>
            </div>

            {/* Primary Action Buttons (Process All & Download ZIP) */}
            <div className="grid grid-cols-1 sm:flex items-center gap-2 sm:gap-3">
              {/* Process All CTA with Theme Gradient */}
              <button
                type="button"
                onClick={handleProcessBatch}
                disabled={isProcessingBatch || items.every((it) => it.status === 'completed')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#403D88] via-[#8B639B] to-[#AF719D] hover:opacity-95 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md shadow-[#403D88]/25 active:scale-95 min-h-[42px]"
              >
                {isProcessingBatch ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.processingBtn}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F8B2B2]" />
                    <span>{t.processAllBtn}</span>
                  </>
                )}
              </button>

              {/* Download ZIP CTA */}
              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={isZipping || completedCount === 0}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/20 active:scale-95 min-h-[42px]"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.downloadingZipBtn} ({zipProgress}%)</span>
                  </>
                ) : (
                  <>
                    <Archive className="w-4 h-4" />
                    <span>{t.downloadZipBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Grid Display */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const mode = previewModes[item.id] || 'after';
            const displayUrl =
              mode === 'after' && item.outputUrl ? item.outputUrl : item.originalUrl;
            const isCompleted = item.status === 'completed';

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl border border-slate-200 dark:border-[#403D88]/40 bg-white dark:bg-[#151329] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                {/* Image Preview Window */}
                <div
                  className={`relative w-full h-56 flex items-center justify-center overflow-hidden ${
                    mode === 'after' && bgColor === 'transparent'
                      ? 'bg-checkerboard'
                      : 'bg-slate-100 dark:bg-[#0f0e1d]'
                  }`}
                  style={
                    mode === 'after' && bgColor !== 'transparent'
                      ? { backgroundColor: bgColor === 'white' ? '#ffffff' : bgColor === 'black' ? '#000000' : customHex }
                      : undefined
                  }
                >
                  <img
                    src={displayUrl}
                    alt={item.originalFile.name}
                    className="max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Status Overlay while processing */}
                  {item.status === 'processing' && (
                    <div className="absolute inset-0 bg-[#0f0e1d]/75 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2">
                      <Loader2 className="w-8 h-8 animate-spin text-[#F8B2B2]" />
                      <span className="text-xs font-semibold tracking-wide text-[#F8B2B2]">
                        {t.statusProcessing}
                      </span>
                    </div>
                  )}

                  {/* Status Overlay for Error */}
                  {item.status === 'error' && (
                    <div className="absolute inset-0 bg-rose-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-rose-100 p-4 text-center space-y-2">
                      <AlertCircle className="w-7 h-7 text-rose-400" />
                      <span className="text-xs font-medium">{item.errorMessage || t.statusError}</span>
                      <button
                        type="button"
                        onClick={() => handleProcessSingle(item.id)}
                        className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 transition-colors"
                      >
                        {t.cardRetry}
                      </button>
                    </div>
                  )}

                  {/* Before / After Toggle Button */}
                  {isCompleted && (
                    <button
                      type="button"
                      onClick={() => togglePreview(item.id)}
                      className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-[#403D88]/80 hover:bg-[#403D88] text-white text-xs font-medium backdrop-blur-md transition-all flex items-center gap-1.5 shadow-sm"
                      title="Toggle Original vs Processed"
                    >
                      <Eye className="w-3 h-3 text-[#F8B2B2]" />
                      <span>{mode === 'after' ? t.cardAfter : t.cardBefore}</span>
                    </button>
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label={t.cardRemove}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#0f0e1d]/70 hover:bg-rose-600 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Info & Meta Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <p
                      className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate"
                      title={item.originalFile.name}
                    >
                      {item.originalFile.name}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>
                        {item.width} × {item.height} px
                      </span>
                      <span>
                        {item.outputSize
                          ? `${formatBytes(item.outputSize)}`
                          : formatBytes(item.originalSize)}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-slate-100 dark:border-[#403D88]/30 flex items-center justify-between gap-2">
                    {isCompleted && item.outputBlob ? (
                      <button
                        type="button"
                        onClick={() =>
                          downloadSingleImage(item.outputBlob!, item.originalFile.name)
                        }
                        className="w-full py-1.5 px-3 rounded-xl bg-[#AF719D]/15 dark:bg-[#403D88]/50 text-[#403D88] dark:text-[#F8B2B2] hover:bg-[#8B639B] hover:text-white dark:hover:bg-[#8B639B] dark:hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.cardDownload}</span>
                      </button>
                    ) : item.status === 'queued' ? (
                      <button
                        type="button"
                        onClick={() => handleProcessSingle(item.id)}
                        disabled={isProcessingBatch}
                        className="w-full py-1.5 px-3 rounded-xl border border-slate-200 dark:border-[#403D88]/60 text-slate-700 dark:text-slate-300 hover:bg-[#AF719D]/10 dark:hover:bg-[#403D88]/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#8B639B] dark:text-[#F8B2B2]" />
                        <span>{t.statusQueued}</span>
                      </button>
                    ) : (
                      <div className="w-full py-1.5 text-center text-xs text-slate-400 font-medium">
                        {t.statusProcessing}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
