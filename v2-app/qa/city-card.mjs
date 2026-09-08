import {chromium} from 'playwright';import fs from 'node:fs/promises';import assert from 'node:assert/strict';
const out='city-evidence';await fs.mkdir(out,{recursive:true});const results=[];
const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl']});
try{for(const mode of ['desktop','mobile','reduced']){
 const context=await browser.newContext({viewport:mode==='mobile'?{width:390,height:844}:{width:1440,height:1000},hasTouch:mode==='mobile',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('http://127.0.0.1:4174/?focus=1&pilot=city-gatineau');await page.locator('canvas').waitFor();await page.waitForTimeout(300);
 const button=name=>page.getByRole('button',{name,exact:true});const status=()=>page.locator('.status-strip').innerText();
 await page.screenshot({path:`${out}/${mode}-rectos.png`,fullPage:true});
 assert.equal(await button('FAIRE PASSER').isDisabled(),true);
 if(mode==='desktop'){
  const rect=await page.locator('canvas').boundingBox();
  await page.mouse.move(rect.x+rect.width*.72,rect.y+rect.height*.5);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.56,rect.y+rect.height*.5,{steps:12});await page.mouse.up();
  assert.match(await status(),/RACCORD PRÊT/,'Dragging B must prepare the seam');
 }else if(mode==='mobile')await button('RAPPROCHER LES CARTES').tap();
 else{await button('RAPPROCHER LES CARTES').focus();await page.keyboard.press('Enter');}
 assert.match(await status(),/RACCORD PRÊT/);
 await button('FAIRE PASSER').focus();await page.keyboard.press('Enter');assert.match(await status(),/PASSAGE TRANSMIS/);
 await page.screenshot({path:`${out}/${mode}-passage.png`,fullPage:true});
 await button('VERSO A').click();assert.match(await status(),/VERSO OUVERT/);assert.equal(await button('FAIRE PASSER').isDisabled(),true);
 await page.getByRole('link',{name:/Consulter la carte municipale/}).waitFor();
 await page.screenshot({path:`${out}/${mode}-verso.png`,fullPage:true});
 await button('RECTO A').click();await button('AUTRE LIAISON').click();assert.match(await status(),/RACCORD DÉCALÉ/);assert.equal(await button('FAIRE PASSER').isDisabled(),true);
 await button('RECOMMENCER').click();assert.match(await status(),/DEUX FRAGMENTS/);
 assert.equal(await page.locator('canvas').count(),1);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.deepEqual(errors,[]);
 if(mode==='reduced'){const before=await page.locator('canvas').screenshot();await page.waitForTimeout(300);assert.equal(Buffer.compare(before,await page.locator('canvas').screenshot()),0);}
 results.push({mode,status:'PASS'});await context.close();
}}finally{await browser.close();await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));}
