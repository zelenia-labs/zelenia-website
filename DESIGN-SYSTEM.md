# Zelenia Design System Specification

> [!IMPORTANT]
> Inherits [AGENTS.core.md](AGENTS.core.md). This specification serves as the **single source of truth** for all visual tokens, typographic scales, spatial rules, component conventions, and interaction patterns across Zelenia web properties. It contains zero website copy or marketing text; its sole responsibility is ensuring visual and technical interface consistency.

---

## 1. Visual Principles & Layout Architecture

- **Unboxed Architectural Layouts:** Reject nested cards inside cards ("Russian nesting dolls"). Structure interfaces with open planes, hairline rules (`1px solid var(--border)`), and disciplined vertical rhythm.
- **Physical Contact Grounding:** Avoid diffuse neon halos, glowing drop-shadows, and 2010 skeuomorphic bevels (`inset 0 1px 0`). Grounding relies exclusively on calibrated 1px–2px physical contact shadows and subtle ambient occlusion.
- **Geometric Radius Discipline:** 
  - Structural cards and containers follow defined radius scales (`--radius`, `--radius-lg`).
  - Form controls and inputs use `--radius-sm` (12px).
  - Pill geometry (`--radius-pill: 9999px`) is reserved strictly for designated pill buttons, passive status indicators, and micro-tags.
- **Forbidden UI Patterns:**
  - NO Russian nesting doll / box-in-a-box layouts.
  - NO bracketed pseudo-robotic tags (`[ ... ]` or `[ 01 // ... ]`).
  - NO orphan credentials or dangling delimiter bullets.
  - NO `backdrop-filter: blur()` over continuous `<canvas>` animations.
  - NO layout jitter or translation on hover (`translateY`, `translateX` on interactive buttons).

---

## 2. Color System Architecture (`src/styles/core/colors.css`)

