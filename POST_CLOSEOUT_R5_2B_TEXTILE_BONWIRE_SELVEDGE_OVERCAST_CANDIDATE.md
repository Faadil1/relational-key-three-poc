# RELATIONAL KEY — R5.2B TEXTILE / BONWIRE SELVEDGE OVERCAST JOIN CANDIDATE

Date: 2026-09-03
Repository: `Faadil1/relational-key-three-poc`
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`

# GATE

`R5.2B — TEXTILE / BONWIRE SELVEDGE OVERCAST JOIN ISOLATED CANDIDATE`

# SOURCE AUDIT

Dedicated audit:
`POST_CLOSEOUT_R5_2A_TEXTILE_BONWIRE_SOURCE_MATERIAL_AUDIT.md`
@ `35a8b59a8a258bddfaae8ee456d146c83db65496`.

Source basis includes:
- Metropolitan Museum of Art: narrow loom-woven kente strips, warp under tension, strips sewn together edge-to-edge;
- Victoria and Albert Museum: small double-heddle handloom, narrow handwoven strips, warp-striped / weft-float construction, strips stitched together;
- British Museum: Asante kente composed of narrow strips joined at selvedges by hand-sewn overcast stitch;
- Smithsonian National Museum of African Art: Bonwire Asante narrow-strip kente objects.

# FROZEN LAW

`STRIP → ALIGN → INTERLACE → REGISTER → JOIN → CONTINUE`.

# CANDIDATE MECHANISM

# **SELVEDGE OVERCAST JOIN**

Candidate:
`families/textile-bonwire/r5-2.html`

Final implementation commit:
`4cfdcc56d77da2761ffe8612ec5523ac8149c6b3`

Earlier first-pass candidate commit `3e8908c6...` is superseded because literal template markup was removed before USER testing. Only `4cfdcc56...` is valid R5.2 USER candidate source.

Public wrapper remains unchanged:
`families/textile-bonwire/index.html`
blob `86f6b85796bec16dcb9077ed594a1ec86736b663`.

Shared runtime remains unchanged.

# MEMBER OWNERSHIP

Card A:
- `WOVEN STRIP A`
- `SELVEDGE A`
- Asante narrow-strip surface.

Card B:
- `WOVEN STRIP B`
- `SELVEDGE B`
- Bonwire narrow-strip surface.

Both members are complete woven strips before relation.

# MATCHING

Sequence:
`SELVEDGES ALIGN → OVERCAST STITCHING → SEAM TENSION → REGISTERED SEAM`.

Interaction behavior:
1. Card A and Card B approach while remaining distinct;
2. facing selvedge markers converge;
3. joining thread draws an alternating path across both edges;
4. seam tension follows the completed stitch path;
5. final result `SELVEDGES JOINED · WOVEN WIDTH CONTINUES`;
6. the center only carries thread/seam evidence and remains subordinate.

# OTHER

Process-native residual:
`MISSED / OFFSET OVERCAST`.

Behavior:
- Card B is vertically offset;
- facing edge registration does not resolve;
- joining thread appears as interrupted / dashed missed spans;
- final result `JOIN MISREGISTERS · BOTH WOVEN STRIPS REMAIN VALID`;
- both strips remain independently valid.

# VISUAL / TRUTH

Visual identity uses editorial warp-striped / weft-block textile surfaces and explicit selvedge ownership.
No symbolic meaning is assigned to any color or motif.

Truth boundary:
`Editorial visualization of documented Asante narrow-strip kente construction and selvedge joining · not a pattern facsimile or claim of symbolic motif meaning.`

# LIVE

Deployment:
`dpl_3jaX4XKW52bmdLWE7k1eBDMWmoQ6`

State:
`READY`

Exact deployed commit:
`4cfdcc56d77da2761ffe8612ec5523ac8149c6b3`

Host:
`relational-key-collectionrelational-key-collection-eout0z99l.vercel.app`

Candidate route:
`/families/textile-bonwire/r5-2.html`
verified HTTP 200.

Temporary share base:
`https://relational-key-collectionrelational-key-collection-eout0z99l.vercel.app/?_vercel_share=yM5vZdxbzlAUMd8djNShhxudBFR2lb90`

# STATE SEPARATION

- PRIOR GLOBAL CLOSEOUT: PASS / frozen
- Food R5.1: STRONG / CLOSED
- SOURCE Textile audit: PASS
- SOURCE Textile candidate: PASS
- LIVE Textile candidate: READY / PASS
- USER Textile R5.2: PENDING
- public Textile wrapper: unchanged
- public Textile promotion: NOT STARTED
- shared runtime: unchanged
- VALIDATED: 24
- Textile classification: ADEQUATE unchanged until USER proof
- current matrix: STRONG 14 / ADEQUATE 10 / EXPERIENCE DEBT 0
- PR #21: DRAFT / DO NOT MERGE

# NEXT EXACT GATE

# **R5.2C — TEXTILE / BONWIRE USER MATCHING + OTHER REGRESSION**

Record one ~10–15 s proof:
1. `MATCHING JOIN` → `TEST RELATIONSHIP`;
2. hold final registered seam;
3. `OTHER JOIN` → `TEST RELATIONSHIP`;
4. hold missed / offset overcast residual.

Judge separately:
- CAUSAL / relational integrity;
- EMBODIMENT / STRONG threshold;
- VISUAL / Bonwire-Asante material specificity;
- TRUTH boundary.

Do not promote or reclassify Textile before USER PASS.
