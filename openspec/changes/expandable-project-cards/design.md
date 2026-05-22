# Design: Expandable Project Cards

## Technical Approach

Replace the modal-based detail view with an inline expandable card using CSS Grid. When a card is clicked, it receives `grid-column: 1 / -1` spanning all columns, and the grid auto-flow pushes remaining cards below. The expanded card renders a two-column layout (carousel left, details right) on desktop and stacked on mobile.

## Architecture Decisions

### Decision: Animation Strategy

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Framer Motion | Smooth layout animations, +~30KB bundle | Rejected — adds dependency for single interaction |
| CSS Grid + transitions | Native, no bundle cost, less smooth | **Chosen** — acceptable UX, keeps bundle small |
| View Transitions API | Native smooth, limited browser support | Rejected — Safari lacks support |

**Rationale**: The project prioritizes bundle size. CSS `transition` on opacity and max-height inside the expanded card provides sufficient perceived smoothness.

### Decision: Technology Icons

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `simple-icons` package | 500+ icons, +~200KB SVG data | Rejected — most icons unused, heavy for 10 tags |
| Inline SVG mapping | Manual maintenance, zero bundle cost | **Chosen** — only ~10 techs needed |

**Rationale**: We need icons for ~10 technologies (React, Python, TypeScript, Vue, etc.). A static mapping object with inline SVG paths is maintainable and costs zero bytes beyond the paths themselves.

### Decision: OG Image Source

| Option | Tradeoff | Decision |
|--------|----------|----------|
| GitHub OG API (`opengraph.githubassets.com`) | Free, auto-generated, may cache | **Chosen** — no upload needed, always current |
| Static screenshots in repo | Manual maintenance, larger repo | Rejected — requires manual work per project |

**Rationale**: GitHub generates OG images automatically. The URL pattern is predictable: `https://opengraph.githubassets.com/1/{owner}/{repo}`.

## Data Flow

```
User clicks card
    │
    ▼
ProjectsSection sets expandedIndex
    │
    ▼
Grid re-renders:
  - expanded card → grid-column: 1 / -1
  - ExpandedProjectCard rendered inside
    │
    ▼
ExpandedProjectCard:
  - Carousel loads OG image + placeholders
  - TechIcon resolves tag → SVG path
  - Links render conditionally (demo/backend)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/sections/ProjectsSection.tsx` | Modify | Replace modal with inline expansion logic |
| `src/components/sections/ExpandedProjectCard.tsx` | Create | Full-width expanded card with carousel + details |
| `src/components/sections/TechIcon.tsx` | Create | SVG icon resolver for technology tags |
| `src/data/projects.ts` | Modify | Add `ogImageUrl` to each project |

## Interfaces / Contracts

```typescript
// src/components/sections/TechIcon.tsx
interface TechIconProps {
  name: string;        // e.g., "React", "Python"
  size?: number;       // default 16
  color?: string;      // default "#00e5ff"
}

// src/components/sections/ExpandedProjectCard.tsx
interface ExpandedProjectCardProps {
  project: Project;    // from src/data/projects.ts
  onClose: () => void;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | TypeScript compilation | `pnpm build` — zero errors |
| Visual | Responsive layouts | Manual check at 320px, 768px, 1440px |
| Visual | OG image fallback | Block network request, verify placeholder shows |

## Migration / Rollout

No migration required. Pure UI refactor. Rollback: revert `ProjectsSection.tsx` to pre-change commit.

## Open Questions

- [ ] Should the carousel auto-rotate or only manual navigation? → **Decision**: Manual only (user controls)
- [ ] Max description length in expanded card? → **Decision**: Clamp at 4 lines with optional scroll
