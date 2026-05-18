import { motion } from "framer-motion";

/**
 * Beautifully animated glowing orbs — soft burgundy and gold, semi-transparent
 * with pulsing glow and slow floating drift. Light catching silk.
 */
export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Large burgundy orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "8%",
          top: "18%",
          width: "clamp(220px, 32vw, 480px)",
          height: "clamp(220px, 32vw, 480px)",
          background:
            "radial-gradient(circle at 35% 30%, rgba(196,168,130,0.55) 0%, rgba(107,26,26,0.45) 35%, rgba(107,26,26,0.18) 60%, rgba(107,26,26,0) 75%)",
          filter: "blur(8px)",
          mixBlendMode: "multiply",
          willChange: "transform, opacity",
        }}
        animate={{
          x: [0, 24, -18, 0],
          y: [0, -28, 16, 0],
          scale: [1, 1.06, 0.97, 1],
          opacity: [0.85, 1, 0.8, 0.85],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Smaller gold orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "22%",
          top: "48%",
          width: "clamp(160px, 22vw, 340px)",
          height: "clamp(160px, 22vw, 340px)",
          background:
            "radial-gradient(circle at 40% 35%, rgba(212,184,150,0.7) 0%, rgba(196,168,130,0.5) 35%, rgba(196,168,130,0.15) 65%, rgba(196,168,130,0) 80%)",
          filter: "blur(10px)",
          mixBlendMode: "multiply",
          willChange: "transform, opacity",
        }}
        animate={{
          x: [0, -22, 18, 0],
          y: [0, 24, -16, 0],
          scale: [1, 1.08, 0.95, 1],
          opacity: [0.8, 1, 0.75, 0.8],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      {/* Tiny accent highlight */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "14%",
          top: "30%",
          width: "120px",
          height: "120px",
          background:
            "radial-gradient(circle, rgba(255,240,210,0.55) 0%, rgba(212,184,150,0) 70%)",
          filter: "blur(6px)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
