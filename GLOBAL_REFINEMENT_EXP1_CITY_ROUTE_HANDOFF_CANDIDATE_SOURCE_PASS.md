# RELATIONAL KEY — EXP-1 CITY / GATINEAU ROUTE HANDOFF CANDIDATE

Date: 2026-09-02
Repository: `Faadil1/relational-key-three-poc`
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`

## Parent decision

Experience-debt disposition register:
`GLOBAL_REFINEMENT_CLOSEOUT_EXPERIENCE_DEBT_DISPOSITION.md`
commit `024d929964196d03285a851d6f6ae0e57a7467f8`.

City / Gatineau decision: `EXPAND NOW`.

## Golden / fallback

Public City wrapper remains unchanged:
`families/city-gatineau/index.html`.

Shared runtime remains unchanged:
`families/_shared/round13r/index.html`.

Therefore Service, Signal, Frida, Food and Textile cannot inherit this experiment accidentally.

## Candidate

`families/city-gatineau/exp-1.html`
implementation commit `bed88d8a1dce21e6a70d1757c5466461ae410f2e`.

Architecture:
- candidate loads the preserved shared runtime;
- selects only the City edition;
- injects City-specific route-handoff CSS/DOM/event treatment locally;
- no mutation to shared runtime;
- no mutation to public City wrapper.

## Expansion mechanism

# `PAIR-SPANNING ROUTE HANDOFF`

Idle:
- both cards retain independent route fragments;
- Card A remains `Member Credential`;
- Card B remains `Gatineau Field / Territory Rule`.

MATCHING:
- route fragments approach alignment;
- a continuous corridor visibly spans Card A → gap → Card B;
- a travelling handoff pulse moves across that corridor;
- center junction is intentionally reduced in visual hierarchy;
- relation state reads `ROUTE HANDOFF · CONTINUOUS`.

OTHER:
- both route fragments remain visible/valid;
- the fragments separate vertically rather than collapsing into generic failure;
- the gap holds an explicit offset residue;
- relation state reads `OFFSET RESIDUAL · BOTH ROUTES VALID`.

## Invariant check

- both members exist before relation: PASS;
- memorable event belongs to route crossing the pair: PASS;
- center remains subordinate: PASS by design;
- matching preserves route-registration law: PASS;
- OTHER preserves both members and relation residue: PASS;
- no operational transit-map claim added: PASS;
- no shared-runtime mutation: PASS.

## Responsive fallback

At narrow width:
- pair keeps the shared runtime one-column behavior;
- custom route handoff rotates into a vertical bridge treatment;
- card overlays are suppressed rather than creating horizontal overflow;
- relational fallback remains available.

## LIVE

Deployment:
`dpl_A7Ju2hjJqVaZkZsiHiNemUUG18LD`
state: `READY`
exact deployed commit: `bed88d8a1dce21e6a70d1757c5466461ae410f2e`.

Preview:
`https://relational-key-collectionrelational-key-collection-dhq8gvdd0.vercel.app/families/city-gatineau/exp-1.html?_vercel_share=JDiurJAvhxip3NeHbjiVVOYKXTMT2vdB`

## State separation

- SOURCE golden shared runtime: PASS / unchanged
- SOURCE public City wrapper: PASS / unchanged
- SOURCE candidate: PASS
- LIVE candidate deployment: READY / PASS
- USER candidate regression: PENDING
- RELATIONAL INTEGRITY: PASS unchanged
- VALIDATED: 24 unchanged

# NEXT EXACT GATE

# **EXP-1A — CITY LIVE USER ROUTE-HANDOFF REGRESSION**

USER should record candidate only:
1. MATCHING CLAIM → TEST RELATIONSHIP;
2. hold continuous route handoff briefly;
3. OTHER CLAIM → TEST RELATIONSHIP;
4. hold offset residual briefly.

PASS criteria:
- route continuation visibly belongs to both cards plus their relation;
- handoff pulse clarifies causality rather than acting as decoration;
- center remains secondary;
- OTHER shows offset/residual while both routes remain valid;
- two-card product remains visually dominant;
- experience is materially beyond the former generic shared-runtime choreography.

Do not promote until USER PASS.
Do not start Service EXP-2 until City EXP-1A closes.
