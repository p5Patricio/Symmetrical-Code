import type { PracticalSolution } from '../../data/services';

interface SolutionsListProps {
  eyebrow: string;
  title: string;
  solutions: PracticalSolution[];
  isEs: boolean;
}

/** "Qué resolvemos" — sticky eyebrow/title column + hairline rows, one per
 * practical solution. No icons, no tags: title and description only. */
export default function SolutionsList({ eyebrow, title, solutions, isEs }: SolutionsListProps) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,.9fr)_minmax(0,2.1fr)] lg:gap-x-14">
      <div className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted mb-3">{eyebrow}</span>
        <h2 className="font-syne font-bold text-text leading-[1.08] tracking-[-0.015em] text-balance text-[clamp(28px,4vw,44px)]">
          {title}
        </h2>
      </div>

      <div>
        {solutions.map((sol, idx) => {
          const solTitle = isEs ? sol.titleEs : sol.titleEn;
          const solDesc = isEs ? sol.descriptionEs : sol.descriptionEn;
          return (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)] gap-3 sm:gap-8 py-6 border-t border-line"
            >
              <h3 className="font-sans font-semibold text-text text-[18px] sm:text-[20px]">{solTitle}</h3>
              <p className="text-muted text-[16px] leading-relaxed">{solDesc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
