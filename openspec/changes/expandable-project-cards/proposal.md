# Proposal: Expandable Project Cards

## Intent

Replace the current static project grid and modal detail view with an interactive expandable card layout. When a user clicks a project card, it expands to full grid width, pushing other cards below. This creates a more immersive browsing experience without leaving the page context.

## Scope

### In Scope
- Expandable card interaction (click to expand, click another to replace)
- Two-column layout in expanded state: carousel (left) + details (right)
- Larger tech tags with SVG technology icons
- GitHub Open Graph images as carousel slides
- Close button (X) to collapse expanded card
- Responsive mobile adaptation
- Preserve existing i18n support

### Out of Scope
- Real-time repo data fetching (static data from projects.ts)
- Admin panel to edit projects
- Filtering logic changes (keep existing category filter)

## Capabilities

### New Capabilities
- `expandable-card-layout`: Grid-to-expanded card interaction with CSS Grid / Framer Motion
- `tech-icon-display`: SVG technology icons mapped to project tags
- `github-og-image-carousel`: Fetch and display GitHub Open Graph images per repo

### Modified Capabilities
- None at spec level (pure UI interaction change)

## Approach

Use React state to track `expandedIndex`. The grid container conditionally renders the expanded card at the calculated grid position (using CSS Grid `grid-column: 1 / -1` when expanded). For smooth animations, use Framer Motion for layout transitions. Technology icons sourced from `simple-icons` (SVG format). Open Graph images fetched via GitHub's `repository-open-graph-image` API or cached statically.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/components/sections/ProjectsSection.tsx` | Modified | Replace modal with expandable inline cards |
| `src/data/projects.ts` | Modified | Add `ogImageUrl` field per project |
| `src/components/sections/` | New | `TechIcon.tsx` — reusable tech SVG icon component |
| `package.json` | Modified | Add `simple-icons` dependency |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| OG images fail to load | Med | Fallback to ProjectImage placeholder component |
| Framer Motion increases bundle size | Low | Use CSS transitions as fallback if bundle > threshold |
| Mobile layout breaks | Med | Test grid-column-span behavior; switch to stacked layout on <768px |
| Icon not found in simple-icons | Low | Fallback to generic "code" icon or text-only tag |

## Rollback Plan

Revert `ProjectsSection.tsx` to previous commit (pre-expandable). Remove `simple-icons` from dependencies. Restore modal-based DetailModal if needed.

## Dependencies

- `simple-icons` package package (SVG tech logos)
- Framer Motion (optional, can use CSS transitions)

## Success Criteria

- [ ] Clicking a project card expands it to full grid width
- [ ] Other cards flow beneath the expanded card
- [ ] Expanded card shows carousel (left) + details (right) on desktop
- [ ] Expanded card shows stacked layout on mobile
- [ ] Clicking another card replaces the expanded one
- [ ] Close button (X) collapses the expanded card
- [ ] Each tag shows its corresponding technology SVG icon
- [ ] OG images load or fallback gracefully
- [ ] TypeScript build passes (`pnpm build`)
- [ ] Responsive behavior verified at 320px, 768px, 1440px
