from __future__ import annotations

import asyncio
import importlib.util
from pathlib import Path

from playwright.async_api import TimeoutError as PlaywrightTimeoutError

HERE = Path(__file__).resolve().parent
BASE_SCRIPT = HERE / "gate65_runtime_capture.py"

spec = importlib.util.spec_from_file_location("gate65_runtime_capture_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError("unable to load Gate 6.5 base runtime capture")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


async def _uses_data_mode(page) -> bool:
    return await page.locator('[data-mode="match"]').count() > 0


async def select_claim(page, claim: str) -> None:
    """Select MATCHING/OTHER across the two existing family control contracts."""
    claim_selector = f'[data-claim="{claim}"]'
    if await page.locator(claim_selector).count() > 0:
        button = page.locator(claim_selector)
    else:
        mode = "match" if claim == "matching" else "other"
        button = page.locator(f'[data-mode="{mode}"]')
    await button.wait_for(state="visible", timeout=3000)
    await button.click()


async def wait_run_cycle(page, timeout_ms: int = 12000) -> None:
    """Wait for a disabled cycle or a truthful terminal result."""
    run = page.locator("#run")
    await run.wait_for(state="visible", timeout=3000)

    saw_disabled = False
    try:
        await page.wait_for_function(
            "document.querySelector('#run')?.disabled === true",
            timeout=1500,
        )
        saw_disabled = True
    except PlaywrightTimeoutError:
        pass

    try:
        if saw_disabled:
            await page.wait_for_function(
                "document.querySelector('#run')?.disabled === false",
                timeout=timeout_ms,
            )
        else:
            await page.wait_for_function(
                """() => {
                  const result = document.querySelector('#result');
                  const run = document.querySelector('#run');
                  if (!result || !run || run.disabled) return false;
                  const cls = result.className || '';
                  const text = (result.textContent || '').trim();
                  return /(^|\\s)(ok|bad|badResult)(\\s|$)/.test(cls)
                    || /^CONTINUE\\b/.test(text);
                }""",
                timeout=timeout_ms,
            )
    except PlaywrightTimeoutError as exc:
        raise AssertionError(
            "relationship run did not reach an enabled terminal result state"
        ) from exc


async def run_claim(page, claim: str) -> dict[str, str | None]:
    await select_claim(page, claim)
    result = page.locator("#result")
    before = (await result.inner_text()).strip()
    await page.locator("#run").click()
    await wait_run_cycle(page)
    after = (await result.inner_text()).strip()
    phase = await page.locator("#pair").get_attribute("data-phase")
    css_class = await result.get_attribute("class")

    if after == before:
        raise AssertionError(f"{claim}: result text did not change")
    if not phase:
        raise AssertionError(f"{claim}: terminal phase missing")

    stereo_other_idle = (
        claim == "other"
        and await _uses_data_mode(page)
        and phase == "idle"
        and "RELATION NOT REGISTERED" in after
    )
    if phase == "idle" and not stereo_other_idle:
        raise AssertionError(f"{claim}: terminal phase was not reached")

    return {"before": before, "after": after, "phase": phase, "class": css_class}


async def page_diagnostics(page):
    """Collect base diagnostics plus established alternate class names."""
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
          sourceFontSize: document.querySelector('.source, .sourceNote') ? getComputedStyle(document.querySelector('.source, .sourceNote')).fontSize : null,
          roleFontSize: document.querySelector('.role, .eyeTag') ? getComputedStyle(document.querySelector('.role, .eyeTag')).fontSize : null,
          contextFontSize: document.querySelector('.context, .meta, .rootLaw') ? getComputedStyle(document.querySelector('.context, .meta, .rootLaw')).fontSize : null,
          motionProbe: (() => {
            const el = document.querySelector('.member, .slot, .pair');
            if (!el) return null;
            const cs = getComputedStyle(el);
            return {transitionDuration: cs.transitionDuration, animationDuration: cs.animationDuration};
          })(),
        })"""
    )


async def keyboard_tab_focus_evidence(browser, slug: str, path: str):
    """Measure focus-visible using actual keyboard navigation, not element.focus()."""
    context = await browser.new_context(viewport={"width": 1440, "height": 1000})
    page = await context.new_page()
    errors: list[str] = []
    page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
    page.on(
        "console",
        lambda msg: errors.append(f"console-{msg.type}: {msg.text}")
        if msg.type == "error"
        else None,
    )
    response = await page.goto(
        base.BASE_URL + path,
        wait_until="domcontentloaded",
        timeout=15000,
    )
    await page.locator("#pair").wait_for(state="visible", timeout=5000)
    await select_claim(page, "matching")

    reached = False
    for _ in range(12):
        active_id = await page.evaluate("document.activeElement?.id || ''")
        if active_id == "run":
            reached = True
            break
        await page.keyboard.press("Tab")
    if not reached:
        active_id = await page.evaluate("document.activeElement?.id || ''")
        reached = active_id == "run"
    if not reached:
        raise AssertionError(f"{slug}: keyboard Tab path did not reach #run")

    focus = await page.evaluate(
        """() => {
          const el = document.querySelector('#run');
          const cs = getComputedStyle(el);
          return {
            activeId: document.activeElement?.id || null,
            focusVisible: el?.matches(':focus-visible') || false,
            outlineStyle: cs.outlineStyle,
            outlineWidth: cs.outlineWidth,
            outlineOffset: cs.outlineOffset,
            rect: el ? {width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height} : null,
          };
        }"""
    )
    await page.screenshot(
        path=base.OUT / f"{slug}-keyboard-tab-focus-desktop.png",
        full_page=True,
    )
    await context.close()
    if errors:
        raise AssertionError(f"{slug}: keyboard focus browser errors: {errors}")
    return {
        "http_status": response.status if response else None,
        "focus": focus,
        "errors": errors,
        "input_path": "Tab",
    }


_original_capture_rep = base.capture_rep


async def capture_rep(browser, slug: str, path: str):
    data = await _original_capture_rep(browser, slug, path)

    # Replace the base programmatic-focus probe with a real Tab navigation probe.
    tab_evidence = await keyboard_tab_focus_evidence(browser, slug, path)
    data["keyboard"]["focus"] = tab_evidence["focus"]
    data["keyboard"]["focus_input_path"] = tab_evidence["input_path"]
    data["keyboard"]["focus_http_status"] = tab_evidence["http_status"]

    # Specialist Assurance 001 explicitly requested one mobile/touch runtime path.
    if slug == "frida-coyoacan":
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            has_touch=True,
            is_mobile=True,
        )
        page = await context.new_page()
        touch_errors: list[str] = []
        page.on("pageerror", lambda exc: touch_errors.append(f"pageerror: {exc}"))
        page.on(
            "console",
            lambda msg: touch_errors.append(f"console-{msg.type}: {msg.text}")
            if msg.type == "error"
            else None,
        )
        response = await page.goto(
            base.BASE_URL + path,
            wait_until="domcontentloaded",
            timeout=15000,
        )
        await page.locator("#pair").wait_for(state="visible", timeout=5000)
        matching = await run_claim(page, "matching")
        diag = await page_diagnostics(page)
        await page.screenshot(
            path=base.OUT / "frida-coyoacan-matching-mobile-touch.png",
            full_page=True,
        )
        if diag["scrollWidth"] > diag["width"] + 1:
            raise AssertionError(
                f"frida-coyoacan mobile touch overflow {diag['scrollWidth']} > {diag['width']}"
            )
        if touch_errors:
            raise AssertionError(f"frida-coyoacan mobile touch browser errors: {touch_errors}")
        data["mobile_touch"] = {
            "http_status": response.status if response else None,
            "matching": matching,
            "diagnostics": diag,
            "errors": touch_errors,
        }
        await context.close()

    return data


base.wait_run_cycle = wait_run_cycle
base.select_claim = select_claim
base.run_claim = run_claim
base.page_diagnostics = page_diagnostics
base.capture_rep = capture_rep

if __name__ == "__main__":
    asyncio.run(base.main())
