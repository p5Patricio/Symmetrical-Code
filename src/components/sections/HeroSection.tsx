// src/components/sections/HeroSection.tsx
import { useTranslation } from 'react-i18next';
import SpecularButton from '../ui/SpecularButton';
import RotatingText from '../ui/RotatingText';
import ScrambledText from '../ui/ScrambledText';

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language !== 'en';

  const whatsappUrl = 'https://wa.me/524737374224';

  const principles = [
    { value: t('hero.stat_1_value'), label: t('hero.stat_1_label') },
    { value: t('hero.stat_2_value'), label: t('hero.stat_2_label') },
    { value: t('hero.stat_3_value'), label: t('hero.stat_3_label') },
  ];

  const rotatingWords = isEs
    ? ['Code', 'Sistemas', 'Software', 'Studio', 'Soluciones', 'IA']
    : ['Code', 'Systems', 'Software', 'Studio', 'Solutions', 'AI'];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden bg-transparent"
    >
      {/* ─── Ambient Subtle Radial Depth (Center) ─── */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[160px] bg-[#195fc1]/[0.10]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* ─── 1. Software Development Studio Category Pill with ScrambledText ─── */}
        <div
          className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6 sm:mb-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] opacity-0 animate-fade-up cursor-default"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#195fc1] animate-pulse shrink-0" />
          <ScrambledText
            radius={70}
            duration={1.0}
            speed={0.5}
            scrambleChars=".:"
            scrambleColor="#195fc1"
            className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.22em] uppercase text-white/85 text-center whitespace-nowrap"
          >
            {isEs ? 'Estudio de Desarrollo de Software' : 'Software Development Studio'}
          </ScrambledText>
        </div>

        {/* ─── 2. Standalone Large Isotype Logo (Sin contenedor) ─── */}
        <div
          className="relative mb-5 sm:mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.18s', animationFillMode: 'forwards' }}
        >
          <img
            src="/favicon.svg"
            alt="Symmetrical Code Isotype"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain filter drop-shadow-[0_16px_40px_rgba(25,95,193,0.35)] hover:scale-105 transition-transform duration-500 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        {/* ─── 3. Grand Studio Headline with React Bits RotatingText ─── */}
        <h1
          className="font-syne font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-tight md:leading-none text-white mb-8 sm:mb-12 flex flex-col md:flex-row items-center justify-center gap-y-1 md:gap-y-0 md:gap-x-3.5 md:whitespace-nowrap opacity-0 animate-fade-up text-center"
          style={{ animationDelay: '0.26s', animationFillMode: 'forwards' }}
        >
          <span className="shrink-0">Symmetrical</span>
          <RotatingText
            textColor="#195fc1"
            texts={rotatingWords}
            rotationInterval={2800}
            staggerDuration={0.025}
          />
        </h1>

        {/* ─── 5. Specular Action Buttons ─── */}
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none px-4 sm:px-0 mb-10 sm:mb-16 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <SpecularButton
            size="md"
            radius={14}
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-syne font-bold text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-7 py-3 w-full sm:w-auto text-center justify-center"
            tint="#195fc1"
            tintOpacity={0.06}
            blur={16}
            lineColor="#195fc1"
            baseColor="#071b38"
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
            className="font-syne font-bold text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-7 py-3 w-full sm:w-auto text-center justify-center"
            tint="#ffffff"
            tintOpacity={0.02}
            blur={12}
            lineColor="#195fc1"
            baseColor="#0a1626"
            intensity={1.1}
          >
            {t('hero.cta_secondary')}
          </SpecularButton>
        </div>

        {/* ─── 6. Studio Principles Ribbon ─── */}
        <div
          className="w-full max-w-3xl rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-4 sm:p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.35)] opacity-0 animate-fade-up mb-8 sm:mb-0"
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
            <span className="w-1 h-1 rounded-full bg-[#195fc1]" />
            {t('hero.location', 'Guanajuato, México · Remoto')}
          </span>
          <span className="text-white/20">|</span>
          <span>{t('hero.availability', 'Abiertos a nuevos proyectos')}</span>
        </div>
      </div>
    </section>
  );
}