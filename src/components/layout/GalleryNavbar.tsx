import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSun, FiMoon } from 'react-icons/fi';
import ContactModal from './ContactModal';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleScrollClose = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { key: 'nav.home', id: 'home' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
  ];

  // Misma clase de tamaño de letra que el Navbar principal
  const navLinkTextClass = 'text-[11px] lg:text-[12px]';

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const openContact = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[160] transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-[rgba(0,229,255,0.1)] shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
          : 'bg-black/80 backdrop-blur-sm border-b border-white/5'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: Volver Button */}
          <button 
            onClick={handleClose}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#195fc1] hover:text-white hover:border-[#195fc1] transition-all duration-300 group shadow-lg shrink-0"
          >
            <ArrowLeftIcon />
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              {t('projects.back')}
            </span>
          </button>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-1.5 py-1 border border-white/10 shadow-lg absolute left-1/2 -translate-x-1/2">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => handleNavigate(link.id)}
                className={`relative font-mono ${navLinkTextClass} tracking-[0.15em] uppercase px-3 lg:px-4 py-1.5 rounded-full transition-all duration-200 ${
                  link.id === activeSection 
                    ? 'text-[#195fc1]' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(link.key)}
                {link.id === activeSection && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#195fc1] rounded-full" />
                )}
              </button>
            ))}

            {/* Contacto */}
            <button
              onClick={openContact}
              className={`relative font-mono ${navLinkTextClass} tracking-[0.15em] uppercase px-3 lg:px-4 py-1.5 rounded-full transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10`}
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Right: Controls + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-white/[0.08] hover:border-[#195fc1]/50 bg-white/[0.02] hover:bg-[#195fc1]/10 text-white/80 hover:text-[#195fc1] transition-all duration-300 cursor-pointer"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? <FiSun size={13} /> : <FiMoon size={13} />}
            </button>

            <button 
              onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
              className="font-mono text-[10px] sm:text-xs tracking-wider border border-[rgba(25,95,193,0.4)] text-[#195fc1] hover:border-[#195fc1] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-200"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none z-50"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {!menuOpen ? (
                <div className="flex flex-col items-center gap-1.5">
                  <span className="block w-5 h-0.5 bg-[#195fc1] rounded-full transition-all duration-300" />
                  <span className="block w-5 h-0.5 bg-[#195fc1] rounded-full transition-all duration-300" />
                  <span className="block w-5 h-0.5 bg-[#195fc1] rounded-full transition-all duration-300" />
                </div>
              ) : (
                <div className="relative w-5 h-5">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-[#195fc1] rounded-full -translate-y-1/2 rotate-45 transition-all duration-300" />
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-[#195fc1] rounded-full -translate-y-1/2 -rotate-45 transition-all duration-300" />
                </div>
              )}
            </button>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#195fc1]/40 to-transparent" />
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-[150] transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`flex flex-col items-center justify-center h-full gap-5 transform transition-all duration-500 ${
            menuOpen ? 'translate-y-0' : 'translate-y-8'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Symmetrical Code"
              className="h-16 w-auto mb-3 drop-shadow-[0_0_20px_rgba(25,95,193,0.4)]"
            />
            <span className="font-syne font-bold text-lg tracking-wide text-white">
              Symmetrical<span className="text-[#195fc1]">Code</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 w-full max-w-[220px]">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`w-full text-center font-mono text-sm tracking-[0.15em] uppercase py-3 px-6 rounded-full transition-all duration-300 ${
                  link.id === activeSection
                    ? 'text-[#195fc1] bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                {t(link.key)}
              </button>
            ))}

            {/* Contacto */}
            <button
              onClick={openContact}
              className="w-full text-center font-mono text-sm tracking-[0.15em] uppercase py-3 px-6 rounded-full transition-all duration-300 text-white/60 hover:text-white hover:bg-white/10"
            >
              {t('nav.contact')}
            </button>
          </div>

          <div className="w-12 h-px bg-white/20 my-4" />

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 font-mono text-xs tracking-wider border border-white/[0.1] text-white/80 hover:text-[#195fc1] px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
            >
              {theme === 'dark' ? <><FiSun size={13} /> <span>CLARO</span></> : <><FiMoon size={13} /> <span>OSCURO</span></>}
            </button>

            <button
              onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
              className="font-mono text-sm tracking-widest border border-[rgba(25,95,193,0.4)] text-[#195fc1] hover:bg-[#195fc1]/15 px-6 py-2 rounded-full transition-all duration-200"
            >
              {lang === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
            </button>
          </div>

          <p className="absolute bottom-8 text-[10px] font-mono text-white/20 tracking-wider">
            Symmetrical Code 2026
          </p>
        </div>
      </div>

      {/* Modal de contacto */}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}