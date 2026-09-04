import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const V1 = process.env.RK_V1_URL || 'http://127.0.0.1:4173';
const V2 = process.env.RK_V2_URL || 'http://127.0.0.1:4174';
const OUT = process.env.RK_RUNTIME_OUT || 'runtime-evidence';
const SHOTS = path.join(OUT, 'screenshots');

await fs.mkdir(SHOTS, { recursive: true });

async function selectLegacyClaim(frame, claim) {
  const claimSelector = `[data-claim="${claim}"]`;
  if (await frame.locator(claimSelector).count()) {
    await frame.locator(claimSelector).click();
    return;
  }
  const mode = claim === 'matching' ? 'match' : 'other';
  await frame.locator(`[data-mode="${mode}"]`).click();
}

async function runLegacyClaim(frame, claim, waitMs) {
  await selectLegacyClaim(frame, claim);
  await frame.locator('#run').click();
  await frame.waitForTimeout(waitMs);
}

const pilots = [
  {
    id: 'anamorphosis-paris',
    label: 'Anamorphosis · Paris',
    v1: {
      matching: async (frame) => { await frame.locator('#nearBtn').click(); await frame.waitForTimeout(180); },
      other: async (frame) => { await frame.locator('#otherBtn').click(); await frame.waitForTimeout(180); },
      read: async (frame) => (await frame.locator('#readout').innerText()).trim(),
      matchingExpect: /RECTIFIED REFLECTION/i,
      otherExpect: /VALID OFFSET/i,
    },
    v2: {
      matchingExpect: /MATCHING .*registered in reflection/i,
      otherExpect: /OTHER .*not registered/i,
    },
  },
  {
    id: 'coupler-virginia',
    label: 'Coupler · Virginia',
    v1: {
      matching: async (frame) => {
        await frame.locator('#ready').click();
        await frame.locator('#run').click();
        await frame.waitForTimeout(2350);
      },
      other: async (frame) => {
        await frame.locator('#closed').click();
        await frame.locator('#run').click();
        await frame.waitForTimeout(1750);
      },
      read: async (frame) => (await frame.locator('#result').innerText()).trim(),
      matchingExpect: /LOAD PATH/i,
      otherExpect: /NO LATCH/i,
    },
    v2: {
      matchingExpect: /MATCHING .*locked relation.*pull transfers/i,
      otherExpect: /OTHER \/ CONTACT/i,
    },
  },
  {
    id: 'ombak-bali',
    label: 'Ombak · Bali',
    v1: {
      matching: async (frame) => {
        await frame.locator('#match').click();
        await frame.locator('#run').click();
        await frame.waitForTimeout(850);
      },
      other: async (frame) => {
        await frame.locator('#other').click();
        await frame.locator('#run').click();
        await frame.waitForTimeout(850);
      },
      read: async (frame) => (await frame.locator('#result').innerText()).trim(),
      stop: async (frame) => {
        const button = frame.locator('#audio');
        if (await button.isVisible() && /STOP/i.test(await button.innerText())) await button.click();
      },
      matchingExpect: /REGISTERED .*7 HZ/i,
      otherExpect: /RESIDUAL .*12 HZ/i,
    },
    v2: {
      matchingExpect: /MATCHING .*7\.0 Hz beat envelope/i,
      otherExpect: /OTHER .*12\.0 Hz/i,
    },
  },
  {
    id: 'kento-japan',
    label: 'Kento · Japan',
    v1: {
      matching: async (frame) => runLegacyClaim(frame, 'matching', 5600),
      other: async (frame) => runLegacyClaim(frame, 'other', 5600),
      read: async (frame) => (await frame.locator('#result').innerText()).trim(),
      matchingExpect: /THREE COLOR LAYERS REGISTERED .* ONE IMAGE ACCUMULATED/i,
      otherExpect: /ONE COLOR LAYER MISREGISTERED/i,
    },
    v2: {
      matchingExpect: /MATCHING .*pressure transfers a registered layer/i,
      otherExpect: /OTHER .*kentō registration is offset|OTHER .*offset layer/i,
    },
  },
  {
    id: 'stereoscopy-uk',
    label: 'Stereoscopy · UK',
    v1: {
      matching: async (frame) => runLegacyClaim(frame, 'matching', 5400),
      other: async (frame) => runLegacyClaim(frame, 'other', 5200),
      read: async (frame) => (await frame.locator('#result').innerText()).trim(),
      matchingExpect: /CONTROLLED DISPARITY IS PRESERVED|CONTINUE .* BOTH VIEWS REMAIN DISTINCT/i,
      otherExpect: /RELATION NOT REGISTERED/i,
    },
    v2: {
      matchingExpect: /MATCHING .*stable depth relation emerges/i,
      otherExpect: /OTHER .*disparity refuses the intended fusion/i,
    },
  },
  {
    id: 'signal-nigeria',
    label: 'Signal · Nigeria',
    v1: {
      matching: async (frame) => runLegacyClaim(frame, 'matching', 3800),
      other: async (frame) => runLegacyClaim(frame, 'other', 3300),
      read: async (frame) => (await frame.locator('#result').innerText()).trim(),
      matchingExpect: /LANLATE CAPTURE CARRIED .* REPEATER HANDOFFS REGISTERED/i,
      otherExpect: /LINK NOT CARRIED/i,
    },
    v2: {
      matchingExpect: /MATCHING .*continuous relay path.*receiving card responds/i,
      otherExpect: /OTHER .*relay path breaks/i,
    },
  },
];

