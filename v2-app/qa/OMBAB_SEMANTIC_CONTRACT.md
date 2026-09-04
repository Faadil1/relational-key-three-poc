# Ombak V1 → V2 semantic comparison contract

This file records the bounded semantic invariant discovered by the first exact-browser V1↔V2 runtime comparison.

## Canonical V1 study states

- MATCHING default: `Δ7 Hz` → selected Ombak field registers.
- OTHER default: `Δ12 Hz` → beats are too fast for the selected editorial target; both tones remain valid.

These values are editorial study values, not a claim of one universal Bali-wide tuning or beat rate.

## V2 preservation rule

For the default V2 study:

- MATCHING must remain `7.0 Hz`.
- OTHER must remain `12.0 Hz`.
- changing to OTHER must not collapse the difference below the matching value.
- both states must preserve independent validity of the two sources.

When the V2 matching study slider changes, OTHER is defined as the selected matching difference plus `5 Hz`, bounded to `20 Hz`. This preserves the established direction of the relation while keeping the control exploratory.

## Gate consequence

A runtime/build PASS is invalid if this semantic contract fails, even when React/R3F/WebGL rendering itself is healthy.

`TECHNOLOGY_SERVES_THE_RELATIONAL_MECHANISM` takes precedence over visual or runtime novelty.
