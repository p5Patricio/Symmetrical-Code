import type { ReactNode } from 'react';
import Button from '../ui/Button';

interface LegalBlockParagraph {
  type: 'p';
  text: string;
}

interface LegalBlockList {
  type: 'ul';
  items: string[];
}

/** A paragraph split around one internal route link (e.g. Terms §7 linking
 * to the Privacy notice). Kept as a distinct block type — rather than
 * embedding markup in `text` — so the link is a real <Button variant="link">
 * rendered from data, never `dangerouslySetInnerHTML`. */
interface LegalBlockParagraphLink {
  type: 'p-link';
  before: string;
  linkLabel: string;
  to: string;
  after: string;
}

export type LegalBlock = LegalBlockParagraph | LegalBlockList | LegalBlockParagraphLink;

export interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

interface LegalDocumentProps {
  sections: LegalSection[];
  ids: string[];
  email: string;
}

/** Splits already-interpolated text around every occurrence of `email` and
 * swaps that substring for a real `mailto:` link. Plain string splitting —
 * no HTML parsing, no dangerouslySetInnerHTML. */
function linkifyEmail(text: string, email: string): ReactNode {
  if (!email || !text.includes(email)) return text;
  const parts = text.split(email);
  const nodes: ReactNode[] = [parts[0]];
  for (let i = 1; i < parts.length; i++) {
    nodes.push(
      <Button key={`email-${i}`} variant="link" href={`mailto:${email}`}>
        {email}
      </Button>
    );
    nodes.push(parts[i]);
  }
  return nodes;
}

const PARAGRAPH_CLASS = 'text-text text-[16px] sm:text-[17px] leading-[1.7]';

/** Renders a legal document's numbered sections, separated by hairlines.
 * Section number in mono `--brand-cyan`, title Geist 600 20px, paragraphs
 * 16–17px/1.7, list items with a 6px hairline dash marker instead of a
 * bullet glyph — see design-spec.md. */
export default function LegalDocument({ sections, ids, email }: LegalDocumentProps) {
  return (
    <div className="max-w-[70ch]">
      {sections.map((section, i) => (
        <section
          key={ids[i]}
          id={ids[i]}
          className="scroll-mt-24 border-t border-line py-10 sm:py-12 first:border-t-0 first:pt-0"
        >
          <h2 className="flex items-baseline gap-3 mb-5">
            <span className="font-mono text-sm text-accent-cyan shrink-0" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-sans font-semibold text-text text-[20px] leading-snug">{section.title}</span>
          </h2>

          <div className="flex flex-col gap-4">
            {section.blocks.map((block, bi) => {
              if (block.type === 'ul') {
                return (
                  <ul key={bi} className="flex flex-col gap-1">
                    {block.items.map((item, ii) => (
                      <li
                        key={ii}
                        className={`relative pl-5 ${PARAGRAPH_CLASS} before:content-[''] before:absolute before:left-0 before:top-[13px] before:w-[6px] before:h-px before:bg-line-2`}
                      >
                        {linkifyEmail(item, email)}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'p-link') {
                return (
                  <p key={bi} className={PARAGRAPH_CLASS}>
                    {block.before}
                    <Button variant="link" to={block.to}>
                      {block.linkLabel}
                    </Button>
                    {block.after}
                  </p>
                );
              }

              return (
                <p key={bi} className={PARAGRAPH_CLASS}>
                  {linkifyEmail(block.text, email)}
                </p>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
