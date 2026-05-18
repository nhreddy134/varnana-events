import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EVENTS = [
  { name: "Aanya & Vihaan", year: "2024", color: "#6B1A1A", accent: "#C4A882" },
  { name: "Ritz Gala", year: "2024", color: "#C4A882", accent: "#3D0F0F" },
  { name: "Maya Turns One", year: "2023", color: "#8B5A3C", accent: "#D4B896" },
  { name: "Lumen Launch", year: "2024", color: "#3D0F0F", accent: "#C4A882" },
  { name: "Saanvi's Mehndi", year: "2023", color: "#A0522D", accent: "#F0EDE8" },
  { name: "Atrium Soirée", year: "2024", color: "#5C2018", accent: "#D4B896" },
];

const N = EVENTS.length;
const STEP = 360 / N; // 60 degrees per card

export function GalleryCarousel() {
  const angle = useMotionValue(0); // degrees
  const containerRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ active: boolean; startX: number; startAngle: number }>({
    active: false,
    startX: 0,
    startAngle: 0,
  });
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate slowly
  useEffect(() => {
    if (!autoplay) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      angle.set(angle.get() + dt * 8); // 8 deg/sec
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, angle]);

  const snap = () => {
    const current = angle.get();
    const target = Math.round(current / STEP) * STEP;
    animate(angle, target, { type: "spring", stiffness: 120, damping: 20 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { active: true, startX: e.clientX, startAngle: angle.get() };
    setAutoplay(false);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    angle.set(drag.current.startAngle + dx * 0.35);
  };
  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    snap();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] select-none cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ perspective: "1400px" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Soft floor glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[60%] h-24 rounded-[100%] blur-2xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(196,168,130,0.5), transparent 70%)" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {EVENTS.map((e, i) => (
          <Card key={i} index={i} event={e} angle={angle} />
        ))}
      </div>

      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-burgundy-deep/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-burgundy-deep/80 to-transparent" />
    </div>
  );
}

function Card({
  index,
  event,
  angle,
}: {
  index: number;
  event: (typeof EVENTS)[number];
  angle: ReturnType<typeof useMotionValue<number>>;
}) {
  // Relative angle from front, normalized to [-180, 180]
  const rel = useTransform(angle, (a) => {
    let r = ((index * STEP - a) % 360 + 540) % 360 - 180;
    return r;
  });

  // The card always faces the camera (no tilt). It translates along an arc.
  const RADIUS = 360;
  const x = useTransform(rel, (r) => Math.sin((r * Math.PI) / 180) * RADIUS);
  const z = useTransform(rel, (r) => -Math.abs(Math.cos((r * Math.PI) / 180) - 1) * RADIUS * 0.55);
  const scale = useTransform(rel, (r) => {
    const k = Math.cos((r * Math.PI) / 180); // 1 front, -1 back
    return 0.55 + 0.45 * Math.max(0, k); // 0.55 .. 1
  });
  const opacity = useTransform(rel, (r) => {
    const a = Math.abs(r);
    if (a > 110) return 0;
    return Math.max(0.15, 1 - a / 130);
  });
  const zIndex = useTransform(rel, (r) => 1000 - Math.round(Math.abs(r)));

  return (
    <motion.div
      style={{
        x,
        z,
        scale,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
        position: "absolute",
        willChange: "transform, opacity",
      }}
      className="w-[260px] h-[360px] sm:w-[300px] sm:h-[410px]"
    >
      <div
        className="w-full h-full rounded-md shadow-2xl flex flex-col justify-between p-7 relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${event.color} 0%, ${shade(event.color, -20)} 100%)`,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,168,130,0.25) inset",
        }}
      >
        {/* Decorative gold corner */}
        <div className="flex items-start justify-between">
          <span className="text-[10px] tracking-[0.4em]" style={{ color: event.accent }}>
            ✦ VARNANA
          </span>
          <span className="text-[10px] tracking-[0.3em]" style={{ color: event.accent }}>
            {event.year}
          </span>
        </div>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${event.accent}aa, transparent 70%)`,
          }}
        />

        <div>
          <div className="h-px w-12 mb-4" style={{ background: event.accent }} />
          <h3
            className="font-display text-2xl leading-tight"
            style={{ color: "#F0EDE8" }}
          >
            {event.name}
          </h3>
          <p
            className="mt-2 text-[10px] uppercase tracking-[0.3em]"
            style={{ color: event.accent }}
          >
            Selected Work
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function shade(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + percent));
  const b = Math.max(0, Math.min(255, (num & 0xff) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
