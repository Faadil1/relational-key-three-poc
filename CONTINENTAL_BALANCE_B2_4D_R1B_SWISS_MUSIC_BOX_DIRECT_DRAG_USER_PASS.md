# CONTINENTAL BALANCE B2.4D-R1B — SWISS MUSIC BOX DIRECT-DRAG USER PASS

Date: 2026-08-29
Repository: `Faadil1/relational-key-three-poc`
Branch: `collection/global-refinement-1`
PR: #21 — `DRAFT / DO NOT MERGE`

## Product invariant

**THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Validation rule:
`PAIR MEMBER → RELATION → OTHER MEMBER RESPONSE`

## Candidate

Swiss Cylinder Music Box / Sainte-Croix
Pair: `PINNED CYLINDER → PIN/TOOTH CONTACT → TUNED COMB RESPONSE`

## Prior state

Group C had already user-evidenced:
- `ENGAGED · NO AUTOPLAY`;
- `OTHER CYLINDER` as another valid stored geometry;
- reset/separate state.

Missing evidence was direct cylinder rotation away from `+000°` causing a decoded pin→tooth event.

A direct-drag UX hardening patch was subsequently made at commit `1054722fa8d72a092c61ffd41eabacae30c9cd07`, with SOURCE/LIVE PASS recorded in `CONTINENTAL_BALANCE_B2_4D_R1A_SWISS_MUSIC_BOX_DIRECT_DRAG_UX_PATCH.md`.

## USER evidence

Uploaded recording: `8af53be2-ad31-49c6-b6de-a68a07e6498d.mp4`
Observed metadata: ~35.7 s / 1906×960 / 30 fps.

Strict audit observations:
- pair is engaged and `ENGAGED · NO AUTOPLAY` remains visible;
- cursor is directly on the large Card A cylinder;
- cylinder angle visibly leaves `+000°` under direct horizontal manipulation;
- angle progresses through visible non-zero states, including approximately `+358°`, `+351°`, `+342°`, `+335°`, `+326°`, and `+313°`;
- pin positions visibly change with that rotation;
- after the reverse crossing, the bridge reports `PIN → TOOTH 5 · REVERSE CONTACT`;
- the readout reports `1 DECODED EVENT`;
- the event trace shows a live event marker under the comb.

The missing causal chain is therefore directly user-evidenced:

`CYLINDER DRAG → ANGLE CHANGE → PIN CROSSING → COMB RESPONSE`

## Verdict

**PASS / VALIDATED ✅**

Swiss Music Box closes its validation gate.

Europe: `3/4 → 4/4`.

Continental Balance Gate 2 result:

`AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 4`

**ALL SIX CONTINENTS = 4/4.**

No additional `OTHER CYLINDER` retest is required; that evidence was already acquired in Group C.

## Next exact gate

**B2.5 — 24-FAMILY COLLECTION REGRESSION**

B2.5 must now verify the complete 24-family collection against the product invariant, including desktop and reserved true ~390 px responsive regression. G4 remains PARKED until B2.5 closes.
