/* Symmetrical Code — motion engine shared by every video in marketing/videos/.
 * A video is a tiny index.html that loads this file and calls SC.run() with its
 * copy (es/en), service color and three scene hooks: hook(t), pains[3](t) and
 * solution(t, rect). Timeline, text, logo, music, player and export live here. */
(() => {
/* ================================================================
   SETUP — format and language from the URL
   ?format=9x16|4x5|1x1|16x9   ?lang=es|en   ?export (no UI, for the exporter)
   ================================================================ */
const Q = new URLSearchParams(location.search);
const FORMATS = { '9x16': [1080, 1920], '4x5': [1080, 1350], '1x1': [1080, 1080], '16x9': [1920, 1080] };
const FMT = FORMATS[Q.get('format')] ? Q.get('format') : '9x16';
const LANG = Q.get('lang') === 'en' ? 'en' : 'es';
const EXPORT = Q.has('export');
const [W, H] = FORMATS[FMT];
const DUR = 30, FPS = 30, BEAT = 0.5, TAU = Math.PI * 2;
const U = Math.min(W, H) / 1080;
const LAND = W > H * 1.05;
// Safe areas: Reels/Stories cover ~250px at the top and ~420px at the bottom.
const SAFE = FMT === '9x16' ? { l: 90, r: 90, t: 250, b: 420 }
           : FMT === '16x9' ? { l: 140, r: 140, t: 120, b: 110 }
           : { l: 90, r: 90, t: 120, b: 100 };
const BOX = { x: SAFE.l, y: SAFE.t, w: W - SAFE.l - SAFE.r, h: H - SAFE.t - SAFE.b };
BOX.cx = BOX.x + BOX.w / 2; BOX.cy = BOX.y + BOX.h / 2;
const HUD_Y = FMT === '9x16' ? 170 : FMT === '16x9' ? 62 : 58;

// Player shell: the engine builds it so each video's index.html stays tiny.
document.body.insertAdjacentHTML('afterbegin', `<div class="wrap">
  <canvas id="c"></canvas>
  <div class="bar">
    <button id="play" aria-label="Pausar">❚❚</button>
    <button id="sound" aria-label="Activar sonido">Sonido: off</button>
    <div class="scrub" id="scrub" role="slider" tabindex="0" aria-label="Posición" aria-valuemin="0" aria-valuemax="30" aria-valuenow="0"><div class="track"></div><div class="fill" id="fill"></div></div>
    <span class="tc" id="tc">00.0 / 30.0</span>
  </div>
  <div class="chips" id="chips"></div>
</div>`);
const canvas = document.getElementById('c');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');
if (EXPORT) document.body.classList.add('export');
document.documentElement.lang = LANG;

/* ================================================================
   BRAND
   ================================================================ */
const C = {
  bg: '#05070b', surface: '#0a0e16', raised: '#121a28', text: '#e6ecf5', muted: '#8c97aa', subtle: '#5e687b',
  line: 'rgba(214,226,245,0.10)', line2: 'rgba(214,226,245,0.20)',
  blue: '#005cfd', cyan: '#02e0fb', deep: '#003aae',
  err: '#f87171',
  accent: '#4ade80'   // replaced by each video's service color in run()
};
let ACC_RGB = [74, 222, 128];
const acc = a => `rgba(${ACC_RGB.join(',')},${a})`;
let COPY = null, VIDEO = null;
const FAM = { display: "'Syne', sans-serif", text: "'Geist', sans-serif", mono: "'Geist Mono', monospace" };

/* ================================================================
   MATH
   ================================================================ */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  outExpo: t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inExpo: t => t <= 0 ? 0 : Math.pow(2, 10 * t - 10),
  inOutExpo: t => t <= 0 ? 0 : t >= 1 ? 1 : t < .5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inCubic: t => t * t * t,
  inOutCubic: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outBack: t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
};
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hash = (i, j = 0) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
const bp = t => Math.exp(-(((t % BEAT) + BEAT) % BEAT) * 9);   // 1 on every beat, decays

/* ================================================================
   DRAW HELPERS
   ================================================================ */
// The brand shape: top-left and bottom-right corners cut at 45°.
function cutPath(x, y, w, h, c) {
  c = Math.min(c, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + c, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h - c);
  ctx.lineTo(x + w - c, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + c); ctx.closePath();
}
function card(x, y, w, h, c, fill = C.surface, stroke = C.line2) {
  cutPath(x, y, w, h, c); ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.lineWidth = 1.5 * U; ctx.strokeStyle = stroke; ctx.stroke(); }
}
function setFont(kind, size, weight = 400, track = 0) {
  ctx.font = `${weight} ${size}px ${FAM[kind]}`;
  ctx.letterSpacing = `${track * size}px`;
}
function resetText() { ctx.letterSpacing = '0px'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; }
function mono(str, x, y, size, col, align = 'left', weight = 500, track = 0.08) {
  setFont('mono', size, weight, track); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.fillText(str, x, y); resetText();
}

/* Rich text: words wrapped in *asterisks* use the accent color. */
function richWords(str) {
  const out = []; let acc = false;
  for (let w of str.split(' ')) {
    if (w.startsWith('*')) { w = w.slice(1); acc = true; }
    let end = false; if (w.endsWith('*')) { w = w.slice(0, -1); end = true; }
    out.push({ w, a: acc }); if (end) acc = false;
  }
  return out;
}
function wrap(widths, sp, maxW) {
  const lines = []; let cur = [], cw = 0;
  for (let i = 0; i < widths.length; i++) {
    if (widths[i] > maxW) return null;
    const nw = cur.length ? cw + sp + widths[i] : widths[i];
    if (nw > maxW && cur.length) { lines.push(cur); cur = [i]; cw = widths[i]; } else { cur.push(i); cw = nw; }
  }
  if (cur.length) lines.push(cur);
  return lines;
}
/* Fit text into maxW and maxLines, shrinking from `size` down to `min`; lines are balanced. */
function layout(str, o) {
  const words = richWords(str);
  const kind = o.kind || 'display', weight = o.weight || 800, track = o.track ?? (kind === 'display' ? -0.03 : 0);
  let size = o.size, lines, ws, sp;
  for (;;) {
    setFont(kind, size, weight, track);
    sp = ctx.measureText(' ').width;
    ws = words.map(w => ctx.measureText(w.w).width);
    lines = wrap(ws, sp, o.maxW);
    if ((lines && lines.length <= o.maxLines) || size <= o.min) break;
    size -= 2;
  }
  if (!lines) lines = [words.map((_, i) => i)];
  // balance: narrowest width that keeps the same number of lines
  let lo = o.maxW * 0.45, hi = o.maxW;
  for (let k = 0; k < 14; k++) { const mid = (lo + hi) / 2, l = wrap(ws, sp, mid); if (l && l.length <= lines.length) hi = mid; else lo = mid; }
  lines = wrap(ws, sp, hi) || lines;
  resetText();
  const lh = size * (o.lh || 1.08);
  return {
    kind, weight, track, size, lh, height: lines.length * lh,
    lines: lines.map(idx => {
      let x = 0; const items = idx.map(i => { const it = { w: words[i].w, a: words[i].a, x }; x += ws[i] + sp; return it; });
      return { items, width: x - sp };
    })
  };
}
/* Lines rise through a mask, staggered; then exit upward. y = top of the block. */
function drawText(L, x, y, align, t, tin, tout, col = C.text, accCol = C.accent, stag = 0.07) {
  setFont(L.kind, L.size, L.weight, L.track); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  L.lines.forEach((ln, i) => {
    const e = E.outExpo(prog(t, tin + i * stag, tin + i * stag + 0.6));
    const o = tout == null ? 0 : E.inExpo(prog(t, tout + i * 0.04, tout + i * 0.04 + 0.32));
    if (e <= 0 || o >= 1) return;
    const top = y + i * L.lh, pad = L.size * 0.18;
    const dy = (1 - e) * L.lh * 1.1 - o * L.lh * 1.1;
    const lx = align === 'center' ? x - ln.width / 2 : align === 'right' ? x - ln.width : x;
    ctx.save(); ctx.beginPath(); ctx.rect(-10, top - pad, W + 20, L.lh + pad * 2); ctx.clip();
    for (const it of ln.items) { ctx.fillStyle = it.a ? accCol : col; ctx.fillText(it.w, lx + it.x, top + L.lh / 2 + dy); }
    ctx.restore();
  });
  resetText();
}

