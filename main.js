import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const q=s=>document.querySelector(s);
const canvas=q('#scene'), stage=q('.stage'), phaseEl=q('#phase'), result=q('#result'), debug=q('#debug'), hint=q('#hint'), inspectBtn=q('#inspect');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const S={scenario:'family',phase:'idle',drag:false,done:false,auto:false,debug:false,inspect:false,compatible:true};

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.setClearColor(0x000000,0);
renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(34,1,.1,60);cam.position.set(0,0,8.15);
scene.add(new THREE.HemisphereLight(0xffffff,0xc8bfae,2.6));
const key=new THREE.DirectionalLight(0xffffff,3.1);key.position.set(-3,5,6);scene.add(key);
const rim=new THREE.DirectionalLight(0xffb49e,1.15);rim.position.set(5,-2,3);scene.add(rim);

const world=new THREE.Group();scene.add(world);
const blue=0x1734e8, ivory=0xeee9de, orange=0xef4a24, quiet=0x9d968d;

function roundedShape(w,h,r){
  const x=-w/2,y=-h/2,s=new THREE.Shape();
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
function roundedBody(w,h,d,r,color){
  const geo=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.018,bevelThickness:.012,curveSegments:12});
  geo.center();
  return new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.82,metalness:0}));
}
function textTexture(lines,{bg='rgba(0,0,0,0)',fg='#ffffff',accent='#ef4a24',w=900,h=560}={}){
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.clearRect(0,0,w,h);if(bg!=='transparent'){x.fillStyle=bg;x.fillRect(0,0,w,h)}
  x.textBaseline='top';
  lines.forEach(item=>{x.font=`${item.weight||600} ${item.size||30}px ${item.font||'Arial'}`;x.fillStyle=item.accent?accent:(item.color||fg);x.fillText(item.text,item.x,item.y)});
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;
}
function surfacePlane(w,h,texture,z=.056){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));m.position.z=z;return m}

const cardGroup=new THREE.Group(), destGroup=new THREE.Group();world.add(cardGroup,destGroup);
const cardBody=roundedBody(3.3,2.08,.09,.16,blue), destBody=roundedBody(3.18,2.08,.09,.16,ivory);cardGroup.add(cardBody);destGroup.add(destBody);
const cardTex=textTexture([
  {text:'ANCHORAGE MUSEUM',x:58,y:48,size:27,weight:700},{text:'FAMILY PLUS',x:58,y:112,size:72,weight:700},{text:'ROAM',x:58,y:214,size:32,weight:700,accent:true},{text:'MEMBER  ·  RK-017-26',x:58,y:444,size:20,weight:600,color:'#bfc8ff'}
],{bg:'transparent',fg:'#f7f4ed'});
const destTex=textTexture([
  {text:'WALT DISNEY FAMILY MUSEUM',x:58,y:48,size:25,weight:700,color:'#262626'},{text:'DESTINATION RULE',x:58,y:118,size:22,weight:600,color:'#8d857c'},{text:'ROAM ACCEPTED',x:58,y:162,size:56,weight:700,accent:true},{text:'RECIPROCAL ADMISSION',x:58,y:442,size:20,weight:600,color:'#777067'}
],{bg:'transparent',fg:'#222222'});
const cardSurface=surfacePlane(3.2,1.98,cardTex,.064), destSurface=surfacePlane(3.08,1.98,destTex,.064);cardGroup.add(cardSurface);destGroup.add(destSurface);

const orangeMat=new THREE.MeshBasicMaterial({color:orange});
const pathA=new THREE.Mesh(new THREE.BoxGeometry(2.68,.042,.022),orangeMat);pathA.position.z=.074;cardGroup.add(pathA);
const pathB=new THREE.Mesh(new THREE.BoxGeometry(2.55,.042,.022),orangeMat);pathB.position.z=.074;destGroup.add(pathB);

