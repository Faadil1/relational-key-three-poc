# RELATIONAL KEY — COLLECTION CONSOLIDATION C2

Date: 2026-08-25
Branch: `collection/consolidation-gate-1`

# SOURCE CAPTURE & SNAPSHOT IMPORT — PASS

## Validation ledger

All **15 / 15** family slots now have a documented user visual or visual+audio gate.

The final debt was Japan / Kento Register, closed in:
`COLLECTION_C1_KENTO_USER_VISUAL_AUDIT_PASS.md`

Verdict:
`VISUAL PASS WITH POLISH / PROMOTE`.

## C2A — nine autonomous family snapshots

Commit:
`e7e1473b0d789fa09b33e2e5b8961c33f32227d2`

The following routes use the exact source `index.html` blob from each canonical family branch:

- `/families/zellige-fes/`
- `/families/khipu-peru/`
- `/families/kento-japan/`
- `/families/ombak-bali/`
- `/families/swell-marshall/`
- `/families/stereoscopy-uk/`
- `/families/siku-bolivia/`
- `/families/hika-ahi-aotearoa/`
- `/families/boulle-france/`

No family CSS, JavaScript, animation, copy, or mechanism was changed during import.

## C2B — six restored-base families

Commit:
`9321844cac8c2e9ccedda7e206b1ee03445bed83`

Canonical restored runtime is captured byte-identically at:

`/families/_shared/round13r/index.html`

Source blob:
`bed8c2fa6d2f40b9677d327ecfcd6c581238e14d`

Family routes:

- `/families/city-gatineau/` → selects `CITY`
- `/families/service-benin/` → selects `SERVICE`
- `/families/signal-nigeria/` → selects `SIGNAL`
- `/families/frida-coyoacan/` → selects `FRIDA`
- `/families/food-toyama/` → selects `FOOD`
- `/families/textile-bonwire/` → selects `TEXTILE`

These six routes are thin same-origin launch wrappers. They do not contain or modify the relational mechanism; each loads the exact shared audited runtime and programmatically selects the relevant existing tab after load.

## Source preservation rule

**THE SNAPSHOT IS THE REGRESSION ANCHOR.**

From this point forward:
- collection navigation may change;
- metadata and global framing may change;
- family snapshots must remain untouched until a deliberate Global Refinement sub-gate opens;
- any refinement must be compared against the source snapshot and historical golden deployment.

## Cleanup

Temporary tree-staging markers were removed during the C2B tree commit.

## Gate result

# **C2 — PASS**

All 15 families are now addressable inside one repository topology without destroying their validated family-native mechanisms.

## Next

# **C3 — COLLECTION SHELL**

Build the root RELATIONAL KEY collection experience around the frozen family routes.

C3 may introduce:
- collection landing view;
- continent balance view;
- mechanism taxonomy;
- filters / discovery;
- direct family navigation;
- collection-level metadata.

C3 must not yet perform Global Refinement of the individual family interactions.
