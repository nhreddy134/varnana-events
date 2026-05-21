import { motion } from "framer-motion";

/**
 * Hero Background — Cinematic, layered, and rich with energy orbs.
 */
export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F0EDE8]" aria-hidden>
      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} />

      {/* Main Cinematic Gradient - Warm Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,168,130,0.15)_0%,transparent_50%)]" />

      {/* Large Burgundy Ambient Glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "-5%",
          top: "10%",
          width: "clamp(400px, 50vw, 800px)",
          height: "clamp(400px, 50vw, 800px)",
          background: "radial-gradient(circle, rgba(107,26,26,0.08) 0%, rgba(107,26,26,0.03) 40%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Gold Floating Orb 1 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: "10%",
          top: "20%",
          width: "clamp(200px, 25vw, 400px)",
          height: "clamp(200px, 25vw, 400px)",
          background: "radial-gradient(circle, rgba(196,168,130,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
      />

      {/* Floating "Silk" Lines - Decorative SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M-100,500 C200,400 400,600 1100,500"
          stroke="#6B1A1A"
          strokeWidth="0.5"
          fill="none"
          animate={{ d: ["M-100,500 C200,400 400,600 1100,500", "M-100,550 C250,450 450,650 1100,550", "M-100,500 C200,400 400,600 1100,500"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M-100,300 C300,200 500,400 1100,300"
          stroke="#C4A882"
          strokeWidth="0.5"
          fill="none"
          animate={{ d: ["M-100,300 C300,200 500,400 1100,300", "M-100,350 C350,250 550,450 1100,350", "M-100,300 C300,200 500,400 1100,300"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* Small Accent Dust Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
