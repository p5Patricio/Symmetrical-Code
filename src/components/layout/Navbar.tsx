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

      const sections = ['team', 'projects', 'technologies', 'services', 'home'];
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
    { key: 'nav.technologies', id: 'technologies' },
    { key: 'nav.projects', id: 'projects' },
    { key: 'nav.team', id: 'team' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020408]/90 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.png"
            alt="Symmetrical Code"
            className="h-8 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.6)]"
          />
          <span className="hidden sm:block font-syne font-bold text-sm tracking-wide text-white/80 group-hover:text-white transition-colors">
            Symmetrical<span className="text-[#00e5ff]">Code</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`font-mono text-xs tracking-widest uppercase transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-[#00e5ff]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {t(link.key)}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="font-mono text-xs tracking-widest border border-[rgba(0,229,255,0.25)] text-[#00e5ff]/70 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 px-3 py-1.5 rounded transition-all duration-200"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[#00e5ff] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-[#00e5ff] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#00e5ff] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-[#020408]/95 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-[#00e5ff] text-left transition-colors"
            >
              {t(link.key)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}