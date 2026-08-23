import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const q=s=>document.querySelector(s);
const canvas=q('#scene'), stage=q('.stage'), phaseEl=q('#phase'), result=q('#result'), debug=q('#debug'), hint=q('#hint'), inspectBtn=q('#inspect'), residualEl=q('#residual');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const S={scenario:'family',phase:'idle',drag:false,done:false,auto:false,debug:false,inspect:false,compatible:true};

const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(34,1,.1,60);cam.position.set(0,0,8.35);
scene.add(new THREE.HemisphereLight(0xffffff,0xd5ccbc,2.8));
const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(-3.5,5.5,6);scene.add(key);
const rim=new THREE.DirectionalLight(0xffb49e,.9);rim.position.set(5,-2,4);scene.add(rim);

const world=new THREE.Group();scene.add(world);
const BLUE=0x1734e8, IVORY=0xeee9de, ORANGE=0xef4a24;

function roundedShape(w,h,r){const x=-w/2,y=-h/2,s=new THREE.Shape();s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
function roundedBody(w,h,d,r,color){const geo=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.017,bevelThickness:.011,curveSegments:12});geo.center();return new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color,roughness:.84,metalness:0}))}
function textTexture(lines,{fg='#fff',w=900,h=560}={}){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.clearRect(0,0,w,h);x.textBaseline='top';lines.forEach(item=>{x.font=`${item.weight||600} ${item.size||30}px ${item.font||'Arial'}`;x.fillStyle=item.color||fg;x.fillText(item.text,item.x,item.y)});const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t}
function surface(w,h,texture,z=.061){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));m.position.z=z;return m}

const card=new THREE.Group(), dest=new THREE.Group();world.add(card,dest);
const cardBody=roundedBody(3.34,2.1,.095,.17,BLUE),destBody=roundedBody(3.2,2.1,.095,.17,IVORY);card.add(cardBody);dest.add(destBody);
const cardTex=textTexture([{text:'ANCHORAGE MUSEUM',x:58,y:48,size:27,weight:700},{text:'FAMILY PLUS',x:58,y:112,size:70,weight:700},{text:'ROAM',x:58,y:214,size:32,weight:700,color:'#ef4a24'},{text:'MEMBER · RK-017-26',x:58,y:446,size:20,weight:600,color:'#c9d0ff'}]);
const destTex=textTexture([{text:'WALT DISNEY FAMILY MUSEUM',x:58,y:48,size:25,weight:700,color:'#252525'},{text:'DESTINATION RULE',x:58,y:118,size:22,weight:600,color:'#8d857c'},{text:'ROAM ACCEPTED',x:58,y:162,size:56,weight:700,color:'#ef4a24'},{text:'RECIPROCAL ADMISSION',x:58,y:444,size:20,weight:600,color:'#777067'}],{fg:'#222'});
card.add(surface(3.23,1.99,cardTex,.066));dest.add(surface(3.09,1.99,destTex,.066));

const orangeMat=new THREE.MeshBasicMaterial({color:ORANGE,transparent:true,opacity:1});
const pathA=new THREE.Mesh(new THREE.BoxGeometry(2.76,.043,.022),orangeMat);pathA.position.z=.078;card.add(pathA);
const pathB=new THREE.Mesh(new THREE.BoxGeometry(2.58,.043,.022),orangeMat);pathB.position.z=.078;dest.add(pathB);
const core=new THREE.Mesh(new THREE.CircleGeometry(.19,48),new THREE.MeshBasicMaterial({color:ORANGE,transparent:true,opacity:0}));core.position.z=.086;world.add(core);

// Data-derived registration profiles. The destination currently accepts ROAM.
const PROFILES={ROAM:[-.16,.21,-.06,.29,-.12,.18,-.03],ASTC:[.23,-.17,.14,-.05,.26,-.11,.11]};
const accepted='ROAM';
const profileGroup=new THREE.Group();world.add(profileGroup);
let profileMeshes=[];
function clearProfiles(){profileMeshes.forEach(m=>{profileGroup.remove(m);m.geometry?.dispose();m.material?.dispose?.()});profileMeshes=[]}
function sphere(r,color,opacity=1){return new THREE.Mesh(new THREE.SphereGeometry(r,18,12),new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false}))}
function tube(points,r,color,opacity=1){const curve=new THREE.CatmullRomCurve3(points);return new THREE.Mesh(new THREE.TubeGeometry(curve,16,r,5,false),new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false}))}
function profileResidual(a,b){return a.reduce((s,v,i)=>s+Math.abs(v-b[i]),0)/a.length}
function biggestMismatch(a,b){let idx=0,max=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);if(d>max){max=d;idx=i}}return {idx,delta:a[idx]-b[idx],max}}
function profileName(){return S.scenario==='family'?'ROAM':'ASTC'}
function claimProfile(){return PROFILES[profileName()]}
function ruleProfile(){return PROFILES[accepted]}
function residual(){return profileResidual(claimProfile(),ruleProfile())}

