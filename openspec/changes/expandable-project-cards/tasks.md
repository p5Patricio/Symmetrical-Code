# Tasks: Expandable Project Cards

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~620 (3 new files, 2 modified) |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR — UI is cohesive; splitting would leave feature incomplete |
| Delivery strategy | exception-ok |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

## Phase 1: Foundation

- [ ] 1.1 Add `ogImageUrl` field to `Project` interface and all entries in `src/data/projects.ts`
- [ ] 1.2 Create `src/components/sections/TechIcon.tsx` with SVG mapping for React, Python, TypeScript, Vue, Node.js, JavaScript, HTML, CSS, Docker, AWS, AI, ML, Game, Computer Vision, NLP, OpenAI, Audio, Responsive, Stripe, PostgreSQL, MongoDB, MySQL
- [ ] 1.3 Verify `npm run build` passes after Phase 1

## Phase 2: Core Implementation

- [ ] 2.1 Create `src/components/sections/ExpandedProjectCard.tsx` with two-column desktop layout (carousel left 55%, details right 45%)
- [ ] 2.2 Implement carousel inside ExpandedProjectCard using existing Carousel component pattern with OG image + placeholders
- [ ] 2.3 Add close button (X) in top-right corner of expanded card
- [ ] 2.4 Render tech tags with TechIcon component in expanded card
- [ ] 2.5 Render project links (demo, code, backend) conditionally

## Phase 3: Integration

- [ ] 3.1 Modify `src/components/sections/ProjectsSection.tsx` to track `expandedIndex` state
- [ ] 3.2 Apply `grid-column: 1 / -1` style to expanded card; remove DetailModal and modal-related state
- [ ] 3.3 Wire click handlers: card click expands, second card click replaces, X button collapses
- [ ] 3.4 Implement mobile stacked layout (<768px) inside ExpandedProjectCard

## Phase 4: Verification

- [ ] 4.1 Run `npm run build` — zero TypeScript errors
- [ ] 4.2 Verify responsive behavior at 320px, 768px, 1440px viewports
- [ ] 4.3 Verify OG images load; test fallback when image fails
- [ ] 4.4 Verify all 10 projects expand correctly with correct links and icons
