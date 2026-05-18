import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";

const EVENTS = [
  { name: "Aanya & Vihaan", year: "2024", color: "#6B1A1A" },
  { name: "Ritz Gala", year: "2024", color: "#C4A882" },
  { name: "Maya Turns One", year: "2023", color: "#3D0F0F" },
  { name: "Lumen Launch", year: "2024", color: "#8B5A3C" },
  { name: "Saanvi's Mehndi", year: "2023", color: "#A0522D" },
  { name: "Atrium Soirée", year: "2024", color: "#5C2018" },
];

function Carousel({ targetRot }: { targetRot: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  const rot = useRef(0);
  useFrame(() => {
    rot.current += (targetRot.current - rot.current) * 0.08;
    if (group.current) group.current.rotation.y = rot.current;
  });
  const radius = 3.5;
  return (
    <group ref={group}>
      {EVENTS.map((e, i) => {
        const a = (i / EVENTS.length) * Math.PI * 2;
        const x = Math.sin(a) * radius;
        const z = Math.cos(a) * radius;
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, a, 0]}>
            <RoundedBox args={[1.8, 2.4, 0.08]} radius={0.05}>
              <meshStandardMaterial color={e.color} roughness={0.4} />
            </RoundedBox>
            <Text
              position={[0, -1.4, 0.06]}
              fontSize={0.14}
              color="#F0EDE8"
              anchorX="center"
            >
              {e.name.toUpperCase()}
            </Text>
            <Text
              position={[0, -1.6, 0.06]}
              fontSize={0.1}
              color="#C4A882"
              anchorX="center"
            >
              {e.year}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export function GalleryCarousel3D() {
  const targetRot = useRef(0);
  const dragging = useRef(false);
  const last = useRef(0);
  const [auto, setAuto] = useState(true);

  useFrame: void 0;

  return (
    <div
      className="w-full h-[520px] cursor-grab active:cursor-grabbing select-none"
      onPointerDown={(e) => { dragging.current = true; last.current = e.clientX; setAuto(false); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerLeave={() => { dragging.current = false; }}
      onPointerMove={(e) => {
        if (dragging.current) {
          targetRot.current += (e.clientX - last.current) * 0.008;
          last.current = e.clientX;
        }
      }}
    >
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 6.5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <AutoSpin enabled={auto} targetRot={targetRot} />
          <Carousel targetRot={targetRot} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function AutoSpin({ enabled, targetRot }: { enabled: boolean; targetRot: React.MutableRefObject<number> }) {
  useFrame((_, dt) => { if (enabled) targetRot.current += dt * 0.15; });
  return null;
}
