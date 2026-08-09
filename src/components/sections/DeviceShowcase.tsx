import { useEffect, useRef } from 'react';

/* ══════════════════════════════════════════
   CODE LINES — typed into the laptop screen
══════════════════════════════════════════ */
const CODE_LINES: string[] = [
  `<span class="tk cmt">// build.ts</span>`,
  `<span class="tk kw">import</span> { <span class="tk fn">deploy</span> } <span class="tk kw">from</span> <span class="tk str">'./cloud'</span>`,
  ``,
  `<span class="tk kw">export const</span> <span class="tk var">app</span> <span class="tk op">=</span> <span class="tk fn">createApp</span>({`,
  `  <span class="tk attr">name</span>: <span class="tk str">'symmetrical'</span>,`,
  `  <span class="tk attr">responsive</span>: <span class="tk kw">true</span>,`,
  `  <span class="tk attr">secure</span>: <span class="tk kw">true</span>,`,
  `})`,
  ``,
  `<span class="tk kw">await</span> <span class="tk fn">deploy</span>(app)`,
];

/* Phone UI rows revealed one by one, in sync with the typing. */
const PHONE_ROWS = 4;

/* Display rectangles measured from the mockup artwork by sampling the dark
   panel inside each bezel. Percentages, so they hold at any rendered size. */
const LAPTOP_SCREEN = { left: 10.725, top: 11.739, width: 78.524, height: 76.521 };
const PHONE_SCREEN = { left: 5.497, top: 3.112, width: 89.006, height: 93.848 };

/* matchMedia is missing in jsdom and older browsers, so every query is guarded. */
const matches = (query: string) =>
  typeof window.matchMedia === 'function' && window.matchMedia(query).matches;

const asStyle = (r: { left: number; top: number; width: number; height: number }) => ({
  left: `${r.left}%`,
  top: `${r.top}%`,
  width: `${r.width}%`,
  height: `${r.height}%`,
});

