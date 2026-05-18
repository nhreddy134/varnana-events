import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * StoryUnfoldsMobile - Simplified scroll-driven section for mobile
 * Reduces complexity for better performance on smaller screens
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
        {/* Moment 1 */}
        <MobileMoment1 progress={moment1Progress} />
        {/* Moment 2 */}
        <MobileMoment2 progress={moment2Progress} />
        {/* Moment 3 */}
        <MobileMoment3 progress={moment3Progress} />
        {/* Moment 4 */}
        <MobileMoment4 progress={moment4Progress} />
        {/* Moment 5 */}
        <MobileMoment5 progress={moment5Progress} />
      </div>
    </div>
  );
}

function MobileMoment1({ progress }: { progress: any }) {
  const textOpacity = useTransform(progress, [0.3, 0.8], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-burgundy-deep"
    >
      <motion.h2
        className="font-display text-3xl text-ivory text-center max-w-xs px-4"
        style={{ opacity: textOpacity }}
      >
        Every event begins with a single thought.
      </motion.h2>
    </motion.div>
  );
}

function MobileMoment2({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 1], [
    "rgb(61, 15, 15)",
    "rgb(240, 237, 232)",
  ]);

  const textOpacity = useTransform(progress, [0.2, 0.7], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <motion.h2
        className="font-display text-3xl text-center max-w-xs px-4"
        style={{
          opacity: textOpacity,
          color: useTransform(progress, [0, 0.5, 1], [
            "rgb(240, 237, 232)",
            "rgb(240, 237, 232)",
            "rgb(107, 26, 26)",
          ]),
        }}
      >
        A feeling you can't quite name yet.
      </motion.h2>
    </motion.div>
  );
}

function MobileMoment3({ progress }: { progress: any }) {
  const cardColors = [
    "rgba(196, 168, 130, 0.3)",
    "rgba(196, 168, 130, 0.2)",
    "rgba(196, 168, 130, 0.25)",
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
    >
      {/* 2×2 Grid of cards (simplified) */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs px-4">
        {cardColors.map((color, i) => {
          const randomX = (Math.random() - 0.5) * 200;
          const randomY = (Math.random() - 0.5) * 200;

          return (
            <motion.div
              key={i}
              className="aspect-square rounded-lg"
              style={{
                backgroundColor: color,
                x: useTransform(progress, [0, 1], [randomX, 0]),
                y: useTransform(progress, [0, 1], [randomY, 0]),
                opacity: useTransform(progress, [0, 0.5, 1], [0, 0.5, 1]),
              }}
            />
          );
        })}
      </div>

      <motion.h2
        className="font-display text-2xl text-burgundy text-center max-w-xs px-4 mt-8"
        style={{
          opacity: useTransform(progress, [0.3, 0.8], [0, 1]),
        }}
      >
        We find it. We shape it. We make it real.
      </motion.h2>
    </motion.div>
  );
}

function MobileMoment4({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 0.5, 1], [
    "rgb(240, 237, 232)",
    "rgb(240, 237, 232)",
    "rgb(20, 20, 20)",
  ]);

  const cardScale = useTransform(progress, [0, 0.6, 1], [0.8, 1, 1.1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className="w-40 h-40 rounded-2xl bg-burgundy flex items-center justify-center shadow-2xl"
        style={{
          scale: cardScale,
          boxShadow: useTransform(progress, [0, 1], [
            "0 20px 60px rgba(0,0,0,0.1)",
            "0 40px 120px rgba(196,168,130,0.3)",
          ]),
        }}
      >
        <motion.div
          className="font-display text-6xl text-gold"
          style={{
            opacity: useTransform(progress, [0, 0.3, 1], [0, 1, 1]),
            scale: useTransform(progress, [0, 0.3, 1], [0.5, 1, 1]),
          }}
        >
          V
        </motion.div>
      </motion.div>

      <motion.h2
        className="font-display text-xl text-ivory text-center max-w-xs px-4 absolute bottom-16"
        style={{
          opacity: useTransform(progress, [0.5, 1], [0, 1]),
        }}
      >
        Then we build something that lasts forever.
      </motion.h2>
    </motion.div>
  );
}

function MobileMoment5({ progress }: { progress: any }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
    >
      <motion.h2
        className="font-display text-2xl text-burgundy text-center max-w-xs px-4"
        style={{
          opacity: useTransform(progress, [0, 0.3, 1], [0, 0.5, 1]),
        }}
      >
        This is what we do.
      </motion.h2>

      <motion.div
        className="flex flex-col items-center justify-center gap-3 mt-8"
        style={{
          opacity: useTransform(progress, [0.5, 0.8], [0, 1]),
        }}
      >
        <motion.button
          className="px-6 py-3 rounded-full bg-burgundy text-ivory font-display uppercase tracking-wider text-xs hover:bg-burgundy-deep transition w-48"
          style={{
            scale: useTransform(progress, [0.5, 0.8], [0.8, 1]),
          }}
        >
          Plan Your Event
        </motion.button>
        <motion.button
          className="px-6 py-3 rounded-full border border-burgundy text-burgundy font-display uppercase tracking-wider text-xs hover:bg-burgundy hover:text-ivory transition w-48"
          style={{
            scale: useTransform(progress, [0.55, 0.85], [0.8, 1]),
          }}
        >
          Explore Gallery
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
