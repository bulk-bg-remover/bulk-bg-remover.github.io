# Bulk Background Remover (`bulk-bg-remover.github.io`)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Framework-Astro%205-FF5D01.svg)](https://astro.build/)
[![React](https://img.shields.io/badge/UI-React%2019-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![WebGPU](https://img.shields.io/badge/Acceleration-WebGPU%20%2F%20WASM-403D88.svg)](https://w3.org/TR/webgpu/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-emerald.svg)](#privacy-first-architecture)

> **Free Bulk Background Remover | Batch Remove Image BG Online 100% Private**  
> Live Website: [https://bulk-bg-remover.github.io/](https://bulk-bg-remover.github.io/)

An ultra-minimal, high-performance, 100% client-side bulk background remover built with **Astro**, **React**, **Tailwind CSS**, and **@imgly/background-removal** (High-precision deep learning ISNet model via WebGPU with WebAssembly fallback).

Processes 50+ images simultaneously with **zero server uploads**, privacy-first offline execution, multi-language internationalized subpaths (`en`, `es`, `pt`, `de`, `fr`, `ja`), and instant ZIP downloads.

---

## ⚡ Key Features

- **100% Client-Side Privacy**: All neural network inference and canvas image manipulation occur strictly inside your browser memory. Your photos never leave your device.
- **Hardware-Accelerated WebGPU**: Leverages computer and mobile GPUs directly for sub-second image segmentation, with automatic CPU / WebAssembly SIMD fallback.
- **High-Volume Batch Processing**: Drop 10, 50, or 100+ images in a single batch. Multi-threaded sequential queue keeps the browser responsive at all times.
- **Multi-Tier AI Engine Selector**: Select between **🌟 Ultra Quality (`isnet_fp16`)** (~40 MB) for maximum fidelity, **⚡ Fast & Low-Memory (`isnet_quint8`)** (~20 MB, 2x faster) for mobile/budget devices, or **🎯 Standard Full (`isnet`)** (~80 MB).
- **Customizable Output Backplates**: Export clean transparent alpha PNGs, studio white (`#FFFFFF`), solid black (`#000000`), or custom hex colors.
- **Instant ZIP Export**: Bundle all processed images into a neatly named ZIP archive in one click using JSZip.
- **Dynamic Upload Experience**: The large dashed dropzone automatically hides when images are queued, giving full focus to workspace controls and cards.
- **Full 6-Language Subpath Routing**: Complete native translations for `en` (`/`), `es` (`/es/`), `pt` (`/pt/`), `de` (`/de/`), `fr` (`/fr/`), and `ja` (`/ja/`) with 7-way bidirectional `hreflang` cross-linking.
- **Enterprise-Grade SEO**: Schema.org JSON-LD structured data (`WebApplication`, `HowTo`, `FAQPage`, `WebSite`, `Organization`, `BreadcrumbList`), Open Graph, and Twitter Cards with official Cloudinary banner assets.
- **Responsive Across All Devices**: Optimized layouts for mobile phones (320px+), tablets, and desktop displays.
- **Offline Capable**: Model assets cached in browser IndexedDB/Cache API after the initial run for offline operation.

---

## 🎨 Custom Design Palette

Built with a unified 4-color brand design system:

| Color | Hex | Role |
| :--- | :--- | :--- |
| **Soft Rose** | `#F8B2B2` | Light accent highlights, badges, glow effects |
| **Muted Orchid** | `#AF719D` | Secondary brand accent, button tints, progress bar highlights |
| **Royal Violet** | `#8B639B` | Primary brand accent, active controls, focus rings & section icons |
| **Midnight Indigo** | `#403D88` | Dark primary base, hero headline gradient, primary CTA buttons |

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation mode)
- **UI Islands**: [React 19](https://react.dev/) (`client:load`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Class-based dark mode)
- **AI Engine**: [`@imgly/background-removal`](https://github.com/imgly/background-removal-js) (High-precision float16 ISNet architecture)
- **Runtime**: ONNX Runtime Web (`onnxruntime-web`) via WebGPU & WebAssembly
- **ZIP Packaging**: [JSZip](https://stuk.github.io/jszip/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: `canvas-confetti`
- **Analytics**: Google Analytics 4 (`gtag.js` ID: `G-MQPXCXKXCG`)

---

## 📁 Project Structure

```
bulk-bg-remover.github.io/
├── public/
│   ├── favicon.svg            # Vector favicon
│   ├── robots.txt             # Search crawler directives
│   └── sitemap.xml            # Multi-language XML sitemap
├── src/
│   ├── components/
│   │   ├── BulkBgWorkspace.tsx# Core batch processing React island
│   │   ├── ComparisonTable.astro
│   │   ├── FaqSection.astro
│   │   ├── Features.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro       # Responsive header with Support button
│   │   ├── Hero.astro         # Hero banner & animated gradient headline
│   │   ├── HowItWorks.astro
│   │   ├── LanguagePicker.astro
│   │   ├── SeoContent.astro
│   │   └── ThemeToggle.jsx    # Dark/Light mode toggle
│   ├── i18n/
│   │   ├── ui.ts              # 6-locale translation dictionaries (en, es, pt, de, fr, ja)
│   │   └── utils.ts           # Subpath path localization utilities
│   ├── layouts/
│   │   └── Layout.astro       # Root layout with 100% SEO, gtag & Schema.org JSON-LD
│   ├── pages/
│   │   ├── index.astro        # Default English route (/)
│   │   └── [lang]/
│   │       └── index.astro    # Localized routes (/es/, /pt/, /de/, /fr/, /ja/)
│   ├── styles/
│   │   └── global.css         # Tailwind base styles, checkerboards & theme variables
│   └── utils/
│       ├── ai-pipeline.ts     # @imgly/background-removal singleton & progress manager
│       └── image-helpers.ts   # Canvas background composite & ZIP bundler
├── astro.config.mjs           # Astro SSG & Vite optimization configuration
├── tailwind.config.mjs        # Custom 4-color palette theme extensions
├── tsconfig.json              # TypeScript strict configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/bulk-bg-remover/bulk-bg-remover.github.io.git
cd bulk-bg-remover.github.io
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### 4. Build for Production
```bash
npm run build
```
The static production output will be generated inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Supported Locales

| Locale Code | Language | Subpath Route |
| :--- | :--- | :--- |
| `en` (Default) | English | `https://bulk-bg-remover.github.io/` |
| `es` | Español (Spanish) | `https://bulk-bg-remover.github.io/es/` |
| `pt` | Português (Portuguese) | `https://bulk-bg-remover.github.io/pt/` |
| `de` | Deutsch (German) | `https://bulk-bg-remover.github.io/de/` |
| `fr` | Français (French) | `https://bulk-bg-remover.github.io/fr/` |
| `ja` | 日本語 (Japanese) | `https://bulk-bg-remover.github.io/ja/` |

---

## 🔒 Privacy-First Architecture

Unlike traditional cloud background removers that transmit user photos to remote GPU clusters, **Bulk BG Remover**:
1. Downloads the AI model weights directly to the user's browser cache on first use.
2. Performs 100% of the image segmentation on the client device using WebGPU/WASM.
3. Transmits **zero bytes** of image payloads across the network.

---

## ☕ Support the Developer

If you find this free tool helpful, consider supporting the developer:  
👉 **[Buy Me a Coffee](https://buymeacoffee.com/kisharadilz)**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).