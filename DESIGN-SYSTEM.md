# Zelenia Design System Specification

> [!IMPORTANT]
> Inherits [AGENTS.core.md](AGENTS.core.md) and codifies the official design direction resulting from **Design Consultation** (`design-consultation`). It serves as the **single source of truth** for all visual tokens, typographic scales, spatial rules, and interaction patterns across Zelenia web properties. Strict adherence is mandatory.

---

## 1. Design Thesis: "Architectural Precision Meets Haute Digital Craft"

- **The Memorable-Thing Anchor:**

  > _"Senior Density & Architectural Precision: Two elite practitioners delivering bespoke digital software of unmistakable caliber and sub-second speed, completely eliminating agency bloat."_

- **The Anti-Slop & Anti-Template Manifesto:**
  - **No Generic 3-Column Card Grids:** We reject symmetric rows of rounded white cards with icons in colored circles. Replace with asymmetrical editorial dossiers, technical telemetry splits, and document-like architectural layouts.
  - **No Bubbly Startup Curves:** Clean, disciplined, architectural geometry (`--radius: 10px`, `--radius-sm: 6px`, `--radius-pill: 9999px` strictly for interactive pills/tags).
  - **No Disposable AI Visuals:** No floating blurred orbs, no purple-to-blue default gradients, no generic 3D blobs. Every visual asset must be intentional, grounded, and structurally meaningful.
  - **Editorial & Monospace Juxtaposition:** Pairing high-prestige editorial display typography (_Newsreader_ italic serif accents) with razor-sharp architectural sans (_Plus Jakarta Sans_ / refined _Inter_) and technical telemetry monospace (_Roboto Mono_).

---

## 2. Spatial Tokens & CSS Custom Properties (`:root`)

```css
:root {
  /* Surface Architecture: Deep Obsidian & Technical Titanium */
  --bg: #07090e;
  --surface: #0e121b;
  --surface-2: #141a24;
  --surface-elevated: #1b2230;

  /* Architectural Hairline Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-subtle: rgba(255, 255, 255, 0.04);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-focus: rgba(0, 85, 255, 0.5);

  /* Luminous Brand Accents */
  --blue: #0055ff; /* High-voltage Royal Cobalt (Action & Brand) */
  --blue-hover: #1a68ff;
  --emerald: #10b981; /* Phosphor Green (Health, CWV & Performance) */
  --cyan: #00e5ff; /* Precision Telemetry & Accent */
  --rose: #f43f5e; /* Diagnostic Alert & Warning */

  /* Typographic Contrast Scale (WCAG AAA/AA) */
  --text: #f8fafc; /* Titanium Pure White (Headings & High-Emph) */
  --text-2: #94a3b8; /* Slate Body & Subtitles */
  --muted: #64748b; /* Architectural Captions & Micro-labels */
  --code-text: #38bdf8; /* Monospace Telemetry Accent */

  /* Disciplined Architectural Radii */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius: 10px;
  --radius-lg: 16px;
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
  - Features: `font-feature-settings: "cv02", "cv03", "cv04", "cv11"; letter-spacing: -0.035em; line-height: 1.06;`
- **Body & Narrative:**
  - Family: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Specs: `line-height: 1.68; color: var(--text-2); font-weight: 400; text-wrap: pretty;`
- **Technical Telemetry & Code Badges:**
  - Family: `'Roboto Mono', monospace`
  - Specs: `font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500;`

---

## 4. Component Layout Conventions

### Hero Stage

- Full-bleed cinematic composition.
- Brand thesis first: bold, asymmetric, left-aligned typography.
- Integrated Live Architecture & Core Web Vitals diagnostic instrument embedded cleanly into the flow.
- Proof footnote ribbon: real executive milestones (Fortune 100 Principal Engineer + Seed-to-Series-E Unicorn Designer).

### The Advantage & Model (`#advantage`)

- Asymmetrical split layout.
- Direct side-by-side contrast: **The Traditional Agency Trap** (Junior bait-and-switch, billable hour bloat, unmaintainable handoffs) vs **The Zelenia Senior Density Model** (100% direct principal execution, GDE web vitals guarantee, daily Git commits).

### Capabilities & Engineering Dossier (`#capabilities`)

- Technical deliverables dossier with live interactive metrics (LCP target < 1.0s, test coverage, design-token sync).
- Replacing standard cards with structural data tables and modular specifications.

### Commercial Transparency & Mutual Fit (`#transparency`)

- Direct contractual boundaries: 100% repository custody, Figma token transfers, zero proprietary runtime lock-in, 30-day technical warranty.
