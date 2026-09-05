import { useMemo, useRef } from 'react';

const DEG = Math.PI / 180;

const PATTERNS = {
  A: [
    { angle: 18, tooth: 0 }, { angle: 52, tooth: 2 }, { angle: 88, tooth: 4 },
    { angle: 126, tooth: 1 }, { angle: 164, tooth: 5 }, { angle: 206, tooth: 3 },
    { angle: 250, tooth: 0 }, { angle: 294, tooth: 4 }, { angle: 332, tooth: 2 },
  ],
  B: [
    { angle: 28, tooth: 5 }, { angle: 68, tooth: 3 }, { angle: 110, tooth: 1 },
    { angle: 154, tooth: 4 }, { angle: 198, tooth: 2 }, { angle: 242, tooth: 0 },
    { angle: 286, tooth: 3 }, { angle: 326, tooth: 1 },
  ],
};

function angularDistance(a, b) {
  const raw = Math.abs(((a - b + 180) % 360) - 180);
  return Math.abs(raw);
}

function Cylinder({ angle, pattern, engaged, onPointerDown, onPointerMove, onPointerUp }) {
  const pins = PATTERNS[pattern];
  return (
    <group
      rotation={[angle * DEG, 0, Math.PI / 2]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <mesh>
        <cylinderGeometry args={[0.63, 0.63, 1.75, 36, 1, false]} />
        <meshStandardMaterial color={engaged ? '#b28754' : '#7e6040'} metalness={0.58} roughness={0.34} />
      </mesh>
      {pins.map((pin, index) => {
        const theta = pin.angle * DEG;
        const x = -0.67 + (pin.tooth / 5) * 1.34;
        return (
          <mesh
            key={`${pattern}-${index}`}
            position={[0.66 * Math.sin(theta), x, 0.66 * Math.cos(theta)]}
          >
            <sphereGeometry args={[0.065, 12, 8]} />
            <meshStandardMaterial color="#ead6ae" metalness={0.45} roughness={0.28} emissive="#5a4221" emissiveIntensity={0.18} />
          </mesh>
        );
      })}
    </group>
  );
}

function Comb({ activeTooth }) {
  return (
    <group>
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[1.75, 0.34, 0.35]} />
        <meshStandardMaterial color="#777570" metalness={0.68} roughness={0.3} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((tooth) => {
        const x = -0.67 + (tooth / 5) * 1.34;
        const height = 0.86 + tooth * 0.07;
        const active = activeTooth === tooth;
        return (
          <mesh key={tooth} position={[x, -0.19 + height / 2, active ? 0.08 : 0]} rotation={[0, 0, active ? -0.11 : 0]}>
            <boxGeometry args={[active ? 0.16 : 0.12, height, 0.15]} />
            <meshStandardMaterial
              color={active ? '#fff0c7' : '#b7b3aa'}
              metalness={0.78}
              roughness={0.22}
              emissive={active ? '#b27a28' : '#000000'}
              emissiveIntensity={active ? 1.15 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function MusicBoxScene({ engaged, angle, setAngle, pattern, reducedMotion }) {
  const dragging = useRef(false);
  const pins = PATTERNS[pattern];
  const normalized = ((angle % 360) + 360) % 360;
  const activePin = useMemo(() => {
    if (!engaged) return null;
    let best = null;
    for (const pin of pins) {
      const distance = angularDistance(normalized, pin.angle);
      if (distance <= 7 && (!best || distance < best.distance)) best = { ...pin, distance };
    }
    return best;
  }, [engaged, normalized, pins]);

  const updateFromPointer = (event) => {
    if (!dragging.current || !event.uv) return;
    setAngle(Math.round(event.uv.x * 360));
  };
  const begin = (event) => {
    dragging.current = true;
    event.stopPropagation();
    updateFromPointer(event);
  };
  const end = () => {
    dragging.current = false;
  };

  const contactColor = activePin ? '#ead2a2' : engaged ? '#af8b59' : '#5a5145';
  const contactY = activePin ? -0.67 + (activePin.tooth / 5) * 1.34 : 0;

  return (
    <>
      <color attach="background" args={['#090907']} />
      <ambientLight intensity={0.84} />
      <directionalLight position={[2.8, 4.6, 4.4]} intensity={2.5} color="#f1e0bf" />
      <pointLight position={[0, 1.2, 3]} intensity={1.0} color={contactColor} />

      <group name="PAIR_MEMBER_A" position={[-1.78, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.68, 3.7, 0.18]} />
          <meshStandardMaterial color="#18150f" roughness={0.95} />
        </mesh>
        <group position={[0, 0.12, engaged ? 0.42 : 0.22]}>
          <Cylinder
            angle={angle}
            pattern={pattern}
            engaged={engaged}
            onPointerDown={begin}
            onPointerMove={updateFromPointer}
            onPointerUp={end}
          />
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.78, 0, 0]}>
        <mesh>
          <boxGeometry args={[2.68, 3.7, 0.18]} />
          <meshStandardMaterial color="#18150f" roughness={0.95} />
        </mesh>
        <group position={[0, 0.08, engaged ? 0.4 : 0.22]}>
          <Comb activeTooth={activePin?.tooth ?? null} />
        </group>
      </group>

      <group name="RELATION" position={[0, 0.08, 0.42]}>
        <mesh>
          <boxGeometry args={[0.82, 0.035, 0.035]} />
          <meshStandardMaterial color={contactColor} emissive={contactColor} emissiveIntensity={activePin ? 0.58 : engaged ? 0.18 : 0.03} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <sphereGeometry args={[activePin ? 0.11 : 0.065, 16, 10]} />
          <meshStandardMaterial color={contactColor} emissive={contactColor} emissiveIntensity={activePin ? 0.75 : 0.1} />
        </mesh>
      </group>

      {activePin && (
        <group name="CONTACT_EVENT_WITNESS" position={[0, contactY, 0.56]}>
          <mesh>
            <boxGeometry args={[3.72, 0.028, 0.028]} />
            <meshStandardMaterial color="#f4ddb0" emissive="#b67b2b" emissiveIntensity={0.95} metalness={0.32} roughness={0.32} />
          </mesh>
          <mesh position={[-1.86, 0, 0]}>
            <sphereGeometry args={[0.075, 14, 10]} />
            <meshStandardMaterial color="#fff0c7" emissive="#b67b2b" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[1.86, 0, 0]}>
            <sphereGeometry args={[0.075, 14, 10]} />
            <meshStandardMaterial color="#fff0c7" emissive="#b67b2b" emissiveIntensity={0.9} />
          </mesh>
        </group>
      )}

      <mesh position={[0, -2.04, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#070706" roughness={1} />
      </mesh>
    </>
  );
}
