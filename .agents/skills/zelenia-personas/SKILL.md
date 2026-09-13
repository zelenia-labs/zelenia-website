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

A permanent repository of **3 hyper-focused, orthogonal Buyer Personas** representing the primary decision-makers who hire Zelenia (Alejandro Cuba, Fortune 100 Principal Engineer & GDE + Yolanda Santa Cruz, Lead Product Designer & Visual Artist).

## The Orthogonal 3-Persona Triad

To eliminate cognitive dissonance, prevent persona collision, and avoid generic or diluted evaluations when summoning the AI Advisory Board or executing agentic UX reviews, Zelenia's audience is strictly focused on three non-overlapping archetypes:

1. **`creative-practitioner.md`**: Mateo Ramos / Sofia Valdés — Established Visual Artist, Fine Art Sculptor, Musician, or Cultural Creator (word of mouth / direct referral).
2. **`startup-cto.md`**: Alex Mercer / Gregory Vance — Startup CTO, Technical Co-Founder (Seed to Series B), or Senior Engineering Advisor.
3. **`growth-marketing-leader.md`**: Julian Thorne — VP of Marketing & Growth / Brand Director (High-growth company / scale-up).

---

## Token Efficiency & Anti-Collision Protocol

- **Zero Blending:** NEVER average or blend the 3 personas into a generic, homogeneous "user". Each persona evaluates the digital experience through an orthogonal, distinct lens.
- **Selective Summoning:** When evaluating a specific feature, section, or prompt, summon **only** the target persona relevant to that specific job:
  - Summon `creative-practitioner.md` for visual curation, media fidelity, typography elegance, and absence of commercial clutter.
  - Summon `startup-cto.md` for architectural depth, signals/reactivity, code delivery hygiene, and technical SLAs.
  - Summon `growth-marketing-leader.md` for conversion rate optimization, Core Web Vitals speed guarantees, and executive value propositions.
- **Sequential Triad Audit:** For full-site reviews, interrogate each persona sequentially, never simultaneously in a single prompt.

---

## How to Interrogate Assets Against Personas

Whenever an engineer, designer, or prompt author writes copy, crafts an interface, or proposes a sprint deliverable, subject it to the **3 Reality Tests**:

1. **The Bullshit Detector (Anti-Fluff Test):**
   - *Question:* Does this sound like generic agency buzzwords ("holistic digital transformation", "unlocking potential"), or does it speak to the executive's specific, quantifiable operational pain?
2. **The Status-Quo Friction Test:**
   - *Question:* Why would this persona invest $15k–$75k with Zelenia this month rather than delegating to an internal team, hiring a junior freelancer, or sticking with their existing workaround?
3. **The Proof-to-Promise Ratio:**
   - *Question:* For every bold claim made on the page, is there immediate, verifiable evidence (concrete metric, GDE/Fortune 100 credential, live diagnostic, or direct GitHub commit model)?

---

## Persona Catalog (`personas/`)

| Persona Dossier | Primary Role & Archetype | Core Buying Motivation | Blocker / Red Flag on Landing Page |
|:---|:---|:---|:---|
| [`creative-practitioner.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/creative-practitioner.md) | **Mateo Ramos / Sofia Valdés** — Creative & Cultural Practitioner | Bespoke digital home & living archive, lightning-fast high-res media, curatorial dignity | Cheap e-commerce stores, "Buy Now" buttons, noisy marketing popups, broken templates |
| [`startup-cto.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/startup-cto.md) | **Alex Mercer / Gregory Vance** — Startup CTO & Technical Advisor | Senior direct execution on GitHub, modern reactive architecture, zero junior handoff risk | Agencies hiding behind junior subcontractors, unproven buzzwords, slow delivery |
| [`growth-marketing-leader.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-personas/personas/growth-marketing-leader.md) | **Julian Thorne** — VP of Marketing & Growth | Sub-second LCP, Core Web Vitals repair, brand memorability, conversion pipeline | 3-second page loads, generic SaaS templates, bloated scripts, ambiguous CTAs |
