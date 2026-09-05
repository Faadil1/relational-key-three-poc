import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const fail = (message) => { console.error(`V2_CONTRACT_FAIL: ${message}`); process.exitCode = 1; };

const pkg = JSON.parse(read('package.json'));
const app = read('src/App.jsx');
const wave3Shell = read('src/Wave3Shell.jsx');
const wave3Families = read('src/wave3Families.js');
const main = read('src/main.jsx');
const registry = read('src/sceneRegistry.js');
const familyCanvas = read('src/FamilyCanvas.jsx');
const pilots = read('src/pilots.js');
const sceneRows = [
  { id:'anamorphosis-paris', path:'src/scenes/AnamorphosisScene.jsx', entry:'AnamorphosisEntry.jsx' },
  { id:'coupler-virginia', path:'src/scenes/CouplerScene.jsx', entry:'CouplerEntry.jsx' },
  { id:'ombak-bali', path:'src/scenes/OmbakScene.jsx', entry:'OmbakEntry.jsx' },
  { id:'kento-japan', path:'src/scenes/KentoScene.jsx', entry:'KentoEntry.jsx', twoCardMarkerRequired:true },
  { id:'stereoscopy-uk', path:'src/scenes/StereoscopyScene.jsx', entry:'StereoscopyEntry.jsx', twoCardMarkerRequired:true },
  { id:'signal-nigeria', path:'src/scenes/SignalScene.jsx', entry:'SignalEntry.jsx', twoCardMarkerRequired:true },
  { id:'astrolabe-isfahan', path:'src/scenes/AstrolabeScene.jsx', entry:'AstrolabeEntry.jsx', twoCardMarkerRequired:true },
  { id:'funicular-valparaiso', path:'src/scenes/FunicularScene.jsx', entry:'FunicularEntry.jsx', twoCardMarkerRequired:true },
  { id:'music-box-sainte-croix', path:'src/scenes/MusicBoxScene.jsx', entry:'MusicBoxEntry.jsx', twoCardMarkerRequired:true },
  { id:'boulle-france', path:'src/scenes/BoulleScene.jsx', entry:'BoulleEntry.jsx', twoCardMarkerRequired:true },
  { id:'khipu-peru', path:'src/scenes/KhipuScene.jsx', entry:'KhipuEntry.jsx', twoCardMarkerRequired:true },
  { id:'mate-bombilla-argentina', path:'src/scenes/MateBombillaScene.jsx', entry:'MateBombillaEntry.jsx', twoCardMarkerRequired:true },
];
const scenes = sceneRows.map((row) => read(row.path));
const allScenes = scenes.join('\n');

const exactDependencies = { react:'19.2.8', 'react-dom':'19.2.8', '@react-three/fiber':'9.7.0', three:'0.185.1' };
for (const [name, version] of Object.entries(exactDependencies)) if (pkg.dependencies?.[name] !== version) fail(`${name} must remain pinned to ${version}`);
if (pkg.dependencies?.['@react-three/drei']) fail('Drei is not authorized in the bounded expansion baseline');

for (const shell of [app, wave3Shell, main]) {
  if (shell.includes("from '@react-three/fiber'")) fail('shared shells must not eagerly import R3F');
  if (shell.includes("from './scenes/") || shell.includes("from '../scenes/")) fail('shared shells must not eagerly import family scenes');
}
if (!app.includes('<Suspense') || !wave3Shell.includes('<Suspense')) fail('both Waves 001-002 and Wave 003 shells must expose bounded lazy-loading fallbacks');
if ((familyCanvas.match(/<Canvas/g) ?? []).length !== 1) fail('FamilyCanvas must own exactly one Canvas definition');
if (!familyCanvas.includes("from '@react-three/fiber'")) fail('R3F Canvas ownership must remain isolated in FamilyCanvas');
if (!familyCanvas.includes('data-scene-runtime={sceneId}')) fail('active family runtime identity marker is missing');
if (!app.includes('aria-live="polite"') || !wave3Shell.includes('aria-live="polite"')) fail('dynamic relation results must use polite live regions');
if (!app.includes('funicularPositionA')) fail('Funicular must use family-native continuous relation state rather than fake binary success');
if (!app.includes('astrolabePlateMode')) fail('Astrolabe alternate-valid latitude plate state is missing');
if (!app.includes('musicBoxPattern')) fail('Music Box alternate-valid cylinder state is missing');
if (!read('src/styles.css').includes('prefers-reduced-motion')) fail('reduced-motion contract is missing');
for (const id of ['boulle-france','khipu-peru','mate-bombilla-argentina']) if (!main.includes(id)) fail(`main route gate missing Wave 003 family: ${id}`);

