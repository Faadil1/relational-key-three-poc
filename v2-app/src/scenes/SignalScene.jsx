import * as THREE from 'three';

function Beam({ from, to, color, opacity = 1, radius = 0.035 }) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const direction = end.clone().sub(start);
  const length = direction.length();
  const midpoint = start.clone().add(end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize(),
  );

  return (
    <mesh position={midpoint.toArray()} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 10]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} emissive={color} emissiveIntensity={0.45} />
    </mesh>
  );
}

function Dish({ response = false }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[0.54, 0.055, 10, 42, Math.PI * 1.35]} />
        <meshStandardMaterial color={response ? '#62c09c' : '#8c948e'} metalness={0.42} roughness={0.48} />
      </mesh>
      <mesh position={[0, -0.48, 0]}>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#6c746f" />
      </mesh>
      <mesh position={[0.28, 0.18, 0.18]}>
        <sphereGeometry args={[0.09, 14, 10]} />
        <meshStandardMaterial color={response ? '#9be0c4' : '#6f7772'} emissive={response ? '#2e8b69' : '#161a18'} emissiveIntensity={response ? 0.9 : 0.15} />
      </mesh>
    </group>
  );
}

function RepeaterTower({ name, active = false, failed = false }) {
  const accent = failed ? '#b75f56' : active ? '#62c09c' : '#5a6963';
  const glow = failed ? '#6e2723' : active ? '#185f49' : '#0d1210';
  return (
    <group name={`REPEATER_${name}`}>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.12, 1.12, 0.12]} />
        <meshStandardMaterial color={accent} emissive={glow} emissiveIntensity={active || failed ? 0.46 : 0.08} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.12, 12]} />
        <meshStandardMaterial color={accent} emissive={glow} emissiveIntensity={active || failed ? 0.55 : 0.08} />
      </mesh>
      <mesh position={[0.16, 0.22, 0]} rotation={[0, 0, -0.48]}>
        <boxGeometry args={[0.34, 0.055, 0.055]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      <mesh position={[-0.16, 0.02, 0]} rotation={[0, 0, 0.48]}>
        <boxGeometry args={[0.34, 0.055, 0.055]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <boxGeometry args={[0.42, 0.06, 0.18]} />
        <meshStandardMaterial color="#303a36" />
      </mesh>
    </group>
  );
}

export function SignalScene({ alignment, matching, reducedMotion }) {
  const aligned = matching && alignment >= 0.82;
  const relay = [0, 1.52, 0.22];
  const leftFeed = [-1.72, 0.35, 0.28];
  const firstHandoff = [1.18, 0.54, 0.23];
  const localOpacity = reducedMotion ? 0.72 : 0.82;
  const repeaterNames = ['IKORODU', 'OGIDO', 'ALABATA'];
  const repeaterX = [-0.68, 0, 0.68];

  return (
    <>
      <color attach="background" args={['#091010']} />
      <ambientLight intensity={0.78} />
      <directionalLight position={[2.5, 5, 4]} intensity={2.8} color="#e6e2d2" />
      <pointLight position={[0, 1.7, 2]} intensity={1.7} color="#62c09c" />

      <group name="PAIR_MEMBER_A" position={[-1.82, -0.05, 0]} rotation={[0, 0.1, 0]}>
        <mesh>
          <boxGeometry args={[2.72, 3.72, 0.18]} />
          <meshStandardMaterial color="#ddd8c9" roughness={0.96} />
        </mesh>
        <group position={[0.1, 0.1, 0.2]} rotation={[0, 0, -0.16 + (1 - alignment) * 0.42]}>
          <Dish response={aligned} />
        </group>
        <mesh position={[0, -1.36, 0.11]}>
          <boxGeometry args={[1.9, 0.055, 0.035]} />
          <meshStandardMaterial color="#11805b" />
        </mesh>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.82, -0.05, 0]} rotation={[0, -0.1, 0]}>
        <mesh>
          <boxGeometry args={[2.72, 3.72, 0.18]} />
          <meshStandardMaterial color="#172022" roughness={0.86} />
        </mesh>

        <group position={[0, 0.08, 0.18]}>
          {repeaterNames.map((name, index) => (
            <group key={name} position={[repeaterX[index], 0.1 + index * 0.05, 0]}>
              <RepeaterTower
                name={name}
                active={aligned || (!matching && index < 2)}
                failed={!aligned && index === 2}
              />
            </group>
          ))}

          <Beam
            from={[repeaterX[0], 0.58, 0]}
            to={[repeaterX[1], 0.63, 0]}
            color={aligned ? '#62c09c' : '#8e9b95'}
            opacity={aligned ? 0.95 : 0.6}
            radius={0.025}
          />
          <Beam
            from={[repeaterX[1], 0.63, 0]}
            to={[repeaterX[2], 0.68, 0]}
            color={aligned ? '#62c09c' : '#b75f56'}
            opacity={aligned ? 0.95 : 0.32}
            radius={0.025}
          />

          {!aligned && (
            <mesh position={[0.36, 0.66, 0]} rotation={[0, 0, -0.58]}>
              <boxGeometry args={[0.34, 0.055, 0.055]} />
              <meshStandardMaterial color="#bd665d" emissive="#6e2723" emissiveIntensity={0.5} />
            </mesh>
          )}
        </group>
      </group>

      <group name="RELATION">
        <mesh position={relay}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={aligned ? '#c9e6d8' : '#62716b'} emissive={aligned ? '#4ea383' : '#15201c'} emissiveIntensity={aligned ? 1.1 : 0.2} />
        </mesh>
        <Beam from={leftFeed} to={relay} color={aligned ? '#1598ba' : '#607a78'} opacity={aligned ? 0.95 : localOpacity * 0.42} />
        <Beam from={relay} to={firstHandoff} color={aligned ? '#62c09c' : '#8a4a45'} opacity={aligned ? 0.95 : 0.2} />
        {!aligned && (
          <mesh position={[0.82, 0.88, 0.22]} rotation={[0, 0, -0.55]}>
            <boxGeometry args={[0.42, 0.055, 0.055]} />
            <meshStandardMaterial color="#bd665d" emissive="#6e2723" emissiveIntensity={0.45} />
          </mesh>
        )}
      </group>

      <mesh position={[0, -2.02, -0.48]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#070b0b" roughness={1} />
      </mesh>
    </>
  );
}
