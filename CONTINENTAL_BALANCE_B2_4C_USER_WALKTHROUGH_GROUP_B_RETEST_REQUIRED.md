# RELATIONAL KEY — B2.4C USER WALKTHROUGH GROUP B

Date: 2026-08-29
Branch: `collection/global-refinement-1`

# Verdict

# **RETEST REQUIRED / NO GROUP-B VALIDATION YET**

User evidence:
`cb93bfc9-86c0-4122-9452-b0d8215588fd.mp4`

Observed video metadata:
- duration: ~42.70 s
- frame size: 1900 × 972
- frame rate: 30 fps

This gate is judged against the founding RELATIONAL KEY rule, not against animation presence alone.

# FOUNDING PRODUCT RULE

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

Reference product:
`RELATIONAL KEY — Three.js Signature POC`
`https://relational-key-collectionrelational.vercel.app/`

Audit consequence:
- the primary relational action must be carried by the two members themselves;
- a button, center register, gap, status panel or helper animation cannot substitute for member-to-member evidence;
- external controls may remain subordinate utilities, but they cannot be the evidence used to validate the relationship.

# INDEPENDENT VERDICTS

## 1. Valparaíso Funicular / Chile

Status:
# **RETEST REQUIRED / NOT VALIDATED**

What the recording DOES prove:
- Car A and Car B remain visually dominant as a pair;
- opposite terminal states are clearly legible;
- the two cars visibly resolve to opposite heights;
- no false success/error state dominates the relation.

What the recording does NOT prove:
- direct manipulation of Car A;
- direct manipulation of Car B;
- immediate inverse resolution caused by either member as the input.

Observed audit issue:
- the recording visibly uses the subordinate `SWAP START` control;
- that control produces/changes the displayed inverse state, but it is not one of the relational members;
- therefore it cannot stand in for the required proof `drag A → B=1−A` and `drag B → A=1−B`.

UX watch:
`SWAP START` is prominent enough that it attracted the audit interaction instead of the cars. Do not mutate yet; first perform the direct-member retest. If direct dragging works but users continue to choose the utility control, demote/remove the utility before collection promotion.

Required retest:
1. do not press `SWAP START`;
2. drag Car A through at least one partial path and show Car B resolve inversely in real time;
3. release;
4. drag Car B independently and show Car A resolve inversely;
5. no success-state should appear.

## 2. Mate + Bombilla / Argentina

Status:
# **RETEST REQUIRED / NOT VALIDATED**

What the recording DOES prove:
- Mate and Bombilla remain visually dominant as the two members;
- an inserted/submerged relationship state is reached;
- the interface explicitly preserves the distinction between insertion and flow;
- the pair remains visually stronger than the center/status treatment.

What the recording does NOT prove:
- direct HOLD/press on the Bombilla producing a visible flow state;
- RELEASE stopping that flow;
- therefore the full causal law `submerged filter + direct hold → selective passage` is not demonstrated.

Important evidence visible in the recording:
- inserted state text indicates that the functional relationship exists but that no flow occurs until direct hold input;
- the recording does not subsequently show the required flow-on → release → flow-off sequence.

Required retest:
1. INSERT Bombilla;
2. pause briefly to show `inserted/submerged, no flow`;
3. press-and-hold directly on the Bombilla for ~2 seconds;
4. show visible flow response;
5. release and show flow stop immediately.

No code patch is authorized from this recording alone.

## 3. Tongiaki / Tonga

Status:
# **RETEST REQUIRED / NOT VALIDATED**

What the recording DOES prove:
- Hull A and Hull B remain the dominant pair;
- both members are visible and independently framed;
- the interface clearly identifies the uncoupled/distinct state.

What the recording does NOT prove:
- direct Hull A/Hull B movement into a valid relationship threshold;
- approach + parallel alignment;
- appearance of booms/deck/shared platform;
- disappearance of the structural connection when the relation is broken.

Observed evidence:
- the visible register remains `TWO HULLS UNCOUPLED`;
- the lower status remains `DISTINCT · two valid hull members; no shared platform is formed.`;
- no coupled-state frame appears in the submitted recording.

Required retest:
1. drag Hull A inboard and fore/aft;
2. drag Hull B until both hulls are sufficiently close and parallel;
3. hold the coupled state long enough to show the structural connector/deck;
4. move either hull back out of threshold;
5. show the connector/deck disappear while both hulls remain valid.

If the user cannot reliably reach the threshold after a deliberate direct attempt, then this becomes a UX PATCH rather than an evidence-only retest.

# COUNT EFFECT

No Group B count change is authorized by this recording.

Validated distribution remains:
# `AFRICA 4 / ASIA 4 / NORTH AMERICA 4 / SOUTH AMERICA 2 / OCEANIA 2 / EUROPE 2`

Group A remains independently validated and unchanged.

# WHY THIS IS NOT A CODE PATCH YET

Missing user evidence is not automatically a source failure.

The source gates already established direct-member mechanics for these candidates. The correct next step is a targeted interaction retest. Only if direct manipulation fails or proves unusable should source mutation begin.

# NEXT EXACT OUTPUT

# **B2.4C-R1 — TARGETED GROUP B DIRECT-MEMBER RETEST**

Re-record only the missing causal proof:
- Valparaíso: direct Car A + direct Car B, no `SWAP START`;
- Mate/Bombilla: inserted-no-flow → direct HOLD flow → RELEASE stop;
- Tongiaki: direct approach/alignment → coupled deck → break relation.

Issue independent PASS / PATCH / REJECT only after that evidence.

Do not proceed to Group C and do not change South America/Oceania counts before B2.4C closes.

# LOCKED PRINCIPLE

# **THE RELATIONAL PAIR REMAINS THE PRODUCT.**

A helper control may expose a state, but it cannot become the relationship itself.
