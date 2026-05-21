import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/* ─── Icons ─── */
const GithubIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
const LinkedInIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const MailIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>;
const MapIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="12" r="3"/></svg>;
const CodeIconSm = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;

/* ── Iconos SVG para las cards del mockup ── */
const IconIdea = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="1.5">
    <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
    <path d="M9 14.5h6M10 17h4" strokeLinecap="round" />
    <path d="M8.5 11a3.5 3.5 0 117 0c0 1.3-.72 2.12-1.45 2.83-.48.47-.8.78-.95 1.17h-2.2c-.15-.39-.47-.7-.95-1.17C9.22 13.12 8.5 12.3 8.5 11z" />
  </svg>
);
const IconBalance = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="1.5">
    <path d="M12 4v16M6 8h12M8 8l-3 6h6L8 8zM16 8l-3 6h6l-3-6z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20h6" strokeLinecap="round" />
  </svg>
);
const IconLaunch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fde68a" strokeWidth="1.5">
    <path d="M12 3c3.2 1.4 5.2 3.9 6 7.5-2.3.4-4.4 1.4-6 3-1.6-1.6-3.7-2.6-6-3C6.8 6.9 8.8 4.4 12 3z" strokeLinejoin="round" />
    <path d="M9 15l-1.5 4L12 17l4.5 2L15 15" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="1.5" />
  </svg>
);

/* ══════════════════════════════════════════
   LÍNEAS DE CÓDIGO que se tipean
══════════════════════════════════════════ */
interface CodeLine {
  html: string;
}

const CODE_LINES: CodeLine[] = [
  { html: `<span class="tk kw">const</span> <span class="tk var">idea</span> <span class="tk op">=</span> <span class="tk str">'symmetrical'</span>` },
  { html: `` },
  { html: `<span class="tk kw">export default</span> <span class="tk fn">function</span> <span class="tk fn">Studio</span>() {` },
  { html: `  <span class="tk kw">return</span> (` },
  { html: `    <span class="tk tag">&lt;section</span> <span class="tk attr">className</span>=<span class="tk val">"hero"</span><span class="tk tag">&gt;</span>` },
  { html: `      <span class="tk tag">&lt;h1&gt;</span>Symmetrical Code<span class="tk tag">&lt;/h1&gt;</span>` },
  { html: `      <span class="tk tag">&lt;p&gt;</span>Ideas en equilibrio<span class="tk tag">&lt;/p&gt;</span>` },
  { html: `      <span class="tk tag">&lt;Button</span> <span class="tk attr">variant</span>=<span class="tk val">"primary"</span><span class="tk tag">&gt;</span>` },
  { html: `        Iniciar conversación` },
  { html: `      <span class="tk tag">&lt;/Button&gt;</span>` },
  { html: `    <span class="tk tag">&lt;/section&gt;</span>` },
  { html: `  )` },
  { html: `}` },
  { html: `` },
  { html: `<span class="tk cmt">// balanceIdea() →</span>` },
  { html: `<span class="tk kw">const</span> <span class="tk var">launch</span> <span class="tk op">=</span> <span class="tk fn">buildWithCare</span>(idea)` },
];

