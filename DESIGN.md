# Symmetrical Code — Design System

This document lets a designer or developer recreate the brand and UI exactly as implemented. Every value below was read from the current source (paths cited per section); nothing is invented. Where a value could not be verified from code, it is flagged explicitly.

## Quick path

1. Colors, fonts, and spacing are CSS custom properties in `src/index.css`, switched by `html.dark` / `html.light` (toggled in `src/context/ThemeContext.tsx`).
2. Shape language is one idea, two components: `Button.tsx`/`.css` and `CutCard.tsx`/`.css` — both cut the top-left and bottom-right corner at 45°.
3. Section titles always go through `SectionHeading.tsx` (Syne 800). Everything else is Geist.
4. New external assets (icons, fonts, images, scripts) must be self-hostable under the CSP in `vercel.json` — see §9.

---

## 1. Brand essence

- **Core idea: symmetry.** The name, the "S"-based mark, and the button/card cut are all built on 180°-rotational symmetry — a shape that is identical after rotating it 180° around its center (opposite corners, not mirrored sides). The button and card corners literalize this: top-left and bottom-right are cut, top-right and bottom-left are not.
- **Tone: modern, minimal, engineering-led.** Dark-first UI, hairline dividers instead of boxed cards, one accent color per view.
- **One accent per view.** `Button.tsx` doc comment: *"Only one `primary` per view/section."* Global accent is `--brand-blue`; service pages swap it for a single per-service accent (`--svc-accent`, §3.3) — never more than one saturated color live at once outside that override.

## 2. Logo usage

Source: `public/logo.webp`, `public/favicon.svg`, `public/apple-touch-icon.png`, `public/android-chrome-*.png`, `public/og-image.jpg`.

- **Mark**: the favicon SVG (`/favicon.svg`) is the mark used everywhere in the UI — Navbar (`Navbar.tsx`), Footer, HeroSection, ContactModal, DeviceShowcase. It is a true vector (~3.5 KB): two identical arms, one rotated 180° around the center, each with a linear gradient and a fold shadow where its two bands overlap. Its `viewBox` is square (`-50 0 540 540`) with the mark centered, so square and `h-* w-auto` `<img>` boxes keep their proportions. It is never re-colored or re-drawn inline; it's always `<img>`.
- **Wordmark**: `Symmetrical` + `Code` set in Syne, weight 700–800, tracking tight (`tracking-tight` / `-0.02em`). The second word ("Code") is always colored `--accent-blue` / `var(--brand-blue)`, the first stays `--text`. Seen in `Navbar.tsx` and `Footer.tsx`:
  ```tsx
  <span className="font-syne font-bold ... text-text">
    Symmetrical<span className="text-accent-blue">Code</span>
  </span>
  ```
- **Gradient is logo-only.** `.gradient-text` in `src/index.css` (cyan → blue 135°) exists for the mark/wordmark treatment; UI text and buttons use flat token colors, never this gradient.
- **Logo colors** (sampled pixel by pixel from `public/logo.webp`): cyan `#01E7EE` / `#02E0FB` (upper arm and the "CODE" rules), mid `#00B2E4`, blue `#0078FC → #005CFD` (lower arm), fold shadow `#003AAE`. The UI accent `#005CFD` and the cyan `#02E0FB` come from these samples.
- **Clear space and minimum size**: keep at least the height of one S arm free around the mark; don't render the mark below 24 px (favicons use the dedicated `favicon-*` and `android-chrome-*` exports).
- **Don't**: don't recolor the mark, don't apply the gradient to body text or buttons, don't stretch/skew it (it must stay symmetric).

## 3. Color

All color is token-driven via CSS custom properties in `src/index.css`, switched by `html.dark`/`html.light` classes (`ThemeContext.tsx` sets `dark` by default, persisted to `localStorage['sc-theme']`). Tailwind maps to the same tokens in `tailwind.config.js` (`darkMode: 'class'`).

### 3.1 Core tokens