let mobile=false,layout={},dragTarget=new THREE.Vector3(),velocity=new THREE.Vector3(),registeredAt=0,rejectedAt=0,inspectMix=0,profileOpacity=0,profileSpread=0;
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),dragPlane=new THREE.Plane(new THREE.Vector3(0,0,1),0),hit=new THREE.Vector3(),offset=new THREE.Vector3();
const labels={idle:'GRAB THE CREDENTIAL',dragging:'MOVE TOWARD DESTINATION',awareness:'RELATIONSHIP DETECTED',profile:'PROFILE REVEAL',compare:'COMPARING CLAIM × RULE',registered:'ZERO RESIDUAL · REGISTERED',continuing:'PATH CONTINUING',revealed:'ENTITLEMENT EXPLAINED',interference:'RESIDUAL INTERFERENCE',rejected:'NO RECIPROCAL RELATIONSHIP',inspect:'INSPECTING RELATION'};
function setPhase(p){if(S.phase===p)return;S.phase=p;phaseEl.textContent=labels[p]||p.toUpperCase();phaseEl.className='phase'+(['registered','continuing','revealed','inspect'].includes(p)?' registered':'')}
function relayout(){mobile=innerWidth<720;layout=mobile?{start:new THREE.Vector3(0,1.78,0),dest:new THREE.Vector3(0,-1.44,0),snap:new THREE.Vector3(0,.67,0)}:{start:new THREE.Vector3(-2.78,0,0),dest:new THREE.Vector3(2.58,0,0),snap:new THREE.Vector3(-.78,0,0)};reset()}
function anchors(){if(mobile)return {a:new THREE.Vector3(card.position.x-.28,card.position.y-1.05,.10),b:new THREE.Vector3(dest.position.x-.28,dest.position.y+1.05,.10)};return {a:new THREE.Vector3(card.position.x+1.67,card.position.y+.04,.10),b:new THREE.Vector3(dest.position.x-1.60,dest.position.y+.04,.10)}}
function gap(){const {a,b}=anchors();return a.distanceTo(b)}
function orient(){if(mobile){pathA.rotation.z=Math.PI/2;pathB.rotation.z=Math.PI/2;pathA.scale.x=.74;pathB.scale.x=.71}else{pathA.rotation.z=0;pathB.rotation.z=0;pathA.scale.x=1;pathB.scale.x=1}}
function updateCardTexture(){const x=cardTex.image.getContext('2d');x.clearRect(0,0,900,560);x.textBaseline='top';x.fillStyle='#f7f4ed';x.font='700 27px Arial';x.fillText('ANCHORAGE MUSEUM',58,48);x.font='700 70px Arial';x.fillText(S.scenario==='family'?'FAMILY PLUS':'STANDARD',58,112);x.fillStyle='#ef4a24';x.font='700 32px Arial';x.fillText(profileName(),58,214);x.fillStyle='#c9d0ff';x.font='600 20px Arial';x.fillText('MEMBER · RK-017-26',58,446);cardTex.needsUpdate=true;cardBody.material.color.set(S.scenario==='family'?BLUE:0x34343a)}
function reset(){S.drag=false;S.done=false;S.auto=false;S.inspect=false;S.compatible=S.scenario==='family';registeredAt=rejectedAt=0;inspectMix=0;profileOpacity=0;profileSpread=0;card.position.copy(layout.start);dest.position.copy(layout.dest);dragTarget.copy(layout.start);velocity.set(0,0,0);card.rotation.set(0,0,0);dest.rotation.set(0,0,0);core.material.opacity=0;pathB.scale[mobile?'y':'x']=.001;result.hidden=true;inspectBtn.hidden=true;residualEl.hidden=true;hint.classList.remove('hidden');clearProfiles();orient();updateCardTexture();setPhase('idle')}

