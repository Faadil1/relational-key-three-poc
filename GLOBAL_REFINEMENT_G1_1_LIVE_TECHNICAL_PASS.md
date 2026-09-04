# GLOBAL REFINEMENT G1.1 — LIVE TECHNICAL PASS

Date: 2026-08-26
Branch: `collection/global-refinement-1`
PR: #21 — `RELATIONAL KEY — Global Refinement Pass`
Status: **LIVE TECHNICAL PASS / USER VISUAL CHECK REQUIRED**

## Deployment

Vercel project: `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
Deployment: `dpl_87Bjr4pRX1sMQTBUE731gt42WeQA`
URL: `https://relational-key-collectionrelational-key-collection-gsdndspjm.vercel.app`
Environment: `Preview`
State: `READY`
Git branch: `collection/global-refinement-1`
Deployed Git SHA: `ffdbb21a4553e997e387e879c1a5c692b677c787`
Deployment message: `handover: resume at G1 live regression`

Historic consolidation Preview `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ` remains untouched as the golden pre-refinement collection reference.

## Live technical checks

Confirmed through Vercel authenticated fetch:

1. Collection root `/` → HTTP 200 and serves `RELATIONAL KEY — Collection` with the expected atlas shell.
2. Shared-family public launcher `/families/city-gatineau/` → HTTP 200 and serves the G1 collection wrapper.
3. Shared runtime `/families/_shared/round13r/index.html` → HTTP 200 and remains the exact six-family runtime structure.
4. Autonomous public launcher `/families/zellige-fes/` → HTTP 200 and serves the same G1 collection wrapper.
5. Wrapper contains explicit `← BACK TO ATLAS` → `/#grid`.
6. Root contains `id="grid"`, so the return target exists.
7. Wrapper reserves its own viewport row (`44px` desktop / `42px` mobile) and places the family iframe in the remaining viewport; no overlay implementation is used.
8. Wrapper mobile rule removes the right-side collection law below 680px and keeps Back + family context visible.

## Authentication note

Vercel Authentication protects nested Preview paths. Route-specific temporary access confirms the public wrappers and shared runtime. Direct automated fetch of an iframe snapshot can still be redirected by SSO because the temporary share token is path-scoped. This is an authentication/tooling limitation, not enough evidence to mark the visual iframe regression as passed.

## Remaining user visual gate

Before promoting G1 to PASS, verify in the authenticated browser:

- open one shared family (recommended: Gatineau);
- confirm the 44px collection frame is visible and does not cover native controls;
- click `← BACK TO ATLAS` and confirm return to the atlas;
- open one autonomous family (recommended: Zellige or Boulle);
- confirm its native prototype is visible below the same frame;
- optionally resize to a narrow/mobile width and confirm Back + context remain usable.

No need to replay family relationship animations.

## Verdict

# **G1.1 LIVE TECHNICAL PASS / USER VISUAL CHECK REQUIRED**

`G1 SOURCE PASS ≠ G1 LIVE TECHNICAL PASS ≠ G1 USER VISUAL PASS ≠ G1 PASS ≠ GLOBAL REFINEMENT COMPLETE`.
