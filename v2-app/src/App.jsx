import { Suspense, useEffect, useMemo, useState } from 'react';
import { pilotById, pilots } from './pilots.js';
import { sceneComponents } from './sceneRegistry.js';
import { useOmbakAudio } from './useOmbakAudio.js';
import { useReducedMotion } from './useReducedMotion.js';

const INITIAL = {
  anamorphosisOffset: 0.7,
  couplerApproach: 0.18,
  couplerPull: 0,
  ombakBase: 220,
  ombakDifference: 7,
  kentoOffset: 0.28,
  kentoPressed: false,
  stereoDisparity: 0.72,
  signalAlignment: 0.34,
  astrolabeAngle: 22,
  astrolabePlateMode: 'other',
  funicularPositionA: 0,
  musicBoxEngaged: false,
  musicBoxAngle: 0,
  musicBoxPattern: 'A',
};

export default function App() {
  const launch = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedPilot = params.get('pilot');
    return {
      focusMode: params.get('focus') === '1',
      activeId: requestedPilot && pilotById[requestedPilot] ? requestedPilot : 'anamorphosis-paris',
    };
  }, []);

  const [activeId, setActiveId] = useState(launch.activeId);
  const [relationMode, setRelationMode] = useState('other');
  const [anamorphosisOffset, setAnamorphosisOffset] = useState(INITIAL.anamorphosisOffset);
  const [couplerApproach, setCouplerApproach] = useState(INITIAL.couplerApproach);
  const [couplerPull, setCouplerPull] = useState(INITIAL.couplerPull);
  const [ombakBase, setOmbakBase] = useState(INITIAL.ombakBase);
  const [ombakDifference, setOmbakDifference] = useState(INITIAL.ombakDifference);
  const [kentoOffset, setKentoOffset] = useState(INITIAL.kentoOffset);
  const [kentoPressed, setKentoPressed] = useState(INITIAL.kentoPressed);
  const [stereoDisparity, setStereoDisparity] = useState(INITIAL.stereoDisparity);
  const [signalAlignment, setSignalAlignment] = useState(INITIAL.signalAlignment);
  const [astrolabeAngle, setAstrolabeAngle] = useState(INITIAL.astrolabeAngle);
  const [astrolabePlateMode, setAstrolabePlateMode] = useState(INITIAL.astrolabePlateMode);
  const [funicularPositionA, setFunicularPositionA] = useState(INITIAL.funicularPositionA);
  const [musicBoxEngaged, setMusicBoxEngaged] = useState(INITIAL.musicBoxEngaged);
  const [musicBoxAngle, setMusicBoxAngle] = useState(INITIAL.musicBoxAngle);
  const [musicBoxPattern, setMusicBoxPattern] = useState(INITIAL.musicBoxPattern);
  const reducedMotion = useReducedMotion();

  const focusMode = launch.focusMode;
  const pilot = pilotById[activeId];
  const ActiveScene = sceneComponents[activeId];
  const matching = relationMode === 'matching';
  const effectiveOmbakDifference = matching ? ombakDifference : Math.min(20, ombakDifference + 5);
  const audio = useOmbakAudio(ombakBase, effectiveOmbakDifference);
  const focusHref = `?focus=1&pilot=${encodeURIComponent(activeId)}`;
  const labHref = `?pilot=${encodeURIComponent(activeId)}`;

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
    if (activeId === 'ombak-bali') {
      if (!audio.playing) {
        return matching
          ? `MATCHING READY · synthetic paired sources differ by ${ombakDifference.toFixed(1)} Hz · audio is user-initiated.`
          : `OTHER READY · synthetic paired sources differ by ${effectiveOmbakDifference.toFixed(1)} Hz · outside the matching study state.`;
      }
      return matching
        ? `MATCHING · synthetic paired sources create a ${ombakDifference.toFixed(1)} Hz beat envelope.`
        : `OTHER · both synthetic sources sound, but the selected pair relation is not the matching envelope (${effectiveOmbakDifference.toFixed(1)} Hz study difference).`;
    }
    if (activeId === 'kento-japan') {
      const registered = matching && Math.abs(kentoOffset) <= 0.08;
      if (!kentoPressed) {
        return registered
          ? 'MATCHING READY · woodblock kentō and receiving sheet are registered · press to transfer.'
          : 'OTHER · both cards remain valid · kentō registration is offset before transfer.';
      }
      return registered
        ? 'MATCHING · kentō seats agree · pressure transfers a registered layer to the receiving sheet.'
        : 'OTHER · both cards remain valid · pressure transfers an offset layer and registration fails.';
    }
    if (activeId === 'stereoscopy-uk') {
      const fused = matching && stereoDisparity <= 0.24;
      return fused
        ? 'MATCHING · two flat view cards preserve controlled disparity · a stable depth relation emerges between them.'
        : 'OTHER · both view cards remain valid · disparity refuses the intended fusion.';
    }
    if (activeId === 'signal-nigeria') {
      const aligned = matching && signalAlignment >= 0.82;
      return aligned
        ? 'MATCHING · Lanlate uplink orientation establishes a continuous relay path · the receiving card responds.'
        : 'OTHER · both signal cards remain valid · the relay path breaks before the receiving response registers.';
    }
    if (activeId === 'astrolabe-isfahan') {
      return astrolabePlateMode === 'local'
        ? `LOCAL HORIZON ACTIVE · rete rotated to ${astrolabeAngle}° · structural celestial relation is readable.`
        : `VALID OTHER PLATE · rete rotated to ${astrolabeAngle}° · a different horizon relation remains valid.`;
    }
    if (activeId === 'funicular-valparaiso') {
      const p = funicularPositionA;
      if (Math.abs(p - 0.5) < 0.045) return 'CROSSING · equal height · inverse positional relation remains active.';
      if (p <= 0.035) return 'A LOW / B HIGH · opposed terminal positions · shared relation at rest.';
      if (p >= 0.965) return 'A HIGH / B LOW · heights exchanged · shared relation remains active.';
      return `OPPOSED MOTION · Car A ${Math.round(p * 100)}% · Car B ${Math.round((1 - p) * 100)}% · exact inverse response.`;
    }
    if (activeId === 'music-box-sainte-croix') {
      if (!musicBoxEngaged) return `SEPARATE · editorial Cylinder ${musicBoxPattern} and tuned-comb member are both visible · no contact.`;
      return `ENGAGED · Cylinder ${musicBoxPattern} at ${Math.round(musicBoxAngle)}° · pin geometry is decoded through visible comb-tooth contact events.`;
    }
    return 'RELATION STATE UNAVAILABLE.';
  }, [
    activeId,
    anamorphosisOffset,
    matching,
    couplerApproach,
    couplerPull,
    audio.playing,
    ombakDifference,
    effectiveOmbakDifference,
    kentoOffset,
    kentoPressed,
    stereoDisparity,
    signalAlignment,
    astrolabeAngle,
    astrolabePlateMode,
    funicularPositionA,
    musicBoxEngaged,
    musicBoxAngle,
    musicBoxPattern,
  ]);

  const applyRelation = (mode) => {
    const nextMatching = mode === 'matching';
    setRelationMode(mode);
    if (activeId === 'anamorphosis-paris') {
      setAnamorphosisOffset(nextMatching ? 0 : 0.72);
    } else if (activeId === 'coupler-virginia') {
      setCouplerApproach(1);
      setCouplerPull(0);
    } else if (activeId === 'kento-japan') {
      setKentoOffset(nextMatching ? 0 : 0.3);
      setKentoPressed(false);
    } else if (activeId === 'stereoscopy-uk') {
      setStereoDisparity(nextMatching ? 0.16 : 0.72);
    } else if (activeId === 'signal-nigeria') {
      setSignalAlignment(nextMatching ? 1 : 0.34);
    } else if (activeId === 'astrolabe-isfahan') {
      setAstrolabePlateMode(nextMatching ? 'local' : 'other');
      setAstrolabeAngle(nextMatching ? 42 : 22);
    } else if (activeId === 'music-box-sainte-croix') {
      setMusicBoxEngaged(true);
      setMusicBoxPattern(nextMatching ? 'A' : 'B');
      setMusicBoxAngle(nextMatching ? 52 : 68);
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
    if (activeId === 'kento-japan') {
      setKentoOffset(INITIAL.kentoOffset);
      setKentoPressed(false);
    }
    if (activeId === 'stereoscopy-uk') setStereoDisparity(INITIAL.stereoDisparity);
    if (activeId === 'signal-nigeria') setSignalAlignment(INITIAL.signalAlignment);
    if (activeId === 'astrolabe-isfahan') {
      setAstrolabeAngle(INITIAL.astrolabeAngle);
      setAstrolabePlateMode(INITIAL.astrolabePlateMode);
    }
    if (activeId === 'funicular-valparaiso') setFunicularPositionA(INITIAL.funicularPositionA);
    if (activeId === 'music-box-sainte-croix') {
      setMusicBoxEngaged(INITIAL.musicBoxEngaged);
      setMusicBoxAngle(INITIAL.musicBoxAngle);
      setMusicBoxPattern(INITIAL.musicBoxPattern);
    }
  };

  let activeSceneProps = {};
  if (activeId === 'anamorphosis-paris') {
    activeSceneProps = { offset: anamorphosisOffset, setOffset: setAnamorphosisOffset, reducedMotion };
  } else if (activeId === 'coupler-virginia') {
    activeSceneProps = { approach: couplerApproach, setApproach: setCouplerApproach, pull: couplerPull, matching, reducedMotion };
  } else if (activeId === 'ombak-bali') {
    activeSceneProps = { differenceHz: ombakDifference, playing: audio.playing, matching, reducedMotion };
  } else if (activeId === 'kento-japan') {
    activeSceneProps = { offset: kentoOffset, pressed: kentoPressed, matching, reducedMotion };
  } else if (activeId === 'stereoscopy-uk') {
    activeSceneProps = { disparity: stereoDisparity, matching, reducedMotion };
  } else if (activeId === 'signal-nigeria') {
    activeSceneProps = { alignment: signalAlignment, matching, reducedMotion };
  } else if (activeId === 'astrolabe-isfahan') {
    activeSceneProps = { angle: astrolabeAngle, setAngle: setAstrolabeAngle, plateMode: astrolabePlateMode, reducedMotion };
  } else if (activeId === 'funicular-valparaiso') {
    activeSceneProps = { positionA: funicularPositionA, setPositionA: setFunicularPositionA, reducedMotion };
  } else if (activeId === 'music-box-sainte-croix') {
    activeSceneProps = { engaged: musicBoxEngaged, angle: musicBoxAngle, setAngle: setMusicBoxAngle, pattern: musicBoxPattern, reducedMotion };
  }

  const selectFamily = (id) => {
    if (activeId === 'ombak-bali' && audio.playing) audio.stop();
    setActiveId(id);
    setRelationMode('other');
  };

  const relationLabels = activeId === 'astrolabe-isfahan'
    ? ['LOCAL PLATE', 'OTHER PLATE']
    : activeId === 'music-box-sainte-croix'
      ? ['CYLINDER A', 'OTHER CYLINDER']
      : ['MATCHING', 'OTHER'];
  const evidenceLabels = activeId === 'funicular-valparaiso'
    ? ['PRIMARY RELATION', 'ALTERNATE VALID']
    : activeId === 'astrolabe-isfahan'
      ? ['LOCAL PLATE', 'OTHER PLATE']
      : activeId === 'music-box-sainte-croix'
        ? ['CYLINDER A', 'OTHER CYLINDER']
        : ['MATCHING', 'OTHER'];

  return (
    <main className={focusMode ? 'app-shell focus-mode' : 'app-shell'}>
      {focusMode ? (
        <header className="focus-header">
          <div>
            <p className="eyebrow">RELATIONAL KEY · FOCUS EXPERIENCE · {pilot.className}</p>
            <h1>{pilot.label}</h1>
            <p className="focus-intent">{pilot.memorable}</p>
          </div>
          <div className="focus-meta">
            <span>PAIR LAW</span>
            <strong>{pilot.law}</strong>
            <a className="focus-action" href={labHref}>LAB / EVIDENCE VIEW</a>
          </div>
        </header>
      ) : (
        <header className="masthead">
          <div>
            <p className="eyebrow">RELATIONAL KEY · V2.3 BOUNDED EXPANSION · WAVES 001–002</p>
            <h1>THE RELATIONAL PAIR REMAINS THE PRODUCT.</h1>
            <p className="lede">Two base cards stay visible and necessary · archive-derived interaction studies · React + R3F / Three.js · V1 remains frozen.</p>
          </div>
          <div className="baseline" aria-label="Frozen baseline identity">
            <span>V1 GOLDEN BASELINE</span>
            <code>6821cd2</code>
            <a className="focus-action" href={focusHref}>OPEN FOCUS EXPERIENCE</a>
          </div>
        </header>
      )}

      {!focusMode && (
        <nav className="pilot-tabs" aria-label="V2 family studies">
          {pilots.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === activeId ? 'pilot-tab active' : 'pilot-tab'}
              aria-pressed={item.id === activeId}
              onClick={() => selectFamily(item.id)}
            >
              <span>{item.label}</span>
              <small>{item.className}</small>
            </button>
          ))}
        </nav>
      )}

      <section className="pilot-grid" aria-labelledby="pilot-title">
        <div className="scene-column">
          <div className="scene-heading">
            <div>
              <p className="eyebrow">{pilot.className}</p>
              <h2 id="pilot-title">{pilot.label}</h2>
            </div>
            <p className="motion-note">{reducedMotion ? 'Reduced motion active' : 'Motion follows system preference'}</p>
          </div>

          {focusMode && (
            <div className="pair-member-rail" aria-label={`${pilot.label} relational pair`}>
              <div><small>PAIR MEMBER A</small><strong>{pilot.pairMembers.a}</strong></div>
              <div className="pair-relation"><small>RELATION</small><strong>{pilot.pairMembers.relation}</strong></div>
              <div><small>PAIR MEMBER B</small><strong>{pilot.pairMembers.b}</strong></div>
            </div>
          )}

          <div className="canvas-wrap" aria-hidden="true">
            <Suspense fallback={<div role="status" aria-live="polite" style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', padding: 24 }}>LOADING RELATIONAL SCENE · {pilot.label}</div>}>
              <ActiveScene key={activeId} {...activeSceneProps} />
            </Suspense>
          </div>

          <div className="status-strip" role="status" aria-live="polite" aria-atomic="true">{status}</div>
        </div>

        <aside className="controls-column" aria-label={`${pilot.label} controls and evidence`}>
          <section className="control-panel">
            <h3>{activeId === 'funicular-valparaiso' ? 'RELATION CONTROL' : 'RELATION TEST'}</h3>

            {activeId === 'funicular-valparaiso' ? (
              <div className="relation-buttons">
                <button type="button" className="primary" onClick={() => setFunicularPositionA((value) => 1 - value)}>SWAP START</button>
                <button type="button" className="ghost" onClick={resetActive}>RESET</button>
              </div>
            ) : (
              <div className="relation-buttons">
                <button type="button" className={matching ? 'primary active' : 'primary'} aria-pressed={matching} onClick={() => applyRelation('matching')}>{relationLabels[0]}</button>
                <button type="button" className={!matching ? 'secondary active' : 'secondary'} aria-pressed={!matching} onClick={() => applyRelation('other')}>{relationLabels[1]}</button>
                <button type="button" className="ghost" onClick={resetActive}>RESET</button>
              </div>
            )}

            {activeId === 'anamorphosis-paris' && (
              <label className="range-control">
                <span>Reflector relation offset <output>{anamorphosisOffset.toFixed(2)}</output></span>
                <input type="range" min="-1" max="1" step="0.01" value={anamorphosisOffset} onChange={(event) => setAnamorphosisOffset(Number(event.target.value))} />
                <small>Drag the cylinder directly or use this keyboard/touch-safe control.</small>
              </label>
            )}

            {activeId === 'coupler-virginia' && (
              <>
                <label className="range-control"><span>Approach <output>{Math.round(couplerApproach * 100)}%</output></span><input type="range" min="0" max="1" step="0.01" value={couplerApproach} onChange={(event) => setCouplerApproach(Number(event.target.value))} /></label>
                <label className="range-control"><span>Load-path pull <output>{Math.round(couplerPull * 100)}%</output></span><input type="range" min="0" max="1" step="0.01" value={couplerPull} onChange={(event) => setCouplerPull(Number(event.target.value))} /></label>
                <div className="micro-actions"><button type="button" onClick={() => setCouplerApproach((value) => Math.min(1, value + 0.2))}>APPROACH +</button><button type="button" onClick={() => setCouplerPull((value) => Math.min(1, value + 0.25))}>PULL +</button></div>
              </>
            )}

            {activeId === 'ombak-bali' && (
              <>
                <label className="range-control"><span>Synthetic base frequency <output>{ombakBase} Hz</output></span><input type="range" min="160" max="360" step="1" value={ombakBase} onChange={(event) => setOmbakBase(Number(event.target.value))} /></label>
                <label className="range-control"><span>Paired difference study <output>{ombakDifference.toFixed(1)} Hz</output></span><input type="range" min="1" max="10" step="0.1" value={ombakDifference} onChange={(event) => setOmbakDifference(Number(event.target.value))} /><small>This is a synthetic study control, not a claim of one universal Balinese tuning.</small></label>
                <div className="micro-actions">{!audio.playing ? <button type="button" onClick={audio.start}>START SYNTHETIC AUDIO</button> : <button type="button" onClick={audio.stop}>STOP AUDIO</button>}</div>
              </>
            )}

            {activeId === 'kento-japan' && (
              <>
                <label className="range-control"><span>Kentō registration offset <output>{kentoOffset.toFixed(2)}</output></span><input type="range" min="-0.5" max="0.5" step="0.01" value={kentoOffset} onChange={(event) => { setKentoOffset(Number(event.target.value)); setKentoPressed(false); }} /><small>The two base cards remain separate; registration determines whether transfer lands correctly.</small></label>
                <div className="micro-actions"><button type="button" onClick={() => setKentoPressed(true)}>PRESS / TRANSFER</button></div>
              </>
            )}

            {activeId === 'stereoscopy-uk' && (
              <label className="range-control"><span>Controlled disparity <output>{stereoDisparity.toFixed(2)}</output></span><input type="range" min="0.08" max="0.9" step="0.01" value={stereoDisparity} onChange={(event) => setStereoDisparity(Number(event.target.value))} /><small>Depth is an optional relational reading; comprehension never depends on the viewer having stereopsis.</small></label>
            )}

            {activeId === 'signal-nigeria' && (
              <label className="range-control"><span>Uplink orientation <output>{Math.round(signalAlignment * 100)}%</output></span><input type="range" min="0" max="1" step="0.01" value={signalAlignment} onChange={(event) => setSignalAlignment(Number(event.target.value))} /><small>The relay node visualizes the relationship; the two signal cards remain the persistent members.</small></label>
            )}

            {activeId === 'astrolabe-isfahan' && (
              <label className="range-control"><span>Rete relative rotation <output>{Math.round(astrolabeAngle)}°</output></span><input type="range" min="-180" max="180" step="1" value={astrolabeAngle} onChange={(event) => setAstrolabeAngle(Number(event.target.value))} /><small>The latitude plate stays stationary while the rete rotates around the shared axis. This is a structural reading, not an astronomical calculator.</small></label>
            )}

            {activeId === 'funicular-valparaiso' && (
              <label className="range-control"><span>Car A height <output>{Math.round(funicularPositionA * 100)}%</output></span><input type="range" min="0" max="1" step="0.01" value={funicularPositionA} onChange={(event) => setFunicularPositionA(Number(event.target.value))} /><small>Car B is always solved as the exact inverse position. Either car can also be dragged directly in the scene.</small></label>
            )}

            {activeId === 'music-box-sainte-croix' && (
              <>
                <label className="range-control"><span>Manual cylinder rotation <output>{Math.round(musicBoxAngle)}°</output></span><input type="range" min="0" max="359" step="1" value={musicBoxAngle} onChange={(event) => setMusicBoxAngle(Number(event.target.value))} /><small>Visual tooth response is the proof. No historical recording or authentic Paillard tune is used.</small></label>
                <div className="micro-actions"><button type="button" onClick={() => setMusicBoxEngaged((value) => !value)}>{musicBoxEngaged ? 'DISENGAGE' : 'ENGAGE CYLINDER + COMB'}</button></div>
              </>
            )}
          </section>

          <section className="evidence-panel">
            <h3>PAIR CONTRACT</h3>
            <p className="law">{pilot.law}</p>
            <dl>
              <div><dt>{evidenceLabels[0]}</dt><dd>{pilot.matching}</dd></div>
              <div><dt>{evidenceLabels[1]}</dt><dd>{pilot.other}</dd></div>
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
