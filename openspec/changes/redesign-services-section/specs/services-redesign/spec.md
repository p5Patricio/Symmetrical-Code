# Spec: Services Section Redesign

## Requirements
- **Copy Update**:
    - Spanish: Title "Potenciamos tu negocio", Subtitle "Soluciones tecnológicas diseñadas para dueños de negocios, no solo para expertos en sistemas."
    - English: Title "Powering Your Business", Subtitle "Technology solutions designed for business owners, not just tech experts."
- **Component Refactor**:
    - Remove `selectedService` state and `ServiceModal` component.
    - Remove "View more details" button from cards.
    - Display all 4 `bullets` from the JSON in each card.
    - Ensure cards are visually balanced with the extra content.

## Scenarios
- **Scenario 1: Responsive Grid**
    - The grid should remain responsive (1 column mobile, 2 columns tablet, 3 columns desktop).
- **Scenario 2: Content Accessibility**
    - All service information must be readable without user interaction (no clicks needed).
- **Scenario 3: Language Switching**
    - Titles and bullets must update correctly when switching between Spanish and English.
