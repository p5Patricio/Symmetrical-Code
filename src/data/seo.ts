/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed by:
 *  - scripts/prerender.mjs (build-time HTML head injection, via src/entry-server.tsx)
 *  - Route pre-rendering and validation
 */
export interface RouteSeoData {
  title: string;
  description: string;
  canonical: string;
}

export const routeSeo: Record<string, RouteSeoData> = {
  '/': {
    title: 'Symmetrical Code — Estudio de desarrollo de software',
    description:
      'Estudio de desarrollo de software en Guanajuato, México. Desarrollamos soluciones digitales a medida con altos estándares de arquitectura y diseño.',
    canonical: 'https://www.symmetricalcode.com/',
  },
  '/proyectos': {
    title: 'Proyectos | Symmetrical Code',
    description:
      'Portafolio de sistemas y aplicaciones desarrolladas por Symmetrical Code: software empresarial, plataformas web y soluciones de alto rendimiento.',
    canonical: 'https://www.symmetricalcode.com/proyectos',
  },
  '/servicios/software-empresarial': {
    title: 'Software Empresarial y Modernización de Sistemas | Symmetrical Code',
    description:
      'Digitalización de operaciones, ERPs y CRMs a medida, y modernización de sistemas viejos sin perder tus datos históricos.',
    canonical: 'https://www.symmetricalcode.com/servicios/software-empresarial',
  },
  '/servicios/inteligencia-artificial': {
    title: 'Inteligencia Artificial y Automatización de Procesos | Symmetrical Code',
    description:
      'Implementación práctica de inteligencia artificial, agentes autónomos y automatización inteligente para optimizar operaciones empresariales.',
    canonical: 'https://www.symmetricalcode.com/servicios/inteligencia-artificial',
  },
  '/servicios/desarrollo-web-movil': {
    title: 'Desarrollo Web & Móvil de Alto Rendimiento | Symmetrical Code',
    description:
      'Desarrollo de aplicaciones web y móviles modernas, rápidas, escalables y con arquitectura limpia orientada a resultados comerciales.',
    canonical: 'https://www.symmetricalcode.com/servicios/desarrollo-web-movil',
  },
  '/servicios/ciberseguridad': {
    title: 'Ciberseguridad y Protección de Datos | Symmetrical Code',
    description:
      'Auditorías de seguridad, protección de infraestructura crítica, hardening y cumplimiento de estándares de privacidad de datos.',
    canonical: 'https://www.symmetricalcode.com/servicios/ciberseguridad',
  },
  '/servicios/diseno-ui-ux': {
    title: 'Diseño UI/UX y Sistemas de Diseño | Symmetrical Code',
    description:
      'Interfaces intuitivas, sistemas de diseño escalables y experiencias de usuario centradas en la conversión y la usabilidad.',
    canonical: 'https://www.symmetricalcode.com/servicios/diseno-ui-ux',
  },
  '/servicios/automatizacion-analitica': {
    title: 'Automatización & Analítica de Datos | Symmetrical Code',
    description:
      'Pipelines de datos, dashboards ejecutivos en tiempo real y automatizaciones que eliminan fricción operativa.',
    canonical: 'https://www.symmetricalcode.com/servicios/automatizacion-analitica',
  },
  '/privacidad': {
    title: 'Política de Privacidad | Symmetrical Code',
    description: 'Política de privacidad y tratamiento de datos personales de Symmetrical Code.',
    canonical: 'https://www.symmetricalcode.com/privacidad',
  },
  '/terminos': {
    title: 'Términos y Condiciones de Servicio | Symmetrical Code',
    description: 'Términos y condiciones de uso de los servicios y plataformas de Symmetrical Code.',
    canonical: 'https://www.symmetricalcode.com/terminos',
  },
};

/** Routes that receive a build-time prerendered HTML file. */
export const PRERENDER_ROUTES = Object.keys(routeSeo);
