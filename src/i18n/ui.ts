export const languages = {
  en: { name: 'English', flag: '🇺🇸', code: 'en' },
  es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  pt: { name: 'Português', flag: '🇧🇷', code: 'pt' },
  de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' },
  fr: { name: 'Français', flag: '🇫🇷', code: 'fr' },
  ja: { name: '日本語', flag: '🇯🇵', code: 'ja' },
} as const;

export type SupportedLanguage = keyof typeof languages;
export const defaultLang: SupportedLanguage = 'en';

export const ui = {
  en: {
    meta: {
      title: 'Free Bulk Background Remover | Batch Remove Image BG Online 100% Private',
      description: 'Remove backgrounds from multiple images at once for free. 100% browser-based AI processing using WebGPU/WASM. No limits, no sign-ups, and your images never leave your device.',
      keywords: 'bulk background remover, batch remove bg, remove background from multiple images, client side background remover, client side ai background remover, free image cutout tool',
      ogTitle: 'Bulk Background Remover - 100% Private Batch Image BG Removal',
      ogDescription: 'Process 50+ images in batch directly in your browser. Powered by High-Precision AI & WebGPU. Zero server uploads.',
    },
    nav: {
      brandName: 'Bulk BG Remover',
      features: 'Features',
      howItWorks: 'How It Works',
      comparison: 'Comparison',
      faq: 'FAQ',
      github: 'GitHub',
      supportDev: 'Support the Developer',
    },
    hero: {
      badge: '⚡ Powered by Client-Side Neural AI & WebGPU',
      title: 'Batch Remove Backgrounds in Seconds',
      titleHighlight: '100% In Your Browser',
      description: 'The fastest, privacy-first bulk background removal tool. Convert dozens of images to transparent PNGs or custom solid colors simultaneously with zero server uploads and zero fees.',
      pillPrivacy: '100% Private & Local',
      pillZeroUpload: 'Zero Server Uploads',
      pillUnlimited: 'Free & Unlimited',
      pillWebgpu: 'WebGPU Accelerated',
    },
    workspace: {
      dropzoneTitle: 'Drag & drop multiple images here',
      dropzoneSubtitle: 'or click to browse from your computer',
      dropzoneNote: 'Supports PNG, JPG, JPEG, and WebP (Batch process up to 50+ images at once)',
      dropzoneActive: 'Release to add images to queue...',
      selectFilesBtn: 'Select Images',
      
      // Toolbar
      toolbarTitle: 'Batch Controls',
      processAllBtn: 'Process All Images',
      processingBtn: 'Processing Batch...',
      downloadZipBtn: 'Download All (ZIP)',
      downloadingZipBtn: 'Bundling ZIP...',
      clearAllBtn: 'Clear All',
      addMoreBtn: 'Add More',
      totalCount: 'Total Images',
      completedCount: 'Completed',
      bgColorLabel: 'Background Output:',
      bgTransparent: 'Transparent',
      bgWhite: 'White',
      bgBlack: 'Black',
      bgCustom: 'Custom Hex',
      
      // Status & Progress
      modelLoading: 'Downloading AI Model into Browser Cache...',
      modelReady: 'AI Engine Ready',
      webgpuActive: 'WebGPU Hardware Accelerated',
      wasmActive: 'WebAssembly Fallback Active',
      statusQueued: 'Queued',
      statusModelDownload: 'Downloading Model',
      statusProcessing: 'Removing Background...',
      statusCompleted: 'Done',
      statusError: 'Failed',
      
      // Image Card
      cardBefore: 'Original',
      cardAfter: 'No BG',
      cardDownload: 'Download PNG',
      cardRemove: 'Remove',
      cardRetry: 'Retry',
      sizeReduction: 'Saved',
      
      // Alerts & Notifications
      zipSuccessMsg: 'All processed images bundled successfully into ZIP!',
      noImagesMsg: 'Upload images above to start batch processing.',
      confirmClearMsg: 'Are you sure you want to clear all images from the queue?',

      // First-Time Model Download Banner
      modelBannerTitle: '⚡ First-Time Setup: Downloading AI Model',
      modelBannerSubtitle: 'The high-precision neural network (~40 MB) is downloading to your browser cache. This only happens once — subsequent visits load instantly from cache.',
      modelBannerCached: '✅ AI Model loaded from cache — ready instantly!',
      modelBannerEstimate: 'Estimated time: 10–30 seconds on broadband',
      modelBannerError: 'Model failed to load. Please refresh the page and try again.',
      modelInitializing: 'Preparing AI engine...',
    },
    features: {
      badge: 'Key Capabilities',
      title: 'Engineered for Speed, Privacy, and Scale',
      subtitle: 'Why professionals and creators choose our client-side background removal engine.',
      list: [
        {
          title: '100% Client-Side Privacy',
          description: 'Your photos never leave your device. All neural network inference executes locally in your browser memory via WebGPU and WebAssembly.',
          icon: 'shield-check',
        },
        {
          title: 'Hardware-Accelerated WebGPU',
          description: 'Leverages your device’s GPU directly through modern browser APIs for blazing fast segmentation, processing images in fractions of a second.',
          icon: 'zap',
        },
        {
          title: 'True High-Volume Batching',
          description: 'Drop 10, 50, or 100+ images in a single batch. Multi-threaded pipeline keeps your browser responsive and processes images in sequence.',
          icon: 'layers',
        },
        {
          title: 'High-Precision Neural AI',
          description: 'State-of-the-art deep learning segmentation architecture captures fine hair strands, intricate product edges, and complex transparent contours.',
          icon: 'sparkles',
        },
        {
          title: 'No Limits & No Watermarks',
          description: 'No subscription walls, no credit counters, no file size penalties, and zero compression watermarks. Unlimited free exports forever.',
          icon: 'check-circle-2',
        },
        {
          title: 'One-Click ZIP Export',
          description: 'Save hours of manual saving. Export your entire batch as neatly named transparent PNGs bundled into a single ZIP archive instantly.',
          icon: 'archive',
        },
      ],
    },
    howItWorks: {
      badge: 'Simple 4-Step Process',
      title: 'How to Remove Backgrounds in Bulk',
      subtitle: 'Streamline your e-commerce, photography, and graphic design workflow in seconds.',
      steps: [
        {
          number: '01',
          title: 'Upload Your Images',
          description: 'Drag and drop your batch of product photos, portraits, or graphics into the workspace. Supports PNG, JPG, and WebP.',
        },
        {
          number: '02',
          title: 'AI Removes Backgrounds Locally',
          description: 'Click "Process All" to run the high-precision AI model directly on your device. Watch real-time previews appear as images finish.',
        },
        {
          number: '03',
          title: 'Choose Background Style',
          description: 'Keep cutouts transparent or apply solid studio white, sleek black, or custom hex color backdrops across all items instantly.',
        },
        {
          number: '04',
          title: 'Export Batch as ZIP',
          description: 'Download individual cutouts or click "Download All (ZIP)" to get every processed image packaged neatly in seconds.',
        },
      ],
    },
    comparison: {
      badge: 'Architecture Comparison',
      title: 'Client-Side AI vs. Traditional Cloud Tools',
      subtitle: 'See why browser-native AI is revolutionary for speed, security, and cost.',
      headers: {
        feature: 'Feature / Capability',
        ourTool: 'Bulk BG Remover (Client-Side)',
        cloudTools: 'Traditional Cloud BG Removers',
      },
      rows: [
        {
          feature: 'Data Privacy & Security',
          ourTool: '100% Private (Zero bytes leave your computer)',
          cloudTools: 'Images uploaded & stored on remote third-party servers',
        },
        {
          feature: 'Pricing & Usage Limits',
          ourTool: '100% Free & Unlimited forever',
          cloudTools: 'Expensive credit subscriptions ($0.20–$1.00 per image)',
        },
        {
          feature: 'Sign-up / Account Required',
          ourTool: 'No sign-up or API key needed',
          cloudTools: 'Mandatory account creation & billing details',
        },
        {
          feature: 'Batch Processing Scale',
          ourTool: '50+ images at once with ZIP download',
          cloudTools: 'Often locked behind premium tier or throttled',
        },
        {
          feature: 'Bandwidth & Upload Time',
          ourTool: 'Instant local memory buffer (0 MB uploaded)',
          cloudTools: 'Gigabytes of image uploads required for large batches',
        },
        {
          feature: 'Offline Capability',
          ourTool: 'Works fully offline once model is cached in browser',
          cloudTools: 'Completely unusable without continuous internet',
        },
      ],
    },
    seoContent: {
      title: 'The Modern Standard for Bulk Background Removal',
      subtitle: 'Why on-device machine learning is replacing legacy cloud-based image segmentation services.',
      p1: 'Removing backgrounds from high volumes of images has traditionally been a bottleneck for e-commerce store owners, Amazon/Shopify sellers, digital marketers, and portrait photographers. Legacy cloud solutions force users to upload high-resolution images to remote servers, incurring heavy bandwidth costs, recurring subscription fees, and severe privacy risks when dealing with proprietary product designs or sensitive personal photography.',
      p2: 'Bulk BG Remover solves this problem fundamentally by leveraging next-generation WebGPU and WebAssembly technologies to execute the state-of-the-art **High-Precision ISNet Neural Network** deep learning segmentation model directly within your web browser. Once loaded, the neural network processes full-resolution images locally on your GPU or CPU cores.',
      p3Title: 'Perfect for E-Commerce, Product Photography, and Design',
      p3: 'Whether you need to generate clean white backgrounds for Amazon product listings, create transparent PNG assets for Canva collages, or prepare thousands of catalog shots for Shopify, our batch engine handles the workload effortlessly. With instant ZIP export and customizable color backplates, you can finish hours of tedious photo editing in minutes.',
    },
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Everything You Need to Know',
      subtitle: 'Got questions about our client-side background remover? Find answers below.',
      items: [
        {
          question: 'Are my images really 100% private and safe?',
          answer: 'Yes, absolutely. Unlike conventional background removal websites, Bulk BG Remover never uploads your photos to any external server. All AI model inference and canvas rendering take place strictly inside your browser’s local sandbox. You can verify this by checking your browser’s Network tab—zero image payloads are transmitted.',
        },
        {
          question: 'How does in-browser AI background removal work without a server?',
          answer: 'We utilize Hugging Face Transformers.js and ONNX Runtime Web. When you first visit the site, the lightweight neural network weights (~40MB-170MB) are downloaded directly to your browser’s Cache API / IndexedDB storage. Subsequent visits use the cached model instantly, even when offline.',
        },
        {
          question: 'What is WebGPU and how does it speed up processing?',
          answer: 'WebGPU is a modern web standard that allows web applications to communicate directly with your computer’s graphics card (GPU). This enables parallel tensor computations required by AI models to run up to 10x faster than traditional CPU-based WebAssembly.',
        },
        {
          question: 'Is there a limit on how many images I can process at once?',
          answer: 'There are no artificial limits. You can drop 50, 100, or more images. Processing speed depends entirely on your local hardware (GPU/CPU) and available system memory. The sequential queue ensures your browser remains smooth and responsive.',
        },
        {
          question: 'What image formats and resolutions are supported?',
          answer: 'We support PNG, JPEG, JPG, and WebP formats. The neural AI model is trained on high-resolution photography and preserves the original dimensions and aspect ratio of your source images upon export.',
        },
        {
          question: 'Can I replace the background with solid white or a custom color?',
          answer: 'Yes! Using our background palette controls, you can toggle between transparent alpha cutouts, pure studio white (#FFFFFF), solid black (#000000), or any custom hex color code. The background is composited instantly on the canvas.',
        },
        {
          question: 'Is this service truly free? Will there be watermarks?',
          answer: 'Bulk BG Remover is 100% free with zero watermarks, zero subscriptions, and zero hidden credit systems. Because we do not run expensive cloud GPU inference servers, we pass the zero-cost architecture directly to you.',
        },
        {
          question: 'Does the tool work offline?',
          answer: 'Yes! After your browser downloads and caches the AI model on the first run, the tool is fully capable of processing images offline without an active internet connection.',
        },
      ],
    },
    footer: {
      description: 'Free, high-performance, 100% client-side bulk background remover. Powered by Neural AI & WebGPU. Zero server uploads, total privacy.',
      privacyGuarantee: '100% Private: All processing occurs on your device.',
      rights: 'All rights reserved.',
      builtWith: 'Built with Astro, React, Tailwind CSS & WebAssembly',
      navigation: 'Quick Links',
      languages: 'Languages',
    },
  },

  es: {
    meta: {
      title: 'Eliminador de Fondos por Lote Gratis | Quitar Fondo a Múltiples Imágenes 100% Privado',
      description: 'Elimina el fondo de múltiples imágenes a la vez gratis. Procesamiento de IA 100% en el navegador con WebGPU/WASM. Sin límites, sin registros y tus imágenes nunca salen de tu dispositivo.',
      keywords: 'eliminar fondo por lote, quitar fondo varias imagenes a la vez, eliminador de fondos local, client side ai background remover, recortar fotos gratis online',
      ogTitle: 'Eliminador de Fondos por Lote - 100% Privado en tu Navegador',
      ogDescription: 'Procesa más de 50 imágenes en lote directamente en tu navegador. Potenciado por el modelo de IA de alta precisión y WebGPU. Cero subidas al servidor.',
    },
    nav: {
      brandName: 'Bulk BG Remover',
      features: 'Características',
      howItWorks: 'Cómo Funciona',
      comparison: 'Comparación',
      faq: 'Preguntas Frecuentes',
      github: 'GitHub',
      supportDev: 'Apoyar al Desarrollador',
    },
    hero: {
      badge: '⚡ Potenciado por IA Neural Local y WebGPU',
      title: 'Elimina Fondos en Lote en Segundos',
      titleHighlight: '100% en tu Navegador',
      description: 'La herramienta de eliminación masiva de fondos más rápida y privada. Convierte docenas de imágenes a PNG transparentes o colores sólidos simultáneamente sin subir nada al servidor.',
      pillPrivacy: '100% Privado y Local',
      pillZeroUpload: 'Cero Subidas al Servidor',
      pillUnlimited: 'Gratis e Ilimitado',
      pillWebgpu: 'Acelerado por WebGPU',
    },
    workspace: {
      dropzoneTitle: 'Arrastra y suelta múltiples imágenes aquí',
      dropzoneSubtitle: 'o haz clic para explorar tus archivos',
      dropzoneNote: 'Compatible con PNG, JPG, JPEG y WebP (Procesa más de 50 imágenes a la vez)',
      dropzoneActive: 'Suelta los archivos para añadirlos a la cola...',
      selectFilesBtn: 'Seleccionar Imágenes',
      
      toolbarTitle: 'Controles de Lote',
      processAllBtn: 'Procesar Todas las Imágenes',
      processingBtn: 'Procesando Lote...',
      downloadZipBtn: 'Descargar Todo (ZIP)',
      downloadingZipBtn: 'Generando ZIP...',
      clearAllBtn: 'Limpiar Todo',
      addMoreBtn: 'Añadir Más',
      totalCount: 'Total de Imágenes',
      completedCount: 'Completadas',
      bgColorLabel: 'Fondo de Salida:',
      bgTransparent: 'Transparente',
      bgWhite: 'Blanco',
      bgBlack: 'Negro',
      bgCustom: 'Color Hex',
      
      modelLoading: 'Descargando Modelo de IA en la Memoria del Navegador...',
      modelReady: 'Motor de IA Listo',
      webgpuActive: 'Aceleración por Hardware WebGPU Activa',
      wasmActive: 'Modo WebAssembly Activo',
      statusQueued: 'En Cola',
      statusModelDownload: 'Descargando Modelo',
      statusProcessing: 'Eliminando Fondo...',
      statusCompleted: 'Listo',
      statusError: 'Error',
      
      cardBefore: 'Original',
      cardAfter: 'Sin Fondo',
      cardDownload: 'Descargar PNG',
      cardRemove: 'Eliminar',
      cardRetry: 'Reintentar',
      sizeReduction: 'Ahorro',
      
      zipSuccessMsg: '¡Todas las imágenes procesadas se han empaquetado con éxito en un archivo ZIP!',
      noImagesMsg: 'Sube imágenes arriba para iniciar el procesamiento en lote.',
      confirmClearMsg: '¿Estás seguro de que deseas eliminar todas las imágenes de la cola?',

      // First-Time Model Download Banner
      modelBannerTitle: '⚡ Configuración Inicial: Descargando Modelo IA',
      modelBannerSubtitle: 'La red neuronal de alta precisión (~40 MB) se está descargando a la caché de tu navegador. Esto solo ocurre una vez — las visitas posteriores cargan instantáneamente desde la caché.',
      modelBannerCached: '✅ Modelo IA cargado desde caché — ¡listo al instante!',
      modelBannerEstimate: 'Tiempo estimado: 10–30 segundos con banda ancha',
      modelBannerError: 'Error al cargar el modelo. Por favor, recarga la página e intenta de nuevo.',
      modelInitializing: 'Preparando motor IA...',
    },
    features: {
      badge: 'Capacidades Principales',
      title: 'Diseñado para Velocidad, Privacidad y Escala',
      subtitle: 'Por qué profesionales y creadores eligen nuestro motor de eliminación de fondos local.',
      list: [
        {
          title: '100% Privacidad en el Cliente',
          description: 'Tus fotos nunca salen de tu ordenador. Toda la inferencia de la red neuronal se ejecuta en la memoria local mediante WebGPU y WebAssembly.',
          icon: 'shield-check',
        },
        {
          title: 'Aceleración por WebGPU',
          description: 'Aprovecha la tarjeta gráfica de tu equipo a través de APIs web modernas para procesar imágenes en fracciones de segundo.',
          icon: 'zap',
        },
        {
          title: 'Verdadero Procesamiento Masivo',
          description: 'Arrastra 10, 50 o más de 100 imágenes en un solo lote. El flujo optimizado mantiene tu navegador fluido y sin bloqueos.',
          icon: 'layers',
        },
        {
          title: 'Precisión de IA Neural',
          description: 'La arquitectura avanzada de segmentación neuronal captura cabellos finos, bordes de productos intrincados y transparencias complejas.',
          icon: 'sparkles',
        },
        {
          title: 'Sin Límites ni Marcas de Agua',
          description: 'Sin muros de pago, sin créditos que se agotan y sin marcas de agua. Exportaciones gratuitas e ilimitadas para siempre.',
          icon: 'check-circle-2',
        },
        {
          title: 'Exportación ZIP en un Clic',
          description: 'Ahorra tiempo. Exporta todo tu lote de imágenes transparentes en un único archivo ZIP organizado al instante.',
          icon: 'archive',
        },
      ],
    },
    howItWorks: {
      badge: 'Proceso Simple en 4 Pasos',
      title: 'Cómo Eliminar Fondos en Lote',
      subtitle: 'Optimiza tu flujo de trabajo de comercio electrónico, fotografía y diseño en segundos.',
      steps: [
        {
          number: '01',
          title: 'Sube tus Imágenes',
          description: 'Arrastra y suelta tu lote de fotos de productos o retratos en el espacio de trabajo. Soporta PNG, JPG y WebP.',
        },
        {
          number: '02',
          title: 'La IA Elimina los Fondos',
          description: 'Haz clic en "Procesar Todas" para ejecutar el modelo de IA directamente en tu dispositivo con previsualizaciones en vivo.',
        },
        {
          number: '03',
          title: 'Personaliza el Fondo',
          description: 'Mantén los recortes transparentes o añade fondos blancos para e-commerce, negros o cualquier color personalizado.',
        },
        {
          number: '04',
          title: 'Descarga en ZIP',
          description: 'Descarga imágenes individuales o haz clic en "Descargar Todo (ZIP)" para obtener todas las imágenes listas en segundos.',
        },
      ],
    },
    comparison: {
      badge: 'Comparación Técnica',
      title: 'IA en el Navegador vs. Herramientas en la Nube',
      subtitle: 'Descubre por qué la IA local es superior en velocidad, seguridad y coste.',
      headers: {
        feature: 'Característica / Capacidad',
        ourTool: 'Bulk BG Remover (Local)',
        cloudTools: 'Servicios Tradicionales en la Nube',
      },
      rows: [
        {
          feature: 'Privacidad y Seguridad de Datos',
          ourTool: '100% Privado (Ningún byte sale de tu dispositivo)',
          cloudTools: 'Imágenes subidas y almacenadas en servidores externos',
        },
        {
          feature: 'Precios y Límites de Uso',
          ourTool: '100% Gratis e Ilimitado para siempre',
          cloudTools: 'Suscripciones costosas por créditos ($0.20–$1.00 por foto)',
        },
        {
          feature: 'Registro de Cuenta Requerido',
          ourTool: 'Sin registro ni claves API requeridas',
          cloudTools: 'Creación obligatoria de cuenta y tarjeta de crédito',
        },
        {
          feature: 'Escala de Procesamiento Masivo',
          ourTool: 'Más de 50 imágenes a la vez con descarga ZIP',
          cloudTools: 'Limitado o bloqueado tras muros de pago',
        },
        {
          feature: 'Consumo de Ancho de Banda',
          ourTool: 'Memoria local instantánea (0 MB subidos)',
          cloudTools: 'Requiere subir gigabytes de imágenes a la red',
        },
        {
          feature: 'Funcionamiento Sin Conexión',
          ourTool: 'Funciona offline tras la primera descarga del modelo',
          cloudTools: 'Inutilizable sin conexión continua a internet',
        },
      ],
    },
    seoContent: {
      title: 'El Nuevo Estándar para la Eliminación de Fondos Masiva',
      subtitle: 'Por qué el aprendizaje automático en el dispositivo sustituye a los servicios en la nube.',
      p1: 'Eliminar el fondo de cientos de imágenes ha sido tradicionalmente un obstáculo para tiendas online, vendedores de Amazon/MercadoLibre, agencias y fotógrafos. Los servicios en la nube tradicionales obligan a subir imágenes pesadas a servidores lejanos, con costes recurrentes y riesgos de privacidad.',
      p2: 'Bulk BG Remover resuelve esto ejecutando el modelo de vanguardia **High-Precision ISNet Neural Network** directamente en tu navegador web gracias a WebGPU y WebAssembly. Una vez en caché, el modelo procesa imágenes en alta resolución usando la potencia de tu propio ordenador o móvil.',
      p3Title: 'Ideal para E-Commerce, Catálogos y Fotografía',
      p3: 'Ya sea que necesites fondos blancos puros para tus fichas de producto, recortes PNG transparentes para diseños publicitarios o preparar miles de fotos, nuestra herramienta por lote te permite completar horas de edición en cuestión de minutos.',
    },
    faq: {
      badge: 'Preguntas Frecuentes',
      title: 'Todo lo que Necesitas Saber',
      subtitle: '¿Tienes dudas sobre nuestro eliminador de fondos local? Aquí tienes las respuestas.',
      items: [
        {
          question: '¿Mis imágenes son realmente 100% privadas y seguras?',
          answer: 'Sí, totalmente. A diferencia de otras webs, Bulk BG Remover nunca envía tus imágenes a servidores externos. Todo el proceso de IA ocurre estrictamente en el entorno aislado de tu navegador.',
        },
        {
          question: '¿Cómo funciona la IA sin necesidad de un servidor?',
          answer: 'Utilizamos Transformers.js y ONNX Runtime Web. En tu primera visita se descargan los parámetros del modelo de IA en la memoria caché de tu navegador. Las visitas siguientes utilizan el modelo local guardado.',
        },
        {
          question: '¿Qué es WebGPU y cómo acelera el proceso?',
          answer: 'WebGPU es un estándar web moderno que permite a las páginas interactuar directamente con tu tarjeta gráfica (GPU), ejecutando la IA hasta 10 veces más rápido que la CPU.',
        },
        {
          question: '¿Hay un límite de cuántas imágenes puedo procesar a la vez?',
          answer: 'No hay límites impuestos. Puedes procesar 50, 100 o más imágenes según la memoria y potencia de tu equipo.',
        },
        {
          question: '¿Qué formatos y resoluciones son compatibles?',
          answer: 'Soportamos PNG, JPG, JPEG y WebP. El modelo respeta las dimensiones y la resolución original de tus imágenes.',
        },
        {
          question: '¿Puedo cambiar el fondo a blanco o a un color personalizado?',
          answer: '¡Sí! Puedes alternar entre fondo transparente, blanco de estudio, negro o cualquier código de color hexadecimal con un solo clic.',
        },
        {
          question: '¿El servicio es realmente gratis y sin marcas de agua?',
          answer: 'Es 100% gratuito, sin marcas de agua ni sistemas de créditos ocultos, ya que no incurrimos en gastos de servidores en la nube.',
        },
        {
          question: '¿Funciona sin conexión a internet?',
          answer: '¡Sí! Una vez descargado el modelo en la primera visita, puedes usar la herramienta sin conexión a internet.',
        },
      ],
    },
    footer: {
      description: 'Eliminador masivo de fondos gratis, rápido y 100% local. Potenciado por IA Neural y WebGPU. Cero subidas al servidor, privacidad absoluta.',
      privacyGuarantee: '100% Privado: Todo el procesamiento ocurre en tu dispositivo.',
      rights: 'Todos los derechos reservados.',
      builtWith: 'Creado con Astro, React, Tailwind CSS y Transformers.js',
      navigation: 'Enlaces Rápidos',
      languages: 'Idiomas',
    },
  },

  pt: {
    meta: {
      title: 'Removedor de Fundo em Lote Grátis | Remover Fundo de Várias Imagens 100% Privado',
      description: 'Remova o fundo de várias imagens de uma só vez grátis. IA 100% no navegador com WebGPU/WASM. Sem limites, sem cadastros e suas fotos nunca saem do seu computador.',
      keywords: 'remover fundo em lote, remover fundo de varias fotos, removedor de fundo no navegador, client side ai background remover, recortar imagens gratis online',
      ogTitle: 'Removedor de Fundo em Lote - 100% Privado no Navegador',
      ogDescription: 'Processe mais de 50 imagens em lote no navegador com IA de alta precisão e aceleração WebGPU. Zero envio para servidores.',
    },
    nav: {
      brandName: 'Bulk BG Remover',
      features: 'Recursos',
      howItWorks: 'Como Funciona',
      comparison: 'Comparativo',
      faq: 'Perguntas Frequentes',
      github: 'GitHub',
      supportDev: 'Apoiar o Desenvolvedor',
    },
    hero: {
      badge: '⚡ Potencializado por IA Neural Local e WebGPU',
      title: 'Remova Fundos em Lote em Segundos',
      titleHighlight: '100% no Seu Navegador',
      description: 'A ferramenta mais rápida e segura para remoção de fundos em massa. Converta dezenas de imagens para PNG transparente ou cores personalizadas sem enviar nada para servidores externos.',
      pillPrivacy: '100% Privado e Local',
      pillZeroUpload: 'Zero Envio para Servidores',
      pillUnlimited: 'Grátis e Ilimitado',
      pillWebgpu: 'Aceleração WebGPU',
    },
    workspace: {
      dropzoneTitle: 'Arraste e solte várias imagens aqui',
      dropzoneSubtitle: 'ou clique para selecionar do seu computador',
      dropzoneNote: 'Compatível com PNG, JPG, JPEG e WebP (Processe mais de 50 imagens por lote)',
      dropzoneActive: 'Solte os arquivos para adicionar à fila...',
      selectFilesBtn: 'Selecionar Imagens',
      
      toolbarTitle: 'Controles em Lote',
      processAllBtn: 'Processar Todas as Imagens',
      processingBtn: 'Processando Lote...',
      downloadZipBtn: 'Baixar Tudo (ZIP)',
      downloadingZipBtn: 'Criando Arquivo ZIP...',
      clearAllBtn: 'Limpar Tudo',
      addMoreBtn: 'Adicionar Mais',
      totalCount: 'Total de Imagens',
      completedCount: 'Concluídas',
      bgColorLabel: 'Fundo de Saída:',
      bgTransparent: 'Transparente',
      bgWhite: 'Branco',
      bgBlack: 'Preto',
      bgCustom: 'Cor Hex',
      
      modelLoading: 'Baixando Modelo de IA na Memória do Navegador...',
      modelReady: 'Motor de IA Pronto',
      webgpuActive: 'Aceleração de Hardware WebGPU Ativa',
      wasmActive: 'Modo WebAssembly Ativo',
      statusQueued: 'Na Fila',
      statusModelDownload: 'Baixando Modelo',
      statusProcessing: 'Removendo Fundo...',
      statusCompleted: 'Concluído',
      statusError: 'Falhou',
      
      cardBefore: 'Original',
      cardAfter: 'Sem Fundo',
      cardDownload: 'Baixar PNG',
      cardRemove: 'Remover',
      cardRetry: 'Tentar Novamente',
      sizeReduction: 'Economia',
      
      zipSuccessMsg: 'Todas as imagens processadas foram compactadas em ZIP com sucesso!',
      noImagesMsg: 'Envie imagens acima para iniciar o processamento em lote.',
      confirmClearMsg: 'Tem certeza de que deseja remover todas as imagens da fila?',

      // First-Time Model Download Banner
      modelBannerTitle: '⚡ Configuração Inicial: Baixando Modelo IA',
      modelBannerSubtitle: 'A rede neural de alta precisão (~40 MB) está sendo baixada para o cache do seu navegador. Isso acontece apenas uma vez — visitas posteriores carregam instantaneamente do cache.',
      modelBannerCached: '✅ Modelo IA carregado do cache — pronto instantaneamente!',
      modelBannerEstimate: 'Tempo estimado: 10–30 segundos em banda larga',
      modelBannerError: 'Falha ao carregar o modelo. Por favor, recarregue a página e tente novamente.',
      modelInitializing: 'Preparando motor IA...',
    },
    features: {
      badge: 'Principais Vantagens',
      title: 'Desenvolvido para Velocidade, Privacidade e Escala',
      subtitle: 'Por que profissionais e criadores escolhem nosso motor de remoção local de fundo.',
      list: [
        {
          title: '100% de Privacidade no Cliente',
          description: 'Suas fotos nunca saem do seu dispositivo. Toda a inferência de IA ocorre diretamente na memória local via WebGPU e WebAssembly.',
          icon: 'shield-check',
        },
        {
          title: 'Aceleração por WebGPU',
          description: 'Utiliza diretamente a placa de vídeo do seu computador para processar recortes complexos em frações de segundo.',
          icon: 'zap',
        },
        {
          title: 'Processamento em Grande Escala',
          description: 'Adicione 10, 50 ou mais de 100 imagens de uma vez só. O fluxo otimizado mantém seu navegador rápido e responsivo.',
          icon: 'layers',
        },
        {
          title: 'Precisão de IA Neural',
          description: 'A avançada rede neural de segmentação detecta cabelos finos, contornos detalhados e bordas transparentes com perfeição.',
          icon: 'sparkles',
        },
        {
          title: 'Sem Limites e Sem Marcas d’Água',
          description: 'Sem assinaturas, sem créditos que expiram e sem marcas d’água nas suas fotos. Totalmente gratuito para sempre.',
          icon: 'check-circle-2',
        },
        {
          title: 'Download em ZIP com 1 Clique',
          description: 'Poupe tempo precioso. Exporte todo o lote de imagens recortadas em um único arquivo ZIP organizado instantaneamente.',
          icon: 'archive',
        },
      ],
    },
    howItWorks: {
      badge: 'Passo a Passo Simples',
      title: 'Como Remover Fundos em Lote',
      subtitle: 'Otimize seu fluxo de fotos para e-commerce, catálogos e design em poucos segundos.',
      steps: [
        {
          number: '01',
          title: 'Envie Suas Imagens',
          description: 'Arraste e solte suas fotos de produtos ou pessoas na área de trabalho. Suporta PNG, JPG e WebP.',
        },
        {
          number: '02',
          title: 'IA Remove os Fundos Localmente',
          description: 'Clique em "Processar Todas" para rodar o modelo de IA direto no seu navegador com visualização em tempo real.',
        },
        {
          number: '03',
          title: 'Escolha a Cor de Fundo',
          description: 'Mantenha recortes transparentes ou aplique fundo branco para e-commerce, preto ou qualquer cor personalizada.',
        },
        {
          number: '04',
          title: 'Baixe o Lote em ZIP',
          description: 'Baixe arquivos individuais ou clique em "Baixar Tudo (ZIP)" para salvar todas as imagens prontas de uma só vez.',
        },
      ],
    },
    comparison: {
      badge: 'Comparativo Técnico',
      title: 'IA no Navegador vs. Serviços em Nuvem',
      subtitle: 'Entenda por que a IA local no navegador é o futuro da produtividade e segurança.',
      headers: {
        feature: 'Recurso / Capacidade',
        ourTool: 'Bulk BG Remover (Local)',
        cloudTools: 'Serviços Tradicionais em Nuvem',
      },
      rows: [
        {
          feature: 'Privacidade e Proteção de Dados',
          ourTool: '100% Privado (Nenhum byte sai do seu computador)',
          cloudTools: 'Fotos enviadas e armazenadas em servidores de terceiros',
        },
        {
          feature: 'Preço e Limites de Uso',
          ourTool: '100% Gratuito e Ilimitado para sempre',
          cloudTools: 'Cobranças caras por crédito (R$ 1,00 a R$ 5,00 por imagem)',
        },
        {
          feature: 'Cadastro Obrigatório',
          ourTool: 'Sem necessidade de cadastro ou chaves de API',
          cloudTools: 'Exige criação de conta e cartão de crédito',
        },
        {
          feature: 'Processamento em Massa',
          ourTool: 'Mais de 50 imagens simultâneas com download em ZIP',
          cloudTools: 'Geralmente limitado ou bloqueado na versão gratuita',
        },
        {
          feature: 'Consumo de Internet / Upload',
          ourTool: 'Processamento em memória local (0 MB enviados)',
          cloudTools: 'Requer upload de centenas de megabytes ou gigabytes',
        },
        {
          feature: 'Uso Sem Internet (Offline)',
          ourTool: 'Funciona offline após o primeiro download do modelo',
          cloudTools: 'Totalmente indisponível sem conexão com a internet',
        },
      ],
    },
    seoContent: {
      title: 'O Novo Padrão para Remoção de Fundo em Massa',
      subtitle: 'Por que o processamento de IA direto no navegador substitui ferramentas legadas em nuvem.',
      p1: 'Remover o fundo de dezenas ou centenas de imagens sempre foi um processo demorado e custoso para lojistas de e-commerce (Mercado Livre, Shopee, Amazon), designers e fotógrafos. Ferramentas tradicionais exigem o envio de fotos confidenciais para servidores remotos com cobranças recorrentes.',
      p2: 'O Bulk BG Remover elimina esses obstáculos executando o modelo de aprendizado profundo **High-Precision ISNet Neural Network** diretamente no seu navegador através de WebGPU e WebAssembly. As imagens são processadas na velocidade máxima do seu hardware sem sair do seu computador.',
      p3Title: 'Ideal para Lojas Virtuais, Fotografia e Criação de Conteúdo',
      p3: 'Seja para padronizar fotos de catálogo com fundo branco limpo, produzir PNGs transparentes para banners ou tratar lotes de fotos, você ganha velocidade extrema e custo zero em um único ambiente seguro.',
    },
    faq: {
      badge: 'Perguntas Frequentes',
      title: 'Tudo o que Você Precisa Saber',
      subtitle: 'Dúvidas sobre o funcionamento da nossa IA local? Confira as respostas abaixo.',
      items: [
        {
          question: 'Minhas fotos estão realmente 100% seguras e privadas?',
          answer: 'Sim, totalmente. Diferente de outros sites, o Bulk BG Remover nunca envia suas fotos para servidores externos. Todo o processamento ocorre exclusivamente dentro do seu próprio navegador.',
        },
        {
          question: 'Como a IA funciona no navegador sem servidor?',
          answer: 'Utilizamos a biblioteca Transformers.js e ONNX Runtime Web. Na primeira vez que você acessa o site, o modelo de IA é salvo no cache do seu navegador para uso instantâneo.',
        },
        {
          question: 'O que é WebGPU e como isso acelera o processo?',
          answer: 'WebGPU é um padrão moderno que permite ao navegador acessar diretamente a placa de vídeo do seu computador, executando os cálculos de IA até 10x mais rápido que no processador comum.',
        },
        {
          question: 'Existe limite para a quantidade de fotos processadas?',
          answer: 'Não há limites artificiais. Você pode adicionar 50, 100 ou mais fotos de uma só vez, dependendo da memória do seu computador.',
        },
        {
          question: 'Quais formatos e resoluções são aceitos?',
          answer: 'Suportamos PNG, JPG, JPEG e WebP. A resolução e proporção originais das suas fotos são mantidas no arquivo final.',
        },
        {
          question: 'Posso colocar fundo branco ou outra cor nas imagens?',
          answer: 'Sim! Você pode escolher entre fundo transparente, branco padrão para e-commerce, preto elegante ou qualquer código de cor hexadecimal.',
        },
        {
          question: 'O serviço é realmente gratuito e sem marcas d’água?',
          answer: 'Sim, 100% grátis e sem marcas d’água. Como não mantemos servidores de processamento caros na nuvem, oferecemos a ferramenta sem custos.',
        },
        {
          question: 'A ferramenta funciona sem conexão com a internet?',
          answer: 'Sim! Após carregar o modelo na primeira utilização, você pode usar o removedor de fundo mesmo se estiver totalmente offline.',
        },
      ],
    },
    footer: {
      description: 'Removedor de fundo em lote grátis, rápido e 100% local. Potencializado por IA Neural e WebGPU. Zero envio para servidores, privacidade total.',
      privacyGuarantee: '100% Privado: Todo o processamento ocorre no seu dispositivo.',
      rights: 'Todos os direitos reservados.',
      builtWith: 'Desenvolvido com Astro, React, Tailwind CSS e Transformers.js',
      navigation: 'Links Rápidos',
      languages: 'Idiomas',
    },
  },

  de: {
    meta: {
      title: 'Kostenloser Massen-Hintergrundentferner | Bildhintergründe im Batch entfernen 100% Privat',
      description: 'Hintergrund von mehreren Bildern gleichzeitig kostenlos entfernen. 100% lokale KI-Verarbeitung im Browser mit WebGPU/WASM. Keine Limits, keine Registrierung, maximale Privatsphäre.',
      keywords: 'massen hintergrund entferner, batch hintergrund entfernen, bildhintergrund entfernen mehrere bilder, browser ki freistellen, client side ai background remover, png freistellen kostenlos',
      ogTitle: 'Massen-Hintergrundentferner - 100% Privat im Browser',
      ogDescription: 'Verarbeite 50+ Bilder gleichzeitig direkt im Browser. High-Precision KI-Modell mit WebGPU-Beschleunigung. Keine Server-Uploads.',
    },
    nav: {
      brandName: 'Bulk BG Remover',
      features: 'Funktionen',
      howItWorks: 'Anleitung',
      comparison: 'Vergleich',
      faq: 'FAQ',
      github: 'GitHub',
      supportDev: 'Entwickler unterstützen',
    },
    hero: {
      badge: '⚡ Angetrieben von lokaler Neural-KI & WebGPU',
      title: 'Bildhintergründe im Batch in Sekunden entfernen',
      titleHighlight: '100% in Deinem Browser',
      description: 'Das schnellste und sicherste Werkzeug zur Massen-Hintergrundentfernung. Konvertiere Dutzende Bilder gleichzeitig in transparente PNGs oder Wunschfarben – ganz ohne Server-Uploads.',
      pillPrivacy: '100% Privat & Lokal',
      pillZeroUpload: 'Null Server-Uploads',
      pillUnlimited: 'Kostenlos & Unbegrenzt',
      pillWebgpu: 'WebGPU-Beschleunigt',
    },
    workspace: {
      dropzoneTitle: 'Mehrere Bilder hierher ziehen & ablegen',
      dropzoneSubtitle: 'oder klicken, um Dateien vom Computer auszuwählen',
      dropzoneNote: 'Unterstützt PNG, JPG, JPEG und WebP (Verarbeitet 50+ Bilder in einem Durchlauf)',
      dropzoneActive: 'Dateien loslassen, um sie zur Warteschlange hinzuzufügen...',
      selectFilesBtn: 'Bilder auswählen',
      
      toolbarTitle: 'Batch-Steuerung',
      processAllBtn: 'Alle Bilder verarbeiten',
      processingBtn: 'Stapel wird verarbeitet...',
      downloadZipBtn: 'Alle herunterladen (ZIP)',
      downloadingZipBtn: 'ZIP-Archiv wird erstellt...',
      clearAllBtn: 'Alle leeren',
      addMoreBtn: 'Weitere hinzufügen',
      totalCount: 'Gesamtanzahl',
      completedCount: 'Fertiggestellt',
      bgColorLabel: 'Ausgabe-Hintergrund:',
      bgTransparent: 'Transparent',
      bgWhite: 'Weiß',
      bgBlack: 'Schwarz',
      bgCustom: 'Hex-Farbe',
      
      modelLoading: 'KI-Modell wird in den Browser-Cache geladen...',
      modelReady: 'KI-Engine einsatzbereit',
      webgpuActive: 'WebGPU Hardwarebeschleunigung aktiv',
      wasmActive: 'WebAssembly Ausweichmodus aktiv',
      statusQueued: 'In Warteschlange',
      statusModelDownload: 'Modell wird geladen',
      statusProcessing: 'Hintergrund wird entfernt...',
      statusCompleted: 'Fertig',
      statusError: 'Fehlgeschlagen',
      
      cardBefore: 'Original',
      cardAfter: 'Freigestellt',
      cardDownload: 'PNG herunterladen',
      cardRemove: 'Entfernen',
      cardRetry: 'Wiederholen',
      sizeReduction: 'Ersparnis',
      
      zipSuccessMsg: 'Alle verarbeiteten Bilder wurden erfolgreich in eine ZIP-Datei gepackt!',
      noImagesMsg: 'Lade oben Bilder hoch, um die Stapelverarbeitung zu starten.',
      confirmClearMsg: 'Möchtest du wirklich alle Bilder aus der Warteschlange entfernen?',

      // First-Time Model Download Banner
      modelBannerTitle: '⚡ Ersteinrichtung: KI-Modell wird heruntergeladen',
      modelBannerSubtitle: 'Das neuronale Netzwerk (~40 MB) wird in den Browser-Cache heruntergeladen. Dies geschieht nur einmal — spätere Besuche laden sofort aus dem Cache.',
      modelBannerCached: '✅ KI-Modell aus Cache geladen — sofort bereit!',
      modelBannerEstimate: 'Geschätzte Dauer: 10–30 Sekunden bei Breitband',
      modelBannerError: 'Modell konnte nicht geladen werden. Bitte laden Sie die Seite neu und versuchen Sie es erneut.',
      modelInitializing: 'KI-Engine wird vorbereitet...',
    },
    features: {
      badge: 'Hauptfunktionen',
      title: 'Entwickelt für Geschwindigkeit, Datenschutz und Skalierung',
      subtitle: 'Warum Profis und Kreative auf unsere lokale Freistellungs-Engine setzen.',
      list: [
        {
          title: '100% Datenschutz auf dem Client',
          description: 'Deine Fotos verlassen niemals deinen Computer. Alle Berechnungen des neuronalen Netzes laufen direkt im Browser-Speicher via WebGPU und WebAssembly.',
          icon: 'shield-check',
        },
        {
          title: 'Hardware-Beschleunigung mit WebGPU',
          description: 'Nutzt direkt die Grafikkarte deines Geräts für blitzschnelle Bildsegmentierung in Sekundenbruchteilen.',
          icon: 'zap',
        },
        {
          title: 'Echte Massenverarbeitung',
          description: 'Füge 10, 50 oder über 100 Bilder auf einmal hinzu. Die optimierte Warteschlange hält deinen Browser flüssig und stabil.',
          icon: 'layers',
        },
        {
          title: 'Präzise Neuronale KI',
          description: 'Die moderne Deep-Learning-Architektur erkennt feine Haarsträhnen, komplexe Produktkanten und feine Transparenzen exakt.',
          icon: 'sparkles',
        },
        {
          title: 'Ohne Limits & Ohne Wasserzeichen',
          description: 'Keine Abonnements, keine Guthabenpunkte und keine Wasserzeichen auf deinen Bildern. Dauerhaft unbegrenzt kostenlos.',
          icon: 'check-circle-2',
        },
        {
          title: '1-Klick ZIP-Export',
          description: 'Spare wertvolle Arbeitszeit. Lade alle freigestellten Bilder sauber benannt in einem einzigen ZIP-Archiv herunter.',
          icon: 'archive',
        },
      ],
    },
    howItWorks: {
      badge: 'Einfacher 4-Schritte-Ablauf',
      title: 'So entfernst du Hintergründe im Stapel',
      subtitle: 'Optimiere deinen Workflow für E-Commerce, Fotografie und Grafikdesign in Sekundenschnelle.',
      steps: [
        {
          number: '01',
          title: 'Bilder hochladen',
          description: 'Ziehe deine Produktfotos, Porträts oder Grafiken in den Arbeitsbereich. Unterstützt PNG, JPG und WebP.',
        },
        {
          number: '02',
          title: 'KI entfernt Hintergründe lokal',
          description: 'Klicke auf "Alle Bilder verarbeiten", um das KI-Modell direkt auf deinem Gerät mit Live-Vorschau auszuführen.',
        },
        {
          number: '03',
          title: 'Hintergrundfarbe anpassen',
          description: 'Behalte transparente Ausschnitte bei oder wähle studio-weißes, schwarzes oder individuell farbiges Hinterlegen.',
        },
        {
          number: '04',
          title: 'Als ZIP herunterladen',
          description: 'Lade einzelne Dateien herunter oder klicke auf "Alle herunterladen (ZIP)", um das gesamte Paket sofort zu speichern.',
        },
      ],
    },
    comparison: {
      badge: 'Technischer Vergleich',
      title: 'Lokale Browser-KI vs. Cloud-Dienste',
      subtitle: 'Erfahre, warum lokale KI-Verarbeitung der neue Maßstab für Tempo und Sicherheit ist.',
      headers: {
        feature: 'Funktion / Eigenschaft',
        ourTool: 'Bulk BG Remover (Lokal)',
        cloudTools: 'Herkömmliche Cloud-Dienste',
      },
      rows: [
        {
          feature: 'Datenschutz & Sicherheit',
          ourTool: '100% Privat (Kein Byte verlässt dein Gerät)',
          cloudTools: 'Bilder werden auf fremde Server hochgeladen & gespeichert',
        },
        {
          feature: 'Preise & Nutzungslimits',
          ourTool: '100% Kostenlos & Unbegrenzt für immer',
          cloudTools: 'Teure Abos & Guthabensysteme (0,20 € bis 1,00 € pro Bild)',
        },
        {
          feature: 'Registrierungspflicht',
          ourTool: 'Kein Konto oder API-Schlüssel nötig',
          cloudTools: 'Pflicht zur Kontoerstellung & Hinterlegung von Zahlungsdaten',
        },
        {
          feature: 'Stapelverarbeitung (Batch)',
          ourTool: '50+ Bilder gleichzeitig mit direktem ZIP-Export',
          cloudTools: 'Oft nur in teuren Pro-Tarifen verfügbar',
        },
        {
          feature: 'Bandbreite & Uploadzeit',
          ourTool: 'Sofortige lokale Verarbeitung (0 MB Upload)',
          cloudTools: 'Upload von Gigabytes an Bilddaten erforderlich',
        },
        {
          feature: 'Offline-Nutzung',
          ourTool: 'Funktioniert nach dem ersten Laden komplett offline',
          cloudTools: 'Ohne dauerhafte Internetverbindung unbrauchbar',
        },
      ],
    },
    seoContent: {
      title: 'Der moderne Standard für Massen-Hintergrundentfernung',
      subtitle: 'Warum lokale KI auf dem Endgerät veraltete Cloud-Segmentierungsdienste ablöst.',
      p1: 'Das Freistellen hunderter Produkt- und Porträtfotos war bisher ein zeitintensiver und teurer Engpass für Online-Händler (Amazon, eBay, Shopify), Agenturen und Fotografen. Herkömmliche Cloud-Tools zwingen zum Upload sensibler Bilder auf externe Server, verbunden mit hohen Monatsabos und Datenschutzrisiken.',
      p2: 'Bulk BG Remover löst dieses Problem durch den Einsatz modernster WebGPU- und WebAssembly-Technologie, die das hochpräzise **High-Precision ISNet Neural Network** KI-Modell direkt in deinem Browser ausführt. Nach dem initialen Laden verarbeitet das neuronale Netz hochauflösende Bilder lokal mit der vollen Leistung deiner Hardware.',
      p3Title: 'Perfekt für E-Commerce, Produktfotografie und Design',
      p3: 'Egal ob du saubere weiße Hintergründe für Amazon-Produktbilder benötigst, transparente PNGs für Werbegrafiken erstellst oder ganze Bilderserien bearbeitest – mit unserem Batch-Tool erledigst du stundenlange Arbeit in wenigen Minuten.',
    },
    faq: {
      badge: 'Häufig gestellte Fragen',
      title: 'Alles, was du wissen musst',
      subtitle: 'Fragen zu unserem lokalen Freistellungs-Tool? Hier findest du alle Antworten.',
      items: [
        {
          question: 'Sind meine Bilder wirklich zu 100% privat und sicher?',
          answer: 'Ja, absolut. Im Gegensatz zu herkömmlichen Webseiten sendet Bulk BG Remover deine Bilder niemals an externe Server. Die gesamte KI-Berechnung erfolgt lokal in der Sandbox deines Browsers.',
        },
        {
          question: 'Wie funktioniert die KI im Browser ohne Server?',
          answer: 'Wir nutzen Transformers.js und ONNX Runtime Web. Beim ersten Besuch werden die Modellgewichte der KI im Cache deines Browsers gespeichert und stehen danach sofort bereit.',
        },
        {
          question: 'Was ist WebGPU und warum ist es so schnell?',
          answer: 'WebGPU ist ein moderner Webstandard, der deinem Browser direkten Zugriff auf die Grafikkarte (GPU) deines Computers gewährt. Dadurch laufen KI-Berechnungen bis zu 10x schneller als auf der reinen CPU.',
        },
        {
          question: 'Gibt es eine Obergrenze für Bilder pro Durchlauf?',
          answer: 'Es gibt keine künstlichen Beschränkungen. Du kannst 50, 100 oder mehr Bilder gleichzeitig einfügen, abhängig von deinem Arbeitsspeicher.',
        },
        {
          question: 'Welche Dateiformate werden unterstützt?',
          answer: 'Wir unterstützen PNG, JPG, JPEG und WebP. Die ursprüngliche Auflösung und das Seitenverhältnis bleiben vollständig erhalten.',
        },
        {
          question: 'Kann ich den Hintergrund durch Weiß oder eine Wunschfarbe ersetzen?',
          answer: 'Ja! Du kannst mit einem Klick zwischen transparentem Ausschnitt, reinem Studio-Weiß (#FFFFFF), Schwarz (#000000) oder jedem beliebigen Hex-Farbcode wählen.',
        },
        {
          question: 'Ist dieser Service wirklich kostenlos und ohne Wasserzeichen?',
          answer: 'Ja, 100% kostenlos und ohne Wasserzeichen. Da wir keine teuren Cloud-GPU-Server betreiben müssen, entstehen keine Serverkosten.',
        },
        {
          question: 'Funktioniert das Tool auch offline?',
          answer: 'Ja! Sobald das Modell beim ersten Start im Browser gespeichert wurde, kannst du das Werkzeug auch komplett ohne Internetverbindung nutzen.',
        },
      ],
    },
    footer: {
      description: 'Kostenloser, schneller und 100% lokaler Massen-Hintergrundentferner. Angetrieben von Neural-KI und WebGPU. Keine Server-Uploads, voller Datenschutz.',
      privacyGuarantee: '100% Privat: Alle Berechnungen finden auf deinem Gerät statt.',
      rights: 'Alle Rechte vorbehalten.',
      builtWith: 'Erstellt mit Astro, React, Tailwind CSS und Transformers.js',
      navigation: 'Schnellzugriff',
      languages: 'Sprachen',
    },
  },

  fr: {
    meta: {
      title: 'Suppression d’Arrière-Plan en Masse Gratuit | Détourage par Lot 100% Privé',
      description: 'Supprimez l’arrière-plan de plusieurs images à la fois gratuitement. IA 100% dans le navigateur via WebGPU/WASM. Sans limite, sans inscription et sans envoi de fichiers.',
      keywords: 'supprimer arriere plan en masse, detourer plusieurs photos a la fois, detourage local navigateur, client side ai background remover, supprimer fond image gratuit',
      ogTitle: 'Suppression d’Arrière-Plan en Lot - 100% Privé dans votre Navigateur',
      ogDescription: 'Traitez plus de 50 images en lot directement dans votre navigateur. Modèle d’IA haute précision avec accélération WebGPU. Zéro upload vers un serveur.',
    },
    nav: {
      brandName: 'Bulk BG Remover',
      features: 'Fonctionnalités',
      howItWorks: 'Comment ça marche',
      comparison: 'Comparatif',
      faq: 'FAQ',
      github: 'GitHub',
      supportDev: 'Soutenir le Développeur',
    },
    hero: {
      badge: '⚡ Propulsé par l’IA Neurale Locale & WebGPU',
      title: 'Détourez des Images en Lot en Quelques Secondes',
      titleHighlight: '100% dans Votre Navigateur',
      description: 'L’outil de suppression d’arrière-plan en masse le plus rapide et le plus sécurisé. Convertissez des dizaines d’images en PNG transparents ou fonds unis sans aucun envoi vers un serveur.',
      pillPrivacy: '100% Privé & Local',
      pillZeroUpload: 'Zéro Envoi Serveur',
      pillUnlimited: 'Gratuit & Illimité',
      pillWebgpu: 'Accéléré par WebGPU',
    },
    workspace: {
      dropzoneTitle: 'Glissez-déposez plusieurs images ici',
      dropzoneSubtitle: 'ou cliquez pour parcourir vos fichiers',
      dropzoneNote: 'Prend en charge PNG, JPG, JPEG et WebP (Traite plus de 50 images à la fois)',
      dropzoneActive: 'Relâchez les fichiers pour les ajouter à la file d’attente...',
      selectFilesBtn: 'Sélectionner des Images',
      
      toolbarTitle: 'Contrôles du Lot',
      processAllBtn: 'Traiter Toutes les Images',
      processingBtn: 'Traitement du lot en cours...',
      downloadZipBtn: 'Tout Télécharger (ZIP)',
      downloadingZipBtn: 'Création de l’archive ZIP...',
      clearAllBtn: 'Tout Effacer',
      addMoreBtn: 'Ajouter d’autres',
      totalCount: 'Total d’Images',
      completedCount: 'Terminées',
      bgColorLabel: 'Arrière-plan de sortie :',
      bgTransparent: 'Transparent',
      bgWhite: 'Blanc',
      bgBlack: 'Noir',
      bgCustom: 'Couleur Hex',
      
      modelLoading: 'Téléchargement du modèle d’IA dans le cache du navigateur...',
      modelReady: 'Moteur d’IA Prêt',
      webgpuActive: 'Accélération Matérielle WebGPU Active',
      wasmActive: 'Mode WebAssembly Actif',
      statusQueued: 'En attente',
      statusModelDownload: 'Chargement modèle',
      statusProcessing: 'Suppression du fond...',
      statusCompleted: 'Terminé',
      statusError: 'Échec',
      
      cardBefore: 'Original',
      cardAfter: 'Détouré',
      cardDownload: 'Télécharger PNG',
      cardRemove: 'Supprimer',
      cardRetry: 'Réessayer',
      sizeReduction: 'Gain',
      
      zipSuccessMsg: 'Toutes les images traitées ont été empaquetées avec succès dans un fichier ZIP !',
      noImagesMsg: 'Importez des images ci-dessus pour lancer le traitement par lot.',
      confirmClearMsg: 'Voulez-vous vraiment vider toutes les images de la file d’attente ?',

      // First-Time Model Download Banner
      modelBannerTitle: '⚡ Configuration Initiale : Téléchargement du Modèle IA',
      modelBannerSubtitle: 'Le réseau neuronal haute précision (~40 Mo) est en cours de téléchargement dans le cache de votre navigateur. Cela ne se produit qu\'une seule fois — les visites suivantes se chargent instantanément depuis le cache.',
      modelBannerCached: '✅ Modèle IA chargé depuis le cache — prêt instantanément !',
      modelBannerEstimate: 'Temps estimé : 10–30 secondes avec une connexion haut débit',
      modelBannerError: 'Le modèle n\'a pas pu être chargé. Veuillez rafraîchir la page et réessayer.',
      modelInitializing: 'Préparation du moteur IA...',
    },
    features: {
      badge: 'Atouts Clés',
      title: 'Conçu pour la Vitesse, la Confidentialité et la Masse',
      subtitle: 'Pourquoi les professionnels et créateurs choisissent notre moteur de détourage local.',
      list: [
        {
          title: '100% Confidentialité Côté Client',
          description: 'Vos photos ne quittent jamais votre appareil. Toute l’inférence du réseau neuronal s’exécute dans la mémoire locale via WebGPU et WebAssembly.',
          icon: 'shield-check',
        },
        {
          title: 'Accélération Matérielle WebGPU',
          description: 'Exploite directement la carte graphique de votre ordinateur pour un détourage ultra-rapide en une fraction de seconde.',
          icon: 'zap',
        },
        {
          title: 'Traitement Massif Réel',
          description: 'Ajoutez 10, 50 ou plus de 100 images d’un coup. La file d’attente optimisée préserve la fluidité de votre navigateur.',
          icon: 'layers',
        },
        {
          title: 'Précision de l’IA Neurale',
          description: 'L’architecture de segmentation neuronale isole fidèlement les cheveux fins, les bords complexes de produits et les détails translucides.',
          icon: 'sparkles',
        },
        {
          title: 'Sans Limites ni Filigranes',
          description: 'Aucun abonnement, aucun crédit à acheter et aucun filigrane ajouté. Exportations gratuites et illimitées pour toujours.',
          icon: 'check-circle-2',
        },
        {
          title: 'Export ZIP en 1 Clic',
          description: 'Gagnez un temps précieux. Téléchargez tout votre lot d’images détourées dans une seule archive ZIP bien organisée.',
          icon: 'archive',
        },
      ],
    },
    howItWorks: {
      badge: 'Processus Simple en 4 Étapes',
      title: 'Comment Détourer des Images en Masse',
      subtitle: 'Optimisez votre flux de travail e-commerce, photographie et design en quelques secondes.',
      steps: [
        {
          number: '01',
          title: 'Importez vos Images',
          description: 'Glissez-déposez vos photos de produits ou portraits dans l’espace de travail. Formats PNG, JPG et WebP acceptés.',
        },
        {
          number: '02',
          title: 'L’IA Supprime le Fond Localement',
          description: 'Cliquez sur "Traiter Toutes les Images" pour exécuter le modèle d’IA sur votre machine avec prévisualisation en direct.',
        },
        {
          number: '03',
          title: 'Personnalisez le Fond',
          description: 'Conservez un fond transparent ou appliquez un fond blanc studio pour l’e-commerce, noir ou une couleur personnalisée.',
        },
        {
          number: '04',
          title: 'Téléchargez en ZIP',
          description: 'Téléchargez les images individuellement ou cliquez sur "Tout Télécharger (ZIP)" pour récupérer le lot complet instantanément.',
        },
      ],
    },
    comparison: {
      badge: 'Comparatif Technique',
      title: 'IA dans le Navigateur vs. Outils Cloud',
      subtitle: 'Découvrez pourquoi l’IA locale est supérieure en vitesse, sécurité et économies.',
      headers: {
        feature: 'Fonctionnalité / Caractéristique',
        ourTool: 'Bulk BG Remover (Local)',
        cloudTools: 'Outils Cloud Traditionnels',
      },
      rows: [
        {
          feature: 'Confidentialité des Données',
          ourTool: '100% Privé (Aucun octet ne quitte votre ordinateur)',
          cloudTools: 'Images téléversées et stockées sur des serveurs distants',
        },
        {
          feature: 'Tarifs et Limites d’Usage',
          ourTool: '100% Gratuit et Illimité pour toujours',
          cloudTools: 'Abonnements coûteux par crédits (0,20 € à 1,00 € par image)',
        },
        {
          feature: 'Inscription Obligatoire',
          ourTool: 'Aucun compte ni clé API nécessaires',
          cloudTools: 'Création de compte et carte bancaire obligatoires',
        },
        {
          feature: 'Traitement par Lot',
          ourTool: 'Plus de 50 images à la fois avec export ZIP',
          cloudTools: 'Souvent bridé ou payant dans les formules gratuites',
        },
        {
          feature: 'Consommation Bande Passante',
          ourTool: 'Traitement instantané en mémoire (0 Mo téléversé)',
          cloudTools: 'Nécessite d’uploader des gigaoctets de fichiers',
        },
        {
          feature: 'Utilisation Hors-Ligne',
          ourTool: 'Fonctionne hors-ligne après le premier chargement',
          cloudTools: 'Totalement inutilisable sans connexion internet active',
        },
      ],
    },
    seoContent: {
      title: 'Le Nouveau Standard pour le Détourage d’Images en Masse',
      subtitle: 'Pourquoi l’intelligence artificielle sur l’appareil supplante les anciens services cloud.',
      p1: 'Détourer des centaines d’images de produits a toujours été une corvée coûteuse pour les e-commerçants (Amazon, Shopify, Cdiscount), les créateurs de contenu et les photographes. Les outils cloud classiques imposent l’envoi de photos confidentielles sur des serveurs distants, avec des abonnements onéreux.',
      p2: 'Bulk BG Remover révolutionne ce processus en exécutant le modèle de pointe **High-Precision ISNet Neural Network** directement dans votre navigateur web grâce à WebGPU et WebAssembly. Une fois en mémoire cache, le modèle traite vos images haute résolution avec toute la puissance de votre propre matériel.',
      p3Title: 'Idéal pour le E-Commerce, les Catalogues et la Création Graphique',
      p3: 'Que vous ayez besoin de fonds blancs immaculés pour vos fiches produits, de fichiers PNG transparents pour vos montages Canva ou de préparer des milliers de photos, notre outil par lot accomplit des heures de retouche en quelques minutes.',
    },
    faq: {
      badge: 'Foire Aux Questions',
      title: 'Tout ce que Vous Devez Savoir',
      subtitle: 'Des questions sur notre outil de détourage local ? Voici toutes les réponses.',
      items: [
        {
          question: 'Mes images sont-elles vraiment 100% privées et sécurisées ?',
          answer: 'Oui, absolument. Contrairement aux autres sites, Bulk BG Remover ne téléverse jamais vos photos sur des serveurs externes. Tout le traitement se déroule strictement dans le bac à sable local de votre navigateur.',
        },
        {
          question: 'Comment l’IA fonctionne-t-elle sans serveur distant ?',
          answer: 'Nous utilisons Transformers.js et ONNX Runtime Web. Lors de votre première visite, le modèle d’IA est stocké dans le cache de votre navigateur pour une utilisation instantanée par la suite.',
        },
        {
          question: 'Qu’est-ce que WebGPU et comment accélère-t-il le rendu ?',
          answer: 'WebGPU est un standard web moderne permettant aux pages d’accéder directement à la carte graphique (GPU) de votre appareil, accélérant l’IA jusqu’à 10 fois par rapport au processeur CPU.',
        },
        {
          question: 'Y a-t-il une limite au nombre d’images par lot ?',
          answer: 'Il n’y a aucune limite artificielle. Vous pouvez glisser 50, 100 images ou plus selon la mémoire vive de votre machine.',
        },
        {
          question: 'Quels formats et résolutions d’images sont supportés ?',
          answer: 'Nous prenons en charge PNG, JPG, JPEG et WebP. La résolution et les dimensions d’origine de vos images sont rigoureusement préservées.',
        },
        {
          question: 'Puis-je remplacer l’arrière-plan par du blanc ou une autre couleur ?',
          answer: 'Oui ! Vous pouvez basculer d’un clic entre un détourage transparent, un blanc studio (#FFFFFF), un noir profond (#000000) ou n’importe quelle couleur hexadécimale.',
        },
        {
          question: 'Ce service est-il vraiment gratuit et sans filigrane ?',
          answer: 'Oui, 100% gratuit et sans aucun filigrane. Comme nous n’avons pas de frais de serveurs GPU distants, nous offrons l’outil sans aucun frais caché.',
        },
        {
          question: 'L’outil fonctionne-t-il hors-ligne ?',
          answer: 'Oui ! Une fois le modèle téléchargé lors de la première utilisation, vous pouvez détourer des images sans aucune connexion internet.',
        },
      ],
    },
    footer: {
      description: 'Suppression d’arrière-plan en masse gratuite, rapide et 100% locale. Propulsé par l’IA Neurale et WebGPU. Zéro envoi serveur, confidentialité absolue.',
      privacyGuarantee: '100% Privé : Tous les calculs s’effectuent sur votre appareil.',
      rights: 'Tous droits réservés.',
      builtWith: 'Conçu avec Astro, React, Tailwind CSS et Transformers.js',
      navigation: 'Accès Rapide',
      languages: 'Langues',
    },
  },

  ja: {
    meta: {
      title: '無料 一括画像背景透過ツール | 複数画像をまとめて背景削除 100% 完全プライベート',
      description: '複数の画像から背景を一括で無料削除。WebGPU/WASMによる100%ブラウザ内ローカルAI処理。画像はサーバーへ一切送信されず、完全無料で枚数無制限。',
      keywords: '一括背景透過, 背景削除 まとめて, 画像切り抜き 一括, ブラウザ内AI 背景透過, client side ai background remover, 無料 png 背景透明化',
      ogTitle: '一括画像背景透過ツール - 100% 完全プライベート・ブラウザ内高速処理',
      ogDescription: '50枚以上の画像をブラウザ内でまとめて一括処理。高精度AIモデルとWebGPU加速によりサーバー送信ゼロで安全に背景削除。',
    },
    nav: {
      brandName: 'Bulk BG Remover',
      features: '特徴',
      howItWorks: '使い方',
      comparison: '比較',
      faq: 'よくある質問',
      github: 'GitHub',
      supportDev: '開発者を応援',
    },
    hero: {
      badge: '⚡ クライアント側 ニューラルAI & WebGPU 高速エンジン搭載',
      title: '複数画像の背景を一括で瞬時に削除',
      titleHighlight: '100% ブラウザ内完結',
      description: '最も高速でプライバシーが守られる一括背景透過ツール。サーバーへの画像アップロード一切なしで、何十枚もの画像を瞬時に透明PNGや指定の単色背景へ変換します。',
      pillPrivacy: '100% 完全ローカル処理',
      pillZeroUpload: 'サーバー送信ゼロ',
      pillUnlimited: '完全無料・枚数無制限',
      pillWebgpu: 'WebGPU ハードウェア加速',
    },
    workspace: {
      dropzoneTitle: 'ここに複数の画像をドラッグ＆ドロップ',
      dropzoneSubtitle: 'またはクリックしてパソコンからファイルを選択',
      dropzoneNote: 'PNG, JPG, JPEG, WebP に対応（一度に50枚以上の一括処理に対応）',
      dropzoneActive: 'ファイルをドロップしてキューに追加...',
      selectFilesBtn: '画像を選択',
      
      toolbarTitle: '一括操作パネル',
      processAllBtn: 'すべての画像を一括処理',
      processingBtn: '一括処理中...',
      downloadZipBtn: 'すべて一括保存 (ZIP)',
      downloadingZipBtn: 'ZIPファイルを作成中...',
      clearAllBtn: 'すべて消去',
      addMoreBtn: '画像を追加',
      totalCount: '総画像数',
      completedCount: '処理完了',
      bgColorLabel: '出力背景:',
      bgTransparent: '透明 (PNG)',
      bgWhite: '白 (EC向け)',
      bgBlack: '黒',
      bgCustom: 'カスタム色',
      
      modelLoading: 'AIモデルをブラウザキャッシュにダウンロード中...',
      modelReady: 'AIエンジン準備完了',
      webgpuActive: 'WebGPU ハードウェアアクセラレーション有効',
      wasmActive: 'WebAssembly フォールバックモード有効',
      statusQueued: '待機中',
      statusModelDownload: 'モデル取得中',
      statusProcessing: '背景を削除中...',
      statusCompleted: '完了',
      statusError: 'エラー',
      
      cardBefore: '元画像',
      cardAfter: '透過後',
      cardDownload: 'PNG保存',
      cardRemove: '削除',
      cardRetry: '再試行',
      sizeReduction: '削減',
      
      zipSuccessMsg: '処理済みのすべての画像が正常にZIPアーカイブにまとめられました！',
      noImagesMsg: '上記エリアに画像をアップロードして一括処理を開始してください。',
      confirmClearMsg: 'キュー内のすべての画像を削除してもよろしいですか？',

      // First-Time Model Download Banner
      modelBannerTitle: '⚡ 初回セットアップ：AIモデルをダウンロード中',
      modelBannerSubtitle: '高精度ニューラルネットワーク（約40 MB）をブラウザキャッシュにダウンロードしています。これは一度だけ行われ、以降の訪問ではキャッシュから即座に読み込まれます。',
      modelBannerCached: '✅ AIモデルがキャッシュから読み込まれました — すぐに使用可能！',
      modelBannerEstimate: '推定時間：ブロードバンドで10〜30秒',
      modelBannerError: 'モデルの読み込みに失敗しました。ページを更新してもう一度お試しください。',
      modelInitializing: 'AIエンジンを準備中...',
    },
    features: {
      badge: '主な機能と強み',
      title: '圧倒的な処理速度・プライバシー・大量処理へのこだわり',
      subtitle: 'EC事業者やクリエイターが当ツールのローカル背景削除を選ぶ理由。',
      list: [
        {
          title: '100% クライアント側プライバシー',
          description: '画像はお使いの端末から一切外に出ません。WebGPUとWebAssemblyにより、AIの推論処理はすべてブラウザメモリ内で完結します。',
          icon: 'shield-check',
        },
        {
          title: 'WebGPU ハードウェア高速化',
          description: '端末のグラフィックカード（GPU）を直接活用し、1枚あたりわずかコンマ数秒という超高速な切り抜きを実現します。',
          icon: 'zap',
        },
        {
          title: '本格的な大容量一括処理',
          description: '10枚、50枚、100枚以上の画像を一括ドロップ可能。最適化されたキュー処理によりブラウザが固まることなく快適に動作します。',
          icon: 'layers',
        },
        {
          title: '超高精度ニューラルAI',
          description: '最先端のディープラーニング・セグメンテーションが、髪の毛の細部や複雑な商品のエッジ、半透明部分まで精密に切り抜きます。',
          icon: 'sparkles',
        },
        {
          title: '完全無料・透かしロゴなし',
          description: '有料課金やクレジット制限、透かし（ウォーターマーク）の付加は一切ありません。いつでも何度でも無料でエクスポート可能です。',
          icon: 'check-circle-2',
        },
        {
          title: 'ワンクリック ZIP 一括保存',
          description: '1枚ずつ保存する手間を解消。背景を切り抜いたすべての画像を整理されたファイル名で1つのZIPにまとめて即座にダウンロードできます。',
          icon: 'archive',
        },
      ],
    },
    howItWorks: {
      badge: 'かんたん4ステップ',
      title: '一括背景削除の使い方',
      subtitle: 'EC商品写真やデザイン素材の加工作業をわずか数秒で効率化します。',
      steps: [
        {
          number: '01',
          title: '画像をまとめて追加',
          description: '商品写真やポートレート写真をワークスペースにドラッグ＆ドロップします。PNG、JPG、WebP形式に対応。',
        },
        {
          number: '02',
          title: 'AIがローカルで背景を切り抜き',
          description: '「すべての画像を一括処理」をクリックすると、高精度AIモデルが端末上で動作し、リアルタイムでプレビューが生成されます。',
        },
        {
          number: '03',
          title: '背景色をカスタマイズ',
          description: '透明な切り抜き画像のままにするか、ECモール用の純白背景、黒背景、またはお好みのカラーコードへ一括変更できます。',
        },
        {
          number: '04',
          title: 'ZIPで一括ダウンロード',
          description: '個別にPNG保存するか、「すべて一括保存 (ZIP)」をクリックして全画像をまとめたZIPファイルを即座に入手します。',
        },
      ],
    },
    comparison: {
      badge: '技術比較',
      title: 'ブラウザ内ローカルAI vs クラウド型サービス',
      subtitle: 'なぜローカルAIが処理速度・安全性・コストにおいて圧倒的に優れているのか。',
      headers: {
        feature: '機能・項目',
        ourTool: 'Bulk BG Remover (端末内処理)',
        cloudTools: '一般的なクラウド型背景透過サービス',
      },
      rows: [
        {
          feature: 'データプライバシーと機密性',
          ourTool: '100% 完全保護（1バイトも外部送信されません）',
          cloudTools: '画像が外部サーバーへアップロード・保存される',
        },
        {
          feature: '料金と利用制限',
          ourTool: '永久に完全無料・枚数無制限',
          cloudTools: '高額な月額課金やクレジット制（1枚あたり30円〜150円）',
        },
        {
          feature: '会員登録・APIキー',
          ourTool: '会員登録やログイン、APIキー不要',
          cloudTools: 'アカウント作成やクレジットカード情報の登録が必須',
        },
        {
          feature: '一括バッチ処理',
          ourTool: '50枚以上の一括処理＆ZIP一括保存に対応',
          cloudTools: '無料枠では1枚ずつに制限されることが多い',
        },
        {
          feature: '通信量とアップロード待ち',
          ourTool: '端末内メモリで即時処理（通信量 0MB）',
          cloudTools: '大量の高解像度画像を毎回アップロードする必要あり',
        },
        {
          feature: 'オフライン利用',
          ourTool: '初回モデル読込後は完全オフラインでも利用可能',
          cloudTools: 'インターネット接続がないと全く利用できない',
        },
      ],
    },
    seoContent: {
      title: '複数画像の一括背景削除における新スタンダード',
      subtitle: 'なぜ端末上でのエッジAI処理が従来のクラウドサービスに取って代わるのか。',
      p1: 'Amazon、楽天市場、Yahoo!ショッピング、メルカリなどのEC出店者やデザイナーにとって、大量の商品画像の背景切り抜きは大きな負担でした。従来のクラウドサービスでは、機密性の高い新商品写真や個人写真を外部サーバーに送信しなければならず、利用料金やセキュリティ上の懸念が常に付きまとっていました。',
      p2: 'Bulk BG Remover は、WebGPU と WebAssembly 技術を活用して最先端の **High-Precision ISNet Neural Network** ディープラーニングモデルをブラウザ内で直接実行することで、この課題を根本から解決しました。一度ブラウザにキャッシュされたAIモデルは、お使いの端末のCPU/GPU性能をフルに活用して高解像度画像をローカル処理します。',
      p3Title: 'EC商品写真・ポートレート・デザイン制作に最適',
      p3: 'ECモール出品に必要な純白背景の作成から、SNSバナー用の透過PNG素材の作成まで、あらゆる作業をブラウザ上で安全かつ瞬時に完了できます。ワンクリックでのZIP一括書き出しにも対応しており、何時間もかかっていた作業を数分で終わらせることができます。',
    },
    faq: {
      badge: 'よくあるご質問',
      title: 'よくあるご質問と回答',
      subtitle: 'ブラウザ内AI背景透過ツールに関する疑問にお答えします。',
      items: [
        {
          question: '画像は本当に外部に送信されず安全ですか？',
          answer: 'はい、完全に安全です。従来の背景透過サービスとは異なり、当ツールはお客様の画像を外部サーバーへ一切アップロードしません。AIによる推論と描画処理はすべてお使いのブラウザ内（ローカル環境）で完結します。',
        },
        {
          question: 'サーバーなしでどうやってAI背景透過を行っているのですか？',
          answer: 'WebGPUおよびWebAssemblyを活用した最新のディープラーニングエンジンを使用しています。初回アクセス時に高精度AIモデルデータがブラウザのキャッシュ（IndexedDB）に保存され、2回目以降はオフラインでも即座にモデルが起動します。',
        },
        {
          question: 'WebGPUとは何ですか？どのようなメリットがありますか？',
          answer: 'WebGPUは、ブラウザがパソコンやスマートフォンのGPU（グラフィックカード）に直接アクセスして超高速計算を行うための最新Web標準規格です。従来のCPU処理に比べ最大10倍の高速化を実現します。',
        },
        {
          question: '一度に処理できる画像枚数に制限はありますか？',
          answer: '人工的な制限は一切設けていません。お使いの端末のメモリ容量が許す限り、50枚、100枚以上の画像を一括でキューに追加して処理できます。',
        },
        {
          question: '対応している画像フォーマットや解像度は？',
          answer: 'PNG、JPG、JPEG、WebP形式に対応しています。AIモデルは高解像度写真に対応しており、元の画像サイズとアスペクト比を維持したまま出力されます。',
        },
        {
          question: '背景を白や指定のカラーに変更できますか？',
          answer: 'はい、可能です！透過PNGのほか、EC出品用の純白（#FFFFFF）、黒（#000000）、またはカラーピッカーでお好みのカラーコードを指定して一括合成できます。',
        },
        {
          question: '本当に完全無料で透かし（ロゴ）は入りませんか？',
          answer: 'はい、100%完全無料でウォーターマーク（透かし）も一切入りません。サーバー運用コストが不要なクライアント完結型アーキテクチャのため、無料提供が実現しています。',
        },
        {
          question: 'オフラインでも使用できますか？',
          answer: 'はい！初回アクセス時にAIモデルがブラウザに保存された後は、インターネット接続が切れたオフライン状態でも背景透過処理を行えます。',
        },
      ],
    },
    footer: {
      description: '高速・無料・100%クライアント側の完全プライベート一括背景透過ツール。ニューラルAIとWebGPU搭載。サーバー送信ゼロで安心。',
      privacyGuarantee: '100% プライベート: すべての処理はお客様の端末上で実行されます。',
      rights: 'All rights reserved.',
      builtWith: 'Astro, React, Tailwind CSS & Transformers.js で構築',
      navigation: 'クイックリンク',
      languages: '言語',
    },
  },
} as const;
