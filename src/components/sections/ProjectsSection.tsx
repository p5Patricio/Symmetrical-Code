import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { projects, techIconMap } from '../../data/projects';

// ── Icons ─────────────────────────────────────────────────────────────────────
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const ChevronIcon = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const GridIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const ImagesIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const ZoomInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

// ── Placeholder ────────────────────────────────────────────────────────────────
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
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: p.bg }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(${p.accent}33 1px, transparent 1px), linear-gradient(90deg, ${p.accent}33 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full opacity-20 blur-2xl" style={{ background: p.accent }} />
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full opacity-15 blur-2xl" style={{ background: p.secondary }} />
      <div className="relative flex flex-col items-center gap-3">
        <div className="w-16 h-16 rotate-45 border-2 flex items-center justify-center"
          style={{ borderColor: p.accent + '60', background: p.accent + '10' }}>
          <span className="font-syne font-black text-lg -rotate-45" style={{ color: p.accent }}>{initials}</span>
        </div>
        <span className="font-mono text-[10px] tracking-widest opacity-40" style={{ color: p.accent }}>PROJECT</span>
      </div>
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l opacity-40" style={{ borderColor: p.accent }} />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r opacity-40" style={{ borderColor: p.accent }} />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l opacity-40" style={{ borderColor: p.accent }} />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r opacity-40" style={{ borderColor: p.accent }} />
    </div>
  );
};

const ImageWithFallback = ({ src, alt, fallback }: { src: string; alt: string; fallback: React.ReactNode }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setFailed(true)} />;
};

// ── Zoomable Image ────────────────────────────────────────────────────────────
const ZoomableImage = ({
  src, alt, fallback, projectIndex, title,
}: {
  src: string; alt: string; fallback: React.ReactNode; projectIndex: number; title: string;
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const clampPosition = (x: number, y: number, s: number) => {
    const container = containerRef.current;
    const imageEl = imageRef.current;
    if (!container || !imageEl) return { x, y };
    const imageRect = imageEl.getBoundingClientRect();
    const maxX = (imageRect.width * (s - 1)) / 2;
    const maxY = (imageRect.height * (s - 1)) / 2;
    return {
      x: Math.min(Math.max(x, -maxX), maxX),
      y: Math.min(Math.max(y, -maxY), maxY),
    };
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 4));
  const zoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      else setPosition(p => clampPosition(p.x, p.y, next));
      return next;
    });
  };
  const resetZoom = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    const raw = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
    setPosition(clampPosition(raw.x, raw.y, scale));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    e.deltaY < 0 ? zoomIn() : zoomOut();
  };

  const pct = Math.round(scale * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        ref={imageRef}
        className="w-full h-full"
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <ImageWithFallback src={src} alt={alt} fallback={fallback} />
      </div>

      <div
        className="absolute bottom-4 right-4 z-30 flex items-center gap-0 overflow-hidden"
        style={{
          background: 'rgba(4,8,16,0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,229,255,0.18)',
          borderRadius: '8px',
        }}
      >
        <button
          onClick={zoomOut}
          disabled={scale <= 1}
          className="flex items-center justify-center transition-all duration-150 text-white/60 hover:text-[#00e5ff] hover:bg-[rgba(0,229,255,0.08)] disabled:opacity-25 disabled:cursor-not-allowed"
          style={{ width: 36, height: 34 }}
          title="Zoom out"
        >
          <ZoomOutIcon />
        </button>

        <span style={{ width: 1, height: 18, background: 'rgba(0,229,255,0.15)', flexShrink: 0 }} />

        <button
          onClick={resetZoom}
          className="font-mono text-[10px] tracking-wider transition-colors duration-150 hover:text-[#00e5ff]"
          style={{ padding: '0 10px', height: 34, color: scale > 1 ? '#00e5ff' : 'rgba(255,255,255,0.4)', minWidth: 46 }}
          title="Reset zoom"
        >
          {pct}%
        </button>

        <span style={{ width: 1, height: 18, background: 'rgba(0,229,255,0.15)', flexShrink: 0 }} />

        <button
          onClick={zoomIn}
          disabled={scale >= 4}
          className="flex items-center justify-center transition-all duration-150 text-white/60 hover:text-[#00e5ff] hover:bg-[rgba(0,229,255,0.08)] disabled:opacity-25 disabled:cursor-not-allowed"
          style={{ width: 36, height: 34 }}
          title="Zoom in"
        >
          <ZoomInIcon />
        </button>
      </div>

      {scale > 1 && (
        <div
          className="absolute bottom-4 left-4 z-30 font-mono text-[9px] tracking-wider text-white/30 pointer-events-none"
          style={{
            background: 'rgba(4,8,16,0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '6px',
            padding: '4px 8px',
          }}
        >
          Arrastra para mover
        </div>
      )}
    </div>
  );
};

