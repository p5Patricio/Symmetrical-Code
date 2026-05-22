export interface Project {
  title: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  tags: string[];
  category: string;
  githubUrl: string;
  ogImageUrl: string;
  galleryImages?: string[];
  demoUrl?: string;
  backendUrl?: string;
  frontendUrl?: string;
}

// Mapa de iconos por tecnología usando Simple Icons y Devicon CDN
export const techIconMap: Record<string, string> = {
  JavaScript: 'https://cdn.simpleicons.org/javascript',
  TypeScript: 'https://cdn.simpleicons.org/typescript',
  React: 'https://cdn.simpleicons.org/react',
  'Vue.js': 'https://cdn.simpleicons.org/vuedotjs',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs',
  Python: 'https://cdn.simpleicons.org/python',
  Flutter: 'https://cdn.simpleicons.org/flutter',
  Dart: 'https://cdn.simpleicons.org/dart',
  HTML5: 'https://cdn.simpleicons.org/html5',
  CSS3: 'https://cdn.simpleicons.org/css3',
  'C++': 'https://cdn.simpleicons.org/cplusplus',
  C: 'https://cdn.simpleicons.org/c',
  'C#': 'https://cdn.simpleicons.org/csharp',
  MySQL: 'https://cdn.simpleicons.org/mysql',
  PostgreSQL: 'https://cdn.simpleicons.org/postgresql',
  MongoDB: 'https://cdn.simpleicons.org/mongodb',
  SQLite: 'https://cdn.simpleicons.org/sqlite',
  Supabase: 'https://cdn.simpleicons.org/supabase',
  Docker: 'https://cdn.simpleicons.org/docker',
  Git: 'https://cdn.simpleicons.org/git',
  GitHub: 'https://cdn.simpleicons.org/github',
  Bootstrap: 'https://cdn.simpleicons.org/bootstrap',
  MATLAB: 'https://cdn.simpleicons.org/matlab',
  'Android Studio': 'https://cdn.simpleicons.org/androidstudio',
  'VS Code': 'https://cdn.simpleicons.org/visualstudiocode',
  Vercel: 'https://cdn.simpleicons.org/vercel',
  Netlify: 'https://cdn.simpleicons.org/netlify',
  Render: 'https://cdn.simpleicons.org/render',
  FastAPI: 'https://cdn.simpleicons.org/fastapi',
  TensorFlow: 'https://cdn.simpleicons.org/tensorflow',
  PyTorch: 'https://cdn.simpleicons.org/pytorch',
  OpenAI: 'https://cdn.simpleicons.org/openai',
  Firebase: 'https://cdn.simpleicons.org/firebase',
  'API REST': 'https://cdn.simpleicons.org/postman',
  'Fetch API': 'https://cdn.simpleicons.org/javascript',
  'PokéAPI': 'https://cdn.simpleicons.org/javascript',
  Tkinter: 'https://cdn.simpleicons.org/python',
  Matplotlib: 'https://cdn.simpleicons.org/python',
  Hashlib: 'https://cdn.simpleicons.org/python',
  'Metodos Numéricos': 'https://cdn.simpleicons.org/matlab',
  'Newton-Raphson': 'https://cdn.simpleicons.org/matlab',
  PyGame: 'https://cdn.simpleicons.org/python',
  'REST Countries API': 'https://cdn.simpleicons.org/postman',
  'API REST Countries': 'https://cdn.simpleicons.org/postman',
  // fallbacks para tags genéricos
  'Machine Learning': 'https://cdn.simpleicons.org/python',
  'Computer Vision': 'https://cdn.simpleicons.org/opencv',
  NLP: 'https://cdn.simpleicons.org/python',
  Audio: 'https://cdn.simpleicons.org/python',
  AI: 'https://cdn.simpleicons.org/python',
  Game: 'https://cdn.simpleicons.org/javascript',
  CLI: 'https://cdn.simpleicons.org/gnubash',
  'Canvas API': 'https://cdn.simpleicons.org/javascript',
};

