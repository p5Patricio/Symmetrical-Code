# 🌐 Symmetrical Code - Website

Sitio web oficial de **Symmetrical Code**, un Software Studio especializado en desarrollo de soluciones digitales a medida.

> ⚠️ **IMPORTANTE:** El desarrollo activo está en la rama **`patodev`**. La rama `main` se mantiene como código estable.

## ✨ Features

- 🎨 **Diseño moderno** con Tailwind CSS y tema dark/cyber
- 🌎 **Internacionalización** (i18n) con soporte para español e inglés
- 🤖 **Chatbot integrado** — Widget flotante conectado al backend vía Groq API
- 📱 **Responsive** — Se adapta a mobile, tablet y desktop
- ⚡ **Performance** — Construido con Vite para builds ultra-rápidas

## 🛠️ Tecnologías

- React 18 + TypeScript
- Vite
- Tailwind CSS
- i18next (internacionalización)
- Three.js (efectos 3D en Hero)

## 🚀 Empezar

```bash
# Clonar el repo
git clone https://github.com/p5Patricio/Symmetrical-Code.git

# Cambiar a la rama de desarrollo
git checkout patodev

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

El sitio arranca en `http://localhost:5173`.

## 🤖 Chatbot

El sitio incluye un **widget de chatbot** en la esquina inferior derecha que se conecta al backend para responder preguntas sobre Symmetrical Code.

### Configuración del chatbot

Creá un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Asegurate de que la URL del backend sea correcta:

```env
VITE_API_URL=http://localhost:3001/api/chat
```

> Para que el chatbot funcione, también necesitás correr el [backend del chatbot](https://github.com/p5Patricio/Symmetrical-Code-Backend).

## 📁 Estructura

```
src/
├── components/
│   ├── chat/
│   │   └── ChatWidget.tsx      # Widget del chatbot
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ProjectsSection.tsx
│       ├── TeamSection.tsx
│       └── ContactSection.tsx
├── pages/
│   └── HomePage.tsx
├── i18n/
│   ├── index.ts
│   └── locales/
│       ├── es.json
│       └── en.json
└── App.tsx
```

## 📱 Integración WhatsApp

El chatbot también está preparado para funcionar en WhatsApp. Ver el repo del backend para más detalles.

## 🏷️ Licencia

MIT - Symmetrical Code Team
