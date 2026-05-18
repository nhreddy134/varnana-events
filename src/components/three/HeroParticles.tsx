import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

function useParticleCount() {
  const [n, setN] = useState(80);
  useEffect(() => {
    setN(window.innerWidth < 768 ? 40 : 150);
  }, []);
  return n;
}

function Particles() {
  const count = useParticleCount();
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const { positions, colors, baseY } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const baseY = new Float32Array(count);
    const burgundy = new THREE.Color("#6B1A1A");
    const gold = new THREE.Color("#C4A882");
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      baseY[i] = positions[i * 3 + 1];
      const c = Math.random() > 0.5 ? gold : burgundy;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, baseY };
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, dt) => {
    const geo = ref.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const mx = (mouse.current.x * viewport.width) / 2;
    const my = (mouse.current.y * viewport.height) / 2;
    for (let i = 0; i < count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      y += dt * 0.25;
      if (y > 5) { y = -5; }
      const dx = x - mx, dy = y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 1.5) {
        const f = (1.5 - d2) * 0.04;
        x += dx * f;
        y += dy * f;
      }
      pos.setX(i, x); pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Orbs() {
  const refs = [useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!)];
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    refs.forEach((r, i) => {
      if (r.current) {
        r.current.position.y = Math.sin(t * 0.2 + i) * 0.4 + (i - 1.5) * 1.2;
        r.current.position.x = 3 + Math.cos(t * 0.15 + i) * 0.4;
      }
    });
  });
  const colors = ["#6B1A1A", "#C4A882", "#3D0F0F", "#D4B896"];
  const sizes = [1.4, 0.9, 1.1, 0.7];
  return (
    <>
      {refs.map((r, i) => (
        <mesh key={i} ref={r} position={[3, (i - 1.5) * 1.2, -2]}>
          <sphereGeometry args={[sizes[i], 32, 32]} />
          <meshBasicMaterial color={colors[i]} transparent opacity={0.12} />
        </mesh>
      ))}
    </>
  );
}

export function HeroParticles() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 60 }} className="!absolute inset-0">
      <Suspense fallback={null}>
        <Particles />
        <Orbs />
      </Suspense>
    </Canvas>
  );
}
