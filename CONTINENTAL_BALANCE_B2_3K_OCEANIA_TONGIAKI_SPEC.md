# RELATIONAL KEY — CONTINENTAL BALANCE B2.3K

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Promotion matrix: `CONTINENTAL_BALANCE_B2_2H_OCEANIA_PROMOTION_MATRIX.md`

# OCEANIA FAMILY ROUND 1 — TONGIAKI DOUBLE-HULL SOURCE + INTERACTION SPEC

Status:
# **SOURCE PASS / INTERACTION SPEC FROZEN**

No build is authorized until this spec is persisted.

---

# Working identity

Slug:
`families/tongiaki-tonga/`

Place/context:
# **Tongatapu / Tonga**

Memory:
`Structural / Voyaging Memory`

Edition:
# **Twin Hull Register**

Primary topology:
# **R4 — STRUCTURAL COUPLING / DISTRIBUTED SUPPORT**

Secondary:
R1 balance / counter-support.

---

# Authoritative source anchors

## Te Ara — Polynesian double hull

Te Ara documents a double-hulled canoe observed at Tongatapu in 1643 and states:
- two hulls gave Polynesian vessels stability and seaworthiness.

Source:
https://teara.govt.nz/en/artwork/5987/polynesian-double-hull

## Te Ara — Tongiaki in Tongatapu, Tonga

Te Ara documents Tongan `tongiaki` and describes them as more stable than nearby fishing outriggers in the historical comparison presented.

Source:
https://teara.govt.nz/en/artwork/2213/tongiaki-in-tongatapu-tonga

## Te Papa — Tongan Tongiaki model

Te Papa preserves a model of an eighteenth-century Tongan tongiaki and describes:
- two hulls of equal length;
- joined together by a deck;
- large triangular sail and rigging;
- tongiaki use in Tonga before the nineteenth century.

Source:
https://collections.tepapa.govt.nz/object/648909

## Te Papa — Pacific canoes

Te Papa documents the general structural distinction:
- in double-hulled canoes, two hulls are joined by booms and decking;
- outriggers use one hull plus a float connected by booms.

Source:
https://collections.tepapa.govt.nz/topic/2354

---

# Source truth frozen

The family may truthfully claim:
1. Tongan tongiaki are documented double-hulled sailing canoes;
2. the source configuration contains two hulls joined into one structural platform;
3. historical/heritage sources associate the two-hull configuration with greater stability/seaworthiness than a narrow single hull;
4. the two hulls remain physically distinguishable within the coupled vessel.

The family must NOT claim:
- exact hydrodynamic performance;
- exact righting moment;
- capsize thresholds;
- displacement or load equations;
- exact historical hull spacing from the editorial interface;
- that the digital alignment tolerance reproduces a measured tongiaki specification.

---

# Canonical family law

# **TWO HULLS JOINED IN PARALLEL FORM A SHARED, MORE STABLE VOYAGING PLATFORM.**

Source-derived structural signature:

`HULL A ≠ HULL B → PARALLEL → JOIN → SHARED PLATFORM → STABILITY / SEAWORTHINESS CONTEXT`

Interaction proof is deliberately narrower:

# `TWO HULLS → PARALLEL ALIGNMENT → COUPLING → ONE STRUCTURAL PLATFORM`

The UI proves the documented relationship geometry. It does NOT calculate the hydrodynamic consequence.

---

# Product pair

## Card A — HULL A / PORT MEMBER

Must remain:
- a bounded hull body;
- independently visible before coupling;
- directly draggable;
- visually distinct from Card B only through orientation/side identity, not cultural ornament.

## Card B — HULL B / STARBOARD MEMBER

Must remain:
- a second bounded hull body;
- equal in product hierarchy;
- directly draggable;
- independently valid when not coupled.

Neither card is “main hull” and neither becomes a receiver/background.

---

# Relationship field

## BOOMS / DECK CONNECTION — SUBORDINATE ONLY

The center/gap may reveal:
- restrained crossbeam/boom lines;
- a thin deck/platform plane;
- `PARALLEL COUPLING` metadata.

It must NOT become:
- a third card;
- a large deck hero object;
- a dashboard/gauge;
- a navigation map;
- an ocean/swell visualization.

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

---

# Interaction architecture

## Initial state — DISTINCT / UNCOUPLED

- both cards visible immediately;
- Hull A and Hull B sit inside separate bounded member fields;
- hull longitudinal axes are intentionally offset by a small editorial amount;
- no booms/deck connection exists;
- state text: `TWO HULLS · NO SHARED PLATFORM`.

No hull is marked invalid.

## Direct manipulation

Both hulls are draggable.

The user can move each hull inside a constrained local lane:
- fore/aft alignment adjustment;
- small inboard approach toward the shared gap.

No timer may complete the relationship automatically.

