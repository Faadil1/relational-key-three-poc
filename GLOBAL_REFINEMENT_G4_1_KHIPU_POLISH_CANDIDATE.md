# RELATIONAL KEY — G4.1 KHIPU POLISH CANDIDATE

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Family: Peru / Khipu — Knotted Register
Status: `SOURCE PASS / LIVE PREVIEW PENDING`

## Documented debt

Historical user gate for Khipu: `PASS WITH POLISH`.

Explicit non-blocking debt:
- slightly increase hierarchy/readability of the central knot;
- make the change in cord tension more immediately perceptible.

## Golden preservation

Golden consolidated source remains unchanged:
`families/khipu-peru/snapshot.html`

Golden snapshot blob:
`cdc06bebbc2054463f4d2f61e59e5de261979ef9`

Public family wrapper remains unchanged:
`families/khipu-peru/index.html`

No user-facing promotion has occurred.

## Candidate architecture

New isolated audit route:
`families/khipu-peru/g4-1.html`

Implementation commit:
`64647ea78b04439ea9a57ece47f19490d9185d45`

The candidate loads the unchanged golden `snapshot.html` in the normal collection frame and injects one same-origin CSS override after load.

This is intentionally reversible:
- no HTML inside the Khipu mechanism is rewritten;
- no JavaScript is changed;
- no state timing is changed;
- no drag threshold is changed;
- no matching / OTHER semantics are changed;
- deleting the candidate route returns the repository to the prior golden state.

## CSS-only polish

### Tension perceptibility
- idle tension field becomes quieter;
- approach remains partial;
- tension becomes brighter and gains a restrained low-radius emphasis;
- registered tension settles slightly from the peak rather than remaining at identical emphasis;
- cord segments increase from 4 px to 5 px in the candidate.

The intended visual sequence becomes more legible as:
`LOOSE / FAINT → APPROACH → TAUT / BRIGHTER → REGISTERED / SETTLED`.

### Knot hierarchy
- knot container increases from 60 px to 68 px on desktop;
- internal loop increases modestly;
- tension-state knot opacity/hierarchy rises;
- registered knot remains compact through scale reduction, preserving the sense of tightening rather than simply enlarging the hero;
- rejected state remains strongly demoted.

The knot must still remain subordinate to the two record cards.

## Source gate

Compare base:
`50cc3e857557a4eeffa442d36148ff0c0ffd9494`

Candidate head:
`64647ea78b04439ea9a57ece47f19490d9185d45`

Result:
- only `families/khipu-peru/g4-1.html` added;
- 52 additions;
- 0 deletions;
- golden `snapshot.html` unchanged;
- public route unchanged.

# Remaining gate

# **G4.1A — KHIPU LIVE CANDIDATE REGRESSION**

Need a Preview containing commit `64647ea…` or a later documentation-only commit that includes it.

Audit sequence:
1. open `/families/khipu-peru/g4-1.html`;
2. play MATCHING RECORD from reset;
3. judge whether tension change is easier to perceive before knot registration;
4. ensure knot is clearer but not dominant over the cards;
5. play OTHER RECORD;
6. verify residual remains legible and both records remain valid;
7. compare against `/families/khipu-peru/` golden public route if needed.

Promotion is forbidden until user visual regression passes.
