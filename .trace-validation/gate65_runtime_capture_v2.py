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


base.wait_run_cycle = wait_run_cycle

if __name__ == "__main__":
    asyncio.run(base.main())
