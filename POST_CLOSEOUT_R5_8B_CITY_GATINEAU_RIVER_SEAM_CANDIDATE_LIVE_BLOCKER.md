# RELATIONAL KEY — R5.8B CITY / GATINEAU RIVER-SEAM CANDIDATE + LIVE BLOCKER

Date: 2026-09-03
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`

Source audit:
`POST_CLOSEOUT_R5_8A_CITY_GATINEAU_SOURCE_RIVER_SEAM_AUDIT.md`
@ `88fab6997118aacd9168b7aa03a9f7298e18ec3a`.

Candidate:
`families/city-gatineau/r5-8.html`
Implementation `796ee8afc24c879d148b90046037f80b0c5bcec6`.

Mechanism:
# **RIVER-SEAM CROSSING / BANK-TO-BANK HANDOFF**

Law:
`WEST-BANK ROUTE → RIVER EDGE → CROSSING ANCHORS SEAT → SPAN FORMS → HANDOFF CROSSES → EAST-BANK ROUTE CONTINUES`

MATCHING:
- two valid city route fragments;
- river-edge anchors seat;
- span forms only through the relation;
- a handoff pulse crosses the river seam;
- receiving route continues.

OTHER:
- both route fragments remain valid;
- crossing anchors remain vertically offset;
- no valid shared span seats;
- residual is a misseated crossing.

Truth boundary:
Conceptual Gatineau territory / waterway relationship only; not an operational transit map, real bridge alignment, STO route or navigation tool.

## LIVE status

GitHub/Vercel status on candidate commit:
- context `Vercel`
- state `failure`
- target indicates Hobby `build-rate-limit` / upgrade-to-Pro page.

Canonical interpretation:
# **SOURCE CANDIDATE PASS / LIVE CANDIDATE BLOCKED — BUILD RATE LIMIT**

Do not infer application failure.
Do not promote City.
Do not request USER proof until an exact candidate deployment is READY and route-tested.
Public City wrapper remains unchanged.
Shared runtime remains unchanged.
