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
    title: "Rey Asesino",
    descriptionEs:
      "Aplicación web fullstack en producción. Plataforma interactiva con frontend moderno y backend robusto desplegada en Vercel.",
    descriptionEn:
      "Fullstack web application in production. Interactive platform with modern frontend and robust backend deployed on Vercel.",
    tags: ["TypeScript", "React", "Node.js"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/reyasesino-frontend",
    ogImageUrl: "/proyectos/Patricio/Rey Asesino/banner.webp",
    demoUrl: "https://reyasesino-frontend.vercel.app/",
    backendUrl: "https://github.com/p5Patricio/reyasesino-backend",
  },
  {
    title: "FitTrack Pro",
    descriptionEs:
      "Aplicación fullstack de seguimiento fitness con frontend moderno y backend escalable. Registra entrenamientos, progreso y métricas de salud.",
    descriptionEn:
      "Fullstack fitness tracking app with modern frontend and scalable backend. Logs workouts, progress and health metrics.",
    tags: ["TypeScript", "React", "Node.js"],
    category: "Web App",
    githubUrl: "https://github.com/p5Patricio/fittrack-pro-frontend",
    ogImageUrl: "/proyectos/Patricio/FitTrack Pro/banner.webp",
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
    ogImageUrl: "/proyectos/Patricio/WisprLocal/banner.webp",
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
    ogImageUrl: "/proyectos/Patricio/Clasificador Entrenador NBA/banner.webp",
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
    ogImageUrl: "/proyectos/Patricio/Intérprete-LSM/banner.webp",
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
    ogImageUrl: "/proyectos/Patricio/Infinite Tic-Tac-Toe/banner.webp",
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
    ogImageUrl: "/proyectos/Patricio/Art Classifier/banner.webp",
  },
];
