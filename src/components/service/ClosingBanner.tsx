import Button from '../ui/Button';

interface ClosingBannerProps {
  eyebrow: string;
  title: string;
  desc: string;
  ctaLabel: string;
  whatsappUrl: string;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
}

/** Closing CTA band: one primary WhatsApp button plus an optional link. */
export default function ClosingBanner({
  eyebrow,
  title,
  desc,
  ctaLabel,
  whatsappUrl,
  secondaryLabel,
  onSecondaryClick,
}: ClosingBannerProps) {
  return (
    <div className="max-w-2xl">
      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">{eyebrow}</span>
      <h2 className="font-syne font-bold text-text leading-[1.08] tracking-[-0.015em] text-balance text-[clamp(28px,4vw,44px)] mb-4">
        {title}
      </h2>
      <p className="text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-[60ch]">{desc}</p>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <Button variant="primary" size="lg" href={whatsappUrl} external arrow>
          {ctaLabel}
        </Button>
        {secondaryLabel && (
          <Button variant="link" onClick={onSecondaryClick}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
