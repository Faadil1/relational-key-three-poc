# RELATIONAL KEY — CONTINENTAL BALANCE B2.3L

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Spec: `CONTINENTAL_BALANCE_B2_3K_OCEANIA_TONGIAKI_SPEC.md`

# TONGIAKI AUTONOMOUS BUILD CANDIDATE + SOURCE GATE

Status:
# **SOURCE PASS / LIVE + USER VISUAL GATE PENDING**

Candidate:
`families/tongiaki-tonga/candidate.html`

Implementation commit:
`e577bd6669c0d32f41078fa3124a03539cecd460`

Candidate blob:
`55053022e5312274a250a3384a28c07abdcb2f6f`

Spec commit:
`00f5a984ae4c376753b2ed6f64dc955307c9e38d`

---

# Atomic source proof

Compared from canonical pre-build checkpoint:
`8aa9c0bd69465bcdf5f498562cf3c01f13d26ec6`

to implementation:
`e577bd6669c0d32f41078fa3124a03539cecd460`

Result:
- ahead by 1 commit;
- exactly one changed path;
- `families/tongiaki-tonga/candidate.html` = added;
- **73 additions / 0 deletions**;
- no atlas change;
- no `collection/families.json` change;
- no public route change;
- no validated-family mutation.

---

# Interaction implementation

## Two bounded members from first frame

- Card A = `HULL A / PORT MEMBER`;
- Card B = `HULL B / STARBOARD MEMBER`;
- both remain visible and equal in hierarchy.

## Direct manipulation

Both hulls support:
- pointer/touch drag;
- keyboard arrow movement.

Local motion is constrained editorially:
- fore/aft offset;
- inboard approach.

No timer or auto-snap completes coupling.

## Coupling law in code

Editorial constants:
- `APPROACH = 48`;
- `ALIGN = 15`;
- local movement limits only.

Coupling requires all conditions:

`Hull A approached AND Hull B approached AND |A.y - B.y| <= ALIGN`

Only then:
- pair receives `coupled` state;
- thin boom/deck evidence appears;
- readout states `SHARED PLATFORM`.

These values are explicitly interface thresholds, not historical dimensions.

## Alternate-valid state

After coupling, moving either hull outside tolerance:
- removes bridge/deck evidence;
- keeps both hulls intact;
- produces `UNCOUPLED · TWO VALID HULLS`;
- never marks a hull as incorrect.

Before coupling, partial states remain descriptive:
- `APPROACHED · OFFSET`;
- `ALIGNED · SEPARATE`;
- `DISTINCT`.

## Reset

Reset restores:
- initial separate hull positions;
- no bridge;
- no retained success state.

---

# Truthfulness / anti-overclaim check

Present:

`STRUCTURAL TRANSLATION · TONGAN TONGIAKI DOUBLE-HULL RELATION · EDITORIAL ALIGNMENT THRESHOLD · NOT A HYDRODYNAMIC OR NAVIGATION SIMULATOR`

The build contains:
- no stability percentage;
- no righting-force/capsize gauge;
- no speed/displacement/load equation;
- no wave/swell arrows;
- no stars;
- no route/island target;
- no heading/navigation state.

Visual identity comes from the two elongated hull members and structural connector logic, not generic Polynesian ornament.

---

# Responsive / accessibility source checks

Responsive CSS present at:
- `max-width: 760px`;
- `max-width: 460px`.

Both hull cards remain side by side in source at narrow widths.

Accessibility/control:
- both hulls are native buttons and keyboard focusable;
- ArrowLeft / ArrowRight / ArrowUp / ArrowDown adjust position;
- `aria-valuetext` updates editorial position description;
- Reset restores state and focus.

---

# Syntax gate

The exact local candidate used for the GitHub write had its `<script>` extracted and checked with:

`node --check`

Result:
# **PASS**

GitHub blob inspection confirms the committed script contains the same coupling constants, pointer handlers, keyboard handlers, reset logic and truth-state transitions.

---

# B2.3L verdict

# **SOURCE PASS**

This does NOT equal:
- LIVE PASS;
- USER VISUAL PASS;
- VALIDATED FAMILY;
- atlas promotion.

Validated Oceania remains:
# `2 / 4`

# Required live/user evidence later

1. two hull cards remain primary;
2. both drag naturally with pointer/touch;
3. keyboard fallback works;
4. partial approach/alignment states read clearly;
5. coupling appears only after both conditions;
6. booms/deck remain subordinate;
7. moving out of tolerance cleanly uncouples;
8. narrow layout remains usable;
9. visual language reads structural/nautical without becoming navigation UI;
10. no fake-physics impression is created.

# Next required output

# **B2.3M — OCEANIA FAMILY ROUND 2: GARAMUT SOURCE + INTERACTION SPEC**

No Garamut build before its safeguarding/spec gate freezes:
- exact regional source anchor;
- Card A / Card B roles;
- editorial signal sequence semantics;
- explicit non-authentic-code boundary;
- direct strike interaction;
- alternate-valid state;
- sound strategy;
- no restricted ceremonial-code teaching.
