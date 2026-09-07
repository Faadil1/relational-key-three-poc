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
const wave005 = read('src/wave005Families.js');
const allPilotCopy = `${pilots}\n${wave005}`;
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
  { id: 'service-benin', path: 'src/scenes/ServiceBeninScene.jsx', entry: 'ServiceBeninEntry.jsx', pairMarkers: true },
  { id: 'food-toyama', path: 'src/scenes/FoodToyamaScene.jsx', entry: 'FoodToyamaEntry.jsx', pairMarkers: true },
  { id: 'hika-ahi-aotearoa', path: 'src/scenes/HikaAhiScene.jsx', entry: 'HikaAhiEntry.jsx', pairMarkers: true },
  { id: 'city-gatineau', path: 'src/scenes/CityGatineauScene.jsx', entry: 'CityGatineauEntry.jsx', pairMarkers: true },
  { id: 'frida-coyoacan', path: 'src/scenes/FridaCoyoacanScene.jsx', entry: 'FridaCoyoacanEntry.jsx', pairMarkers: true },
  { id: 'textile-bonwire', path: 'src/scenes/TextileBonwireScene.jsx', entry: 'TextileBonwireEntry.jsx', pairMarkers: true },
  { id: 'zellige-fes', path: 'src/scenes/ZelligeFesScene.jsx', entry: 'ZelligeFesEntry.jsx', pairMarkers: true },
  { id: 'swell-marshall', path: 'src/scenes/SwellMarshallScene.jsx', entry: 'SwellMarshallEntry.jsx', pairMarkers: true },
  { id: 'siku-bolivia', path: 'src/scenes/SikuBoliviaScene.jsx', entry: 'SikuBoliviaEntry.jsx', pairMarkers: true },
  { id: 'metate-teotitlan', path: 'src/scenes/MetateTeotitlanScene.jsx', entry: 'MetateTeotitlanEntry.jsx', pairMarkers: true },
  { id: 'tongiaki-tonga', path: 'src/scenes/TongiakiTongaScene.jsx', entry: 'TongiakiTongaEntry.jsx', pairMarkers: true },
  { id: 'garamut-sepik-ramu', path: 'src/scenes/GaramutSepikRamuScene.jsx', entry: 'GaramutSepikRamuEntry.jsx', pairMarkers: true },
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
if (!app.includes('wave005Ids.has(activeId)')) fail('Wave 005 generic bounded relation bridge is missing from the shared shell');
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
  'BÉNIN TELEPHONE-CARD MEMBER → REGISTERED CONTACT / SERVICE HANDOFF → PUBLIPHONE SERVICE WINDOW RESPONSE',
  'PRESS / PACKAGE CONSTRAINT → ORDERED RELEASE RELATION → BAMBOO-LEAF FAN / REVEAL RESPONSE',
  'HIKA RECIPROCAL STROKE + GROOVED BASE RESISTANCE → SUSTAINED FRICTION RELATION → EMBER STATE AT THE INTERFACE',
  'ROUTE MEMBER A → REGISTERED VALIDATION SEAM → ROUTE CONTINUATION MEMBER B',
  'MIRROR / TRACE MEMBER → REFLECTED PATH / ORIENTATION → RECEIVING EASEL / REGISTER MEMBER',
  'NARROW WOVEN STRIP A → SELVEDGE ALIGNMENT / INTERLACING → STRUCTURAL TEXTILE CONTINUATION B',
  'CUT ZELLIGE PROFILE A → MATERIAL FIT / SEATING RELATION → TESSELLATION CONTINUATION B',
  'SWELL VECTOR A → ISLAND / CHART RELATION → DEFLECTED / REFRACTED WAVE RESPONSE B',
  'IRA NOTE SET A + ARCA COMPLEMENT B → ALTERNATING INTERLOCK → SHARED PHRASE',
  'MANO / APPLIED STROKE A → PRESSURE + ABRASION INTERFACE → CUMULATIVE GRIND TRACE B',
  'HULL A + HULL B → SPACING / CROSS-DECK COUPLING → COORDINATED STABILITY RESPONSE',
  'BEATER / ORDERED IMPACT A → SLIT-GONG MATERIAL RESONANCE → TEMPORAL EVENT TRACE B',
]) if (!allPilotCopy.includes(law)) fail(`missing family law: ${law}`);

