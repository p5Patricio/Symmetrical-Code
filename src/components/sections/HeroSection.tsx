import { useMemo, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import SymmetryBackdrop from '../ui/SymmetryBackdrop';
import './HeroSection.css';

const revealDelay = (ms: number): CSSProperties => ({ '--reveal-delay': `${ms}ms` } as CSSProperties);

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const isEs = (i18n?.resolvedLanguage || i18n?.language || 'es').startsWith('es');

  const whatsappUrl = 'https://wa.me/524737374224';

  const principleColumns = useMemo(
    () => [
      { word: isEs ? 'Claridad' : 'Clarity', label: t('hero.stat_1_label') },
      { word: isEs ? 'Balance' : 'Balance', label: t('hero.stat_2_label') },
      { word: isEs ? 'Futuro' : 'Future', label: t('hero.stat_3_label') },
    ],
    [isEs, t]
  );

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 min-h-screen bg-transparent"
    >
      <SymmetryBackdrop />

      <div className="relative z-10 max-w-3xl mx-auto w-full min-w-0 flex flex-col items-center">
        {/* Eyebrow — mono label, no glass pill. Wraps and re-centers under 400px. */}
        <div
          className="hero-reveal flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8 text-center"
          style={revealDelay(0)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.14em] max-[400px]:tracking-[0.08em] uppercase text-muted">
            {t('hero.label')}
          </span>
        </div>

        {/* Logo mark */}
        <div className="hero-reveal mb-5 sm:mb-7" style={revealDelay(80)}>
          <img
            src="/favicon.svg"
            alt="Symmetrical Code"
            className="object-contain cursor-pointer"
            style={{ width: 'clamp(96px, 12vw, 148px)', height: 'clamp(96px, 12vw, 148px)' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        {/* H1 — font-size lives in hero-title (HeroSection.css): the fixed
            40px clamp() floor made "Symmetrical" ~402px wide at 320-430px
            viewports, wider than the viewport itself, so section#home's
            overflow-hidden clipped the whole hero column. hero-title keeps
            the word within (100vw - 40px) below ~442px, then hands off to
            the original 7vw/80px curve unchanged (desktop look untouched). */}
        <h1
          className="hero-reveal hero-title font-syne font-extrabold tracking-[-0.02em] leading-[0.98] text-text mb-8 sm:mb-10"
          style={revealDelay(160)}
        >
          Symmetrical <span className="text-accent-blue">Code</span>
        </h1>

        {/* CTAs — max one primary per view. Stacked + full-width (same
            width via items-stretch) below 480px, inline from 480px up. */}
        <div
          className="hero-reveal flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center justify-center gap-3 w-full min-[480px]:w-auto max-w-[360px] min-[480px]:max-w-none mb-10 sm:mb-14"
          style={revealDelay(240)}
        >
          <Button variant="primary" size="lg" href={whatsappUrl} external arrow>
            {t('hero.cta_primary')}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('hero.cta_secondary')}
          </Button>
        </div>

        {/* Studio principles — stacked rows w/ horizontal hairlines below
            640px, 3 hairline-divided columns from 640px up. Titles are
            Geist 600 (Syne is never used below H2 level per design-spec). */}
        <div
          className="hero-reveal w-full min-w-0 max-w-2xl flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-line mb-8 sm:mb-10"
          style={revealDelay(320)}
        >
          {principleColumns.map((col, i) => (
            <div key={i} className="flex-1 min-w-0 py-3 sm:py-0 sm:px-6 first:pt-0 last:pb-0 sm:first:pl-0 sm:last:pr-0">
              <div className="font-sans font-semibold text-sm sm:text-base mb-1 text-accent-blue">{col.word}</div>
              <div className="font-mono text-[10px] sm:text-[11px] leading-snug text-subtle">{col.label}</div>
            </div>
          ))}
        </div>

        {/* Meta line — stacks the two parts and hides the separator below 640px */}
        <div
          className="hero-reveal flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-6 font-mono text-[10px] sm:text-xs text-subtle text-center"
          style={revealDelay(400)}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-blue" />
            {t('hero.location')}
          </span>
          <span className="hidden sm:inline text-line-2">|</span>
          <span>{t('hero.availability')}</span>
        </div>
      </div>
    </section>
  );
}
