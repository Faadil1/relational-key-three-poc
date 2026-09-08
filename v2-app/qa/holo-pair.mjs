import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='holo-evidence';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
const results=[];
try {
 for(const id of ['metate-teotitlan','siku-bolivia']) for(const mode of ['desktop','mobile','reduced']) {
  const context=await browser.newContext({viewport:mode==='mobile'?{width:390,height:844}:{width:1440,height:900},reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  const page=await context.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(`http://127.0.0.1:4174/?focus=1&pilot=${id}`);
  await page.locator('canvas').waitFor();
  await page.getByText('VIEW THE CARD MATERIAL',{exact:true}).click();
  const initial=await page.locator('.status-strip').innerText();
  const angle=page.locator('#pair-view-angle');await angle.focus();
  await angle.press('Home');await page.waitForTimeout(200);
  const left=await page.locator('canvas').screenshot({path:`${out}/${id}-${mode}-left.png`});
  await angle.press('End');await page.waitForTimeout(200);
  const right=await page.locator('canvas').screenshot({path:`${out}/${id}-${mode}-right.png`});
  assert.notEqual(Buffer.compare(left,right),0,'Opposite viewing angles must visibly differ');
  await page.getByRole('checkbox',{name:'Holographic card finish'}).uncheck();await page.waitForTimeout(200);
  const plain=await page.locator('canvas').screenshot({path:`${out}/${id}-${mode}-plain.png`});
  assert.notEqual(Buffer.compare(right,plain),0,'Foil switch must visibly change the rendering');
  assert.equal(await page.locator('.status-strip').innerText(),initial,'Presentation changed relation state');
  if(mode==='reduced') {await page.waitForTimeout(300);assert.equal(Buffer.compare(plain,await page.locator('canvas').screenshot()),0,'Unrequested motion while idle');}
  await page.getByRole('button',{name:'MATCHING',exact:true}).click();
  const action=page.getByRole('button',{name:id.startsWith('metate')?'MAKE ONE STROKE':'NEXT BEAT',exact:true});
  await action.focus();for(let i=0;i<(id.startsWith('metate')?6:8);i++)await action.press('Enter');
  assert.match(await page.locator('.status-strip').innerText(),/TRACE FORMED|PHRASE FORMED/);
  await page.screenshot({path:`${out}/${id}-${mode}-complete.png`,fullPage:true});
  assert.equal(await page.locator('canvas').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.deepEqual(errors,[]);
  results.push({id,mode,status:'PASS'});await context.close();
 }
} finally {await browser.close();await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));}
