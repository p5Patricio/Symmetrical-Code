# Redesign Services Section

## Intent
Redesign the Services section to target a non-technical business audience, making it more informative upfront and removing the need for modals.

## Scope
- Update section titles and subtitles in `es.json` and `en.json`.
- Refactor `ServicesSection.tsx` to:
    - Remove `ServiceModal` and related state.
    - Show more bullet points (all of them) in the service cards.
    - Improve card layout to be "self-contained" and visually appealing without "Read More".
    - Update the section header to be more business-centric.

## Approach
- **Phase 1: Research (Done)** - Analyzed existing code and translations.
- **Phase 2: Proposal** - Define the new structure and copy.
- **Phase 3: Spec** - Detailed requirements and scenarios.
- **Phase 4: Design** - Component architecture and styling updates.
- **Phase 5: Tasks** - Implementation steps.
- **Phase 6: Apply** - Code changes.
- **Phase 7: Verify** - Visual and functional verification.
- **Phase 8: Archive** - Finalize.

## Decisions
- Remove the modal entirely to simplify UX.
- Use a 3-column grid (stays as is but with richer content).
- Show all 4 bullets currently in JSON.
- Change title to "Potenciamos tu negocio con software a medida" or similar.
