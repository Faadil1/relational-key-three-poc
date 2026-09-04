from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "families/food-toyama/r5-1.html"
MARKER = "TRACE Gate 6.5 — Toyama intrinsic mobile card reflow"
CSS = """
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
""".strip()

text = PATH.read_text(encoding="utf-8")
if MARKER not in text:
    idx = text.rfind("</style>")
    if idx < 0:
        raise SystemExit("Toyama: missing </style>")
    text = text[:idx] + "\n" + CSS + "\n" + text[idx:]
    PATH.write_text(text, encoding="utf-8")
    print("Toyama intrinsic mobile reflow repair applied")
else:
    print("Toyama intrinsic mobile reflow repair already present")

post = PATH.read_text(encoding="utf-8")
required = [MARKER, ".card { width: 100%; max-width: 100%; min-width: 0; }", ".sourceNote, .rootLaw { font-size: 8px !important; }"]
missing = [item for item in required if item not in post]
if missing:
    raise SystemExit(f"Toyama follow-up invariant failed: {missing}")
