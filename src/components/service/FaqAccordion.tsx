import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';

export interface FaqAccordionItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  eyebrow: string;
  title: string;
  items: FaqAccordionItem[];
}

function FaqIcon({ open }: { open: boolean }) {
  return (
    <span className="faq-icon" aria-hidden="true">
      <span className="faq-icon__bar faq-icon__bar--h" />
      <span className={`faq-icon__bar faq-icon__bar--v ${open ? 'faq-icon__bar--v-open' : ''}`} />
    </span>
  );
}

/** Accessible FAQ accordion. Multiple items may be open at once; the panel
 * animates open with a `grid-template-rows` trick (0fr -> 1fr) and honors
 * `prefers-reduced-motion`. */
export default function FaqAccordion({ eyebrow, title, items }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<ReadonlySet<number>>(new Set([0]));

  const toggle = (idx: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div>
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />

      <div>
        {items.map((item, idx) => {
          const isOpen = openIndexes.has(idx);
          const panelId = `faq-panel-${idx}`;
          const buttonId = `faq-button-${idx}`;

          return (
            <div key={idx} className="border-t border-line">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left font-sans font-medium text-text text-[17px] cursor-pointer bg-transparent border-0"
              >
                <span>{item.question}</span>
                <FaqIcon open={isOpen} />
              </button>

              <div id={panelId} role="region" aria-labelledby={buttonId} className={`faq-panel ${isOpen ? 'faq-panel--open' : ''}`}>
                <div className="faq-panel__inner">
                  <p className="text-muted text-base leading-relaxed max-w-[70ch] pb-5">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .faq-panel {
          display: grid;
          grid-template-rows: 0fr;
          overflow: hidden;
          transition: grid-template-rows 0.2s ease;
        }
        .faq-panel--open {
          grid-template-rows: 1fr;
        }
        .faq-panel__inner {
          min-height: 0;
        }
        .faq-icon {
          position: relative;
          width: 16px;
          height: 16px;
          flex: none;
          color: var(--muted);
        }
        .faq-icon__bar {
          position: absolute;
          background: currentColor;
        }
        .faq-icon__bar--h {
          left: 0;
          top: 50%;
          width: 16px;
          height: 1px;
          transform: translateY(-50%);
        }
        .faq-icon__bar--v {
          left: 50%;
          top: 0;
          width: 1px;
          height: 16px;
          transform: translateX(-50%);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .faq-icon__bar--v-open {
          opacity: 0;
          transform: translateX(-50%) rotate(90deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-panel,
          .faq-icon__bar--v {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
