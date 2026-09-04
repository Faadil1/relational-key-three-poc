from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CASES = [
    {
        "name": "Toyama",
        "path": ROOT / "families/food-toyama/r5-1.html",
        "marker": "TRACE Gate 6.5 — Toyama intrinsic mobile card reflow",
        "css": """
/* TRACE Gate 6.5 — Toyama intrinsic mobile card reflow. */
@media (max-width: 900px) {
  .member { min-width: 0; max-width: 100%; }
  .card { width: 100%; max-width: 100%; min-width: 0; }
}
/* Toyama uses sourceNote/rootLaw instead of the common source/root class names. */
.sourceNote, .rootLaw { font-size: 8px !important; }
@media (max-width: 560px) {
  .sourceNote, .rootLaw { font-size: 9px !important; }
}
""".strip(),
        "required": [
            "TRACE Gate 6.5 — Toyama intrinsic mobile card reflow",
            ".card { width: 100%; max-width: 100%; min-width: 0; }",
            ".sourceNote, .rootLaw { font-size: 8px !important; }",
        ],
    },
    {
        "name": "Textile",
        "path": ROOT / "families/textile-bonwire/r5-2.html",
        "marker": "TRACE Gate 6.5 — Textile intrinsic mobile card reflow",
        "css": """
/* TRACE Gate 6.5 — Textile intrinsic mobile card reflow. */
@media (max-width: 900px) {
  .member { min-width: 0; max-width: 100%; }
  .card { width: 100%; max-width: 100%; min-width: 0; }
}
""".strip(),
        "required": [
            "TRACE Gate 6.5 — Textile intrinsic mobile card reflow",
            ".card { width: 100%; max-width: 100%; min-width: 0; }",
        ],
    },
]

for case in CASES:
    path = case["path"]
    text = path.read_text(encoding="utf-8")
    if case["marker"] not in text:
        idx = text.rfind("</style>")
        if idx < 0:
            raise SystemExit(f"{case['name']}: missing </style>")
        text = text[:idx] + "\n" + case["css"] + "\n" + text[idx:]
        path.write_text(text, encoding="utf-8")
        print(f"{case['name']} intrinsic mobile reflow repair applied")
    else:
        print(f"{case['name']} intrinsic mobile reflow repair already present")

    post = path.read_text(encoding="utf-8")
    missing = [item for item in case["required"] if item not in post]
    if missing:
        raise SystemExit(f"{case['name']} follow-up invariant failed: {missing}")
