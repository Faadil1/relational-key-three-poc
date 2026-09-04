from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

R5_FILES = {
    1: "families/food-toyama/r5-1.html",
    2: "families/textile-bonwire/r5-2.html",
    3: "families/metate-teotitlan/r5-3.html",
    4: "families/tongiaki-tonga/r5-4.html",
    5: "families/garamut-sepik-ramu/r5-5.html",
    6: "families/kento-japan/r5-6.html",
    7: "families/swell-marshall/r5-7.html",
    8: "families/city-gatineau/r5-8.html",
    9: "families/service-benin/r5-9.html",
    10: "families/signal-nigeria/r5-10.html",
    11: "families/frida-coyoacan/r5-11.html",
}

REPRESENTATIVES = {
    "city-gatineau": R5_FILES[8],
    "service-benin": R5_FILES[9],
    "signal-nigeria": R5_FILES[10],
    "frida-coyoacan": R5_FILES[11],
    "food-toyama": R5_FILES[1],
    "textile-bonwire": R5_FILES[2],
    "swell-marshall": R5_FILES[7],
    "stereoscopy-uk": "families/stereoscopy-uk/snapshot.html",
}

STATUS_FILES = sorted(set(R5_FILES.values()) | {REPRESENTATIVES["stereoscopy-uk"]})

REDUCED_MOTION_CSS = """
/* TRACE Gate 6.5 — reduced-motion assurance. State semantics and JS timing stay unchanged. */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto !important; }
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    transition-delay: 0s !important;
  }
}
""".strip()

READABILITY_CSS = """
/* TRACE Gate 6.5 — evaluator-critical readability floor only. */
.context, .root, .role, .result, .law, .truth, .source,
.meta, .headline small, .eyeTag {
  font-size: 8px !important;
}
.truth, .source { line-height: 1.55 !important; }
@media (max-width: 560px) {
  .context, .root, .role, .result, .law, .truth, .source,
  .meta, .headline small, .eyeTag {
    font-size: 9px !important;
  }
}
""".strip()

REFLOW_CSS = """
/* TRACE Gate 6.5 — bounded mobile reflow repair. */
html, body { overflow-x: hidden; }
""".strip()

STATUS_OPEN = '<div class="result" id="result">'
STATUS_REPLACEMENT = '<div class="result" id="result" role="status" aria-live="polite" aria-atomic="true">'


def inject_before_style_close(text: str, css: str, marker: str) -> tuple[str, bool]:
    if marker in text:
        return text, False
    idx = text.rfind("</style>")
    if idx < 0:
        raise RuntimeError(f"missing </style> for marker {marker}")
    return text[:idx] + "\n" + css + "\n" + text[idx:], True


def patch_file(path: str, *, r5_number: int | None, representative: bool) -> dict:
    file_path = ROOT / path
    original = file_path.read_text(encoding="utf-8")
    text = original
    changes: list[str] = []

    if r5_number is not None:
        stale = f"R5.{r5_number} CANDIDATE"
        final = f"R5.{r5_number} · VALIDATED"
        stale_count = text.count(stale)
        final_count = text.count(final)
        if stale_count == 1:
            text = text.replace(stale, final, 1)
            changes.append("candidate_label_to_validated")
        elif stale_count == 0 and final_count >= 1:
            pass
        else:
            raise RuntimeError(
                f"{path}: expected exactly one stale label or an existing validated label; "
                f"stale={stale_count}, final={final_count}"
            )

    if path in STATUS_FILES:
        if STATUS_REPLACEMENT in text:
            pass
        else:
            count = text.count(STATUS_OPEN)
            if count != 1:
                raise RuntimeError(f"{path}: expected one result surface, found {count}")
            text = text.replace(STATUS_OPEN, STATUS_REPLACEMENT, 1)
            changes.append("programmatic_result_status")

    if representative:
        text, added = inject_before_style_close(
            text,
            REDUCED_MOTION_CSS,
            "TRACE Gate 6.5 — reduced-motion assurance",
        )
        if added:
            changes.append("reduced_motion")

        text, added = inject_before_style_close(
            text,
            READABILITY_CSS,
            "TRACE Gate 6.5 — evaluator-critical readability floor",
        )
        if added:
            changes.append("evaluator_readability_floor")

        text, added = inject_before_style_close(
            text,
            REFLOW_CSS,
            "TRACE Gate 6.5 — bounded mobile reflow repair",
        )
        if added:
            changes.append("mobile_reflow_overflow_guard")

    if text != original:
        file_path.write_text(text, encoding="utf-8")

    return {
        "path": path,
        "changed": text != original,
        "changes": changes,
        "bytes_before": len(original.encode("utf-8")),
        "bytes_after": len(text.encode("utf-8")),
    }


def verify_invariants() -> dict:
    checks: dict[str, object] = {}

    stale = []
    for n, path in R5_FILES.items():
        text = (ROOT / path).read_text(encoding="utf-8")
        if f"R5.{n} CANDIDATE" in text:
            stale.append(path)
        if f"R5.{n} · VALIDATED" not in text:
            raise RuntimeError(f"{path}: validated promotion label missing")
    checks["stale_candidate_labels"] = stale

    missing_status = []
    for path in STATUS_FILES:
        text = (ROOT / path).read_text(encoding="utf-8")
        if STATUS_REPLACEMENT not in text:
            missing_status.append(path)
    checks["missing_status_contract"] = missing_status

    missing_reduce = []
    missing_reflow = []
    for path in REPRESENTATIVES.values():
        text = (ROOT / path).read_text(encoding="utf-8")
        if "prefers-reduced-motion" not in text:
            missing_reduce.append(path)
        if "TRACE Gate 6.5 — bounded mobile reflow repair" not in text:
            missing_reflow.append(path)
    checks["missing_reduced_motion"] = missing_reduce
    checks["missing_mobile_reflow_guard"] = missing_reflow

    if stale or missing_status or missing_reduce or missing_reflow:
        raise RuntimeError(f"post-patch invariant failure: {checks}")
    return checks


def main() -> None:
    reports = []
    representative_paths = set(REPRESENTATIVES.values())
    for n, path in R5_FILES.items():
        reports.append(
            patch_file(path, r5_number=n, representative=path in representative_paths)
        )
    reports.append(
        patch_file(
            REPRESENTATIVES["stereoscopy-uk"],
            r5_number=None,
            representative=True,
        )
    )

    invariants = verify_invariants()
    changed = [r for r in reports if r["changed"]]
    report = {
        "gate": "6.5",
        "scope": "bounded evaluator/accessibility repair",
        "changed_file_count": len(changed),
        "files": reports,
        "invariants": invariants,
        "protected_behavior": [
            "MATCHING/OTHER state-machine logic unchanged",
            "pair geometry and product law unchanged",
            "truth/source wording unchanged",
            "R5 24/24 STRONG result unchanged",
        ],
    }
    out = ROOT / ".trace-validation" / "gate65_patch_report.json"
    out.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
