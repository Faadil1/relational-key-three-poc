const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const experience = $('#experience');
const card = $('#card');
const cardWrap = $('#cardWrap');
const outcome = $('#outcome');
const outcomeLabel = $('#outcomeLabel');
const outcomeValue = $('#outcomeValue');
const resultPlaque = $('#resultPlaque');
const explain = $('#explain');
const run = $('#run');
const reset = $('#reset');
const drawer = $('#drawer');
const backdrop = $('#backdrop');
const closeDrawer = $('#closeDrawer');
const drawerTitle = $('#drawerTitle');

let claim = 'matching';
let view = 'front';
let busy = false;

function setView(next) {
  view = next;
  card.classList.remove('front-view', 'back-view', 'detail-view');
  card.classList.add(`${next}-view`);
  $$('[data-view]').forEach(btn => {
    const active = btn.dataset.view === next;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  cardWrap.style.transform = '';
}

function setResult(type, text) {
  resultPlaque.classList.remove('idle', 'success', 'failure');
  resultPlaque.classList.add(type);
  resultPlaque.innerHTML = `<span class="mini-mark"></span><b>${text}</b>`;
}

function clearState() {
  busy = false;
  experience.classList.remove('registered', 'rejected');
  outcome.hidden = true;
  explain.hidden = true;
  outcomeLabel.textContent = 'RELATIONSHIP REGISTERED';
  outcomeValue.textContent = 'LEGACY PATH CONTINUES';
  setResult('idle', 'AWAITING TEST');
}

function runRelationship() {
  if (busy) return;
  clearState();
  busy = true;
  setView('front');
  run.disabled = true;
  run.textContent = 'COMPARING…';

  if (claim === 'matching') {
    setTimeout(() => experience.classList.add('registered'), 260);
    setTimeout(() => {
      outcome.hidden = false;
      explain.hidden = false;
      setResult('success', 'LEGACY PATH CONTINUES');
      navigator.vibrate?.(14);
      busy = false;
      run.disabled = false;
      run.innerHTML = 'TEST RELATIONSHIP <span>→</span>';
    }, 760);
  } else {
    setTimeout(() => experience.classList.add('rejected'), 220);
    setTimeout(() => {
      outcomeLabel.textContent = 'RELATIONSHIP DOES NOT REGISTER';
      outcomeValue.textContent = 'CREDENTIAL REMAINS VALID';
      outcome.hidden = false;
      explain.hidden = false;
      setResult('failure', 'NO REGISTERED RELATIONSHIP');
      navigator.vibrate?.([8, 18, 8]);
      busy = false;
      run.disabled = false;
      run.innerHTML = 'TEST RELATIONSHIP <span>→</span>';
    }, 620);
  }
}

function openDrawer(mode = 'relationship') {
  if (mode === 'about') drawerTitle.textContent = 'About the Cultural Figure edition';
  else if (mode === 'collection') drawerTitle.textContent = 'Cultural Editions collection';
  else drawerTitle.textContent = claim === 'matching' ? 'Why this relationship works' : 'Why this relationship does not register';
  backdrop.hidden = false;
  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  });
}

function close() {
  backdrop.classList.remove('open');
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => { backdrop.hidden = true; }, 300);
}

$$('[data-view]').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
$$('[data-claim]').forEach(btn => btn.addEventListener('click', () => {
  claim = btn.dataset.claim;
  $$('[data-claim]').forEach(other => {
    const active = other === btn;
    other.classList.toggle('active', active);
    other.setAttribute('aria-pressed', String(active));
  });
  clearState();
}));

run.addEventListener('click', runRelationship);
reset.addEventListener('click', () => { clearState(); setView('front'); });
explain.addEventListener('click', () => openDrawer('relationship'));
$('#aboutBtn').addEventListener('click', () => openDrawer('about'));
$('#collectionBtn').addEventListener('click', () => openDrawer('collection'));
$('#moreBtn').addEventListener('click', () => openDrawer('about'));
closeDrawer.addEventListener('click', close);
backdrop.addEventListener('click', close);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === cardWrap) {
    e.preventDefault();
    runRelationship();
  }
});

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  cardWrap.addEventListener('pointermove', e => {
    if (view !== 'front') return;
    const r = cardWrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardWrap.style.transform = `perspective(1200px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.8).toFixed(2)}deg)`;
  });
  cardWrap.addEventListener('pointerleave', () => { cardWrap.style.transform = ''; });
}

$$('img').forEach(img => {
  img.addEventListener('error', () => {
    const host = img.closest('figure') || img.parentElement;
    host?.classList.add('broken-image');
  });
});

clearState();
