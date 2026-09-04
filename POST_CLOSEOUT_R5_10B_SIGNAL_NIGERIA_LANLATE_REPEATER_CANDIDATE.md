# RELATIONAL KEY — R5.10B SIGNAL / NIGERIA — LANLATE / REPEATER CANDIDATE

Date: 2026-09-04
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`
Baseline: ADEQUATE.

Audit register:
`POST_CLOSEOUT_R5_10A_SIGNAL_NIGERIA_LANLATE_REPEATER_AUDIT.md` @ `2ec07bdd2ea95e34b760997ac4595d43f3c996ca`.

## Candidate
`families/signal-nigeria/r5-10.html`
Implementation commit:
`7a02cfd2d9e1c594cb2c7a7e760da9a017b2f126`.

Mechanism:
# **LANLATE EARTH STATION → REPEATER CHAIN → CARRIED LINK**

Law:
`BEAM → DISH FOCUS → FEED CAPTURE → IKORODU → OGIDO → ALABATA → LINK CARRIED`

### MATCHING CHAIN
- Card A Lanlate earth-station member exists before relation;
- Card B repeater-chain member exists before relation;
- incoming beam becomes visible at the dish;
- focus rays converge on the editorial feed point;
- carried-signal relation activates only after feed capture;
- Card B registers IKORODU, then OGIDO, then ALABATA;
- completed state remains in Card B as `CARRIED LINK REGISTERED`;
- result: `LANLATE CAPTURE CARRIED · THREE REPEATER HANDOFFS REGISTERED`.

### OTHER CHAIN
- both members remain valid;
- beam / dish / feed still register;
- first two relay nodes remain legible;
- final relay/handoff is visibly displaced;
- output remains open;
- result: `BOTH SIGNAL MEMBERS VALID · REPEATER HANDOFF OFFSET · LINK NOT CARRIED`.

## Source specificity
The named sequence is grounded in National Library of Nigeria development documentation describing Lanlate Earth Station with repeater stations at Ikorodu, Ogido and Alabata.
World Bank Nigeria telecommunications documentation independently supports Lanlate earth-station rehabilitation and national digital microwave transmission routes.
BPE NITEL background supports NITEL long-distance carrier / satellite-service context.

## Truth boundary
This is an editorial infrastructure visualization, not an exact historical engineering diagram.
Routing, geographic spacing, antenna geometry, frequencies, hop timing, signal strength, propagation behavior and exact repeater hardware are illustrative.

## LIVE
Deployment:
`dpl_CveydAySzSYjiHcZwGnXYNyY8wJe`
State: READY.
Exact deployed commit:
`7a02cfd2d9e1c594cb2c7a7e760da9a017b2f126`.
Host:
`relational-key-collectionrelational-key-collection-gnbhqcx2a.vercel.app`.
Candidate route `/families/signal-nigeria/r5-10.html` verified HTTP 200.

Temporary USER URL (Vercel share, expires 2026-09-05):
`https://relational-key-collectionrelational-key-collection-gnbhqcx2a.vercel.app/families/signal-nigeria/r5-10.html?_vercel_share=ycO3L2Bsvh0vOTv7OHzd7z0XO6gSxYc3`

Public Signal wrapper remains unchanged and still points to validated EXP-3.
Shared runtime remains unchanged.
Signal remains ADEQUATE pending USER proof.

## Exact next gate
# **R5.10C — SIGNAL / NIGERIA USER MATCHING + OTHER REGRESSION**

Required proof:
1. `MATCHING CHAIN` → `TEST RELATIONSHIP`;
2. hold final state with all three repeater nodes and `CARRIED LINK REGISTERED`;
3. `OTHER CHAIN` → `TEST RELATIONSHIP`;
4. hold displaced final handoff / open output residual.

Judge separately:
- CAUSAL;
- EMBODIMENT-STRONG;
- VISUAL-SPECIFICITY;
- TRUTH.

Only USER PASS may authorize public Signal promotion and ADEQUATE → STRONG.
