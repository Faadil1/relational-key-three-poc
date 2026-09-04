import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const V2 = process.env.RK_V2_URL || 'http://127.0.0.1:4174';
const OUT = process.env.RK_RUNTIME_OUT || 'runtime-evidence';
const manifest = JSON.parse(await fs.readFile('dist/.vite/manifest.json', 'utf8'));
await fs.mkdir(OUT, { recursive: true });

const families = [
  { id: 'anamorphosis-paris', label: /^Anamorphosis · Paris/i, src: 'src/sceneEntries/AnamorphosisEntry.jsx' },
  { id: 'coupler-virginia', label: /^Coupler · Virginia/i, src: 'src/sceneEntries/CouplerEntry.jsx' },
  { id: 'ombak-bali', label: /^Ombak · Bali/i, src: 'src/sceneEntries/OmbakEntry.jsx' },
  { id: 'kento-japan', label: /^Kento · Japan/i, src: 'src/sceneEntries/KentoEntry.jsx' },
  { id: 'stereoscopy-uk', label: /^Stereoscopy · UK/i, src: 'src/sceneEntries/StereoscopyEntry.jsx' },
  { id: 'signal-nigeria', label: /^Signal · Nigeria/i, src: 'src/sceneEntries/SignalEntry.jsx' },
];

const bySource = new Map();
for (const [key, entry] of Object.entries(manifest)) {
  if (entry.src) bySource.set(entry.src, { key, entry });
}
for (const family of families) {
  const found = bySource.get(family.src);
  if (!found) throw new Error(`Missing scaling manifest entry for ${family.id}`);
  family.file = found.entry.file;
}

function assetPath(url) {
  const parsed = new URL(url);
  return parsed.pathname.replace(/^\/+/, '');
}

async function newContext(browser, viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
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
    if (request.resourceType() === 'script') scripts.add(assetPath(request.url()));
  });
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  return { scripts, consoleErrors, pageErrors };
}

async function waitForScene(page, id) {
  await page.locator(`[data-scene-runtime="${id}"]`).waitFor({ state: 'attached', timeout: 10000 });
  await page.locator('canvas').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(180);
  const canvasCount = await page.locator('canvas').count();
  const runtimeCount = await page.locator('[data-scene-runtime]').count();
  if (canvasCount !== 1) throw new Error(`${id}: expected exactly one Canvas after resolve, found ${canvasCount}`);
  if (runtimeCount !== 1) throw new Error(`${id}: expected exactly one scene runtime marker, found ${runtimeCount}`);
}

const report = {
  schema: 'RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BROWSER_002',
  generatedAt: new Date().toISOString(),
  v2Url: V2,
  manifestFamilyFiles: Object.fromEntries(families.map((family) => [family.id, family.file])),
  directFocusIsolation: {},
  switching: null,
  findings: [],
};
let hardFailure = false;
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--enable-webgl'] });

