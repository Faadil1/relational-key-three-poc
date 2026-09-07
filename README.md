# RELATIONAL KEY — Three.js Signature POC

**An interaction system where the relationship between two objects is the product.**

[Stable deployment](https://relational-key-collectionrelational.vercel.app/) · [Canonical state](./RELATIONAL_KEY_CURRENT_STATE.md) · [Handover](./RELATIONAL_KEY_HANDOVER.md)

> **THE RELATIONAL PAIR REMAINS THE PRODUCT.**  
> `PAIR MEMBER → RELATION → OTHER MEMBER RESPONSE`

RELATIONAL KEY is a collection-scale interaction prototype built around a simple constraint: an interaction should reveal or deepen a relationship between two things rather than decorate either object in isolation. The project applies that principle across **24 validated interaction families spanning six continents**, with Three.js-based mechanics, shared runtime rules, regression gates, accessibility checks, and design assurance.

## Portfolio snapshot

| | |
| --- | --- |
| **Problem** | Interactive collections often become a set of unrelated visual effects. The product needed a rule strong enough to keep 24 different experiences coherent. |
| **Mechanism** | Every family is governed by the same causal model: one member changes → the relationship is expressed → the paired member responds. |
| **Proof** | **24/24** relational-integrity validation; **STRONG 24 / ADEQUATE 0 / EXPERIENCE DEBT 0** at the latest canonical closeout. |
| **Quality gates** | Desktop/mobile runtime checks, reduced motion, keyboard focus visibility, interruption/repeat behavior, touch paths, and bounded TRACE design assurance. |
| **Stack / practice** | Three.js · interaction design · product invariants · regression testing · accessibility · Vercel · evidence-driven design assurance. |

## Why this project matters

The hard part is not creating one memorable 3D interaction. It is preserving a **product-level causal rule** while a collection expands across many cultural objects, mechanics, layouts, and input modes.

RELATIONAL KEY therefore treats product coherence as something that can be tested. New visual ambition is allowed only when it deepens the relation instead of replacing it.

Frozen product laws:

- **Expansion must deepen the relation, not replace it.**
- **Technology serves the relational mechanism.**
- **The memorable moment must belong to the pair.**
- Family-specific refinement must not mutate the shared runtime contract.

## What this demonstrates

- translating an abstract product idea into an enforceable interaction invariant;
- scaling one product law across a 24-family collection without flattening the individual experiences;
- using Three.js and browser interaction as product mechanisms rather than decoration;
- combining human evaluation with deterministic regression evidence;
- treating mobile behavior, reduced motion, keyboard navigation, and repeat/interruption paths as release criteria;
- maintaining canonical state, handover, gates, and evidence as the product evolves.

## Current canonical status

Canonical state date: **2026-09-04**.

### Global refinement / R5

**PASS / CLOSED**

```text
VALIDATED 24
USER relational integrity 24/24 PASS
STRONG 24 / ADEQUATE 0 / EXPERIENCE DEBT 0
```

All 24 family promotions are complete and shared-runtime integrity is preserved.

### TRACE Gate 6.5 technical closeout

The bounded Gate 6.5 rework was merged through PR #35. Exact-target runtime evidence passed on the candidate before merge, including:

- 24/24 registered routes returning HTTP 200;
- no horizontal overflow on root desktop/mobile;
- eight representative terminal paths captured;
- interruption and repeat behavior exercised;
- reduced-motion evidence on all eight representatives;
- real keyboard Tab / focus-visible evidence on all eight;
- mobile/touch path exercised.

At the canonical state recorded on 2026-09-04, the current `main` product state was technically ready but the new production deployment was rate-limited by Vercel. The stable deployment linked above therefore represented the prior production alias until exact-main deployment verification could be completed.

## Product architecture

The primary causal model is deliberately simple:

```text
PAIR MEMBER
    ↓ interaction
RELATION BECOMES LEGIBLE
    ↓ causal response
OTHER MEMBER RESPONDS
```

That model is more important than any specific visual technology. A new mechanic passes only when the user can perceive the relation—not merely the animation.

## Evidence and continuity

- [`RELATIONAL_KEY_CURRENT_STATE.md`](./RELATIONAL_KEY_CURRENT_STATE.md) — current canonical source of truth
- [`RELATIONAL_KEY_HANDOVER.md`](./RELATIONAL_KEY_HANDOVER.md) — durable continuation point
- PR #22 — production integration
- PR #35 — bounded TRACE Gate 6.5 rework
- PR #21 — historical refinement draft; not the current production authority

## Claim boundary

This repository documents an interaction/product research system and its validation process. “PASS” refers to the defined project gates and captured evidence; it is not a claim of external certification or universal usability validation.
