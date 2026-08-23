# ROUND 13E.2 — TESSELLATED REGISTER IMPLEMENTATION

Status: IMPLEMENTED / DEPLOYED / LIVE VISUAL AUDIT REQUIRED
Project: RELATIONAL KEY — Cultural Editions
Branch: `round13e/craft-memory-zellige`

## Pair invariant
THE RELATIONAL PAIR REMAINS THE PRODUCT.

Card A — TILE CLAIM
Card B — PATTERN FIELD
Gap — EDGE / GROUT REGISTER

## Mechanism
TESSELLATED REGISTER

A relationship becomes valid when two cut geometric fields can complete one continuous tessellation across the gap.

Interaction:
CUT → APPROACH → ROTATE → FIT → REGISTER → TESSELLATE → CONTINUE

## Implementation
- Two CR80 credentials are visible from the first frame.
- Both use a real public-domain Moroccan tile image from The Met as their material anchor.
- Incomplete diamond/tessera geometry is concentrated at opposing card edges.
- Matching claim rotates/fits the central register and reveals a continuous tessellated join across the gap.
- Other claim produces a small angular residual/recoil while both credentials remain valid.
- Card A supports desktop drag-to-approach in addition to TEST RELATIONSHIP.
- Responsive stacked pair behavior is preserved for smaller widths.

## Source
The Metropolitan Museum of Art — Tile, probably 15th century, Morocco, Mosque of Mulai Idris, Fez, stonepaste; glazed, Public Domain, object 17.44.3.
https://www.metmuseum.org/art/collection/search/446881

Direct Open Access image:
https://collectionapi.metmuseum.org/api/collection/v1/iiif/446881/874558/main-image

## Truthfulness
The system-generated geometry is an editorial RELATIONAL KEY translation. It is not presented as a reconstruction of a specific historic zellige panel. No museum, mosque, craftsperson or institutional affiliation is claimed.

## Live candidate
https://relational-key-craft-memory-zellige-v13e1-faadil1s-projects.vercel.app
Deployment: `dpl_8VkQHHTbXxrBCscfektt44Q43p12`

## Gate
Do not merge until live browser review confirms:
1. the two-card relationship is immediately legible,
2. the tile material feels culturally specific rather than decorative,
3. the edge-fit event reads as tessellation rather than a generic connector,
4. matching and no-match states are causally distinct,
5. real photography remains dominant over generated geometry.
