import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { servicesData } from '../data/services';
import type { ServiceDetail, PracticalSolution, TechItem, ServiceFAQ } from '../data/services';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactModal from '../components/layout/ContactModal';
import SpotlightCard from '../components/ui/SpotlightCard';
import TechIcon from '../components/ui/TechIcon';
import ReiconIcon from '../components/ui/ReiconIcon';
import { SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiCheck, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const isEs = (i18n?.resolvedLanguage || i18n?.language || 'es').startsWith('es');
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSwapMenuOpen, setIsSwapMenuOpen] = useState(false);
  const swapMenuRef = useRef<HTMLDivElement>(null);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsSwapMenuOpen(false);
  }, [slug]);

  // Click outside and escape to close swap menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (swapMenuRef.current && !swapMenuRef.current.contains(event.target as Node)) {
        setIsSwapMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSwapMenuOpen(false);
    };
    if (isSwapMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSwapMenuOpen]);

  const service = useMemo(() => {
    return servicesData.find((s) => s.slug === slug);
  }, [slug]);

  const currentIndex = useMemo(() => {
    return servicesData.findIndex((s) => s.slug === slug);
  }, [slug]);

  const prevService = useMemo(() => {
    const idx = currentIndex <= 0 ? servicesData.length - 1 : currentIndex - 1;
    return servicesData[idx] || servicesData[0];
  }, [currentIndex]);

  const nextService = useMemo(() => {
    const idx = currentIndex >= servicesData.length - 1 ? 0 : currentIndex + 1;
    return servicesData[idx] || servicesData[0];
  }, [currentIndex]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-syne font-bold text-3xl mb-4">Servicio no encontrado</h1>
        <p className="text-white/60 mb-6 max-w-md">El servicio que estás buscando no existe o fue reubicado.</p>
        <Link
          to="/#services"
          className="px-6 py-3 bg-white text-[#020408] font-bold rounded-lg font-mono text-xs tracking-wider uppercase hover:bg-white/90 transition-all"
        >
          Volver a Servicios
        </Link>
      </div>
    );
  }

  const activeAccent = isLight ? service.accentColorLight : service.accentColor;
  const title = isEs ? service.titleEs : service.titleEn;
  const heroBadge = isEs ? service.heroBadgeEs : service.heroBadgeEn;
  const tagline = isEs ? service.taglineEs : service.taglineEn;
  const longDesc = isEs ? service.longDescEs : service.longDescEn;
  const whoIsItFor = isEs ? service.whoIsItForEs : service.whoIsItForEn;
  const deliverables = isEs ? service.deliverablesEs : service.deliverablesEn;

  // Other services for bottom navigation
  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  const whatsappQuoteUrl = `https://wa.me/524737374224?text=${encodeURIComponent(
    isEs
      ? `Hola, me interesa cotizar el servicio de ${title}.`
      : `Hello, I would like to request a quote for ${title}.`
  )}`;

  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-[#195fc1] selection:text-white overflow-x-hidden font-inter relative">
      <Helmet>
        <title>{`${title} — Symmetrical Code`}</title>
        <meta name="description" content={isEs ? service.shortDescEs : service.shortDescEn} />
        <link rel="canonical" href={`https://www.symmetricalcode.com/servicios/${service.slug}`} />
        <meta property="og:title" content={`${title} — Symmetrical Code`} />
        <meta property="og:description" content={isEs ? service.shortDescEs : service.shortDescEn} />
        <meta property="og:url" content={`https://www.symmetricalcode.com/servicios/${service.slug}`} />
      </Helmet>

      {/* ─── Ambient Glow in Signature Service Color ─── */}
      <div
        className="fixed top-[-140px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[400px] rounded-full blur-[180px] pointer-events-none transition-opacity duration-500 z-0"
        style={{
          background: activeAccent,
          opacity: isLight ? 0.08 : 0.22,
        }}
      />

      <Navbar />

      <main className="relative z-10 pt-28 pb-20 sm:pt-36 sm:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── Minimalist Breadcrumbs (Sin "Inicio") ─── */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/40">
              <Link to="/#services" className="hover:text-white transition-colors">
                {isEs ? 'Servicios' : 'Services'}
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-white/90 font-medium truncate max-w-[240px] sm:max-w-none">
                {title}
              </span>
            </div>

            <Link
              to="/#services"
              className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
            >
              <span>←</span>
              {isEs ? 'Todos los servicios' : 'All services'}
            </Link>
          </div>

          {/* ══════════════════════════════════════════
              HERO SECTION CON COLOR CARACTERÍSTICO
             ══════════════════════════════════════════ */}
          <div className="max-w-4xl mb-20 sm:mb-28">
            {/* Signature Pill Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-mono mb-6 transition-colors"
              style={{
                borderColor: `${activeAccent}${isLight ? '40' : '33'}`,
                backgroundColor: `${activeAccent}${isLight ? '14' : '0d'}`,
                color: activeAccent,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeAccent }}
              />
              <span className="tracking-wide font-medium">{heroBadge}</span>
            </div>

            {/* Title & Service Swap Navigation Widget */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
              <h1 className="font-syne font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] flex-1">
                {title}
              </h1>

              {/* Service Swap Navigation Widget */}
              <div ref={swapMenuRef} className="relative shrink-0 self-start lg:mt-2">
                <div className="service-swap-pill inline-flex items-center p-1 rounded-full border transition-all duration-300">
                  {/* Previous Service Button */}
                  <Link
                    to={`/servicios/${prevService.slug}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title={isEs ? `Anterior: ${prevService.titleEs}` : `Previous: ${prevService.titleEn}`}
                    aria-label={isEs ? 'Servicio anterior' : 'Previous service'}
                  >
                    <FiChevronLeft size={16} />
                  </Link>

                  {/* Switcher Dropdown Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsSwapMenuOpen(!isSwapMenuOpen)}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-expanded={isSwapMenuOpen}
                    aria-haspopup="true"
                  >
                    <span>{isEs ? 'Otros servicios' : 'Other services'}</span>
                    <FiChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${isSwapMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Next Service Button */}
                  <Link
                    to={`/servicios/${nextService.slug}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title={isEs ? `Siguiente: ${nextService.titleEs}` : `Next: ${nextService.titleEn}`}
                    aria-label={isEs ? 'Siguiente servicio' : 'Next service'}
                  >
                    <FiChevronRight size={16} />
                  </Link>
                </div>

                {/* Popover Dropdown Menu */}
                {isSwapMenuOpen && (
                  <div className="service-swap-menu absolute top-full left-0 lg:left-auto lg:right-0 mt-2 w-72 sm:w-80 rounded-2xl border p-2 z-50 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-white/40 border-b border-white/[0.06] mb-1.5 flex items-center justify-between">
                      <span>{isEs ? 'Catálogo de Servicios' : 'Service Catalog'}</span>
                      <span className="text-[9px] text-[#195fc1] font-semibold">{servicesData.length}</span>
                    </div>
                    <div className="space-y-1">
                      {servicesData.map((s, sIdx) => {
                        const isCurrent = s.slug === service.slug;
                        const sTitle = isEs ? s.titleEs : s.titleEn;
                        const sAccent = isLight ? s.accentColorLight : s.accentColor;
                        return (
                          <Link
                            key={s.slug}
                            to={`/servicios/${s.slug}`}
                            onClick={() => setIsSwapMenuOpen(false)}
                            className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-syne transition-all ${
                              isCurrent
                                ? 'bg-white/[0.08] text-white font-bold border border-white/15'
                                : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: sAccent }}
                              />
                              <span className="truncate">{sTitle}</span>
                            </div>
                            {isCurrent ? (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/80 shrink-0">
                                {isEs ? 'Actual' : 'Current'}
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-white/30 shrink-0">
                                0{sIdx + 1}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Tagline */}
            <p
              className="text-lg sm:text-2xl font-medium leading-relaxed mb-6 font-syne transition-colors duration-300"
              style={{ color: activeAccent }}
            >
              {tagline}
            </p>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-normal">
              {longDesc}
            </p>

            {/* Unified WhatsApp Quote Button */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="unified-whatsapp-cta group relative inline-flex items-center gap-3.5 px-6 sm:px-7 py-3.5 rounded-xl font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#25D366]/20 border border-[#25D366]/40 shrink-0 group-hover:scale-110 group-hover:bg-[#25D366]/30 transition-all duration-300">
                  <SiWhatsapp size={14} color="#25D366" />
                </div>
                <span className="text-white transition-colors">
                  {isEs ? 'Cotizar por WhatsApp' : 'Quote via WhatsApp'}
                </span>
                <FiArrowUpRight
                  size={16}
                  className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              BLOQUE 1: SOLUCIONES DE NEGOCIO (Spotlight con el color de acento)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <div className="mb-10 sm:mb-12">
              <span
                className="text-xs font-mono uppercase tracking-[0.25em] block mb-3 font-semibold"
                style={{ color: activeAccent }}
              >
                {isEs ? 'Soluciones Prácticas' : 'Practical Solutions'}
              </span>
              <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight">
                {isEs ? 'Qué resolvemos para tu negocio' : 'What we solve for your business'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {service.practicalSolutions.map((sol: PracticalSolution, idx: number) => {
                const solTitle = isEs ? sol.titleEs : sol.titleEn;
                const solDesc = isEs ? sol.descriptionEs : sol.descriptionEn;

                return (
                  <SpotlightCard
                    key={idx}
                    accentColor={activeAccent}
                    className="p-7 sm:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300"
                          style={{
                            borderColor: `${activeAccent}${isLight ? '40' : '33'}`,
                            backgroundColor: `${activeAccent}${isLight ? '14' : '0d'}`,
                            color: activeAccent,
                          }}
                        >
                          <ReiconIcon name={sol.iconType} size={22} color={activeAccent} />
                        </div>
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{ color: `${activeAccent}${isLight ? 'cc' : '88'}` }}
                        >
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-syne font-semibold text-lg sm:text-xl text-white mb-3">
                        {solTitle}
                      </h3>

                      <p className="text-white/60 text-sm sm:text-base leading-relaxed font-normal">
                        {solDesc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/35 transition-colors">
                      <span>{isEs ? 'Disponible' : 'Available'}</span>
                      <a
                        href={`https://wa.me/524737374224?text=${encodeURIComponent(
                          isEs
                            ? `Hola, me interesa cotizar la solución: ${solTitle} (${title}).`
                            : `Hello, I would like to request a quote for: ${solTitle} (${title}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:underline font-semibold"
                        style={{ color: activeAccent }}
                      >
                        {isEs ? 'Cotizar →' : 'Quote →'}
                      </a>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 2: ¿PARA QUIÉN ES? (Diagnóstico con acento de color)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <SpotlightCard
              accentColor={activeAccent}
              className="p-8 sm:p-12 lg:p-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                <div className="lg:col-span-5">
                  <span
                    className="text-xs font-mono uppercase tracking-[0.25em] block mb-3 font-semibold"
                    style={{ color: activeAccent }}
                  >
                    {isEs ? 'Diagnóstico' : 'Diagnostic'}
                  </span>
                  <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight mb-4">
                    {isEs ? '¿Es este el servicio adecuado?' : 'Is this service right for you?'}
                  </h2>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6">
                    {isEs
                      ? 'Diseñado para empresas que buscan superar fricciones operativas y dar el salto a una infraestructura profesional.'
                      : 'Tailored for organizations ready to remove manual bottlenecks and transition into reliable, scalable software.'}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium"
                    style={{
                      borderColor: `${activeAccent}${isLight ? '40' : '33'}`,
                      backgroundColor: `${activeAccent}${isLight ? '14' : '0d'}`,
                      color: activeAccent,
                    }}
                  >
                    <span>⚡</span>
                    {isEs ? 'Diagnóstico inicial sin costo' : 'Free initial discovery'}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3.5">
                  {whoIsItFor.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.015] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                      <div
                        className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          borderColor: `${activeAccent}${isLight ? '55' : '44'}`,
                          backgroundColor: `${activeAccent}${isLight ? '16' : '15'}`,
                          color: activeAccent,
                        }}
                      >
                        <FiCheck size={11} color={activeAccent} />
                      </div>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 3: ENTREGABLES
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <div className="mb-10 sm:mb-12">
              <span
                className="text-xs font-mono uppercase tracking-[0.25em] block mb-3 font-semibold"
                style={{ color: activeAccent }}
              >
                {isEs ? 'Garantías' : 'Guarantees'}
              </span>
              <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight">
                {isEs ? 'Lo que recibís al trabajar con nosotros' : 'What you receive when working with us'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {deliverables.map((item: string, idx: number) => (
                <SpotlightCard
                  key={idx}
                  accentColor={activeAccent}
                  className="p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <span
                      className="font-mono text-[11px] uppercase block mb-3 font-semibold"
                      style={{ color: activeAccent }}
                    >
                      {isEs ? `Entregable 0${idx + 1}` : `Deliverable 0${idx + 1}`}
                    </span>
                    <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 4: STACK TECNOLÓGICO (Iconos Oficiales)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <div className="mb-10 sm:mb-12">
              <span
                className="text-xs font-mono uppercase tracking-[0.25em] block mb-3 font-semibold"
                style={{ color: activeAccent }}
              >
                {isEs ? 'Ingeniería' : 'Engineering'}
              </span>
              <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight mb-3">
                {isEs ? 'Stack tecnológico y herramientas' : 'Technology stack & tools'}
              </h2>
              <p className="text-white/50 text-sm sm:text-base max-w-xl font-normal">
                {isEs
                  ? 'Implementamos herramientas industriales probadas en producción con alta escalabilidad y soporte a largo plazo.'
                  : 'We work with production-grade technologies ensuring high concurrency, security, and maintainability.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {service.techStack.map((tech: TechItem, idx: number) => (
                <SpotlightCard
                  key={idx}
                  spotlightColor="rgba(255, 255, 255, 0.05)"
                  className="p-5 sm:p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.02] group-hover:scale-105 transition-transform duration-300">
                        <TechIcon name={tech.name} size={22} />
                      </div>
                      <span className="font-mono text-[11px] text-white/30 uppercase">
                        {tech.category}
                      </span>
                    </div>

                    <h4 className="font-syne font-semibold text-base sm:text-lg text-white mb-1.5">
                      {tech.name}
                    </h4>

                    {tech.highlight && (
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-normal">
                        {tech.highlight}
                      </p>
                    )}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 5: FAQ (Acordeón Minimalista)
             ══════════════════════════════════════════ */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="mb-24 sm:mb-32">
              <div className="mb-10 sm:mb-12">
                <span
                  className="text-xs font-mono uppercase tracking-[0.25em] block mb-3 font-semibold"
                  style={{ color: activeAccent }}
                >
                  {isEs ? 'Preguntas Frecuentes' : 'FAQ'}
                </span>
                <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight">
                  {isEs ? 'Lo que usualmente nos preguntan' : 'Frequently asked questions'}
                </h2>
              </div>

              <div className="space-y-3.5 max-w-3xl">
                {service.faqs.map((faq: ServiceFAQ, idx: number) => {
                  const isOpen = openFaq === idx;
                  const question = isEs ? faq.questionEs : faq.questionEn;
                  const answer = isEs ? faq.answerEs : faq.answerEn;

                  return (
                    <div
                      key={idx}
                      className="border border-white/[0.08] rounded-2xl overflow-hidden bg-white/[0.01] transition-colors"
                      style={isOpen ? { borderColor: `${activeAccent}44` } : undefined}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-syne font-semibold text-base sm:text-lg text-white hover:text-white/90 transition-colors cursor-pointer"
                      >
                        <span>{question}</span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : 'text-white/40'
                          }`}
                          style={isOpen ? { color: activeAccent, borderColor: `${activeAccent}44` } : undefined}
                        >
                          <FiChevronDown size={13} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-white/55 text-sm sm:text-base leading-relaxed border-t border-white/[0.06] pt-4 font-normal">
                          {answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════
              BANNER DE CIERRE (Con resplandor del color de acento)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <SpotlightCard
              accentColor={activeAccent}
              className="p-8 sm:p-14 text-center relative overflow-hidden"
              style={{ borderColor: `${activeAccent}${isLight ? '40' : '33'}` }}
            >
              <div className="relative z-10 max-w-xl mx-auto">
                <span
                  className="text-xs font-mono uppercase tracking-[0.25em] block mb-4 font-semibold"
                  style={{ color: activeAccent }}
                >
                  {isEs ? 'Comencemos' : 'Get in touch'}
                </span>

                <h3 className="font-syne font-bold text-2xl sm:text-4xl text-white mb-4 leading-tight">
                  {isEs
                    ? '¿Hablamos sobre tu proyecto?'
                    : 'Ready to discuss your project?'}
                </h3>

                <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed font-normal">
                  {isEs
                    ? 'Contanos qué necesidad o reto querés resolver. Te brindamos un diagnóstico claro y propuesta en menos de 24 horas.'
                    : 'Tell us about your requirements. We provide a clear diagnosis and proposal within 24 hours.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3.5">
                  <a
                    href={whatsappQuoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="unified-whatsapp-cta group relative inline-flex items-center gap-3.5 px-7 py-4 rounded-xl font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#25D366]/20 border border-[#25D366]/40 shrink-0 group-hover:scale-110 group-hover:bg-[#25D366]/30 transition-all duration-300">
                      <SiWhatsapp size={14} color="#25D366" />
                    </div>
                    <span className="text-white transition-colors">
                      {isEs ? 'Cotizar por WhatsApp' : 'Quote via WhatsApp'}
                    </span>
                    <FiArrowUpRight
                      size={16}
                      className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </section>

          {/* ══════════════════════════════════════════
              EXPLORAR OTROS SERVICIOS
             ══════════════════════════════════════════ */}
          <section className="pt-10 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-syne font-bold text-lg text-white">
                {isEs ? 'Otros servicios' : 'Other services'}
              </h4>
              <Link to="/#services" className="text-xs font-mono text-white/50 hover:text-white transition-colors">
                {isEs ? 'Ver todos →' : 'View all →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherServices.map((other: ServiceDetail) => {
                const otherAccent = isLight ? other.accentColorLight : other.accentColor;
                return (
                  <Link
                    key={other.slug}
                    to={`/servicios/${other.slug}`}
                    className="block group no-underline"
                  >
                    <SpotlightCard
                      accentColor={otherAccent}
                      className="p-4 h-full flex flex-col justify-between"
                    >
                      <div>
                        <span
                          className="font-mono text-[10px] uppercase block mb-1 font-semibold"
                          style={{ color: otherAccent }}
                        >
                          {isEs ? other.heroBadgeEs : other.heroBadgeEn}
                        </span>
                        <h5 className="font-syne font-semibold text-sm text-white/90 group-hover:text-white transition-colors line-clamp-2">
                          {isEs ? other.titleEs : other.titleEn}
                        </h5>
                      </div>
                      <span
                        className="text-[11px] font-mono transition-colors mt-3 block font-medium"
                        style={{ color: otherAccent }}
                      >
                        {isEs ? 'Ver detalle →' : 'View detail →'}
                      </span>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      <Footer />
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}

      <style>{`
        /* Unified WhatsApp CTA Button */
        .unified-whatsapp-cta {
          background: linear-gradient(135deg, #0b1329 0%, #050b18 100%);
          border: 1px solid rgba(37, 211, 102, 0.35);
          box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
        }
        .unified-whatsapp-cta:hover {
          border-color: rgba(37, 211, 102, 0.75);
          box-shadow: 0 0 32px -4px rgba(37, 211, 102, 0.35), 0 12px 32px rgba(0, 0, 0, 0.6);
          transform: translateY(-2px);
        }
        .unified-whatsapp-cta:active {
          transform: translateY(0);
        }

        /* Light Mode Unified CTA Button */
        html.light .unified-whatsapp-cta {
          background: #0B132B !important;
          border: 1px solid #0B132B !important;
          box-shadow: 0 10px 24px -4px rgba(11, 19, 43, 0.22) !important;
        }
        html.light .unified-whatsapp-cta:hover {
          background: #195fc1 !important;
          border-color: #195fc1 !important;
          box-shadow: 0 14px 32px -4px rgba(25, 95, 193, 0.32) !important;
        }
        html.light .unified-whatsapp-cta span {
          color: #ffffff !important;
        }

        /* Service Swap Pill & Menu */
        .service-swap-pill {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        html.light .service-swap-pill {
          background: rgba(255, 255, 255, 0.95) !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
        }
        html.light .service-swap-pill button,
        html.light .service-swap-pill a {
          color: #1e293b !important;
        }
        html.light .service-swap-pill button:hover,
        html.light .service-swap-pill a:hover {
          background: rgba(25, 95, 193, 0.08) !important;
          color: #195fc1 !important;
        }

        .service-swap-menu {
          background: rgba(9, 13, 22, 0.96);
          border-color: rgba(255, 255, 255, 0.12);
        }
        html.light .service-swap-menu {
          background: rgba(255, 255, 255, 0.98) !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
          box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.15) !important;
        }
        html.light .service-swap-menu a {
          color: #334155 !important;
        }
        html.light .service-swap-menu a:hover {
          background: rgba(25, 95, 193, 0.08) !important;
          color: #195fc1 !important;
        }
      `}</style>
    </div>
  );
}
