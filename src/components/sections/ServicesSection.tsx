import { useTranslation } from 'react-i18next';
import DeviceShowcase from './DeviceShowcase';

const SERVICE_ICONS: JSX.Element[] = [
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
];

const SERVICE_COLORS = [
  'var(--svc-web)',
  'var(--svc-systems)',
  'var(--svc-cloud)',
  'var(--svc-security)',
  'var(--svc-uiux)',
  'var(--svc-analytics)',
];

type ServiceItem = {
  title: string;
  description: string;
};

/* Six positions around an ellipse, starting at 12 o'clock and stepping 60°.
   That start angle puts one card due north and one due south, so the ring
   is symmetric on both axes — on brand for a company named Symmetrical. */
const ORBIT_ANGLES = [-90, -30, 30, 90, 150, 210];

function OrbitCard({ service, index, style }: { service: ServiceItem; index: number; style?: React.CSSProperties }) {
  const { t } = useTranslation();
  const accent = SERVICE_COLORS[index];

  return (
    <article className="orbit-card" style={style}>
      <div className="orbit-card-glow" style={{ background: accent }} />
      <div className="orbit-card-top">
        <div className="orbit-icon" style={{ color: accent }}>
          {SERVICE_ICONS[index]}
        </div>
        <span className="orbit-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="orbit-title">{service.title}</h3>
      <p className="orbit-desc">{service.description}</p>
      <a href="#contact" className="orbit-link" style={{ color: accent }}>
        <span>{t('contact.label')}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </article>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const rawItems = t('services.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as ServiceItem[]) : [];

  // Ellipse radii: wider than tall so the ring fits a landscape section
  // without towering in height. Values are percentages of the ring stage,
  // whose width stays fixed at 1216px for any viewport ≥1280px (capped by
  // the max-w-7xl container) — chosen so the tallest cards (top/bottom,
  // 3-line copy) clear the stage box with margin at that fixed width.
  const RX = 44;
  const RY = 37;

  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-32 overflow-hidden bg-[#020408]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-32 sm:-mr-48 md:-mr-64 -mt-32 sm:-mt-48 md:-mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-cyan-600/5 blur-[120px] rounded-full -ml-32 sm:-ml-48 md:-ml-64 -mb-32 sm:-mb-48 md:-mb-64 pointer-events-none" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="section-label text-[#00e5ff] tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm">{t('services.label')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 justify-between">
            <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] max-w-3xl">
              {t('services.title')}
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed md:text-right font-medium">
              {t('services.subtitle')}
            </p>
          </div>
        </div>

        {/* Single render, two layouts: below 1280px cards are position:static
            and sit in a normal grid (their inline left/top are ignored, since
            those properties only apply to positioned elements); at 1280px+
            they switch to position:absolute and the same left/top place them
            on the ellipse. One DOM tree, one DeviceShowcase instance. */}
        <div className="orbit-stage">
          <svg className="orbit-guide" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="50" cy="50" rx={RX} ry={RY} fill="none" stroke="rgba(0,229,255,0.14)" strokeWidth="0.15" strokeDasharray="0.6 1.4" />
          </svg>

          <div className="orbit-center">
            <DeviceShowcase />
          </div>

          {items.slice(0, 6).map((service, i) => {
            const angle = (ORBIT_ANGLES[i] * Math.PI) / 180;
            const x = 50 + RX * Math.cos(angle);
            const y = 50 + RY * Math.sin(angle);
            return (
              <OrbitCard
                key={i}
                service={service}
                index={i}
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Inyectar estilos CSS para las variables y efectos */}
      <style>{`
        :root {
          --svc-web: #00b4d8;
          --svc-systems: #86efac;
          --svc-cloud: #7dd3fc;
          --svc-security: #fde68a;
          --svc-uiux: #c4b5fd;
          --svc-analytics: #f9a8d4;
        }

        /* ─────────── Stage: grid below 1280px, ellipse from 1280px up ───────────
           Below 1280px every child stays position:static, so their inline
           left/top (set for the ellipse) are simply inert and normal grid
           flow takes over. At 1280px+ children switch to position:absolute
           and those same left/top values place them on the ring. */
        .orbit-stage {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 100%;
        }

        .orbit-guide {
          display: none;
          pointer-events: none;
        }

        .orbit-center {
          display: flex;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .orbit-stage { grid-template-columns: 1fr 1fr; gap: 24px; }
          .orbit-center { grid-column: 1 / -1; }
        }

        /* The stage's own width is capped by max-w-7xl (1216px content width)
           for any viewport from here up, so a single sizing tier covers the
           whole desktop range — shrinking cards on "medium" desktops would
           only wrap their text into more lines and make them taller. */
        @media (min-width: 1280px) {
          .orbit-stage { display: block; height: 920px; }
          .orbit-guide { display: block; position: absolute; inset: 0; width: 100%; height: 100%; }
          .orbit-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 460px; z-index: 2; }
          .orbit-card { position: absolute; transform: translate(-50%, -50%); width: 236px; z-index: 3; }
          .orbit-card:hover { transform: translate(-50%, -50%) translateY(-3px); }
        }

        /* ─────────── Card ─────────── */
        .orbit-card {
          padding: 20px 22px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(6px);
          transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease;
        }

        .orbit-card:hover {
          border-color: rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.035);
        }

        @media (max-width: 1279px) {
          .orbit-card:hover { transform: translateY(-3px); }
        }

        .orbit-card-glow {
          position: absolute;
          top: -30%;
          right: -20%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          transition: opacity 0.7s ease;
          pointer-events: none;
        }

        .orbit-card:hover .orbit-card-glow {
          opacity: 0.18;
        }

        .orbit-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .orbit-icon {
          display: flex;
        }

        .orbit-index {
          font-family: ui-monospace, monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.15);
          letter-spacing: 0.05em;
        }

        .orbit-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          color: #ffffff;
          margin-bottom: 6px;
          position: relative;
          z-index: 1;
        }

        .orbit-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.42);
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .orbit-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          position: relative;
          z-index: 1;
          transition: gap 0.25s ease;
        }

        .orbit-link:hover {
          gap: 9px;
        }

        @media (max-width: 1279px) {
          .orbit-title { font-size: 17px; }
          .orbit-desc { font-size: 13.5px; }
        }
      `}</style>
    </section>
  );
}
