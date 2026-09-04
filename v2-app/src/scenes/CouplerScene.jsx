import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

function CouplerMember({ side, groupRef, hookRef, locked, onActivate }) {
  const direction = side === 'left' ? 1 : -1;
  const steel = locked ? '#59615a' : '#70766f';

  return (
    <group ref={groupRef} scale={[direction, 1, 1]}>
      <mesh position={[-1.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.4, 1.75, 32]} />
        <meshStandardMaterial color="#3d433f" metalness={0.82} roughness={0.38} />
      </mesh>

      <mesh position={[-0.42, 0, 0]} onClick={onActivate}>
        <boxGeometry args={[1.15, 1.18, 1.15]} />
        <meshStandardMaterial color={steel} metalness={0.76} roughness={0.4} />
      </mesh>

      <mesh position={[0.42, 0.42, 0.02]}>
        <boxGeometry args={[0.82, 0.28, 1.0]} />
        <meshStandardMaterial color="#616861" metalness={0.78} roughness={0.34} />
      </mesh>
      <mesh position={[0.42, -0.42, 0.02]}>
        <boxGeometry args={[0.82, 0.28, 1.0]} />
        <meshStandardMaterial color="#616861" metalness={0.78} roughness={0.34} />
      </mesh>

      <mesh position={[0.22, 0, 0.4]}>
        <cylinderGeometry args={[0.13, 0.13, 1.0, 24]} />
        <meshStandardMaterial color="#c1a368" metalness={0.85} roughness={0.26} />
      </mesh>

      <group ref={hookRef} position={[0.58, 0, 0.22]} rotation={[0, 0, 0.5]}>
        <mesh>
          <torusGeometry args={[0.42, 0.14, 18, 64, Math.PI * 1.48]} />
          <meshStandardMaterial color="#191c19" metalness={0.9} roughness={0.22} />
        </mesh>
        <mesh position={[0.39, -0.25, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.42, 0.22, 0.32]} />
          <meshStandardMaterial color="#191c19" metalness={0.9} roughness={0.22} />
        </mesh>
      </group>

      <mesh position={[0.82, -0.18, 0.28]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.38, 0.16, 0.38]} />
        <meshStandardMaterial
          color={locked ? '#d2b56f' : '#777063'}
          emissive={locked ? '#876d36' : '#000000'}
          emissiveIntensity={locked ? 0.5 : 0}
          metalness={0.78}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export function CouplerScene({ approach, setApproach, pull, matching, reducedMotion }) {
  const left = useRef({ x: -2.45, hook: 0.58 });
  const right = useRef({ x: 2.45, hook: 0.58 });
  const leftGroup = useRef(null);
  const rightGroup = useRef(null);
  const hookLeft = useRef(null);
  const hookRight = useRef(null);
  const { invalidate } = useThree();

  const locked = matching && approach >= 0.78;
  const contact = approach >= 0.63;
  const baseGap = THREE.MathUtils.lerp(2.45, 0.92, approach);
  const sharedPull = locked ? pull * 0.68 : 0;
  const leftTarget = -baseGap + sharedPull - (!locked ? pull * 0.28 : 0);
  const rightTarget = baseGap + sharedPull + (!matching && pull > 0 ? pull * 0.2 : 0);
  const hookTarget = locked ? -0.76 : contact ? (matching ? -0.18 : 0.52) : 0.58;

  useFrame((_, delta) => {
    const speed = reducedMotion ? 100 : 10;
    left.current.x = THREE.MathUtils.damp(left.current.x, leftTarget, speed, delta);
    right.current.x = THREE.MathUtils.damp(right.current.x, rightTarget, speed, delta);
    left.current.hook = THREE.MathUtils.damp(left.current.hook, hookTarget, speed, delta);
    right.current.hook = THREE.MathUtils.damp(right.current.hook, hookTarget, speed, delta);

    if (leftGroup.current) leftGroup.current.position.x = left.current.x;
    if (rightGroup.current) rightGroup.current.position.x = right.current.x;
    if (hookLeft.current) hookLeft.current.rotation.z = left.current.hook;
    if (hookRight.current) hookRight.current.rotation.z = left.current.hook;

    const unsettled =
      Math.abs(left.current.x - leftTarget) > 0.002 ||
      Math.abs(right.current.x - rightTarget) > 0.002 ||
      Math.abs(left.current.hook - hookTarget) > 0.002;
    if (unsettled) invalidate();
  });

  return (
    <>
      <color attach="background" args={['#131613']} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 5, 6]} intensity={3.4} color="#fff1d2" />
      <pointLight position={[-4, 1.8, 2]} intensity={1.8} color="#b99b60" />
      <pointLight position={[4, -0.4, 2]} intensity={1.2} color="#8aa092" />

      <CouplerMember
        side="left"
        groupRef={leftGroup}
        hookRef={hookLeft}
        locked={locked}
        onActivate={() => setApproach((value) => Math.min(1, value + 0.2))}
      />
      <CouplerMember
        side="right"
        groupRef={rightGroup}
        hookRef={hookRight}
        locked={locked}
        onActivate={() => setApproach((value) => Math.min(1, value + 0.2))}
      />

      {contact && (
        <mesh position={[0, 0, -0.52]}>
          <boxGeometry args={[locked ? 1.72 : 0.82, 0.06, 0.06]} />
          <meshBasicMaterial color={locked ? '#d3b565' : '#6e6757'} transparent opacity={locked ? 0.95 : 0.5} />
        </mesh>
      )}

      {locked && (
        <group position={[sharedPull, 0, -0.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.055, 0.055, 4.9, 18]} />
            <meshStandardMaterial color="#d9bd72" emissive="#8f7337" emissiveIntensity={0.75} metalness={0.62} roughness={0.24} />
          </mesh>
          <mesh position={[-2.45, 0, 0]}>
            <sphereGeometry args={[0.1, 18, 18]} />
            <meshBasicMaterial color="#f0d38b" />
          </mesh>
          <mesh position={[2.45, 0, 0]}>
            <sphereGeometry args={[0.1, 18, 18]} />
            <meshBasicMaterial color="#f0d38b" />
          </mesh>
        </group>
      )}

      <mesh position={[0, -1.35, -0.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11, 7]} />
        <meshStandardMaterial color="#0f120f" roughness={1} />
      </mesh>
      <mesh position={[0, -1.18, -0.62]}>
        <boxGeometry args={[9.2, 0.08, 0.12]} />
        <meshStandardMaterial color="#343a35" metalness={0.72} roughness={0.5} />
      </mesh>
    </>
  );
}
