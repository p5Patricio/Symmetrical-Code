import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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

// Iconos grandes para el modal
const serviceIconsLarge: Record<number, JSX.Element> = {
  0: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  1: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  2: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  3: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  4: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  5: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
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
  longDescription?: string;
  highlights?: string[];
};

// ── Service Detail Modal ──────────────────────────────────────────────────────
const ServiceModal = ({
  service,
  index,
  onClose,
}: {
  service: ServiceItem;
  index: number;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,4,8,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(135deg, #070e1c 0%, #040810 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 40px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header hero */}
        <div className="relative w-full px-8 pt-12 pb-8 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${serviceColors[index]}15 0%, transparent 60%)` }}>
          
          {/* Big number watermark */}
          <span className="absolute top-4 right-16 font-syne font-black text-8xl opacity-5 text-white select-none pointer-events-none leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Close button */}
          <button onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 transition-all text-white/30 hover:text-white hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <CloseIcon />
          </button>

          {/* Icon + title */}
          <div className="flex items-start gap-8">
            <div className="w-20 h-20 flex items-center justify-center border border-white/10 text-white rounded-2xl shrink-0"
              style={{
                background: 'rgba(255,255,255,0.03)',
                boxShadow: `0 10px 30px ${serviceColors[index]}20`
              }}>
              {serviceIconsLarge[index]}
            </div>
            <div className="pt-2">
              <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase block mb-2">
                Service Catalog
              </span>
              <h3 className="font-syne font-black text-3xl md:text-4xl text-white tracking-tight">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-10 flex flex-col gap-8">
          {/* Long description */}
          <p className="text-white/60 text-lg leading-relaxed font-medium" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            {service.longDescription || service.description}
          </p>

          {/* Highlights (if available) */}
          {service.highlights && service.highlights.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase font-bold">
                {t('services.modal_highlights')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.highlights.map((highlight, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: serviceColors[index] }} />
                    <span className="text-white/70 text-sm leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bullets */}
          <div className="flex flex-col gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase font-bold">
              {t('services.modal_includes')}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {service.bullets.map((bullet, j) => (
                <li key={j} className="flex items-center gap-3 text-sm text-white/50">
                  <span className="text-white/20">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <a
              href="#contact"
              onClick={onClose}
              className="btn-primary inline-flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase px-10 py-5 rounded-xl w-full sm:w-auto"
              style={{ textDecoration: 'none' }}
            >
              {t('services.modal_cta')} <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Services() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<{ service: ServiceItem; index: number } | null>(null);

  const items = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <>
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
                className="glass-card-enhanced p-10 flex flex-col gap-6 group"
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
                  <div className="w-14 h-14 flex items-center justify-center border border-white/5 bg-white/[0.02] text-white/40 group-hover:text-white group-hover:border-white/20 transition-all duration-500 rounded-2xl rotate-3 group-hover:rotate-0"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)',
                      borderColor: `rgba(${serviceColors[i] === 'var(--svc-web)' ? '0,229,255' : '21,101,255'}, 0.1)`
                    }}
                  >
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {serviceIcons[i]}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-4">
                  <h3 className="font-syne font-extrabold text-2xl text-white group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/40 group-hover:text-white/60 text-base leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Bullet list */}
                <ul className="flex flex-col gap-3 pt-6 border-t border-white/5 relative z-10">
                  {service.bullets.slice(0, 4).map((bullet, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/30 group-hover:text-white/50 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: serviceColors[i], opacity: 0.4 }} />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Learn More button */}
                <button
                  onClick={() => setSelectedService({ service, index: i })}
                  className="mt-4 flex items-center gap-3 font-bold text-xs tracking-widest uppercase text-white/40 hover:text-white transition-all duration-300 group/btn self-start relative z-10"
                >
                  <span className="border-b-2 border-transparent group-hover/btn:border-current transition-all pb-1">
                    {t('services.learn_more')}
                  </span>
                  <div className="group-hover/btn:translate-x-1 transition-transform">
                    <ArrowRightIcon />
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Detail Modal ─────────────────────────────────────────── */}
      {selectedService && (
        <ServiceModal
          service={selectedService.service}
          index={selectedService.index}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}