function metricMap(metrics) {
  return Object.fromEntries(metrics.map(({ name, value }) => [name, value]));
}

function pickMetrics(map) {
  const keys = [
    'TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration',
    'JSHeapUsedSize', 'JSHeapTotalSize', 'Nodes', 'Documents', 'Frames', 'JSEventListeners',
  ];
  return Object.fromEntries(keys.map((key) => [key, map[key] ?? null]));
}

function deltaMetrics(before, after) {
  const keys = ['TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration'];
  return Object.fromEntries(keys.map((key) => [key, (after[key] ?? 0) - (before[key] ?? 0)]));
}

async function newContext(browser, options = {}) {
  const context = await browser.newContext({
    viewport: options.viewport || { width: 1440, height: 900 },
    reducedMotion: options.reducedMotion || 'no-preference',
    deviceScaleFactor: 1,
  });
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    return route.abort('blockedbyclient');
  });
  await context.addInitScript(() => {
    window.__rkRuntime = { longTasks: [], layoutShifts: [], errors: [], rejections: [] };
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__rkRuntime.longTasks.push({ startTime: entry.startTime, duration: entry.duration });
      }).observe({ type: 'longtask', buffered: true });
    } catch {}
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__rkRuntime.layoutShifts.push({ value: entry.value, startTime: entry.startTime });
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {}
    window.addEventListener('error', (event) => window.__rkRuntime.errors.push(String(event.message || event.error || 'unknown error')));
    window.addEventListener('unhandledrejection', (event) => window.__rkRuntime.rejections.push(String(event.reason || 'unknown rejection')));
  });
  return context;
}

async function setupPage(context) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  return { page, cdp, consoleErrors, pageErrors };
}

async function collect(page, cdp) {
  const { metrics } = await cdp.send('Performance.getMetrics');
  const perf = pickMetrics(metricMap(metrics));
  const browser = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const runtime = window.__rkRuntime || {};
    let webgl = null;
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (gl) {
          const ext = gl.getExtension('WEBGL_debug_renderer_info');
          webgl = {
            vendor: ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
            renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
          };
        }
      } catch {}
    }
    return {
      href: location.href,
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      canvasCount: document.querySelectorAll('canvas').length,
      webgl,
      navigation: nav ? {
        domContentLoaded: nav.domContentLoadedEventEnd,
        loadEventEnd: nav.loadEventEnd,
        transferSize: nav.transferSize,
        encodedBodySize: nav.encodedBodySize,
        decodedBodySize: nav.decodedBodySize,
      } : null,
      longTasks: runtime.longTasks || [],
      layoutShifts: runtime.layoutShifts || [],
      runtimeErrors: runtime.errors || [],
      runtimeRejections: runtime.rejections || [],
      memory: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      } : null,
    };
  });
  return { perf, browser };
}

