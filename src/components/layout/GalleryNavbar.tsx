import { useTranslation } from 'react-i18next';

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default function GalleryNavbar({ 
  scrolled, 
  onClose, 
  onNavigate,
  activeSection 
}: { 
  scrolled: boolean; 
  onClose: () => void;
  onNavigate: (id: string) => void;
  activeSection: string;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const navLinks = [
    { key: 'nav.home', id: 'home' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[160] transition-all duration-500 ${
      scrolled
        ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-[rgba(0,229,255,0.1)] shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
        : 'bg-[#020408] border-b border-white/5'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Left: Volver Button (Prominent) */}
        <button 
          onClick={onClose}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#00e5ff] hover:text-[#020408] hover:border-[#00e5ff] transition-all duration-300 group shadow-lg"
        >
          <ArrowLeftIcon />
          <span className="font-mono text-xs font-bold tracking-widest uppercase">
            {t('projects.back')}
          </span>
        </button>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <button 
              key={link.id} 
              onClick={() => onNavigate(link.id)}
              className={`font-mono text-[13px] tracking-[0.15em] uppercase transition-all duration-200 ${
                link.id === activeSection ? 'text-[#00e5ff]' : 'text-white/40 hover:text-white'
              }`}
            >
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
            className="font-mono text-xs tracking-wider border border-white/10 text-white/40 hover:text-[#00e5ff] hover:border-[#00e5ff]/40 px-3 py-1.5 transition-all duration-200 rounded-md"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </nav>

      {/* Bottom gradient line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #00e5ff, #00e5ff, transparent)',
      }} />
    </header>
  );
}