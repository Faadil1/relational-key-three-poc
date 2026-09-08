export const collectibleIds = new Set(['metate-teotitlan', 'siku-bolivia', 'textile-bonwire', 'boulle-france']);
export const initialTextile = () => ({ aligned: false, stitches: 0 });
export function textileReducer(state, action) {
  if (action.type === 'reset') return initialTextile();
  if (action.type === 'align') return { aligned: action.value, stitches: 0 };
  if (action.type === 'stitch' && state.aligned) return { ...state, stitches: Math.min(7, state.stitches + 1) };
  return state;
}
export function textileStatus(state) {
  return `${state.aligned ? 'MATCHING' : 'OTHER'} · ${state.aligned ? 'SELVEDGES ALIGNED' : 'EDGES OFFSET · no new stitch'} · ${state.stitches}/7 stitches${state.stitches === 7 ? ' · TEXTILE CONTINUATION FORMED' : ' · join incomplete'}.`;
}
// Original shared cut. Both surfaces sample the SAME coordinates, never a mirror.
export function cutBoundary(y, variant = 0) {
  return .5 + .23 * Math.sin(y * Math.PI * 3 + variant * .9) + .055 * Math.sin(y * Math.PI * 7);
}
export function cutMaterial(x, y, member, matching = true) {
  const field = x < cutBoundary(y, member === 'B' && !matching ? 1 : 0);
  return member === 'A' ? Number(field) : Number(!field);
}
