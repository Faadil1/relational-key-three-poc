import { lazy } from 'react';

export const sceneComponents = Object.freeze({
  'anamorphosis-paris': lazy(() => import('./sceneEntries/AnamorphosisEntry.jsx')),
  'coupler-virginia': lazy(() => import('./sceneEntries/CouplerEntry.jsx')),
  'ombak-bali': lazy(() => import('./sceneEntries/OmbakEntry.jsx')),
  'kento-japan': lazy(() => import('./sceneEntries/KentoEntry.jsx')),
  'stereoscopy-uk': lazy(() => import('./sceneEntries/StereoscopyEntry.jsx')),
  'signal-nigeria': lazy(() => import('./sceneEntries/SignalEntry.jsx')),
  'astrolabe-isfahan': lazy(() => import('./sceneEntries/AstrolabeEntry.jsx')),
  'funicular-valparaiso': lazy(() => import('./sceneEntries/FunicularEntry.jsx')),
  'music-box-sainte-croix': lazy(() => import('./sceneEntries/MusicBoxEntry.jsx')),
});
