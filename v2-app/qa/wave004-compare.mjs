import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const V1 = process.env.RK_V1_URL || 'http://127.0.0.1:4173';
const V2 = process.env.RK_V2_URL || 'http://127.0.0.1:4174';
const OUT = path.join(process.env.RK_RUNTIME_OUT || 'runtime-evidence', 'wave004');
const SHOTS = path.join(OUT, 'screenshots');
await fs.mkdir(SHOTS, { recursive: true });

const manifest = JSON.parse(await fs.readFile('dist/.vite/manifest.json', 'utf8'));
const bySource = new Map();
for (const [key, entry] of Object.entries(manifest)) if (entry.src) bySource.set(entry.src, { key, entry });

const families = [
  {
    id: 'service-benin', label: 'Service · Benin', src: 'src/sceneEntries/ServiceBeninEntry.jsx',
    v1Path: '/families/service-benin/r5-9.html',
    pair: ['BÉNIN TELEPHONE-CARD MEMBER', 'REGISTERED CONTACT / SERVICE HANDOFF', 'PUBLIPHONE / SERVICE-READER MEMBER'],
    v1: {
      other: async (f) => { await f.locator('[data-claim="other"]').click(); await f.locator('#run').click(); await f.waitForTimeout(1000); },
      matching: async (f) => { await f.locator('[data-claim="matching"]').click(); await f.locator('#run').click(); await f.waitForTimeout(3000); },
      read: async (f) => (await f.locator('#result').innerText()).trim(),
      otherExpect: /TWO VALID OBJECTS .* CONTACTS OFFSET .* LINE WINDOW REMAINS CLOSED/i,
      matchingExpect: /CONTACT FIELD REGISTERED .* LINE WINDOW OPEN/i,
    },
    v2: {
      otherExpect: /OTHER .*contact field stays offset .*service window remains closed/i,
      matchingExpect: /MATCHING .*registered Bénin telecom contact .*service window responds/i,
    },
  },
  {
    id: 'food-toyama', label: 'Food · Toyama', src: 'src/sceneEntries/FoodToyamaEntry.jsx',
    v1Path: '/families/food-toyama/r5-1.html',
    pair: ['PRESS / PACKAGE-CONSTRAINT MEMBER', 'ORDERED RELEASE / PRESSURE TRANSFER', 'BAMBOO-LEAF / REVEAL MEMBER'],
    v1: {
      other: async (f) => { await f.locator('[data-claim="other"]').click(); await f.locator('#run').click(); await f.waitForTimeout(1700); },
      matching: async (f) => { await f.locator('[data-claim="matching"]').click(); await f.locator('#run').click(); await f.waitForTimeout(3300); },
      read: async (f) => (await f.locator('#result').innerText()).trim(),
      otherExpect: /PRESSURE DOES NOT REGISTER .* BOTH MEMBERS REMAIN VALID/i,
      matchingExpect: /LEAVES UNFOLD .* MASU-ZUSHI REVEALED/i,
    },
    v2: {
      otherExpect: /OTHER .*release order remains incomplete .*shared reveal does not register/i,
      matchingExpect: /MATCHING .*ordered pressure release .*shared reveal/i,
    },
  },
  {
    id: 'hika-ahi-aotearoa', label: 'Hika Ahi · Aotearoa', src: 'src/sceneEntries/HikaAhiEntry.jsx',
    v1Path: '/families/hika-ahi-aotearoa/snapshot.html',
    pair: ['HIKA / RUBBING MEMBER', 'CONTROLLED FRICTION / GROOVE CONTACT', 'KAUAHI / GROOVED BASE MEMBER'],
    v1: {
      other: async (f) => { await f.locator('[data-mode="other"]').click(); await f.locator('#run').click(); await f.waitForTimeout(5000); },
      matching: async (f) => { await f.locator('[data-mode="match"]').click(); await f.locator('#run').click(); await f.waitForTimeout(6100); },
      read: async (f) => (await f.locator('#result').innerText()).trim(),
      otherExpect: /CONTINUE .* RELATION NOT REGISTERED/i,
      matchingExpect: /CONTINUE .* HIKA \+ KAUAHI REMAIN DISTINCT/i,
    },
    v2: {
      otherExpect: /OTHER .*contact is offset .*without an ember register/i,
      matchingExpect: /MATCHING .*sustained friction .*ember witness .*interface/i,
    },
  },
];

