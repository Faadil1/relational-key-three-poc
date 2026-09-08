import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTextile, textileReducer, cutMaterial } from '../src/familyModels/collectibleBatch.js';
test('unregistered edges cannot stitch; assembly takes seven actions and clears when registration changes',()=>{
 let s=initialTextile();s=textileReducer(s,{type:'stitch'});assert.equal(s.stitches,0);
 s=textileReducer(s,{type:'align',value:true});assert.equal(s.stitches,0);
 for(let i=1;i<=7;i++){s=textileReducer(s,{type:'stitch'});assert.equal(s.stitches,i);}
 assert.equal(textileReducer(s,{type:'stitch'}).stitches,7);
 s=textileReducer(s,{type:'align',value:false});assert.equal(s.stitches,0);assert.equal(s.aligned,false);
});
test('Boulle complements at identical coordinates; a different cut breaks that relation',()=>{
 let mismatches=0;
 for(let y=0;y<=100;y++)for(let x=0;x<=100;x++){
  const a=cutMaterial(x/100,y/100,'A');
  assert.equal(a+cutMaterial(x/100,y/100,'B'),1);
  if(a+cutMaterial(x/100,y/100,'B',false)!==1)mismatches++;
 }
 assert.ok(mismatches>1000);
});
