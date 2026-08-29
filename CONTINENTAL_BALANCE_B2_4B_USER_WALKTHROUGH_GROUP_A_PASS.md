# RELATIONAL KEY — B2.4B USER WALKTHROUGH GROUP A

Date: 2026-08-29
Branch: `collection/global-refinement-1`
Audit deployment: `dpl_AQ5B2Wmn6VMH1qczrAsDVUVuHuCw`
Audit URL: `https://relational-key-collectionrelational-key-collection-1wq2g2b7e.vercel.app`
Deployed SHA: `0ddd5ad598cf79782acf32aa79fe65463765c4a5`

# Evidence

User recording:
`c21ae326-0425-451f-8c85-e78081da4eee.mp4`

Observed metadata:
- duration: ~71.53 s
- resolution: 1902 × 960
- frame rate: 30 fps

One continuous browser walkthrough covered the three Group A candidates. Verdicts below are independent; no bulk-pass is inferred.

# 1 — ASTROLABE / ISFAHAN

Route:
`/families/astrolabe-isfahan/candidate.html`

Required law:
`RELATIVE ROTATION BETWEEN STAR MAP AND HORIZON PRODUCES A CELESTIAL READING.`

Observed:
- the Star Map and Horizon remain two visibly distinct relational members;
- relative rotation is visibly manipulated and changes their registration;
- `LOCAL HORIZON` is shown;
- `OTHER HORIZON` is then shown as a second valid context;
- the second context changes the relation without invalidating either member;
- no third central object takes over the product;
- no clipping, broken layout or visible interaction failure was observed in the desktop recording.

Verdict:
# **PASS**

This user gate validates Astrolabe for Balance Gate 2 membership.

Non-blocking note for later collection polish/regression only:
- bottom control/microcopy hierarchy is intentionally restrained and can be rechecked at final 24-family scale; it is not a current blocker.

# 2 — JANNEY / VIRGINIA

Route:
`/families/coupler-virginia/candidate.html`

Required law:
`CONTACT → PIVOT → LATCH → LOAD PATH`
with valid alternate state:
`BOTH KNUCKLES CLOSED → CONTACT WITHOUT COUPLING`

Observed:
- `COUPLING READY` starts with two independent heads;
- contact visibly initiates the knuckle/pivot relation;
- the coupled state visibly resolves into one continuous load path across both members;
- `BOTH KNUCKLES CLOSED` is explicitly exercised afterward;
- the closed-head state shows bumper/contact without coupling rather than an error state;
- explanatory copy confirms both couplers remain valid;
- reset/retest controls remain available and the alternate state does not rewrite the pair into a third object.

Verdict:
# **PASS**

This user gate validates Janney for Balance Gate 2 membership.

# 3 — METATE + METLAPIL / TEOTITLÁN DEL VALLE

Route:
`/families/metate-teotitlan/candidate.html`

Required law:
`PRESSURE AND RECIPROCAL STROKE BETWEEN COMPLEMENTARY STONES PRODUCE GRINDING.`

Observed:
- Metate and Metlapil remain visibly distinct members;
- pairing/contact alone does not complete the transformation;
- the user directly drags the Metlapil through repeated reciprocal strokes;
- progress is credited through repeated passes and the represented material visibly progresses toward finer state;
- MAIZE is demonstrated through multiple passes up to a fine state;
- CACAO is selected as a second valid context, reset to coarse, paired again, then worked through reciprocal passes;
- the context switch changes represented material while preserving the same relation law;
- no invalid/wrong-material state is introduced;
- no visible clipping or interaction failure was observed in the desktop recording.

Verdict:
# **PASS**

This user gate validates Metate + Metlapil for Balance Gate 2 membership.

# Independent closeout

Astrolabe / Isfahan: **PASS**
Janney / Virginia: **PASS**
Metate + Metlapil / Teotitlán del Valle: **PASS**

# Validated continental distribution after B2.4B

Before:
`AFRICA 4 / ASIA 3 / NORTH AMERICA 2 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

After applying only the three independent PASS verdicts above:
# `AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Asia is now validated at `4/4`.
North America is now validated at `4/4`.

The remaining six existing Balance-Gate candidates are still pending user validation:
- Valparaíso Funicular
- Mate + Bombilla
- Tongiaki
- Garamut
- Catoptric Anamorphosis
- Swiss Cylinder Music Box

# Scope limitation

This is a desktop user-mechanism gate. Final collection-level responsive regression, including the explicit true ~390 px check, remains reserved for B2.5 / final collection validation.

# Next exact gate

# **B2.4C — USER WALKTHROUGH GROUP B**

1. Valparaíso Funicular / Chile
2. Mate + Bombilla / Argentina
3. Tongiaki / Tonga

Issue an independent PASS / PATCH / REJECT for each.

Product invariant:
# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**
