import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// ─── Bespoke Interactive Schematics for Each Milestone ─────────────────────

/**
 * Radar / Sonar Scanner for Stage 1 (Análisis y Diagnóstico)
 */
const RadarScanner = ({ active }: { active: boolean }) => (
  <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-950/60 dark:bg-black/60 border border-slate-200/50 dark:border-white/10 flex items-center justify-center p-3">
    {/* Grid concentric rings */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-16 h-16 rounded-full border border-[#00e5ff]/20" />
      <div className="w-24 h-24 rounded-full border border-[#00e5ff]/15 absolute" />
      <div className="w-32 h-32 rounded-full border border-dashed border-[#00e5ff]/10 absolute" />
      <div className="w-full h-px bg-[#00e5ff]/10 absolute" />
      <div className="h-full w-px bg-[#00e5ff]/10 absolute" />
    </div>

    {/* Radar Sweep Animation */}
    <div
      className="absolute inset-0 origin-center pointer-events-none"
      style={{
        background: 'conic-gradient(from 0deg, rgba(0, 229, 255, 0.25) 0deg, rgba(0, 229, 255, 0.05) 60deg, transparent 90deg)',
        animation: active ? 'spin 3.5s linear infinite' : 'spin 7s linear infinite',
      }}
    />

    {/* Ping targets */}
    <div className="absolute top-7 left-10 w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
    <div className="absolute top-7 left-10 w-2 h-2 rounded-full bg-[#00e5ff]" />
    <div className="absolute bottom-6 right-12 w-1.5 h-1.5 rounded-full bg-emerald-400" />
    <div className="absolute top-12 right-8 w-1.5 h-1.5 rounded-full bg-[#195fc1]" />

    {/* HUD Telemetry text */}
    <div className="relative z-10 font-mono text-[9px] text-[#00e5ff] bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-[#00e5ff]/30 flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
      <span>SCAN: 0% AMBIGÜEDAD</span>
    </div>
  </div>
);

/**
 * Layered CAD Architecture Schematic for Stage 2 (Alcance y Blueprint)
 */
const ArchitectureBlueprint = ({ active }: { active: boolean }) => (
  <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-950/60 dark:bg-black/60 border border-slate-200/50 dark:border-white/10 flex flex-col justify-center p-3 gap-2">
    {/* Blueprint isometric grid lines */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(25,95,193,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(25,95,193,0.08)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

    {/* Layer 1: Frontend / UX */}
    <div
      className={`relative z-10 flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all duration-300 font-mono text-[9px] ${
        active
          ? 'bg-[#195fc1]/20 border-[#195fc1] text-white shadow-sm shadow-[#195fc1]/30'
          : 'bg-white/5 border-white/10 text-slate-300 dark:text-white/70'
      }`}
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-sm bg-[#195fc1]" />
        <span>01 UI // FIGMA PROTOTYPE</span>
      </span>
      <span className="text-[#195fc1] font-bold">100% FIXED</span>
    </div>

    {/* Layer 2: API & Data Model */}
    <div
      className={`relative z-10 flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all duration-300 font-mono text-[9px] ${
        active
          ? 'bg-[#195fc1]/20 border-[#195fc1] text-white shadow-sm shadow-[#195fc1]/30'
          : 'bg-white/5 border-white/10 text-slate-300 dark:text-white/70'
      }`}
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-sm bg-[#00e5ff]" />
        <span>02 CORE // ERD & API SPEC</span>
      </span>
      <span className="text-emerald-400 font-bold">BLINDADO</span>
    </div>

    {/* Footer specs */}
    <div className="relative z-10 flex items-center justify-between px-1 text-[8px] font-mono text-slate-400 dark:text-white/40">
      <span>PRESUPUESTO CERRADO</span>
      <span className="text-[#195fc1]">SIN SOBRECOSTOS</span>
    </div>
  </div>
);

/**
 * Git Branch & CI/CD Pipeline Visualizer for Stage 3 (Desarrollo en Sprints)
 */
const GitPipeline = ({ active }: { active: boolean }) => (
  <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-950/60 dark:bg-black/60 border border-slate-200/50 dark:border-white/10 flex flex-col justify-center p-3 gap-2">
    {/* Animated Pipeline Track */}
    <div className="relative z-10 flex items-center justify-between w-full px-2 py-1">
      {/* Node 1 */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="font-mono text-[7px] text-emerald-400">SPRINT_1</span>
      </div>

      {/* Connecting animated line */}
      <div className="flex-1 h-0.5 mx-1 bg-slate-800 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          style={{
            animation: active ? 'shimmer 1.5s infinite linear' : 'shimmer 3s infinite linear',
          }}
        />
      </div>

      {/* Node 2 */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-[#195fc1]/20 border border-[#195fc1] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#195fc1]" />
        </div>
        <span className="font-mono text-[7px] text-[#195fc1]">STAGING</span>
      </div>

      {/* Connecting line */}
      <div className="flex-1 h-0.5 mx-1 bg-slate-800 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#195fc1] to-transparent"
          style={{
            animation: active ? 'shimmer 1.5s infinite linear' : 'shimmer 3s infinite linear',
          }}
        />
      </div>

      {/* Node 3 */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>
        <span className="font-mono text-[7px] text-cyan-400">DEMO_14D</span>
      </div>
    </div>

    {/* Terminal / Test status box */}
    <div className="relative z-10 font-mono text-[8px] bg-black/70 rounded px-2 py-1.5 border border-white/5 flex items-center justify-between text-slate-300">
      <span className="flex items-center gap-1.5 text-emerald-400">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>TESTS: 100% PASSING</span>
      </span>
      <span className="text-slate-500">CI/CD ACTIVE</span>
    </div>
  </div>
);

/**
 * Cloud Launchpad & Handover for Stage 4 (Entrega Final y Despliegue)
 */
const CloudLaunchpad = ({ active }: { active: boolean }) => (
  <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-slate-950/60 dark:bg-black/60 border border-slate-200/50 dark:border-white/10 flex flex-col justify-center items-center p-3 gap-2">
    {/* Radial glow background */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="w-28 h-28 rounded-full blur-2xl transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          opacity: active ? 1 : 0.4,
        }}
      />
    </div>

    {/* Satellite / Deployment Badge */}
    <div className="relative z-10 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      </div>
      <div className="text-left">
        <div className="font-mono text-[9px] text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PRODUCCIÓN // SSL ACTIVO</span>
        </div>
        <div className="font-syne font-bold text-xs text-white">100% Llave en Mano</div>
      </div>
    </div>

    {/* Key ownership badge */}
    <div className="relative z-10 font-mono text-[8px] bg-black/70 rounded-full px-3 py-1 border border-indigo-500/30 text-indigo-300 flex items-center gap-1.5">
      <span>TRANSFERENCIA TOTAL DE DERECHOS + PÓLIZA</span>
    </div>
  </div>
);

// ─── Data Interface ──────────────────────────────────────────────────────────

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
  metric: string;
  metricValue: string;
}

const stepVisualizers = [
  (active: boolean) => <RadarScanner active={active} key="radar" />,
  (active: boolean) => <ArchitectureBlueprint active={active} key="arch" />,
  (active: boolean) => <GitPipeline active={active} key="git" />,
  (active: boolean) => <CloudLaunchpad active={active} key="cloud" />,
];

const stationColors = ['#00e5ff', '#195fc1', '#10b981', '#6366f1'];

export default function ProjectWorkflow() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const fallbackSteps: StepData[] = [
    {
      id: 'analysis',
      step: 'FASE_01',
      status: 'DIAGNÓSTICO',
      title: 'Análisis y Requerimientos',
      tagline: 'Diagnóstico profundo y viabilidad técnica',
      description: 'Deconstruimos tu problema operativo. Analizamos tus flujos de trabajo actuales y traducimos necesidades de negocio en especificaciones técnicas de software sin ambigüedades.',
      deliverables: ['Documento SRS Técnico', 'Diagrama de Flujo de Datos (DFD)', 'Matriz de Viabilidad & Stack'],
      touchpoint: 'Taller 1-a-1 de Descubrimiento',
      badge: '0% Ambigüedad',
      metric: 'ÍNDICE DE CLARIDAD',
      metricValue: '100% SIN SORPRESAS',
    },
    {
      id: 'scope',
      step: 'FASE_02',
      status: 'BLUEPRINT',
      title: 'Definición de Alcance y Diseño',
      tagline: 'Arquitectura de datos y presupuesto cerrado',
      description: 'Modelamos las bases de datos y diseñamos la experiencia interactiva en Figma. Pactamos un cronograma por sprints con un costo blindado: sabes qué recibirás, cuándo y por qué costo.',
      deliverables: ['Prototipo Interactivo Figma', 'Modelo Entidad-Relación (ERD)', 'Cronograma de Sprints Cerrado'],
      touchpoint: 'Aprobación de Prototipo y Alcance',
      badge: 'Presupuesto Fijo',
      metric: 'VARIABILIDAD DE COSTO',
      metricValue: '$0.00 SOBRECOSTOS',
    },
    {
      id: 'development',
      step: 'FASE_03',
      status: 'EN SPRINTS',
      title: 'Desarrollo e Ingeniería',
      tagline: 'Código modular, CI/CD y demos quincenales',
      description: 'Programamos con arquitectura limpia y pruebas automatizadas. Desplegamos en entornos de Staging para que pruebes avances funcionales cada 14 días sin esperar al final del proyecto.',
      deliverables: ['Repositorio de Código Limpio', 'Entorno Privado de Staging', 'Pruebas Unitarias & de Seguridad'],
      touchpoint: 'Demos quincenales en vivo',
      badge: 'Sprints Funcionales',
      metric: 'CADENCIA DE REVISIÓN',
      metricValue: 'CADA 14 DÍAS',
    },
    {
      id: 'delivery',
      step: 'FASE_04',
      status: 'PRODUCCIÓN',
      title: 'Entrega Final y Despliegue',
      tagline: 'Puesta en marcha, código 100% tuyo y garantía',
      description: 'Lanzamiento a servidores cloud con SSL y monitoreo 24/7. Te entregamos la propiedad total del repositorio, capacitamos a tu equipo y respaldamos el sistema con póliza de garantía post-entrega.',
      deliverables: ['Despliegue Cloud en Producción', '100% Transferencia de Código', 'Póliza de Garantía & Soporte'],
      touchpoint: 'Go-Live + Sesión de Capacitación',
      badge: '100% Tu Código',
      metric: 'PROPIEDAD DE SOFTWARE',
      metricValue: '100% DEL CLIENTE',
    },
  ];

  const rawSteps = t('team.workflow_steps', { returnObjects: true });
  const steps: StepData[] = Array.isArray(rawSteps) && rawSteps.length === 4
    ? (rawSteps as StepData[]).map((s, i) => ({
        ...fallbackSteps[i],
        ...s,
      }))
    : fallbackSteps;

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = steps[activeStep] || steps[0];

  return (
    <div id="project-workflow" className="mb-24 sm:mb-28 md:mb-32 relative">
      {/* ─── Mission Control Header ─── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#195fc1]/10 border border-[#195fc1]/25 text-[#195fc1] font-mono text-[10px] sm:text-xs tracking-wider uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#195fc1] animate-pulse" />
            <span>{t('team.workflow_label', { defaultValue: 'RUTA DE INGENIERÍA // EL CAMINO DE TU PROYECTO' })}</span>
          </div>
          <h3 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t('team.workflow_title', { defaultValue: 'Cómo llevamos tus proyectos a la realidad' })}
          </h3>
        </div>

        {/* Journey Interactive Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs border transition-all flex items-center gap-2 ${
              isAutoPlaying
                ? 'bg-[#195fc1] text-white border-[#195fc1] shadow-lg shadow-[#195fc1]/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/70 border-slate-200 dark:border-white/10 hover:border-[#195fc1]/40'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-white animate-ping' : 'bg-[#195fc1]'}`} />
            <span>{isAutoPlaying ? 'PAUSAR RECORRIDO' : 'SIMULAR RECORRIDO'}</span>
          </button>

          {/* Quick Step Indicators */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
                className={`w-7 h-7 rounded-md font-mono text-xs font-bold transition-all ${
                  activeStep === idx
                    ? 'bg-[#195fc1] text-white shadow-md shadow-[#195fc1]/30'
                    : 'text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label={`Ir a ${s.step}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── EL CAMINO: THE CONNECTED CIRCUIT HIGHWAY (DESKTOP & MOBILE) ─── */}
      <div className="relative mb-10">
        {/* DESKTOP CIRCUIT CONDUIT (SVG Line with flowing photon packet) */}
        <div className="hidden lg:block absolute top-10 left-16 right-16 h-10 pointer-events-none z-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
            {/* Background track line */}
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-200 dark:text-white/10"
              strokeDasharray="4 4"
            />
            {/* Active completed path line */}
            <line
              x1="0%"
              y1="50%"
              x2={`${(activeStep / 3) * 100}%`}
              y2="50%"
              stroke="#195fc1"
              strokeWidth="3"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          {/* Traveling energy photon packet */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#00e5ff] shadow-[0_0_15px_#00e5ff] transition-all duration-700 ease-out flex items-center justify-center pointer-events-none"
            style={{
              left: `${(activeStep / 3) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        </div>

        {/* MOBILE CIRCUIT SPINE (Vertical line) */}
        <div className="lg:hidden absolute left-6 top-8 bottom-8 w-1 bg-slate-200 dark:bg-white/10 pointer-events-none z-0">
          <div
            className="w-full bg-gradient-to-b from-[#00e5ff] to-[#195fc1] transition-all duration-700"
            style={{
              height: `${((activeStep + 1) / 4) * 100}%`,
            }}
          />
        </div>

        {/* ─── 4 STATIONS OF THE PATH ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;
            const glow = stationColors[idx];

            return (
              <div
                key={step.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveStep(idx);
                    setIsAutoPlaying(false);
                  }
                }}
                className={`relative group rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-500 cursor-pointer select-none flex flex-col justify-between ${
                  isActive
                    ? 'border-[#195fc1] bg-slate-50/90 dark:bg-slate-900/90 shadow-2xl shadow-[#195fc1]/25 -translate-y-2 ring-1 ring-[#195fc1]/50'
                    : isCompleted
                    ? 'border-slate-300 dark:border-white/20 bg-white/70 dark:bg-white/[0.03] opacity-90'
                    : 'border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] hover:border-slate-300 dark:hover:border-white/20 hover:-translate-y-1'
                }`}
                style={{
                  minHeight: '430px',
                }}
              >
                {/* Station Environmental Glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: glow,
                    opacity: isActive ? 0.35 : 0,
                  }}
                />

                {/* HUD Corner Markers */}
                <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 pointer-events-none">+</span>
                <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 pointer-events-none">+</span>
                <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 pointer-events-none">+</span>
                <span className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 pointer-events-none">+</span>

                {/* ─── Station Header & Node Badge ─── */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200/80 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      {/* Milestone Node on the Path */}
                      <div
                        className={`w-7 h-7 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-[#195fc1] text-white ring-4 ring-[#195fc1]/20 shadow-lg'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/60'
                        }`}
                      >
                        {isCompleted ? '✓' : `0${idx + 1}`}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-800 dark:text-white">
                        {step.step}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`font-mono text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        isActive
                          ? 'bg-[#195fc1]/10 text-[#195fc1] border-[#195fc1]/30 font-bold'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/50 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  {/* ─── Unique Interactive Technical Schematic ─── */}
                  <div className="mb-4">
                    {stepVisualizers[idx](isActive)}
                  </div>

                  {/* Title and Tagline */}
                  <div className="mb-3">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#195fc1] font-bold uppercase tracking-wider block mb-1">
                      {step.tagline}
                    </span>
                    <h4 className="font-syne font-black text-lg sm:text-xl text-slate-900 dark:text-white leading-tight">
                      {step.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm leading-relaxed text-justify mb-4">
                    {step.description}
                  </p>
                </div>

                {/* ─── Station Footer: Metrics & Key Deliverables ─── */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono">
                    <span className="text-slate-400 dark:text-white/40">{step.metric}</span>
                    <span className="font-bold text-[#195fc1]">{step.metricValue}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[9px] font-mono text-slate-600 dark:text-white/70">
                    <span className="truncate">{step.touchpoint}</span>
                    <span className="text-[#195fc1] font-bold shrink-0 ml-1">➔</span>
                  </div>
                </div>

                {/* Active Indicator Bar at Bottom */}
                <div
                  className={`absolute bottom-0 left-4 right-4 h-1 rounded-t-full bg-gradient-to-r from-transparent via-[#195fc1] to-transparent transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── DEEP-DIVE TELEMETRY & BLUEPRINT CONSOLE (EXPANDED INSPECTOR) ─── */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md overflow-hidden">
        {/* Background Dot Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#195fc1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 dark:opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#195fc1] animate-ping" />
              <span className="font-mono text-[10px] text-[#195fc1] font-bold uppercase tracking-widest">
                ESTACIÓN ACTIVA // INSPECTOR DETALLADO
              </span>
            </div>
            <h4 className="font-syne font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
              {current.step}: {current.title}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#195fc1]/10 border border-[#195fc1]/30 text-[#195fc1] font-bold">
              {current.badge}
            </span>
            <div className="font-mono text-xs text-slate-500 dark:text-white/50">
              {activeStep + 1} DE 4 COMPLETADO
            </div>
          </div>
        </div>

        {/* Two-Column Telemetry: Deliverables & Client Protocol */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Column 1: Concrete Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#195fc1" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800 dark:text-white">
                {t('team.workflow_deliverables_label', { defaultValue: 'Entregables que recibes en esta fase:' })}
              </h5>
            </div>
            <div className="space-y-2">
              {current.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-black/30 text-slate-800 dark:text-white/80 font-mono text-xs"
                >
                  <span className="w-5 h-5 rounded-md bg-[#195fc1]/10 text-[#195fc1] flex items-center justify-center font-bold text-[10px] shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Client Protocol & Guarantee */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#195fc1" strokeWidth="2.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <polyline points="16 11 18 13 22 9" />
              </svg>
              <h5 className="font-mono text-xs uppercase tracking-wider font-bold text-slate-800 dark:text-white">
                {t('team.workflow_touchpoint_label', { defaultValue: 'Punto de contacto y transparencia:' })}
              </h5>
            </div>

            <div className="p-4 rounded-xl border border-[#195fc1]/20 bg-[#195fc1]/5 flex flex-col justify-between h-[calc(100%-2rem)]">
              <div>
                <span className="font-mono text-[10px] text-[#195fc1] uppercase tracking-wider font-bold block mb-1">
                  PROTOCOLO DE REUNIÓN:
                </span>
                <p className="text-slate-800 dark:text-white font-medium text-sm leading-relaxed mb-3">
                  {current.touchpoint}
                </p>
                <p className="text-slate-600 dark:text-white/60 text-xs leading-relaxed">
                  Cero intermediarios. Trato directo con los ingenieros que programan tu producto para asegurar que cada detalle técnico coincida con tu objetivo comercial.
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#195fc1]/15 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 dark:text-white/50">ESTÁNDAR SYMMETRICAL:</span>
                <span className="font-mono text-xs text-emerald-400 font-bold">100% TRANSPARENTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
