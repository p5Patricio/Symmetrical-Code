import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import IconSun from '~icons/lucide/sun';
import IconMoon from '~icons/lucide/moon';
import IconMenu from '~icons/lucide/menu';
import IconX from '~icons/lucide/x';
import IconArrowLeft from '~icons/lucide/arrow-left';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

export default function GalleryNavbar({
  scrolled,
  onClose,
  onNavigate,
  activeSection,
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
      document.getElementById('gallery-menu-toggle')?.focus();
    }
  }, [menuOpen]);

  const navLinks = [
    { key: 'nav.home', id: 'home' },
    { key: 'nav.services', id: 'services' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
    { key: 'nav.contact', id: 'footer' },
  ];

  const toggleLang = () => i18n.changeLanguage(lang === 'es' ? 'en' : 'es');

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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[160] h-16 flex items-center transition-[border-color] duration-300 bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-[8px] border-b ${
          scrolled ? 'border-line' : 'border-transparent'
        }`}
      >
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left: back to projects */}
          <Button variant="secondary" size="sm" leadingIcon={<IconArrowLeft width={13} height={13} />} onClick={handleClose}>
            <span className="font-mono text-[11px] tracking-widest uppercase">{t('projects.back')}</span>
          </Button>

          {/* Center: desktop links */}
          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = link.id === activeSection;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative font-mono text-[11px] tracking-[0.14em] uppercase py-2 transition-colors duration-200 cursor-pointer ${
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
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="icon"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('nav.theme_to_light') : t('nav.theme_to_dark')}
              title={theme === 'dark' ? t('nav.theme_to_light') : t('nav.theme_to_dark')}
            >
              {theme === 'dark' ? <IconSun width={14} height={14} /> : <IconMoon width={14} height={14} />}
            </Button>

            <Button
              variant="icon"
              size="sm"
              onClick={toggleLang}
              aria-label={t('nav.language_toggle')}
              title={t('nav.language_toggle')}
            >
              <span className="font-mono text-[11px] font-semibold">{lang === 'es' ? 'EN' : 'ES'}</span>
            </Button>

            {/* Wrapped in a plain div, not a Tailwind class on the Button
                itself: Button.css sets `.sc-btn { display: inline-flex }`,
                which ties in specificity with `.lg\:hidden` and wins on
                source order when applied directly to the button. */}
            <div className="lg:hidden">
              <Button
                variant="icon"
                size="sm"
                id="gallery-menu-toggle"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? t('nav.menu_close') : t('nav.menu_open')}
                aria-expanded={menuOpen}
                aria-controls="gallery-mobile-sheet"
              >
                {menuOpen ? <IconX width={15} height={15} /> : <IconMenu width={15} height={15} />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={sheetRef}
          id="gallery-mobile-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menu_label')}
          className="fixed inset-0 z-[150] bg-ink lg:hidden flex flex-col items-center justify-center gap-3 px-6"
        >
          <div className="mb-6 flex flex-col items-center">
            <img src="/logo.png" alt="Symmetrical Code" className="h-14 w-auto mb-3" />
            <span className="font-syne font-bold text-lg tracking-wide text-text">
              Symmetrical<span className="text-accent-blue">Code</span>
            </span>
          </div>

          {navLinks.map((link) => {
            const isActive = link.id === activeSection;
            return (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`font-mono text-sm tracking-[0.15em] uppercase py-2 transition-colors duration-200 ${
                  isActive ? 'text-accent-blue' : 'text-text'
                }`}
              >
                {t(link.key)}
              </button>
            );
          })}

          <div className="w-12 h-px bg-line my-4" />

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={theme === 'dark' ? <IconSun width={13} height={13} /> : <IconMoon width={13} height={13} />}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? t('nav.theme_to_light') : t('nav.theme_to_dark')}
            </Button>

            <Button variant="secondary" size="sm" onClick={toggleLang}>
              {lang === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
