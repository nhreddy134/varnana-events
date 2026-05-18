import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

function Ring({ radius, tilt, speed, color }: { radius: number; tilt: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * speed; });
  const dots = useMemo(() => {
    const arr: { x: number; z: number }[] = [];
    const n = 32;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      arr.push({ x: Math.cos(a) * radius, z: Math.sin(a) * radius });
    }
    return arr;
  }, [radius]);
  return (
    <group ref={ref} rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 12, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      {dots.map((d, i) => (
        <mesh key={i} position={[d.x, 0, d.z]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#D4B896" />
        </mesh>
      ))}
    </group>
  );
}

export function OrbitalRings() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1, 5], fov: 55 }} className="!absolute inset-0">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Ring radius={1.8} tilt={[0.4, 0, 0.2]} speed={0.25} color="#C4A882" />
        <Ring radius={2.4} tilt={[-0.5, 0, -0.3]} speed={-0.18} color="#C4A882" />
        <Ring radius={3.0} tilt={[0.2, 0, 0.6]} speed={0.12} color="#C4A882" />
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="#6B1A1A" transparent opacity={0.6} />
        </mesh>
        <Text position={[0, 0, 0.7]} fontSize={0.32} color="#D4B896" anchorX="center" anchorY="middle">
          VARNANA
        </Text>
      </Suspense>
    </Canvas>
  );
}
