# RELATIONAL KEY — G4 PASS WITH POLISH INVENTORY

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Phase: Global Refinement — G4

## Governing rule

# `POLISH MUST INCREASE LEGIBILITY WITHOUT REWRITING THE RELATIONSHIP.`

A historical `PASS WITH POLISH` label is not by itself authorization to invent a new treatment. A G4 patch requires either:
1. an explicitly documented non-blocking debt from a prior user audit; or
2. a newly reproduced issue against the preserved golden family reference.

Family golden references must remain recoverable while a polish candidate is tested.

## Tier A — explicit, actionable polish debt

### 1. Peru / Khipu — Knotted Register
Historical verdict: `PASS WITH POLISH` — PR #11.

Documented debt:
- increase hierarchy/readability of the central knot slightly;
- make tension change more immediately perceptible.

Constraint:
- do not turn the knot into a decorative hero;
- preserve `CORD → APPROACH → TENSION → KNOT → REGISTER → READ → CONTINUE`;
- OTHER RECORD must retain a visible tension/knot-position residual while both records remain valid.

Priority: **G4.1 — FIRST PATCH CANDIDATE**.
Reason: the debt is explicit, relational, visually testable and high-leverage.

### 2. Japan / Kento — Print Register
Ground-truth audit: `COLLECTION_C1_KENTO_USER_VISUAL_AUDIT_PASS.md`.
Historical verdict: `VISUAL PASS WITH POLISH / PROMOTE`.

Documented debt:
- increase hierarchy of `kagi` / `hikitsuki` slightly at collection-view scale;
- make colour-layer displacement on OTHER BLOCK easier to read from a distant desktop view;
- keep the center register subordinate to the two cards.

Constraint:
- matching must still read as print registration, not card equality;
- mismatch must remain printing misregistration, not generic UI failure.

Priority: **G4.2** after Khipu.

### 3. Bolivia / Siku — Interlock Register
Historical verdict: `PASS / PROMOTE` — PR #16, with explicit non-blocking polish deferred to Global Refinement.

Documented debt:
- central interlock field relatively small at desktop capture scale;
- bottom microcopy relatively small at desktop capture scale.

Constraint:
- preserve source ownership IRA / ARKA;
- center must remain temporal interlock, not waveform/resonance;
- preserve OTHER INTERLOCK silent positions and no-complete-route semantics.

Priority: **G4.3**.

## Tier B — historical PASS WITH POLISH, but debt must be reconstructed before mutation

### 4. Fès / Zellige — Tessellated Register
Historical verdict: `PASS WITH POLISH` — PR #10.
The PR records that remaining micro-polish was deferred, but does not define a sufficiently specific residual debt for a new patch.

Before mutation:
- inspect the consolidated snapshot against the promoted V13E.3.1 edge-material logic;
- reproduce any current legibility issue;
- only then define a narrow patch.

Non-negotiable:
`THE EDGE MATERIAL RESOLVES THE RELATIONSHIP.`
The center must remain subordinate to edge-originating cut-tile fit.

Status: **RE-AUDIT FIRST / NO PATCH YET**.

### 5. Bali / Ombak — Beat Register
Historical verdict: `PASS WITH POLISH` — PR #13.
The PR verifies matching visual+audio semantics and defers micro-polish without a precise patch target.

Before mutation:
- reproduce any remaining visual/audio legibility debt on the consolidated candidate;
- preserve controlled difference as the valid relation.

Non-negotiable:
`CONTROLLED DIFFERENCE CAN BE THE RELATIONSHIP.`
Do not normalize the pair toward equality or zero residual.

Status: **RE-AUDIT FIRST / NO PATCH YET**.

### 6. Marshall Islands / Swell Register
Historical verdict: `PASS WITH POLISH` — PR #14.
The PR defers micro-polish without a precise patch target.

Before mutation:
- re-audit whether the orientation point and swell × atoll interaction need additional hierarchy at collection scale;
- patch only if the issue is reproduced.

Non-negotiable:
- Matching remains swell × atoll interaction producing stable orientation;
- Other Swell preserves a different visible interaction point;
- neither record becomes invalid.

Status: **RE-AUDIT FIRST / NO PATCH YET**.

## Tier C — no current evidence requiring a G4 patch

Do not patch merely for visual uniformity:
- United Kingdom / Stereoscopy — PASS / PROMOTE after depth-emergence correction;
- Aotearoa / Hika Ahi — PASS / PROMOTE, explicitly no visual/code patch required;
- France / Boulle — PASS / PROMOTE, no blocking patch required;
- six restored shared-runtime families — City, Service, Signal, Frida, Food, Textile — no new G4 debt has been reproduced in the current consolidated product.

If a later G5/G6 regression reveals a concrete issue, it may be reopened with evidence.

## G4 execution order

1. **G4.1 Khipu** — explicit relation-legibility debt.
2. **G4.2 Kento** — explicit registration/mismatch legibility debt.
3. **G4.3 Siku** — explicit center/microcopy legibility debt.
4. **G4.4 Re-audit Zellige / Ombak / Swell** — patch only reproduced issues.

## Candidate architecture rule

Before modifying an autonomous family:
- retain its existing `snapshot.html` as the golden regression source;
- create a separate polish candidate source rather than overwriting the golden evidence immediately;
- point the public wrapper to the candidate only for a dedicated Preview gate;
- compare behavior against the golden snapshot;
- promote the candidate only after user visual regression passes.

# Immediate next output

# **G4.1 — KHIPU POLISH CANDIDATE DESIGN + IMPLEMENTATION**

First inspect `families/khipu-peru/index.html` and `families/khipu-peru/snapshot.html`, then choose the smallest reversible changes that strengthen central knot hierarchy and tension perceptibility without changing timing, truthfulness, mismatch semantics or pair architecture.
