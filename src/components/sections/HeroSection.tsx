import { useTranslation } from 'react-i18next';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
  </svg>
);

const MapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

export default function Hero() {
  const { t } = useTranslation();

  const stats = [
    { value: t('hero.stat_1_value'), label: t('hero.stat_1_label') },
    { value: t('hero.stat_2_value'), label: t('hero.stat_2_label') },
    { value: t('hero.stat_3_value'), label: t('hero.stat_3_label') },
  ];

  const techs = ['React', 'TypeScript', 'Node.js', 'Next.js', 'Docker', 'AWS'];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg">

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(ellipse, #00e5ff, transparent)' }} />
        <div className="absolute top-0 right-0 w-px h-full opacity-15"
          style={{ background: 'linear-gradient(to bottom, transparent, #00e5ff, transparent)' }} />
        <div className="absolute top-0 left-0 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #00e5ff, transparent)' }} />
      </div>

      <div className="relative w-full px-6 lg:px-12 pt-28 pb-20">

        {/* ══════════════════════════════════
            TARJETA DE IDENTIDAD
        ══════════════════════════════════ */}
        <div className="w-full mb-16 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>

          <div className="relative w-full border border-[rgba(0,229,255,0.12)] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.04) 0%, rgba(0,0,0,0) 50%, rgba(21,101,255,0.03) 100%)',
            }}>

            {/* Glows internos */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #00e5ff, transparent)' }} />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #1565ff, transparent)' }} />

            {/* Esquinas decorativas */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#00e5ff] opacity-60" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#00e5ff] opacity-60" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#00e5ff] opacity-60" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#00e5ff] opacity-60" />

            <div className="relative z-10 p-8 lg:p-12">

              {/* FILA SUPERIOR: Logo + Nombre */}
              <div className="flex items-center gap-10 pb-8 border-b border-[rgba(0,229,255,0.08)]">

                {/* Logo */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 scale-[2.5] opacity-25 blur-2xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #00e5ff, transparent)' }} />
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <div className="absolute inset-3 border border-[rgba(0,229,255,0.15)]" />
                    <img
                      src="/logo.png"
                      alt="Symmetrical Code"
                      className="w-24 h-24 object-contain animate-float relative z-10"
                      style={{ filter: 'drop-shadow(0 0 32px rgba(0,229,255,0.7))' }}
                    />
                  </div>
                </div>

                {/* Nombre */}
                <div>
                  <h2 className="font-syne font-black text-white leading-[0.9]"
                    style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)' }}>
                    Symmetrical<br />
                    <span className="text-[#00e5ff]">Code</span>
                  </h2>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="w-8 h-px bg-[rgba(0,229,255,0.5)]" />
                    <span className="section-label text-[0.65rem] tracking-[0.2em]">Software Studio · Est. 2026</span>
                  </div>
                </div>
              </div>

              {/* FILA INFERIOR: Descripción | Stack | Contacto + Socials */}
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pt-8">

                {/* Descripción — izquierda */}
                <p className="text-white/40 text-sm leading-relaxed max-w-md font-mono">
                  Estudio de desarrollo de software especializado en crear productos digitales de alto impacto.
                  Combinamos diseño, arquitectura limpia y tecnología moderna para construir soluciones que escalan.
                </p>

                {/* Stack — centro */}
                <div className="flex-shrink-0">
                  <span className="section-label text-[0.6rem] mb-2 block">Stack tecnológico</span>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span key={tech}
                        className="font-mono text-xs text-[#00e5ff]/55 border border-[rgba(0,229,255,0.13)] px-2.5 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contacto + Socials — derecha, juntos */}
                <div className="flex-shrink-0 flex flex-col gap-4">
                  {/* Info de contacto */}
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: <MailIcon />, text: 'hola@symmetricalcode.dev' },
                      { icon: <MapIcon />, text: 'Guanajuato, México · Remoto' },
                      { icon: <CodeIcon />, text: 'Disponible para nuevos proyectos' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-white/45 text-xs font-mono">
                        <span className="text-[#00e5ff] flex-shrink-0">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>

                  {/* Divisor */}
                  <div className="w-full h-px bg-[rgba(0,229,255,0.08)]" />

                  {/* Socials */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.6rem] text-white/20 tracking-widest uppercase">Síguenos</span>
                    <div className="w-px h-3 bg-[rgba(0,229,255,0.2)]" />
                    <div className="flex gap-4">
                      {[
                        { icon: <GithubIcon />, href: 'https://github.com/symmetricalcode', label: 'GitHub' },
                        { icon: <LinkedInIcon />, href: 'https://linkedin.com/company/symmetricalcode', label: 'LinkedIn' },
                        { icon: <InstagramIcon />, href: 'https://instagram.com/symmetricalcode', label: 'Instagram' },
                      ].map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                          aria-label={s.label}
                          className="text-white/30 hover:text-[#00e5ff] transition-colors duration-200">
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            CONTENIDO PRINCIPAL
        ══════════════════════════════════ */}
        <div className="w-full max-w-7xl mx-auto">

          <div className="inline-flex items-center gap-3 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <span className="w-8 h-px bg-[#00e5ff]" />
            <span className="section-label">{t('hero.label')}</span>
          </div>

          <h1
            className="font-syne font-black leading-[0.88] mb-12 opacity-0 animate-fade-up"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
              animationDelay: '0.35s',
              animationFillMode: 'forwards',
            }}
          >
            <span className="text-white block">{t('hero.title')}</span>
            <span className="gradient-text block">{t('hero.title_highlight')}</span>
            <span className="text-white/20 block">{t('hero.title_end')}</span>
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-14
            opacity-0 animate-fade-up"
            style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 flex-shrink-0">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-10 py-4 rounded-none font-syne font-bold text-sm tracking-wider">
                {t('hero.cta_primary')}
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-10 py-4 rounded-none font-syne font-bold text-sm tracking-wider">
                {t('hero.cta_secondary')}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
            {stats.map((stat, i) => (
              <div key={i} className="border-l-2 border-[rgba(0,229,255,0.25)] pl-5">
                <div className="font-syne font-black text-3xl gradient-text">{stat.value}</div>
                <div className="font-mono text-xs text-white/35 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="font-mono text-xs text-[#00e5ff] tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#00e5ff] to-transparent" />
      </div>
    </section>
  );
}