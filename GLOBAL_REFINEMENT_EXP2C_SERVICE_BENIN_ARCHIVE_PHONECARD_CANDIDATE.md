# GLOBAL REFINEMENT — EXP-2C SERVICE / BENIN ARCHIVE-LEAD PHONECARD CANDIDATE

Date: 2026-09-02
Branch: `collection/global-refinement-1`
PR #21: DRAFT / DO NOT MERGE

## USER correction

Uploaded EXP-2B recording:
- 9.6 s
- 1906 × 962
- 30 fps

Verdict:
# `CAUSAL PASS / VISUAL FAIL — REVISE`

EXP-2B improved telecom legibility but still read as a generic green interface rather than a Benin archival telecommunications object.

## Source re-audit

Official Archives nationales du Bénin:
- Série J covers posts, telephone links, transmissions, and organization/functioning of posts and telecommunications services.

Documented Benin phonecard catalogue markers include:
- PTT / OPT
- 25 / 50 / 120 UNITÉS
- SERVICES PLUS
- RENVOI TEMPORAIRE
- CONFÉRENCE À TROIS
- COMPOSITION ABRÉGÉE
- telephone tariffs
- Francophonie summit / Cotonou 1995 cards
- prepaid/recharge card serial grammar

Observed Nàsuba card markers include:
- OPT Bénin
- CEDEAO / ECOWAS
- CARTE PRÉPAYÉE INTERNATIONALE
- 5 000 CFA
- dense artifact-level card graphics

Decision:
# visual provenance must come from the documented phonecard/archive object grammar, not generic regional styling.

## EXP-2C candidate

Path:
`families/service-benin/exp-2c.html`

Implementation commit:
`d8c814a0414b55396876f6527f162b151ad66e33`

Architecture:
- loads `families/service-benin/exp-2.html` directly;
- does NOT inherit EXP-2B;
- keeps EXP-2 causal step-handoff mechanism unchanged;
- shared runtime remains untouched;
- public Service wrapper remains untouched.

Visual system:
- worn ivory smartcard / phonecard substrate rather than dashboard blocks;
- prominent `BÉNIN` artifact identity;
- PTT / OPT editorial provenance labels;
- `SÉRIE J · POSTES · LIAISONS TÉLÉPHONIQUES · TRANSMISSIONS`;
- gold smartcard contact chip;
- 50 / 120 UNITÉS;
- COMPOSITION ABRÉGÉE;
- SERVICES PLUS;
- RENVOI TEMPORAIRE;
- CONFÉRENCE À TROIS;
- COTONOU;
- +229;
- serial / register / archive-study fields;
- restrained Benin green / yellow / red edge rail.

Truth boundary:
`Synthèse éditoriale de marqueurs documentés de télécartes et services téléphoniques béninois · pas une réplique ni une procédure actuelle.`

## LIVE

Deployment:
`dpl_8CLm4dcyBtzsGJTLiqyXsP8G32Xs`

State:
READY

Exact deployed commit:
`d8c814a0414b55396876f6527f162b151ad66e33`

Preview:
`https://relational-key-collectionrelational-key-collection-k46w5ws8t.vercel.app/families/service-benin/exp-2c.html?_vercel_share=kS5SFekdMBMcGV990tppC6gwwN0fNqjH`

## State separation

- SOURCE shared runtime: PASS / unchanged
- SOURCE Service public wrapper: PASS / unchanged
- USER EXP-2B causal: PASS
- USER EXP-2B visual identity: FAIL / REVISE
- SOURCE EXP-2C: PASS
- LIVE EXP-2C: READY / PASS
- USER EXP-2C: PENDING
- RELATIONAL INTEGRITY: PASS unchanged
- VALIDATED: 24 unchanged

## ACTIVE GATE

# `EXP-2C — SERVICE / BENIN ARCHIVE-IDENTITY USER REGRESSION`

Judge separately:
1. causal 01→02→03→04 handoff remains pair-owned;
2. object now reads as a Benin PTT/OPT-era telecommunications archive/phonecard system rather than a generic modern UI;
3. historical markers remain editorial synthesis, not a false exact replica.

Do not promote Service until USER visual PASS.
Do not start Signal EXP-3 until Service closes.