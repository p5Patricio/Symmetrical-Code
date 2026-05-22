import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { projects, techIconMap } from '../data/projects';
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
    <div className={`w-full h-full ${colors[index % 3]} flex flex-col items-center justify-center p-6 gap-3 text-center`}>
      <span className="font-syne font-black text-xl text-white/10 select-none uppercase tracking-tighter leading-none">{title}</span>
      <div className="w-8 h-px bg-white/5" />
    </div>
  );
};

const GalleryModal = ({ title, images, onClose }: { title: string; images: string[]; projectIndex: number; onClose: () => void }) => {
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
      <div className="flex items-center justify-between p-6">
        <h3 className="font-syne font-black text-white text-xl uppercase tracking-tighter">{title}</h3>
        <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors"><CloseIcon /></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-12">
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev - 1 + images.length) % images.length); }} className="absolute left-4 z-10 p-3 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronLeft /></button>
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center" onClick={e => e.stopPropagation()}><img src={images[current]} alt={title} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" /></div>
        <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev + 1) % images.length); }} className="absolute right-4 z-10 p-3 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"><ChevronRight /></button>
      </div>
    </div>
  );
};

const DetailModal = ({ project, index, totalProjects, onNext, onPrev, onClose }: { project: ProjectView; index: number; totalProjects: number; onNext: () => void; onPrev: () => void; onClose: () => void }) => {
  const { t } = useTranslation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const images = project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.ogImageUrl];
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { 
      if (e.key === 'Escape' && !galleryOpen) onClose(); 
      if (e.key === 'ArrowRight' && !galleryOpen) onNext();
      if (e.key === 'ArrowLeft' && !galleryOpen) onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [galleryOpen, onClose, onNext, onPrev]);

  return (
    <>
      <div className="fixed inset-0 z-[400] bg-[#020408]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4" onClick={onClose}>
        <div className="w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#070d14] to-[#03060a] border border-white/10 rounded-2xl relative shadow-2xl flex flex-col md:flex-row mb-8" onClick={e => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white/30 hover:text-white transition-colors z-20"><CloseIcon /></button>
          
          <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[400px] bg-[#03060a]">
            <ImageWithFallback src={project.ogImageUrl} alt={project.title} fallback={<ProjectImage index={index} title={project.title} />} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#070d14]" />
          </div>

          <div className="p-8 md:p-12 flex-1 flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-mono text-[10px] text-[#00e5ff]/40 tracking-widest uppercase mb-2 block">Project Case</span>
                <h3 className="font-syne font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">{project.title}</h3>
                <div className="w-12 h-1 bg-[#00e5ff] mt-4" />
              </div>
              <p className="text-white/50 leading-relaxed text-sm text-justify">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/5 bg-white/5 group/tag">
                    {techIconMap[tag] && <img src={techIconMap[tag]} alt={tag} className="w-3.5 h-3.5 opacity-50 group-hover/tag:opacity-100 transition-opacity" />}
                    <span className="text-white/40 group-hover/tag:text-white transition-colors text-[10px] font-mono uppercase tracking-wider">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 pt-8 border-t border-white/5">
              <div className="flex flex-wrap gap-3">
                {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-6 py-3 bg-[#00e5ff] text-[#020408] font-bold rounded-md transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"><ExternalLinkIcon />{t('projects.view_demo')}</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-3 bg-white/5 border border-white/10 text-white/70 rounded-md transition-all hover:bg-white/10"><GithubIcon />Source Code</a>}
                <button onClick={() => setGalleryOpen(true)} className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-3 bg-white/5 border border-white/10 text-white/70 rounded-md transition-all hover:bg-white/10"><ImagesIcon />{t('projects.gallery')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Outer Navigation */}
        <div className="flex flex-col items-center gap-6" onClick={e => e.stopPropagation()}>
           <div className="flex items-center gap-8">
              <button onClick={onPrev} className="group flex items-center gap-3 text-white/40 hover:text-[#00e5ff] transition-all">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00e5ff]/40 group-hover:bg-[#00e5ff]/5">
                  <ChevronLeft />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[.2em] font-bold">{t('projects.prev_project', { defaultValue: 'Ver anterior proyecto' })}</span>
              </button>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <button onClick={onNext} className="group flex items-center gap-3 text-white/40 hover:text-[#00e5ff] transition-all text-right">
                <span className="font-mono text-[11px] uppercase tracking-[.2em] font-bold">{t('projects.next_project', { defaultValue: 'Ver siguiente proyecto' })}</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00e5ff]/40 group-hover:bg-[#00e5ff]/5">
                  <ChevronRight />
                </div>
              </button>
           </div>
           <div className="font-mono text-[10px] text-white/20 tracking-[.3em] uppercase">
              {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
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
  const allItems: ProjectView[] = useMemo(() => projects.map(p => ({
    ...p,
    title: lang === 'es' ? p.titleEs : p.titleEn,
    description: lang === 'es' ? p.descriptionEs : p.descriptionEn,
  })), [lang]);

  const featuredTitles = ['TravelApp', 'Rey Asesino', 'Eventos SMA'];
  const items = useMemo(() => featuredTitles.map(ft => allItems.find(p => p.title === ft || projects.find(pr => pr.title === ft && (lang === 'es' ? pr.titleEs : pr.titleEn) === p.title))).filter(Boolean) as ProjectView[], [allItems, lang]);
  const categories = useMemo(() => ['all', ...Array.from(new Set(allItems.map(p => p.category || '')))], [allItems]);
  const filtered = useMemo(() => activeFilter === 'all' ? allItems : allItems.filter(p => p.category === activeFilter), [activeFilter, allItems]);

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

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const total = filtered.length;
    const currentIndex = filtered.findIndex(p => p.title === selectedProject.project.title);
    let nextIdx = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIdx >= total) nextIdx = 0;
    if (nextIdx < 0) nextIdx = total - 1;
    
    const nextProject = filtered[nextIdx];
    const globalIndex = allItems.findIndex(p => p.title === nextProject.title);
    setSelectedProject({ project: nextProject, index: globalIndex });
  };

  if (isFullPage) {
    return (
      <div className="fixed inset-0 z-[150] flex flex-col bg-[#020408]">
        <GalleryNavbar scrolled={galleryScrolled} onClose={() => navigate('/')} onNavigate={handleNavigation} activeSection="projects" />
        <div id="gallery-scroll" className="flex-1 overflow-y-auto pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-3 sm:pb-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4"><div className="h-px w-12 bg-white/10" /><span className="section-label">{t('projects.gallery_label')}</span><div className="h-px w-12 bg-white/10" /></div>
            <h3 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tighter">{t('projects.gallery_title')}</h3>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex justify-center flex-wrap gap-2">
            {categories.filter(Boolean).map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`font-mono text-[10px] tracking-widest uppercase px-4 py-2 transition-all ${activeFilter === cat ? 'text-[#00e5ff] border-b border-[#00e5ff]' : 'text-white/40 hover:text-white'}`}>{cat === 'all' ? t('projects.filter_all') : cat}</button>
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => {
              const globalIndex = allItems.findIndex(p => p.title === project.title);
              
              // Evitar duplicados visuales (mismo icono base)
              const seenIcons = new Set<string>();
              const uniqueTechTags = project.tags.filter(tag => {
                const icon = techIconMap[tag];
                if (!icon || seenIcons.has(icon)) return false;
                seenIcons.add(icon);
                return true;
              });

              return (
                <article key={i} onClick={() => setSelectedProject({ project, index: globalIndex })} className="group cursor-pointer overflow-hidden transition-all bg-white/[0.02] border border-white/5 rounded-lg hover:scale-[1.02] flex flex-col h-[540px]">
                  <div className="w-full h-48 relative overflow-hidden shrink-0">
                    <ImageWithFallback src={project.ogImageUrl} alt={project.title} fallback={<ProjectImage index={globalIndex} title={project.title} />} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"><span className="font-mono text-[10px] tracking-wider text-[#00e5ff] uppercase">{t('projects.view_detail')} →</span></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-[#00e5ff]/30 tracking-wider">_{String(globalIndex + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="min-h-[3.5rem] flex flex-col justify-start">
                      <h4 className="font-syne font-bold text-lg text-white group-hover:text-[#00e5ff] transition-colors leading-tight">{project.title}</h4>
                    </div>
                    <div className="min-h-[5rem] mt-2">
                      <p className="text-white/40 text-xs leading-relaxed text-justify line-clamp-4">{project.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      {uniqueTechTags.slice(0, 6).map(tag => (
                        <div key={tag} className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0" title={tag}>
                          <img src={techIconMap[tag]} alt={tag} className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 flex flex-wrap gap-1.5 border-t border-white/5">
                      {project.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-[9px] font-mono text-white/10 uppercase tracking-tighter">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        {selectedProject && <DetailModal project={selectedProject.project} index={selectedProject.index} totalProjects={filtered.length} onNext={() => navigateProject('next')} onPrev={() => navigateProject('prev')} onClose={() => setSelectedProject(null)} />}
      </div>
    );
  }

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6"><span className="section-label">{t('projects.label')}</span><div className="h-px flex-1 bg-white/5" /></div>
          <div className="flex flex-col md:flex-row md:items-end gap-8 justify-between">
            <h2 className="font-syne font-black text-5xl md:text-7xl text-white leading-none">{t('projects.title')}</h2>
            <p className="text-white/40 text-lg max-w-xs leading-relaxed md:text-right">{t('projects.subtitle')}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((project, i) => {
             const globalIndex = allItems.findIndex(p => p.title === project.title);
             
             // Evitar duplicados visuales (mismo icono base)
             const seenIcons = new Set<string>();
             const uniqueTechTags = project.tags.filter(tag => {
               const icon = techIconMap[tag];
               if (!icon || seenIcons.has(icon)) return false;
               seenIcons.add(icon);
               return true;
             });

             return (
              <article key={i} onClick={() => setSelectedProject({ project, index: globalIndex })} className="glass-card-enhanced group cursor-pointer overflow-hidden border border-white/10 rounded-2xl flex flex-col min-h-[580px]">
                <div className="h-56 overflow-hidden shrink-0 relative">
                  <ImageWithFallback src={project.ogImageUrl} alt={project.title} fallback={<ProjectImage index={i} title={project.title} />} />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="min-h-[4rem] flex flex-col justify-start mb-4">
                    <h3 className="font-syne font-black text-2xl text-white group-hover:text-[#00e5ff] transition-colors leading-tight">{project.title}</h3>
                  </div>
                  <div className="min-h-[6rem] mb-6">
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-4">{project.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {uniqueTechTags.slice(0, 6).map(tag => (
                      <div key={tag} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:border-[#00e5ff]/20 transition-all shrink-0" title={tag}>
                        <img src={techIconMap[tag]} alt={tag} className="w-full h-full object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{project.category}</span>
                    <span className="text-[#00e5ff] text-xs font-bold uppercase tracking-tighter flex items-center gap-2">Explore <ExternalLinkIcon /></span>
                  </div>
                </div>
              </article>
             );
          })}
        </div>
        <div className="mt-20 flex justify-center">
          <button onClick={() => navigate('/proyectos')} className="group flex items-center gap-4 font-mono text-xs tracking-[.3em] uppercase px-10 py-5 bg-white/5 border border-white/10 hover:border-[#00e5ff]/40 hover:bg-white/[0.08] transition-all rounded-full">
            <GridIcon /> {t('projects.view_all')}
          </button>
        </div>
      </div>
      {selectedProject && <DetailModal project={selectedProject.project} index={selectedProject.index} totalProjects={items.length} onNext={() => navigateProject('next')} onPrev={() => navigateProject('prev')} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
