import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const technologies = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'MATLAB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg' },
  { name: 'Android Studio', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
  { name: 'Netlify', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  {
    name: 'Render',
    svgIcon: (
      <svg width="52" height="10" viewBox="0 0 110 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M38.1801 3.45902C41.7067 3.45902 43.9994 5.45905 43.9994 8.67133C43.9994 11.0232 42.6512 12.7708 40.5375 13.5165L44.6811 20.6218H41.6077L37.7421 13.8798H33.4728V20.6218H30.8259V3.45902H38.1801ZM33.469 5.84911V11.5165H38.0544C40.1567 11.5165 41.2421 10.3387 41.2421 8.67133C41.2421 6.96576 40.1605 5.84911 38.0544 5.84911H33.469Z" />
        <path d="M51.4145 8.22773C54.9412 8.22773 57.2339 10.8587 57.2339 14.1093C57.2339 14.4878 57.2073 14.8817 57.1349 15.2718H47.7508C47.865 17.0921 49.4151 18.5223 51.506 18.5223C53.0179 18.5223 54.2252 17.876 55.1316 16.4496L56.9711 17.7919C55.8514 19.8149 53.6463 20.878 51.506 20.878C47.8536 20.878 45.1686 18.1705 45.1686 14.5682C45.1686 10.9467 47.7508 8.22773 51.4145 8.22773ZM54.7013 13.398C54.5489 11.6924 53.1284 10.4878 51.3879 10.4878C49.537 10.4878 48.124 11.6886 47.8117 13.398H54.7013Z" />
        <path d="M59.5495 20.6218V8.48012H62.0555V10.0098C62.4592 9.39027 63.6055 8.22773 65.7725 8.22773C69.0973 8.22773 70.8492 10.3004 70.8492 13.2488V20.6218H68.3547V13.7804C68.3547 11.7689 67.2578 10.6063 65.3803 10.6063C63.5408 10.6063 62.044 11.7689 62.044 13.7804V20.6218H59.5495Z" />
        <path d="M78.9766 8.22773C81.0293 8.22773 82.389 8.98491 83.284 10.136V2.81274H85.7785V20.6218H83.284V18.9659C82.389 20.117 81.0293 20.8742 78.9766 20.8742C75.5375 20.8742 72.9058 18.2164 72.9058 14.4878C72.9058 10.7555 75.5375 8.22773 78.9766 8.22773ZM75.3966 14.4878C75.3966 16.725 76.9466 18.6217 79.2774 18.6217C81.6082 18.6217 83.2687 16.725 83.2687 14.4878C83.2687 12.2507 81.593 10.4801 79.2774 10.4801C76.9466 10.4763 75.3966 12.2469 75.3966 14.4878Z" />
        <path d="M94.1382 8.22773C97.6648 8.22773 99.9575 10.8587 99.9575 14.1093C99.9575 14.4878 99.9309 14.8817 99.8585 15.2718H90.4744C90.5886 17.0921 92.1387 18.5223 94.2295 18.5223C95.7415 18.5223 96.9488 17.876 97.8552 16.4496L99.6947 17.7919C98.575 19.8149 96.3699 20.878 94.2295 20.878C90.5772 20.878 87.8922 18.1705 87.8922 14.5682C87.8884 10.9467 90.4706 8.22773 94.1382 8.22773ZM97.4249 13.398C97.2725 11.6924 95.852 10.4878 94.1115 10.4878C92.2606 10.4878 90.8476 11.6886 90.5353 13.398H97.4249Z" />
        <path d="M102.368 20.6218V8.48012H104.874V10.136C105.556 8.809 106.702 8.22773 108.024 8.22773C108.968 8.22773 109.688 8.52983 109.688 8.52983L109.425 10.832C109.288 10.7823 108.744 10.5528 107.952 10.5528C106.615 10.5528 104.878 11.2603 104.878 14.006V20.6218H102.368Z" />
        <path d="M15.6491 0.00582604C12.9679 -0.120371 10.7133 1.81847 10.3286 4.373C10.3134 4.49154 10.2905 4.60627 10.2715 4.72099C9.67356 7.90268 6.88955 10.3119 3.5457 10.3119C2.35364 10.3119 1.23395 10.006 0.258977 9.47058C0.140914 9.40557 0 9.4897 0 9.62354V10.3081V20.6218H10.2677V12.8894C10.2677 11.4668 11.4178 10.3119 12.8346 10.3119H15.4015C18.3074 10.3119 20.6458 7.89121 20.5315 4.94662C20.4287 2.29649 18.2884 0.132023 15.6491 0.00582604Z" />
      </svg>
    ),
  },
];

// Duplicar tecnologías para efecto infinito
const duplicatedTechnologies = [...technologies, ...technologies, ...technologies];

// ── Tech Card Component (Mismo estilo que tu diseño original) ─────────────────
const TechCard = ({ tech, isHovered }: { tech: typeof technologies[0]; isHovered: boolean }) => {
  const getIconFilter = (name: string, hovered: boolean) => {
    if (name === 'GitHub' || name === 'Vercel') {
      if (hovered) {
        return 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(0,229,255,0.35))';
      }
      return 'brightness(0) invert(1)';
    }
    
    if (name === 'Adobe XD') {
      if (hovered) {
        return 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(0,229,255,0.35))';
      }
      return 'brightness(0) invert(1)';
    }
    
    if (name === 'Netlify') {
      if (hovered) {
        return 'brightness(1.8) saturate(1.8) drop-shadow(0 0 12px rgba(0,229,255,0.5))';
      }
      return 'brightness(1.5) saturate(1.6)';
    }
    
    if (hovered) {
      return 'brightness(1) saturate(1) drop-shadow(0 0 8px rgba(0,229,255,0.35))';
    }
    
    return 'brightness(0.7) saturate(0.75)';
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden cursor-default bg-[var(--card-bg)] rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{ aspectRatio: '1 / 1' }}
    >
      {/* Corner accent on hover */}
      <div
        className="absolute top-0 right-0 w-10 h-10 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'linear-gradient(225deg, rgba(0,229,255,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Corner brackets */}
      <div
        className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l transition-opacity duration-300"
        style={{ borderColor: '#00e5ff', opacity: isHovered ? 0.7 : 0 }}
      />
      <div
        className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r transition-opacity duration-300"
        style={{ borderColor: '#00e5ff', opacity: isHovered ? 0.7 : 0 }}
      />

      {/* Icon */}
      <div
        className="flex items-center justify-center transition-all duration-300"
        style={{
          transform: isHovered ? 'translateY(-6px) scale(1.12)' : 'translateY(0) scale(1)',
        }}
      >
        {tech.svgIcon ? (
          <div
            className="transition-all duration-300"
            style={{
              color: isHovered ? '#00e5ff' : '#ffffff',
              filter: isHovered ? 'drop-shadow(0 0 8px rgba(0,229,255,0.35))' : 'none',
            }}
          >
            {tech.svgIcon}
          </div>
        ) : (
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain transition-all duration-300"
            style={{
              filter: getIconFilter(tech.name, isHovered),
            }}
          />
        )}
      </div>

      {/* Name tooltip */}
      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-2 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
        }}
      >
        <span
          className="font-mono text-[7px] sm:text-[8px] md:text-[8px] tracking-widest text-center leading-tight px-1 truncate w-full text-center"
          style={{ color: '#00e5ff', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}
        >
          {tech.name}
        </span>
      </div>

      {/* Bottom cyan line sweep */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-500"
        style={{
          width: isHovered ? '100%' : '0%',
          background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.7), transparent)',
        }}
      />
    </div>
  );
};

