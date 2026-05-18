import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * StoryUnfolds - Cinematic scroll-driven narrative section
 * Inner content is position: sticky; top: 0; height: 100vh
 * All animations driven by scroll progress (0 to 1) using useScroll + useTransform
 * 5 moments divided into equal segments: 0–20%, 20–40%, 40–60%, 60–80%, 80–100%
 */
export function StoryUnfolds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Divide scroll progress into 5 equal segments
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
      style={{ height: "500vh" }}
    >
      {/* Sticky container - position: sticky; top: 0; height: 100vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* All 5 moments rendered, opacity controlled by scroll progress */}
        <Moment1 progress={moment1Progress} />
        <Moment2 progress={moment2Progress} />
        <Moment3 progress={moment3Progress} />
        <Moment4 progress={moment4Progress} />
        <Moment5 progress={moment5Progress} />
      </div>
    </div>
  );
}

/* ============ MOMENT 1: 0–20% ============ */
function Moment1({ progress }: { progress: any }) {
  // Background stays deep burgundy
  const bgColor = "#3D0F0F";

  // Text fades in
  const textOpacity = useTransform(progress, [0.2, 0.8], [0, 1]);

  // SVG tulip stem draws itself via pathLength
  const stemPathLength = useTransform(progress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Particles drift upward */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: useTransform(progress, [0, 1], [0, -150 - Math.random() * 100]),
              opacity: useTransform(progress, [0, 0.5, 1], [0, 0.6, 0]),
            }}
          />
        ))}
      </div>

      {/* Tulip SVG - draws itself */}
      <motion.svg
        viewBox="0 0 200 300"
        className="w-32 h-auto mb-12"
        fill="none"
        stroke="#C4A882"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Stem */}
        <motion.path
          d="M 100 200 Q 98 150 100 100"
          style={{ pathLength: stemPathLength }}
        />
        {/* Left petal */}
        <motion.path
          d="M 100 100 Q 85 80 90 50"
          style={{ pathLength: stemPathLength }}
        />
        {/* Center petal */}
        <motion.path
          d="M 100 100 Q 100 70 100 40"
          style={{ pathLength: stemPathLength }}
        />
        {/* Right petal */}
        <motion.path
          d="M 100 100 Q 115 80 110 50"
          style={{ pathLength: stemPathLength }}
        />
      </motion.svg>

      {/* Text fades in */}
      <motion.h2
        className="font-display text-4xl md:text-5xl text-ivory text-center max-w-2xl px-6"
        style={{ opacity: textOpacity }}
      >
        Every event begins with a single thought.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 2: 20–40% ============ */