> [!IMPORTANT]
> The single source of truth for all executable CSS variables is **[src/styles/core/colors.css](file:///Users/zorphdark/dev/zelenia-website/src/styles/core/colors.css)**. Hardcoded hex, rgb, or rgba values are strictly forbidden anywhere in application code.

The palette is organized into 6 semantic layers:

| Layer / Role | Primary Tokens | Usage Guidelines |
| :--- | :--- | :--- |
| **Canvas & Surfaces** | `--color-bg`, `--color-surface-warm`, `--color-surface-sand`, `--color-surface-hover`, `--color-white` | Warm alabaster gallery background (`--color-bg`), sand cards (`--color-surface-sand`), and elevated pure white planes (`--color-white`). |
| **Inks & Typographic Contrast** | `--dark-ink`, `--color-obsidian-dark`, `--text`, `--text-2`, `--text-muted`, `--text-accent` | Charcoal and obsidian tones guaranteeing WCAG 2.2 AAA readability. `--text` for headings/primary, `--text-2` for body prose, `--text-accent` for two-tone headings. |
| **Brand Identity (Sage & Slate)** | `--color-sage`, `--color-sage-light`, `--color-sage-dark`, `--color-sage-tint`, `--color-slate-tint` | Studio signature tones for gradient backgrounds, subtle tint surfaces, and brand indicators. |
| **Telemetry & Functional Accents** | `--color-emerald` (CWV good), `--color-cyan` (diagnostics), `--color-rose` (regressions), `--color-purple`, `--color-amber` | Reserved exclusively for telemetry metrics, audit indicators, and status chips. Never used as general decorative fills. |
| **Pastels & Glow Backdrops** | `--color-glow-sage`, `--color-glow-sand`, `--color-glow-charcoal`, `--color-badge-green` | Ambient blur spheres (`filter: blur(90px)`) and category badges. |
| **Calibrated Alpha Tokens** | `--color-*-faint` (~4%), `--color-*-subtle` (~10%), `--color-*-medium` (~18%), `--color-*-strong` (~28%), `--color-*-reading/heavy` | 4-tier consolidated opacity scale for borders (`--color-ink-subtle`), physical contact shadows, and text overlays without blurry halos. |

---

## 3. Typography Stack & Scale

- **Typeface Families:**
  - **Sans (Primary & Telemetry):** `'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
  - **Serif (Editorial Display Accent):** `'Cormorant Garamond', Georgia, 'Times New Roman', serif`
  - **Font Features:** `font-feature-settings: "cv02", "cv03", "cv04", "cv11"` on sans displays.
- **Typographic Scale & Roles:**
  - **Display / H1 (`section-heading-twotone`):** `clamp(2.25rem, 4.2vw, 3.25rem)`, `line-height: 1.2`, `letter-spacing: -0.04em`, `font-weight: 500`.
    - `.heading-primary`: `var(--text)` (Light) / `var(--color-white)` (Dark).
    - `.heading-secondary`: `var(--text-accent)` (Light) / `var(--color-sage-light)` (Dark).
  - **Section Tags (`section-tag-subtle`):** `0.75rem`, `font-weight: 600`, `letter-spacing: 0.14em`, uppercase, `color: var(--text-muted)`.
  - **Body / Prose:** `1rem` to `1.05rem`, `line-height: 1.65`, `color: var(--text-2)`, `text-wrap: pretty`.
  - **Captions & Micro-labels:** `0.75rem` to `0.8125rem`, `letter-spacing: 0.01em` to `0.02em`, `color: var(--text-muted)`.

---

## 4. Spatial Geometry, Grid & Layout Tokens

- **Layout Grid & Shell:**
  - Desktop Shell: `--shell: min(1120px, calc(100vw - 48px));` (derived from 1440px desktop canvas with 160px margins).
  - Container Max Width: `var(--container-max-width, var(--shell))`.
  - Container Gutter: `clamp(1.25rem, 4vw, 2.5rem)`.
  - Section Vertical Rhythm: `clamp(5rem, 8vw, 7.5rem)`.
  - Prose Measure: `max-width: 68ch`.
- **Border Radii Hierarchy:**
  - `--radius-xs: 4px;` (Micro-indicators, status dots)
  - `--radius-sm: 12px;` (Form inputs, focus cards, interactive selectors)
  - `--radius: 20px;` (2x2 grid panels, standard cards)
  - `--radius-md: 20px;`
  - `--radius-lg: 24px;` (3-card showcases, photo frames)
  - `--radius-pill: 9999px;` (Pill buttons, active tags, status pills)
- **Hairline Rules & Dividers:** Standard division uses `1px solid var(--border)` (`rgba(36, 32, 27, 0.08)`).

---

## 5. Component Design Standards & States

### Interactive Controls & Buttons
- **Primary Pill Action (`.btn--pill`, `.btn--pill-submit`):**
  - Height: `44px` to `48px`.
  - Padding: `0 1.75rem` to `0 1.85rem`.
  - Border radius: `var(--radius-pill)`.
  - Dark variant: `background-color: var(--dark-ink)`, `color: var(--color-white)`, shadow: `0 2px 8px var(--color-ink-12)`. Hover: `background-color: var(--color-dark-ink-hover)`.
  - Light variant: `background-color: var(--color-white)`, `color: var(--text)`, shadow: `0 4px 14px var(--color-black-12)`. Hover: `background-color: var(--color-surface-hover)`.
  - State behavior: Zero translation on hover (`translateY(0)`), optical color transition only.

### Form Inputs & Dropdown Architecture
- **Input Dimensions:** Height `48px`, calibrated padding `0.55rem 1rem 0.65rem 1rem` to preserve baseline descent and prevent descender clipping.
- **Surface & Borders:** `background-color: var(--color-white)`, `border: 1px solid var(--color-ink-16)`, `border-radius: var(--radius-sm)`.
- **Focus Rings:** `outline: none`, `border-color: var(--dark-ink)`, `box-shadow: 0 0 0 3px var(--color-ink-18)`.
- **Error States:** `border-color: var(--color-rose-alt)`, error text `var(--color-rose-tint)`.

### Cards & Surfaces
- **Interactive Cards:** Hover elevation `0 6px 18px var(--color-obsidian-08)` with subtle `translateY(-1px)`.
- **Selected Card State:** `border-color: var(--dark-ink)`, `box-shadow: 0 8px 24px var(--color-ink-12), 0 0 0 1px var(--dark-ink)`.

### Ambient Glows & Overlays
- **Ambient Blur Utility (`.ambient-glow`):** Positioned absolute, `border-radius: 50%`, `filter: blur(90px)` to `blur(140px)`, `pointer-events: none`.
- **Noise Texture Overlay (`.section-noise-overlay`):** Monochromatic, `128px 128px` repeat, pointer-events none, providing tactile analog warmth over saturated gradients.

---

## 6. Motion & Interaction Primitives

- **Easing Curves:**
  - Standard Out-Expo: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Duration Tiers:**
  - `--transition-fast: 0.15s cubic-bezier(0.16, 1, 0.3, 1);` (Hover, color transitions, focus states)
  - `--transition-normal: 0.25s cubic-bezier(0.16, 1, 0.3, 1);` (Dropdown menus, disclosure triggers)
  - `--transition-smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1);` (Section reveals, large progressive expansions)
- **Compositor Rule:** All transitions and animations must strictly animate GPU-composited properties (`transform`, `opacity`) without causing document reflow or layout shift.

---

## 7. Accessibility & Visual Quality Standards

- **Color Contrast:** All body text meets WCAG 2.2 AA (minimum 4.5:1 ratio) and AAA where applicable against designated backgrounds.
- **Focus Management:** Interactive elements preserve `:focus-visible` with a distinct `outline: 2px solid var(--dark-ink)` and `outline-offset: 2px` (or `var(--color-white)` on dark surfaces).
- **Minimum Tap Target:** Interactive elements maintain a minimum hit area of `44px x 44px`.
