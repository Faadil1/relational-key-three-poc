# RELATIONAL KEY — CONTINENTAL BALANCE B2.4A-R1

Date: 2026-08-29
Branch: `collection/global-refinement-1`

# FULL-QUEUE PREVIEW RETRY — STILL BLOCKED

## Objective

Retry identification of a Vercel Preview containing all nine Continental Balance Gate 2 SOURCE-PASS candidates, including Swiss Music Box build:
`c8c1af1afe7c9e9ff8cce8efc68ce3094976fe97`

## Vercel project

- Project ID: `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
- Team ID: `team_twDc66jGM0sPvNM4I5Huc0x7`
- Branch: `collection/global-refinement-1`

## Retry evidence

Vercel deployment listing still returns the same newest READY deployment:
- deployment: `dpl_8GgBz2Kt81mr1YTLTR3UTk9UgMi4`
- URL: `https://relational-key-collectionrelational-key-collection-55w553e3i.vercel.app`
- deployed SHA: `32b67f69b7ead0ff30f443e1efe803222afb31cd`

This Preview is partial only. It predates:
- Tongiaki;
- Garamut;
- Catoptric Anamorphosis;
- Swiss Cylinder Music Box.

PR #21 current head at retry:
`ce2759bf42eb94ea5065aaba8c3ae024299765b6`

GitHub combined status for that head still reports:
- `Vercel – relational-key-collectionrelational-key-collection` = `failure`;
- target URL contains `upgradeToPro=build-rate-limit`.

Three family-linked Vercel contexts attached to the same repository also report the same build-rate-limit failure.

## Verdict

# `B2.4A-R1 — RETRY ATTEMPTED / STILL BLOCKED BY VERCEL BUILD RATE LIMIT`

This is an infrastructure limitation, not a candidate regression.

No new full-queue Preview exists yet.
No new LIVE PASS is claimed.
No validated continental count changes.

Current validated distribution remains:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

## Recovery gate

Next exact output remains:

# `B2.4A-R2 — RETRY FULL-QUEUE PREVIEW IDENTIFICATION AFTER VERCEL BUILD CAPACITY CLEARS`

When a READY descendant of Music Box build `c8c1af1...` appears:
1. record deployment ID / URL / SHA;
2. probe all nine candidate routes;
3. classify each only as `HTTP 200`, `SSO/AUTH BLOCKED`, or `MISSING/ERROR`;
4. persist the live-technical gate;
5. begin grouped user walkthroughs with independent family verdicts.

Canonical invariant remains:

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**
