const q=s=>document.querySelector(s);
const result=q('#result');
const technicalInspect=q('#inspect');
const trigger=q('#explainTrigger');
const panel=q('#explainPanel');
const backdrop=q('#explainBackdrop');
const close=q('#explainClose');
const title=q('#explainTitle');
const lead=q('#explainLead');
const steps=q('#explainSteps');
const advancedComparison=q('#advancedComparison');
const advancedResidual=q('#advancedResidual');
const advancedGeometry=q('#advancedGeometry');
const residualSource=q('#residual');

let currentOutcome=null;

const scenarios={
  success:{
    button:'WHY THIS WORKS',
    title:'Why this works',
    lead:'The credential does not grant access by itself. Its ROAM claim registers with the destination’s ROAM rule, so the interrupted path can continue.',
    steps:[
      ['Member claim','Family Plus','Anchorage Museum credential'],
      ['Reciprocity','ROAM','The membership carries a reciprocal-network claim'],
      ['Destination rule','ROAM accepted','The Walt Disney Family Museum recognizes that network'],
      ['Outcome','Complimentary admission','The relationship registers, so the path continues']
    ],
    comparison:'ROAM claim × ROAM rule',
    residual:'Zero',
    geometry:'Registered continuation'
  },
  failure:{
    button:'SEE WHY',
    title:'Why it didn’t match',
    lead:'The credential remains valid, but this destination cannot form a reciprocal relationship from the claim it currently carries.',
    steps:[
      ['Member claim','Standard','Anchorage Museum credential'],
      ['Reciprocity','ASTC','The membership carries an ASTC claim'],
      ['Destination rule','ROAM accepted','The Walt Disney Family Museum is being tested against ROAM in this prototype'],
      ['Outcome','No reciprocal relationship','The profiles do not register, so the path does not continue']
    ],
    comparison:'ASTC claim × ROAM rule',
    residual:'Persists',
    geometry:'Interference + recoil'
  }
};

function renderPanel(kind){
  const d=scenarios[kind];
  title.textContent=d.title;
  lead.textContent=d.lead;
  steps.innerHTML=d.steps.map((s,i)=>`<div class="explain-step"><div class="explain-index">0${i+1}</div><div><span>${s[0]}</span><strong>${s[1]}</strong><small>${s[2]}</small></div></div>`).join('');
  advancedComparison.textContent=d.comparison;
  advancedResidual.textContent=(residualSource?.textContent||'').includes('ZERO')?'Zero':d.residual;
  advancedGeometry.textContent=d.geometry;
}

function syncOutcome(){
  if(result.hidden){
    trigger.hidden=true;
    return;
  }
  const text=result.textContent||'';
  const kind=text.includes('COMPLIMENTARY ADMISSION')?'success':'failure';
  currentOutcome=kind;
  trigger.textContent=scenarios[kind].button;
  trigger.hidden=false;
  renderPanel(kind);
}

function openPanel(){
  if(!currentOutcome)syncOutcome();
  renderPanel(currentOutcome||'success');
  backdrop.hidden=false;
  requestAnimationFrame(()=>{
    backdrop.classList.add('open');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.classList.add('explain-open');
  });
  if(technicalInspect && technicalInspect.textContent!=='CLOSE INSPECTION') technicalInspect.click();
  setTimeout(()=>close.focus(),180);
}

function closePanel(){
  backdrop.classList.remove('open');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden','true');
  document.body.classList.remove('explain-open');
  if(technicalInspect && technicalInspect.textContent==='CLOSE INSPECTION') technicalInspect.click();
  setTimeout(()=>{backdrop.hidden=true;trigger.focus()},320);
}

trigger.addEventListener('click',openPanel);
close.addEventListener('click',closePanel);
backdrop.addEventListener('click',closePanel);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))closePanel()});

// Keep the hero visually quiet even though V3 continues to compute rich detail underneath.
const observer=new MutationObserver(syncOutcome);
observer.observe(result,{attributes:true,childList:true,subtree:true,attributeFilter:['hidden']});
if(residualSource)observer.observe(residualSource,{attributes:true,childList:true,subtree:true,attributeFilter:['hidden']});

// Reset/switching scenario should close the explanation surface cleanly.
document.querySelectorAll('#reset,[data-scenario]').forEach(el=>el.addEventListener('click',()=>{
  if(panel.classList.contains('open'))closePanel();
  trigger.hidden=true;
  currentOutcome=null;
},{capture:true}));

syncOutcome();