export default function DeviceShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Typing loop, paused while off-screen ── */
  useEffect(() => {
    const root = rootRef.current;
    const code = codeRef.current;
    const phone = phoneRef.current;
    if (!root || !code || !phone) return;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
    const later = (fn: () => void, ms: number) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    const paintAll = () => {
      code.innerHTML = CODE_LINES.map((l) => `<div class="dv-line">${l}</div>`).join('');
      phone.querySelectorAll<HTMLElement>('.dv-row').forEach((r) => r.classList.add('is-on'));
    };

    // Without motion or without an observer to gate the loop, show the end state.
    if (matches('(prefers-reduced-motion: reduce)') || typeof IntersectionObserver !== 'function') {
      paintAll();
      return;
    }

    const rows = Array.from(phone.querySelectorAll<HTMLElement>('.dv-row'));

    const typeLine = (i: number) => {
      if (i >= CODE_LINES.length) {
        // Hold the finished state, then restart the loop.
        later(() => {
          code.innerHTML = '';
          rows.forEach((r) => r.classList.remove('is-on'));
          later(() => typeLine(0), 400);
        }, 2600);
        return;
      }

      const row = document.createElement('div');
      row.className = 'dv-line';
      row.innerHTML = CODE_LINES[i] + '<span class="dv-caret"></span>';
      code.querySelectorAll('.dv-caret').forEach((c) => c.remove());
      code.appendChild(row);

      // Reveal one phone row for every couple of code lines.
      const rowIdx = Math.floor((i / CODE_LINES.length) * PHONE_ROWS);
      if (rows[rowIdx]) rows[rowIdx].classList.add('is-on');

      later(() => typeLine(i + 1), CODE_LINES[i].length > 0 ? 220 + Math.random() * 90 : 90);
    };

    let running = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          code.innerHTML = '';
          rows.forEach((r) => r.classList.remove('is-on'));
          typeLine(0);
        } else if (!entry.isIntersecting && running) {
          running = false;
          clearTimers();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      clearTimers();
    };
  }, []);

  /* ── Float and parallax ──
     The mockups are photographed head-on, so the camera angle is baked in.
     Rotating them hard would fight that perspective; this stays subtle. */
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    if (matches('(prefers-reduced-motion: reduce)')) return;

    let drift = 0;    // -1 .. 1 from scroll position
    let pointerX = 0; // -1 .. 1
    let pointerY = 0; // -1 .. 1
    let frame = 0;

    const render = () => {
      frame = 0;
      const rotY = pointerX * 3.4;
      const rotX = pointerY * -2.6;
      const lift = drift * -14;
      stage.style.transform =
        `translate3d(0, ${lift.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
      drift = Math.max(-1, Math.min(1, centered * 2));
      schedule();
    };

    const finePointer = matches('(pointer: fine)');
    const onPointer = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointerX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      pointerY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      schedule();
    };
    const onLeave = () => {
      pointerX = 0;
      pointerY = 0;
      schedule();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    if (finePointer) {
      root.addEventListener('pointermove', onPointer);
      root.addEventListener('pointerleave', onLeave);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.removeEventListener('pointermove', onPointer);
      root.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="dv-root" aria-hidden="true">
      <div className="dv-glow" />

      <div ref={stageRef} className="dv-stage">
        {/* ── Laptop ── */}
        <div className="dv-laptop">
          <img className="dv-shot" src="/mockups/laptop.webp" alt="" width={1400} height={910} />
          <div className="dv-laptop-screen" style={asStyle(LAPTOP_SCREEN)}>
            <div className="dv-titlebar">
              <span className="dv-dot" style={{ background: '#ff5f57' }} />
              <span className="dv-dot" style={{ background: '#febc2e' }} />
              <span className="dv-dot" style={{ background: '#28c840' }} />
              <span className="dv-fname">build.ts</span>
            </div>
            <div ref={codeRef} className="dv-code" />
            <div className="dv-screen-glare" />
          </div>
        </div>

        {/* ── Phone ── */}
        <div className="dv-phone">
          <img className="dv-shot" src="/mockups/phone.webp" alt="" width={620} height={1222} />
          <div ref={phoneRef} className="dv-phone-screen" style={asStyle(PHONE_SCREEN)}>
            <div className="dv-row dv-row-head">
              <div className="dv-avatar" />
              <div className="dv-bars">
                <span className="dv-bar w-1" />
                <span className="dv-bar w-2" />
              </div>
            </div>
            <div className="dv-row dv-hero-card" />
            <div className="dv-row dv-grid">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="dv-row dv-cta">Deploy</div>
            <div className="dv-screen-glare dv-screen-glare-phone" />
          </div>
        </div>
      </div>

      <style>{`
        .dv-root {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 0 64px;
          perspective: 1600px;
          perspective-origin: 50% 45%;
        }

        .dv-glow {
          position: absolute;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 80%;
          background: radial-gradient(ellipse at center, rgba(0, 180, 220, 0.17) 0%, transparent 68%);
          filter: blur(30px);
          pointer-events: none;
        }

        .dv-stage {
          position: relative;
          width: 460px;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .dv-shot {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* ─────────── Laptop ─────────── */
        .dv-laptop {
          position: relative;
          filter: drop-shadow(0 26px 34px rgba(0, 0, 0, 0.72));
        }

        .dv-laptop-screen {
          position: absolute;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: linear-gradient(158deg, #070c14 0%, #04070c 62%, #060a11 100%);
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.75);
        }

        .dv-titlebar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 9px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
          flex-shrink: 0;
        }

        .dv-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: block;
        }

        .dv-fname {
          margin-left: 6px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.32);
          letter-spacing: 0.04em;
        }

        .dv-code {
          flex: 1;
          padding: 9px 11px;
          font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 8.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          overflow: hidden;
        }

        .dv-line {
          white-space: pre;
          min-height: 1.6em;
        }

        .dv-caret {
          display: inline-block;
          width: 5px;
          height: 8px;
          margin-left: 1px;
          vertical-align: -1px;
          background: #00e5ff;
          animation: dv-blink 1s steps(2, start) infinite;
        }

        @keyframes dv-blink {
          to { visibility: hidden; }
        }

        /* Syntax tokens mirror the hero scene palette. */
        .tk.kw   { color: #7dd3fc; }
        .tk.fn   { color: #86efac; }
        .tk.str  { color: #fde68a; }
        .tk.cmt  { color: #4a6a7a; font-style: italic; }
        .tk.var  { color: #e2a0ff; }
        .tk.op   { color: #7dd3fc; }
        .tk.attr { color: #86efac; }

        /* Faint sheen so the injected panel picks up the mockup's own lighting. */
        .dv-screen-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          background: linear-gradient(
            113deg,
            rgba(255, 255, 255, 0.055) 0%,
            rgba(255, 255, 255, 0.035) 16%,
            rgba(255, 255, 255, 0.006) 16.8%,
            transparent 33%,
            transparent 43%,
            rgba(255, 255, 255, 0.018) 43.6%,
            transparent 57%
          );
        }

        /* ─────────── Phone ─────────── */
        /* Sized to roughly 2/3 of the laptop's height, matching a real
           iPhone against an open 14in laptop, and offset clear of the code. */
        .dv-phone {
          position: absolute;
          right: -46px;
          bottom: -44px;
          width: 96px;
          transform: translateZ(60px);
          filter: drop-shadow(0 22px 30px rgba(0, 0, 0, 0.8));
        }

        .dv-phone-screen {
          position: absolute;
          /* Matches the artwork's screen corner radius. */
          border-radius: 11px;
          background: linear-gradient(165deg, #070c14 0%, #04080e 100%);
          padding: 15px 7px 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
        }

        .dv-screen-glare-phone {
          border-radius: inherit;
        }

        .dv-row {
          opacity: 0;
          transform: translateY(7px);
          transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .dv-row.is-on {
          opacity: 1;
          transform: translateY(0);
        }

        .dv-row-head {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dv-avatar {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00e5ff, #00b4d8);
          flex-shrink: 0;
        }

        .dv-bars {
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .dv-bar {
          height: 3px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.16);
          display: block;
        }

        .dv-bar.w-1 { width: 70%; }
        .dv-bar.w-2 { width: 42%; }

        .dv-hero-card {
          height: 42px;
          border-radius: 5px;
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.18) 0%, rgba(0, 180, 216, 0.05) 100%);
          box-shadow: inset 0 0 0 1px rgba(0, 229, 255, 0.16);
        }

        .dv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }

        .dv-grid span {
          height: 19px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: block;
        }

        .dv-cta {
          margin-top: auto;
          height: 17px;
          border-radius: 4px;
          background: linear-gradient(135deg, #00e5ff, #00b4d8);
          color: #04070c;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 229, 255, 0.28);
        }

        /* ─────────── Responsive ─────────── */
        @media (max-width: 1279px) {
          .dv-stage { width: 372px; }
          .dv-phone { width: 78px; right: -36px; bottom: -36px; }
          .dv-code { font-size: 7.6px; padding: 8px 10px; }
          .dv-phone-screen { padding: 13px 6px 7px; gap: 5px; }
          .dv-hero-card { height: 37px; }
          .dv-grid span { height: 17px; }
          .dv-cta { height: 15px; font-size: 6.5px; }
        }

        @media (max-width: 420px) {
          .dv-root { padding: 18px 0 48px; }
          .dv-stage { width: 268px; }
          .dv-phone { width: 56px; right: -20px; bottom: -26px; }
          .dv-titlebar { padding: 4px 6px; gap: 3px; }
          .dv-dot { width: 4px; height: 4px; }
          .dv-fname { font-size: 6px; margin-left: 4px; }
          .dv-code { font-size: 5.6px; padding: 6px 7px; }
          .dv-caret { width: 3px; height: 6px; }
          .dv-phone-screen { padding: 10px 4px 5px; gap: 3px; border-radius: 8px; }
          .dv-avatar { width: 8px; height: 8px; }
          .dv-bar { height: 2px; }
          .dv-hero-card { height: 26px; border-radius: 4px; }
          .dv-grid { gap: 3px; }
          .dv-grid span { height: 12px; }
          .dv-cta { height: 11px; font-size: 5px; border-radius: 3px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dv-stage { transition: none; }
          .dv-row { opacity: 1; transform: none; transition: none; }
          .dv-caret { animation: none; }
        }
      `}</style>
    </div>
  );
}
