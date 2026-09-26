export interface PracticalSolution {
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  iconType: 'database' | 'whatsapp' | 'shield' | 'zap' | 'chart' | 'code' | 'mobile' | 'ai' | 'design' | 'cloud';
}

export interface TechItem {
  name: string;
  category: string;
  icon?: string;
  highlight?: string;
}

export interface ServiceFAQ {
  questionEs: string;
  questionEn: string;
  answerEs: string;
  answerEn: string;
}

export interface ServiceDetail {
  slug: string;
  titleEs: string;
  titleEn: string;
  heroBadgeEs: string;
  heroBadgeEn: string;
  taglineEs: string;
  taglineEn: string;
  shortDescEs: string;
  shortDescEn: string;
  longDescEs: string;
  longDescEn: string;
  colorVar: string;
  accentColor: string;
  accentColorLight: string;
  /** Ilustración isométrica del hero (fondo transparente). Opcional mientras
   * se genera una por servicio — sin ella el hero cae a una sola columna. */
  heroImageUrl?: string;
  glowColor: string;
  practicalSolutions: PracticalSolution[];
  whoIsItForEs: string[];
  whoIsItForEn: string[];
  deliverablesEs: string[];
  deliverablesEn: string[];
  techStack: TechItem[];
  faqs: ServiceFAQ[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: 'software-empresarial',
    titleEs: 'Software Empresarial y Modernización de Sistemas',
    titleEn: 'Enterprise Software & Legacy Modernization',
    heroBadgeEs: 'Sistemas a Medida · ERPs · Modernización de Legado',
    heroBadgeEn: 'Custom Systems · ERPs · Legacy Modernization',
    taglineEs: 'Digitaliza y centraliza la operación de tu empresa, o moderniza el sistema que ya tienes sin perder un solo registro.',
    taglineEn: 'Digitize and centralize your operations, or modernize the system you already have without losing a single record.',
    shortDescEs: 'Digitalización de operaciones, ERPs y CRMs a medida, y modernización de sistemas viejos sin perder tus datos históricos.',
    shortDescEn: 'Custom operation digitization, ERPs and CRMs, plus legacy system modernization without losing your historical data.',
    longDescEs: 'Diseñamos plataformas que reemplazan hojas de Excel dispersas y centralizan tu operación en un solo lugar. Si ya tienes un sistema —incluso de un proveedor que ya no existe— lo auditamos, modernizamos o reemplazamos sin detener tu operación ni un solo día.',
    longDescEn: "We design platforms that replace scattered spreadsheets and centralize your operation in one place. If you already have a system — even one from a vendor that no longer exists — we audit, modernize, or replace it without stopping your operation for a single day.",
    colorVar: '--svc-systems',
    accentColor: '#4ade80',
    accentColorLight: '#15803d',
    glowColor: 'rgba(74, 222, 128, 0.25)',
    heroImageUrl: '/services/software-empresarial-hero.webp',
    practicalSolutions: [
      {
        titleEs: 'Migración de Excel a Sistema Propio',
        titleEn: 'Excel Migration to Custom Software',
        descriptionEs: 'Pasamos tus hojas de cálculo desordenadas a una base de datos segura y centralizada. Todo tu equipo trabaja en tiempo real sin duplicar información ni perder registros.',
        descriptionEn: 'We migrate your messy spreadsheets into a secure, centralized database. Your entire team works in real time without data duplication or lost records.',
        iconType: 'database',
      },
      {
        titleEs: 'Control Total de Operaciones (ERP a Medida)',
        titleEn: 'Total Operations Control (Custom ERP)',
        descriptionEs: 'Gestión integrada de inventarios, compras, cotizaciones, proveedores, facturación y finanzas en una sola pantalla adaptada a tus reglas de negocio.',
        descriptionEn: 'Integrated management of inventory, purchasing, quotes, suppliers, invoicing, and finance on a single screen adapted to your business rules.',
        iconType: 'chart',
      },
      {
        titleEs: 'Control de Permisos y Roles por Empleado',
        titleEn: 'Role-Based Permissions & Employee Access',
        descriptionEs: 'Tú decides qué puede ver y editar cada usuario. El vendedor ve sus prospectos, el almacenista su stock y el contador las facturas, con registro de auditoría.',
        descriptionEn: 'You decide what each user can view and edit. Sales reps see leads, warehouse staff manage stock, and accountants access invoices with full audit logs.',
        iconType: 'shield',
      },
      {
        titleEs: 'Acceso en la Nube desde Celular y PC',
        titleEn: 'Cloud Access from Mobile and Desktop',
        descriptionEs: 'Tu sistema disponible 24/7 de forma segura desde la oficina, desde casa o en la calle con respaldos automáticos diarios.',
        descriptionEn: 'Your system is available 24/7 securely from the office, home, or on the go with daily automated backups.',
        iconType: 'cloud',
      },
      {
        titleEs: 'Modernización de Sistemas Heredados',
        titleEn: 'Legacy System Modernization',
        descriptionEs: 'Rescatamos y reconstruimos en tecnología actual el sistema que nadie se atreve a tocar, sin interrumpir tu operación.',
        descriptionEn: 'We rescue and rebuild on modern technology the system nobody dares touch, without interrupting your operation.',
        iconType: 'code',
      },
    ],
    whoIsItForEs: [
      'Empresas que dependen de decenas de archivos de Excel que se desincronizan o se corrompen.',
      'Negocios que pagan licencias mensuales abusivas por software rígido que no se adapta a sus procesos.',
      'Equipos en crecimiento que necesitan control de stock, compras y facturación sin errores manuales.',
      'Directivos que necesitan reportes consolidados y métricas en tiempo real sin esperar cierres mensuales.',
      'Negocios con un sistema construido por un proveedor que ya no existe o que no da soporte.',
    ],
    whoIsItForEn: [
      'Companies relying on dozens of out-of-sync or corrupt-prone Excel files.',
      'Businesses paying excessive monthly fees for rigid software that does not fit their workflow.',
      'Growing teams that need accurate inventory, purchasing, and billing control without manual errors.',
      'Executives needing consolidated real-time reporting without waiting for end-of-month reviews.',
      'Businesses running software built by a vendor that no longer exists or offers no support.',
    ],
    deliverablesEs: [
      'Código fuente 100% de tu propiedad sin licencias recurrentes ocultas.',
      'Base de datos relacional optimizada con backups automáticos diarios.',
      'Panel administrativo web responsivo y de alta velocidad.',
      'Documentación técnica y capacitación para tu equipo de trabajo.',
      'Garantía de soporte técnico post-lanzamiento.',
      'Migración completa de catálogos y movimientos desde tu sistema anterior.',
    ],
    deliverablesEn: [
      '100% proprietary source code with zero hidden recurring license fees.',
      'Optimized relational database with automated daily backups.',
      'Responsive, high-speed web administration backoffice.',
      'Technical documentation and team training sessions.',
      'Post-launch warranty and technical support.',
      'Full migration of catalogs and transaction history from your previous system.',
    ],
    techStack: [
      { name: 'Node.js / Express', category: 'Backend', highlight: 'APIs rápidas y concurrentes' },
      { name: 'Python / FastAPI', category: 'Backend', highlight: 'Procesamiento robusto' },
      { name: 'PostgreSQL', category: 'Base de Datos', highlight: 'Integridad transaccional SQL' },
      { name: 'MySQL / MariaDB', category: 'Base de Datos', highlight: 'Estructuras relacionales' },
      { name: 'MongoDB', category: 'Base de Datos', highlight: 'Documentos flexibles' },
      { name: 'Docker', category: 'Infraestructura', highlight: 'Contenedores portables' },
      { name: 'Redis', category: 'Rendimiento', highlight: 'Caché en memoria ultrarrápido' },
      { name: 'Supabase', category: 'Cloud Database', highlight: 'Auth y tiempo real' },
    ],
    faqs: [
      {
        questionEs: '¿Podemos migrar los datos que ya tenemos en Excel o en otro software viejo?',
        questionEn: 'Can we migrate the data we already have in Excel or legacy software?',
        answerEs: 'Sí, absolutamente. Realizamos un proceso de extracción, limpieza y migración completa de tus datos históricos para que no pierdas ningún registro de clientes, ventas o inventarios.',
        answerEn: 'Yes, absolutely. We perform a full extraction, cleanup, and migration of your historical data so you never lose customer, sales, or inventory records.',
      },
      {
        questionEs: '¿Quién es el dueño del software y la base de datos?',
        questionEn: 'Who owns the software and the database?',
        answerEs: 'El código, la base de datos y toda la infraestructura son 100% propiedad de tu empresa desde el primer día. No aplicamos ningún tipo de vendor lock-in ni cobramos licencias por usuario.',
        answerEn: 'The source code, database, and infrastructure are 100% owned by your company from day one. We never apply vendor lock-in or charge per-seat fees.',
      },
      {
        questionEs: '¿Cuánto tiempo tarda en implementarse un sistema empresarial?',
        questionEn: 'How long does it take to implement an enterprise system?',
        answerEs: 'Dependiendo del alcance, un MVP funcional o primer módulo suele entregarse entre 4 y 8 semanas, con demos quincenales para que puedas ir probándolo en tu operación.',
        answerEn: 'Depending on scope, a functional MVP or first module is typically delivered in 4 to 8 weeks, with demos every two weeks for hands-on validation.',
      },
    ],
  },
  {
    slug: 'inteligencia-artificial',
    titleEs: 'Implementación de IA a tu Negocio',
    titleEn: 'AI Implementation for Business',
    heroBadgeEs: 'Modelos de Lenguaje · RAG · Automatización Cognitiva',
    heroBadgeEn: 'LLMs · RAG · Cognitive Automation',
    taglineEs: 'Pon la inteligencia artificial a trabajar en tu empresa para automatizar tareas complejas y atender clientes 24/7.',
    taglineEn: 'Put artificial intelligence to work in your business to automate complex tasks and serve customers 24/7.',
    shortDescEs: 'Asistentes inteligentes, lectura automática de documentos y automatización con IA basada en tus datos reales.',
    shortDescEn: 'Intelligent assistants, automated document reading, and custom AI automation grounded in your actual data.',
    longDescEs: 'Integramos modelos de lenguaje de última generación (OpenAI, Claude, DeepSeek) y modelos privados entrenados con los manuales, catálogos y políticas de tu empresa. Respuestas precisas basadas en tus documentos, extracción automática de datos de facturas o contratos, y visión por computadora.',
    longDescEn: 'We integrate cutting-edge language models (OpenAI, Claude, DeepSeek) and private models grounded on your company manuals, catalogs, and policies. Accurate answers grounded in your documents, automated data extraction, and computer vision.',
    colorVar: '--svc-cloud',
    accentColor: '#a855f7',
    accentColorLight: '#7e22ce',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Atención al Cliente Inteligente 24/7 (RAG)',
        titleEn: '24/7 Smart Customer Support (RAG)',
        descriptionEs: 'Asistentes que responden preguntas frecuentes, cotizan y guían a tus clientes basándose únicamente en la información oficial de tu empresa, sin inventar datos.',
        descriptionEn: 'Assistants that answer questions, provide quotes, and guide customers strictly based on your company official knowledge, without making up data.',
        iconType: 'ai',
      },
      {
        titleEs: 'Lectura Automática de Facturas y Documentos',
        titleEn: 'Automated Invoice & Document Extraction',
        descriptionEs: 'El sistema lee PDFs, contratos, tickets o facturas y extrae automáticamente montos, fechas, nombres e ítems para cargarlos a tu sistema sin tipeo manual.',
        descriptionEn: 'The system reads PDFs, contracts, receipts, or invoices, automatically extracting amounts, dates, names, and items into your system with zero manual typing.',
        iconType: 'zap',
      },
      {
        titleEs: 'Transcripción de Audios y Resúmenes de Llamadas',
        titleEn: 'Audio Transcription & Call Summaries',
        descriptionEs: 'Procesamiento de notas de voz de clientes o grabaciones de reuniones para convertirlas en texto estructurado, acuerdos clave y tareas asignadas.',
        descriptionEn: 'Processing voice notes or meeting recordings into structured text, actionable takeaways, and assigned tasks.',
        iconType: 'code',
      },
      {
        titleEs: 'Visión por Computadora y Control Visual',
        titleEn: 'Computer Vision & Visual Quality Control',
        descriptionEs: 'Análisis visual en tiempo real para detección de objetos, control de calidad en productos físicos o reconocimiento de patrones en imágenes y video.',
        descriptionEn: 'Real-time visual analysis for object detection, physical product quality control, or pattern recognition in images and video.',
        iconType: 'chart',
      },
    ],
    whoIsItForEs: [
      'Empresas con equipos saturados de responder las mismas preguntas de clientes todo el día.',
      'Equipos contables o administrativos que pierden horas tipeando datos de facturas y recibos.',
      'Negocios que quieren dar atención inmediata y personalizada las 24 horas del día por web o WhatsApp.',
      'Operaciones que necesitan procesar grandes volúmenes de texto, audio o imágenes con precisión.',
    ],
    whoIsItForEn: [
      'Companies with support teams overwhelmed by answering the same repetitive customer queries.',
      'Accounting or administrative teams spending hours manually typing invoice and receipt data.',
      'Businesses wanting immediate, personalized 24/7 assistance via web or WhatsApp.',
      'Operations requiring fast, accurate processing of large volumes of text, audio, or images.',
    ],
    deliverablesEs: [
      'Pipeline RAG configurado con tus documentos y base vectorial privada.',
      'Integración con tu WhatsApp, página web o software interno mediante API.',
      'Panel de control para monitorear conversaciones, costos y precisión de las respuestas.',
      'Modelos locales o en la nube cumpliendo con la confidencialidad de tus datos.',
      'Garantía de calibración y ajustes continuos.',
    ],
    deliverablesEn: [
      'Custom RAG pipeline configured with your documents and private vector database.',
      'Seamless API integration with WhatsApp, your website, or internal software.',
      'Monitoring dashboard to track conversations, token costs, and accuracy.',
      'Local or cloud deployments ensuring complete data confidentiality.',
      'Calibration warranty and ongoing tuning.',
    ],
    techStack: [
      { name: 'OpenAI API (GPT-4o / Whisper)', category: 'Modelos Fundacionales', highlight: 'LLM & Audio' },
      { name: 'Claude API (Anthropic)', category: 'Razonamiento', highlight: 'Análisis de documentos extensos' },
      { name: 'Python (LangChain / LlamaIndex)', category: 'Frameworks IA', highlight: 'Orquestación RAG' },
      { name: 'pgvector / Pinecone / ChromaDB', category: 'Bases Vectoriales', highlight: 'Búsqueda semántica' },
      { name: 'OpenCV', category: 'Computer Vision', highlight: 'Procesamiento de imágenes' },
      { name: 'Ollama / Llama 3', category: 'Modelos Locales', highlight: 'Privacidad on-premise' },
      { name: 'HuggingFace', category: 'Modelos Abiertos', highlight: 'Embeddings optimizados' },
    ],
    faqs: [
      {
        questionEs: '¿La IA puede inventar respuestas falsas (alucinar)?',
        questionEn: 'Can the AI invent false information (hallucinate)?',
        answerEs: 'No en nuestra implementación. Utilizamos arquitectura RAG (Retrieval-Augmented Generation), lo que obliga al modelo a responder únicamente basándose en los documentos que tú le proporcionas, indicando la fuente o derivando a un humano si no tiene el dato.',
        answerEn: 'Not in our architecture. We implement RAG (Retrieval-Augmented Generation), forcing the model to answer exclusively based on your official documentation and escalating to a human when uncertain.',
      },
      {
        questionEs: '¿Mis datos confidenciales se comparten públicamente con OpenAI?',
        questionEn: 'Is my confidential business data shared publicly with OpenAI?',
        answerEs: 'No. Configuramos conexiones empresariales que garantizan por contrato que tus datos no se usan para entrenar modelos públicos. Si tu política es estricta, podemos montar modelos locales en tu propio servidor.',
        answerEn: 'No. We configure enterprise endpoints where terms explicitly prevent your data from being used for public training. For strict compliance, we can deploy on-premise local models.',
      },
    ],
  },
  {
    slug: 'desarrollo-web-movil',
    titleEs: 'Desarrollo Web, Apps Móviles y Venta en Línea',
    titleEn: 'Web, Mobile Apps & Online Selling',
    heroBadgeEs: 'Tiendas en Línea · Apps iOS / Android · SaaS',
    heroBadgeEn: 'Online Stores · iOS / Android Apps · SaaS',
    taglineEs: 'Aplicaciones móviles y plataformas web de carga ultrarrápida, con tienda en línea integrada para que cada visita se convierta en una venta.',
    taglineEn: 'High-speed web platforms and mobile applications, with a built-in online store so every visit can become a sale.',
    shortDescEs: 'Sitios web de alto rendimiento, tiendas en línea, plataformas SaaS y aplicaciones móviles nativas o cross-platform en Flutter y React.',
    shortDescEn: 'High-performance websites, online stores, SaaS platforms, and native or cross-platform mobile apps in Flutter and React.',
    longDescEs: 'Construimos experiencias digitales modernas, desde landing pages que convierten visitantes en clientes hasta tiendas en línea completas, plataformas web complejas (SaaS) y aplicaciones móviles en iOS y Android con una sola base de código optimizada.',
    longDescEn: 'We build modern digital experiences, ranging from high-conversion landing pages to complete online stores, full SaaS platforms, and mobile apps on iOS and Android with single-codebase efficiency.',
    colorVar: '--svc-web',
    accentColor: '#00e5ff',
    // #0284c7 (sky-600) measured 3.82:1 on --bg light (#F5F7FA) — below the
    // 4.5:1 floor for small text. #0369a1 (sky-700) gives 5.53:1.
    accentColorLight: '#0369a1',
    glowColor: 'rgba(0, 229, 255, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Páginas Web Rápidas y Vendedoras',
        titleEn: 'Fast, High-Converting Websites',
        descriptionEs: 'Sitios corporativos que cargan en menos de 1 segundo en celulares y computadoras, con diseño profesional que genera confianza y optimizado para posicionar en Google (SEO).',
        descriptionEn: 'Corporate websites loading in under 1 second across devices, crafted with modern aesthetics that build trust and rank high on Google (SEO).',
        iconType: 'code',
      },
      {
        titleEs: 'Aplicaciones Móviles (iOS y Android)',
        titleEn: 'Mobile Applications (iOS & Android)',
        descriptionEs: 'Apps para tus clientes o tu equipo en la calle con notificaciones push, funcionamiento offline, cámara, geolocalización y sincronización en tiempo real.',
        descriptionEn: 'Apps for your clients or on-the-field personnel with push notifications, offline support, camera integration, GPS, and real-time cloud sync.',
        iconType: 'mobile',
      },
      {
        titleEs: 'Cobros y Pagos en Línea Integrados',
        titleEn: 'Integrated Online Payments & Checkouts',
        descriptionEs: 'Procesamiento seguro de cobros con tarjeta, Mercado Pago, Stripe o transferencias con emisión de comprobantes automáticos.',
        descriptionEn: 'Secure payment processing supporting cards, Mercado Pago, Stripe, or bank transfers with automatic receipt generation.',
        iconType: 'zap',
      },
      {
        titleEs: 'Plataformas SaaS y Paneles Multiusuario',
        titleEn: 'SaaS Platforms & Multi-Tenant Portals',
        descriptionEs: 'Sistemas con suscripciones recurrentes, login con Google/Apple, perfiles de usuario y paneles interactivos preparados para miles de visitas simultáneas.',
        descriptionEn: 'Subscription-based platforms with Google/Apple SSO, user profiles, and interactive dashboards engineered for high concurrent traffic.',
        iconType: 'cloud',
      },
      {
        titleEs: 'Tienda en Línea que Vende Sola',
        titleEn: 'A Complete Online Store',
        descriptionEs: 'Catálogo de productos, carrito de compras, envíos, cupones e inventario sincronizado en tiempo real, integrado con tu sistema administrativo para que una venta en línea se refleje al instante en tu stock y tu contabilidad.',
        descriptionEn: 'Product catalog, shopping cart, shipping, coupons, and real-time inventory sync, integrated with your back-office so an online sale instantly updates your stock and accounting.',
        iconType: 'chart',
      },
    ],
    whoIsItForEs: [
      'Empresas que quieren renovar una web vieja o lenta que no genera consultas ni ventas.',
      'Startups y emprendedores que necesitan lanzar una aplicación móvil en App Store y Play Store rápido y sin sobrecostos.',
      'Negocios que venden servicios o productos y necesitan cobrar en línea de forma confiable.',
      'Compañías que buscan crear una plataforma SaaS escalable para monetizar su conocimiento o servicio.',
      'Negocios que venden productos físicos y quieren un catálogo en línea propio, sin comisiones de marketplace.',
    ],
    whoIsItForEn: [
      'Businesses looking to overhaul a slow, outdated website that fails to convert leads.',
      'Startups needing a swift, cost-effective launch on both the iOS App Store and Google Play Store.',
      'Companies offering services or products that require seamless, dependable online billing.',
      'Teams building scalable SaaS platforms to monetize digital workflows.',
      'Businesses selling physical products that want their own online catalog, free of marketplace fees.',
    ],
    deliverablesEs: [
      'Código fuente frontend y mobile 100% transferido a tu repositorio.',
      'Diseño responsive adaptado a cualquier resolución de pantalla.',
      'Despliegue y configuración en Vercel, Netlify o servidores cloud con CDN.',
      'Publicación guiada en Google Play Store y Apple App Store (para apps móviles).',
      'Configuración de analítica y métricas de conversión desde el día 1.',
      'Tienda en línea con catálogo, carrito e inventario sincronizado.',
    ],
    deliverablesEn: [
      '100% frontend and mobile repository ownership transferred to you.',
      'Fully responsive UI tested across all screen viewports.',
      'Deployment on Vercel, Netlify, or cloud edge CDNs.',
      'Guided publishing to Google Play Store and Apple App Store.',
      'Analytics and conversion tracking configured from day one.',
      'Online store with catalog, cart, and synchronized inventory.',
    ],
    techStack: [
      { name: 'React / Next.js', category: 'Frontend Web', highlight: 'Renderizado veloz y SEO' },
      { name: 'TypeScript', category: 'Lenguaje', highlight: 'Código tipado y sin bugs' },
      { name: 'Flutter / Dart', category: 'Desarrollo Móvil', highlight: 'iOS y Android con 1 sola base' },
      { name: 'Tailwind CSS', category: 'Estilos', highlight: 'Diseño moderno y ligero' },
      { name: 'Firebase', category: 'Móvil & Auth', highlight: 'Push notifications y backend serverless' },
      { name: 'Vercel / Cloudflare', category: 'Hosting & CDN', highlight: 'Alta disponibilidad y CDN global' },
      { name: 'Three.js', category: 'Gráficos 3D', highlight: 'Experiencias interactivas' },
      { name: 'Stripe Checkout / Mercado Pago', category: 'E-commerce', highlight: 'Cobro directo en tu tienda' },
      { name: 'Catálogos y carritos a medida', category: 'E-commerce', highlight: 'Sin comisión por venta ni vendor lock-in' },
    ],
    faqs: [
      {
        questionEs: '¿Hacen apps nativas para iOS y Android por separado?',
        questionEn: 'Do you build native apps for iOS and Android separately?',
        answerEs: 'Utilizamos Flutter y React Native, lo que nos permite compilar a código nativo de alto rendimiento para iPhone y Android utilizando una sola base de código. Esto reduce el costo de desarrollo a la mitad y facilita las actualizaciones.',
        answerEn: 'We use Flutter and React Native, allowing us to compile high-performance native binaries for both iOS and Android from a single codebase, cutting dev costs in half while simplifying maintenance.',
      },
      {
        questionEs: '¿La página web incluye optimización para Google (SEO)?',
        questionEn: 'Does the website include search engine optimization (SEO)?',
        answerEs: 'Sí, todas nuestras webs se construyen con buenas prácticas de SEO técnico: metadatos OpenGraph, sitemaps XML, etiquetas estructuradas Schema.org, tiempos de carga inferiores a 1 segundo y accesibilidad.',
        answerEn: 'Yes, every site includes technical SEO best practices: OpenGraph metadata, XML sitemaps, Schema.org structured data, sub-second load speeds, and WCAG accessibility.',
      },
      {
        questionEs: '¿Puedo vender en línea sin depender de un marketplace?',
        questionEn: 'Can I sell online without relying on a marketplace?',
        answerEs: 'Sí. Construimos tu catálogo y carrito de compras propios, conectados a pasarelas de pago directas, sin comisión por venta más allá del cobro normal de la pasarela.',
        answerEn: 'Yes. We build your own catalog and shopping cart, connected to direct payment gateways, with no per-sale commission beyond the gateway standard fee.',
      },
    ],
  },
  {
    slug: 'ciberseguridad',
    titleEs: 'Seguridad, Infraestructura y Soporte',
    titleEn: 'Security, Infrastructure & Support',
    heroBadgeEs: 'Auditoría · Nube · Soporte',
    heroBadgeEn: 'Auditing · Cloud · Support',
    taglineEs: 'Protege tu negocio con estándares de nivel bancario, sobre una infraestructura en la nube que no se cae, y alguien que responde cuando algo falla.',
    taglineEn: 'Protect your business with bank-grade standards, on cloud infrastructure that stays up, and someone who answers when something breaks.',
    shortDescEs: 'Blindaje de software existente, auditorías de vulnerabilidades, infraestructura en la nube y un servicio de soporte que evoluciona tu sistema después del lanzamiento.',
    shortDescEn: 'Hardening for existing software, vulnerability auditing, cloud infrastructure, and an ongoing support service that keeps evolving your system after launch.',
    longDescEs: 'La seguridad digital no es un lujo: es la garantía de que tu empresa no sufra hackeos, fugas de datos o multas por incumplimiento. Auditamos lo que ya tienes, blindamos tu infraestructura en la nube, y seguimos ahí después de la entrega con monitoreo con alertas automáticas y soporte continuo.',
    longDescEn: "Digital security isn't a luxury — it's the guarantee that your business won't suffer breaches, data leaks, or compliance fines. We audit what you already have, harden your cloud infrastructure, and stay on with automated-alert monitoring and ongoing support after delivery.",
    colorVar: '--svc-security',
    accentColor: '#facc15',
    accentColorLight: '#b45309',
    glowColor: 'rgba(250, 204, 21, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Blindaje para Software que ya Tienes',
        titleEn: 'Hardening for Existing Software',
        descriptionEs: 'Auditamos el software que ya tienes y tapamos los huecos antes de que alguien los encuentre.',
        descriptionEn: 'We audit your existing software and patch the gaps before someone else finds them.',
        iconType: 'shield',
      },
      {
        titleEs: 'Protección de Datos de Clientes y Pagos',
        titleEn: 'Customer & Payment Data Protection',
        descriptionEs: 'Cifrado de grado bancario en contraseñas, documentos y datos sensibles.',
        descriptionEn: 'Bank-grade encryption on passwords, documents, and sensitive data.',
        iconType: 'database',
      },
      {
        titleEs: 'Copias de Seguridad y Recuperación de Desastres',
        titleEn: 'Automated Backups & Disaster Recovery',
        descriptionEs: 'Respaldos automáticos e independientes, listos para restaurar en minutos.',
        descriptionEn: 'Automated, independent backups, ready to restore in minutes.',
        iconType: 'cloud',
      },
      {
        titleEs: 'Asesoría Técnica antes de Invertir',
        titleEn: 'Pre-Investment Tech Consultation',
        descriptionEs: 'Evaluamos propuestas de terceros y te decimos, sin filtro, si te están cobrando de más.',
        descriptionEn: "We review third-party quotes and tell you straight if you're being overcharged.",
        iconType: 'zap',
      },
      {
        titleEs: 'Infraestructura en la Nube y Monitoreo con Alertas',
        titleEn: 'Cloud Infrastructure & Automated-Alert Monitoring',
        descriptionEs: 'Servidores en la nube con monitoreo activo y alertas antes de que la caída te alcance a ti.',
        descriptionEn: 'Cloud servers with active monitoring and alerts before downtime reaches you.',
        iconType: 'cloud',
      },
      {
        titleEs: 'Soporte y Evolución Continua',
        titleEn: 'Ongoing Support & Evolution',
        descriptionEs: 'Seguimos siendo tu equipo técnico después de la entrega: correcciones, mejoras, crecimiento.',
        descriptionEn: 'We stay your technical team after delivery: fixes, improvements, growth.',
        iconType: 'code',
      },
    ],
    whoIsItForEs: [
      'Empresas con software en producción que nunca fue auditado por expertos en seguridad.',
      'Negocios que manejan datos sensibles de clientes, compras o finanzas y temen filtraciones.',
      'Compañías que han sufrido intentos de hackeo, spam masivo o inyecciones de código.',
      'Founders que necesitan un ojo técnico senior para validar decisiones de arquitectura complejas.',
      'Negocios que ya tienen un sistema en producción y no quieren que se quede congelado el día del lanzamiento.',
    ],
    whoIsItForEn: [
      'Companies running production software that has never undergone formal security audits.',
      'Businesses handling sensitive client or financial data concerned about compliance risks.',
      'Organizations that experienced unauthorized access attempts, spam abuse, or SQL injections.',
      'Founders needing senior technical guidance to validate major architectural decisions.',
      'Businesses that already have a production system and do not want it to freeze on launch day.',
    ],
    deliverablesEs: [
      'Reporte ejecutivo de vulnerabilidades encontradas con nivel de riesgo (Crítico, Alto, Medio).',
      'Plan de mitigación y código de parcheo listo para implementar.',
      'Configuración de firewall en la nube (Cloudflare WAF) y reglas anti-DDoS.',
      'Políticas de autenticación con 2FA (doble factor) y hashing seguro de credenciales.',
      'Reporte de buenas prácticas de seguridad.',
      'Monitoreo de servidores con alertas automáticas ante caídas.',
      'Contrato de soporte mensual con tiempo de respuesta garantizado.',
    ],
    deliverablesEn: [
      'Executive vulnerability report classified by severity (Critical, High, Medium).',
      'Step-by-step mitigation plan and production-ready patch code.',
      'Cloud WAF (Cloudflare) configuration and anti-DDoS rule enforcement.',
      '2FA policy deployment and hardened credential hashing implementation.',
      'Security best-practices report and validation sign-off.',
      'Server monitoring with automatic downtime alerts.',
      'Monthly support contract with guaranteed response time.',
    ],
    techStack: [
      { name: 'OWASP Top 10 Standards', category: 'Normativas', highlight: 'Estándar global de seguridad' },
      { name: 'Cloudflare WAF', category: 'Protección Edge', highlight: 'Anti-DDoS y filtrado de bots' },
      { name: 'JWT & OAuth2', category: 'Autenticación', highlight: 'Sesiones seguras y tokens' },
      { name: 'bcrypt / Argon2', category: 'Criptografía', highlight: 'Hashing irreversible de contraseñas' },
      { name: 'SonarQube / Snyk', category: 'Análisis Estático', highlight: 'Detección de fallos en código' },
      { name: 'SSL / TLS Strict', category: 'Tráfico Seguro', highlight: 'Cifrado en tránsito punto a punto' },
      { name: 'AWS / DigitalOcean / Hetzner', category: 'Infraestructura Cloud', highlight: 'Servidores dimensionados a tu operación' },
      { name: 'UptimeRobot / Grafana', category: 'Observabilidad', highlight: 'Alertas antes de que el cliente note la caída' },
    ],
    faqs: [
      {
        questionEs: '¿Pueden auditar un software que no fue programado por ustedes?',
        questionEn: 'Can you audit software that was not developed by your team?',
        answerEs: 'Sí. Realizamos auditorías de código, pruebas de penetración y revisión de servidores para software heredado o construido por otras agencias, entregando un reporte claro y la solución directa a cada falla.',
        answerEn: 'Yes. We conduct white-box and black-box audits, penetration tests, and server hardening on legacy code or systems built by other vendors, providing clear remediation roadmaps.',
      },
      {
        questionEs: '¿Qué pasa después de que el proyecto se entrega?',
        questionEn: 'What happens after the project is delivered?',
        answerEs: 'Ofrecemos un contrato de soporte mensual donde damos mantenimiento, corregimos errores y agregamos mejoras. Tu sistema no se congela el día de la entrega.',
        answerEn: 'We offer a monthly support contract that covers maintenance, bug fixes, and new improvements. Your system does not freeze on delivery day.',
      },
    ],
  },
  {
    slug: 'diseno-ui-ux',
    titleEs: 'Diseño de Interfaces y Experiencia de Usuario (UI/UX)',
    titleEn: 'UI/UX Design & User Experience',
    heroBadgeEs: 'Figma · Prototipos Navegables · Design Systems',
    heroBadgeEn: 'Figma · Clickable Prototypes · Design Systems',
    taglineEs: 'Creamos interfaces tan intuitivas y claras que tus usuarios navegan sin fricción y completan sus compras sin dudar.',
    taglineEn: 'We create interfaces so intuitive and clear that users navigate effortlessly and convert without hesitation.',
    shortDescEs: 'Diseño intuitivo, prototipos interactivos antes de programar y sistemas visuales modernos optimizados para celulares.',
    shortDescEn: 'Intuitive design, clickable interactive prototypes before coding, and modern visual systems optimized for mobile.',
    longDescEs: 'El buen diseño hace que un producto complejo se sienta simple. Prototipamos cada pantalla en Figma y la probamos con usuarios reales antes de escribir una sola línea de código.',
    longDescEn: 'Great design makes complex software feel effortless. We prototype every screen in Figma and test it with real users before a single line of code gets written.',
    colorVar: '--svc-uiux',
    accentColor: '#f43f5e',
    accentColorLight: '#be123c',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Mira tu Producto Antes de Programarlo',
        titleEn: 'Test Your Product Before Coding',
        descriptionEs: 'Prototipos totalmente interactivos para validar la idea con clientes reales antes de invertir en desarrollo.',
        descriptionEn: 'Fully interactive prototypes to validate your idea with real users before investing in development.',
        iconType: 'design',
      },
      {
        titleEs: 'Software Fácil de Usar (Cero Capacitación)',
        titleEn: 'Intuitive Software (Zero Training)',
        descriptionEs: 'Flujos limpios: cualquier persona encuentra lo que busca en dos clics, sin perderse.',
        descriptionEn: 'Clean flows: anyone finds what they need in two clicks, without getting lost.',
        iconType: 'zap',
      },
      {
        titleEs: 'Adaptación Perfecta al Celular',
        titleEn: 'Flawless Mobile-First Experience',
        descriptionEs: 'Cada botón y menú pensado para usarse con una sola mano, en cualquier tamaño de pantalla.',
        descriptionEn: 'Every button and menu built for one-handed use, on any screen size.',
        iconType: 'mobile',
      },
      {
        titleEs: 'Sistemas de Diseño Reutilizables',
        titleEn: 'Reusable Design Systems',
        descriptionEs: 'Paleta, tipografías y componentes reutilizables para que tu marca se vea igual de bien en cada pantalla.',
        descriptionEn: 'Color palette, typography, and reusable components so your brand looks consistent on every screen.',
        iconType: 'code',
      },
    ],
    whoIsItForEs: [
      'Empresas con software funcional pero visualmente anticuado o difícil de entender para sus empleados.',
      'Startups que necesitan validar su interfaz con inversores o clientes antes de empezar a programar.',
      'Sitios web o tiendas con muchas visitas pero baja tasa de ventas debido a procesos confusos.',
      'Equipos de desarrollo que necesitan pantallas listas y componentes claros para programar sin dudas.',
    ],
    whoIsItForEn: [
      'Companies with functional yet visually dated or difficult-to-navigate internal tools.',
      'Startups needing polished interactive prototypes to pitch investors or validate product-market fit.',
      'Websites or stores with high traffic but poor conversion caused by cluttered checkouts.',
      'Engineering teams requiring structured, pixel-perfect design specs ready for implementation.',
    ],
    deliverablesEs: [
      'Archivo Figma editable con todos los flujos y pantallas del producto.',
      'Prototipo interactivo navegable para pruebas de usuario.',
      'Kit de componentes UI (Design System) con estados (hover, active, focus, disabled).',
      'Exportación de activos gráficos en SVG y WebP optimizados.',
      'Guía de especificaciones técnicas para el equipo de desarrollo.',
    ],
    deliverablesEn: [
      'Complete editable Figma file with all responsive screen flows.',
      'Clickable interactive prototype for user usability testing.',
      'Comprehensive UI component library covering all states (hover, active, disabled).',
      'Optimized SVG and WebP vector graphic assets.',
      'Developer handoff specs with typography, spacing tokens, and color styles.',
    ],
    techStack: [
      { name: 'Figma', category: 'Herramienta Principal', highlight: 'Prototipado interactivo y colaboración' },
      { name: 'Atomic Design System', category: 'Metodología', highlight: 'Componentes modulares' },
      { name: 'Tailwind CSS Tokens', category: 'Especificación', highlight: 'Tokens listos para código' },
      { name: 'WCAG 2.2 Guidelines', category: 'Accesibilidad', highlight: 'Contraste y legibilidad universal' },
      { name: 'Storybook Patterns', category: 'Documentación', highlight: 'Catálogo de componentes UI' },
    ],
    faqs: [
      {
        questionEs: '¿Por qué conviene diseñar antes de programar?',
        questionEn: 'Why is it better to design before coding?',
        answerEs: 'Cambiar un flujo o un botón en Figma toma 5 minutos; cambiarlo una vez que ya está programado en código puede tomar días y costar mucho más dinero. El diseño previo ahorra hasta un 40% del costo total de un proyecto.',
        answerEn: 'Tweaking a layout in Figma takes 5 minutes; refactoring production code takes days and costs significantly more. Pre-development UI/UX saves up to 40% of total engineering costs.',
      },
    ],
  },
  {
    slug: 'automatizacion-analitica',
    titleEs: 'Automatización, Integraciones y Datos',
    titleEn: 'Automation, Integrations & Data',
    heroBadgeEs: 'WhatsApp API · Integración de Sistemas · Dashboards en Vivo',
    heroBadgeEn: 'WhatsApp API · System Integrations · Live Dashboards',
    taglineEs: 'Conecta tus herramientas para que trabajen solas y mira las métricas de tu empresa en tiempo real desde tu celular.',
    taglineEn: 'Connect your business tools to run on autopilot and track your live KPIs from your smartphone.',
    shortDescEs: 'Automatización de WhatsApp, integración entre sistemas que hoy no se hablan, eliminación de tareas manuales y dashboards ejecutivos en vivo.',
    shortDescEn: 'WhatsApp automation, integration between systems that do not talk to each other today, manual task elimination, and live executive dashboards.',
    longDescEs: 'Hacemos que los sistemas de tu empresa se comuniquen automáticamente entre sí, incluso cuando son de proveedores distintos y nunca fueron pensados para conectarse. Conectamos tu web con WhatsApp, pasarelas de pago, facturación e inventario para que las ventas se procesen solas, y construimos tableros interactivos para que tomes decisiones con datos precisos.',
    longDescEn: 'We make your business systems talk to each other automatically, even when they come from different vendors and were never designed to connect. We connect your store with WhatsApp, payment gateways, electronic invoicing, and inventory so sales process automatically, and we build interactive dashboards for precise decision-making.',
    colorVar: '--svc-analytics',
    accentColor: '#f97316',
    accentColorLight: '#c2410c',
    glowColor: 'rgba(249, 115, 22, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Automatización de WhatsApp y Notificaciones',
        titleEn: 'WhatsApp Automation & Alerts',
        descriptionEs: 'Envío automático de confirmaciones de compra, recordatorios de citas o avisos de entrega por WhatsApp directo a tus clientes sin que nadie tenga que escribir a mano.',
        descriptionEn: 'Automatic delivery of purchase confirmations, appointment reminders, or shipping updates via WhatsApp without manual messaging.',
        iconType: 'whatsapp',
      },
      {
        titleEs: 'Eliminación de Tareas Manuales y Repetitivas',
        titleEn: 'Manual Task Elimination & Workflows',
        descriptionEs: 'Cuando entra una venta, el sistema genera la orden, timbra la factura, descuenta el stock y avisa a tu equipo de despacho de forma automática.',
        descriptionEn: 'When an order arrives, the system creates the record, stamps the invoice, updates inventory, and alerts the dispatch team automatically.',
        iconType: 'zap',
      },
      {
        titleEs: 'Tableros y Gráficas de Ventas en Vivo',
        titleEn: 'Live Sales & Revenue Dashboards',
        descriptionEs: 'Dashboards claros y visuales para ver ingresos, productos más vendidos, márgenes y rendimiento del equipo en tiempo real desde tu teléfono.',
        descriptionEn: 'Visual dashboards displaying revenues, top-selling products, profit margins, and team performance in real time on your phone.',
        iconType: 'chart',
      },
      {
        titleEs: 'Conexión entre tus Herramientas (APIs y Webhooks)',
        titleEn: 'Multi-Tool Integrations (APIs & Webhooks)',
        descriptionEs: 'Hacemos que tu tienda en línea, tu CRM, tus cuentas de cobro y tu sistema contable compartan información al instante sin errores de captura.',
        descriptionEn: 'We synchronize your online store, CRM, payment processors, and accounting software instantly with zero manual entry errors.',
        iconType: 'code',
      },
      {
        titleEs: 'Sistemas que Hoy no se Hablan',
        titleEn: 'Systems That Do Not Talk to Each Other',
        descriptionEs: 'Tu punto de venta, tu contabilidad y tu inventario vienen de tres proveedores distintos y nadie pensó en conectarlos. Construimos el puente entre ellos aunque no tengan una API oficial, para que la información se mueva sola.',
        descriptionEn: 'Your point of sale, accounting, and inventory come from three different vendors that were never meant to connect. We build the bridge between them even without an official API, so information flows on its own.',
        iconType: 'zap',
      },
    ],
    whoIsItForEs: [
      'Negocios que pierden horas enviando mensajes de WhatsApp uno por uno para confirmar citas o compras.',
      'Empresas donde el personal tiene que copiar y pegar datos manualmente de un programa a otro.',
      'Directivos que arman reportes en Excel a fin de mes y no saben cuánto están ganando en el día a día.',
      'Comercios con múltiples canales de venta que necesitan mantener su stock sincronizado al instante.',
      'Negocios con dos o tres sistemas de proveedores distintos que nunca se comunicaron entre sí.',
    ],
    whoIsItForEn: [
      'Businesses losing hours manually sending individual WhatsApp messages for confirmations.',
      'Companies where staff copy-pastes data across disconnected software tools all day.',
      'Executives struggling with end-of-month Excel reports who lack real-time visibility into daily profits.',
      'Omnichannel retailers needing inventory to stay synchronized across all points of sale instantly.',
      'Businesses running two or three systems from different vendors that were never connected.',
    ],
    deliverablesEs: [
      'Flujos de automatización configurados y probados en producción.',
      'Integración con WhatsApp Cloud API oficial o proveedores de mensajería.',
      'Dashboard interactivo en la nube con acceso seguro multiusuario.',
      'Webhooks y endpoints documentados para futuras conexiones.',
      'Monitoreo continuo de errores y alertas automáticas.',
    ],
    deliverablesEn: [
      'Automated workflows deployed and tested under live production traffic.',
      'Official WhatsApp Cloud API or messaging provider integrations.',
      'Interactive cloud analytics dashboard with multi-user role management.',
      'Documented webhooks and endpoints for future tool expansions.',
      'Proactive error monitoring and automated outage alerts.',
    ],
    techStack: [
      { name: 'WhatsApp Cloud API / Twilio', category: 'Mensajería', highlight: 'Notificaciones automáticas' },
      { name: 'Python (Pandas / Matplotlib)', category: 'Ciencia de Datos', highlight: 'Transformación y análisis' },
      { name: 'Node.js & Webhooks', category: 'Integraciones', highlight: 'Disparadores en tiempo real' },
      { name: 'Metabase / Recharts', category: 'Visualización', highlight: 'Dashboards interactivos' },
      { name: 'Redis Queue', category: 'Colas de Procesamiento', highlight: 'Ejecución asíncrona confiable' },
      { name: 'Stripe / Mercado Pago APIs', category: 'Pasarelas', highlight: 'Eventos de pago en vivo' },
    ],
    faqs: [
      {
        questionEs: '¿Necesito tener la computadora encendida para que funcionen las automatizaciones?',
        questionEn: 'Do I need my computer on for automations to run?',
        answerEs: 'No. Todas las automatizaciones se ejecutan 24/7 en servidores seguros en la nube, procesando mensajes y eventos al instante incluso cuando estás durmiendo o de viaje.',
        answerEn: 'No. All automated pipelines run 24/7 on secure cloud servers, processing messages and events instantly even while you are offline or away.',
      },
      {
        questionEs: '¿Es seguro conectar WhatsApp con nuestro sistema?',
        questionEn: 'Is it safe to connect WhatsApp to our system?',
        answerEs: 'Sí. Utilizamos la API oficial de WhatsApp Cloud con cifrado de extremo a extremo y verificación de número oficial de empresa para garantizar que nunca bloqueen tu línea.',
        answerEn: 'Yes. We integrate through the official WhatsApp Cloud API with end-to-end encryption and business verification, ensuring line safety against bans.',
      },
    ],
  },
];
