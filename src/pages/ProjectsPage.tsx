import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import GalleryNavbar from '../components/layout/GalleryNavbar';

// --- Types ---
interface ProjectView {
  id?: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  ogImageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  backendUrl?: string;
  frontendUrl?: string;
  galleryImages?: string[];
}

// --- Icons (Internal) ---
const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
);
const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
);
const ImagesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
);
const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
);
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
);
const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

// --- Subcomponents ---
const ImageWithFallback = ({ src, alt, fallback }: { src?: string; alt: string; fallback: React.ReactNode }) => {
  const [error, setError] = useState(false);
  if (!src || error) return <>{fallback}</>;
  return <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={() => setError(true)} />;
};

const ProjectImage = ({ index, title }: { index: number; title: string }) => {
  const colors = ['bg-[#00e5ff]/10', 'bg-[#1565ff]/10', 'bg-[#7c3aed]/10'];
  return (
    <div className={`w-full h-full ${colors[index % 3]} flex flex-col items-center justify-center p-4 sm:p-6 gap-2 sm:gap-3 text-center`}>
      <span className="font-syne font-black text-base sm:text-xl text-white/10 select-none uppercase tracking-tighter leading-none">{title}</span>
      <div className="w-8 h-px bg-white/5" />
    </div>
  );
};

const GalleryModal = ({ title, images, projectIndex, onClose }: { title: string; images: string[]; projectIndex: number; onClose: () => void }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(prev => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrent(prev => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);
  return (
    <div className="fixed inset-0 z-[500] bg-[#020408]/98 backdrop-blur-xl flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between p-4 sm:p-6">
        <h3 className="font-syne font-black text-white text-lg sm:text-xl uppercase tracking-tighter truncate max-w-[200px] sm:max-w-md">{title}</h3>
        <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors"><CloseIcon /></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center p-3 sm:p-4 md:p-12">
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev - 1 + images.length) % images.length); }} className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronLeft /></button>
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
          <img src={images[current]} alt={title} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" />
        </div>
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev + 1) % images.length); }} className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronRight /></button>
      </div>
      <div className="text-center pb-6">
        <span className="font-mono text-[10px] text-white/30">{current + 1} / {images.length}</span>
      </div>
    </div>
  );
};

const DetailModal = ({ project, index, onClose }: { project: ProjectView; index: number; onClose: () => void }) => {
  const { t } = useTranslation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const images = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.ogImageUrl];
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !galleryOpen) onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [galleryOpen, onClose]);
  return (
    <>
      <div className="fixed inset-0 z-[400] bg-[#020408]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto" onClick={onClose}>
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#070d14] to-[#03060a] border border-white/10 rounded-xl sm:rounded-2xl relative shadow-2xl" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/30 hover:text-white transition-colors z-20"><CloseIcon /></button>
          <div className="flex flex-col md:grid md:grid-cols-2">
            <div className="relative h-56 sm:h-64 md:h-full bg-[#03060a]">
              <ImageWithFallback src={project.ogImageUrl} alt={project.title} fallback={<ProjectImage index={index} title={project.title} />} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#070d14]" />
            </div>
            <div className="p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6 md:gap-8">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#00e5ff]/40 tracking-widest uppercase mb-2 block">{t('projects.case_label') || 'Project Case'}</span>
                <h3 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">{project.title}</h3>
                <div className="w-10 sm:w-12 h-0.5 sm:h-1 bg-[#00e5ff] mt-3 sm:mt-4" />
              </div>
              <p className="text-white/50 leading-relaxed text-xs sm:text-sm text-justify">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border border-white/5 bg-white/5 text-white/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-4">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase px-3 sm:px-6 py-2 sm:py-3 bg-[#00e5ff] text-[#020408] font-bold rounded-md transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]">
                    <ExternalLinkIcon />{t('projects.view_demo')}
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase px-3 sm:px-5 py-2 sm:py-3 bg-white/5 border border-white/10 text-white/70 rounded-md transition-all hover:bg-white/10">
                    <GithubIcon />Source
                  </a>
                )}
                <button onClick={() => setGalleryOpen(true)} className="flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase px-3 sm:px-5 py-2 sm:py-3 bg-white/5 border border-white/10 text-white/70 rounded-md transition-all hover:bg-white/10">
                  <ImagesIcon />{t('projects.gallery')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {galleryOpen && <GalleryModal title={project.title} images={images} projectIndex={index} onClose={() => setGalleryOpen(false)} />}
    </>
  );
};