// ── Tech Badge ────────────────────────────────────────────────────────────────
const TechBadge = ({ tag }: { tag: string }) => {
  const iconUrl = techIconMap[tag];
  const isGithubOrVercel = tag === 'GitHub' || tag === 'Vercel';
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-[#00e5ff]/60 border border-[rgba(0,229,255,0.15)] px-2 sm:px-2.5 py-0.5 sm:py-1" title={tag}>
      {iconUrl && (
        <img src={iconUrl} alt={tag} className="w-3 sm:w-3.5 h-3 sm:h-3.5 object-contain flex-shrink-0"
          style={{ filter: isGithubOrVercel ? 'brightness(0) invert(1) opacity(0.6)' : 'brightness(0.75) saturate(0.8)' }} />
      )}
      {tag}
    </span>
  );
};

const TechBadgeSm = ({ tag }: { tag: string }) => {
  const iconUrl = techIconMap[tag];
  const isGithubOrVercel = tag === 'GitHub' || tag === 'Vercel';
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#00e5ff]/50 border border-[rgba(0,229,255,0.12)] px-2 py-0.5" title={tag}>
      {iconUrl && (
        <img src={iconUrl} alt={tag} className="w-3 h-3 object-contain flex-shrink-0"
          style={{ filter: isGithubOrVercel ? 'brightness(0) invert(1) opacity(0.5)' : 'brightness(0.7) saturate(0.7)' }} />
      )}
      {tag}
    </span>
  );
};

