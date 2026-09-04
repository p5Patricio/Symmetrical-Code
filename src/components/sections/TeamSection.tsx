import { useTranslation } from 'react-i18next';
import ProjectWorkflow from './ProjectWorkflow';

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4l2 2" />
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const AcademicCapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

interface Pillar {
  title: string;
  description: string;
  details: string[];
}

interface Institution {
  id: string;
  name: string;
  badge: string;
  description: string;
}

const pillarIcons = [<CodeIcon />, <ShieldIcon />, <ZapIcon />];
const pillarColors = ['#195fc1', '#1565ff', '#7c3aed'];
const pillarGradients = [
  'from-blue-600/20 via-blue-600/5 to-transparent',
  'from-blue-500/20 via-blue-500/5 to-transparent',
  'from-purple-500/20 via-purple-500/5 to-transparent'
];

interface InstitutionLogoConfig {
  src: string;
  darkSrc?: string;
  alt: string;
  glow: string;
}

const institutionLogos: Record<string, InstitutionLogoConfig> = {
  ugto: {
    src: '/images/institutions/ugto.webp',
    alt: 'Universidad de Guanajuato',
    glow: 'rgba(197, 160, 89, 0.32)',
  },
  santander: {
    src: '/images/institutions/santander.png',
    darkSrc: '/images/institutions/santander-dark.png',
    alt: 'Santander Open Academy',
    glow: 'rgba(236, 0, 0, 0.28)',
  },
  aws: {
    src: '/images/institutions/aws.png',
    alt: 'Amazon Web Services',
    glow: 'rgba(255, 153, 0, 0.3)',
  },
  udemy: {
    src: '/images/institutions/udemy.png',
    darkSrc: '/images/institutions/udemy-dark.png',
    alt: 'Udemy',
    glow: 'rgba(164, 53, 240, 0.3)',
  },
};

