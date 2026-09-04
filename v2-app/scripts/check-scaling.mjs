import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const dist = path.join(root, 'dist');
const manifestPath = path.join(dist, '.vite', 'manifest.json');
const reportPath = path.join(dist, 'scaling-architecture.json');
const failures = [];
const fail = (message) => failures.push(message);

if (!fs.existsSync(manifestPath)) {
  console.error('V2_SCALING_FAIL: Vite manifest is missing');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const manifestEntries = Object.entries(manifest);
const bySource = new Map();
for (const [key, entry] of manifestEntries) {
  if (entry.src) bySource.set(entry.src, { key, entry });
}

const entryCandidates = manifestEntries
  .filter(([, entry]) => entry.isEntry)
  .map(([key, entry]) => ({ key, entry }));
const main = bySource.get('src/main.jsx')
  ?? bySource.get('index.html')
  ?? (entryCandidates.length === 1 ? entryCandidates[0] : null);

if (!main) fail('manifest must expose one product entry (index.html / src/main.jsx chain)');
if (entryCandidates.length !== 1) fail(`expected exactly one product entry, found ${entryCandidates.length}`);
if (main && !main.entry.isEntry) fail('resolved product entry must be marked isEntry');

const families = [
  { id: 'anamorphosis-paris', src: 'src/sceneEntries/AnamorphosisEntry.jsx' },
  { id: 'coupler-virginia', src: 'src/sceneEntries/CouplerEntry.jsx' },
  { id: 'ombak-bali', src: 'src/sceneEntries/OmbakEntry.jsx' },
  { id: 'kento-japan', src: 'src/sceneEntries/KentoEntry.jsx' },
  { id: 'stereoscopy-uk', src: 'src/sceneEntries/StereoscopyEntry.jsx' },
  { id: 'signal-nigeria', src: 'src/sceneEntries/SignalEntry.jsx' },
];

function closure(startKey) {
  const seen = new Set();
  const stack = [startKey];
  while (stack.length) {
    const key = stack.pop();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const entry = manifest[key];
    for (const imported of entry?.imports ?? []) stack.push(imported);
  }
  return seen;
}

function bytesForKey(key) {
  const file = manifest[key]?.file;
  if (!file) return 0;
  const full = path.join(dist, file);
  return fs.existsSync(full) ? fs.statSync(full).size : 0;
}

function bytesForKeys(keys) {
  return [...keys].reduce((sum, key) => sum + bytesForKey(key), 0);
}

const initialClosure = main ? closure(main.key) : new Set();
const dynamicRefs = new Set(manifestEntries.flatMap(([, entry]) => entry.dynamicImports ?? []));
const familyRows = [];
const familyFiles = new Set();
const familyClosures = [];

for (const family of families) {
  const found = bySource.get(family.src);
  if (!found) {
    fail(`${family.id} dynamic manifest entry is missing`);
    continue;
  }
  if (!found.entry.isDynamicEntry) fail(`${family.id} must be emitted as a dynamic entry`);
  if (!dynamicRefs.has(found.key)) fail(`${family.id} dynamic entry is not referenced by a dynamic import`);
  if (initialClosure.has(found.key)) fail(`${family.id} must not be part of the initial static closure`);
  if (familyFiles.has(found.entry.file)) fail(`${family.id} must have a distinct family entry chunk`);
  familyFiles.add(found.entry.file);

  const familyClosure = closure(found.key);
  familyClosures.push(familyClosure);
  const incrementalKeys = new Set([...familyClosure].filter((key) => !initialClosure.has(key)));
  familyRows.push({
    id: family.id,
    source: family.src,
    manifestKey: found.key,
    entryFile: found.entry.file,
    entryBytes: bytesForKey(found.key),
    staticClosureFiles: [...familyClosure].map((key) => manifest[key]?.file).filter(Boolean),
    staticClosureBytes: bytesForKeys(familyClosure),
    incrementalBeyondInitialFiles: [...incrementalKeys].map((key) => manifest[key]?.file).filter(Boolean),
    incrementalBeyondInitialBytes: bytesForKeys(incrementalKeys),
  });
}

if (familyFiles.size !== families.length) {
  fail(`expected ${families.length} distinct family entry files, found ${familyFiles.size}`);
}

let sharedDynamicKeys = new Set();
if (familyClosures.length === families.length && familyClosures.length > 0) {
  sharedDynamicKeys = new Set(
    [...familyClosures[0]].filter(
      (key) => familyClosures.every((familyClosure) => familyClosure.has(key)) && !initialClosure.has(key),
    ),
  );
}

function walkJs(directory) {
  if (!fs.existsSync(directory)) return [];
  const output = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...walkJs(full));
    else if (entry.isFile() && entry.name.endsWith('.js')) output.push(full);
  }
  return output;
}

const allJs = walkJs(path.join(dist, 'assets'));
const allJsBytes = allJs.reduce((sum, file) => sum + fs.statSync(file).size, 0);
const initialFiles = [...initialClosure].map((key) => manifest[key]?.file).filter(Boolean);

const report = {
  schema: 'RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BUILD_002',
  generatedAt: new Date().toISOString(),
  verdict: failures.length ? 'SCALING_ARCHITECTURE_BUILD_FAIL' : 'SCALING_ARCHITECTURE_BUILD_PASS',
  familyCount: families.length,
  main: main
    ? {
        manifestKey: main.key,
        source: main.entry.src ?? null,
        file: main.entry.file,
        entryBytes: bytesForKey(main.key),
        initialStaticFiles: initialFiles,
        initialStaticBytes: bytesForKeys(initialClosure),
        dynamicImports: main.entry.dynamicImports ?? [],
      }
    : null,
  families: familyRows,
  sharedDynamicRuntime: {
    files: [...sharedDynamicKeys].map((key) => manifest[key]?.file).filter(Boolean),
    bytes: bytesForKeys(sharedDynamicKeys),
  },
  completeBuild: {
    jsFileCount: allJs.length,
    jsBytes: allJsBytes,
  },
  failures,
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log('V2_SCALING_BUILD_REPORT_BEGIN');
console.log(JSON.stringify(report, null, 2));
console.log('V2_SCALING_BUILD_REPORT_END');

if (failures.length) {
  for (const message of failures) console.error(`V2_SCALING_FAIL: ${message}`);
  process.exitCode = 1;
} else {
  console.log('V2_SCALING_ARCHITECTURE_BUILD_PASS');
  console.log(`initial-static-js-bytes: ${report.main?.initialStaticBytes ?? 0}`);
  for (const family of familyRows) {
    console.log(`${family.id}-incremental-js-bytes: ${family.incrementalBeyondInitialBytes}`);
  }
}
