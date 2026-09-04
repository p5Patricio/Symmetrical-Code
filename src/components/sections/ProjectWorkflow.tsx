import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// --- Bespoke SVG Icons for the 4 Engineering Steps ---
const SearchScanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" strokeDasharray="2 2" />
    <line x1="8" y1="11" x2="14" y2="11" strokeDasharray="2 2" />
  </svg>
);

const BlueprintIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const CodeBranchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const RocketDeployIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const UserCheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const CheckDeliverableIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface WorkflowStep {
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

const stepIcons = [
  <SearchScanIcon key="search" />,
  <BlueprintIcon key="blueprint" />,
  <CodeBranchIcon key="code" />,
  <RocketDeployIcon key="rocket" />,
];

const stepGlowColors = ['#00e5ff', '#195fc1', '#10b981', '#6366f1'];

export default function ProjectWorkflow() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const rawSteps = t('team.workflow_steps', { returnObjects: true });
  const steps: WorkflowStep[] = Array.isArray(rawSteps) && rawSteps.length > 0 ? (rawSteps as WorkflowStep[]) : [
    {
      id: 'analysis',
      step: 'FASE_01',
      status: 'DIAGNÓSTICO',
      title: 'Análisis y Requerimientos',
      tagline: 'Diagnóstico profundo y viabilidad técnica',
      description: 'Deconstruimos tu problema operativo. Analizamos tus flujos de trabajo actuales y traducimos necesidades en especificaciones técnicas claras.',
      deliverables: ['Documento SRS Técnico', 'Diagrama de Flujo (DFD)', 'Matriz de Viabilidad'],
      touchpoint: 'Taller 1-a-1 de Descubrimiento',
      badge: '0% Ambigüedad',
    },
    {
      id: 'scope',
      step: 'FASE_02',
      status: 'BLUEPRINT',
      title: 'Definición de Alcance y Diseño',
      tagline: 'Arquitectura de datos y presupuesto cerrado',
      description: 'Modelamos las bases de datos y diseñamos la experiencia interactiva en Figma con un cronograma y costo 100% blindados.',
      deliverables: ['Prototipo en Figma', 'Modelo ERD', 'Cronograma de Sprints'],
      touchpoint: 'Aprobación de Prototipo y Alcance',
      badge: 'Presupuesto Fijo',
    },
    {
      id: 'development',
      step: 'FASE_03',
      status: 'EN SPRINTS',
      title: 'Desarrollo e Ingeniería',
      tagline: 'Código modular, CI/CD y demos quincenales',
      description: 'Programamos bajo arquitectura limpia y pruebas automatizadas, con despliegues a Staging para que valides avances cada dos semanas.',
      deliverables: ['Código Fuente Modular', 'Entorno Privado Staging', 'Tests Automatizados'],
      touchpoint: 'Demos quincenales en vivo',
      badge: 'Sprints Funcionales',
    },
    {
      id: 'delivery',
      step: 'FASE_04',
      status: 'PRODUCCIÓN',
      title: 'Entrega Final y Despliegue',
      tagline: 'Puesta en marcha, código 100% tuyo y garantía',
      description: 'Lanzamiento a la nube con SSL, transferencia de propiedad del código, capacitación de tu equipo y soporte post-lanzamiento.',
      deliverables: ['Despliegue Cloud en Producción', '100% Propiedad del Código', 'Póliza de Garantía'],
      touchpoint: 'Go-Live + Sesión de Capacitación',
      badge: '100% Tu Código',
    },
  ];

  return (
    <div className="mb-20 sm:mb-24 md:mb-28 relative">
      {/* ─── Header of Workflow sub-section ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 pb-5 border-b border-slate-200/80 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#195fc1]/10 border border-[#195fc1]/25 text-[#195fc1] font-mono text-[10px] sm:text-xs tracking-wider uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#195fc1] animate-pulse" />
            <span>{t('team.workflow_label', { defaultValue: 'METODOLOGÍA // INGENIERÍA EN 4 ETAPAS' })}</span>
          </div>
          <h3 className="font-syne font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t('team.workflow_title', { defaultValue: 'Cómo llevamos tus proyectos a la realidad' })}
          </h3>
        </div>
        <p className="text-slate-600 dark:text-white/40 text-xs sm:text-sm max-w-md leading-relaxed sm:text-right text-justify sm:text-left">
          {t('team.workflow_subtitle', { defaultValue: 'Un proceso de ingeniería transparente y estructurado: cero ambigüedad, presupuestos blindados y avances funcionales cada dos semanas.' })}
        </p>
      </div>

      {/* ─── 4-Step Pipeline Container ─── */}
      <div className="relative">
        {/* Horizontal energy connector for desktop (>= 1024px) */}
        <div 
          className="hidden lg:block absolute top-[46px] left-12 right-12 h-0.5 z-0 pointer-events-none overflow-hidden bg-slate-200 dark:bg-white/10"
          aria-hidden="true"
        >
          <div 
            className="w-48 h-full bg-gradient-to-r from-transparent via-[#195fc1] to-transparent animate-pulse"
            style={{
              animation: 'shimmer 2.8s infinite linear',
            }}
          />
        </div>

        {/* Vertical line for mobile / tablet */}
        <div 
          className="lg:hidden absolute left-5 sm:left-7 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#195fc1] via-[#00e5ff]/50 to-[#195fc1]/20 z-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
          {steps.map((step, index) => {
            const isSelected = activeStep === index;
            const glow = stepGlowColors[index % stepGlowColors.length];

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(isSelected ? null : index)}
                className={`glass-card-enhanced group relative p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-500 flex flex-col justify-between cursor-pointer select-none ${
                  isSelected
                    ? 'border-[#195fc1] shadow-2xl shadow-[#195fc1]/20 -translate-y-2 bg-slate-50 dark:bg-white/[0.04]'
                    : 'border-slate-200/90 dark:border-white/10 hover:border-[#195fc1]/50 hover:shadow-xl hover:shadow-[#195fc1]/10 bg-white dark:bg-white/[0.02]'
                }`}
                style={{
                  minHeight: '440px',
                }}
              >
                {/* Ambient glow on hover/active */}
                <div
                  className="glowing-orb"
                  style={{
                    background: glow,
                    top: '-40px',
                    right: '-40px',
                    opacity: isSelected ? 0.25 : undefined,
                  }}
                />

                {/* HUD crosshairs in corners */}
                <span className="absolute top-2.5 left-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 select-none pointer-events-none">+</span>
                <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2.5 right-2.5 font-mono text-[9px] text-slate-300 dark:text-white/20 select-none pointer-events-none">+</span>

                {/* ─── Card Header ─── */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/5 relative z-10">
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[#195fc1]">
                      {step.step}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-slate-600 dark:text-white/60 uppercase">
                        {step.status}
                      </span>
                    </div>
                  </div>

                  {/* Icon + Large Translucent Number */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white group-hover:text-[#195fc1] group-hover:border-[#195fc1]/40 border-slate-200/80 dark:border-white/10 shadow-sm"
                      style={{
                        borderColor: isSelected ? '#195fc1' : undefined,
                        color: isSelected ? '#195fc1' : undefined,
                      }}
                    >
                      {stepIcons[index]}
                    </div>
                    <span className="font-mono font-black text-4xl sm:text-5xl text-slate-200 dark:text-white/5 select-none transition-colors group-hover:text-slate-300 dark:group-hover:text-white/10">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="relative z-10 mb-3">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#195fc1] font-bold uppercase tracking-wider block mb-1">
                      {step.tagline}
                    </span>
                    <h4 className="font-syne font-black text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-[#195fc1] transition-colors leading-snug">
                      {step.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-white/50 text-xs sm:text-sm leading-relaxed text-justify relative z-10 mb-4">
                    {step.description}
                  </p>
                </div>

                {/* ─── Card Footer: Deliverables & Touchpoint ─── */}
                <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3">
                  {/* Deliverables List */}
                  <div>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-400 dark:text-white/30 block mb-1.5 font-bold">
                      {t('team.workflow_deliverables_label', { defaultValue: 'Entregables clave:' })}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 font-mono text-[8px] sm:text-[9px] px-2 py-0.5 rounded-md border border-slate-200/80 bg-slate-100/70 dark:border-white/5 dark:bg-white/5 text-slate-700 dark:text-white/60 tracking-tight"
                        >
                          <span className="text-[#195fc1]"><CheckDeliverableIcon /></span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Client Touchpoint */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-white/70">
                      <span className="text-[#195fc1]"><UserCheckIcon /></span>
                      <span className="font-mono text-[9px] tracking-tight">{step.touchpoint}</span>
                    </div>
                    <span className="font-mono text-[8px] px-2 py-0.5 rounded-full bg-[#195fc1]/10 border border-[#195fc1]/20 text-[#195fc1] font-bold uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>
                </div>

                {/* Bottom decorative border with glow */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#195fc1] to-transparent transition-opacity duration-500 ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
