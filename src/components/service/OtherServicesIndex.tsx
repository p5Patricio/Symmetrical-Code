import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

export interface OtherServiceEntry {
  slug: string;
  title: string;
  shortDesc: string;
  /** That service's own accent color (theme-resolved) — used for this row's hover/focus underline. */
  accentColor?: string;
}

interface OtherServicesIndexProps {
  eyebrow: string;
  services: OtherServiceEntry[];
}

function ArrowIcon() {
  return (
    <svg className="osi-row__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Otros servicios" — the remaining services as a plain hairline-row index,
 * replacing the previous prev/next swap pill and card grid. */
export default function OtherServicesIndex({ eyebrow, services }: OtherServicesIndexProps) {
  return (
    <div>
      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-6">{eyebrow}</span>

      <div>
        {services.map((svc) => (
          <Link
            key={svc.slug}
            to={`/servicios/${svc.slug}`}
            className="osi-row border-t border-line"
            style={svc.accentColor ? ({ '--osi-accent': svc.accentColor } as CSSProperties) : undefined}
          >
            <span className="osi-row__title">{svc.title}</span>
            <span className="osi-row__desc">{svc.shortDesc}</span>
            <ArrowIcon />
          </Link>
        ))}
      </div>

      <style>{`
        .osi-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr) 20px;
          align-items: center;
          gap: 16px;
          padding-block: 20px;
          text-decoration: none;
        }
        @media (max-width: 639.98px) {
          .osi-row {
            grid-template-columns: 1fr 20px;
            row-gap: 4px;
          }
          .osi-row__desc {
            grid-column: 1 / -1;
          }
        }
        .osi-row__title {
          font-family: var(--ff-text);
          font-weight: 600;
          font-size: 18px;
          color: var(--text);
          text-decoration-line: underline;
          text-decoration-color: transparent;
          text-decoration-thickness: 1px;
          text-underline-offset: 5px;
          transition: text-decoration-color 0.18s ease;
        }
        @media (min-width: 640px) {
          .osi-row__title {
            font-size: 20px;
          }
        }
        .osi-row:hover .osi-row__title,
        .osi-row:focus-visible .osi-row__title {
          text-decoration-color: var(--osi-accent, var(--brand-cyan));
        }
        .osi-row__desc {
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
        }
        .osi-row__arrow {
          color: var(--muted);
          transition: transform 0.18s ease, color 0.18s ease;
        }
        .osi-row:hover .osi-row__arrow,
        .osi-row:focus-visible .osi-row__arrow {
          transform: translate(3px, -3px);
          color: var(--osi-accent, var(--brand-cyan));
        }
        .osi-row:focus-visible {
          outline: 2px solid var(--focus);
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .osi-row__title,
          .osi-row__arrow {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
