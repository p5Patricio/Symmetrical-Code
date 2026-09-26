import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import SectionHeading from '../ui/SectionHeading';

interface WorkflowStepData {
  title: string;
  touchpoint: string;
}

interface ProcessStripProps {
  onSeeFullProcess: () => void;
}

/** "Cómo lo trabajamos" — a 4-column strip built from the same
 * `team.workflow_steps` i18n data as the home page's methodology block,
 * summarized to title + touchpoint. Links back to the full process. */
export default function ProcessStrip({ onSeeFullProcess }: ProcessStripProps) {
  const { t } = useTranslation();

  const rawSteps = t('team.workflow_steps', { returnObjects: true });
  const steps: WorkflowStepData[] = Array.isArray(rawSteps) ? (rawSteps as WorkflowStepData[]).slice(0, 4) : [];

  return (
    <div>
      <SectionHeading
        eyebrow={t('serviceDetail.process_eyebrow')}
        title={t('serviceDetail.process_title')}
        className="mb-10"
      />

      <div className="ps-strip">
        {steps.map((step, idx) => (
          <div key={idx} className="ps-col">
            <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-accent-cyan mb-3">
              {t('team.workflow_phase_label')} {String(idx + 1).padStart(2, '0')}
            </span>
            <h3 className="font-sans font-semibold text-text text-[18px] mb-3">{step.title}</h3>
            <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-1">
              {t('team.workflow_touchpoint_label')}
            </span>
            <p className="text-muted text-[14px] leading-relaxed">{step.touchpoint}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Button variant="link" arrow onClick={onSeeFullProcess}>
          {t('serviceDetail.process_cta')}
        </Button>
      </div>

      <style>{`
        .ps-strip {
          display: grid;
          grid-template-columns: 1fr;
          row-gap: 24px;
        }
        .ps-col + .ps-col {
          border-top: 1px solid var(--line);
          padding-top: 24px;
        }
        @media (min-width: 640px) {
          .ps-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 28px;
          }
          .ps-col + .ps-col {
            border-top: 0;
            padding-top: 0;
          }
          .ps-col:nth-child(2) {
            border-left: 1px solid var(--line);
            padding-left: 28px;
          }
          .ps-col:nth-child(3),
          .ps-col:nth-child(4) {
            border-top: 1px solid var(--line);
            padding-top: 24px;
          }
          .ps-col:nth-child(4) {
            border-left: 1px solid var(--line);
            padding-left: 28px;
          }
        }
        @media (min-width: 1024px) {
          .ps-strip {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .ps-col:nth-child(3) {
            border-top: 0;
            padding-top: 0;
            border-left: 1px solid var(--line);
            padding-left: 28px;
          }
        }
      `}</style>
    </div>
  );
}
