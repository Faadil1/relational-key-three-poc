from __future__ import annotations

import asyncio
import csv
import json
import os
import re
from pathlib import Path
from typing import Any

from playwright.async_api import async_playwright, Page

BASE_URL = os.environ.get("RELATIONAL_KEY_PRODUCTION_URL", "https://relational-key-collectionrelational.vercel.app").rstrip("/")
OUT = Path(os.environ.get("TRACE_CAPTURE_OUT", "trace-gate65-artifacts"))
SCREEN = OUT / "screenshots"
VIDEO = OUT / "video"

REPRESENTATIVES = [
    "city-gatineau",
    "service-benin",
    "signal-nigeria",
    "frida-coyoacan",
    "food-toyama",
    "textile-bonwire",
    "swell-marshall",
    "stereoscopy-uk",
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "laptop": {"width": 1366, "height": 768},
    "mobile": {"width": 390, "height": 844},
}


def family_slugs() -> list[str]:
    root = Path("families")
    values = sorted(p.name for p in root.iterdir() if p.is_dir() and p.name != "_shared")
    return values


async def install_perf_observers(page: Page) -> None:
    await page.add_init_script(
        """
        (() => {
          window.__TRACE_GATE65 = {longtasks: [], layoutShifts: [], errors: []};
          try {
            new PerformanceObserver(list => {
              for (const e of list.getEntries()) window.__TRACE_GATE65.longtasks.push({startTime:e.startTime,duration:e.duration});
            }).observe({entryTypes:['longtask']});
          } catch (_) {}
          try {
            new PerformanceObserver(list => {
              for (const e of list.getEntries()) if (!e.hadRecentInput) window.__TRACE_GATE65.layoutShifts.push({startTime:e.startTime,value:e.value});
            }).observe({type:'layout-shift', buffered:true});
          } catch (_) {}
          window.addEventListener('error', e => window.__TRACE_GATE65.errors.push(String(e.message || e.error || 'error')));
          window.addEventListener('unhandledrejection', e => window.__TRACE_GATE65.errors.push(String(e.reason || 'unhandledrejection')));
        })();
        """
    )


async def goto(page: Page, url: str) -> dict[str, Any]:
    response = None
    error = None
    try:
        response = await page.goto(url, wait_until="networkidle", timeout=30000)
    except Exception as exc:
        error = f"{type(exc).__name__}: {exc}"
    return {
        "status": response.status if response else None,
        "ok": response.ok if response else False,
        "final_url": page.url,
        "error": error,
    }


async def page_facts(page: Page) -> dict[str, Any]:
    return await page.evaluate(
        """
        () => {
          const all = [...document.querySelectorAll('body *')];
          const visibleText = all.filter(el => {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && (el.textContent || '').trim();
          });
          const fontRows = visibleText.map(el => {
            const s = getComputedStyle(el);
            const size = parseFloat(s.fontSize || '0');
            return {tag:el.tagName.toLowerCase(), cls:el.className && String(el.className).slice(0,80), size, text:(el.textContent||'').trim().replace(/\\s+/g,' ').slice(0,140)};
          }).filter(x => Number.isFinite(x.size));
          const tiny = fontRows.filter(x => x.size < 10).sort((a,b) => a.size-b.size).slice(0,40);
          const animations = document.getAnimations ? document.getAnimations().map(a => ({playState:a.playState,currentTime:a.currentTime,effect: String(a.effect?.target?.className || a.effect?.target?.id || a.effect?.target?.tagName || '')})).slice(0,40) : [];
          const nav = performance.getEntriesByType('navigation')[0];
          const resources = performance.getEntriesByType('resource');
          const live = [...document.querySelectorAll('[role="status"],[role="alert"],[aria-live]')].map(el => ({tag:el.tagName.toLowerCase(),role:el.getAttribute('role'),live:el.getAttribute('aria-live'),text:(el.textContent||'').trim().slice(0,180)}));
          const buttons = [...document.querySelectorAll('button')].map(b => ({text:(b.textContent||'').trim(),disabled:b.disabled,ariaPressed:b.getAttribute('aria-pressed')}));
          return {
            title: document.title,
            body_has_candidate_text: /\\bCANDIDATE\\b/i.test(document.body.innerText || ''),
            viewport: {innerWidth, innerHeight, devicePixelRatio},
            reflow: {scrollWidth:document.documentElement.scrollWidth, clientWidth:document.documentElement.clientWidth, horizontalOverflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1},
            live_regions: live,
            buttons,
            font_min_px: fontRows.length ? Math.min(...fontRows.map(x => x.size)) : null,
            tiny_text_under_10px: tiny,
            animation_count: animations.length,
            animations,
            navigation: nav ? {domContentLoadedEventEnd:nav.domContentLoadedEventEnd, loadEventEnd:nav.loadEventEnd, duration:nav.duration, transferSize:nav.transferSize, encodedBodySize:nav.encodedBodySize, decodedBodySize:nav.decodedBodySize} : null,
            resources: {count:resources.length, transferSize:resources.reduce((s,r)=>s+(r.transferSize||0),0)},
            observers: window.__TRACE_GATE65 || null,
          };
        }
        """
    )


