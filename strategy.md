# Zelenia — Strategy & Technical Specification

> **Status:** Active Technical & Structural Specification  
> **Rule:** Single source of truth for site architecture, page allocation, and technical standards. No duplicate sections.

---

## Page Specifications & Technical Allocation

### 1 Home (`/` - `index.page.ts`)

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
       - _Web Performance (Core Web Vitals)_ → `/process?focus=vitals`
       - _Aesthetic Elevation & Visual CRO_ → `/process?focus=visual-elevation`
       - _End-to-End Rebuilds_ → `/process?focus=rebuild`
       - _Agency Replacement_ → `/contact`
  4. **The Advantage & Model Comparison (`app-advantage` / `#advantage`):**
     - **Direct Senior Execution vs. Traditional Agency:**
       - **Traditional Agency Drawbacks (Cons):**
         - _Junior Delegation:_ Senior partners pitch; interns or junior contractors deliver.
         - _Administrative Overhead:_ 40%+ of billable fees fund account managers, coordinators, and status meetings.
         - _Translation Decay:_ Handoffs between separate design and engineering teams introduce visual, responsive, and accessibility defects.
         - _Code Fragility:_ Bloated dependencies and rushed delivery accumulate technical debt from day one.
       - **Zelenia Direct Model (Pros):**
         - _100% Senior Execution:_ Every line of TypeScript, CSS, and styling token is authored directly by the two founders.
         - _Zero Intermediaries:_ Direct engineering and design access without account managers or sales representatives.
         - _Capped Capacity:_ Maximum of **two concurrent client sprints** to guarantee focused bandwidth and zero backlog drag.
         - _Real-Time Browser Synergy:_ UI and code are refined directly in live browser space and staging, eliminating static mock translation loss, Figma drift, and handoff decay.
  5. **Capabilities Summary (`app-capabilities-summary` / `#capabilities`):**
     - Summary of the 4 core pillars: Web Vitals, multi-surface responsiveness, semantic a11y/SEO, and aesthetic elevation / visual CRO.
  6. **Direct Gateway:**
     - Final routing to `/contact` and `/process`.

### 2 Development Process & Scope Estimator (`/process` - `process.page.ts`)

- **Primary Function:** Sprint model breakdown, interactive scope selector, technical benchmarks, runtime delivery standards, and commercial terms.
- **Sprint Categories & Deliverables (`app-diagnostic` / `#diagnostic-tool`):**
  1. **Performance Engineering Sprint (90% Eng / 10% Design Audit):**
     - _Technical Benchmarks:_ LCP < 1.8s, INP < 200ms, CLS 0.00, Lighthouse 98+.
     - _Scope:_ Bundle splitting, main-thread unblocking, LCP resource prioritization, CLS layout stabilization, third-party script deferral/lazy hydration, visual integrity audit during speed optimization.
  2. **Responsive & Accessibility Overhaul (80% Eng / 20% UX Review):**
     - _Scope:_ WCAG 2.2 AA remediation, ARIA 1.3 implementation, keyboard-only navigation flows, fluid responsive breakpoints, UX scan path clarity.
  3. **Aesthetic Elevation & Visual CRO Sprint (75% Eng / 25% Art Direction & UX):**
     - _Technical & UX Benchmarks:_ Conversion-focused visual hierarchy, friction-free cognitive layout, bounce-rate reduction, sub-50ms visual responsiveness.
     - _Scope:_ Visual conversion rate optimization (CRO), user experience refinement, typography & chromatic balance, cognitive friction elimination, live browser styling reviews (zero redundant Figma overhead or drawn-out design cycles).
  4. **End-to-End Digital Rebuild (80% Eng / 20% Art Direction & UX):**
     - _Scope:_ Full-stack frontend architecture overhaul, modern web primitives, clean aesthetic direction, conversion-focused UX layout, complete production launch.
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
  - **100% Repository Custody:** Direct commits to client Git organization; full ownership of production code, styling tokens, and design assets.
  - **$0 Infrastructure Markup:** Cloudflare, Vercel, CMS, and third-party APIs billed directly to the client at cost.
  - **50/50 Milestone Cadence:** 50% deposit to secure dedicated sprint slot; 50% on verified staging sign-off and passing audits.
  - **30-Day Technical Warranty:** Immediate post-launch bug resolution, regression repairs, and technical handoff session.
- **Process FAQs (`app-page-faq` / `#process-faq-wrapper`):**
  - Sprint scheduling, expedited booking, Git branch delivery (no production secret sharing), handling mid-sprint scope changes.

### 3 Team & Credentials (`/team` - `team.page.ts`)

- **Primary Function:** Detailed founder credentials, operational philosophy, and capacity limits.
- **Founder Profiles:**
  - **Alejandro Cuba Ruiz (Principal Frontend Architect & GDE):**
    - Fortune 100 Principal Software Engineer, 20+ years experience.
    - Focus: Scalable frontend architecture, runtime performance engineering, enterprise web applications.
  - **Yolanda Santa Cruz (Lead Product Designer):**
    - 10+ years leading product design & UX (Seed to Series E unicorns, Fortune 500).
    - Focus: Art direction, user experience (UX), visual conversion psychology for high-performance digital products, aesthetic elevation, and cognitive friction reduction.
- **Operational Principles:**
  - Direct browser-based execution (co-authoring code and refining styles directly in the live DOM and staging environment, eliminating static mock translation loss and Figma maintenance overhead).
  - Asynchronous & direct sync (Slack, Loom walkthroughs, GitHub PRs).
  - Hard limit of two concurrent client sprints.
- **Team FAQs (`app-page-faq` / `#team-faq-wrapper`):**
  - Direct founder execution verification, communication rhythms, sprint capacity governance.

### 4 Contact & Intake (`/contact` - `contact.page.ts`)

- **Primary Function:** Frictionless multi-channel project initiation.
- **Intake Channels (`app-contact`):**
  1. **Sprint Scoping Form:** Structured intake collecting URL, tech stack, primary pain point, and timeline.
  2. **15-Minute Strategy Call:** Direct architectural evaluation with the founders via calendar scheduling.
  3. **Direct Email:** Direct communication channel.
- **Operating Commitments & FAQs (`app-page-faq`):**
  - 1-business-day response SLA.
  - Standard mutual NDAs executed upon request prior to repository access.
  - Free, zero-sales-pressure technical scoping.