for (const family of families) {
  const found = bySource.get(family.src);
  if (!found) throw new Error(`Wave 004 manifest entry missing: ${family.id}`);
  family.file = found.entry.file;
  if (!found.entry.isDynamicEntry) throw new Error(`Wave 004 entry must remain dynamic: ${family.id}`);
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
  return context;
}

function observePage(page) {
  const scripts = new Set();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script') scripts.add(new URL(request.url()).pathname.replace(/^\/+/, ''));
  });
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  return { scripts, consoleErrors, pageErrors };
}

async function capture(page, name) {
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true });
}

async function runV1(browser, family) {
  const context = await newContext(browser);
  const page = await context.newPage();
  const observed = observePage(page);
  await page.goto(`${V1}${family.v1Path}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(180);

  await family.v1.other(page);
  const other = await family.v1.read(page);
  if (!family.v1.otherExpect.test(other)) throw new Error(`${family.id} V1 OTHER mismatch: ${other}`);
  await capture(page, `v1-${family.id}-other`);

  await family.v1.matching(page);
  const matching = await family.v1.read(page);
  if (!family.v1.matchingExpect.test(matching)) throw new Error(`${family.id} V1 MATCHING mismatch: ${matching}`);
  await capture(page, `v1-${family.id}-matching`);

  if (observed.consoleErrors.length || observed.pageErrors.length) throw new Error(`${family.id}: V1 browser errors ${JSON.stringify(observed)}`);
  const result = { other, matching, consoleErrors: observed.consoleErrors, pageErrors: observed.pageErrors };
  await context.close();
  return result;
}

async function openV2(page, family) {
  await page.goto(`${V2}/?focus=1&pilot=${encodeURIComponent(family.id)}`, { waitUntil: 'domcontentloaded' });
  await page.locator(`[data-scene-runtime="${family.id}"]`).waitFor({ state: 'attached', timeout: 10000 });
  await page.locator('canvas').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(220);
  if ((await page.locator('canvas').count()) !== 1) throw new Error(`${family.id}: expected exactly one Canvas`);
  if ((await page.locator('[data-scene-runtime]').count()) !== 1) throw new Error(`${family.id}: expected exactly one runtime marker`);
  if ((await page.locator('.pilot-tabs').count()) !== 0) throw new Error(`${family.id}: lab tabs leaked into Focus mode`);
  const pair = (await page.locator('.pair-member-rail strong').allInnerTexts()).map((value) => value.trim());
  if (JSON.stringify(pair) !== JSON.stringify(family.pair)) throw new Error(`${family.id}: pair identity mismatch ${JSON.stringify(pair)}`);
}

async function runV2Desktop(browser, family) {
  const context = await newContext(browser);
  const page = await context.newPage();
  const observed = observePage(page);
  await openV2(page, family);

  const otherFamilyFiles = families.filter((item) => item.id !== family.id).map((item) => item.file);
  if (!observed.scripts.has(family.file)) throw new Error(`${family.id}: own lazy chunk ${family.file} was not requested`);
  const eagerOthers = otherFamilyFiles.filter((file) => observed.scripts.has(file));
  if (eagerOthers.length) throw new Error(`${family.id}: unrelated Wave 004 chunks loaded eagerly: ${eagerOthers.join(', ')}`);

  await page.getByRole('button', { name: 'OTHER', exact: true }).click();
  await page.waitForTimeout(180);
  const other = (await page.locator('.status-strip').innerText()).trim();
  if (!family.v2.otherExpect.test(other)) throw new Error(`${family.id} V2 OTHER mismatch: ${other}`);
  await capture(page, `v2-${family.id}-other`);

  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await page.waitForTimeout(260);
  const matching = (await page.locator('.status-strip').innerText()).trim();
  if (!family.v2.matchingExpect.test(matching)) throw new Error(`${family.id} V2 MATCHING mismatch: ${matching}`);
  await capture(page, `v2-${family.id}-matching`);

  const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, canvas: document.querySelectorAll('canvas').length }));
  if (layout.scrollWidth > layout.width) throw new Error(`${family.id}: desktop overflow ${layout.scrollWidth} > ${layout.width}`);
  if (observed.consoleErrors.length || observed.pageErrors.length) throw new Error(`${family.id}: browser errors ${JSON.stringify(observed)}`);

  const result = { other, matching, pair: family.pair, layout, ownEntry: family.file, eagerWave004Entries: eagerOthers, loadedScripts: [...observed.scripts].sort() };
  await context.close();
  return result;
}

async function runMobile(browser, family) {
  const context = await newContext(browser, { viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const observed = observePage(page);
  await openV2(page, family);
  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await page.waitForTimeout(220);
  const status = (await page.locator('.status-strip').innerText()).trim();
  if (!family.v2.matchingExpect.test(status)) throw new Error(`${family.id}: mobile matching mismatch: ${status}`);
  const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, canvas: document.querySelectorAll('canvas').length }));
  if (layout.scrollWidth > layout.width) throw new Error(`${family.id}: mobile overflow ${layout.scrollWidth} > ${layout.width}`);
  if (layout.canvas !== 1) throw new Error(`${family.id}: mobile canvas count ${layout.canvas}`);
  await capture(page, `v2-${family.id}-mobile-matching`);
  if (observed.consoleErrors.length || observed.pageErrors.length) throw new Error(`${family.id}: mobile browser errors`);
  await context.close();
  return { status, layout };
}

async function runReducedMotion(browser, family) {
  const context = await newContext(browser, { reducedMotion: 'reduce' });
  const page = await context.newPage();
  const observed = observePage(page);
  await openV2(page, family);
  const note = (await page.locator('.motion-note').innerText()).trim();
  if (!/Reduced motion active/i.test(note)) throw new Error(`${family.id}: reduced-motion contract inactive`);
  await page.getByRole('button', { name: 'MATCHING', exact: true }).click();
  await page.waitForTimeout(160);
  const status = (await page.locator('.status-strip').innerText()).trim();
  if (!family.v2.matchingExpect.test(status)) throw new Error(`${family.id}: reduced-motion matching mismatch: ${status}`);
  await capture(page, `v2-${family.id}-reduced-motion`);
  if (observed.consoleErrors.length || observed.pageErrors.length) throw new Error(`${family.id}: reduced-motion browser errors`);
  await context.close();
  return { note, status };
}

const report = {
  schema: 'RELATIONAL_KEY_V2_WAVE_004_RUNTIME_COMPARE_001',
  generatedAt: new Date().toISOString(),
  v1Url: V1,
  v2Url: V2,
  families: {},
  findings: [],
};
let hardFailure = false;
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl'] });
try {
  for (const family of families) {
    try {
      report.families[family.id] = {
        v1: await runV1(browser, family),
        v2: await runV2Desktop(browser, family),
        mobile: await runMobile(browser, family),
        reducedMotion: await runReducedMotion(browser, family),
      };
    } catch (error) {
      hardFailure = true;
      report.findings.push({ severity: 'FAIL', family: family.id, message: error.stack || String(error) });
    }
  }
} finally {
  await browser.close();
}

report.verdict = hardFailure ? 'WAVE_004_TARGETED_REWORK_REQUIRED' : 'WAVE_004_BROWSER_RUNTIME_PASS_PENDING_HUMAN_V1_V2_COMPARISON';
await fs.writeFile(path.join(OUT, 'wave004-compare.json'), JSON.stringify(report, null, 2));
const summary = ['# RELATIONAL KEY V2 — Wave 004 exact browser comparison', `Verdict: **${report.verdict}**`, ''];
for (const family of families) {
  const row = report.families[family.id];
  summary.push(`## ${family.label}`);
  if (!row) summary.push('- Incomplete.');
  else {
    summary.push(`- Pair: ${family.pair.join(' → ')}`);
    summary.push(`- V1 OTHER: ${row.v1.other}`);
    summary.push(`- V1 MATCHING: ${row.v1.matching}`);
    summary.push(`- V2 OTHER: ${row.v2.other}`);
    summary.push(`- V2 MATCHING: ${row.v2.matching}`);
    summary.push(`- Mobile width: ${row.mobile.layout.scrollWidth}/${row.mobile.layout.width}`);
    summary.push(`- Reduced motion: ${row.reducedMotion.note}`);
    summary.push(`- Lazy entry: ${row.v2.ownEntry}`);
  }
  summary.push('');
}
if (report.findings.length) {
  summary.push('## Findings');
  for (const finding of report.findings) summary.push(`- ${finding.severity} · ${finding.family} · ${finding.message}`);
}
await fs.writeFile(path.join(OUT, 'wave004-compare.md'), summary.join('\n'));
console.log(`WAVE004_VERDICT=${report.verdict}`);
if (hardFailure) process.exitCode = 1;
