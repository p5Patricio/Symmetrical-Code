import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../ui/SectionHeading';

// ─── Data ────────────────────────────────────────────────────────────────────
// A 4-phase engineering process rendered as a "route spine": a vertical list
// of rows tracked by a progress line that fills as the visitor scrolls past
// each phase. Copy is intentionally left untouched — see design-spec.md.

interface StepData {
  id: string;
  step: string;
  status: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  touchpoint: string;
  badge: string;
}

const FALLBACK_STEPS: StepData[] = [
  {
    id: 'analysis',
    step: 'FASE_01',
    status: 'DIAGNÓSTICO',
    title: 'Análisis y Requerimientos',
    tagline: 'Diagnóstico profundo y viabilidad técnica',
    description:
      'Deconstruimos tu problema operativo. Analizamos tus flujos de trabajo actuales y traducimos necesidades de negocio en especificaciones técnicas de software sin ambigüedades.',
    deliverables: ['Documento SRS Técnico', 'Diagrama de Flujo de Datos (DFD)', 'Matriz de Viabilidad & Stack'],
    touchpoint: 'Taller 1-a-1 de Descubrimiento',
    badge: '0% Ambigüedad',
  },
  {
    id: 'scope',
    step: 'FASE_02',
    status: 'BLUEPRINT',
    title: 'Definición de Alcance y Diseño',
    tagline: 'Arquitectura de datos y presupuesto cerrado',
    description:
      'Modelamos las bases de datos y diseñamos la experiencia interactiva en Figma. Pactamos un cronograma por sprints con un costo blindado: sabes qué recibirás, cuándo y por qué costo.',
    deliverables: ['Prototipo Interactivo Figma', 'Modelo Entidad-Relación (ERD)', 'Cronograma de Sprints Cerrado'],
    touchpoint: 'Aprobación de Prototipo y Alcance',
    badge: 'Presupuesto Fijo',
  },
  {
    id: 'development',
    step: 'FASE_03',
    status: 'EN SPRINTS',
    title: 'Desarrollo e Ingeniería',
    tagline: 'Código modular, CI/CD y demos quincenales',
    description:
      'Programamos con arquitectura limpia y pruebas automatizadas. Desplegamos en entornos de Staging para que pruebes avances funcionales cada 14 días sin esperar al final del proyecto.',
    deliverables: ['Repositorio de Código Limpio', 'Entorno Privado de Staging', 'Pruebas Unitarias & de Seguridad'],
    touchpoint: 'Demos quincenales en vivo',
    badge: 'Sprints Funcionales',
  },
  {
    id: 'delivery',
    step: 'FASE_04',
    status: 'PRODUCCIÓN',
    title: 'Entrega Final y Despliegue',
    tagline: 'Puesta en marcha, código 100% tuyo y garantía',
    description:
      'Lanzamiento a servidores cloud con SSL y monitoreo con alertas automáticas. Te entregamos la propiedad total del repositorio, capacitamos a tu equipo y respaldamos el sistema con garantía de corrección de errores definida en el contrato.',
    deliverables: ['Despliegue Cloud en Producción', '100% Transferencia de Código', 'Garantía Definida en Contrato & Soporte'],
    touchpoint: 'Go-Live + Sesión de Capacitación',
    badge: '100% Tu Código',
  },
];

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener?.('change', onChange);
  return () => mq.removeEventListener?.('change', onChange);
}

function getReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Tracks `prefers-reduced-motion` so the spine animation can be skipped entirely. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectWorkflow() {
  const { t } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();

  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [reachedCount, setReachedCount] = useState(0);

  const rawSteps = t('team.workflow_steps', { returnObjects: true });
  const steps: StepData[] =
    Array.isArray(rawSteps) && rawSteps.length === 4
      ? (rawSteps as StepData[]).map((s, i) => ({ ...FALLBACK_STEPS[i], ...s }))
      : FALLBACK_STEPS;

  // Position the spine (track + progress line) over the node column, then
  // animate the progress line's scaleY against scroll position. Reduced
  // motion skips the scroll listener entirely and draws the spine complete.
  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const progressEl = progressRef.current;
    if (!list || !track || !progressEl) return;

    const measureSpine = () => {
      const nodes = nodeRefs.current.filter((n): n is HTMLSpanElement => n !== null);
      if (nodes.length === 0) return;
      const listTop = list.getBoundingClientRect().top;
      const first = nodes[0].getBoundingClientRect();
      const last = nodes[nodes.length - 1].getBoundingClientRect();
      const top = first.top + first.height / 2 - listTop;
      const bottom = last.top + last.height / 2 - listTop;
      track.style.top = `${top}px`;
      track.style.height = `${Math.max(0, bottom - top)}px`;
      progressEl.style.top = `${top}px`;
      progressEl.style.height = `${Math.max(0, bottom - top)}px`;
    };

    measureSpine();

    // Reduced motion: the spine is drawn complete and every node counts as
    // reached (derived at render time), so no scroll listener is attached.
    if (reducedMotion) {
      progressEl.style.transform = 'scaleY(1)';
      return;
    }

    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const listRect = list.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const referenceLine = viewportH * 0.6;
      const trackTop = parseFloat(track.style.top || '0');
      const trackHeight = parseFloat(track.style.height || '0') || 1;
      const trackTopAbs = listRect.top + trackTop;
      const ratio = Math.min(1, Math.max(0, (referenceLine - trackTopAbs) / trackHeight));
      progressEl.style.transform = `scaleY(${ratio})`;

      let reached = 0;
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.top + rect.height / 2 <= referenceLine) reached += 1;
      });
      setReachedCount(reached);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateProgress);
    };

    const onResize = () => {
      measureSpine();
      updateProgress();
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(list);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      resizeObserver?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, steps.length]);

  return (
    <div id="project-workflow" className="relative mb-24 sm:mb-28 md:mb-32">
      {/* ─── Header ─── */}
      <SectionHeading
        as="h3"
        eyebrow={t('team.workflow_label')}
        title={t('team.workflow_title')}
        description={t('team.workflow_subtitle')}
        className="mb-10 sm:mb-12"
      />

      {/* ─── Route spine ─── */}
      <ol ref={listRef} className="wf-list">
        <div ref={trackRef} className="wf-track" aria-hidden="true" />
        <div ref={progressRef} className="wf-progress" aria-hidden="true" />

        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isReached = reducedMotion || index < reachedCount;

          return (
            <li key={step.id} className="wf-row">
              <div className="wf-node-col">
                <span
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className={`wf-node ${isReached ? (isLast ? 'wf-node--final' : 'wf-node--reached') : ''}`}
                  aria-hidden="true"
                />
              </div>

              <div className="wf-phase-col">
                <span className="wf-eyebrow text-accent-cyan">
                  {t('team.workflow_phase_label')} {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="wf-title text-text">{step.title}</h4>
                <p className="wf-tagline text-muted">{step.tagline}</p>
                <p className="wf-description text-muted">{step.description}</p>
              </div>

              <div className="wf-touchpoint-col">
                <span className="wf-eyebrow text-muted">{t('team.workflow_touchpoint_label')}</span>
                <p className="wf-value text-text">{step.touchpoint}</p>
              </div>

              <div className="wf-deliverables-col">
                <span className="wf-eyebrow text-muted">{t('team.workflow_deliverables_label')}</span>
                <ul className="wf-deliverable-list">
                  {step.deliverables.map((item) => (
                    <li key={item} className="wf-deliverable-item text-text">
                      <span className="wf-dash" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <style>{`
        .wf-list {
          position: relative;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .wf-track,
        .wf-progress {
          position: absolute;
          left: 20px;
          width: 1px;
          transform: translateX(-0.5px);
          pointer-events: none;
        }

        .wf-track {
          background: var(--line-2);
        }

        .wf-progress {
          background: linear-gradient(to bottom, var(--brand-blue), var(--brand-cyan));
          transform-origin: top;
          transform: scaleY(0);
          transition: transform 0.1s linear;
        }

        .wf-row {
          display: grid;
          grid-template-columns: 40px minmax(0, 1.15fr) minmax(0, 0.9fr) minmax(0, 1fr);
          gap: 10px 28px;
          padding-block: 24px;
          border-top: 1px solid var(--line);
        }

        .wf-node-col {
          display: flex;
          justify-content: center;
          padding-top: 2px;
        }

        .wf-node {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          box-sizing: border-box;
          background: var(--bg);
          border: 2px solid var(--brand-blue);
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .wf-node--reached {
          background: var(--brand-blue);
        }

        .wf-node--final.wf-node--reached {
          background: var(--brand-cyan);
          border-color: var(--brand-cyan);
        }

        .wf-eyebrow {
          display: block;
          font-family: var(--ff-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 8px;
        }

        .wf-title {
          font-family: var(--ff-text);
          font-weight: 600;
          font-size: 18px;
          margin-bottom: 6px;
        }

        @media (min-width: 640px) {
          .wf-title { font-size: 20px; }
        }

        .wf-tagline {
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 6px;
        }

        .wf-description {
          font-size: 14px;
          line-height: 1.6;
          max-width: 46ch;
        }

        .wf-value {
          font-size: 14px;
          line-height: 1.5;
        }

        .wf-deliverable-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .wf-deliverable-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-size: 13px;
          line-height: 1.5;
        }

        .wf-dash {
          flex: none;
          width: 6px;
          height: 1px;
          background: var(--line-2);
          transform: translateY(-3px);
        }

        @media (max-width: 899.98px) {
          .wf-row {
            grid-template-columns: 40px 1fr;
            column-gap: 14px;
            row-gap: 14px;
          }

          .wf-phase-col,
          .wf-touchpoint-col,
          .wf-deliverables-col {
            grid-column: 2;
          }

          .wf-node-col {
            grid-column: 1;
            grid-row: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wf-progress {
            transition: none;
          }
          .wf-node {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
