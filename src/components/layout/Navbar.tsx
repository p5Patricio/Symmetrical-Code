import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['team', 'projects', 'services', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { key: 'nav.home', id: 'home' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-[rgba(0,229,255,0.1)]'
            : 'bg-black/80 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo - izquierda */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <img
              src="/logo.png"
              alt="Symmetrical Code"
              className="h-7 sm:h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]"
            />
            <span className="hidden sm:block font-syne font-bold text-sm tracking-wide text-white/80 group-hover:text-white transition-colors">
              Symmetrical<span className="text-[#00e5ff]">Code</span>
            </span>
          </button>

          {/* Desktop Nav - CENTRADO ABSOLUTAMENTE */}
          <div className="hidden lg:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-1.5 py-1 border border-white/10 shadow-lg absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative font-mono text-[11px] lg:text-[12px] tracking-[0.15em] uppercase px-3 lg:px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-[#00e5ff]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(link.key)}
                {/* Línea de subrayado para el elemento activo */}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#00e5ff] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Controls - derecha */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLang}
              className="font-mono text-[10px] sm:text-xs tracking-widest border border-[rgba(0,229,255,0.3)] text-[#00e5ff]/80 hover:text-[#00e5ff] hover:border-[#00e5ff] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-200"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
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

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent" />
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 lg:hidden ${
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
                onClick={() => scrollTo(link.id)}
                className={`w-full text-center font-mono text-sm tracking-[0.15em] uppercase py-3 px-6 rounded-full transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-[#00e5ff] bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(link.key)}
              </button>
            ))}
          </div>

          {/* Separador */}
          <div className="w-12 h-px bg-white/20 my-4" />

          {/* Botón de idioma en menú móvil */}
          <button
            onClick={toggleLang}
            className="font-mono text-sm tracking-widest border border-[rgba(0,229,255,0.4)] text-[#00e5ff] hover:bg-[#00e5ff]/10 px-6 py-2 rounded-full transition-all duration-200"
          >
            {i18n.language === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
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