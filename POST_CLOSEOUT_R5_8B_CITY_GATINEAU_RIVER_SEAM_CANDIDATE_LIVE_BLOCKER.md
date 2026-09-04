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

Original GitHub/Vercel status on candidate commit:
- context `Vercel`
- state `failure`
- target indicated Hobby `build-rate-limit` / upgrade-to-Pro page.

Canonical interpretation:
# **SOURCE CANDIDATE PASS / LIVE CANDIDATE BLOCKED — BUILD RATE LIMIT**

## Retry 01

A deployment-only retry was triggered on 2026-09-03 without any semantic or visual change to `families/city-gatineau/r5-8.html`.
The candidate implementation remains exactly `796ee8afc24c879d148b90046037f80b0c5bcec6`.
Retry trigger commit: `43c3c8a998191ac73e621142575ca9a18b7288e5`.

Result:
- Vercel status again returned `failure`;
- target again points to Hobby `build-rate-limit`;
- no new deployment was created after `dpl_Ew6K7raX9jBryigWqAkMr5xRsHLa`;
- direct deployment fallback via the currently connected deployment action could not be used, so no alternate deployment is claimed.

Canonical sync after Retry 01:
- blocker register commit `503a573f14e1b09f1ab0e1a913e389089630ae19`;
- R5 queue commit `9da0a7df5fe65e62c0a7c25f1953946679498495`;
- current state commit `a59f476e2790c2f038bb53dae2dabed488228c23`;
- handover commit `b8f2c56257b48fe69efcdb5917e5f6361a882a9e`.

Retry acceptance criteria remain:
1. Vercel deployment reaches `READY`;
2. deployed branch contains the unchanged `r5-8.html` candidate;
3. `/families/city-gatineau/r5-8.html` returns HTTP 200 through authenticated Vercel fetch;
4. only then open USER proof.

Do not infer application failure.
Do not promote City.
Do not request USER proof until the retry satisfies all acceptance criteria.
Do not generate additional semantic candidate commits merely to probe capacity.
Public City wrapper remains unchanged.
Shared runtime remains unchanged.
