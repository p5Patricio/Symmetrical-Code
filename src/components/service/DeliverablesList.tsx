import SectionHeading from '../ui/SectionHeading';

interface DeliverablesListProps {
  eyebrow: string;
  title: string;
  items: string[];
  eyebrowColor?: string;
  /** Check icon color (e.g. a service page's `var(--svc-accent)`); defaults to `--accent-cyan`. */
  iconColor?: string;
}

function CheckIcon({ color }: { color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={color ? 'mt-[3px] shrink-0' : 'mt-[3px] shrink-0 text-accent-cyan'}
      style={color ? { color } : undefined}
    >
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Qué recibes" — deliverables as a 2-column hairline list with a small
 * check mark instead of a card grid. */
export default function DeliverablesList({ eyebrow, title, items, eyebrowColor, iconColor }: DeliverablesListProps) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} eyebrowColor={eyebrowColor} className="mb-10" />

      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 py-4 border-t border-line">
            <CheckIcon color={iconColor} />
            <span className="text-text text-[16px] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
