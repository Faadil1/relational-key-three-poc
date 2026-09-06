const wavePoints = Array.from({ length: 17 }, (_, index) => {
  const t = index / 16;
  return { t, x: -0.86 + t * 1.72, y: Math.sin(t * Math.PI * 2) * 0.26 };
});

function WaveField({ side, alignment, matching }) {
  const a = side === 'A';
  const deflect = matching ? alignment * 0.42 : -alignment * 0.3;
  return (
    <group name={a ? 'SWELL_MEMORY_FIELD' : 'ATOLL_CONTEXT_FIELD'}>
      {wavePoints.map((point, index) => {
        const nearCenter = 1 - Math.min(1, Math.abs(point.t - 0.5) * 2);
        const bend = a ? point.y : -point.y * 0.55 + deflect * nearCenter;
        return (
          <mesh key={`${side}-${index}`} position={[point.x, bend, 0.12]}>
            <sphereGeometry args={[0.045 + nearCenter * 0.012, 9, 7]} />
            <meshStandardMaterial color={a ? '#74cfe4' : '#e08d69'} emissive={a ? '#244f5a' : '#6b3929'} emissiveIntensity={0.2 + alignment * 0.28} />
          </mesh>
        );
      })}
      {!a && (
        <group name="ATOLL_MARKER" position={[0.02, 0.02, 0.15]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.36, 0.06, 12, 36]} /><meshStandardMaterial color="#d9c9a6" roughness={0.62} /></mesh>
          <mesh position={[0.08, 0.02, 0.04]}><sphereGeometry args={[0.08, 12, 8]} /><meshStandardMaterial color="#b89c67" /></mesh>
        </group>
      )}
    </group>
  );
}

export function SwellScene({ alignment, matching, reducedMotion }) {
  const registered = matching && alignment >= 0.78;
  const cueX = registered ? 0 : 0.32;
  const cueY = registered ? 0 : -0.2;
  return (
    <>
      <color attach="background" args={['#061015']} />
      <ambientLight intensity={0.86} />
      <directionalLight position={[3, 4.8, 4]} intensity={2.35} color="#dff1ee" />
      <pointLight position={[0, 0.4, 3]} intensity={registered ? 1.2 : 0.48} color={registered ? '#7ed5df' : '#d58d6d'} />

      <group name="PAIR_MEMBER_A" position={[-1.72, 0, 0]}>
        <mesh><boxGeometry args={[2.7, 3.7, 0.18]} /><meshStandardMaterial color="#0c171c" roughness={0.94} /></mesh>
        <group position={[0, 0.05, 0.2]}><WaveField side="A" alignment={alignment} matching={matching} /></group>
      </group>

      <group name="PAIR_MEMBER_B" position={[1.72, 0, 0]}>
        <mesh><boxGeometry args={[2.7, 3.7, 0.18]} /><meshStandardMaterial color="#0c171c" roughness={0.94} /></mesh>
        <group position={[0, 0.05, 0.2]}><WaveField side="B" alignment={alignment} matching={matching} /></group>
      </group>

      <group name="RELATION" position={[0, 0.02, 0.44]}>
        <group name="ATOLL_DEFLECTION_INTERSECTION">
          {wavePoints.slice(2, 15).map((point, index) => {
            const t = point.t;
            const nearCenter = 1 - Math.min(1, Math.abs(t - 0.5) * 2);
            const y = Math.sin(t * Math.PI * 2) * 0.13 + (matching ? alignment * 0.18 * nearCenter : -alignment * 0.18 * nearCenter);
            return (
              <mesh key={index} position={[-0.78 + index * 0.13, y, 0]}>
                <sphereGeometry args={[0.035, 8, 6]} />
                <meshStandardMaterial color={matching ? '#8edce4' : '#dc9172'} transparent opacity={0.36 + alignment * 0.58} />
              </mesh>
            );
          })}
          <mesh position={[cueX, cueY, 0.08]}>
            <octahedronGeometry args={[registered ? 0.16 : 0.1, 0]} />
            <meshStandardMaterial color={registered ? '#eef0da' : '#df9a79'} emissive={registered ? '#7bcdd6' : '#733c2d'} emissiveIntensity={registered ? 0.7 : 0.32} />
          </mesh>
          <mesh position={[0, 0, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.28, 0.025, 8, 32]} />
            <meshStandardMaterial color="#c9b78e" transparent opacity={0.28 + alignment * 0.34} />
          </mesh>
        </group>
      </group>

      <mesh position={[0, -2.04, -0.55]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[10, 8]} /><meshStandardMaterial color="#05090c" roughness={1} /></mesh>
    </>
  );
}
