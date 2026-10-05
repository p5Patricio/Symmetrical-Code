# Marketing — Symmetrical Code

Material de marca y videos publicitarios. **No es parte del sitio**: Vite, ESLint y TypeScript no tocan esta carpeta y no se despliega.

```txt
marketing/
├── brand/                     # Logo en SVG vectorial
│   └── tools/                 # Scripts que generan los SVG (reproducibles)
├── research/                  # Investigación que sustenta cada video
├── videos/
│   ├── engine/                # Motor compartido: línea de tiempo, texto, logo, música, player, exportación
│   ├── fonts/                 # Syne, Geist, Geist Mono (OFL) autoalojadas
│   └── <servicio>/index.html  # Un video de 30 s por servicio (6), solo sus textos y escenas
├── tools/export-video.mjs     # Exporta cualquier video a MP4
└── out/                       # MP4 generados (ignorado por git)
```

## Logo (`brand/`)

Reconstruido como vectores a partir de `public/logo.webp`. La geometría se midió del raster y se ajustó hasta coincidir en 96.5% (IoU). La diferencia restante es la asimetría del propio raster: aquí los dos brazos son exactamente iguales, uno rotado 180°.

| Archivo | Uso |
|---|---|
| `symmetrical-code-mark.svg` | Mark a color con degradados y sombras de pliegue (uso principal, 3 KB) |
| `symmetrical-code-mark-flat.svg` | Dos tintas planas (#02E0FB / #005CFD): tamaños chicos, animación, impresión |
| `symmetrical-code-mark-mono.svg` | Una tinta (`currentColor`): sellos, marcas de agua, fondos de color |
| `symmetrical-code-lockup-dark.svg` | Mark + "SymmetricalCode" en Syne 800 (texto en curvas) sobre fondo oscuro |
| `symmetrical-code-lockup-light.svg` | Igual, para fondo claro |

En cada SVG, los ids `arm-top` / `arm-bottom` separan los brazos para animarlos por separado (After Effects, Figma, CSS).

Para regenerarlos (requiere `pip install fonttools brotli uharfbuzz`):

```bash
python3 marketing/brand/tools/build.py marketing/brand
python3 marketing/brand/tools/lockup.py marketing/brand
```

## Videos

Hay un video de 30 s por servicio del sitio. Todos comparten estructura, música y cierre, así se reconocen como serie. Cada uno usa el color de su servicio (`accentColor` en `src/data/services.ts`):

| Video | Color | Gancho |
|---|---|---|
| `software-empresarial` | verde `#4ade80` | "¿Cuál es la versión final?" |
| `inteligencia-artificial` | morado `#a855f7` | "¿Otra vez capturando facturas a mano?" |
| `desarrollo-web-movil` | cian `#00e5ff` | "Tu cliente te buscó en el celular… y se fue." |
| `ciberseguridad` | amarillo `#facc15` | "¿Y si mañana pierdes toda tu información?" |
| `diseno-ui-ux` | rosa `#f43f5e` | "¿Tus usuarios se pierden en tu sistema?" |
| `automatizacion-analitica` | naranja `#f97316` | "¿Respondes los mismos mensajes todo el día?" |

**Estructura (igual en los 6):**

| Tiempo | Escena |
|---|---|
| 0–4 s | Gancho: el caos del problema + una pregunta |
| 4–10.5 s | Tres dolores, uno por beat |
| 10.5–12 s | Barrido a 45° en el color del servicio → "Hay una mejor forma." |
| 12–20 s | El producto en acción, en cuatro beats con su titular |
| 20–26 s | Cuatro compromisos tomados del sitio |
| 26–30 s | El logo se ensambla · nombre del servicio · Cotiza tu proyecto · symmetricalcode.com |

**Cómo está hecho:** `videos/engine/engine.js` lleva todo lo común (línea de tiempo, fondo, HUD, texto cinético, logo, barrido, compromisos, cierre, música sintetizada a 120 BPM, player y ganchos de exportación). Cada `index.html` solo define:
- `copy` en ES/EN;
- el color del servicio;
- tres funciones de escena: `hook(t)`, `pains[3](t)` y `solution(t, rect)`;
- sus efectos de sonido (`sfx`).

Para un video nuevo, copia una carpeta y reemplaza esas piezas.

Para verlos con controles y sonido:

```bash
pnpm dlx serve marketing     # abre http://localhost:3000/videos/software-empresarial/
```

Parámetros de URL: `?format=9x16|4x5|1x1|16x9` y `?lang=es|en`. El layout se recompone en cada formato y respeta las zonas seguras de Reels/Stories.

### Exportar a MP4

Requiere `ffmpeg` y un Chrome para Puppeteer (`pnpm exec puppeteer browsers install chrome`, o define `CHROME_PATH`).

```bash
node marketing/tools/export-video.mjs software-empresarial                         # 4 formatos × ES/EN (cambia el nombre por cualquier video)
node marketing/tools/export-video.mjs software-empresarial --formats 9x16 --langs es
node marketing/tools/export-video.mjs software-empresarial --stills 3,14,28          # solo PNG de revisión
```

Renderiza cuadro por cuadro (30 fps, H.264, CRF 17), así que no se pierden cuadros aunque la máquina sea lenta. El audio se sintetiza offline y se normaliza a −14 LUFS. Cada video tarda ~2 min.

| Formato | Medida | Dónde |
|---|---|---|
| 9x16 | 1080×1920 | Reels, Stories (IG/FB) |
| 4x5 | 1080×1350 | Feed IG/FB, LinkedIn |
| 1x1 | 1080×1080 | LinkedIn, feed |
| 16x9 | 1920×1080 | Sitio web, YouTube |

## Guiones e investigación

- Software empresarial: [`research/software-empresarial.md`](research/software-empresarial.md)
- Los otros cinco servicios: [`research/servicios.md`](research/servicios.md)

Todos los textos están en el objeto `copy` de cada `index.html`. Las promesas salen del sitio (`src/data/services.ts`, `team.workflow_steps`). Ningún video muestra cifras ni métricas.
