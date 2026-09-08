import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const V1=process.env.RK_V1_URL||'http://127.0.0.1:4173';
const V2=process.env.RK_V2_URL||'http://127.0.0.1:4174';
const OUT=path.join(process.env.RK_RUNTIME_OUT||'runtime-evidence','wave005');
const SHOTS=path.join(OUT,'screenshots');
await fs.mkdir(SHOTS,{recursive:true});
const manifest=JSON.parse(await fs.readFile('dist/.vite/manifest.json','utf8'));
const bySource=new Map(Object.entries(manifest).filter(([,v])=>v.src).map(([k,v])=>[v.src,{key:k,entry:v}]));
const families=[
{id:'city-gatineau',label:'City · Gatineau',entry:'CityGatineauEntry.jsx',pair:['ROUTE / PASSAGE MEMBER A','VALIDATOR / REGISTERED SEAM','ROUTE CONTINUATION MEMBER B']},
{id:'frida-coyoacan',label:'Frida · Coyoacán',entry:'FridaCoyoacanEntry.jsx',pair:['MIRROR / TRACE SURFACE','REFLECTED TRACE PATH','EASEL / RECEIVING REGISTER']},
{id:'textile-bonwire',label:'Textile · Bonwire',entry:'TextileBonwireEntry.jsx',pair:['NARROW WOVEN STRIP A','SELVEDGE ALIGNMENT / INTERLACING','NARROW WOVEN STRIP B']},
{id:'zellige-fes',label:'Zellige · Fès',entry:'ZelligeFesEntry.jsx',pair:['CUT TILE PROFILE A','MATERIAL FIT / SEATING','TESSELLATION FIELD B']},
{id:'swell-marshall',label:'Swell · Marshall',entry:'SwellMarshallEntry.jsx',pair:['INCOMING SWELL VECTOR FIELD','ISLAND / CHART RELATION','DEFLECTED WAVE FIELD']},
{id:'siku-bolivia',label:'Siku · Bolivia',entry:'SikuBoliviaEntry.jsx',pair:['IRA / PARTIAL NOTE SET','ALTERNATING INTERLOCK','ARCA / COMPLEMENTARY NOTE SET']},
{id:'metate-teotitlan',label:'Metate · Teotitlán',entry:'MetateTeotitlanEntry.jsx',pair:['MANO / STROKE MEMBER','PRESSURE / ABRASION INTERFACE','METATE / CUMULATIVE TRACE MEMBER']},
{id:'tongiaki-tonga',label:'Tongiaki · Tonga',entry:'TongiakiTongaEntry.jsx',pair:['DOUBLE-HULL MEMBER A','SPACING / CROSS-DECK COUPLING','DOUBLE-HULL MEMBER B']},
{id:'garamut-sepik-ramu',label:'Garamut · Sepik / Ramu',entry:'GaramutSepikRamuEntry.jsx',pair:['BEATER / IMPACT MEMBER','MATERIAL RESONANCE CONTACT','SLIT-GONG / EVENT-TRACE MEMBER']},
];
for(const family of families){family.src=`src/sceneEntries/${family.entry}`;const found=bySource.get(family.src);if(!found||!found.entry.isDynamicEntry)throw new Error(`Wave 005 manifest entry missing/dynamic failure: ${family.id}`);family.file=found.entry.file;family.v1Path=`/families/${family.id}/`;}
async function newContext(browser,options={}){const context=await browser.newContext({viewport:options.viewport||{width:1440,height:900},reducedMotion:options.reducedMotion||'no-preference',deviceScaleFactor:1});await context.route('**/*',route=>{const u=new URL(route.request().url());return(u.hostname==='127.0.0.1'||u.hostname==='localhost')?route.continue():route.abort('blockedbyclient');});return context;}
function observePage(page){const scripts=new Set(),consoleErrors=[],pageErrors=[],intentionalNetworkBlocks=[];page.on('request',r=>{if(r.resourceType()==='script')scripts.add(new URL(r.url()).pathname.replace(/^\/+/,''));});page.on('console',m=>{if(m.type()!=='error')return;const text=m.text();if(/ERR_BLOCKED_BY_CLIENT/i.test(text)){intentionalNetworkBlocks.push(text);return;}consoleErrors.push(text);});page.on('pageerror',e=>pageErrors.push(e.message));return{scripts,consoleErrors,pageErrors,intentionalNetworkBlocks};}
async function capture(page,name){await page.screenshot({path:path.join(SHOTS,`${name}.png`),fullPage:true});}
async function attemptV1Matching(page){
  const selectors=['[data-claim="matching"]','[data-mode="matching"]','[data-mode="match"]','button[data-state="matching"]'];
  // Wrappers must be resolved before selecting the actual family controls.
  let target;
  for(let attempt=0;attempt<30 && !target;attempt++){
    for(const frame of page.frames()) for(const selector of selectors){
      if(await frame.locator(selector).count()){target={frame,selector};break;}
    }
    if(!target) await page.waitForTimeout(100);
  }
  if(!target) throw new Error('V1 matching control not found in page or child frames');
  const {frame,selector}=target;
  await frame.locator(selector).first().click();
  const run=frame.locator('#run');
  if(await run.count()) await run.click();
  else {
    const test=frame.getByRole('button',{name:/TEST/});
    if(await test.count() !== 1) throw new Error('V1 run control ambiguous or missing');
    await test.click();
  }
  await frame.waitForFunction(() => {
    const result=document.querySelector('#result');
    return result && (result.classList.contains('ok') || result.textContent.trim()==='CONTINUE · IRA + ARKA REMAIN DISTINCT SOURCES');
  },null,{timeout:15000});
  return {attempted:true,terminalVerified:true,selector,frameUrl:frame.url(),result:(await frame.locator('#result').innerText()).trim()};
}
async function chooseRelation(page,family,matching){
 if(family.id !== 'city-gatineau') return page.getByRole('button',{name:matching?'MATCHING':'OTHER',exact:true}).click();
 const other=page.getByRole('button',{name:'AUTRE LIAISON',exact:true});
 if((await other.getAttribute('aria-pressed')==='true')===matching) await other.click();
 await page.getByRole('button',{name:'RAPPROCHER LES CARTES',exact:true}).click();
 if(matching) await page.getByRole('button',{name:'FAIRE PASSER',exact:true}).click();
}
async function completeStudy(page,family){
  if(family.id==='textile-bonwire'){for(let i=0;i<7;i++)await page.getByRole('button',{name:'AJOUTER UN POINT',exact:true}).click();if(!/CONTINUATION FORMED/.test(await page.locator('.status-strip').innerText()))throw new Error('Textile join incomplete');}
  if(family.id==='metate-teotitlan'){
    if(Number(await page.locator('#grind-work').getAttribute('value'))!==0) throw new Error('Metate claims work before movement');
    for(let i=0;i<6;i++) await page.getByRole('button',{name:'MAKE ONE STROKE',exact:true}).click();
    if(Number(await page.locator('#grind-work').getAttribute('value'))<.999) throw new Error('Metate trace incomplete after six courses');
  }
  if(family.id==='siku-bolivia'){
    for(let i=0;i<8;i++) await page.getByRole('button',{name:'NEXT BEAT',exact:true}).click();
    const score=await page.locator('.phrase-score li').evaluateAll(items=>items.map(item=>item.dataset.contribution));
    if(score.join('')!=='ABABABAB') throw new Error('Siku contributions do not interlock');
  }
}
async function runV1(browser,family){const context=await newContext(browser),page=await context.newPage(),observed=observePage(page);try{await page.goto(`${V1}${family.v1Path}`,{waitUntil:'domcontentloaded'});await page.waitForTimeout(450);const body=(await page.locator('body').innerText()).trim();if(body.length<20)throw new Error(`${family.id}: V1 body unexpectedly empty`);await capture(page,`v1-${family.id}-baseline`);const matchingAttempt=await attemptV1Matching(page);if(matchingAttempt.attempted&&!matchingAttempt.error)await capture(page,`v1-${family.id}-matching-attempt`);if(observed.consoleErrors.length||observed.pageErrors.length)throw new Error(`${family.id}: V1 browser errors ${JSON.stringify({consoleErrors:observed.consoleErrors,pageErrors:observed.pageErrors})}`);return{finalUrl:page.url(),bodyPreview:body.slice(0,1200),matchingAttempt,intentionalNetworkBlocks:observed.intentionalNetworkBlocks};}finally{await context.close();}}
async function openV2(page,family){await page.goto(`${V2}/?focus=1&pilot=${encodeURIComponent(family.id)}`,{waitUntil:'domcontentloaded'});await page.locator(`[data-scene-runtime="${family.id}"]`).waitFor({state:'attached',timeout:10000});await page.locator('canvas').waitFor({state:'visible',timeout:10000});await page.waitForTimeout(220);if((await page.locator('canvas').count())!==1)throw new Error(`${family.id}: expected one Canvas`);const pair=(await page.locator('.pair-member-rail strong').allInnerTexts()).map(v=>v.trim());if(JSON.stringify(pair)!==JSON.stringify(family.pair))throw new Error(`${family.id}: pair identity mismatch ${JSON.stringify(pair)}`);}
async function runV2Desktop(browser,family){const context=await newContext(browser),page=await context.newPage(),observed=observePage(page);try{await openV2(page,family);const otherFiles=families.filter(x=>x.id!==family.id).map(x=>x.file);if(!observed.scripts.has(family.file))throw new Error(`${family.id}: own lazy entry not requested`);const eager=otherFiles.filter(file=>observed.scripts.has(file));if(eager.length)throw new Error(`${family.id}: unrelated Wave 005 chunks eager-loaded: ${eager.join(', ')}`);await chooseRelation(page,family,false);await page.waitForTimeout(160);const other=(await page.locator('.status-strip').innerText()).trim();if(!/^OTHER ·/i.test(other))throw new Error(`${family.id}: V2 OTHER mismatch ${other}`);await capture(page,`v2-${family.id}-other`);await chooseRelation(page,family,true);await completeStudy(page,family);await page.waitForTimeout(220);const matching=(await page.locator('.status-strip').innerText()).trim();if(!/^MATCHING ·/i.test(matching))throw new Error(`${family.id}: V2 MATCHING mismatch ${matching}`);await capture(page,`v2-${family.id}-matching`);const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,canvas:document.querySelectorAll('canvas').length}));if(layout.scrollWidth>layout.width)throw new Error(`${family.id}: desktop overflow`);if(observed.intentionalNetworkBlocks.length)throw new Error(`${family.id}: V2 attempted blocked external resources`);if(observed.consoleErrors.length||observed.pageErrors.length)throw new Error(`${family.id}: V2 browser errors`);return{other,matching,pair:family.pair,layout,ownEntry:family.file,eagerWave005Entries:eager};}finally{await context.close();}}
async function runMobile(browser,family){const context=await newContext(browser,{viewport:{width:390,height:844}}),page=await context.newPage(),observed=observePage(page);try{await openV2(page,family);await chooseRelation(page,family,true);await completeStudy(page,family);await page.waitForTimeout(160);const status=(await page.locator('.status-strip').innerText()).trim();if(!/^MATCHING ·/i.test(status))throw new Error(`${family.id}: mobile matching mismatch`);const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,canvas:document.querySelectorAll('canvas').length}));if(layout.scrollWidth>layout.width||layout.canvas!==1)throw new Error(`${family.id}: mobile layout failure ${JSON.stringify(layout)}`);await capture(page,`v2-${family.id}-mobile-matching`);if(observed.intentionalNetworkBlocks.length||observed.consoleErrors.length||observed.pageErrors.length)throw new Error(`${family.id}: mobile browser/network errors`);return{status,layout};}finally{await context.close();}}
async function runReduced(browser,family){const context=await newContext(browser,{reducedMotion:'reduce'}),page=await context.newPage(),observed=observePage(page);try{await openV2(page,family);const note=(await page.locator('.motion-note').innerText()).trim();if(!/Reduced motion active/i.test(note))throw new Error(`${family.id}: reduced-motion contract inactive`);await chooseRelation(page,family,true);await completeStudy(page,family);await page.waitForTimeout(130);const status=(await page.locator('.status-strip').innerText()).trim();if(!/^MATCHING ·/i.test(status))throw new Error(`${family.id}: reduced matching mismatch`);await capture(page,`v2-${family.id}-reduced-motion`);if(observed.intentionalNetworkBlocks.length||observed.consoleErrors.length||observed.pageErrors.length)throw new Error(`${family.id}: reduced-motion browser/network errors`);return{note,status};}finally{await context.close();}}
const report={schema:'RELATIONAL_KEY_V2_WAVE_005_RUNTIME_COMPARE_001',generatedAt:new Date().toISOString(),v1Url:V1,v2Url:V2,families:{},findings:[]};let hardFailure=false;const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
try{for(const family of families){try{report.families[family.id]={v1:await runV1(browser,family),v2:await runV2Desktop(browser,family),mobile:await runMobile(browser,family),reducedMotion:await runReduced(browser,family)};}catch(error){hardFailure=true;report.findings.push({severity:'FAIL',family:family.id,message:error.stack||String(error)});}}}finally{await browser.close();}
report.verdict=hardFailure?'WAVE_005_TARGETED_REWORK_REQUIRED':'WAVE_005_BROWSER_RUNTIME_PASS_PENDING_HUMAN_V1_V2_COMPARISON';await fs.writeFile(path.join(OUT,'wave005-compare.json'),JSON.stringify(report,null,2));const summary=['# RELATIONAL KEY V2 — Wave 005 exact browser comparison',`Verdict: **${report.verdict}**`,''];for(const family of families){const row=report.families[family.id];summary.push(`## ${family.label}`);if(!row)summary.push('- Incomplete.');else{summary.push(`- Pair: ${family.pair.join(' → ')}`);summary.push(`- V1 final URL: ${row.v1.finalUrl}`);summary.push(`- V1 matching attempt: ${row.v1.matchingAttempt?.attempted?'attempted':'not exposed by known selector'}`);summary.push(`- V2 OTHER: ${row.v2.other}`);summary.push(`- V2 MATCHING: ${row.v2.matching}`);summary.push(`- Mobile: ${row.mobile.layout.scrollWidth}/${row.mobile.layout.width}`);summary.push(`- Reduced motion: ${row.reducedMotion.note}`);summary.push(`- Lazy entry: ${row.v2.ownEntry}`);}summary.push('');}if(report.findings.length){summary.push('## Findings');for(const finding of report.findings)summary.push(`- ${finding.family}: ${finding.message}`);}await fs.writeFile(path.join(OUT,'wave005-compare.md'),summary.join('\n'));console.log(`WAVE005_VERDICT=${report.verdict}`);if(hardFailure)process.exitCode=1;
