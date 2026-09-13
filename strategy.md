# Zelenia — Strategy & Technical Specification

> **Status:** Active Technical & Structural Specification  
> **Rule:** Single source of truth for site architecture, page allocation, and technical standards. No duplicate sections.

---

## 1. Page Specifications & Technical Allocation

### 1.1 Home (`/` - `index.page.ts`)
- **Primary Function:** Studio positioning, live URL diagnostic tool, intent routing, and model comparison.
- **Sections:**
  1. **Hero (`app-hero` / `#hero`):**
     - Value proposition: Senior frontend engineering and product design executed directly by the founders.
     - Primary CTA: Route to `/process`.
  2. **Live Site Speed Audit (`app-speed-audit` / `#speed-audit`):**
     - Interactive URL diagnostic powered by the Google PageSpeed Insights API.
     - Telemetry: Live Core Web Vitals (LCP, INP, CLS) and Lighthouse score. Un-gated developer tool.
  3. **Intent Navigator (`app-intent-navigator` / `#intent`):**
     - Problem-based routing matrix:
       - *Web Performance (Core Web Vitals)* → `/process?focus=vitals`
       - *Design Systems & UI Modernization* → `/process?focus=design-system`
       - *End-to-End Rebuilds* → `/process?focus=rebuild`
       - *Agency Replacement* → `/contact`
  4. **The Advantage & Model Comparison (`app-advantage` / `#advantage`):**
     - **Direct Senior Execution vs. Traditional Agency:**
       - **Traditional Agency Drawbacks (Cons):**
         - *Junior Delegation:* Senior partners pitch; interns or junior contractors deliver.
         - *Administrative Overhead:* 40%+ of billable fees fund account managers, coordinators, and status meetings.
         - *Translation Decay:* Handoffs between separate design and engineering teams introduce visual, responsive, and accessibility defects.
         - *Code Fragility:* Bloated dependencies and rushed delivery accumulate technical debt from day one.
       - **Zelenia Direct Model (Pros):**
         - *100% Senior Execution:* Every line of TypeScript, CSS, and design token is authored directly by the two founders.
         - *Zero Intermediaries:* Direct engineering and design access without account managers or sales representatives.
         - *Capped Capacity:* Maximum of **two concurrent client sprints** to guarantee focused bandwidth and zero backlog drag.
         - *Real-Time Browser Synergy:* UI and code are developed simultaneously in live browser space, eliminating static mock translation loss.
  5. **Capabilities Summary (`app-capabilities-summary` / `#capabilities`):**
     - Summary of the 4 core pillars: Web Vitals, multi-surface responsiveness, semantic a11y/SEO, and modular design systems.
  6. **Direct Gateway:**
     - Final routing to `/contact` and `/process`.

### 1.2 Development Process & Scope Estimator (`/process` - `process.page.ts`)
- **Primary Function:** Sprint model breakdown, interactive scope selector, technical benchmarks, runtime delivery standards, and commercial terms.
- **Sprint Categories & Deliverables (`app-diagnostic` / `#diagnostic-tool`):**
  1. **Performance Engineering Sprint (80% Eng / 20% Design):**
     - *Technical Benchmarks:* LCP < 1.8s, INP < 200ms, CLS 0.00, Lighthouse 98+.
     - *Scope:* Bundle splitting, main-thread unblocking, LCP resource prioritization, CLS layout stabilization, third-party script deferral/lazy hydration.
  2. **Responsive & Accessibility Overhaul (60% Eng / 40% Design):**
     - *Scope:* WCAG 2.2 AA remediation, ARIA 1.3 implementation, keyboard-only navigation flows, fluid responsive breakpoints.
  3. **Design System & Visual Modernization (40% Eng / 60% Design):**
     - *Scope:* Tokenized Figma-to-code architecture, accessible component library, dark mode tokens, GPU-accelerated micro-interactions.
  4. **End-to-End Digital Rebuild (50% Eng / 50% Design):**
     - *Scope:* Full-stack frontend architecture overhaul, modern web primitives, complete production launch.
- **Technical Rigor Standards:**
  - **Runtime Performance:**
    - Main thread task refactoring (< 50ms tasks) for instantaneous user interaction (INP < 200ms).
    - Speculative resource hints, modern responsive images, and font pre-allocation (zero layout shift) for sub-1.8s LCP.
    - CrUX calibration: Optimization targeting 75th-percentile real-world field metrics.
  - **Technical Accessibility & SEO:**
    - Screen reader compatibility verified via native VoiceOver and NVDA.
    - Keyboard navigation: Strict tab indexing, visible focus indicators, modal focus traps (no keyboard traps).
    - Semantic DOM hierarchy: Valid HTML5 landmark structure and schema markup for search indexing.
  - **Scope Governance:** Modular production code ready for internal team adoption; no prolonged committee cycles.
- **Commercial Terms:**
  - **100% Repository Custody:** Direct commits to client Git organization; full ownership of production code, design tokens, and Figma assets.
  - **$0 Infrastructure Markup:** Cloudflare, Vercel, CMS, and third-party APIs billed directly to the client at cost.
  - **50/50 Milestone Cadence:** 50% deposit to secure dedicated sprint slot; 50% on verified staging sign-off and passing audits.
  - **30-Day Technical Warranty:** Immediate post-launch bug resolution, regression repairs, and technical handoff session.
- **Process FAQs (`app-page-faq` / `#process-faq-wrapper`):**
  - Sprint scheduling, expedited booking, Git branch delivery (no production secret sharing), handling mid-sprint scope changes.

### 1.3 Team & Credentials (`/team` - `team.page.ts`)
- **Primary Function:** Detailed founder credentials, operational philosophy, and capacity limits.
- **Founder Profiles:**
  - **Alejandro Cuba Ruiz (Principal Frontend Architect & GDE):**
    - Fortune 100 Principal Software Engineer, 20+ years experience.
    - Focus: Scalable frontend architecture, runtime performance engineering, enterprise web applications.
  - **Yolanda Santa Cruz (Lead Product Designer & Visual Artist):**
    - 10+ years leading product design (Seed to Series E unicorns, Fortune 500).
    - Focus: Systematic UI design, design tokens, high-conversion interaction models, fine-arts composition.
- **Operational Principles:**
  - Direct browser-based execution (co-authoring code and styles in live DOM).
  - Asynchronous & direct sync (Slack, Loom walkthroughs, GitHub PRs).
  - Hard limit of two concurrent client sprints.
- **Team FAQs (`app-page-faq` / `#team-faq-wrapper`):**
  - Direct founder execution verification, communication rhythms, sprint capacity governance.

### 1.4 Contact & Intake (`/contact` - `contact.page.ts`)
- **Primary Function:** Frictionless multi-channel project initiation.
- **Intake Channels (`app-contact`):**
  1. **Sprint Scoping Form:** Structured intake collecting URL, tech stack, primary pain point, and timeline.
  2. **15-Minute Strategy Call:** Direct architectural evaluation with the founders via calendar scheduling.
  3. **Direct Email:** Direct communication channel.
- **Operating Commitments & FAQs (`app-page-faq`):**
  - 1-business-day response SLA.
  - Standard mutual NDAs executed upon request prior to repository access.
  - Free, zero-sales-pressure technical scoping.
