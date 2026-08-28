# RELATIONAL KEY — C3.2B FUNCTIONAL ROUTE AUDIT — PARTIAL

Date: 2026-08-25
Branch: `collection/consolidation-gate-1`
Deployment under review: `dpl_EDB2pc91vwmk1n1DnSs52hQD5gjJ`
Preview: `https://relational-key-collectionrelational-key-collection-4834ctm8z.vercel.app`
User capture: 94.07 s, 1900×964, 30 fps.

## Verdict

# `FUNCTIONAL SHELL PASS / PARTIAL LIVE ROUTE PASS / FINAL DIRECT-ROUTE CAPTURE REQUIRED`

The walkthrough proves that the collection shell controls work and that several live family routes resolve correctly. It does not yet open all fifteen direct family URLs, so `15/15 LIVE ROUTE PASS` is not claimed.

## Functional shell evidence

### Continent filters — PASS
The recording visibly changes the atlas across multiple geographic lenses, including Asia, North America, Oceania, Europe and Africa, then returns to broader states. The family subsets change coherently with the selected continent.

### Search — PASS
The user types `bou` while the Africa lens is active. The atlas correctly reaches `0 FAMILIES` and displays `No family matches this lens.` Clearing the query restores the Africa subset. This confirms live text filtering and the empty-result state.

### Return behavior — PASS WITH POLISH
Browser Back repeatedly returns from family pages to the collection atlas without breaking state/navigation. No dedicated in-product `Back to Atlas` affordance is visible in the frozen family snapshots. Add this to Global Refinement; do not patch frozen family interactions during C3.

## Shared-runtime evidence

Direct live URLs visibly verified:
- `/families/city-gatineau/` → `REGISTERED CITY PASSAGE` / CITY;
- `/families/signal-nigeria/` → `SIGNAL PORTRAIT` / SIGNAL;
- `/families/textile-bonwire/` → `WOVEN REGISTER` / TEXTILE.

Within the shared runtime opened from City, the recording also visibly reaches the correct internal family states:
- SERVICE → `SERVICE REGISTER`;
- FRIDA → `TRACE SYSTEM` / Frida Kahlo + Casa Azul;
- FOOD → `EDIBLE PASSAGE` / Toyama Memory Key + Edible Counterpart.

Important distinction: SERVICE / FRIDA / FOOD were reached via the runtime's internal tabs while the browser URL remained `/families/city-gatineau/`. Their family states are therefore verified, but their individual launcher URLs are **not yet independently verified live**.

## Autonomous snapshot evidence

Direct live URL visibly verified:
- `/families/kento-japan/` → `Kento Register`.

The other autonomous families appear as atlas cards/filter results but are not opened in this recording, so their consolidated live URLs remain unverified by the authenticated browser gate:
- `/families/zellige-fes/`;
- `/families/khipu-peru/`;
- `/families/ombak-bali/`;
- `/families/swell-marshall/`;
- `/families/stereoscopy-uk/`;
- `/families/siku-bolivia/`;
- `/families/hika-ahi-aotearoa/`;
- `/families/boulle-france/`.

## Current direct-route ledger

Direct URL verified in authenticated Preview: **4 / 15**
- City / Gatineau ✅
- Signal / Nigeria ✅
- Textile / Bonwire ✅
- Kento / Japan ✅

Correct shared-runtime states additionally observed: **SERVICE / FRIDA / FOOD** ✅

Still requiring direct URL evidence: **11 routes**
1. `/families/service-benin/`
2. `/families/frida-coyoacan/`
3. `/families/food-toyama/`
4. `/families/zellige-fes/`
5. `/families/khipu-peru/`
6. `/families/ombak-bali/`
7. `/families/swell-marshall/`
8. `/families/stereoscopy-uk/`
9. `/families/siku-bolivia/`
10. `/families/hika-ahi-aotearoa/`
11. `/families/boulle-france/`

## Collection usability verdict so far

# `PASS WITH POLISH — ROUTE COMPLETENESS STILL OPEN`

Positive:
- filters respond clearly;
- combined search + continent filtering behaves consistently;
- empty state is understandable;
- browser return to atlas works;
- shared-runtime states remain intact inside the consolidated product;
- Kento autonomous snapshot is preserved correctly.

Global Refinement backlog candidate:
- introduce a collection-level return affordance (`← Back to Atlas`) around family snapshots without flattening or rewriting family-native mechanisms.

## Final evidence required

# `C3.2C — DIRECT ROUTE COMPLETION`

No more filter/search testing is needed. Record only the eleven remaining routes, one after another, with ~1–2 seconds on each loaded family title. No interaction replay is required.

After all eleven resolve to the intended family, the gate may become:
- `15/15 LIVE ROUTE PASS`;
- `COLLECTION USABILITY PASS WITH POLISH`;
- `GLOBAL REFINEMENT = OPEN`.

`SHARED STATE OBSERVED ≠ DIRECT LAUNCHER VERIFIED ≠ 15/15 LIVE ROUTE PASS`.
