import { useTranslation } from 'react-i18next';

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

const pillarIcons = [<CodeIcon />, <ShieldIcon />, <ZapIcon />];
const pillarColors = ['#195fc1', '#1565ff', '#7c3aed'];
const pillarGradients = [
  'from-blue-600/20 via-blue-600/5 to-transparent',
  'from-blue-500/20 via-blue-500/5 to-transparent',
  'from-purple-500/20 via-purple-500/5 to-transparent'
];

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
    <section id="team" className="relative py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden bg-transparent">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#195fc1]/5 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header - EXACTAMENTE COMO LA IMAGEN */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="section-label text-[#195fc1] tracking-[0.3em] sm:tracking-[0.4em] text-xs sm:text-sm">
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

        {/* Tarjetas - CON DISEÑO ORIGINAL DE TEAM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-[#195fc1]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#195fc1]/10"
            >
              {/* Fondo de gradiente en hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillarGradients[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              {/* Glow en la esquina superior */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: pillarColors[i] }}
              />

              {/* Contenido de la tarjeta */}
              <div className="relative p-6 sm:p-8 md:p-10">
                {/* Icono y número */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 group-hover:text-white group-hover:border-[#195fc1]/40 transition-all duration-500"
                    style={{ color: pillarColors[i] }}
                  >
                    {pillarIcons[i]}
                  </div>
                  <span className="font-mono text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    0{i + 1}
                  </span>
                </div>

                {/* Título */}
                <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white mb-3 group-hover:text-[#195fc1] transition-colors duration-300">
                  {pillar.title}
                </h3>

                {/* Descripción */}
                <p className="text-white/40 group-hover:text-white/60 text-sm sm:text-base leading-relaxed transition-colors duration-300 mb-6">
                  {pillar.description}
                </p>

                {/* Etiquetas */}
                <div className="flex flex-wrap gap-2">
                  {pillar.details.map((detail, j) => (
                    <span
                      key={j}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 group-hover:text-white/70 group-hover:border-[#195fc1]/30 transition-all duration-300 uppercase tracking-wider"
                      style={{
                        borderColor: j === 0 ? `${pillarColors[i]}40` : undefined,
                        color: j === 0 ? pillarColors[i] : undefined,
                      }}
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                {/* Línea decorativa inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#195fc1]/0 to-transparent group-hover:via-[#195fc1]/40 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Declaración de confianza */}
        <div className="mt-16 sm:mt-20 md:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#195fc1]/10 via-transparent to-[#1565ff]/10 rounded-3xl blur-xl" />
          
          <div className="relative bg-gradient-to-b from-white/[0.02] to-transparent border border-white/10 rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#195fc1]/15 flex items-center justify-center text-[#195fc1]">
                    <TrendingIcon />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#195fc1] uppercase">
                    Confianza
                  </span>
                </div>
                <h4 className="font-syne font-bold text-white text-xl sm:text-2xl md:text-3xl italic leading-tight">
                  {t('team.quote')}
                </h4>
                <div 
                  className="h-0.5 w-16 mt-4 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #195fc1, #1565ff)' }}
                />
              </div>
              
              <div className="md:col-span-3">
                <p className="text-white/40 text-sm sm:text-base leading-relaxed border-l-2 border-[#195fc1]/40 pl-5 sm:pl-6 md:pl-8">
                  {t('team.quote_body')}
                </p>
              </div>
            </div>
          </div>
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