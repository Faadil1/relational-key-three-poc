import { useRef } from 'react';

const DEG = Math.PI / 180;

function Rete({ angle }) {
  const stars = [
    [-0.58, 0.48], [-0.16, 0.73], [0.36, 0.6], [0.68, 0.16],
    [0.51, -0.48], [0.02, -0.72], [-0.5, -0.5], [-0.7, 0.02],
  ];
  return (
    <group rotation={[0, 0, angle * DEG]}>
      <mesh>
        <torusGeometry args={[0.88, 0.045, 10, 48]} />
        <meshStandardMaterial color="#b8925c" metalness={0.64} roughness={0.38} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.61, 0.025, 8, 40]} />
        <meshStandardMaterial color="#a77c49" metalness={0.55} roughness={0.42} />
      </mesh>
      {[0, 45, 90, 135].map((rotation) => (
        <mesh key={rotation} rotation={[0, 0, rotation * DEG]}>
          <boxGeometry args={[1.65, 0.035, 0.035]} />
          <meshStandardMaterial color="#9c7346" metalness={0.5} roughness={0.46} />
        </mesh>
      ))}
      {stars.map(([x, y], index) => (
        <mesh key={index} position={[x, y, 0.055]}>
          <octahedronGeometry args={[0.065, 0]} />
          <meshStandardMaterial color="#e3c17f" emissive="#705120" emissiveIntensity={0.34} />
        </mesh>
      ))}
      <mesh position={[0.28, 0.2, 0.06]} rotation={[0, 0, -0.34]}>
        <torusGeometry args={[0.47, 0.025, 8, 42]} />
        <meshStandardMaterial color="#c7a166" metalness={0.52} roughness={0.44} />
      </mesh>
    </group>
  );
}

function LatitudePlate({ localPlate }) {
  const tilt = localPlate ? 0 : 0.32;
  return (
    <group rotation={[0, 0, tilt]}>
      <mesh>
        <circleGeometry args={[0.94, 64]} />
        <meshStandardMaterial color="#4d3a29" metalness={0.34} roughness={0.58} />
      </mesh>
      {[0.25, 0.46, 0.68, 0.86].map((radius) => (
        <mesh key={radius} position={[0, 0, 0.025]}>
          <torusGeometry args={[radius, 0.012, 6, 48]} />
          <meshStandardMaterial color={localPlate ? '#c8a56e' : '#9d7656'} />
        </mesh>
      ))}
      {[-0.55, -0.28, 0, 0.28, 0.55].map((y) => (
        <mesh key={y} position={[0, y, 0.035]} rotation={[0, 0, y * 0.14]}>
          <boxGeometry args={[1.6 - Math.abs(y) * 0.65, 0.018, 0.018]} />
          <meshStandardMaterial color={localPlate ? '#d8bd8a' : '#aa8060'} />
        </mesh>
      ))}
      <mesh position={[0, localPlate ? -0.08 : 0.14, 0.05]}>
        <boxGeometry args={[1.64, 0.035, 0.025]} />
        <meshStandardMaterial color={localPlate ? '#e1c88f' : '#bb8362'} emissive={localPlate ? '#5b421f' : '#3e231f'} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export function AstrolabeScene({ angle, setAngle, plateMode, reducedMotion }) {
  const dragging = useRef(false);
  const localPlate = plateMode === 'local';
  const relationGlow = localPlate ? '#d8b873' : '#a9785c';

  const updateFromPointer = (event) => {
    if (!dragging.current || !event.uv) return;
    const x = event.uv.x - 0.5;
    const y = event.uv.y - 0.5;
    const next = Math.atan2(y, x) / DEG;
    setAngle(Math.round(next));
  };

  const pointerDown = (event) => {
    dragging.current = true;
    event.stopPropagation();
    event.target.setPointerCapture?.(event.pointerId);
    updateFromPointer(event);
  };

  const pointerUp = (event) => {
    dragging.current = false;
    event.target.releasePointerCapture?.(event.pointerId);
  };

  return (
    <>
      <color attach="background" args={['#0b0a08']} />
      <ambientLight intensity={0.78} />
      <directionalLight position={[2.5, 4.5, 4.5]} intensity={2.5} color="#f0dfbd" />
      <pointLight position={[0, 1.4, 3]} intensity={1.2} color={relationGlow} />

      <group name="PAIR_MEMBER_A" position={[-1.82, 0, 0]} rotation={[0, 0.08, 0]}>
        <mesh
          onPointerDown={pointerDown}
          onPointerMove={updateFromPointer}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
        >
          <boxGeometry args={[2.72, 3.72, 0.18]} />
          <meshStandardMaterial color="#1c1711" roughness={0.9} />
        </mesh>
        <group position={[0, 0.05, 0.16]} scale={1.18}>
          <Rete angle={angle} />
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.82, 0, 0]} rotation={[0, -0.08, 0]}>
        <mesh>
          <boxGeometry args={[2.72, 3.72, 0.18]} />
          <meshStandardMaterial color="#1c1711" roughness={0.9} />
        </mesh>
        <group position={[0, 0.05, 0.16]} scale={1.18}>
          <LatitudePlate localPlate={localPlate} />
        </group>
      </group>

      <group name="RELATION" position={[0, 0.04, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.09, 0.09, 0.42, 18]} />
          <meshStandardMaterial color={relationGlow} metalness={0.62} roughness={0.32} emissive={relationGlow} emissiveIntensity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.34, 0.018, 8, 36]} />
          <meshStandardMaterial color={relationGlow} transparent opacity={0.72} />
        </mesh>
        <mesh rotation={[0, 0, angle * DEG]}>
          <boxGeometry args={[1.02, 0.028, 0.028]} />
          <meshStandardMaterial color={relationGlow} emissive={relationGlow} emissiveIntensity={reducedMotion ? 0.18 : 0.34} />
        </mesh>
      </group>

      <mesh position={[0, -2.02, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#080705" roughness={1} />
      </mesh>
    </>
  );
}
