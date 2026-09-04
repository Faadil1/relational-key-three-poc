import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#scene');
const stage = $('.stage');
const shell = $('.cross-shell');
const phaseEl = $('#phase');
const hint = $('#hint');
const result = $('#result');
const debug = $('#debug');
const residualEl = $('#residual');
const editionBadge = $('#editionBadge');
const runtimeError = $('#runtimeError');
const trigger = $('#explainTrigger');
const panel = $('#explainPanel');
const backdrop = $('#explainBackdrop');
const closeBtn = $('#explainClose');
const titleEl = $('#explainTitle');
const leadEl = $('#explainLead');
const stepsEl = $('#explainSteps');
const advComparison = $('#advancedComparison');
const advResidual = $('#advancedResidual');
const advGeometry = $('#advancedGeometry');

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const IVORY = 0xf3f0e6;
const IVORY_2 = 0xe9e3d8;
const CHARCOAL = 0x262626;
const CORE = 0xe03a23;

const CLAIMS = {
  MATCHING: [-.16, .21, -.06, .29, -.12, .18, -.03],
  OTHER: [.23, -.17, .14, -.05, .26, -.11, .11]
};

const EDITIONS = {
  city: {
    name: 'CITY PASSAGE',
    place: 'GATINEAU',
    field: 'CITY FIELD',
    descriptor: 'directional / fragmented',
    accent: 0x1547a3,
    accentCss: '#1547a3',
    hero: ['The city is not a backdrop.', 'The relationship makes passage visible.'],
    cardClaim: 'CITY CLAIM',
    rule: 'CITY FIELD ACCEPTS MATCHING CLAIM',
    outcome: 'CITY PASSAGE REGISTERED',
    noMatch: 'NO REGISTERED RELATIONSHIP',
    labels: [['RIVIÈRE', .16, .23], ['RAPIBUS', .55, .27], ['DE LA CITÉ', .78, .46], ['GRÉBER', .30, .76]],
    fieldType: 'city',
    path: [[-1.55,-.05],[-1.18,-.05],[-1.02,.02],[-.82,.02],[-.67,-.08],[-.40,-.08],[-.24,.03],[.05,.03],[.20,-.03],[.51,-.03],[.67,.07],[1.55,.07]],
    destPath: [[-1.55,.07],[-1.15,.07],[-.96,-.02],[-.66,-.02],[-.51,.07],[-.14,.07],[.04,-.02],[.38,-.02],[.55,.06],[1.50,.06]],
    explanation: {
      matchingLead: 'The credential carries a city claim. The city field supplies the matching counterpart, so the interrupted path can continue through the civic field.',
      otherLead: 'The credential remains valid, but its current claim does not register with this city field.',
      steps: ['Credential claim','City field','Registration','Passage']
    }
  },
  service: {
    name: 'SERVICE REGISTER',
    place: 'BÉNIN',
    field: 'SERVICE SEQUENCE',
    descriptor: 'sequential / functional',
    accent: 0xc84a2b,
    accentCss: '#c84a2b',
    hero: ['A service can explain itself.', 'The relationship lets the sequence continue.'],
    cardClaim: 'SERVICE CLAIM',
    rule: 'SERVICE SEQUENCE ACCEPTS MATCHING CLAIM',
    outcome: 'SERVICE RELATION REGISTERED',
    noMatch: 'NO REGISTERED RELATIONSHIP',
    labels: [['ACCESS', .14, .27], ['SELECT', .36, .27], ['CONFIRM', .57, .27], ['CONNECT', .79, .27]],
    fieldType: 'service',
    path: [[-1.55,-.10],[-1.18,-.10],[-1.18,.10],[-.88,.10],[-.88,-.02],[-.53,-.02],[-.53,.15],[-.20,.15],[-.20,.02],[.18,.02],[.18,-.11],[.58,-.11],[.58,.06],[1.55,.06]],
    destPath: [[-1.55,.06],[-1.14,.06],[-1.14,-.08],[-.77,-.08],[-.77,.12],[-.37,.12],[-.37,-.02],[.04,-.02],[.04,.12],[.48,.12],[.48,-.05],[1.50,-.05]],
    explanation: {
      matchingLead: 'The credential carries a service claim. The service sequence provides the matching switch state, so the same path can advance through the next functional step.',
      otherLead: 'The credential remains valid, but its current claim cannot complete the service switch required by this sequence.',
      steps: ['Credential claim','Service sequence','Switch register','Connection']
    }
  },
  signal: {
    name: 'SIGNAL PORTRAIT',
    place: 'NIGERIA',
    field: 'INFRASTRUCTURE FIELD',
    descriptor: 'radial / systemic',
    accent: 0x0d6b50,
    accentCss: '#0d6b50',
    hero: ['Infrastructure carries more than signal.', 'The relationship makes connection legible.'],
    cardClaim: 'SIGNAL CLAIM',
    rule: 'RELAY FIELD ACCEPTS MATCHING CLAIM',
    outcome: 'CONNECTION REGISTERED',
    noMatch: 'NO REGISTERED RELATIONSHIP',
    labels: [['EARTH STATION', .17, .29], ['ALIGNMENT', .40, .74], ['RELAY CORE', .54, .28], ['LINK', .80, .72]],
    fieldType: 'signal',
    path: [[-1.55,-.03],[-1.20,-.03],[-1.03,.05],[-.82,.05],[-.66,-.08],[-.42,-.08],[-.28,.03],[-.06,.03],[.12,-.04],[.34,-.04],[.51,.07],[.78,.07],[.95,-.01],[1.55,-.01]],
    destPath: [[-1.55,-.01],[-1.21,-.01],[-1.03,.08],[-.78,.08],[-.60,-.05],[-.36,-.05],[-.18,.05],[.08,.05],[.25,-.04],[.55,-.04],[.72,.07],[1.50,.07]],
    explanation: {
      matchingLead: 'The credential carries a signal claim. The infrastructure field supplies the matching relay profile, so the path can register at the relay core and continue.',
      otherLead: 'The credential remains valid, but its current signal profile does not align with the relay field.',
      steps: ['Credential claim','Infrastructure field','Relay core','Connection']
    }
  }
};

