# RELATIONAL KEY — GLOBAL REFINEMENT G0 — BASELINE FREEZE

Date: 2026-08-25
Branch: `collection/global-refinement-1`
Pre-refinement regression anchor: `79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`
Source merge: PR #20 — RELATIONAL KEY — Collection Consolidation Gate

## Gate status

# `GLOBAL REFINEMENT = OPEN`

The consolidated collection baseline is now frozen before any refinement mutation.

Validated baseline facts:
- 15 / 15 families have independent visual or visual+audio gates;
- 15 / 15 consolidated direct routes were verified live;
- collection root visual gate passed;
- continent filters and search passed;
- collection usability passed with polish;
- family-native snapshots and historic per-family Vercel deployments remain regression references.

## Product invariant

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Refinement may improve framing, navigation, hierarchy, legibility and cohesion. It must not flatten family-native mechanisms or turn the center/gap into the primary product.

## Staged refinement plan

### G1 — Collection Navigation Frame
Goal: make collection ↔ family navigation explicit without rewriting family-native interactions.

Primary target:
- add a lightweight `← Back to Atlas` collection-level affordance around every family route;
- preserve each family snapshot byte-level mechanism beneath the wrapper;
- ensure no route or launcher regression.

### G2 — Shell Legibility
Goal: improve tiny mono/chip/card metadata and responsive readability while preserving the editorial hierarchy.

### G3 — Family Individuality at Atlas Level
Goal: increase distinguishability of family cards without generic cultural skinning, flags, stereotyped motifs or decorative appropriation.

### G4 — PASS WITH POLISH Backlog
Goal: address documented family-level polish items one family/group at a time, always regression-checking against each golden deployment.

### G5 — Collection Cohesion
Goal: improve transitions, return behavior and shared framing so the system feels like one product while family-native interactions remain distinct.

### G6 — Final Collection Validation
Required before final promotion:
- root visual/usability re-audit;
- 15/15 route regression re-check if routing/wrappers changed;
- targeted family regression checks for every family whose presentation changed;
- final desktop + responsive pass;
- production deployment decision.

## Immediate next output

# **G1 — COLLECTION NAVIGATION FRAME**

Do not begin broad visual restyling before G1 is implemented and route-regression checked.

`BASELINE FROZEN ≠ REFINEMENT IMPLEMENTED ≠ FINAL COLLECTION PASS`.
