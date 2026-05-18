import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

function Field() {
  const [count, setCount] = useState(80);
  useEffect(() => setCount(window.innerWidth < 768 ? 50 : 200), []);
  const ref = useRef<THREE.Points>(null!);
  const { positions, base } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1 + Math.random() * 3;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(a) * r;
      base[i * 3] = positions[i * 3];
      base[i * 3 + 1] = positions[i * 3 + 1];
      base[i * 3 + 2] = positions[i * 3 + 2];
    }
    return { positions, base };
  }, [count]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 0.6) * 0.18;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      pos.setX(i, base[i * 3] * pulse);
      pos.setZ(i, base[i * 3 + 2] * pulse);
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#C4A882" size={0.05} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function CTAParticles() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 55 }} className="!absolute inset-0">
      <Suspense fallback={null}>
        <Field />
      </Suspense>
    </Canvas>
  );
}
