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

const SERVICE_COLORS = [
  '#4ade80', // systems / software empresarial (emerald)
  '#a855f7', // IA (electric purple - differentiated from cyan/blue)
  '#00e5ff', // web & móvil (vibrant electric cyan)
  '#facc15', // security (cyber gold)
  '#f43f5e', // uiux (vibrant coral rose)
  '#38bdf8', // analytics (sky blue)
];

type ServiceItem = {
  slug?: string;
  title: string;
  description: string;
};

/* Six positions around an ellipse, starting at 12 o'clock and stepping 60°. */
const ORBIT_ANGLES = [-90, -30, 30, 90, 150, 210];

function OrbitCard({ service, index, style }: { service: ServiceItem; index: number; style?: React.CSSProperties }) {
  const accent = SERVICE_COLORS[index] || '#00e5ff';
  const slug = service.slug || SERVICE_SLUGS[index] || 'software-empresarial';
  const iconName = SERVICE_REICONS[index] || 'database';

  return (
    <Link
      to={`/servicios/${slug}`}
      className="orbit-card-link block group no-underline"
      style={style}
    >
      <SpotlightCard
        accentColor={accent}
        className="orbit-card h-full flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
              style={{
                borderColor: `${accent}33`,
                backgroundColor: `${accent}0d`,
                color: accent,
              }}
            >
              <ReiconIcon name={iconName} size={20} color={accent} />
            </div>
            <span
              className="font-mono text-xs font-semibold tracking-wider"
              style={{ color: `${accent}99` }}
            >
              0{index + 1}
            </span>
          </div>

          <h3 className="font-syne font-semibold text-sm sm:text-base text-white group-hover:text-white transition-colors mb-2 leading-snug min-h-[2.5rem] flex items-center">
            {service.title}
          </h3>

          <p
            className="text-xs sm:text-[13px] leading-relaxed font-normal transition-colors"
            style={{ color: `${accent}cc` }}
          >
            {service.description}
          </p>
        </div>

        <div className="pt-2.5 mt-auto border-t border-white/[0.06] flex flex-col gap-1.5 transition-colors">
          <span
            className="font-mono text-[11px] uppercase tracking-wider block"
            style={{ color: `${accent}99` }}
          >
            {service.slug || 'SERVICIO'}
          </span>
          <div className="flex justify-end">
            <span
              className="font-mono text-[11px] font-medium inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: accent }}
            >
              Ver detalle →
            </span>
          </div>
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
    <section id="services" className="relative py-20 sm:py-28 md:py-32 overflow-hidden bg-transparent">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label text-[#00e5ff] tracking-[0.25em] text-xs font-mono uppercase">
              {t('services.label')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 justify-between">
            <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-[-0.03em] max-w-3xl">
              {t('services.title')}
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed md:text-right font-normal">
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
              stroke="rgba(0,229,255,0.12)"
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
          .orbit-stage { display: block; height: 1010px; }
          .orbit-guide { display: block; position: absolute; inset: 0; width: 100%; height: 100%; }
          .orbit-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 460px; z-index: 2; }
          .orbit-card-link { position: absolute; transform: translate(-50%, -50%); width: 285px; z-index: 3; }
          .orbit-card-link:hover { transform: translate(-50%, -50%) translateY(-4px); }
        }

        .orbit-card {
          min-height: 295px;
          height: 100%;
          padding: 22px 24px;
        }

        @media (min-width: 1280px) {
          .orbit-card { height: 325px; }
        }
      `}</style>
    </section>
  );
}
