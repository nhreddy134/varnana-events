import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * StoryUnfoldsMobile - Simplified scroll-driven section for mobile
 * Same 5-moment structure, reduced complexity for better performance
 */
export function StoryUnfoldsMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Simpler segments for mobile
  const moment1Progress = useTransform(scrollYProgress, [0, 0.2], [0, 1], {
    clamp: true,
  });
  const moment2Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1], {
    clamp: true,
  });
  const moment3Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1], {
    clamp: true,
  });
  const moment4Progress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1], {
    clamp: true,
  });
  const moment5Progress = useTransform(scrollYProgress, [0.8, 1], [0, 1], {
    clamp: true,
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "350vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <MobileMoment1 progress={moment1Progress} />
        <MobileMoment2 progress={moment2Progress} />
        <MobileMoment3 progress={moment3Progress} />
        <MobileMoment4 progress={moment4Progress} />
        <MobileMoment5 progress={moment5Progress} />
      </div>
    </div>
  );
}

/* ============ MOMENT 1: 0–20% ============ */
function MobileMoment1({ progress }: { progress: any }) {
  const textOpacity = useTransform(progress, [0.3, 0.8], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-burgundy-deep"
    >
      {/* Simplified tulip SVG */}
      <motion.svg
        viewBox="0 0 200 300"
        className="w-24 h-auto mb-8"
        fill="none"
        stroke="#C4A882"
        strokeWidth="2"
      >
        <motion.path
          d="M 100 200 Q 98 150 100 100"
          style={{ pathLength: progress }}
        />
        <motion.path
          d="M 100 100 Q 85 80 90 50"
          style={{ pathLength: progress }}
        />
        <motion.path
          d="M 100 100 Q 100 70 100 40"
          style={{ pathLength: progress }}
        />
        <motion.path
          d="M 100 100 Q 115 80 110 50"
          style={{ pathLength: progress }}
        />
      </motion.svg>

      <motion.h2
        className="font-display text-2xl text-ivory text-center max-w-xs px-4"
        style={{ opacity: textOpacity }}
      >
        Every event begins with a single thought.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 2: 20–40% ============ */
function MobileMoment2({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 1], [
    "rgb(61, 15, 15)",
    "rgb(240, 237, 232)",
  ]);

  const textOpacity = useTransform(progress, [0.2, 0.7], [0, 1]);
  const textColor = useTransform(progress, [0, 0.5, 1], [
    "rgb(240, 237, 232)",
    "rgb(240, 237, 232)",
    "rgb(107, 26, 26)",
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Tulip petals scale */}
      <motion.svg
        viewBox="0 0 200 300"
        className="w-24 h-auto mb-8"
        fill="none"
        stroke="#C4A882"
        strokeWidth="2"
      >
        <path d="M 100 200 Q 98 150 100 100" />
        <motion.path
          d="M 100 100 Q 85 80 90 50"
          style={{ scale: useTransform(progress, [0, 1], [1, 1.3]) }}
        />
        <motion.path
          d="M 100 100 Q 100 70 100 40"
          style={{ scale: useTransform(progress, [0, 1], [1, 1.3]) }}
        />
        <motion.path
          d="M 100 100 Q 115 80 110 50"
          style={{ scale: useTransform(progress, [0, 1], [1, 1.3]) }}
        />
      </motion.svg>

      <motion.h2
        className="font-display text-2xl text-center max-w-xs px-4"
        style={{
          opacity: textOpacity,
          color: textColor,
        }}
      >
        A feeling you can't quite name yet.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 3: 40–60% ============ */
function MobileMoment3({ progress }: { progress: any }) {
  // Simplified 2×2 grid for mobile
  const cardColors = [
    "rgba(196, 168, 130, 0.3)",
    "rgba(196, 168, 130, 0.2)",
    "rgba(196, 168, 130, 0.25)",
    "rgba(196, 168, 130, 0.35)",
  ];

  const textOpacity = useTransform(progress, [0.2, 0.8], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
    >
      {/* 2×2 Grid of cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs px-4">
        {cardColors.map((color, i) => {
          const randomX = (Math.random() - 0.5) * 250;
          const randomY = (Math.random() - 0.5) * 250;

          const cardX = useTransform(progress, [0, 1], [randomX, 0]);
          const cardY = useTransform(progress, [0, 1], [randomY, 0]);
          const cardOpacity = useTransform(progress, [0, 0.3, 1], [0, 0.3, 1]);

          return (
            <motion.div
              key={i}
              className="aspect-square rounded-lg"
              style={{
                backgroundColor: color,
                x: cardX,
                y: cardY,
                opacity: cardOpacity,
              }}
            />
          );
        })}
      </div>

      <motion.h2
        className="font-display text-xl text-burgundy text-center max-w-xs px-4 mt-8"
        style={{
          opacity: textOpacity,
        }}
      >
        We find it. We shape it. We make it real.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 4: 60–80% ============ */
function MobileMoment4({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 0.5, 1], [
    "rgb(240, 237, 232)",
    "rgb(61, 15, 15)",
    "rgb(20, 20, 20)",
  ]);

  const cardScale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const glowIntensity = useTransform(progress, [0, 0.5, 1], [
    "inset 0 0 0 0 rgba(196,168,130,0)",
    "inset 0 0 30px rgba(196,168,130,0.3)",
    "inset 0 0 60px rgba(196,168,130,0.6)",
  ]);

  const textOpacity = useTransform(progress, [0.4, 1], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="w-40 h-40 rounded-2xl bg-burgundy flex items-center justify-center shadow-2xl relative"
        style={{
          scale: cardScale,
        }}
      >
        <motion.div
          className="font-display text-6xl text-gold relative z-10"
          style={{
            opacity: useTransform(progress, [0, 0.2, 1], [0, 1, 1]),
            scale: useTransform(progress, [0, 0.2, 1], [0.5, 1, 1]),
          }}
        >
          V
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: glowIntensity,
          }}
        />
      </motion.div>

      <motion.h2
        className="font-display text-lg text-ivory text-center max-w-xs px-4 absolute bottom-16"
        style={{
          opacity: textOpacity,
        }}
      >
        Then we build something that lasts forever.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 5: 80–100% ============ */
function MobileMoment5({ progress }: { progress: any }) {
  const bgOpacity = useTransform(progress, [0, 0.2, 1], [0, 0.5, 1]);
  const headlineOpacity = useTransform(progress, [0, 0.3, 1], [0, 0.5, 1]);
  const ctasOpacity = useTransform(progress, [0.4, 0.8], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
      style={{
        opacity: bgOpacity,
      }}
    >
      <motion.h2
        className="font-display text-2xl text-burgundy text-center max-w-xs px-4"
        style={{
          opacity: headlineOpacity,
        }}
      >
        <motion.span
          className="inline-block mr-2"
          style={{
            opacity: useTransform(progress, [0, 0.15], [0, 1]),
            y: useTransform(progress, [0, 0.15], [20, 0]),
          }}
        >
          This
        </motion.span>
        <motion.span
          className="inline-block mr-2"
          style={{
            opacity: useTransform(progress, [0.1, 0.25], [0, 1]),
            y: useTransform(progress, [0.1, 0.25], [20, 0]),
          }}
        >
          is
        </motion.span>
        <motion.span
          className="inline-block mr-2"
          style={{
            opacity: useTransform(progress, [0.2, 0.35], [0, 1]),
            y: useTransform(progress, [0.2, 0.35], [20, 0]),
          }}
        >
          what
        </motion.span>
        <motion.span
          className="inline-block"
          style={{
            opacity: useTransform(progress, [0.3, 0.45], [0, 1]),
            y: useTransform(progress, [0.3, 0.45], [20, 0]),
          }}
        >
          we do.
        </motion.span>
      </motion.h2>

      <motion.div
        className="flex flex-col items-center justify-center gap-3 mt-8"
        style={{
          opacity: ctasOpacity,
        }}
      >
        <motion.button
          className="px-6 py-3 rounded-full bg-burgundy text-ivory font-display uppercase tracking-wider text-xs hover:bg-burgundy-deep transition w-48"
          style={{
            scale: useTransform(progress, [0.4, 0.8], [0.8, 1]),
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Plan Your Event
        </motion.button>
        <motion.button
          className="px-6 py-3 rounded-full border border-burgundy text-burgundy font-display uppercase tracking-wider text-xs hover:bg-burgundy hover:text-ivory transition w-48"
          style={{
            scale: useTransform(progress, [0.45, 0.85], [0.8, 1]),
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Gallery
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
