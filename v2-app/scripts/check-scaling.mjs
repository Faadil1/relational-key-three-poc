import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const dist=path.join(root,'dist');
const manifestPath=path.join(dist,'.vite','manifest.json');
const reportPath=path.join(dist,'scaling-architecture.json');
const failures=[];const fail=m=>failures.push(m);
if(!fs.existsSync(manifestPath)){console.error('V2_SCALING_FAIL: Vite manifest is missing');process.exit(1)}
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const entries=Object.entries(manifest),bySource=new Map();for(const [key,entry] of entries)if(entry.src)bySource.set(entry.src,{key,entry});
const entryCandidates=entries.filter(([,e])=>e.isEntry).map(([key,entry])=>({key,entry}));
const main=bySource.get('src/main.jsx')??bySource.get('index.html')??(entryCandidates.length===1?entryCandidates[0]:null);
if(!main)fail('manifest must expose one product entry');if(entryCandidates.length!==1)fail(`expected exactly one product entry, found ${entryCandidates.length}`);if(main&&!main.entry.isEntry)fail('resolved product entry must be marked isEntry');
const families=[
['anamorphosis-paris','AnamorphosisEntry.jsx'],['coupler-virginia','CouplerEntry.jsx'],['ombak-bali','OmbakEntry.jsx'],['kento-japan','KentoEntry.jsx'],['stereoscopy-uk','StereoscopyEntry.jsx'],['signal-nigeria','SignalEntry.jsx'],['astrolabe-isfahan','AstrolabeEntry.jsx'],['funicular-valparaiso','FunicularEntry.jsx'],['music-box-sainte-croix','MusicBoxEntry.jsx'],['boulle-france','BoulleEntry.jsx'],['khipu-peru','KhipuEntry.jsx'],['mate-bombilla-argentina','MateBombillaEntry.jsx']
].map(([id,file])=>({id,src:`src/sceneEntries/${file}`}));
function closure(start){const seen=new Set(),stack=[start];while(stack.length){const key=stack.pop();if(!key||seen.has(key))continue;seen.add(key);for(const imported of manifest[key]?.imports??[])stack.push(imported)}return seen}
function bytes(key){const file=manifest[key]?.file;if(!file)return 0;const full=path.join(dist,file);return fs.existsSync(full)?fs.statSync(full).size:0}
const sum=keys=>[...keys].reduce((n,k)=>n+bytes(k),0);
const initial=main?closure(main.key):new Set();
const dynamicRefs=new Set(entries.flatMap(([,e])=>e.dynamicImports??[]));
const rows=[],files=new Set(),closures=[];
for(const family of families){const found=bySource.get(family.src);if(!found){fail(`${family.id} dynamic manifest entry is missing`);continue}if(!found.entry.isDynamicEntry)fail(`${family.id} must be emitted as a dynamic entry`);if(!dynamicRefs.has(found.key))fail(`${family.id} dynamic entry is not referenced by a dynamic import`);if(initial.has(found.key))fail(`${family.id} must not be part of initial static closure`);if(files.has(found.entry.file))fail(`${family.id} must have a distinct family entry chunk`);files.add(found.entry.file);const c=closure(found.key);closures.push(c);const incremental=new Set([...c].filter(k=>!initial.has(k)));rows.push({id:family.id,source:family.src,manifestKey:found.key,entryFile:found.entry.file,entryBytes:bytes(found.key),staticClosureFiles:[...c].map(k=>manifest[k]?.file).filter(Boolean),staticClosureBytes:sum(c),incrementalBeyondInitialFiles:[...incremental].map(k=>manifest[k]?.file).filter(Boolean),incrementalBeyondInitialBytes:sum(incremental)})}
if(files.size!==families.length)fail(`expected ${families.length} distinct family entry files, found ${files.size}`);
let shared=new Set();if(closures.length===families.length&&closures.length)shared=new Set([...closures[0]].filter(k=>closures.every(c=>c.has(k))&&!initial.has(k)));
function walk(dir){if(!fs.existsSync(dir))return[];return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const full=path.join(dir,e.name);return e.isDirectory()?walk(full):e.isFile()&&e.name.endsWith('.js')?[full]:[]})}
const allJs=walk(path.join(dist,'assets'));
const report={schema:'RELATIONAL_KEY_V2_SCALING_ARCHITECTURE_BUILD_004',generatedAt:new Date().toISOString(),verdict:failures.length?'SCALING_ARCHITECTURE_BUILD_FAIL':'SCALING_ARCHITECTURE_BUILD_PASS',familyCount:families.length,main:main?{manifestKey:main.key,source:main.entry.src??null,file:main.entry.file,entryBytes:bytes(main.key),initialStaticFiles:[...initial].map(k=>manifest[k]?.file).filter(Boolean),initialStaticBytes:sum(initial),dynamicImports:main.entry.dynamicImports??[]}:null,families:rows,sharedDynamicRuntime:{files:[...shared].map(k=>manifest[k]?.file).filter(Boolean),bytes:sum(shared)},completeBuild:{jsFileCount:allJs.length,jsBytes:allJs.reduce((n,f)=>n+fs.statSync(f).size,0)},failures};
fs.writeFileSync(reportPath,JSON.stringify(report,null,2));console.log('V2_SCALING_BUILD_REPORT_BEGIN');console.log(JSON.stringify(report,null,2));console.log('V2_SCALING_BUILD_REPORT_END');if(failures.length){for(const m of failures)console.error(`V2_SCALING_FAIL: ${m}`);process.exitCode=1}else{console.log('V2_SCALING_ARCHITECTURE_BUILD_PASS');console.log(`family-count: ${report.familyCount}`);console.log(`initial-static-js-bytes: ${report.main?.initialStaticBytes??0}`);for(const f of rows)console.log(`${f.id}-incremental-js-bytes: ${f.incrementalBeyondInitialBytes}`)}
