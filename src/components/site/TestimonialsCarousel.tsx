import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya & Vikram",
    role: "Wedding, Udaipur",
    quote: "Varnana didn't just plan our wedding; they choreographed a dream. Every detail felt like it was plucked from our own hearts.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: 2,
    name: "Maya Iyer",
    role: "Brand Launch, Mumbai",
    quote: "The studio's restraint is its superpower. Nothing extra. Everything intentional. Guests still write to us about that day.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: 3,
    name: "The Mehra Family",
    role: "Anniversary, Goa",
    quote: "We trusted them with our most important milestone. We would do it again, exactly, without changing a single thing.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: 4,
    name: "Siddharth & Riya",
    role: "Engagement, Jaipur",
    quote: "They captured the essence of our story in every corner. It wasn't just an event; it was a living memory.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: 5,
    name: "Global Tech Summit",
    role: "Conference, Bangalore",
    quote: "Sophistication meets seamless execution. Varnana redefined what a corporate experience could be for our global partners.",
    image: "https://images.unsplash.com/photo-1540575861501-7c00117f4894?auto=format&fit=crop&q=80&w=1920",
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={TESTIMONIALS[index].image}
              alt={TESTIMONIALS[index].name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center md:px-10">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6 font-serif text-[60px] text-gold"
            >
              “
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-4xl font-serif text-[32px] italic leading-[1.4] text-white md:text-[48px]"
            >
              {TESTIMONIALS[index].quote}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-10"
            >
              <h3 className="font-serif text-[24px] uppercase tracking-[0.2em] text-gold">
                {TESTIMONIALS[index].name}
              </h3>
              <p className="mt-2 text-[12px] uppercase tracking-[0.15em] text-white/50">
                {TESTIMONIALS[index].role}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          stopAutoPlay();
        }}
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 md:left-8 md:h-12 md:w-12"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => {
          nextSlide();
          stopAutoPlay();
        }}
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/40 md:right-8 md:h-12 md:w-12"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:gap-4">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
              stopAutoPlay();
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-gold" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40 pointer-events-none"
      >
        Drag or click to explore
      </motion.div>
    </section>
  );
}
