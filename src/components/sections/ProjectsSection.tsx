import { useState, useEffect, useCallback } from 'react';
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

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const ChevronIcon = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    {dir === 'left'
      ? <polyline points="15 18 9 12 15 6" />
      : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const GridIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

// ── Placeholder image ─────────────────────────────────────────────────────────
const ProjectImage = ({ index, title }: { index: number; title: string }) => {
  const palettes = [
    { bg: '#0a1628', accent: '#00e5ff', secondary: '#1565ff' },
    { bg: '#0d1117', accent: '#1565ff', secondary: '#00e5ff' },
    { bg: '#060d1f', accent: '#00e5ff', secondary: '#0d47a1' },
    { bg: '#080f1e', accent: '#1976d2', secondary: '#00e5ff' },
    { bg: '#0a0d1a', accent: '#00bcd4', secondary: '#1565ff' },
    { bg: '#060810', accent: '#00e5ff', secondary: '#1565ff' },
    { bg: '#0b1220', accent: '#1565ff', secondary: '#00acc1' },
    { bg: '#080c18', accent: '#00e5ff', secondary: '#1a237e' },
  ];
  const p = palettes[index % palettes.length];
  const initials = title.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: p.bg }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(${p.accent}33 1px, transparent 1px), linear-gradient(90deg, ${p.accent}33 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full opacity-20 blur-2xl"
        style={{ background: p.accent }} />
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full opacity-15 blur-2xl"
        style={{ background: p.secondary }} />
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-16 h-16 rotate-45 border-2 flex items-center justify-center"
          style={{ borderColor: p.accent + '60', background: p.accent + '10' }}>
          <span className="font-syne font-black text-lg -rotate-45" style={{ color: p.accent }}>
            {initials}
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-widest opacity-40" style={{ color: p.accent }}>
          PROJECT
        </span>
      </div>
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l opacity-40" style={{ borderColor: p.accent }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r opacity-40" style={{ borderColor: p.accent }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l opacity-40" style={{ borderColor: p.accent }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r opacity-40" style={{ borderColor: p.accent }} />
    </div>
  );
};

// ── Per-project carousel slides config ───────────────────────────────────────
const PROJECT_SLIDES: Record<number, Array<{ type: 'image'; src: string } | { type: 'placeholder' }>> = {
  0: [
    { type: 'image', src: '/proyectos/Mario/Proyecto1/eventos1.png' },
    { type: 'image', src: '/proyectos/Mario/Proyecto1/eventos2.png' },
    { type: 'image', src: '/proyectos/Mario/Proyecto1/eventos3.png' },
  ],
};

const getSlides = (index: number) =>
  PROJECT_SLIDES[index] ?? [
    { type: 'placeholder' },
    { type: 'placeholder' },
    { type: 'placeholder' },
  ];

// ── Image with fallback to placeholder ───────────────────────────────────────
const ImageWithFallback = ({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: React.ReactNode;
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
};

// ── Carousel ──────────────────────────────────────────────────────────────────
const Carousel = ({ projectIndex, title }: { projectIndex: number; title: string }) => {
  const slides = getSlides(projectIndex);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const go = useCallback((next: number, dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const prev = () => go((current - 1 + slides.length) % slides.length, 'left');
  const next = () => go((current + 1) % slides.length, 'right');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const slide = slides[current];

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div
        className="w-full h-full transition-all duration-300"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === 'right' ? '-3%' : '3%'})`
            : 'translateX(0)',
        }}
      >
        {slide.type === 'image' ? (
          <ImageWithFallback
            src={(slide as { type: 'image'; src: string }).src}
            alt={`${title} - slide ${current + 1}`}
            fallback={<ProjectImage index={projectIndex} title={title} />}
          />
        ) : (
          <ProjectImage index={projectIndex} title={title} />
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #040810 0%, transparent 55%)' }} />

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 transition-all duration-200 text-white/60 hover:text-[#00e5ff]"
            style={{
              background: 'rgba(2,4,8,0.7)',
              border: '1px solid rgba(0,229,255,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 transition-all duration-200 text-white/60 hover:text-[#00e5ff]"
            style={{
              background: 'rgba(2,4,8,0.7)',
              border: '1px solid rgba(0,229,255,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ChevronIcon dir="right" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 'right' : 'left')}
                className="transition-all duration-300"
                style={{
                  width: i === current ? '20px' : '6px',
                  height: '6px',
                  background: i === current ? '#00e5ff' : 'rgba(0,229,255,0.3)',
                  border: 'none',
                  outline: 'none',
                }}
              />
            ))}
          </div>

          <span className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-widest text-white/50"
            style={{
              background: 'rgba(2,4,8,0.6)',
              border: '1px solid rgba(0,229,255,0.15)',
              padding: '3px 10px',
              backdropFilter: 'blur(8px)',
            }}>
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </>
      )}
    </div>
  );
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  longDescription?: string;
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
const DetailModal = ({ project, index, onClose }: {
  project: Project; index: number; onClose: () => void;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const demoLinks: Record<number, string> = {
    0: 'https://sma-eventos.netlify.app/',
  };
  const codeLinks: Record<number, string> = {
    0: 'https://github.com/mariodelgadoh/eventos-san-miguel-de-allende.git',
  };

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
        <div className="w-full h-64 md:h-80 relative overflow-hidden">
          <Carousel projectIndex={index} title={project.title} />

          {project.category && (
            <span className="absolute top-4 left-4 z-20 font-mono text-[10px] tracking-widest uppercase px-3 py-1"
              style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff' }}>
              {project.category}
            </span>
          )}

          <button onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 transition-colors text-white/50 hover:text-[#00e5ff]"
            style={{ background: 'rgba(2,4,8,0.75)', border: '1px solid rgba(0,229,255,0.2)' }}>
            <CloseIcon />
          </button>

          <span className="absolute bottom-6 right-5 z-10 font-syne font-black text-6xl opacity-10 text-[#00e5ff] select-none pointer-events-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="p-8 flex flex-col gap-6">
          <div>
            <span className="font-mono text-[10px] text-[#00e5ff]/40 tracking-widest">
              _{String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-syne font-black text-2xl md:text-3xl text-white mt-1">
              {project.title}
            </h3>
          </div>

          <p className="text-white/50 text-sm leading-relaxed">
            {project.longDescription || project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs px-3 py-1"
                style={{ color: 'rgba(0,229,255,0.75)', border: '1px solid rgba(0,229,255,0.2)', background: 'rgba(0,229,255,0.04)' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
            <a
              href={demoLinks[index] ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLinkIcon />{t('projects.view_demo')}
            </a>
            <a
              href={codeLinks[index] ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3"
              style={{ textDecoration: 'none' }}
            >
              <GithubIcon />{t('projects.view_code')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Projects() {
  const { t, i18n } = useTranslation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<{ project: Project; index: number } | null>(null);
  const [galleryScrolled, setGalleryScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = t('projects.items', { returnObjects: true }) as Project[];
  const allItems = t('projects.all_items', { returnObjects: true }) as Project[];

  const categories = ['all', ...Array.from(new Set(allItems.map((p) => p.category || '')))];
  const filtered = activeFilter === 'all' ? allItems : allItems.filter((p) => p.category === activeFilter);

  // ── Nav links now include Technologies ─────────────────────────────────────
  const navLinks = [
    { key: 'nav.home', id: 'home' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.technologies', id: 'technologies' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
    { key: 'nav.contact', id: 'contact' },
  ];

  useEffect(() => {
    if (!galleryOpen) return;
    const el = document.getElementById('gallery-scroll');
    if (!el) return;
    const handler = () => setGalleryScrolled(el.scrollTop > 50);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [galleryOpen]);

  useEffect(() => {
    document.body.style.overflow = galleryOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [galleryOpen]);

  const scrollToSection = (id: string) => {
    setGalleryOpen(false);
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 320);
  };

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');

  const featuredGradients = [
    'from-[#00e5ff]/20 to-[#1565ff]/10',
    'from-[#1565ff]/20 to-[#00e5ff]/10',
    'from-[#00e5ff]/15 to-transparent',
  ];

  return (
    <>
      {/* ── Featured Projects Section ──────────────────────────────────────── */}
      <section id="projects" className="relative py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #00e5ff, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((project, i) => (
              <article key={i} onClick={() => setSelectedProject({ project, index: i })}
                className="glass-card flex flex-col group cursor-pointer overflow-hidden gap-0">
                <div className="w-full h-44 relative overflow-hidden">
                  {i === 0 ? (
                    <ImageWithFallback
                      src="/proyectos/Mario/Proyecto1/eventos1.png"
                      alt={project.title}
                      fallback={<ProjectImage index={i} title={project.title} />}
                    />
                  ) : (
                    <ProjectImage index={i} title={project.title} />
                  )}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(2,4,8,0.85) 0%, transparent 60%)' }}>
                    <span className="font-mono text-[10px] tracking-widest text-[#00e5ff] uppercase">
                      {t('projects.view_detail')} →
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#00e5ff]/30 tracking-widest">
                      _{String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-9 h-9 rounded-sm bg-gradient-to-br ${featuredGradients[i]} flex items-center justify-center border border-[rgba(0,229,255,0.15)]`}>
                      <div className="w-2.5 h-2.5 border border-[#00e5ff]/50 rotate-45" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-[#00e5ff] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-[#00e5ff]/60 border border-[rgba(0,229,255,0.15)] px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2 border-t border-[rgba(0,229,255,0.08)]">
                    <button onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                      <ExternalLinkIcon />{t('projects.view_demo')}
                    </button>
                    <button onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                      <GithubIcon />{t('projects.view_code')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <button
              onClick={() => { setGalleryOpen(true); setActiveFilter('all'); setGalleryScrolled(false); }}
              className="group relative flex items-center gap-3 btn-outline font-mono text-xs tracking-widest uppercase px-8 py-4"
            >
              <GridIcon />
              {t('projects.view_all')}
              <span className="text-[#00e5ff]/40 text-[10px]">({allItems.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Full Gallery ──────────────────────────────────────────────────── */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[150] flex flex-col" style={{ background: '#020408' }}>
          <header className={`fixed top-0 left-0 right-0 z-[160] transition-all duration-500 ${
            galleryScrolled
              ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)]'
              : 'bg-[#020408]/60 backdrop-blur-md border-b border-[rgba(0,229,255,0.04)]'
          }`}>
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-3 group">
                <img src="/logo.png" alt="Symmetrical Code"
                  className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
                <span className="hidden sm:block font-syne font-bold text-sm tracking-wide text-white/80 group-hover:text-white transition-colors">
                  Symmetrical<span className="text-[#00e5ff]">Code</span>
                </span>
              </button>

              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => scrollToSection(link.id)}
                    className={`font-mono text-xs tracking-widest uppercase transition-all duration-200 ${
                      link.id === 'projects' ? 'text-[#00e5ff]' : 'text-white/50 hover:text-white'
                    }`}>
                    {t(link.key)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button onClick={toggleLang}
                  className="font-mono text-xs tracking-widest border border-[rgba(0,229,255,0.25)] text-[#00e5ff]/70 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 px-3 py-1.5 transition-all duration-200">
                  {i18n.language === 'es' ? 'EN' : 'ES'}
                </button>
                <button onClick={() => setGalleryOpen(false)}
                  className="hidden md:flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#00e5ff] transition-colors border border-[rgba(0,229,255,0.15)] hover:border-[#00e5ff]/40 px-3 py-1.5">
                  <ArrowLeftIcon />{t('projects.back')}
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
                  <span className={`block w-5 h-px bg-[#00e5ff] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-5 h-px bg-[#00e5ff] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-px bg-[#00e5ff] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
              </div>
            </nav>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
              <div className="bg-[#020408]/95 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)] px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => scrollToSection(link.id)}
                    className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-[#00e5ff] text-left transition-colors">
                    {t(link.key)}
                  </button>
                ))}
                <button onClick={() => setGalleryOpen(false)}
                  className="flex items-center gap-2 font-mono text-xs text-[#00e5ff]/60 hover:text-[#00e5ff] transition-colors">
                  <ArrowLeftIcon />{t('projects.back')}
                </button>
              </div>
            </div>
          </header>

          <div id="gallery-scroll" className="flex-1 overflow-y-auto pt-16">
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="section-label">{t('projects.gallery_label')}</span>
                <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
              </div>
              <h3 className="font-syne font-black text-4xl md:text-5xl text-white">
                {t('projects.gallery_title')}
              </h3>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-6">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.filter(Boolean).map((cat) => (
                  <button key={cat} onClick={() => setActiveFilter(cat)}
                    className={`font-mono text-[10px] tracking-widest uppercase whitespace-nowrap px-4 py-2 border transition-all duration-200 ${
                      activeFilter === cat
                        ? 'border-[#00e5ff] text-[#00e5ff] bg-[rgba(0,229,255,0.08)]'
                        : 'border-[rgba(0,229,255,0.15)] text-white/40 hover:text-white hover:border-white/30'
                    }`}>
                    {cat === 'all' ? t('projects.filter_all') : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((project, i) => {
                  const globalIndex = allItems.findIndex((p) => p.title === project.title);
                  return (
                    <article key={i}
                      onClick={() => setSelectedProject({ project, index: globalIndex })}
                      className="glass-card flex flex-col group cursor-pointer overflow-hidden gap-0">
                      <div className="w-full h-40 relative overflow-hidden">
                        {globalIndex === 0 ? (
                          <ImageWithFallback
                            src="/proyectos/Mario/Proyecto1/eventos1.png"
                            alt={project.title}
                            fallback={<ProjectImage index={globalIndex} title={project.title} />}
                          />
                        ) : (
                          <ProjectImage index={globalIndex} title={project.title} />
                        )}
                        <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to top, rgba(2,4,8,0.85) 0%, transparent 60%)' }}>
                          <span className="font-mono text-[9px] tracking-widest text-[#00e5ff] uppercase">
                            {t('projects.view_detail')} →
                          </span>
                        </div>
                        {project.category && (
                          <span className="absolute top-2 right-2 font-mono text-[8px] tracking-widest uppercase px-2 py-0.5"
                            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.22)', color: '#00e5ff' }}>
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="p-5 flex flex-col gap-3 flex-1">
                        <span className="font-mono text-[9px] text-[#00e5ff]/30 tracking-widest">
                          _{String(globalIndex + 1).padStart(2, '0')}
                        </span>
                        <h4 className="font-syne font-bold text-base text-white group-hover:text-[#00e5ff] transition-colors duration-300">
                          {project.title}
                        </h4>
                        <p className="text-white/40 text-xs leading-relaxed flex-1">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(0,229,255,0.06)]">
                          {project.tags.map((tag) => (
                            <span key={tag} className="font-mono text-[9px] text-[#00e5ff]/50 border border-[rgba(0,229,255,0.12)] px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ──────────────────────────────────────────────────── */}
      {selectedProject && (
        <DetailModal
          project={selectedProject.project}
          index={selectedProject.index}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}