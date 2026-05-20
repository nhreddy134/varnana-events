import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem("varnana_splash_seen");
      if (!seen) {
        setVisible(true);
        sessionStorage.setItem("varnana_splash_seen", "1");

        // The video is roughly 8 seconds long.
        // We'll let it play and then fade out.
        const timer = setTimeout(() => {
          setVisible(false);
        }, 8500); // 8.5 seconds to ensure the final logo is seen

        return () => clearTimeout(timer);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F0EDE8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => setVisible(false)}
            >
              <source src="/splash.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Optional: Subtle overlay to match brand aesthetic */}
            <div className="absolute inset-0 bg-burgundy/5 pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
