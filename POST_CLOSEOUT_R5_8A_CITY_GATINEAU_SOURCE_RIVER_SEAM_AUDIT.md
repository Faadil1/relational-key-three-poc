# RELATIONAL KEY — R5.8A CITY / GATINEAU SOURCE + RIVER-SEAM AUDIT

Date: 2026-09-03
Branch: `collection/global-refinement-1`
PR #21: `DRAFT / DO NOT MERGE`

Baseline classification: `ADEQUATE`.
Existing EXP-1 / EXP-1B route-handoff and Gatineau visual-identity work remains valid.

## Source anchors

Official Ville de Gatineau material documents:
- the municipality on the north shore of the Ottawa River;
- the city extending east and west of the Gatineau River;
- sector structure Aylmer, Hull, Gatineau, Masson-Angers and Buckingham;
- official mapping where waterways act as physical geographic separators.

Primary source references:
- Ville de Gatineau interactive electoral-district map: https://www.gatineau.ca/portail/default.aspx?c=fr-CA&p=publications_cartes_statistiques_donnees_ouvertes%2Fcartes%2Fcarte_interactive_districts_electoraux
- Ville de Gatineau territorial presentation / infrastructure plan: https://www.gatineau.ca/docs/guichet_municipal/participation_citoyenne/consultations_publiques/consultations_publiques_2020/plan_directeur_infrastructures_recreatives_sportives_communautaires/20220311_plan_directeur.fr-CA.pdf

## Diagnostic

The current public experience already achieves:
- specific Gatineau sector / river identity;
- pair-spanning route handoff;
- valid OTHER residual.

Remaining STRONG gap:
- route continuity is still visually close to a generic bridge line;
- the physical reason the pair must cooperate is not embodied enough;
- the Gatineau River is present as visual identity but not yet a causal gate.

## R5.8 mechanism

# **RIVER-SEAM CROSSING / BANK-TO-BANK HANDOFF**

Law:
`WEST-BANK ROUTE → RIVER EDGE → CROSSING ANCHORS SEAT → SPAN FORMS → HANDOFF CROSSES → EAST-BANK ROUTE CONTINUES`

MATCHING:
- Card A owns a valid west-bank route fragment ending at a river-edge anchor;
- Card B owns a valid east-bank route fragment beginning at its river-edge anchor;
- the Gatineau River seam belongs to Card B / the relation field;
- matching anchors align vertically;
- a crossing span is constructed only after both anchors seat;
- a handoff pulse crosses the span and activates the receiving route;
- memorable event belongs to the pair.

OTHER:
- both route fragments remain valid;
- east/west crossing anchors are vertically offset;
- no valid span seats across the seam;
- route endpoints remain visible as separate valid fragments;
- residual is a misseated crossing, not a generic red failure.

## Truth boundary

The candidate is a conceptual urban relationship model using documented Gatineau sectors and waterways.
It is NOT:
- an operational transit map;
- a real bridge alignment;
- a claim about a specific STO route;
- a navigation or planning tool.

Decision: `R5.8A PASS`.
Build isolated candidate `families/city-gatineau/r5-8.html`.
Public City wrapper and shared runtime remain unchanged until USER PASS.
