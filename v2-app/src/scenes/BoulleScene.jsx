const CUT_PROFILE=[[-0.46,0.82,0.34,0.18,-0.55],[-0.08,0.55,0.48,0.18,0.36],[0.34,0.28,0.38,0.18,-0.48],[-0.28,-0.08,0.5,0.18,0.42],[0.18,-0.38,0.4,0.18,-0.38],[-0.38,-0.7,0.34,0.18,0.5],[0.16,-0.84,0.46,0.18,-0.3]];

function MaterialField({ side, matching }) {
  const premiere=side==='A';
  const ground=premiere?'#3d2419':'#bf9552';
  const inlay=premiere?'#e2bd72':'#3d2419';
  const mismatch=premiere||matching?0:0.36;
  return <>
    <mesh><boxGeometry args={[2.7,3.7,0.18]}/><meshStandardMaterial color="#15110d" roughness={0.92}/></mesh>
    <group position={[0,0,0.14]}>
      <mesh><boxGeometry args={[2.28,3.08,0.08]}/><meshStandardMaterial color={ground} metalness={premiere?0.08:0.38} roughness={premiere?0.62:0.34}/></mesh>
      {CUT_PROFILE.map(([x,y,w,h,r],index)=>{
        const dx=mismatch*(index%2?1:-1);
        const dy=mismatch*(index%3===0?0.42:-0.22);
        return <mesh key={`${side}-${index}`} name={`RECIPROCAL_CUT_${index}`} position={[x+dx,y+dy,0.075]} rotation={[0,0,r+(mismatch?(index%2?0.28:-0.2):0)]}>
          <boxGeometry args={[w,h,0.055]}/>
          <meshStandardMaterial color={inlay} metalness={premiere?0.58:0.08} roughness={premiere?0.25:0.55} emissive={matching?inlay:'#000000'} emissiveIntensity={matching?0.16:0}/>
        </mesh>;
      })}
      {matching&&<mesh name="RECIPROCAL_REGISTER_RING" position={[0,0,0.045]}><torusGeometry args={[1.16,0.018,8,80]}/><meshStandardMaterial color={premiere?'#d6a958':'#56301d'} emissive={premiere?'#8c5c22':'#35180d'} emissiveIntensity={0.38}/></mesh>}
    </group>
  </>;
}

export function BoulleScene({ separated, matching, reducedMotion }) {
  const gap=0.28;
  return <>
    <color attach="background" args={['#090806']}/><ambientLight intensity={0.82}/><directionalLight position={[2.8,4.8,5]} intensity={2.5} color="#f0dfbc"/><pointLight position={[0,0.5,3]} intensity={matching?1.45:0.62} color="#d6a85e"/>
    <group name="PAIR_MEMBER_A" position={[-1.72-gap,0,0]}><MaterialField side="A" matching={matching}/></group>
    <group name="PAIR_MEMBER_B" position={[1.72+gap,0,0]}><MaterialField side="B" matching={matching}/></group>
    <group name="RELATION" position={[0,0,0.42]}>
      {matching ? <>
        <group name="SHARED_CUT_PROFILE">
          {CUT_PROFILE.slice(1,6).map(([x,y,w,h,r],index)=><mesh key={index} position={[x*0.48,y*0.55,0]} rotation={[0,0,r]}><boxGeometry args={[w*0.52,h*0.8,0.06]}/><meshStandardMaterial color="#ecd090" emissive="#9f6b2c" emissiveIntensity={0.72}/></mesh>)}
        </group>
        <mesh name="CUT_TRANSFER_A" position={[-0.86,0,0]}><boxGeometry args={[0.72,0.035,0.035]}/><meshStandardMaterial color="#e1ba70" emissive="#8e5d22" emissiveIntensity={0.6}/></mesh>
        <mesh name="CUT_TRANSFER_B" position={[0.86,0,0]}><boxGeometry args={[0.72,0.035,0.035]}/><meshStandardMaterial color="#5b321f" emissive="#39180d" emissiveIntensity={0.5}/></mesh>
      </> : <>
        <mesh name="UNRESOLVED_CUT_A" position={[-0.42,0.28,0]} rotation={[0,0,-0.72]}><boxGeometry args={[0.72,0.04,0.04]}/><meshStandardMaterial color="#d7ad63"/></mesh>
        <mesh name="UNRESOLVED_CUT_B" position={[0.42,-0.3,0]} rotation={[0,0,-0.72]}><boxGeometry args={[0.72,0.04,0.04]}/><meshStandardMaterial color="#4d2c1c"/></mesh>
      </>}
    </group>
    <mesh position={[0,-2.04,-0.55]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[10,8]}/><meshStandardMaterial color="#070604" roughness={1}/></mesh>
  </>;
}
