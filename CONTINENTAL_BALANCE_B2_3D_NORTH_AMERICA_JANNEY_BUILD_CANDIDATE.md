# RELATIONAL KEY — CONTINENTAL BALANCE B2.3D

Date: 2026-08-28
Branch: `collection/global-refinement-1`
PR: #21 — `DRAFT / DO NOT MERGE`
Parent spec: `CONTINENTAL_BALANCE_B2_3C_NORTH_AMERICA_JANNEY_SPEC.md`

# JANNEY COUPLER BUILD CANDIDATE

## Status

# `SOURCE PASS / LIVE + USER VISUAL GATE PENDING`

This candidate is not yet a validated family. North America remains **2 / 4** until independent live/user gates pass.

## Candidate

Path:
`families/coupler-virginia/candidate.html`

Implementation commit:
`fa561bf4ebb20becaaee81856dc59f81b1e8b4c6`

Current candidate blob:
`c054bdb50f8d5beafcbdbf48d66cd0cdadfc2cdc`

## Atomic source compare

Compare from frozen Janney spec commit:
`f3fa349cf2b2bafced05e42f779b104a7d0c7bb1`

to build commit:
`fa561bf4ebb20becaaee81856dc59f81b1e8b4c6`

Result:
- one new file only: `families/coupler-virginia/candidate.html`;
- 108 additions / 0 deletions;
- no existing validated family, atlas, registry or public route changed.

## Verified pair architecture

### Card A
`COUPLER HEAD / KNUCKLE`

Owns:
- body geometry;
- guard arm;
- pivoting knuckle;
- pivot pin;
- latch cue;
- load-path segment.

### Card B
`COUPLER HEAD / MATING GEOMETRY`

Owns the mirrored corresponding geometry.

Both remain bounded and visually equivalent members.

The bridge contains only:
- contact crosshair/seam cue;
- restrained relation label.

No third coupler/result object is created.

## Verified interaction states

### `COUPLING READY`

Sequence:
`APPROACH → CONTACT → PIVOT → LATCH → LOAD PATH`

Timing in candidate:
- contact: 520 ms;
- pivot: 1030 ms;
- latch: 1580 ms;
- load path: 2180 ms.

The open Card A knuckle rotates closed through CSS state transition; the latch settles; a restrained outward load test follows.

### `BOTH KNUCKLES CLOSED`

Sequence:
`APPROACH → BUMPER CONTACT → NO LATCH`

The state is explicitly described as:
`CLOSED HEADS · CONTACT WITHOUT COUPLING`

Both couplers remain valid; no failure/error styling is used.

This preserves the patent-derived alternate state specified in B2.3C.

### Release

`RELEASE LATCH` is enabled only after a coupled/load state.

Release clears the latch relation, reopens the Card A knuckle and returns to independent reusable couplers.

## Truthfulness / source framing

Visible truth line:
`STRUCTURAL TRANSLATION · JANNEY 1873 COUPLING LAW · NOT AN ENGINEERING LOAD-RATING MODEL`

Visible source footer names:
- Eli H. Janney U.S. Patent 138,405 (1873);
- National Museum of American History Janney coupler objects/models;
- U.S. Patent and Trademark Office Janney-type classification.

The candidate does not claim:
- a complete rail-car dynamics simulation;
- certified load behavior;
- every later Janney/AAR derivative.

## JS source check

The candidate script passed a lightweight `node --check` syntax validation.

State-logic review confirms:
- changing preparation mode calls `resetState()` and clears timers;
- closed mode never schedules latch/load timers;
- release is unavailable from uncoupled/blocked state;
- reset returns knuckle visuals to the chosen preparation state;
- both members retain validity after release or non-coupling contact.

## Responsive source intent

The source contains a narrow breakpoint that:
- stacks the cards;
- rotates the owned coupler diagrams into a vertical contact relationship;
- collapses controls to one column;
- preserves the bridge as a narrow relation zone.

This is only source intent. Visual correctness of the rotated coupler geometry remains to be demonstrated live.

## Family law retained

# **MATING KNUCKLES TURN CONTACT INTO A LOCKED LOAD PATH.**

Signature:
`READY → APPROACH → GUIDE → KNUCKLE → LATCH → LOAD → RELEASE → CONTINUE`

## What remains unverified

Do not infer visual/live PASS from source.

Required user evidence:
1. two coupling heads remain primary before and after approach;
2. knuckle pivot reads clearly as belonging to Card A;
3. latch transition is perceptible without center spectacle;
4. load test reads as restrained structural evidence;
5. `BOTH KNUCKLES CLOSED` visibly contacts without coupling;
6. release returns to independent members;
7. narrow layout preserves understandable coupler orientation;
8. visual language remains patent/industrial rather than train nostalgia.

## Verdict

# `B2.3D SOURCE PASS`

North America validated count remains:
# `2 / 4`

Candidate state:
# `PROMOTED BUILD CANDIDATE / NOT YET VALIDATED`

## Next North America source task

Freeze family-native spec for the second promoted candidate:

# **B2.3E — METATE + METLAPIL SOURCE + INTERACTION SPEC**

Live validation of Janney may run once deployment capacity is available; it is not required to block source-only work on the second North America candidate.