const S = {
  edition: 'city',
  claim: 'matching',
  blind: false,
  phase: 'idle',
  drag: false,
  done: false,
  auto: false,
  debug: false,
  inspect: false,
  compatible: true
};

let renderer, scene, cam, world, card, dest, cardBody, destBody, cardSurface, destSurface;
let cardTex, destTex, pathGroup, destPathGroup, core, profileGroup, fieldGroup;
let layout = {}, dragTarget = new THREE.Vector3(), velocity = new THREE.Vector3();
let registeredAt = 0, rejectedAt = 0, last = performance.now(), profileOpacity = 0;
const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
const dragPlane = new THREE.Plane(new THREE.Vector3(0,0,1),0), hit = new THREE.Vector3(), offset = new THREE.Vector3();

const phaseLabels = {
  idle: 'GRAB THE CREDENTIAL',
  dragging: 'MOVE TOWARD COUNTERPART',
  awareness: 'RELATIONSHIP DETECTED',
  profile: 'FIELD REVEAL',
  compare: 'COMPARING RELATIONSHIP',
  registered: 'REGISTERED',
  continuing: 'PATH CONTINUING',
  revealed: 'RELATIONSHIP EXPLAINED',
  interference: 'RELATIONSHIP DOES NOT REGISTER',
  rejected: 'NO REGISTERED RELATIONSHIP'
};

function edition(){ return EDITIONS[S.edition]; }
function accent(){ return S.blind ? CHARCOAL : edition().accent; }
function setPhase(p){
  S.phase = p;
  phaseEl.textContent = phaseLabels[p] || p.toUpperCase();
  phaseEl.className = 'phase' + (['registered','continuing','revealed'].includes(p) ? ' registered' : '');
}

