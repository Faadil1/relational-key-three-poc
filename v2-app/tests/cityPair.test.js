import test from 'node:test';import assert from 'node:assert/strict';
import {initialCity,cityReducer,cityReady} from '../src/familyModels/cityPair.js';
test('City requires two rectos, close registration, then an explicit passage',()=>{
 let s=initialCity();assert.equal(cityReducer(s,{type:'send'}).transferred,false);
 s=cityReducer(s,{type:'move',gap:0});assert.equal(cityReady(s),true);assert.equal(s.transferred,false);
 assert.equal(cityReducer(s,{type:'send'}).transferred,true);
 for(const member of ['A','B']){const back=cityReducer(s,{type:'flip',member});assert.equal(cityReady(back),false);assert.equal(cityReducer(back,{type:'send'}).transferred,false);}
 const offset=cityReducer(s,{type:'offset',value:true});assert.equal(cityReady(offset),false);assert.equal(cityReducer(offset,{type:'send'}).transferred,false);
});
test('Moving away clears the passage; invalid input cannot corrupt the model',()=>{
 let s=cityReducer(initialCity(),{type:'move',gap:0});s=cityReducer(s,{type:'send'});
 assert.equal(cityReducer(s,{type:'move',gap:.8}).transferred,false);
 assert.deepEqual(cityReducer(s,{type:'move',gap:NaN}),s);
 assert.deepEqual(cityReducer(s,{type:'reset'}),initialCity());
});