async function familySurface(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(180);
  const iframe = page.locator('iframe');
  if (await iframe.count()) {
    await page.waitForFunction(() => document.querySelector('iframe')?.contentDocument?.readyState === 'complete');
    const frames = page.frames().filter((frame) => frame !== page.mainFrame());
    if (frames.length !== 1) throw new Error(`Expected one V1 family iframe, found ${frames.length}`);
    return frames[0];
  }
  return page;
}

async function capture(page, name) {
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

async function runV1(browser, pilot) {
  const context = await newContext(browser);
  const session = await setupPage(context);
  const { page, cdp } = session;
  await page.goto(`${V1}/families/${pilot.id}/`, { waitUntil: 'domcontentloaded' });
  const frame = await familySurface(page);
  await frame.waitForTimeout(250);
  const initial = await collect(page, cdp);

  await pilot.v1.other(frame);
  const other = await pilot.v1.read(frame);
  if (!pilot.v1.otherExpect.test(other)) throw new Error(`${pilot.id} V1 OTHER mismatch: ${other}`);
  await capture(page, `v1-${pilot.id}-other`);
  if (pilot.v1.stop) await pilot.v1.stop(frame);

  await pilot.v1.matching(frame);
  const matching = await pilot.v1.read(frame);
  if (!pilot.v1.matchingExpect.test(matching)) throw new Error(`${pilot.id} V1 MATCHING mismatch: ${matching}`);
  await capture(page, `v1-${pilot.id}-matching`);
  if (pilot.v1.stop) await pilot.v1.stop(frame);

  const final = await collect(page, cdp);
  const result = {
    pilot: pilot.id,
    other,
    matching,
    initial,
    final,
    interactionDelta: deltaMetrics(initial.perf, final.perf),
    consoleErrors: session.consoleErrors,
    pageErrors: session.pageErrors,
  };
  await context.close();
  return result;
}

async function chooseV2(page, pilot) {
  await page.getByRole('button', { name: new RegExp(pilot.label.split(' · ')[0], 'i') }).click();
  await page.locator(`[data-scene-runtime="${pilot.id}"]`).waitFor({ state: 'attached', timeout: 10000 });
  await page.locator('canvas').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(100);
}

async function statusText(page) {
  return (await page.locator('.status-strip').innerText()).trim();
}

async function completeV2Matching(page, pilot) {
  if (pilot.id === 'coupler-virginia') {
    await page.getByRole('button', { name: 'PULL +' }).click();
    await page.waitForTimeout(350);
  }
  if (pilot.id === 'ombak-bali') {
    await page.getByRole('button', { name: /START SYNTHETIC AUDIO/i }).click();
    await page.waitForTimeout(500);
  }
  if (pilot.id === 'kento-japan') {
    await page.getByRole('button', { name: 'PRESS / TRANSFER', exact: true }).click();
    await page.waitForTimeout(300);
  }
}

async function runV2Desktop(browser, pilot) {
  const context = await newContext(browser);
  const session = await setupPage(context);
  const { page, cdp } = session;
  await page.goto(V2, { waitUntil: 'domcontentloaded' });
  await page.locator('canvas').waitFor({ state: 'visible' });
  await chooseV2(page, pilot);
  await page.waitForTimeout(250);

  const live = await page.locator('.status-strip').getAttribute('aria-live');
  const role = await page.locator('.status-strip').getAttribute('role');
  if (live !== 'polite' || role !== 'status') throw new Error(`${pilot.id} V2 live-region contract missing`);
  if ((await page.locator('canvas').count()) !== 1) throw new Error(`${pilot.id} V2 must mount exactly one active canvas`);

  const initial = await collect(page, cdp);

  await page.getByRole('button', { name: 'OTHER', exact: true }).click();
  await page.waitForTimeout(180);
  const other = await statusText(page);
  if (!pilot.v2.otherExpect.test(other)) throw new Error(`${pilot.id} V2 OTHER mismatch: ${other}`);
  await capture(page, `v2-${pilot.id}-other`);

  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await page.waitForTimeout(250);
  await completeV2Matching(page, pilot);
  const matching = await statusText(page);
  if (!pilot.v2.matchingExpect.test(matching)) throw new Error(`${pilot.id} V2 MATCHING mismatch: ${matching}`);
  await capture(page, `v2-${pilot.id}-matching`);

  const matchingMetrics = await collect(page, cdp);
  await page.waitForTimeout(1000);
  const oneSecondLater = await collect(page, cdp);
  const idleOrPlayingDelta = deltaMetrics(matchingMetrics.perf, oneSecondLater.perf);

  if (pilot.id === 'ombak-bali') {
    const stop = page.getByRole('button', { name: /STOP AUDIO/i });
    if (await stop.isVisible()) await stop.click();
  }

  await page.getByRole('button', { name: 'OTHER', exact: true }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const keyboardStatus = await statusText(page);
  if (!pilot.v2.otherExpect.test(keyboardStatus)) throw new Error(`${pilot.id} V2 keyboard activation failed: ${keyboardStatus}`);

  const final = await collect(page, cdp);
  const result = {
    pilot: pilot.id,
    other,
    matching,
    keyboardStatus,
    initial,
    final,
    interactionDelta: deltaMetrics(initial.perf, final.perf),
    oneSecondActiveDelta: idleOrPlayingDelta,
    consoleErrors: session.consoleErrors,
    pageErrors: session.pageErrors,
  };
  await context.close();
  return result;
}

async function runV2Mobile(browser, pilot) {
  const context = await newContext(browser, { viewport: { width: 390, height: 844 } });
  const { page, consoleErrors, pageErrors } = await setupPage(context);
  await page.goto(V2, { waitUntil: 'domcontentloaded' });
  await page.locator('canvas').waitFor({ state: 'visible' });
  await chooseV2(page, pilot);
  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await completeV2Matching(page, pilot);
  await page.waitForTimeout(250);
  const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth }));
  if (layout.scrollWidth > layout.width) throw new Error(`${pilot.id} V2 mobile overflow ${layout.scrollWidth} > ${layout.width}`);
  await capture(page, `v2-${pilot.id}-mobile-matching`);
  if (pilot.id === 'ombak-bali') {
    const stop = page.getByRole('button', { name: /STOP AUDIO/i });
    if (await stop.isVisible()) await stop.click();
  }
  await context.close();
  return { pilot: pilot.id, layout, consoleErrors, pageErrors };
}

