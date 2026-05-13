# Design: Rediseño de la Sección de Servicios

## Technical Approach
El rediseño se implementará modificando `ServicesSection.tsx` para introducir una estética más vibrante y orientada a beneficios. Se utilizarán utilidades de Tailwind CSS para crear efectos de resplandor (glows) y se refactorizarán las tarjetas para mejorar la jerarquía de la información. El contenido se extraerá completamente de los archivos i18n para facilitar el mantenimiento.

## Architecture Decisions

### Decision: Inyección de Color Dinámico
**Choice**: Crear un mapa de colores asociados a cada servicio para alimentar los efectos visuales.
**Alternatives considered**: Colores fijos para todos los servicios (demasiado plano), usar imágenes (pesado para carga).
**Rationale**: Permite una diferenciación visual clara entre servicios y añade "vida" a la sección sin afectar el rendimiento.

### Decision: Refactorización de Iconografía
**Choice**: Mantener los SVGs actuales pero envolverlos en contenedores con efectos de luz de fondo.
**Alternatives considered**: Reemplazar por imágenes 3D (demasiado pesado), usar una librería de iconos externa (añade dependencias).
**Rationale**: Los SVGs actuales son ligeros y escalables; el cambio visual vendrá de cómo se presentan (glows traseros).

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/sections/ServicesSection.tsx` | Modify | Actualización de la estructura de tarjetas, adición de efectos visuales y lógica de color dinámica. |
| `src/i18n/locales/es.json` | Modify | Actualización masiva de los textos de servicios a un lenguaje orientado a beneficios. |
| `src/i18n/locales/en.json` | Modify | Actualización de los textos en inglés para mantener paridad con el español. |
| `src/index.css` | Modify | Adición de utilidades para efectos de tarjetas (glass-morph mejorado). |

## Interfaces / Contracts

### I18n Structure for Services
```json
{
  "services": {
    "items": [
      {
        "title": "Soluciones Web de Alto Impacto",
        "description": "Tu negocio disponible 24/7 con diseño profesional y velocidad increíble.",
        "longDescription": "...",
        "highlights": ["...", "..."],
        "bullets": ["...", "..."]
      }
    ]
  }
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | Responsividad | Verificación manual en herramientas de desarrollo (móvil vs desktop). |
| Funcional | Apertura de Modales | Comprobar que al hacer clic en "Más información" se muestra el modal correcto. |
| I18n | Cambio de Idioma | Verificar que los textos cambian correctamente al alternar idiomas. |

## Migration / Rollout
No migration required. El cambio es puramente de interfaz y contenido estático.
