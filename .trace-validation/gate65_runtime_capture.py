from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path
from typing import Any

from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

BASE_URL = os.environ.get("TRACE_BASE_URL", "http://127.0.0.1:4173").rstrip("/")
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / ".trace-validation" / "gate65-artifacts"
OUT.mkdir(parents=True, exist_ok=True)

REPRESENTATIVES = {
    "city-gatineau": "/families/city-gatineau/r5-8.html",
    "service-benin": "/families/service-benin/r5-9.html",
    "signal-nigeria": "/families/signal-nigeria/r5-10.html",
    "frida-coyoacan": "/families/frida-coyoacan/r5-11.html",
    "food-toyama": "/families/food-toyama/r5-1.html",
    "textile-bonwire": "/families/textile-bonwire/r5-2.html",
    "swell-marshall": "/families/swell-marshall/r5-7.html",
    "stereoscopy-uk": "/families/stereoscopy-uk/snapshot.html",
}


def metric_map(metrics: list[dict[str, Any]]) -> dict[str, float]:
    wanted = {
        "TaskDuration",
        "ScriptDuration",
        "LayoutDuration",
        "RecalcStyleDuration",
        "JSHeapUsedSize",
        "Nodes",
        "LayoutCount",
        "RecalcStyleCount",
    }
    return {m["name"]: m["value"] for m in metrics if m.get("name") in wanted}


async def wait_run_cycle(page, timeout_ms: int = 12000) -> None:
    run = page.locator("#run")
    try:
        await run.wait_for(state="visible", timeout=3000)
        try:
            await page.wait_for_function("document.querySelector('#run')?.disabled === true", timeout=1500)
        except PlaywrightTimeoutError:
            pass
        await page.wait_for_function("document.querySelector('#run')?.disabled === false", timeout=timeout_ms)
    except PlaywrightTimeoutError as exc:
        raise AssertionError("relationship run did not return to enabled state") from exc


async def select_claim(page, claim: str) -> None:
    button = page.locator(f'[data-claim="{claim}"]')
    await button.wait_for(state="visible", timeout=3000)
    await button.click()


async def run_claim(page, claim: str) -> dict[str, str | None]:
    await select_claim(page, claim)
    before = (await page.locator("#result").inner_text()).strip()
    await page.locator("#run").click()
    await wait_run_cycle(page)
    result = page.locator("#result")
    after = (await result.inner_text()).strip()
    phase = await page.locator("#pair").get_attribute("data-phase")
    css_class = await result.get_attribute("class")
    if after == before:
        raise AssertionError(f"{claim}: result text did not change")
    if not phase or phase == "idle":
        raise AssertionError(f"{claim}: terminal phase was not reached")
    return {"before": before, "after": after, "phase": phase, "class": css_class}


async def page_diagnostics(page) -> dict[str, Any]:
    return await page.evaluate(
        """() => ({
          href: location.href,
          title: document.title,
          width: innerWidth,
          height: innerHeight,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth || 0),
          scrollHeight: Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0),
          reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
          resultRole: document.querySelector('#result')?.getAttribute('role') || null,
          resultLive: document.querySelector('#result')?.getAttribute('aria-live') || null,
          resultAtomic: document.querySelector('#result')?.getAttribute('aria-atomic') || null,
          resultFontSize: document.querySelector('#result') ? getComputedStyle(document.querySelector('#result')).fontSize : null,
          truthFontSize: document.querySelector('.truth') ? getComputedStyle(document.querySelector('.truth')).fontSize : null,
          sourceFontSize: document.querySelector('.source') ? getComputedStyle(document.querySelector('.source')).fontSize : null,
          roleFontSize: document.querySelector('.role, .eyeTag') ? getComputedStyle(document.querySelector('.role, .eyeTag')).fontSize : null,
          contextFontSize: document.querySelector('.context, .meta') ? getComputedStyle(document.querySelector('.context, .meta')).fontSize : null,
          motionProbe: (() => {
            const el = document.querySelector('.member, .slot, .pair');
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {transitionDuration: cs.transitionDuration, animationDuration: cs.animationDuration};
          })(),
        })"""
    )