function setProfileGeometry(opacity=1,spread=0){clearProfiles();const A=claimProfile(),B=ruleProfile(),{a,b}=anchors();const n=A.length;
  for(let i=0;i<n;i++){
    const t=i/(n-1)-.5;
    let pa,pb;
    if(mobile){pa=a.clone().add(new THREE.Vector3((A[i]*.72)+(t*.03),0,.02+spread*A[i]*.11));pb=b.clone().add(new THREE.Vector3((B[i]*.72)+(t*.03),0,.02-spread*B[i]*.11));}
    else{pa=a.clone().add(new THREE.Vector3(0,(A[i]*.72)+(t*.03),.02+spread*A[i]*.11));pb=b.clone().add(new THREE.Vector3(0,(B[i]*.72)+(t*.03),.02-spread*B[i]*.11));}
    const ca=sphere(.028,BLUE,opacity),cb=sphere(.028,ORANGE,opacity);ca.position.copy(pa);cb.position.copy(pb);profileGroup.add(ca,cb);profileMeshes.push(ca,cb);
    const mid=pa.clone().lerp(pb,.5);const residualBend=(A[i]-B[i])*.52;mobile?mid.x+=residualBend:mid.y+=residualBend;mid.z=.12+Math.abs(residualBend)*.06;
    const link=tube([pa,mid,pb],.009,S.compatible?ORANGE:0x8d8279,opacity*.88);profileGroup.add(link);profileMeshes.push(link);
  }
}