// --- Main Export ---
export default function Projects({ isFullPage = false }: { isFullPage?: boolean }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<{ project: ProjectView; index: number } | null>(null);
  const [galleryScrolled, setGalleryScrolled] = useState(false);

  const lang = i18n.language;
  const allItems: ProjectView[] = projects.map(p => ({
    ...p,
    title: lang === 'es' ? p.titleEs : p.titleEn,
    description: lang === 'es' ? p.descriptionEs : p.descriptionEn,
  }));

  const featuredTitles = ['TravelApp', 'Rey Asesino', 'Eventos SMA'];
  const items = featuredTitles.map(ft => allItems.find(p => p.title === ft || projects.find(pr => pr.title === ft && (lang === 'es' ? pr.titleEs : pr.titleEn) === p.title))).filter(Boolean) as ProjectView[];
  const categories = ['all', ...Array.from(new Set(allItems.map(p => p.category || '')))];
  const filtered = activeFilter === 'all' ? allItems : allItems.filter(p => p.category === activeFilter);

  useEffect(() => {
    if (!isFullPage) return;
    const el = document.getElementById('gallery-scroll');
    if (!el) return;
    const handler = () => setGalleryScrolled(el.scrollTop > 50);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [isFullPage]);

  useEffect(() => {
    document.body.style.overflow = (isFullPage || !!selectedProject) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isFullPage, selectedProject]);

  const handleNavigation = (id: string) => {
    if (isFullPage) navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, isFullPage ? 500 : 0);
  };

  if (isFullPage) {
    return (
      <div className="fixed inset-0 z-[150] flex flex-col bg-[#020408]">
        <GalleryNavbar scrolled={galleryScrolled} onClose={() => navigate('/')} onNavigate={handleNavigation} activeSection="projects" />
        <div id="gallery-scroll" className="flex-1 overflow-y-auto pt-16 sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-12 pb-2 sm:pb-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-white/10" />
              <span className="section-label text-xs sm:text-sm">{t('projects.gallery_label')}</span>
              <div className="h-px w-8 sm:w-12 bg-white/10" />
            </div>
            <h3 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-tighter">
              {t('projects.gallery_title')}
            </h3>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 sm:pb-4 md:pb-6 flex justify-center flex-wrap gap-1 sm:gap-2">
            {categories.filter(Boolean).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase px-2 sm:px-4 py-1.5 sm:py-2 transition-all ${
                  activeFilter === cat ? 'text-[#00e5ff] border-b border-[#00e5ff]' : 'text-white/40 hover:text-white'
                }`}
              >
                {cat === 'all' ? t('projects.filter_all') : cat}
              </button>
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((project, i) => {
              const globalIndex = allItems.findIndex(p => p.title === project.title);
              return (
                <article
                  key={i}
                  onClick={() => setSelectedProject({ project, index: globalIndex })}
                  className="group cursor-pointer overflow-hidden transition-all duration-300 bg-white/[0.02] border border-white/5 rounded-lg hover:scale-[1.02] hover:border-white/20"
                >
                  <div className="w-full h-36 sm:h-40 relative overflow-hidden">
                    <ImageWithFallback src={project.ogImageUrl} alt={project.title} fallback={<ProjectImage index={globalIndex} title={project.title} />} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#00e5ff] uppercase">{t('projects.view_detail')} →</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#00e5ff]/30 tracking-wider">_{String(globalIndex + 1).padStart(2, '0')}</span>
                    <h4 className="font-syne font-bold text-sm sm:text-base text-white group-hover:text-[#00e5ff] transition-colors">{project.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed text-justify line-clamp-2">{project.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        {selectedProject && <DetailModal project={selectedProject.project} index={selectedProject.index} onClose={() => setSelectedProject(null)} />}
      </div>
    );
  }

  return (
    <section id="projects" className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#020408] to-[#03060c]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-[#00e5ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-[#00b4d8]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="section-label text-xs sm:text-sm">{t('projects.label')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 justify-between">
            <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
              {t('projects.title')}
            </h2>
            <p className="text-white/40 text-base sm:text-lg max-w-xs leading-relaxed md:text-right">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {items.map((project, i) => (
            <article
              key={i}
              onClick={() => setSelectedProject({ project, index: allItems.findIndex(p => p.title === project.title) })}
              className="glass-card-enhanced group cursor-pointer overflow-hidden border border-white/10 rounded-xl sm:rounded-2xl transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            >
              <div className="h-44 sm:h-48 overflow-hidden relative">
                <ImageWithFallback src={project.ogImageUrl} alt={project.title} fallback={<ProjectImage index={i} title={project.title} />} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 md:gap-6">
                <h3 className="font-syne font-black text-xl sm:text-2xl text-white group-hover:text-[#00e5ff] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed text-justify line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-auto pt-4 sm:pt-5 md:pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[8px] sm:text-[9px] font-mono text-white/25 uppercase">{tag}</span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-[8px] sm:text-[9px] font-mono text-white/25">+{project.tags.length - 2}</span>
                    )}
                  </div>
                  <span className="text-[#00e5ff] text-[10px] sm:text-xs font-bold uppercase tracking-tighter flex items-center gap-1.5 sm:gap-2 group-hover:gap-3 transition-all">
                    {t('projects.explore')} <ExternalLinkIcon />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center">
          <button
            onClick={() => navigate('/proyectos')}
            className="group flex items-center gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[.3em] uppercase px-6 sm:px-10 py-3 sm:py-5 bg-white/5 border border-white/10 hover:border-[#00e5ff]/40 hover:bg-white/[0.08] transition-all duration-300 rounded-full"
          >
            <GridIcon /> {t('projects.view_all')}
          </button>
        </div>
      </div>

      {selectedProject && <DetailModal project={selectedProject.project} index={selectedProject.index} onClose={() => setSelectedProject(null)} />}

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