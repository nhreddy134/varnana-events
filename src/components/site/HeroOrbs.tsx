import { motion } from "framer-motion";

/**
 * Hero Background — Premium, editorial-style with layered textures, depth, and refined motion.
 * Creates a sophisticated, high-end aesthetic with subtle animations and rich visual layers.
 */
export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F0EDE8]" aria-hidden>
      {/* ===== LAYER 1: Base Gradient Foundation ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0EDE8] via-[#FAF8F5] to-[#EAE4DC]" />

      {/* ===== LAYER 2: Subtle Grain & Texture Overlay ===== */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23000' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px"
        }} 
      />

      {/* ===== LAYER 3: Warm Gold Radiant Glow (Top Right) ===== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          right: "-10%",
          top: "-5%",
          width: "clamp(500px, 60vw, 900px)",
          height: "clamp(500px, 60vw, 900px)",
          background: "radial-gradient(circle, rgba(196,168,130,0.08) 0%, rgba(196,168,130,0.02) 30%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===== LAYER 4: Deep Burgundy Ambient Glow (Bottom Left) ===== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: "-15%",
          bottom: "-10%",
          width: "clamp(600px, 70vw, 1000px)",
          height: "clamp(600px, 70vw, 1000px)",
          background: "radial-gradient(circle, rgba(107,26,26,0.06) 0%, rgba(107,26,26,0.02) 35%, transparent 75%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ===== LAYER 5: Subtle Ivory Accent Glow (Top Left) ===== */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: "5%",
          top: "10%",
          width: "clamp(300px, 35vw, 600px)",
          height: "clamp(300px, 35vw, 600px)",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 40, -50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ===== LAYER 6: Floating Silk Curves - Premium SVG Lines ===== */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.08]" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
        style={{ mixBlendMode: "multiply" }}
      >
        {/* Curved line 1 - Gold accent */}
        <motion.path
          d="M-50,400 Q250,300 500,350 T1050,400"
          stroke="#C4A882"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
          animate={{ 
            d: [
              "M-50,400 Q250,300 500,350 T1050,400",
              "M-50,420 Q250,320 500,370 T1050,420",
              "M-50,400 Q250,300 500,350 T1050,400"
            ] 
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Curved line 2 - Burgundy accent */}
        <motion.path
          d="M-50,600 Q300,500 500,550 T1050,600"
          stroke="#6B1A1A"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
          animate={{ 
            d: [
              "M-50,600 Q300,500 500,550 T1050,600",
              "M-50,630 Q300,530 500,580 T1050,630",
              "M-50,600 Q300,500 500,550 T1050,600"
            ] 
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Curved line 3 - Ivory accent */}
        <motion.path
          d="M-50,250 Q200,150 500,200 T1050,250"
          stroke="#F5F0EB"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
          animate={{ 
            d: [
              "M-50,250 Q200,150 500,200 T1050,250",
              "M-50,270 Q200,170 500,220 T1050,270",
              "M-50,250 Q200,150 500,200 T1050,250"
            ] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* ===== LAYER 7: Floating Dust Particles with Enhanced Motion ===== */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: i % 2 === 0 ? "rgba(196,168,130,0.4)" : "rgba(107,26,26,0.3)",
            boxShadow: i % 2 === 0 
              ? "0 0 8px rgba(196,168,130,0.3)" 
              : "0 0 6px rgba(107,26,26,0.2)",
          }}
          animate={{
            y: [0, -150],
            opacity: [0, 0.6, 0],
            scale: [0, 1.8, 0],
            x: [0, Math.random() * 80 - 40],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* ===== LAYER 8: Subtle Vignette for Depth ===== */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.02) 100%)",
        }}
      />

      {/* ===== LAYER 9: Fine Linen Texture (Subtle) ===== */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cline x1='0' y1='0' x2='100' y2='0' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='10' x2='100' y2='10' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='20' x2='100' y2='20' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='30' x2='100' y2='30' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='40' x2='100' y2='40' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='50' x2='100' y2='50' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='60' x2='100' y2='60' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='70' x2='100' y2='70' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='80' x2='100' y2='80' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3Cline x1='0' y1='90' x2='100' y2='90' stroke='%23000' stroke-width='0.5' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}
