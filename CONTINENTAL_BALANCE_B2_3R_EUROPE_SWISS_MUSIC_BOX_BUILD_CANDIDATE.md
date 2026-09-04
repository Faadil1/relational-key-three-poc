# RELATIONAL KEY — CONTINENTAL BALANCE B2.3R

Date: 2026-08-28
Branch: `collection/global-refinement-1`
Spec: `CONTINENTAL_BALANCE_B2_3Q_EUROPE_SWISS_MUSIC_BOX_SPEC.md`

# EUROPE FAMILY ROUND 2 — SWISS CYLINDER MUSIC BOX BUILD CANDIDATE

Status:
# **SOURCE PASS / LIVE + USER VISUAL+AUDIO GATE PENDING**

Validated Europe remains:
# `2 / 4`

# Candidate

Path:
`families/music-box-sainte-croix/candidate.html`

Implementation commit:
# `c8c1af1afe7c9e9ff8cce8efc68ce3094976fe97`

Candidate blob:
# `1f07e969dea9a47ec591afe835766f1d2443e427`

# Atomic source gate

Compare base:
`d14485ba2a84d9873ade06b061755c18135ec907`

Head:
`c8c1af1afe7c9e9ff8cce8efc68ce3094976fe97`

Result:
- ahead by 1 commit;
- one changed file only;
- `families/music-box-sainte-croix/candidate.html` = added;
- 95 additions;
- 0 deletions;
- no atlas mutation;
- no `collection/families.json` mutation;
- no public family-route mutation;
- no validated family mutation.

# Byte identity / syntax proof

Local candidate:
`/tmp/music_box_candidate.html`

Local JS:
`/tmp/music_box_candidate.js`

`node --check /tmp/music_box_candidate.js`
→ PASS

`git hash-object /tmp/music_box_candidate.html`
→ `1f07e969dea9a47ec591afe835766f1d2443e427`

GitHub candidate blob:
`1f07e969dea9a47ec591afe835766f1d2443e427`

Therefore:
# **LOCAL CHECKED FILE == GITHUB BLOB**

# Implemented pair

Card A:
`PINNED CYLINDER / STORED SEQUENCE`

Card B:
`TUNED COMB / PHYSICAL DECODER`

Canonical law:
# **STORED PIN GEOMETRY BECOMES ORDERED NOTES WHEN A CYLINDER ENGAGES A TUNED COMB.**

Canonical proof:
`PINNED CYLINDER ≠ TUNED COMB → ENGAGE → ROTATE → PIN CONTACT → TOOTH PLUCK → ORDERED NOTES`

# Implemented interaction contract

## Separate
- both cylinder and comb visible;
- no sound;
- no decoded events;
- no autoplay.

## Engage
Control:
`ENGAGE CYLINDER + COMB`

Engagement:
- visually approaches the two members;
- activates the contact relation;
- explicitly states `NO AUTOPLAY`;
- cylinder remains stationary until direct user input.

## Direct rotation
After engagement:
- pointer/touch horizontal drag directly changes cylinder angle;
- Left/Right arrow keys provide keyboard rotation fallback;
- angle remains user-driven, not timer-driven;
- pin crossings are calculated deterministically from unbounded rotation angle;
- forward and reverse crossing order are both handled.

## Pin → tooth mapping
Two editorial patterns are included:
- Cylinder A: 8 pins;
- Other Cylinder: 8 different pins.

Decoder:
- 6 editorial comb teeth;
- each pin stores a lane/tooth assignment;
- crossing a pin angle triggers exactly that comb tooth;
- tooth visibly deflects/highlights even if audio is unavailable;
- recent decoded events appear only as small subordinate dots inside Card B.

# Audio

Web Audio synthesis:
- short low-volume triangle tones;
- six editorial frequencies;
- sound is evidence only;
- no samples or historical tune claim.

Visible truth label:
`EDITORIAL PIN SEQUENCES · SYNTHETIC TONES · NOT AUTHENTIC PAILLARD TUNING OR HISTORICAL TUNES`

# Historical drive boundary

Visible truth label:
`MANUAL ROTATION IS AN EDITORIAL INPUT SUBSTITUTION FOR THE ISOLATED CYLINDER↔COMB RELATION · HISTORICAL SPRING DRIVE REMAINS CONTEXTUAL`

Historical object anchor remains visible:
`PAILLARD & CIE. · SAINTE-CROIX · 1841 · HISTORICAL OBJECT HAS CYLINDER + ONE-PIECE 51-TOOTH COMB`

The candidate does not imply that the historical object contained only six teeth or was historically hand-spun in this manner.

# Alternate-valid semantics

Control:
`OTHER CYLINDER`

Behavior:
- switches to a second editorial pin layout;
- clears the prior event trace;
- retains the same cylinder↔comb law;
- produces a different valid event order;
- result language states `DIFFERENT STORED GEOMETRY`;
- no sequence is marked wrong;
- no red fail state.

# Reset

Reset restores:
- Cylinder A;
- angle 0;
- no events;
- disengaged pair;
- no audio context retained;
- controls ready for a fresh direct interaction.

# Accessibility / responsive source checks

Present in source:
- pointer/touch direct cylinder manipulation;
- `tabindex=0` slider semantics;
- `aria-valuenow` + qualitative `aria-valuetext`;
- Left/Right keyboard fallback;
- visible focus styling;
- tooth visual response independent of sound;
- responsive breakpoints at 980px and 560px;
- `prefers-reduced-motion` support;
- no horizontal-page-overflow intent.

Responsive source presence ≠ visual responsive PASS.

# Pair invariant check

The center contains only:
- contact cue;
- relationship label.

No:
- waveform hero;
- piano-roll hero;
- third score card;
- autonomous player UI.

Cylinder and comb remain the two primary relational objects.

# Gate verdict

# **B2.3R — SOURCE PASS**

SOURCE PASS ≠ LIVE PASS ≠ USER VISUAL+AUDIO PASS ≠ VALIDATED EUROPE SLOT.

Validated Europe remains:
# `2 / 4`

# Expansion source-build status

With this gate, all **9 required Balance Gate 2 additions** now have autonomous SOURCE-PASS build candidates:
1. Asia — Astrolabe
2. North America — Janney
3. North America — Metate + Metlapil
4. South America — Valparaíso Funicular
5. South America — Mate + Bombilla
6. Oceania — Tongiaki
7. Oceania — Garamut
8. Europe — Catoptric Anamorphosis
9. Europe — Swiss Cylinder Music Box

Validated distribution remains unchanged until independent live/user gates pass.

# NEXT REQUIRED OUTPUT

# **B2.4A — FULL NINE-CANDIDATE PREVIEW IDENTIFICATION + LIVE TECHNICAL AVAILABILITY GATE**
