interface WhoIsItForProps {
  eyebrow: string;
  title: string;
  items: string[];
}

/** "Para quién es" — a 2-column list of hairline rows, each marked with a
 * short dash instead of an icon. */
export default function WhoIsItFor({ eyebrow, title, items }: WhoIsItForProps) {
  return (
    <div>
      <div className="mb-10">
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3">{eyebrow}</span>
        <h2 className="font-syne font-bold text-text leading-[1.08] tracking-[-0.015em] text-balance text-[clamp(28px,4vw,44px)]">
          {title}
        </h2>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 py-4 border-t border-line">
            <span className="mt-[11px] h-px w-[6px] shrink-0 bg-line-2" aria-hidden="true" />
            <span className="text-text text-[16px] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