if (!scenes['anamorphosis-paris'].includes('WebGLCubeRenderTarget') || !scenes['anamorphosis-paris'].includes('CubeCamera')) fail('Anamorphosis must preserve the real reflection path');
if (!scenes['coupler-virginia'].includes('locked') || !scenes['coupler-virginia'].includes('pull')) fail('Coupler must preserve contact/lock/load state');
if (!scenes['ombak-bali'].includes('effectiveDifference') || !scenes['ombak-bali'].includes('invalidate')) fail('Ombak must preserve bounded paired-difference rendering');
if (!scenes['funicular-valparaiso'].includes('positionB = 1 - positionA')) fail('Funicular must preserve exact inverse positional relation');
if (!scenes['music-box-sainte-croix'].includes('PATTERNS') || !scenes['music-box-sainte-croix'].includes('activePin')) fail('Music Box must preserve deterministic pin decoding');
if (!scenes['boulle-france'].includes('RECIPROCAL_CUT') || !scenes['boulle-france'].includes('PREMIERE_PARTIE') || !scenes['boulle-france'].includes('CONTRE_PARTIE')) fail('Boulle must preserve one-cut reciprocal inversion specificity');
if (!scenes['khipu-peru'].includes('SHARED_TENSION_ATTACHMENT') || !scenes['khipu-peru'].includes('KNOT_REGISTER') || !scenes['khipu-peru'].includes('SECONDARY_CORD')) fail('Khipu must preserve structural cord/tension/knot specificity');
if (!scenes['mate-bombilla-argentina'].includes('PERFORATED_FILTER') || !scenes['mate-bombilla-argentina'].includes('SELECTIVE_PASSAGE') || !scenes['mate-bombilla-argentina'].includes('PARTICLE_FIELD')) fail('Mate + Bombilla must preserve insertion/filter/selective-passage specificity');
if (!scenes['service-benin'].includes('BENIN_TELEPHONE_CARD') || !scenes['service-benin'].includes('EDITORIAL_CONTACT') || !scenes['service-benin'].includes('PUBLIPHONE_WINDOW')) fail('Service Benin must preserve telephone-card/contact/service-window specificity');
if (!scenes['food-toyama'].includes('PRESS_PACKAGE_CONSTRAINT') || !scenes['food-toyama'].includes('ORDERED_RELEASE') || !scenes['food-toyama'].includes('BAMBOO_LEAF_REVEAL')) fail('Food Toyama must preserve press/release/leaf-reveal specificity');
if (!scenes['hika-ahi-aotearoa'].includes('HIKA_STROKE') || !scenes['hika-ahi-aotearoa'].includes('GROOVED_BASE') || !scenes['hika-ahi-aotearoa'].includes('FRICTION_INTERFACE') || !scenes['hika-ahi-aotearoa'].includes('EMBER_WITNESS')) fail('Hika Ahi must preserve tool/friction/interface/ember specificity');

const wave005Markers = {
  'city-gatineau': ['ROUTE_MEMBER_A','VALIDATION_SEAM','ROUTE_MEMBER_B','ROUTE_CONTINUATION'],
  'frida-coyoacan': ['MIRROR_TRACE','REFLECTED_PATH','EASEL_REGISTER'],
  'textile-bonwire': ['WOVEN_STRIP_A','SELVEDGE_JOIN','WOVEN_STRIP_B','TEXTILE_CONTINUATION'],
  'zellige-fes': ['CUT_PROFILE_A','MATERIAL_FIT','TESSELLATION_B'],
  'swell-marshall': ['SWELL_VECTOR_A','ISLAND_RELATION','REFRACTED_WAVE_B','WAVE_DEFLECTION_REGISTER'],
  'siku-bolivia': ['IRA_NOTE_SET','ARCA_NOTE_SET','INTERLOCK_TRACE','SHARED_PHRASE'],
  'metate-teotitlan': ['MANO_STROKE','ABRASION_INTERFACE','GRIND_TRACE'],
  'tongiaki-tonga': ['HULL_A','CROSS_DECK_COUPLING','HULL_B','STABILITY_RESPONSE'],
  'garamut-sepik-ramu': ['BEATER_IMPACT','SLIT_GONG_BODY','EVENT_TRACE','ORDERED_IMPACT_REGISTER'],
};
for (const [id, markers] of Object.entries(wave005Markers)) {
  for (const marker of markers) if (!hasMarker(scenes[id], marker)) fail(`${id} missing specificity marker ${marker}`);
  if (/https?:\/\//i.test(scenes[id])) fail(`${id} Wave 005 scene must remain procedural-only with no remote media`);
}

for (const requiredBoundary of [
  'no STO branding, fare account, entitlement, exact validator UI',
  'No likeness, painting, artwork, photograph',
  'no named or meaning-bearing motif',
  'No historic panel, protected decorative composition',
  'no specific historic chart, route, bearing, navigation tutorial',
  'no authentic melody, archive recording',
  'not a food-preparation tutorial',
  'no Te Papa raster, sailing/navigation instruction',
  'no community-specific message meaning',
]) if (!allPilotCopy.toLowerCase().includes(requiredBoundary.toLowerCase())) fail(`missing Wave 005 truth boundary: ${requiredBoundary}`);

for (const id of ['khipu-peru','service-benin','food-toyama','hika-ahi-aotearoa',...Object.keys(wave005Markers)]) {
  if (/https?:\/\//i.test(scenes[id])) fail(`${id} must not request remote archive/media assets from scene code`);
}
if (/useState\s*\(/.test(allScenes)) fail('scene-level continuous/render state should not be stored in React useState');

if (!process.exitCode) {
  console.log('V2_CONTRACT_PASS');
  console.log('shared-shell-r3f-imports: NONE');
  console.log('shared-shell-scene-imports: NONE');
  console.log(`lazy-family-entries: ${sceneRows.length}`);
  console.log('single-FamilyCanvas-definition: PASS');
  console.log('wave-005-all-nine-procedural-specificity: PASS');
  console.log('wave-005-cultural-truth-boundaries: PASS');
  console.log('scene-level-useState: NONE');
}
