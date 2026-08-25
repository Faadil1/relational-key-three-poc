# ROUND 13C.5.2 — CARD MATERIALIZATION PASS

## Product
RELATIONAL KEY — Food Memory / Toyama / Masu no Sushi

## Why this pass exists
V13C.5.1 restored the Food Memory concept to a CR80 credential. The next issue is not concept or food reveal; it is physical believability. The card still needs to read more like a collectible object and less like a flat web mockup.

## Canonical baseline
GitHub `index.html` remains V13C.5.1 while V13C.5.2 is browser-tested as a reversible visual candidate.

## V13C.5.2 candidate changes
- visible card edge / thickness
- stronger but restrained object shadow
- laminated-surface highlight
- pointer-position light response
- front/back remain physical faces
- food reveal remains inside the CR80 surface
- no change to resolver, claims, reveal sequence, failure semantics or source images
- no new decorative spectacle

## Visual law
CARD OBJECT FIRST → CULTURAL MATERIAL INSIDE → RELATIONAL TRANSFORMATION

## Deployment
Project: `relational-key-food-memory-ekiben-v13c52`
Deployment: `dpl_8fehdAsAyNHVXCNUhtwUNTJY279v`
Live alias: `https://relational-key-food-memory-ekiben-v13c52-faadil1s-projects.vercel.app`

The candidate loads the exact V13C.5.1 commit (`490053fc8a80c324c1c72c43504ced8d323577f2`) and applies a small materialization overlay. This keeps the baseline reversible while browser validation is pending.

## Gate
Current state: DEPLOYED CANDIDATE / BROWSER AUDIT REQUIRED / DO NOT MERGE

Promote only if:
1. the card is unmistakably CR80 before interaction,
2. the added thickness feels physical rather than 3D-gimmicky,
3. food remains the dominant cultural material,
4. lamination/reflection is restrained,
5. front/back still feel like the same object,
6. reveal mechanics are unchanged,
7. mobile remains usable.