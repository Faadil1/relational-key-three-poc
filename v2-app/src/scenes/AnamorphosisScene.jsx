import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

function makeSourceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#e6dfcf';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(430, 330);
  ctx.strokeStyle = '#262621';
  ctx.fillStyle = '#262621';
  ctx.lineWidth = 4;

  for (let i = 0; i < 28; i += 1) {
    const angle = -1.22 + (i / 27) * 2.44;
    const inner = 70 + (i % 3) * 8;
    const outer = 260 + Math.sin(i * 0.7) * 42;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.quadraticCurveTo(
      Math.cos(angle) * (inner + outer) * 0.55,
      Math.sin(angle) * (inner + outer) * 0.34,
      Math.cos(angle) * outer,
      Math.sin(angle) * outer,
    );
    ctx.stroke();
  }

  const label = 'RELATION';
  ctx.font = '800 70px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  [...label].forEach((char, index) => {
    const angle = -1.02 + (index / (label.length - 1)) * 2.04;
    const radius = 205 + Math.sin(index * 1.3) * 38;
    ctx.save();
    ctx.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);
    ctx.rotate(angle + Math.PI / 2);
    ctx.scale(0.56, 1.8);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
  ctx.restore();

  ctx.strokeStyle = '#817866';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(430, 330, 84, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = '700 24px ui-monospace, monospace';
  ctx.fillStyle = '#5d574d';
  ctx.fillText('DISTORTED FIELD', 58, 582);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function makeReflectionTexture(registered) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = registered ? '#151612' : '#514f48';
  ctx.fillStyle = registered ? '#151612' : '#514f48';
  ctx.lineWidth = registered ? 18 : 12;
  ctx.lineCap = 'round';

  if (registered) {
    ctx.beginPath();
    ctx.arc(150, 225, 72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(362, 225, 72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(222, 225);
    ctx.lineTo(290, 225);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(256, 225, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '900 62px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RELATION', 256, 405);
    ctx.font = '700 24px ui-monospace, monospace';
    ctx.fillText('REGISTERED', 256, 465);
  } else {
    const fragments = [
      [82, 155, 180, 155],
      [325, 195, 430, 195],
      [108, 255, 205, 255],
      [305, 300, 405, 300],
    ];
    for (const [x1, y1, x2, y2] of fragments) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(150, 225, 70, 0.25, Math.PI * 1.45);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(362, 225, 70, Math.PI * 0.8, Math.PI * 2.05);
    ctx.stroke();
    ctx.font = '900 52px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RELA', 160, 405);
    ctx.fillText('TION', 348, 455);
    ctx.font = '700 22px ui-monospace, monospace';
    ctx.fillText('OFFSET / UNREGISTERED', 256, 525);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function AnamorphosisScene({ offset, setOffset, reducedMotion }) {
  const dragging = useRef(false);
  const sourceTexture = useMemo(() => makeSourceTexture(), []);
  const registeredTexture = useMemo(() => makeReflectionTexture(true), []);
  const residualTexture = useMemo(() => makeReflectionTexture(false), []);
  const { invalidate } = useThree();
  const registered = Math.abs(offset) <= 0.18;

  useEffect(() => () => {
    sourceTexture.dispose();
    registeredTexture.dispose();
    residualTexture.dispose();
  }, [sourceTexture, registeredTexture, residualTexture]);

  useEffect(() => {
    invalidate();
  }, [offset, registered, reducedMotion, invalidate]);

  const handleMove = (event) => {
    if (!dragging.current) return;
    event.stopPropagation();
    const movement = event.nativeEvent?.movementX ?? 0;
    if (movement !== 0) {
      setOffset((value) => THREE.MathUtils.clamp(value + movement * 0.006, -1, 1));
    }
  };

  return (
    <>
      <color attach="background" args={['#151713']} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[3.5, 5, 5]} intensity={3.2} color="#fff1d0" />
      <pointLight position={[-3, 0.5, 2]} intensity={2.0} color="#c7a86c" />

      <group position={[-1.48, -0.2, -1.2]} rotation={[-Math.PI / 2.55, 0, 0.045]}>
        <mesh>
          <planeGeometry args={[4.45, 3.2]} />
          <meshStandardMaterial map={sourceTexture} roughness={0.88} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -0.055]}>
          <planeGeometry args={[4.62, 3.36]} />
          <meshStandardMaterial color="#5b554b" roughness={1} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[0.92 + offset * 0.72, 0.18, 0.18]} rotation={[0, offset * 0.3, 0]}>
        <mesh
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
          onPointerCancel={() => { dragging.current = false; }}
        >
          <cylinderGeometry args={[0.66, 0.66, 2.75, 72]} />
          <meshStandardMaterial
            color={registered ? '#d8d5ca' : '#77766f'}
            metalness={0.88}
            roughness={registered ? 0.16 : 0.3}
          />
        </mesh>

        <mesh position={[0, 0.02, 0.668]}>
          <planeGeometry args={[0.96, 1.58]} />
          <meshBasicMaterial
            map={registered ? registeredTexture : residualTexture}
            transparent
            alphaTest={0.04}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0, 0, 0.7]}>
          <torusGeometry args={[0.82, 0.025, 12, 64]} />
          <meshBasicMaterial color={registered ? '#d5b873' : '#6b6559'} transparent opacity={registered ? 0.92 : 0.45} />
        </mesh>

        <mesh position={[0, -1.43, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.11, 48]} />
          <meshStandardMaterial color="#0e100e" metalness={0.62} roughness={0.4} />
        </mesh>
      </group>

      <mesh position={[0, -1.72, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 7]} />
        <meshStandardMaterial color="#11130f" roughness={1} />
      </mesh>
    </>
  );
}
