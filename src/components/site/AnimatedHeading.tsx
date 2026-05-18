import { motion } from "framer-motion";

export function AnimatedHeading({
  text,
  className = "",
  as: As = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: any;
  delay?: number;
}) {
  const words = text.split(" ");
  const MAs = motion(As);
  return (
    <MAs
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
            show: {
              opacity: 1, y: 0, filter: "blur(0px)",
              transition: { type: "spring", stiffness: 60, damping: 18 },
            },
          }}
        >
          {w}
        </motion.span>
      ))}
    </MAs>
  );
}
