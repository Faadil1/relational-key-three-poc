# RELATIONAL KEY — CONTINENTAL BALANCE B2.3G

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Promotion matrix: `CONTINENTAL_BALANCE_B2_2F_SOUTH_AMERICA_PROMOTION_MATRIX.md`

# SOUTH AMERICA FAMILY ROUND 1 — VALPARAÍSO FUNICULAR SOURCE + INTERACTION SPEC

Status:
# **SOURCE PASS / INTERACTION SPEC FROZEN**

Validated South America remains:
# `2 / 4`

This spec freezes a source-grounded relation before code. It does not promote a validated family.

---

# 1. Working identity

- slug: `funicular-valparaiso`
- place: `Valparaíso, Chile`
- concrete heritage anchor: `Ascensor Concepción / Valparaíso funicular system`
- edition: `Counterweight Register`
- memory: `Transport / Counterweight Memory`
- primary topology: `R1 — balance / counterweight / linked opposite motion`

## Canonical candidate law

# **ON A SHARED FUNICULAR, ONE CAR'S ASCENT IS COUNTERBALANCED BY THE OTHER'S DESCENT.**

Signature:

`CAR A LOW / CAR B HIGH → LINKED MOTION → A ASCENDS / B DESCENDS → CROSS → EXCHANGE HEIGHT → REVERSE → CONTINUE`

This is a continuous relation, not a success/failure sequence.

---

# 2. Source grounding

## Consejo de Monumentos Nacionales de Chile

The Chilean heritage authority documents Valparaíso's historic `ascensores` as transport systems developed to connect the port/plain with hillside neighborhoods. Multiple installations, including Ascensor Concepción, are protected historic monuments.

Primary pages:
- https://www.monumentos.gob.cl/monumentos/monumentos-historicos/ascensores-de-valparaiso-artilleria-cordillera-hospital-van-buren
- https://www.monumentos.gob.cl/monumentos/monumentos-historicos/ascensor-concepcion

Ascensor Concepción is documented as the first Valparaíso ascensor/funicular, inaugurated in 1883.

## Heritage / technical system description

Chilean heritage documentation for the historic Valparaíso area explains that, except for the true elevator case of Polanco, the systems commonly called `ascensores` are funiculars.

The technical description states that the funiculars consist of:
- two wooden or metal cars;
- moving at the same time in opposite directions;
- on the funicular relation, one car functioning as the counterweight of the other.

Source anchors:
- https://www.monumentos.gob.cl/sites/default/files/articles-45668_doc_pdf.pdf
- Valparaíso funicular technical/seminar documentation describing the two-car counterbalancing system.

---

# 3. Truth boundary

RELATIONAL KEY may truthfully translate:

# `TWO CARS ↔ SHARED FUNICULAR RELATION → EQUAL/OPPOSITE POSITIONAL MOTION`

The build MUST NOT claim:
- that the two cars alone provide all motive power;
- that the system is a perpetual-motion device;
- exact cable tension, passenger load, speed, braking force or energy balance;
- that one specific historical traction system applies identically across all Valparaíso ascensores;
- that this UI is an engineering simulator.

Historical traction technologies changed over time. The interaction isolates only the documented two-car counterbalancing/opposed-motion subsystem.

Required footer concept:

`STRUCTURAL TRANSLATION · DOCUMENTED TWO-CAR VALPARAÍSO FUNICULAR RELATION · NOT A TRACTION OR LOAD ENGINEERING MODEL`

---

# 4. Pair-native architecture

## Card A — FUNICULAR CAR A

Owns:
- its own bounded vertical track/card;
- its own car body;
- its normalized height state;
- direct pointer/touch manipulation.

## Card B — FUNICULAR CAR B

Owns:
- its own bounded vertical track/card;
- its own car body;
- the complementary inverse height state;
- direct pointer/touch manipulation.

Neither car is follower decoration.

Directly manipulating either card must update the other through the same relational law.

## Gap / center

May contain only:
- a restrained shared cable/traction schematic;
- crossing/reference height;
- short relation label.

The gap MUST NOT become:
- a third transport car;
- an animated pulley hero;
- an energy meter;
- a large mechanical machine that visually dominates the two cards.

The center explains connection; the two cars enact the product.

---

# 5. Interaction contract

## Initial state

Default:
- Car A low;
- Car B high;
- both already belong to the same funicular relation;
- system at rest until user input.

Label:
`OPPOSED POSITIONS · SHARED RELATION AT REST`

