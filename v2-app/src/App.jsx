import { CollectibleControls } from './CollectibleControls.jsx';
import { collectibleCopy } from './collectibleCopy.js';
import { collectibleIds, initialTextile, textileReducer, textileStatus } from './familyModels/collectibleBatch.js';
import { CityCardControls } from './CityCardControls.jsx';
import { initialCity, cityReducer, cityStatus } from './familyModels/cityPair.js';
import { Suspense, useEffect, useMemo, useReducer, useState } from 'react';
import { pilots as legacyPilots } from './pilots.js';
import { wave005Families, wave005Ids } from './wave005Families.js';
import { previewLots, previewLotById } from './previewLots.js';
import { sceneComponents } from './sceneRegistry.js';
import { useOmbakAudio } from './useOmbakAudio.js';
import { RelationalStudyControls } from './RelationalStudyControls.jsx';
import { studyIds, initialMetate, metateReducer, initialSiku, sikuReducer, metateStatus, sikuStatus } from './familyModels/relationalStudies.js';
import { useReducedMotion } from './useReducedMotion.js';

const pilots = [...legacyPilots, ...wave005Families];
const pilotById = Object.fromEntries(pilots.map((pilot) => [pilot.id, pilot]));

function PreviewLotsHub({ activeLotId }) {
  const selectedLot = previewLotById[activeLotId] || previewLots[previewLots.length - 1];
  const lots = activeLotId ? [selectedLot] : previewLots;
  return (
    <main className="app-shell preview-hub">
      <header className="masthead preview-hub-head">
        <div>
          <p className="eyebrow">RELATIONAL KEY · PREVIEW HUB</p>
          <h1>Explore lots before production.</h1>
          <p className="lede">Un seul lien de revue pour les lots fermés. Aucun canvas Three.js n’est chargé ici; chaque famille s’ouvre seulement quand tu veux l’inspecter.</p>
        </div>
        <div className="baseline" aria-label="Preview quota rule">
          <span>VERCEL QUOTA RULE</span>
          <strong>1 preview / closed lot</strong>
          <a className="focus-action" href="?pilot=city-gatineau">ALL FAMILIES LAB</a>
        </div>
      </header>

      <section className="preview-rule" aria-label="Preview operating rule">
        <p><strong>Product rule:</strong> pair member → relation → other member response. Visual depth, foil and 3D only count if they make that relation easier to read.</p>
        <p><strong>Build rule:</strong> GitHub Actions for iteration; Vercel only after a lot is closed and green.</p>
      </section>

      <section className="lot-grid" aria-label="Available preview lots">
        {lots.map((lot) => (
          <article className="lot-card" key={lot.id}>
            <div className="lot-card-top">
              <p className="eyebrow">{lot.id}</p>
              <span>{lot.status}</span>
            </div>
            <h2>{lot.title}</h2>
            <p>{lot.note}</p>
            <div className="lot-family-grid">
              {lot.families.map((familyId) => {
                const family = pilotById[familyId];
                return (
                  <a key={familyId} className="lot-family" href={`?focus=1&pilot=${encodeURIComponent(familyId)}`}>
                    <small>{family.className}</small>
                    <strong>{family.label}</strong>
                    <span>{family.pairMembers.a} → {family.pairMembers.relation} → {family.pairMembers.b}</span>
                  </a>
                );
              })}
            </div>
            <a className="focus-action lot-direct" href={`?preview=lots&lot=${encodeURIComponent(lot.id)}`}>OPEN ONLY THIS LOT</a>
          </article>
        ))}
      </section>
    </main>
  );
}

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
  boulleSeparated: false,
  khipuTension: 0.28,
  mateInsertion: 0.18,
  serviceContact: 0.18,
  foodRelease: 0.12,
  hikaFriction: 0.18,
};

