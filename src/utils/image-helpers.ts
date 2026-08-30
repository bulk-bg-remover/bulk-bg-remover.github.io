import JSZip from 'jszip';
import confetti from 'canvas-confetti';

export interface ProcessedItem {
  id: string;
  originalFile: File;
  originalUrl: string;
  originalSize: number;
  width: number;
  height: number;
  transparentBlob: Blob | null; // Raw transparent output from AI
  outputBlob: Blob | null; // Final composited output
  outputUrl: string | null;
  outputSize: number | null;
  status: 'queued' | 'downloading_model' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
  progress?: number;
}

export type BgColorType = 'transparent' | 'white' | 'black' | 'custom';

/**
 * Robust, client-side file saver that triggers browser file download via Blob URL.
 */
export function saveAs(blob: Blob, filename: string): void {
  if (typeof window === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Formats raw bytes into human-readable string (e.g., 1.45 MB, 320 KB).
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Loads an image from a URL or Object URL into an HTMLImageElement.
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Gets the dimensions of a File.
 */
export async function getImageDimensions(file: File): Promise<{ width: number; height: number; url: string }> {
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  return {
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height,
    url,
  };
}

/**
 * Applies the selected background color (transparent, white, black, or custom hex)
 * to a transparent cutout image Blob with maximum fidelity.
 */
export async function applyBackgroundColor(
  transparentBlob: Blob,
  bgColor: BgColorType = 'transparent',
  customHex: string = '#ffffff'
): Promise<{ blob: Blob; url: string }> {
  // If transparent is selected, return the blob directly with zero re-encoding loss
  if (bgColor === 'transparent') {
    const url = URL.createObjectURL(transparentBlob);
    return { blob: transparentBlob, url };
  }

  const tempUrl = URL.createObjectURL(transparentBlob);
  try {
    const img = await loadImage(tempUrl);
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot create 2d canvas context.');

    // Fill background color
    if (bgColor === 'white') {
      ctx.fillStyle = '#FFFFFF';
    } else if (bgColor === 'black') {
      ctx.fillStyle = '#000000';
    } else if (bgColor === 'custom') {
      ctx.fillStyle = customHex || '#FFFFFF';
    }
    ctx.fillRect(0, 0, width, height);

    // Draw transparent foreground on top
    ctx.drawImage(img, 0, 0, width, height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas export failed.'));
            return;
          }
          const url = URL.createObjectURL(blob);
          resolve({ blob, url });
        },
        'image/png',
        1.0
      );
    });
  } finally {
    URL.revokeObjectURL(tempUrl);
  }
}

/**
 * Creates a clean filename with custom suffix.
 * e.g., "my-photo.jpeg" -> "my-photo-no-bg.png"
 */
export function getExportFilename(originalName: string, suffix: string = '-no-bg'): string {
  const lastDotIndex = originalName.lastIndexOf('.');
  const baseName = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
  return `${baseName}${suffix}.png`;
}

/**
 * Downloads a single processed image directly.
 */
export function downloadSingleImage(blob: Blob, originalName: string, suffix: string = '-no-bg'): void {
  const filename = getExportFilename(originalName, suffix);
  saveAs(blob, filename);
}

/**
 * Bundles all completed processed images into a single ZIP file and triggers download.
 */
export async function downloadAllAsZip(
  items: ProcessedItem[],
  onProgress?: (percent: number) => void
): Promise<void> {
  const completedItems = items.filter((item) => item.status === 'completed' && item.outputBlob);
  if (completedItems.length === 0) {
    throw new Error('No completed images to download.');
  }

  const zip = new JSZip();
  const folder = zip.folder('removed-backgrounds') || zip;

  const usedNames = new Set<string>();

  completedItems.forEach((item, index) => {
    let filename = getExportFilename(item.originalFile.name);
    if (usedNames.has(filename)) {
      filename = getExportFilename(item.originalFile.name, `-no-bg-${index + 1}`);
    }
    usedNames.add(filename);

    if (item.outputBlob) {
      folder.file(filename, item.outputBlob);
    }
  });

  const zipContent = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent));
      }
    }
  );

  const timestamp = new Date().toISOString().slice(0, 10);
  saveAs(zipContent, `bulk-bg-remover-${timestamp}.zip`);
}

/**
 * Triggers full-screen celebratory confetti on batch completion.
 */
export function triggerBatchConfetti(): void {
  try {
    if (typeof window === 'undefined') return;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
      disableForReducedMotion: true,
    });
  } catch (e) {
    // Non-critical
  }
}