function arcMesh(side,bad=false){const start=side==='member'?-Math.PI/2:Math.PI/2;const g=new THREE.RingGeometry(.18,.235,48,1,start,Math.PI);const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:bad?quiet:orange,side:THREE.DoubleSide,transparent:true,opacity:1}));m.position.z=.079;return m}
let cardArc=arcMesh('member'), destArc=arcMesh('destination');cardGroup.add(cardArc);destGroup.add(destArc);
const core=new THREE.Mesh(new THREE.CircleGeometry(.19,48),new THREE.MeshBasicMaterial({color:orange,transparent:true,opacity:0}));core.position.z=.083;world.add(core);

const tensionMat=new THREE.MeshBasicMaterial({color:orange,transparent:true,opacity:0,depthWrite:false});
let tension=new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(),new THREE.Vector3(.01,0,0)),8,.012,5,false),tensionMat);world.add(tension);
function setTension(a,b,gap,bad){
  const mid=a.clone().lerp(b,.5);const bend=bad?Math.min(.42,.08+gap*.22):Math.min(.22,gap*.10);mid.y+=bad?bend:-bend*.28;mid.z=.09;
  const curve=new THREE.CatmullRomCurve3([a.clone(),a.clone().lerp(mid,.55),mid,mid.clone().lerp(b,.45),b.clone()]);
  const old=tension.geometry;tension.geometry=new THREE.TubeGeometry(curve,32,.012,6,false);old.dispose();
}

const inspectGroup=new THREE.Group();world.add(inspectGroup);inspectGroup.visible=false;
function plate(label,value,colorHex){
  const g=new THREE.Group();const p=new THREE.Mesh(new THREE.PlaneGeometry(1.72,.5),new THREE.MeshBasicMaterial({color:0xf7f4ed,transparent:true,opacity:.94,side:THREE.DoubleSide}));g.add(p);
  const tex=textTexture([{text:label,x:34,y:32,size:20,weight:600,color:'#8c857d'},{text:value,x:34,y:90,size:42,weight:700,color:colorHex}],{bg:'transparent',fg:'#191a1d',w:680,h:220});
  const t=surfacePlane(1.66,.47,tex,.008);g.add(t);return g;
}
let claimPlate=plate('MEMBER CLAIM','FAMILY PLUS','#1734e8'), networkPlate=plate('RECIPROCITY','ROAM','#ef4a24'), rulePlate=plate('DESTINATION RULE','ROAM ACCEPTED','#191a1d');inspectGroup.add(claimPlate,networkPlate,rulePlate);

