import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pilots as legacyPilots } from '../src/pilots.js';
import { wave005Families } from '../src/wave005Families.js';

const V2 = process.env.RK_V2_URL || 'http://127.0.0.1:4174';
const OUT = process.env.RK_RUNTIME_OUT || 'runtime-evidence';
const SCREEN_DIR = path.join(OUT, 'v2_9_collection');
const families = [...legacyPilots, ...wave005Families];
const byId = Object.fromEntries(families.map((f) => [f.id, f]));
const esc = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

if (families.length !== 24) throw new Error(`V2_9 requires exactly 24 families, found ${families.length}`);
await fs.mkdir(SCREEN_DIR, { recursive: true });

function duplicateValues(key) {
  const seen = new Map();
  for (const family of families) {
    const value = String(family[key] || '').trim();
    if (!seen.has(value)) seen.set(value, []);
    seen.get(value).push(family.id);
  }
  return [...seen.entries()].filter(([value, ids]) => value && ids.length > 1).map(([value, ids]) => ({ value, ids }));
}

const collisionClusters = {
  alignment_registration: ['kento-japan', 'astrolabe-isfahan', 'stereoscopy-uk', 'city-gatineau', 'zellige-fes'],
  reflection_trace: ['anamorphosis-paris', 'frida-coyoacan'],
  tension_structural: ['khipu-peru', 'textile-bonwire', 'tongiaki-tonga', 'funicular-valparaiso'],
  wave_signal_temporal: ['ombak-bali', 'signal-nigeria', 'swell-marshall', 'siku-bolivia', 'garamut-sepik-ramu', 'music-box-sainte-croix'],
  contact_material: ['coupler-virginia', 'hika-ahi-aotearoa', 'metate-teotitlan', 'mate-bombilla-argentina', 'food-toyama', 'service-benin'],
};

const report = {
  schema: 'RELATIONAL_KEY_V2_ALL24_COLLECTION_AUDIT_001',
  generatedAt: new Date().toISOString(),
  v2Url: V2,
  familyCount: families.length,
  metadataDifferentiation: {
    duplicateLaws: duplicateValues('law'),
    duplicateMemorableMoments: duplicateValues('memorable'),
    missingPairMembers: families.filter((f) => !f.pairMembers?.a || !f.pairMembers?.relation || !f.pairMembers?.b).map((f) => f.id),
    clusters: Object.fromEntries(Object.entries(collisionClusters).map(([cluster, ids]) => [cluster, ids.map((id) => ({ id, law: byId[id]?.law, memorable: byId[id]?.memorable, pairMembers: byId[id]?.pairMembers }))])),
  },
  desktop: { families: {}, stateResetFailures: [], canvasPeak: 0 },
  mobile390: { families: {}, canvasPeak: 0 },
  reducedMotion: { families: {}, canvasPeak: 0 },
  externalRequests: [],
  consoleErrors: [],
  pageErrors: [],
  findings: [],
};

let hardFailure = false;
function fail(scope, message, extra = {}) {
  hardFailure = true;
  report.findings.push({ severity: 'FAIL', scope, message, ...extra });
}

if (report.metadataDifferentiation.duplicateLaws.length) fail('metadata', 'Exact duplicate pair laws detected', { duplicates: report.metadataDifferentiation.duplicateLaws });
if (report.metadataDifferentiation.duplicateMemorableMoments.length) fail('metadata', 'Exact duplicate memorable moments detected', { duplicates: report.metadataDifferentiation.duplicateMemorableMoments });
if (report.metadataDifferentiation.missingPairMembers.length) fail('metadata', 'Pair-member metadata missing', { ids: report.metadataDifferentiation.missingPairMembers });

async function newContext(browser, viewport, reducedMotion = 'no-preference') {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion });
  await context.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    report.externalRequests.push({ url: route.request().url(), resourceType: route.request().resourceType() });
    return route.abort('blockedbyclient');
  });
  return context;
}

