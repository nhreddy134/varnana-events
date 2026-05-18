import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const VARNANA = "VARNANA".split("");
const EVENTS = "EVENTS".split("");

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<"blank" | "circle" | "logo" | "breathe" | "exit">("blank");

  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem("varnana_splash_seen");
      if (!seen) {
        setVisible(true);
        sessionStorage.setItem("varnana_splash_seen", "1");

        // Timeline:
        // 0–0.4s: blank ivory screen
        // 0.4–1.2s: circle draws + V appears
        // 1.2–2.2s: circle expands, letters drop/rise
        // 2.2–3.0s: botanical details grow
        // 3.0–3.6s: logo breathes
        // 3.6–5.0s: fade out
        // Total: ~5 seconds

        const timings = [
          { delay: 0, stage: "circle" as const },
          { delay: 1200, stage: "logo" as const },
          { delay: 2200, stage: "breathe" as const },
          { delay: 3600, stage: "exit" as const },
        ];

        const timeouts = timings.map((t) =>
          setTimeout(() => setStage(t.stage), t.delay)
        );

        const exitTimeout = setTimeout(() => setVisible(false), 5000);

        return () => {
          timeouts.forEach(clearTimeout);
          clearTimeout(exitTimeout);
        };
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
            className="flex flex-col items-center px-8 relative"
            initial={{ scale: 1, opacity: 1 }}
            animate={stage === "exit" ? { scale: 1.05, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{
              duration: stage === "exit" ? 1.4 : 0.6,
              ease: "easeInOut",
            }}
          >
            {/* ============ CIRCLE DRAWING ============ */}
            {(stage === "circle" || stage === "logo" || stage === "breathe" || stage === "exit") && (
              <motion.svg
                viewBox="0 0 200 200"
                className="w-48 h-48 mb-8"
                fill="none"
                stroke="#C4A882"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              >
                {/* Circle draws itself */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: stage === "circle" || stage === "logo" || stage === "breathe" || stage === "exit" ? 1 : 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                />
              </motion.svg>
            )}

            {/* ============ "V" INSIDE CIRCLE ============ */}
            {(stage === "circle" || stage === "logo" || stage === "breathe" || stage === "exit") && (
              <motion.div
                className="absolute font-display text-7xl md:text-8xl text-burgundy"
                initial={{ scale: 0, opacity: 0 }}
                animate={stage === "circle" || stage === "logo" || stage === "breathe" || stage === "exit" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  delay: 1.0,
                  type: "spring",
                  stiffness: 70,
                  damping: 14,
                }}
              >
                V
              </motion.div>
            )}

            {/* ============ VARNANA LETTERS DROP FROM ABOVE ============ */}
            {(stage === "logo" || stage === "breathe" || stage === "exit") && (
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
                    initial={{ y: -120, opacity: 0, rotate: -15 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      delay: 1.2 + i * 0.07,
                      type: "spring",
                      stiffness: 60,
                      damping: 15,
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            )}

            {/* ============ EVENTS LETTERS RISE FROM BELOW ============ */}
            {(stage === "logo" || stage === "breathe" || stage === "exit") && (
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
                      delay: 1.2 + i * 0.05,
                      type: "spring",
                      stiffness: 60,
                      damping: 15,
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            )}

            {/* ============ BOTANICAL DETAILS GROW OUTWARD ============ */}
            {(stage === "breathe" || stage === "exit") && (
              <motion.svg
                viewBox="0 0 300 300"
                className="absolute w-64 h-64 pointer-events-none"
                fill="none"
                stroke="#C4A882"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.4 }}
              >
                {/* Left leaf */}
                <motion.path
                  d="M 100 150 Q 80 140 70 120"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ transformOrigin: "100px 150px" }}
                  transition={{ delay: 2.2, type: "spring", stiffness: 80, damping: 12 }}
                />
                {/* Right leaf */}
                <motion.path
                  d="M 200 150 Q 220 140 230 120"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ transformOrigin: "200px 150px" }}
                  transition={{ delay: 2.25, type: "spring", stiffness: 80, damping: 12 }}
                />
                {/* Top tulip */}
                <motion.path
                  d="M 150 100 Q 140 80 150 60 Q 160 80 150 100 Z"
                  fill="#C4A882"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ transformOrigin: "150px 100px" }}
                  transition={{ delay: 2.3, type: "spring", stiffness: 80, damping: 12 }}
                />
              </motion.svg>
            )}

            {/* ============ BREATHING PULSE ============ */
            {(stage === "breathe" || stage === "exit") && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  delay: 3.0,
                  duration: 0.6,
                  times: [0, 0.5, 1],
                }}
                style={{
                  background: "radial-gradient(circle, rgba(196,168,130,0.15), transparent 70%)",
                }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
