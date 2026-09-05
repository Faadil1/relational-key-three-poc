import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const fail = (message) => { console.error(`V2_CONTRACT_FAIL: ${message}`); process.exitCode = 1; };
const hasMarker = (source, marker) => source.includes(`name="${marker}"`) || source.includes(`'${marker}'`) || source.includes(`"${marker}"`);

const pkg = JSON.parse(read('package.json'));
const app = read('src/App.jsx');
const registry = read('src/sceneRegistry.js');
const familyCanvas = read('src/FamilyCanvas.jsx');
const pilots = read('src/pilots.js');
const styles = read('src/styles.css');

const sceneRows = [
  { id: 'anamorphosis-paris', path: 'src/scenes/AnamorphosisScene.jsx', entry: 'AnamorphosisEntry.jsx' },
  { id: 'coupler-virginia', path: 'src/scenes/CouplerScene.jsx', entry: 'CouplerEntry.jsx' },
  { id: 'ombak-bali', path: 'src/scenes/OmbakScene.jsx', entry: 'OmbakEntry.jsx' },
  { id: 'kento-japan', path: 'src/scenes/KentoScene.jsx', entry: 'KentoEntry.jsx', pairMarkers: true },
  { id: 'stereoscopy-uk', path: 'src/scenes/StereoscopyScene.jsx', entry: 'StereoscopyEntry.jsx', pairMarkers: true },
  { id: 'signal-nigeria', path: 'src/scenes/SignalScene.jsx', entry: 'SignalEntry.jsx', pairMarkers: true },
  { id: 'astrolabe-isfahan', path: 'src/scenes/AstrolabeScene.jsx', entry: 'AstrolabeEntry.jsx', pairMarkers: true },
  { id: 'funicular-valparaiso', path: 'src/scenes/FunicularScene.jsx', entry: 'FunicularEntry.jsx', pairMarkers: true },
  { id: 'music-box-sainte-croix', path: 'src/scenes/MusicBoxScene.jsx', entry: 'MusicBoxEntry.jsx', pairMarkers: true },
  { id: 'boulle-france', path: 'src/scenes/BoulleScene.jsx', entry: 'BoulleEntry.jsx', pairMarkers: true },
  { id: 'khipu-peru', path: 'src/scenes/KhipuScene.jsx', entry: 'KhipuEntry.jsx', pairMarkers: true },
  { id: 'mate-bombilla-argentina', path: 'src/scenes/MateBombillaScene.jsx', entry: 'MateBombillaEntry.jsx', pairMarkers: true },
];
const scenes = Object.fromEntries(sceneRows.map((row) => [row.id, read(row.path)]));
const allScenes = Object.values(scenes).join('\n');

