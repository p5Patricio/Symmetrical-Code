# Design: Services Section Redesign

## UI Structure
- **Section Header**:
    - Center-aligned (or keep current left-aligned but more prominent).
    - New copy reflecting business value.
- **Service Cards**:
    - **Header**: Icon (kept) + Index (kept).
    - **Body**: Title (kept) + Short Description (kept).
    - **Footer**: Bullet list (showing all 4 items).
    - **Visuals**: Enhance the "glass-card" effect to make them feel premium and self-contained.
- **Removed Elements**:
    - "Learn More" button.
    - `ServiceModal` component.
    - Large icons used only in the modal.

## Styling
- Keep existing `serviceColors` for visual identity.
- Ensure bullet points have enough spacing and contrasting markers.
