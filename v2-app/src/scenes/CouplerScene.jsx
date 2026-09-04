import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

function CouplerMember({ side, x, hookAngle, locked, onActivate }) {
  const direction = side === 'left' ? 1 : -1;
  return (
    <group position={[x, 0, 0]} rotation={[0, side === 'left' ? 0 : Math.PI, 0]}>
      <mesh onClick={onActivate}>
        <boxGeometry args={[1.55, 0.9, 1.35]} />
        <meshStandardMaterial color={locked ? '#585b54' : '#74766f'} metalness={0.74} roughness={0.42} />
      </mesh>
      <mesh position={[direction * 0.72, 0.05, 0]} rotation={[0, hookAngle * direction, 0]}>
        <boxGeometry args={[0.85, 0.42, 0.52]} />
        <meshStandardMaterial color="#252824" metalness={0.84} roughness={0.28} />
      </mesh>
      <mesh position={[direction * 1.0, -0.33, 0]}>
        <boxGeometry args={[0.52, 0.18, 0.82]} />
        <meshStandardMaterial color="#171917" metalness={0.75} roughness={0.38} />
      </mesh>
      <mesh position={[-direction * 1.08, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.34, 1.5, 28]} />
        <meshStandardMaterial color="#494b46" metalness={0.7} roughness={0.5} />
      </mesh>
    </group>
  );
}

export function CouplerScene({ approach, setApproach, pull, matching, reducedMotion }) {
  const left = useRef({ x: -2.25, hook: 0.5 });
  const right = useRef({ x: 2.25, hook: 0.5 });
  const leftGroup = useRef(null);
  const rightGroup = useRef(null);
  const hookLeft = useRef(null);
  const hookRight = useRef(null);
  const { invalidate } = useThree();

  const locked = matching && approach >= 0.78;
  const contact = approach >= 0.63;
  const baseGap = THREE.MathUtils.lerp(2.25, 0.78, approach);
  const sharedPull = locked ? pull * 0.72 : 0;
  const leftTarget = -baseGap + sharedPull - (!locked ? pull * 0.35 : 0);
  const rightTarget = baseGap + sharedPull + (!matching && pull > 0 ? pull * 0.18 : 0);
  const hookTarget = locked ? -0.38 : contact ? (matching ? 0.08 : 0.5) : 0.5;

  useFrame((_, delta) => {
    const speed = reducedMotion ? 100 : 10;
    left.current.x = THREE.MathUtils.damp(left.current.x, leftTarget, speed, delta);
    right.current.x = THREE.MathUtils.damp(right.current.x, rightTarget, speed, delta);
    left.current.hook = THREE.MathUtils.damp(left.current.hook, hookTarget, speed, delta);
    right.current.hook = THREE.MathUtils.damp(right.current.hook, hookTarget, speed, delta);

    if (leftGroup.current) leftGroup.current.position.x = left.current.x;
    if (rightGroup.current) rightGroup.current.position.x = right.current.x;
    if (hookLeft.current) hookLeft.current.rotation.y = left.current.hook;
    if (hookRight.current) hookRight.current.rotation.y = -left.current.hook;

    const unsettled =
      Math.abs(left.current.x - leftTarget) > 0.002 ||
      Math.abs(right.current.x - rightTarget) > 0.002 ||
      Math.abs(left.current.hook - hookTarget) > 0.002;
    if (unsettled) invalidate();
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[2, 5, 6]} intensity={2.4} />
      <pointLight position={[-4, 1, 2]} intensity={1.1} />

      <group ref={leftGroup} position={[-2.25, 0, 0]}>
        <mesh onClick={() => setApproach((value) => Math.min(1, value + 0.2))}>
          <boxGeometry args={[1.55, 0.9, 1.35]} />
          <meshStandardMaterial color={locked ? '#5d6158' : '#777a72'} metalness={0.75} roughness={0.4} />
        </mesh>
        <mesh ref={hookLeft} position={[0.72, 0.05, 0]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.85, 0.42, 0.52]} />
          <meshStandardMaterial color="#242724" metalness={0.86} roughness={0.25} />
        </mesh>
        <mesh position={[1.02, -0.32, 0]}>
          <boxGeometry args={[0.54, 0.2, 0.84]} />
          <meshStandardMaterial color="#171917" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.34, 1.5, 28]} />
          <meshStandardMaterial color="#464944" metalness={0.72} roughness={0.5} />
        </mesh>
      </group>

      <group ref={rightGroup} position={[2.25, 0, 0]} rotation={[0, Math.PI, 0]}>
        <mesh onClick={() => setApproach((value) => Math.min(1, value + 0.2))}>
          <boxGeometry args={[1.55, 0.9, 1.35]} />
          <meshStandardMaterial color={locked ? '#5d6158' : '#777a72'} metalness={0.75} roughness={0.4} />
        </mesh>
        <mesh ref={hookRight} position={[0.72, 0.05, 0]} rotation={[0, -0.5, 0]}>
          <boxGeometry args={[0.85, 0.42, 0.52]} />
          <meshStandardMaterial color="#242724" metalness={0.86} roughness={0.25} />
        </mesh>
        <mesh position={[1.02, -0.32, 0]}>
          <boxGeometry args={[0.54, 0.2, 0.84]} />
          <meshStandardMaterial color="#171917" metalness={0.8} roughness={0.35} />
        </mesh>
        <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.34, 1.5, 28]} />
          <meshStandardMaterial color="#464944" metalness={0.72} roughness={0.5} />
        </mesh>
      </group>

      {locked && (
        <mesh position={[sharedPull, -0.58, 0]}>
          <boxGeometry args={[1.0, 0.07, 0.11]} />
          <meshStandardMaterial color="#b6b89f" emissive="#6d704f" emissiveIntensity={0.35} />
        </mesh>
      )}

      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 7]} />
        <meshStandardMaterial color="#cecac0" roughness={1} />
      </mesh>
    </>
  );
}
