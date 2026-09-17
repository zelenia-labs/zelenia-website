# Zelenia — Strategy & Technical Specification

> **Status:** Active Technical & Structural Specification  
> **Rule:** Single source of truth for site architecture, page allocation, and technical standards. No duplicate sections.

---

## Page Specifications & Technical Allocation

### 1 Home (`/` - `index.page.ts`)

- **Primary Function:** High-impact studio positioning, core engagement pathways, senior density advantage, and comprehensive capabilities summary. Delivered with extreme aesthetic craft and concise, high-signal narrative flow that guides visitors effortlessly into `/process` and `/contact`.
- **Aesthetic Direction (Internal Blueprint):**
  - High-prestige, bespoke, and meticulous execution ("gourmet" quality) achieved via spatial breathing room, disciplined architectural surfaces, and refined typography (Newsreader editorial serif accents + Inter + Roboto Mono).
  - *Strict Anti-Slop Directive:* Zero use of the forbidden words "boutique" or "atelier" anywhere in customer-facing UI or copy.
- **Sections Breakdown:**
  1. **Editorial Studio Hero (`app-hero` / `#hero`):**
     - *Single Objective:* Studio positioning, core value proposition, and immediate authority.
     - *Value Proposition:* Direct senior partnership pairing a Fortune 100 Principal Engineer & GDE with an industry-tested Lead Product Designer.
     - *Primary CTA:* Direct route to `/process` (Scope & Timeline) and `/contact` (Start Conversation).
  2. **Diagnostic Speed Audit (Strategic Posture: Optional / Secondary Instrument):**
     - *Board Determination:* Decoupled from the home page critical path. Zelenia's performance engineering is grounded in synthetic profiling, 75th-percentile real-world field metrics (CrUX), and Real User Monitoring (RUM)—not third-party rate-limited single-run API calls.
     - *Status:* Maintained as an optional, secondary diagnostic demonstration or dedicated asset on `/process`, avoiding third-party API fragility, CORS dependencies, and misleading lab-only scores on the primary landing surface.
  3. **Core Engagement Tracks (`app-engagement-tracks` / `#tracks` — formerly *Intent Navigator*):**
     - *Reframing:* Replaces the internal/robotic label "Intent Navigator" with an executive, problem-first decision framework.
     - *Problem-to-Sprint Pathways:*
       - _Sub-Second Speed & Web Vitals (CrUX / RUM)_ → `/process?focus=vitals`
       - _Adaptive Multi-Surface & Viewport Architecture_ → `/process?focus=responsive`
       - _Semantic Foundation, A11y & Technical SEO/SMO_ → `/process?focus=technical-seo`
       - _Aesthetic Elevation & Visual CRO_ → `/process?focus=visual-elevation`
       - _End-to-End Modernization & Agency Replacement_ → `/contact`
  4. **The Advantage & Senior Density (`app-advantage` / `#advantage`):**
     - *Executive Narrative (Anti-AI Slop):* Replaces verbose, generic pros/cons bullet points with a sharp, cohesive comparative narrative tailored to growth marketers and engineering leaders:
       - *The Agency Overhead Trap:* Traditional agencies pitch senior partners, then silently delegate production to junior subcontractors. Over 40% of billable hours fund account managers, status calls, and handoff friction between disconnected design and engineering silos, creating translation decay and brittle code.
       - *The Zelenia Senior Density Model:* Zero account managers, zero junior delegation, and zero handoff decay. Both founders co-author design tokens and production TypeScript directly in live browser space. Capped at a strict limit of two concurrent client sprints to ensure uncompromised focus, shipping in 2–4 weeks what agencies delay for quarters.
  5. **Capabilities Summary (`app-capabilities-summary` / `#capabilities`):**
     - Cohesive narrative articulating Zelenia's 4 core engineering and design pillars:
       - _1. Web Vitals & Runtime Performance:_ Sub-second LCP (< 1.0s), zero layout shift (CLS 0.00), and sub-50ms interaction response (INP). Engineered and validated via synthetic diagnostics, 75th-percentile field calibration (CrUX), and Real User Monitoring (RUM).
       - _2. Adaptive Multi-Surface Architecture:_ Fluid responsive layouts engineered for seamless fidelity across mobile, tablet, desktop, and large displays, eliminating breakpoint glitches and touch latency.
       - _3. Semantic Infrastructure, A11y, Technical SEO & SMO:_ Clean HTML5 DOM landmarks, WCAG 2.2 AA accessibility compliance, schema.org structured data, and rich OpenGraph/Twitter social media optimization (SMO) for search engines and social platforms.
       - _4. Aesthetic Elevation & Visual CRO:_ Elimination of cognitive friction, conversion-focused visual hierarchy, editorial typographic balance, and sub-50ms visual responsiveness that drives qualified business conversions.
  6. **Direct Collaboration Gateway (`app-gateway` / `#gateway`):**
     - Low-friction closing section providing dual direct gateways: direct calendar intake for a 15-minute architectural review with the founders, or exploring the interactive sprint scope estimator on `/process`.

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
