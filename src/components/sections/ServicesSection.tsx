import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DeviceShowcase from './DeviceShowcase';
import SpotlightCard from '../ui/SpotlightCard';
import IconDatabase from '~icons/lucide/database';
import IconCpu from '~icons/lucide/cpu';
import IconCode from '~icons/lucide/code';
import IconShieldCheck from '~icons/lucide/shield-check';
import IconPalette from '~icons/lucide/palette';
import IconChart from '~icons/lucide/bar-chart-3';

const SERVICE_ICONS = [IconDatabase, IconCpu, IconCode, IconShieldCheck, IconPalette, IconChart];
import { servicesData } from '../../data/services';
import '../ui/SectionHeading.css';

const SERVICE_SLUGS = [
  'software-empresarial',
  'inteligencia-artificial',
  'desarrollo-web-movil',
  'ciberseguridad',
  'diseno-ui-ux',
  'automatizacion-analitica',
];

// Single source of truth for per-service accent colors is `src/data/services.ts`
// (`accentColor`). No more duplicated palette here — see design refinement pass.
const SERVICE_COLOR_BY_SLUG: Record<string, string> = Object.fromEntries(
  servicesData.map((s) => [s.slug, s.accentColor])
);

type ServiceItem = {
  slug?: string;
  title: string;
  description: string;
};

/* Six positions around an ellipse, starting at 12 o'clock and stepping 60°. */
const ORBIT_ANGLES = [-90, -30, 30, 90, 150, 210];

function OrbitCard({
  service,
  index,
  isEs,
  style,
}: {
  service: ServiceItem;
  index: number;
  isEs: boolean;
  style?: React.CSSProperties;
}) {
  const slug = service.slug || SERVICE_SLUGS[index] || 'software-empresarial';
  const accent = SERVICE_COLOR_BY_SLUG[slug] || '#195fc1';
  const Icon = SERVICE_ICONS[index] || IconDatabase;

  return (
    <Link
      to={`/servicios/${slug}`}
      className="orbit-card-link block group no-underline"
      style={style}
    >
      <SpotlightCard
        accentColor={accent}
        className="orbit-card h-full flex flex-col justify-between relative"
      >
        <div className="pb-6">
          <div className="flex items-center justify-between mb-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
              style={{
                borderColor: `${accent}33`,
                backgroundColor: `${accent}0d`,
                color: accent,
              }}
            >
              <Icon width={20} height={20} strokeWidth={1.75} color={accent} />
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

        {/* Action Button: Pinned to bottom-right corner */}
        <div className="absolute bottom-2.5 right-3.5 z-20">
          <span
            className="font-mono text-[11px] font-semibold inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: accent }}
          >
            {isEs ? 'Ver detalle' : 'View details'} →
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const isEs = (i18n?.resolvedLanguage || i18n?.language || 'es').startsWith('es');
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
            <span className="section-label text-[#195fc1] tracking-[0.25em] text-xs font-mono uppercase">
              {t('services.label')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#195fc1]/40 to-transparent" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-8 justify-between">
            <div className="sh-wrap max-w-3xl">
              <h2 className="sh-title sh-title--xl text-text text-balance">{t('services.title')}</h2>
            </div>
            <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed lg:text-right font-normal">
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
                isEs={isEs}
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
          .orbit-stage { display: block; height: 980px; }
          .orbit-guide { display: block; position: absolute; inset: 0; width: 100%; height: 100%; }
          .orbit-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 460px; z-index: 2; }
          .orbit-card-link { position: absolute; transform: translate(-50%, -50%); width: 268px; z-index: 3; }
          .orbit-card-link:hover { transform: translate(-50%, -50%) translateY(-4px); }
        }

        .orbit-card {
          min-height: 260px;
          height: 100%;
          padding: 20px 20px 34px 20px;
        }

        @media (min-width: 1280px) {
          .orbit-card { height: 315px; }
        }
      `}</style>
    </section>
  );
}
