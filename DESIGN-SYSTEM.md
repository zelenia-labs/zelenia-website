# Zelenia Design System Specification

> [!IMPORTANT]
> Inherits [AGENTS.core.md](AGENTS.core.md) and codifies the official design and architectural direction defined in [strategy.md](strategy.md). It serves as the **single source of truth** for all visual tokens, typographic scales, spatial rules, component conventions, and interaction patterns across Zelenia web properties. Strict adherence is mandatory.

---

## 1. Design Thesis: "Precision Computing Meets Fine Craft"

- **The Memorable-Thing Anchor:**

  > _"Two elite practitioners pairing Fortune 100 frontend architecture with unicorn-tested product design to deliver high-performance web experiences of unmistakable craft and sub-second speed—completely eliminating agency overhead."_

- **The Anti-AI-Slop & Anti-Convergence Manifesto:**
  - **Zero "Boutique", "Atelier", "Bespoke", or "Flagship" Clichés:** NEVER use the words "boutique", "atelier", "bespoke", or "flagship" anywhere in customer-facing UI or copy. Focus strictly on concrete business and technical outcomes: high-performance web experiences, conversion lift, sub-second speed, and direct founder execution.
  - **No Russian Nesting Dolls:** Reject cards inside cards inside cards. Replace with open, unboxed architectural layouts, hairline rules (`1px solid var(--border)`), and expansive typographic breathing room.
  - **No Bubbly Consumer Pills for Core Actions:** Buttons adhere to disciplined architectural geometry (`--radius-sm: 6px`). Oval pill buttons (`9999px`) are strictly forbidden for primary and secondary actions; pill radii are reserved exclusively for passive status pills and micro-tags.
  - **No 2010 Skeuomorphism or Diffuse Halos:** No embossed top/bottom bevels (`inset 0 1px 0`), no text-shadows, and no amateur neon blue drop-shadows (`box-shadow: 0 8px 24px -4px rgba(0, 82, 255, 0.35)`). Grounding relies on crisp 1px–2px physical contact shadows.
  - **Unified Architectural Typography:** Pairing high-prestige editorial display serif accents (_Cormorant Garamond_ and _Newsreader_) with razor-sharp architectural sans (_Inter_) across all body copy, telemetry, and micro-labels.
  - **Luminous Alabaster Architecture:** A warm, refined gallery light palette featuring ultra-fine porcelain alabaster, crisp white elevated planes, and deep obsidian ink typographic contrast.

---

## 2. Spatial Tokens & CSS Custom Properties (`:root`)

```css
:root {
  interpolate-size: allow-keywords;

  /* Surface Architecture: Warm Gallery Alabaster & Deep Obsidian */
  --bg: #fbfaf7;
  --surface: #ffffff;
  --surface-warm: #f4f1ea;
  --surface-2: #f2efe7;
  --surface-3: #e8e4da;
  --surface-contrast: #0c0f14;
  --surface-elevated: #ffffff;

  /* Architectural Hairline Borders */
  --border: rgba(18, 22, 30, 0.08);
  --border-subtle: rgba(18, 22, 30, 0.04);
  --border-medium: rgba(18, 22, 30, 0.12);
  --border-strong: rgba(18, 22, 30, 0.22);
  --border-hover: rgba(18, 22, 30, 0.35);
  --border-focus: #0c0f14;

  /* High-Trust Action & Brand Accents: Deep Sovereign Navy & Lapis Sapphire */
  --btn-primary-bg: #122444; /* Deep Sovereign Navy (Action, Authority & Trust) */
  --btn-primary-hover: #0c1a33;
  --btn-primary-border: rgba(18, 36, 68, 0.45);
  --blue: #1848b8; /* Refined Architectural Lapis Sapphire (Telemetry & Indices) */
  --blue-hover: #12368a;
  --blue-rgb: 24, 72, 184;
  --cyan: #0284c7; /* Surgical Telemetry & Diagnostic Accent */
  --cyan-rgb: 2, 132, 199;
  --emerald: #059669; /* Phosphor Green (Health & Sub-Second CWV) */
  --emerald-rgb: 5, 150, 105;
  --rose: #e11d48; /* Diagnostic Alert & Regression */
  --amber: #d97706; /* Technical Notice & Caution */
  --gold: #b48c36;

  /* Typographic Contrast Scale (WCAG AAA/AA) */
  --text: #0c0f14; /* Deep Obsidian Ink */
  --text-2: #384252; /* Charcoal Reading Weight (> 7:1 contrast) */
  --muted: #687487; /* Refined Architectural Caption */
  --text-inverse: #ffffff;

  /* Disciplined Architectural Radii */
  --radius-xs: 3px; /* Micro indicators, status dots */
  --radius-sm: 6px; /* Buttons, inputs, interactive controls */
  --radius: 10px; /* Structural instrument panels */
  --radius-md: 10px;
  --radius-lg: 16px; /* Hero display frames */
  --radius-pill: 9999px; /* Strictly for passive tags and telemetry pills */

  /* Layout Shell & Spatial Grid */
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
  - Accent / Editorial Serifs: `'Newsreader', Georgia, Cambria, serif` (italic ligatures on core value proposition accents)
  - Specs: `font-feature-settings: "cv02", "cv03", "cv04", "cv11"; letter-spacing: -0.03em; line-height: 1.1;`
- **Body & Narrative:**
  - Family: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Specs: `font-size: 1rem; line-height: 1.65; color: var(--text-2); font-weight: 400; text-wrap: pretty;`
- **Telemetry & Micro-Labels:**
  - Family: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Specs: `font-size: 0.75rem; letter-spacing: 0.02em; font-weight: 500; color: var(--muted);`

---

## 4. Architectural Button Standard (Executive Trust & Prestige)

To project absolute institutional confidence, rock-solid stability, and zero visual jitter, all buttons follow strict architectural rules:

### Primary Action (`.btn--primary`)

- **Philosophy:** Tailored Sovereign Navy (`#122444`) conveying institutional confidence, security, and elite engineering authority—completely rejecting raw, oversaturated generic Bootstrap blue (`#0052ff` / `#0d6efd`).
- **Geometry:** `border-radius: var(--radius-sm);` (6px disciplined rectangle).
- **Background:** Solid Sovereign Navy (`var(--btn-primary-bg)` / `#122444`).
- **Border:** Razor-thin hairline `1px solid var(--btn-primary-border)` (`rgba(18, 36, 68, 0.45)`).
- **Shadow:** Crisp contact shadow `0 1px 2px rgba(10, 20, 45, 0.08)`. Zero diffuse halos. Zero skeuomorphic bevels.
- **Hover & Active:** Pure optical lighting transition without vertical lift or translation (zero `translateY`, zero `translateX`). Deepens to `#081120` on click with zero geometric shift.

