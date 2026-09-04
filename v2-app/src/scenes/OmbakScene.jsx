import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const POINTS = 96;

export function OmbakScene({ differenceHz, playing, matching, reducedMotion }) {
  const sourceA = useRef(null);
  const sourceB = useRef(null);
  const bridge = useRef(null);
  const positions = useMemo(() => new Float32Array(POINTS * 3), []);
  const { invalidate } = useThree();

  const effectiveDifference = matching ? differenceHz : Math.max(0.25, differenceHz * 0.18);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const beatPhase = t * Math.PI * 2 * effectiveDifference;
    const envelope = 0.5 + 0.5 * Math.cos(beatPhase);
    const motionEnvelope = reducedMotion || !playing ? 0.5 : envelope;

    if (sourceA.current) {
      sourceA.current.scale.y = 1 + motionEnvelope * 0.18;
      sourceA.current.rotation.z = reducedMotion ? 0 : Math.sin(t * 3.2) * 0.018;
    }
    if (sourceB.current) {
      sourceB.current.scale.y = 1 + (1 - motionEnvelope) * 0.18;
      sourceB.current.rotation.z = reducedMotion ? 0 : -Math.sin(t * 3.2) * 0.018;
    }

    if (bridge.current) {
      for (let i = 0; i < POINTS; i += 1) {
        const ratio = i / (POINTS - 1);
        const x = THREE.MathUtils.lerp(-2.1, 2.1, ratio);
        const phaseA = ratio * Math.PI * 5 - t * 4.2;
        const phaseB = ratio * Math.PI * 5 - t * 4.2 + beatPhase;
        const y = (Math.sin(phaseA) + Math.sin(phaseB)) * 0.14;
        positions[i * 3] = x;
        positions[i * 3 + 1] = reducedMotion ? 0 : y;
        positions[i * 3 + 2] = 0.15;
      }
      const attribute = bridge.current.geometry.attributes.position;
      attribute.needsUpdate = true;
    }

    if (playing && !reducedMotion) invalidate();
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={2.1} />
      <pointLight position={[0, 0.5, 3]} intensity={1.2} />

      <group ref={sourceA} position={[-2.25, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.25, 0.2, 1.1]} />
          <meshStandardMaterial color="#62665d" metalness={0.72} roughness={0.32} />
        </mesh>
        {[0, 1, 2, 3, 4].map((index) => (
          <mesh key={index} position={[-0.45 + index * 0.225, 0.28, 0]}>
            <boxGeometry args={[0.15, 0.52 + index * 0.08, 0.82]} />
            <meshStandardMaterial color="#b4a271" metalness={0.58} roughness={0.38} />
          </mesh>
        ))}
      </group>

      <group ref={sourceB} position={[2.25, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.25, 0.2, 1.1]} />
          <meshStandardMaterial color="#62665d" metalness={0.72} roughness={0.32} />
        </mesh>
        {[0, 1, 2, 3, 4].map((index) => (
          <mesh key={index} position={[-0.45 + index * 0.225, 0.28, 0]}>
            <boxGeometry args={[0.15, 0.52 + index * 0.08, 0.82]} />
            <meshStandardMaterial color="#a98f66" metalness={0.58} roughness={0.38} />
          </mesh>
        ))}
      </group>

      <line ref={bridge}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={matching ? '#2f342e' : '#7a6d69'} linewidth={2} />
      </line>

      <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial color="#d3cec4" roughness={1} />
      </mesh>
    </>
  );
}
