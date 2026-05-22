# Tasks: Rediseño de la Sección de Servicios

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 200 - 300 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

## Phase 1: Contenido (I18n)
- [ ] 1.1 Actualizar `src/i18n/locales/es.json` con los nuevos textos orientados a beneficios.
- [ ] 1.2 Actualizar `src/i18n/locales/en.json` con la traducción correspondiente.

## Phase 2: Estilos (CSS)
- [ ] 2.1 Agregar utilidades de `glass-morph` y `glowing-orb` en `src/index.css`.
- [ ] 2.2 Definir animaciones para los efectos de hover si es necesario.

## Phase 3: Componente (React)
- [ ] 3.1 Refactorizar `src/components/sections/ServicesSection.tsx` para implementar el mapa de colores dinámicos.
- [ ] 3.2 Actualizar el layout de las tarjetas para mejorar la jerarquía visual.
- [ ] 3.3 Implementar los efectos de "Glowing Orbs" en el hover de cada tarjeta.
- [ ] 3.4 Ajustar el modal de detalles para que coincida con la nueva estética.

## Phase 4: Verificación
- [ ] 4.1 Verificar la responsividad en móviles y tablets.
- [ ] 4.2 Comprobar que todos los textos se muestran correctamente en ambos idiomas.
- [ ] 4.3 Validar que el modal se abre y cierra sin errores visuales.