let mobile=false,layout={},dragTarget=new THREE.Vector3(),velocity=new THREE.Vector3(),camTargetX=0,camTargetY=0,registeredAt=0,rejectedAt=0,inspectMix=0;
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),dragPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0),hit=new THREE.Vector3(),offset=new THREE.Vector3();
const labels={idle:'GRAB THE CREDENTIAL',dragging:'MOVE TOWARD DESTINATION',awareness:'RELATIONSHIP DETECTED',proximity:'PROXIMITY',tension:'RELATIONAL TENSION',comparing:'COMPARING CLAIM × RULE',registered:'REGISTERED',continuing:'PATH CONTINUING',revealed:'ENTITLEMENT EXPLAINED',resist:'GEOMETRY RESISTS',rejected:'NO RECIPROCAL RELATIONSHIP',inspect:'INSPECTING THE SEAM'};
function setPhase(p){if(S.phase===p)return;S.phase=p;phaseEl.textContent=labels[p]||p.toUpperCase();phaseEl.className='phase'+(['registered','continuing','revealed','inspect'].includes(p)?' registered':'')}
function relayout(){
  mobile=innerWidth<720;
  layout=mobile?{start:new THREE.Vector3(0,1.72,0),dest:new THREE.Vector3(0,-1.42,0),snap:new THREE.Vector3(0,.67,0)}:{start:new THREE.Vector3(-2.72,0,0),dest:new THREE.Vector3(2.55,0,0),snap:new THREE.Vector3(-.79,0,0)};
  reset();
}
function applyOrientation(){
  if(mobile){cardGroup.rotation.z=0;destGroup.rotation.z=0;pathA.rotation.z=Math.PI/2;pathB.rotation.z=Math.PI/2;pathA.scale.x=.72;pathB.scale.x=.7;cardArc.rotation.z=Math.PI/2;destArc.rotation.z=Math.PI/2;}
  else{pathA.rotation.z=0;pathB.rotation.z=0;pathA.scale.x=1;pathB.scale.x=1;cardArc.rotation.z=0;destArc.rotation.z=0;}
}
function setScenarioVisual(){
  S.compatible=S.scenario==='family';
  const ctx=cardTex.image.getContext('2d');
  ctx.clearRect(0,0,900,560);ctx.textBaseline='top';ctx.fillStyle='#f7f4ed';ctx.font='700 27px Arial';ctx.fillText('ANCHORAGE MUSEUM',58,48);ctx.font='700 72px Arial';ctx.fillText(S.compatible?'FAMILY PLUS':'STANDARD',58,112);ctx.fillStyle='#ef4a24';ctx.font='700 32px Arial';ctx.fillText(S.compatible?'ROAM':'ASTC',58,214);ctx.fillStyle='#bfc8ff';ctx.font='600 20px Arial';ctx.fillText('MEMBER  ·  RK-017-26',58,444);cardTex.needsUpdate=true;
  cardBody.material.color.set(S.compatible?blue:0x34343a);
  destArc.rotation.z=mobile?Math.PI/2+(S.compatible?0:.28):(S.compatible?0:.28);destArc.position[mobile?'x':'y']=S.compatible?0:.12;
}
function rebuildInspectPlates(){
  inspectGroup.clear();claimPlate=plate('MEMBER CLAIM',S.compatible?'FAMILY PLUS':'STANDARD',S.compatible?'#1734e8':'#595960');networkPlate=plate('RECIPROCITY',S.compatible?'ROAM':'ASTC','#ef4a24');rulePlate=plate('DESTINATION RULE','ROAM ACCEPTED','#191a1d');inspectGroup.add(claimPlate,networkPlate,rulePlate);
}
function reset(){
  S.drag=false;S.done=false;S.auto=false;S.inspect=false;registeredAt=rejectedAt=0;inspectMix=0;inspectGroup.visible=false;inspectBtn.hidden=true;inspectBtn.textContent='INSPECT WHY';result.hidden=true;hint.classList.remove('hidden');
  cardGroup.position.copy(layout.start);destGroup.position.copy(layout.dest);dragTarget.copy(layout.start);velocity.set(0,0,0);cardGroup.rotation.set(0,0,0);destGroup.rotation.set(0,0,0);core.material.opacity=0;core.scale.setScalar(1);pathB.scale[mobile?'y':'x']=.001;tensionMat.opacity=0;camTargetX=camTargetY=0;setPhase('idle');rebuildInspectPlates();applyOrientation();setScenarioVisual();
}
function junctions(){
  if(mobile)return {a:new THREE.Vector3(cardGroup.position.x-.28,cardGroup.position.y-1.04,.09),b:new THREE.Vector3(destGroup.position.x-.28,destGroup.position.y+1.04,.09)};
  return {a:new THREE.Vector3(cardGroup.position.x+1.65,cardGroup.position.y+.04,.09),b:new THREE.Vector3(destGroup.position.x-1.59,destGroup.position.y+.04,.09)};
}
function gap(){const {a,b}=junctions();return a.distanceTo(b)}
function show(ok){
  result.hidden=false;inspectBtn.hidden=false;
  result.innerHTML=ok?'<div class="result-kicker">RELATIONSHIP REGISTERED</div><div class="result-title">COMPLIMENTARY ADMISSION</div><div class="result-detail">Anchorage Museum <i>→</i> Family Plus <i>→</i> ROAM <i>→</i> Walt Disney Family Museum</div>':'<div class="result-kicker">NO RECIPROCAL RELATIONSHIP</div><div class="result-title small">THE CREDENTIAL REMAINS VALID.</div><div class="result-detail">Standard membership carries ASTC. This destination accepts ROAM.</div>';
}
function ndc(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,cam)}
function canGrab(){return !S.inspect&&!S.done}
canvas.addEventListener('pointerdown',e=>{if(!canGrab())return;ndc(e);if(ray.intersectObject(cardBody).length){S.drag=true;S.auto=false;canvas.setPointerCapture(e.pointerId);ray.ray.intersectPlane(dragPlane,hit);offset.copy(cardGroup.position).sub(hit);setPhase('dragging');hint.classList.add('hidden')}});
canvas.addEventListener('pointermove',e=>{if(!S.drag||S.done)return;ndc(e);ray.ray.intersectPlane(dragPlane,hit);hit.add(offset);if(mobile){hit.x=THREE.MathUtils.clamp(hit.x,-.58,.58);hit.y=THREE.MathUtils.clamp(hit.y,layout.snap.y-.06,layout.start.y+.16)}else{hit.y=THREE.MathUtils.clamp(hit.y,-.64,.64);hit.x=THREE.MathUtils.clamp(hit.x,layout.start.x-.12,layout.snap.x+.06)}dragTarget.copy(hit)});
canvas.addEventListener('pointerup',e=>{S.drag=false;try{canvas.releasePointerCapture(e.pointerId)}catch{}if(!S.done)setPhase('idle')});
canvas.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!S.done){e.preventDefault();runAuto()}if((e.key==='i'||e.key==='I')&&S.done)toggleInspect()});