### Secondary Action in Link Mode (`.hero-secondary-link`, `.action-secondary-link`)

- **Philosophy:** Editorial link-mode action replacing bulky white button chrome with clean typography and seamless inline flow.
- **Hover:** Pure color transition to Architectural Lapis Sapphire (`var(--blue)` / `#1848b8`) with completely static positioning (zero translation sideways or vertically).

### Secondary Button (`.btn--secondary`)

- **Philosophy:** Gallery Alabaster precision surface pairing seamlessly with the light architectural canvas.
- **Geometry:** `border-radius: var(--radius-sm);` (6px).
- **Background:** Pure White (`#ffffff`).
- **Color:** Deep Obsidian Ink (`var(--text)` / `#0c0f14`).
- **Border:** Hairline architectural border `1px solid rgba(18, 22, 30, 0.14)`.
- **Shadow:** Subtle contact grounding `0 1px 2px rgba(18, 22, 30, 0.03)`.
- **Hover:** `#fbfaf8`, border `rgba(18, 22, 30, 0.24)`, shadow `0 2px 4px rgba(18, 22, 30, 0.05)`, completely static without vertical displacement.

### Arrow Indicator (`.arrow-indicator`)

- Refined sans arrow `→` anchored firmly beside text without translational jitter on hover.

---

## 5. Page Specifications & Layout Architecture (from `strategy.md`)

### Page 1: Home (`/` — `src/app/pages/index.page.ts`)

Streamlined to a high-signal 5-section narrative funnel:

1. **Editorial Studio Hero (`app-hero` / `#hero`):**
   - **Single Job:** Studio positioning, primary value proposition, and ONE clear primary CTA.
   - **Direct Headline Entrance (No Eyebrow Stacking):** _"High-performance web experiences. Executed directly by the founders."_ Begins directly with the primary headline, avoiding formulaic 3-tier stacking or decorative eyebrow pills.
   - **Subheadline Standard:** Concise, non-verbose narrative without em-dashes stating the direct partnership between a Fortune 100 Principal Engineer and an elite Product Designer shipping in weeks, not quarters.
   - **Proof Footnote:** Real executive milestones (Fortune 100 Principal Software Engineer & GDE + Seed-to-Series-E Unicorn Lead Designer).
   - **Primary Action:** Direct route to `/process` (_Scope Your Project →_).

2. **Core Engagement Tracks (`app-engagement-tracks` / `#tracks`):**
   - **Concept:** Replaces robotic "Intent Navigator" with an executive, problem-first decision stage.
   - **Left Column:** Two unnumbered reading levels per track (Discipline Title + 1-line technical summary):
     - _Sub-Second Speed & Web Vitals (CrUX / RUM)_
     - _Adaptive Multi-Surface & Viewport Architecture_
     - _Semantic Foundation, A11y & Technical SEO/SMO_
     - _Aesthetic Elevation & Visual CRO_
     - _End-to-End Modernization & Agency Replacement_
   - **Right Column (Living Visual Instrument):** Live interactive stage showcasing telemetry waterfalls, responsive viewport switchers, DOM hierarchy inspector, typographic specimens, and Git commit logs.