function observePage(page) {
  page.on('console', (message) => { if (message.type() === 'error') report.consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => report.pageErrors.push(error.message));
}

async function waitForScene(page, id) {
  await page.locator(`[data-scene-runtime="${id}"]`).waitFor({ state: 'attached', timeout: 12000 });
  await page.locator('canvas').waitFor({ state: 'visible', timeout: 12000 });
  await page.waitForTimeout(160);
  const canvasCount = await page.locator('canvas').count();
  const runtimeCount = await page.locator('[data-scene-runtime]').count();
  if (canvasCount !== 1) throw new Error(`${id}: expected exactly one canvas, found ${canvasCount}`);
  if (runtimeCount !== 1) throw new Error(`${id}: expected exactly one scene runtime, found ${runtimeCount}`);
}

function tabLocator(page, family) {
  return page.getByRole('button', { name: new RegExp(`^${esc(family.label)}`, 'i') });
}

async function switchTo(page, family) {
  const tab = tabLocator(page, family);
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  await waitForScene(page, family.id);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const text = (selector) => document.querySelector(selector)?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const ranges = [...document.querySelectorAll('input[type="range"]')].map((input) => ({ value: input.value, label: input.labels?.[0]?.textContent?.replace(/\s+/g, ' ').trim() || '' }));
    const relationPressed = [...document.querySelectorAll('.relation-buttons button[aria-pressed]')].map((button) => ({ name: button.textContent?.replace(/\s+/g, ' ').trim() || '', pressed: button.getAttribute('aria-pressed') }));
    return {
      title: text('#pilot-title'),
      status: text('.status-strip'),
      ranges,
      relationPressed,
      activeTabs: [...document.querySelectorAll('.pilot-tab[aria-pressed="true"]')].map((button) => button.textContent?.replace(/\s+/g, ' ').trim() || ''),
      canvasCount: document.querySelectorAll('canvas').length,
      runtimeIds: [...document.querySelectorAll('[data-scene-runtime]')].map((node) => node.getAttribute('data-scene-runtime')),
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      motionNote: text('.motion-note'),
      navLabel: document.querySelector('nav.pilot-tabs')?.getAttribute('aria-label') || '',
      statusRole: document.querySelector('.status-strip')?.getAttribute('role') || '',
      statusLive: document.querySelector('.status-strip')?.getAttribute('aria-live') || '',
      unlabeledRanges: [...document.querySelectorAll('input[type="range"]')].filter((input) => !input.labels || input.labels.length === 0).length,
    };
  });
}

function resetComparable(value) {
  return { status: value.status, ranges: value.ranges.map(({ value: rangeValue, label }) => ({ value: rangeValue, label })), relationPressed: value.relationPressed };
}

async function activateMatchingMoment(page, family) {
  if (family.id === 'funicular-valparaiso') {
    const swap = page.getByRole('button', { name: 'SWAP START' });
    if (await swap.count()) await swap.click();
  } else {
    const primary = page.locator('.relation-buttons button.primary').first();
    if (await primary.count()) await primary.click();
  }
  if (family.id === 'kento-japan') {
    const press = page.getByRole('button', { name: /PRESS \/ TRANSFER/i });
    if (await press.count()) await press.click();
  }
  if (family.id === 'coupler-virginia') {
    const pull = page.getByRole('button', { name: /PULL \+/i });
    if (await pull.count()) await pull.click();
  }
  await page.waitForTimeout(100);
}

