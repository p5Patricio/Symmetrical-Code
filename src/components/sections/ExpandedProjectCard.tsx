import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TechIcon from './TechIcon';
import type { Project } from '../../data/projects';

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

const ChevronIcon = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    {dir === 'left'
      ? <polyline points="15 18 9 12 15 6" />
      : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

interface ExpandedProjectCardProps {
  project: Project;
  onClose: () => void;
}

export default function ExpandedProjectCard({ project, onClose }: ExpandedProjectCardProps) {
  const { t, i18n } = useTranslation();
  const [imgFailed, setImgFailed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const description = i18n.language === 'es' ? project.descriptionEs : project.descriptionEn;

  const slides = imgFailed
    ? ['/placeholder-project.png']
    : [project.ogImageUrl];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div
      className="col-span-full w-full"
      style={{
        background: 'linear-gradient(135deg, #070e1c 0%, #040810 100%)',
        border: '1px solid rgba(0,229,255,0.18)',
        boxShadow: '0 0 100px rgba(0,229,255,0.06), 0 40px 80px rgba(0,0,0,0.7)',
      }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* ── Carousel (Left on desktop, Top on mobile) ── */}
        <div className="relative w-full lg:w-[55%] h-64 md:h-80 lg:h-[28rem] overflow-hidden bg-[#020408]">
          <img
            src={slides[currentSlide]}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #040810 0%, transparent 55%)' }} />

          {/* Carousel controls */}
          {slides.length > 1 && (
            <>
              <button onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-[#00e5ff]"
                style={{ background: 'rgba(2,4,8,0.7)', border: '1px solid rgba(0,229,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <ChevronIcon dir="left" />
              </button>
              <button onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 text-white/60 hover:text-[#00e5ff]"
                style={{ background: 'rgba(2,4,8,0.7)', border: '1px solid rgba(0,229,255,0.2)', backdropFilter: 'blur(8px)' }}>
                <ChevronIcon dir="right" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === currentSlide ? '20px' : '6px',
                      height: '6px',
                      background: i === currentSlide ? '#00e5ff' : 'rgba(0,229,255,0.3)',
                      border: 'none',
                      outline: 'none',
                    }} />
                ))}
              </div>
            </>
          )}

          <span className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-widest uppercase px-3 py-1"
            style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff' }}>
            {project.category}
          </span>
        </div>

        {/* ── Details (Right on desktop, Bottom on mobile) ── */}
        <div className="w-full lg:w-[45%] p-6 md:p-8 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#00e5ff]/40 tracking-widest">
                {project.category?.toUpperCase()}
              </span>
              <h3 className="font-syne font-black text-2xl md:text-3xl text-white mt-1">
                {project.title}
              </h3>
            </div>
            <button onClick={onClose}
              className="p-2 transition-colors text-white/50 hover:text-[#00e5ff]"
              style={{ background: 'rgba(2,4,8,0.75)', border: '1px solid rgba(0,229,255,0.2)' }}>
              <CloseIcon />
            </button>
          </div>

          <p className="text-white/50 text-sm leading-relaxed flex-1">
            {description}
          </p>

          {/* Tags with icons */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag}
                className="flex items-center gap-2 font-mono text-xs px-3 py-1.5"
                style={{ color: 'rgba(0,229,255,0.85)', border: '1px solid rgba(0,229,255,0.25)', background: 'rgba(0,229,255,0.06)' }}>
                <TechIcon name={tag} size={14} color="rgba(0,229,255,0.85)" />
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-2.5"
                style={{ textDecoration: 'none' }}>
                <ExternalLinkIcon />{t('projects.view_demo')}
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-2.5"
              style={{ textDecoration: 'none' }}>
              <GithubIcon />{t('projects.view_code')}
            </a>
            {project.backendUrl && (
              <a href={project.backendUrl} target="_blank" rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-2.5"
                style={{ textDecoration: 'none' }}>
                <GithubIcon />Backend
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
