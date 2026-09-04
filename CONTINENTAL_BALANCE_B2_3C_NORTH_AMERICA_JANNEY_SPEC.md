# RELATIONAL KEY — CONTINENTAL BALANCE B2.3C

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Promotion matrix: `CONTINENTAL_BALANCE_B2_2D_NORTH_AMERICA_PROMOTION_MATRIX.md`

# NORTH AMERICA FAMILY ROUND 1 — JANNEY AUTOMATIC RAIL COUPLER

## Status

# `SOURCE PASS / INTERACTION SPEC FROZEN / BUILD CANDIDATE NEXT`

This family is promoted for build research but is **not yet validated**. North America remains `2 / 4` until independent live/user gates pass.

## Geography

- place: **Alexandria, Virginia, United States**
- continent: **North America**
- historical anchor: Eli H. Janney's 1873 U.S. car-coupling patent + Smithsonian Janney coupler objects/models.

## Working family identity

Memory family:
# **Coupling / Rail Memory**

Working edition:
# **Knuckle Register**

Working slug:
`coupler-virginia`

## Source anchors

### Original mechanism source

Eli H. Janney, U.S. Patent 138,405, `Improvement in car-couplings`, patented April 29, 1873.

https://patents.google.com/patent/US138405A/en

Relevant documented behavior:
- coupling heads include a hook/knuckle, catch and guard arm;
- compatible heads guide/interlock as cars approach;
- the system couples readily when at least one hook is open;
- it does **not** couple if both hooks are closed;
- guard-arm geometry can act as bumper/contact in that closed configuration;
- a lever releases the hooked relation for uncoupling.

### Museum anchors

Smithsonian National Museum of American History:
- Janney Coupler model, ca. 1870: https://americanhistory.si.edu/collections/object/nmah_881750
- Janney rail coupler: https://americanhistory.si.edu/collections/object/nmah_841985
- related rail coupler: https://americanhistory.si.edu/collections/object/nmah_843236

USPTO type definition:
https://www.uspto.gov/web/patents/classification/uspc213/defs213.pdf

## Truthfulness boundary

RELATIONAL KEY translates the documented **coupler-head ↔ coupler-head engagement law**.

It is not:
- a complete rail-car dynamics simulation;
- an engineering certification model;
- a load-rating calculator;
- a reconstruction of every later AAR/Janney derivative.

Use the 1873 mechanism as the primary structural law and state that the prototype is a simplified interaction translation.

## Family-native law

# **MATING KNUCKLES TURN CONTACT INTO A LOCKED LOAD PATH.**

Compact proof:
# `HEAD A ≠ HEAD B → CONTACT → PIVOT → LATCH → LOAD PATH`

Working signature:
`READY → APPROACH → GUIDE → KNUCKLE → LATCH → LOAD → RELEASE → CONTINUE`

## The two members

### Card A — COUPLER HEAD A

Owns:
- cast coupling-head body;
- guard arm;
- pivoting knuckle;
- knuckle pin / pivot cue;
- readiness state.

### Card B — COUPLER HEAD B

Owns the mirrored counterpart:
- coupling-head body;
- guard arm;
- pivoting knuckle;
- pivot cue;
- readiness state.

Both cards must remain equally bounded and equally important.

No receiver/background hierarchy.

## Center / gap rule

The center may contain only:
- the temporary contact seam;
- interlocked knuckle overlap;
- restrained load-path cue after latch.

The center must NOT become:
- a third coupler;
- a glowing connection badge;
- a large result panel;
- a train-car illustration that visually replaces the pair.

# `THE PAIR REMAINS THE PRODUCT.`

## Interaction architecture

### Phase 0 — READY / OFFSET

Two coupling heads are separated.

Default preparation:
- Card A knuckle open;
- Card B can remain closed or partly ready according to simplified patent-derived geometry.

Copy:
`TWO COUPLERS · NO LOAD PATH`

### Phase 1 — APPROACH

Cards move toward one another.

Guard/head geometry begins to guide contact.

Copy:
`APPROACH · CONTACT GEOMETRY ACTIVE`

