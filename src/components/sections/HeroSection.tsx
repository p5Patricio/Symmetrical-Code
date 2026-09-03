// src/components/sections/HeroSection.tsx
import { useTranslation } from 'react-i18next';
import SpecularButton from '../ui/SpecularButton';

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language !== 'en';

  const whatsappMessage = t('whatsapp.message_hero', 'Hola Symmetrical Code, me gustaría conversar sobre un proyecto.');
  const whatsappUrl = `https://wa.me/524737374224?text=${encodeURIComponent(whatsappMessage)}`;

  const principles = [
    { value: t('hero.stat_1_value'), label: t('hero.stat_1_label') },
    { value: t('hero.stat_2_value'), label: t('hero.stat_2_label') },
    { value: t('hero.stat_3_value'), label: t('hero.stat_3_label') },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-transparent"
    >
      {/* ─── Ambient Subtle Radial Depth (Center) ─── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#00e5ff]/[0.05]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* ─── 1. Category Pill Badge ─── */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6 sm:mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] opacity-0 animate-fade-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.24em] uppercase text-white/80">
            {t('hero.label', isEs ? 'Estudio de Desarrollo de Software' : 'Software Development Studio')}
          </span>
        </div>

        {/* ─── 2. Centered Emblem / Logo ─── */}
        <div
          className="relative mb-6 sm:mb-8 group opacity-0 animate-fade-up"
          style={{ animationDelay: '0.18s', animationFillMode: 'forwards' }}
        >
          {/* Ambient Backlight Reflection */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl bg-[#00e5ff]/15 transform scale-110 group-hover:scale-130 transition-transform duration-700 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl p-3.5 sm:p-4 border border-white/[0.1] bg-white/[0.03] backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.22)] flex items-center justify-center transition-all duration-500 group-hover:border-white/[0.22] group-hover:-translate-y-1">
            <img
              src="/favicon.svg"
              alt="Symmetrical Code Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* ─── 3. Grand Studio Headline (Brand + Manifesto) ─── */}
        <h1
          className="font-syne font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.98] text-white mb-4 sm:mb-5 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.26s', animationFillMode: 'forwards' }}
        >
          Symmetrical<span className="text-[#00e5ff]">Code</span>
        </h1>

        <p
          className="font-syne font-bold text-lg sm:text-2xl md:text-3xl text-white/90 tracking-tight mb-4 sm:mb-6 max-w-3xl leading-snug opacity-0 animate-fade-up"
          style={{ animationDelay: '0.34s', animationFillMode: 'forwards' }}
        >
          {t('hero.title')}{' '}
          <span className="text-[#00e5ff]">{t('hero.title_highlight')}</span>{' '}
          {t('hero.title_end')}
        </p>

        {/* ─── 4. Subtitle / Value Proposition ─── */}
        <p
          className="font-normal text-xs sm:text-sm md:text-base text-white/55 max-w-2xl leading-relaxed mb-8 sm:mb-10 mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: '0.42s', animationFillMode: 'forwards' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* ─── 5. Specular Action Buttons ─── */}
        <div
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-12 sm:mb-16 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <SpecularButton
            size="md"
            radius={14}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-syne font-bold text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-7 py-3"
            tint="#00e5ff"
            tintOpacity={0.05}
            blur={16}
            lineColor="#00e5ff"
            baseColor="#103045"
            intensity={1.4}
          >
            {t('hero.cta_primary')}
          </SpecularButton>

          <SpecularButton
            size="md"
            radius={14}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-syne font-bold text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-7 py-3"
            tint="#ffffff"
            tintOpacity={0.02}
            blur={12}
            lineColor="#00e5ff"
            baseColor="#1e293b"
            intensity={1.1}
          >
            {t('hero.cta_secondary')}
          </SpecularButton>
        </div>

        {/* ─── 6. Studio Principles Ribbon ─── */}
        <div
          className="w-full max-w-3xl rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-4 sm:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.35)] opacity-0 animate-fade-up"
          style={{ animationDelay: '0.58s', animationFillMode: 'forwards' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07] text-center">
            {principles.map((item, i) => (
              <div key={i} className="pt-3 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
                <div className="font-syne font-bold text-sm sm:text-base text-white tracking-wide mb-1">
                  {item.value}
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-white/40 leading-snug">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 7. Subtle Meta Line ─── */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/35 font-mono text-[10px] sm:text-xs mt-8 sm:mt-10 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.64s', animationFillMode: 'forwards' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#00e5ff]" />
            {t('hero.location', 'Guanajuato, México · Remoto')}
          </span>
          <span className="text-white/20">|</span>
          <span>{t('hero.availability', 'Abiertos a nuevos proyectos')}</span>
        </div>
      </div>
    </section>
  );
}