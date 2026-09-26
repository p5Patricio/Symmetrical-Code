import SectionHeading from '../ui/SectionHeading';

interface DeliverablesListProps {
  eyebrow: string;
  title: string;
  items: string[];
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-accent-cyan"
    >
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Qué recibes" — deliverables as a 2-column hairline list with a small
 * check mark instead of a card grid. */
export default function DeliverablesList({ eyebrow, title, items }: DeliverablesListProps) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />

      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 py-4 border-t border-line">
            <CheckIcon />
            <span className="text-text text-[16px] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
