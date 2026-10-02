# Marketing — Symmetrical Code

Material de marca y videos publicitarios. **No es parte del sitio**: Vite, ESLint y TypeScript no tocan esta carpeta y no se despliega.

```txt
marketing/
├── brand/                     # Logo en SVG vectorial
│   └── tools/                 # Scripts que generan los SVG (reproducibles)
├── research/                  # Investigación que sustenta cada video
├── videos/
│   ├── fonts/                 # Syne, Geist, Geist Mono (OFL) autoalojadas
│   └── software-empresarial/  # Video 30 s: index.html (canvas + audio sintetizado)
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

Cada video es un solo `index.html` que dibuja todo en canvas. Para verlo con controles y sonido:

```bash
pnpm dlx serve marketing     # abre http://localhost:3000/videos/software-empresarial/
```

Parámetros de URL: `?format=9x16|4x5|1x1|16x9` y `?lang=es|en`. El layout se recompone en cada formato y respeta las zonas seguras de Reels/Stories.

### Exportar a MP4

Requiere `ffmpeg` y un Chrome para Puppeteer (`pnpm exec puppeteer browsers install chrome`, o define `CHROME_PATH`).

```bash
node marketing/tools/export-video.mjs software-empresarial                         # 4 formatos × ES/EN
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

## Software empresarial (30 s)

Guion basado en [`research/software-empresarial.md`](research/software-empresarial.md):

| Tiempo | Escena |
|---|---|
| 0–4 s | Gancho: hojas `ventas_final_v2.xlsx`… → "¿Cuál es la versión final?" |
| 4–10.5 s | Dolores: doble captura · inventario que no cuadra · software genérico que no se adapta |
| 10.5–12 s | Barrido a 45° → "Hay una mejor forma." |
| 12–20 s | Las celdas se arman en un sistema: un solo sistema · a la medida · permisos por rol · cualquier dispositivo |
| 20–26 s | Compromisos: migración sin detener la operación · alcance y costo claros · avances cada dos semanas · código 100% tuyo |
| 26–30 s | Logo se ensambla · "Software empresarial a la medida" · Cotiza tu proyecto · symmetricalcode.com |

Todos los textos están en el objeto `COPY` del HTML. Las promesas salen del sitio (`src/data/services.ts`, `team.workflow_steps`); no muestra cifras ni métricas.