| Token | Dark (`:root`, `html.dark`) | Light (`html.light`) | Role |
|---|---|---|---|
| `--bg` | `#05070b` | `#f5f7fa` | Page background |
| `--surface` | `#0a0e16` | `#ffffff` | Card/panel background (`CutCard` uses this) |
| `--raised` | `#121a28` | `#e9eef5` | Elevated surface |
| `--line` | `rgba(214,226,245,.09)` | `rgba(10,22,46,.1)` | Hairline dividers |
| `--line-2` | `rgba(214,226,245,.19)` | `rgba(10,22,46,.2)` | Stronger hairline / default ring |
| `--text` | `#e6ecf5` | `#0a0f1a` | Primary text |
| `--muted` | `#8c97aa` | `#566175` | Secondary text |
| `--subtle` | `#5e687b` | `#8a93a4` | Tertiary text (meta lines) |
| `--brand-blue` | `#005cfd` | `#0052e6` | Primary accent |
| `--brand-blue-hover` | `#1f70ff` | `#0046c8` | Primary hover |
| `--brand-cyan` | `#02e0fb` | `#0089b8` | Secondary accent (focus ring, links) |
| `--brand-deep` | `#003aae` | `#003aae` | Primary active/pressed |
| `--on-brand` | `#ffffff` | `#ffffff` | Text on filled primary |
| `--focus` | `#02e0fb` | `#0052e6` | Focus ring color |
| `--grid` | `rgba(110,150,225,.08)` | `rgba(0,60,170,.07)` | Hero backdrop grid lines |
| `--glow` | `rgba(0,92,253,.45)` | `rgba(0,92,253,.2)` | Hero backdrop glow (primary) |
| `--glow-2` | `rgba(2,224,251,.22)` | `rgba(2,190,235,.16)` | Hero backdrop glow (secondary) |

**Legacy tokens** (`--cyan`, `--blue`, `--cyan-dim`, `--blue-dim`, `--glow-cyan`, `--glow-blue`, `--card-bg` — all `#195fc1`-based) are explicitly marked in the source as kept only so untouched legacy components still render; **new code must use the tokens above**, not these.

### 3.2 Contrast notes (verified in source comments)

`src/data/services.ts` documents a real accessibility fix: the web/mobile service's light-mode accent was changed from `#0284c7` (3.82:1 on light `--bg`, fails the 4.5:1 floor for small text) to `#0369a1` (5.53:1). Follow this precedent — when picking or changing a light-mode accent, verify contrast against `#f5f7fa` and require ≥4.5:1 for text-sized use.

### 3.3 Per-service accents

Source: `src/data/services.ts` (`accentColor` = dark, `accentColorLight` = light), consumed via `--svc-accent` in `src/pages/ServiceDetailPage.tsx`:

```ts
const svcAccent = theme === 'light' ? service.accentColorLight : service.accentColor;
const rootStyle = { '--svc-accent': svcAccent, ... };
```

| Slug | Dark accent | Light accent | Glow |
|---|---|---|---|
| `software-empresarial` | `#4ade80` | `#15803d` | `rgba(74,222,128,.25)` |
| `inteligencia-artificial` | `#a855f7` | `#7e22ce` | `rgba(168,85,247,.25)` |
| `desarrollo-web-movil` | `#00e5ff` | `#0369a1` | `rgba(0,229,255,.25)` |
| `ciberseguridad` | `#facc15` | `#b45309` | `rgba(250,204,21,.25)` |
| `diseno-ui-ux` | `#f43f5e` | `#be123c` | `rgba(244,63,94,.25)` |
| `automatizacion-analitica` | `#f97316` | `#c2410c` | `rgba(249,115,22,.25)` |

`--svc-accent` drives the eyebrow color, deliverable check icons, breadcrumb current-item text, and `CutCard`'s hover ring/corner accent on that page only — the rest of the site stays on `--brand-blue`. `ServiceDetailPage.tsx` also derives `--svc-glow-tint`/`--svc-glow-2-tint` by mixing the accent into the ambient `--glow`/`--glow-2` for a tinted hero backdrop.

