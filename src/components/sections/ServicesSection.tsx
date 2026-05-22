import { useTranslation } from 'react-i18next';

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

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
    <section id="services" className="relative py-32 overflow-hidden bg-[#020408]">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="section-label text-[#00e5ff] tracking-[0.4em]">{t('services.label')}</span>
            <div className="h-px flex-1 bg-gradient-to-right from-[#00e5ff]/20 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-8 justify-between">
            <h2 className="font-syne font-black text-5xl md:text-7xl text-white leading-[1.1]">
              {t('services.title')}
            </h2>
            <p className="text-white/50 text-lg max-w-md leading-relaxed md:text-right font-medium">
              {t('services.subtitle')}
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service, i) => (
            <article
              key={i}
              className="glass-card-enhanced p-8 md:p-10 flex flex-col gap-5 md:gap-6 group border border-white/20"
              style={{
                borderRadius: '0px',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {/* Glowing Orb Background */}
              <div 
                className="glowing-orb -top-10 -right-10" 
                style={{ background: serviceColors[i] }}
              />

              {/* Index + icon row */}
              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-sm text-white/10 group-hover:text-white/20 transition-colors tracking-tighter">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-14 h-14 flex items-center justify-center border border-white/10 bg-white/[0.03] text-white/40 group-hover:text-white transition-all duration-500 rounded-lg relative overflow-hidden"
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
              <div className="relative z-10 flex flex-col gap-3 md:gap-4">
                <h3 className="font-syne font-extrabold text-xl md:text-2xl text-white group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/40 group-hover:text-white/60 text-sm md:text-base leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </div>

              {/* Bullet list - Show all items */}
              <div className="flex flex-col gap-3 md:gap-4 pt-5 md:pt-6 border-t border-white/5 relative z-10 mt-auto">
                <ul className="flex flex-col gap-2 md:gap-3">
                  {service.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-center gap-3 text-[13px] md:text-sm text-white/30 group-hover:text-white/50 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: serviceColors[i], opacity: 0.4 }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
                
                {/* Contact link instead of Learn More */}
                <a
                  href="#contact"
                  className="flex items-center gap-3 font-bold text-xs tracking-widest uppercase text-[#00e5ff]/60 hover:text-[#00e5ff] transition-all duration-300 mt-2"
                >
                  <span>{t('contact.label')}</span>
                  <ArrowRightIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
