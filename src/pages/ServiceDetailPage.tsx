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

// ─── Icons Map ───
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
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
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
          <path d="m2 2 7.586 7.586" />
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
    return servicesData.find(s => s.slug === slug);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-syne font-bold text-3xl mb-4">Servicio no encontrado</h1>
        <p className="text-white/60 mb-6 max-w-md">El servicio que estás buscando no existe o fue reubicado.</p>
        <Link to="/#services" className="px-6 py-3 bg-[#00e5ff] text-[#020408] font-bold rounded-lg font-mono text-sm tracking-wider uppercase hover:scale-105 transition-transform">
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
  const otherServices = servicesData.filter(s => s.slug !== service.slug);

  const whatsappMessage = encodeURIComponent(
    isEs
      ? `¡Hola! Estoy interesado en el servicio de "${service.titleEs}". Me gustaría agendar una llamada de diagnóstico.`
      : `Hello! I am interested in the "${service.titleEn}" service. I'd like to schedule a consultation.`
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

      {/* Global Background Glow & Subtle Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 z-0"
        style={{ background: service.accentColor }}
      />

      <Navbar />

      <main className="relative z-10 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs & Back link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-white/40">
              <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <span>/</span>
              <Link to="/#services" className="hover:text-white transition-colors">
                {isEs ? 'Servicios' : 'Services'}
              </Link>
              <span>/</span>
              <span className="text-[#00e5ff] truncate max-w-[200px] sm:max-w-none">{title}</span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {isEs ? 'Volver al inicio' : 'Back to Home'}
            </Link>
          </div>

          {/* ══════════════════════════════════════════
              HERO SECTION DEL SERVICIO
             ══════════════════════════════════════════ */}
          <div className="max-w-4xl mb-16 sm:mb-24">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm font-mono tracking-wider uppercase mb-6"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: service.accentColor,
                borderColor: `${service.accentColor}33`,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: service.accentColor }} />
              {heroBadge}
            </div>

            <h1 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-6">
              {title}
            </h1>

            <p className="text-white/80 text-lg sm:text-2xl font-normal leading-relaxed mb-6 font-syne">
              {tagline}
            </p>

            <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-10 max-w-3xl">
              {longDesc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#00e5ff] text-[#020408] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] cursor-pointer"
              >
                {isEs ? 'Cotizar este servicio' : 'Quote this service'}
              </button>

              <a
                href={`https://wa.me/524731000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 hover:border-white/20 text-white font-mono font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:bg-white/10"
              >
                <SolutionIcon type="whatsapp" color="#25D366" />
                {isEs ? 'Platicar por WhatsApp' : 'Chat on WhatsApp'}
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              BLOQUE 1: QUÉ HACEMOS POR TU EMPRESA (Soluciones Prácticas)
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                {isEs ? 'Soluciones Concretas' : 'Actionable Solutions'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
            </div>

            <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-4">
              {isEs ? '¿Qué resolvemos en el día a día de tu negocio?' : 'What do we solve in your day-to-day operations?'}
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-2xl mb-10 sm:mb-12">
              {isEs
                ? 'Casos tangibles y directos que podés solicitar con nosotros para mejorar tu operación y tus ventas.'
                : 'Concrete, practical implementations you can request to streamline operations and scale revenue.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {service.practicalSolutions.map((sol: PracticalSolution, idx: number) => {
                const solTitle = isEs ? sol.titleEs : sol.titleEn;
                const solDesc = isEs ? sol.descriptionEs : sol.descriptionEn;

                return (
                  <div
                    key={idx}
                    className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                  >
                    <div
                      className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
                      style={{ background: service.accentColor }}
                    />
                    
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 transition-transform"
                      >
                        <SolutionIcon type={sol.iconType} color={service.accentColor} />
                      </div>
                      <span className="font-mono text-xs text-white/20">0{idx + 1}</span>
                    </div>

                    <h3 className="font-syne font-bold text-lg sm:text-xl text-white mb-3 group-hover:text-[#00e5ff] transition-colors">
                      {solTitle}
                    </h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                      {solDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 2: ¿PARA QUIÉN ES ESTE SERVICIO?
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden">
            <div
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
              style={{ background: service.accentColor }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs uppercase block mb-3">
                  {isEs ? 'Diagnóstico Rápido' : 'Quick Diagnostic'}
                </span>
                <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-4">
                  {isEs ? '¿Este servicio es para tu empresa?' : 'Is this service right for your business?'}
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {isEs
                    ? 'Si tu equipo experimenta alguna de estas situaciones, podemos ayudarte a transformar ese cuello de botella en una ventaja competitiva.'
                    : 'If your team experiences any of these scenarios, we can help turn bottlenecks into competitive advantages.'}
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {whoIsItFor.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-5 h-5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 3: ENTREGABLES Y GARANTÍAS
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                {isEs ? 'Garantía y Claridad' : 'Deliverables & Clarity'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
            </div>

            <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-4">
              {isEs ? 'Lo que recibís al contratar con nosotros' : 'What you receive when partnering with us'}
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-2xl mb-10 sm:mb-12">
              {isEs
                ? 'Trabajamos con transparencia absoluta: código que te pertenece, precio cerrado y acompañamiento continuo.'
                : 'Absolute transparency: 100% proprietary code, closed-scope pricing, and ongoing support.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <span className="inline-block font-mono text-xs text-[#00e5ff] font-bold px-2 py-1 rounded bg-[#00e5ff]/10 mb-3">
                      {isEs ? `Entregable 0${idx + 1}` : `Deliverable 0${idx + 1}`}
                    </span>
                    <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 4: STACK TECNOLÓGICO Y ESTÁNDARES
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                {isEs ? 'Autoridad Técnica' : 'Engineering Stack'}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div>
                <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-3">
                  {isEs ? 'Tecnologías y Estándares de Ingeniería' : 'Technologies & Architecture Standards'}
                </h2>
                <p className="text-white/50 text-sm sm:text-base max-w-xl">
                  {isEs
                    ? 'Elegimos herramientas probadas en producción con alta escalabilidad, seguridad y soporte a largo plazo.'
                    : 'We leverage production-proven tools with exceptional scalability, security, and long-term maintainability.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {service.techStack.map((tech: TechItem, idx: number) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group"
                >
                  <span className="font-mono text-[11px] text-white/40 tracking-wider uppercase block mb-1">
                    {tech.category}
                  </span>
                  <h4 className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-[#00e5ff] transition-colors mb-2">
                    {tech.name}
                  </h4>
                  {tech.highlight && (
                    <p className="text-white/50 text-xs sm:text-sm">
                      {tech.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════
              BLOQUE 5: PREGUNTAS FRECUENTES (FAQ)
             ══════════════════════════════════════════ */}
          {service.faqs && service.faqs.length > 0 && (
            <section className="mb-20 sm:mb-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#00e5ff] tracking-[0.3em] font-mono text-xs sm:text-sm uppercase">
                  {isEs ? 'Preguntas Frecuentes' : 'FAQ'}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#00e5ff]/20 to-transparent" />
              </div>

              <h2 className="font-syne font-black text-2xl sm:text-4xl text-white mb-8 sm:mb-10">
                {isEs ? 'Lo que más nos preguntan sobre este servicio' : 'Common questions about this service'}
              </h2>

              <div className="space-y-4 max-w-4xl">
                {service.faqs.map((faq: ServiceFAQ, idx: number) => {
                  const isOpen = openFaq === idx;
                  const question = isEs ? faq.questionEs : faq.questionEn;
                  const answer = isEs ? faq.answerEs : faq.answerEn;

                  return (
                    <div
                      key={idx}
                      className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.01] transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-syne font-bold text-base sm:text-lg text-white hover:text-[#00e5ff] transition-colors cursor-pointer"
                      >
                        <span>{question}</span>
                        <span className="text-2xl text-[#00e5ff] font-light leading-none shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
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
              BANNER DE CIERRE / CTA FINAL
             ══════════════════════════════════════════ */}
          <section className="mb-20 sm:mb-28 p-8 sm:p-16 rounded-3xl bg-gradient-to-br from-[#00e5ff]/10 via-[#071322] to-[#020408] border border-[#00e5ff]/30 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#00e5ff] font-mono text-xs tracking-widest uppercase mb-4 block">
                {isEs ? 'Hablemos de tu proyecto' : 'Let’s talk about your project'}
              </span>
              <h3 className="font-syne font-black text-2xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
                {isEs
                  ? '¿Listo para implementar esta solución en tu empresa?'
                  : 'Ready to build this solution for your business?'}
              </h3>
              <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed">
                {isEs
                  ? 'Contanos qué necesitás resolver y te damos un diagnóstico claro y cotización en menos de 24 horas hábiles.'
                  : 'Tell us what you need to solve and get a clear technical diagnosis and quote in under 24 business hours.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 bg-[#00e5ff] text-[#020408] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] cursor-pointer"
                >
                  {isEs ? 'Solicitar Cotización' : 'Request a Quote'}
                </button>

                <a
                  href={`https://wa.me/524731000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-lg hover:bg-white/20 transition-all"
                >
                  {isEs ? 'Consultar por WhatsApp' : 'WhatsApp Consultation'}
                </a>
              </div>
            </div>
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
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 block group"
                >
                  <span className="font-mono text-[10px] text-white/30 uppercase block mb-1">
                    {isEs ? other.heroBadgeEs : other.heroBadgeEn}
                  </span>
                  <h5 className="font-syne font-bold text-sm text-white group-hover:text-[#00e5ff] transition-colors line-clamp-2">
                    {isEs ? other.titleEs : other.titleEn}
                  </h5>
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