`services.ts` is the single source for these colors: the landing service cards and the service pages both read `accentColor`/`accentColorLight`, so a change there updates both.

### 3.4 Dark-mode logo inversion

`html.dark .logo--mono { filter: invert(1); }` (`src/index.css`) — applied to tech-brand marks that render pure black with no built-in light variant. The exact set is in `src/data/techLogos.tsx`: Vercel, Next.js, GitHub, OpenAI, Express, Three.js.

---

## 4. Typography

Fonts are self-hosted via `@fontsource-variable` and loaded in `src/main.tsx`:

```ts
import '@fontsource-variable/syne';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
```

| Token | Stack | Use |
|---|---|---|
| `--ff-display` (`font-syne`/`font-display`) | `'Syne Variable', 'Syne', 'Geist Variable', ui-sans-serif, system-ui, sans-serif` | **H1/H2 only** (section titles, hero H1) |
| `--ff-text` (`font-sans`) | `'Geist Variable', 'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif` | Body text, UI copy, buttons |
| `--ff-mono` (`font-mono`) | `'Geist Mono Variable', 'Geist Mono', ui-monospace, 'SFMono-Regular', Consolas, monospace` | Eyebrow labels, category tags, meta lines |

**Syne is reserved for H2/H3-level section titles** — `SectionHeading.tsx`'s own comment: *"Syne is reserved for this level — never use it below H2/H3."* Weight is always **800** (Syne's max = ExtraBold), tracking `-0.03em`, line-height `1.08`.

### 4.1 Scale (from `SectionHeading.css`)

Section titles use `container-type: inline-size` on the wrapper (`.sh-wrap`) so the title's own font-size can be capped by the *column* width it sits in (needed for narrow sticky columns on service pages), not by the viewport:

| Size | Clamp | Container-query cap | Used for |
|---|---|---|---|
| `xl` | `clamp(36px, 6vw, 72px)` | `min(clamp(...), calc(100cqi / 10.6))` | Home sections (Services, Projects, Why, Workflow) |
| `lg` (default) | `clamp(28px, 4.5vw, 52px)` | `min(clamp(...), calc(100cqi / 11))` | Inner pages (service detail, legal) |

Why the cap: the divisor (10.6/11 em) is the widest word across that tier's real titles ("Development" ≈ 10.55em in Syne 800 at ‑0.03em) — the cap only engages when that word would actually overflow its column, so every title still reaches its full clamp size on desktop.

**Never split words.** Titles and text never use `hyphens: auto` (combined with `text-wrap: balance` it breaks words that would fit, e.g. "Implemen-tación"). Instead, size titles so their widest word fits the column: the service page H1 uses `clamp(22px, calc(100cqi / 13.4), 64px)` because its widest word is "Implementación" (12.94em). When adding a title with a longer word, measure it and adjust the divisor.

The hero H1 (`HeroSection.tsx`/`.css`) has its own tuned clamp (not `SectionHeading`) specifically to avoid "Symmetrical" overflowing `overflow-hidden` sections below ~442px viewports — exact clamp values live in `HeroSection.css` (read that file directly before changing hero type size).

## 5. Layout & spacing