// ── Carousel ──────────────────────────────────────────────────────────────────
const Carousel = ({ projectIndex, title, ogImageUrl }: { projectIndex: number; title: string; ogImageUrl: string }) => {
  const slides = [{ src: ogImageUrl }];
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const go = useCallback((next: number, dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => { setCurrent(next); setAnimating(false); }, 300);
  }, [animating]);

  const prev = () => go((current - 1 + slides.length) % slides.length, 'left');
  const next = () => go((current + 1) % slides.length, 'right');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div className="w-full h-full transition-all duration-300"
        style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction === 'right' ? '-3%' : '3%'})` : 'translateX(0)' }}>
        <ImageWithFallback
          src={slides[current].src}
          alt={`${title} - slide ${current + 1}`}
          fallback={<ProjectImage index={projectIndex} title={title} />}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #040810 0%, transparent 55%)' }} />
    </div>
  );
};

// ── Gallery Modal ─────────────────────────────────────────────────────────────
const GalleryModal = ({ title, images, projectIndex, onClose }: {
  title: string; images: string[]; projectIndex: number; onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const go = useCallback((next: number, dir: 'left' | 'right') => {
    if (animating || images.length <= 1) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => { setCurrent(next); setAnimating(false); }, 280);
  }, [animating, images.length]);

  const prev = () => go((current - 1 + images.length) % images.length, 'left');
  const next = () => go((current + 1) % images.length, 'right');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, current, animating]);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-4 md:p-6"
      style={{ background: 'rgba(2,4,8,0.97)', backdropFilter: 'blur(24px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-5xl flex flex-col gap-3 sm:gap-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-2">
          <div className="min-w-0 flex-1">
            <span className="font-mono text-[10px] text-[#00e5ff]/40 tracking-wider">
              {t('projects.gallery')} / {title}
            </span>
            {images.length > 1 && (
              <span className="font-mono text-[10px] text-white/30 ml-2">
                {String(current + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className="relative w-full overflow-hidden"
          style={{ border: '1px solid rgba(0,229,255,0.08)', aspectRatio: '16/9', background: '#020408', borderRadius: '4px' }}>
          <div className="w-full h-full transition-all duration-280"
            style={{ opacity: animating ? 0 : 1, transform: animating ? `translateX(${direction === 'right' ? '-2%' : '2%'})` : 'translateX(0)' }}>
            <ZoomableImage
              src={images[current]}
              alt={`${title} - ${current + 1}`}
              fallback={<ProjectImage index={projectIndex} title={title} />}
              projectIndex={projectIndex}
              title={title}
            />
          </div>

          {images.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#00e5ff] transition-all duration-200"
                style={{ background: 'rgba(4,8,16,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '8px' }}>
                <ChevronIcon dir="left" />
              </button>
              <button onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#00e5ff] transition-all duration-200"
                style={{ background: 'rgba(4,8,16,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '8px' }}>
                <ChevronIcon dir="right" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {images.map((img, i) => (
              <button key={i} onClick={() => go(i, i > current ? 'right' : 'left')}
                className="flex-shrink-0 w-14 sm:w-16 h-10 sm:h-11 overflow-hidden transition-all duration-200"
                style={{
                  border: i === current ? '2px solid #00e5ff' : '1px solid rgba(0,229,255,0.12)',
                  opacity: i === current ? 1 : 0.4,
                  borderRadius: '4px',
                }}>
                <ImageWithFallback src={img} alt={`thumb-${i}`} fallback={<ProjectImage index={projectIndex} title={title} />} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
// ✅ frontendUrl agregado al tipo ProjectView
type ProjectView = {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  githubUrl: string;
  ogImageUrl: string;
  galleryImages?: string[];
  demoUrl?: string;
  backendUrl?: string;
  frontendUrl?: string; // ✅ NUEVO
};

const DetailModal = ({ project, index, onClose }: {
  project: ProjectView; index: number; onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !galleryOpen) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, galleryOpen]);

  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages : [project.ogImageUrl];

  return (
    <>
      <div
        className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(2,4,8,0.95)', backdropFilter: 'blur(20px)' }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-3xl"
          style={{
            background: 'linear-gradient(135deg, #070e1c 0%, #040810 100%)',
            border: '1px solid rgba(0,229,255,0.15)',
            boxShadow: '0 0 100px rgba(0,229,255,0.06), 0 40px 80px rgba(0,0,0,0.7)',
            borderRadius: '12px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Imagen con zoom — altura fija */}
          <div className="w-full flex-shrink-0 relative overflow-hidden" style={{ height: 260, borderRadius: '12px 12px 0 0' }}>
            <Carousel projectIndex={index} title={project.title} ogImageUrl={project.ogImageUrl} />

            {project.category && (
              <span className="absolute top-4 left-4 z-20 font-mono text-[9px] tracking-wider uppercase px-3 py-1"
                style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00e5ff', borderRadius: '4px' }}>
                {project.category}
              </span>
            )}

            <button onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center transition-all duration-200 text-white/60 hover:text-white hover:bg-white/10"
              style={{ borderRadius: '8px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <CloseIcon />
            </button>

            <span className="absolute bottom-4 right-5 z-10 font-syne font-black text-5xl sm:text-6xl text-[#00e5ff] select-none pointer-events-none"
              style={{ opacity: 0.08 }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Contenido */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              div[data-modal-content]::-webkit-scrollbar { display: none; }
            `}</style>
            <div data-modal-content className="p-6 sm:p-8 flex flex-col gap-5">

              {/* Título centrado */}
              <div className="text-center">
                <span className="font-mono text-[10px] text-[#00e5ff]/40 tracking-wider inline-block mb-1">
                  _{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-syne font-black text-2xl sm:text-3xl text-white">
                  {project.title}
                </h3>
              </div>

              {/* Descripción */}
              <p className="text-white/50 text-sm leading-relaxed text-justify max-w-2xl mx-auto">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {project.tags.map(tag => <TechBadge key={tag} tag={tag} />)}
              </div>

              {/* Botones */}
              <div className="flex flex-wrap justify-center gap-3 pt-3 border-t border-[rgba(0,229,255,0.08)]">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-2.5 transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '6px', color: '#00e5ff', textDecoration: 'none' }}>
                    <ExternalLinkIcon />{t('projects.view_demo')}
                  </a>
                )}
                <a href={project.githubUrl || '#'} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-2.5 transition-all duration-200 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                  <GithubIcon />{t('projects.view_code')}
                </a>
                {project.backendUrl && (
                  <a href={project.backendUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-2.5 transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                    <GithubIcon />Backend
                  </a>
                )}
                {/* ✅ NUEVO: botón Frontend */}
                {project.frontendUrl && (
                  <a href={project.frontendUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-2.5 transition-all duration-200 hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
                    <GithubIcon />Frontend
                  </a>
                )}
                <button onClick={() => setGalleryOpen(true)}
                  className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider uppercase px-5 py-2.5 transition-all duration-200 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'rgba(255,255,255,0.7)' }}>
                  <ImagesIcon />{t('projects.gallery')}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {galleryOpen && (
        <GalleryModal title={project.title} images={images} projectIndex={index} onClose={() => setGalleryOpen(false)} />
      )}
    </>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Projects() {
  const { t, i18n } = useTranslation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<{ project: ProjectView; index: number } | null>(null);
  const [galleryScrolled, setGalleryScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lang = i18n.language;

  // ✅ El spread ...p ya copia frontendUrl automáticamente desde projects data
  const allItems: ProjectView[] = projects.map(p => ({
    ...p,
    title: lang === 'es' ? p.titleEs : p.titleEn,
    description: lang === 'es' ? p.descriptionEs : p.descriptionEn,
  }));

  const featuredTitles = ['TaskFlow', 'Rey Asesino', 'Eventos SMA'];
  const items = featuredTitles
    .map(t => allItems.find(p => p.title === t || projects.find(pr => pr.title === t && (lang === 'es' ? pr.titleEs : pr.titleEn) === p.title)))
    .filter(Boolean) as ProjectView[];

  const categories = ['all', ...Array.from(new Set(allItems.map(p => p.category || '')))];
  const filtered = activeFilter === 'all' ? allItems : allItems.filter(p => p.category === activeFilter);

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
    document.body.style.overflow = (galleryOpen || !!selectedProject) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [galleryOpen, selectedProject]);

  const scrollToSection = (id: string) => {
    setGalleryOpen(false);
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 320);
  };

  const goHome = () => {
    setGalleryOpen(false);
    setMenuOpen(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 320);
  };

  const toggleLang = () => i18n.changeLanguage(lang === 'es' ? 'en' : 'es');

  const featuredGradients = [
    'from-[#00e5ff]/20 to-[#1565ff]/10',
    'from-[#1565ff]/20 to-[#00e5ff]/10',
    'from-[#00e5ff]/15 to-transparent',
  ];

  return (
    <>
      <style>{`
        #gallery-scroll::-webkit-scrollbar { display: none; }
        #gallery-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* ── Featured Projects ─────────────────────────────────────────── */}
      <section id="projects" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #00e5ff, transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label">{t('projects.label')}</span>
              <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-4 sm:gap-6 justify-between">
              <h2 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl text-white">
                {t('projects.title')}
              </h2>
              <p className="text-white/40 text-xs sm:text-sm max-w-xs leading-relaxed md:text-right">
                {t('projects.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {items.map((project, i) => (
              <article
                key={i}
                onClick={() => setSelectedProject({ project, index: allItems.findIndex(p => p.title === project.title) })}
                className="glass-card flex flex-col group cursor-pointer overflow-hidden gap-0"
              >
                <div className="w-full h-40 sm:h-44 relative overflow-hidden">
                  <ImageWithFallback src={project.ogImageUrl} alt={project.title}
                    fallback={<ProjectImage index={i} title={project.title} />} />
                  <div className="absolute inset-0 flex items-end justify-center pb-3 sm:pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(2,4,8,0.85) 0%, transparent 60%)' }}>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-[#00e5ff] uppercase">
                      {t('projects.view_detail')} →
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-8 flex flex-col gap-4 sm:gap-5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-xs text-[#00e5ff]/30 tracking-wider">
                      _{String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-sm bg-gradient-to-br ${featuredGradients[i % 3]} flex items-center justify-center border border-[rgba(0,229,255,0.15)]`}>
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 border border-[#00e5ff]/50 rotate-45" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-syne font-bold text-base sm:text-xl text-white mb-2 sm:mb-3 text-center group-hover:text-[#00e5ff] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs sm:text-sm leading-relaxed text-justify line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                    {project.tags.map(tag => <TechBadge key={tag} tag={tag} />)}
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 border-t border-[rgba(0,229,255,0.08)] justify-center">
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                        <ExternalLinkIcon />{t('projects.view_demo')}
                      </a>
                    )}
                    <a href={project.githubUrl || '#'} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                      <GithubIcon />{t('projects.view_code')}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-10 sm:mt-14">
            <button
              onClick={() => { setGalleryOpen(true); setActiveFilter('all'); setGalleryScrolled(false); }}
              className="group relative flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs tracking-wider uppercase px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.6)' }}>
              <GridIcon />
              {t('projects.view_all')}
              <span className="text-[#00e5ff]/40 text-[10px]">({allItems.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Full Gallery overlay ──────────────────────────────────────── */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[150] flex flex-col" style={{ background: '#020408' }}>
          <header className={`fixed top-0 left-0 right-0 z-[160] transition-all duration-500 ${
            galleryScrolled
              ? 'bg-[#020408]/80 backdrop-blur-xl border-b border-[rgba(0,229,255,0.06)]'
              : 'bg-transparent border-b border-transparent'
          }`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
              <button onClick={goHome} className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
                <img src="/logo.png" alt="Symmetrical Code"
                  className="h-7 sm:h-8 w-auto transition-all duration-300 group-hover:opacity-80" />
                <span className="hidden sm:block font-syne font-bold text-sm tracking-wide text-white/60 group-hover:text-white transition-colors">
                  Symmetrical<span className="text-[#00e5ff]">Code</span>
                </span>
              </button>

              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => scrollToSection(link.id)}
                    className={`font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                      link.id === 'projects' ? 'text-[#00e5ff]' : 'text-white/40 hover:text-white'
                    }`}>
                    {t(link.key)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <button onClick={toggleLang}
                  className="font-mono text-[10px] sm:text-xs tracking-wider border border-[rgba(0,229,255,0.2)] text-[#00e5ff]/60 hover:text-[#00e5ff] hover:border-[#00e5ff]/40 px-2.5 sm:px-3 py-1 sm:py-1.5 transition-all duration-200 rounded">
                  {lang === 'es' ? 'EN' : 'ES'}
                </button>
                <button onClick={() => setGalleryOpen(false)}
                  className="hidden md:flex items-center gap-2 font-mono text-xs text-white/40 hover:text-[#00e5ff] transition-colors">
                  <ArrowLeftIcon />{t('projects.back')}
                </button>
                <button onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
                  <span className={`block w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
              </div>
            </nav>

            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
              <div className="bg-[#020408]/95 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)] px-4 sm:px-6 py-4 flex flex-col gap-4">
                {navLinks.map(link => (
                  <button key={link.id} onClick={() => scrollToSection(link.id)}
                    className="font-mono text-xs tracking-wider uppercase text-white/60 hover:text-[#00e5ff] text-left transition-colors">
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

          <div id="gallery-scroll" className="flex-1 overflow-y-auto pt-14 sm:pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-3 sm:pb-4">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="section-label">{t('projects.gallery_label')}</span>
                <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
              </div>
              <h3 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white text-center">
                {t('projects.gallery_title')}
              </h3>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap" style={{ scrollbarWidth: 'none' }}>
                {categories.filter(Boolean).map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)}
                    className={`font-mono text-[9px] sm:text-[10px] tracking-wider uppercase whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
                      activeFilter === cat
                        ? 'text-[#00e5ff] border-b border-[#00e5ff]'
                        : 'text-white/40 hover:text-white border-b border-transparent'
                    }`}>
                    {cat === 'all' ? t('projects.filter_all') : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((project, i) => {
                  const globalIndex = allItems.findIndex(p => p.title === project.title);
                  return (
                    <article key={i}
                      onClick={() => setSelectedProject({ project, index: globalIndex })}
                      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,229,255,0.06)', borderRadius: '6px' }}>
                      <div className="w-full h-36 sm:h-40 relative overflow-hidden">
                        <ImageWithFallback src={project.ogImageUrl} alt={project.title}
                          fallback={<ProjectImage index={globalIndex} title={project.title} />} />
                        <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to top, rgba(2,4,8,0.85) 0%, transparent 60%)' }}>
                          <span className="font-mono text-[9px] tracking-wider text-[#00e5ff] uppercase">
                            {t('projects.view_detail')} →
                          </span>
                        </div>
                        {project.category && (
                          <span className="absolute top-2 right-2 font-mono text-[7px] sm:text-[8px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5"
                            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', color: '#00e5ff', borderRadius: '2px' }}>
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                        <span className="font-mono text-[9px] text-[#00e5ff]/30 tracking-wider text-center">
                          _{String(globalIndex + 1).padStart(2, '0')}
                        </span>
                        <h4 className="font-syne font-bold text-sm sm:text-base text-white text-center group-hover:text-[#00e5ff] transition-colors duration-300">
                          {project.title}
                        </h4>
                        <p className="text-white/40 text-[11px] sm:text-xs leading-relaxed text-justify line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-2 border-t border-[rgba(0,229,255,0.06)] justify-center">
                          {project.tags.map(tag => <TechBadgeSm key={tag} tag={tag} />)}
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

      {/* ── Detail Modal ────────────────────────────────────────────────── */}
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