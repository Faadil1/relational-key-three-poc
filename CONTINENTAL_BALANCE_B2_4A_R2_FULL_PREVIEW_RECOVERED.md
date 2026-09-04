# RELATIONAL KEY — B2.4A-R2 FULL PREVIEW RECOVERED

Date: 2026-08-29
Branch: `collection/global-refinement-1`

# Verdict

# **FULL-QUEUE PREVIEW RECOVERED / READY / ROUTE FETCHES SSO-PROTECTED**

This closes the infrastructure blocker from B2.4A-R1. It does **not** validate any family and does **not** change continental counts.

# Terminology correction

The nine candidates in this queue are **not nine newly created additions introduced at this stage**. They already existed in the RELATIONAL KEY project/workstream and are being consolidated/validated for the balanced 24-family collection.

Preferred wording:
# **9 EXISTING BALANCE-GATE CANDIDATES / FAMILIES**

See:
`CONTINENTAL_BALANCE_B2_EXISTING_NINE_TERMINOLOGY_CORRECTION.md`

Canonical distinction:
# **EXISTENCE IN PROJECT HISTORY ≠ NEW ADDITION NOW ≠ VALIDATED COLLECTION MEMBERSHIP.**

## Full-queue Vercel Preview

Project: `relational-key-collectionrelational-key-collection`
Project ID: `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
Team ID: `team_twDc66jGM0sPvNM4I5Huc0x7`
Deployment: `dpl_AQ5B2Wmn6VMH1qczrAsDVUVuHuCw`
URL: `https://relational-key-collectionrelational-key-collection-1wq2g2b7e.vercel.app`
State: `READY`
Git ref: `collection/global-refinement-1`
Deployed SHA: `0ddd5ad598cf79782acf32aa79fe65463765c4a5`

## Full-queue ancestry proof

Swiss Music Box build:
`c8c1af1afe7c9e9ff8cce8efc68ce3094976fe97`

GitHub compare:
- base = Music Box build `c8c1af1...`
- head = deployed SHA `0ddd5ad...`
- status = ahead
- ahead by 10 / behind 0

Therefore the READY Preview contains all nine existing Balance Gate 2 candidate builds.

## Route-probe evidence

Automated authenticated fetches were attempted on both ends of the queue:
- `/families/astrolabe-isfahan/candidate.html`
- `/families/music-box-sainte-croix/candidate.html`

Both returned `HTTP 302` to Vercel SSO despite a temporary share token.

Classification:
# **SSO/AUTH BLOCKED — NOT MISSING / NOT A BUILD FAILURE**

Because deployment-level protection is intercepting candidate route fetches, no independent route `HTTP 200` is claimed from this gate. User-browser walkthrough is the next evidence layer.

## Existing candidate queue

1. Astrolabe / Isfahan
2. Janney / Virginia
3. Metate + Metlapil / Teotitlán del Valle
4. Valparaíso Funicular / Chile
5. Mate + Bombilla / Argentina
6. Tongiaki / Tonga
7. Garamut / East Sepik-Ramu PNG
8. Catoptric Anamorphosis / Paris-France
9. Swiss Cylinder Music Box / Sainte-Croix

All nine remain:
`SOURCE PASS / FULL PREVIEW PRESENT / USER VISUAL OR VISUAL+AUDIO PENDING`

## Continental counts

Remain strictly:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

## Next gate

First:
# **VERCEL LEGACY GIT-INTEGRATION CLEANUP**

Keep only canonical Collection Git-linked; disconnect Boulle/Hika Ahi/Siku from automatic Git deployments while preserving their golden deployments.

Then:
# **B2.4B — USER WALKTHROUGH GROUP A**

Group A:
1. Astrolabe
2. Janney
3. Metate

Issue an independent PASS / PATCH / REJECT for each family. Do not bulk-pass the group.

Product invariant:
# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**
