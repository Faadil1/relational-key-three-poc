export function ServiceBeninScene({ contact, matching, reducedMotion }) {
  const progress = Math.max(0, Math.min(1, contact));
  const registered = matching && progress >= 0.72;
  const travel = (reducedMotion ? 0.46 : 0.86) * progress;
  const offsetY = matching ? 0 : 0.34 * progress;
  const glow = registered ? 1 : Math.max(0.08, progress * 0.45);

  const TelephoneCue = ({ muted = false }) => (
    <group name="TELEPHONE_SERVICE_CUE" rotation={[0, 0, -0.58]}>
      <mesh>
        <boxGeometry args={[0.62, 0.11, 0.045]} />
        <meshStandardMaterial color={muted ? '#75684d' : '#8f6f2f'} roughness={0.68} />
      </mesh>
      <mesh position={[-0.27, 0.13, 0]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.18, 0.28, 0.055]} />
        <meshStandardMaterial color={muted ? '#75684d' : '#8f6f2f'} roughness={0.68} />
      </mesh>
      <mesh position={[0.27, -0.13, 0]} rotation={[0, 0, 0.32]}>
        <boxGeometry args={[0.18, 0.28, 0.055]} />
        <meshStandardMaterial color={muted ? '#75684d' : '#8f6f2f'} roughness={0.68} />
      </mesh>
    </group>
  );

  return (
    <>
      <color attach="background" args={['#0d0b08']} />
      <ambientLight intensity={1.05} />
      <directionalLight position={[3.5, 5, 4]} intensity={3.1} color="#f4dba6" />
      <pointLight position={[-3.2, 1.4, 2.6]} intensity={1.5} color="#2c9a67" />

      <group name="PAIR_MEMBER_A" position={[-1.95 + travel, offsetY, 0]} rotation={[0, 0.08, matching ? 0 : -0.035]}>
        <group name="BENIN_TELEPHONE_CARD">
          <mesh>
            <boxGeometry args={[2.6, 3.55, 0.2]} />
            <meshStandardMaterial color="#d7c69d" roughness={0.86} />
          </mesh>
          <mesh position={[0, 1.58, 0.12]}>
            <boxGeometry args={[2.55, 0.09, 0.04]} />
            <meshStandardMaterial color="#1d7b55" roughness={0.6} />
          </mesh>
          <group position={[-0.58, 0.64, 0.155]}>
            <TelephoneCue />
          </group>
          <mesh position={[0.58, 0.46, 0.13]}>
            <boxGeometry args={[0.95, 0.72, 0.05]} />
            <meshStandardMaterial color="#c9a34e" metalness={0.42} roughness={0.5} />
          </mesh>
          {[-0.22, 0.22].flatMap((y) => [-0.28, 0, 0.28].map((x) => (
            <mesh key={`${x}-${y}`} position={[0.58 + x, 0.46 + y, 0.165]}>
              <boxGeometry args={[0.19, 0.17, 0.025]} />
              <meshStandardMaterial color="#ead18a" metalness={0.35} roughness={0.48} />
            </mesh>
          )))}
          <mesh position={[-0.54, -0.55, 0.13]}>
            <boxGeometry args={[1.05, 0.07, 0.04]} />
            <meshStandardMaterial color="#7b6b48" roughness={0.72} />
          </mesh>
          <mesh position={[-0.46, -0.82, 0.13]}>
            <boxGeometry args={[1.22, 0.055, 0.04]} />
            <meshStandardMaterial color="#927e53" roughness={0.72} />
          </mesh>
          <mesh position={[-0.82, -1.18, 0.13]}>
            <boxGeometry args={[0.44, 0.08, 0.04]} />
            <meshStandardMaterial color="#1d7b55" roughness={0.62} />
          </mesh>
          <mesh position={[-0.3, -1.18, 0.13]}>
            <boxGeometry args={[0.34, 0.08, 0.04]} />
            <meshStandardMaterial color="#c9a34e" roughness={0.62} />
          </mesh>
        </group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.95 - travel * 0.58, 0, 0]} rotation={[0, -0.075, 0.018]}>
        <group name="PUBLIPHONE_WINDOW">
          <mesh>
            <boxGeometry args={[2.65, 3.55, 0.24]} />
            <meshStandardMaterial color="#1b1812" roughness={0.78} />
          </mesh>
          <group position={[-0.72, 1.14, 0.17]} scale={0.78}>
            <TelephoneCue muted />
          </group>
          <mesh position={[0, 0.52, 0.15]}>
            <boxGeometry args={[1.8, 1.22, 0.08]} />
            <meshStandardMaterial color="#090907" roughness={0.88} />
          </mesh>
          {[-0.38, 0, 0.38].flatMap((x) => [-0.22, 0.22].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, 0.52 + y, 0.205]}>
              <boxGeometry args={[0.26, 0.22, 0.03]} />
              <meshStandardMaterial color={registered ? '#c9a34e' : '#453a27'} emissive={registered ? '#6b4917' : '#000000'} emissiveIntensity={registered ? 0.65 : 0} />
            </mesh>
          )))}
          <mesh position={[0, -0.92, 0.15]}>
            <boxGeometry args={[1.78, 0.52, 0.07]} />
            <meshStandardMaterial color={registered ? '#255d42' : '#10100d'} emissive={registered ? '#1a633e' : '#000000'} emissiveIntensity={registered ? 0.78 : 0} roughness={0.56} />
          </mesh>
          <mesh position={[0.64, -1.36, 0.15]}>
            <boxGeometry args={[0.24, 0.08, 0.04]} />
            <meshStandardMaterial color={registered ? '#58b17c' : '#484236'} emissive={registered ? '#2d7d50' : '#000000'} emissiveIntensity={registered ? 0.95 : 0} />
          </mesh>
        </group>
      </group>

      <group name="RELATION" position={[0, offsetY * 0.42, 0.42]}>
        <group name="EDITORIAL_CONTACT">
          <mesh>
            <boxGeometry args={[1.0, 0.72, 0.08]} />
            <meshStandardMaterial color="#19150f" transparent opacity={0.9} />
          </mesh>
          {[-0.25, 0, 0.25].flatMap((x) => [-0.16, 0.16].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.08]}>
              <boxGeometry args={[0.16, 0.12, 0.035]} />
              <meshStandardMaterial color={registered ? '#d8b35f' : '#68542f'} emissive={registered ? '#8d641e' : '#000000'} emissiveIntensity={registered ? glow : 0} />
            </mesh>
          )))}
        </group>
        <mesh position={[0, -0.62, 0]} scale={[registered ? 1.22 : 0.82, 1, 1]}>
          <boxGeometry args={[1.2, 0.055, 0.055]} />
          <meshStandardMaterial color={registered ? '#2b9965' : '#6a5d42'} emissive={registered ? '#1b6b43' : '#000000'} emissiveIntensity={registered ? 0.8 : 0} />
        </mesh>
      </group>

      <mesh position={[0, -2.0, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#0a0907" roughness={1} />
      </mesh>
    </>
  );
}
