import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * ScrollEffects - Global scroll effects for the page
 * - Parallax backgrounds
 * - Horizontal marquee (Continuous Loop)
 * - Text reveal on scroll
 * - Progress indicator
 */

/* ============ PARALLAX SECTION ============ */
export function ParallaxSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ============ HORIZONTAL MARQUEE (CONTINUOUS LOOP) ============ */
export function HorizontalMarquee() {
  const text =
    "Weddings · Birthdays · Corporate · Baby Showers · Custom Celebrations · Editorial Events · Destination Events · ";

  return (
    <div className="relative w-full bg-[#F0EDE8] py-16 md:py-24 overflow-hidden border-y border-[#6B1A1A]/5">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="font-serif text-4xl md:text-6xl italic text-[#6B1A1A] flex-shrink-0 px-12 opacity-80"
            >
              {text}
            </div>
          ))}
        </motion.div>
        
        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="font-serif text-4xl md:text-6xl italic text-[#6B1A1A] flex-shrink-0 px-12 opacity-80"
            >
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ============ TEXT REVEAL ON SCROLL ============ */
export function TextReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => {
        const wordProgress = useTransform(
          scrollYProgress,
          [0, 1],
          [0, 1]
        );

        // Stagger each word
        const staggeredProgress = useTransform(
          wordProgress,
          [i / words.length - 0.1, i / words.length + 0.1],
          [0, 1],
          { clamp: true }
        );

        return (
          <motion.span
            key={i}
            className="inline-block mr-[0.25em] overflow-hidden"
            style={{
              opacity: staggeredProgress,
            }}
          >
            <motion.span
              className="inline-block"
              style={{
                y: useTransform(staggeredProgress, [0, 1], [20, 0]),
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        );
      })}
    </div>
  );
}

/* ============ IMAGE SCALE ON SCROLL ============ */
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.06, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale }}>{children}</motion.div>
    </div>
  );
}

/* ============ PROGRESS INDICATOR ============ */
export function ProgressIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed right-0 top-0 w-1 h-full bg-gradient-to-b from-[#6B1A1A] via-[#C4A882] to-[#6B1A1A] z-50 pointer-events-none"
      style={{
        scaleY: scrollYProgress,
        transformOrigin: "top",
      }}
    >
      {/* Gold dot that travels along the line */}
      <motion.div
        className="absolute right-0 w-3 h-3 rounded-full bg-[#C4A882] shadow-lg"
        style={{
          top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
          transform: "translateX(50%)",
        }}
      />
    </motion.div>
  );
}

/* ============ COMBINED SCROLL EFFECTS WRAPPER ============ */
export function ScrollEffectsProvider() {
  return <ProgressIndicator />;
}
