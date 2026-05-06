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
          border: '1px solid rgba(0,229,255,0.18)',
          boxShadow: '0 0 100px rgba(0,229,255,0.06), 0 40px 80px rgba(0,0,0,0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header hero */}
        <div className="relative w-full px-8 pt-10 pb-8 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, transparent 60%)' }}>
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l opacity-40" style={{ borderColor: '#00e5ff' }} />
          <div className="absolute top-4 right-14 w-5 h-5 border-t border-r opacity-40" style={{ borderColor: '#00e5ff' }} />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b border-l opacity-20" style={{ borderColor: '#00e5ff' }} />

          {/* Big number watermark */}
          <span className="absolute top-4 right-16 font-syne font-black text-8xl opacity-5 text-[#00e5ff] select-none pointer-events-none leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Close button */}
          <button onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 transition-colors text-white/50 hover:text-[#00e5ff]"
            style={{ background: 'rgba(2,4,8,0.75)', border: '1px solid rgba(0,229,255,0.2)' }}>
            <CloseIcon />
          </button>

          {/* Icon + title */}
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 flex items-center justify-center border border-[rgba(0,229,255,0.3)] text-[#00e5ff] shrink-0"
              style={{
                background: 'rgba(0,229,255,0.06)',
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              }}>
              {serviceIconsLarge[index]}
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#00e5ff]/40 tracking-widest">
                _{String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-syne font-black text-2xl md:text-3xl text-white mt-1">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 flex flex-col gap-6">
          {/* Long description */}
          <p className="text-white/55 text-sm leading-relaxed" style={{ borderTop: '1px solid rgba(0,229,255,0.08)', paddingTop: '1.5rem' }}>
            {service.longDescription || service.description}
          </p>

          {/* Highlights (if available) */}
          {service.highlights && service.highlights.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-widest text-[#00e5ff]/50 uppercase">
                {t('services.modal_highlights')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 p-3"
                    style={{ background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)' }}>
                    <span className="text-[#00e5ff]/60 mt-0.5 shrink-0">◆</span>
                    <span className="text-white/60 text-xs leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bullets */}
          <div className="flex flex-col gap-3" style={{ borderTop: '1px solid rgba(0,229,255,0.08)', paddingTop: '1.5rem' }}>
            <span className="font-mono text-[10px] tracking-widest text-[#00e5ff]/50 uppercase">
              {t('services.modal_includes')}
            </span>
            <ul className="flex flex-col gap-2">
              {service.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-3 font-mono text-xs text-white/45">
                  <span className="mt-0.5 text-[#00e5ff]/60 shrink-0">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-4" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
            <a
              href="#contact"
              onClick={onClose}
              className="btn-primary inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3"
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
      <section id="services" className="relative py-32 overflow-hidden">
        {/* Left glow accent */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full opacity-5 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #1565ff, transparent)' }}
        />

        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label">{t('services.label')}</span>
              <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
              <h2 className="font-syne font-black text-5xl md:text-6xl text-white">
                {t('services.title')}
              </h2>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed md:text-right">
                {t('services.subtitle')}
              </p>
            </div>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((service, i) => (
              <article
                key={i}
                className="glass-card p-8 flex flex-col gap-5 group relative overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(225deg, rgba(0,229,255,0.12) 0%, transparent 70%)',
                  }}
                />

                {/* Index + icon row */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#00e5ff]/25 tracking-widest">
                    _{String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-11 h-11 flex items-center justify-center border border-[rgba(0,229,255,0.2)] text-[#00e5ff]/60 group-hover:text-[#00e5ff] group-hover:border-[#00e5ff]/50 transition-all duration-300"
                    style={{ clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
                  >
                    {serviceIcons[i]}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-syne font-bold text-xl text-white group-hover:text-[#00e5ff] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Bullet list */}
                <ul className="flex flex-col gap-2 pt-4 border-t border-[rgba(0,229,255,0.06)]">
                  {service.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 font-mono text-[11px] text-white/35">
                      <span className="mt-0.5 text-[#00e5ff]/50 shrink-0">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Learn More button */}
                <button
                  onClick={() => setSelectedService({ service, index: i })}
                  className="mt-2 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#00e5ff]/50 hover:text-[#00e5ff] transition-all duration-200 group/btn self-start"
                >
                  <span className="border-b border-[#00e5ff]/20 group-hover/btn:border-[#00e5ff]/60 transition-colors pb-px">
                    {t('services.learn_more')}
                  </span>
                  <ArrowRightIcon />
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