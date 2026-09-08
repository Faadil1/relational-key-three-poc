import { cityReady } from './familyModels/cityPair.js';
export const citySource = 'https://www.gatineau.ca/portail/default.aspx?p=publications_cartes_statistiques_donnees_ouvertes%2Fcartes%2Fcarte_interactive_secteurs';
export function CityCardControls({state,dispatch}) {
 return <div className="city-card-controls">
  <p className="city-instruction">Deux cartes. Un passage à découvrir.</p>
  <p className="small-copy">Glissez la carte B vers A. Quand les raccords se présentent, transmettez le passage.</p>
  <div className="micro-actions"><button onClick={()=>dispatch({type:'move',gap:0})}>RAPPROCHER LES CARTES</button><button disabled={!cityReady(state) || state.transferred} onClick={()=>dispatch({type:'send'})}>FAIRE PASSER</button></div>
  <div className="micro-actions"><button onClick={()=>dispatch({type:'move',gap:.85})}>ÉLOIGNER</button><button aria-pressed={!!state.offset} onClick={()=>dispatch({type:'offset',value:!state.offset})}>AUTRE LIAISON</button></div>
  <div className="micro-actions"><button aria-pressed={state.backA} onClick={()=>dispatch({type:'flip',member:'A'})}>{state.backA?'RECTO A':'VERSO A'}</button><button aria-pressed={state.backB} onClick={()=>dispatch({type:'flip',member:'B'})}>{state.backB?'RECTO B':'VERSO B'}</button><button onClick={()=>dispatch({type:'reset'})}>RECOMMENCER</button></div>
  {(state.backA || state.backB) && <div className="city-source-note"><h3>AU DOS DE LA CARTE</h3><p>Gatineau s’étend de part et d’autre de la rivière Gatineau. Les secteurs cités sont documentés par la Ville ; le dessin du passage est une composition originale.</p><a href={citySource} target="_blank" rel="noreferrer">Consulter la carte municipale des secteurs ↗</a><p>Édition numérique de recherche · ne constitue pas un titre de transport, un trajet réel ou une reproduction d’archive.</p></div>}
  <details><summary>Commande précise / clavier</summary><label className="range-control" htmlFor="city-gap"><span>Écart entre les cartes</span><input id="city-gap" type="range" min="0" max="1" step=".05" value={state.gap} onChange={e=>dispatch({type:'move',gap:Number(e.target.value)})}/></label></details>
 </div>;
}