for (const [name, version] of Object.entries({ react: '19.2.8', 'react-dom': '19.2.8', '@react-three/fiber': '9.7.0', three: '0.185.1' })) {
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
if (!app.includes('funicularPositionA')) fail('Funicular continuous relation state is missing');
if (!app.includes('astrolabePlateMode')) fail('Astrolabe alternate-valid plate state is missing');
if (!app.includes('musicBoxPattern')) fail('Music Box alternate-valid cylinder state is missing');
if (!app.includes('boulleSeparated')) fail('Boulle reciprocal separation state is missing');
if (!app.includes('khipuTension')) fail('Khipu structural tension state is missing');
if (!app.includes('mateInsertion')) fail('Mate + Bombilla insertion state is missing');
if (!app.includes('prefers-reduced-motion') && !styles.includes('prefers-reduced-motion')) fail('reduced-motion contract is missing');

for (const row of sceneRows) {
  const lazyEntry = `lazy(() => import('./sceneEntries/${row.entry}'))`;
  if (!registry.includes(lazyEntry)) fail(`missing lazy family entry: ${lazyEntry}`);
  if (row.pairMarkers) {
    const scene = scenes[row.id];
    if (!hasMarker(scene, 'PAIR_MEMBER_A') || !hasMarker(scene, 'PAIR_MEMBER_B')) fail(`${row.id} must keep both pair members explicit`);
    if (!hasMarker(scene, 'RELATION')) fail(`${row.id} must expose an explicit relation object`);
  }
}
if ((registry.match(/lazy\(\(\) => import\(/g) ?? []).length !== sceneRows.length) fail(`scene registry must expose exactly ${sceneRows.length} lazy family entries`);

for (const law of [
  'DISTORTED FIELD → CYLINDRICAL REFLECTOR → RECTIFIED LEGIBILITY',
  'APPROACH → ROTARY HOOK CONTACT → CATCH / LOCK → SHARED LOAD PATH',
  'LOWER SOURCE + HIGHER SOURCE → FREQUENCY DIFFERENCE → SHARED BEAT ENVELOPE',
  'WOODBLOCK KENTŌ → REGISTRATION / PRESS → RECEIVING SHEET TRANSFER',
  'LEFT VIEW CARD + RIGHT VIEW CARD → CONTROLLED DISPARITY / FUSION → BINOCULAR DEPTH',
  'LANLATE EARTH-STATION CAPTURE → CARRIED SIGNAL / REPEATER HANDOFF → IKORODU · OGIDO · ALABATA CHAIN',
  'RETE / STAR MAP → SHARED AXIS + RELATIVE ROTATION → LATITUDE PLATE / LOCAL HORIZON',
  'CAR A ↔ SHARED FUNICULAR / INVERSE POSITION ↔ CAR B',
  'PINNED CYLINDER → PIN-TO-TOOTH CONTACT → TUNED COMB RESPONSE',
  'STACKED MATERIAL FIELDS → ONE SHARED CUT → TWO RECIPROCAL INVERSE SURFACES',
  'CARRYING CORD → SHARED TENSION / ATTACHMENT → SECONDARY CORD + KNOT POSITION RESPONSE',
  'MATE PARTICLE MEDIUM → BOMBILLA INSERTION / PERFORATED FILTER → SELECTIVE PASSAGE + CONTAINMENT',
]) if (!pilots.includes(law)) fail(`missing family law: ${law}`);

if (!scenes['anamorphosis-paris'].includes('WebGLCubeRenderTarget') || !scenes['anamorphosis-paris'].includes('CubeCamera')) fail('Anamorphosis must preserve the real reflection path');
if (!scenes['coupler-virginia'].includes('locked') || !scenes['coupler-virginia'].includes('pull')) fail('Coupler must preserve contact/lock/load state');
if (!scenes['ombak-bali'].includes('effectiveDifference') || !scenes['ombak-bali'].includes('invalidate')) fail('Ombak must preserve bounded paired-difference rendering');
if (!scenes['funicular-valparaiso'].includes('positionB = 1 - positionA')) fail('Funicular must preserve exact inverse positional relation');
if (!scenes['music-box-sainte-croix'].includes('PATTERNS') || !scenes['music-box-sainte-croix'].includes('activePin')) fail('Music Box must preserve deterministic pin decoding');

if (!scenes['boulle-france'].includes('RECIPROCAL_CUT') || !scenes['boulle-france'].includes('PREMIERE_PARTIE') || !scenes['boulle-france'].includes('CONTRE_PARTIE')) fail('Boulle must preserve one-cut reciprocal inversion specificity');
if (!scenes['khipu-peru'].includes('SHARED_TENSION_ATTACHMENT') || !scenes['khipu-peru'].includes('KNOT_REGISTER') || !scenes['khipu-peru'].includes('SECONDARY_CORD')) fail('Khipu must preserve structural cord/tension/knot specificity');
if (/https?:\/\//i.test(scenes['khipu-peru'])) fail('Khipu Wave 003 must remain procedural-only with no remote archival raster');
if (/decode|translation|numeric value|administrative meaning/i.test(scenes['khipu-peru'])) fail('Khipu scene must not encode semantic decoding claims');
if (!pilots.includes('No numeric, linguistic, administrative or historical message decoding is claimed')) fail('Khipu truth boundary must explicitly prohibit semantic decoding');
if (!scenes['mate-bombilla-argentina'].includes('PERFORATED_FILTER') || !scenes['mate-bombilla-argentina'].includes('SELECTIVE_PASSAGE') || !scenes['mate-bombilla-argentina'].includes('PARTICLE_FIELD')) fail('Mate + Bombilla must preserve insertion/filter/selective-passage specificity');
if (/useState\s*\(/.test(allScenes)) fail('scene-level continuous/render state should not be stored in React useState');

if (!process.exitCode) {
  console.log('V2_CONTRACT_PASS');
  console.log('shared-shell-r3f-imports: NONE');
  console.log('shared-shell-scene-imports: NONE');
  console.log(`lazy-family-entries: ${sceneRows.length}`);
  console.log('single-FamilyCanvas-definition: PASS');
  console.log('wave-003-boulle-reciprocal-cut: PASS');
  console.log('wave-003-khipu-procedural-structural-only: PASS');
  console.log('wave-003-mate-bombilla-selective-passage: PASS');
  console.log('scene-level-useState: NONE');
}
