const stage = document.getElementById('stage');
const run = document.getElementById('run');
const reset = document.getElementById('reset');
const result = document.getElementById('result');
const relationStatus = document.getElementById('relationStatus');
const explain = document.getElementById('explain');
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('backdrop');
const closeDrawer = document.getElementById('closeDrawer');
const sourceButtons = [document.getElementById('aboutBtn'), document.getElementById('sourcesBtn')];
const claimButtons = [...document.querySelectorAll('[data-claim]')];
const steps = [...document.querySelectorAll('.sequence li')];

let claim = 'matching';
let running = false;
let timers = [];

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clearTimers(){
  timers.forEach(clearTimeout);
  timers = [];
}

function pulseHaptic(pattern){
  if ('vibrate' in navigator) {
    try { navigator.vibrate(pattern); } catch (_) {}
  }
}

function setActiveStep(index){
  steps.forEach((step, i) => step.classList.toggle('active', i <= index));
}

function setIdle(){
  clearTimers();
  running = false;
  run.disabled = false;
  stage.classList.remove('registered', 'rejected');
  relationStatus.textContent = 'PRESSURE / ALIGNMENT DORMANT';
  result.className = 'result idle';
  result.innerHTML = '<span class="result-mark"></span><div><small>RESULT</small><b>AWAITING REGISTRATION</b></div>';
  explain.hidden = true;
  steps.forEach(step => step.classList.remove('active'));
}

function finishSuccess(){
  stage.classList.add('registered');
  relationStatus.textContent = 'PRESSURE RELEASED · RELATION REGISTERED';
  result.className = 'result success';
  result.innerHTML = '<span class="result-mark"></span><div><small>RESULT</small><b>MEAL MEMORY REVEALED</b></div>';
  explain.hidden = false;
  pulseHaptic(14);
  running = false;
  run.disabled = false;
}

function finishFailure(){
  stage.classList.add('rejected');
  relationStatus.textContent = 'NO COMPATIBLE PRESSURE PATH';
  result.className = 'result failure';
  result.innerHTML = '<span class="result-mark"></span><div><small>RESULT</small><b>RELATIONSHIP NOT REGISTERED</b></div>';
  explain.hidden = false;
  pulseHaptic([8,18,8]);
  running = false;
  run.disabled = false;
}

function runSequence(){
  if (running) return;
  setIdle();
  running = true;
  run.disabled = true;

  if (reduced) {
    steps.forEach(step => step.classList.add('active'));
    claim === 'matching' ? finishSuccess() : finishFailure();
    return;
  }

  const labels = [
    'PRESSURE DETECTED',
    'NATURAL ALIGNMENT SEARCH',
    claim === 'matching' ? 'RELATIONSHIP REGISTERING' : 'RESIDUAL MISMATCH DETECTED',
    claim === 'matching' ? 'PRESSURE RELEASING' : 'PRESSURE REMAINS',
    claim === 'matching' ? 'BAMBOO FIELD UNFOLDING' : 'OBJECT REMAINS SEALED',
    claim === 'matching' ? 'MEAL MEMORY REVEALED' : 'NO REVEAL'
  ];

  const cadence = [0, 380, 760, 1160, 1500, 1840];
  cadence.forEach((delay, i) => {
    timers.push(setTimeout(() => {
      setActiveStep(i);
      relationStatus.textContent = labels[i];
      if (claim === 'other' && i === 2) {
        stage.classList.add('rejected');
      }
    }, delay));
  });

  timers.push(setTimeout(() => {
    claim === 'matching' ? finishSuccess() : finishFailure();
  }, claim === 'matching' ? 2220 : 1260));
}

claimButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (running) return;
    claim = btn.dataset.claim;
    claimButtons.forEach(item => {
      const active = item === btn;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    setIdle();
  });
});

run.addEventListener('click', runSequence);
reset.addEventListener('click', setIdle);

function openDrawer(){
  backdrop.hidden = false;
  drawer.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    drawer.classList.add('open');
  });
}

function closePanel(){
  backdrop.classList.remove('open');
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => { backdrop.hidden = true; }, 320);
}

explain.addEventListener('click', openDrawer);
sourceButtons.forEach(btn => btn?.addEventListener('click', openDrawer));
closeDrawer.addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) closePanel();
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === run) runSequence();
});

// Fail gracefully if an external Commons image cannot load.
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.parentElement?.classList.add('image-fallback');
    img.style.visibility = 'hidden';
  });
});

setIdle();
