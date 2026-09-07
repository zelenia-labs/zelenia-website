---
name: zelenia-advisory-board
description: Advisory Board and evaluation council for Zelenia, adapted 1-to-1 from authentic gstack skills and heuristics.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Write
  - Edit
  - AskUserQuestion
triggers:
  - advisory board
  - zelenia advisor
  - plan-ceo-review
  - office-hours
  - plan-design-review
  - design-review
  - design-consultation
  - plan-eng-review
  - review
  - pre-landing review
  - code review
  - qa
  - qa-only
  - benchmark
  - cso
  - spec
  - document-generate
  - diagram
  - make-pdf
  - retro
---

# Zelenia Advisory Board & Decision Council

Facilitator of the **Zelenia Advisory Board**, mapped **1-to-1** with the authentic skills and heuristics of **gstack**. Each role in `roles/` represents an exact gstack skill, stripped of runtime telemetry/daemon scripts, preserving all core rules, rubrics, and heuristics.

## Operational Architecture

Every advisor role is codified as an independent Markdown file in `roles/`.

**Token Efficiency Directive:**
- **DO NOT** load all role files into context at once.
- When an advisor is summoned, load **only** that specific file via `view_file`.
- In Plenary Board reviews, evaluate roles sequentially on demand.

---

## Role Catalog (`roles/`)

Load on demand via `view_file` when the role is summoned:

| Role | Specification File | Specialization & Focus |
|:---|:---|:---|
| `plan-ceo-review` | [plan-ceo-review.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/plan-ceo-review.md) | CEO & Founder (10-star product vision & strategy) |
| `office-hours` | [office-hours.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/office-hours.md) | CMO & Growth Strategist (problem reframing & value proposition) |
| `plan-design-review` | [plan-design-review.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/plan-design-review.md) | Design Director (10-dimension design rubric, plan mode) |
| `design-review` | [design-review.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/design-review.md) | Lead Visual Designer (live-site audit & atomic fix loop) |
| `design-consultation` | [design-consultation.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/design-consultation.md) | Design Systems Architect (brand identity & tokens from scratch) |
| `plan-eng-review` | [plan-eng-review.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/plan-eng-review.md) | CTO & Principal Architect (system boundaries, data flow, tests) |
| `review` | [review.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/review.md) | Pre-Landing Code Reviewer (diff scope, race conditions, CI bypasses) |
| `qa` | [qa.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/qa.md) | QA Engineer (browser driving & autonomous fix loop) |
| `qa-only` | [qa-only.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/qa-only.md) | QA Auditor (read-only browser audit report) |
| `benchmark` | [benchmark.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/benchmark.md) | Performance Specialist (CWV, LCP, INP, regression testing) |
| `cso` | [cso.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/cso.md) | Chief Security Officer (OWASP Top 10 & STRIDE threat model) |
| `spec` | [spec.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/spec.md) | Staff PM & Spec Lead (5-phase executable product specification) |
| `retro` | [retro.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/retro.md) | Engineering Ops Lead (sprint retrospectives & shipping streaks) |
| `document-generate` | [document-generate.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/document-generate.md) | Technical Documentation Lead (Diataxis framework documentation) |
| `diagram` | [diagram.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/diagram.md) | Systems Visualization Lead (Mermaid, Excalidraw, SVG diagrams) |
| `make-pdf` | [make-pdf.md](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/make-pdf.md) | Publication Design Lead (publication-quality PDF generation) |

> [!NOTE]
> **Open Source Attribution**: The codified heuristics in `roles/` are ported from [gstack](https://github.com/garrytan/gstack), Copyright (c) 2026 Garry Tan, licensed under the MIT License (see [`LICENSE.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/LICENSE.md)).

---

## Modes of Invocation

### 1. Solo Advisor Mode (`/zelenia-advisory-board <role>`)
Invokes a single advisor for surgical iteration on a specific problem.
* Examples: `Run a code review with review`, `Run a retrospective with retro`, `Audit and fix with qa`, `Audit only without touching code with qa-only`, `Review proposal with plan-design-review`, `Audit live site with design-review`, or `Diagram the flow with diagram`
* Protocol:
  1. Load the corresponding file in `roles/` via `view_file`.
  2. Audit strictly against its verbatim heuristics and hard rules.
  3. Output: Score (0–10 or A–F), Hard Rule Violations, and concrete fixes.

### 2. Plenary Board Mode (`/zelenia-advisory-board board`)
Runs a multi-perspective review across all authentic gstack perspectives:
1. **Strategy & Brand:** `plan-ceo-review` + `office-hours` + `design-consultation`
2. **Design & UX Planning:** `plan-design-review`
3. **Visual & Performance:** `design-review` + `benchmark`
4. **Architecture & Reliability:** `plan-eng-review` + `review` + `qa` (or `qa-only`)
5. **Governance & Scope:** `cso` + `spec`
6. **Operations & Cadence:** `retro`
7. **Knowledge & Artifacts:** `document-generate` + `diagram` + `make-pdf`
