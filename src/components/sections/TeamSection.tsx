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
    <section id="team" className="relative py-32 overflow-hidden bg-[#020408]">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#00e5ff] uppercase">
              {t('team.label')}
            </span>
            <div className="h-px w-12 bg-[#00e5ff]/30" />
          </div>
          
          <div className="max-w-3xl">
            <h2 className="font-syne font-black text-5xl md:text-6xl text-white mb-8 tracking-tight leading-[1.1]">
              {t('team.title')}
            </h2>
            <p className="text-white/50 text-xl leading-relaxed font-medium">
              {t('team.subtitle')}
            </p>
          </div>
        </div>

        {/* Studio Pillars */}
        <div className="flex flex-col gap-1px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="group relative bg-[#020408] hover:bg-white/[0.02] transition-colors duration-500 p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center border-b border-white/5 last:border-b-0"
            >
              {/* Pillar Number/Icon */}
              <div className="flex items-center gap-6 md:w-1/4 shrink-0">
                <span className="font-mono text-4xl font-black text-white/5 group-hover:text-[#00e5ff]/20 transition-colors duration-500">
                  0{i + 1}
                </span>
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-white/10 text-white/40 group-hover:text-white group-hover:border-[#00e5ff]/40 transition-all duration-500"
                  style={{ color: pillarColors[i] }}
                >
                  {pillarIcons[i]}
                </div>
              </div>

              {/* Pillar Content */}
              <div className="md:w-2/4">
                <h3 className="font-syne font-extrabold text-2xl text-white mb-3 group-hover:text-[#00e5ff] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-white/40 group-hover:text-white/60 text-base leading-relaxed transition-colors">
                  {pillar.description}
                </p>
              </div>

              {/* Pillar Tags */}
              <div className="md:w-1/4 flex flex-wrap gap-2 md:justify-end">
                {pillar.details.map((detail, j) => (
                  <span
                    key={j}
                    className="font-mono text-[9px] px-3 py-1 rounded-md border border-white/10 bg-white/5 text-white/40 group-hover:text-white/70 transition-all uppercase tracking-wider"
                  >
                    {detail}
                  </span>
                ))}
              </div>

              {/* Hover Line Decoration */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-[#00e5ff] to-transparent group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Confidence Statement */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h4 className="font-syne font-bold text-white text-2xl mb-4 italic">
              {t('team.quote')}
            </h4>
            <div className="h-1 w-12 bg-[#00e5ff]" />
          </div>
          <p className="text-white/40 text-sm leading-relaxed border-l border-white/10 pl-8">
            {t('team.quote_body')}
          </p>
        </div>
      </div>
    </section>
  );
}