export interface LegalTocItem {
  id: string;
  number: string;
  title: string;
}

interface LegalTocProps {
  label: string;
  items: LegalTocItem[];
  className?: string;
}

/** Numbered table of contents for a legal document. Rendered twice by
 * LegalPage (sticky sidebar on desktop, plain list on mobile) — each copy
 * is toggled with a Tailwind `hidden`/`lg:hidden` pair, which removes the
 * inactive one from layout AND the accessibility tree, so there is no
 * duplicate-landmark issue for assistive tech. */
export default function LegalToc({ label, items, className = '' }: LegalTocProps) {
  return (
    <nav aria-label={label} className={className}>
      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-4">{label}</span>
      <ol className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="flex items-baseline gap-3 py-1.5 text-sm text-muted hover:text-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            >
              <span className="font-mono text-[11px] text-accent-cyan shrink-0 w-5">{item.number}</span>
              <span className="leading-snug">{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
