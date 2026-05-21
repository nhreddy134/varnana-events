import { motion } from "framer-motion";

/**
 * High-Impact "Golden Dust & Cinematic Glow" Background
 * Designed to be highly visible and premium, moving away from subtle textures.
 * Uses vibrant gold and burgundy gradients with animated particle fields.
 */
export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F0EDE8]" aria-hidden>
      {/* Base Gradient - Warm Foundation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(240,237,232,1)_0%,rgba(220,210,190,0.3)_100%)]" />

      {/* Large Golden Glow - Top Right */}
      <motion.div
        className="absolute"
        style={{
          top: "-20%",
          right: "-10%",
          width: "80vw",
          height: "80vw",
          background: "radial-gradient(circle, rgba(196,168,130,0.35) 0%, rgba(196,168,130,0.1) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 0.9, 0.7],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vibrant Burgundy Glow - Bottom Left */}
      <motion.div
        className="absolute"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, rgba(107,26,26,0.18) 0%, rgba(107,26,26,0.05) 50%, transparent 80%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center Golden Flare - Directly behind the text */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "50vw",
          height: "40vh",
          background: "radial-gradient(ellipse, rgba(196,168,130,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated "Golden Dust" Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C4A882]"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: 0.3,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -150],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Cinematic Film Grain Overlay - More visible now */}
      <div 
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
          filter: "contrast(180%) brightness(120%)"
        }} 
      />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(107,26,26,0.03)_100%)]" />
    </div>
  );
}
