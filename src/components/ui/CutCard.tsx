import { createElement, forwardRef } from 'react';
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import './CutCard.css';

export interface CutCardProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /** Element to render — 'div' (default) or 'article' for a clickable tile. */
  as?: ElementType;
  /**
   * Accent color used for the hover/focus ring and the corner detail.
   * Falls back to `--brand-blue` when omitted.
   */
  accentColor?: string;
  children?: ReactNode;
}

/**
 * Reusable cut-corner card: top-left and bottom-right corners cut at 45°
 * (rotational symmetry like the S logo and the button system), no
 * border-radius, 1px ring in `--line-2` that turns into `accentColor` on
 * hover/focus-within with a 2px lift. See CutCard.css for the shape math.
 */
const CutCard = forwardRef<HTMLElement, CutCardProps>(function CutCard(
  { as = 'div', accentColor, className = '', style, children, ...rest },
  ref
) {
  const mergedStyle: CSSProperties = {
    ...(accentColor ? ({ '--cc-accent': accentColor } as CSSProperties) : {}),
    ...style,
  };

  return createElement(
    as,
    { ref, className: `cc-card ${className}`, style: mergedStyle, ...rest },
    children,
    <span key="cc-corner-tl" className="cc-card__corner cc-card__corner--tl" aria-hidden="true" />,
    <span key="cc-corner-br" className="cc-card__corner cc-card__corner--br" aria-hidden="true" />
  );
});

export default CutCard;
