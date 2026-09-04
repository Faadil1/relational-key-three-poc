# RELATIONAL KEY — G4.2 KENTO POLISH CANDIDATE — SOURCE PASS

Date: 2026-09-02
Branch: `collection/global-refinement-1`
PR: #21 — `DRAFT / DO NOT MERGE`
Family: Japan / Kento — Kento Register

# PRODUCT RULE

**THE RELATIONAL PAIR REMAINS THE PRODUCT.**

`BLOCK MEMBER → REGISTRATION RELATION → PAPER / IMAGE RESPONSE`

Polish rule:
**POLISH MUST INCREASE LEGIBILITY WITHOUT REWRITING THE RELATIONSHIP.**

# RE-AUDIT VERDICT

The documented G4.2 debt is still reproduced by the current golden and the completed B2.5 USER regression.

Golden source characteristics:
- `kagi` base size: 24 × 24 px;
- `hikitsuki` base size: 32 × 3 px;
- OTHER BLOCK colour layer displacement: `translate(15px,-9px)`;
- B2.5 USER classification: `PASS / ADEQUATE` with note that layer-displacement hierarchy can improve.

This is a legibility debt only. Kento relational integrity remains PASS.

# GOLDEN PRESERVATION

Golden mechanism source remains unchanged:
`families/kento-japan/snapshot.html`

Public wrapper remains unchanged:
`families/kento-japan/index.html`

No public promotion has occurred.

# REVERSIBLE CANDIDATE

Candidate route:
`families/kento-japan/g4-2.html`

Implementation commit:
`42d546294fefcb79131a3a28b33fa7352f334a38`

Implementation scope is one new file only. The candidate loads the unchanged `snapshot.html` and injects CSS after load.

No JavaScript, timing, button logic, drag behavior, MATCHING semantics, OTHER semantics, source imagery, or public wrapper behavior is changed.

# CSS-ONLY POLISH

## Kento registration-mark hierarchy
- kento edge field: 46×86 → 52×92 px;
- kagi: 24×24 → 28×28 px;
- kagi stroke: 3 → 4 px;
- hikitsuki: 32×3 → 37×4 px;
- active registration glow increased slightly only during align / press / registered states.

Intent: make `kagi / hikitsuki` readable at collection-view scale without turning them into decorative hero graphics.

## OTHER BLOCK misregistration hierarchy
- colour-layer displacement: `15,-9` → `22,-13` px;
- colour layer remains recognizably the same valid print field;
- offset guide marks become 3 px with slightly larger separation and opacity.

Intent: make printing misregistration immediately readable from a distant desktop view, not convert mismatch into generic failure UI.

# NON-NEGOTIABLES

MATCHING must continue to read as:
`BLOCK → APPROACH → ALIGN → PRESS → REGISTER → PRINT`

OTHER BLOCK must continue to read as printing misregistration.

The central register remains subordinate to the two cards.

# SOURCE / LIVE / USER / VALIDATED SEPARATION

- SOURCE golden integrity: PASS / unchanged
- SOURCE candidate: PASS
- LIVE candidate deployment: READY
- USER candidate comparison: PENDING
- RELATIONAL INTEGRITY: PASS unchanged
- VALIDATED family count: 24 unchanged

READY deployment:
`dpl_6JN1FKFnDU8J2aPR3SmKaHsmUtdT`

Deployed commit:
`42d546294fefcb79131a3a28b33fa7352f334a38`

Preview:
`https://relational-key-collectionrelational-key-collection-7jywaxzav.vercel.app/families/kento-japan/g4-2.html?_vercel_share=4Qhk8zqwXTrcKeRvWTIFhAqg53wU4bnj`

# NEXT EXACT GATE

# **G4.2A — KENTO LIVE USER CANDIDATE REGRESSION / GOLDEN VS POLISH**

USER proof only:
1. MATCHING BLOCK → TEST REGISTRATION;
2. hold registered state briefly;
3. OTHER BLOCK → TEST REGISTRATION;
4. hold misregistration state briefly.

PASS criteria:
- `kagi / hikitsuki` easier to perceive but remain edge registration marks;
- OTHER colour-layer displacement is easier to read;
- center register does not become dominant;
- both cards remain distinct and valid;
- matching still means print registration;
- OTHER still means print misregistration.

If PASS: promote the CSS-only treatment through the public Kento wrapper while preserving `snapshot.html` as golden.
If not: revise or abandon the isolated candidate.

Do not start G4.3 Siku before G4.2A closes.
