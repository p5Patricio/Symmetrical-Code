import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DeviceShowcase from './DeviceShowcase';
import SpotlightCard from '../ui/SpotlightCard';
import ReiconIcon from '../ui/ReiconIcon';

const SERVICE_REICONS = [
  'database',
  'cpu',
  'code',
  'shield',
  'palette',
  'chart',
];

const SERVICE_SLUGS = [
  'software-empresarial',
  'inteligencia-artificial',
  'desarrollo-web-movil',
  'ciberseguridad',
  'diseno-ui-ux',
  'automatizacion-analitica',
];

type ServiceItem = {
  slug?: string;
  title: string;
  description: string;
};

/* Six positions around an ellipse, starting at 12 o'clock and stepping 60°. */
const ORBIT_ANGLES = [-90, -30, 30, 90, 150, 210];

function OrbitCard({ service, index, style }: { service: ServiceItem; index: number; style?: React.CSSProperties }) {
  const slug = service.slug || SERVICE_SLUGS[index] || 'software-empresarial';
  const iconName = SERVICE_REICONS[index] || 'database';

  return (
    <Link
      to={`/servicios/${slug}`}
      className="orbit-card-link block group no-underline"
      style={style}
    >
      <SpotlightCard
        spotlightColor="rgba(255, 255, 255, 0.06)"
        className="orbit-card h-full flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.02] text-white/80 group-hover:text-white group-hover:border-white/[0.18] transition-all duration-300">
              <ReiconIcon name={iconName} size={20} color="currentColor" />
            </div>
            <span className="font-mono text-xs text-white/25">
              0{index + 1}
            </span>
          </div>

          <h3 className="font-syne font-semibold text-base sm:text-lg text-white group-hover:text-white transition-colors mb-2 leading-snug">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-white/55 line-clamp-3 leading-relaxed font-normal">
            {service.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/30 group-hover:text-white/70 transition-colors">
          <span>{service.slug || 'SERVICIO'}</span>
          <span className="text-white/40 group-hover:text-white transition-colors">
            Ver detalle →
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const rawItems = t('services.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as ServiceItem[]) : [];

  const RX = 44;
  const RY = 37;

  return (
    <section id="services" className="relative py-20 sm:py-28 md:py-32 overflow-hidden bg-[#020408]">
      {/* Soft atmospheric glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-900/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label text-white/40 tracking-[0.25em] text-xs font-mono uppercase">
              {t('services.label')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 justify-between">
            <h2 className="font-syne font-bold text-3xl sm:text-5xl md:text-6xl text-white leading-[1.12] max-w-3xl">
              {t('services.title')}
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed md:text-right font-normal">
              {t('services.subtitle')}
            </p>
          </div>
        </div>

        {/* Orbit Stage */}
        <div className="orbit-stage">
          <svg className="orbit-guide" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse
              cx="50"
              cy="50"
              rx={RX}
              ry={RY}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.15"
              strokeDasharray="0.6 1.4"
            />
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

      <style>{`
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

        @media (min-width: 1280px) {
          .orbit-stage { display: block; height: 940px; }
          .orbit-guide { display: block; position: absolute; inset: 0; width: 100%; height: 100%; }
          .orbit-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 460px; z-index: 2; }
          .orbit-card-link { position: absolute; transform: translate(-50%, -50%); width: 270px; z-index: 3; }
          .orbit-card-link:hover { transform: translate(-50%, -50%) translateY(-4px); }
        }

        .orbit-card {
          min-height: 220px;
          padding: 24px 26px;
        }

        @media (min-width: 1280px) {
          .orbit-card { height: 245px; }
        }
      `}</style>
    </section>
  );
}
