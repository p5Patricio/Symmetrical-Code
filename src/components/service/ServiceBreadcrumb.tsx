interface ServiceBreadcrumbProps {
  ariaLabel: string;
  homeLabel: string;
  title: string;
  onNavigateHome: () => void;
}

/** Minimal breadcrumb: "Servicios / <title>", first segment goes back to the
 * home services section. Replaces the old service-swap pill entirely. */
export default function ServiceBreadcrumb({ ariaLabel, homeLabel, title, onNavigateHome }: ServiceBreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className="mb-10 sm:mb-14 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-subtle">
      <button
        type="button"
        onClick={onNavigateHome}
        className="bg-transparent border-0 p-0 font-mono text-[12px] uppercase tracking-[0.1em] text-subtle hover:text-text transition-colors cursor-pointer"
      >
        {homeLabel}
      </button>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="truncate text-subtle">
        {title}
      </span>
    </nav>
  );
}