function runAuto(){reset();S.auto=true;hint.classList.add('hidden');setPhase('awareness')}
q('#reset').onclick=reset;q('#auto').onclick=runAuto;
q('#debugToggle').onclick=e=>{S.debug=!S.debug;debug.hidden=!S.debug;e.currentTarget.setAttribute('aria-pressed',String(S.debug))};
document.querySelectorAll('[data-scenario]').forEach(btn=>btn.onclick=()=>{S.scenario=btn.dataset.scenario;document.querySelectorAll('[data-scenario]').forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-pressed',String(x===btn))});reset()});
inspectBtn.onclick=toggleInspect;
function toggleInspect(){if(!S.done)return;S.inspect=!S.inspect;inspectBtn.textContent=S.inspect?'CLOSE INSPECTION':'INSPECT WHY';setPhase(S.inspect?'inspect':(S.compatible?'revealed':'rejected'));inspectGroup.visible=S.inspect}

function updateInspect(dt){const targetMix=S.inspect?1:0;inspectMix=THREE.MathUtils.damp(inspectMix,targetMix,reduced?100:7,dt);if(inspectMix<.01){inspectGroup.visible=false;return}inspectGroup.visible=true;
  const j=junctions().a.clone().lerp(junctions().b,.5);inspectGroup.position.copy(j);inspectGroup.position.z=.18;
  const spread=inspectMix;
  claimPlate.position.set(mobile?-.16*spread:-.32*spread,.34*spread,.18*spread);networkPlate.position.set(0,0,0);rulePlate.position.set(mobile?.16*spread:.32*spread,-.34*spread,-.18*spread);
  const bad=!S.compatible;if(bad){networkPlate.position.x+=(mobile?.22:.18)*spread;networkPlate.rotation.z=.13*spread;rulePlate.rotation.z=-.08*spread}else{networkPlate.rotation.z=rulePlate.rotation.z=0}
  [claimPlate,networkPlate,rulePlate].forEach(p=>{p.scale.setScalar(.76+.24*spread);p.visible=spread>.04});
  camTargetX=(mobile?.36:.72)*spread;camTargetY=.1*spread;
}
function resize(){const r=stage.getBoundingClientRect();renderer.setSize(r.width,r.height,false);cam.aspect=r.width/r.height;cam.updateProjectionMatrix();const m=innerWidth<720;if(m!==mobile)relayout()}
function springStep(dt){
  const stiffness=S.done?(S.compatible?90:58):S.drag?115:S.auto?34:60;const damping=S.done?15:18;
  const force=dragTarget.clone().sub(cardGroup.position).multiplyScalar(stiffness);velocity.addScaledVector(force,dt);velocity.multiplyScalar(Math.exp(-damping*dt));cardGroup.position.addScaledVector(velocity,dt);
}

let last=performance.now();
function loop(now){const dt=Math.min(.033,(now-last)/1000||.016);last=now;resize();
  if(S.auto&&!S.done){const approach=layout.snap.clone();dragTarget.lerp(approach,reduced?.2:.016)}
  const g=gap(), engaged=S.drag||S.auto;
  if(!S.done&&engaged){
    if(g<1.55&&g>.92)setPhase('awareness');
    if(g<=.92&&g>.54)setPhase('proximity');
    if(g<=.54&&g>.22){setPhase('tension');const pull=THREE.MathUtils.clamp((.54-g)/.32,0,1);dragTarget.lerp(layout.snap,pull*(S.compatible?.18:.07));}
    if(g<=.22){S.done=true;S.drag=S.auto=false;setPhase('comparing');hint.classList.add('hidden');if(S.compatible){dragTarget.copy(layout.snap);registeredAt=now;setPhase('registered')}else{const resist=layout.snap.clone();if(mobile)resist.y+=.28;else resist.x-=.28;dragTarget.copy(resist);velocity.multiplyScalar(-.22);rejectedAt=now;setPhase('resist')}}
  }
  springStep(dt);

  const response=THREE.MathUtils.clamp(1-g/1.55,0,1);const {a,b}=junctions();setTension(a,b,g,!S.compatible);
  tensionMat.opacity=(engaged&&!S.done?response*.72:0)*(g>.12?1:.2);
  destGroup.rotation.z=THREE.MathUtils.damp(destGroup.rotation.z,(S.compatible?0:(mobile?.14:.11))*response,reduced?100:8,dt);
  if(!S.inspect){camTargetX=THREE.MathUtils.damp(camTargetX,(mobile?0:.18)*response,reduced?100:5,dt);camTargetY=0}
  if(!reduced&&!S.inspect){const dv=velocity.clone();cardGroup.rotation.x=THREE.MathUtils.damp(cardGroup.rotation.x,mobile?dv.x*.025:-dv.y*.028,8,dt);cardGroup.rotation.y=THREE.MathUtils.damp(cardGroup.rotation.y,mobile?0:dv.x*.018,8,dt)}else if(!S.inspect){cardGroup.rotation.x=cardGroup.rotation.y=0}

  if(registeredAt){const x=(now-registeredAt)/1000;if(x>.12){core.material.opacity=1;setPhase('continuing')}const p=THREE.MathUtils.clamp((x-.15)/.58,0,1);pathB.scale[mobile?'y':'x']=Math.max(.001,reduced?1:p);const pulse=x<.32?Math.sin(Math.PI*Math.min(1,x/.32))*.33:0;core.scale.setScalar(1+pulse);if(x>.78&&S.phase!=='revealed'&&!S.inspect){setPhase('revealed');show(true)}}
  if(rejectedAt&&now-rejectedAt>260&&!S.inspect&&S.phase!=='rejected'){setPhase('rejected');show(false)}

  if(mobile){pathA.position.set(-.28,-.1,.074);cardArc.position.set(-.28,-1.04,.079);destArc.position.set(-.28,1.04,.079);pathB.position.set(-.28,.12,.074);core.position.set(destGroup.position.x-.28,destGroup.position.y+1.04,.083)}
  else{pathA.position.set(-.12,.04,.074);cardArc.position.set(1.65,.04,.079);destArc.position.set(-1.59,S.compatible?.04:.16,.079);pathB.position.set(-.18,.04,.074);core.position.set(destGroup.position.x-1.59,destGroup.position.y+.04,.083)}

  updateInspect(dt);
  cam.position.x=THREE.MathUtils.damp(cam.position.x,camTargetX,reduced?100:5,dt);cam.position.y=THREE.MathUtils.damp(cam.position.y,camTargetY,reduced?100:5,dt);cam.lookAt(0,0,0);
  if(S.debug)debug.innerHTML=`<div><span>STATE</span><strong>${S.phase.toUpperCase()}</strong></div><div><span>DISTANCE</span><strong>${g.toFixed(3)}</strong></div><div><span>SCENARIO</span><strong>${S.scenario.toUpperCase()}</strong></div><div><span>COMPATIBLE</span><strong>${S.compatible?'TRUE':'FALSE'}</strong></div><div><span>INSPECT</span><strong>${S.inspect?'OPEN':'CLOSED'}</strong></div>`;
  renderer.render(scene,cam);requestAnimationFrame(loop)
}
relayout();requestAnimationFrame(loop);
