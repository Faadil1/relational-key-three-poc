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


async def wait_run_cycle(page, timeout_ms: int = 12000) -> None:
    """Wait for either a disabled→enabled cycle or a terminal result class.

    Some RELATIONAL KEY families intentionally keep the Run button enabled while
    timers advance (for example Signal Nigeria). Others disable it until the
    sequence completes. The harness must support both implementations without
    changing product behavior.
    """
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
                  return /(^|\\s)(ok|bad|badResult)(\\s|$)/.test(cls);
                }""",
                timeout=timeout_ms,
            )
    except PlaywrightTimeoutError as exc:
        raise AssertionError(
            "relationship run did not reach an enabled terminal result state"
        ) from exc


async def page_diagnostics(page):
    """Collect the base diagnostics plus local alternate class names.

    Toyama uses `.sourceNote`/`.rootLaw` rather than `.source`/`.root`.
    The assurance contract is semantic (evaluator-critical source/context text),
    so the harness must measure either established naming convention.
    """
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


base.wait_run_cycle = wait_run_cycle
base.page_diagnostics = page_diagnostics

if __name__ == "__main__":
    asyncio.run(base.main())
