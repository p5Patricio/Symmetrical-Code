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
import TechIcon from '../components/ui/TechIcon';
import ReiconIcon from '../components/ui/ReiconIcon';
import { SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiCheck, FiChevronDown } from 'react-icons/fi';

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
          className="px-6 py-3 bg-white text-[#020408] font-bold rounded-lg font-mono text-xs tracking-wider uppercase hover:bg-white/90 transition-all"
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
      ? `¡Hola! Me gustaría platicar sobre el servicio de "${service.titleEs}".`
      : `Hello! I would like to discuss the "${service.titleEn}" service.`
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

      {/* ─── Ambient Subtle Glow ─── */}
      <div
        className="fixed top-[-140px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-20 z-0"
        style={{ background: service.accentColor }}
      />

      <Navbar />

      <main className="relative z-10 pt-28 pb-20 sm:pt-36 sm:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ─── Minimalist Breadcrumbs ─── */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/40">
              <Link to="/" className="hover:text-white transition-colors">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <span className="text-white/20">/</span>
              <Link to="/#services" className="hover:text-white transition-colors">
                {isEs ? 'Servicios' : 'Services'}
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-white/80 font-medium truncate max-w-[200px] sm:max-w-none">
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
              HERO SECTION (Minimalista & Súper Elegante)
             ══════════════════════════════════════════ */}
          <div className="max-w-3xl mb-20 sm:mb-28">
            {/* Minimalist Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-white/70 mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: service.accentColor }}
              />
              <span>{heroBadge}</span>
            </div>

            {/* Title */}
            <h1 className="font-syne font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-6">
              {title}
            </h1>

            {/* Editorial Tagline */}
            <p className="text-lg sm:text-2xl font-normal text-white/90 leading-relaxed mb-6 font-syne">
              {tagline}
            </p>

            {/* Description */}
            <p className="text-white/55 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-2xl font-normal">
              {longDesc}
            </p>

            {/* Clean, Refined Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#020408] font-mono font-medium text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>{isEs ? 'Cotizar proyecto' : 'Request quote'}</span>
                <FiArrowUpRight size={14} />
              </button>

              <a
                href={`https://wa.me/524731000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-white/80 hover:text-white font-mono font-medium text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 hover:bg-white/[0.06]"
              >
                <SiWhatsapp size={16} color="#25D366" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              BLOQUE 1: SOLUCIONES DE NEGOCIO (Bento Grid Minimalista con Reicon)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <div className="mb-10 sm:mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-3">
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
                    spotlightColor="rgba(255, 255, 255, 0.05)"
                    className="p-7 sm:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.02] text-white/80 group-hover:text-white group-hover:border-white/[0.15] transition-all duration-300">
                          <ReiconIcon name={sol.iconType} size={22} color="currentColor" />
                        </div>
                        <span className="font-mono text-xs text-white/25">
                          0{idx + 1}
                        </span>
                      </div>

                      <h3 className="font-syne font-semibold text-lg sm:text-xl text-white mb-3">
                        {solTitle}
                      </h3>

                      <p className="text-white/55 text-sm sm:text-base leading-relaxed font-normal">
                        {solDesc}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/30 group-hover:text-white/60 transition-colors">
                      <span>{isEs ? 'Disponible' : 'Available'}</span>
                      <span className="text-white/40 group-hover:text-white transition-colors">
                        Cotizar →
                      </span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 2: ¿PARA QUIÉN ES? (Diagnóstico Minimalista)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.04)"
              className="p-8 sm:p-12 lg:p-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                <div className="lg:col-span-5">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-3">
                    {isEs ? 'Diagnóstico' : 'Diagnostic'}
                  </span>
                  <h2 className="font-syne font-bold text-2xl sm:text-4xl text-white tracking-tight mb-4">
                    {isEs ? '¿Es este el servicio adecuado?' : 'Is this service right for you?'}
                  </h2>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                    {isEs
                      ? 'Diseñado para empresas que buscan superar fricciones operativas y dar el salto a una infraestructura profesional.'
                      : 'Tailored for organizations ready to remove manual bottlenecks and transition into reliable, scalable software.'}
                  </p>
                </div>

                <div className="lg:col-span-7 space-y-3.5">
                  {whoIsItFor.map((item: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.015] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-white/80">
                        <FiCheck size={11} />
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
              BLOQUE 3: ENTREGABLES (Claridad y Transparencia)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <div className="mb-10 sm:mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-3">
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
                  spotlightColor="rgba(255, 255, 255, 0.04)"
                  className="p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[11px] text-white/35 uppercase block mb-3">
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
              BLOQUE 4: STACK TECNOLÓGICO (Iconos Oficiales de Marca + Estilo Minimalista)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <div className="mb-10 sm:mb-12">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-3">
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
              BLOQUE 5: FAQ (Acordeón Minimalista y Limpio)
             ══════════════════════════════════════════ */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="mb-24 sm:mb-32">
              <div className="mb-10 sm:mb-12">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-3">
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
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-syne font-semibold text-base sm:text-lg text-white hover:text-white/90 transition-colors cursor-pointer"
                      >
                        <span>{question}</span>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/10 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-white' : 'text-white/40'
                          }`}
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
              BANNER DE CIERRE (Minimalista y Directo)
             ══════════════════════════════════════════ */}
          <section className="mb-24 sm:mb-32">
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.05)"
              className="p-8 sm:p-14 text-center border-white/[0.1] relative overflow-hidden"
            >
              <div className="relative z-10 max-w-xl mx-auto">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40 block mb-4">
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
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="px-8 py-3.5 bg-white text-[#020408] font-mono font-medium text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    {isEs ? 'Cotizar proyecto' : 'Request quote'}
                  </button>

                  <a
                    href={`https://wa.me/524731000000?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-white/80 hover:text-white font-mono font-medium text-xs sm:text-sm tracking-wider uppercase rounded-xl hover:bg-white/[0.06] transition-all"
                  >
                    <SiWhatsapp size={16} color="#25D366" />
                    <span>WhatsApp</span>
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
              {otherServices.map((other: ServiceDetail) => (
                <Link
                  key={other.slug}
                  to={`/servicios/${other.slug}`}
                  className="block group no-underline"
                >
                  <SpotlightCard
                    spotlightColor="rgba(255, 255, 255, 0.04)"
                    className="p-4 h-full flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-white/30 uppercase block mb-1">
                        {isEs ? other.heroBadgeEs : other.heroBadgeEn}
                      </span>
                      <h5 className="font-syne font-semibold text-sm text-white/90 group-hover:text-white transition-colors line-clamp-2">
                        {isEs ? other.titleEs : other.titleEn}
                      </h5>
                    </div>
                    <span className="text-[11px] font-mono text-white/30 group-hover:text-white/70 transition-colors mt-3 block">
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