async def capture_root(browser) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for name, viewport in {
        "desktop": {"width": 1440, "height": 1000},
        "mobile": {"width": 390, "height": 844},
    }.items():
        context = await browser.new_context(viewport=viewport)
        page = await context.new_page()
        errors: list[str] = []
        page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
        page.on("console", lambda msg: errors.append(f"console-{msg.type}: {msg.text}") if msg.type == "error" else None)
        response = await page.goto(BASE_URL + "/", wait_until="domcontentloaded", timeout=15000)
        await page.wait_for_selector("#grid .family", timeout=7000)
        family_count = await page.locator("#grid .family").count()
        diag = await page_diagnostics(page)
        await page.screenshot(path=OUT / f"root-{name}.png", full_page=True)
        result[name] = {
            "http_status": response.status if response else None,
            "family_count": family_count,
            "no_horizontal_overflow": diag["scrollWidth"] <= diag["width"] + 1,
            "diagnostics": diag,
            "errors": errors,
        }
        if family_count != 24:
            raise AssertionError(f"root {name}: expected 24 families, got {family_count}")
        if not result[name]["no_horizontal_overflow"]:
            raise AssertionError(f"root {name}: horizontal overflow detected")
        await context.close()
    return result


async def capture_rep(browser, slug: str, path: str) -> dict[str, Any]:
    context = await browser.new_context(viewport={"width": 1440, "height": 1000})
    page = await context.new_page()
    errors: list[str] = []
    page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
    page.on("console", lambda msg: errors.append(f"console-{msg.type}: {msg.text}") if msg.type == "error" else None)
    cdp = await context.new_cdp_session(page)
    await cdp.send("Performance.enable")

    response = await page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=15000)
    await page.locator("#pair").wait_for(state="visible", timeout=5000)
    diag_idle = await page_diagnostics(page)

    if diag_idle["resultRole"] != "status" or diag_idle["resultLive"] != "polite" or diag_idle["resultAtomic"] != "true":
        raise AssertionError(f"{slug}: result status semantics missing: {diag_idle}")

    await page.screenshot(path=OUT / f"{slug}-idle-desktop.png", full_page=True)
    matching = await run_claim(page, "matching")
    await page.screenshot(path=OUT / f"{slug}-matching-desktop.png", full_page=True)
    metrics_matching = metric_map((await cdp.send("Performance.getMetrics"))["metrics"])

    other = await run_claim(page, "other")
    await page.screenshot(path=OUT / f"{slug}-other-desktop.png", full_page=True)

    # Interruption/repeat evidence: start matching, switch claim before completion, then run OTHER to terminal.
    await select_claim(page, "matching")
    await page.locator("#run").click()
    await page.wait_for_timeout(180)
    await select_claim(page, "other")
    if await page.locator("#run").is_disabled():
        await page.wait_for_function("document.querySelector('#run')?.disabled === false", timeout=3000)
    await page.locator("#run").click()
    await wait_run_cycle(page)
    interruption_result = (await page.locator("#result").inner_text()).strip()
    interruption_phase = await page.locator("#pair").get_attribute("data-phase")

    # Keyboard activation + focus-visible evidence.
    await select_claim(page, "matching")
    run = page.locator("#run")
    await run.focus()
    focus_evidence = await page.evaluate(
        """() => {
          const el = document.querySelector('#run');
          const cs = getComputedStyle(el);
          return {
            activeId: document.activeElement?.id || null,
            focusVisible: el?.matches(':focus-visible') || false,
            outlineStyle: cs.outlineStyle,
            outlineWidth: cs.outlineWidth,
            rect: el ? {width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height} : null,
          };
        }"""
    )
    await page.keyboard.press("Enter")
    await wait_run_cycle(page)
    keyboard_result = (await page.locator("#result").inner_text()).strip()

    await page.screenshot(path=OUT / f"{slug}-keyboard-desktop.png", full_page=True)
    final_diag = await page_diagnostics(page)
    await context.close()

    # Mobile/reflow exact-target capture.
    mobile = await browser.new_context(viewport={"width": 390, "height": 844})
    mobile_page = await mobile.new_page()
    mobile_errors: list[str] = []
    mobile_page.on("pageerror", lambda exc: mobile_errors.append(f"pageerror: {exc}"))
    mobile_page.on("console", lambda msg: mobile_errors.append(f"console-{msg.type}: {msg.text}") if msg.type == "error" else None)
    await mobile_page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=15000)
    await mobile_page.locator("#pair").wait_for(state="visible", timeout=5000)
    mobile_diag = await page_diagnostics(mobile_page)
    await mobile_page.screenshot(path=OUT / f"{slug}-idle-mobile.png", full_page=True)
    if mobile_diag["scrollWidth"] > mobile_diag["width"] + 1:
        raise AssertionError(f"{slug}: mobile horizontal overflow {mobile_diag['scrollWidth']} > {mobile_diag['width']}")
    await mobile.close()

    # Reduced-motion evidence.
    reduced = await browser.new_context(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce")
    reduced_page = await reduced.new_page()
    reduced_errors: list[str] = []
    reduced_page.on("pageerror", lambda exc: reduced_errors.append(f"pageerror: {exc}"))
    reduced_page.on("console", lambda msg: reduced_errors.append(f"console-{msg.type}: {msg.text}") if msg.type == "error" else None)
    await reduced_page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=15000)
    reduced_diag_before = await page_diagnostics(reduced_page)
    if not reduced_diag_before["reducedMotion"]:
        raise AssertionError(f"{slug}: reduced-motion media query not active")
    reduced_matching = await run_claim(reduced_page, "matching")
    reduced_diag_after = await page_diagnostics(reduced_page)
    await reduced_page.screenshot(path=OUT / f"{slug}-matching-reduced-motion.png", full_page=True)
    await reduced.close()

    all_errors = errors + mobile_errors + reduced_errors
    return {
        "path": path,
        "http_status": response.status if response else None,
        "idle": diag_idle,
        "matching": matching,
        "other": other,
        "interruption": {"result": interruption_result, "phase": interruption_phase},
        "keyboard": {"focus": focus_evidence, "result": keyboard_result},
        "mobile": {"diagnostics": mobile_diag, "no_horizontal_overflow": True},
        "reduced_motion": {"before": reduced_diag_before, "matching": reduced_matching, "after": reduced_diag_after},
        "performance": metrics_matching,
        "final": final_diag,
        "errors": all_errors,
    }


