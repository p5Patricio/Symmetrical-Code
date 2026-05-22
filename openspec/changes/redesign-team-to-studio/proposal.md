# Redesign Team to Studio

## Intent
Transform the "Team" section from a collection of individual profiles into a "Why Us / Our Studio" section that emphasizes the company's collective expertise, professional engineering standards, and reliable delivery.

## Scope
- Update `es.json` and `en.json` to shift the focus from "Team Members" to "Our Approach" and "Why Choose Us".
- Refactor `TeamSection.tsx` into `StudioSection.tsx` (or update it in place):
    - Remove individual photos, nicknames, and personal bios.
    - Replace them with "Specialization Pillars" (e.g., UI/UX Architecture, Backend Scalability, Fullstack Orchestration).
    - Add a "Our Method" or "How We Deliver Quality" block.
    - Ensure a professional, corporate yet approachable "Software Studio" aesthetic.

## Approach
- **Phase 1: Research (Done)** - Analyzed existing code and translations.
- **Phase 2: Proposal** - Define the new section structure and narrative.
- **Phase 3: Spec** - Detailed content requirements and scenarios.
- **Phase 4: Design** - Component architecture (removing modals, adding synergy blocks).
- **Phase 5: Tasks** - Implementation steps.
- **Phase 6: Apply** - Code changes.
- **Phase 7: Verify** - Visual and functional verification.

## Decisions
- Rename the section label to "The Studio" or "Why Symmetrical Code".
- Use three main columns reflecting the core specialties but framed as company capabilities.
- Focus on "Quality Assurance" and "Engineering Standards" as the main trust builders.
- Remove the modal interaction (everything should be visible and clear upfront).