### Phase 2 — GUIDE / CONTACT

The open knuckle receives/contacts the opposing head.

No latch result yet.

Copy:
`CONTACT TURNS TRANSLATION INTO PIVOT`

### Phase 3 — KNUCKLE PIVOT

Contact visibly rotates the open knuckle toward closed position.

This pivot must belong visually to its card, not to the center.

### Phase 4 — LATCH

The knuckle reaches coupled position and a small locking/latch cue settles.

Copy:
`KNUCKLE CLOSED · LATCH HOLDS`

### Phase 5 — LOAD PATH

Apply a restrained pull-apart test:
- both cards shift outward by a few pixels;
- engaged knuckles hold;
- load cue runs through both members;
- no center explosion/glow.

Copy:
`ENGAGED · LOAD TRANSFERS THROUGH BOTH HEADS`

### Phase 6 — RELEASE

A release control lifts/unlocks the latch and allows the knuckle to reopen/separate.

Copy:
`RELEASE → INDEPENDENT COUPLERS RESTORED`

## MATCH / OTHER semantics

Do not use `MATCHING` / `WRONG`.

Use historically grounded preparation states:

### `COUPLING READY`

At least one knuckle open.

Result:
`CONTACT → PIVOT → LATCH`

### `BOTH KNUCKLES CLOSED`

Patent-derived non-coupling state.

Result:
- heads approach;
- guard/head surfaces meet as bumper/contact geometry;
- no latch occurs;
- both couplers remain intact and valid;
- state reads `CLOSED HEADS · CONTACT WITHOUT COUPLING`.

This is a first-class alternate valid relationship, not a failure screen.

## Motion language

Primary motions:
- horizontal approach;
- mirrored/one-sided knuckle pivot;
- subtle latch settle;
- restrained outward load test;
- controlled release.

Avoid:
- sparks;
- train impact spectacle;
- collision shake;
- steam/smoke nostalgia;
- gamified success bursts.

The interaction should read like a mechanical relationship study.

## Visual language

### Source-led geometry

Derive from:
- 1873 patent plan-view logic;
- Smithsonian coupler/model silhouettes;
- cast-metal industrial forms.

Recommended palette:
- blackened iron / charcoal;
- worn graphite highlights;
- restrained warm rust-brown or brass only for pivot/latch evidence;
- off-white drafting/patent line cues.

Do not use railroad-company branding or patriotic U.S. colors.

### Cultural/historical specificity

Specificity comes from:
- Janney knuckle/guard-arm geometry;
- patent-era mechanical logic;
- North American rail coupling history.

Not from:
- American flags;
- locomotive nostalgia;
- generic industrial rivets as decoration.

## Text hierarchy

Suggested top line:
`ALEXANDRIA · JANNEY CAR COUPLING · 1873 STRUCTURAL TRANSLATION`

Headline candidate:
`Two coupling heads become one load path.`

Card roles:
- `CARD A · COUPLER HEAD / OPEN KNUCKLE`
- `CARD B · COUPLER HEAD / MATING GEOMETRY`

## Anti-duplication test

This family must not reduce to Zellige-like passive fit or generic "two shapes match."

Novel proof:
1. contact causes rotational state change;
2. a latch holds the new state;
3. engagement changes structural capability by transferring pull load;
4. release reverses the relationship;
5. both-closed state produces valid contact without coupling.

## Build gate requirements

Before user visual gate:
- two bounded coupler heads remain primary;
- knuckle pivot clearly belongs to a card;
- approach/pivot/latch/load phases readable;
- `COUPLING READY` and `BOTH KNUCKLES CLOSED` both implemented;
- closed/closed state does not show error or invalidate either member;
- release restores separation;
- patent/museum source footer visible;
- structural-translation disclaimer visible;
- narrow layout usable without converting pair into a vertical result widget;
- no existing validated family/atlas/registry modified.

## Candidate architecture

New autonomous candidate:
`families/coupler-virginia/candidate.html`

Do not add to public atlas or validated registry before independent gates pass.

## Next output

# **B2.3D — JANNEY COUPLER BUILD CANDIDATE**
