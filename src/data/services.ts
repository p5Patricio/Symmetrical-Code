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
    titleEs: 'Software Empresarial y Sistemas Internos',
    titleEn: 'Enterprise Software & Internal Systems',
    heroBadgeEs: 'Sistemas a Medida · ERPs · Backoffices',
    heroBadgeEn: 'Custom Systems · ERPs · Backoffices',
    taglineEs: 'Digitalizá y centralizá la operación de tu empresa con software hecho exactamente a tu medida.',
    taglineEn: 'Digitize and centralize your business operations with software tailored precisely to your needs.',
    shortDescEs: 'Digitalización de operaciones, ERPs y CRMs que eliminan el desorden administrativo y centralizan tus datos.',
    shortDescEn: 'Operation digitization, custom ERPs and CRMs that eliminate administrative clutter and centralize your data.',
    longDescEs: 'Diseñamos y desarrollamos plataformas empresariales que reemplazan hojas de Excel dispersas y software genérico costoso. Centralizamos inventarios, ventas, compras, finanzas y personal en un sistema seguro, rápido y accesible desde cualquier dispositivo.',
    longDescEn: 'We design and build enterprise platforms that replace scattered Excel sheets and costly off-the-shelf software. We centralize inventory, sales, purchasing, finance, and HR into a secure, fast, and accessible system.',
    colorVar: '--svc-systems',
    accentColor: '#4ade80',
    accentColorLight: '#15803d',
    glowColor: 'rgba(74, 222, 128, 0.25)',
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
        descriptionEs: 'Vos decidís qué puede ver y editar cada usuario. El vendedor ve sus prospectos, el almacenista su stock y el contador las facturas, con registro de auditoría.',
        descriptionEn: 'You decide what each user can view and edit. Sales reps see leads, warehouse staff manage stock, and accountants access invoices with full audit logs.',
        iconType: 'shield',
      },
      {
        titleEs: 'Acceso en la Nube desde Celular y PC',
        titleEn: 'Cloud Access from Mobile and Desktop',
        descriptionEs: 'Tu sistema disponible 24/7 de forma segura desde la oficina, desde casa o en la calle con respaldos automáticos continuos.',
        descriptionEn: 'Your system is available 24/7 securely from the office, home, or on the go with continuous automated backups.',
        iconType: 'cloud',
      },
    ],
    whoIsItForEs: [
      'Empresas que dependen de decenas de archivos de Excel que se desincronizan o se corrompen.',
      'Negocios que pagan licencias mensuales abusivas por software rígido que no se adapta a sus procesos.',
      'Equipos en crecimiento que necesitan control de stock, compras y facturación sin errores manuales.',
      'Directivos que necesitan reportes consolidados y métricas en tiempo real sin esperar cierres mensuales.',
    ],
    whoIsItForEn: [
      'Companies relying on dozens of out-of-sync or corrupt-prone Excel files.',
      'Businesses paying excessive monthly fees for rigid software that does not fit their workflow.',
      'Growing teams that need accurate inventory, purchasing, and billing control without manual errors.',
      'Executives needing consolidated real-time reporting without waiting for end-of-month reviews.',
    ],
    deliverablesEs: [
      'Código fuente 100% de tu propiedad sin licencias recurrentes ocultas.',
      'Base de datos relacional optimizada con backups automáticos diarios.',
      'Panel administrativo web responsivo y de alta velocidad.',
      'Documentación técnica y capacitación para tu equipo de trabajo.',
      'Garantía de soporte técnico post-lanzamiento.',
    ],
    deliverablesEn: [
      '100% proprietary source code with zero hidden recurring license fees.',
      'Optimized relational database with automated daily backups.',
      'Responsive, high-speed web administration backoffice.',
      'Technical documentation and team training sessions.',
      'Post-launch warranty and technical support.',
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
        answerEs: 'Dependiendo del alcance, un MVP funcional o primer módulo suele entregarse entre 4 y 8 semanas, con entregas parciales semanales para que puedas ir probándolo en tu operación.',
        answerEn: 'Depending on scope, a functional MVP or first module is typically delivered in 4 to 8 weeks, with weekly milestone releases for hands-on validation.',
      },
    ],
  },
  {
    slug: 'inteligencia-artificial',
    titleEs: 'Implementación de IA a tu Negocio',
    titleEn: 'AI Implementation for Business',
    heroBadgeEs: 'Modelos de Lenguaje · RAG · Automatización Cognitiva',
    heroBadgeEn: 'LLMs · RAG · Cognitive Automation',
    taglineEs: 'Poné la inteligencia artificial a trabajar en tu empresa para automatizar tareas complejas y atender clientes 24/7.',
    taglineEn: 'Put artificial intelligence to work in your business to automate complex tasks and serve customers 24/7.',
    shortDescEs: 'Asistentes inteligentes, lectura automática de documentos y automatización con IA basada en tus datos reales.',
    shortDescEn: 'Intelligent assistants, automated document reading, and custom AI automation grounded in your actual data.',
    longDescEs: 'Integramos modelos de lenguaje de última generación (OpenAI, Claude, DeepSeek) y modelos privados entrenados con los manuales, catálogos y políticas de tu empresa. Respuestas precisas sin alucinaciones, extracción automática de datos de facturas o contratos, y visión por computadora.',
    longDescEn: 'We integrate cutting-edge language models (OpenAI, Claude, DeepSeek) and private models grounded on your company manuals, catalogs, and policies. Accurate answers with zero hallucinations, automated data extraction, and computer vision.',
    colorVar: '--svc-cloud',
    accentColor: '#a855f7',
    accentColorLight: '#7e22ce',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Atención al Cliente Inteligente 24/7 (RAG)',
        titleEn: '24/7 Smart Customer Support (RAG)',
        descriptionEs: 'Asistentes que responden preguntas frecuentes, cotizan y guían a tus clientes basándose únicamente en la información oficial de tu empresa, sin inventar datos.',
        descriptionEn: 'Assistants that answer questions, provide quotes, and guide customers strictly based on your company official knowledge, with zero hallucinations.',
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
      { name: 'Ollama / Llama 3', category: 'Modelos Locales', highlight: 'Privacidad 100% on-premise' },
      { name: 'HuggingFace', category: 'Modelos Abiertos', highlight: 'Embeddings optimizados' },
    ],
    faqs: [
      {
        questionEs: '¿La IA puede inventar respuestas falsas (alucinar)?',
        questionEn: 'Can the AI invent false information (hallucinate)?',
        answerEs: 'No en nuestra implementación. Utilizamos arquitectura RAG (Retrieval-Augmented Generation), lo que obliga al modelo a responder únicamente basándose en los documentos que vos le proporcionás, indicando la fuente o derivando a un humano si no tiene el dato.',
        answerEn: 'Not in our architecture. We implement RAG (Retrieval-Augmented Generation), forcing the model to answer exclusively based on your official documentation and escalating to a human when uncertain.',
      },
      {
        questionEs: '¿Mis datos confidenciales se comparten públicamente con OpenAI?',
        questionEn: 'Is my confidential business data shared publicly with OpenAI?',
        answerEs: 'No. Configuramos conexiones empresariales que garantizan por contrato que tus datos no se usan para entrenar modelos públicos. Si tu política es estricta, podemos montar modelos 100% locales en tu propio servidor.',
        answerEn: 'No. We configure enterprise endpoints where terms explicitly prevent your data from being used for public training. For strict compliance, we can deploy 100% on-premise local models.',
      },
    ],
  },
  {
    slug: 'desarrollo-web-movil',
    titleEs: 'Desarrollo de Páginas Web y Aplicaciones Móviles',
    titleEn: 'Web & Mobile App Development',
    heroBadgeEs: 'Web Apps · Apps iOS / Android · SaaS',
    heroBadgeEn: 'Web Apps · iOS / Android Apps · SaaS',
    taglineEs: 'Aplicaciones móviles y plataformas web de carga ultrarrápida diseñadas para enamorar a tus usuarios y generar ventas.',
    taglineEn: 'High-speed web platforms and mobile applications designed to delight users and drive real revenue.',
    shortDescEs: 'Sitios web de alto rendimiento, plataformas SaaS y aplicaciones móviles nativas o cross-platform en Flutter y React.',
    shortDescEn: 'High-performance websites, SaaS platforms, and native or cross-platform mobile apps in Flutter and React.',
    longDescEs: 'Construimos experiencias digitales modernas, desde landing pages que convierten visitantes en clientes hasta plataformas web complejas (SaaS) y aplicaciones móviles en iOS y Android con una sola base de código optimizada.',
    longDescEn: 'We build modern digital experiences, ranging from high-conversion landing pages to full SaaS platforms and mobile apps on iOS and Android with single-codebase efficiency.',
    colorVar: '--svc-web',
    accentColor: '#00e5ff',
    accentColorLight: '#0284c7',
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
    ],
    whoIsItForEs: [
      'Empresas que quieren renovar una web vieja o lenta que no genera consultas ni ventas.',
      'Startups y emprendedores que necesitan lanzar una aplicación móvil en App Store y Play Store rápido y sin sobrecostos.',
      'Negocios que venden servicios o productos y necesitan cobrar en línea de forma confiable.',
      'Compañías que buscan crear una plataforma SaaS escalable para monetizar su conocimiento o servicio.',
    ],
    whoIsItForEn: [
      'Businesses looking to overhaul a slow, outdated website that fails to convert leads.',
      'Startups needing a swift, cost-effective launch on both the iOS App Store and Google Play Store.',
      'Companies offering services or products that require seamless, dependable online billing.',
      'Teams building scalable SaaS platforms to monetize digital workflows.',
    ],
    deliverablesEs: [
      'Código fuente frontend y mobile 100% transferido a tu repositorio.',
      'Diseño responsive adaptado a cualquier resolución de pantalla.',
      'Despliegue y configuración en Vercel, Netlify o servidores cloud con CDN.',
      'Publicación guiada en Google Play Store y Apple App Store (para apps móviles).',
      'Configuración de analítica y métricas de conversión desde el día 1.',
    ],
    deliverablesEn: [
      '100% frontend and mobile repository ownership transferred to you.',
      'Fully responsive UI tested across all screen viewports.',
      'Deployment on Vercel, Netlify, or cloud edge CDNs.',
      'Guided publishing to Google Play Store and Apple App Store.',
      'Analytics and conversion tracking configured from day one.',
    ],
    techStack: [
      { name: 'React / Next.js', category: 'Frontend Web', highlight: 'Renderizado veloz y SEO' },
      { name: 'TypeScript', category: 'Lenguaje', highlight: 'Código tipado y sin bugs' },
      { name: 'Flutter / Dart', category: 'Desarrollo Móvil', highlight: 'iOS y Android con 1 sola base' },
      { name: 'Tailwind CSS', category: 'Estilos', highlight: 'Diseño moderno y ligero' },
      { name: 'Firebase', category: 'Móvil & Auth', highlight: 'Push notifications y backend serverless' },
      { name: 'Vercel / Cloudflare', category: 'Hosting & CDN', highlight: '99.99% Uptime global' },
      { name: 'Three.js', category: 'Gráficos 3D', highlight: 'Experiencias interactivas' },
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
    ],
  },
  {
    slug: 'ciberseguridad',
    titleEs: 'Ciberseguridad y Asesoría',
    titleEn: 'Cybersecurity & Tech Advisory',
    heroBadgeEs: 'Auditoría · Blindaje de Datos · OWASP',
    heroBadgeEn: 'Auditing · Data Shielding · OWASP',
    taglineEs: 'Protegé tu negocio, tus bases de datos y la información de tus clientes con estándares de seguridad de nivel bancario.',
    taglineEn: 'Protect your business, databases, and customer information with bank-grade security practices.',
    shortDescEs: 'Blindaje de software existente, auditorías de vulnerabilidades, cifrado de datos y consultoría técnica estratégica.',
    shortDescEn: 'Hardening for existing software, vulnerability auditing, data encryption, and strategic tech advisory.',
    longDescEs: 'La seguridad digital no es un lujo, es la garantía de que tu empresa no sufrirá hackeos, robo de bases de datos o multas por fuga de información. Auditamos sistemas ya construidos, protegemos APIs y asesoramos a directivos antes de realizar inversiones técnicas.',
    longDescEn: 'Digital security is essential to safeguard your business from ransomware, database breaches, and regulatory fines. We audit existing systems, shield APIs, and advise leadership before major technical investments.',
    colorVar: '--svc-security',
    accentColor: '#facc15',
    accentColorLight: '#b45309',
    glowColor: 'rgba(250, 204, 21, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Blindaje para Software que ya Tenés',
        titleEn: 'Hardening for Existing Software',
        descriptionEs: 'Si tu empresa ya tiene una página o sistema desarrollado por otro proveedor, lo auditamos para detectar y tapar huecos de seguridad antes de que sufras un ataque.',
        descriptionEn: 'If your business already operates software built by another vendor, we audit and patch security holes before attackers find them.',
        iconType: 'shield',
      },
      {
        titleEs: 'Protección de Datos de Clientes y Pagos',
        titleEn: 'Customer & Payment Data Protection',
        descriptionEs: 'Cifrado de grado bancario (AES-256) para contraseñas, documentos y registros sensibles, evitando fugas de información confidencial.',
        descriptionEn: 'Bank-grade encryption (AES-256) for passwords, records, and sensitive documents, preventing confidential data leaks.',
        iconType: 'database',
      },
      {
        titleEs: 'Copias de Seguridad y Recuperación de Desastres',
        titleEn: 'Automated Backups & Disaster Recovery',
        descriptionEs: 'Configuración de respaldos automáticos e independientes para que tu empresa pueda restaurar su base de datos en minutos ante cualquier eventualidad.',
        descriptionEn: 'Automated, isolated offsite backups ensuring your business can restore databases within minutes during any incident.',
        iconType: 'cloud',
      },
      {
        titleEs: 'Asesoría Técnica antes de Invertir',
        titleEn: 'Pre-Investment Tech Consultation',
        descriptionEs: 'Evaluamos presupuestos y propuestas de terceros para decirte con honestidad si la arquitectura planteada es viable o si estás pagando de más.',
        descriptionEn: 'We evaluate third-party tech quotes to give you honest assessments on architecture feasibility and fair market pricing.',
        iconType: 'zap',
      },
    ],
    whoIsItForEs: [
      'Empresas con software en producción que nunca fue auditado por expertos en seguridad.',
      'Negocios que manejan datos sensibles de clientes, compras o finanzas y temen filtraciones.',
      'Compañías que han sufrido intentos de hackeo, spam masivo o inyecciones de código.',
      'Founders que necesitan un ojo técnico senior para validar decisiones de arquitectura complejas.',
    ],
    whoIsItForEn: [
      'Companies running production software that has never undergone formal security audits.',
      'Businesses handling sensitive client or financial data concerned about compliance risks.',
      'Organizations that experienced unauthorized access attempts, spam abuse, or SQL injections.',
      'Founders needing senior technical guidance to validate major architectural decisions.',
    ],
    deliverablesEs: [
      'Reporte ejecutivo de vulnerabilidades encontradas con nivel de riesgo (Crítico, Alto, Medio).',
      'Plan de mitigación y código de parcheo listo para implementar.',
      'Configuración de firewall en la nube (Cloudflare WAF) y reglas anti-DDoS.',
      'Políticas de autenticación con 2FA (doble factor) y hashing seguro de credenciales.',
      'Certificado de buenas prácticas de seguridad.',
    ],
    deliverablesEn: [
      'Executive vulnerability report classified by severity (Critical, High, Medium).',
      'Step-by-step mitigation plan and production-ready patch code.',
      'Cloud WAF (Cloudflare) configuration and anti-DDoS rule enforcement.',
      '2FA policy deployment and hardened credential hashing implementation.',
      'Security posture certificate and validation sign-off.',
    ],
    techStack: [
      { name: 'OWASP Top 10 Standards', category: 'Normativas', highlight: 'Estándar global de seguridad' },
      { name: 'Cloudflare WAF', category: 'Protección Edge', highlight: 'Anti-DDoS y filtrado de bots' },
      { name: 'JWT & OAuth2', category: 'Autenticación', highlight: 'Sesiones seguras y tokens' },
      { name: 'bcrypt / Argon2', category: 'Criptografía', highlight: 'Hashing irreversible de contraseñas' },
      { name: 'SonarQube / Snyk', category: 'Análisis Estático', highlight: 'Detección de fallos en código' },
      { name: 'SSL / TLS Strict', category: 'Tráfico Seguro', highlight: 'Cifrado en tránsito punto a punto' },
    ],
    faqs: [
      {
        questionEs: '¿Pueden auditar un software que no fue programado por ustedes?',
        questionEn: 'Can you audit software that was not developed by your team?',
        answerEs: 'Sí. Realizamos auditorías de código, pruebas de penetración y revisión de servidores para software heredado o construido por otras agencias, entregando un reporte claro y la solución directa a cada falla.',
        answerEn: 'Yes. We conduct white-box and black-box audits, penetration tests, and server hardening on legacy code or systems built by other vendors, providing clear remediation roadmaps.',
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
    longDescEs: 'El buen diseño es aquel que hace que un producto digital complejo se sienta simple. Creamos prototipos navegables en Figma para que puedas interactuar con tu producto antes de escribir código, asegurando flujos de compra sin trabas y coherencia visual en cada pantalla.',
    longDescEn: 'Great design makes complex software feel effortless. We build interactive Figma prototypes so you can test user flows before writing code, ensuring frictionless conversions and brand consistency.',
    colorVar: '--svc-uiux',
    accentColor: '#f43f5e',
    accentColorLight: '#be123c',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    practicalSolutions: [
      {
        titleEs: 'Mirá tu Producto Antes de Programarlo',
        titleEn: 'Test Your Product Before Coding',
        descriptionEs: 'Diseñamos prototipos en alta fidelidad 100% interactivos para que navegues cada pantalla y valides la idea con clientes reales antes de invertir en desarrollo.',
        descriptionEn: 'We craft high-fidelity, fully interactive prototypes so you can click through every screen and validate concepts with real users before coding.',
        iconType: 'design',
      },
      {
        titleEs: 'Software Fácil de Usar (Cero Capacitación)',
        titleEn: 'Intuitive Software (Zero Training)',
        descriptionEs: 'Flujos limpios donde cualquier persona encuentra lo que busca en dos clics sin perderse, reduciendo el abandono y las llamadas de soporte.',
        descriptionEn: 'Clean user flows where anyone finds what they need in two clicks without getting lost, drastically cutting bounce rates and support tickets.',
        iconType: 'zap',
      },
      {
        titleEs: 'Adaptación Perfecta al Celular',
        titleEn: 'Flawless Mobile-First Experience',
        descriptionEs: 'Cada botón, formulario y menú diseñado ergonómicamente para usarse con una sola mano en pantallas de cualquier tamaño.',
        descriptionEn: 'Every button, form, and menu is ergonomically crafted for single-handed use across all mobile viewport dimensions.',
        iconType: 'mobile',
      },
      {
        titleEs: 'Sistemas de Diseño Reutilizables',
        titleEn: 'Reusable Design Systems',
        descriptionEs: 'Guías de estilo completas con tu paleta de colores, tipografías y componentes listos para que tu marca se vea profesional y coherente siempre.',
        descriptionEn: 'Comprehensive design system libraries with typography, color palettes, and UI components ensuring brand consistency at scale.',
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
    titleEs: 'Automatización, Analítica y Reportes',
    titleEn: 'Automation, Analytics & Reporting',
    heroBadgeEs: 'WhatsApp API · Integración de APIs · Dashboards en Vivo',
    heroBadgeEn: 'WhatsApp API · API Integrations · Live Dashboards',
    taglineEs: 'Conectá tus herramientas para que trabajen solas y mirá las métricas de tu empresa en tiempo real desde tu celular.',
    taglineEn: 'Connect your business tools to run on autopilot and track your live KPIs from your smartphone.',
    shortDescEs: 'Automatización de WhatsApp, conexión entre plataformas, eliminación de tareas manuales y dashboards ejecutivos en vivo.',
    shortDescEn: 'WhatsApp automation, multi-tool API connections, manual task elimination, and live executive dashboards.',
    longDescEs: 'Hacemos que los sistemas de tu empresa se comuniquen automáticamente entre sí. Conectamos tu web con WhatsApp, pasarelas de pago, facturación e inventario para que las ventas se procesen solas, y construimos tableros interactivos para que tomes decisiones con datos precisos.',
    longDescEn: 'We bridge your business tools into seamless automated workflows. We connect your store with WhatsApp, payment gateways, electronic invoicing, and inventory so sales process automatically with real-time KPI visibility.',
    colorVar: '--svc-analytics',
    accentColor: '#f472b6',
    accentColorLight: '#be185d',
    glowColor: 'rgba(244, 114, 182, 0.25)',
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
        descriptionEs: 'Cuando entra una venta, el sistema genera la orden, timbra la factura, descuenta el stock y avisa a tu equipo de despacho de forma 100% automática.',
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
    ],
    whoIsItForEs: [
      'Negocios que pierden horas enviando mensajes de WhatsApp uno por uno para confirmar citas o compras.',
      'Empresas donde el personal tiene que copiar y pegar datos manualmente de un programa a otro.',
      'Directivos que arman reportes en Excel a fin de mes y no saben cuánto están ganando en el día a día.',
      'Comercios con múltiples canales de venta que necesitan mantener su stock sincronizado al instante.',
    ],
    whoIsItForEn: [
      'Businesses losing hours manually sending individual WhatsApp messages for confirmations.',
      'Companies where staff copy-pastes data across disconnected software tools all day.',
      'Executives struggling with end-of-month Excel reports who lack real-time visibility into daily profits.',
      'Omnichannel retailers needing inventory to stay synchronized across all points of sale instantly.',
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
