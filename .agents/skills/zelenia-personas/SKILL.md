---
name: zelenia-personas
description: Research-backed Buyer Personas and Ideal Customer Profiles (ICPs) for Zelenia S-Corp. Use to ground copy, value propositions, UI aesthetics, and technical guarantees in real executive purchasing psychology.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Write
  - Edit
  - AskUserQuestion
triggers:
  - buyer persona
  - buyer personas
  - user persona
  - user personas
  - icp
  - icp review
  - target audience
  - target audience audit
  - test against personas
  - evaluate with personas
---

# Zelenia Buyer Personas & Ideal Customer Profiles (ICPs)

A permanent repository of **hyper-realistic, research-grounded Buyer Personas** representing the exact corporate, entrepreneurial, and institutional decision-makers who hire Zelenia as a high-end boutique S-Corp (Alejandro Cuba, Fortune 100 Principal Engineer & GDE + Yolanda Santa Cruz, Lead Product Designer & Visual Artist).

## Operational Architecture

Every persona lives in `personas/` as an independent, fully realized dossier:

### Tier 1: Core Corporate & Enterprise Decision Makers
- **`enterprise-vp-engineering.md`**: Marcus Vance — VP of Engineering (Scale-Up / Post-IPO Tech Enterprise, $100M+ ARR).
- **`venture-backed-founder-cpo.md`**: Elena Rostova — Co-Founder & Chief Product Officer (Series A/B Startup, High-Stakes Scale-Up).
- **`growth-marketing-executive.md`**: Julian Thorne — VP of Growth & Marketing (High-ACV B2B SaaS).
- **`pe-operating-partner.md`**: Claire Sterling — Operating Partner & Technical Diligence Lead (Private Equity / Growth Capital).

### Tier 2: High-Value Practice Owners & Strategic Champions
- **`high-value-firm-owner.md`**: Arthur Pendelton — Managing Partner / Founder (Prestige Corporate Law, Surgical Clinic, Wealth Advisory, $5M–$35M Revenue).
- **`prestige-artist-creator.md`**: Mateo / Elena Ramos — Established Fine Artist & Master Sculptor / Prestige Studio Practitioner ($5k–$85k+ Artwork Price Points).
- **`bootstrapped-founder.md`**: Soren Lindqvist — Bootstrapped Founder & Solo Operator ($1M–$10M ARR Vertical SaaS).
- **`fractional-cto-advisor.md`**: Gregory Sterling — Fractional CTO & Advisory Board Member (Venture Partner across 6–10 PortCos).
- **`internal-product-champion.md`**: Maya Lin — Staff Product Manager / Tech Lead (Mid-Market Enterprise with Backlogged Internal Devs).

---

## Token Efficiency Directive
- **DO NOT** load all persona files into context simultaneously.
- When evaluating a specific feature, headline, or layout, summon **only** the target persona relevant to that funnel (e.g. `view_file` on `personas/enterprise-vp-engineering.md` for architecture and performance claims; `personas/venture-backed-founder-cpo.md` for product and design systems; `personas/high-value-firm-owner.md` for boutique credibility and white-glove onboarding).
- For holistic positioning audits, iterate sequentially across the dossiers.

---

## How to Interrogate Assets Against Personas

Whenever an engineer, designer, or prompt author writes copy, crafts an interface, or proposes a sprint deliverable, subject it to the **3 Buyer Reality Tests**:

1. **The Bullshit Detector (Anti-Fluff Test):**
   - *Question:* Does this sound like generic agency buzzwords ("holistic digital transformation", "unlocking potential"), or does it speak to the executive's specific, quantifiable operational pain?
2. **The Status-Quo Friction Test:**
   - *Question:* Why would this persona spend $30k–$80k with Zelenia this month rather than delegating to an internal junior team or sticking with their existing workaround?
3. **The Proof-to-Promise Ratio:**
   - *Question:* For every bold claim made on the page, is there immediate, verifiable evidence (concrete metric, GDE/Fortune 100 credential, live diagnostic, or direct GitHub commit model)?

---

## Persona Catalog (`personas/`)

| Persona Dossier | Primary Role & Archetype | Core Buying Motivation | Blocker / Red Flag on Landing Page |
|:---|:---|:---|:---|
| [`enterprise-vp-engineering.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/enterprise-vp-engineering.md) | **Marcus Vance** — VP of Engineering | CWV compliance, tech debt elimination, senior architectural leadership | Generic templates, junior agency vibes, lack of technical depth |
| [`venture-backed-founder-cpo.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/venture-backed-founder-cpo.md) | **Elena Rostova** — Co-Founder & CPO | Bespoke visual prestige, enterprise closing, rapid 4-6 week turnaround | Cookie-cutter YC look, slow timelines, bloated agency retainers |
| [`growth-marketing-executive.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/growth-marketing-executive.md) | **Julian Thorne** — VP of Growth | Sub-second LCP, killing bounce rates, standout brand identity | Slow page loads (>1s), generic purple SaaS cards, confusing CTAs |
| [`pe-operating-partner.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/pe-operating-partner.md) | **Claire Sterling** — PE Operating Partner | Portfolio modernization, clean IP transfer, rapid technical turnaround | Vendor lock-in, proprietary dependencies, lack of enterprise governance |
| [`high-value-firm-owner.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/high-value-firm-owner.md) | **Arthur Pendelton** — High-Value Firm Owner | Digital flagship prestige, high-ticket inbound client inquiries | Clunky WordPress templates, incomprehensible tech jargon |
| [`bootstrapped-founder.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/bootstrapped-founder.md) | **Soren Lindqvist** — Bootstrapped Founder | Capital efficiency, extreme quality without full-time hiring/equity | Bloated agency overhead, account managers, non-technical pitches |
| [`fractional-cto-advisor.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/fractional-cto-advisor.md) | **Gregory Sterling** — Fractional CTO / Advisor | Reputational safety, zero risk of junior handoffs, top-tier PRs | Unproven teams, agencies hiding behind junior subcontractor pools |
| [`internal-product-champion.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/internal-product-champion.md) | **Maya Lin** — Staff PM / Tech Lead | Bypassing 14-month internal backlog with elite, respected code | Outside agencies that internal engineers reject and refuse to merge |