export default function App() {
  const launch = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedPilot = params.get('pilot');
    const requestedLot = params.get('lot');
    const pathname = window.location.pathname.replace(/\/+$/, '');
    const previewHub = pathname === '/preview-lots' || params.get('preview') === 'lots';
    return {
      focusMode: params.get('focus') === '1',
      previewHub,
      lotId: requestedLot && previewLotById[requestedLot] ? requestedLot : null,
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
  const [boulleSeparated, setBoulleSeparated] = useState(INITIAL.boulleSeparated);
  const [khipuTension, setKhipuTension] = useState(INITIAL.khipuTension);
  const [mateInsertion, setMateInsertion] = useState(INITIAL.mateInsertion);
  const [serviceContact, setServiceContact] = useState(INITIAL.serviceContact);
  const [foodRelease, setFoodRelease] = useState(INITIAL.foodRelease);
  const [hikaFriction, setHikaFriction] = useState(INITIAL.hikaFriction);
  const reducedMotion = useReducedMotion();
  const [backs, setBacks] = useState({A:false,B:false});
  const [textile, dispatchTextile] = useReducer(textileReducer, undefined, initialTextile);
  const [city, dispatchCity] = useReducer(cityReducer, undefined, initialCity);
  const [presentation, setPresentation] = useState({ angle: 0, foil: true });
  const [metate, dispatchMetate] = useReducer(metateReducer, undefined, initialMetate);
  const [siku, dispatchSiku] = useReducer(sikuReducer, undefined, initialSiku);

  const focusMode = launch.focusMode;
  if (launch.previewHub) return <PreviewLotsHub activeLotId={launch.lotId} />;

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
    if (activeId === 'boulle-france') {
      if (!boulleSeparated) return 'IDLE · two distinct material fields await a shared cut relation.';
      return matching
        ? 'MATCHING · one shared cut produces reciprocal première-partie / contre-partie inverse surfaces.'
        : 'OTHER · both material fields remain valid · selected cuts do not produce one reciprocal inverse map.';
    }
    if (activeId === 'khipu-peru') {
      const registered = matching && khipuTension >= 0.72;
      return registered
        ? 'MATCHING · shared tension settles carrying and secondary cords into a stable structural knot-position register · meaning is not inferred.'
        : 'OTHER · both cord systems remain valid · attachment and knot positions retain a visible structural residual.';
    }
    if (activeId === 'mate-bombilla-argentina') {
      const engaged = matching && mateInsertion >= 0.72;
      return engaged
        ? 'MATCHING · perforated bombilla insertion establishes selective passage · represented liquid passes while particulate matter remains contained.'
        : 'OTHER · both filter-system members remain valid · incomplete insertion does not establish selective passage.';
    }
    if (activeId === 'service-benin') {
      const registered = matching && serviceContact >= 0.72;
      return registered
        ? 'MATCHING · registered Bénin telecom contact establishes the relation · publiphone service window responds.'
        : 'OTHER · both telecom members remain valid · contact field stays offset and service window remains closed.';
    }
    if (activeId === 'food-toyama') {
      const revealed = matching && foodRelease >= 0.72;
      return revealed
        ? 'MATCHING · ordered pressure release transfers across the pair · bamboo-leaf field opens into one shared reveal.'
        : 'OTHER · both package members remain valid · release order remains incomplete and the shared reveal does not register.';
    }
    if (activeId === 'hika-ahi-aotearoa') {
      const ember = matching && hikaFriction >= 0.72;
      return ember
        ? 'MATCHING · sustained friction remains localized at the groove relation · bounded ember witness appears at the interface.'
        : 'OTHER · both hika ahi tool members remain valid · contact is offset and heat dissipates without an ember register.';
    }
    if (activeId === 'textile-bonwire') return textileStatus(textile);
    if (activeId === 'city-gatineau') return cityStatus(city);
    if (activeId === 'metate-teotitlan') return metateStatus(metate);
    if (activeId === 'siku-bolivia') return sikuStatus(siku);
    if (wave005Ids.has(activeId)) {
      return matching ? `MATCHING · ${pilot.matching}` : `OTHER · ${pilot.other}`;
    }
    return 'RELATION STATE UNAVAILABLE.';
  }, [
    activeId, pilot, anamorphosisOffset, matching, couplerApproach, couplerPull, audio.playing,
    ombakDifference, effectiveOmbakDifference, kentoOffset, kentoPressed, stereoDisparity,
    signalAlignment, astrolabeAngle, astrolabePlateMode, funicularPositionA, musicBoxEngaged,
    musicBoxAngle, musicBoxPattern, boulleSeparated, khipuTension, mateInsertion,
    serviceContact, foodRelease, hikaFriction, metate, siku, city, textile,
  ]);

  const applyRelation = (mode) => {
    const nextMatching = mode === 'matching';
    setRelationMode(mode);
    if (activeId === 'textile-bonwire') dispatchTextile({type:'align',value:nextMatching});
    if (activeId === 'city-gatineau') { dispatchCity({type:'offset',value:!nextMatching}); dispatchCity({type:'move',gap:0}); }
    if (activeId === 'metate-teotitlan') dispatchMetate({ type: 'contact', value: nextMatching });
    if (activeId === 'siku-bolivia') dispatchSiku({ type: 'relation', value: nextMatching });
    if (activeId === 'anamorphosis-paris') setAnamorphosisOffset(nextMatching ? 0 : 0.72);
    else if (activeId === 'coupler-virginia') { setCouplerApproach(1); setCouplerPull(0); }
    else if (activeId === 'kento-japan') { setKentoOffset(nextMatching ? 0 : 0.3); setKentoPressed(false); }
    else if (activeId === 'stereoscopy-uk') setStereoDisparity(nextMatching ? 0.16 : 0.72);
    else if (activeId === 'signal-nigeria') setSignalAlignment(nextMatching ? 1 : 0.34);
    else if (activeId === 'astrolabe-isfahan') { setAstrolabePlateMode(nextMatching ? 'local' : 'other'); setAstrolabeAngle(nextMatching ? 42 : 22); }
    else if (activeId === 'music-box-sainte-croix') { setMusicBoxEngaged(true); setMusicBoxPattern(nextMatching ? 'A' : 'B'); setMusicBoxAngle(nextMatching ? 52 : 68); }
    else if (activeId === 'boulle-france') setBoulleSeparated(true);
    else if (activeId === 'khipu-peru') setKhipuTension(nextMatching ? 1 : 0.62);
    else if (activeId === 'mate-bombilla-argentina') setMateInsertion(nextMatching ? 1 : 0.55);
    else if (activeId === 'service-benin') setServiceContact(nextMatching ? 1 : 0.48);
    else if (activeId === 'food-toyama') setFoodRelease(nextMatching ? 1 : 0.42);
    else if (activeId === 'hika-ahi-aotearoa') setHikaFriction(nextMatching ? 1 : 0.46);
  };

  const resetActive = () => {
    setBacks({A:false,B:false});
    dispatchTextile({type:'reset'});
    dispatchCity({type:'reset'});
    setPresentation({ angle: 0, foil: true });
    dispatchMetate({ type: 'reset' });
    dispatchSiku({ type: 'reset' });
    setRelationMode('other');
    if (activeId === 'anamorphosis-paris') setAnamorphosisOffset(INITIAL.anamorphosisOffset);
    if (activeId === 'coupler-virginia') { setCouplerApproach(INITIAL.couplerApproach); setCouplerPull(0); }
    if (activeId === 'ombak-bali') { audio.stop(); setOmbakBase(INITIAL.ombakBase); setOmbakDifference(INITIAL.ombakDifference); }
    if (activeId === 'kento-japan') { setKentoOffset(INITIAL.kentoOffset); setKentoPressed(false); }
    if (activeId === 'stereoscopy-uk') setStereoDisparity(INITIAL.stereoDisparity);
    if (activeId === 'signal-nigeria') setSignalAlignment(INITIAL.signalAlignment);
    if (activeId === 'astrolabe-isfahan') { setAstrolabeAngle(INITIAL.astrolabeAngle); setAstrolabePlateMode(INITIAL.astrolabePlateMode); }
    if (activeId === 'funicular-valparaiso') setFunicularPositionA(INITIAL.funicularPositionA);
    if (activeId === 'music-box-sainte-croix') { setMusicBoxEngaged(INITIAL.musicBoxEngaged); setMusicBoxAngle(INITIAL.musicBoxAngle); setMusicBoxPattern(INITIAL.musicBoxPattern); }
    if (activeId === 'boulle-france') setBoulleSeparated(INITIAL.boulleSeparated);
    if (activeId === 'khipu-peru') setKhipuTension(INITIAL.khipuTension);
    if (activeId === 'mate-bombilla-argentina') setMateInsertion(INITIAL.mateInsertion);
    if (activeId === 'service-benin') setServiceContact(INITIAL.serviceContact);
    if (activeId === 'food-toyama') setFoodRelease(INITIAL.foodRelease);
    if (activeId === 'hika-ahi-aotearoa') setHikaFriction(INITIAL.hikaFriction);
  };

  let activeSceneProps = {};
  if (activeId === 'anamorphosis-paris') activeSceneProps = { offset: anamorphosisOffset, setOffset: setAnamorphosisOffset, reducedMotion };
  else if (activeId === 'coupler-virginia') activeSceneProps = { approach: couplerApproach, setApproach: setCouplerApproach, pull: couplerPull, matching, reducedMotion };
  else if (activeId === 'ombak-bali') activeSceneProps = { differenceHz: ombakDifference, playing: audio.playing, matching, reducedMotion };
  else if (activeId === 'kento-japan') activeSceneProps = { offset: kentoOffset, pressed: kentoPressed, matching, reducedMotion };
  else if (activeId === 'stereoscopy-uk') activeSceneProps = { disparity: stereoDisparity, matching, reducedMotion };
  else if (activeId === 'signal-nigeria') activeSceneProps = { alignment: signalAlignment, matching, reducedMotion };
  else if (activeId === 'astrolabe-isfahan') activeSceneProps = { angle: astrolabeAngle, setAngle: setAstrolabeAngle, plateMode: astrolabePlateMode, reducedMotion };
  else if (activeId === 'funicular-valparaiso') activeSceneProps = { positionA: funicularPositionA, setPositionA: setFunicularPositionA, reducedMotion };
  else if (activeId === 'music-box-sainte-croix') activeSceneProps = { engaged: musicBoxEngaged, angle: musicBoxAngle, setAngle: setMusicBoxAngle, pattern: musicBoxPattern, reducedMotion };
  else if (activeId === 'boulle-france') activeSceneProps = { separated: boulleSeparated, matching, reducedMotion, presentation, backs };
  else if (activeId === 'khipu-peru') activeSceneProps = { tension: khipuTension, matching, reducedMotion };
  else if (activeId === 'mate-bombilla-argentina') activeSceneProps = { insertion: mateInsertion, matching, reducedMotion };
  else if (activeId === 'service-benin') activeSceneProps = { contact: serviceContact, matching, reducedMotion };
  else if (activeId === 'food-toyama') activeSceneProps = { release: foodRelease, matching, reducedMotion };
  else if (activeId === 'hika-ahi-aotearoa') activeSceneProps = { friction: hikaFriction, matching, reducedMotion };
  else if (activeId === 'metate-teotitlan') activeSceneProps = { state: metate, reducedMotion, presentation, backs };
  else if (activeId === 'siku-bolivia') activeSceneProps = { state: siku, reducedMotion, presentation, backs };
  else if (activeId === 'city-gatineau') activeSceneProps = {state:city,dispatch:dispatchCity,reducedMotion};
  else if (activeId === 'textile-bonwire') activeSceneProps = {state:textile,presentation,backs};
  else if (wave005Ids.has(activeId)) activeSceneProps = { matching, reducedMotion };

  const selectFamily = (id) => {
    if (id !== activeId) resetActive();
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
    <main className={`${focusMode ? 'app-shell focus-mode' : 'app-shell'}${studyIds.has(activeId) ? ' relational-study' : ''}${activeId === 'city-gatineau' ? ' city-collectible' : ''}${collectibleIds.has(activeId) ? ' collectible-batch' : ''}`}>
      {focusMode ? (
        <header className="focus-header">
          <div>
            <p className="eyebrow">RELATIONAL KEY · FOCUS EXPERIENCE · {pilot.className}</p>
            <h1>{pilot.label}</h1>
            <p className="focus-intent">{activeId === 'city-gatineau' ? 'Rapprochez deux fragments de Gatineau. Découvrez ce qui peut passer de l’un à l’autre.' : collectibleCopy[activeId]?.intent || pilot.memorable}</p>
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
            <p className="eyebrow">RELATIONAL KEY · V2.7 BOUNDED EXPANSION · ALL 24 FAMILIES</p>
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
            <button key={item.id} type="button" className={item.id === activeId ? 'pilot-tab active' : 'pilot-tab'} aria-pressed={item.id === activeId} onClick={() => selectFamily(item.id)}>
              <span>{item.label}</span><small>{item.className}</small>
            </button>
          ))}
        </nav>
      )}

      <section className="pilot-grid" aria-labelledby="pilot-title">
        <div className="scene-column">