## Coupling condition

A broad editorial tolerance detects:
1. longitudinal axes sufficiently aligned;
2. both hulls sufficiently approached toward the relationship field.

When both conditions hold:
- thin boom/connection lines appear;
- a restrained deck plane resolves across the gap;
- state becomes `PARALLEL COUPLING · SHARED PLATFORM`.

The system must label the tolerance as an editorial interaction threshold, not a historical dimension.

## Break / Other state

If either hull is moved outside coupling tolerance:
- connectors withdraw;
- both hulls remain fully visible and valid;
- state becomes `OTHER RELATION · HULLS REMAIN VALID` or `UNCOUPLED · TWO VALID HULLS`;
- no red error / no failed vessel claim.

This is the canonical alternate-valid state.

---

# Why no fake stability simulation

The sources support the qualitative claim that the two-hull configuration improves stability/seaworthiness.

They do NOT provide the specific geometry, displacement, mass distribution or hydrodynamic parameters required to turn this prototype into an engineering simulator.

Therefore:
- no tilt score;
- no fake righting-force meter;
- no “72% more stable” number;
- no invented capsize animation;
- no single-hull vs double-hull physics benchmark.

Instead, the prototype demonstrates the source-grounded structural prerequisite:

# **TWO PARALLEL HULLS BECOME ONE COUPLED PLATFORM.**

A small source note may state that the documented configuration is associated with stability/seaworthiness.

---

# Swell non-overlap — hard gate

Swell Register:
`OCEAN SWELL → DEFLECTION / READING → ORIENTATION`

Tongiaki Twin Hull Register:
`HULL A + HULL B → PARALLEL COUPLING → SHARED STRUCTURAL PLATFORM`

Forbidden in Tongiaki:
- swell arrows;
- star paths;
- route indicators;
- island targets;
- heading changes;
- wave-reading interaction;
- navigator figure;
- voyage completion.

The visual background should be neutral and structural, not an ocean-navigation scene.

---

# Visual language

Direction:
- restrained structural drawing / boatyard-study character;
- warm neutral material fields;
- paired elongated hull silhouettes derived editorially from documented tongiaki proportions, without copying a restricted historical image;
- thin boom/deck geometry only after coupling;
- typography consistent with RELATIONAL KEY instrument labels;
- no generic Polynesian motifs, tattoo patterns, tapa patterns, flags or tropical decoration.

Cultural identity must come from:
- `TONGIAKI` naming;
- Tonga/Tongatapu source context;
- actual double-hull relation;
- source citations.

---

# Responsive behavior

Desktop:
- two cards remain side by side;
- relationship field visible between them.

Narrow/mobile:
- preserve the two hull members side by side whenever feasible;
- reduce card width and labels before stacking;
- if stacking becomes unavoidable below a very narrow threshold, the relationship must still read as two bounded members and direct manipulation must remain available.

A build must include explicit narrow-screen CSS and be visually audited later.

---

# Accessibility / control fallback

Each hull must:
- be keyboard-focusable;
- support arrow-key alignment movement in addition to pointer/touch drag;
- expose a restrained ARIA description of its editorial position/state.

Reset must restore the two-hull distinct/uncoupled initial state.

---

# Truthfulness footer

Required candidate wording:

`STRUCTURAL TRANSLATION · TONGAN TONGIAKI DOUBLE-HULL RELATION · EDITORIAL ALIGNMENT THRESHOLD · NOT A HYDRODYNAMIC OR NAVIGATION SIMULATOR`

Source footer must cite:
- Te Ara Polynesian double hull / Tongatapu;
- Te Ara Tongiaki in Tonga;
- Te Papa Tongan tongiaki model;
- Te Papa Pacific canoes.

---

# B2.3K verdict

# **SOURCE PASS / INTERACTION SPEC FROZEN**

The family survives because:
- both members are physically real and independently legible;
- coupling is direct and source-grounded;
- stability is kept as sourced context rather than fake simulation;
- Swell/navigation overlap is explicitly prohibited;
- alternate state preserves both hulls;
- the connector remains subordinate.

Validated Oceania count remains:
# `2 / 4`

# Next required output

# **B2.3L — TONGIAKI AUTONOMOUS BUILD CANDIDATE + SOURCE GATE**

Required path:
`families/tongiaki-tonga/candidate.html`

Acceptance:
1. autonomous candidate only;
2. no atlas/registry/public-route mutation;
3. two bounded hull cards visible from first frame;
4. both hulls directly draggable;
5. keyboard fallback;
6. coupling only after approach + parallel alignment threshold;
7. connector/deck subordinate;
8. breaking alignment cleanly returns to valid uncoupled state;
9. no stability numbers / fake physics / navigation UI;
10. truth/source footer + responsive CSS + JS syntax pass.
