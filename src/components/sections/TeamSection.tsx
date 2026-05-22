import { useTranslation } from 'react-i18next';

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const pillarIcons = [<CodeIcon />, <ShieldIcon />, <ZapIcon />];
const pillarColors = ['#00e5ff', '#1565ff', '#7c3aed'];

interface Pillar {
  title: string;
  description: string;
  details: string[];
}

export default function Team() {
  const { t } = useTranslation();
  const rawPillars = t('team.pillars', { returnObjects: true });
  const pillars = Array.isArray(rawPillars) ? (rawPillars as Pillar[]) : [];

  return (
    <section id="team" className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-[#020408] to-[#03060c]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00e5ff]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#1565ff]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#7c3aed]/5 rounded-full blur-[100px]" />
      </div>

      {/* Líneas decorativas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden sm:block" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado de sección */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-[#00e5ff] uppercase">
              {t('team.label')}
            </span>
            <div className="h-px w-8 sm:w-12 bg-[#00e5ff]/30" />
          </div>
          
          <div className="max-w-3xl">
            <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.1]">
              {t('team.title')}
            </h2>
            <p className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed font-medium text-justify">
              {t('team.subtitle')}
            </p>
          </div>
        </div>

        {/* Pilares del Estudio */}
        <div className="flex flex-col gap-px bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-[#020408] hover:bg-white/[0.02] transition-colors duration-500 p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 border-b border-white/5 last:border-b-0"
            >
              {/* Número e icono del pilar */}
              <div className="flex items-center gap-4 sm:gap-5 md:gap-6 md:w-1/4 shrink-0">
                <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-black text-white/5 group-hover:text-[#00e5ff]/20 transition-colors duration-500">
                  0{i + 1}
                </span>
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl border border-white/10 text-white/40 group-hover:text-white group-hover:border-[#00e5ff]/40 transition-all duration-500"
                  style={{ color: pillarColors[i] }}
                >
                  {pillarIcons[i]}
                </div>
              </div>

              {/* Contenido del pilar */}
              <div className="md:w-2/4">
                <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white mb-2 sm:mb-3 group-hover:text-[#00e5ff] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-white/40 group-hover:text-white/60 text-sm sm:text-base leading-relaxed transition-colors text-justify">
                  {pillar.description}
                </p>
              </div>

              {/* Etiquetas del pilar */}
              <div className="md:w-1/4 flex flex-wrap gap-1.5 sm:gap-2 md:justify-end">
                {pillar.details.map((detail, j) => (
                  <span
                    key={j}
                    className="font-mono text-[8px] sm:text-[9px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border border-white/10 bg-white/5 text-white/40 group-hover:text-white/70 transition-all uppercase tracking-wider"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              {/* Línea decorativa al hover */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#00e5ff] to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Declaración de confianza */}
        <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div>
            <h4 className="font-syne font-bold text-white text-xl sm:text-2xl mb-3 sm:mb-4 italic">
              {t('team.quote')}
            </h4>
            <div className="h-0.5 sm:h-1 w-10 sm:w-12 bg-[#00e5ff]" />
          </div>
          <p className="text-white/40 text-xs sm:text-sm leading-relaxed border-l border-white/10 pl-5 sm:pl-6 md:pl-8 text-justify">
            {t('team.quote_body')}
          </p>
        </div>
      </div>

      {/* Estilos adicionales */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}