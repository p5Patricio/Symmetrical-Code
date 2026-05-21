# Symmetrical Code — Frontend

Sitio web oficial de **Symmetrical Code**, un Software Studio en etapa inicial. La página comunica una propuesta honesta: construir productos digitales con claridad, equilibrio entre diseño y código, y una base preparada para crecer.

> **Rama activa:** `patodev`  
> **Package manager obligatorio:** `pnpm`  
> **No usar:** `npm install`, `npm run`, `package-lock.json` ni `yarn.lock` en este frontend.

## Quick path para colaboradores

```bash
# 1. Clonar el repositorio
git clone https://github.com/p5Patricio/Symmetrical-Code.git
cd Symmetrical-Code

# 2. Trabajar sobre la rama activa
git checkout patodev

# 3. Instalar dependencias
pnpm install

# 4. Ejecutar en desarrollo
pnpm dev

# 5. Validar antes de subir cambios
pnpm lint
pnpm test -- --run
pnpm build
```

La app local normalmente abre en:

```txt
http://localhost:5173
```

Si ese puerto está ocupado, Vite usará el siguiente disponible y lo mostrará en la terminal.

## Qué se está haciendo ahora

| Área | Decisión actual |
| --- | --- |
| Inicio / Hero | Mensaje orientado a startup inicial: sin prometer años de experiencia, clientes o métricas infladas. |
| Slogan actual | **“Diseño y código en equilibrio para tu idea”**. |
| Animación del hero | Se conserva la ventanita que genera código, pero el contenido ahora comunica proceso y marca. |
| Tarjetas tecnológicas | Se removieron del inicio las tarjetas/chips como React, TypeScript, Node.js, Next.js, Docker y AWS. |
| Package manager | El frontend usa exclusivamente PNPM. |
| Idiomas | Todo texto visible debe existir en español e inglés dentro de `src/i18n/locales/`. |

## Cómo se utiliza la página

La landing está pensada como una página pública para explicar qué ofrece Symmetrical Code y guiar al visitante hacia contacto.

| Sección | Propósito | Archivo principal |
| --- | --- | --- |
| Inicio | Presenta el slogan, propuesta de valor y animación visual. | `src/components/sections/HeroSection.tsx` |
| Servicios | Explica las soluciones digitales ofrecidas. | `src/components/sections/ServicesSection.tsx` |
| Proyectos | Muestra la galería y casos disponibles. | `src/pages/ProjectsPage.tsx` |
| Equipo / Estudio | Comunica pilares de trabajo del estudio. | `src/components/sections/TeamSection.tsx` |
| Footer | Contacto, redes y modales legales. | `src/components/layout/Footer.tsx` |
| WhatsApp | Botón flotante de contacto directo. | `src/components/chat/ChatWidget.tsx` |

### Navegación

- `/` muestra la landing completa.
- `/proyectos` muestra la galería de proyectos en página completa.
- El botón flotante de WhatsApp queda visible sobre la página para contacto rápido.

## Reglas de contenido

Para mantener la comunicación coherente con la etapa actual del estudio:

- Evitar frases que impliquen clientes, experiencia comprobada o métricas que todavía no se tienen.
- Preferir mensajes sobre claridad, acompañamiento, proceso, diseño útil y código limpio.
- No volver a agregar chips de tecnologías en el hero/inicio salvo que se decida explícitamente.
- Si se cambia un texto visible, actualizar `es.json` y `en.json` con las mismas llaves.

## Flujo de trabajo recomendado

1. Crear cambios pequeños y fáciles de revisar.
2. Validar con PNPM:
   ```bash
   pnpm lint
   pnpm test -- --run
   pnpm build
   ```
3. Revisar visualmente en navegador con `pnpm dev`.
4. Hacer commit a `patodev`.
5. Subir cambios:
   ```bash
   git push origin patodev
   ```

## Estructura útil

```txt
src/
├── components/
│   ├── chat/                  # WhatsApp flotante
│   ├── layout/                # Navbar, GalleryNavbar, Footer
│   └── sections/              # Secciones de la landing
├── i18n/
│   ├── index.ts               # Configuración i18n
│   └── locales/               # Textos ES/EN
├── pages/                     # Rutas principales
└── test/                      # Setup y pruebas Vitest
```

## Scripts disponibles

| Comando | Uso |
| --- | --- |
| `pnpm dev` | Levanta el servidor local de desarrollo. |
| `pnpm lint` | Revisa reglas de ESLint. |
| `pnpm test -- --run` | Ejecuta pruebas una sola vez. |
| `pnpm build` | Compila TypeScript y genera build de producción. |
| `pnpm preview` | Sirve el build generado localmente. |

## Checklist antes de entregar

- [ ] No se agregó `package-lock.json` ni comandos de npm.
- [ ] `pnpm lint` pasa.
- [ ] `pnpm test -- --run` pasa.
- [ ] `pnpm build` pasa.
- [ ] La página se revisó visualmente en navegador.
- [ ] Los textos nuevos existen en español e inglés.

## Licencia

MIT — Symmetrical Code Team