async def try_click(page: Page, selectors: list[str]) -> bool:
    for selector in selectors:
        try:
            loc = page.locator(selector).first
            if await loc.count() and await loc.is_visible():
                await loc.click(timeout=2500)
                return True
        except Exception:
            pass
    return False


async def click_claim_and_run(page: Page, claim: str) -> dict[str, Any]:
    if claim == "matching":
        claim_selectors = [
            '[data-claim="matching"]',
            'button:has-text("MATCHING")',
            'button:has-text("MATCH")',
            '[data-mode="matching"]',
        ]
    else:
        claim_selectors = [
            '[data-claim="other"]',
            'button:has-text("OTHER")',
            'button:has-text("MISMATCH")',
            '[data-mode="other"]',
        ]
    run_selectors = [
        '#run',
        'button:has-text("TEST RELATIONSHIP")',
        'button:has-text("TEST RELATION")',
        'button:has-text("RUN")',
        'button:has-text("CONNECT")',
        'button:has-text("PAIR")',
    ]
    claim_clicked = await try_click(page, claim_selectors)
    run_clicked = await try_click(page, run_selectors)
    if run_clicked:
        await page.wait_for_timeout(4600)
    result = await page.evaluate(
        """
        () => {
          const candidates = ['#result','[role="status"]','[aria-live]','.result','.status','.outcome'];
          for (const s of candidates) {
            const el = document.querySelector(s);
            if (el && (el.textContent || '').trim()) return (el.textContent || '').trim().replace(/\\s+/g,' ').slice(0,300);
          }
          return null;
        }
        """
    )
    return {"claim_clicked": claim_clicked, "run_clicked": run_clicked, "result_text": result}


async def keyboard_probe(page: Page) -> dict[str, Any]:
    rows = []
    for _ in range(8):
        await page.keyboard.press("Tab")
        rows.append(await page.evaluate(
            """
            () => {
              const el = document.activeElement;
              if (!el) return null;
              const s = getComputedStyle(el);
              return {
                tag:el.tagName.toLowerCase(),
                id:el.id || null,
                cls:el.className ? String(el.className).slice(0,100) : null,
                text:(el.textContent || el.getAttribute('aria-label') || '').trim().replace(/\\s+/g,' ').slice(0,160),
                outlineStyle:s.outlineStyle,
                outlineWidth:s.outlineWidth,
                boxShadow:s.boxShadow,
              };
            }
            """
        ))
    return {"tab_sequence": rows}


async def route_integrity(browser, slugs: list[str]) -> list[dict[str, Any]]:
    rows = []
    context = await browser.new_context(viewport=VIEWPORTS["laptop"])
    page = await context.new_page()
    for slug in slugs:
        url = f"{BASE_URL}/families/{slug}/"
        nav = await goto(page, url)
        title = await page.title()
        body = ""
        try:
            body = await page.locator("body").inner_text(timeout=2000)
        except Exception:
            pass
        rows.append({
            "slug": slug,
            "url": url,
            **nav,
            "title": title,
            "has_candidate_text": bool(re.search(r"\\bCANDIDATE\\b", body, re.I)),
            "has_matching_text": bool(re.search(r"MATCHING|MATCH\\b", body, re.I)),
            "has_other_text": bool(re.search(r"\\bOTHER\\b|MISMATCH", body, re.I)),
            "body_chars": len(body),
        })
    await context.close()
    return rows


async def capture_root(browser) -> dict[str, Any]:
    result = {}
    for name, viewport in VIEWPORTS.items():
        context = await browser.new_context(viewport=viewport, reduced_motion="no-preference")
        page = await context.new_page()
        await install_perf_observers(page)
        nav = await goto(page, BASE_URL + "/")
        await page.screenshot(path=SCREEN / f"root-{name}.png", full_page=True)
        facts = await page_facts(page)
        result[name] = {"navigation": nav, "facts": facts}
        await context.close()
    return result


