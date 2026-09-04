# RELATIONAL KEY — R5.9A SERVICE / BENIN — CHIP-CARD → PUBLIPHONE CANDIDATE

Date: 2026-09-03
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`
Baseline: ADEQUATE.

## Why EXP-2C is not yet STRONG
EXP-2C successfully established archive-led Bénin phonecard identity and preserved the valid Service pair. Its causal layer, however, still externalized the memorable moment as an abstract `01 → 02 → 03 → 04` rail between cards. R5.9 must make the relation itself physically legible without inventing a historical operating procedure.

## Source audit
Primary archive:
- Archives nationales du Bénin — Série J Télécommunications: `https://archivesnationales.gouv.bj/archives-details/serie-j-telecommunications`
- The series covers posts, telephone links, transmissions, administration and attached telecommunications services.

Primary telecom report:
- ITU / Bénin national telecommunications report: `https://www.itu.int/itudoc/telecom/tlc99/nat_rep.pdf`
- Documents digital-exchange supplementary services including controlled access, detailed billing, speed dialing, three-party conference, call waiting and temporary forwarding.
- Documents a public-phone deployment programme active since 1995, with 417 publiphones in service and 1,200 then being installed.

Object evidence:
- Documented Office des Postes et Télécommunications du Bénin chip phonecards exist in 30/50/120-unit forms; examples include 1993 50-unit PTT chip-card records and surviving cards carrying Service PLUS / conference / forwarding cues.
- Secondary catalogue/object evidence is used only for material/object cues, not for operating procedure.

## Chosen mechanism
# **CHIP CARD → PUBLIC PHONE READER → CONTACT REGISTER → LINE WINDOW**

Candidate:
`families/service-benin/r5-9.html`
Implementation commit `ffaab4d1a8268dad054c9c15a52e07f7c550833b`.

### Card A
Archive-led Bénin PTT chip phonecard object.
- BÉNIN / Office des P&T cues;
- 50 UNITÉS cue;
- six-panel editorial chip-contact field;
- documented Service PLUS vocabulary retained as archival identity, not as a claim that the card directly activates those services.

### Card B
Editorial public-phone reader field grounded in the documented Bénin publiphone deployment context.
- card-reader bay;
- contact field;
- line window;
- public telephone network cue.

### MATCHING
`APPROACH → SEAT → CONTACT 01…06 → REGISTER → LINE WINDOW OPEN`

Both members exist before the relation. The memorable moment belongs to the pair because the reader only opens its line window after the chip/contact fields register together.

### OTHER
The phonecard remains a valid object and the reader remains a valid object, but Card A is vertically/rotationally offset. Only a partial contact residual appears and the line window remains closed.

Residual:
`TWO VALID OBJECTS · CONTACTS OFFSET · LINE WINDOW REMAINS CLOSED`

## Truth boundary
This is an editorial reconstruction combining documented Bénin PTT chip-phonecard objects with the documented historical publiphone deployment context.

The following are explicitly illustrative and are NOT claimed as exact historical procedure:
- six-contact geometry;
- contact ordering;
- authorization timing;
- tariff/unit consumption;
- exact publiphone hardware.

The candidate does not reproduce an operational service command or present-day procedure.

## Preliminary SOURCE verdict
- RELATIONAL / CAUSAL: PASS candidate
- VISUAL / PLACE / MATERIAL: PASS candidate
- TRUTH: PASS candidate with explicit editorial boundary
- EMBODIMENT-STRONG: candidate hypothesis only; USER proof required

## LIVE
Initial Vercel status on implementation commit `ffaab4d1a8268dad054c9c15a52e07f7c550833b` = `failure` pointing to Hobby `build-rate-limit`.
Interpretation: deployment capacity blocker, not application failure.

### Retry 01
On explicit human instruction to retry, a deployment-only/status-register commit was created without any semantic, visual or runtime change to `families/service-benin/r5-9.html`.
Candidate implementation remains exactly `ffaab4d1a8268dad054c9c15a52e07f7c550833b`.
Acceptance remains READY + unchanged candidate integrity before USER proof.

Public Service wrapper unchanged.
Shared runtime unchanged.
Service remains ADEQUATE until USER PASS + public promotion.

## Exact next gate
# **R5.9B-LIVE — SERVICE / BENIN CANDIDATE DEPLOYMENT**

Require a READY deployment containing unchanged `r5-9.html`, then verify candidate route or establish exact-commit integrity under preview authentication, generate a USER share URL, and open one MATCHING + OTHER USER regression.
