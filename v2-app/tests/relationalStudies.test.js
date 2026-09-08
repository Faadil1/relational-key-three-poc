import test from 'node:test';
import assert from 'node:assert/strict';
import { initialMetate, metateReducer, initialSiku, sikuReducer, sharedPhrase } from '../src/familyModels/relationalStudies.js';
const stroke = state => metateReducer(state, { type: 'stroke' });
const phrase = state => Array.from({length:8}).reduce(s => sikuReducer(s,{type:'step'}),state);
test('Metate needs movement AND contact; lifting preserves previous work', () => {
  let s = stroke(initialMetate()); assert.equal(s.work,0);
  s = metateReducer(s,{type:'contact',value:true}); assert.equal(s.work,0);
  s = stroke(s); assert.ok(s.work > 0 && s.work < 1);
  const previous = s.work;
  s = stroke(metateReducer(s,{type:'contact',value:false})); assert.equal(s.work,previous);
  assert.deepEqual(metateReducer(s,{type:'reset'}),initialMetate());
});
test('Metate rejects invalid movement and saturates without overflow', () => {
  let s = metateReducer(initialMetate(),{type:'contact',value:true});
  assert.deepEqual(metateReducer(s,{type:'move',value:NaN}),s);
  for(let i=0;i<20;i++) s=stroke(s);
  assert.equal(s.work,1);
});
test('Siku requires both complementary members and eight actual contributions', () => {
  const ready=sikuReducer(initialSiku(),{type:'relation',value:true});
  assert.equal(sharedPhrase(ready),false);
  assert.equal(sharedPhrase(phrase(ready)),true);
  for(const value of ['A','B']) {
    const solo=phrase(sikuReducer(ready,{type:'members',value}));
    assert.equal(sharedPhrase(solo),false);
    assert.equal(solo.events.filter(e=>!e.length).length,4);
  }
  const other=phrase(initialSiku()); assert.equal(sharedPhrase(other),false);
  assert.equal(other.events.filter(e=>e.length===2).length,4);
});
test('Siku changes clear the old trace and a completed phrase stops advancing', () => {
  const complete=phrase(sikuReducer(initialSiku(),{type:'relation',value:true}));
  assert.deepEqual(sikuReducer(complete,{type:'step'}),complete);
  assert.equal(sikuReducer(complete,{type:'members',value:'A'}).events.length,0);
  assert.deepEqual(sikuReducer(complete,{type:'reset'}),initialSiku());
});
