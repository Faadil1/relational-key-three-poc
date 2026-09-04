# RELATIONAL KEY — CONTINENTAL BALANCE B2.3H

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Spec: `CONTINENTAL_BALANCE_B2_3G_SOUTH_AMERICA_VALPARAISO_FUNicular_SPEC.md`

# SOUTH AMERICA FAMILY ROUND 1 — VALPARAÍSO FUNICULAR BUILD CANDIDATE

Status:
# **SOURCE PASS / LIVE + USER VISUAL GATE PENDING**

Validated South America remains:
# `2 / 4`

No atlas, registry, public-route or validated-count mutation occurs here.

# Candidate

Path:
`families/funicular-valparaiso/candidate.html`

Implementation commit:
# `7aff21b59ff88fcbe3e526958cf9fdf67c0d3750`

Candidate blob:
# `1e71497d7f9f5411eca2347b36bc0402db8b905b`

Implementation compare:
- base `f720b2c5ca4ece347984a5082a1cb6112737ea64`
- head `7aff21b59ff88fcbe3e526958cf9fdf67c0d3750`
- only `families/funicular-valparaiso/candidate.html` added;
- 82 additions / 0 deletions.

# Law implemented

# **ON A SHARED FUNICULAR, ONE CAR'S ASCENT IS COUNTERBALANCED BY THE OTHER'S DESCENT.**

No pairing animation or discrete success state is used.

Implemented continuous relation:

`A LOW / B HIGH ↔ OPPOSED MOTION ↔ CROSSING ↔ A HIGH / B LOW`

The relation can reverse indefinitely within bounded travel.

# Pair architecture

Card A:
- independent vertical track;
- Car A direct input.

Card B:
- independent vertical track;
- Car B direct input.

Center:
- restrained cable / pulley / crossing reference only;
- no third transport object;
- no energy/load dashboard.

# Direct manipulation proof

Normalized position law:
- `posB = 1 - posA`;
- direct Car A pointer input solves B immediately;
- direct Car B pointer input solves A immediately.

Pointer mapping:
- each car converts pointer Y to normalized `0…1` track height;
- counterpart is solved from inverse position.

There is no intentional follower delay or causal animation lag.

Keyboard fallback:
- Arrow Up / Down works on both cars;
- Car B keyboard direction is inverted correctly back into Car A state.

# State semantics

Source implementation labels:
- `A LOW / B HIGH`
- `A ↑ / B ↓`
- `A ↓ / B ↑`
- `CROSSING`
- `A HIGH / B LOW`

Crossing is not success.
Terminal exchange is not completion.

# Alternate-valid state

`SWAP START` applies `1 - posA` and swaps the valid positional roles.

`RESET` restores default A-low / B-high.

No wrong/failure state exists.

# Truthfulness implementation

Footer:
`STRUCTURAL TRANSLATION · DOCUMENTED TWO-CAR VALPARAÍSO FUNICULAR RELATION · NOT A TRACTION OR LOAD ENGINEERING MODEL`

Source footer anchors:
- Consejo de Monumentos Nacionales de Chile;
- Ascensores de Valparaíso / Ascensor Concepción;
- Chilean heritage technical documentation describing simultaneous opposite motion and counterbalance.

No speed, load, cable tension, braking, energy or traction values are claimed.

# Responsive source design

Breakpoint at `650px` preserves:
- two track cards simultaneously side by side;
- reduced center cable width;
- smaller cars/labels;
- touch targets and direct vertical manipulation.

Actual narrow visual behavior is NOT yet user-validated.

# Source checks

Passed:
- one autonomous candidate only;
- no existing family/atlas/registry/public route changed;
- two cars visible simultaneously in source architecture;
- A→B inverse logic implemented;
- B→A inverse logic implemented;
- keyboard fallback implemented;
- SWAP START implemented;
- RESET implemented;
- no Pair button;
- no engineering numeric claims;
- source/truthfulness footer present;
- responsive pair-preserving CSS present;
- extracted JavaScript passes `node --check`.

Not yet claimed:
- no live Preview confirmed;
- no user drag/visual audit;
- no measured mobile PASS;
- no public route;
- no South America count change.

# Gate verdict

# **B2.3H — SOURCE PASS**

Validated South America remains `2 / 4`.

# Next output

# **B2.3I — SOUTH AMERICA FAMILY ROUND 2: MATE + BOMBILLA SOURCE + INTERACTION SPEC**