async def capture_representative(browser, slug: str) -> dict[str, Any]:
    url = f"{BASE_URL}/families/{slug}/"
    context = await browser.new_context(viewport=VIEWPORTS["desktop"], reduced_motion="no-preference")
    page = await context.new_page()
    await install_perf_observers(page)
    nav = await goto(page, url)
    await page.screenshot(path=SCREEN / f"{slug}-idle.png", full_page=True)
    idle = await page_facts(page)

    matching = await click_claim_and_run(page, "matching")
    await page.screenshot(path=SCREEN / f"{slug}-matching.png", full_page=True)
    matching_facts = await page_facts(page)

    await page.reload(wait_until="networkidle")
    other = await click_claim_and_run(page, "other")
    await page.screenshot(path=SCREEN / f"{slug}-other.png", full_page=True)
    other_facts = await page_facts(page)

    await page.reload(wait_until="networkidle")
    keyboard = await keyboard_probe(page)

    await context.close()
    return {
        "slug": slug,
        "url": url,
        "navigation": nav,
        "idle": idle,
        "matching": matching,
        "matching_facts": matching_facts,
        "other": other,
        "other_facts": other_facts,
        "keyboard": keyboard,
    }


async def frida_specialist(browser) -> dict[str, Any]:
    slug = "frida-coyoacan"
    url = f"{BASE_URL}/families/{slug}/"
    # Desktop recorded interaction, including interruption/repeat and keyboard activation.
    context = await browser.new_context(
        viewport=VIEWPORTS["desktop"],
        record_video_dir=str(VIDEO),
        record_video_size={"width": 1440, "height": 900},
        reduced_motion="no-preference",
    )
    page = await context.new_page()
    await install_perf_observers(page)
    nav = await goto(page, url)
    matching = await click_claim_and_run(page, "matching")
    # Repeated activation should clear old timers and restart coherently.
    repeated = await click_claim_and_run(page, "matching")
    # Start matching then switch claim quickly to exercise interruption/reset.
    await page.reload(wait_until="networkidle")
    claim_clicked = await try_click(page, ['[data-claim="matching"]', 'button:has-text("MATCHING")'])
    run_clicked = await try_click(page, ['#run', 'button:has-text("TEST RELATIONSHIP")'])
    await page.wait_for_timeout(700)
    switched = await try_click(page, ['[data-claim="other"]', 'button:has-text("OTHER")'])
    switched_run = await try_click(page, ['#run', 'button:has-text("TEST RELATIONSHIP")'])
    await page.wait_for_timeout(4600)
    interrupted_result = await page.locator('#result').inner_text() if await page.locator('#result').count() else None
    await page.screenshot(path=SCREEN / "frida-specialist-desktop.png", full_page=True)
    keyboard = await keyboard_probe(page)
    desktop_facts = await page_facts(page)
    desktop_video = str(await page.video.path()) if page.video else None
    await context.close()

    # Mobile/touch class evidence.
    mctx = await browser.new_context(
        viewport=VIEWPORTS["mobile"],
        is_mobile=True,
        has_touch=True,
        record_video_dir=str(VIDEO),
        record_video_size={"width": 390, "height": 844},
        reduced_motion="no-preference",
    )
    mpage = await mctx.new_page()
    await install_perf_observers(mpage)
    mnav = await goto(mpage, url)
    mobile_matching = await click_claim_and_run(mpage, "matching")
    await mpage.screenshot(path=SCREEN / "frida-specialist-mobile.png", full_page=True)
    mobile_facts = await page_facts(mpage)
    mobile_video = str(await mpage.video.path()) if mpage.video else None
    await mctx.close()

    # Reduced-motion environment evidence; the source may or may not respond to it.
    rctx = await browser.new_context(viewport=VIEWPORTS["desktop"], reduced_motion="reduce")
    rpage = await rctx.new_page()
    await install_perf_observers(rpage)
    rnav = await goto(rpage, url)
    reduced_before = await page_facts(rpage)
    reduced_matching = await click_claim_and_run(rpage, "matching")
    reduced_after = await page_facts(rpage)
    await rpage.screenshot(path=SCREEN / "frida-reduced-motion.png", full_page=True)
    await rctx.close()

    return {
        "navigation": nav,
        "matching": matching,
        "repeated": repeated,
        "interruption": {"matching_claim": claim_clicked, "matching_run": run_clicked, "switched_to_other": switched, "other_run": switched_run, "result": interrupted_result},
        "keyboard": keyboard,
        "desktop_facts": desktop_facts,
        "desktop_video": desktop_video,
        "mobile_navigation": mnav,
        "mobile_matching": mobile_matching,
        "mobile_facts": mobile_facts,
        "mobile_video": mobile_video,
        "reduced_motion_navigation": rnav,
        "reduced_motion_before": reduced_before,
        "reduced_motion_matching": reduced_matching,
        "reduced_motion_after": reduced_after,
    }


