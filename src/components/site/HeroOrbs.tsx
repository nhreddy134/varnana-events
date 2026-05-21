import { motion } from "framer-motion";

/**
 * Cinematic Silk & Light Background
 * Replaces abstract orbs with flowing, textural elements that evoke premium event draping.
 * Uses large, slow-moving gradients and SVG paths to create a "Silk in the Wind" effect.
 */
export function HeroOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F0EDE8]" aria-hidden>
      {/* Film Grain Texture - Adds a high-end editorial feel */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none" 
        style={{ 
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
          filter: "contrast(150%) brightness(100%)"
        }} 
      />

      {/* Large Warm Light Leak - Top Right */}
      <motion.div
        className="absolute"
        style={{
          top: "-10%",
          right: "-5%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, rgba(196,168,130,0.2) 0%, rgba(196,168,130,0.05) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep Burgundy Ambient Glow - Bottom Left */}
      <motion.div
        className="absolute"
        style={{
          bottom: "-15%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(107,26,26,0.1) 0%, rgba(107,26,26,0.02) 50%, transparent 80%)",
          filter: "blur(120px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* "Silk" Flowing Lines - Large, elegant SVG paths */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.12]" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silk-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B1A1A" stopOpacity="0" />
            <stop offset="50%" stopColor="#6B1A1A" stopOpacity="1" />
            <stop offset="100%" stopColor="#6B1A1A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silk-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C4A882" stopOpacity="0" />
            <stop offset="50%" stopColor="#C4A882" stopOpacity="1" />
            <stop offset="100%" stopColor="#C4A882" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary Silk Wave */}
        <motion.path
          d="M-200,400 Q250,100 500,400 T1200,400"
          stroke="url(#silk-grad-1)"
          strokeWidth="0.5"
          fill="none"
          animate={{ 
            d: [
              "M-200,400 Q250,100 500,400 T1200,400",
              "M-200,450 Q250,150 500,450 T1200,450",
              "M-200,400 Q250,100 500,400 T1200,400"
            ] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Secondary Silk Wave */}
        <motion.path
          d="M-200,600 Q300,800 600,600 T1200,600"
          stroke="url(#silk-grad-2)"
          strokeWidth="0.3"
          fill="none"
          animate={{ 
            d: [
              "M-200,600 Q300,800 600,600 T1200,600",
              "M-200,550 Q300,750 600,550 T1200,550",
              "M-200,600 Q300,800 600,600 T1200,600"
            ] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Accent Silk Wave */}
        <motion.path
          d="M-200,200 Q400,400 700,200 T1200,200"
          stroke="url(#silk-grad-2)"
          strokeWidth="0.2"
          fill="none"
          animate={{ 
            d: [
              "M-200,200 Q400,400 700,200 T1200,200",
              "M-200,250 Q400,450 700,250 T1200,250",
              "M-200,200 Q400,400 700,200 T1200,200"
            ] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Soft Center Glow - Focuses the eye on the text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(240,237,232,0.4)_100%)]" />
    </div>
  );
}
