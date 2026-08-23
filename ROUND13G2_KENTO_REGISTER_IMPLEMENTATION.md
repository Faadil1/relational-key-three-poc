# ROUND 13G.2 — KENTO REGISTER IMPLEMENTATION

Status: IMPLEMENTED / LIVE VISUAL AUDIT REQUIRED

## Edition
PRINT MEMORY — JAPAN / UKIYO-E — KENTO REGISTER

## Canonical invariant
**THE RELATIONAL PAIR REMAINS THE PRODUCT.**

## Implementation
The branch `round13g/print-memory-kento` replaces the shared restoration entry point with a dedicated pair-native prototype.

### Card A — BLOCK CLAIM
- dark wood / relief field,
- public-domain print used only as a transformed archival relief reference,
- visible `kagi` + `hikitsuki` edge guides,
- identity remains a CR80 credential.

### Card B — PAPER / IMAGE RULE
- washi-like light paper field,
- real public-domain Okumura Masanobu print material,
- a second colour layer begins visibly misregistered,
- matching relationship moves that layer toward zero offset.

### Gap
- Kento register datum,
- temporary baren-style pressure event,
- paper/image bridge only appears after successful registration,
- mismatch exposes displaced colour lines instead of an error icon.

## Interaction
`BLOCK → APPROACH → ALIGN → PRESS → TRANSFER → REGISTER → CONTINUE`

## Matching proof
The successful state must read as **registration**: colour layers return to one image position while the two physical credentials remain visible.

## Mismatch proof
The unsuccessful relation must read as **misregistration**: colour/edge alignment remains displaced while both credentials remain valid.

## Interaction preservation
Desktop Card A can still be grabbed and pulled toward Card B. Crossing the approach threshold triggers the same registration sequence as the explicit test control.

## Runtime
Inline JavaScript syntax check: PASS (`node --check`).

## Source commit
`8afc81ba06cecd1d4f1fa06e157910fecd05c3b1`

## Gate
Do not merge until live browser review confirms:
1. block and paper read as two distinct physical roles,
2. `kagi` / `hikitsuki` are legible enough to make alignment causal,
3. successful colour alignment is more salient than the central register graphic,
4. mismatch clearly looks like printing misregistration rather than UI failure,
5. mobile retains both cards and no horizontal overflow.
