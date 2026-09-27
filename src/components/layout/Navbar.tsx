import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import IconSun from '~icons/lucide/sun';
import IconMoon from '~icons/lucide/moon';
import IconMenu from '~icons/lucide/menu';
import IconX from '~icons/lucide/x';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const whatsappUrl = 'https://wa.me/524737374224';

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
      setScrolled(window.scrollY > 8);

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

    handleScroll();
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

  // Esc closes the mobile sheet.
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Move focus into the sheet on open, return it to the toggle button on close.
  const sheetRef = useRef<HTMLDivElement>(null);
  const wasMenuOpenRef = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      wasMenuOpenRef.current = true;
      // The sheet is already committed to the DOM by the time this effect
      // runs, so focus can move synchronously — no need to wait a frame
      // (which also never fires while the tab is backgrounded).
      sheetRef.current?.querySelector<HTMLElement>('button, a')?.focus();
      return;
    }
    if (wasMenuOpenRef.current) {
      wasMenuOpenRef.current = false;
      document.getElementById('nav-menu-toggle')?.focus();
    }
  }, [menuOpen]);

  const isEs = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('es');

  const toggleLang = () => {
    i18n.changeLanguage(isEs ? 'en' : 'es');
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
      {/* ─── Clean top bar — flat surface, hairline border after scroll ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center transition-[border-color] duration-300 bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-[8px] border-b ${
          scrolled ? 'border-line' : 'border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo (left) */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer bg-transparent border-0 p-0"
          >
            <img src="/favicon.svg" alt="Symmetrical Code" className="h-7 w-auto" />
            <span className="hidden sm:inline font-syne font-bold text-sm tracking-tight text-text">
              Symmetrical<span className="text-accent-blue">Code</span>
            </span>
          </button>

          {/* Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative font-sans text-sm py-2 transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {t(link.key)}
                  <span
                    className={`absolute left-0 bottom-0 h-px w-full bg-accent-blue transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          {/* Controls (right) */}
          <div className="flex items-center gap-2">
            <Button
              variant="icon"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('nav.theme_to_light') : t('nav.theme_to_dark')}
              title={theme === 'dark' ? t('nav.theme_to_light') : t('nav.theme_to_dark')}
            >
              {theme === 'dark' ? <IconSun width={15} height={15} /> : <IconMoon width={15} height={15} />}
            </Button>

            <Button
              variant="icon"
              size="sm"
              onClick={toggleLang}
              aria-label={t('nav.language_toggle')}
              title={t('nav.language_toggle')}
            >
              <span className="font-mono text-[11px] font-semibold">{isEs ? 'EN' : 'ES'}</span>
            </Button>

            <div className="hidden lg:block">
              <Button variant="primary" size="sm" href={whatsappUrl} external>
                {t('hero.cta_primary')}
              </Button>
            </div>

            {/* Wrapped in a plain div (not a Tailwind class on the Button
                itself): Button.css sets `.sc-btn { display: inline-flex }`,
                which ties in specificity with Tailwind's `.lg\:hidden` and
                wins on source order, so the button stayed visible at
                desktop widths when the class was applied directly to it. */}
            <div className="lg:hidden">
              <Button
                variant="icon"
                size="sm"
                id="nav-menu-toggle"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? t('nav.menu_close') : t('nav.menu_open')}
                aria-expanded={menuOpen}
                aria-controls="nav-mobile-sheet"
              >
                {menuOpen ? <IconX width={16} height={16} /> : <IconMenu width={16} height={16} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile full-screen sheet ─── */}
      {menuOpen && (
        <div
          ref={sheetRef}
          id="nav-mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menu_label')}
          className="fixed inset-0 z-40 bg-ink lg:hidden flex flex-col items-center justify-center gap-3 px-6"
        >
          {navLinks.map((link) => {
            const isActive = isHome && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`font-sans text-2xl py-2 transition-colors duration-200 ${
                  isActive ? 'text-accent-blue' : 'text-text'
                }`}
              >
                {t(link.key)}
              </button>
            );
          })}

          <div className="mt-6">
            <Button variant="primary" size="md" href={whatsappUrl} external onClick={() => setMenuOpen(false)}>
              {t('hero.cta_primary')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
