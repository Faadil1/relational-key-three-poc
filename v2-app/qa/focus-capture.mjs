import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const V2 = process.env.RK_V2_URL || 'http://127.0.0.1:4174';
const OUT = process.env.RK_RUNTIME_OUT || 'runtime-evidence';
const FOCUS_OUT = path.join(OUT, 'focus');
const SHOTS = path.join(FOCUS_OUT, 'screenshots');
await fs.mkdir(SHOTS, { recursive: true });

const pilots = [
  {
    id: 'anamorphosis-paris',
    label: 'Anamorphosis · Paris',
    pair: ['DISTORTED FIELD', 'CURVED REFLECTION', 'CYLINDRICAL REFLECTOR'],
    other: /OTHER .*not registered/i,
    matching: /MATCHING .*registered in reflection/i,
  },
  {
    id: 'coupler-virginia',
    label: 'Coupler · Virginia',
    pair: ['PIVOTING HEAD', 'ROTARY HOOK / LATCH', 'MATING HEAD'],
    other: /OTHER \/ CONTACT/i,
    matching: /MATCHING .*locked relation.*pull transfers/i,
  },
  {
    id: 'ombak-bali',
    label: 'Ombak · Bali',
    pair: ['PENGUMBANG', 'SHARED BEAT ENVELOPE', 'PENGISUP'],
    other: /OTHER .*12\.0 Hz/i,
    matching: /MATCHING .*7\.0 Hz beat envelope/i,
  },
  {
    id: 'kento-japan',
    label: 'Kento · Japan',
    pair: ['WOODBLOCK / KENTŌ', 'REGISTRATION + PRESS', 'RECEIVING SHEET'],
    other: /OTHER .*kentō registration is offset|OTHER .*offset layer/i,
    matching: /MATCHING .*pressure transfers a registered layer/i,
  },
  {
    id: 'stereoscopy-uk',
    label: 'Stereoscopy · UK',
    pair: ['LEFT VIEW CARD', 'CONTROLLED DISPARITY / FUSION', 'RIGHT VIEW CARD'],
    other: /OTHER .*disparity refuses the intended fusion/i,
    matching: /MATCHING .*stable depth relation emerges/i,
  },
  {
    id: 'signal-nigeria',
    label: 'Signal · Nigeria',
    pair: ['LANLATE UPLINK CARD', 'SATELLITE RELAY PATH', 'REMOTE RECEIVE CARD'],
    other: /OTHER .*relay path breaks/i,
    matching: /MATCHING .*continuous relay path.*receiving card responds/i,
  },
];

async function newContext(browser, viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    return route.abort('blockedbyclient');
  });
  return context;
}

async function setupPage(context) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  return { page, consoleErrors, pageErrors };
}

