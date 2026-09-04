# RELATIONAL KEY — CONTINENTAL BALANCE B2.3J

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Spec: `CONTINENTAL_BALANCE_B2_3I_SOUTH_AMERICA_MATE_BOMBILLA_SPEC.md`

# SOUTH AMERICA FAMILY ROUND 2 — MATE + BOMBILLA BUILD CANDIDATE

Status:
# **SOURCE PASS / LIVE + USER VISUAL GATE PENDING**

Validated South America remains:
# `2 / 4`

No atlas, registry, public-route or validated-count mutation occurs at this gate.

# Candidate

Path:
`families/mate-bombilla-argentina/candidate.html`

Implementation commit:
# `6b1a12b166b3be5612ba5b1d5a1f731281186379`

Candidate blob:
# `6bdebcff2bd3c2b8c57f0c75dc72b20fcba37d55`

Implementation compare:
- base `ffde9f041a81c6ec603b71ee8b6a5516d1a8b8cd`
- head `6b1a12b166b3be5612ba5b1d5a1f731281186379`
- one commit ahead;
- only `families/mate-bombilla-argentina/candidate.html` added;
- 51 additions / 0 deletions.

The GitHub candidate blob matches byte-for-byte the locally checked candidate used for JavaScript syntax validation.

# Law implemented

# **A SUBMERGED BOMBILLA ALLOWS INFUSION TO PASS WHILE YERBA REMAINS IN THE MATE.**

Implemented relation:

`MATE ≠ BOMBILLA → INSERT → FILTER SUBMERGED → HOLD/DRAW → LIQUID PATH ACTIVE / YERBA REMAINS → RELEASE → CONTINUE`

# Pair architecture

Card A:
- Mate vessel;
- represented infusion field;
- particulate yerba field;
- local submerged-filter cue.

Card B:
- Bombilla / mate-strainer;
- visible filter end;
- visible tube;
- internal represented flow path;
- direct hold input.

Center:
- minimal insertion/relation cue only.

No mouth, person, finished drink, filter machine or third hero object exists.

# Interaction proof

## Separate

First frame:
- Mate and Bombilla are both visible and bounded;
- no represented flow exists.

## Insert

`INSERT BOMBILLA`:
- enters an approach state;
- after a restrained 650 ms spatial insertion, reaches `FILTER SUBMERGED`;
- insertion alone produces NO flow;
- user is explicitly told direct input is still required.

## Sustained draw

Primary pointer/touch input:
- pointerdown on inserted Bombilla starts DRAW;
- Bombilla captures pointer;
- `.drawing` relation state starts restrained internal flow markers;
- pointerup stops flow;
- pointercancel stops flow;
- lost pointer capture also stops flow.

This prevents a one-click autonomous flow sequence.

Keyboard fallback:
- Space or Enter keydown starts draw;
- repeated keydown is ignored;
- keyup stops draw;
- blur also stops draw.

## Selective-passage visual proof

During DRAW:
- small flow markers animate only along the Bombilla tube;
- particulate yerba elements remain in Card A;
- local filter-zone emphasis increases;
- no particle is shown escaping into a third result field.

On RELEASE:
- flow animation stops immediately;
- Bombilla remains inserted;
- relation is ready to continue;
- no success/failure terminal state is created.

## Reset

`RESET`:
- clears pending insertion timer;
- stops drawing;
- removes inserted/drawing states;
- separates Bombilla from Mate;
- restores initial labels and flow-free state.

# Truthfulness treatment

Footer:
`STRUCTURAL TRANSLATION · MATE VESSEL ↔ BOMBILLA FILTERING SUBSYSTEM · NOT THE FULL SOCIAL PRACTICE · NOT A HYDRAULIC OR PHYSIOLOGICAL MODEL`

Source footer anchors:
- Argentina national cultural-heritage inventory for mate;
- British Museum bombilla taxonomy (`mate-strainer`);
- Smithsonian NMAI South American bombilla object evidence.

The candidate explicitly says Argentina is the primary documentary context, not an exclusivity claim for the regional practice.

No flags, national-color skinning, gaucho imagery or copied Indigenous motifs are used.

# Responsive source design

Breakpoints:
- `820px`
- `580px`

At narrow widths source CSS:
- retains both source cards simultaneously;
- reduces the center gap;
- resizes Bombilla;
- keeps Bombilla a large hold target;
- keeps flow local to Mate/Bombilla relation.

Actual responsive visual PASS remains a live/user gate.

# Source checks

Passed:
- autonomous single-file candidate;
- diff limited to candidate file;
- both bounded members visible from first frame;
- insert creates relation without flow;
- sustained pointer/touch hold creates flow;
- release/cancel/lost capture stops flow;
- keyboard hold fallback implemented;
- flow stays inside Bombilla/source-vessel relation;
- yerba stays Card A content;
- no third hero / no final success state;
- reset separates/restores;
- regional/non-exclusive source disclaimer present;
- responsive CSS present;
- locally extracted JavaScript passes `node --check`;
- local checked file Git blob = GitHub candidate blob `6bdebcff2bd3c2b8c57f0c75dc72b20fcba37d55`.

Not yet claimed:
- no live Preview confirmed;
- no user insertion/hold audit;
- no responsive visual PASS;
- no public route or atlas entry;
- South America count is NOT 3/4 or 4/4 yet.

# Gate verdict

# **B2.3J — SOURCE PASS**

Validated South America remains `2 / 4`.

# Next output

# **B2.2G — OCEANIA +2 SOURCE-FIRST CANDIDATE POOL**

Existing Oceania mechanisms to avoid duplicating:
- Marshall Islands / Swell — environmental interaction / swell deflection;
- Aotearoa / Hika Ahi — sustained friction / emergent ember.

Research at least six credible source-grounded candidates before promoting two.
