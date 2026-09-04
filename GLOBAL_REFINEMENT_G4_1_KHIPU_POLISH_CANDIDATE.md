# RELATIONAL KEY — G4.1 KHIPU POLISH CANDIDATE

Date: 2026-09-02
Branch: `collection/global-refinement-1`
Family: Peru / Khipu — Knotted Register
Status: `USER PASS / PROMOTED / CLOSED`

## Documented debt

Historical user gate for Khipu: `PASS WITH POLISH`.

Explicit non-blocking debt:
- slightly increase hierarchy/readability of the central knot;
- make the change in cord tension more immediately perceptible.

## Golden preservation

Golden consolidated source remains unchanged:
`families/khipu-peru/snapshot.html`

Golden snapshot blob at candidate creation:
`cdc06bebbc2054463f4d2f61e59e5de261979ef9`

## Candidate architecture

Audit route:
`families/khipu-peru/g4-1.html`

Implementation commit:
`64647ea78b04439ea9a57ece47f19490d9185d45`

The candidate loads the unchanged golden `snapshot.html` in the normal collection frame and injects one same-origin CSS override after load.

No mechanism HTML, JavaScript timing, drag threshold, MATCHING semantics or OTHER RECORD semantics were changed.

## CSS-only polish

Tension progression:
`LOOSE / FAINT → APPROACH → TAUT / BRIGHTER → REGISTERED / SETTLED`.

Knot hierarchy:
- desktop knot container increased modestly;
- internal loop increased modestly;
- tension/registered state hierarchy increased;
- registered knot remains compact rather than becoming a hero object;
- rejected state remains demoted.

## G4.1A USER evidence

Candidate video:
- ~11.33 s;
- 1912×966;
- 30 fps.

USER verdict:
# `PASS / PROMOTE`

Observed:
- tension progression is easier to perceive than golden;
- knot is clearer but remains subordinate to `Claim Cord` + `Context Cord`;
- matching preserves registered continuation;
- OTHER RECORD preserves a visible residual while both records remain valid.

## Promotion

Public wrapper promotion:
`families/khipu-peru/index.html`

Promotion commit:
`a4a17eb028d0645c8148e0311bfb6f222b286914`

The public wrapper now applies the exact validated G4.1 CSS override while continuing to load the unchanged golden snapshot.

Vercel/GitHub status for promotion commit:
`SUCCESS`.

Closure register:
`GLOBAL_REFINEMENT_G4_1A_KHIPU_LIVE_USER_PASS_PROMOTION.md`
commit `b3edcb34efe0b26aee8e68e936350c0ce4c8ac9b`

# G4.1 — CLOSED ✅

# Next exact output

# **G4.2 — KENTO POLISH RE-AUDIT + MINIMUM CANDIDATE DECISION**

Inspect the current Kento wrapper/snapshot and reproduce the documented legibility debt before any mutation.