async function mutateFirstRange(page) {
  const range = page.locator('input[type="range"]').first();
  if (!(await range.count())) return false;
  await range.evaluate((input) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const current = Number(input.value);
    const next = Math.abs(current - max) > 1e-6 ? max : min;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    setter.call(input, String(next));
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.waitForTimeout(80);
  return true;
}

async function desktopAudit(browser) {
  const context = await newContext(browser, { width: 1440, height: 900 });
  const page = await context.newPage();
  observePage(page);
  try {
    await page.goto(`${V2}/?pilot=${families[0].id}`, { waitUntil: 'domcontentloaded' });
    await waitForScene(page, families[0].id);
    const tabCount = await page.locator('nav.pilot-tabs button.pilot-tab').count();
    if (tabCount !== 24) fail('desktop/navigation', `Expected 24 family tabs, found ${tabCount}`);

    for (let index = 0; index < families.length; index += 1) {
      const family = families[index];
      await switchTo(page, family);
      const baseline = await snapshot(page);
      report.desktop.canvasPeak = Math.max(report.desktop.canvasPeak, baseline.canvasCount);
      if (baseline.activeTabs.length !== 1) fail(`${family.id}/navigation`, `Expected one active tab, found ${baseline.activeTabs.length}`);
      if (!baseline.title.toLowerCase().includes(family.label.split(' · ')[0].toLowerCase())) fail(`${family.id}/title`, `Pilot title mismatch: ${baseline.title}`);
      if (baseline.scrollWidth > baseline.width) fail(`${family.id}/desktop-overflow`, `${baseline.scrollWidth}>${baseline.width}`);
      if (baseline.canvasCount !== 1 || baseline.runtimeIds.length !== 1 || baseline.runtimeIds[0] !== family.id) fail(`${family.id}/runtime`, 'Canvas/runtime identity invalid at baseline', { baseline });
      if (!baseline.navLabel) fail(`${family.id}/a11y`, 'Family navigation lacks aria-label');
      if (baseline.statusRole !== 'status' || baseline.statusLive !== 'polite') fail(`${family.id}/a11y`, 'Status strip live-region contract missing');
      if (baseline.unlabeledRanges) fail(`${family.id}/a11y`, `${baseline.unlabeledRanges} range inputs lack labels`);

      const tab = tabLocator(page, family);
      await tab.focus();
      const focusOk = await tab.evaluate((node) => document.activeElement === node);
      if (!focusOk) fail(`${family.id}/keyboard`, 'Family tab could not receive keyboard focus');

      await page.screenshot({ path: path.join(SCREEN_DIR, `${String(index + 1).padStart(2, '0')}-${family.id}-other.png`), fullPage: true });
      await activateMatchingMoment(page, family);
      const matchingSnapshot = await snapshot(page);
      await page.screenshot({ path: path.join(SCREEN_DIR, `${String(index + 1).padStart(2, '0')}-${family.id}-matching.png`), fullPage: true });
      const rangeMutated = await mutateFirstRange(page);
      const mutated = await snapshot(page);

      const next = families[(index + 1) % families.length];
      await switchTo(page, next);
      const interim = await snapshot(page);
      report.desktop.canvasPeak = Math.max(report.desktop.canvasPeak, interim.canvasCount);
      await switchTo(page, family);
      const reentry = await snapshot(page);
      report.desktop.canvasPeak = Math.max(report.desktop.canvasPeak, reentry.canvasCount);

      const baselineComparable = resetComparable(baseline);
      const reentryComparable = resetComparable(reentry);
      const resetPass = JSON.stringify(baselineComparable) === JSON.stringify(reentryComparable);
      if (!resetPass) {
        const failure = { id: family.id, baseline: baselineComparable, mutated: resetComparable(mutated), reentry: reentryComparable, rangeMutated };
        report.desktop.stateResetFailures.push(failure);
        fail(`${family.id}/state-reset`, 'Family state did not return to its initial OTHER/IDLE state after switch-away and re-entry', failure);
      }
      report.desktop.families[family.id] = { baseline, matching: matchingSnapshot, mutated: resetComparable(mutated), reentry, resetPass };
    }
  } finally {
    await context.close();
  }
}

async function sequenceAudit(browser, viewport, reducedMotion, bucketName) {
  const context = await newContext(browser, viewport, reducedMotion);
  const page = await context.newPage();
  observePage(page);
  const bucket = report[bucketName];
  try {
    await page.goto(`${V2}/?pilot=${families[0].id}`, { waitUntil: 'domcontentloaded' });
    await waitForScene(page, families[0].id);
    for (const family of families) {
      await switchTo(page, family);
      const state = await snapshot(page);
      bucket.canvasPeak = Math.max(bucket.canvasPeak, state.canvasCount);
      if (state.canvasCount !== 1 || state.runtimeIds.length !== 1 || state.runtimeIds[0] !== family.id) fail(`${bucketName}/${family.id}`, 'Canvas/runtime identity invalid', { state });
      if (state.scrollWidth > state.width) fail(`${bucketName}/${family.id}`, `Horizontal overflow ${state.scrollWidth}>${state.width}`);
      if (bucketName === 'reducedMotion' && !/Reduced motion active/i.test(state.motionNote)) fail(`${bucketName}/${family.id}`, 'Reduced-motion UI state not active');
      bucket.families[family.id] = state;
    }
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl'] });
try {
  await desktopAudit(browser);
  await sequenceAudit(browser, { width: 390, height: 844 }, 'no-preference', 'mobile390');
  await sequenceAudit(browser, { width: 1440, height: 900 }, 'reduce', 'reducedMotion');
} catch (error) {
  fail('unhandled', error.stack || String(error));
} finally {
  await browser.close();
}

if (report.desktop.canvasPeak !== 1) fail('desktop/runtime', `Canvas peak must be 1, observed ${report.desktop.canvasPeak}`);
if (report.mobile390.canvasPeak !== 1) fail('mobile390/runtime', `Canvas peak must be 1, observed ${report.mobile390.canvasPeak}`);
if (report.reducedMotion.canvasPeak !== 1) fail('reducedMotion/runtime', `Canvas peak must be 1, observed ${report.reducedMotion.canvasPeak}`);
if (report.externalRequests.length) fail('network', 'External V2 requests detected', { requests: report.externalRequests });
if (report.consoleErrors.length) fail('console', 'Console errors detected', { errors: report.consoleErrors });
if (report.pageErrors.length) fail('page', 'Page errors detected', { errors: report.pageErrors });

if (hardFailure) report.verdict = report.desktop.stateResetFailures.length ? 'V2_9_COLLECTION_AUDIT_HOLD_STATE_RESET_OR_TECHNICAL_DEFECT' : 'V2_9_COLLECTION_AUDIT_HOLD_TECHNICAL_DEFECT';
else report.verdict = 'V2_9_COLLECTION_TECHNICAL_PASS_PENDING_HUMAN_COHERENCE';

await fs.writeFile(path.join(OUT, 'v2-9-all24-collection-audit.json'), JSON.stringify(report, null, 2));
console.log(`V2_9_VERDICT=${report.verdict}`);
if (hardFailure) process.exitCode = 1;
