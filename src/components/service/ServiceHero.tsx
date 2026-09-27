import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import SymmetryBackdrop from '../ui/SymmetryBackdrop';

interface ServiceHeroProps {
  heroBadge: string;
  title: string;
  tagline: string;
  whatsappUrl: string;
}

/** Hero shared by every service page: single left-aligned column over the
 * symmetry-axis backdrop tinted with the service accent. */
export default function ServiceHero({ heroBadge, title, tagline, whatsappUrl }: ServiceHeroProps) {
  const { t } = useTranslation();

  return (
    <div
      className="relative isolate overflow-hidden max-w-[820px] py-10 sm:py-14"
      style={{ '--glow': 'var(--svc-glow-tint)', '--glow-2': 'var(--svc-glow-2-tint)' } as CSSProperties}
    >
      <SymmetryBackdrop />
      {/* The title scales with its own column (container query units), not the
          viewport: 13.4em fits the widest word across all service titles
          ("Implementación", 12.94em in Syne 800), so words never split. */}
      <div className="relative z-10 min-w-0 [container-type:inline-size]">
        <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[var(--svc-accent)] mb-4">
          {heroBadge}
        </span>
        <h1 className="font-syne font-extrabold text-text leading-[1.02] tracking-[-0.02em] text-balance [font-size:clamp(22px,calc(100cqi/13.4),64px)] [hyphens:manual] mb-5">
          {title}
        </h1>
        <p className="text-muted text-lg sm:text-xl leading-relaxed max-w-[60ch] mb-8">{tagline}</p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Button variant="primary" size="lg" href={whatsappUrl} external arrow>
            {t('serviceDetail.cta_whatsapp')}
          </Button>
          <Button variant="secondary" size="lg" href="#deliverables">
            {t('serviceDetail.cta_deliverables')}
          </Button>
        </div>
      </div>
    </div>
  );
}
