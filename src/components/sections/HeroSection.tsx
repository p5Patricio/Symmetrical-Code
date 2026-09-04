// src/components/sections/HeroSection.tsx
import { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import SpecularButton from '../ui/SpecularButton';
import RotatingText, { type RotatingTextRef } from '../ui/RotatingText';
import ScrambledText from '../ui/ScrambledText';
import Shuffle from '../ui/Shuffle';

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language !== 'en';

  const whatsappUrl = 'https://wa.me/524737374224';

  const principles = useMemo(() => [
    { value: t('hero.stat_1_value'), label: t('hero.stat_1_label') },
    { value: t('hero.stat_2_value'), label: t('hero.stat_2_label') },
    { value: t('hero.stat_3_value'), label: t('hero.stat_3_label') },
  ], [t]);

  const principleValues = useMemo(() => principles.map(p => p.value), [principles]);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const rotatingTextRef = useRef<RotatingTextRef>(null);

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

        {/* ─── 3. Grand Studio Headline with React Bits Shuffle ─── */}
        <h1
          className="font-syne font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-tight md:leading-none mb-8 sm:mb-12 flex flex-wrap items-center justify-center gap-x-3.5 md:gap-x-4 opacity-0 animate-fade-up text-center cursor-default select-none"
          style={{ animationDelay: '0.26s', animationFillMode: 'forwards' }}
        >
          <Shuffle
            text="Symmetrical"
            tag="span"
            className="text-white"
            duration={0.35}
            stagger={0.03}
            shuffleTimes={1}
            animationMode="evenodd"
            triggerOnHover={true}
          />
          <Shuffle
            text="Code"
            tag="span"
            className="text-[#195fc1]"
            duration={0.35}
            stagger={0.03}
            shuffleTimes={1}
            animationMode="evenodd"
            triggerOnHover={true}
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

        {/* ─── 6. Studio Principles Ribbon with React Bits RotatingText ─── */}
        <div
          className="w-full max-w-2xl rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-5 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.35)] opacity-0 animate-fade-up mb-8 sm:mb-0"
          style={{ animationDelay: '0.58s', animationFillMode: 'forwards' }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            {/* Top principle indicators / tabs */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3">
              {principles.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePrinciple(idx);
                    rotatingTextRef.current?.jumpTo(idx);
                  }}
                  className={`font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer px-3 py-1 rounded-full ${
                    activePrinciple === idx
                      ? 'text-[#195fc1] bg-[#195fc1]/10 font-bold border border-[#195fc1]/30 shadow-sm'
                      : 'text-white/40 hover:text-white/70 border border-transparent'
                  }`}
                >
                  {p.value}
                </button>
              ))}
            </div>

            {/* Rotating Value with RotatingText */}
            <div className="font-syne font-bold text-lg sm:text-2xl text-white tracking-wide mb-1.5 flex items-center justify-center h-8">
              <RotatingText
                ref={rotatingTextRef}
                texts={principleValues}
                textColor="#195fc1"
                rotationInterval={3000}
                staggerDuration={0.03}
                onNext={(idx) => setActivePrinciple(idx)}
                className="font-syne font-bold text-lg sm:text-2xl"
              />
            </div>

            {/* Synchronized Label Description */}
            <div className="min-h-[1.5rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activePrinciple}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="font-mono text-xs sm:text-sm text-white/50 leading-relaxed max-w-md"
                >
                  {principles[activePrinciple]?.label}
                </motion.p>
              </AnimatePresence>
            </div>
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