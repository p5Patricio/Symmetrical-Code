# 🌐 Symmetrical Code - Website

Sitio web oficial de **Symmetrical Code**, un Software Studio especializado en desarrollo de soluciones digitales a medida.

> ⚠️ **IMPORTANTE:** El desarrollo activo está en la rama **`patodev`**. 
> Se ha migrado el gestor de paquetes a **PNPM** para mayor seguridad y eficiencia.

## ✨ Features

- 🎨 **Diseño moderno** con Tailwind CSS y tema dark/cyber.
- 🌎 **Internacionalización** (i18n) con soporte para español e inglés.
- 📱 **Responsive** — Optimizado específicamente para dispositivos móviles.
- ⚡ **Performance** — Arquitectura SPA con **React Router** y carga optimizada.
- 🛡️ **Testing** — Suite de pruebas con **Vitest** cubriendo navegación e integridad.
- 💬 **WhatsApp Direct** — Botón de contacto directo con aviso automático (autoprompt).

## 🛠️ Tecnologías

- **React 18 + TypeScript**
- **PNPM** (Package Manager)
- **React Router** (Navegación nativa)
- **Vitest + React Testing Library** (Testing)
- **Tailwind CSS**
- **i18next** (Traducciones)
- **Three.js** (Efectos 3D en Hero)

## 🚀 Instalación y Ejecución

Para asegurar la integridad de las dependencias, es **obligatorio** usar `pnpm`.

```bash
# 1. Clonar el repo (si no lo tienes)
git clone https://github.com/p5Patricio/Symmetrical-Code.git

# 2. Cambiar a la rama de desarrollo
git checkout patodev

# 3. Instalar dependencias con PNPM
pnpm install

# 4. Correr en desarrollo
pnpm run dev

# 5. Ejecutar tests
pnpm test
```

El sitio arranca por defecto en `http://localhost:5173` (o el siguiente puerto disponible).

## 📁 Nueva Estructura de Navegación

Hemos pasado de un modelo de superposición (overlays) a **Rutas Reales**:
- `/` - Landing Page (Hero, Servicios, Estudio, Contacto).
- `/proyectos` - Galería completa de proyectos.

### Cambios Clave:
- **Sección Servicios:** Rediseño minimalista, rectangular y sin modales para comunicación directa.
- **Sección Estudio:** Nuevo layout horizontal ("Arquitectónico") centrado en pilares de ingeniería.
- **WhatsApp Button:** Reemplaza al antiguo Chatbot. Incluye un tooltip que aparece automáticamente a los 2s.

## 🧪 Testing

Para mantener la calidad de **Software Studio**, el proyecto cuenta con tests automatizados:

```bash
# Ejecutar todos los tests (Integridad, i18n, Rutas)
pnpm test
```

**Nota para devs:** Si agregas una sección o cambias una traducción, asegúrate de que los tests de `i18n` sigan pasando para evitar mostrar llaves técnicas (`hero.title`) al usuario.

## 📁 Directorios

```
src/
├── components/
│   ├── chat/
│   │   └── ChatWidget.tsx      # Botón de WhatsApp
│   ├── layout/
│   │   ├── Navbar.tsx          # Navbar Global
│   │   ├── GalleryNavbar.tsx   # Navbar específica de Galería
│   │   └── Footer.tsx
│   └── sections/               # Componentes de la Landing
├── pages/
│   ├── HomePage.tsx            # Contenedor de la Landing (/)
│   └── ProjectsPage.tsx        # Página de Galería (/proyectos)
├── test/                       # Suite de tests (Vitest)
└── i18n/                       # Configuración y locales
```

## 🏷️ Licencia

MIT - Symmetrical Code Team