async function capture(page, name) {
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

async function openFocus(page, pilot) {
  await page.goto(`${V2}/?focus=1&pilot=${encodeURIComponent(pilot.id)}`, { waitUntil: 'domcontentloaded' });
  await page.locator(`[data-scene-runtime="${pilot.id}"]`).waitFor({ state: 'attached', timeout: 10000 });
  await page.locator('canvas').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(180);
  if ((await page.locator('.focus-mode').count()) !== 1) throw new Error(`${pilot.id}: focus-mode shell missing`);
  if ((await page.locator('.pilot-tabs').count()) !== 0) throw new Error(`${pilot.id}: lab tabs leaked into focus mode`);
  const title = (await page.locator('.focus-header h1').innerText()).trim();
  if (title !== pilot.label) throw new Error(`${pilot.id}: focus title mismatch: ${title}`);
  const law = (await page.locator('.focus-meta strong').innerText()).trim();
  if (!law.includes('→')) throw new Error(`${pilot.id}: pair law is not evaluator-visible`);

  const pairRail = page.locator('.pair-member-rail');
  if ((await pairRail.count()) !== 1) throw new Error(`${pilot.id}: pair-member rail missing`);
  const renderedPair = (await pairRail.locator('strong').allInnerTexts()).map((value) => value.trim());
  if (JSON.stringify(renderedPair) !== JSON.stringify(pilot.pair)) {
    throw new Error(`${pilot.id}: pair-member identity mismatch: ${JSON.stringify(renderedPair)}`);
  }
}

async function statusText(page) {
  return (await page.locator('.status-strip').innerText()).trim();
}

async function driveMatching(page, pilot) {
  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await page.waitForTimeout(pilot.id === 'anamorphosis-paris' ? 420 : 260);
  if (pilot.id === 'coupler-virginia') {
    await page.getByRole('button', { name: 'PULL +' }).click();
    await page.waitForTimeout(380);
  }
  if (pilot.id === 'ombak-bali') {
    await page.getByRole('button', { name: /START SYNTHETIC AUDIO/i }).click();
    await page.waitForTimeout(520);
  }
  if (pilot.id === 'kento-japan') {
    await page.getByRole('button', { name: 'PRESS / TRANSFER', exact: true }).click();
    await page.waitForTimeout(280);
  }
  const matching = await statusText(page);
  if (!pilot.matching.test(matching)) throw new Error(`${pilot.id}: focus MATCHING mismatch: ${matching}`);
  return matching;
}

const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl'] });
const report = {
  schema: 'RELATIONAL_KEY_V2_FOCUS_CAPTURE_003',
  generatedAt: new Date().toISOString(),
  v2Url: V2,
  pilots: {},
  findings: [],
};
let hardFailure = false;

try {
  for (const pilot of pilots) {
    try {
      const desktopContext = await newContext(browser);
      const desktop = await setupPage(desktopContext);
      await openFocus(desktop.page, pilot);

      await desktop.page.getByRole('button', { name: 'OTHER', exact: true }).click();
      await desktop.page.waitForTimeout(220);
      const other = await statusText(desktop.page);
      if (!pilot.other.test(other)) throw new Error(`${pilot.id}: focus OTHER mismatch: ${other}`);
      await capture(desktop.page, `focus-${pilot.id}-other`);

      const matching = await driveMatching(desktop.page, pilot);
      await capture(desktop.page, `focus-${pilot.id}-matching`);

      if (pilot.id === 'ombak-bali') {
        const stop = desktop.page.getByRole('button', { name: /STOP AUDIO/i });
        if (await stop.isVisible()) await stop.click();
      }

      const desktopLayout = await desktop.page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        canvas: document.querySelectorAll('canvas').length,
        runtime: document.querySelectorAll('[data-scene-runtime]').length,
      }));
      if (desktopLayout.scrollWidth > desktopLayout.width) {
        throw new Error(`${pilot.id}: focus desktop overflow ${desktopLayout.scrollWidth} > ${desktopLayout.width}`);
      }
      if (desktopLayout.canvas !== 1 || desktopLayout.runtime !== 1) {
        throw new Error(`${pilot.id}: focus mode must retain exactly one canvas/runtime`);
      }
      if (desktop.consoleErrors.length || desktop.pageErrors.length) {
        throw new Error(`${pilot.id}: focus browser errors ${JSON.stringify({ consoleErrors: desktop.consoleErrors, pageErrors: desktop.pageErrors })}`);
      }
      await desktopContext.close();

      const mobileContext = await newContext(browser, { width: 390, height: 844 });
      const mobile = await setupPage(mobileContext);
      await openFocus(mobile.page, pilot);
      await driveMatching(mobile.page, pilot);
      const mobileLayout = await mobile.page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        canvas: document.querySelectorAll('canvas').length,
      }));
      if (mobileLayout.scrollWidth > mobileLayout.width) {
        throw new Error(`${pilot.id}: focus mobile overflow ${mobileLayout.scrollWidth} > ${mobileLayout.width}`);
      }
      if (mobileLayout.canvas !== 1) throw new Error(`${pilot.id}: focus mobile must retain exactly one canvas`);
      await capture(mobile.page, `focus-${pilot.id}-mobile-matching`);
      if (pilot.id === 'ombak-bali') {
        const stop = mobile.page.getByRole('button', { name: /STOP AUDIO/i });
        if (await stop.isVisible()) await stop.click();
      }
      if (mobile.consoleErrors.length || mobile.pageErrors.length) {
        throw new Error(`${pilot.id}: focus mobile browser errors ${JSON.stringify({ consoleErrors: mobile.consoleErrors, pageErrors: mobile.pageErrors })}`);
      }
      await mobileContext.close();

      report.pilots[pilot.id] = {
        pair: pilot.pair,
        other,
        matching,
        desktopLayout,
        mobileLayout,
      };
    } catch (error) {
      hardFailure = true;
      report.findings.push({ severity: 'FAIL', pilot: pilot.id, message: error.stack || String(error) });
    }
  }
} finally {
  await browser.close();
}

report.verdict = hardFailure ? 'FOCUS_EXPERIENCE_CAPTURE_FAILED' : 'FOCUS_EXPERIENCE_CAPTURE_PASS_PENDING_HUMAN_V1_V2_COMPARISON';
await fs.writeFile(path.join(FOCUS_OUT, 'focus-capture.json'), JSON.stringify(report, null, 2));

const summary = [
  '# RELATIONAL KEY V2 Focus Experience capture',
  `Verdict: **${report.verdict}**`,
  '',
];
for (const pilot of pilots) {
  const result = report.pilots[pilot.id];
  summary.push(`## ${pilot.label}`);
  if (!result) {
    summary.push('- Capture incomplete.');
  } else {
    summary.push(`- Pair: ${result.pair.join(' → ')}`);
    summary.push(`- OTHER: ${result.other}`);
    summary.push(`- MATCHING: ${result.matching}`);
    summary.push(`- Desktop width: ${result.desktopLayout.scrollWidth}/${result.desktopLayout.width}`);
    summary.push(`- Mobile width: ${result.mobileLayout.scrollWidth}/${result.mobileLayout.width}`);
  }
  summary.push('');
}
if (report.findings.length) {
  summary.push('## Findings');
  for (const finding of report.findings) summary.push(`- ${finding.severity} · ${finding.pilot} · ${finding.message}`);
}
await fs.writeFile(path.join(FOCUS_OUT, 'focus-capture.md'), summary.join('\n'));

console.log(`FOCUS_VERDICT=${report.verdict}`);
if (hardFailure) process.exitCode = 1;
