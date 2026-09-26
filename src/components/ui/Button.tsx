import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export interface ButtonProps {
  /** Visual role. Only one `primary` per view/section — see design-spec.md. */
  variant?: 'primary' | 'secondary' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  /** Renders a react-router `<Link>`. */
  to?: string;
  /** Renders an `<a>`. Combine with `external` for target/rel. */
  href?: string;
  external?: boolean;
  /** Trailing arrow that nudges 3px right on hover. */
  arrow?: boolean;
  leadingIcon?: React.ReactNode;
  /**
   * Forces a square, text-less button (width === height, no inline padding).
   * Implied by `variant="icon"`. Always pair with `aria-label` when the
   * button carries no visible text.
   */
  iconOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  title?: string;
  id?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-current'?: React.AriaAttributes['aria-current'];
  'aria-hidden'?: boolean;
}

const ArrowIcon = () => (
  <svg className="sc-btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The one button component for the redesign — "symmetric cut" family B.
 * Renders `<Link>` when `to` is set, `<a>` when `href` is set, otherwise
 * `<button>`. See design-spec.md for the full spec this implements.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  external = false,
  arrow = false,
  leadingIcon,
  iconOnly = false,
  className = '',
  children,
  style,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isLink = variant === 'link';
  const isIconVariant = variant === 'icon';
  const squareOnly = iconOnly || isIconVariant;

  const classes = [
    isLink ? 'sc-link' : 'sc-btn',
    isLink ? '' : `sc-btn--${isIconVariant ? 'secondary' : variant}`,
    isLink ? '' : `sc-btn--${size}`,
    squareOnly && !isLink ? 'sc-btn--icon-only' : '',
    isIconVariant ? 'sc-btn--icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {leadingIcon && (
        <span className="sc-btn__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children}
      {arrow && <ArrowIcon />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} style={style} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        style={style}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} style={style} {...rest}>
      {content}
    </button>
  );
}
