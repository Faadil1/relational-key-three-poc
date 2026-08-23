# RELATIONAL KEY — Three.js Signature POC

Day 17 / Round 11B technical proof.

**Live:** https://relational-key-three-poc.vercel.app

## Question being tested
Can spatial interaction make **Registered Continuation** substantially more distinctive and understandable than the 2D baseline?

## Signature
`GRAB → PROXIMITY → COMPARE → SNAP / RESIST → CONTINUE`

## Positive scenario
Anchorage Museum / Family Plus / ROAM → Walt Disney Family Museum → Complimentary Admission.

## Negative scenario
Anchorage Museum / Standard / ASTC → same destination → no reciprocal relationship. The credential remains valid.

## Prototype implementation
The deployed POC is deliberately lightweight: native HTML/CSS/JS with Three.js loaded as an ES module. Three.js is used for spatial depth, direct manipulation, proximity, registration geometry, resistance and path continuation. The Figma Make V1 remains the frozen design/behavior baseline until the comparison gate is passed.

## Acceptance gate
1. Credential is directly draggable.
2. Destination response is felt before contact.
3. Valid relation produces an inevitable-feeling snap.
4. Invalid relation feels physically different without relying on text.
5. User can infer that matching is required before the path continues.
