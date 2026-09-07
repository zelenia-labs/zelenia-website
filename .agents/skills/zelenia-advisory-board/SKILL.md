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
  - zelenia advisory board
  - zelenia advisor
  - consejo asesor
  - review as design-review
  - review as plan-ceo-review
  - review as office-hours
  - review as plan-eng-review
  - review as benchmark
  - review as qa
  - review as spec
  - review as cso
---

# Zelenia Advisory Board & Decision Council

Facilitator of the **Zelenia Advisory Board**, mapped **1-to-1** with the authentic skills and heuristics of **gstack**. Every file in `roles/` represents an exact gstack skill, stripped of runtime telemetry/daemon scripts, keeping only the core rules, rubrics, and heuristics for maximum maintainability and zero repository leakage.

## Operational Architecture

Every advisor file is codified as an independent Markdown document inside the `roles/` directory.

**Token Efficiency Directive:**
- **DO NOT** read all files into context at once.
- When an advisor is summoned (e.g. `design-review` or `plan-ceo-review`), load **only** that specific file via `view_file`.
- In a plenary board review (`/zelenia-advisory-board board`), iterate through the advisors sequentially on demand.

---

## Role Catalog (`roles/`)

Load on demand via `view_file` when the role is summoned:
- `design-review`: [`roles/design-review.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/design-review.md) — Lead Product Designer
- `plan-ceo-review`: [`roles/plan-ceo-review.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/plan-ceo-review.md) — CEO & Founder
- `office-hours`: [`roles/office-hours.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/office-hours.md) — CMO & Growth Strategist
- `plan-eng-review`: [`roles/plan-eng-review.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/plan-eng-review.md) — CTO & Principal Architect
- `benchmark`: [`roles/benchmark.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/benchmark.md) — Performance & CWV Specialist
- `qa`: [`roles/qa.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/qa.md) — QA & Resilience Lead
- `spec`: [`roles/spec.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/spec.md) — Staff PM & Spec Lead
- `cso`: [`roles/cso.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/roles/cso.md) — CIO & Chief Security Officer

> [!NOTE]
> **Open Source Attribution**: The codified heuristics in `roles/` are ported from [gstack](https://github.com/garrytan/gstack), Copyright (c) 2026 Garry Tan, licensed under the MIT License (see [`LICENSE.md`](file:///Users/zorphdark/dev/zelenia-website/.agents/skills/zelenia-advisory-board/LICENSE.md)).

---

## Modes of Invocation

### 1. Solo Advisor Mode (`/zelenia-advisory-board <skill-name>`)
Invokes a single advisor for surgical iteration on a specific problem.
* Example: `Revisa la sección Hero con design-review` o `Pásale el filtro de office-hours al copy del hero`
* Protocol:
  1. Load the corresponding file in `roles/`.
  2. Audit strictly against its verbatim heuristics and hard rules.
  3. Output: Score (0-10 or A-F), Hard Rule Violations, and concrete fixes.

### 2. Plenary Board Mode (`/zelenia-advisory-board board`)
Runs a multi-perspective review across all authentic gstack perspectives:
1. **Strategy & Demand:** `plan-ceo-review` + `office-hours`
2. **Visual & Performance:** `design-review` + `benchmark`
3. **Architecture & Reliability:** `plan-eng-review` + `qa`
4. **Governance & Scope:** `cso` + `spec`
