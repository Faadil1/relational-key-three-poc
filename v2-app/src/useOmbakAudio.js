import { useCallback, useEffect, useRef, useState } from 'react';

export function useOmbakAudio(baseFrequency, differenceHz) {
  const graph = useRef(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    const current = graph.current;
    if (!current) {
      setPlaying(false);
      return;
    }
    try {
      current.oscA.stop();
      current.oscB.stop();
    } catch {
      // Oscillators may already be stopped.
    }
    current.gain.disconnect();
    current.oscA.disconnect();
    current.oscB.disconnect();
    void current.context.close();
    graph.current = null;
    setPlaying(false);
  }, []);

  const start = useCallback(() => {
    if (graph.current) return;
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    const context = new AudioContextCtor();
    const oscA = context.createOscillator();
    const oscB = context.createOscillator();
    const gain = context.createGain();

    oscA.type = 'sine';
    oscB.type = 'sine';
    oscA.frequency.value = baseFrequency;
    oscB.frequency.value = baseFrequency + differenceHz;
    gain.gain.value = 0.055;

    oscA.connect(gain);
    oscB.connect(gain);
    gain.connect(context.destination);
    oscA.start();
    oscB.start();

    graph.current = { context, oscA, oscB, gain };
    setPlaying(true);
  }, [baseFrequency, differenceHz]);

  useEffect(() => {
    const current = graph.current;
    if (!current) return;
    const now = current.context.currentTime;
    current.oscA.frequency.setTargetAtTime(baseFrequency, now, 0.025);
    current.oscB.frequency.setTargetAtTime(baseFrequency + differenceHz, now, 0.025);
  }, [baseFrequency, differenceHz]);

  useEffect(() => stop, [stop]);

  return { playing, start, stop };
}
