# RELATIONAL KEY — EXP-3A SIGNAL / NIGERIA LIVE ROUTING BLOCKER

Date: 2026-09-02
Branch: `collection/global-refinement-1`
PR: #21 — DRAFT / DO NOT MERGE

## USER upload

Video: ~10.6 s / 1904×968 / 30 fps / 318 frames.

Observed:
- outer EXP-3 NITEL wrapper loads;
- inner family surface is Vercel `404: NOT_FOUND` for the duration of the recording;
- therefore this recording is **NOT VALID USER EXP-3A EVIDENCE**;
- no causal / visual / truth verdict may be inferred from it.

## Root cause

`families/signal-nigeria/exp-3.html` loads `/families/signal-nigeria/index.html` explicitly.
The family wrapper previously resolved the slug using only the final pathname token, so the explicit path resolved as `index.html` rather than `signal-nigeria`; it then requested the wrong internal family path and produced the 404.

## Source fix

Signal public wrapper routing was hardened only for explicit `index.html` resolution:
- if last pathname token is `index.html`, use the preceding token as family slug;
- otherwise preserve prior behavior.

Fix first landed at `4931445dc0de05e15af07f8a9d4cb88e209048a7`.
Deployment retry marker commit: `0c0ee147c1afbb60bb970f215c54c9b5b6f634c6`.

This remains a routing robustness fix only:
- no Signal visual promotion;
- no EXP-3 semantic change;
- no shared-runtime mutation;
- no change to the validated NITEL candidate mechanism.

## LIVE resolution

Previous Vercel rate-limit failure is resolved.

Routing-fixed deployment:
- deployment `dpl_DbbvGjiwxmXAcsmPUBvmRuPaUoUz`
- state `READY`
- exact deployed commit `0c0ee147c1afbb60bb970f215c54c9b5b6f634c6`
- deployment host `relational-key-collectionrelational-key-collection-kvxhfdiqg.vercel.app`

Fresh share URL:
`https://relational-key-collectionrelational-key-collection-kvxhfdiqg.vercel.app/families/signal-nigeria/exp-3.html?_vercel_share=pWME7b1ltpCCycqmyk5F3vtYt5oO3uXO`

The connector confirms the deployment is READY. Protected-route fetch still redirects through Vercel SSO, so the USER preview remains the final visual check that the inner NITEL surface renders rather than 404.

## State separation

- SOURCE EXP-3 NITEL candidate PASS / unchanged
- SOURCE explicit-index routing fix PASS
- LIVE routing-fixed deployment READY
- previous USER uploaded recording INVALID because inner page was 404
- USER EXP-3A remains PENDING
- Signal remains EXPERIENCE DEBT
- RELATIONAL INTEGRITY 24/24 PASS unchanged
- VALIDATED 24 unchanged

## Exact next gate

`EXP-3A — SIGNAL / NIGERIA NITEL RELAY USER REGRESSION`

Use the fresh routing-fixed share URL. Record ~10–15 s only after confirming the NITEL family surface appears. Then run MATCHING → hold Earth Station→Relay; OTHER → hold offset residual. Judge CAUSAL / VISUAL / TRUTH. Do not promote Signal before USER PASS.