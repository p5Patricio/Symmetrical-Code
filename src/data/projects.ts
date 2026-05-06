export interface Project {
  title: string;
  descriptionEs: string;
  descriptionEn: string;
  tags: string[];
  category: string;
  githubUrl: string;
  ogImageUrl: string;
  demoUrl?: string;
  backendUrl?: string;
}

export const projects: Project[] = [
  {
    title: "FitTrack Pro",
    descriptionEs:
      "Aplicación fullstack de seguimiento fitness con frontend moderno y backend escalable. Registra entrenamientos, progreso y métricas de salud.",
    descriptionEn:
      "Fullstack fitness tracking app with modern frontend and scalable backend. Logs workouts, progress and health metrics.",
    tags: ["TypeScript", "React", "Node.js"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/fittrack-pro-frontend",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/fittrack-pro-frontend",
    backendUrl: "https://github.com/p5Patricio/fittrack-pro-backend",
  },
  {
    title: "WisprLocal",
    descriptionEs:
      "Herramienta de transcripción de audio local usando Whisper de OpenAI. Procesamiento de voz a texto sin conexión a internet.",
    descriptionEn:
      "Local audio transcription tool using OpenAI's Whisper. Offline speech-to-text processing.",
    tags: ["Python", "OpenAI", "Audio"],
    category: "AI / ML",
    githubUrl: "https://github.com/p5Patricio/WisprLocal",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/WisprLocal",
  },
  {
    title: "Clasificador Entrenador NBA",
    descriptionEs:
      "Sistema de IA que clasifica entrenadores de la NBA usando machine learning. Análisis predictivo de rendimiento deportivo.",
    descriptionEn:
      "AI system that classifies NBA coaches using machine learning. Predictive sports performance analysis.",
    tags: ["Python", "TypeScript", "Machine Learning"],
    category: "AI / ML",
    githubUrl: "https://github.com/p5Patricio/Clasificador_Entrenador-NBA",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/Clasificador_Entrenador-NBA",
  },
  {
    title: "Portafolio Sakura",
    descriptionEs:
      "Portafolio web con estética inspirada en cultura japonesa. Diseño visual único con animaciones fluidas y experiencia inmersiva.",
    descriptionEn:
      "Web portfolio with Japanese culture inspired aesthetics. Unique visual design with fluid animations and immersive experience.",
    tags: ["TypeScript", "HTML", "CSS"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/Portafolio-Sakura",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/Portafolio-Sakura",
  },
  {
    title: "Intérprete LSM",
    descriptionEs:
      "Intérprete de Lenguaje de Señas Mexicano basado en computer vision. Traducción de señas a texto en tiempo real.",
    descriptionEn:
      "Mexican Sign Language interpreter based on computer vision. Real-time sign-to-text translation.",
    tags: ["Python", "Computer Vision", "NLP"],
    category: "AI / ML",
    githubUrl: "https://github.com/p5Patricio/Interprete-LSM",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/Interprete-LSM",
  },
  {
    title: "Infinite Tic-Tac-Toe",
    descriptionEs:
      "Juego de gato infinito con mecánicas innovadoras. Desarrollado con TypeScript para una experiencia interactiva y adictiva.",
    descriptionEn:
      "Infinite tic-tac-toe game with innovative mechanics. Built with TypeScript for an interactive and addictive experience.",
    tags: ["TypeScript", "JavaScript", "Game"],
    category: "Game",
    githubUrl: "https://github.com/p5Patricio/infinite-tic-tac-toe",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/infinite-tic-tac-toe",
  },
  {
    title: "Art Classifier",
    descriptionEs:
      "Clasificador de obras de arte usando inteligencia artificial. Identifica estilos, artistas y movimientos artísticos automáticamente.",
    descriptionEn:
      "Artwork classifier using artificial intelligence. Automatically identifies styles, artists and art movements.",
    tags: ["Python", "AI", "Computer Vision"],
    category: "AI / ML",
    githubUrl: "https://github.com/p5Patricio/Art_Classifier",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/Art_Classifier",
  },
  {
    title: "Mi Portafolio TS",
    descriptionEs:
      "Portafolio personal desarrollado con React y TypeScript. Diseño moderno, responsivo y optimizado para rendimiento.",
    descriptionEn:
      "Personal portfolio built with React and TypeScript. Modern, responsive and performance-optimized design.",
    tags: ["TypeScript", "React", "CSS"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/mi-portafolio-ts",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/mi-portafolio-ts",
  },
  {
    title: "Sistema de Inventario",
    descriptionEs:
      "Sistema de gestión de inventario con interfaz Vue.js. Control de stock, productos y generación de reportes.",
    descriptionEn:
      "Inventory management system with Vue.js interface. Stock control, products and report generation.",
    tags: ["Vue", "JavaScript", "HTML"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/inventario-frontend",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/inventario-frontend",
  },
  {
    title: "Fashion Web",
    descriptionEs:
      "Página web de moda con diseño elegante y responsive. HTML y CSS puro con enfoque visual y experiencia de usuario.",
    descriptionEn:
      "Fashion website with elegant and responsive design. Pure HTML and CSS with visual focus and user experience.",
    tags: ["HTML", "CSS", "Responsive"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/fashionWeb",
    ogImageUrl: "https://opengraph.githubassets.com/1/p5Patricio/fashionWeb",
  },
];
