# RELATIONAL KEY — ÉTAT CANONIQUE COURANT

Date: 2026-08-29
Repository: `Faadil1/relational-key-three-poc`
Canonical working branch: `collection/global-refinement-1`
Draft PR: **#21 — RELATIONAL KEY — Global Refinement Pass**
PR status: `DRAFT / DO NOT MERGE`
Latest verified milestone: `CONTINENTAL_BALANCE_B2_4A_R2_FULL_PREVIEW_RECOVERED.md`

# PRODUCT INVARIANT

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Immutable pre-refinement anchor:
`79ba99ec739dfffb40563e9a89edfdffe0fdd3d5`

Completed refinement: G0 PASS → G1 PASS → G2 PASS → G3 PASS.
G4 polish remains PARKED until Continental Balance Gate 2 closes.

# CONTINENTAL BALANCE GATE 2 — ACTIVE

Target:
# `AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 4 / OCEANIA 4 / EUROPE 4`

Current VALIDATED distribution remains:
# `AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

No research promotion, spec freeze, SOURCE PASS, READY deployment or route availability alone changes a validated count.

Core laws:
- **BALANCE IS A TARGET, NOT A LICENSE TO ADD WEAK FAMILIES.**
- **SOURCE CHOOSES THE MECHANISM. THE GAP MAP ONLY GUIDES DISCOVERY.**

# ALL 9 REQUIRED ADDITIONS — SOURCE PASS

1. Asia — Astrolabe / Isfahan
   - `families/astrolabe-isfahan/candidate.html`
   - build `ade670ad03513d972180ef78d717f174f585ed6c`
   - fix `a756e58d0bead32b90ca1f6470e68592be0c3d00`
   - blob `2903d6a8023e3ba56168f3efc05994c91a7e49f6`

2. North America — Janney / Virginia
   - `families/coupler-virginia/candidate.html`
   - build `fa561bf4ebb20becaaee81856dc59f81b1e8b4c6`
   - blob `c054bdb50f8d5beafcbdbf48d66cd0cdadfc2cdc`

3. North America — Metate + Metlapil / Teotitlán del Valle
   - `families/metate-teotitlan/candidate.html`
   - build `f62e6c2d2371205bdae4f498fe2f7670e17f09bd`
   - blob `8252beecb7ac6e7c1146cdb092813c2d5cb8a880`

4. South America — Valparaíso Funicular / Chile
   - `families/funicular-valparaiso/candidate.html`
   - build `7aff21b59ff88fcbe3e526958cf9fdf67c0d3750`
   - blob `1e71497d7f9f5411eca2347b36bc0402db8b905b`

5. South America — Mate + Bombilla / Argentina + regional context
   - `families/mate-bombilla-argentina/candidate.html`
   - build `6b1a12b166b3be5612ba5b1d5a1f731281186379`
   - blob `6bdebcff2bd3c2b8c57f0c75dc72b20fcba37d55`

6. Oceania — Tongiaki / Tonga
   - `families/tongiaki-tonga/candidate.html`
   - build `e577bd6669c0d32f41078fa3124a03539cecd460`
   - blob `55053022e5312274a250a3384a28c07abdcb2f6f`

7. Oceania — Garamut / East Sepik-Ramu PNG
   - `families/garamut-sepik-ramu/candidate.html`
   - build `acb90a987f17c35ee94828f9433f5dd0055a0609`
   - blob `d78ec124d1111ba6a82137b58c0922fa7fdc1a36`

8. Europe — Catoptric Anamorphosis / Paris-France
   - `families/anamorphosis-paris/candidate.html`
   - build `a1e4ab388a1c75c4a90350d19a22ca478a43dc7d`
   - blob `ee44725b47b38079b3264f64e3fd0eb7c3837609`

9. Europe — Swiss Cylinder Music Box / Sainte-Croix
   - `families/music-box-sainte-croix/candidate.html`
   - spec `988c2d0b9878008500aaf29a68107e171f2e03ca`
   - build `c8c1af1afe7c9e9ff8cce8efc68ce3094976fe97`
   - blob `1f07e969dea9a47ec591afe835766f1d2443e427`

All nine:
# `SOURCE PASS / FULL PREVIEW PRESENT / USER VISUAL OR VISUAL+AUDIO PENDING`

# B2.4A-R2 — FULL PREVIEW RECOVERED

Register:
`CONTINENTAL_BALANCE_B2_4A_R2_FULL_PREVIEW_RECOVERED.md`
Register commit:
`40570955ae412db10361935d980c36ebb034eed7`

Vercel project:
- Project ID `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
- Team ID `team_twDc66jGM0sPvNM4I5Huc0x7`

Full-queue Preview:
- deployment `dpl_AQ5B2Wmn6VMH1qczrAsDVUVuHuCw`
- URL `https://relational-key-collectionrelational-key-collection-1wq2g2b7e.vercel.app`
- state `READY`
- deployed SHA `0ddd5ad598cf79782acf32aa79fe65463765c4a5`
- branch `collection/global-refinement-1`

Ancestry proof:
- Music Box build `c8c1af1...` → deployed head `0ddd5ad...`
- deployed head is ahead by 10 / behind 0
- therefore all nine candidate builds are present.

Automated route probes:
- Astrolabe candidate → Vercel SSO `302`
- Swiss Music Box candidate → Vercel SSO `302`

Classification:
# **FULL PREVIEW READY / AUTOMATED SUBROUTE FETCHES SSO-AUTH BLOCKED**

This is not a build failure and not a missing-route verdict. User-browser walkthrough is now the required evidence layer.

# VERCEL ROOT CAUSE DISCOVERED

The same GitHub repo `Faadil1/relational-key-three-poc` is still Git-linked to four Vercel projects:
1. canonical collection `prj_MzOjapRX1t2Gfcl7xJCVWtKtQFny`
2. Boulle `prj_1u0bwUIMeY1fB9trbA4sccHfRKAb`
3. Hika Ahi `prj_bxE1WIkaiKvyGG9vP7SrvrMxTmTj`
4. Siku `prj_sVSWA4YxfvqtJm0yAzUYIegeyM9Z`

A single Git push can therefore create multiple Vercel build attempts and consume Hobby build capacity faster than intended.

Preferred correction after current validation:
- retain Git integration only on the canonical collection project;
- disconnect Git from Boulle/Hika/Siku while preserving their existing deployments as golden references;
- alternatively disable automatic deployments on those legacy projects.

# NEXT EXACT OUTPUT

# **B2.4B — USER WALKTHROUGH GROUP A**

Group A:
1. Astrolabe
2. Janney
3. Metate

Issue independent PASS / PATCH / REJECT per candidate.
Do not increment any validated count until the corresponding user gate passes.

# G4 POLISH — PARKED

Khipu reversible candidate preserved:
`families/khipu-peru/g4-1.html`
implementation `64647ea78b04439ea9a57ece47f19490d9185d45`

After validated 24-family equilibrium:
B2.5 24-family collection regression → G4 polish → G5 cohesion → G6 final validation.

# PERSISTENCE PROTOCOL — MANDATORY

After every meaningful milestone:
1. dedicated register;
2. update CURRENT_STATE;
3. update HANDOVER;
4. exact branch/commit/blob/deployment IDs;
5. SOURCE/LIVE/USER/VALIDATED separated;
6. exactly one next output.
