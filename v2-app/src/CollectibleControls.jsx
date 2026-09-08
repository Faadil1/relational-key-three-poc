import { collectibleCopy } from './collectibleCopy.js';
export function CollectibleControls({id,backs,setBacks,textile,dispatchTextile}) {
 const copy=collectibleCopy[id];if(!copy)return null;
 return <div className="collectible-controls">
  <p className="collectible-identities">A · {copy.titles[0]} <span>B · {copy.titles[1]}</span></p>
  {id==='textile-bonwire' && <div className="study-controls"><p>Alignez les lisières avec MATCHING, puis assemblez les bandes déjà tissées.</p><button type="button" disabled={!textile.aligned||textile.stitches===7} onClick={()=>dispatchTextile({type:'stitch'})}>AJOUTER UN POINT</button><p><progress aria-label="Points de couture" max="7" value={textile.stitches}/> {textile.stitches}/7 points</p></div>}
  <div className="micro-actions">{['A','B'].map(member=><button key={member} type="button" aria-pressed={backs[member]} onClick={()=>setBacks(value=>({...value,[member]:!value[member]}))}>{backs[member]?'RECTO':'VERSO'} {member}</button>)}</div>
  {(backs.A||backs.B)&&<section className="collectible-source" aria-label="Source documentaire"><h4>{copy.backTitle}</h4><p>{copy.lines.join(' ')}</p><p><a href={copy.url} target="_blank" rel="noreferrer">{copy.source}</a></p>{copy.secondary&&<p><a href={copy.secondary.url} target="_blank" rel="noreferrer">{copy.secondary.label}</a></p>}<p>{copy.boundary}</p></section>}
 </div>;
}