for (const row of sceneRows) {
  const lazyEntry = `lazy(() => import('./sceneEntries/${row.entry}'))`;
  if (!registry.includes(lazyEntry)) fail(`missing lazy family entry: ${lazyEntry}`);
}
if ((registry.match(/lazy\(\(\) => import\(/g) ?? []).length !== sceneRows.length) fail(`scene registry must expose exactly ${sceneRows.length} lazy family entries in V2.3 Waves 001-003`);

for (const required of [
  'DISTORTED FIELD → CYLINDRICAL REFLECTOR → RECTIFIED LEGIBILITY',
  'APPROACH → ROTARY HOOK CONTACT → CATCH / LOCK → SHARED LOAD PATH',
  'LOWER SOURCE + HIGHER SOURCE → FREQUENCY DIFFERENCE → SHARED BEAT ENVELOPE',
  'WOODBLOCK KENTŌ → REGISTRATION / PRESS → RECEIVING SHEET TRANSFER',
  'LEFT VIEW CARD + RIGHT VIEW CARD → CONTROLLED DISPARITY / FUSION → BINOCULAR DEPTH',
  'LANLATE EARTH-STATION CAPTURE → CARRIED SIGNAL / REPEATER HANDOFF → IKORODU · OGIDO · ALABATA CHAIN',
  'RETE / STAR MAP → SHARED AXIS + RELATIVE ROTATION → LATITUDE PLATE / LOCAL HORIZON',
  'CAR A ↔ SHARED FUNICULAR / INVERSE POSITION ↔ CAR B',
  'PINNED CYLINDER → PIN-TO-TOOTH CONTACT → TUNED COMB RESPONSE',
]) if (!pilots.includes(required)) fail(`missing Waves 001-002 family law: ${required}`);
for (const required of [
  'STACKED MATERIAL A + B → ONE SHARED CUT → TWO RECIPROCAL INVERSE SURFACES',
  'PRIMARY CORD TENSION → SHARED ATTACHMENT RELATION → SECONDARY CORD + KNOT POSITION RESPONSE',
  'MATE MEDIUM + PARTICLES → BOMBILLA INSERTION / PERFORATED FILTER → SELECTIVE PASSAGE + CONTAINMENT',
]) if (!wave3Families.includes(required)) fail(`missing Wave 003 family law: ${required}`);
if (!wave3Families.includes('No numeric, linguistic, administrative or historical khipu decoding is claimed.')) fail('Khipu semantic boundary must remain explicit');

if (!scenes[0].includes('WebGLCubeRenderTarget') || !scenes[0].includes('CubeCamera')) fail('Anamorphosis must preserve a real Three.js reflection path');
if (!scenes[1].includes('locked') || !scenes[1].includes('pull')) fail('Coupler must preserve contact/lock/load state');
if (!scenes[2].includes('effectiveDifference') || !scenes[2].includes('invalidate')) fail('Ombak must preserve paired-difference visual runtime and bounded demand rendering');
for (let index=0; index<sceneRows.length; index+=1) {
  const row = sceneRows[index]; if (!row.twoCardMarkerRequired) continue;
  if (!scenes[index].includes('name="PAIR_MEMBER_A"') || !scenes[index].includes('name="PAIR_MEMBER_B"')) fail(`${row.id} must keep both pair members explicit in the Three.js scene graph`);
  if (!scenes[index].includes('name="RELATION"')) fail(`${row.id} must expose a relation object without replacing either pair member`);
}
if (!scenes[9].includes('cutOffset') || !scenes[9].includes('matching')) fail('Boulle must preserve one shared cut / reciprocal inversion distinction');
if (!scenes[10].includes('SHARED_TENSION_ATTACHMENT') || !scenes[10].includes('KNOT_REGISTER')) fail('Khipu must preserve structural tension/attachment/knot-position specificity');
if (!scenes[11].includes('PERFORATED_FILTER') || !scenes[11].includes('SELECTIVE_PASSAGE')) fail('Mate + Bombilla must preserve perforated-filter selective-passage specificity');
if (/useState\s*\(/.test(allScenes)) fail('scene-level continuous/render state should not be stored in React useState');

if (!process.exitCode) {
  console.log('V2_CONTRACT_PASS');
  console.log('shared-shell-r3f-imports: NONE');
  console.log('shared-shell-scene-imports: NONE');
  console.log(`lazy-family-entries: ${sceneRows.length}`);
  console.log('single-FamilyCanvas-definition: PASS');
  console.log('waves-001-003-two-base-card-markers: PASS');
  console.log('wave-003-truth-boundaries: PASS');
  console.log('twelve-distinct-relational-laws: PASS');
  console.log('reduced-motion-contract: PASS');
  console.log('scene-level-useState: NONE');
}
