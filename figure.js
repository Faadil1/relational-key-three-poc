const $=s=>document.querySelector(s);
const experience=$('.experience'),card=$('#card'),cardWrap=$('#cardWrap'),outcome=$('#outcome'),explain=$('#explain');
const drawer=$('#drawer'),backdrop=$('#backdrop'),closeDrawer=$('#closeDrawer');
let claim='matching',view='front',busy=false;

function setView(next){
  view=next;
  card.classList.remove('front-view','back-view','detail-view');
  card.classList.add(`${next}-view`);
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===next));
}

function clearState(){
  busy=false;
  experience.classList.remove('registered','rejected');
  card.classList.remove('registered','registering','rejected');
  outcome.hidden=true;
  explain.hidden=true;
  outcome.innerHTML='<span>RELATIONSHIP REGISTERED</span><strong>LEGACY PATH CONTINUES</strong>';
}

function runRelation(){
  if(busy)return;
  clearState();
  busy=true;
  setView('front');
  if(claim==='matching'){
    card.classList.add('registering');
    setTimeout(()=>{
      experience.classList.add('registered');
      card.classList.add('registered');
      outcome.hidden=false;
      explain.hidden=false;
      busy=false;
      navigator.vibrate?.(14);
    },650);
  }else{
    card.classList.add('rejected');
    experience.classList.add('rejected');
    setTimeout(()=>{
      outcome.innerHTML='<span>RELATIONSHIP DOES NOT REGISTER</span><strong class="shake-note">CREDENTIAL REMAINS VALID</strong>';
      outcome.hidden=false;
      explain.hidden=false;
      busy=false;
      navigator.vibrate?.([8,18,8]);
    },520);
  }
}

function openDrawer(){
  backdrop.hidden=false;
  requestAnimationFrame(()=>{
    backdrop.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
  });
}

function close(){
  backdrop.classList.remove('open');
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
  setTimeout(()=>backdrop.hidden=true,310);
}

document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));
document.querySelectorAll('[data-claim]').forEach(b=>b.onclick=()=>{
  claim=b.dataset.claim;
  document.querySelectorAll('[data-claim]').forEach(x=>x.classList.toggle('active',x===b));
  clearState();
});
$('#run').onclick=runRelation;
$('#reset').onclick=()=>{clearState();setView('front')};
explain.onclick=openDrawer;
closeDrawer.onclick=close;
backdrop.onclick=close;
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&drawer.classList.contains('open'))close();
  if((e.key==='Enter'||e.key===' ')&&document.activeElement===cardWrap){e.preventDefault();runRelation();}
});

cardWrap.addEventListener('pointermove',e=>{
  if(view!=='front'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const r=cardWrap.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
});
cardWrap.addEventListener('pointerleave',()=>{if(view==='front')card.style.transform=''});
