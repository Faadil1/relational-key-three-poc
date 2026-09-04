# RELATIONAL KEY — R5.10A SIGNAL / NIGERIA — LANLATE / REPEATER AUDIT

Date: 2026-09-04
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`
Baseline: ADEQUATE.

## Existing state
Promoted Signal EXP-3 is already relationally valid and Nigeria-specific at the archival identity layer. Its memorable event is still carried mainly by a generic center arc labeled `EARTH STATION → RELAY → LINK CONTINUES`, so the relay consequence is not yet embodied strongly enough for R5 STRONG.

## Source basis
1. National Library of Nigeria repository / Federal development documentation:
- Lanlate Earth Station is described with three repeater stations at Ikorodu, Ogido and Alabata.
- The system is described as improving international telephone, telegraph, telex, leased circuits and data transmission between Nigeria and the outside world.
- Satellite reception / transmission is documented in the same section.

2. World Bank — Nigeria telecommunications project documentation:
- `Space Communication`: rehabilitation of STD-A earth station at Lanlate.
- `Transmission`: digital microwave routes are documented as part of the national transmission system.

3. Bureau of Public Enterprises — NITEL background:
- NITEL historically provided long-distance carrier and satellite services.
- NITEL resulted from the merger of P&T telecommunications operations and Nigerian External Telecommunications.

## R5 mechanism decision
# **LANLATE EARTH STATION → REPEATER CHAIN → CARRIED LINK**

Law:
`BEAM → DISH FOCUS → FEED CAPTURE → IKORODU → OGIDO → ALABATA → LINK CARRIED`

### Card A
Archive-led NITEL / Nigerian external-communications signal object centered on a Lanlate earth-station dish / feed field.

### Card B
Archive-led terrestrial relay object with three distinct repeater nodes named from the documented chain:
`IKORODU → OGIDO → ALABATA`.

### MATCHING
- both members exist before relation;
- a satellite-beam cue reaches the dish;
- the dish focuses to a feed point;
- a carried signal leaves Card A only after feed capture;
- the three documented repeater nodes register sequentially inside Card B;
- final state is retained inside Card B as a completed carried-link field.

### OTHER
- earth station remains a valid member;
- repeater chain remains a valid member;
- signal reaches the chain but one editorial handoff is vertically displaced;
- upstream nodes remain registered;
- downstream continuity does not complete;
- both members remain valid and the residual is local to the relation.

## Truth boundary
This is an editorial infrastructure visualization grounded in documented Nigerian earth-station and repeater-station evidence.

The following are illustrative and are NOT claimed as exact historical engineering topology or operating procedure:
- geographic spacing / map geometry;
- antenna geometry and pointing;
- microwave frequencies or channel allocations;
- hop timing, signal strength and propagation behavior;
- exact physical appearance of repeater equipment;
- exact routing between named facilities.

The names Lanlate, Ikorodu, Ogido and Alabata are used only because the archival source explicitly associates those repeater stations with the Lanlate Earth Station system.

## R5.10A verdict
- RELATIONAL / CAUSAL direction: PASS
- VISUAL / PLACE / MATERIAL specificity: PASS direction
- TRUTH boundary: PASS
- EMBODIMENT-STRONG: candidate hypothesis only; USER proof required

## Exact next gate
# **R5.10B — BUILD ISOLATED SIGNAL / NIGERIA CANDIDATE**

Build `families/signal-nigeria/r5-10.html` without touching the public Signal wrapper or `families/_shared/round13r/index.html`. Require LIVE READY and then one MATCHING + OTHER USER regression before any promotion or ADEQUATE → STRONG reclassification.
