import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='batch-evidence';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
const results=[];
try{
 for(const id of ['metate-teotitlan','siku-bolivia','textile-bonwire','boulle-france','frida-coyoacan','zellige-fes','swell-marshall','tongiaki-tonga','garamut-sepik-ramu','khipu-peru','mate-bombilla-argentina','hika-ahi-aotearoa','music-box-sainte-croix','funicular-valparaiso','signal-nigeria','astrolabe-isfahan'])for(const mode of ['desktop','mobile','reduced']){
  const context=await browser.newContext({viewport:mode==='mobile'?{width:390,height:844}:{width:1440,height:900},reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(`http://127.0.0.1:4174/?focus=1&pilot=${id}`);await page.locator('canvas').waitFor();await page.waitForTimeout(350);
  const canvas=page.locator('canvas');const initial=await canvas.screenshot({path:`${out}/${id}-${mode}-rectos.png`});
  const primary=id.startsWith('music-box')?'CYLINDER A':id.startsWith('astrolabe')?'LOCAL PLATE':id.startsWith('funicular')?'SWAP START':'MATCHING';
  await page.getByRole('button',{name:primary,exact:true}).click();
  const action=id.startsWith('metate')?'MAKE ONE STROKE':id.startsWith('siku')?'NEXT BEAT':id.startsWith('textile')?'AJOUTER UN POINT':null;
  const count=id.startsWith('metate')?6:id.startsWith('siku')?8:7;
  if(action){const button=page.getByRole('button',{name:action,exact:true});await button.focus();for(let i=0;i<count;i++)await button.press('Enter');}
  await page.waitForTimeout(250);
  const status=await page.locator('.status-strip').innerText();
  if(id.startsWith('metate')||id.startsWith('siku')||id.startsWith('textile')||id.startsWith('boulle')) assert.match(status,/TRACE FORMED|PHRASE FORMED|CONTINUATION FORMED|reciprocal première/);
  else if(id.startsWith('music-box')) assert.match(status,/^ENGAGED/);
  else if(id.startsWith('astrolabe')) assert.match(status,/^LOCAL HORIZON/);
  else if(id.startsWith('funicular')) assert.match(status,/A HIGH \/ B LOW|OPPOSED MOTION|CROSSING/);
  else assert.match(status,/^MATCHING/);
  const complete=await canvas.screenshot({path:`${out}/${id}-${mode}-complete.png`});assert.notEqual(Buffer.compare(initial,complete),0);
  await page.screenshot({path:`${out}/${id}-${mode}-page.png`,fullPage:true});
  for(const member of ['A','B']){
   await page.getByRole('button',{name:`VERSO ${member}`,exact:true}).click();assert.ok(await page.getByRole('region',{name:'Source documentaire'}).isVisible());
   assert.match(await page.locator('.collectible-source a').first().getAttribute('href'),/^https:\/\//);
   await canvas.screenshot({path:`${out}/${id}-${mode}-verso-${member}.png`});
   await page.getByRole('button',{name:`RECTO ${member}`,exact:true}).click();
   assert.equal(await page.locator('.status-strip').innerText(),status,'Reading a source must preserve work');
  }
  if(mode==='reduced'){await page.waitForTimeout(250);const idle=await canvas.screenshot();await page.waitForTimeout(400);assert.equal(Buffer.compare(idle,await canvas.screenshot()),0);}
  const secondary=id.startsWith('music-box')?'OTHER CYLINDER':id.startsWith('astrolabe')?'OTHER PLATE':id.startsWith('funicular')?'SWAP START':'OTHER';
  await page.getByRole('button',{name:secondary,exact:true}).click();await page.waitForTimeout(200);
  const otherStatus=await page.locator('.status-strip').innerText();
  if(id.startsWith('music-box')) assert.match(otherStatus,/^ENGAGED|^SEPARATE/);
  else if(id.startsWith('astrolabe')) assert.match(otherStatus,/^VALID OTHER PLATE/);
  else if(id.startsWith('funicular')) assert.match(otherStatus,/A LOW \/ B HIGH|A HIGH \/ B LOW|OPPOSED MOTION|CROSSING/);
  else assert.match(otherStatus,/^OTHER/);
  if(id.startsWith('textile'))assert.equal(await page.getByRole('button',{name:action}).isDisabled(),true);
  if(id.startsWith('metate')){await page.getByRole('button',{name:action}).click();assert.match(await page.locator('.status-strip').innerText(),/100%/);}
  if(id.startsWith('siku')){for(let i=0;i<8;i++)await page.getByRole('button',{name:action}).click();assert.match(await page.locator('.status-strip').innerText(),/4 gaps · 4 overlaps/);}
  await canvas.screenshot({path:`${out}/${id}-${mode}-other.png`});
  await page.getByRole('button',{name:'RESET',exact:true}).click();await page.waitForTimeout(200);
  assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
  results.push({id,mode,status:'PASS'});await context.close();
 }
}finally{await browser.close();await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));}
