# Design System Specification

> [!IMPORTANT]
> This document inherits and extends the global design and accessibility standards defined in the central [Core Design Specification (DESIGN-SYSTEM.core.md)](DESIGN-SYSTEM.core.md).
> It serves as the **single source of truth** for all visual tokens, custom components, and animation settings specific to this UI. **Strict adherence is mandatory.**

# Design System Specification

> [!IMPORTANT]
> This document inherits and extends the global design and accessibility standards defined in the central [Core Design Specification (DESIGN-SYSTEM.core.md)](DESIGN-SYSTEM.core.md).
> It serves as the **single source of truth** for all visual tokens, custom components, and animation settings specific to this UI. **Strict adherence is mandatory.**

## 1. Design Philosophy: Warm, Fluid & Friendly Studio Experience

- **Art Direction Principle**: A human-forward, approachable boutique studio aesthetic. Balance senior technical rigor with warmth, genuine collaboration, and playful fluidity.
- **Fluid & Rounded Geometry**: Soft, friendly rounded surfaces (`--radius: 22px`) and smooth pill badges (`--radius-pill: 9999px`) replace sharp, cold rectangular boxes.
- **Intimate Reading Measure**: Content width is reduced by 15% (`--shell: min(1003px, calc(100vw - 44px))`), preventing horizontal stretching and giving copy cozy, editorial focus.
- **Vibrant Royal Blue CTA Branding**: Primary calls to action and interactive elements use electric royal blue (`--blue: #0055FF`) with crisp white typography, supported by subtle cyan (`#00E5FF`) spatial accents.
- **Slower Ambient Celestial Canvas**: Background particles drift at a meditative, tranquil pace with flank-dominant physics and a central reading sanctuary.

## 2. Spatial Tokens & Design System Core (DevTools Precision)

```css
:root {
  --bg: #080a0e;
  --surface: #0f131a;
  --surface-2: #161b24;
  --border: rgba(255, 255, 255, 0.07);
  --border-hover: rgba(43, 127, 255, 0.4);
  --blue: #0055ff;
  --cyan: #00e5ff;
  --text: #ffffff;
  --text-2: #94a3b8;
  --muted: #64748b;
  --radius: 22px;
  --shell: min(1003px, calc(100vw - 44px)); /* 15% reduced from 1180px base */
}
```

## 3. Typography Hierarchy

- **Global Body**: `font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.55; color: var(--text);`
- **Section Headings (`.section-heading h2`, `.section-title`)**: `margin: 12px 0 14px; font-size: clamp(42px, 5vw, 64px); line-height: 1.02; letter-spacing: -0.045em; font-weight: 620;`
- **Profile / Partner Headings (`.profile-content h3`)**: `margin: 14px 0 12px; font-size: 25px; line-height: 1.08; letter-spacing: -0.03em;`
- **Profile Subtext & Credentials (`.profile-content p`)**: `margin: 0; color: var(--text-2); font-size: 14px;`

## 4. Flow & Component Architecture

1. **Hero**: Warm studio introduction with live site performance analyzer and `#0055FF` CTA.
2. **Who We Are (`#leadership`)**: Positioned directly after Hero. Visitors immediately meet Alejandro and Yolanda with warm portraits and conversational credentials.
3. **The Model (`#advantage`)**: Asymmetrical editorial split with 3D synergy sculpture and 3 direct senior execution pillars.
4. **Capabilities (`#capabilities`)**: 4-pillar overview linking to the deep-dive dossier.
5. **Project Diagnostic (`#diagnostic`)**: Scope and turnaround calculator with interactive telemetry.
6. **Contact (`#contact`)**: Friendly, welcoming conversation starter without sales rep barriers.