try {
  for (const family of families) {
    const context = await newContext(browser);
    const page = await context.newPage();
    const observed = observePage(page);
    try {
      await page.goto(`${V2}/?focus=1&pilot=${family.id}`, { waitUntil: 'domcontentloaded' });
      await waitForScene(page, family.id);
      await page.waitForTimeout(250);

      const loaded = [...observed.scripts].sort();
      const otherFamilyFiles = families.filter((item) => item.id !== family.id).map((item) => item.file);
      if (!observed.scripts.has(family.file)) {
        throw new Error(`${family.id}: own dynamic entry ${family.file} was not requested`);
      }
      const eagerOthers = otherFamilyFiles.filter((file) => observed.scripts.has(file));
      if (eagerOthers.length) {
        throw new Error(`${family.id}: unrelated family entries were eagerly requested: ${eagerOthers.join(', ')}`);
      }

      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        canvasCount: document.querySelectorAll('canvas').length,
        runtimeIds: [...document.querySelectorAll('[data-scene-runtime]')].map((node) => node.getAttribute('data-scene-runtime')),
      }));

      report.directFocusIsolation[family.id] = {
        ownEntry: family.file,
        loadedScripts: loaded,
        unrelatedFamilyEntriesLoaded: eagerOthers,
        layout,
        consoleErrors: observed.consoleErrors,
        pageErrors: observed.pageErrors,
      };

      if (layout.scrollWidth > layout.width) throw new Error(`${family.id}: direct Focus overflow ${layout.scrollWidth} > ${layout.width}`);
      if (observed.consoleErrors.length || observed.pageErrors.length) {
        throw new Error(`${family.id}: browser errors present during direct Focus isolation`);
      }
    } catch (error) {
      hardFailure = true;
      report.findings.push({ severity: 'FAIL', pilot: family.id, message: error.stack || String(error) });
    } finally {
      await context.close();
    }
  }

  const context = await newContext(browser);
  const page = await context.newPage();
  const observed = observePage(page);
  try {
    await page.goto(`${V2}/?pilot=${families[0].id}`, { waitUntil: 'domcontentloaded' });
    await waitForScene(page, families[0].id);

    await page.evaluate(() => {
      window.__rkCanvasPeak = document.querySelectorAll('canvas').length;
      window.__rkCanvasProbe = setInterval(() => {
        window.__rkCanvasPeak = Math.max(window.__rkCanvasPeak, document.querySelectorAll('canvas').length);
      }, 5);
    });

    const checkpoints = [];
    for (let index = 0; index < families.length; index += 1) {
      const family = families[index];
      if (index > 0) {
        await page.getByRole('button', { name: family.label }).click();
        await waitForScene(page, family.id);
      }

      if (!observed.scripts.has(family.file)) {
        throw new Error(`switch path: ${family.id} chunk did not load when selected`);
      }
      const futureLoaded = families
        .slice(index + 1)
        .filter((future) => observed.scripts.has(future.file))
        .map((future) => future.id);
      if (futureLoaded.length) {
        throw new Error(`switch path: future family chunks loaded before selection: ${futureLoaded.join(', ')}`);
      }
      checkpoints.push({
        selected: family.id,
        loadedScripts: [...observed.scripts].sort(),
        canvasCount: await page.locator('canvas').count(),
        runtimeCount: await page.locator('[data-scene-runtime]').count(),
      });
    }

    const canvasPeak = await page.evaluate(() => {
      clearInterval(window.__rkCanvasProbe);
      return window.__rkCanvasPeak;
    });
    if (canvasPeak !== 1) throw new Error(`switch path: Canvas peak must remain 1, observed ${canvasPeak}`);
    if (observed.consoleErrors.length || observed.pageErrors.length) throw new Error('switch path: browser errors present');

    report.switching = {
      sequence: families.map((family) => family.id),
      checkpoints,
      canvasPeak,
      finalCanvasCount: await page.locator('canvas').count(),
      finalRuntimeCount: await page.locator('[data-scene-runtime]').count(),
      consoleErrors: observed.consoleErrors,
      pageErrors: observed.pageErrors,
    };
  } catch (error) {
    hardFailure = true;
    report.findings.push({ severity: 'FAIL', pilot: 'switching-sequence', message: error.stack || String(error) });
  } finally {
    await context.close();
  }
} finally {
  await browser.close();
}

report.verdict = hardFailure ? 'SCALING_ARCHITECTURE_BROWSER_FAIL' : 'SCALING_ARCHITECTURE_BROWSER_PASS';
await fs.writeFile(path.join(OUT, 'scaling-architecture-browser.json'), JSON.stringify(report, null, 2));

console.log('RK_SCALING_BROWSER_REPORT_BEGIN');
console.log(JSON.stringify(report, null, 2));
console.log('RK_SCALING_BROWSER_REPORT_END');
console.log(`SCALING_VERDICT=${report.verdict}`);
if (hardFailure) process.exitCode = 1;
