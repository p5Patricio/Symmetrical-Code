import { useCallback, useMemo } from 'react';
import type { CSSProperties } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { servicesData } from '../data/services';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import ServiceBreadcrumb from '../components/service/ServiceBreadcrumb';
import ServiceHero from '../components/service/ServiceHero';
import StatementBand from '../components/service/StatementBand';
import SolutionsList from '../components/service/SolutionsList';
import WhoIsItFor from '../components/service/WhoIsItFor';
import ProcessStrip from '../components/service/ProcessStrip';
import DeliverablesList from '../components/service/DeliverablesList';
import TechStackList from '../components/service/TechStackList';
import FaqAccordion from '../components/service/FaqAccordion';
import ClosingBanner from '../components/service/ClosingBanner';
import OtherServicesIndex from '../components/service/OtherServicesIndex';

const SECTION_CLASS = 'border-t border-line py-14 sm:py-[88px]';
const WHATSAPP_NUMBER = '524737374224';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isEs = (i18n?.resolvedLanguage || i18n?.language || 'es').startsWith('es');

  const service = useMemo(() => servicesData.find((s) => s.slug === slug), [slug]);

  // Navigates home and scrolls to a section there, mirroring Navbar's own
  // cross-page section-scroll behavior (this page is never rendered at "/").
  const goToHomeSection = useCallback(
    (id: string) => {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    },
    [navigate]
  );

  if (!service) {
    return (
      <div className="min-h-screen bg-ink text-text flex flex-col items-center justify-center p-6 text-center gap-4">
        <h1 className="font-syne font-bold text-3xl">{t('serviceDetail.not_found_title')}</h1>
        <p className="text-muted max-w-md">{t('serviceDetail.not_found_desc')}</p>
        <Button to="/#services" variant="primary">
          {t('serviceDetail.not_found_cta')}
        </Button>
      </div>
    );
  }

  const title = isEs ? service.titleEs : service.titleEn;
  const heroBadge = isEs ? service.heroBadgeEs : service.heroBadgeEn;
  const tagline = isEs ? service.taglineEs : service.taglineEn;
  const longDesc = isEs ? service.longDescEs : service.longDescEn;
  const whoIsItFor = isEs ? service.whoIsItForEs : service.whoIsItForEn;
  const deliverables = isEs ? service.deliverablesEs : service.deliverablesEn;

  const otherServices = servicesData
    .filter((s) => s.slug !== service.slug)
    .map((s) => ({
      slug: s.slug,
      title: isEs ? s.titleEs : s.titleEn,
      shortDesc: isEs ? s.shortDescEs : s.shortDescEn,
      accentColor: theme === 'light' ? s.accentColorLight : s.accentColor,
    }));

  // Single source of truth for this page's small accent details (hero badge,
  // eyebrows, deliverable checks, dash markers, process labels, FAQ icon,
  // breadcrumb current item) — see src/data/services.ts.
  const svcAccent = theme === 'light' ? service.accentColorLight : service.accentColor;
  const rootStyle = {
    '--svc-accent': svcAccent,
    // Tinted glow for this page's hero backdrop: mixed here (reading the
    // ambient --glow/--glow-2 before any override) so ServiceHero can safely
    // reassign --glow/--glow-2 further down without a custom-property cycle.
    '--svc-glow-tint': 'color-mix(in srgb, var(--svc-accent) 35%, var(--glow) 65%)',
    '--svc-glow-2-tint': 'color-mix(in srgb, var(--svc-accent) 30%, var(--glow-2) 70%)',
  } as CSSProperties;

  const faqs = service.faqs.map((faq) => ({
    question: isEs ? faq.questionEs : faq.questionEn,
    answer: isEs ? faq.answerEs : faq.answerEn,
  }));

  const whatsappQuoteUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t('serviceDetail.whatsapp_quote_message', { title })
  )}`;

  return (
    <div className="min-h-screen bg-ink text-text" style={rootStyle}>
      <Helmet>
        <title>{`${title} — Symmetrical Code`}</title>
        <meta name="description" content={isEs ? service.shortDescEs : service.shortDescEn} />
        <link rel="canonical" href={`https://www.symmetricalcode.com/servicios/${service.slug}`} />
        <meta property="og:title" content={`${title} — Symmetrical Code`} />
        <meta property="og:description" content={isEs ? service.shortDescEs : service.shortDescEn} />
        <meta property="og:url" content={`https://www.symmetricalcode.com/servicios/${service.slug}`} />
      </Helmet>

      <Navbar />

      <main className="pt-24 sm:pt-28 pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceBreadcrumb
            ariaLabel={t('serviceDetail.breadcrumb_aria')}
            homeLabel={t('nav.services')}
            title={title}
            onNavigateHome={() => goToHomeSection('services')}
          />

          <div className="mb-14 sm:mb-[88px]">
            <ServiceHero
              heroBadge={heroBadge}
              title={title}
              tagline={tagline}
              whatsappUrl={whatsappQuoteUrl}
              heroImageUrl={service.heroImageUrl}
            />
          </div>

          <div className="border-y border-line py-14">
            <StatementBand text={longDesc} />
          </div>

          <section className={SECTION_CLASS}>
            <SolutionsList
              eyebrow={t('serviceDetail.solutions_eyebrow')}
              title={t('serviceDetail.solutions_title')}
              solutions={service.practicalSolutions}
              isEs={isEs}
              eyebrowColor={svcAccent}
            />
          </section>

          <section className={SECTION_CLASS}>
            <WhoIsItFor
              eyebrow={t('serviceDetail.who_eyebrow')}
              title={t('serviceDetail.who_title')}
              items={whoIsItFor}
              eyebrowColor={svcAccent}
              markerColor={svcAccent}
            />
          </section>

          <section className={SECTION_CLASS}>
            <ProcessStrip onSeeFullProcess={() => goToHomeSection('project-workflow')} accentColor={svcAccent} />
          </section>

          <section id="deliverables" className={`${SECTION_CLASS} scroll-mt-20`}>
            <DeliverablesList
              eyebrow={t('serviceDetail.deliverables_eyebrow')}
              title={t('serviceDetail.deliverables_title')}
              items={deliverables}
              eyebrowColor={svcAccent}
              iconColor={svcAccent}
            />
          </section>

          <section className={SECTION_CLASS}>
            <TechStackList
              eyebrow={t('serviceDetail.stack_eyebrow')}
              title={t('serviceDetail.stack_title')}
              description={t('serviceDetail.stack_description')}
              items={service.techStack}
              eyebrowColor={svcAccent}
            />
          </section>

          {faqs.length > 0 && (
            <section className={SECTION_CLASS}>
              <FaqAccordion
                eyebrow={t('serviceDetail.faq_eyebrow')}
                title={t('serviceDetail.faq_title')}
                items={faqs}
                eyebrowColor={svcAccent}
                accentColor={svcAccent}
              />
            </section>
          )}

          <section className={SECTION_CLASS}>
            <ClosingBanner
              eyebrow={t('serviceDetail.closing_eyebrow')}
              title={t('serviceDetail.closing_title')}
              desc={t('serviceDetail.closing_desc')}
              ctaLabel={t('serviceDetail.cta_whatsapp')}
              whatsappUrl={whatsappQuoteUrl}
              secondaryLabel={t('serviceDetail.closing_secondary_cta')}
              onSecondaryClick={() => goToHomeSection('services')}
              eyebrowColor={svcAccent}
            />
          </section>

          <section className={SECTION_CLASS}>
            <OtherServicesIndex eyebrow={t('serviceDetail.other_services_eyebrow')} services={otherServices} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
