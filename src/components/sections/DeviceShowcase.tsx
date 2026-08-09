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

/* matchMedia is missing in jsdom and older browsers, so every query is guarded. */
const matches = (query: string) =>
  typeof window.matchMedia === 'function' && window.matchMedia(query).matches;

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

  /* ── 3D tilt driven by scroll position + pointer parallax ── */
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    if (matches('(prefers-reduced-motion: reduce)')) return;

    let scrollTilt = 0; // -1 .. 1
    let pointerX = 0;   // -1 .. 1
    let pointerY = 0;   // -1 .. 1
    let frame = 0;

    const render = () => {
      frame = 0;
      // Base pose keeps a subtle isometric feel; scroll and pointer nudge it.
      const rotY = -14 + pointerX * 8 + scrollTilt * 5;
      const rotX = 6 + pointerY * -5 + scrollTilt * -4;
      stage.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 1 when the block enters from below, -1 once it has scrolled past the top.
      const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
      scrollTilt = Math.max(-1, Math.min(1, centered * 2));
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
          <div className="dv-lid">
            <div className="dv-camera" />
            <div className="dv-screen">
              <div className="dv-titlebar">
                <span className="dv-dot" style={{ background: '#ff5f57' }} />
                <span className="dv-dot" style={{ background: '#febc2e' }} />
                <span className="dv-dot" style={{ background: '#28c840' }} />
                <span className="dv-fname">build.ts</span>
              </div>
              <div ref={codeRef} className="dv-code" />
            </div>
            <div className="dv-glare" />
          </div>
          <div className="dv-hinge" />
          <div className="dv-base">
            <div className="dv-trackpad" />
          </div>
          <div className="dv-shadow" />
        </div>

        {/* ── Phone ── */}
        <div ref={phoneRef} className="dv-phone">
          <div className="dv-phone-frame">
            <div className="dv-island" />
            <div className="dv-phone-screen">
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
            </div>
            <div className="dv-glare dv-glare-phone" />
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
          /* Bottom padding leaves room for the phone, which hangs below the laptop. */
          padding: 28px 0 92px;
          perspective: 1400px;
          perspective-origin: 50% 45%;
        }

        .dv-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 118%;
          height: 78%;
          background: radial-gradient(ellipse at center, rgba(0, 180, 220, 0.16) 0%, transparent 68%);
          filter: blur(28px);
          pointer-events: none;
        }

        .dv-stage {
          position: relative;
          width: 360px;
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        /* ─────────── Laptop ─────────── */
        .dv-laptop {
          position: relative;
          transform-style: preserve-3d;
        }

        .dv-lid {
          position: relative;
          width: 360px;
          height: 236px;
          border-radius: 12px 12px 4px 4px;
          padding: 9px 9px 14px;
          /* Anodised aluminium: a bright top-left facet rolling into shadow,
             with a faint bounce light returning along the bottom edge. */
          background:
            linear-gradient(158deg,
              #4a525c 0%,
              #333941 18%,
              #1d2228 46%,
              #14181d 72%,
              #262c34 100%);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.07),
            0 18px 40px -12px rgba(0, 0, 0, 0.9);
          transform: rotateX(-3deg);
          transform-origin: bottom center;
          overflow: hidden;
        }

        /* Machined edge: crisp specular on the top lip, occlusion underneath. */
        .dv-lid::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 4;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.30),
            inset 1px 0 0 rgba(255, 255, 255, 0.08),
            inset -1px 0 0 rgba(255, 255, 255, 0.05),
            inset 0 -2px 3px rgba(0, 0, 0, 0.55);
        }

        .dv-camera {
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0b0e12;
          box-shadow: inset 0 0 2px rgba(120, 200, 230, 0.5);
        }

        .dv-screen {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background: linear-gradient(155deg, #070c14 0%, #04070c 60%, #060a11 100%);
          /* The panel spills its own light onto the surrounding bezel. */
          box-shadow:
            inset 0 0 0 1px rgba(0, 229, 255, 0.1),
            inset 0 0 40px rgba(0, 0, 0, 0.9),
            0 0 22px rgba(0, 180, 220, 0.13),
            0 0 4px rgba(0, 229, 255, 0.16);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Vignette + bottom bounce, so the panel is not a flat black rectangle. */
        .dv-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background:
            radial-gradient(115% 88% at 50% 34%, transparent 52%, rgba(0, 0, 0, 0.44) 100%),
            linear-gradient(0deg, rgba(0, 180, 220, 0.05) 0%, transparent 22%);
        }

        .dv-titlebar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 9px;
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
          padding: 10px 12px;
          font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 9px;
          line-height: 1.62;
          color: rgba(255, 255, 255, 0.82);
          overflow: hidden;
        }

        .dv-line {
          white-space: pre;
          min-height: 1.62em;
        }

        .dv-caret {
          display: inline-block;
          width: 5px;
          height: 9px;
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

        /* Glass reflection: a wide window band plus a thin secondary streak,
           with defined edges — soft haze alone never reads as glass. */
        .dv-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 3;
          background: linear-gradient(
            113deg,
            rgba(255, 255, 255, 0.062) 0%,
            rgba(255, 255, 255, 0.042) 17%,
            rgba(255, 255, 255, 0.008) 17.8%,
            transparent 34%,
            transparent 42%,
            rgba(255, 255, 255, 0.022) 42.6%,
            rgba(255, 255, 255, 0.007) 51%,
            transparent 58%
          );
        }

        .dv-hinge {
          width: 360px;
          height: 5px;
          background: linear-gradient(180deg, #10141a 0%, #2f353c 100%);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
        }

        /* The deck is a trapezoid that flares toward the viewer — reads as a
           receding keyboard body without paying for a real 3D rotation. */
        .dv-base {
          position: relative;
          width: 404px;
          height: 17px;
          margin-left: -22px;
          clip-path: polygon(5.4% 0, 94.6% 0, 100% 62%, 98.6% 100%, 1.4% 100%, 0 62%);
          /* Deck catches light on its top face and on the front lip,
             with the recessed middle falling away between them. */
          background:
            linear-gradient(180deg,
              #4a525b 0%,
              #333941 14%,
              #1d2229 44%,
              #12161a 78%,
              #2b323a 94%,
              #171b20 100%);
          box-shadow: 0 26px 34px -18px rgba(0, 0, 0, 0.95);
        }

        /* Notch cut into the deck's front lip. */
        .dv-trackpad {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 74px;
          height: 3px;
          border-radius: 0 0 3px 3px;
          background: rgba(255, 255, 255, 0.07);
        }

        /* Ambient occlusion: wide, soft, and offset away from the contact line. */
        .dv-shadow {
          position: absolute;
          left: 50%;
          bottom: -30px;
          transform: translateX(-50%);
          width: 330px;
          height: 30px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.72) 0%, transparent 72%);
          filter: blur(13px);
          pointer-events: none;
        }

        /* Contact shadow: tight and dark exactly where the deck meets the
           surface. This is the cue that stops the device reading as a sticker. */
        .dv-shadow::before {
          content: '';
          position: absolute;
          left: 50%;
          top: -4px;
          transform: translateX(-50%);
          width: 388px;
          height: 9px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.5) 46%, transparent 74%);
          filter: blur(3px);
        }

        /* ─────────── Phone ─────────── */
        /* Height stays near 75% of the lid so the pairing reads true to life. */
        .dv-phone {
          position: absolute;
          right: -38px;
          bottom: -78px;
          transform: translateZ(76px) rotateY(-6deg);
          transform-style: preserve-3d;
        }

        .dv-phone-frame {
          position: relative;
          width: 88px;
          height: 178px;
          border-radius: 16px;
          padding: 4px;
          /* Polished rail: bright at the top-left chamfer, bounce at the base. */
          background:
            linear-gradient(156deg,
              #545c66 0%,
              #363c44 15%,
              #1b1f24 44%,
              #13161a 74%,
              #333941 100%);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.09),
            0 24px 40px -12px rgba(0, 0, 0, 0.95);
          overflow: hidden;
        }

        .dv-phone-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 4;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.34),
            inset 1px 0 0 rgba(255, 255, 255, 0.1),
            inset -1px 0 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(255, 255, 255, 0.12);
        }

        .dv-island {
          position: absolute;
          top: 7px;
          left: 50%;
          transform: translateX(-50%);
          width: 26px;
          height: 6px;
          border-radius: 3px;
          background: #05080c;
          z-index: 3;
        }

        .dv-phone-screen {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 13px;
          background: linear-gradient(165deg, #070c14 0%, #04080e 100%);
          box-shadow:
            inset 0 0 0 1px rgba(0, 229, 255, 0.09),
            0 0 14px rgba(0, 180, 220, 0.14);
          padding: 17px 7px 7px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
        }

        .dv-phone-screen::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: radial-gradient(120% 82% at 50% 30%, transparent 54%, rgba(0, 0, 0, 0.4) 100%);
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
          height: 44px;
          border-radius: 5px;
          background:
            linear-gradient(135deg, rgba(0, 229, 255, 0.18) 0%, rgba(0, 180, 216, 0.05) 100%);
          box-shadow: inset 0 0 0 1px rgba(0, 229, 255, 0.16);
        }

        .dv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }

        .dv-grid span {
          height: 20px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: block;
        }

        .dv-cta {
          margin-top: auto;
          height: 18px;
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

        .dv-glare-phone {
          border-radius: 16px;
          background: linear-gradient(118deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.03) 22%, transparent 46%);
        }

        /* ─────────── Responsive ─────────── */
        /* Wide screens give the devices enough room to anchor the section. */
        @media (min-width: 1280px) {
          .dv-stage { width: 424px; }
          .dv-lid, .dv-hinge { width: 424px; }
          .dv-lid { height: 278px; padding: 11px 11px 16px; }
          .dv-base { width: 476px; margin-left: -26px; height: 20px; }
          .dv-code { font-size: 10.5px; padding: 13px 15px; }
          .dv-fname { font-size: 9px; }
          .dv-titlebar { padding: 9px 11px; }
          .dv-dot { width: 7px; height: 7px; }
          .dv-caret { width: 6px; height: 10px; }
          .dv-phone { right: -48px; bottom: -92px; }
          .dv-phone-frame { width: 104px; height: 210px; border-radius: 19px; padding: 5px; }
          .dv-phone-screen { padding: 20px 9px 9px; border-radius: 15px; gap: 7px; }
          .dv-island { width: 30px; height: 7px; top: 9px; }
          .dv-avatar { width: 14px; height: 14px; }
          .dv-hero-card { height: 53px; border-radius: 6px; }
          .dv-grid span { height: 24px; border-radius: 4px; }
          .dv-cta { height: 21px; font-size: 8px; border-radius: 5px; }
          .dv-glare-phone { border-radius: 19px; }
          .dv-shadow { width: 386px; bottom: -34px; }
        }

        @media (max-width: 1023px) {
          .dv-stage { width: 330px; }
          .dv-lid, .dv-hinge { width: 330px; }
          .dv-lid { height: 218px; }
          .dv-base { width: 370px; margin-left: -20px; }
          .dv-phone { right: -32px; bottom: -72px; }
        }

        @media (max-width: 420px) {
          .dv-root { padding: 20px 0 74px; }
          .dv-stage { width: 256px; }
          .dv-lid, .dv-hinge { width: 256px; }
          .dv-lid { height: 172px; padding: 7px 7px 11px; }
          .dv-base { width: 288px; margin-left: -16px; height: 14px; }
          .dv-code { font-size: 7.5px; padding: 8px 9px; }
          .dv-fname { font-size: 7px; }
          .dv-phone { right: -18px; bottom: -58px; }
          .dv-phone-frame { width: 70px; height: 142px; border-radius: 13px; }
          .dv-phone-screen { padding: 14px 6px 6px; border-radius: 10px; gap: 5px; }
          .dv-island { width: 21px; height: 5px; top: 6px; }
          .dv-avatar { width: 10px; height: 10px; }
          .dv-hero-card { height: 34px; }
          .dv-grid span { height: 16px; }
          .dv-cta { height: 15px; font-size: 6px; }
          .dv-shadow { width: 230px; }
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
