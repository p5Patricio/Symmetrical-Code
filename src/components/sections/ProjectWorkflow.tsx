import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ─── Route geometry ──────────────────────────────────────────────────────────
// The route is an intentionally uneven hand-plotted trail: peaks and valleys
// instead of a straight timeline, so the eye travels the way it would across a
// chart of a real expedition.

const DESKTOP_VIEWBOX = { w: 1200, h: 350 };
const MOBILE_VIEWBOX = { w: 360, h: 670 };

// Uneven on purpose: a shallow first climb, a deep second valley and a long
// final ascent — the silhouette of a trek, not a sine wave.
const DESKTOP_ROUTE =
  'M110,250 C170,282 285,110 415,68 C520,34 585,255 735,292 C865,324 900,140 1080,105';
const MOBILE_ROUTE =
  'M80,70 C165,90 272,120 272,225 C272,330 85,310 85,415 C85,512 268,486 268,560';

const DESKTOP_NODES = [
  { x: 110, y: 250 },
  { x: 415, y: 68 },
  { x: 735, y: 292 },
  { x: 1080, y: 105 },
];

const MOBILE_NODES = [
  { x: 80, y: 70 },
  { x: 272, y: 225 },
  { x: 85, y: 415 },
  { x: 268, y: 560 },
];

/** Normalized position of each waypoint along the route (pathLength = 1). */
const ROUTE_PROGRESS = [0, 0.32, 0.67, 1];

type LabelPlacement = 'above' | 'below';
type LabelAlign = 'left' | 'center' | 'right';

const DESKTOP_LABELS: { place: LabelPlacement; align: LabelAlign }[] = [
  { place: 'above', align: 'left' },
  { place: 'below', align: 'center' },
  { place: 'above', align: 'center' },
  { place: 'below', align: 'right' },
];

const MOBILE_LABELS: { place: LabelPlacement; align: LabelAlign }[] = [
  { place: 'below', align: 'left' },
  { place: 'below', align: 'right' },
  { place: 'below', align: 'left' },
  { place: 'below', align: 'right' },
];

const AUTO_ADVANCE_MS = 5200;

// ─── Data ────────────────────────────────────────────────────────────────────

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
      'Lanzamiento a servidores cloud con SSL y monitoreo 24/7. Te entregamos la propiedad total del repositorio, capacitamos a tu equipo y respaldamos el sistema con póliza de garantía post-entrega.',
    deliverables: ['Despliegue Cloud en Producción', '100% Transferencia de Código', 'Póliza de Garantía & Soporte'],
    touchpoint: 'Go-Live + Sesión de Capacitación',
    badge: '100% Tu Código',
  },
];

// ─── Decorative map furniture ────────────────────────────────────────────────

/** Compass rose: the single ornament that tells the eye "this is a chart". */
const CompassRose = () => (
  <g className="text-[#c5a059] opacity-40 dark:opacity-50" aria-hidden="true">
    <circle cx="0" cy="0" r="26" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
    <circle cx="0" cy="0" r="17" fill="none" stroke="currentColor" strokeWidth="0.7" />
    <path d="M0,-24 L4.5,-4.5 L24,0 L4.5,4.5 L0,24 L-4.5,4.5 L-24,0 L-4.5,-4.5 Z" fill="currentColor" opacity="0.55" />
    <path d="M0,-24 L4.5,-4.5 L0,0 L-4.5,-4.5 Z" fill="currentColor" />
  </g>
);