def summarize(report: dict[str, Any]) -> str:
    routes = report["route_integrity"]
    route_ok = sum(1 for r in routes if r.get("status") == 200)
    candidate = [r["slug"] for r in routes if r.get("has_candidate_text")]
    reps = report["representatives"]
    matching_detected = sum(1 for r in reps if r["matching"].get("run_clicked"))
    other_detected = sum(1 for r in reps if r["other"].get("run_clicked"))
    root_mobile = report["root"]["mobile"]["facts"]
    frida = report["frida_specialist"]
    lines = [
        "# RELATIONAL KEY — TRACE Gate 6.5 automated capture summary",
        "",
        f"Production URL: `{BASE_URL}`",
        f"Family directories discovered: **{len(routes)}**",
        f"HTTP 200 family routes: **{route_ok}/{len(routes)}**",
        f"Representative MATCHING run controls detected: **{matching_detected}/{len(reps)}**",
        f"Representative OTHER run controls detected: **{other_detected}/{len(reps)}**",
        f"Routes whose rendered text still contains `CANDIDATE`: **{len(candidate)}**",
        f"Root mobile horizontal overflow: **{root_mobile['reflow']['horizontalOverflow']}**",
        "",
        "## Candidate-text routes",
        "",
        *(f"- `{x}`" for x in candidate),
        "",
        "## Frida specialist probe",
        "",
        f"- Matching run detected: `{frida['matching']['run_clicked']}`",
        f"- Repeated run detected: `{frida['repeated']['run_clicked']}`",
        f"- Interrupted switch to OTHER detected: `{frida['interruption']['switched_to_other']}`",
        f"- Mobile matching run detected: `{frida['mobile_matching']['run_clicked']}`",
        f"- Desktop live regions: `{len(frida['desktop_facts']['live_regions'])}`",
        f"- Desktop minimum visible computed font: `{frida['desktop_facts']['font_min_px']}px`",
        f"- Mobile horizontal overflow: `{frida['mobile_facts']['reflow']['horizontalOverflow']}`",
        f"- Reduced-motion animation count after MATCHING: `{frida['reduced_motion_after']['animation_count']}`",
        "",
        "This harness captures evidence only. It does not grant TRACE Gate PASS or formal accessibility conformance.",
    ]
    return "\n".join(lines) + "\n"


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    SCREEN.mkdir(parents=True, exist_ok=True)
    VIDEO.mkdir(parents=True, exist_ok=True)
    slugs = family_slugs()
    if len(slugs) != 24:
        raise RuntimeError(f"Expected exactly 24 family directories, found {len(slugs)}: {slugs}")

    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        routes = await route_integrity(browser, slugs)
        root = await capture_root(browser)
        reps = []
        for slug in REPRESENTATIVES:
            if slug not in slugs:
                raise RuntimeError(f"Representative route missing from families/: {slug}")
            reps.append(await capture_representative(browser, slug))
        frida = await frida_specialist(browser)
        await browser.close()

    report = {
        "schema": "trace-gate65-capture/0.1",
        "production_url": BASE_URL,
        "family_count": len(slugs),
        "families": slugs,
        "representative_set": REPRESENTATIVES,
        "route_integrity": routes,
        "root": root,
        "representatives": reps,
        "frida_specialist": frida,
    }
    (OUT / "report.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    with (OUT / "route-integrity.csv").open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=["slug", "url", "status", "ok", "final_url", "error", "title", "has_candidate_text", "has_matching_text", "has_other_text", "body_chars"])
        writer.writeheader()
        writer.writerows(routes)
    (OUT / "SUMMARY.md").write_text(summarize(report), encoding="utf-8")

    failed_routes = [r for r in routes if r.get("status") != 200]
    if failed_routes:
        print(f"TRACE_CAPTURE_WARNING: {len(failed_routes)} family routes did not return 200")
    print((OUT / "SUMMARY.md").read_text(encoding="utf-8"))


if __name__ == "__main__":
    asyncio.run(main())
