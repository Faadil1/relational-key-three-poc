# GLOBAL REFINEMENT G4.1A — VERCEL RATE-LIMIT BLOCKER

Date: 2026-08-28
Branch: `collection/global-refinement-1`
PR: #21 — `DRAFT / DO NOT MERGE`

## Gate

`G4.1A — KHIPU LIVE CANDIDATE REGRESSION`

## Status

# `SOURCE PASS / LIVE BLOCKED BY EXTERNAL DEPLOYMENT QUOTA`

This is not a Khipu implementation failure and does not alter the G4.1 source verdict.

## Candidate already prepared

- golden source: `families/khipu-peru/snapshot.html`
- golden blob: `cdc06bebbc2054463f4d2f61e59e5de261979ef9`
- public route: `families/khipu-peru/index.html`
- isolated candidate: `families/khipu-peru/g4-1.html`
- candidate implementation commit: `64647ea78b04439ea9a57ece47f19490d9185d45`

Source compare for the candidate implementation:
- one file added;
- 52 additions / 0 deletions;
- no golden source, public route, JS timing, drag threshold, matching semantics or OTHER RECORD semantics changed.

## Verified deployment blocker

GitHub combined commit status for current branch head reported Vercel failures with the exact description:

`Deployment rate limited — retry in 24 hours.`

The rate-limit status appears on the canonical collection Vercel project and several legacy RELATIONAL KEY projects linked to the same repository. Therefore the absence of a G4 Preview is caused by the Vercel Hobby deployment quota, not by source/build regression.

Canonical Vercel project:
- project: `relational-key-collectionrelational-key-collection`
- project ID: `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
- team: `team_twDc66jGM0sPvNM4I5Huc0x7`
- latest successful deployment remains G3.2B: `dpl_ExZkfTQqiiDscdkU2K8t2LGgz1Ta`
- latest successful deployed commit: `f1797ccaf141c97732b32adbb2227a87b7cc827f`

## Resume rule

After the Vercel quota window clears:
1. trigger or identify the first Preview containing `64647ea78b04439ea9a57ece47f19490d9185d45` or a later descendant commit;
2. confirm Preview state `READY` and deployed SHA ancestry;
3. open `/families/khipu-peru/g4-1.html`;
4. audit MATCHING RECORD from reset through tension and registration;
5. audit OTHER RECORD and verify residual + both-records-valid semantics;
6. compare against `/families/khipu-peru/` golden if needed;
7. only then decide `G4.1 USER PASS / PROMOTE` or revise the reversible CSS candidate.

Do not promote Khipu, mutate the public Khipu route, or begin Kento before this live/user gate closes.

## Product invariant

**THE RELATIONAL PAIR REMAINS THE PRODUCT.**
