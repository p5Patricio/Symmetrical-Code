import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { servicesData } from '../data/services';
import type { ServiceDetail, PracticalSolution, TechItem, ServiceFAQ } from '../data/services';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactModal from '../components/layout/ContactModal';
import ChatWidget from '../components/chat/ChatWidget';
import SpotlightCard from '../components/ui/SpotlightCard';
import ShinyText from '../components/ui/ShinyText';
import DecryptedText from '../components/ui/DecryptedText';
import TechIcon, { getTechBrandColor } from '../components/ui/TechIcon';
import { SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiCheckCircle, FiChevronDown } from 'react-icons/fi';

// ─── Map Icons for Practical Solutions ───
function SolutionIcon({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'database':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'whatsapp':
      return <SiWhatsapp size={22} color={color} />;
    case 'shield':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'zap':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case 'code':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'mobile':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'ai':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'design':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19 7-7 3 3-7 7-3-3z" />
          <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      );
    case 'cloud':
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
  }
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const isEs = i18n.language !== 'en';

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const service = useMemo(() => {
    return servicesData.find((s) => s.slug === slug);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-syne font-bold text-3xl mb-4">Servicio no encontrado</h1>
        <p className="text-white/60 mb-6 max-w-md">El servicio que estás buscando no existe o fue reubicado.</p>
        <Link
          to="/#services"
          className="px-6 py-3 bg-[#00e5ff] text-[#020408] font-bold rounded-lg font-mono text-sm tracking-wider uppercase hover:scale-105 transition-transform"
        >
          Volver a Servicios
        </Link>
      </div>
    );
  }

  const title = isEs ? service.titleEs : service.titleEn;
  const heroBadge = isEs ? service.heroBadgeEs : service.heroBadgeEn;
  const tagline = isEs ? service.taglineEs : service.taglineEn;
  const longDesc = isEs ? service.longDescEs : service.longDescEn;
  const whoIsItFor = isEs ? service.whoIsItForEs : service.whoIsItForEn;
  const deliverables = isEs ? service.deliverablesEs : service.deliverablesEn;

  // Other services for bottom navigation
  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  const whatsappMessage = encodeURIComponent(
    isEs
      ? `¡Hola! Me interesa cotizar el servicio de "${service.titleEs}". Me gustaría agendar una llamada de diagnóstico técnico.`
      : `Hello! I'm interested in quoting the "${service.titleEn}" service. I'd like to schedule a technical discovery call.`
  );

  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-[#00e5ff] selection:text-[#020408] overflow-x-hidden font-inter relative">
      <Helmet>
        <title>{`${title} — Symmetrical Code`}</title>
        <meta name="description" content={isEs ? service.shortDescEs : service.shortDescEn} />
        <link rel="canonical" href={`https://www.symmetricalcode.com/servicios/${service.slug}`} />
        <meta property="og:title" content={`${title} — Symmetrical Code`} />
        <meta property="og:description" content={isEs ? service.shortDescEs : service.shortDescEn} />
        <meta property="og:url" content={`https://www.symmetricalcode.com/servicios/${service.slug}`} />
      </Helmet>

      {/* ─── Ambient Glow & Dot Grid ─── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            'radial-gradient(#00e5ff 1px, transparent 1px), radial-gradient(#1565ff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
      <div
        className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[450px] rounded-full blur-[160px] pointer-events-none opacity-25 z-0"
        style={{ background: service.accentColor }}
      />

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── Breadcrumbs & Quick Return ─── */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-12 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/40">
              <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="text-[#00e5ff]">&gt;_</span>
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <span>/</span>
              <Link to="/#services" className="hover:text-white transition-colors">
                {isEs ? 'Servicios' : 'Services'}
              </Link>
              <span>/</span>
              <span className="text-white/80 font-semibold truncate max-w-[180px] sm:max-w-none">
                {title}
              </span>
            </div>

            <Link
              to="/#services"
              className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/60 hover:text-[#00e5ff] bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#00e5ff]/40 px-3.5 py-1.5 rounded-full transition-all"
            >
              <span>←</span>
              {isEs ? 'Explorar todos los servicios' : 'All services'}
            </Link>
          </div>

          {/* ══════════════════════════════════════════
              HERO SECTION DEL SERVICIO (Cyberpunk + React Bits)
             ══════════════════════════════════════════ */}
          <div className="max-w-4xl mb-16 sm:mb-24">
            {/* System Spec Sub-badge */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-mono tracking-widest uppercase"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: `${service.accentColor}44`,
                  color: service.accentColor,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: service.accentColor }}
                />
                <DecryptedText text={heroBadge} speed={30} />
              </div>

              <span className="font-mono text-[11px] text-white/30 hidden sm:inline-block">
                // SPEC: {service.slug}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6">
              {title}
            </h1>

            {/* Tagline with ShinyText */}
            <p className="text-lg sm:text-2xl font-syne font-semibold leading-relaxed mb-6">
              <ShinyText text={tagline} highlightColor={service.accentColor} speed={4} />
            </p>

            {/* Technical & Commercial Description */}
            <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-3xl font-inter">
              {longDesc}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="relative group overflow-hidden px-7 sm:px-9 py-3.5 sm:py-4 bg-[#00e5ff] text-[#020408] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isEs ? 'Cotizar este servicio' : 'Quote this service'}
                  <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>

              <a
                href={`https://wa.me/524731000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/[0.03] border border-white/10 hover:border-white/20 text-white font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 hover:bg-white/[0.08]"
              >
                <SiWhatsapp size={18} color="#25D366" />
                {isEs ? 'Platicar por WhatsApp' : 'Chat on WhatsApp'}
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              BLOQUE 1: QUÉ HACEMOS POR TU EMPRESA (Soluciones Prácticas en Bento Grid con SpotlightCard)
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                &gt;_ {isEs ? 'Soluciones Reales de Negocio' : 'Actionable Business Implementations'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-2">
                  {isEs ? 'Casos concretos que resolvemos en tu empresa' : 'Concrete business challenges we solve'}
                </h2>
                <p className="text-white/50 text-sm sm:text-base max-w-2xl">
                  {isEs
                    ? 'Sin rodeos técnicos innecesarios: aquí tenés las implementaciones directas que podés pedirnos para optimizar tus procesos y tus ventas.'
                    : 'Clear, measurable deliverables you can commission immediately to streamline operations and scale revenue.'}
                </p>
              </div>
            </div>

            {/* Bento Grid con SpotlightCard de React Bits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {service.practicalSolutions.map((sol: PracticalSolution, idx: number) => {
                const solTitle = isEs ? sol.titleEs : sol.titleEn;
                const solDesc = isEs ? sol.descriptionEs : sol.descriptionEn;

                return (
                  <SpotlightCard
                    key={idx}
                    spotlightColor={`${service.accentColor}28`}
                    className="p-6 sm:p-8 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] group-hover:scale-110 transition-transform duration-300"
                        >
                          <SolutionIcon type={sol.iconType} color={service.accentColor} />
                        </div>
                        <span className="font-mono text-xs text-white/30 tracking-widest">
                          [0{idx + 1}] // SOLUTION
                        </span>
                      </div>

                      <h3 className="font-syne font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-[#00e5ff] transition-colors">
                        {solTitle}
                      </h3>

                      <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                        {solDesc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors">
                      <span>{isEs ? 'Estado: Listo para implementar' : 'Status: Production-ready'}</span>
                      <span className="text-[#00e5ff] opacity-0 group-hover:opacity-100 transition-opacity">
                        Cotizar →
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 2: ¿PARA QUIÉN ES ESTE SERVICIO? (Diagnóstico Cyberpunk)
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <SpotlightCard
              spotlightColor="rgba(0, 229, 255, 0.12)"
              className="p-8 sm:p-12 lg:p-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-5">
                  <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs uppercase block mb-3">
                    // DIAGNÓSTICO OPERATIVO
                  </span>
                  <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-4">
                    {isEs ? '¿Tu empresa necesita este servicio?' : 'Does your business need this service?'}
                  </h2>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6">
                    {isEs
                      ? 'Si identificás uno o varios de estos síntomas en tu operación actual, podemos ayudarte a transformarlos en una ventaja competitiva.'
                      : 'If your organization recognizes any of these operational bottlenecks, our senior team can turn them into scalable competitive edges.'}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] font-mono text-xs">
                    <span>⚡</span>
                    {isEs ? 'Evaluación técnica inicial sin costo' : 'Free initial technical discovery'}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3.5">
                  {whoIsItFor.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="group/item flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-[#00e5ff] transition-colors">
                        <FiCheckCircle size={13} color="#00e5ff" />
                      </div>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 3: ENTREGABLES Y GARANTÍAS DE INGENIERÍA
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                &gt;_ {isEs ? 'Entregables & Garantías' : 'Deliverables & Guarantees'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
            </div>

            <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-4">
              {isEs ? 'Lo que recibís con total transparencia' : 'What you receive with total transparency'}
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-2xl mb-10 sm:mb-12">
              {isEs
                ? 'Trabajamos con código que te pertenece al 100%, presupuestos cerrados y soporte directo de arquitectos de software.'
                : 'Zero vendor lock-in: 100% proprietary source code, fixed-scope budget, and direct senior guidance.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {deliverables.map((item: string, idx: number) => (
                <SpotlightCard
                  key={idx}
                  spotlightColor="rgba(255, 255, 255, 0.1)"
                  className="p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-[#00e5ff] bg-[#00e5ff]/10 border border-[#00e5ff]/20 px-2.5 py-0.5 rounded-full font-bold">
                        {isEs ? `ENTREGABLE 0${idx + 1}` : `DELIVERABLE 0${idx + 1}`}
                      </span>
                      <span className="text-white/20 font-mono text-xs">✓ GUARANTEED</span>
                    </div>
                    <p className="text-white/90 text-sm sm:text-base font-semibold leading-relaxed">
                      {item}
                    </p>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 4: STACK TECNOLÓGICO CON ICONOS OFICIALES DE MARCA
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                &gt;_ {isEs ? 'Stack Tecnológico Oficial' : 'Official Technology Stack'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-3">
                  {isEs ? 'Herramientas y Estándares de Producción' : 'Production-Proven Tech Standards'}
                </h2>
                <p className="text-white/50 text-sm sm:text-base max-w-xl">
                  {isEs
                    ? 'Usamos el stack oficial de grado industrial para garantizar alto rendimiento, escalabilidad y cero deuda técnica.'
                    : 'We engineer with high-concurrency, enterprise-grade tooling to ensure long-term stability and maintainability.'}
                </p>
              </div>
            </div>

            {/* Grid de tecnologías con iconos oficiales react-icons/si */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {service.techStack.map((tech: TechItem, idx: number) => {
                const brandColor = getTechBrandColor(tech.name);

                return (
                  <SpotlightCard
                    key={idx}
                    spotlightColor={`${brandColor}25`}
                    className="p-5 sm:p-6 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top bar with official icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:scale-110 transition-transform duration-300"
                        >
                          <TechIcon name={tech.name} size={24} />
                        </div>
                        <span className="font-mono text-[10px] text-white/30 tracking-wider uppercase">
                          {tech.category}
                        </span>
                      </div>

                      <h4 className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-white transition-colors mb-1.5">
                        {tech.name}
                      </h4>

                      {tech.highlight && (
                        <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                          {tech.highlight}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-white/30">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }} />
                      <span style={{ color: brandColor }}>{tech.name} Official</span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 5: PREGUNTAS FRECUENTES (FAQ Acordeón)
             ══════════════════════════════════════════ */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="mb-20 sm:mb-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                  &gt;_ {isEs ? 'Preguntas Frecuentes' : 'FAQ'}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
              </div>

              <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-8 sm:mb-10">
                {isEs ? 'Respuestas claras antes de empezar' : 'Clear answers before kicking off'}
              </h2>

              <div className="space-y-4 max-w-4xl">
                {service.faqs.map((faq: ServiceFAQ, idx: number) => {
                  const isOpen = openFaq === idx;
                  const question = isEs ? faq.questionEs : faq.questionEn;
                  const answer = isEs ? faq.answerEs : faq.answerEn;

                  return (
                    <div
                      key={idx}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? 'border-[#00e5ff]/40 bg-[#070d18]/90 shadow-[0_0_20px_rgba(0,229,255,0.06)]'
                          : 'border-white/10 bg-white/[0.01] hover:border-white/20'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-syne font-bold text-base sm:text-lg text-white hover:text-[#00e5ff] transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#00e5ff]/70">0{idx + 1}.</span>
                          {question}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-white/40'
                          }`}
                        >
                          <FiChevronDown size={14} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-white/60 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
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
              BANNER DE CIERRE / CTA FINAL CON REACT BITS GLOW
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <SpotlightCard
              spotlightColor="rgba(0, 229, 255, 0.25)"
              className="p-8 sm:p-16 text-center border-[#00e5ff]/30 shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <span className="text-[#00e5ff] font-mono text-xs tracking-widest uppercase mb-4 block">
                  // {isEs ? 'TRANSFORMACIÓN DIGITAL' : 'DIGITAL TRANSFORMATION'}
                </span>

                <h3 className="font-syne font-black text-2xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
                  {isEs
                    ? '¿Listo para construir esta solución con nosotros?'
                    : 'Ready to build this solution with our team?'}
                </h3>

                <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed font-inter">
                  {isEs
                    ? 'Platícanos qué proceso o reto querés resolver. Te brindamos un diagnóstico claro y cotización formal en menos de 24 horas.'
                    : 'Tell us what bottleneck or workflow you want to solve. We deliver a clear technical diagnostic and quote in under 24 hours.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-8 sm:px-10 py-4 bg-[#00e5ff] text-[#020408] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] cursor-pointer"
                  >
                    {isEs ? 'Solicitar Cotización' : 'Request a Quote'}
                  </button>

                  <a
                    href={`https://wa.me/524731000000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl hover:bg-white/20 transition-all"
                  >
                    <SiWhatsapp size={18} color="#25D366" />
                    {isEs ? 'Consultar por WhatsApp' : 'WhatsApp Chat'}
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </section>

          {/* ══════════════════════════════════════════
              EXPLORAR OTROS SERVICIOS
             ══════════════════════════════════════════ */}
          <section className="pt-10 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-syne font-bold text-xl text-white">
                {isEs ? 'Explorar otros servicios' : 'Explore other services'}
              </h4>
              <Link to="/#services" className="font-mono text-xs text-[#00e5ff] hover:underline uppercase tracking-wider">
                {isEs ? 'Ver todos los servicios →' : 'View all services →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherServices.map((other: ServiceDetail) => (
                <Link
                  key={other.slug}
                  to={`/servicios/${other.slug}`}
                  className="block group no-underline"
                >
                  <SpotlightCard
                    spotlightColor={`${other.accentColor}25`}
                    className="p-4 h-full flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-white/30 uppercase block mb-1.5">
                        {isEs ? other.heroBadgeEs : other.heroBadgeEn}
                      </span>
                      <h5 className="font-syne font-bold text-sm text-white group-hover:text-[#00e5ff] transition-colors line-clamp-2">
                        {isEs ? other.titleEs : other.titleEn}
                      </h5>
                    </div>
                    <span className="font-mono text-[10px] text-white/40 group-hover:text-[#00e5ff] transition-colors mt-3 block">
                      Ver detalle →
                    </span>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <ChatWidget />
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
    </div>
  );
}