/* ================================================================
   THE MARK — same paths as marketing/brand/symmetrical-code-mark.svg
   ================================================================ */
const MK = {
  top: new Path2D('M434.5 144.79A13 13 0 0 0 428.28 133.7L228.34 11.59A16 16 0 0 0 211.66 11.59L33.75 120.25A59 59 0 0 0 5.5 170.6L5.5 229.74A37 37 0 0 0 23.22 261.32L200.22 369.42A13 13 0 0 0 220 358.33L220 304.28A16 16 0 0 0 212.34 290.62L81.92 210.97A4 4 0 0 1 80 207.55L80 190.52A20 20 0 0 1 89.58 173.45L217.92 95.07A4 4 0 0 1 222.08 95.07L414.72 212.72A13 13 0 0 0 434.5 201.62Z'),
  bot: new Path2D('M5.5 395.21A13 13 0 0 0 11.72 406.3L211.66 528.41A16 16 0 0 0 228.34 528.41L406.25 419.75A59 59 0 0 0 434.5 369.4L434.5 310.26A37 37 0 0 0 416.78 278.68L239.78 170.58A13 13 0 0 0 220 181.67L220 235.72A16 16 0 0 0 227.66 249.38L358.08 329.03A4 4 0 0 1 360 332.45L360 349.48A20 20 0 0 1 350.42 366.55L222.08 444.93A4 4 0 0 1 217.92 444.93L25.28 327.28A13 13 0 0 0 5.5 338.38Z'),
  foldTop: new Path2D('M220 93.79L291.47 50.15L564.57 216.93L493.1 260.58Z'),
  foldBot: new Path2D('M220 446.21L148.53 489.85L-124.57 323.07L-53.1 279.42Z')
};
const grad = (x1, y1, x2, y2, stops) => { const g = ctx.createLinearGradient(x1, y1, x2, y2); stops.forEach(([o, c]) => g.addColorStop(o, c)); return g; };
const MKG = {
  top: grad(123, 76, 239, 308, [[0, '#02E8F0'], [.38, '#00D9EF'], [.7, '#00BDE4'], [1, '#00A0D6']]),
  bot: grad(0, 168, 0, 532, [[0, '#008EFD'], [.55, '#0070FB'], [1, '#0056EE']]),
  foldTop: grad(255.73, 71.97, 296.39, 138.54, [[0, 'rgba(0,136,194,.32)'], [1, 'rgba(0,136,194,0)']]),
  foldBot: grad(184.27, 468.03, 143.61, 401.46, [[0, 'rgba(0,58,174,.9)'], [1, 'rgba(0,58,174,0)']])
};
/* h = rendered height; k = assembly 0..1 (arms travel in from opposite corners, rotating). */
function drawMark(cx, cy, h, k = 1, alpha = 1) {
  const s = h / 540, a = 1 - k;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.scale(s, s);
  [['top', -1], ['bot', 1]].forEach(([arm, d]) => {
    ctx.save();
    ctx.translate(d * a * 260, d * a * 200); ctx.rotate(-a * Math.PI / 2);
    ctx.translate(-220, -270);
    ctx.fillStyle = MKG[arm]; ctx.fill(MK[arm]);
    ctx.save(); ctx.clip(MK[arm]); ctx.fillStyle = MKG[arm === 'top' ? 'foldTop' : 'foldBot']; ctx.fill(MK[arm === 'top' ? 'foldTop' : 'foldBot']); ctx.restore();
    ctx.restore();
  });
  ctx.restore();
}

/* ================================================================
   BACKGROUND + HUD
   ================================================================ */
function background(t, tint) {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  const R = Math.max(W, H);
  const g1x = W * (0.5 + 0.08 * Math.sin(t * 0.35)), g1y = H * 0.3;
  const g = ctx.createRadialGradient(g1x, g1y, 0, g1x, g1y, R * 0.6);
  const c1 = tint > 0 ? `rgba(${Math.round(lerp(0, ACC_RGB[0], tint))},${Math.round(lerp(92, ACC_RGB[1], tint))},${Math.round(lerp(253, ACC_RGB[2], tint))},${lerp(0.20, 0.13, tint)})` : 'rgba(0,92,253,0.20)';
  g.addColorStop(0, c1); g.addColorStop(1, 'rgba(0,92,253,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const g2 = ctx.createRadialGradient(W * 0.85, H * 0.9, 0, W * 0.85, H * 0.9, R * 0.45);
  g2.addColorStop(0, 'rgba(2,224,251,0.08)'); g2.addColorStop(1, 'rgba(2,224,251,0)');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  // 48px grid, faded toward the edges
  const step = 48 * U, ox = (W / 2) % step, oy = (H / 2) % step;
  ctx.strokeStyle = 'rgba(110,150,225,0.07)'; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = ox; x < W; x += step) { ctx.moveTo(Math.round(x) + .5, 0); ctx.lineTo(Math.round(x) + .5, H); }
  for (let y = oy; y < H; y += step) { ctx.moveTo(0, Math.round(y) + .5); ctx.lineTo(W, Math.round(y) + .5); }
  ctx.stroke();
  const v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, R * 0.75);
  v.addColorStop(0, 'rgba(5,7,11,0)'); v.addColorStop(1, 'rgba(5,7,11,0.92)');
  ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
}
function hud(t) {
  const a = E.outExpo(prog(t, 0.2, 0.8)) * (1 - prog(t, 25.7, 26.1));
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a;
  const s = 24 * U;
  ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(BOX.x + 4 * U, HUD_Y, 4 * U, 0, TAU); ctx.fill();
  mono(COPY.tag, BOX.x + 18 * U, HUD_Y, s * 0.82, C.muted, 'left', 500, 0.14);
  drawMark(W - SAFE.r - 14 * U, HUD_Y, 30 * U);
  mono('SYMMETRICAL CODE', W - SAFE.r - 40 * U, HUD_Y, s * 0.82, C.muted, 'right', 500, 0.14);
  ctx.restore();
}

