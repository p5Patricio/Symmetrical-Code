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
  const phoneBuildViewRef = useRef<HTMLDivElement>(null);
  const phoneAppViewRef = useRef<HTMLDivElement>(null);
  const phoneProgressRef = useRef<HTMLDivElement>(null);
  const phonePercentRef = useRef<HTMLSpanElement>(null);
  const phoneStepRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Build → preview cycle, paused while off-screen ──
     Laptop types code while phone displays real-time compilation sync with Symmetrical logo.
     When deployed, both laptop and phone transition into live graphical applications. */
  useEffect(() => {
    const root = rootRef.current;
    const code = codeRef.current;
    const codeView = codeViewRef.current;
    const appView = appViewRef.current;
    const appEls = appElsRef.current;
    const phone = phoneRef.current;
    const phoneBuild = phoneBuildViewRef.current;
    const phoneApp = phoneAppViewRef.current;
    const phoneProgress = phoneProgressRef.current;
    const phonePercent = phonePercentRef.current;
    const phoneStep = phoneStepRef.current;
    if (!root || !code || !codeView || !appView || !appEls || !phone) return;

    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
    const later = (fn: () => void, ms: number) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    const appElNodes = Array.from(appEls.querySelectorAll<HTMLElement>('.dv-app-el'));

    const showApp = () => {
      codeView.classList.remove('is-active');
      appView.classList.add('is-active');
      appElNodes.forEach((el) => el.classList.add('is-on'));

      if (phoneBuild) phoneBuild.classList.remove('is-active');
      if (phoneApp) phoneApp.classList.add('is-active');
    };

    const showCode = () => {
      appView.classList.remove('is-active');
      codeView.classList.add('is-active');
      appElNodes.forEach((el) => el.classList.remove('is-on'));

      if (phoneApp) phoneApp.classList.remove('is-active');
      if (phoneBuild) phoneBuild.classList.add('is-active');
      if (phoneProgress) phoneProgress.style.width = '0%';
      if (phonePercent) phonePercent.textContent = '0%';
      if (phoneStep) phoneStep.textContent = 'INIT SYNC';
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
      code.scrollTop = code.scrollHeight;

      // Synchronize phone build progress and real-time status with current line
      const pct = Math.min(100, Math.round(((i + 1) / CODE_LINES.length) * 100));
      if (phoneProgress) phoneProgress.style.width = `${pct}%`;
      if (phonePercent) phonePercent.textContent = `${pct}%`;
      if (phoneStep) {
        if (i < 4) phoneStep.textContent = 'LINKING MODULES';
        else if (i < 8) phoneStep.textContent = 'ASSEMBLING CORE';
        else if (i < 12) phoneStep.textContent = 'STYLING UI & DESIGN';
        else phoneStep.textContent = 'SHIPPING DEPLOY';
      }

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
            later(runCycle, 600);
          }, 4000);
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
                <span className="dv-fname">console.symmetricalcode.com</span>
                <span className="dv-titlebar-status">● Live Cluster</span>
              </div>
              <div ref={appElsRef} className="dv-app-ui">
                {/* 1. Header Navigation */}
                <div className="dv-app-el dv-app-nav" style={{ transitionDelay: '0ms' }}>
                  <div className="dv-app-brand-group">
                    <img src="/favicon.svg" alt="" className="dv-app-brand-icon" />
                    <span className="dv-app-brand-name">Symmetrical<span className="text-[#00e5ff]">Engine</span></span>
                    <span className="dv-app-badge-cluster">US-EAST // v2.4</span>
                  </div>
                  <div className="dv-app-nav-links">
                    <span className="dv-app-nav-item active">Console</span>
                    <span className="dv-app-nav-item">Telemetry</span>
                    <span className="dv-app-nav-item">Deployments</span>
                  </div>
                  <div className="dv-app-nav-right">
                    <span className="dv-app-status-badge">● 99.98% SLA</span>
                    <div className="dv-app-avatar">SC</div>
                  </div>
                </div>

                {/* 2. Main Analytics & Service Monitor Section */}
                <div className="dv-app-grid-main">
                  {/* Left: Throughput Chart Card */}
                  <div className="dv-app-el dv-app-card dv-app-card-chart" style={{ transitionDelay: '80ms' }}>
                    <div className="dv-app-card-head">
                      <div className="flex items-center gap-1">
                        <span className="dv-app-dot-cyan" />
                        <span className="dv-app-card-title">NETWORK THROUGHPUT</span>
                      </div>
                      <span className="dv-app-card-badge-cyan">+24.8% ↑</span>
                    </div>
                    <div className="dv-app-stat-row">
                      <span className="dv-app-big-stat">1.42M</span>
                      <span className="dv-app-stat-unit">req / sec</span>
                      <span className="dv-app-stat-latency">avg 11ms</span>
                    </div>
                    <div className="dv-app-chart-container">
                      <svg viewBox="0 0 200 46" className="dv-app-chart-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="laptopChartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#195fc1" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="12" x2="200" y2="12" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <line x1="0" y1="28" x2="200" y2="28" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                        <path
                          d="M0,36 Q25,32 50,34 T100,24 T150,18 L200,22"
                          fill="none"
                          stroke="rgba(25, 95, 193, 0.45)"
                          strokeWidth="1.2"
                          strokeDasharray="2 2"
                        />
                        <path
                          d="M0,38 Q30,16 60,26 T120,10 T170,14 L200,6 L200,46 L0,46 Z"
                          fill="url(#laptopChartGrad)"
                        />
                        <path
                          d="M0,38 Q30,16 60,26 T120,10 T170,14 L200,6"
                          fill="none"
                          stroke="#00e5ff"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                        <circle cx="200" cy="6" r="2.5" fill="#00e5ff" />
                        <circle cx="200" cy="6" r="4.5" fill="none" stroke="#00e5ff" strokeWidth="0.8" opacity="0.7" />
                      </svg>
                    </div>
                  </div>

                  {/* Right: Cluster Health / Micro Services */}
                  <div className="dv-app-el dv-app-card dv-app-card-services" style={{ transitionDelay: '160ms' }}>
                    <div className="dv-app-card-head">
                      <span className="dv-app-card-title">CLUSTER SERVICES</span>
                      <span className="dv-app-card-badge-green">HEALTHY</span>
                    </div>
                    <div className="dv-app-service-list">
                      <div className="dv-app-service-item">
                        <div className="dv-app-service-info">
                          <span className="dv-app-srv-dot green" />
                          <span className="dv-app-srv-name">API Gateway</span>
                        </div>
                        <div className="dv-app-srv-track">
                          <div className="dv-app-srv-bar green" style={{ width: '94%' }} />
                        </div>
                        <span className="dv-app-srv-val">8ms</span>
                      </div>
                      <div className="dv-app-service-item">
                        <div className="dv-app-service-info">
                          <span className="dv-app-srv-dot cyan" />
                          <span className="dv-app-srv-name">Neural Core</span>
                        </div>
                        <div className="dv-app-srv-track">
                          <div className="dv-app-srv-bar cyan" style={{ width: '88%' }} />
                        </div>
                        <span className="dv-app-srv-val">99.4%</span>
                      </div>
                      <div className="dv-app-service-item">
                        <div className="dv-app-service-info">
                          <span className="dv-app-srv-dot blue" />
                          <span className="dv-app-srv-name">Shard DB</span>
                        </div>
                        <div className="dv-app-srv-track">
                          <div className="dv-app-srv-bar blue" style={{ width: '78%' }} />
                        </div>
                        <span className="dv-app-srv-val">Synced</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Bottom Feature Bento */}
                <div className="dv-app-features">
                  <div className="dv-app-el dv-app-feature" style={{ transitionDelay: '240ms' }}>
                    <div className="dv-app-feature-top">
                      <div className="dv-app-feature-icon-wrap cyan">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm4.9 6h-2.1c-.2-1.3-.6-2.5-1.2-3.4 1.5.7 2.7 1.9 3.3 3.4zm-4.9-5c.6.9 1.1 2.3 1.3 3.6H6.7C6.9 4.3 7.4 2.9 8 2zM2.1 9h2.1c.2 1.3.6 2.5 1.2 3.4-1.5-.7-2.7-1.9-3.3-3.4zm0-2c.6-1.5 1.8-2.7 3.3-3.4-.6.9-1 2.1-1.2 3.4H2.1zm5.9 7c-.6-.9-1.1-2.3-1.3-3.6h2.6c-.2 1.3-.7 2.7-1.3 3.6zm1.6-4.9H6.4c-.1-.7-.2-1.4-.2-2.1s.1-1.4.2-2.1h3.2c.1.7.2 1.4.2 2.1s-.1 1.4-.2 2.1zm.5 4.3c.6-.9 1-2.1 1.2-3.4h2.1c-.6 1.5-1.8 2.7-3.3 3.4z" />
                        </svg>
                      </div>
                      <span className="dv-app-feature-badge">34 PoPs</span>
                    </div>
                    <div className="dv-app-feature-name">Edge Mesh CDN</div>
                    <div className="dv-app-feature-meta">Sub-5ms global routing</div>
                  </div>

                  <div className="dv-app-el dv-app-feature" style={{ transitionDelay: '310ms' }}>
                    <div className="dv-app-feature-top">
                      <div className="dv-app-feature-icon-wrap blue">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.8 4.2h2.4v2.4H6.8V4.2zm0 3.6h2.4v4H6.8v-4z" />
                        </svg>
                      </div>
                      <span className="dv-app-feature-badge-green">● Active</span>
                    </div>
                    <div className="dv-app-feature-name">AI Orchestrator</div>
                    <div className="dv-app-feature-meta">Agent pipeline v4.2</div>
                  </div>

                  <div className="dv-app-el dv-app-feature" style={{ transitionDelay: '380ms' }}>
                    <div className="dv-app-feature-top">
                      <div className="dv-app-feature-icon-wrap emerald">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-2.5 h-2.5">
                          <path fillRule="evenodd" d="M8 1.5l5 2.2v4.8c0 3.1-2.1 6-5 6.9-2.9-.9-5-3.8-5-6.9V3.7l5-2.2zm0 2.2L4.5 4.9v3.6c0 2.2 1.5 4.3 3.5 5 2-.7 3.5-2.8 3.5-5V4.9L8 3.7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="dv-app-feature-badge">mTLS</span>
                    </div>
                    <div className="dv-app-feature-name">Zero-Trust Shield</div>
                    <div className="dv-app-feature-meta">AES-256 encrypted</div>
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
            {/* 1. Phone Build View (Active while laptop types code) */}
            <div ref={phoneBuildViewRef} className="dv-phone-view dv-phone-build is-active">
              <div className="dv-phone-statusbar">
                <span className="dv-phone-time">9:41</span>
                <div className="dv-phone-status-icons">
                  <span className="dv-phone-sig" />
                  <span className="dv-phone-wifi" />
                  <span className="dv-phone-bat" />
                </div>
              </div>

              <div className="dv-phone-logo-container">
                <div className="dv-phone-radar-ring" />
                <div className="dv-phone-radar-glow" />
                <div className="dv-phone-logo-card">
                  <img src="/favicon.svg" alt="Symmetrical Code" className="dv-phone-brand-logo" />
                </div>
              </div>

              <div className="dv-phone-progress-box">
                <div className="dv-phone-progress-head">
                  <span className="dv-phone-progress-label">BUILD SYNC</span>
                  <span ref={phonePercentRef} className="dv-phone-percent">0%</span>
                </div>
                <div className="dv-phone-progress-track">
                  <div ref={phoneProgressRef} className="dv-phone-progress-bar" style={{ width: '0%' }} />
                </div>
                <div ref={phoneStepRef} className="dv-phone-step">INIT SYNC</div>
              </div>

              <div className="dv-phone-terminal-stream">
                <div className="dv-phone-term-line l1" />
                <div className="dv-phone-term-line l2" />
                <div className="dv-phone-term-line l3" />
              </div>
            </div>

            {/* 2. Phone App View (Active when code is deployed) */}
            <div ref={phoneAppViewRef} className="dv-phone-view dv-phone-app">
              <div className="dv-phone-statusbar">
                <span className="dv-phone-time">9:41</span>
                <div className="dv-phone-status-icons">
                  <span className="dv-phone-sig" />
                  <span className="dv-phone-wifi" />
                  <span className="dv-phone-bat" />
                </div>
              </div>

              <div className="dv-app-phone-header">
                <div className="flex items-center gap-1">
                  <img src="/favicon.svg" alt="" className="w-2.5 h-2.5 rounded shrink-0" />
                  <span className="font-syne font-bold text-[6.5px] text-white tracking-tight">Symmetrical</span>
                </div>
                <span className="dv-phone-badge-live">● LIVE</span>
              </div>

              <div className="dv-phone-stat-card">
                <div className="flex items-center justify-between">
                  <span className="text-[5px] font-mono text-white/50">PERFORMANCE</span>
                  <span className="text-[5.5px] font-mono text-[#00e5ff] font-semibold">+98.4%</span>
                </div>
                <div className="text-[8.5px] font-syne font-bold text-white leading-tight mt-0.5">$28,450</div>
                <div className="dv-phone-chart-wrap">
                  <svg viewBox="0 0 70 20" className="dv-phone-chart-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="phoneChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#195fc1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,18 Q15,4 32,12 T54,5 L70,8 L70,20 L0,20 Z"
                      fill="url(#phoneChartGrad)"
                    />
                    <path
                      d="M0,18 Q15,4 32,12 T54,5 L70,8"
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="dv-phone-bento">
                <div className="dv-phone-bento-item">
                  <div className="dv-phone-bento-top">
                    <span className="dv-phone-bento-dot bg-[#00e5ff]" />
                    <span className="text-[5px] font-mono text-white/70">UI/UX</span>
                  </div>
                  <div className="dv-phone-mock-switch">
                    <span className="dv-phone-mock-knob" />
                  </div>
                </div>
                <div className="dv-phone-bento-item">
                  <div className="dv-phone-bento-top">
                    <span className="dv-phone-bento-dot bg-[#4ade80]" />
                    <span className="text-[5px] font-mono text-white/70">CLOUD</span>
                  </div>
                  <div className="flex gap-1 items-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#195fc1]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  </div>
                </div>
              </div>

              <div className="dv-phone-action-btn">
                <span>Deploy Ready</span>
                <svg width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="dv-phone-tabbar">
                <span className="dv-phone-tab is-active" />
                <span className="dv-phone-tab" />
                <span className="dv-phone-tab" />
              </div>
            </div>

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
          background: #195fc1;
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

        /* ── App preview: a high-fidelity cloud console UI ── */
        .dv-app-ui {
          flex: 1;
          padding: 6.5px 8.5px 6.5px;
          display: flex;
          flex-direction: column;
          gap: 5.5px;
          overflow: hidden;
          background: #020617;
        }

        .dv-titlebar-status {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 6px;
          font-weight: 600;
          color: #4ade80;
          letter-spacing: 0.02em;
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

        /* 1. Header / Top Navigation */
        .dv-app-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .dv-app-brand-group {
          display: flex;
          align-items: center;
          gap: 3.5px;
        }

        .dv-app-brand-icon {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .dv-app-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 6.8px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .dv-app-badge-cluster {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.8px;
          color: rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.8px 3px;
          border-radius: 2.5px;
          margin-left: 2px;
        }

        .dv-app-nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dv-app-nav-item {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 5.5px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        .dv-app-nav-item.active {
          color: #00e5ff;
          font-weight: 600;
        }

        .dv-app-nav-right {
          display: flex;
          align-items: center;
          gap: 4.5px;
        }

        .dv-app-status-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.8px;
          font-weight: 600;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.3);
          padding: 1px 3.5px;
          border-radius: 2.5px;
        }

        .dv-app-avatar {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #195fc1, #00e5ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4.5px;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #ffffff;
        }

        /* 2. Middle Row: Main Grid (Throughput Chart + Cluster Services) */
        .dv-app-grid-main {
          display: grid;
          grid-template-columns: 1.45fr 1fr;
          gap: 5.5px;
        }

        .dv-app-card {
          border-radius: 4.5px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 4.5px 5.5px;
          display: flex;
          flex-direction: column;
        }

        .dv-app-card-chart {
          background: linear-gradient(145deg, rgba(25, 95, 193, 0.14) 0%, rgba(2, 6, 23, 0.8) 100%);
          border: 1px solid rgba(0, 229, 255, 0.2);
        }

        .dv-app-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }

        .dv-app-card-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.04em;
        }

        .dv-app-dot-cyan {
          width: 2.8px;
          height: 2.8px;
          border-radius: 50%;
          background: #00e5ff;
          box-shadow: 0 0 3px rgba(0, 229, 255, 0.9);
        }

        .dv-app-card-badge-cyan {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.8px;
          font-weight: 700;
          color: #00e5ff;
        }

        .dv-app-card-badge-green {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.6px;
          font-weight: 700;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          border: 1px solid rgba(74, 222, 128, 0.28);
          padding: 0.8px 2.5px;
          border-radius: 2px;
        }

        .dv-app-stat-row {
          display: flex;
          align-items: baseline;
          gap: 2.5px;
          margin-bottom: 1.5px;
        }

        .dv-app-big-stat {
          font-family: 'Syne', sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
        }

        .dv-app-stat-unit {
          font-family: 'JetBrains Mono', monospace;
          font-size: 5px;
          color: rgba(255, 255, 255, 0.45);
        }

        .dv-app-stat-latency {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.8px;
          color: rgba(0, 229, 255, 0.85);
          background: rgba(0, 229, 255, 0.1);
          padding: 0.8px 2.5px;
          border-radius: 2px;
        }

        .dv-app-chart-container {
          width: 100%;
          height: 26px;
          margin-top: 1px;
        }

        .dv-app-chart-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Services List */
        .dv-app-service-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-top: 1.5px;
        }

        .dv-app-service-item {
          display: flex;
          align-items: center;
          gap: 3.5px;
        }

        .dv-app-service-info {
          display: flex;
          align-items: center;
          gap: 2px;
          width: 42px;
          flex-shrink: 0;
        }

        .dv-app-srv-dot {
          width: 2.5px;
          height: 2.5px;
          border-radius: 50%;
        }

        .dv-app-srv-dot.green { background: #4ade80; box-shadow: 0 0 3px rgba(74, 222, 128, 0.8); }
        .dv-app-srv-dot.cyan  { background: #00e5ff; box-shadow: 0 0 3px rgba(0, 229, 255, 0.8); }
        .dv-app-srv-dot.blue  { background: #38bdf8; box-shadow: 0 0 3px rgba(56, 189, 248, 0.8); }

        .dv-app-srv-name {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 4.8px;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 500;
          white-space: nowrap;
        }

        .dv-app-srv-track {
          flex: 1;
          height: 2.2px;
          border-radius: 1px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .dv-app-srv-bar {
          height: 100%;
          border-radius: 1px;
        }

        .dv-app-srv-bar.green { background: #4ade80; }
        .dv-app-srv-bar.cyan  { background: #00e5ff; }
        .dv-app-srv-bar.blue  { background: #38bdf8; }

        .dv-app-srv-val {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.6px;
          color: rgba(255, 255, 255, 0.6);
          width: 22px;
          text-align: right;
          flex-shrink: 0;
        }

        /* 3. Bottom Bento Row */
        .dv-app-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4.5px;
          margin-top: auto;
        }

        .dv-app-feature {
          padding: 4px 5px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1.5px;
        }

        .dv-app-feature-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dv-app-feature-icon-wrap {
          width: 9px;
          height: 9px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dv-app-feature-icon-wrap.cyan {
          background: rgba(0, 229, 255, 0.16);
          color: #00e5ff;
        }

        .dv-app-feature-icon-wrap.blue {
          background: rgba(25, 95, 193, 0.28);
          color: #60a5fa;
        }

        .dv-app-feature-icon-wrap.emerald {
          background: rgba(74, 222, 128, 0.16);
          color: #4ade80;
        }

        .dv-app-feature-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.2px;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5px 2.2px;
          border-radius: 2px;
        }

        .dv-app-feature-badge-green {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.2px;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.12);
          padding: 0.5px 2.2px;
          border-radius: 2px;
          font-weight: 600;
        }

        .dv-app-feature-name {
          font-family: 'Syne', sans-serif;
          font-size: 5.5px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-top: 0.5px;
        }

        .dv-app-feature-meta {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 4.3px;
          color: rgba(255, 255, 255, 0.42);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

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
          border-radius: 11px;
          background: linear-gradient(165deg, #070c14 0%, #03060a 100%);
          overflow: hidden;
        }

        .dv-phone-view {
          position: absolute;
          inset: 0;
          padding: 11px 6.5px 7px;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(6px) scale(0.97);
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .dv-phone-view.is-active {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        .dv-screen-glare-phone {
          border-radius: inherit;
        }

        /* Phone Status Bar */
        .dv-phone-statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 5.5px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 5px;
          flex-shrink: 0;
        }

        .dv-phone-status-icons {
          display: flex;
          align-items: center;
          gap: 2.5px;
        }

        .dv-phone-sig {
          width: 6px;
          height: 3.5px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.7) 100%);
          clip-path: polygon(0 100%, 25% 65%, 25% 100%, 60% 35%, 60% 100%, 100% 0, 100% 100%);
        }

        .dv-phone-wifi {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .dv-phone-bat {
          width: 7px;
          height: 3.5px;
          border: 0.8px solid rgba(255, 255, 255, 0.6);
          border-radius: 1px;
          position: relative;
        }

        .dv-phone-bat::after {
          content: '';
          position: absolute;
          left: 0.5px;
          top: 0.5px;
          bottom: 0.5px;
          width: 4px;
          background: #4ade80;
          border-radius: 0.5px;
        }

        /* ── Phone Build View ── */
        .dv-phone-logo-container {
          position: relative;
          width: 44px;
          height: 44px;
          margin: 4px auto 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dv-phone-radar-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(0, 229, 255, 0.35);
          animation: dv-spin 10s linear infinite;
        }

        .dv-phone-radar-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(25, 95, 193, 0.35) 0%, transparent 70%);
          filter: blur(5px);
          animation: dv-pulse 2s ease-in-out infinite;
        }

        .dv-phone-logo-card {
          width: 25px;
          height: 25px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 229, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.2);
          z-index: 1;
        }

        .dv-phone-brand-logo {
          width: 16px;
          height: 16px;
          object-fit: contain;
          user-select: none;
        }

        .dv-phone-progress-box {
          padding: 5px 5px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom: 5px;
        }

        .dv-phone-progress-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 5px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.04em;
        }

        .dv-phone-percent {
          color: #00e5ff;
          font-weight: 700;
        }

        .dv-phone-progress-track {
          height: 3px;
          border-radius: 1.5px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .dv-phone-progress-bar {
          height: 100%;
          border-radius: 1.5px;
          background: linear-gradient(90deg, #195fc1, #00e5ff);
          box-shadow: 0 0 6px rgba(0, 229, 255, 0.7);
          transition: width 0.25s ease;
        }

        .dv-phone-step {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.8px;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          letter-spacing: 0.04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dv-phone-terminal-stream {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 4px 5px;
          margin-top: auto;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .dv-phone-term-line {
          height: 2.2px;
          border-radius: 1px;
          background: rgba(255, 255, 255, 0.2);
          animation: dv-term-pulse 1.8s ease-in-out infinite;
        }

        .dv-phone-term-line.l1 { width: 75%; }
        .dv-phone-term-line.l2 { width: 50%; animation-delay: 0.3s; }
        .dv-phone-term-line.l3 { width: 65%; animation-delay: 0.6s; }

        /* ── Phone App View ── */
        .dv-app-phone-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 4px;
        }

        .dv-phone-badge-live {
          font-family: 'JetBrains Mono', monospace;
          font-size: 4.8px;
          font-weight: 700;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.15);
          border: 1px solid rgba(74, 222, 128, 0.35);
          padding: 1px 3px;
          border-radius: 3px;
          letter-spacing: 0.03em;
        }

        .dv-phone-stat-card {
          padding: 4.5px 5.5px;
          border-radius: 5px;
          background: linear-gradient(145deg, rgba(25, 95, 193, 0.22) 0%, rgba(2, 4, 8, 0.75) 100%);
          border: 1px solid rgba(0, 229, 255, 0.22);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.5px;
          margin-bottom: 4px;
        }

        .dv-phone-chart-wrap {
          height: 16px;
          width: 100%;
          margin-top: 1px;
        }

        .dv-phone-chart-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .dv-phone-bento {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5px;
          margin-bottom: 4px;
        }

        .dv-phone-bento-item {
          padding: 3.5px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 20px;
        }

        .dv-phone-bento-top {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .dv-phone-bento-dot {
          width: 2.5px;
          height: 2.5px;
          border-radius: 50%;
          display: inline-block;
        }

        .dv-phone-mock-switch {
          width: 13px;
          height: 6.5px;
          border-radius: 3.5px;
          background: rgba(0, 229, 255, 0.3);
          border: 0.8px solid rgba(0, 229, 255, 0.6);
          position: relative;
          margin-top: 2px;
        }

        .dv-phone-mock-knob {
          width: 4.5px;
          height: 4.5px;
          border-radius: 50%;
          background: #ffffff;
          position: absolute;
          right: 0.5px;
          top: 0.2px;
          box-shadow: 0 0 3px rgba(0, 229, 255, 0.9);
        }

        .dv-phone-action-btn {
          margin-top: auto;
          height: 15px;
          border-radius: 3.5px;
          background: linear-gradient(135deg, #195fc1, #1565ff);
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 5.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5px;
          box-shadow: 0 3px 8px rgba(25, 95, 193, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dv-phone-tabbar {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding-top: 3.5px;
          margin-top: 3px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .dv-phone-tab {
          width: 3.5px;
          height: 3.5px;
          border-radius: 1px;
          background: rgba(255, 255, 255, 0.25);
        }

        .dv-phone-tab.is-active {
          background: #00e5ff;
          box-shadow: 0 0 4px rgba(0, 229, 255, 0.8);
        }

        @keyframes dv-spin {
          100% { transform: rotate(360deg); }
        }

        @keyframes dv-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }

        @keyframes dv-term-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.7; }
        }

        /* ─────────── Responsive ─────────── */
        @media (max-width: 1279px) {
          .dv-stage { width: 372px; }
          .dv-phone { width: 78px; right: -36px; bottom: -36px; }
          .dv-code { font-size: 7.6px; padding: 8px 10px; }
          .dv-app-ui { padding: 5px 6.5px 5px; gap: 4px; }
          .dv-app-big-stat { font-size: 9px; }
          .dv-app-chart-container { height: 20px; }
          .dv-app-srv-info { width: 34px; }
          .dv-phone-view { padding: 9px 5px 6px; }
          .dv-phone-logo-container { width: 36px; height: 36px; margin: 2px auto 4px; }
          .dv-phone-logo-card { width: 21px; height: 21px; }
          .dv-phone-brand-logo { width: 13px; height: 13px; }
          .dv-phone-chart-wrap { height: 13px; }
          .dv-phone-action-btn { height: 13px; font-size: 5px; }
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
          .dv-app-ui { padding: 4px 5px 4px; gap: 3px; }
          .dv-app-brand-name { font-size: 5.2px; }
          .dv-app-badge-cluster { display: none; }
          .dv-app-nav-links { display: none; }
          .dv-app-status-badge { font-size: 4px; padding: 0.5px 2px; }
          .dv-app-avatar { width: 8px; height: 8px; font-size: 3.5px; }
          .dv-app-grid-main { gap: 3.5px; }
          .dv-app-card { padding: 3px 3.5px; }
          .dv-app-card-title { font-size: 4px; }
          .dv-app-big-stat { font-size: 7.5px; }
          .dv-app-stat-unit { font-size: 3.8px; }
          .dv-app-stat-latency { font-size: 3.6px; }
          .dv-app-chart-container { height: 16px; }
          .dv-app-srv-info { width: 24px; }
          .dv-app-srv-name { font-size: 3.6px; }
          .dv-app-srv-val { font-size: 3.6px; width: 16px; }
          .dv-app-features { gap: 2.5px; }
          .dv-app-feature { padding: 2.5px 3px; gap: 1px; }
          .dv-app-feature-icon-wrap { width: 6.5px; height: 6.5px; }
          .dv-app-feature-name { font-size: 4.2px; }
          .dv-app-feature-meta { display: none; }
          .dv-phone-view { padding: 7px 4px 4px; }
          .dv-phone-statusbar { font-size: 4px; margin-bottom: 3px; }
          .dv-phone-logo-container { width: 26px; height: 26px; margin: 1px auto 2px; }
          .dv-phone-logo-card { width: 16px; height: 16px; }
          .dv-phone-brand-logo { width: 10px; height: 10px; }
          .dv-phone-progress-box { padding: 3px; gap: 2px; margin-bottom: 3px; }
          .dv-phone-stat-card { padding: 3px; margin-bottom: 2px; }
          .dv-phone-bento { gap: 2px; margin-bottom: 2px; }
          .dv-phone-action-btn { height: 10px; font-size: 4px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dv-app-el { opacity: 1; transform: none; transition: none; }
          .dv-view { transition: none; }
          .dv-phone-view { transition: none; }
          .dv-caret { animation: none; }
          .dv-phone-radar-ring { animation: none; }
          .dv-phone-radar-glow { animation: none; }
        }
      `}</style>
    </div>
  );
}
