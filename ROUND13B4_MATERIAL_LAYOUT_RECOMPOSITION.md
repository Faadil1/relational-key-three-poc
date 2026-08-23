# ROUND 13B.4 — Material / Layout Recomposition

Status: IMPLEMENTED / DEPLOYED CANDIDATE

## Trigger
Browser recording of V13B.3 showed that the real-image direction was correct but the composition still underperformed:
- too much dead space above the artifact
- hero copy competed with the object
- card / seam / archive appeared too low in the viewport
- junction did not yet read strongly enough as the signature event
- controls still felt detached from the ritual
- archive field needed more curator-like presence

## Recomposition law
**OBJECT FIRST → SEAM SECOND → ARCHIVE THIRD → EXPLANATION ON DEMAND**

## 13B.4 changes
- removes the separate oversized hero block
- merges title and edition metadata into a compact top strip
- moves the card + seam + archive into the first viewport
- enlarges the collectible credential to a 720px-class hero object
- enlarges the relational junction to a 96px signature seam with concentric registration rings
- keeps only the bottom result plaque; the old overlay outcome is visually suppressed
- moves FRONT / BACK / MACRO directly beneath the artifact
- gives the archive field more physical frame/presence
- compresses claim / run / result controls into one grounded ritual deck
- preserves real-image-only rule and existing match/no-match semantics
- preserves reduced-motion behavior and credential-valid no-match semantics

## Current deployment
Project: `relational-key-cultural-figure-frida-v134`
Deployment: `dpl_BeSCGF9tC21qFsCyo31Lbq7MZaQC`
Production alias: `https://relational-key-cultural-figure-frida-v134-faadil1s-projects.vercel.app`
State: READY

## Validation status
- GitHub implementation: PASS
- Vercel transport/build: PASS / READY
- external browser visual audit: PENDING
- PR merge: BLOCKED until visual audit

## Promotion gate — ROUND 13B.5
PASS only if browser recording confirms:
1. card + seam + archive are visible immediately in first viewport
2. no large dead zone dominates the top half
3. artifact remains the strongest visual object
4. junction reads as the signature connection, not a floating icon
5. archive reads as a counterpart object, not a dashboard grid
6. controls feel secondary and grounded
7. match/no-match remain legible without oversized text
8. all real photographs load reliably