/* ══════════════════════════════════════════
   CODE → WEBSITE
══════════════════════════════════════════ */
function CodeToWebScene() {
  const { t } = useTranslation();

  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const codeBodyRef = useRef<HTMLDivElement>(null);
  const codePanelRef = useRef<HTMLDivElement>(null);
  const webPanelRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const phaseLabelRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const rect = scene.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const colors = ['#00e5ff', '#00b4d8', '#7dd3fc', '#86efac', '#fde68a'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      const angle = (Math.PI * 2 / 28) * i + Math.random() * 0.3;
      const speed = 60 + Math.random() * 80;
      Object.assign(p.style, {
        position: 'absolute',
        left: `${cx}px`,
        top: `${cy}px`,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        background: colors[i % colors.length],
        opacity: '0',
        pointerEvents: 'none',
        zIndex: '50',
        transition: `all ${0.6 + Math.random() * 0.5}s cubic-bezier(0,0.9,0.57,1)`,
      });
      scene.appendChild(p);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          p.style.transform = `translate(${Math.cos(angle) * speed}px, ${Math.sin(angle) * speed}px)`;
          p.style.opacity = '0.9';
        });
      });
      setTimeout(() => {
        p.style.opacity = '0';
        setTimeout(() => p.remove(), 500);
      }, 600);
    }
  }, []);

  const typeLinesRef = useRef<((lines: CodeLine[], idx: number, onDone: () => void) => void) | null>(null);
  const startSequenceRef = useRef<(() => void) | null>(null);

  // Escala dinámica: el panel "nativo" mide 460px de ancho y ~420px de alto.
  // Calculamos cuánto cabe en el contenedor y aplicamos scale a todos los paneles.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const PANEL_W = 460;
    const PANEL_H = 420; // altura aproximada del panel con contenido
    const LABEL_H = 40;  // espacio reservado para el phase-label en la parte baja
    const applyScale = () => {
      const sw = scene.offsetWidth;
      const sh = scene.offsetHeight;
      const scaleX = (sw - 32) / PANEL_W;
      // Descontamos el label del alto disponible para que no lo tape
      const scaleY = (sh - LABEL_H - 24) / PANEL_H;
      const s = Math.min(scaleX, scaleY, 1);
      // Centrado vertical: mover el pivot un poco arriba para ceder espacio al label
      const topPct = sh > 0 ? ((sh - LABEL_H) / 2 / sh) * 100 : 50;
      [codePanelRef, webPanelRef, logoOverlayRef].forEach(ref => {
        if (ref.current) {
          ref.current.dataset.baseScale = String(s);
          ref.current.style.top = `${topPct}%`;
        }
      });
    };
    applyScale();
    const ro = new ResizeObserver(applyScale);
    ro.observe(scene);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const typeLines = (lines: CodeLine[], idx: number, onDone: () => void) => {
      const body = codeBodyRef.current;
      if (!body) return;
      if (idx >= lines.length) {
        onDone();
        return;
      }
      const row = document.createElement('div');
      row.className = 'sc-line';
      body.appendChild(row);
      row.innerHTML = lines[idx].html + (idx === lines.length - 1 ? '<span class="sc-cursor"></span>' : '');
      const cursors = body.querySelectorAll('.sc-cursor');
      cursors.forEach((c, i, all) => { if (i < all.length - 1) c.remove(); });
      const delay = lines[idx].html.length > 0 ? 180 + Math.random() * 60 : 80;
      setTimeout(() => typeLines(lines, idx + 1, onDone), delay);
    };
    typeLinesRef.current = typeLines;
  }, []);

  useEffect(() => {
    const startSequence = () => {
      clearTimers();

      const body = codeBodyRef.current;
      const code = codePanelRef.current;
      const web = webPanelRef.current;
      const logo = logoOverlayRef.current;
      const label = phaseLabelRef.current;
      if (!body || !code || !web || !logo || !label) return;

      const bs = parseFloat(code.dataset.baseScale ?? '1') || 1;

      body.innerHTML = '';
      code.style.transition = 'none';
      code.style.opacity = '1';
      code.style.transform = `translate(-50%, -50%) scale(${bs})`;
      web.style.transition = 'none';
      web.style.opacity = '0';
      web.style.transform = `translate(-50%, -50%) perspective(900px) rotateY(30deg) scale(${bs})`;
      logo.style.transition = 'none';
      logo.style.opacity = '0';
      logo.style.transform = `translate(-50%, -50%) scale(${bs * 0.9})`;
      label.style.opacity = '1';
      label.textContent = t('scene.phase_typing');

      const typeLinesFn = typeLinesRef.current;
      if (!typeLinesFn) return;

      typeLinesFn(CODE_LINES, 0, () => {
        later(() => {
          if (label) label.textContent = t('scene.phase_compiling');
          spawnParticles();

          later(() => {
            if (code) {
              code.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
              code.style.opacity = '0';
              code.style.transform = `translate(-50%, -50%) scale(${bs * 0.95})`;
            }
            if (web) {
              web.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
              web.style.transform = `translate(-50%, -50%) perspective(900px) rotateY(0deg) scale(${bs})`;
              web.style.opacity = '1';
            }
            if (label) label.textContent = t('scene.phase_rendering');
            spawnParticles();

            later(() => {
              if (web) {
                web.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
                web.style.opacity = '0';
                web.style.transform = `translate(-50%, -50%) perspective(900px) scale(${bs * 0.95})`;
              }
              if (logo) {
                logo.style.transition = 'all 0.8s cubic-bezier(0.4,0,0.2,1)';
                logo.style.opacity = '1';
                logo.style.transform = `translate(-50%, -50%) scale(${bs})`;
              }
              if (label) label.textContent = 'symmetricalcode.com';

              later(() => {
                if (label) label.style.opacity = '0';
                if (startSequenceRef.current) later(() => startSequenceRef.current!(), 300);
              }, 5000);
            }, 5000);
          }, 500);
        }, 500);
      });
    };

    startSequenceRef.current = startSequence;
  }, [clearTimers, spawnParticles, later, t]);

  // Canvas de estrellas
  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;
    const drawStars = () => {
      canvas.width = scene.offsetWidth;
      canvas.height = scene.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 130; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.3 + 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${Math.random() * 0.45 + 0.08})`;
        ctx.fill();
      }
    };
    drawStars();
    const resizeObserver = new ResizeObserver(() => drawStars());
    resizeObserver.observe(scene);
    return () => resizeObserver.disconnect();
  }, []);

  // Inyecta estilos — VERSIÓN RESPONSIVA
  useEffect(() => {
    if (document.getElementById('sc-styles')) return;
    const s = document.createElement('style');
    s.id = 'sc-styles';
    s.textContent = `
      .sc-scene { width:100%;height:100%;background:#040810;position:relative;overflow:hidden; }
      .sc-stars { position:absolute;inset:0;pointer-events:none;width:100%;height:100%; }

      /* ── Paneles: siempre 460px nativos, el scale JS los achica ── */
      .sc-code-panel {
        position:absolute;top:50%;left:50%;
        transform-origin: center center;
        width:460px;
        background:#0d1b2a;border:1px solid #1a3a5c;border-radius:12px;
        overflow:hidden;box-shadow:0 0 60px rgba(0,180,255,.1);z-index:10;
      }
      .sc-panel-bar { background:#142030;padding:12px 16px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #1a3a5c; }
      .sc-dot { width:12px;height:12px;border-radius:50%; }
      .sc-fname { font-size:12px;color:#4a7fa0;margin-left:10px;font-family:monospace; }
      .sc-code-body {
        padding:20px 24px;min-height:320px;
        font-size:13px;line-height:1.8;color:#c8d8e8;
        font-family:'Menlo','Monaco','Courier New',monospace;
      }
      .sc-line { white-space:pre; }
      .sc-cursor { display:inline-block;width:2px;height:15px;background:#00e5ff;vertical-align:middle;animation:sc-blink .9s step-end infinite; }
      @keyframes sc-blink { 0%,100%{opacity:1}50%{opacity:0} }
      .tk.kw{color:#7dd3fc}.tk.fn{color:#86efac}.tk.str{color:#fde68a}.tk.cmt{color:#4a6a7a;font-style:italic}.tk.var{color:#e2a0ff}.tk.op{color:#7dd3fc}.tk.tag{color:#7dd3fc}.tk.attr{color:#86efac}.tk.val{color:#fde68a}

      /* ── Web Panel ── */
      .sc-web-panel {
        position:absolute;top:50%;left:50%;
        transform-origin: center center;
        width:460px;border-radius:12px;overflow:hidden;opacity:0;
        box-shadow:0 0 80px rgba(0,229,255,.15);z-index:9;
      }
      .sc-web-bar { background:#1a1a2e;padding:10px 14px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #2a2a4e; }
      .sc-url-bar { flex:1;background:#0d0d1e;border-radius:20px;padding:4px 14px;font-size:11px;color:#6a9a7a;font-family:monospace;border:1px solid #2a2a4e;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
      .sc-web-hero { background:#0a0f1e;padding:28px 24px 22px;border-bottom:1px solid #1a2a3e; }
      .sc-web-tag { display:inline-block;font-size:10px;font-family:monospace;color:#00b4d8;border:1px solid rgba(0,180,216,.3);padding:3px 10px;border-radius:20px;margin-bottom:12px; }
      .sc-web-title { font-size:24px;font-weight:600;color:#e8f4ff;line-height:1.2;margin-bottom:8px; }
      .sc-web-title span{color:#00e5ff}
      .sc-web-sub { font-size:12px;color:#5a7a90;margin-bottom:16px;line-height:1.5; }
      .sc-web-btns { display:flex;gap:10px; }
      .sc-btn-p { background:#00b4d8;color:#000;border:none;padding:7px 16px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer; }
      .sc-btn-o { background:transparent;color:#00b4d8;border:1px solid rgba(0,180,216,.4);padding:7px 16px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer; }
      .sc-web-cards { background:#070d14;padding:14px 16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px; }
      .sc-web-card { background:#0d1b2a;border:1px solid #1a3a5c;border-radius:8px;padding:10px; }
      .sc-card-icon { width:26px;height:26px;border-radius:6px;margin-bottom:7px;display:flex;align-items:center;justify-content:center; }
      .sc-card-title { font-size:10px;font-weight:600;color:#a8c8e0;margin-bottom:3px; }
      .sc-card-desc { font-size:9px;color:#3a5a6a;line-height:1.4; }

      /* ── Logo Overlay ── */
      .sc-logo-overlay {
        position:absolute;top:50%;left:50%;
        transform-origin: center center;
        opacity:0;z-index:30;
        display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;
        pointer-events:none;
        width:460px;padding:40px 20px;
        background:rgba(13,27,42,0.6);backdrop-filter:blur(4px);
        border-radius:12px;border:1px solid rgba(0,180,216,0.2);
      }
      .sc-logo-img { width:200px;height:200px;object-fit:contain;display:block;margin:0 auto;filter:drop-shadow(0 0 48px rgba(0,229,255,0.5)) drop-shadow(0 0 20px rgba(0,180,255,0.4)); }
      .sc-logo-label { font-family:monospace;font-size:14px;letter-spacing:.3em;text-transform:uppercase;color:rgba(0,229,255,.7);text-align:center; }

      /* ── Phase Label — pegado al fondo del contenedor, nunca tapa el panel ── */
      .sc-phase-label {
        position:absolute;
        /* bottom relativo a la escena, siempre debajo del panel escalado */
        bottom:10px;
        left:50%;transform:translateX(-50%);
        font-size:10px;letter-spacing:.18em;text-transform:uppercase;
        color:rgba(0,229,255,.55);font-family:monospace;
        transition:opacity .5s;white-space:nowrap;
        z-index:40;
        background:rgba(4,8,16,0.75);
        padding:4px 12px;border-radius:20px;
        backdrop-filter:blur(4px);
        max-width:calc(100% - 24px);
        overflow:hidden;text-overflow:ellipsis;
        pointer-events:none;
      }
    `;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (startSequenceRef.current) startSequenceRef.current();
    }, 300);
    return () => {
      clearTimers();
      clearTimeout(id);
    };
  }, [clearTimers]);

  return (
    <div ref={sceneRef} className="sc-scene">
      <canvas ref={canvasRef} className="sc-stars" />

      <div ref={codePanelRef} className="sc-code-panel">
        <div className="sc-panel-bar">
          <div className="sc-dot" style={{ background: '#ff5f57' }} />
          <div className="sc-dot" style={{ background: '#febc2e' }} />
          <div className="sc-dot" style={{ background: '#28c840' }} />
          <span className="sc-fname">app.jsx</span>
        </div>
        <div ref={codeBodyRef} className="sc-code-body" />
      </div>

      <div ref={webPanelRef} className="sc-web-panel">
        <div className="sc-web-bar">
          <div className="sc-dot" style={{ background: '#ff5f57' }} />
          <div className="sc-dot" style={{ background: '#febc2e' }} />
          <div className="sc-dot" style={{ background: '#28c840' }} />
          <div className="sc-url-bar">symmetricalcode.com</div>
        </div>
        <div className="sc-web-hero">
          <div className="sc-web-tag">{t('scene.studio_tag')}</div>
          <div className="sc-web-title">
            {t('scene.studio_name')}<span>{t('scene.studio_highlight')}</span>
          </div>
          <div className="sc-web-sub">{t('scene.studio_sub')}</div>
          <div className="sc-web-btns">
            <button className="sc-btn-p">{t('scene.btn_projects')}</button>
            <button className="sc-btn-o">{t('scene.btn_contact')}</button>
          </div>
        </div>
        <div className="sc-web-cards">
          {[
            { Icon: IconIdea, bg: 'rgba(0,180,216,.12)', title: t('scene.card_idea_title'), desc: t('scene.card_idea_desc') },
            { Icon: IconBalance, bg: 'rgba(134,239,172,.12)', title: t('scene.card_balance_title'), desc: t('scene.card_balance_desc') },
            { Icon: IconLaunch, bg: 'rgba(253,230,138,.12)', title: t('scene.card_launch_title'), desc: t('scene.card_launch_desc') },
          ].map(({ Icon, bg, title, desc }) => (
            <div key={title} className="sc-web-card">
              <div className="sc-card-icon" style={{ background: bg }}>
                <Icon />
              </div>
              <div className="sc-card-title">{title}</div>
              <div className="sc-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div ref={logoOverlayRef} className="sc-logo-overlay">
        <img src="/logo.png" alt="SymmetricalCode" className="sc-logo-img" draggable={false} />
        <span className="sc-logo-label">symmetricalcode.com</span>
      </div>

      <div ref={phaseLabelRef} className="sc-phase-label" />
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
export default function Hero() {
  const { t } = useTranslation();

  const principles = [
    { value: t('hero.stat_1_value'), label: t('hero.stat_1_label') },
    { value: t('hero.stat_2_value'), label: t('hero.stat_2_label') },
    { value: t('hero.stat_3_value'), label: t('hero.stat_3_label') },
  ];

  return (
    <section id="home" className="relative overflow-hidden grid-bg" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: 'radial-gradient(circle, #00e5ff, transparent)' }}
        />
        <div
          className="absolute top-0 right-0 w-px h-full opacity-15"
          style={{ background: 'linear-gradient(to bottom, transparent, #00e5ff, transparent)' }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '100vh', zIndex: 1 }}>

        {/* LEFT — Texto */}
        <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-14 pt-20 sm:pt-24 pb-12">
          <div
            className="inline-flex items-center gap-3 mb-6 sm:mb-7 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <span className="w-8 h-px bg-[#00e5ff]" />
            <span className="section-label">{t('hero.label')}</span>
          </div>

          <h1
            className="font-syne font-black leading-[0.88] mb-6 sm:mb-7 opacity-0 animate-fade-up"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4.4rem)',
              animationDelay: '0.18s',
              animationFillMode: 'forwards',
              overflowWrap: 'break-word',
            }}
          >
            <span className="text-white block">{t('hero.title')}</span>
            <span className="gradient-text block">{t('hero.title_highlight')}</span>
            <span className="text-white/20 block">{t('hero.title_end')}</span>
          </h1>

          <p
            className="text-white/50 text-sm leading-relaxed mb-7 opacity-0 animate-fade-up"
            style={{ maxWidth: '38ch', animationDelay: '0.28s', animationFillMode: 'forwards' }}
          >
            {t('hero.subtitle')}
          </p>

          <div
            className="flex flex-wrap gap-3 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary px-6 py-3 rounded-none font-syne font-bold text-sm tracking-wider"
            >
              {t('hero.cta_primary')}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline px-6 py-3 rounded-none font-syne font-bold text-sm tracking-wider"
            >
              {t('hero.cta_secondary')}
            </button>
          </div>

          {/* Principios — sin métricas infladas mientras el estudio inicia */}
          <div
            className="flex flex-wrap gap-5 sm:gap-6 mb-7 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.42s', animationFillMode: 'forwards' }}
          >
            {principles.map((s, i) => (
              <div key={i} className="border-l-2 border-[rgba(0,229,255,0.22)] pl-4">
                <div className="font-syne font-black text-lg sm:text-xl gradient-text">{s.value}</div>
                <div className="font-mono text-[0.65rem] text-white/35 mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          <div
            className="h-px mb-6 opacity-0 animate-fade-up bg-gradient-to-r from-[rgba(0,229,255,0.15)] to-transparent"
            style={{ maxWidth: '36ch', animationDelay: '0.47s', animationFillMode: 'forwards' }}
          />

          {/* Info de contacto + redes */}
          <div
            className="flex flex-col sm:flex-row gap-5 sm:gap-6 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.52s', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-col gap-2">
              {[
                { icon: <MailIcon />, text: t('hero.email') },
                { icon: <MapIcon />, text: t('hero.location') },
                { icon: <CodeIconSm />, text: t('hero.availability') },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/38 text-xs font-mono">
                  <span className="text-[#00e5ff] flex-shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="hidden sm:block w-px self-stretch bg-[rgba(0,229,255,0.1)]" />

            <div className="flex flex-col gap-3 max-w-sm">
              <p className="font-mono text-[0.66rem] leading-relaxed text-white/35 border-l border-[rgba(0,229,255,0.18)] pl-3">
                {t('hero.foundation_note')}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="font-mono text-[0.58rem] text-white/20 tracking-widest uppercase">
                  {t('hero.follow_us')}
                </span>
                <div className="flex gap-3">
                  {[
                    { icon: <GithubIcon />, href: 'https://github.com/symmetricalcode', label: 'GitHub' },
                    { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/symmetricalcode', label: 'LinkedIn' },
                    { icon: <InstagramIcon />, href: 'https://instagram.com/symmetricalcode', label: 'Instagram' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-white/25 hover:text-[#00e5ff] transition-colors duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── MOBILE: Scene se muestra debajo del texto en móvil ── */}
          {/* FIX: visible solo en mobile/tablet, oculto en lg (donde ya aparece en la columna derecha) */}
          <div
            className="block lg:hidden mt-10 rounded-xl overflow-hidden opacity-0 animate-fade-up"
            style={{
              height: 'clamp(280px, 55vw, 420px)',
              animationDelay: '0.6s',
              animationFillMode: 'forwards',
            }}
          >
            <CodeToWebScene />
          </div>
        </div>

        {/* RIGHT — Code → Web Scene (solo desktop) */}
        <div
          className="relative hidden lg:flex items-center justify-center"
          style={{ minHeight: '100vh', position: 'relative' }}
        >
          <div className="absolute inset-0 pt-16">
            <CodeToWebScene />
          </div>
          <div
            className="absolute inset-y-0 left-0 w-24 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #020408, transparent)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #020408, transparent)' }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25"
        style={{ zIndex: 2 }}
      >
        <span className="font-mono text-xs text-[#00e5ff] tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00e5ff] to-transparent" />
      </div>
    </section>
  );
}