/* ================================================================
   SCENE 1 — HOOK (0 – 4s): the video draws its visual, the engine the question
   ================================================================ */
function s1(t) {
  VIDEO.hook(t);
  const out = E.inExpo(prog(t, 3.55, 4.0));
  // headline over a soft scrim
  const sc = E.outCubic(prog(t, 1.6, 2.1)) * (1 - out);
  if (sc > 0) {
    const g = ctx.createRadialGradient(BOX.cx, BOX.cy, 0, BOX.cx, BOX.cy, Math.max(W, H) * 0.55);
    g.addColorStop(0, `rgba(5,7,11,${0.82 * sc})`); g.addColorStop(1, `rgba(5,7,11,${0.35 * sc})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  const L = layout(COPY.hook, { size: LAND ? 120 * U : 112 * U, min: 56 * U, maxW: BOX.w * (LAND ? 0.8 : 1), maxLines: 3 });
  drawText(L, BOX.cx, BOX.cy - L.height / 2, 'center', t, 1.75, 3.6, C.text, C.cyan);
}

/* ================================================================
   SCENE 2 — PAINS (4 – 10.55s)
   ================================================================ */
function splitRegions() {
  if (LAND) return { text: { x: BOX.x, y: BOX.y, w: BOX.w * 0.48, h: BOX.h }, vis: { x: BOX.x + BOX.w * 0.54, y: BOX.y, w: BOX.w * 0.46, h: BOX.h } };
  const th = BOX.h * (FMT === '9x16' ? 0.40 : 0.40);
  return { text: { x: BOX.x, y: BOX.y, w: BOX.w, h: th }, vis: { x: BOX.x, y: BOX.y + th + 30 * U, w: BOX.w, h: BOX.h - th - 30 * U } };
}
const REG = splitRegions();
const PAIN_T = [[4.0, 6.0], [6.0, 8.0], [8.0, 10.55]];
function painText(i, t) {
  const [a, b] = PAIN_T[i], R = REG.text;
  const L = layout(COPY.pains[i].text, { size: LAND ? 96 * U : 92 * U, min: 52 * U, maxW: R.w, maxLines: 3 });
  const tagH = 34 * U, total = tagH + 26 * U + L.height;
  const y0 = LAND ? R.y + (R.h - total) / 2 : R.y + (R.h - total) / 2;
  const ax = LAND ? R.x : R.x + R.w / 2, align = LAND ? 'left' : 'center';
  const ta = E.outExpo(prog(t, a + 0.02, a + 0.4)) * (1 - prog(t, b - 0.3, b - 0.05));
  if (ta > 0) { ctx.save(); ctx.globalAlpha = ta; mono(COPY.pains[i].tag, ax, y0 + tagH / 2, 22 * U, C.muted, align, 500, 0.14); ctx.restore(); }
  drawText(L, ax, y0 + tagH + 26 * U, align, t, a + 0.05, i === 2 ? null : b - 0.35, C.text, C.text);
}
function visIn(t, a, b) { return E.outExpo(prog(t, a + 0.1, a + 0.6)) * (1 - E.inExpo(prog(t, b - 0.35, b - 0.02))); }
// Diagonal wipe out of the pains: the service color leads, brand blue follows, background closes.
// The background panel trails by 0.24, so the screen is fully covered at p = 1.24.
function wipe(t, a, d) {
  const p = (t - a) / d;
  if (p <= 0 || p >= 1.24) return;
  const skew = H * 0.5 + 160 * U;
  const para = (xe, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-W, -10); ctx.lineTo(xe + skew, -10); ctx.lineTo(xe, H + 10); ctx.lineTo(-W, H + 10); ctx.closePath(); ctx.fill(); };
  const e = q => lerp(-skew - 40, W + 40, E.inOutExpo(clamp(q)));
  para(e(p), C.accent); para(e(p - 0.12), C.blue); para(e(p - 0.24), C.bg);
}

/* ================================================================
   SCENE 3 — TURN (10.55 – 12s)
   ================================================================ */
function s3(t) {
  const L = layout(COPY.turn, { size: LAND ? 130 * U : 116 * U, min: 60 * U, maxW: BOX.w * (LAND ? 0.8 : 1), maxLines: 3 });
  drawText(L, BOX.cx, BOX.cy - L.height / 2, 'center', t, 10.6, 11.65, C.text, C.accent);
  const ul = E.outExpo(prog(t, 10.9, 11.4)) * (1 - E.inExpo(prog(t, 11.55, 11.8)));
  if (ul > 0) { const w = 220 * U * ul; ctx.fillStyle = C.accent; ctx.fillRect(BOX.cx - w / 2, BOX.cy + L.height / 2 + 34 * U, w, 5 * U); }
}

/* ================================================================
   SCENE 4 — SOLUTION (12 – 20s): the video draws its product, the engine the headlines
   ================================================================ */
const SOL_T = [[12.25, 14.6], [14.6, 16.6], [16.6, 18.6], [18.6, 19.75]];
function solRegions() {
  if (LAND) {
    const tw = BOX.w * 0.38, dw = BOX.w * 0.58, dh = Math.min(BOX.h, dw / 1.42);
    return { text: { x: BOX.x, y: BOX.y, w: tw, h: BOX.h }, dash: { x: BOX.x + BOX.w - dw, y: BOX.cy - dh / 2, w: dw, h: dh } };
  }
  const th = BOX.h * (FMT === '1x1' ? 0.27 : 0.30), avail = BOX.h - th - 40 * U;
  const ratio = FMT === '9x16' ? 1.22 : 1.38;
  let dw = BOX.w, dh = dw / ratio; if (dh > avail) { dh = avail; dw = dh * ratio; }
  return { text: { x: BOX.x, y: BOX.y, w: BOX.w, h: th }, dash: { x: BOX.cx - dw / 2, y: BOX.y + th + 40 * U + (avail - dh) / 2, w: dw, h: dh } };
}
const SR = solRegions();
function s4(t) {
  const R = SR.text;
  VIDEO.solution(t, SR.dash);
  // headlines
  SOL_T.forEach(([a, b], i) => {
    if (t < a - 0.05 || t > b + 0.4) return;
    const L = layout(COPY.sol[i], { size: LAND ? 84 * U : 80 * U, min: 46 * U, maxW: R.w, maxLines: LAND ? 4 : 3 });
    const x = LAND ? R.x : R.x + R.w / 2, align = LAND ? 'left' : 'center';
    const y = R.y + (R.h - L.height) / 2;
    drawText(L, x, y, align, t, a, i === 3 ? 19.65 : b - 0.3, C.text, C.accent);
  });
}

/* ================================================================
   SCENE 5 — PROMISES (20 – 26s)
   ================================================================ */
const PROM_T0 = 20.35, PROM_STEP = 1.2;
function s5(t) {
  const node = 44 * U, gap = 30 * U, maxW = BOX.w - node - gap;
  const Ls = COPY.promises.map(p => layout(p, { kind: 'text', weight: 600, track: -0.01, size: (LAND ? 56 : FMT === '9x16' ? 60 : 50) * U, min: 30 * U, maxW: Math.min(maxW, 980 * U), maxLines: 2, lh: 1.18 }));
  const size = Math.min(...Ls.map(l => l.size));
  const L2 = COPY.promises.map(p => layout(p, { kind: 'text', weight: 600, track: -0.01, size, min: size, maxW: Math.min(maxW, 980 * U), maxLines: 2, lh: 1.18 }));
  const rowGap = (LAND ? 40 : 54) * U, tagH = 30 * U, tagGap = 50 * U;
  const blockW = node + gap + Math.max(...L2.map(l => Math.max(...l.lines.map(x => x.width))));
  const total = tagH + tagGap + L2.reduce((s, l) => s + l.height, 0) + rowGap * 3;
  const x0 = BOX.cx - blockW / 2; let y = BOX.cy - total / 2;
  const out = E.inExpo(prog(t, 25.6, 26.0));
  ctx.save(); ctx.globalAlpha = 1 - out; ctx.translate(0, -out * 60 * U);
  const ta = E.outExpo(prog(t, 20.1, 20.5));
  ctx.globalAlpha = ta * (1 - out);
  mono(COPY.promiseTag, x0, y + tagH / 2, 22 * U, C.accent, 'left', 600, 0.18);
  ctx.globalAlpha = 1 - out;
  y += tagH + tagGap;
  const nodesY = [];
  L2.forEach((L, i) => {
    const a = PROM_T0 + i * PROM_STEP, cy = y + L.lines[0] ? y + L.lh / 2 : y;
    nodesY.push(cy);
    // check node
    const nk = E.outBack(prog(t, a, a + 0.35));
    if (nk > 0) {
      const s = node * nk;
      cutPath(x0 + (node - s) / 2, cy - s / 2, s, s, 9 * U * nk); ctx.fillStyle = C.accent; ctx.fill();
      const ck = prog(t, a + 0.15, a + 0.45);
      if (ck > 0) {
        ctx.strokeStyle = C.bg; ctx.lineWidth = 5 * U; ctx.lineCap = 'square'; ctx.lineJoin = 'miter';
        const p1 = [x0 + node * 0.26, cy + node * 0.02], p2 = [x0 + node * 0.43, cy + node * 0.19], p3 = [x0 + node * 0.76, cy - node * 0.17];
        ctx.beginPath(); ctx.moveTo(...p1);
        if (ck < 0.4) ctx.lineTo(lerp(p1[0], p2[0], ck / 0.4), lerp(p1[1], p2[1], ck / 0.4));
        else { ctx.lineTo(...p2); const q = (ck - 0.4) / 0.6; ctx.lineTo(lerp(p2[0], p3[0], q), lerp(p2[1], p3[1], q)); }
        ctx.stroke(); ctx.lineCap = 'butt';
      }
    }
    drawText(L, x0 + node + gap, y, 'left', t, a + 0.08, null, C.text, C.accent, 0.06);
    y += L.height + rowGap;
  });
  // connecting hairline between nodes
  for (let i = 0; i < nodesY.length - 1; i++) {
    const a = PROM_T0 + (i + 1) * PROM_STEP - 0.35, k = E.inOutCubic(prog(t, a, a + 0.35));
    if (k <= 0) continue;
    const y1 = nodesY[i] + node / 2 + 8 * U, y2 = nodesY[i + 1] - node / 2 - 8 * U;
    ctx.fillStyle = acc(0.45); ctx.fillRect(x0 + node / 2 - 1 * U, y1, 2 * U, (y2 - y1) * k);
  }
  ctx.restore();
}

/* ================================================================
   SCENE 6 — END CARD (26 – 30s)
   ================================================================ */
function s6(t) {
  const mh = (LAND ? 230 : FMT === '9x16' ? 300 : 250) * U;
  setFont('display', 100, 800, -0.02);
  const ww = ctx.measureText('SymmetricalCode').width; resetText();
  const wsz = Math.min((LAND ? 104 : 96) * U, BOX.w * 0.92 / ww * 100);
  const subS = (LAND ? 30 : 32) * U, btnH = 84 * U;
  const total = mh + 60 * U + wsz + 34 * U + subS + 56 * U + btnH + 40 * U + 24 * U;
  let y = BOX.cy - total / 2;
  const mk = E.outExpo(prog(t, 26.0, 26.6));
  const lock = prog(t, 26.55, 27.4);
  if (lock > 0 && lock < 1) {
    ctx.strokeStyle = `rgba(2,224,251,${0.35 * (1 - lock)})`; ctx.lineWidth = 3 * U;
    ctx.beginPath(); ctx.arc(BOX.cx, y + mh / 2, mh * (0.55 + 0.6 * E.outExpo(lock)), 0, TAU); ctx.stroke();
  }
  // glow behind the mark
  const g = ctx.createRadialGradient(BOX.cx, y + mh / 2, 0, BOX.cx, y + mh / 2, mh * 1.4);
  g.addColorStop(0, `rgba(0,92,253,${0.28 * mk})`); g.addColorStop(1, 'rgba(0,92,253,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  drawMark(BOX.cx, y + mh / 2, mh, mk, clamp(mk * 1.5));
  y += mh + 60 * U;
  // wordmark: letters rise through a mask
  setFont('display', wsz, 800, -0.02); ctx.textBaseline = 'middle';
  const word = [...'SymmetricalCode'];
  const widths = word.map(ch => ctx.measureText(ch).width + -0.02 * wsz);
  let x = BOX.cx - widths.reduce((s, v) => s + v, 0) / 2;
  ctx.save(); ctx.beginPath(); ctx.rect(0, y - wsz * 0.2, W, wsz * 1.4); ctx.clip();
  word.forEach((ch, i) => {
    const e = E.outExpo(prog(t, 26.5 + i * 0.03, 27.0 + i * 0.03));
    ctx.fillStyle = i >= 11 ? C.blue : C.text;
    ctx.fillText(ch, x, y + wsz / 2 + (1 - e) * wsz * 1.2);
    x += widths[i];
  });
  ctx.restore(); resetText();
  y += wsz + 34 * U;
  const sa = E.outExpo(prog(t, 27.05, 27.5));
  ctx.save(); ctx.globalAlpha = sa;
  setFont('text', subS, 500); ctx.fillStyle = C.muted; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(COPY.endSub, BOX.cx, y + subS / 2 + (1 - sa) * 20 * U); resetText();
  ctx.restore();
  y += subS + 56 * U;
  // CTA button — the cut shape, opening from the center
  const bk = E.outExpo(prog(t, 27.4, 27.9));
  if (bk > 0) {
    setFont('text', 36 * U, 600); const tw = ctx.measureText(COPY.cta + '  →').width; resetText();
    const bw = (tw + 96 * U) * bk;
    cutPath(BOX.cx - bw / 2, y, bw, btnH, 14 * U); ctx.fillStyle = C.blue; ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.rect(BOX.cx - bw / 2, y, bw, btnH); ctx.clip();
    setFont('text', 36 * U, 600); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(COPY.cta + '  →', BOX.cx + Math.sin(t * 4) * 0 + (bk < 1 ? 0 : 0), y + btnH / 2 + 2 * U);
    ctx.restore(); resetText();
  }
  y += btnH + 40 * U;
  const ua = E.outExpo(prog(t, 27.75, 28.2));
  ctx.save(); ctx.globalAlpha = ua;
  mono(COPY.url, BOX.cx, y + 12 * U, 26 * U, C.text, 'center', 500, 0.08);
  ctx.restore();
}

/* ================================================================
   RENDER
   ================================================================ */
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; resetText();
  const tint = E.inOutCubic(prog(t, 10.4, 11.4)) * (1 - E.inOutCubic(prog(t, 25.5, 26.5)));
  background(t, tint);
  if (t < 4.0) s1(t);
  else if (t < 10.55) {
    const i = t < 6 ? 0 : t < 8 ? 1 : 2;
    painText(i, t);
    VIDEO.pains[i](t);
  } else if (t < 12.0) s3(t);
  else if (t < 20.0) s4(t);
  else if (t < 26.0) s5(t);
  else s6(t);
  wipe(t, 9.8, 0.6);   // fully covered at 10.55, where the turn scene starts
  hud(t);
  // fade to black at the very end so the loop restarts clean
  const f = prog(t, 29.55, 30);
  if (f > 0) { ctx.fillStyle = `rgba(5,7,11,${f})`; ctx.fillRect(0, 0, W, H); }
}

/* ================================================================
   AUDIO — synthesized, 120 BPM. Same timeline live and offline.
   A minor while the problem plays; C major once the system arrives.
   ================================================================ */
function voices(S) {
  const { ac } = S;
  const env = (g, w, peak, a, d) => { g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(peak, w + a); g.gain.exponentialRampToValueAtTime(0.0001, w + a + d); };
  const noise = (w, dur, type, f, q, v, a = 0.002) => {
    const s = ac.createBufferSource(); s.buffer = S.noise;
    const fl = ac.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
    const g = ac.createGain(); env(g, w, v, a, dur);
    s.connect(fl).connect(g).connect(S.out); s.start(w, hash(w * 13.7) * 0.5); s.stop(w + a + dur + 0.05);
  };
  const osc = (w, type, f, v, a, d, detune = 0, lp = 0) => {
    const o = ac.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune;
    const g = ac.createGain(); env(g, w, v, a, d);
    if (lp) { const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl).connect(g); } else o.connect(g);
    g.connect(S.out); o.start(w); o.stop(w + a + d + 0.05);
  };
  return {
    kick(w, v = 0.85) { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(150, w); o.frequency.exponentialRampToValueAtTime(42, w + 0.12); env(g, w, v, 0.004, 0.38); o.connect(g).connect(S.out); o.start(w); o.stop(w + 0.45); },
    thud(w, v = 0.5) { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(110, w); o.frequency.exponentialRampToValueAtTime(50, w + 0.1); env(g, w, v, 0.003, 0.22); o.connect(g).connect(S.out); o.start(w); o.stop(w + 0.3); noise(w, 0.06, 'lowpass', 900, 0.7, v * 0.4); },
    hat(w, v = 0.11) { noise(w, 0.045, 'highpass', 8000, 0.7, v); },
    tick(w, v = 0.07) { osc(w, 'sine', 2600, v, 0.001, 0.03); noise(w, 0.015, 'highpass', 6000, 0.8, v * 0.6); },
    key(w, v = 0.06) { noise(w, 0.025, 'bandpass', 3200 + hash(w) * 1500, 1.4, v); },
    clap(w, v = 0.38) { noise(w, 0.15, 'bandpass', 1500, 0.9, v); noise(w + 0.012, 0.11, 'bandpass', 2200, 0.9, v * 0.6); },
    bass(w, f, v = 0.2, d = 0.2) {
      const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.Q.value = 5; fl.frequency.setValueAtTime(1500, w); fl.frequency.exponentialRampToValueAtTime(160, w + d);
      const g = ac.createGain(); env(g, w, v, 0.005, d); o.connect(fl).connect(g).connect(S.out); o.start(w); o.stop(w + d + 0.1);
    },
    pluck(w, f, v = 0.09) { osc(w, 'triangle', f, v, 0.003, 0.35); osc(w, 'sine', f * 2, v * 0.35, 0.003, 0.2); },
    bell(w, f, v = 0.1) { osc(w, 'sine', f, v, 0.003, 1.1); osc(w, 'sine', f * 2.76, v * 0.25, 0.003, 0.5); },
    stab(w, fs, v = 0.05) { fs.forEach(f => [-8, 8].forEach(dt => osc(w, 'sawtooth', f, v, 0.005, 0.28, dt, 1600))); },
    pad(w, d, fs, v = 0.028) {
      fs.forEach(f => [-7, 7].forEach(dt => {
        const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = dt;
        const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 1300;
        const g = ac.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + Math.min(0.6, d * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, w + d);
        o.connect(fl).connect(g).connect(S.out); o.start(w); o.stop(w + d + 0.05);
      }));
    },
    drone(w, d, f, v = 0.06) {
      [f, f * 1.5].forEach((fr, i) => {
        const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = fr; o.detune.value = i ? 5 : -5;
        const fl = ac.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 380;
        const g = ac.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v * (i ? 0.5 : 1), w + 1.2); g.gain.exponentialRampToValueAtTime(0.0001, w + d);
        o.connect(fl).connect(g).connect(S.out); o.start(w); o.stop(w + d + 0.05);
      });
    },
    riser(w, d, v = 0.2) {
      const s = ac.createBufferSource(); s.buffer = S.noise; s.loop = true;
      const fl = ac.createBiquadFilter(); fl.type = 'bandpass'; fl.Q.value = 4; fl.frequency.setValueAtTime(300, w); fl.frequency.exponentialRampToValueAtTime(7000, w + d);
      const g = ac.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + d * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, w + d + 0.03);
      s.connect(fl).connect(g).connect(S.out); s.start(w); s.stop(w + d + 0.06);
    },
    whoosh(w, d, v = 0.3) {
      const s = ac.createBufferSource(); s.buffer = S.noise; s.loop = true;
      const fl = ac.createBiquadFilter(); fl.type = 'bandpass'; fl.Q.value = 2; fl.frequency.setValueAtTime(600, w); fl.frequency.exponentialRampToValueAtTime(5000, w + d * 0.5); fl.frequency.exponentialRampToValueAtTime(500, w + d);
      const g = ac.createGain(); g.gain.setValueAtTime(0.0001, w); g.gain.exponentialRampToValueAtTime(v, w + d * 0.45); g.gain.exponentialRampToValueAtTime(0.0001, w + d);
      s.connect(fl).connect(g).connect(S.out); s.start(w); s.stop(w + d + 0.05);
    },
    impact(w, v = 0.7) {
      const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(90, w); o.frequency.exponentialRampToValueAtTime(30, w + 0.9);
      env(g, w, v, 0.005, 1.1); o.connect(g).connect(S.out); o.start(w); o.stop(w + 1.2);
      noise(w, 0.6, 'lowpass', 1100, 0.5, v * 0.45);
    }
  };
}
const N = { A1: 55, C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98, A2: 110, C3: 130.81, E3: 164.81, G3: 196, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5 };
const EV = [];
const at = (t, fn) => EV.push({ t, fn });
function buildTimeline() {
  at(0, (V, w, S) => { S.out.gain.cancelScheduledValues(w); S.out.gain.setValueAtTime(0.8, w); });
  // 0–4 · the mess: clock ticks and a low drone
  at(0, (V, w) => V.drone(w, 4.2, N.A1, 0.07));
  for (let t = 0; t < 4; t += 0.25) at(t, (V, w) => V.tick(w, t % 0.5 ? 0.04 : 0.07));
  at(1.75, (V, w) => V.stab(w, [N.A3, N.C4, N.E4, N.B4], 0.045));
  at(3.0, (V, w) => V.riser(w, 1.0, 0.18));
  // 4–10 · the pains: tense groove in A minor
  for (let t = 4; t < 10; t += BEAT) at(t, (V, w) => V.kick(w, 0.75));
  for (let t = 4.25; t < 10; t += BEAT) at(t, (V, w) => V.hat(w));
  const bl = [N.A1, N.A1, N.C2, N.A1, N.G2 / 2 * 1, N.A1, N.E2, N.A1];
  for (let k = 0; k < 24; k++) { const t = 4 + k * 0.25; at(t, (V, w) => V.bass(w, bl[k % 8] * 2, 0.18, 0.18)); }
  [4, 6, 8].forEach(t => at(t, (V, w) => V.stab(w, [N.A3, N.C4, N.E4], 0.05)));
  // 10–12 · the turn
  at(9.8, (V, w) => V.whoosh(w, 0.75, 0.32));
  at(10.55, (V, w) => V.impact(w, 0.5));
  at(10.55, (V, w) => V.pad(w, 1.6, [N.C3, N.E3, N.G3, N.C4, N.E4]));
  at(10.6, (V, w) => V.bell(w, N.G5, 0.07));
  at(11.0, (V, w) => V.riser(w, 1.0, 0.2));
  // 12–26 · the system: bright groove in C major (C – G – Am – F)
  const prog4 = [[N.C2, [N.C4, N.E4, N.G4]], [N.G2 / 2 * 2, [N.B3, N.D4, N.G4]], [N.A2 / 2 * 2, [N.C4, N.E4, N.A4]], [N.F2, [N.C4, N.F4, N.A4]]];
  at(12.0, (V, w) => V.impact(w, 0.55));
  for (let t = 12; t < 26; t += BEAT) at(t, (V, w) => V.kick(w, 0.8));
  for (let t = 12.5; t < 26; t += 1) at(t, (V, w) => V.clap(w));
  for (let t = 12.25; t < 26; t += BEAT) at(t, (V, w) => V.hat(w, 0.1));
  for (let k = 0; k < 56; k++) {
    const t = 12 + k * 0.25, bar = Math.floor((t - 12) / 2) % 4, root = prog4[bar][0];
    at(t, (V, w) => V.bass(w, root * (k % 4 === 2 ? 2 : 1), 0.2, 0.2));
  }
  for (let b = 0; b < 7; b++) { const t = 12 + b * 2, ch = prog4[b % 4][1]; at(t, (V, w) => V.pad(w, 2.0, ch, 0.016)); }
  // promises: a bell per check
  for (let i = 0; i < 4; i++) at(PROM_T0 + i * PROM_STEP, (V, w) => V.bell(w, [N.C5, N.E5, N.G5, N.C6][i], 0.09));
  at(25.0, (V, w) => V.riser(w, 1.0, 0.22));
  // 26–30 · logo lock
  at(26.0, (V, w) => { V.impact(w, 0.75); V.kick(w, 0.9); });
  at(26.0, (V, w) => V.pad(w, 3.8, [N.C3, N.G3, N.C4, N.E4, N.G4], 0.03));
  at(26.55, (V, w) => { V.bell(w, N.C5, 0.1); V.bell(w, N.G5, 0.06); });
  at(27.4, (V, w) => V.pluck(w, N.E5, 0.07));
  at(29.4, (V, w, S) => { S.out.gain.setValueAtTime(0.8, w); S.out.gain.linearRampToValueAtTime(0.0001, w + 0.6); });
  // each video's own sound effects, synced to its visuals
  if (VIDEO.sfx) VIDEO.sfx(at, N);
}
function makeSink(ac) {
  const out = ac.createGain(); out.gain.value = 0.8;
  const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
  out.connect(comp).connect(ac.destination);
  const nb = ac.createBuffer(1, ac.sampleRate, ac.sampleRate), d = nb.getChannelData(0), r = rng(7);
  for (let i = 0; i < d.length; i++) d[i] = r() * 2 - 1;
  const S = { ac, out, noise: nb }; S.V = voices(S);
  return S;
}
function wavBase64(buf) {
  const ch = buf.numberOfChannels, len = buf.length, sr = buf.sampleRate;
  const data = new DataView(new ArrayBuffer(44 + len * ch * 2));
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) data.setUint8(o + i, s.charCodeAt(i)); };
  ws(0, 'RIFF'); data.setUint32(4, 36 + len * ch * 2, true); ws(8, 'WAVE'); ws(12, 'fmt ');
  data.setUint32(16, 16, true); data.setUint16(20, 1, true); data.setUint16(22, ch, true); data.setUint32(24, sr, true);
  data.setUint32(28, sr * ch * 2, true); data.setUint16(32, ch * 2, true); data.setUint16(34, 16, true); ws(36, 'data'); data.setUint32(40, len * ch * 2, true);
  const chans = [...Array(ch)].map((_, c) => buf.getChannelData(c));
  let o = 44; for (let i = 0; i < len; i++) for (let c = 0; c < ch; c++) { const v = clamp(chans[c][i], -1, 1); data.setInt16(o, v < 0 ? v * 0x8000 : v * 0x7fff, true); o += 2; }
  const bytes = new Uint8Array(data.buffer); let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
window.__renderAudio = async () => {
  const sr = 48000, oc = new OfflineAudioContext(2, Math.ceil(sr * DUR), sr);
  const S = makeSink(oc);
  EV.forEach(e => e.fn(S.V, e.t, S));
  return wavBase64(await oc.startRendering());
};

/* ================================================================
   PLAYER
   ================================================================ */
let abs = 0, playing = !EXPORT, last = performance.now(), live = null, soundOn = false, schedUntil = 0, seeking = false;
const $ = id => document.getElementById(id);
function resetAudio() {
  if (live) { const old = live.out; try { old.gain.setTargetAtTime(0, live.ac.currentTime, 0.01); } catch (e) {} setTimeout(() => { try { old.disconnect(); } catch (e) {} }, 300); const S = makeSink(live.ac); live.out = S.out; live.V = S.V; live.noise = S.noise; }
  schedUntil = abs;
}
function audioTick() {
  if (!live || !soundOn || !playing || seeking) return;
  const b = abs + 0.15, a = schedUntil; if (b <= a) return;
  for (let L = Math.floor(a / DUR); L <= Math.floor(b / DUR); L++) for (const ev of EV) {
    const T = L * DUR + ev.t;
    if (T >= a && T < b) ev.fn(live.V, live.ac.currentTime + Math.max(0, T - abs) + 0.02, live);
  }
  schedUntil = b;
}
function setPlaying(p) { playing = p; $('play').textContent = p ? '❚❚' : '▶'; $('play').setAttribute('aria-label', p ? 'Pausar' : 'Reproducir'); resetAudio(); if (p && live && live.ac.state === 'suspended') live.ac.resume(); }
function setSound(on) {
  if (on && !live) { const ac = new AudioContext(); live = makeSink(ac); }
  if (on && live.ac.state === 'suspended') live.ac.resume();
  soundOn = on; $('sound').textContent = on ? 'Sonido: on' : 'Sonido: off'; resetAudio();
}
function seek(t) { abs = clamp(t, 0, DUR - 0.001); resetAudio(); }
if (!EXPORT) {
  $('play').onclick = () => setPlaying(!playing);
  canvas.onclick = () => setPlaying(!playing);
  $('sound').onclick = () => setSound(!soundOn);
  const sc = $('scrub'), frac = e => { const r = sc.getBoundingClientRect(); return clamp((e.clientX - r.left) / r.width); };
  sc.addEventListener('pointerdown', e => { seeking = true; sc.setPointerCapture(e.pointerId); seek(frac(e) * DUR); });
  sc.addEventListener('pointermove', e => { if (seeking) seek(frac(e) * DUR); });
  const end = () => { if (seeking) { seeking = false; resetAudio(); } };
  sc.addEventListener('pointerup', end); sc.addEventListener('pointercancel', end);
  document.addEventListener('keydown', e => {
    const tc = ((abs % DUR) + DUR) % DUR;
    if (e.code === 'Space') { e.preventDefault(); setPlaying(!playing); }
    else if (e.key === 'ArrowRight') seek(tc + 1); else if (e.key === 'ArrowLeft') seek(tc - 1);
    else if (e.key === 'm' || e.key === 'M') setSound(!soundOn);
  });
  const chips = $('chips');
  const link = (f, l, label, on) => { const a = document.createElement('a'); a.href = `?format=${f}&lang=${l}`; a.textContent = label; if (on) a.className = 'on'; chips.appendChild(a); };
  Object.keys(FORMATS).forEach(f => link(f, LANG, f.replace('x', ':'), f === FMT));
  ['es', 'en'].forEach(l => link(FMT, l, l.toUpperCase(), l === LANG));
}
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000); last = now;
  if (playing && !seeking) abs += dt;
  const t = ((abs % DUR) + DUR) % DUR;
  render(t); audioTick();
  $('fill').style.width = (t / DUR * 100) + '%';
  $('tc').textContent = `${t.toFixed(1).padStart(4, '0')} / ${DUR.toFixed(1)}`;
  $('scrub').setAttribute('aria-valuenow', t.toFixed(1));
  requestAnimationFrame(frame);
}

/* ================================================================
   EXPORT HOOKS (used by marketing/tools/export-video.mjs)
   ================================================================ */
window.__meta = { duration: DUR, fps: FPS, width: W, height: H, format: FMT, lang: LANG };
window.__renderAt = t => { playing = false; render(clamp(t, 0, DUR - 1e-6)); };
window.__frame = (t, type = 'image/png', q) => { window.__renderAt(t); return canvas.toDataURL(type, q); };
const fontsReady = Promise.all([
  document.fonts.load(`800 100px Syne`), document.fonts.load(`400 20px Geist`), document.fonts.load(`600 20px Geist`), document.fonts.load(`500 20px 'Geist Mono'`)
]);
/* Each video calls SC.run({ copy, accent, hook, pains, solution, sfx }). */
function run(video) {
  VIDEO = video;
  COPY = video.copy[LANG];
  C.accent = video.accent;
  ACC_RGB = video.accentRgb;
  canvas.setAttribute('aria-label', COPY.aria || document.title);
  buildTimeline();
  window.__ready = fontsReady.then(() => {
    if (EXPORT) { render(0); return true; }
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPlaying(!reduce); last = performance.now(); requestAnimationFrame(frame); return true;
  });
}

/* ================================================================
   KIT — building blocks the videos share for their own scenes
   ================================================================ */
/* Card with a header bar and a mono title; returns the content rect. */
function panel(x, y, w, h, title, o = {}) {
  const cut = o.cut ?? 14 * U, hb = o.hb ?? 46 * U;
  card(x, y, w, h, cut, o.fill ?? C.surface, o.stroke === undefined ? C.line2 : o.stroke);
  ctx.fillStyle = o.head ?? C.raised; cutPath(x, y, w, hb, cut); ctx.fill();
  if (title) mono(title, x + 20 * U, y + hb / 2, o.titleSize ?? 18 * U, o.titleCol ?? C.muted, 'left', 500, 0.04);
  return { x: x + 20 * U, y: y + hb + 14 * U, w: w - 40 * U, h: h - hb - 28 * U };
}
/* Placeholder text: n bars of seeded widths. */
function textBars(x, y, w, n, gap, seed, alpha = 0.16, th = 7 * U) {
  const r = rng(seed);
  ctx.fillStyle = `rgba(214,226,245,${alpha})`;
  for (let i = 0; i < n; i++) ctx.fillRect(x, y + i * gap, w * (0.45 + 0.5 * r()), th);
}
/* Rounded phone; returns the screen rect. */
function phoneFrame(x, y, w, h, o = {}) {
  ctx.save();
  if (o.shadow !== false) { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50 * U; ctx.shadowOffsetY = 20 * U; }
  ctx.beginPath(); ctx.roundRect(x, y, w, h, w * 0.14); ctx.fillStyle = '#0d121c'; ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.roundRect(x, y, w, h, w * 0.14); ctx.lineWidth = 2 * U; ctx.strokeStyle = C.line2; ctx.stroke();
  const p = w * 0.06, s = { x: x + p, y: y + p * 1.9, w: w - p * 2, h: h - p * 3.6 };
  ctx.fillStyle = o.screen ?? C.surface; ctx.fillRect(s.x, s.y, s.w, s.h);
  ctx.fillStyle = 'rgba(214,226,245,0.25)'; ctx.fillRect(x + w / 2 - w * 0.12, y + p * 0.75, w * 0.24, 5 * U);
  return s;
}
/* Laptop: screen + base; returns the screen rect. */
function laptopFrame(x, y, w, h) {
  const bh = h * 0.06, sh = h - bh;
  ctx.fillStyle = '#0d121c'; ctx.beginPath(); ctx.roundRect(x + w * 0.04, y, w * 0.92, sh, 12 * U); ctx.fill();
  ctx.lineWidth = 2 * U; ctx.strokeStyle = C.line2; ctx.stroke();
  ctx.fillStyle = '#161d2b'; ctx.beginPath(); ctx.roundRect(x, y + sh, w, bh, [0, 0, 10 * U, 10 * U]); ctx.fill();
  const p = w * 0.025;
  const s = { x: x + w * 0.04 + p, y: y + p, w: w * 0.92 - p * 2, h: sh - p * 2 };
  ctx.fillStyle = C.surface; ctx.fillRect(s.x, s.y, s.w, s.h);
  return s;
}
/* Chat bubble anchored at (x, y) top; side 'in' (left) or 'out' (right of x). Returns {w, h}. */
function bubble(x, y, text, o = {}) {
  const size = o.size ?? 26 * U, pad = size * 0.55;
  setFont('text', size, o.weight ?? 500);
  const tw = ctx.measureText(text).width, w = tw + pad * 2, h = size + pad * 1.6;
  const bx = o.side === 'out' ? x - w : x;
  ctx.fillStyle = o.fill ?? (o.side === 'out' ? acc(0.22) : C.raised);
  ctx.beginPath(); ctx.roundRect(bx, y, w, h, [size * 0.6, size * 0.6, o.side === 'out' ? 4 * U : size * 0.6, o.side === 'out' ? size * 0.6 : 4 * U]); ctx.fill();
  ctx.fillStyle = o.col ?? C.text; ctx.textBaseline = 'middle'; ctx.fillText(text, bx + pad, y + h / 2 + 1);
  resetText();
  return { w, h, x: bx };
}
/* Switch; k from 0 (off) to 1 (on). */
function toggle(cx, cy, k, w = 52 * U) {
  const h = w / 2;
  ctx.fillStyle = k > 0.5 ? C.accent : 'rgba(214,226,245,0.16)'; ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  ctx.fillStyle = k > 0.5 ? C.bg : C.muted; ctx.fillRect(cx - w / 2 + 4 * U + k * (w - h), cy - h / 2 + 4 * U, h - 8 * U, h - 8 * U);
}
/* Cut-corner node with a check that draws itself (nk: node scale, ck: stroke progress). */
function checkNode(x, cy, size, nk, ck, fill = C.accent) {
  if (nk <= 0) return;
  const s = size * nk;
  cutPath(x + (size - s) / 2, cy - s / 2, s, s, size * 0.2 * nk); ctx.fillStyle = fill; ctx.fill();
  if (ck <= 0) return;
  ctx.strokeStyle = C.bg; ctx.lineWidth = size * 0.11; ctx.lineCap = 'square';
  const p1 = [x + size * 0.26, cy + size * 0.02], p2 = [x + size * 0.43, cy + size * 0.19], p3 = [x + size * 0.76, cy - size * 0.17];
  ctx.beginPath(); ctx.moveTo(...p1);
  if (ck < 0.4) ctx.lineTo(lerp(p1[0], p2[0], ck / 0.4), lerp(p1[1], p2[1], ck / 0.4));
  else { ctx.lineTo(...p2); const q = clamp((ck - 0.4) / 0.6); ctx.lineTo(lerp(p2[0], p3[0], q), lerp(p2[1], p3[1], q)); }
  ctx.stroke(); ctx.lineCap = 'butt';
}
function lockIcon(cx, cy, s, col) {
  ctx.strokeStyle = col; ctx.lineWidth = s * 0.14;
  ctx.beginPath(); ctx.arc(cx, cy - s * 0.12, s * 0.26, Math.PI, 0); ctx.stroke();
  ctx.fillStyle = col; ctx.fillRect(cx - s * 0.4, cy - s * 0.12, s * 0.8, s * 0.6);
}
function warnIcon(cx, cy, s, col) {
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(cx, cy - s / 2); ctx.lineTo(cx + s / 2, cy + s * 0.4); ctx.lineTo(cx - s / 2, cy + s * 0.4); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.bg; ctx.fillRect(cx - s * 0.05, cy - s * 0.18, s * 0.1, s * 0.32); ctx.fillRect(cx - s * 0.05, cy + s * 0.2, s * 0.1, s * 0.1);
}
function spinner(cx, cy, r, t, col = C.muted) {
  ctx.strokeStyle = col; ctx.lineWidth = r * 0.22; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx, cy, r, t * 6, t * 6 + Math.PI * 1.4); ctx.stroke(); ctx.lineCap = 'butt';
}
/* Replace characters with glyphs: k=0 original, k=1 fully scrambled (deterministic per frame). */
const GLYPHS = '0123456789abcdef#$%&*@';
function scramble(str, k, seed, t) {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ' || hash(i, seed) > k) out += str[i];
    else out += GLYPHS[Math.floor(hash(i + Math.floor(t * 20), seed + 7) * GLYPHS.length)];
  }
  return out;
}
/* App window with three dots, a title and a pulsing live badge; returns the content rect. */
function appWindow(x, y, w, h, title, t, live = COPY.live) {
  const top = 52 * U;
  card(x, y, w, h, 18 * U, C.surface, C.line2);
  ctx.fillStyle = C.raised; cutPath(x, y, w, top, 18 * U); ctx.fill();
  for (let i = 0; i < 3; i++) { ctx.fillStyle = 'rgba(214,226,245,0.18)'; ctx.fillRect(x + 22 * U + i * 18 * U, y + top / 2 - 5 * U, 10 * U, 10 * U); }
  mono(title, x + 92 * U, y + top / 2, 17 * U, C.muted, 'left', 500, 0.04);
  if (live) {
    ctx.save(); ctx.globalAlpha *= 0.6 + 0.4 * bp(t); ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(x + w - 96 * U, y + top / 2, 5 * U, 0, TAU); ctx.fill(); ctx.restore();
    mono(live, x + w - 84 * U, y + top / 2, 15 * U, C.accent, 'left', 600, 0.14);
  }
  return { x: x + 28 * U, y: y + top + 28 * U, w: w - 56 * U, h: h - top - 56 * U };
}
/* Visibility of solution beat i (0..3): fades in at its start, out as the next one begins. */
function beatK(t, i) {
  const a = SOL_T[i][0];
  const k = E.outExpo(prog(t, a - 0.1, a + 0.35));
  return i < 3 ? k * (1 - E.inExpo(prog(t, SOL_T[i + 1][0] - 0.25, SOL_T[i + 1][0] + 0.05))) : k;
}
/* The whole solution visual leaves together just before the promises. */
const solOut = t => E.inExpo(prog(t, 19.65, 20.05));
/* Fit a 4-beat solution "stage" inside a rect, centered; returns {x, y, w, h}. */
function fitRect(R, ratio) {
  let w = R.w, h = w / ratio; if (h > R.h) { h = R.h; w = h * ratio; }
  return { x: R.x + (R.w - w) / 2, y: R.y + (R.h - h) / 2, w, h };
}

/* ================================================================
   PUBLIC API — what each video's scenes can use
   ================================================================ */
window.SC = {
  run, ctx, canvas, W, H, U, LAND, FMT, LANG, SAFE, BOX, C, FAM, TAU, BEAT, DUR,
  clamp, lerp, prog, E, rng, hash, bp, acc,
  cutPath, card, setFont, resetText, mono, layout, drawText, drawMark,
  REG, PAIN_T, visIn, SR, SOL_T,
  panel, textBars, phoneFrame, laptopFrame, bubble, toggle, checkNode, lockIcon, warnIcon, spinner, scramble, fitRect,
  appWindow, beatK, solOut,
  get COPY() { return COPY; }
};
})();