function roundedShape(w,h,r){
  const x=-w/2,y=-h/2,s=new THREE.Shape();
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
function roundedBody(w,h,d,r,color){
  const g=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.017,bevelThickness:.011,curveSegments:12});
  g.center();
  return new THREE.Mesh(g,new THREE.MeshStandardMaterial({color,roughness:.9,metalness:0}));
}
function surface(w,h,t,z=.061){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false}));
  m.position.z=z; return m;
}
function seeded(seed){
  let t=seed>>>0;
  return()=>{t+=0x6D2B79F5;let r=Math.imul(t^t>>>15,1|t);r^=r+Math.imul(r^r>>>7,61|r);return((r^r>>>14)>>>0)/4294967296};
}
function makeTexture(draw){
  const c=document.createElement('canvas');c.width=1000;c.height=620;draw(c.getContext('2d'));
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer?.capabilities?.getMaxAnisotropy?.()||1;return t;
}
function text(c,v,x,y,s=24,w=700,color='#222'){
  c.fillStyle=color;c.textAlign='left';c.textBaseline='top';c.font=`${w} ${s}px Arial`;c.fillText(v,x,y);
}
function line(c,x1,y1,x2,y2,color,width=2,dash=[]){
  c.save();c.strokeStyle=color;c.lineWidth=width;c.setLineDash(dash);c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.restore();
}
function drawCityField(c,e,a){
  const r=seeded(31);c.strokeStyle=`${a}36`;c.lineWidth=1.3;
  for(let i=0;i<6;i++){c.beginPath();let y=245+i*29;c.moveTo(55,y);for(let x=55;x<=945;x+=85)c.lineTo(x,y+Math.sin((x+i*41)/115)*13);c.stroke()}
  for(let i=0;i<10;i++){const x=105+i*92;c.beginPath();c.moveTo(x,155-r()*35);c.lineTo(x+r()*44-22,485+r()*45);c.stroke()}
  e.labels.forEach(([l,x,y])=>text(c,l,x*1000,y*620,17,700,a));
}
function drawServiceField(c,e,a){
  const y=320, xs=[115,310,500,700,885];
  text(c,'1',110,145,18,800,a);text(c,'2',305,145,18,800,a);text(c,'3',495,145,18,800,a);text(c,'4',695,145,18,800,a);text(c,'5',880,145,18,800,a);
  for(let i=0;i<xs.length;i++){
    c.strokeStyle=`${a}99`;c.fillStyle='#f3f0e6';c.lineWidth=2;c.beginPath();c.arc(xs[i],y,11,0,Math.PI*2);c.fill();c.stroke();
    if(i<xs.length-1) line(c,xs[i]+12,y,xs[i+1]-12,y,`${a}7d`,2);
  }
  line(c,500,180,500,500,`${a}75`,1,[8,8]);
  e.labels.forEach(([l,x,y2])=>text(c,l,x*1000,y2*620,17,700,a));
  text(c,'SWITCH',458,360,16,800,a);text(c,'REGISTER',445,386,16,800,a);
}
function drawSignalField(c,e,a){
  const cx=535,cy=315;c.save();c.strokeStyle=`${a}76`;c.lineWidth=2;
  for(let r=60;r<=235;r+=38){c.beginPath();c.arc(cx,cy,r,Math.PI*1.08,Math.PI*1.92);c.stroke();c.beginPath();c.arc(cx,cy,r,.08*Math.PI,.92*Math.PI);c.stroke()}
  c.restore();
  line(c,cx,cy+18,cx-34,470,`${a}cc`,4);line(c,cx,cy+18,cx+34,470,`${a}cc`,4);line(c,cx-24,430,cx+24,430,`${a}cc`,3);line(c,cx-17,395,cx+17,395,`${a}cc`,3);
  e.labels.forEach(([l,x,y])=>text(c,l,x*1000,y*620,17,700,a));
}
function drawField(c,e,a){
  if(e.fieldType==='city') drawCityField(c,e,a);
  else if(e.fieldType==='service') drawServiceField(c,e,a);
  else drawSignalField(c,e,a);
}
function drawCredentialTexture(){
  const e=edition();const a=S.blind?'#343434':e.accentCss;
  return makeTexture(c=>{
    drawField(c,e,a);
    text(c,'CULTURAL EDITION',55,46,18,700,'#161616');
    text(c,e.field,55,78,15,700,'#767068');
    text(c,e.place,55,118,e.place.length>9?48:61,800,a);
    text(c,e.name,55,184,22,800,'#232323');
    text(c,S.claim==='matching'?'MATCHING CLAIM':'OTHER CLAIM',55,492,20,800,S.claim==='matching'?a:'#6e6861');
    text(c,'MEMBER · RK-CE-017',55,535,15,600,'#777067');
  });
}
function drawDestinationTexture(){
  const e=edition();const a=S.blind?'#343434':e.accentCss;
  return makeTexture(c=>{
    drawField(c,e,a);
    text(c,'COUNTERPART FIELD',55,46,18,700,'#161616');
    text(c,'REGISTRATION RULE',55,80,15,700,'#777067');
    text(c,e.place,55,120,e.place.length>9?45:58,800,a);
    text(c,e.rule,55,204,22,800,a);
    text(c,'PATH CONTINUES ONLY AFTER REGISTRATION',55,532,14,700,'#6f6962');
  });
}
function refreshTextures(){
  cardTex?.dispose();destTex?.dispose();cardTex=drawCredentialTexture();destTex=drawDestinationTexture();
  cardSurface.material.map=cardTex;destSurface.material.map=destTex;cardSurface.material.needsUpdate=true;destSurface.material.needsUpdate=true;
}
function tube(points,r,color,opacity=1){
  const curve=new THREE.CatmullRomCurve3(points.map(([x,y,z=.09])=>new THREE.Vector3(x,y,z)));
  return new THREE.Mesh(new THREE.TubeGeometry(curve,52,r,6,false),new THREE.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false}));
}
function rebuildPaths(){
  while(pathGroup.children.length)pathGroup.remove(pathGroup.children[0]);
  while(destPathGroup.children.length)destPathGroup.remove(destPathGroup.children[0]);
  const e=edition(), col=accent();
  pathGroup.add(tube(e.path,.027,col,1));
  destPathGroup.add(tube(e.destPath,.027,col,.035));
}
function rebuildFieldDecor(){
  while(fieldGroup.children.length)fieldGroup.remove(fieldGroup.children[0]);
  const e=edition(), col=accent();
  if(e.fieldType==='signal'){
    for(let i=0;i<3;i++){
      const ring=new THREE.Mesh(new THREE.RingGeometry(.32+i*.15,.326+i*.15,64),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.18,side:THREE.DoubleSide,depthWrite:false}));
      ring.position.set(0,0,.025+i*.002);fieldGroup.add(ring);
    }
  } else if(e.fieldType==='service'){
    for(let i=-1;i<=1;i++){
      const m=new THREE.Mesh(new THREE.CircleGeometry(.035,18),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.38,depthWrite:false}));
      m.position.set(i*.18,.30,.06);fieldGroup.add(m);
    }
  }
}
function claimProfile(){ return S.claim==='matching'?CLAIMS.MATCHING:CLAIMS.OTHER; }
function residual(){ return claimProfile().reduce((s,v,i)=>s+Math.abs(v-CLAIMS.MATCHING[i]),0)/7; }
function anchors(){ return {a:new THREE.Vector3(card.position.x+1.67,card.position.y+.03,.1),b:new THREE.Vector3(dest.position.x-1.60,dest.position.y+.03,.1)}; }
function gap(){ const {a,b}=anchors(); return a.distanceTo(b); }
function clearProfiles(){ while(profileGroup.children.length)profileGroup.remove(profileGroup.children[0]); }
function profileTube(points,color,opacity){ return tube(points,.009,color,opacity); }
function setProfileGeometry(opacity=.86){
  clearProfiles();
  const e=edition(),A=claimProfile(),B=CLAIMS.MATCHING,{a,b}=anchors(),col=S.compatible?CORE:0x827b73;
  for(let i=0;i<7;i++){
    const t=i/6-.5,pa=a.clone().add(new THREE.Vector3(0,A[i]*.66+t*.025,.02)),pb=b.clone().add(new THREE.Vector3(0,B[i]*.66+t*.025,.02));
    let pts;
    if(e.fieldType==='service'){
      const x1=THREE.MathUtils.lerp(pa.x,pb.x,.38),x2=THREE.MathUtils.lerp(pa.x,pb.x,.62),delta=(A[i]-B[i])*.48;
      pts=[[pa.x,pa.y,pa.z],[x1,pa.y+delta,.11],[x1,pb.y+delta,.11],[x2,pb.y+delta,.11],[x2,pb.y,.1],[pb.x,pb.y,pb.z]];
    } else if(e.fieldType==='signal'){
      const mid=pa.clone().lerp(pb,.5),delta=(A[i]-B[i])*.45;mid.y+=delta;mid.z=.18+Math.abs(delta)*.08;
      const q1=pa.clone().lerp(mid,.52),q2=mid.clone().lerp(pb,.48);q1.y+=.05*Math.sin((i+1)*1.4);q2.y-=.05*Math.sin((i+1)*1.4);
      pts=[[pa.x,pa.y,pa.z],[q1.x,q1.y,q1.z],[mid.x,mid.y,mid.z],[q2.x,q2.y,q2.z],[pb.x,pb.y,pb.z]];
    } else {
      const mid=pa.clone().lerp(pb,.5);mid.y+=(A[i]-B[i])*.52;mid.z=.12;
      pts=[[pa.x,pa.y,pa.z],[mid.x,mid.y,mid.z],[pb.x,pb.y,pb.z]];
    }
    profileGroup.add(profileTube(pts,col,opacity));
  }
}
function updateEditionUI(){
  const e=edition();editionBadge.textContent=`${e.name} · ${e.place}`;
  shell.style.setProperty('--edition-accent',S.blind?'#4e4a45':e.accentCss);
  shell.style.setProperty('--edition-soft',S.blind?'rgba(78,74,69,.12)':`${e.accentCss}20`);
  shell.classList.toggle('blind',S.blind);
  $('#heroTitle').textContent=e.hero[0];$('.intro strong').textContent=e.hero[1];
}
function setLayout(){
  const mobile=innerWidth<720;
  layout=mobile?{start:new THREE.Vector3(-2.63,0,0),dest:new THREE.Vector3(2.46,0,0),snap:new THREE.Vector3(-.83,0,0),camZ:12.1}:{start:new THREE.Vector3(-2.80,0,0),dest:new THREE.Vector3(2.58,0,0),snap:new THREE.Vector3(-.80,0,0),camZ:8.7};
  cam.position.z=layout.camZ;
}
function reset(){
  S.drag=false;S.done=false;S.auto=false;S.inspect=false;S.compatible=S.claim==='matching';registeredAt=0;rejectedAt=0;profileOpacity=0;
  setLayout();card.position.copy(layout.start);dest.position.copy(layout.dest);dragTarget.copy(layout.start);velocity.set(0,0,0);card.rotation.set(0,0,0);dest.rotation.set(0,0,0);
  core.material.opacity=0;result.hidden=true;trigger.hidden=true;hint.classList.remove('hidden');clearProfiles();refreshTextures();rebuildPaths();rebuildFieldDecor();updateEditionUI();setPhase('idle');closePanel(false);
}
function resize(){
  const r=stage.getBoundingClientRect();renderer.setSize(r.width,r.height,false);cam.aspect=r.width/r.height;cam.updateProjectionMatrix();
  const targetZ=innerWidth<720?12.1:8.7;cam.position.z=THREE.MathUtils.lerp(cam.position.z,targetZ,.1);
}
function spring(dt){
  const f=dragTarget.clone().sub(card.position).multiplyScalar(reduced?120:58);velocity.addScaledVector(f,dt);velocity.multiplyScalar(Math.exp(-(reduced?30:12.5)*dt));card.position.addScaledVector(velocity,dt);
}
function ndc(e){ const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(pointer,cam); }
function runAuto(){ reset();S.auto=true;hint.classList.add('hidden'); }
function renderPanel(ok){
  const e=edition();
  titleEl.textContent=ok?'Why this works':'Why it didn’t register';
  leadEl.textContent=ok?e.explanation.matchingLead:e.explanation.otherLead;
  const titles=e.explanation.steps;
  const values=ok?['Matching claim',e.field,'Zero residual',e.outcome]:['Other claim',e.field,'Residual persists',e.noMatch];
  const notes=ok?[
    'The credential carries the relation expected by this edition.',
    `The ${e.descriptor} field supplies the counterpart.`,
    'The profiles register at the same invariant junction.',
    'The interrupted path becomes one continuous path.'
  ]:[
    'The credential carries a different relation profile.',
    `The ${e.descriptor} field still expects its matching counterpart.`,
    'The profiles remain misregistered at the junction.',
    'The credential remains valid; continuation is withheld.'
  ];
  stepsEl.innerHTML=titles.map((x,i)=>`<div class="explain-step"><div class="explain-index">0${i+1}</div><div><span>${x}</span><strong>${values[i]}</strong><small>${notes[i]}</small></div></div>`).join('');
  advComparison.textContent=`${S.claim==='matching'?'MATCHING':'OTHER'} claim × ${e.name}`;
  advResidual.textContent=ok?'Zero':'Persists';
  advGeometry.textContent=ok?`Registered continuation · ${e.descriptor}`:`Interference + recoil · ${e.descriptor}`;
}
function show(ok){
  const e=edition();result.hidden=false;
  result.innerHTML=ok?`<div class="result-kicker">RELATIONSHIP REGISTERED</div><div class="result-title">${e.outcome}</div>`:`<div class="result-kicker">RELATIONSHIP DOES NOT REGISTER</div><div class="result-title small">${e.noMatch}</div>`;
  trigger.textContent=ok?'WHY THIS WORKS':'SEE WHY';trigger.hidden=false;renderPanel(ok);
}
function openPanel(){ if(result.hidden)return;S.inspect=true;backdrop.hidden=false;requestAnimationFrame(()=>{backdrop.classList.add('open');panel.classList.add('open');panel.setAttribute('aria-hidden','false')}); }
function closePanel(delay=true){
  S.inspect=false;backdrop.classList.remove('open');panel.classList.remove('open');panel.setAttribute('aria-hidden','true');
  if(delay)setTimeout(()=>backdrop.hidden=true,320);else backdrop.hidden=true;
}
function setup(){
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
  scene=new THREE.Scene();cam=new THREE.PerspectiveCamera(34,1,.1,60);cam.position.z=8.7;
  scene.add(new THREE.HemisphereLight(0xffffff,0xd5ccbc,2.7));const key=new THREE.DirectionalLight(0xffffff,3.4);key.position.set(-3.5,5.5,6);scene.add(key);
  world=new THREE.Group();scene.add(world);card=new THREE.Group();dest=new THREE.Group();world.add(card,dest);
  cardBody=roundedBody(3.34,2.10,.095,.17,IVORY);destBody=roundedBody(3.20,2.10,.095,.17,IVORY_2);card.add(cardBody);dest.add(destBody);
  cardTex=drawCredentialTexture();destTex=drawDestinationTexture();cardSurface=surface(3.23,1.99,cardTex,.066);destSurface=surface(3.09,1.99,destTex,.066);card.add(cardSurface);dest.add(destSurface);
  pathGroup=new THREE.Group();destPathGroup=new THREE.Group();card.add(pathGroup);dest.add(destPathGroup);
  fieldGroup=new THREE.Group();fieldGroup.position.z=.10;world.add(fieldGroup);
  profileGroup=new THREE.Group();world.add(profileGroup);
  core=new THREE.Mesh(new THREE.CircleGeometry(.18,48),new THREE.MeshBasicMaterial({color:CORE,transparent:true,opacity:0}));core.position.z=.11;world.add(core);
  reset();requestAnimationFrame(loop);
}

