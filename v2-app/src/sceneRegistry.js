import { lazy } from 'react';

export const sceneComponents = Object.freeze({
  'anamorphosis-paris': lazy(() => import('./sceneEntries/AnamorphosisEntry.jsx')),
  'coupler-virginia': lazy(() => import('./sceneEntries/CouplerEntry.jsx')),
  'ombak-bali': lazy(() => import('./sceneEntries/OmbakEntry.jsx')),
});
