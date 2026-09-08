import { sharedPhrase } from './familyModels/relationalStudies.js';

export function RelationalStudyControls({ id, metate, dispatchMetate, siku, dispatchSiku }) {
  if (id === 'metate-teotitlan') return <div className="study-controls">
    <p className="small-copy">MATCHING seats the mano. OTHER lifts it. Move it to work the receiving surface; lifting preserves the trace already made.</p>
    <label className="range-control" htmlFor="mano-position"><span>Mano stroke position <output>{metate.position.toFixed(2)}</output></span>
      <input id="mano-position" type="range" min="-1" max="1" step="0.1" value={metate.position} onChange={event => dispatchMetate({ type: 'move', value: Number(event.target.value) })} />
    </label>
    <div className="micro-actions"><button type="button" onClick={() => dispatchMetate({ type: 'stroke' })}>MAKE ONE STROKE</button></div>
    <label className="study-progress" htmlFor="grind-work">Receiving trace · {Math.round(metate.work * 100)}%<progress id="grind-work" max="1" value={metate.work} /></label>
    <p className="small-copy">Six full courses fill this editorial trace. This scale is a demonstration, not a measure of historical grinding time.</p>
  </div>;
  if (id === 'siku-bolivia') return <div className="study-controls">
    <p className="small-copy">Advance one beat at a time. IRA supplies A; ARCA supplies B. Remove either contribution to see the missing places. OTHER aligns their entries instead of alternating them.</p>
    <fieldset className="study-members"><legend>Contributing members</legend>{[['both','A + B'],['A','A only'],['B','B only']].map(([value,label]) => <label key={value}><input type="radio" name="siku-members" value={value} checked={siku.members === value} onChange={() => dispatchSiku({ type: 'members', value })} />{label}</label>)}</fieldset>
    <div className="micro-actions"><button type="button" disabled={siku.events.length === 8} onClick={() => dispatchSiku({ type: 'step' })}>NEXT BEAT</button><button type="button" onClick={() => dispatchSiku({ type: 'relation', value: siku.matching })}>RESTART PHRASE</button></div>
    <ol className="phrase-score" aria-label="Contributions to the shared phrase">{Array.from({ length: 8 }, (_, i) => <li key={i} data-contribution={siku.events[i]?.join('') || (i < siku.events.length ? 'gap' : 'pending')}><small>{i + 1}</small><strong>{siku.events[i]?.join('+') || (i < siku.events.length ? '—' : '·')}</strong><span className="sr-only">{i >= siku.events.length ? 'pending' : !siku.events[i].length ? 'gap' : siku.events[i].length > 1 ? 'overlap' : 'contribution'}</span></li>)}</ol>
    <p className="small-copy">{sharedPhrase(siku) ? 'Both incomplete sets have contributed to one continuous phrase.' : 'A phrase needs the alternating contributions of both members.'} Silent editorial sequence; no traditional melody or tuning is claimed.</p>
  </div>;
  return null;
}
