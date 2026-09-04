import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isHome) {
        const sections = ['footer', 'team', 'projects', 'services', 'home'];
        for (const id of sections) {
          const el = document.getElementById(id) || (id === 'footer' ? document.querySelector('footer') : null);
          if (el && window.scrollY >= el.offsetTop - 180) {
            setActiveSection(id);
            return;
          }
        }
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScrollClose = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
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

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    const scrollTarget = () => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (id === 'footer') {
        const el = document.getElementById('footer') || document.querySelector('footer');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    if (isHome) {
      scrollTarget();
    } else {
      navigate('/');
      setTimeout(scrollTarget, 150);
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const navLinks = [
    { key: 'nav.home', id: 'home' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
    { key: 'nav.contact', id: 'footer' },
  ];

  return (
    <>
      {/* ─── Floating Pill Navbar Container ─── */}
      <header
        className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-5xl z-50 transition-all duration-500 pointer-events-none"
      >
        <div
          className={`pointer-events-auto relative rounded-full border transition-all duration-500 ease-out px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled ? 'shadow-[0_12px_36px_rgba(0,0,0,0.5)]' : 'shadow-[0_8px_24px_rgba(0,0,0,0.3)]'
          }`}
          style={{
            background: scrolled
              ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(2, 4, 8, 0.75) 100%)'
              : 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(2, 4, 8, 0.55) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)',
            boxShadow:
              'inset 0 1px 1px 0 rgba(255, 255, 255, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.03)',
          }}
        >
          {/* Specular Liquid Glass Top Sheen */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Logo (Izquierda) */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group shrink-0 cursor-pointer bg-transparent border-0 p-0"
          >
            <img
              src="/favicon.svg"
              alt="Symmetrical Code"
              className="h-7 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:inline font-syne font-bold text-xs sm:text-sm tracking-tight text-white/90 group-hover:text-white transition-colors">
              Symmetrical<span className="text-[#195fc1]">Code</span>
            </span>
          </button>

          {/* Nav Links (Centro - Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative font-mono text-[11px] lg:text-xs tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/[0.08] border border-white/[0.18] font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {t(link.key)}
                </button>
              );
            })}
          </nav>

          {/* Controls (Derecha) */}
          <div className="flex items-center gap-2.5 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-white/[0.08] hover:border-[#195fc1]/50 bg-white/[0.02] hover:bg-[#195fc1]/10 text-white/80 hover:text-[#195fc1] transition-all duration-300 cursor-pointer"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? <FiSun className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> : <FiMoon className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
            </button>

            <button
              onClick={toggleLang}
              className="font-mono text-xs sm:text-[11px] font-medium tracking-wider border border-white/[0.08] hover:border-white/[0.25] bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white px-3.5 sm:px-3 py-1.5 sm:py-1 rounded-full transition-all duration-200 cursor-pointer"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Hamburger Button (Mobile) - 3 lines */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center focus:outline-none cursor-pointer rounded-full border border-white/[0.08] hover:border-[#195fc1]/50 bg-white/[0.02] hover:bg-[#195fc1]/10 text-white/80 hover:text-[#195fc1] transition-all duration-300"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {!menuOpen ? (
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="block w-4 h-0.5 rounded-full transition-colors" style={{ backgroundColor: theme === 'light' ? '#0B132B' : 'rgba(255, 255, 255, 0.85)' }} />
                  <span className="block w-4 h-0.5 rounded-full transition-colors" style={{ backgroundColor: theme === 'light' ? '#0B132B' : 'rgba(255, 255, 255, 0.85)' }} />
                  <span className="block w-4 h-0.5 rounded-full transition-colors" style={{ backgroundColor: theme === 'light' ? '#0B132B' : 'rgba(255, 255, 255, 0.85)' }} />
                </div>
              ) : (
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <span className="absolute w-4 h-0.5 rounded-full rotate-45 transition-colors" style={{ backgroundColor: theme === 'light' ? '#0B132B' : 'rgba(255, 255, 255, 0.85)' }} />
                  <span className="absolute w-4 h-0.5 rounded-full -rotate-45 transition-colors" style={{ backgroundColor: theme === 'light' ? '#0B132B' : 'rgba(255, 255, 255, 0.85)' }} />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Drawer (Floating Liquid Glass Card) ─── */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-40 ${theme === 'light' ? 'bg-slate-900/40' : 'bg-black/60'} backdrop-blur-md md:hidden flex items-start justify-center pt-24 px-4 transition-opacity duration-300`}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`w-full max-w-sm rounded-3xl border ${theme === 'light' ? 'border-[#195fc1]/20' : 'border-white/[0.1]'} p-6 flex flex-col items-center gap-4 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-fade-in`}
            style={{
              background: theme === 'light'
                ? 'linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(245, 247, 251, 0.94) 100%)'
                : 'linear-gradient(165deg, rgba(255, 255, 255, 0.05) 0%, rgba(2, 4, 8, 0.9) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              boxShadow: theme === 'light'
                ? '0 20px 50px rgba(25, 95, 193, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)'
                : '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full py-3 px-5 rounded-xl font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#195fc1] bg-[#195fc1]/15 border border-[#195fc1]/30 font-semibold'
                      : theme === 'light'
                        ? 'text-[#334155] hover:text-[#0B132B] hover:bg-slate-100/80 border border-transparent'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {t(link.key)}
                </button>
              );
            })}

            <div className={`w-12 h-px ${theme === 'light' ? 'bg-[#195fc1]/15' : 'bg-white/[0.08]'} my-1`} />

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 font-mono text-xs tracking-wider border ${theme === 'light' ? 'border-[#195fc1]/20 bg-white text-[#334155] hover:text-[#195fc1]' : 'border-white/[0.1] text-white/80 hover:text-[#195fc1] bg-transparent'} px-4 py-2 rounded-full transition-all duration-200 cursor-pointer`}
              >
                {theme === 'dark' ? <><FiSun size={13} /> <span>CLARO</span></> : <><FiMoon size={13} /> <span>OSCURO</span></>}
              </button>

              <button
                onClick={toggleLang}
                className={`font-mono text-xs tracking-widest border ${theme === 'light' ? 'border-[#195fc1]/20 bg-white text-[#334155] hover:text-[#195fc1]' : 'border-white/[0.1] text-white/80 hover:text-[#195fc1] bg-transparent'} px-5 py-2 rounded-full transition-all duration-200 cursor-pointer`}
              >
                {i18n.language === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}