/** Faint topographic contours, kept below the route so they read as paper texture. */
const Contours = () => (
  <g className="text-[#195fc1] opacity-[0.07] dark:opacity-[0.11]" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
    <path d="M-40,190 C120,140 240,235 400,182 C560,130 700,222 880,170 C1000,135 1120,180 1260,146" />
    <path d="M-40,234 C130,186 250,284 410,228 C570,174 710,270 890,216 C1010,180 1130,224 1260,192" />
    <path d="M-40,146 C110,96 230,188 390,136 C550,84 690,176 870,124 C990,90 1110,134 1260,102" />
  </g>
);

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectWorkflow() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const rawSteps = t('team.workflow_steps', { returnObjects: true });
  const steps: StepData[] =
    Array.isArray(rawSteps) && rawSteps.length === 4
      ? (rawSteps as StepData[]).map((s, i) => ({ ...FALLBACK_STEPS[i], ...s }))
      : FALLBACK_STEPS;

  // Track the breakpoint so a single set of markers can serve both routes.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener?.('change', sync);
    return () => mq.removeEventListener?.('change', sync);
  }, []);

  // Draw the route only once the block enters the viewport.
  useEffect(() => {
    const node = mapRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Walk the route on its own until the visitor takes over.
  useEffect(() => {
    if (!revealed || paused) return;
    const id = setInterval(() => setActiveStep((prev) => (prev + 1) % steps.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [revealed, paused, steps.length]);

  const current = steps[activeStep] ?? steps[0];
  const viewBox = isWide ? DESKTOP_VIEWBOX : MOBILE_VIEWBOX;
  const nodes = isWide ? DESKTOP_NODES : MOBILE_NODES;
  const labels = isWide ? DESKTOP_LABELS : MOBILE_LABELS;
  const progress = revealed ? ROUTE_PROGRESS[activeStep] : 0;

  const selectStep = (index: number) => {
    setActiveStep(index);
    setPaused(true);
  };

  return (
    <div id="project-workflow" className="relative mb-24 sm:mb-28 md:mb-32">
      {/* ─── Header ─── */}
      <div className="mb-10 flex flex-col gap-4 border-b border-slate-200/80 pb-6 dark:border-white/10 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#195fc1]/25 bg-[#195fc1]/10 px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#195fc1] sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#195fc1]" />
            <span>{t('team.workflow_label', { defaultValue: 'METODOLOGÍA // INGENIERÍA EN 4 ETAPAS' })}</span>
          </div>
          <h3 className="font-syne text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
            {t('team.workflow_title', { defaultValue: 'Cómo llevamos tus proyectos a la realidad' })}
          </h3>
        </div>
        <p className="max-w-md font-mono text-[11px] leading-relaxed text-slate-500 dark:text-white/40 sm:text-xs lg:text-right">
          {t('team.workflow_hint', {
            defaultValue: 'Recorre la ruta. Cada punto marca una entrega concreta que recibes en el camino.',
          })}
        </p>
      </div>

      {/* ─── The route map ─── */}
      <div
        ref={mapRef}
        className="wf-map relative mx-auto mb-10 w-full max-w-[400px] select-none lg:max-w-none"
        style={{ aspectRatio: `${viewBox.w} / ${viewBox.h}` }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {isWide && <Contours />}

          {/* Dotted trail: the full expedition, always visible once drawn */}
          <path
            d={isWide ? DESKTOP_ROUTE : MOBILE_ROUTE}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            className="wf-trail text-slate-400/60 dark:text-white/25"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.006 0.014"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDashoffset: revealed ? 0 : 1,
              opacity: revealed ? 1 : 0,
            }}
          />

          {/* Solid progress: how far along the route the visitor is standing */}
          <path
            d={isWide ? DESKTOP_ROUTE : MOBILE_ROUTE}
            pathLength={1}
            fill="none"
            stroke="#195fc1"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="1 1"
            style={{
              strokeDashoffset: 1 - progress,
              transition: 'stroke-dashoffset 1.1s cubic-bezier(0.65, 0, 0.35, 1)',
              filter: 'drop-shadow(0 0 6px rgba(25, 95, 193, 0.55))',
            }}
          />

          {/* Destination cross — the map only earns it once the route is complete */}
          <g
            className="text-[#c5a059]"
            transform={`translate(${nodes[3].x + (isWide ? 62 : 45)}, ${nodes[3].y + (isWide ? -46 : -95)})`}
            style={{
              opacity: activeStep === 3 ? 0.85 : 0.22,
              transition: 'opacity 0.6s ease',
            }}
          >
            <path
              d="M-9,-9 L9,9 M9,-9 L-9,9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {isWide && (
            <g transform={`translate(${DESKTOP_VIEWBOX.w - 62}, ${DESKTOP_VIEWBOX.h - 56})`}>
              <CompassRose />
            </g>
          )}
        </svg>

        {/* ─── Waypoints ─── */}
        {steps.map((step, index) => {
          const node = nodes[index];
          const label = labels[index];
          const isActive = activeStep === index;
          const isDone = activeStep > index;

          const alignClass =
            label.align === 'left'
              ? 'left-0 items-start text-left'
              : label.align === 'right'
              ? 'right-0 items-end text-right'
              : 'left-1/2 -translate-x-1/2 items-center text-center';

          const placeClass = label.place === 'above' ? 'bottom-[calc(50%+30px)]' : 'top-[calc(50%+30px)]';

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => selectStep(index)}
              onFocus={() => setPaused(true)}
              aria-current={isActive ? 'step' : undefined}
              className="wf-waypoint absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
              style={{
                left: `${(node.x / viewBox.w) * 100}%`,
                top: `${(node.y / viewBox.h) * 100}%`,
                opacity: revealed ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${revealed ? 1 : 0.7})`,
                transition: `opacity 0.6s ease ${0.35 + index * 0.28}s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  0.35 + index * 0.28
                }s`,
              }}
            >
              {/* Halo that breathes only on the active waypoint */}
              <span
                className={`pointer-events-none absolute inset-0 rounded-full border border-[#195fc1]/40 transition-all duration-500 ${
                  isActive ? 'wf-halo scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
              />

              {/* The pin itself */}
              <span
                className={`pointer-events-none absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[11px] font-bold transition-all duration-500 ${
                  isActive
                    ? 'scale-110 border-[#195fc1] bg-[#195fc1] text-white shadow-[0_0_20px_rgba(25,95,193,0.65)]'
                    : isDone
                    ? 'border-[#195fc1]/50 bg-[#195fc1]/15 text-[#195fc1]'
                    : 'border-slate-300 bg-white text-slate-400 dark:border-white/20 dark:bg-[#070d14] dark:text-white/40'
                }`}
              >
                {index + 1}
              </span>

              {/* Label block — sits outside the hit area but stays part of the button */}
              <span
                className={`pointer-events-none absolute flex w-[180px] flex-col gap-0.5 sm:w-[196px] lg:w-[230px] ${alignClass} ${placeClass}`}
              >
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 sm:text-[10px] ${
                    isActive ? 'text-[#195fc1]' : 'text-slate-400 dark:text-white/35'
                  }`}
                >
                  {step.step}
                </span>
                <span
                  className={`font-syne text-[13px] font-extrabold leading-tight transition-colors duration-500 sm:text-sm lg:text-base ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-white/55'
                  }`}
                >
                  {step.title}
                </span>
                <span
                  className={`font-mono text-[9px] leading-snug transition-all duration-500 sm:text-[10px] ${
                    isActive
                      ? 'text-slate-500 opacity-100 dark:text-white/45'
                      : 'text-slate-400 opacity-0 dark:text-white/25 lg:opacity-60'
                  }`}
                >
                  {step.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Field notes for the active waypoint ─── */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.02] sm:rounded-3xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#195fc1_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.06] dark:opacity-[0.12]" />
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#195fc1] via-[#195fc1]/40 to-transparent"
          aria-hidden="true"
        />

        <div key={current.id} className="wf-notes relative z-10 grid grid-cols-1 gap-7 p-6 sm:p-8 md:grid-cols-5 md:gap-9">
          {/* Narrative */}
          <div className="md:col-span-3">
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#195fc1]">
                {current.status}
              </span>
              <span className="h-px w-6 bg-[#195fc1]/30" />
              <span className="rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#a9884a] dark:text-[#c5a059]">
                {current.badge}
              </span>
            </div>

            <h4 className="mb-2 font-syne text-lg font-black leading-tight text-slate-900 dark:text-white sm:text-xl md:text-2xl">
              {current.step}: {current.title}
            </h4>
            <p className="max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-white/60 sm:text-sm">
              {current.description}
            </p>

            <div className="mt-5 flex items-center gap-2.5 border-t border-slate-200/80 pt-4 dark:border-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#195fc1" strokeWidth="2.5" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-white/40 sm:text-[10px]">
                {t('team.workflow_touchpoint_label', { defaultValue: 'Punto de contacto:' })}
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-white/80 sm:text-xs">
                {current.touchpoint}
              </span>
            </div>
          </div>

          {/* Deliverables */}
          <div className="md:col-span-2">
            <h5 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-white/45">
              {t('team.workflow_deliverables_label', { defaultValue: 'Entregables clave:' })}
            </h5>
            <ul className="flex flex-col gap-2">
              {current.deliverables.map((item, i) => (
                <li
                  key={item}
                  className="wf-deliverable flex items-center gap-2.5 font-mono text-[11px] text-slate-700 dark:text-white/70 sm:text-xs"
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#195fc1]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .wf-trail {
          transition: stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
          animation: wfTrailDrift 22s linear infinite;
        }

        @keyframes wfTrailDrift {
          to { stroke-dashoffset: -0.4; }
        }

        .wf-waypoint:focus-visible .wf-pin,
        .wf-waypoint:focus-visible {
          outline: 2px solid #195fc1;
          outline-offset: 4px;
          border-radius: 9999px;
        }

        .wf-halo {
          animation: wfHalo 2.6s ease-out infinite;
        }

        @keyframes wfHalo {
          0%   { transform: scale(0.7); opacity: 0.9; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        .wf-notes {
          animation: wfFade 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes wfFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wf-deliverable {
          animation: wfSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        @keyframes wfSlide {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .wf-trail,
          .wf-halo,
          .wf-notes,
          .wf-deliverable {
            animation: none !important;
          }
          .wf-trail { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
