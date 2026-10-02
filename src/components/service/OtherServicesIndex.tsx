import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export interface OtherServiceEntry {
  slug: string;
  title: string;
  /** That service's own accent color (theme-resolved) — used for this
   * chip's dot, underline and arrow. */
  accentColor?: string;
}

interface OtherServicesIndexProps {
  eyebrow: string;
  services: OtherServiceEntry[];
}

function ArrowIcon() {
  return (
    <svg className="osi-chip__arrow" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Otros servicios" — the remaining service titles only, as a compact wrap
 * of chips with an accent dot, an underline-on-hover title, and a small
 * arrow. Replaces the previous description-row index and card grid. */
export default function OtherServicesIndex({ eyebrow, services }: OtherServicesIndexProps) {
  return (
    <div>
      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-8">{eyebrow}</span>

      <div className="flex flex-wrap gap-x-8 gap-y-5">
        {services.map((svc) => (
          <Link
            key={svc.slug}
            to={`/servicios/${svc.slug}`}
            className="osi-chip"
            style={svc.accentColor ? ({ '--osi-accent': svc.accentColor } as CSSProperties) : undefined}
          >
            <span className="osi-chip__dot" aria-hidden="true" />
            <span className="osi-chip__title">{svc.title}</span>
            <ArrowIcon />
          </Link>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .osi-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding-block: 4px;
        }
        .osi-chip__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--osi-accent, var(--brand-cyan));
          flex-shrink: 0;
        }
        .osi-chip__title {
          font-family: var(--ff-text);
          font-weight: 600;
          font-size: 16px;
          color: var(--text);
          text-decoration-line: underline;
          text-decoration-color: transparent;
          text-decoration-thickness: 1px;
          text-underline-offset: 5px;
          transition: text-decoration-color 0.18s ease;
        }
        @media (min-width: 640px) {
          .osi-chip__title {
            font-size: 17px;
          }
        }
        .osi-chip:hover .osi-chip__title,
        .osi-chip:focus-visible .osi-chip__title {
          text-decoration-color: var(--osi-accent, var(--brand-cyan));
        }
        .osi-chip__arrow {
          color: var(--muted);
          transition: transform 0.18s ease, color 0.18s ease;
        }
        .osi-chip:hover .osi-chip__arrow,
        .osi-chip:focus-visible .osi-chip__arrow {
          transform: translate(2px, -2px);
          color: var(--osi-accent, var(--brand-cyan));
        }
        .osi-chip:focus-visible {
          outline: 2px solid var(--focus);
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .osi-chip__title,
          .osi-chip__arrow {
            transition: none;
          }
        }
      ` }} />
    </div>
  );
}
