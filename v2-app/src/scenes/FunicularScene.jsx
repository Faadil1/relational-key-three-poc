import { useRef } from 'react';

const TOP = 1.25;
const BOTTOM = -1.18;

function RailCard({ side, position, onPointerDown, onPointerMove, onPointerUp }) {
  const carY = BOTTOM + (TOP - BOTTOM) * position;
  const tint = side === 'A' ? '#a87956' : '#7d5a43';
  return (
    <group name={`PAIR_MEMBER_${side}`}>
      <mesh>
        <boxGeometry args={[2.55, 3.7, 0.18]} />
        <meshStandardMaterial color="#171a18" roughness={0.95} />
      </mesh>
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0.05, 0.16]} rotation={[0, 0, -0.06]}>
          <boxGeometry args={[0.035, 2.85, 0.035]} />
          <meshStandardMaterial color="#858984" metalness={0.35} roughness={0.5} />
        </mesh>
      ))}
      {[-1.05, -0.65, -0.25, 0.15, 0.55, 0.95].map((y) => (
        <mesh key={y} position={[0, y, 0.17]} rotation={[0, 0, -0.06]}>
          <boxGeometry args={[1.1, 0.025, 0.025]} />
          <meshStandardMaterial color="#535954" />
        </mesh>
      ))}
      <group
        position={[0, carY, 0.32]}
        rotation={[0, 0, -0.06]}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <mesh>
          <boxGeometry args={[1.02, 0.64, 0.38]} />
          <meshStandardMaterial color={tint} roughness={0.58} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0.08, 0.205]}>
          <boxGeometry args={[0.7, 0.25, 0.03]} />
          <meshStandardMaterial color="#222827" metalness={0.1} roughness={0.45} />
        </mesh>
        {[-0.34, 0.34].map((x) => (
          <mesh key={x} position={[x, -0.36, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.08, 16]} />
            <meshStandardMaterial color="#2c302d" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function FunicularScene({ positionA, setPositionA, reducedMotion }) {
  const dragging = useRef(null);
  const positionB = 1 - positionA;

  const updateFromPointer = (event, side) => {
    if (dragging.current !== side || !event.uv) return;
    const local = Math.max(0, Math.min(1, event.uv.y));
    setPositionA(side === 'A' ? local : 1 - local);
  };

  const begin = (event, side) => {
    dragging.current = side;
    event.stopPropagation();
    updateFromPointer(event, side);
  };

  const end = () => {
    dragging.current = null;
  };

  const crossing = Math.abs(positionA - 0.5) < 0.07;
  const relationColor = crossing ? '#e1c996' : '#a99272';

  return (
    <>
      <color attach="background" args={['#090a09']} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 5]} intensity={2.4} color="#e9dfcf" />
      <pointLight position={[0, 1.6, 3]} intensity={1.1} color={relationColor} />

      <group position={[-1.72, 0, 0]}>
        <RailCard
          side="A"
          position={positionA}
          onPointerDown={(event) => begin(event, 'A')}
          onPointerMove={(event) => updateFromPointer(event, 'A')}
          onPointerUp={end}
        />
      </group>
      <group position={[1.72, 0, 0]}>
        <RailCard
          side="B"
          position={positionB}
          onPointerDown={(event) => begin(event, 'B')}
          onPointerMove={(event) => updateFromPointer(event, 'B')}
          onPointerUp={end}
        />
      </group>

      <group name="RELATION" position={[0, 0.12, 0.34]}>
        <mesh position={[0, 1.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.035, 10, 32]} />
          <meshStandardMaterial color="#aaa89e" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.025, 2.65, 0.025]} />
          <meshStandardMaterial color={relationColor} emissive={relationColor} emissiveIntensity={reducedMotion ? 0.08 : 0.18} />
        </mesh>
        <mesh position={[0, 0.03, 0.02]}>
          <boxGeometry args={[0.72, 0.025, 0.025]} />
          <meshStandardMaterial color={crossing ? '#ead9ab' : '#5c605a'} emissive={crossing ? '#695323' : '#000000'} emissiveIntensity={crossing ? 0.35 : 0} />
        </mesh>
      </group>

      <mesh position={[0, -2.04, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#070807" roughness={1} />
      </mesh>
    </>
  );
}
