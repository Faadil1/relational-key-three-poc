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
Candidate blob SHA: `118cd6c5b65c9e7e8cc62842510cb37acc97d98a`.

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

## LIVE blocker history

Original candidate commit and Retry 01 both hit Vercel Hobby `build-rate-limit`.
Retry 01 trigger commit: `43c3c8a998191ac73e621142575ca9a18b7288e5`.
No semantic or visual candidate change was made.

## Retry 02 / blocker resolution ✅

Build capacity reopened.
A branch deployment reached READY:
- deployment `dpl_EzFX9UK9NJkHPvTp5UvoSRoKTjVA`
- host `relational-key-collectionrelational-key-collection-cztjb30l3.vercel.app`
- deployed commit `91ad10e8ad6071b2ce6d5c8a1abde3f58070e41e`
- state `READY`.

Deterministic candidate-integrity check:
- blob at implementation commit `796ee8af...`: `118cd6c5b65c9e7e8cc62842510cb37acc97d98a`
- blob at deployed commit `91ad10e8...`: `118cd6c5b65c9e7e8cc62842510cb37acc97d98a`
- result: exact candidate unchanged.

Protected-preview route behavior:
- automated raw fetch of `/families/city-gatineau/r5-8.html` returns `302` to Vercel SSO, not 404/application failure;
- temporary Vercel share access was generated for USER testing.

Canonical interpretation:
# **SOURCE PASS / LIVE READY / EXACT CANDIDATE INTEGRITY PASS / PREVIEW AUTH-PROTECTED / USER GATE OPEN**

Public City wrapper remains unchanged.
Shared runtime remains unchanged.
City remains ADEQUATE until USER PASS.
