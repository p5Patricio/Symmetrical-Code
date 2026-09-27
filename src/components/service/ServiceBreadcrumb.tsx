import Button from '../ui/Button';

interface ServiceBreadcrumbProps {
  ariaLabel: string;
  homeLabel: string;
  title: string;
  onNavigateHome: () => void;
  /** Next service in `servicesData` order (cycles from last to first). */
  nextServiceSlug: string;
  nextServiceLabel: string;
  nextServiceAriaLabel: string;
}

/** Minimal breadcrumb: "Servicios / <title>", first segment goes back to the
 * home services section. Replaces the old service-swap pill entirely. A
 * small "next service" button sits on the same row, wrapping underneath on
 * narrow screens instead of overflowing. */
export default function ServiceBreadcrumb({
  ariaLabel,
  homeLabel,
  title,
  onNavigateHome,
  nextServiceSlug,
  nextServiceLabel,
  nextServiceAriaLabel,
}: ServiceBreadcrumbProps) {
  return (
    <div className="mb-10 sm:mb-14 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
      <nav aria-label={ariaLabel} className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-subtle min-w-0">
        <button
          type="button"
          onClick={onNavigateHome}
          className="bg-transparent border-0 p-0 font-mono text-[12px] uppercase tracking-[0.1em] text-subtle hover:text-text transition-colors cursor-pointer"
        >
          {homeLabel}
        </button>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="truncate text-[var(--svc-accent,var(--subtle))]">
          {title}
        </span>
      </nav>

      <Button
        to={`/servicios/${nextServiceSlug}`}
        variant="secondary"
        size="sm"
        arrow
        title={nextServiceAriaLabel}
        aria-label={nextServiceAriaLabel}
      >
        {nextServiceLabel}
      </Button>
    </div>
  );
}
