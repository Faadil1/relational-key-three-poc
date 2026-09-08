// Editorial mechanism models, not historical or acoustical reconstructions.
export const studyIds = new Set(['metate-teotitlan', 'siku-bolivia']);
export const initialMetate = () => ({ contact: false, position: -1, work: 0 });
export function metateReducer(state, action) {
  if (action.type === 'reset') return initialMetate();
  if (action.type === 'contact') return { ...state, contact: action.value };
  if (action.type !== 'move' && action.type !== 'stroke') return state;
  const requested = action.type === 'stroke' ? (state.position > 0 ? -1 : 1) : action.value;
  if (!Number.isFinite(requested)) return state;
  const position = Math.max(-1, Math.min(1, requested));
  const distance = Math.abs(position - state.position);
  return { ...state, position, work: Math.min(1, state.work + (state.contact ? distance / 12 : 0)) };
}
export const initialSiku = () => ({ matching: false, members: 'both', events: [] });
export function sikuReducer(state, action) {
  if (action.type === 'reset') return initialSiku();
  if (action.type === 'relation') return { ...state, matching: action.value, events: [] };
  if (action.type === 'members' && ['both', 'A', 'B'].includes(action.value)) return { ...state, members: action.value, events: [] };
  if (action.type !== 'step' || state.events.length >= 8) return state;
  const beat = state.events.length;
  const contributors = [];
  if (beat % 2 === 0 && state.members !== 'B') contributors.push('A');
  if (beat % 2 === (state.matching ? 1 : 0) && state.members !== 'A') contributors.push('B');
  return { ...state, events: [...state.events, contributors] };
}
export const sharedPhrase = (state) => state.events.length === 8 && state.events.every((event, i) => event.length === 1 && event[0] === (i % 2 ? 'B' : 'A'));
export function metateStatus(state) {
  const prefix = state.contact ? 'MATCHING' : 'OTHER';
  const amount = Math.round(state.work * 100);
  return `${prefix} · ${state.contact ? (amount ? 'CONTACT / WORK RECORDED' : 'CONTACT READY · move the mano') : 'MANO LIFTED · movement cannot add abrasion'} · receiving trace ${amount}%${amount >= 100 ? ' · CUMULATIVE TRACE FORMED' : ''}.`;
}
export function sikuStatus(state) {
  const prefix = state.matching ? 'MATCHING' : 'OTHER';
  if (!state.events.length) return `${prefix} · READY · advance the sequence; neither member has contributed yet.`;
  const gaps = state.events.filter(event => event.length === 0).length;
  const overlaps = state.events.filter(event => event.length > 1).length;
  return `${prefix} · ${state.events.length}/8 beats · ${gaps} gaps · ${overlaps} overlaps${sharedPhrase(state) ? ' · SHARED PHRASE FORMED' : ' · phrase incomplete'}.`;
}
