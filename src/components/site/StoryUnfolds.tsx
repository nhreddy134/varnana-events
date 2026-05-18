import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

/**
 * StoryUnfolds - Cinematic scroll-driven narrative section
 * 5 moments driven purely by scroll position, no clicks or timers
 */
export function StoryUnfolds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Divide scroll progress into 5 segments
  // Moment 1: 0–0.2, Moment 2: 0.2–0.4, etc.
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
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Moment 1: Deep burgundy + tulip SVG + text fade in + particles */}
        <Moment1 progress={moment1Progress} />

        {/* Moment 2: Burgundy → Ivory transition + tulip blooms + text morph + line draws */}
        <Moment2 progress={moment2Progress} />

        {/* Moment 3: Ivory + 3×3 grid cards assemble + text */}
        <Moment3 progress={moment3Progress} />

        {/* Moment 4: Cards collapse → single large card + logo glow + background pulse */}
        <Moment4 progress={moment4Progress} />

        {/* Moment 5: Fade to ivory + headline reveal + CTAs */}
        <Moment5 progress={moment5Progress} />
      </div>
    </div>
  );
}

/* ============ MOMENT 1 ============ */
function Moment1({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 1], [
    "rgb(61, 15, 15)", // #3D0F0F
    "rgb(61, 15, 15)",
  ]);

  const textOpacity = useTransform(progress, [0.3, 0.8], [0, 1]);
  const particleOpacity = useTransform(progress, [0, 1], [0, 0.6]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Particles drifting upward */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: particleOpacity }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              y: useTransform(progress, [0, 1], [0, -200 - Math.random() * 100]),
              opacity: useTransform(progress, [0, 0.5, 1], [0, 0.8, 0]),
            }}
          />
        ))}
      </motion.div>

      {/* Tulip SVG - draws itself */}
      <motion.svg
        viewBox="0 0 200 300"
        className="w-32 h-auto mb-12"
        fill="none"
        stroke="#C4A882"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Stem */}
        <motion.path
          d="M 100 200 Q 98 150 100 100"
          initial={{ pathLength: 0 }}
          style={{ pathLength: progress }}
          transition={{ duration: 0.5 }}
        />
        {/* Left petal */}
        <motion.path
          d="M 100 100 Q 85 80 90 50"
          initial={{ pathLength: 0 }}
          style={{ pathLength: progress }}
        />
        {/* Center petal */}
        <motion.path
          d="M 100 100 Q 100 70 100 40"
          initial={{ pathLength: 0 }}
          style={{ pathLength: progress }}
        />
        {/* Right petal */}
        <motion.path
          d="M 100 100 Q 115 80 110 50"
          initial={{ pathLength: 0 }}
          style={{ pathLength: progress }}
        />
      </motion.svg>

      {/* Text fade in */}
      <motion.h2
        className="font-display text-4xl md:text-5xl text-ivory text-center max-w-2xl px-6"
        style={{ opacity: textOpacity }}
      >
        Every event begins with a single thought.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 2 ============ */
