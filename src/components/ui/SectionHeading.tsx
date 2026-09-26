import type { ReactNode } from 'react';

type Align = 'left' | 'center';

interface SectionHeadingProps {
  /** Small mono label above the title (e.g. a category or eyebrow tag). */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Supporting copy under the title, capped at ~60ch. */
  description?: ReactNode;
  /** Heading level. Defaults to 'h2'; pass 'h3' for a subsection title. */
  as?: 'h2' | 'h3';
  align?: Align;
  className?: string;
  /** Applied to the title element so a parent <section> can use aria-labelledby. */
  id?: string;
}

const ALIGN_CLASSES: Record<Align, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
};

/**
 * Standard section heading: eyebrow + title + optional description.
 * Title style is the site's canonical section H2 ("Why Symmetrical Code"):
 * Syne bold, clamp(28px, 4vw, 44px), tight leading/tracking, text-balance.
 * Syne is reserved for this level — never use it below H2/H3.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  as = 'h2',
  align = 'left',
  className = '',
  id,
}: SectionHeadingProps) {
  const Tag = as;

  return (
    <div className={`flex flex-col gap-3 ${ALIGN_CLASSES[align]} ${className}`}>
      {eyebrow && (
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-muted">
          {eyebrow}
        </span>
      )}
      <Tag
        id={id}
        className="font-syne font-bold text-text leading-[1.08] tracking-[-0.015em] text-balance text-[clamp(28px,4vw,44px)]"
      >
        {title}
      </Tag>
      {description && (
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-[60ch]">{description}</p>
      )}
    </div>
  );
}
