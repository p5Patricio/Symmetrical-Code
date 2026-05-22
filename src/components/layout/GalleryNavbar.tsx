import { useState, useEffect } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScrollClose = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [menuOpen]);

  // Bloquear scroll del body cuando el menú está abierto
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

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
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
            onClick={onClose}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#00e5ff] hover:text-black hover:border-[#00e5ff] transition-all duration-300 group shadow-lg shrink-0"
          >
            <ArrowLeftIcon />
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              {t('projects.back')}
            </span>
          </button>

          {/* Center: Desktop Nav - CENTRADO ABSOLUTAMENTE */}
          <div className="hidden lg:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-1.5 py-1 border border-white/10 shadow-lg absolute left-1/2 -translate-x-1/2">
            {navLinks.map(link => (
              <button 
                key={link.id} 
                onClick={() => handleNavigate(link.id)}
                className={`relative font-mono text-[11px] tracking-[0.15em] uppercase px-3 lg:px-4 py-1.5 rounded-full transition-all duration-200 ${
                  link.id === activeSection 
                    ? 'text-[#00e5ff]' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(link.key)}
                {/* Línea de subrayado para el elemento activo */}
                {link.id === activeSection && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#00e5ff] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Controls + MENÚ HAMBURGUESA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
              className="font-mono text-[10px] sm:text-xs tracking-wider border border-[rgba(0,229,255,0.3)] text-[#00e5ff]/80 hover:text-[#00e5ff] hover:border-[#00e5ff] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-200"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {/* MENÚ HAMBURGUESA */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none z-50"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {!menuOpen ? (
                <div className="flex flex-col items-center gap-1.5">
                  <span className="block w-5 h-0.5 bg-[#00e5ff] rounded-full transition-all duration-300" />
                  <span className="block w-5 h-0.5 bg-[#00e5ff] rounded-full transition-all duration-300" />
                  <span className="block w-5 h-0.5 bg-[#00e5ff] rounded-full transition-all duration-300" />
                </div>
              ) : (
                <div className="relative w-5 h-5">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-[#00e5ff] rounded-full -translate-y-1/2 rotate-45 transition-all duration-300" />
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-[#00e5ff] rounded-full -translate-y-1/2 -rotate-45 transition-all duration-300" />
                </div>
              )}
            </button>
          </div>
        </nav>

        {/* Bottom gradient line más sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/30 to-transparent" />
      </header>

      {/* Mobile Menu - OVERLAY COMPLETO */}
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
          {/* Logo en el menú */}
          <div className="mb-6 flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Symmetrical Code"
              className="h-16 w-auto mb-3 drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            />
            <span className="font-syne font-bold text-lg tracking-wide text-white">
              Symmetrical<span className="text-[#00e5ff]">Code</span>
            </span>
          </div>

          {/* Enlaces del menú móvil */}
          <div className="flex flex-col items-center gap-2 w-full max-w-[220px]">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`w-full text-center font-mono text-sm tracking-[0.15em] uppercase py-3 px-6 rounded-full transition-all duration-300 ${
                  link.id === activeSection
                    ? 'text-[#00e5ff] bg-white/5'
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
          </div>

          {/* Separador */}
          <div className="w-12 h-px bg-white/20 my-4" />

          {/* Botón de idioma en menú móvil */}
          <button
            onClick={() => i18n.changeLanguage(lang === 'es' ? 'en' : 'es')}
            className="font-mono text-sm tracking-widest border border-[rgba(0,229,255,0.4)] text-[#00e5ff] hover:bg-[#00e5ff]/10 px-6 py-2 rounded-full transition-all duration-200"
          >
            {lang === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
          </button>

          {/* Texto decorativo */}
          <p className="absolute bottom-8 text-[10px] font-mono text-white/20 tracking-wider">
            Symmetrical Code 2026
          </p>
        </div>
      </div>
    </>
  );
}