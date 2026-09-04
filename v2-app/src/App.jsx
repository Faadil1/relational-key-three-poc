import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnamorphosisScene } from './scenes/AnamorphosisScene.jsx';
import { CouplerScene } from './scenes/CouplerScene.jsx';
import { OmbakScene } from './scenes/OmbakScene.jsx';
import { pilotById, pilots } from './pilots.js';
import { useOmbakAudio } from './useOmbakAudio.js';
import { useReducedMotion } from './useReducedMotion.js';

const INITIAL = {
  anamorphosisOffset: 0.7,
  couplerApproach: 0.18,
  couplerPull: 0,
  ombakBase: 220,
  ombakDifference: 7,
};

export default function App() {
  const [activeId, setActiveId] = useState('anamorphosis-paris');
  const [relationMode, setRelationMode] = useState('other');
  const [anamorphosisOffset, setAnamorphosisOffset] = useState(INITIAL.anamorphosisOffset);
  const [couplerApproach, setCouplerApproach] = useState(INITIAL.couplerApproach);
  const [couplerPull, setCouplerPull] = useState(INITIAL.couplerPull);
  const [ombakBase, setOmbakBase] = useState(INITIAL.ombakBase);
  const [ombakDifference, setOmbakDifference] = useState(INITIAL.ombakDifference);
  const reducedMotion = useReducedMotion();

  const pilot = pilotById[activeId];
  const matching = relationMode === 'matching';
  const effectiveOmbakDifference = matching ? ombakDifference : Math.min(20, ombakDifference + 5);
  const audio = useOmbakAudio(ombakBase, effectiveOmbakDifference);

  useEffect(() => {
    if (activeId !== 'ombak-bali' && audio.playing) audio.stop();
  }, [activeId, audio]);

  const status = useMemo(() => {
    if (activeId === 'anamorphosis-paris') {
      const registered = Math.abs(anamorphosisOffset) <= 0.18;
      return registered
        ? 'MATCHING · curved reflector aligned · procedural field registered in reflection.'
        : 'OTHER · both optical members remain valid · reflection is present but not registered.';
    }
    if (activeId === 'coupler-virginia') {
      const locked = matching && couplerApproach >= 0.78;
      if (locked && couplerPull > 0.05) return 'MATCHING · locked relation · pull transfers through the pair.';
      if (locked) return 'MATCHING · rotary-hook relation locked · load-path test is available.';
      if (couplerApproach >= 0.63) return 'OTHER / CONTACT · contact exists, but no shared lock has registered.';
      return 'IDLE · two independently valid coupler members are separated.';
    }
    if (!audio.playing) {
      return matching
        ? `MATCHING READY · synthetic paired sources differ by ${ombakDifference.toFixed(1)} Hz · audio is user-initiated.`
        : `OTHER READY · synthetic paired sources differ by ${effectiveOmbakDifference.toFixed(1)} Hz · outside the matching study state.`;
    }
    return matching
      ? `MATCHING · synthetic paired sources create a ${ombakDifference.toFixed(1)} Hz beat envelope.`
      : `OTHER · both synthetic sources sound, but the selected pair relation is not the matching envelope (${effectiveOmbakDifference.toFixed(1)} Hz study difference).`;
  }, [
    activeId,
    anamorphosisOffset,
    matching,
    couplerApproach,
    couplerPull,
    audio.playing,
    ombakDifference,
    effectiveOmbakDifference,
  ]);

  const applyRelation = (mode) => {
    setRelationMode(mode);
    if (activeId === 'anamorphosis-paris') {
      setAnamorphosisOffset(mode === 'matching' ? 0 : 0.72);
    } else if (activeId === 'coupler-virginia') {
      setCouplerApproach(1);
      setCouplerPull(0);
    }
  };

  const resetActive = () => {
    setRelationMode('other');
    if (activeId === 'anamorphosis-paris') setAnamorphosisOffset(INITIAL.anamorphosisOffset);
    if (activeId === 'coupler-virginia') {
      setCouplerApproach(INITIAL.couplerApproach);
      setCouplerPull(0);
    }
    if (activeId === 'ombak-bali') {
      audio.stop();
      setOmbakBase(INITIAL.ombakBase);
      setOmbakDifference(INITIAL.ombakDifference);
    }
  };

  return (
    <main className="app-shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">RELATIONAL KEY · V2.1 CONCEPT BUILDS</p>
          <h1>THE RELATIONAL PAIR REMAINS THE PRODUCT.</h1>
          <p className="lede">Archive-derived interaction studies · React + R3F / Three.js · V1 remains frozen.</p>
        </div>
        <div className="baseline" aria-label="Frozen baseline identity">
          <span>V1 GOLDEN BASELINE</span>
          <code>6821cd2</code>
        </div>
      </header>

      <nav className="pilot-tabs" aria-label="V2 pilot families">
        {pilots.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeId ? 'pilot-tab active' : 'pilot-tab'}
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            <span>{item.label}</span>
            <small>{item.className}</small>
          </button>
        ))}
      </nav>

      <section className="pilot-grid" aria-labelledby="pilot-title">
        <div className="scene-column">
          <div className="scene-heading">
            <div>
              <p className="eyebrow">{pilot.className}</p>
              <h2 id="pilot-title">{pilot.label}</h2>
            </div>
            <p className="motion-note">{reducedMotion ? 'Reduced motion active' : 'Motion follows system preference'}</p>
          </div>

          <div className="canvas-wrap" aria-hidden="true">
            <Canvas
              key={activeId}
              frameloop="demand"
              dpr={[1, 1.5]}
              camera={{ position: [0, 0.35, 6.2], fov: 42, near: 0.1, far: 40 }}
              gl={{ antialias: true, alpha: false }}
              onCreated={({ gl }) => gl.setClearColor('#c8c3b8')}
            >
              {activeId === 'anamorphosis-paris' && (
                <AnamorphosisScene
                  offset={anamorphosisOffset}
                  setOffset={setAnamorphosisOffset}
                  reducedMotion={reducedMotion}
                />
              )}
              {activeId === 'coupler-virginia' && (
                <CouplerScene
                  approach={couplerApproach}
                  setApproach={setCouplerApproach}
                  pull={couplerPull}
                  matching={matching}
                  reducedMotion={reducedMotion}
                />
              )}
              {activeId === 'ombak-bali' && (
                <OmbakScene
                  differenceHz={ombakDifference}
                  playing={audio.playing}
                  matching={matching}
                  reducedMotion={reducedMotion}
                />
              )}
            </Canvas>
          </div>

          <div className="status-strip" role="status" aria-live="polite" aria-atomic="true">
            {status}
          </div>
        </div>

        <aside className="controls-column" aria-label={`${pilot.label} controls and evidence`}>
          <section className="control-panel">
            <h3>RELATION TEST</h3>
            <div className="relation-buttons">
              <button
                type="button"
                className={matching ? 'primary active' : 'primary'}
                aria-pressed={matching}
                onClick={() => applyRelation('matching')}
              >
                MATCHING
              </button>
              <button
                type="button"
                className={!matching ? 'secondary active' : 'secondary'}
                aria-pressed={!matching}
                onClick={() => applyRelation('other')}
              >
                OTHER
              </button>
              <button type="button" className="ghost" onClick={resetActive}>RESET</button>
            </div>

            {activeId === 'anamorphosis-paris' && (
              <label className="range-control">
                <span>Reflector relation offset <output>{anamorphosisOffset.toFixed(2)}</output></span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={anamorphosisOffset}
                  onChange={(event) => setAnamorphosisOffset(Number(event.target.value))}
                />
                <small>Drag the cylinder directly or use this keyboard/touch-safe control.</small>
              </label>
            )}

            {activeId === 'coupler-virginia' && (
              <>
                <label className="range-control">
                  <span>Approach <output>{Math.round(couplerApproach * 100)}%</output></span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={couplerApproach}
                    onChange={(event) => setCouplerApproach(Number(event.target.value))}
                  />
                </label>
                <label className="range-control">
                  <span>Load-path pull <output>{Math.round(couplerPull * 100)}%</output></span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={couplerPull}
                    onChange={(event) => setCouplerPull(Number(event.target.value))}
                  />
                </label>
                <div className="micro-actions">
                  <button type="button" onClick={() => setCouplerApproach((value) => Math.min(1, value + 0.2))}>APPROACH +</button>
                  <button type="button" onClick={() => setCouplerPull((value) => Math.min(1, value + 0.25))}>PULL +</button>
                </div>
              </>
            )}

            {activeId === 'ombak-bali' && (
              <>
                <label className="range-control">
                  <span>Synthetic base frequency <output>{ombakBase} Hz</output></span>
                  <input
                    type="range"
                    min="160"
                    max="360"
                    step="1"
                    value={ombakBase}
                    onChange={(event) => setOmbakBase(Number(event.target.value))}
                  />
                </label>
                <label className="range-control">
                  <span>Paired difference study <output>{ombakDifference.toFixed(1)} Hz</output></span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={ombakDifference}
                    onChange={(event) => setOmbakDifference(Number(event.target.value))}
                  />
                  <small>This is a synthetic study control, not a claim of one universal Balinese tuning.</small>
                </label>
                <div className="micro-actions">
                  {!audio.playing ? (
                    <button type="button" onClick={audio.start}>START SYNTHETIC AUDIO</button>
                  ) : (
                    <button type="button" onClick={audio.stop}>STOP AUDIO</button>
                  )}
                </div>
              </>
            )}
          </section>

          <section className="evidence-panel">
            <h3>PAIR CONTRACT</h3>
            <p className="law">{pilot.law}</p>
            <dl>
              <div><dt>MATCHING</dt><dd>{pilot.matching}</dd></div>
              <div><dt>OTHER</dt><dd>{pilot.other}</dd></div>
              <div><dt>MEMORABLE MOMENT</dt><dd>{pilot.memorable}</dd></div>
            </dl>
          </section>

          <details className="truth-panel">
            <summary>ARCHIVE / TRUTH BOUNDARY</summary>
            <p>{pilot.archiveBoundary}</p>
            <p className="small-copy">Concept build only. No V2 family is authorized to replace V1 until TRACE comparison, accessibility and runtime evidence pass.</p>
          </details>
        </aside>
      </section>
    </main>
  );
}
