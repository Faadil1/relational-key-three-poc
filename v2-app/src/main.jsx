import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './focus-pair-rail.css';
import './focus-mobile.css';

const Wave3Shell = lazy(() => import('./Wave3Shell.jsx'));
const WAVE3 = new Set(['boulle-france', 'khipu-peru', 'mate-bombilla-argentina']);
const requestedPilot = new URLSearchParams(window.location.search).get('pilot');
const RootApp = WAVE3.has(requestedPilot) ? Wave3Shell : App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div role="status" aria-live="polite" style={{ padding: 24 }}>LOADING RELATIONAL KEY…</div>}>
      <RootApp />
    </Suspense>
  </StrictMode>,
);
