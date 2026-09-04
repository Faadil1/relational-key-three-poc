import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

function makeAnamorphicStudyTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e8e2d6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 + 36);
  ctx.strokeStyle = '#201f1c';
  ctx.fillStyle = '#201f1c';
  ctx.lineWidth = 4;

  // Purpose-built radial distortion study: not an archival image.
  for (let i = 0; i < 22; i += 1) {
    const a = -1.15 + (i / 21) * 2.3;
    const inner = 92;
    const outer = 228 + Math.sin(i * 0.9) * 22;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
    ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
    ctx.stroke();
  }

  ctx.font = '700 62px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const label = 'RELATION';
  [...label].forEach((char, index) => {
    const a = -0.9 + (index / Math.max(1, label.length - 1)) * 1.8;
    const r = 178 + Math.sin(index * 0.8) * 32;
    ctx.save();
    ctx.translate(Math.cos(a) * r, Math.sin(a) * r);
    ctx.rotate(a + Math.PI / 2);
    ctx.scale(0.7, 1.55);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function AnamorphosisScene({ offset, setOffset, reducedMotion }) {
  const mirrorRef = useRef(null);
  const dragging = useRef(false);
  const fieldTexture = useMemo(() => makeAnamorphicStudyTexture(), []);
  const cubeTarget = useMemo(
    () => new THREE.WebGLCubeRenderTarget(reducedMotion ? 128 : 256, {
      type: THREE.HalfFloatType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    }),
    [reducedMotion],
  );
  const cubeCamera = useMemo(() => new THREE.CubeCamera(0.1, 30, cubeTarget), [cubeTarget]);
  const { gl, scene, invalidate } = useThree();
  const dirty = useRef(true);

  useEffect(() => {
    scene.add(cubeCamera);
    return () => {
      scene.remove(cubeCamera);
      cubeTarget.dispose();
      fieldTexture.dispose();
    };
  }, [cubeCamera, cubeTarget, fieldTexture, scene]);

  useEffect(() => {
    dirty.current = true;
    invalidate();
  }, [offset, invalidate]);

  useFrame(() => {
    if (!dirty.current || !mirrorRef.current) return;
    const mirror = mirrorRef.current;
    mirror.visible = false;
    cubeCamera.position.copy(mirror.position);
    cubeCamera.update(gl, scene);
    mirror.visible = true;
    dirty.current = false;
  });

  const handleMove = (event) => {
    if (!dragging.current) return;
    event.stopPropagation();
    const movement = event.nativeEvent?.movementX ?? 0;
    if (movement !== 0) {
      setOffset((value) => THREE.MathUtils.clamp(value + movement * 0.006, -1, 1));
    }
  };

  const registered = Math.abs(offset) <= 0.18;

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, -1, 2]} intensity={1.4} />

      <group position={[-1.35, -0.15, -1.35]} rotation={[-Math.PI / 2.6, 0, 0.03]}>
        <mesh>
          <planeGeometry args={[4.2, 3]} />
          <meshStandardMaterial map={fieldTexture} roughness={0.82} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -0.035]}>
          <planeGeometry args={[4.3, 3.1]} />
          <meshStandardMaterial color="#8d887f" roughness={1} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[0.75 + offset * 0.65, 0.15, 0.15]} rotation={[0, offset * 0.34, 0]}>
        <mesh
          ref={mirrorRef}
          onPointerDown={(event) => {
            dragging.current = true;
            event.stopPropagation();
            event.target.setPointerCapture?.(event.pointerId);
          }}
          onPointerMove={handleMove}
          onPointerUp={(event) => {
            dragging.current = false;
            event.target.releasePointerCapture?.(event.pointerId);
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          <cylinderGeometry args={[0.62, 0.62, 2.65, 72]} />
          <meshStandardMaterial
            color={registered ? '#f3f3ef' : '#b8b7b0'}
            metalness={1}
            roughness={0.04}
            envMap={cubeTarget.texture}
            envMapIntensity={1.25}
          />
        </mesh>
        <mesh position={[0, -1.38, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.1, 48]} />
          <meshStandardMaterial color="#222321" roughness={0.7} />
        </mesh>
      </group>

      <mesh position={[0, -1.65, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#d5d1c8" roughness={1} />
      </mesh>
    </>
  );
}