3. **The Advantage & Senior Density (`app-advantage` / `#advantage`):**
   - **Concept:** Unboxed, muscular editorial manifesto beside a sticky visual sculpture.
   - **Direct Contrast:**
     - _The Agency Overhead Trap:_ Senior partners pitch; junior subcontractors execute. 40%+ billable waste on account managers, status calls, and handoff decay.
     - _The Zelenia Senior Density Model:_ Zero account managers, zero junior delegation, direct live browser co-authoring, capped strictly at **two concurrent client sprints** (shipping in 2–4 weeks what agencies delay for quarters).

4. **Capabilities Summary (`app-capabilities-summary` / `#capabilities`):**
   - **Concept:** Open 4-column typographic showcase with royal cobalt indices and metric deliverables:
     - _1. Web Vitals & Runtime Performance:_ LCP < 1.0s, CLS 0.00, INP < 50ms (CrUX & RUM).
     - _2. Adaptive Multi-Surface Architecture:_ Fluid layouts across mobile, tablet, and desktop without breakpoint glitches.
     - _3. Semantic Infrastructure & Technical SEO/SMO:_ HTML5 landmarks, WCAG 2.2 AA, schema.org, rich social sharing tags.
     - _4. Aesthetic Elevation & Visual CRO:_ Elimination of cognitive friction, conversion-focused visual hierarchy.

5. **Direct Collaboration Gateway (`app-gateway` / `#gateway`):**
   - **Concept:** Low-friction dual gateway: direct calendar link for a 15-minute architectural evaluation with the founders, or exploring the interactive sprint estimator on `/process`.

6. **Decoupled Speed Audit (Strategic Posture):**
   - **Board Determination:** Decoupled from the home page critical path. Zelenia's craft is grounded in synthetic profiling, 75th-percentile real-world field metrics (CrUX), and RUM—not brittle third-party single-run API calls with CORS and rate-limit fragility. Maintained as a secondary diagnostic asset on `/process`.

---

### Page 2: Development Process & Scope Estimator (`/process` — `process.page.ts`)

- **Interactive Sprint Diagnostic (`app-diagnostic`):**
  - Real-time scope estimator across 4 defined sprint tracks:
    1. _Performance Engineering Sprint_ (90% Eng / 10% Design Audit; LCP < 1.8s, Lighthouse 98+).
    2. _Responsive & Accessibility Overhaul_ (80% Eng / 20% UX Review; WCAG 2.2 AA).
    3. _Aesthetic Elevation & Visual CRO Sprint_ (75% Eng / 25% Art Direction & UX).
    4. _End-to-End Digital Rebuild_ (80% Eng / 20% Art Direction & UX; full-stack frontend launch).
- **Commercial Transparency Standards:**
  - **100% Repository Custody:** Direct commits to client Git organization; full ownership of code and tokens.
  - **$0 Infrastructure Markup:** Hosting and APIs billed directly to client at cost.
  - **50/50 Milestone Cadence:** 50% deposit to secure sprint slot; 50% on verified staging sign-off.
  - **30-Day Technical Warranty:** Immediate post-launch bug remediation and handoff sessions.
- **Process FAQs (`app-page-faq`):** Scheduling, Git delivery, secret handling, mid-sprint scope governance.

---

### Page 3: Team & Credentials (`/team` — `team.page.ts`)

- **Founder Dossiers:**
  - **Alejandro Cuba Ruiz (Principal Frontend Architect & GDE):** Fortune 100 Principal Engineer, 20+ years enterprise architecture and runtime performance.
  - **Yolanda Santa Cruz (Lead Product Designer):** 10+ years leading product design & UX (Seed to Series E unicorns, Fortune 500); art direction and cognitive friction reduction.
- **Operational Principles:**
  - Direct browser-based execution (co-authoring code and styles directly in the live DOM and staging environment).
  - Asynchronous cadence (Slack, Loom walkthroughs, GitHub PRs).
  - Hard limit of two concurrent client sprints.

---

### Page 4: Contact & Intake (`/contact` — `contact.page.ts`)

- **Intake Channels:**
  1. _Sprint Scoping Form:_ Structured URL, tech stack, primary bottleneck, target timeline.
  2. _15-Minute Strategy Call:_ Direct architectural evaluation with founders via calendar.
  3. _Direct Channel:_ Founder email for rapid inquiries.
- **Operational Commitments:** 1-business-day response SLA, standard mutual NDAs executed upon request, zero sales pressure.

---

## 6. Accessibility & Quality Checklist

- **Accessibility (A11y):** WCAG 2.2 AA compliance across all components. Enforce native `<button>` and `<a>` semantics, skip-links, `:focus-visible` styling (`outline: 2px solid var(--blue); outline-offset: 2px;`), and programmatic ARIA states.
- **Performance (CWV):** Target CrUX 75th-percentile field thresholds: LCP < 1.0s, INP < 50ms, CLS 0.00. Use modern font loading with `&display=swap` and zero layout shift.
- **SEO & Social (SMO):** Exactly one `<h1>` per page. OpenGraph and Twitter card metadata configured via AnalogJS `RouteMeta`. Automated `sitemap.xml` generated at build time.
- **Static Delivery:** Flat static prerender output (`dist/analog/public/`) with zero server runtime overhead.