async def main() -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        report: dict[str, Any] = {
            "gate": "6.5",
            "base_url": BASE_URL,
            "root": await capture_root(browser),
            "representatives": {},
        }
        for slug, path in REPRESENTATIVES.items():
            print(f"[TRACE 6.5] capturing {slug}", flush=True)
            report["representatives"][slug] = await capture_rep(browser, slug, path)
        await browser.close()

    failures: list[str] = []
    for slug, data in report["representatives"].items():
        if data["http_status"] != 200:
            failures.append(f"{slug}: HTTP {data['http_status']}")
        if data["errors"]:
            failures.append(f"{slug}: browser errors: {data['errors']}")
        focus = data["keyboard"]["focus"]
        if focus["activeId"] != "run" or not focus["focusVisible"]:
            failures.append(f"{slug}: keyboard focus evidence insufficient: {focus}")
        for key in ("resultFontSize", "truthFontSize", "sourceFontSize", "roleFontSize", "contextFontSize"):
            value = data["idle"].get(key)
            if value and float(value.replace("px", "")) < 8.0:
                failures.append(f"{slug}: {key} below 8px: {value}")

    report["failures"] = failures
    report["verdict"] = "PASS" if not failures else "FAIL"
    (OUT / "gate65-runtime-report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    lines = [
        "# TRACE Gate 6.5 exact-target runtime capture",
        "",
        f"Verdict: **{report['verdict']}**",
        f"Base URL: `{BASE_URL}`",
        "",
        "## Root",
        f"- desktop: {report['root']['desktop']['family_count']} families / overflow={not report['root']['desktop']['no_horizontal_overflow']}",
        f"- mobile: {report['root']['mobile']['family_count']} families / overflow={not report['root']['mobile']['no_horizontal_overflow']}",
        "",
        "## Representatives",
    ]
    for slug, data in report["representatives"].items():
        lines.append(
            f"- {slug}: HTTP {data['http_status']} · MATCHING `{data['matching']['phase']}` · OTHER `{data['other']['phase']}` · mobile no-overflow · reduced-motion terminal `{data['reduced_motion']['matching']['phase']}`"
        )
    if failures:
        lines.extend(["", "## Failures", *[f"- {x}" for x in failures]])
    (OUT / "SUMMARY.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    if failures:
        raise SystemExit("Gate 6.5 runtime capture failed: " + " | ".join(failures))


if __name__ == "__main__":
    asyncio.run(main())