async function runReducedMotion(browser, pilot) {
  const context = await newContext(browser, { reducedMotion: 'reduce' });
  const { page, consoleErrors, pageErrors } = await setupPage(context);
  await page.goto(V2, { waitUntil: 'domcontentloaded' });
  await chooseV2(page, pilot);
  const note = (await page.locator('.motion-note').innerText()).trim();
  if (!/Reduced motion active/i.test(note)) throw new Error(`${pilot.id} reduced-motion contract not active`);
  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await completeV2Matching(page, pilot);
  await page.waitForTimeout(200);
  await capture(page, `v2-${pilot.id}-reduced-motion`);
  if (pilot.id === 'ombak-bali') {
    const stop = page.getByRole('button', { name: /STOP AUDIO/i });
    if (await stop.isVisible()) await stop.click();
  }
  await context.close();
  return { pilot: pilot.id, note, consoleErrors, pageErrors };
}

const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl'] });
const report = {
  schema: 'RELATIONAL_KEY_V2_RUNTIME_COMPARE_002',
  generatedAt: new Date().toISOString(),
  v1Url: V1,
  v2Url: V2,
  v1: {},
  v2: {},
  mobile: {},
  reducedMotion: {},
  findings: [],
};
let hardFailure = false;

try {
  for (const pilot of pilots) {
    try {
      report.v1[pilot.id] = await runV1(browser, pilot);
      report.v2[pilot.id] = await runV2Desktop(browser, pilot);
      report.mobile[pilot.id] = await runV2Mobile(browser, pilot);
      report.reducedMotion[pilot.id] = await runReducedMotion(browser, pilot);
    } catch (error) {
      hardFailure = true;
      report.findings.push({ severity: 'FAIL', pilot: pilot.id, message: error.stack || String(error) });
    }
  }
} finally {
  await browser.close();
}

