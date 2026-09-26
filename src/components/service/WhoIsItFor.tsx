import SectionHeading from '../ui/SectionHeading';

interface WhoIsItForProps {
  eyebrow: string;
  title: string;
  items: string[];
  eyebrowColor?: string;
  /** Dash marker color (e.g. a service page's `var(--svc-accent)`); defaults to `--line-2`. */
  markerColor?: string;
}

/** "Para quién es" — a 2-column list of hairline rows, each marked with a
 * short dash instead of an icon. */
export default function WhoIsItFor({ eyebrow, title, items, eyebrowColor, markerColor }: WhoIsItForProps) {
  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} eyebrowColor={eyebrowColor} className="mb-10" />

      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 py-4 border-t border-line">
            <span
              className="mt-[11px] h-px w-[6px] shrink-0 bg-line-2"
              style={markerColor ? { background: markerColor } : undefined}
              aria-hidden="true"
            />
            <span className="text-text text-[16px] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
