import type { ReactNode } from 'react';
import './SectionHeading.css';

type Align = 'left' | 'center';
type Size = 'xl' | 'lg';

interface SectionHeadingProps {
  /** Small mono label above the title (e.g. a category or eyebrow tag). */
  eyebrow?: ReactNode;
  title: ReactNode;
  /** Supporting copy under the title, capped at ~60ch. */
  description?: ReactNode;
  /** Heading level. Defaults to 'h2'; pass 'h3' for a subsection title. */
  as?: 'h2' | 'h3';
  align?: Align;
  /**
   * Title size. `xl` (up to 72px) is for home sections (Services, Projects,
   * Why, Workflow). `lg` (default, up to ~52px) is for inner pages (service
   * detail sections, legal).
   */
  size?: Size;
  className?: string;
  /** Applied to the title element so a parent <section> can use aria-labelledby. */
  id?: string;
  /**
   * Optional override for the eyebrow's color (e.g. a service page's
   * `var(--svc-accent)`). Left unset, the eyebrow keeps the default
   * `--muted` treatment used site-wide.
   */
  eyebrowColor?: string;
}

const ALIGN_CLASSES: Record<Align, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
};

/**
 * Standard section heading: eyebrow + title + optional description.
 * Title style is the site's canonical section title: Syne ExtraBold (800,
 * Syne's max), tight tracking (-0.03em), line-height ~1.08, no uppercase,
 * text-balance. Syne is reserved for this level — never use it below H2/H3.
 * The wrapper is a container so long words never overflow narrow columns
 * (e.g. service-page sticky columns) — see SectionHeading.css.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  as = 'h2',
  align = 'left',
  size = 'lg',
  className = '',
  id,
  eyebrowColor,
}: SectionHeadingProps) {
  const Tag = as;

  return (
    <div className={`sh-wrap flex flex-col gap-3 ${ALIGN_CLASSES[align]} ${className}`}>
      {eyebrow && (
        <span
          className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-muted"
          style={eyebrowColor ? { color: eyebrowColor } : undefined}
        >
          {eyebrow}
        </span>
      )}
      <Tag id={id} className={`sh-title sh-title--${size} text-text text-balance`}>
        {title}
      </Tag>
      {description && (
        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-[60ch]">{description}</p>
      )}
    </div>
  );
}