canvas.addEventListener('pointerdown',e=>{
  if(S.done)return;ndc(e);if(ray.intersectObject(cardBody).length){S.drag=true;S.auto=false;canvas.setPointerCapture(e.pointerId);ray.ray.intersectPlane(dragPlane,hit);offset.copy(card.position).sub(hit);hint.classList.add('hidden');setPhase('dragging')}
});
canvas.addEventListener('pointermove',e=>{
  if(!S.drag||S.done)return;ndc(e);ray.ray.intersectPlane(dragPlane,hit);hit.add(offset);hit.y=THREE.MathUtils.clamp(hit.y,-.66,.66);hit.x=THREE.MathUtils.clamp(hit.x,layout.start.x-.12,layout.snap.x+.06);dragTarget.copy(hit);
});
canvas.addEventListener('pointerup',e=>{S.drag=false;try{canvas.releasePointerCapture(e.pointerId)}catch{}if(!S.done)setPhase('idle')});
canvas.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!S.done){e.preventDefault();runAuto()}});
$('#reset').onclick=reset;$('#auto').onclick=runAuto;trigger.onclick=openPanel;closeBtn.onclick=()=>closePanel();backdrop.onclick=()=>closePanel();
$('#debugToggle').onclick=e=>{S.debug=!S.debug;debug.hidden=!S.debug;e.currentTarget.setAttribute('aria-pressed',String(S.debug))};
$('#blindToggle').onclick=e=>{S.blind=!S.blind;e.currentTarget.setAttribute('aria-pressed',String(S.blind));e.currentTarget.textContent=S.blind?'EXIT BLIND':'BLIND TEST';reset()};
document.querySelectorAll('[data-edition]').forEach(b=>b.onclick=()=>{S.edition=b.dataset.edition;document.querySelectorAll('[data-edition]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});reset()});
document.querySelectorAll('[data-claim]').forEach(b=>b.onclick=()=>{S.claim=b.dataset.claim;document.querySelectorAll('[data-claim]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',String(on))});reset()});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))closePanel()});