for (const pilot of pilots) {
  const v1 = report.v1[pilot.id];
  const v2 = report.v2[pilot.id];
  if (!v1 || !v2) continue;
  if (v2.consoleErrors.length || v2.pageErrors.length || v2.final.browser.runtimeErrors.length || v2.final.browser.runtimeRejections.length) {
    hardFailure = true;
    report.findings.push({ severity: 'FAIL', pilot: pilot.id, message: 'V2 browser/runtime errors present', detail: { consoleErrors: v2.consoleErrors, pageErrors: v2.pageErrors, runtimeErrors: v2.final.browser.runtimeErrors, runtimeRejections: v2.final.browser.runtimeRejections } });
  }
  const longTaskMax = Math.max(0, ...v2.final.browser.longTasks.map((item) => item.duration));
  report.findings.push({
    severity: longTaskMax > 250 ? 'WARN' : 'INFO',
    pilot: pilot.id,
    message: `V2 max long task ${longTaskMax.toFixed(1)} ms; JS heap ${Math.round((v2.final.perf.JSHeapUsedSize || 0) / 1024 / 1024)} MiB; canvas=${v2.final.browser.canvasCount}`,
  });
}

if (report.v1['ombak-bali']?.other && report.v2['ombak-bali']?.other) {
  const v1Other = report.v1['ombak-bali'].other;
  const v2Other = report.v2['ombak-bali'].other;
  if (/12\s*HZ/i.test(v1Other) && /1\.3|1\.2|1\.26/i.test(v2Other)) {
    hardFailure = true;
    report.findings.push({ severity: 'FAIL', pilot: 'ombak-bali', message: 'Semantic drift: V1 OTHER is Δ12 Hz while V2 OTHER collapses toward ~1.26 Hz.' });
  }
}

report.verdict = hardFailure ? 'TARGETED_REWORK_REQUIRED' : 'BROWSER_RUNTIME_PASS_PENDING_HUMAN_V1_V2_EXPERIENCE_COMPARISON';
await fs.writeFile(path.join(OUT, 'runtime-compare.json'), JSON.stringify(report, null, 2));

const summary = [];
summary.push('# RELATIONAL KEY V2 runtime compare');
summary.push(`Verdict: **${report.verdict}**`);
summary.push('');
for (const pilot of pilots) {
  const v1 = report.v1[pilot.id];
  const v2 = report.v2[pilot.id];
  summary.push(`## ${pilot.label}`);
  if (!v1 || !v2) {
    summary.push('- Browser case incomplete.');
    summary.push('');
    continue;
  }
  summary.push(`- V1 OTHER: ${v1.other}`);
  summary.push(`- V1 MATCHING: ${v1.matching}`);
  summary.push(`- V2 OTHER: ${v2.other}`);
  summary.push(`- V2 MATCHING: ${v2.matching}`);
  summary.push(`- V2 JS heap: ${Math.round((v2.final.perf.JSHeapUsedSize || 0) / 1024 / 1024)} MiB`);
  summary.push(`- V2 long tasks: ${v2.final.browser.longTasks.length}`);
  summary.push(`- V2 canvas count: ${v2.final.browser.canvasCount}`);
  summary.push(`- Mobile width: ${report.mobile[pilot.id]?.layout.scrollWidth}/${report.mobile[pilot.id]?.layout.width}`);
  summary.push(`- Reduced motion: ${report.reducedMotion[pilot.id]?.note}`);
  summary.push('');
}
summary.push('## Findings');
for (const finding of report.findings) summary.push(`- ${finding.severity} · ${finding.pilot} · ${finding.message}`);
await fs.writeFile(path.join(OUT, 'runtime-compare.md'), summary.join('\n'));

console.log('RK_RUNTIME_REPORT_BEGIN');
console.log(JSON.stringify(report, null, 2));
console.log('RK_RUNTIME_REPORT_END');
console.log(`VERDICT=${report.verdict}`);
if (hardFailure) process.exitCode = 1;
