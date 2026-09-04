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
const scenes = [
  read('src/scenes/AnamorphosisScene.jsx'),
  read('src/scenes/CouplerScene.jsx'),
  read('src/scenes/OmbakScene.jsx'),
];
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

if (pkg.dependencies?.['@react-three/drei']) fail('Drei is not authorized in the three-pilot baseline');
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

const lazyEntries = [
  "lazy(() => import('./sceneEntries/AnamorphosisEntry.jsx'))",
  "lazy(() => import('./sceneEntries/CouplerEntry.jsx'))",
  "lazy(() => import('./sceneEntries/OmbakEntry.jsx'))",
];
for (const entry of lazyEntries) {
  if (!registry.includes(entry)) fail(`missing lazy family entry: ${entry}`);
}
if ((registry.match(/lazy\(\(\) => import\(/g) ?? []).length !== 3) {
  fail('scene registry must expose exactly three lazy family entries in the pilot gate');
}

for (const required of [
  'DISTORTED FIELD → CYLINDRICAL REFLECTOR → RECTIFIED LEGIBILITY',
  'APPROACH → ROTARY HOOK CONTACT → CATCH / LOCK → SHARED LOAD PATH',
  'LOWER SOURCE + HIGHER SOURCE → FREQUENCY DIFFERENCE → SHARED BEAT ENVELOPE',
]) {
  if (!pilots.includes(required)) fail(`missing pilot law: ${required}`);
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

if (/useState\s*\(/.test(allScenes)) {
  fail('scene-level continuous/render state should not be stored in React useState in the pilot baseline');
}

if (!process.exitCode) {
  console.log('V2_CONTRACT_PASS');
  console.log('shared-shell-r3f-imports: NONE');
  console.log('shared-shell-scene-imports: NONE');
  console.log('lazy-family-entries: 3');
  console.log('single-FamilyCanvas-definition: PASS');
  console.log('three-distinct-relational-laws: PASS');
  console.log('reduced-motion-contract: PASS');
  console.log('scene-level-useState: NONE');
}