- **Hairlines, not boxes.** Sections are separated by `border-t border-line` (see `ServiceDetailPage.tsx`'s `SECTION_CLASS = 'border-t border-line py-14 sm:py-[88px]'`), not boxed cards or background color blocks.
- **Section rhythm**: `py-14 sm:py-[88px]` between service-detail sections; home sections use `py-20 sm:py-28 md:py-32` (`ServicesSection.tsx`).
- **Max widths**: `max-w-7xl` for full-bleed section containers (Navbar, Footer, ServicesSection), `max-w-6xl` for service-detail page content, `max-w-3xl`/`max-w-2xl` for hero and heading text columns.
- **Breakpoints**: standard Tailwind scale; the one custom threshold that recurs across layout components is `lg` (1024px) — Navbar's desktop nav/CTA switch, mobile sheet toggle. Hero CTAs have their own `min-[480px]` breakpoint for stacked→inline buttons.
- **Alignment**: left-aligned by default (`SectionHeading` defaults to `align="left"`); the hero is the deliberate exception — centered (`items-center justify-center text-center` in `HeroSection.tsx`).

## 6. Shape language

- **The cut**: top-left and bottom-right corners cut at 45°, everything else square — no `border-radius` anywhere in this system. Implemented identically in `Button.css` (`.sc-btn`) and `CutCard.css` (`.cc-card`) via `clip-path: polygon(...)`.
- **The ring trick**: both use an even-odd `clip-path` on a `::before` pseudo-element so the 1px border also follows the diagonal cut edges (a plain `border` can't do this on a clipped shape).
- **Button cut sizes**: `--cut` scales with button size — `sm` 7px, `md` 9px, `lg` 10px (`Button.css`). `CutCard`'s `--cut` is 16px, 20px from `1024px` up.
- **When NOT to use it**: form inputs, modals (`ContactModal.tsx`), and the mobile nav sheet are not part of this inventory — verify their own treatment in source before assuming the cut applies; this document only confirms Button and CutCard use it.

## 7. Components

### 7.1 Button (`src/components/ui/Button.tsx` + `.css`)

One component, four variants, three sizes. Renders `<Link>` (via `to`), `<a>` (via `href`), or `<button>`.

| Variant | Visual | Notes |
|---|---|---|
| `primary` | Filled `--brand-blue`, `--on-brand` text | Only one per view (per doc comment) |
| `secondary` | Transparent, `--line-2` ring, `--text` | Ring turns `--muted` on hover |
| `icon` | Square, `--cut` fixed to 7px | Always pair with `aria-label` |
| `link` | No clip-path, underline (`--line-2` → `--brand-cyan` on hover) | For inline text links |

Sizes: `sm` (36px), `md` (44px, default), `lg` (52px) — height, cut, and padding all scale together.

```tsx
<Button variant="primary" size="lg" href={whatsappUrl} external arrow>
  {t('hero.cta_primary')}
</Button>
```

Focus state: `:focus-visible` sets `--ring: var(--focus)` and doubles `--bw` to 2px — no `outline`, the ring *is* the focus indicator.

### 7.2 CutCard (`src/components/ui/CutCard.tsx` + `.css`)

Polymorphic (`as="div"|"article"|...`) cut-corner card. `--cc-accent` defaults to `--brand-blue`, overridable via `accentColor` prop (service pages pass `--svc-accent`). On hover/`:focus-within`: ring becomes the accent color, lifts 2px (`translateY(-2px)`), and the two corner gradients (`.cc-card__corner`) go from 40% to full opacity.

```tsx
<CutCard as="article" accentColor={svcAccent}>{...}</CutCard>
```

### 7.3 SectionHeading (`src/components/ui/SectionHeading.tsx` + `.css`)

Canonical `eyebrow` (mono, uppercase, `--muted` or an `eyebrowColor` override) + `title` (Syne 800, see §4) + optional `description` (capped `max-w-[60ch]`). `align` is `left` (default) or `center`; `size` is `lg` (default, inner pages) or `xl` (home sections).

### 7.4 SymmetryBackdrop (`src/components/ui/SymmetryBackdrop.tsx` + `.css`)

CSS-only hero backdrop: a 48px grid (`--grid`, radial-masked) plus two radial glows (`--glow`, `--glow-2`). Explicitly replaces a former WebGL/Aurora canvas — **no JS, no continuous animation**, `aria-hidden`. Requires a `position: relative` parent.

### 7.5 Navbar (`src/components/layout/Navbar.tsx`)

Fixed, 64px tall, `bg-[color-mix(in_srgb,var(--bg)_88%,transparent)]` with `backdrop-blur-[8px]`; bottom border appears only after 8px of scroll (`border-line` vs `border-transparent`). Desktop nav links (`lg:flex`, i.e. ≥1024px) vs. a full-screen mobile sheet below that breakpoint, with scroll-lock, Escape-to-close, and focus trap-in/return-on-close. Active section is tracked by scroll position on the home route only.

### 7.6 ScrollToTop (`src/components/layout/ScrollToTop.tsx`)

Router-level utility: resets scroll to top on `PUSH`/`REPLACE` navigation, explicitly leaves `POP` (back/forward) and in-page hash links alone so browser scroll restoration still works.

## 8. Iconography

Two sources, both compiled at build time via `unplugin-icons` (`vite.config.ts`, `compiler: 'jsx'`) — no runtime CDN requests:

- **Iconify `logos` collection** — real brand marks only. Registry: `src/data/techLogos.tsx`. Two lookup tables:
  - `techLogoMap` — exact match on `Project.tags` strings (from `src/data/projects.ts`).
  - `SERVICE_TECH_KEYWORDS` — substring match on free-form `TechItem.name` strings from `src/data/services.ts` (e.g. `"Node.js / Express"` → Node icon wins because it's named first).
  - **Rule, stated in the file's own comment**: *"a tech without its own logo renders as text instead of borrowing another brand's."* Anything not in these tables (e.g. `MATLAB`, `Render`, `'API REST'`, generic tags like `AI`/`Game`/`CLI`) is `null` → text-only fallback.
- **Lucide** (`~icons/lucide/*`) — for UI chrome (sun/moon theme toggle, menu/x, mail, map-pin, etc.), not brand logos.
- **To add an icon**: `import IconX from '~icons/<collection>/<name>'` and use as a component; browse available names at icones.js.org. For a new tech-stack entry, add it to the exact or keyword map in `techLogos.tsx` — do not substitute a similar brand's mark.
- **Dark-mode inversion**: pair a pure-black mark with `logo--mono` (see §3.4); `isMonoDarkLogo()` in `techLogos.tsx` tells callers which ones need it.

## 9. Motion

- **Transitions, not animations.** Interactive states use short, named-property transitions: buttons `0.18s ease` (background/color) + `0.12s ease` (press transform); cards `0.2s ease` (transform/shadow); nav border `duration-300`.
- **No continuous animation on the redesigned surfaces.** `SymmetryBackdrop`'s own comment states it *replaces* a WebGL canvas specifically to remove continuous animation. (Legacy keyframes — `fadeUp`, `float`, `pulse-glow`, `scanline`, `bounce` — still exist in `src/index.css` for not-yet-migrated components; don't add new continuous loops.)
- **Reduced motion**: both `Button.css` and `CutCard.css` wrap their transitions in `@media (prefers-reduced-motion: reduce)` and zero out the hover/active transform as well as the transition itself. Apply the same pattern to any new interactive component.

## 10. Voice & copy

- **Spanish (MX) with "tú"**, English as a full mirror — not a translation shortcut. Confirmed in `src/i18n/locales/es.json`/`en.json`: content is written natively per locale (e.g. `hero.location`: "Guanajuato, Mexico · Remote" in both, adjusted phrasing per language), not machine-translated 1:1.
- **Sentence case everywhere in UI text** — nav labels, button labels, headings are not uppercased in the copy itself; visual uppercase (eyebrows, category labels) is a CSS transform (`uppercase` class), not how the copy is authored.
- **No unverifiable claims or metrics.** Describe what the work does ("answers grounded in your documents", "optimized to load fast"), never numbers or guarantees the studio can't back: no load-time seconds, uptime/SLA percentages, "24/7", "zero", certifications, or client counts (see the README content rule). Absolute "100%" is reserved for code ownership.
- **Tagline**: "Convertimos ideas claras en productos digitales listos para crecer." / "We turn clear ideas into digital products ready to grow." (`footer.tagline` in `es.json`/`en.json`). Site title: "Symmetrical Code — Estudio de desarrollo de software".

## 11. Accessibility checklist

Verified patterns already in the codebase — reuse them, don't reinvent:

- [ ] Icon-only buttons carry `aria-label` (and usually `title`) — see every `variant="icon"` usage in `Navbar.tsx`.
- [ ] Focus is visible via a *ring color swap*, not a generic outline (`:focus-visible { --ring: var(--focus) }` in `Button.css`) — don't remove `outline: none` without replacing it.
- [ ] Modal/sheet semantics: `role="dialog"`, `aria-modal="true"`, `aria-label`, Escape closes, focus moves in on open and returns to the trigger on close (`Navbar.tsx`'s mobile sheet).
- [ ] Decorative-only elements get `aria-hidden="true"` (`SymmetryBackdrop`, `CutCard`'s corner spans, breadcrumb separator).
- [ ] `aria-current="page"` on the active nav link/breadcrumb item.
- [ ] Light-mode accent colors must clear 4.5:1 against `--bg` for text-sized use (§3.2 precedent) — check before shipping a new accent.
- [ ] Respect `prefers-reduced-motion` on any new transition/transform (§9).

## 12. Do / Don't

**Do**
- One `primary` button per view; everything else `secondary`/`link`.
- Hairline (`border-line`) section separators.
- Syne 800 for section-level titles only; Geist for everything else; Geist Mono for labels/eyebrows.
- Cut-corner shape only on `Button` and `CutCard`.
- Self-host new assets/icons to satisfy the CSP (see below).

**Don't**
- No glassmorphism beyond the one place it already exists in source (`orbit-card` light-mode `backdrop-filter: blur(20px) saturate(180%)` in `src/index.css`) — don't add new blur/glass treatments elsewhere.
- No WebGL/canvas backgrounds — `SymmetryBackdrop` deliberately replaced one.
- No rainbow/multi-accent treatments outside a service-detail page's single `--svc-accent` override.
- No uppercase section titles as authored copy (uppercase is a display-only CSS transform on eyebrows/labels, never the `SectionHeading` title).
- No borrowed brand logos — a tech without its own mark in `techLogos.tsx` renders as text, never a look-alike icon.
- No continuous/looping animation on new components.

## 13. File map

| Concern | Path |
|---|---|
| Color/font tokens, theme classes | `src/index.css` |
| Tailwind → token mapping | `tailwind.config.js` |
| Theme state (dark/light, persistence) | `src/context/ThemeContext.tsx` |
| Font loading | `src/main.tsx` |
| Button | `src/components/ui/Button.tsx`, `Button.css` |
| Card | `src/components/ui/CutCard.tsx`, `CutCard.css` |
| Section heading | `src/components/ui/SectionHeading.tsx`, `SectionHeading.css` |
| Hero backdrop | `src/components/ui/SymmetryBackdrop.tsx`, `SymmetryBackdrop.css` |
| Navbar | `src/components/layout/Navbar.tsx` |
| Scroll reset | `src/components/layout/ScrollToTop.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Hero section | `src/components/sections/HeroSection.tsx`, `HeroSection.css` |
| Services (home) | `src/components/sections/ServicesSection.tsx` |
| Service detail page + accent wiring | `src/pages/ServiceDetailPage.tsx` |
| Per-service data/accents/copy | `src/data/services.ts` |
| Service page sections | `src/components/service/*.tsx` |
| Icons (build-time, `unplugin-icons`) | `vite.config.ts` |
| Tech-logo registry (brand-logo rule, mono inversion) | `src/data/techLogos.tsx` |
| i18n copy (ES/EN) | `src/i18n/locales/es.json`, `en.json` |
| Security headers / CSP | `vercel.json` |
| Meta/OG/JSON-LD | `index.html` |
| Static brand assets | `public/logo.webp`, `favicon.svg`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png`, `og-image.jpg` |

---

### A note on new external assets and the CSP

`vercel.json`'s `Content-Security-Policy` is strict: `script-src 'self' https://va.vercel-scripts.com`, `style-src 'self' 'unsafe-inline'`, `img-src 'self' data: blob:`, `font-src 'self' data:`, `connect-src 'self' https://va.vercel-scripts.com`. Any new external font, script, image host, or analytics/API call **must** either be self-hosted (bundled the way icons and fonts already are) or explicitly added to the matching `*-src` directive in `vercel.json` — otherwise the browser will silently block it in production.