function showResidual(){residualEl.hidden=false;const r=residual();residualEl.innerHTML=`<div class="residual-kicker">REGISTRATION RESIDUAL</div><div class="residual-value ${r<.001?'zero':''}">${r<.001?'ZERO · PROFILES REGISTER':'PERSISTS · PROFILES DO NOT REGISTER'}</div>`}
function show(ok){result.hidden=false;inspectBtn.hidden=false;result.innerHTML=ok?'<div class="result-kicker">RELATIONSHIP REGISTERED</div><div class="result-title">COMPLIMENTARY ADMISSION</div><div class="result-detail">Anchorage Museum <i>→</i> Family Plus <i>→</i> ROAM <i>→</i> Walt Disney Family Museum</div>':'<div class="result-kicker">RESIDUAL INTERFERENCE</div><div class="result-title small">NO RECIPROCAL RELATIONSHIP</div><div class="result-detail">Standard carries ASTC. This destination accepts ROAM. The credential remains valid.</div>';showResidual()}
function ndc(e){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,cam)}
canvas.addEventListener('pointerdown',e=>{if(S.done||S.inspect)return;ndc(e);if(ray.intersectObject(cardBody).length){S.drag=true;S.auto=false;canvas.setPointerCapture(e.pointerId);ray.ray.intersectPlane(dragPlane,hit);offset.copy(card.position).sub(hit);setPhase('dragging');hint.classList.add('hidden')}});
canvas.addEventListener('pointermove',e=>{if(!S.drag||S.done)return;ndc(e);ray.ray.intersectPlane(dragPlane,hit);hit.add(offset);if(mobile){hit.x=THREE.MathUtils.clamp(hit.x,-.62,.62);hit.y=THREE.MathUtils.clamp(hit.y,layout.snap.y-.06,layout.start.y+.16)}else{hit.y=THREE.MathUtils.clamp(hit.y,-.68,.68);hit.x=THREE.MathUtils.clamp(hit.x,layout.start.x-.12,layout.snap.x+.06)}dragTarget.copy(hit)});
canvas.addEventListener('pointerup',e=>{S.drag=false;try{canvas.releasePointerCapture(e.pointerId)}catch{}if(!S.done)setPhase('idle')});
canvas.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!S.done){e.preventDefault();runAuto()}if((e.key==='i'||e.key==='I')&&S.done)toggleInspect()});
function runAuto(){reset();S.auto=true;hint.classList.add('hidden');setPhase('awareness')}
function toggleInspect(){if(!S.done)return;S.inspect=!S.inspect;inspectBtn.textContent=S.inspect?'CLOSE INSPECTION':'INSPECT RELATION';setPhase(S.inspect?'inspect':(S.compatible?'revealed':'rejected'))}
q('#reset').onclick=reset;q('#auto').onclick=runAuto;inspectBtn.onclick=toggleInspect;q('#debugToggle').onclick=e=>{S.debug=!S.debug;debug.hidden=!S.debug;e.currentTarget.setAttribute('aria-pressed',String(S.debug))};
document.querySelectorAll('[data-scenario]').forEach(btn=>btn.onclick=()=>{S.scenario=btn.dataset.scenario;document.querySelectorAll('[data-scenario]').forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-pressed',String(x===btn))});reset()});

function resize(){const r=stage.getBoundingClientRect();renderer.setSize(r.width,r.height,false);cam.aspect=r.width/r.height;cam.updateProjectionMatrix();const m=innerWidth<720;if(m!==mobile)relayout()}
function spring(dt){const stiffness=reduced?120:58,damping=reduced?30:12.5;const force=dragTarget.clone().sub(card.position).multiplyScalar(stiffness);velocity.addScaledVector(force,dt);velocity.multiplyScalar(Math.exp(-damping*dt));card.position.addScaledVector(velocity,dt)}
function inspectUpdate(dt){inspectMix=THREE.MathUtils.damp(inspectMix,S.inspect?1:0,reduced?100:6.2,dt);profileSpread=THREE.MathUtils.damp(profileSpread,S.inspect?1:0,reduced?100:5.8,dt);cam.position.x=THREE.MathUtils.damp(cam.position.x,S.inspect?(mobile?.45:.72):0,reduced?100:5.3,dt);cam.position.y=THREE.MathUtils.damp(cam.position.y,S.inspect?(mobile?.1:.18):0,reduced?100:5.3,dt);cam.position.z=THREE.MathUtils.damp(cam.position.z,S.inspect?7.85:8.35,reduced?100:5.3,dt);cam.lookAt(0,0,0)}
let last=performance.now();
function loop(t){resize();const dt=Math.min(.032,(t-last)/1000||.016);last=t;const g=gap();
  if(S.auto&&!S.done)dragTarget.lerp(layout.snap,.024);
  const engaged=S.drag||S.auto;
  if(!S.done&&engaged){
    if(g<1.42&&g>.9)setPhase('awareness');
    if(g<=.9&&g>.36){setPhase('profile');profileOpacity=THREE.MathUtils.lerp(profileOpacity,1,.12)}
    if(g<=.36&&g>.15){setPhase('compare');profileOpacity=1;dragTarget.lerp(layout.snap,.12)}
    if(g<=.15){S.done=true;S.drag=false;S.auto=false;showResidual();if(S.compatible){dragTarget.copy(layout.snap);registeredAt=t;setPhase('registered');if(navigator.vibrate)navigator.vibrate(14)}else{const m=biggestMismatch(claimProfile(),ruleProfile());const r=layout.snap.clone();if(mobile)r.x+=Math.sign(m.delta||1)*.28;else r.y+=Math.sign(m.delta||1)*.28;mobile?r.y+=.18:r.x-=.18;dragTarget.copy(r);velocity[mobile?'x':'y']+=Math.sign(m.delta||1)*1.25;rejectedAt=t;setPhase('interference');if(navigator.vibrate)navigator.vibrate([8,18,8])}}
  }
  spring(dt);
  const approach=Math.max(0,Math.min(1,(1.15-g)/1.15));if(!S.done&&!S.inspect){card.rotation.x=THREE.MathUtils.damp(card.rotation.x,mobile?0:-velocity.y*.035,8,dt);card.rotation.y=THREE.MathUtils.damp(card.rotation.y,mobile?velocity.x*.035:velocity.x*.025,8,dt);dest.rotation.z=THREE.MathUtils.damp(dest.rotation.z,S.compatible?0:(approach*.018),6,dt)}
  if(profileOpacity>.01||S.done||S.inspect)setProfileGeometry(Math.max(profileOpacity,S.done?.92:0),profileSpread);
  if(registeredAt){const x=(t-registeredAt)/1000;if(x>.16){core.material.opacity=THREE.MathUtils.lerp(core.material.opacity,1,.2);setPhase('continuing')}const p=THREE.MathUtils.clamp((x-.2)/.58,0,1);pathB.scale[mobile?'y':'x']=Math.max(.001,p);core.scale.setScalar(1+(x<.3?Math.sin(Math.PI*Math.min(1,x/.3))*.22:0));if(x>.82&&S.phase!=='revealed'&&!S.inspect){setPhase('revealed');show(true)}}
  if(rejectedAt&&t-rejectedAt>300&&S.phase!=='rejected'&&!S.inspect){setPhase('rejected');show(false)}
  inspectUpdate(dt);
  if(S.debug)debug.innerHTML=`<div><span>STATE</span><strong>${S.phase.toUpperCase()}</strong></div><div><span>GAP</span><strong>${g.toFixed(3)}</strong></div><div><span>CLAIM</span><strong>${profileName()}</strong></div><div><span>RULE</span><strong>${accepted}</strong></div><div><span>RESIDUAL</span><strong>${residual().toFixed(3)}</strong></div><div><span>COMPATIBLE</span><strong>${String(S.compatible).toUpperCase()}</strong></div>`;
  renderer.render(scene,cam);requestAnimationFrame(loop)}
relayout();requestAnimationFrame(loop);