export default function Team() {
  const { t } = useTranslation();

  const rawPillars = t('team.pillars', { returnObjects: true });
  const pillars = Array.isArray(rawPillars) ? (rawPillars as Pillar[]) : [];

  const rawInstitutions = t('team.institutions', { returnObjects: true });
  const institutions = Array.isArray(rawInstitutions) ? (rawInstitutions as Institution[]) : [];

  return (
    <section id="team" className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden bg-transparent">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#195fc1]/5 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado principal de la sección */}
        <div className="mb-14 sm:mb-18 md:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="section-label text-[#195fc1] tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm uppercase font-mono">
              {t('team.label')}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#195fc1]/40 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 justify-between">
            <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] max-w-3xl">
              {t('team.title')}
            </h2>
            <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed md:text-right font-medium">
              {t('team.subtitle')}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOQUE: PREPARACIÓN TÉCNICA, ESTUDIO & INSTITUCIONES     */}
        {/* ========================================================= */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#195fc1]/10 border border-[#195fc1]/25 text-[#195fc1] font-mono text-[10px] sm:text-xs tracking-wider uppercase mb-3">
                <AcademicCapIcon />
                <span>{t('team.institutions_label')}</span>
              </div>
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
                {t('team.institutions_title')}
              </h3>
            </div>
            <p className="text-white/40 text-xs sm:text-sm max-w-md leading-relaxed sm:text-right">
              {t('team.institutions_desc')}
            </p>
          </div>

          {/* Floating Showcase de las 4 Instituciones */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {institutions.map((inst, index) => {
              const logo = institutionLogos[inst.id];
              if (!logo) return null;
              return (
                <div
                  key={inst.id}
                  className="inst-floating-stage group relative flex flex-col items-center justify-center p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:-translate-y-2 cursor-default"
                >
                  {/* Aura luminosa ambiental por institución */}
                  <div
                    className="inst-ambient-glow"
                    style={{ background: logo.glow }}
                  />

                  {/* Contenedor del logo con levitación flotante */}
                  <div
                    className="inst-logo-wrap"
                    style={{
                      animation: `instFloat 5.2s ease-in-out infinite`,
                      animationDelay: `${index * 1.3}s`,
                    }}
                  >
                    {/* Logo versión estándar (light theme) */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`inst-logo-img ${logo.darkSrc ? 'inst-logo-light' : ''}`}
                      loading="lazy"
                    />
                    {/* Logo versión adaptada para contraste en fondo oscuro */}
                    {logo.darkSrc && (
                      <img
                        src={logo.darkSrc}
                        alt={logo.alt}
                        className="inst-logo-img inst-logo-dark"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Metadatos minimalistas (badge y nombre de la institución) */}
                  <div className="relative z-10 mt-5 flex flex-col items-center text-center gap-1.5 transition-all duration-300">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#195fc1] bg-[#195fc1]/10 border border-[#195fc1]/20 px-2.5 py-0.5 rounded-full font-semibold">
                      {inst.badge}
                    </span>
                    <h4 className="font-syne font-bold text-sm sm:text-base text-white group-hover:text-[#195fc1] transition-colors duration-300">
                      {inst.name}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOQUE: CROQUIS METODOLOGÍA / WORKFLOW EN 4 ETAPAS        */}
        {/* ========================================================= */}
        <ProjectWorkflow />

        {/* ========================================================= */}
        {/* BLOQUE: LOS 3 PILARES DE INGENIERÍA                      */}
        {/* ========================================================= */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-[#195fc1]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#195fc1]/10 flex flex-col justify-between"
              >
                {/* Fondo de gradiente en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillarGradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Glow en la esquina superior */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                  style={{ background: pillarColors[i] }}
                />

                <div className="relative p-6 sm:p-8 md:p-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icono y número */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 group-hover:text-white group-hover:border-[#195fc1]/40 transition-all duration-500"
                        style={{ color: pillarColors[i] }}
                      >
                        {pillarIcons[i]}
                      </div>
                      <span className="font-mono text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white mb-3 group-hover:text-[#195fc1] transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-white/50 group-hover:text-white/70 text-xs sm:text-sm leading-relaxed transition-colors duration-300 mb-6 text-justify">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Etiquetas de especialidades */}
                  <div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {pillar.details.map((detail, j) => (
                        <span
                          key={j}
                          className="font-mono text-[10px] px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-white/50 group-hover:text-white/80 group-hover:border-[#195fc1]/30 transition-all duration-300 uppercase tracking-wider"
                          style={{
                            borderColor: j === 0 ? `${pillarColors[i]}40` : undefined,
                            color: j === 0 ? pillarColors[i] : undefined,
                          }}
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Línea decorativa inferior */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#195fc1]/0 to-transparent group-hover:via-[#195fc1]/50 transition-all duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOQUE: DECLARACIÓN DE CONFIANZA & MANIFIESTO             */}
        {/* ========================================================= */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#195fc1]/15 via-transparent to-[#1565ff]/15 rounded-3xl blur-xl pointer-events-none" />

          <div className="relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#195fc1]/15 flex items-center justify-center text-[#195fc1]">
                    <TrendingIcon />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#195fc1] uppercase font-bold">
                    Confianza & Calidad
                  </span>
                </div>
                <h4 className="font-syne font-bold text-white text-2xl sm:text-3xl lg:text-4xl italic leading-tight">
                  {t('team.quote')}
                </h4>
                <div
                  className="h-1 w-20 mt-4 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #195fc1, #1565ff)' }}
                />
              </div>

              <div className="lg:col-span-3 flex flex-col justify-between gap-6">
                <p className="text-white/60 text-sm sm:text-base leading-relaxed border-l-2 border-[#195fc1]/50 pl-5 sm:pl-6 md:pl-8 text-justify">
                  {t('team.quote_body')}
                </p>

                {/* Sellos de garantía técnica */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5 pl-5 sm:pl-6 md:pl-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                    <span className="text-[#195fc1]">✓</span>
                    <span>100% Código Propio</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                    <span className="text-[#195fc1]">✓</span>
                    <span>Auditorías Internas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                    <span className="text-[#195fc1]">✓</span>
                    <span>Documentación Viva</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .inst-floating-stage {
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.035) 0%, transparent 75%);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        }

        html.light .inst-floating-stage {
          background: radial-gradient(circle at center, rgba(25, 95, 193, 0.04) 0%, rgba(255, 255, 255, 0.85) 75%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
        }

        .inst-floating-stage:hover {
          background: radial-gradient(circle at center, rgba(25, 95, 193, 0.12) 0%, rgba(255, 255, 255, 0.03) 80%);
          border-color: rgba(25, 95, 193, 0.4);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.6), 0 0 32px -4px rgba(25, 95, 193, 0.25);
        }

        html.light .inst-floating-stage:hover {
          background: radial-gradient(circle at center, rgba(25, 95, 193, 0.08) 0%, #ffffff 80%);
          border-color: rgba(25, 95, 193, 0.35);
          box-shadow: 0 20px 40px -12px rgba(25, 95, 193, 0.18);
        }

        .inst-ambient-glow {
          position: absolute;
          width: 140px;
          height: 70px;
          border-radius: 50%;
          filter: blur(28px);
          opacity: 0.25;
          pointer-events: none;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .inst-floating-stage:hover .inst-ambient-glow {
          opacity: 0.65;
          transform: scale(1.25);
        }

        .inst-logo-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 640px) {
          .inst-logo-wrap { height: 96px; }
        }

        @media (min-width: 768px) {
          .inst-logo-wrap { height: 110px; }
        }

        .inst-floating-stage:hover .inst-logo-wrap {
          transform: scale(1.1);
          animation-play-state: paused;
        }

        .inst-logo-img {
          max-height: 52px;
          max-width: 88%;
          object-fit: contain;
          user-select: none;
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.2));
        }

        @media (min-width: 640px) {
          .inst-logo-img { max-height: 78px; }
        }

        @media (min-width: 768px) {
          .inst-logo-img { max-height: 92px; }
        }

        /* Dual-theme logo switching */
        .inst-logo-dark { display: block; }
        .inst-logo-light { display: none; }

        html.light .inst-logo-dark { display: none; }
        html.light .inst-logo-light { display: block; }

        @keyframes instFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .inst-logo-wrap { animation: none !important; }
          .inst-floating-stage { transition: none; }
        }
      `}</style>
    </section>
  );
}