function Moment2({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 1], [
    "rgb(61, 15, 15)", // #3D0F0F
    "rgb(240, 237, 232)", // #F0EDE8
  ]);

  const textOpacity = useTransform(progress, [0.2, 0.7], [0, 1]);
  const lineScaleX = useTransform(progress, [0.3, 0.7], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Tulip blooms (petals scale outward) */}
      <motion.svg
        viewBox="0 0 200 300"
        className="w-32 h-auto mb-12"
        fill="none"
        stroke="#C4A882"
        strokeWidth="2"
      >
        {/* Stem */}
        <path d="M 100 200 Q 98 150 100 100" />
        {/* Petals scale outward */}
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

      {/* Text morphs */}
      <motion.h2
        className="font-display text-4xl md:text-5xl text-center max-w-2xl px-6"
        style={{
          opacity: textOpacity,
          color: useTransform(progress, [0, 0.5, 1], [
            "rgb(240, 237, 232)", // ivory
            "rgb(240, 237, 232)",
            "rgb(107, 26, 26)", // burgundy
          ]),
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

/* ============ MOMENT 3 ============ */
function Moment3({ progress }: { progress: any }) {
  const cardColors = [
    "rgba(196, 168, 130, 0.3)", // gold light
    "rgba(196, 168, 130, 0.2)",
    "rgba(196, 168, 130, 0.25)",
    "rgba(196, 168, 130, 0.35)",
    "rgba(196, 168, 130, 0.2)",
    "rgba(196, 168, 130, 0.3)",
    "rgba(196, 168, 130, 0.25)",
    "rgba(196, 168, 130, 0.28)",
    "rgba(196, 168, 130, 0.32)",
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
    >
      {/* 3×3 Grid of cards */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl px-6">
        {cardColors.map((color, i) => {
          const cardProgress = useTransform(progress, [0, 1], [0, 1]);
          const randomX = (Math.random() - 0.5) * 400;
          const randomY = (Math.random() - 0.5) * 400;

          return (
            <motion.div
              key={i}
              className="aspect-square rounded-lg"
              style={{
                backgroundColor: color,
                x: useTransform(cardProgress, [0, 1], [randomX, 0]),
                y: useTransform(cardProgress, [0, 1], [randomY, 0]),
                opacity: useTransform(cardProgress, [0, 0.5, 1], [0, 0.5, 1]),
              }}
            />
          );
        })}
      </div>

      {/* Text */}
      <motion.h2
        className="font-display text-4xl md:text-5xl text-burgundy text-center max-w-2xl px-6 mt-12"
        style={{
          opacity: useTransform(progress, [0.3, 0.8], [0, 1]),
        }}
      >
        We find it. We shape it. We make it real.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 4 ============ */
function Moment4({ progress }: { progress: any }) {
  const bgColor = useTransform(progress, [0, 0.5, 1], [
    "rgb(240, 237, 232)", // ivory
    "rgb(240, 237, 232)",
    "rgb(20, 20, 20)", // black
  ]);

  const cardScale = useTransform(progress, [0, 0.6, 1], [0.8, 1, 1.2]);
  const cardOpacity = useTransform(progress, [0, 0.5, 1], [1, 1, 0.8]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Large card with logo */}
      <motion.div
        className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-burgundy flex items-center justify-center shadow-2xl"
        style={{
          scale: cardScale,
          opacity: cardOpacity,
          boxShadow: useTransform(progress, [0, 1], [
            "0 20px 60px rgba(0,0,0,0.1)",
            "0 40px 120px rgba(196,168,130,0.3)",
          ]),
        }}
      >
        {/* Logo "V" */}
        <motion.div
          className="font-display text-7xl md:text-9xl text-gold"
          style={{
            opacity: useTransform(progress, [0, 0.3, 1], [0, 1, 1]),
            scale: useTransform(progress, [0, 0.3, 1], [0.5, 1, 1]),
          }}
        >
          V
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: useTransform(progress, [0, 0.5, 1], [
              "inset 0 0 0 0 rgba(196,168,130,0)",
              "inset 0 0 40px rgba(196,168,130,0.4)",
              "inset 0 0 60px rgba(196,168,130,0.6)",
            ]),
          }}
        />
      </motion.div>

      {/* Text */}
      <motion.h2
        className="font-display text-3xl md:text-4xl text-ivory text-center max-w-2xl px-6 absolute bottom-20"
        style={{
          opacity: useTransform(progress, [0.5, 1], [0, 1]),
        }}
      >
        Then we build something that lasts forever.
      </motion.h2>
    </motion.div>
  );
}

/* ============ MOMENT 5 ============ */
function Moment5({ progress }: { progress: any }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
    >
      {/* Headline reveals word by word */}
      <motion.h2
        className="font-display text-5xl md:text-7xl text-burgundy text-center max-w-3xl px-6"
        style={{
          opacity: useTransform(progress, [0, 0.3, 1], [0, 0.5, 1]),
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

      {/* CTAs animate in with spring */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mt-12"
        style={{
          opacity: useTransform(progress, [0.5, 0.8], [0, 1]),
        }}
      >
        <motion.button
          className="px-8 py-4 rounded-full bg-burgundy text-ivory font-display uppercase tracking-wider text-sm hover:bg-burgundy-deep transition"
          style={{
            scale: useTransform(progress, [0.5, 0.8], [0.8, 1]),
          }}
        >
          Plan Your Event
        </motion.button>
        <motion.button
          className="px-8 py-4 rounded-full border border-burgundy text-burgundy font-display uppercase tracking-wider text-sm hover:bg-burgundy hover:text-ivory transition"
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
