# RELATIONAL KEY — R5.9C SERVICE / BENIN USER PASS — PROMOTION PENDING LIVE

Date: 2026-09-04
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`

Candidate:
`families/service-benin/r5-9.html`
Implementation `ffaab4d1a8268dad054c9c15a52e07f7c550833b`.

Mechanism:
**CHIP CARD → PUBLIC PHONE READER → CONTACT REGISTER → LINE WINDOW**

USER proof:
`/mnt/data/cc84b5d8-b132-49cf-8975-c2f0d7e8b631.mp4`
- duration 10.20 s
- 1912×966
- 30 fps
- 306 frames

Observed MATCHING:
- phonecard and publiphone reader are both distinct before relation;
- card approaches/seats;
- reader contacts register sequentially;
- final state shows all six editorial contacts lit;
- line window opens and reads `LINE WINDOW OPEN · EDITORIAL`;
- result reads `CONTACT FIELD REGISTERED · LINE WINDOW OPEN`.

Observed OTHER:
- phonecard and publiphone reader remain valid objects;
- phonecard is visibly offset/rotated;
- only partial contacts remain active;
- line window remains closed;
- result reads `TWO VALID OBJECTS · CONTACTS OFFSET · LINE WINDOW REMAINS CLOSED`.

USER verdict:
# **CAUSAL PASS / EMBODIMENT-STRONG PASS / VISUAL-SPECIFICITY PASS / TRUTH PASS ✅**

Truth boundary remains explicit:
editorial reconstruction combining documented Bénin PTT chip-phonecard objects and documented publiphone context; contact geometry/order, authorization timing, tariff/unit use and exact hardware are illustrative and are not claimed as historical operating procedure.

Promotion SOURCE commit:
`families/service-benin/index.html` → redirect to `/families/service-benin/r5-9.html`
@ `7f80542b55dfca6b45ec2b246d202e485e13448a`.

LIVE promotion status:
Vercel status on promotion commit reports Hobby `build-rate-limit` failure.
No READY public-promotion deployment is claimed yet.

Retry note — 2026-09-04:
Explicit human retry requested. This commit changes only this pending-LIVE register to retrigger branch deployment. No Service candidate, public-wrapper semantics, or shared runtime changes are authorized or made.

Canonical interpretation:
# **USER PASS / PROMOTION COMMITTED / LIVE PROMOTION RETRY REQUESTED**

Do not request another Service USER proof absent contradictory evidence.
Do not change candidate semantics.
Do not count Service CLOSED until a READY deployment includes the promotion commit and the public Service wrapper is route-verified or exact-commit verified under preview authentication.
Shared runtime remains unchanged.