function loop(t){
  try{
    resize();const dt=Math.min(.032,(t-last)/1000||.016);last=t;const g=gap(),engaged=S.drag||S.auto;
    if(S.auto&&!S.done)dragTarget.lerp(layout.snap,.024);
    if(!S.done&&engaged){
      if(g<1.42)setPhase('awareness');
      if(g<=.90){setPhase('profile');profileOpacity=.9}
      if(g<=.36){setPhase('compare');dragTarget.lerp(layout.snap,.12)}
      if(g<=.15){S.done=true;S.auto=false;S.drag=false;if(S.compatible){dragTarget.copy(layout.snap);registeredAt=t;setPhase('registered')}else{const dir=edition().fieldType==='service'?new THREE.Vector3(-.20,.24,0):edition().fieldType==='signal'?new THREE.Vector3(-.24,-.18,0):new THREE.Vector3(-.18,.28,0);dragTarget.copy(layout.snap).add(dir);rejectedAt=t;setPhase('interference')}}
    }
    spring(dt);
    if((engaged&&g<.96)||S.done||S.inspect)setProfileGeometry(profileOpacity||.86);else clearProfiles();
    if(registeredAt){
      const x=(t-registeredAt)/1000;if(x>.12)core.material.opacity=.96;const m=destPathGroup.children[0]?.material;if(m)m.opacity=Math.min(1,Math.max(.035,(x-.16)/.62));if(x>.32)setPhase('continuing');if(x>.84&&result.hidden){setPhase('revealed');show(true)}
    }
    if(rejectedAt&&t-rejectedAt>300&&result.hidden){setPhase('rejected');show(false)}
    const {a,b}=anchors();core.position.copy(a.clone().lerp(b,.5));fieldGroup.position.copy(core.position);fieldGroup.position.z=.025;
    if(S.debug){debug.innerHTML=`<div><span>EDITION</span><b>${edition().name}</b></div><div><span>FIELD</span><b>${edition().field}</b></div><div><span>CLAIM</span><b>${S.claim.toUpperCase()}</b></div><div><span>GAP</span><b>${g.toFixed(3)}</b></div><div><span>RESIDUAL</span><b>${residual().toFixed(3)}</b></div><div><span>BLIND</span><b>${S.blind?'ON':'OFF'}</b></div>`}
    renderer.render(scene,cam);requestAnimationFrame(loop);
  }catch(e){console.error(e);runtimeError.hidden=false;phaseEl.textContent='RUNTIME ERROR'}
}

try{setup()}catch(e){console.error(e);runtimeError.hidden=false;phaseEl.textContent='3D INITIALIZATION ERROR'}
