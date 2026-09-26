import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import SymmetryBackdrop from '../ui/SymmetryBackdrop';

interface ServiceHeroProps {
  heroBadge: string;
  title: string;
  tagline: string;
  whatsappUrl: string;
  heroImageUrl?: string;
}

/** Hero: two columns when the service has a hero image, single centered-left
 * column with the symmetry-axis backdrop when it doesn't. */
export default function ServiceHero({ heroBadge, title, tagline, whatsappUrl, heroImageUrl }: ServiceHeroProps) {
  const { t } = useTranslation();

  // The title scales with its own column (container query units), not the viewport:
  // 13.4em fits the widest word across all service titles ("Implementación", 12.94em
  // in Syne 800) with margin. Long words wrap only as a last resort.
  const textBlock = (
    <div className="min-w-0 [container-type:inline-size]">
      <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[var(--svc-accent)] mb-4">
        {heroBadge}
      </span>
      <h1 className="font-syne font-extrabold text-text leading-[1.02] tracking-[-0.02em] text-balance [font-size:clamp(22px,calc(100cqi/13.4),64px)] [overflow-wrap:break-word] hyphens-auto mb-5">
        {title}
      </h1>
      <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-[48ch] mb-8">{tagline}</p>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Button variant="primary" size="lg" href={whatsappUrl} external arrow>
          {t('serviceDetail.cta_whatsapp')}
        </Button>
        <Button variant="secondary" size="lg" href="#deliverables">
          {t('serviceDetail.cta_deliverables')}
        </Button>
      </div>
    </div>
  );

  if (heroImageUrl) {
    return (
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
        {textBlock}
        <div className="w-full aspect-square overflow-hidden rounded-xl border border-line-2">
          <img
            src={heroImageUrl}
            alt={t('serviceDetail.hero_image_alt', { title })}
            width={1200}
            height={1200}
            loading="eager"
            // React 18 only forwards the lowercase attribute; `fetchPriority` triggers an unknown-prop warning.
            {...{ fetchpriority: 'high' }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative isolate overflow-hidden max-w-[820px] py-10 sm:py-14"
      style={{ '--glow': 'var(--svc-glow-tint)', '--glow-2': 'var(--svc-glow-2-tint)' } as CSSProperties}
    >
      <SymmetryBackdrop />
      <div className="relative z-10">{textBlock}</div>
    </div>
  );
}