// ── Main Export con Carrusel Responsivo ───────────────────────────────────────
export default function Technologies() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollSpeed = 0.6;

  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      if (carouselRef.current && !isPaused) {
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 3) {
          carouselRef.current.scrollLeft = carouselRef.current.scrollLeft - carouselRef.current.scrollWidth / 3;
        } else {
          carouselRef.current.scrollLeft += scrollSpeed;
        }
      }
      if (running) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const [cardWidth, setCardWidth] = useState('90px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardWidth('75px');
      else if (window.innerWidth < 768) setCardWidth('85px');
      else setCardWidth('95px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="technologies" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Right glow accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #1565ff, transparent)' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header - responsivo */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="section-label text-[10px] sm:text-xs">{t('technologies.label')}</span>
            <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end gap-4 sm:gap-6 justify-between">
            <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              {t('technologies.title')}
            </h2>
            <p className="text-white/40 text-[11px] sm:text-xs md:text-sm max-w-xs leading-relaxed md:text-right">
              {t('technologies.subtitle')}
            </p>
          </div>
        </div>

        {/* Carrusel Responsivo */}
        <div
          ref={carouselRef}
          className="flex gap-2 sm:gap-3 overflow-x-auto cursor-grab active:cursor-grabbing pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {duplicatedTechnologies.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-all duration-300"
              style={{ width: cardWidth }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 500)}
            >
              <TechCard tech={tech} isHovered={hoveredIndex === index} />
            </div>
          ))}
        </div>

        {/* Indicador responsivo */}
        <div className="text-center mt-6 sm:mt-8 md:mt-8">
          <p 
            className="text-white/25 text-[8px] sm:text-[9px] md:text-[10px] tracking-[1px] sm:tracking-[2px] uppercase font-mono"
          >
            ← DESLIZA O PASA EL MOUSE PARA PAUSAR →
          </p>
        </div>
      </div>

    </section>
  );
}