function Moment2({ progress }: { progress: any }) {
  // Background interpolates from burgundy to ivory
  const bgColor = useTransform(progress, [0, 1], [
    "rgb(61, 15, 15)", // #3D0F0F
    "rgb(240, 237, 232)", // #F0EDE8
  ]);

  // Text crossfades and changes color
  const textOpacity = useTransform(progress, [0.1, 0.7], [0, 1]);
  const textColor = useTransform(progress, [0, 0.5, 1], [
    "rgb(240, 237, 232)", // ivory
    "rgb(240, 237, 232)",
    "rgb(107, 26, 26)", // burgundy
  ]);

  // Gold line draws left to right
  const lineScaleX = useTransform(progress, [0.2, 0.7], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Tulip petals scale open (bloom effect) */}
      <motion.svg
        viewBox="0 0 200 300"
        className="w-32 h-auto mb-12"
        fill="none"
        stroke="#C4A882"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Stem */}
        <path d="M 100 200 Q 98 150 100 100" />
        {/* Petals scale outward */}
        <motion.path
          d="M 100 100 Q 85 80 90 50"
          style={{ scale: useTransform(progress, [0, 1], [1, 1.4]) }}
        />
        <motion.path
          d="M 100 100 Q 100 70 100 40"
          style={{ scale: useTransform(progress, [0, 1], [1, 1.4]) }}
        />
        <motion.path
          d="M 100 100 Q 115 80 110 50"
          style={{ scale: useTransform(progress, [0, 1], [1, 1.4]) }}
        />
      </motion.svg>

      {/* Text crossfades */}
      <motion.h2
        className="font-display text-4xl md:text-5xl text-center max-w-2xl px-6"
        style={{
          opacity: textOpacity,
          color: textColor,
        }}
      >
        A feeling you can't quite name yet.
      </motion.h2>

      {/* Gold horizontal line draws left to right */}
      <motion.div
        className="absolute bottom-1/3 h-px bg-gold"
        style={{
          width: "60%",
          maxWidth: "400px",
          scaleX: lineScaleX,
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

/* ============ MOMENT 3: 40–60% ============ */
function Moment3({ progress }: { progress: any }) {
  // Warm color palette for cards
  const cardColors = [
    "rgba(196, 168, 130, 0.35)",
    "rgba(196, 168, 130, 0.25)",
    "rgba(196, 168, 130, 0.3)",
    "rgba(196, 168, 130, 0.4)",
    "rgba(196, 168, 130, 0.2)",
    "rgba(196, 168, 130, 0.32)",
    "rgba(196, 168, 130, 0.28)",
    "rgba(196, 168, 130, 0.35)",
    "rgba(196, 168, 130, 0.25)",
  ];

  const textOpacity = useTransform(progress, [0.2, 0.8], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
    >
      {/* 3×3 Grid of cards - fly in from random positions and snap into place */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl px-6">
        {cardColors.map((color, i) => {
          // Each card has random starting position
          const randomX = (Math.random() - 0.5) * 500;
          const randomY = (Math.random() - 0.5) * 500;

          // Cards snap into place as scroll progresses
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

      {/* Text */}
      <motion.h2
        className="font-display text-4xl md:text-5xl text-burgundy text-center max-w-2xl px-6 mt-12"
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
function Moment4({ progress }: { progress: any }) {
  // Background pulses between burgundy and black
  const bgColor = useTransform(progress, [0, 0.5, 1], [
    "rgb(240, 237, 232)", // ivory
    "rgb(61, 15, 15)", // burgundy
    "rgb(20, 20, 20)", // black
  ]);

  // Grid cards collapse, single card expands
  const cardScale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.3]);
  const cardOpacity = useTransform(progress, [0, 0.4, 1], [1, 1, 0.9]);

  // Logo glow effect
  const glowIntensity = useTransform(progress, [0, 0.5, 1], [
    "inset 0 0 0 0 rgba(196,168,130,0)",
    "inset 0 0 40px rgba(196,168,130,0.4)",
    "inset 0 0 80px rgba(196,168,130,0.7)",
  ]);

  const textOpacity = useTransform(progress, [0.4, 1], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Large card expands fullscreen with logo */}
      <motion.div
        className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-burgundy flex items-center justify-center shadow-2xl relative"
        style={{
          scale: cardScale,
          opacity: cardOpacity,
        }}
      >
        {/* Varnana "V" logo centered */}
        <motion.div
          className="font-display text-7xl md:text-9xl text-gold relative z-10"
          style={{
            opacity: useTransform(progress, [0, 0.2, 1], [0, 1, 1]),
            scale: useTransform(progress, [0, 0.2, 1], [0.5, 1, 1]),
          }}
        >
          V
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: glowIntensity,
          }}
        />
      </motion.div>

      {/* Text */}
      <motion.h2
        className="font-display text-3xl md:text-4xl text-ivory text-center max-w-2xl px-6 absolute bottom-20"
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
function Moment5({ progress }: { progress: any }) {
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
      {/* Large headline reveals word by word */}
      <motion.h2
        className="font-display text-5xl md:text-7xl text-burgundy text-center max-w-3xl px-6"
        style={{
          opacity: headlineOpacity,
        }}
      >
        <motion.span
          className="inline-block mr-4"
          style={{
            opacity: useTransform(progress, [0, 0.15], [0, 1]),
            y: useTransform(progress, [0, 0.15], [20, 0]),
          }}
        >
          This
        </motion.span>
        <motion.span
          className="inline-block mr-4"
          style={{
            opacity: useTransform(progress, [0.1, 0.25], [0, 1]),
            y: useTransform(progress, [0.1, 0.25], [20, 0]),
          }}
        >
          is
        </motion.span>
        <motion.span
          className="inline-block mr-4"
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

      {/* CTAs spring in */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mt-12"
        style={{
          opacity: ctasOpacity,
        }}
      >
        <motion.button
          className="px-8 py-4 rounded-full bg-burgundy text-ivory font-display uppercase tracking-wider text-sm hover:bg-burgundy-deep transition"
          style={{
            scale: useTransform(progress, [0.4, 0.8], [0.8, 1]),
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Plan Your Event
        </motion.button>
        <motion.button
          className="px-8 py-4 rounded-full border border-burgundy text-burgundy font-display uppercase tracking-wider text-sm hover:bg-burgundy hover:text-ivory transition"
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
