import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const POINTS = 128;
const BAR_COUNT = 7;

function SourceBars({ side, groupRef }) {
  const direction = side === 'left' ? 1 : -1;
  return (
    <group ref={groupRef} position={[direction * 2.45, -0.08, 0]} scale={[direction, 1, 1]}>
      <mesh position={[-0.15, -0.42, 0]}>
        <boxGeometry args={[1.72, 0.13, 1.05]} />
        <meshStandardMaterial color="#2b2c27" metalness={0.72} roughness={0.42} />
      </mesh>
      {Array.from({ length: BAR_COUNT }, (_, index) => {
        const height = 0.32 + index * 0.095;
        const x = -0.7 + index * 0.235;
        return (
          <mesh key={index} position={[x, -0.08 + height / 2, 0.02]}>
            <boxGeometry args={[0.18, height, 0.84]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#b38c4e' : '#d0aa64'}
              metalness={0.72}
              roughness={0.3}
            />
          </mesh>
        );
      })}
      <mesh position={[-0.02, -0.56, 0.42]}>
        <boxGeometry args={[1.92, 0.1, 0.12]} />
        <meshStandardMaterial color="#725f3e" metalness={0.6} roughness={0.42} />
      </mesh>
    </group>
  );
}

function writeWave(buffer, time, frequencyScale, phaseOffset, amplitude, reducedMotion) {
  for (let i = 0; i < POINTS; i += 1) {
    const ratio = i / (POINTS - 1);
    const x = THREE.MathUtils.lerp(-1.72, 1.72, ratio);
    const phase = ratio * Math.PI * 2 * frequencyScale;
    const timePhase = reducedMotion ? 0 : time * 4.2;
    buffer[i * 3] = x;
    buffer[i * 3 + 1] = Math.sin(phase - timePhase + phaseOffset) * amplitude;
    buffer[i * 3 + 2] = 0.22;
  }
}

export function OmbakScene({ differenceHz, playing, matching, reducedMotion }) {
  const sourceA = useRef(null);
  const sourceB = useRef(null);
  const waveA = useRef(null);
  const waveB = useRef(null);
  const envelope = useRef(null);
  const center = useRef(null);
  const positionsA = useMemo(() => new Float32Array(POINTS * 3), []);
  const positionsB = useMemo(() => new Float32Array(POINTS * 3), []);
  const envelopePositions = useMemo(() => new Float32Array(POINTS * 3), []);
  const { invalidate } = useThree();

  const effectiveDifference = matching ? differenceHz : Math.min(20, differenceHz + 5);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const beatPhase = t * Math.PI * 2 * effectiveDifference;
    const temporalEnvelope = 0.5 + 0.5 * Math.cos(beatPhase);
    const visibleEnvelope = reducedMotion || !playing ? (matching ? 0.78 : 0.38) : temporalEnvelope;

    if (sourceA.current) {
      sourceA.current.scale.y = 1 + visibleEnvelope * 0.13;
      sourceA.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 2.8) * 0.012;
    }
    if (sourceB.current) {
      sourceB.current.scale.y = 1 + (1 - visibleEnvelope) * 0.13;
      sourceB.current.rotation.z = reducedMotion ? 0 : -Math.sin(t * 2.8) * 0.012;
    }

    const spatialCycles = matching ? 2.5 : 6.2;
    const phaseSeparation = matching ? 0.42 : 1.35;
    writeWave(positionsA, t, spatialCycles, 0, matching ? 0.22 : 0.16, reducedMotion);
    writeWave(positionsB, t, spatialCycles, phaseSeparation, matching ? 0.22 : 0.16, reducedMotion);

    for (let i = 0; i < POINTS; i += 1) {
      const ratio = i / (POINTS - 1);
      const x = THREE.MathUtils.lerp(-1.72, 1.72, ratio);
      const relationShape = matching
        ? Math.sin(ratio * Math.PI * 2.2) * (0.32 + visibleEnvelope * 0.18)
        : Math.sin(ratio * Math.PI * 12.0) * 0.08;
      envelopePositions[i * 3] = x;
      envelopePositions[i * 3 + 1] = relationShape;
      envelopePositions[i * 3 + 2] = 0.31;
    }

    for (const [ref, positions] of [[waveA, positionsA], [waveB, positionsB], [envelope, envelopePositions]]) {
      if (ref.current) ref.current.geometry.attributes.position.needsUpdate = true;
    }

    if (center.current) {
      const scale = matching ? 0.88 + visibleEnvelope * 0.24 : 0.56;
      center.current.scale.setScalar(scale);
      center.current.rotation.z = reducedMotion ? 0 : t * (matching ? 0.22 : 0.5);
    }

    if (playing && !reducedMotion) invalidate();
  });

  return (
    <>
      <color attach="background" args={['#151612']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 5]} intensity={3.1} color="#fff0cb" />
      <pointLight position={[-3.5, 1.2, 2]} intensity={1.5} color="#c49a52" />
      <pointLight position={[3.5, 0.8, 2]} intensity={1.3} color="#d8b76f" />

      <SourceBars side="left" groupRef={sourceA} />
      <SourceBars side="right" groupRef={sourceB} />

      <line ref={waveA}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positionsA, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b58e50" transparent opacity={matching ? 0.72 : 0.42} />
      </line>

      <line ref={waveB}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positionsB, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#d8bd7d" transparent opacity={matching ? 0.72 : 0.42} />
      </line>

      <line ref={envelope}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[envelopePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={matching ? '#f1d487' : '#796f5f'} />
      </line>

      <group ref={center} position={[0, 0.05, 0.36]}>
        <mesh>
          <torusGeometry args={[0.42, 0.055, 18, 64]} />
          <meshStandardMaterial
            color={matching ? '#e3c16e' : '#625e54'}
            emissive={matching ? '#8f6d2d' : '#1b1c18'}
            emissiveIntensity={matching ? 0.8 : 0.12}
            metalness={0.68}
            roughness={0.28}
          />
        </mesh>
        {matching && (
          <mesh>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshBasicMaterial color="#f3daa0" />
          </mesh>
        )}
      </group>

      <mesh position={[0, -1.35, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 7]} />
        <meshStandardMaterial color="#10120f" roughness={1} />
      </mesh>
    </>
  );
}
