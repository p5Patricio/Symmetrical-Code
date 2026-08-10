import { useEffect, useRef } from 'react';

/* ══════════════════════════════════════════
   CODE LINES — typed into the laptop screen
══════════════════════════════════════════ */
/* The sequence narrates how a real build actually goes: pull in the pieces,
   configure the app, then explicitly add security and design as their own
   steps — not just a list of settings — before testing and shipping. */
const CODE_LINES: string[] = [
  `<span class="tk cmt">// build.ts</span>`,
  `<span class="tk kw">import</span> { <span class="tk fn">deploy</span> } <span class="tk kw">from</span> <span class="tk str">'./cloud'</span>`,
  `<span class="tk kw">import</span> { <span class="tk fn">auth</span> } <span class="tk kw">from</span> <span class="tk str">'./security'</span>`,
  `<span class="tk kw">import</span> { <span class="tk fn">theme</span> } <span class="tk kw">from</span> <span class="tk str">'./design'</span>`,
  ``,
  `<span class="tk kw">export const</span> <span class="tk var">app</span> <span class="tk op">=</span> <span class="tk fn">createApp</span>({`,
  `  <span class="tk attr">name</span>: <span class="tk str">'symmetrical'</span>,`,
  `  <span class="tk attr">responsive</span>: <span class="tk kw">true</span>,`,
  `})`,
  ``,
  `<span class="tk var">app</span><span class="tk op">.</span><span class="tk fn">use</span>(auth())    <span class="tk cmt">// adding security</span>`,
  `<span class="tk var">app</span><span class="tk op">.</span><span class="tk fn">use</span>(theme())   <span class="tk cmt">// adding design</span>`,
  `<span class="tk var">app</span><span class="tk op">.</span><span class="tk fn">test</span>()         <span class="tk cmt">// running tests</span>`,
  ``,
  `<span class="tk kw">await</span> <span class="tk fn">deploy</span>(app)`,
  `<span class="tk cmt">// ready ✓</span>`,
];

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
  const codeRef = useRef<HTMLDivElement>(null);
  const codeViewRef = useRef<HTMLDivElement>(null);
  const appViewRef = useRef<HTMLDivElement>(null);
  const appElsRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Build → preview cycle, paused while off-screen ──
     Laptop types code, holds, then crossfades to a rendered app preview
     while the phone assembles its own screen in step — then resets. */
  useEffect(() => {
    const root = rootRef.current;
    const code = codeRef.current;
    const codeView = codeViewRef.current;
    const appView = appViewRef.current;
    const appEls = appElsRef.current;
    const phone = phoneRef.current;
    if (!root || !code || !codeView || !appView || !appEls || !phone) return;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
    const later = (fn: () => void, ms: number) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    const appElNodes = Array.from(appEls.querySelectorAll<HTMLElement>('.dv-app-el'));
    const phoneRows = Array.from(phone.querySelectorAll<HTMLElement>('.dv-row'));

    const showApp = () => {
      codeView.classList.remove('is-active');
      appView.classList.add('is-active');
      appElNodes.forEach((el) => el.classList.add('is-on'));
      phoneRows.forEach((r) => r.classList.add('is-on'));
    };
    const showCode = () => {
      appView.classList.remove('is-active');
      codeView.classList.add('is-active');
      appElNodes.forEach((el) => el.classList.remove('is-on'));
      phoneRows.forEach((r) => r.classList.remove('is-on'));
    };

    const paintAll = () => {
      code.innerHTML = CODE_LINES.map((l) => `<div class="dv-line">${l}</div>`).join('');
      showApp();
    };

    // Without motion or without an observer to gate the loop, show the end state.
    if (matches('(prefers-reduced-motion: reduce)') || typeof IntersectionObserver !== 'function') {
      paintAll();
      return;
    }

    const typeLine = (i: number, onDone: () => void) => {
      if (i >= CODE_LINES.length) {
        onDone();
        return;
      }
      const row = document.createElement('div');
      row.className = 'dv-line';
      row.innerHTML = CODE_LINES[i] + '<span class="dv-caret"></span>';
      code.querySelectorAll('.dv-caret').forEach((c) => c.remove());
      code.appendChild(row);
      // 16 lines don't fit the panel's fixed height — scroll like a live
      // build log instead of trimming the narrative or the type size.
      code.scrollTop = code.scrollHeight;
      later(() => typeLine(i + 1, onDone), CODE_LINES[i].length > 0 ? 210 + Math.random() * 90 : 90);
    };

    const runCycle = () => {
      code.innerHTML = '';
      showCode();

      typeLine(0, () => {
        later(() => {
          showApp();
          later(() => {
            showCode();
            code.innerHTML = '';
            later(runCycle, 500);
          }, 2500);
        }, 700);
      });
    };

    let running = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          runCycle();
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

  return (
    <div ref={rootRef} className="dv-root" aria-hidden="true">
      <div className="dv-glow" />

      <div className="dv-stage">
        {/* ── Laptop ── */}
        <div className="dv-laptop">
          <img className="dv-shot" src="/mockups/laptop.webp" alt="" width={1400} height={910} />
          <div className="dv-laptop-screen" style={asStyle(LAPTOP_SCREEN)}>
            {/* Code view */}
            <div ref={codeViewRef} className="dv-view is-active">
              <div className="dv-titlebar">
                <span className="dv-dot" style={{ background: '#ff5f57' }} />
                <span className="dv-dot" style={{ background: '#febc2e' }} />
                <span className="dv-dot" style={{ background: '#28c840' }} />
                <span className="dv-fname">build.ts</span>
              </div>
              <div ref={codeRef} className="dv-code" />
            </div>

            {/* App preview view */}
            <div ref={appViewRef} className="dv-view">
              <div className="dv-titlebar dv-titlebar-app">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span className="dv-fname">app.symmetricalcode.com</span>
              </div>
              <div ref={appElsRef} className="dv-app-ui">
                <div className="dv-app-el dv-app-nav" style={{ transitionDelay: '0ms' }}>
                  <span className="dv-app-brand" />
                  <span className="dv-app-pill w1" />
                  <span className="dv-app-pill w2" />
                  <span className="dv-app-pill w3" />
                  <span className="dv-app-cta" />
                </div>
                <div className="dv-app-hero">
                  <div className="dv-app-hero-text">
                    <span className="dv-app-el dv-app-heading h1" style={{ transitionDelay: '90ms' }} />
                    <span className="dv-app-el dv-app-heading h2" style={{ transitionDelay: '160ms' }} />
                    <span className="dv-app-el dv-app-paragraph" style={{ transitionDelay: '230ms' }} />
                    <span className="dv-app-el dv-app-button" style={{ transitionDelay: '310ms' }} />
                  </div>
                  <div className="dv-app-el dv-app-hero-art" style={{ transitionDelay: '260ms' }} />
                </div>
                <div className="dv-app-features">
                  <div className="dv-app-el dv-app-feature" style={{ transitionDelay: '400ms' }}>
                    <span className="dv-app-feature-icon" />
                    <span className="dv-app-feature-line" />
                    <span className="dv-app-feature-line short" />
                  </div>
                  <div className="dv-app-el dv-app-feature" style={{ transitionDelay: '460ms' }}>
                    <span className="dv-app-feature-icon" />
                    <span className="dv-app-feature-line" />
                    <span className="dv-app-feature-line short" />
                  </div>
                  <div className="dv-app-el dv-app-feature" style={{ transitionDelay: '520ms' }}>
                    <span className="dv-app-feature-icon" />
                    <span className="dv-app-feature-line" />
                    <span className="dv-app-feature-line short" />
                  </div>
                </div>
              </div>
            </div>

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
          background: linear-gradient(158deg, #070c14 0%, #04070c 62%, #060a11 100%);
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.75);
        }

        /* Code and app-preview panels crossfade in place. */
        .dv-view {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(5px) scale(0.985);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .dv-view.is-active {
          opacity: 1;
          transform: none;
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

        .dv-titlebar-app { gap: 6px; }

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

        /* ── App preview: a wireframe UI "compiled" from the code ── */
        .dv-app-ui {
          flex: 1;
          padding: 10px 11px 9px;
          display: flex;
          flex-direction: column;
          gap: 9px;
          overflow: hidden;
        }

        .dv-app-el {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .dv-app-el.is-on {
          opacity: 1;
          transform: none;
        }

        .dv-app-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .dv-app-brand {
          width: 8px;
          height: 8px;
          border-radius: 3px;
          background: linear-gradient(135deg, #00e5ff, #00b4d8);
          flex-shrink: 0;
        }

        .dv-app-pill {
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.14);
          display: block;
        }

        .dv-app-pill.w1 { width: 22px; }
        .dv-app-pill.w2 { width: 18px; }
        .dv-app-pill.w3 { width: 20px; }

        .dv-app-cta {
          margin-left: auto;
          width: 30px;
          height: 10px;
          border-radius: 3px;
          background: rgba(0, 229, 255, 0.18);
          box-shadow: inset 0 0 0 1px rgba(0, 229, 255, 0.3);
        }

        .dv-app-hero {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dv-app-hero-text {
          flex: 1.3;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dv-app-heading {
          height: 8px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.62);
        }

        .dv-app-heading.h1 { width: 88%; }
        .dv-app-heading.h2 { width: 62%; background: #00e5ff; }

        .dv-app-paragraph {
          height: 4px;
          width: 72%;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.16);
          margin-top: 2px;
        }

        .dv-app-button {
          margin-top: 4px;
          width: 44px;
          height: 12px;
          border-radius: 4px;
          background: linear-gradient(135deg, #00e5ff, #00b4d8);
          box-shadow: 0 3px 10px rgba(0, 229, 255, 0.3);
        }

        .dv-app-hero-art {
          flex: 1;
          align-self: stretch;
          border-radius: 6px;
          background: linear-gradient(150deg, rgba(0, 229, 255, 0.16) 0%, rgba(125, 211, 252, 0.05) 100%);
          box-shadow: inset 0 0 0 1px rgba(0, 229, 255, 0.14);
        }

        .dv-app-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
          margin-top: auto;
        }

        .dv-app-feature {
          padding: 7px 7px 8px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .dv-app-feature-icon {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          background: rgba(0, 229, 255, 0.28);
        }

        .dv-app-feature-line {
          height: 3px;
          width: 88%;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.16);
          display: block;
        }

        .dv-app-feature-line.short { width: 55%; }

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
          .dv-app-ui { padding: 8px 9px 7px; gap: 7px; }
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
          .dv-app-ui { padding: 6px 7px 6px; gap: 5px; }
          .dv-app-brand { width: 6px; height: 6px; }
          .dv-app-pill.w1 { width: 16px; }
          .dv-app-pill.w2 { width: 13px; }
          .dv-app-pill.w3 { width: 14px; }
          .dv-app-cta { width: 22px; height: 7px; }
          .dv-app-heading { height: 6px; }
          .dv-app-paragraph { height: 3px; }
          .dv-app-button { width: 32px; height: 9px; }
          .dv-app-features { gap: 4px; }
          .dv-app-feature { padding: 4px 4px 5px; gap: 3px; }
          .dv-app-feature-icon { width: 7px; height: 7px; }
          .dv-phone-screen { padding: 10px 4px 5px; gap: 3px; border-radius: 8px; }
          .dv-avatar { width: 8px; height: 8px; }
          .dv-bar { height: 2px; }
          .dv-hero-card { height: 26px; border-radius: 4px; }
          .dv-grid { gap: 3px; }
          .dv-grid span { height: 12px; }
          .dv-cta { height: 11px; font-size: 5px; border-radius: 3px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dv-row { opacity: 1; transform: none; transition: none; }
          .dv-app-el { opacity: 1; transform: none; transition: none; }
          .dv-view { transition: none; }
          .dv-caret { animation: none; }
        }
      `}</style>
    </div>
  );
}