There is intentionally NO `PAIR` button because that would falsely imply historically separate cars are manually coupled before each trip.

## Direct manipulation

User may grab Car A OR Car B and drag vertically.

Normalized model:
- if `A = p`, then `B = 1 − p`;
- if user manipulates B, A is solved by the same inverse relation;
- both remain bounded between terminal limits;
- the visual rate is equal/opposite.

This is the core proof.

## Relation states

State labels may describe position without assigning success:
- `A LOW / B HIGH`
- `OPPOSED MOTION`
- `CROSSING`
- `A HIGH / B LOW`

At the midpoint:
`CROSSING · EQUAL HEIGHT / OPPOSITE DIRECTION`

At terminals:
`HEIGHTS EXCHANGED · RELATION REMAINS ACTIVE`

No confetti, lock, green success state or final completion.

## Reverse / continue

Dragging back reverses both members naturally.

The interaction can continue indefinitely within bounded travel:
`A ↑ / B ↓ ↔ A ↓ / B ↑`

This is a living relation rather than a one-shot transformation.

---

# 6. Alternate-valid state

Control:
`SWAP START`

Alternate initial condition:
- Car A high;
- Car B low.

This is not a mismatch.

Both starting arrangements are valid because the law is symmetric under role reversal.

`RESET` returns to the default A-low/B-high state.

No invalid route is required.

---

# 7. Interaction implementation guidance

Preferred direct model:
- pointerdown on either car;
- map pointer Y into a normalized track coordinate;
- clamp `0…1`;
- render selected car at `p`;
- render counterpart at `1-p`;
- preserve the relation when control transfers from one car to the other;
- keyboard Up/Down fallback recommended.

Do not animate the counterpart with a lag that makes it appear causally secondary. Both should update as one linked relation.

Small easing after pointer release is acceptable only if it does not imply real mechanical dynamics.

No numeric engineering values are needed.

---

# 8. Visual direction

Use:
- restrained industrial-heritage palette;
- two vertical inclined/track abstractions;
- car silhouettes derived from funicular geometry, not generic subway/train icons;
- enough track context to read height/opposition;
- thin shared cable relation.

Avoid:
- rainbow Valparaíso house palettes as generic cultural skin;
- port postcards;
- tourism iconography;
- locomotive imagery;
- dramatic collision/crossing effects.

Identity comes from the historic two-car counterbalance relationship.

---

# 9. Source-image strategy

First build may use a structural SVG/CSS translation rather than external photography if:
- the cars clearly read as inclined funicular cars;
- no unsupported architectural detail is claimed;
- source footer names the heritage anchors.

Later visual refinement may use reusable source photography only after license verification.

The causal proof must not depend on a photograph.

---

# 10. Responsive behavior

Because the relation is intrinsically two vertical paths, mobile should preferably preserve the two paths side-by-side rather than stack them into a false sequence.

Recommended:
- narrow two-column track cards;
- smaller center cable gap;
- cars retain large touch targets;
- direct vertical drag remains available on either side;
- labels collapse/simplify before the pair geometry does.

At very narrow widths, typography may reduce but the pair must remain simultaneously visible.

---

# 11. Difference from collection families

Not Khipu:
- no tension/knot registration.

Not Siku:
- no temporal alternation / distributed notes.

Not Astrolabe:
- no calibration layer / relative rotation.

Not Janney:
- no latch or discrete coupling success.

Not Metate:
- no repeated abrasion or accumulated material state.

Valparaíso introduces the collection's clearest pure counterweight/opposite-motion law.

---

# 12. Build gate — B2.3H

Required candidate path:
`families/funicular-valparaiso/candidate.html`

Source-gate acceptance:
1. autonomous candidate only;
2. no atlas/registry/public-route mutation;
3. both vertical car members visible at once;
4. direct drag Car A updates B as exact inverse;
5. direct drag Car B updates A as exact inverse;
6. no pair button / false coupling sequence;
7. SWAP START is valid role reversal;
8. RESET restores default;
9. no numeric engineering claims;
10. source + structural-translation disclaimer present;
11. keyboard fallback recommended;
12. responsive CSS preserves simultaneous pair geometry;
13. JS syntax passes.

# Gate verdict

# **B2.3G — SOURCE PASS / INTERACTION SPEC FROZEN**

Validated South America remains `2 / 4`.

# Next output

# **B2.3H — VALPARAÍSO FUNICULAR AUTONOMOUS BUILD CANDIDATE + SOURCE GATE**