export const projects: Project[] = [
    {
    title: 'TravelApp',
    titleEs: 'TravelApp',
    titleEn: 'TravelApp',
    descriptionEs:
      'Aplicación de viaje con información de destinos, atracciones y actividades.',
    descriptionEn:
      'Travel application with information about destinations, attractions and activities.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    category: 'Web App',
    githubUrl: ' ',
    ogImageUrl: '/proyectos/Lalo/TravelApp/banner.png',
    galleryImages: ['/proyectos/Lalo/TravelApp/img0.png', '/proyectos/Lalo/TravelApp/img1.png', '/proyectos/Lalo/TravelApp/img2.png'],
  },
  {
    title: 'Rey Asesino',
    titleEs: 'Rey Asesino',
    titleEn: 'Assassin King',
    descriptionEs:
      'Aplicación web fullstack en producción. Plataforma interactiva con frontend moderno y backend robusto desplegada en Vercel.',
    descriptionEn:
      'Fullstack web application in production. Interactive platform with modern frontend and robust backend deployed on Vercel.',
    tags: ['TypeScript', 'React', 'Node.js'],
    category: 'Web App',
    githubUrl: 'https://github.com/p5Patricio/reyasesino-frontend',
    ogImageUrl: '/proyectos/Patricio/Rey Asesino/banner.webp',
    galleryImages: ['/proyectos/Patricio/Rey Asesino/banner.webp'],
    demoUrl: 'https://reyasesino-frontend.vercel.app/',
    backendUrl: 'https://github.com/p5Patricio/reyasesino-backend',
  },
    {
    title: 'Eventos SMA',
    titleEs: 'Eventos SMA',
    titleEn: 'SMA Events',
    descriptionEs:
      'Esta plataforma web está enfocada en la visualización y gestión de eventos culturales y sociales en San Miguel de Allende. Su objetivo principal es ofrecer a los usuarios un espacio donde puedan consultar información actualizada sobre actividades, festividades y eventos relevantes de la ciudad. La aplicación permite mostrar eventos de forma dinámica, utilizando una arquitectura moderna que combina frontend y backend. Además, integra una base de datos para almacenar y gestionar la información de los eventos, lo que facilita su actualización y escalabilidad. El proyecto también destaca por el uso de despliegues en la nube, utilizando diferentes plataformas para frontend y backend, lo que refleja buenas prácticas de desarrollo moderno y separación de responsabilidades.',
    descriptionEn:
      'This web platform focuses on the visualization and management of cultural and social events in San Miguel de Allende. Its main objective is to offer users a space where they can access updated information about activities, festivities, and relevant events in the city. The application allows dynamic display of events using a modern architecture that combines frontend and backend. It also integrates a database to store and manage event information, facilitating updates and scalability. The project also stands out for its cloud deployments, using different platforms for frontend and backend, reflecting modern development best practices and separation of concerns.',
    tags: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'MongoDB', 'GitHub', 'Netlify', 'Render'],
    category: 'Web App',
    githubUrl: 'https://github.com/mariodelgadoh/eventos-san-miguel-de-allende.git',
    ogImageUrl: '/proyectos/Mario/EventosSMA/EventosSMA.png',
    demoUrl: 'https://sma-eventos.netlify.app/',
    galleryImages: ['/proyectos/Mario/EventosSMA/EventosSMA.png', '/proyectos/Mario/EventosSMA/eventos1.jpg', '/proyectos/Mario/EventosSMA/eventos2.jpg'
      , '/proyectos/Mario/EventosSMA/eventos3.jpg', '/proyectos/Mario/EventosSMA/eventos4.jpg', '/proyectos/Mario/EventosSMA/eventos5.jpg'
      , '/proyectos/Mario/EventosSMA/eventos6.jpg', '/proyectos/Mario/EventosSMA/eventos7.jpg', '/proyectos/Mario/EventosSMA/eventos8.jpg'
      , '/proyectos/Mario/EventosSMA/eventos9.jpg', '/proyectos/Mario/EventosSMA/eventos10.jpg'
    ], 
  },
  {
    title: 'SnakeAI',
    titleEs: 'SnakeAI',
    titleEn: 'SnakeAI',
    descriptionEs:
      'Implementación del juego Snake con un agente de aprendizaje por refuerzo (Q-Learning). Visualización del entrenamiento en tiempo real.',
    descriptionEn:
      'Snake game implementation with a reinforcement learning agent (Q-Learning). Real-time training visualization.',
    tags: ['Python', 'PyGame', 'Machine Learning'],
    category: 'Game',
    githubUrl: 'https://github.com/p5Patricio/snake-ai',
    ogImageUrl: '/proyectos/Patricio/SnakeAI/banner.webp',
    galleryImages: ['/proyectos/Patricio/SnakeAI/banner.webp'],
  },
  {
    title: 'FitTrack Pro',
    titleEs: 'FitTrack Pro',
    titleEn: 'FitTrack Pro',
    descriptionEs:
      'Aplicación fullstack de seguimiento fitness con frontend moderno y backend escalable. Registra entrenamientos, progreso y métricas de salud.',
    descriptionEn:
      'Fullstack fitness tracking app with modern frontend and scalable backend. Logs workouts, progress and health metrics.',
    tags: ['TypeScript', 'React', 'Node.js'],
    category: 'Web App',
    githubUrl: 'https://github.com/p5Patricio/fittrack-pro-frontend',
    ogImageUrl: '/proyectos/Patricio/FitTrack Pro/banner.webp',
    galleryImages: ['/proyectos/Patricio/FitTrack Pro/banner.webp'],
    backendUrl: 'https://github.com/p5Patricio/fittrack-pro-backend',
  },
{
    title: 'Trámites Burócratas MX',
    titleEs: 'Trámites Burócratas MX',
    titleEn: 'Bureaucratic Procedures MX',
    descriptionEs:
      'Trámites Burócratas MX es una plataforma web diseñada para facilitar el acceso a información sobre trámites gubernamentales en México. El sistema permite a los usuarios consultar requisitos, procesos y detalles relacionados con distintos trámites burocráticos de manera rápida y organizada. El objetivo principal del proyecto es reducir la dificultad que enfrentan muchas personas al buscar información dispersa o confusa sobre procedimientos administrativos, ofreciendo una interfaz intuitiva y accesible desde cualquier dispositivo. La aplicación utiliza una base de datos en la nube para gestionar la información de los trámites y está desplegada en una plataforma de hosting para garantizar disponibilidad en línea.',
    descriptionEn:
      'This web platform focuses on the visualization and management of cultural and social events in San Miguel de Allende. Its main objective is to offer users a space where they can access updated information about activities, festivities, and relevant events in the city. The application allows dynamic display of events using a modern architecture that combines frontend and backend. It also integrates a database to store and manage event information, facilitating updates and scalability. The project also stands out for its cloud deployments, using different platforms for frontend and backend, reflecting modern development best practices and separation of concerns.',
    tags: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'MongoDB', 'GitHub', 'Supabase', 'Netlify'],
    category: 'Web App',
    githubUrl: 'https://github.com/mariodelgadoh/Tramites-Burocratas-MX.git',
    ogImageUrl: '/proyectos/Mario/Tramites/Tramites.png',
    demoUrl: 'https://tramites-burocratas.netlify.app/',
    galleryImages: ['/proyectos/Mario/Tramites/Tramites.png', '/proyectos/Mario/Tramites/tramites1.jpg', '/proyectos/Mario/Tramites/tramites2.jpg',
      '/proyectos/Mario/Tramites/tramites3.jpg','/proyectos/Mario/Tramites/tramites4.jpg','/proyectos/Mario/Tramites/tramites5.jpg',
      '/proyectos/Mario/Tramites/tramites6.jpg','/proyectos/Mario/Tramites/tramites7.jpg','/proyectos/Mario/Tramites/tramites8.jpg',
      '/proyectos/Mario/Tramites/tramites9.jpg','/proyectos/Mario/Tramites/tramites10.jpg',
    ],
  },
  {
    title: 'AudioMood',
    titleEs: 'AudioMood',
    titleEn: 'AudioMood',
    descriptionEs:
      'Clasificador de emociones a partir de audio usando redes neuronales convolucionales. Detecta el estado de ánimo en grabaciones de voz en menos de un segundo.',
    descriptionEn:
      'Emotion classifier from audio using convolutional neural networks. Detects mood in voice recordings in under one second.',
    tags: ['Python', 'PyTorch', 'Audio'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/p5Patricio/audiomood',
    ogImageUrl: '/proyectos/Patricio/AudioMood/banner.webp',
    galleryImages: ['/proyectos/Patricio/AudioMood/banner.webp'],
  },
  {
    title: 'WisprLocal',
    titleEs: 'WisprLocal',
    titleEn: 'WisprLocal',
    descriptionEs:
      'Herramienta de transcripción de audio local usando Whisper de OpenAI. Procesamiento de voz a texto sin conexión a internet.',
    descriptionEn:
      "Local audio transcription tool using OpenAI's Whisper. Offline speech-to-text processing.",
    tags: ['Python', 'OpenAI', 'Audio'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/p5Patricio/WisprLocal',
    ogImageUrl: '/proyectos/Patricio/WisprLocal/banner.webp',
    galleryImages: ['/proyectos/Patricio/WisprLocal/banner.webp'],
  },
  {
    title: 'Banderas del Mundo - Aplicación Web Interactiva',
    titleEs: 'Banderas del Mundo - Aplicación Web Interactiva',
    titleEn: 'World Flags - Interactive Web Application',
    descriptionEs:
      'Esta aplicación web interactiva permite explorar y visualizar banderas de distintos países del mundo. La aplicación consume una API externa (REST Countries API) para obtener información actualizada sobre los países, incluyendo sus banderas, capitales, poblaciones, idiomas y otras características relevantes. El objetivo principal del proyecto es ofrecer una experiencia visual atractiva y dinámica, donde el usuario pueda interactuar con los datos en tiempo real. Sirve como práctica para el consumo de APIs, manipulación del DOM y desarrollo de interfaces modernas en el frontend.',
    descriptionEn:
      'This interactive web application allows you to explore and view flags from different countries around the world. The application consumes an external API (REST Countries API) to obtain up-to-date information about countries, including their flags, capitals, populations, languages, and other relevant characteristics. The main objective of the project is to offer an attractive and dynamic visual experience, where the user can interact with data in real time. It serves as practice for API consumption, DOM manipulation, and modern frontend interface development.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'API REST', 'Vercel', 'GitHub'],
    category: 'Game',
    githubUrl: 'https://github.com/mariodelgadoh/banderas.git',
    ogImageUrl: '/proyectos/Mario/Banderas/banderas.jpg',
    demoUrl: 'https://banderamaestra.vercel.app/',
    galleryImages: ['/proyectos/Mario/Banderas/banderas.jpg','/proyectos/Mario/Banderas/banderas1.jpg', '/proyectos/Mario/Banderas/banderas2.jpg', '/proyectos/Mario/Banderas/banderas3.jpg',
      '/proyectos/Mario/Banderas/banderas4.jpg', '/proyectos/Mario/Banderas/banderas5.jpg', '/proyectos/Mario/Banderas/banderas6.jpg', '/proyectos/Mario/Banderas/banderas7.jpg',
      '/proyectos/Mario/Banderas/banderas8.jpg', '/proyectos/Mario/Banderas/banderas9.jpg', '/proyectos/Mario/Banderas/banderas10.jpg'
    ],
  },
  {
    title: 'EcoTracker',
    titleEs: 'EcoTracker',
    titleEn: 'EcoTracker',
    descriptionEs:
      'Aplicación web para calcular y visualizar tu huella de carbono personal. Sugiere acciones de impacto con gamificación para fomentar hábitos sostenibles.',
    descriptionEn:
      'Web app to calculate and visualize your personal carbon footprint. Suggests impactful actions with gamification to build sustainable habits.',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'Web App',
    githubUrl: 'https://github.com/p5Patricio/ecotracker',
    ogImageUrl: '/proyectos/Patricio/EcoTracker/banner.webp',
    galleryImages: ['/proyectos/Patricio/EcoTracker/banner.webp'],
  },
  {
    title: 'Clasificador Entrenador NBA',
    titleEs: 'Clasificador Entrenador NBA',
    titleEn: 'NBA Coach Classifier',
    descriptionEs:
      'Sistema de IA que clasifica entrenadores de la NBA usando machine learning. Análisis predictivo de rendimiento deportivo.',
    descriptionEn:
      'AI system that classifies NBA coaches using machine learning. Predictive sports performance analysis.',
    tags: ['Python', 'TypeScript', 'Machine Learning'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/p5Patricio/Clasificador_Entrenador-NBA',
    ogImageUrl: '/proyectos/Patricio/Clasificador Entrenador NBA/banner.webp',
    galleryImages: ['/proyectos/Patricio/Clasificador Entrenador NBA/banner.webp'],
  },
  {
    title: 'Pokédex Web App',
    titleEs: 'Pokédex Web App',
    titleEn: 'Pokédex Web App',
    descriptionEs:
      'Este proyecto es una aplicación web interactiva tipo Pokédex, que permite consultar información detallada de distintos Pokémon de manera dinámica. La aplicación consume datos desde una API externa (PokéAPI) para mostrar información como nombre, imagen, habilidades, tipos y otras características relevantes de cada Pokémon. El objetivo principal del proyecto es demostrar habilidades en desarrollo frontend, manejo de datos asíncronos y diseño de interfaces amigables para el usuario.',
    descriptionEn:
      'This project is an interactive Pokédex-style web application that allows querying detailed information about different Pokémon dynamically. The application consumes data from an external API (PokéAPI) to display information such as name, image, abilities, types, and other relevant characteristics of each Pokémon. The main objective of the project is to demonstrate skills in frontend development, asynchronous data handling, and user-friendly interface design.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Fetch API', 'PokéAPI', 'Vercel', 'GitHub', 'React'],
    category: 'Game',
    githubUrl: 'https://github.com/mariodelgadoh/pokedex.git',
    ogImageUrl: '/proyectos/Mario/Pokedex/pokedex.jpg',
    demoUrl: 'https://banderamaestra.vercel.app/',
    galleryImages: ['/proyectos/Mario/Pokedex/pokedex.jpg', '/proyectos/Mario/Pokedex/pokedex-details.jpg', '/proyectos/Mario/Pokedex/pokedex-end-game.jpg', '/proyectos/Mario/Pokedex/pokedex-generation.jpg',
      '/proyectos/Mario/Pokedex/pokedex-list.jpg', '/proyectos/Mario/Pokedex/pokedex-main.jpg', '/proyectos/Mario/Pokedex/pokedex-Memory-Game.jpg', '/proyectos/Mario/Pokedex/pokedex-menu-games.jpg',
      '/proyectos/Mario/Pokedex/pokedex-results.jpg', '/proyectos/Mario/Pokedex/pokedex-search.jpg'
     ],
  },
  {
    title: 'DevPortfolio CLI',
    titleEs: 'DevPortfolio CLI',
    titleEn: 'DevPortfolio CLI',
    descriptionEs:
      'Herramienta de línea de comandos para generar portafolios de desarrollador estáticos desde un archivo JSON. Exporta a HTML, PDF y Markdown.',
    descriptionEn:
      'Command-line tool to generate static developer portfolios from a JSON config file. Exports to HTML, PDF and Markdown.',
    tags: ['Node.js', 'TypeScript', 'CLI'],
    category: 'Web App',
    githubUrl: 'https://github.com/p5Patricio/devportfolio-cli',
    ogImageUrl: '/proyectos/Patricio/DevPortfolio CLI/banner.webp',
    galleryImages: ['/proyectos/Patricio/DevPortfolio CLI/banner.webp'],
  },
  {
    title: 'Intérprete LSM',
    titleEs: 'Intérprete LSM',
    titleEn: 'LSM Interpreter',
    descriptionEs:
      'Intérprete de Lenguaje de Señas Mexicano basado en computer vision. Traducción de señas a texto en tiempo real.',
    descriptionEn:
      'Mexican Sign Language interpreter based on computer vision. Real-time sign-to-text translation.',
    tags: ['Python', 'Computer Vision', 'NLP'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/p5Patricio/Interprete-LSM',
    ogImageUrl: '/proyectos/Patricio/Intérprete-LSM/banner.webp',
    galleryImages: ['/proyectos/Patricio/Intérprete-LSM/banner.webp'],
  },
  {
    title: 'ERP Enlaces Terrestres Nacionales (ETN)',
    titleEs: 'ERP Enlaces Terrestres Nacionales (ETN)',
    titleEn: 'ERP Enlaces Terrestres Nacionales (ETN)',
    descriptionEs:
      'Sistema ERP desarrollado para la empresa de transporte Enlaces Terrestres Nacionales (ETN) que integra y gestiona eficientemente las operaciones internas a través de siete departamentos principales: Recursos Humanos, Finanzas, Inventarios, Compras, Proveedores, Ventas y Logística. El sistema cuenta con un usuario Admin con acceso total, así como usuarios generales y responsables para cada área.',
    descriptionEn:
      'ERP system developed for the transportation company Enlaces Terrestres Nacionales (ETN) that integrates and efficiently manages internal operations through seven main departments: Human Resources, Finance, Inventory, Purchasing, Suppliers, Sales, and Logistics. The system has an Admin user with full access, as well as general users and managers for each area.',
    tags: ['Python', 'Tkinter', 'SQLite', 'Matplotlib', 'Hashlib'],
    category: 'ERP',
    githubUrl: 'https://github.com/mariodelgadoh/erp-etn-mario-delgado.git',
    ogImageUrl: '/proyectos/Mario/ERP-ETN/etn.jpg',
    galleryImages: ['/proyectos/Mario/ERP-ETN/etn.jpg', '/proyectos/Mario/ERP-ETN/admin.png', '/proyectos/Mario/ERP-ETN/compras.png', '/proyectos/Mario/ERP-ETN/erp-login.png',
      '/proyectos/Mario/ERP-ETN/finanzas.png', '/proyectos/Mario/ERP-ETN/inventario.png', '/proyectos/Mario/ERP-ETN/logistica.png', '/proyectos/Mario/ERP-ETN/proveedores.png',
      '/proyectos/Mario/ERP-ETN/rh.png', '/proyectos/Mario/ERP-ETN/venta.png', '/proyectos/Mario/ERP-ETN/reporte.png'
    ],
  },
    {
    title: 'DevPortfolio CLI',
    titleEs: 'DevPortfolio CLI',
    titleEn: 'DevPortfolio CLI',
    descriptionEs:
      'Herramienta de línea de comandos para generar portafolios de desarrollador estáticos desde un archivo JSON. Exporta a HTML, PDF y Markdown.',
    descriptionEn:
      'Command-line tool to generate static developer portfolios from a JSON config file. Exports to HTML, PDF and Markdown.',
    tags: ['Node.js', 'TypeScript', 'CLI'],
    category: 'Web App',
    githubUrl: 'https://github.com/p5Patricio/devportfolio-cli',
    ogImageUrl: '/proyectos/Patricio/DevPortfolio CLI/banner.webp',
    galleryImages: ['/proyectos/Patricio/DevPortfolio CLI/banner.webp'],
  },
  {
    title: 'Infinite Tic-Tac-Toe',
    titleEs: 'Gato Infinito',
    titleEn: 'Infinite Tic-Tac-Toe',
    descriptionEs:
      'Juego de gato infinito con mecánicas innovadoras. Desarrollado con TypeScript para una experiencia interactiva y adictiva.',
    descriptionEn:
      'Infinite tic-tac-toe game with innovative mechanics. Built with TypeScript for an interactive and addictive experience.',
    tags: ['TypeScript', 'JavaScript', 'Game'],
    category: 'Game',
    githubUrl: 'https://github.com/p5Patricio/infinite-tic-tac-toe',
    ogImageUrl: '/proyectos/Patricio/Infinite Tic-Tac-Toe/banner.webp',
    galleryImages: ['/proyectos/Patricio/Infinite Tic-Tac-Toe/banner.webp'],
  },
  {
    title: 'Simulador de Órbitas Planetarias',
    titleEs: 'Simulador de Órbitas Planetarias',
    titleEn: 'Planetary Orbits Simulator',
    descriptionEs:
      'Programa de Simulación de Órbitas Planetarias y Cálculo del Error Cuadrático Medio. En el ámbito de la astronomía y la exploración espacial, la comprensión precisa de las órbitas planetarias es crucial para diversas aplicaciones, que van desde la investigación científica hasta el diseño de misiones espaciales. Este proyecto se enfoca en el desarrollo de un programa, accesible a través de una página web, que permite simular las órbitas planetarias dentro del sistema solar. La evaluación de la exactitud de las simulaciones se realiza mediante el uso del error cuadrático medio (ECM). El programa emplea métodos numéricos avanzados, como el método de Newton-Raphson, para el cálculo de la anomalía excéntrica y la minimización del error cuadrático.',
    descriptionEn:
      'Planetary Orbits Simulation Program and Mean Squared Error Calculation. In the field of astronomy and space exploration, precise understanding of planetary orbits is crucial for various applications, ranging from scientific research to space mission design. This project focuses on developing a program, accessible through a web page, that allows simulating planetary orbits within the solar system. The accuracy of the simulations is evaluated using the mean squared error (MSE). The program employs advanced numerical methods, such as the Newton-Raphson method, for calculating eccentric anomaly and minimizing quadratic error.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Metodos Numéricos', 'Newton-Raphson', 'GitHub'],
    category: 'Web App',
    githubUrl: 'https://github.com/mariodelgadoh/orbitasplanetarias.git',
    ogImageUrl: '/proyectos/Mario/Orbitas/sistemasolar.jpg',
    galleryImages: ['/proyectos/Mario/Orbitas/sistemasolar.jpg', '/proyectos/Mario/Orbitas/orbitas-inicio.png', '/proyectos/Mario/Orbitas/orbitas-anomalia.png', '/proyectos/Mario/Orbitas/orbitas-excentricidad.png',
      '/proyectos/Mario/Orbitas/orbitas-info.png', '/proyectos/Mario/Orbitas/orbitas-operaciones.png', '/proyectos/Mario/Orbitas/orbitas-planetas.png', '/proyectos/Mario/Orbitas/orbitas-resultados.png',
      '/proyectos/Mario/Orbitas/orbitas-sistemasolar.png', '/proyectos/Mario/Orbitas/orbitas-tabla.png', '/proyectos/Mario/Orbitas/orbitas-visualizacion.png'
    ],
  },
  {
    title: 'DevPortfolio CLI',
    titleEs: 'DevPortfolio CLI',
    titleEn: 'DevPortfolio CLI',
    descriptionEs:
      'Herramienta de línea de comandos para generar portafolios de desarrollador estáticos desde un archivo JSON. Exporta a HTML, PDF y Markdown.',
    descriptionEn:
      'Command-line tool to generate static developer portfolios from a JSON config file. Exports to HTML, PDF and Markdown.',
    tags: ['Node.js', 'TypeScript', 'CLI'],
    category: 'Web App',
    githubUrl: 'https://github.com/p5Patricio/devportfolio-cli',
    ogImageUrl: '/proyectos/Patricio/DevPortfolio CLI/banner.webp',
    galleryImages: ['/proyectos/Patricio/DevPortfolio CLI/banner.webp'],
  },
  {
    title: 'Art Classifier',
    titleEs: 'Clasificador de Arte',
    titleEn: 'Art Classifier',
    descriptionEs:
      'Clasificador de obras de arte usando inteligencia artificial. Identifica estilos, artistas y movimientos artísticos automáticamente.',
    descriptionEn:
      'Artwork classifier using artificial intelligence. Automatically identifies styles, artists and art movements.',
    tags: ['Python', 'AI', 'Computer Vision'],
    category: 'AI / ML',
    githubUrl: 'https://github.com/p5Patricio/Art_Classifier',
    ogImageUrl: '/proyectos/Patricio/Art Classifier/banner.webp',
    galleryImages: ['/proyectos/Patricio/Art Classifier/banner.webp'],
  },
  {
    title: 'Fitodex',
    titleEs: 'Fitodex',
    titleEn: 'Fitodex',
    descriptionEs:
      'Conoce más sobre Fitodex, nuestra misión y visión. Somos una empresa agrícola dedicada a la producción y venta de cultivos, insecticidas y otros productos relacionados. Nuestra misión es ofrecer soluciones efectivas y sostenibles para el manejo de plagas y la mejora de los cultivos, garantizando la calidad y eficacia de nuestros productos. Nuestra visión es ser líderes en el sector agrícola, proporcionando innovaciones que promuevan prácticas agrícolas responsables y sostenibles, contribuyendo al crecimiento y éxito de nuestros clientes.' +
      ' Fitodex ha sido desarrollada para facilitar el acceso a información técnica sobre pesticidas y fertilizantes, dirigida a productores agrícolas, técnicos y profesionales del sector agropecuario. Su función principal es permitir una búsqueda ágil y precisa de productos mediante el nombre comercial o el ingrediente activo, brindando apoyo en la toma de decisiones relacionadas con el manejo fitosanitario de los cultivos.',
    descriptionEn:
      'Learn more about Fitodex, our mission and vision. We are an agricultural company dedicated to the production and sale of crops, insecticides and other related products. Our mission is to offer effective and sustainable solutions for pest management and crop improvement, guaranteeing the quality and effectiveness of our products. Our vision is to be leaders in the agricultural sector, providing innovations that promote responsible and sustainable agricultural practices, contributing to the growth and success of our clients.' +
      ' At Fitodex, we are committed to excellence in agricultural solutions, combining science, technology and sustainability to meet the needs of our customers and contribute to a more productive and environmentally friendly agriculture.',
    tags: ['Vue.js', 'JavaScript', 'Node.js', 'MongoDB', 'Docker', 'HTML5', 'CSS3', 'GitHub'],
    category: 'Web App',
    githubUrl: 'https://github.com/mariodelgadoh/frontend-fitodex.git',
    ogImageUrl: '/proyectos/Mario/Fitodex/fito.png',
    demoUrl: 'https://frontend-fitodex.fly.dev/',
    galleryImages: ['/proyectos/Mario/Fitodex/fito.png', '/proyectos/Mario/Fitodex/inicio.png', '/proyectos/Mario/Fitodex/cultivos.png', '/proyectos/Mario/Fitodex/insecticidas.png',
      '/proyectos/Mario/Fitodex/ug.png', '/proyectos/Mario/Fitodex/busqueda.png', '/proyectos/Mario/Fitodex/detalles.png', '/proyectos/Mario/Fitodex/ubicacion.png',
      '/proyectos/Mario/Fitodex/editar.png', '/proyectos/Mario/Fitodex/usuarios.png', '/proyectos/Mario/Fitodex/login.png'
     ],
    backendUrl: 'https://github.com/mariodelgadoh/backend-fitodex',
  },
];