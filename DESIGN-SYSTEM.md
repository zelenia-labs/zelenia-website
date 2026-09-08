# Zelenia Design System Specification

> [!IMPORTANT]
> Inherits [AGENTS.core.md](AGENTS.core.md) and codifies the official design direction resulting from **Design Consultation** (`design-consultation`). It serves as the **single source of truth** for all visual tokens, typographic scales, spatial rules, and interaction patterns across Zelenia web properties. Strict adherence is mandatory.

---

## 1. Design Thesis: "Precision Computing Meets Fine Craft"

- **The Memorable-Thing Anchor:**

  > _"Two elite practitioners delivering bespoke digital flagships of unmistakable prestige and sub-second speed, completely eliminating agency bloat."_

- **The Anti-Slop & Anti-Convergence Manifesto:**
  - **No Generic 3-Column Card Grids:** We reject symmetric rows of rounded white cards with icons in colored circles. Replace with asymmetrical editorial dossiers, technical telemetry splits, and document-like architectural layouts.
  - **No Bubbly Startup Curves:** Clean, disciplined, architectural geometry (`--radius: 12px`, `--radius-sm: 8px`, `--radius-pill: 9999px` strictly for interactive pills/tags).
  - **No Disposable AI Visuals:** No floating blurred orbs, no purple-to-blue default gradients, no generic 3D blobs. Every visual asset must be intentional, grounded, and structurally meaningful.
  - **Editorial & Monospace Juxtaposition:** Pairing high-prestige editorial display typography (_Newsreader_ italic serif accents) with razor-sharp architectural sans (_Inter_) and technical telemetry monospace (_Roboto Mono_).
  - **Luminous Porcelain Architecture:** Professional, ultra-modern light palette featuring ultra-fine porcelain alabaster, crisp white elevated planes, and deep titanium typographic contrast.

---

## 2. Spatial Tokens & CSS Custom Properties (`:root`)

```css
:root {
  /* Surface Architecture: Luminous Porcelain & Technical Titanium */
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-2: #f1f5f9;
  --surface-3: #e2e8f0;
  --surface-elevated: #ffffff;

  /* Architectural Hairline Borders */
  --border: rgba(15, 23, 42, 0.08);
  --border-subtle: rgba(15, 23, 42, 0.04);
  --border-medium: rgba(15, 23, 42, 0.12);
  --border-strong: rgba(15, 23, 42, 0.2);
  --border-focus: rgba(0, 82, 255, 0.6);

  /* Luminous Brand Accents */
  --blue: #0052ff; /* High-voltage Royal Cobalt (Action & Brand) */
  --blue-hover: #0045d8;
  --emerald: #059669; /* Phosphor Green (Health, CWV & Performance) */
  --cyan: #0284c7; /* Precision Telemetry & Accent */
  --rose: #e11d48; /* Diagnostic Alert & Warning */
  --amber: #d97706; /* Notice & Caution */

  /* Typographic Contrast Scale (WCAG AAA/AA) */
  --text: #090d15; /* Titanium Deep Ink (Headings & High-Emph) */
  --text-2: #334155; /* Slate Body & Subtitles (Contrast > 7:1) */
  --muted: #64748b; /* Architectural Captions & Micro-labels */
  --code-text: #0284c7; /* Monospace Telemetry Accent */

  /* Disciplined Architectural Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius: 12px;
  --radius-lg: 18px;
  --radius-pill: 9999px;

  /* Layout Shell & Spatial Measure */
  --shell: min(1200px, calc(100vw - 48px));
  --shell-narrow: min(920px, calc(100vw - 48px));
  --space-unit: 8px;

  /* Motion & Easing Tiers (GPU Compositor Thread Only) */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: 160ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 280ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Typography Stack & Hierarchy

- **Primary Display & Headings:**
  - Family: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Accent / Editorial Serifs: `'Newsreader', Georgia, Cambria, serif` (italic ligatures on key value propositions)
  - Features: `font-feature-settings: "cv02", "cv03", "cv04", "cv11"; letter-spacing: -0.035em; line-height: 1.08;`
- **Body & Narrative:**
  - Family: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Specs: `line-height: 1.7; color: var(--text-2); font-weight: 400; text-wrap: pretty;`
- **Technical Telemetry & Code Badges:**
  - Family: `'Roboto Mono', monospace`
  - Specs: `font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500;`

---

## 4. Component Layout Conventions

### Hero Stage

- Full-bleed expansive light composition with subtle atmospheric micro-grid.
- Brand thesis first: bold, asymmetric, left-aligned typography.
- Integrated Live Architecture & Core Web Vitals diagnostic instrument embedded cleanly with luminous card elevation.
- Proof footnote ribbon: real executive milestones (Fortune 100 Principal Engineer + Seed-to-Series-E Unicorn Designer).

### The Advantage & Model (`#advantage`)

- Asymmetrical split layout.
- Direct side-by-side contrast: **The Traditional Agency Trap** vs **The Zelenia Senior Density Model**.
- Crisp porcelain surface with hairline architectural borders.

### Capabilities & Engineering Dossier (`#capabilities`)

- Technical deliverables dossier with live interactive metrics (LCP target < 1.0s, test coverage, design-token sync).
- Replacing standard cards with structural data tables and modular specifications.

### Commercial Transparency & Mutual Fit (`#transparency`)

- Direct contractual boundaries: 100% repository custody, Figma token transfers, zero proprietary runtime lock-in, 30-day technical warranty.
- Mutual fit assessment columns for optimal fit and misaligned scopes.
