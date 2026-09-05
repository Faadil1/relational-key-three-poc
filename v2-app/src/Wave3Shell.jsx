import { Suspense, useMemo, useState } from 'react';
import { sceneComponents } from './sceneRegistry.js';
import { wave3ById, wave3Families } from './wave3Families.js';
import { useReducedMotion } from './useReducedMotion.js';

export default function Wave3Shell() {
  const launch = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('pilot');
    return requested && wave3ById[requested] ? requested : 'boulle-france';
  }, []);
  const [activeId, setActiveId] = useState(launch);
  const [matching, setMatching] = useState(false);
  const reducedMotion = useReducedMotion();
  const family = wave3ById[activeId];
  const ActiveScene = sceneComponents[activeId];

  const status = activeId === 'boulle-france'
    ? (matching ? family.matching : family.other)
    : activeId === 'khipu-peru'
      ? (matching ? family.matching : family.other)
      : (matching ? family.matching : family.other);

  const sceneProps = activeId === 'boulle-france'
    ? { separated: true, matching, reducedMotion }
    : activeId === 'khipu-peru'
      ? { tension: matching ? 1 : 0.46, matching, reducedMotion }
      : { insertion: matching ? 1 : 0.48, matching, reducedMotion };

  return (
    <main className="app-shell focus-mode">
      <header className="focus-header">
        <div>
          <p className="eyebrow">RELATIONAL KEY · V2.3 · WAVE 003 BOUNDED BUILD</p>
          <h1>{family.label}</h1>
          <p className="focus-intent">{family.memorable}</p>
        </div>
        <div className="focus-meta">
          <span>PAIR LAW</span>
          <strong>{family.law}</strong>
          <a className="focus-action" href="?pilot=anamorphosis-paris">WAVES 001–002 LAB</a>
        </div>
      </header>

      <nav className="pilot-tabs" aria-label="Wave 003 family studies">
        {wave3Families.map((item) => (
          <button key={item.id} type="button" className={item.id === activeId ? 'pilot-tab active' : 'pilot-tab'} aria-pressed={item.id === activeId} onClick={() => { setActiveId(item.id); setMatching(false); }}>
            <span>{item.label}</span><small>{item.className}</small>
          </button>
        ))}
      </nav>

      <section className="pilot-grid" aria-labelledby="pilot-title">
        <div className="scene-column">
          <div className="scene-heading"><div><p className="eyebrow">{family.className}</p><h2 id="pilot-title">{family.label}</h2></div><p className="motion-note">{reducedMotion ? 'Reduced motion active' : 'Motion follows system preference'}</p></div>
          <div className="pair-member-rail" aria-label={`${family.label} relational pair`}>
            <div><small>PAIR MEMBER A</small><strong>{family.pair[0]}</strong></div>
            <div className="pair-relation"><small>RELATION</small><strong>{family.pair[1]}</strong></div>
            <div><small>PAIR MEMBER B</small><strong>{family.pair[2]}</strong></div>
          </div>
          <div className="canvas-wrap" aria-hidden="true">
            <Suspense fallback={<div role="status" aria-live="polite" style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', padding: 24 }}>LOADING WAVE 003 RELATIONAL SCENE · {family.label}</div>}>
              <ActiveScene key={activeId} {...sceneProps} />
            </Suspense>
          </div>
          <div className="status-strip" role="status" aria-live="polite" aria-atomic="true">{status}</div>
        </div>

        <aside className="controls-column" aria-label={`${family.label} controls and evidence`}>
          <section className="control-panel">
            <h3>RELATION TEST</h3>
            <div className="relation-buttons">
              <button type="button" className={matching ? 'primary active' : 'primary'} aria-pressed={matching} onClick={() => setMatching(true)}>MATCHING</button>
              <button type="button" className={!matching ? 'secondary active' : 'secondary'} aria-pressed={!matching} onClick={() => setMatching(false)}>OTHER</button>
              <button type="button" className="ghost" onClick={() => setMatching(false)}>RESET</button>
            </div>
            {activeId === 'boulle-france' && <p className="small-copy">The shared cut stays one relation; MATCHING shows reciprocal inversion while OTHER preserves two valid but non-reciprocal material fields.</p>}
            {activeId === 'khipu-peru' && <p className="small-copy">Only structural tension, attachment and knot position are modeled. No meaning or numeric decoding is inferred.</p>}
            {activeId === 'mate-bombilla-argentina' && <p className="small-copy">MATCHING represents full insertion/filter engagement; OTHER stops before a complete selective passage exists.</p>}
          </section>
          <section className="evidence-panel">
            <h3>PAIR CONTRACT</h3><p className="law">{family.law}</p>
            <dl><div><dt>MATCHING</dt><dd>{family.matching}</dd></div><div><dt>OTHER</dt><dd>{family.other}</dd></div><div><dt>MEMORABLE MOMENT</dt><dd>{family.memorable}</dd></div></dl>
          </section>
          <details className="truth-panel"><summary>ARCHIVE / TRUTH BOUNDARY</summary><p>{family.boundary}</p><p className="small-copy">Wave 003 concept build only. No V2 family replaces V1 until exact runtime, accessibility, human comparison and a separate promotion gate pass.</p></details>
        </aside>
      </section>
    </main>
  );
}
