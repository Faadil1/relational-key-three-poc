const pieces = [
  { x: -0.48, y: 0.55, r: 0.78 }, { x: 0.05, y: 0.62, r: -0.78 }, { x: 0.5, y: 0.28, r: 0.78 },
  { x: -0.54, y: 0.03, r: -0.78 }, { x: -0.02, y: 0.04, r: 0.78 }, { x: 0.52, y: -0.08, r: -0.78 },
  { x: -0.45, y: -0.52, r: 0.78 }, { x: 0.08, y: -0.58, r: -0.78 }, { x: 0.48, y: -0.48, r: 0.78 },
];

function TileField({ side, fit, matching }) {
  const a = side === 'A';
  const seamShift = (1 - fit) * (a ? -0.28 : 0.28) + (!matching ? (a ? -0.1 : 0.1) : 0);
  return (
    <group name={a ? 'MATERIAL_EDGE_A' : 'MATERIAL_EDGE_B'} position={[seamShift, 0, 0.12]}>
      {pieces.map((piece, index) => {
        const edge = a ? piece.x < 0.2 : piece.x > -0.2;
        const x = a ? piece.x - 0.12 : piece.x + 0.12;
        const z = edge ? 0.08 + fit * 0.06 : 0.05;
        return (
          <mesh key={`${side}-${index}`} position={[x, piece.y, z]} rotation={[0, 0, piece.r * (a ? 1 : -1)]}>
            <boxGeometry args={[0.42, 0.42, 0.12]} />
            <meshStandardMaterial color={(index + (a ? 0 : 1)) % 3 === 0 ? '#2d6b6a' : (index % 2 ? '#c6a454' : '#e4ddd0')} roughness={0.5} metalness={0.04} />
          </mesh>
        );
      })}
      <mesh position={[a ? 0.82 : -0.82, 0, 0.1]}>
        <boxGeometry args={[0.25, 2.15, 0.13]} />
        <meshStandardMaterial color={matching && fit > 0.8 ? '#b88b4b' : '#80644b'} emissive={matching && fit > 0.8 ? '#5f431e' : '#000'} emissiveIntensity={matching && fit > 0.8 ? 0.28 : 0} />
      </mesh>
    </group>
  );
}

export function ZelligeScene({ fit, matching, reducedMotion }) {
  const seated = matching && fit >= 0.82;
  const gap = 0.23 + (1 - fit) * 0.3;
  return (
    <>
      <color attach="background" args={['#090907']} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[2.8, 4.6, 4.2]} intensity={2.55} color="#efe5d2" />
      <pointLight position={[0, 0.3, 3]} intensity={seated ? 1.2 : 0.45} color="#caa25c" />

      <group name="PAIR_MEMBER_A" position={[-1.72 - gap, 0, 0]}>
        <mesh><boxGeometry args={[2.7, 3.7, 0.18]} /><meshStandardMaterial color="#171611" roughness={0.95} /></mesh>
        <TileField side="A" fit={fit} matching={matching} />
      </group>
      <group name="PAIR_MEMBER_B" position={[1.72 + gap, 0, 0]}>
        <mesh><boxGeometry args={[2.7, 3.7, 0.18]} /><meshStandardMaterial color="#171611" roughness={0.95} /></mesh>
        <TileField side="B" fit={fit} matching={matching} />
      </group>

      <group name="RELATION" position={[0, 0, 0.45]}>
        <group name="GEOMETRIC_FIT_JOINT">
          <mesh position={[0, 0, 0]} scale={[0.12 + fit * 0.16, 1.25, 0.08]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={seated ? '#d5b56d' : '#7e715d'} transparent opacity={0.32 + fit * 0.48} emissive={seated ? '#72501f' : '#000'} emissiveIntensity={seated ? 0.45 : 0} />
          </mesh>
          {seated && [-0.72, -0.24, 0.24, 0.72].map((y, index) => (
            <mesh key={y} position={[0, y, 0.08]} rotation={[0, 0, index % 2 ? Math.PI / 4 : -Math.PI / 4]}>
              <boxGeometry args={[0.28, 0.28, 0.12]} />
              <meshStandardMaterial color={index % 2 ? '#2d6b6a' : '#e2d9c8'} emissive="#5b4a2b" emissiveIntensity={0.12} />
            </mesh>
          ))}
          {!matching && fit > 0.5 && (
            <mesh position={[0.12, 0.25, 0.1]} rotation={[0, 0, 0.28]}>
              <boxGeometry args={[0.22, 0.7, 0.12]} />
              <meshStandardMaterial color="#a4614d" emissive="#56251d" emissiveIntensity={0.22} />
            </mesh>
          )}
        </group>
      </group>

      <mesh position={[0, -2.04, -0.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 8]} /><meshStandardMaterial color="#070604" roughness={1} /></mesh>
    </>
  );
}
