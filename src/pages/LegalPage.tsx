import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import LegalToc from '../components/legal/LegalToc';
import LegalDocument, { type LegalSection } from '../components/legal/LegalDocument';

export type LegalDocKey = 'privacy' | 'terms';

interface LegalPageProps {
  doc: LegalDocKey;
}

const ROUTE_BY_DOC: Record<LegalDocKey, string> = {
  privacy: '/privacidad',
  terms: '/terminos',
};

/** Container for /privacidad and /terminos. Selects the `privacy` | `terms`
 * document via the `doc` prop (each route in App.tsx passes its own),
 * fetches its content from the `legal` i18n namespace (returnObjects, with
 * {{email}} interpolation — see LegalPage.test.tsx for proof this works
 * through a nested array) and hands it to the presentational LegalDocument +
 * LegalToc components. */
export default function LegalPage({ doc }: LegalPageProps) {
  const { t } = useTranslation();

  const email = t('legal.email');
  const lastUpdated = t('legal.last_updated');
  const tocLabel = t('legal.toc_label');
  const backHomeLabel = t('legal.back_home');

  const title = t(`legal.${doc}.title`);
  const intro = t(`legal.${doc}.intro`, { email });

  const sections = useMemo(
    () => t(`legal.${doc}.sections`, { returnObjects: true, email }) as LegalSection[],
    [t, doc, email]
  );

  const ids = useMemo(() => sections.map((_, i) => `section-${i + 1}`), [sections]);

  const tocItems = useMemo(
    () =>
      sections.map((section, i) => ({
        id: ids[i],
        number: String(i + 1).padStart(2, '0'),
        title: section.title,
      })),
    [sections, ids]
  );

  const otherDoc: LegalDocKey = doc === 'privacy' ? 'terms' : 'privacy';
  const otherLabel = t(doc === 'privacy' ? 'legal.view_terms' : 'legal.view_privacy');
  const path = ROUTE_BY_DOC[doc];
  const pageTitle = `${title} — Symmetrical Code`;

  return (
    <div className="min-h-screen bg-ink text-text">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={intro} />
        <link rel="canonical" href={`https://www.symmetricalcode.com${path}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={intro} />
        <meta property="og:url" content={`https://www.symmetricalcode.com${path}`} />
      </Helmet>

      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[70ch] mb-14 sm:mb-16 [container-type:inline-size]">
            <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-accent-cyan mb-4">
              {t('legal.eyebrow')}
            </span>
            <h1 className="font-syne font-extrabold text-text leading-[1.08] tracking-[-0.03em] text-balance [font-size:min(clamp(28px,7vw,52px),calc(100cqi/13))] [hyphens:manual] mb-4">
              {title}
            </h1>
            <p className="font-mono text-[11px] text-subtle mb-6">{lastUpdated}</p>
            <p className="text-muted text-base sm:text-lg leading-relaxed">{intro}</p>
          </div>

          <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16 lg:items-start">
            {/* Mobile: TOC collapses into a plain list above the content —
                a sticky sidebar has no room at this width, and pushing it
                below the content would bury the jump links after a long
                scroll. `hidden`/`lg:hidden` means only one copy is ever in
                the DOM's accessibility tree at a time. */}
            <LegalToc label={tocLabel} items={tocItems} className="lg:hidden mb-12 pb-10 border-b border-line" />
            <LegalToc label={tocLabel} items={tocItems} className="hidden lg:block sticky top-24 self-start" />

            <LegalDocument sections={sections} ids={ids} email={email} />
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-16 pt-10 border-t border-line">
            <Button variant="link" to={ROUTE_BY_DOC[otherDoc]}>
              {otherLabel}
            </Button>
            <Button variant="link" to="/">
              {backHomeLabel}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
