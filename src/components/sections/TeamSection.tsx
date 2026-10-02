import { useTranslation } from 'react-i18next';
import ProjectWorkflow from './ProjectWorkflow';
import SectionHeading from '../ui/SectionHeading';

const AcademicCapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg className="team-member-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Institution {
  id: string;
  name: string;
  badge: string;
  description: string;
}

interface InstitutionLogoConfig {
  src: string;
  darkSrc?: string;
  alt: string;
  /**
   * Optical balance factor. Each source file carries a different amount of
   * built-in padding, so sizing them all to the same box makes a compact
   * wordmark look twice the weight of a detailed crest. This normalizes the
   * ink, not the canvas.
   */
  scale: number;
}

interface TeamMember {
  name: string;
  /** Optional — some members don't have a public role/title yet. */
  role?: string;
  url: string;
  domain: string;
}

const institutionLogos: Record<string, InstitutionLogoConfig> = {
  ugto: {
    src: '/images/institutions/ugto.webp',
    alt: 'Universidad de Guanajuato',
    scale: 0.92,
  },
  santander: {
    src: '/images/institutions/santander.png',
    darkSrc: '/images/institutions/santander-dark.png',
    alt: 'Santander Open Academy',
    scale: 0.95,
  },
  aws: {
    src: '/images/institutions/aws.png',
    alt: 'Amazon Web Services',
    scale: 0.62,
  },
  udemy: {
    src: '/images/institutions/udemy.png',
    darkSrc: '/images/institutions/udemy-dark.png',
    alt: 'Udemy',
    scale: 0.46,
  },
};

export default function Team() {
  const { t } = useTranslation();

  const rawInstitutions = t('team.institutions', { returnObjects: true });
  const institutions = Array.isArray(rawInstitutions) ? (rawInstitutions as Institution[]) : [];

  const rawMembers = t('team.members', { returnObjects: true });
  const members = Array.isArray(rawMembers) ? (rawMembers as TeamMember[]) : [];

  return (
    <section id="team" className="relative py-20 sm:py-24 md:py-28 lg:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ─── Header ─── */}
        <div className="mb-14 sm:mb-18 md:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="font-mono text-xs sm:text-sm tracking-[0.14em] uppercase text-muted">
              {t('team.label')}
            </span>
            <div className="h-px flex-1 bg-line" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-8 justify-between">
            <SectionHeading title={t('team.title')} size="xl" className="max-w-3xl" />
            <p className="text-muted text-base sm:text-lg max-w-sm leading-relaxed lg:text-right">
              {t('team.subtitle')}
            </p>
          </div>
        </div>

        {/* ─── Institutions vitrine ─── */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-line">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 text-accent-cyan">
                <AcademicCapIcon />
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase">
                  {t('team.institutions_label')}
                </span>
              </div>
              <h3 className="font-sans font-semibold text-lg sm:text-xl text-text">
                {t('team.institutions_title')}
              </h3>
            </div>
            <p className="text-muted text-xs sm:text-sm max-w-md leading-relaxed sm:text-right">
              {t('team.institutions_desc')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-8 pt-4">
            {institutions.map((inst) => {
              const logo = institutionLogos[inst.id];
              if (!logo) return null;

              const variants = logo.darkSrc
                ? [
                    { src: logo.src, variantClass: 'inst-logo-light' },
                    { src: logo.darkSrc, variantClass: 'inst-logo-dark' },
                  ]
                : [{ src: logo.src, variantClass: '' }];

              return (
                <div key={inst.id} className="team-inst flex flex-col items-center gap-4 text-center">
                  <div className="team-inst-plate" style={{ ['--logo-scale' as string]: logo.scale }}>
                    {variants.map((variant) => (
                      <img
                        key={variant.src}
                        src={variant.src}
                        alt={logo.alt}
                        className={`team-inst-logo ${variant.variantClass}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-cyan">
                      {inst.badge}
                    </span>
                    <h4 className="font-sans font-semibold text-sm text-text">{inst.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Methodology / 4-stage workflow ─── */}
        <ProjectWorkflow />

        {/* ─── Meet the team ─── */}
        <div className="team-members border-t border-line py-10">
          <div className="team-members-grid">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-muted">
              {t('team.members_label')}
            </span>
            <div className="team-members-list">
              {members.map((member) => (
                <a
                  key={member.name}
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('team.members_link_aria', { name: member.name })}
                  className="team-member"
                >
                  <span className="team-member-main">
                    <span className="team-member-name">{member.name}</span>
                    <ArrowUpRightIcon />
                  </span>
                  {member.role && <span className="team-member-role">{member.role}</span>}
                  <span className="team-member-domain" title={member.domain}>
                    {member.domain}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .team-inst-plate {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56px;
        }

        @media (min-width: 640px) {
          .team-inst-plate { height: 72px; }
        }

        @media (min-width: 1024px) {
          .team-inst-plate { height: 84px; }
        }

        .team-inst-logo {
          max-height: calc(100% * var(--logo-scale, 1));
          max-width: 90%;
          object-fit: contain;
          opacity: 0.82;
          transition: opacity 0.2s ease;
          user-select: none;
          -webkit-user-drag: none;
        }

        .team-inst:hover .team-inst-logo {
          opacity: 1;
        }

        .inst-logo-dark { display: block; }
        .inst-logo-light { display: none; }

        html.light .inst-logo-dark { display: none; }
        html.light .inst-logo-light { display: block; }

        .team-members-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .team-members-grid {
            grid-template-columns: 200px 1fr;
            gap: 32px;
          }
        }

        .team-members-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* 3 members, no orphan: 1 column below 900px, 3 columns at/above it. */
        @media (min-width: 900px) {
          .team-members-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }

        .team-member {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-decoration: none;
          border-radius: 2px;
          min-width: 0;
        }

        .team-member-main {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .team-member-name {
          font-family: var(--ff-text);
          font-weight: 600;
          font-size: 17px;
          color: var(--text);
          text-decoration-line: underline;
          text-decoration-color: transparent;
          text-decoration-thickness: 1px;
          text-underline-offset: 5px;
          transition: text-decoration-color 0.18s ease;
        }

        .team-member:hover .team-member-name,
        .team-member:focus-visible .team-member-name {
          text-decoration-color: var(--brand-cyan);
        }

        .team-member-arrow {
          flex: none;
          color: var(--muted);
          transition: transform 0.18s ease, color 0.18s ease;
        }

        .team-member:hover .team-member-arrow,
        .team-member:focus-visible .team-member-arrow {
          transform: translate(2px, -2px);
          color: var(--brand-cyan);
        }

        .team-member-role {
          font-family: var(--ff-text);
          font-size: 14px;
          color: var(--muted);
        }

        .team-member-domain {
          font-family: var(--ff-mono);
          font-size: 12px;
          color: var(--subtle);
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .team-member:focus-visible {
          outline: 2px solid var(--focus);
          outline-offset: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .team-inst-logo,
          .team-member-name,
          .team-member-arrow {
            transition: none;
          }
        }
      ` }} />
    </section>
  );
}
