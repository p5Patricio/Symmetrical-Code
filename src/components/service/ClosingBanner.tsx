import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

interface ClosingBannerProps {
  eyebrow: string;
  title: string;
  desc: string;
  ctaLabel: string;
  whatsappUrl: string;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  eyebrowColor?: string;
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
  eyebrowColor,
}: ClosingBannerProps) {
  return (
    <div className="max-w-2xl">
      <SectionHeading eyebrow={eyebrow} title={title} description={desc} eyebrowColor={eyebrowColor} className="mb-8" />

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
