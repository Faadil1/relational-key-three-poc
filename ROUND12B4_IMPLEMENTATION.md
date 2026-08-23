# ROUND 12B.4 — THREE TERRITORY IMPLEMENTATION

Status: IMPLEMENTED / RUNTIME DELIVERY PASS / HUMAN VISUAL GATE PENDING

## Branch
`round12b4/territory-implementation`

## Canonical implementation
The implementation extends V3.1 presentation restraint into a three-territory Cultural Editions prototype without STO branding.

### Territory variants
1. HULL — CIVIC GRID
   - dense/compressed city field
   - stepped relational path
2. GATINEAU — LINEAR CORRIDOR
   - directional/corridor field
   - mostly linear relational path
3. EASTERN PAIR — DISTRIBUTED LINK
   - dual-node/distributed city field
   - converging/branching relational path

## Relationship test
- LOCAL CLAIM → compatible → registered continuation → CITY PASSAGE REGISTERED
- EXTERNAL CLAIM → incompatible → residual interference/recoil → NO REGISTERED RELATIONSHIP

The credential remains valid in the no-match case.

## Presentation
- experience first
- outcome second
- explanation on demand
- WHY THIS WORKS / SEE WHY opens the V3.1 drawer/bottom-sheet explanation
- advanced residual/profile detail remains secondary

## Truthfulness
- Territory geometry is a conceptual visual encoding, not an operational transit map.
- Registration profiles and residual are internal prototype encodings, not official municipal or transit standards.
- No STO branding is used in the implemented candidate.

## Deployment
Vercel project: `relational-key-city-passage-canonical`
Deployment: `dpl_H2nBb4QPFrud5ehNuNyNLQBegKPs`
Source deployment is pinned to GitHub commit `f21f39c0fca2d050c5a8f56f9e3a7549bb3f496f` to prevent source/deployment divergence.

## Gate
Do not merge until the human visual/interaction audit confirms:
1. all three territories render visibly different without relying on color,
2. all three still read as one RELATIONAL KEY family,
3. LOCAL CLAIM produces continuation,
4. EXTERNAL CLAIM produces resistance/no continuation,
5. the explanation drawer stays secondary,
6. no territory reads as a literal transit-map copy.

Next required output: ROUND 12B.5 — FAMILY / TERRITORY / GEOMETRY INTERACTION AUDIT.
