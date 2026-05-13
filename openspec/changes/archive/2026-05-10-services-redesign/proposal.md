# Proposal: Rediseño de la Sección de Servicios

## Intent
Transformar la sección de servicios de un enfoque puramente técnico ("para programadores") a uno centrado en beneficios comerciales ("para clientes"). El objetivo es aumentar la tasa de conversión al hablar el lenguaje del cliente y presentar una estética más profesional y accesible sin perder el estilo innovador de Symmetrical Code.

## Scope

### In Scope
- Reescritura de todos los textos de servicios en Español e Inglés (i18n).
- Rediseño visual de las tarjetas de servicios (glass-morphism mejorado).
- Actualización de la iconografía y adición de efectos visuales (glows/orbs).
- Mejora de la responsividad en móviles para la nueva estructura.

### Out of Scope
- Creación de nuevas páginas individuales para cada servicio (se mantiene el modal).
- Cambios en el backend o integraciones externas.
- Rediseño de otras secciones del sitio (Hero, Proyectos, etc.).

## Capabilities

### New Capabilities
- `services-section`: Gestión y visualización de los servicios ofrecidos, enfocados en el valor para el cliente final.

### Modified Capabilities
- None

## Approach
Se adoptará un **Enfoque Evolutivo**. Se mantendrá la cuadrícula de 3 columnas pero se refactorizarán las tarjetas para incluir:
1.  **Jerarquía de Texto**: Títulos orientados a soluciones y descripciones centradas en el valor.
2.  **Acentuación Visual**: Uso de gradientes dinámicos y "glowing orbs" que reaccionan al hover.
3.  **Simplificación**: Eliminación de términos técnicos complejos de los bullets principales, moviéndolos a los "highlights" del modal si es necesario.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/sections/ServicesSection.tsx` | Modified | Cambio de estructura y estilos. |
| `src/i18n/locales/es.json` | Modified | Nuevos textos en Español. |
| `src/i18n/locales/en.json` | Modified | Nuevos textos en Inglés. |
| `src/index.css` | Modified | Nuevas clases de utilidad para efectos visuales. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Pérdida de identidad visual | Low | Mantener la paleta de colores y la tipografía base Syne. |
| Textos demasiado genéricos | Med | Validar que cada servicio mantenga su propuesta de valor única. |

## Rollback Plan
Utilizar git para revertir los cambios en los archivos modificados. No hay cambios destructivos en bases de datos o infraestructura.

## Dependencies
- None

## Success Criteria
- [ ] Los textos no contienen tecnicismos innecesarios (ej. "CI/CD", "RESTful").
- [ ] La sección es visualmente más atractiva y "viva" (uso de color y luz).
- [ ] La funcionalidad de los modales sigue operativa.
