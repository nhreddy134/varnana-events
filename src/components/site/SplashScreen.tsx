import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const VARNANA = "VARNANA".split("");
const EVENTS = "EVENTS".split("");

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem("varnana_splash_seen");
      if (!seen) {
        setVisible(true);
        sessionStorage.setItem("varnana_splash_seen", "1");
        // Total ~4.5s
        const t = setTimeout(() => setVisible(false), 4500);
        return () => clearTimeout(t);
      }
    } catch {
      // sessionStorage unavailable — skip splash
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#F0EDE8" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center px-8"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1, 1.05], opacity: [1, 1, 0] }}
            transition={{
              duration: 4.5,
              times: [0, 0.82, 1],
              ease: "easeInOut",
            }}
          >
            {/* Botanical arch SVG */}
            <motion.svg
              viewBox="0 0 280 110"
              className="w-[clamp(220px,55vw,420px)] h-auto"
              fill="none"
              stroke="#C4A882"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              {/* Arch */}
              <motion.path
                d="M 30 100 C 30 30, 250 30, 250 100"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
              />
              {/* Left sprig */}
              <motion.path
                d="M 60 60 Q 50 50 45 40 M 60 60 Q 70 55 75 50 M 60 60 Q 55 70 50 75"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
              />
              {/* Right sprig */}
              <motion.path
                d="M 220 60 Q 230 50 235 40 M 220 60 Q 210 55 205 50 M 220 60 Q 225 70 230 75"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
              />
              {/* Center tulip */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.0, type: "spring", stiffness: 90, damping: 14 }}
                style={{ transformOrigin: "140px 45px" }}
              >
                <path d="M 140 50 Q 134 40 140 32 Q 146 40 140 50 Z" fill="#C4A882" stroke="none" />
                <path d="M 135 48 Q 130 38 135 30 M 145 48 Q 150 38 145 30" />
              </motion.g>
              {/* Side leaves bloom */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.1, type: "spring", stiffness: 90, damping: 14 }}
                style={{ transformOrigin: "100px 55px" }}
              >
                <path d="M 95 55 Q 100 48 108 52 Q 103 58 95 55 Z" fill="#C4A882" stroke="none" opacity="0.7" />
              </motion.g>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.15, type: "spring", stiffness: 90, damping: 14 }}
                style={{ transformOrigin: "180px 55px" }}
              >
                <path d="M 185 55 Q 180 48 172 52 Q 177 58 185 55 Z" fill="#C4A882" stroke="none" opacity="0.7" />
              </motion.g>
            </motion.svg>

            {/* VARNANA */}
            <div className="mt-6 flex" style={{ perspective: "600px" }}>
              {VARNANA.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display inline-block"
                  style={{
                    color: "#6B1A1A",
                    fontSize: "clamp(2.8rem, 9vw, 6rem)",
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                  }}
                  initial={{ y: -120, opacity: 0, rotate: -12 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 1.6 + i * 0.08,
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* EVENTS */}
            <div className="mt-2 flex" style={{ perspective: "600px" }}>
              {EVENTS.map((ch, i) => (
                <motion.span
                  key={i}
                  className="font-display italic inline-block"
                  style={{
                    color: "#6B1A1A",
                    fontSize: "clamp(1rem, 2.6vw, 1.6rem)",
                    letterSpacing: "0.5em",
                  }}
                  initial={{ y: 60, opacity: 0, rotate: 8 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 2.4 + i * 0.06,
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Breathing pulse on full mark */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: [0, 0, 0.3, 0] }}
              transition={{ delay: 3.4, duration: 1, times: [0, 0.2, 0.6, 1] }}
              style={{
                background: "radial-gradient(circle, rgba(196,168,130,0.25), transparent 60%)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
