import { useTranslation } from 'react-i18next';

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  const { t } = useTranslation();

  // Access the items array from translations
  const items = t('projects.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tags: string[];
  }>;

  const gradients = [
    'from-[#00e5ff]/20 to-[#1565ff]/10',
    'from-[#1565ff]/20 to-[#00e5ff]/10',
    'from-[#00e5ff]/15 to-transparent',
  ];

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #00e5ff, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label">{t('projects.label')}</span>
            <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
            <h2 className="font-syne font-black text-5xl md:text-6xl text-white">
              {t('projects.title')}
            </h2>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed md:text-right">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project, i) => (
            <article
              key={i}
              className="glass-card p-8 flex flex-col gap-6 group cursor-pointer"
            >
              {/* Project number */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#00e5ff]/30 tracking-widest">
                  _{String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className={`w-10 h-10 rounded-sm bg-gradient-to-br ${gradients[i]} flex items-center justify-center border border-[rgba(0,229,255,0.15)]`}
                >
                  <div className="w-3 h-3 border border-[#00e5ff]/50 rotate-45" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-[#00e5ff] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-[#00e5ff]/60 border border-[rgba(0,229,255,0.15)] px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2 border-t border-[rgba(0,229,255,0.08)]">
                <button className="flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                  <ExternalLinkIcon />
                  {t('projects.view_demo')}
                </button>
                <button className="flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                  <GithubIcon />
                  {t('projects.view_code')}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}