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

Fix commit: `4931445dc0de05e15af07f8a9d4cb88e209048a7`.

This is a routing robustness fix only:
- no Signal visual promotion;
- no EXP-3 semantic change;
- no shared-runtime mutation;
- no change to the validated NITEL candidate mechanism.

## LIVE state

Vercel status for `4931445...`: **FAILURE — build-rate-limit / Hobby plan**.
No new valid deployment exists yet for the routing fix.

## State separation

- SOURCE EXP-3 NITEL candidate PASS / unchanged
- SOURCE explicit-index routing fix PASS
- LIVE fixed candidate BLOCKED by Vercel build-rate limit
- USER uploaded recording INVALID because inner page is 404
- USER EXP-3A remains PENDING
- Signal remains EXPERIENCE DEBT
- RELATIONAL INTEGRITY 24/24 PASS unchanged
- VALIDATED 24 unchanged

## Exact next gate

`EXP-3A-LIVE — SIGNAL / NIGERIA ROUTING FIX DEPLOYMENT`

Do not ask for another USER recording until a deployment containing `4931445...` (or a later equivalent routing fix) is READY. Once READY, issue one fresh share URL and resume EXP-3A USER regression.