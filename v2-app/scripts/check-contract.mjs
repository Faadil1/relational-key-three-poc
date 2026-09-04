import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const fail = (message) => {
  console.error(`V2_CONTRACT_FAIL: ${message}`);
  process.exitCode = 1;
};

const pkg = JSON.parse(read('package.json'));
const app = read('src/App.jsx');
const registry = read('src/sceneRegistry.js');
const familyCanvas = read('src/FamilyCanvas.jsx');
const pilots = read('src/pilots.js');
const sceneRows = [
  { id: 'anamorphosis-paris', path: 'src/scenes/AnamorphosisScene.jsx', entry: 'AnamorphosisEntry.jsx' },
  { id: 'coupler-virginia', path: 'src/scenes/CouplerScene.jsx', entry: 'CouplerEntry.jsx' },
  { id: 'ombak-bali', path: 'src/scenes/OmbakScene.jsx', entry: 'OmbakEntry.jsx' },
  { id: 'kento-japan', path: 'src/scenes/KentoScene.jsx', entry: 'KentoEntry.jsx', twoCardMarkerRequired: true },
  { id: 'stereoscopy-uk', path: 'src/scenes/StereoscopyScene.jsx', entry: 'StereoscopyEntry.jsx', twoCardMarkerRequired: true },
  { id: 'signal-nigeria', path: 'src/scenes/SignalScene.jsx', entry: 'SignalEntry.jsx', twoCardMarkerRequired: true },
];
const scenes = sceneRows.map((row) => read(row.path));
const allScenes = scenes.join('\n');

const exactDependencies = {
  react: '19.2.8',
  'react-dom': '19.2.8',
  '@react-three/fiber': '9.7.0',
  three: '0.185.1',
};
for (const [name, version] of Object.entries(exactDependencies)) {
  if (pkg.dependencies?.[name] !== version) fail(`${name} must remain pinned to ${version}`);
}

if (pkg.dependencies?.['@react-three/drei']) fail('Drei is not authorized in the bounded expansion baseline');
if (app.includes('@react-three/fiber')) fail('shared product shell must not eagerly import R3F');
if (app.includes('./scenes/')) fail('shared product shell must not eagerly import family scenes');
if (!app.includes('<Suspense')) fail('shared shell must expose a bounded lazy-loading fallback');
if ((familyCanvas.match(/<Canvas/g) ?? []).length !== 1) fail('FamilyCanvas must own exactly one Canvas definition');
if (!familyCanvas.includes("from '@react-three/fiber'")) fail('R3F Canvas ownership must remain isolated in FamilyCanvas');
if (!familyCanvas.includes('data-scene-runtime={sceneId}')) fail('active family runtime identity marker is missing');
if (!app.includes('aria-live="polite"')) fail('dynamic relation result must use a polite live region');
if (!app.includes('prefers-reduced-motion') && !read('src/styles.css').includes('prefers-reduced-motion')) {
  fail('reduced-motion contract is missing');
}

for (const row of sceneRows) {
  const lazyEntry = `lazy(() => import('./sceneEntries/${row.entry}'))`;
  if (!registry.includes(lazyEntry)) fail(`missing lazy family entry: ${lazyEntry}`);
}
if ((registry.match(/lazy\(\(\) => import\(/g) ?? []).length !== sceneRows.length) {
  fail(`scene registry must expose exactly ${sceneRows.length} lazy family entries in V2.3 Wave 001`);
}

for (const required of [
  'DISTORTED FIELD → CYLINDRICAL REFLECTOR → RECTIFIED LEGIBILITY',
  'APPROACH → ROTARY HOOK CONTACT → CATCH / LOCK → SHARED LOAD PATH',
  'LOWER SOURCE + HIGHER SOURCE → FREQUENCY DIFFERENCE → SHARED BEAT ENVELOPE',
  'WOODBLOCK KENTŌ → REGISTRATION / PRESS → RECEIVING SHEET TRANSFER',
  'LEFT VIEW CARD + RIGHT VIEW CARD → CONTROLLED DISPARITY / FUSION → BINOCULAR DEPTH',
  'LANLATE UPLINK CARD → SATELLITE RELAY PATH → REMOTE RECEIVE CARD',
]) {
  if (!pilots.includes(required)) fail(`missing family law: ${required}`);
}

if (!scenes[0].includes('WebGLCubeRenderTarget') || !scenes[0].includes('CubeCamera')) {
  fail('Anamorphosis must preserve a real Three.js reflection path in the concept baseline');
}
if (!scenes[1].includes('locked') || !scenes[1].includes('pull')) {
  fail('Coupler must preserve contact/lock/load state in the concept baseline');
}
if (!scenes[2].includes('effectiveDifference') || !scenes[2].includes('invalidate')) {
  fail('Ombak must preserve paired-difference visual runtime and bounded demand rendering');
}

for (let index = 0; index < sceneRows.length; index += 1) {
  const row = sceneRows[index];
  if (!row.twoCardMarkerRequired) continue;
  if (!scenes[index].includes('name="PAIR_MEMBER_A"') || !scenes[index].includes('name="PAIR_MEMBER_B"')) {
    fail(`${row.id} must keep both base-card members explicit in the Three.js scene graph`);
  }
  if (!scenes[index].includes('name="RELATION"')) {
    fail(`${row.id} must expose a relation object without replacing either base-card member`);
  }
}

for (const requiredPairLabel of [
  'WOODBLOCK / KENTŌ', 'RECEIVING SHEET',
  'LEFT VIEW CARD', 'RIGHT VIEW CARD',
  'LANLATE UPLINK CARD', 'REMOTE RECEIVE CARD',
]) {
  if (!pilots.includes(requiredPairLabel)) fail(`missing explicit two-card identity: ${requiredPairLabel}`);
}

if (/useState\s*\(/.test(allScenes)) {
  fail('scene-level continuous/render state should not be stored in React useState');
}

if (!process.exitCode) {
  console.log('V2_CONTRACT_PASS');
  console.log('shared-shell-r3f-imports: NONE');
  console.log('shared-shell-scene-imports: NONE');
  console.log(`lazy-family-entries: ${sceneRows.length}`);
  console.log('single-FamilyCanvas-definition: PASS');
  console.log('wave-001-two-base-card-markers: PASS');
  console.log('six-distinct-relational-laws: PASS');
  console.log('reduced-motion-contract: PASS');
  console.log('scene-level-useState: NONE');
}
