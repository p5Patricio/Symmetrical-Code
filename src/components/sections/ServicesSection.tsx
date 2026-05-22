import { useTranslation } from 'react-i18next';

const serviceIcons: Record<number, JSX.Element> = {
  0: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  1: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  4: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  5: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
};

const serviceColors: Record<number, string> = {
  0: 'var(--svc-web)',
  1: 'var(--svc-systems)',
  2: 'var(--svc-cloud)',
  3: 'var(--svc-security)',
  4: 'var(--svc-uiux)',
  5: 'var(--svc-analytics)',
};

type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

export default function Services() {
  const { t } = useTranslation();
  const rawItems = t('services.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as ServiceItem[]) : [];

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

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {items.map((service, i) => (
            <article
              key={i}
              className="glass-card-enhanced p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 md:gap-6 group border border-white/10 hover:border-white/20 transition-all duration-500"
              style={{
                borderRadius: '0px',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {/* Glowing Orb Background */}
              <div
                className="glowing-orb -top-10 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: serviceColors[i] }}
              />

              {/* Index + icon row */}
              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-xs sm:text-sm text-white/5 group-hover:text-white/15 transition-colors tracking-tighter">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-white/10 bg-white/[0.03] text-white/30 group-hover:text-white transition-all duration-500 rounded-lg relative overflow-hidden"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)',
                  }}
                >
                  {/* Background Glow on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: serviceColors[i] }}
                  />
                  <div className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-0.5">
                    {serviceIcons[i]}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-2 sm:gap-3 md:gap-4">
                <h3 className="font-syne font-extrabold text-lg sm:text-xl md:text-2xl text-white group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/40 group-hover:text-white/60 text-sm sm:text-base leading-relaxed transition-colors duration-300 text-justify">
                  {service.description}
                </p>
              </div>

              {/* Bullet list */}
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-4 sm:pt-5 md:pt-6 border-t border-white/5 relative z-10 mt-auto">
                <ul className="flex flex-col gap-2 sm:gap-3">
                  {service.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm text-white/25 group-hover:text-white/45 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: serviceColors[i], opacity: 0.4 }} />
                      <span className="leading-relaxed text-justify">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
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

        .glowing-orb {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.15;
          pointer-events: none;
          transition: opacity 0.7s ease;
        }

        @media (max-width: 640px) {
          .glowing-orb {
            width: 120px;
            height: 120px;
            filter: blur(40px);
          }
        }

        .glass-card-enhanced {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(0px);
        }

        .glass-card-enhanced:hover {
          backdrop-filter: blur(2px);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}