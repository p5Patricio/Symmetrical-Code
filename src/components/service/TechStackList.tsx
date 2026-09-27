import type { TechItem } from '../../data/services';
import { getServiceTechLogo, isMonoDarkLogo } from '../../data/techLogos';
import SectionHeading from '../ui/SectionHeading';

interface TechStackListProps {
  eyebrow: string;
  title: string;
  description: string;
  items: TechItem[];
  eyebrowColor?: string;
}

interface TechGroup {
  category: string;
  items: TechItem[];
}

/** Groups techStack items by category, preserving first-appearance order. */
function groupByCategory(items: TechItem[]): TechGroup[] {
  const order: string[] = [];
  const byCategory = new Map<string, TechItem[]>();

  for (const item of items) {
    if (!byCategory.has(item.category)) {
      byCategory.set(item.category, []);
      order.push(item.category);
    }
    byCategory.get(item.category)!.push(item);
  }

  return order.map((category) => ({ category, items: byCategory.get(category)! }));
}

/** Tech stack grouped by category — one hairline row per category, items
 * listed inline with a small self-hosted logo mark, name, and highlight
 * text (see src/data/techLogos.tsx; unmatched names render text-only). */
export default function TechStackList({ eyebrow, title, description, items, eyebrowColor }: TechStackListProps) {
  const groups = groupByCategory(items);

  return (
    <div>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        eyebrowColor={eyebrowColor}
        className="mb-10 max-w-2xl"
      />

      <div>
        {groups.map(({ category, items: groupItems }) => (
          <div
            key={category}
            className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-3 sm:gap-6 py-5 border-t border-line"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{category}</span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {groupItems.map((tech) => {
                const Logo = getServiceTechLogo(tech.name);
                return (
                  <span key={tech.name} className="inline-flex items-baseline gap-2">
                    {Logo && (
                      <Logo
                        aria-hidden="true"
                        className={`w-[15px] h-[15px] shrink-0 self-center ${isMonoDarkLogo(Logo) ? 'logo--mono' : ''}`}
                      />
                    )}
                    <span className="font-sans font-medium text-text text-[15px]">{tech.name}</span>
                    {tech.highlight && <span className="text-muted text-[14px]">{tech.highlight}</span>}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
