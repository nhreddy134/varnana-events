import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Bell, X } from "lucide-react";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { ClientOnly } from "@/components/site/ClientOnly";
import { HeroOrbs } from "@/components/site/HeroOrbs";
import { GalleryCarousel } from "@/components/site/GalleryCarousel";
import { StoryUnfolds3D } from "@/components/site/StoryUnfolds3D";
import { GalleryWithLightbox } from "@/components/site/GalleryWithLightbox";
import { HorizontalMarquee } from "@/components/site/ScrollEffects";
import { ServicesEnhanced } from "@/components/site/ServicesEnhanced";
import { trpc } from '@/lib/trpc';

const HeroParticles = lazy(() => import("@/components/three/HeroParticles").then(m => ({ default: m.HeroParticles })));
const OrbitalRings = lazy(() => import("@/components/three/OrbitalRings").then(m => ({ default: m.OrbitalRings })));

const AnimatedHeadingWords = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
      className="inline-block"
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
            show: {
              opacity: 1, y: 0, filter: "blur(0px)",
              transition: { type: "spring", stiffness: 60, damping: 18 },
            },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Varnana Events — We craft moments that linger forever" },
      { name: "description", content: "A premium creative event studio designing weddings, celebrations and brand experiences with editorial care." },
      { property: "og:title", content: "Varnana Events — Creative Event Studio" },
      { property: "og:description", content: "Editorial weddings, celebrations and brand moments crafted with intention." },
    ],
  }),
  component: HomePage,
});

const HERO_LINE_1 = "We craft moments";
const HERO_LINE_2 = "that linger forever.";

function HomePage() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await trpc.announcements.getPublished.query();
        if (data && data.length > 0) {
          setAnnouncement(data[0]);
          setShowAnnouncement(true);
        }
      } catch (error) {
        console.error('Failed to fetch announcement:', error);
      }
    };
    fetchAnnouncement();
  }, []);

  return (
    <>
      <AnimatePresence>
        {showAnnouncement && announcement && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-burgundy text-ivory py-3 px-4 shadow-xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gold/20 p-1.5 rounded-full">
                  <Bell size={16} className="text-gold" />
                </div>
                <p className="text-sm font-medium tracking-wide">
                  <span className="font-bold uppercase text-[10px] tracking-[0.2em] mr-2 bg-gold/20 px-2 py-0.5 rounded">New</span>
                  {announcement.title}: {announcement.content}
                </p>
              </div>
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="p-1 hover:bg-white/10 rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <StoryUnfolds3D />
      <CategoriesStrip />
      <ServicesEnhanced />
      <GalleryWithLightbox />
      <HorizontalMarquee />
      <WhyVarnana />
      <ProcessTimeline />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-ivory">
      <ClientOnly>
        <Suspense fallback={null}>
          <div className="absolute inset-0 pointer-events-none md:pointer-events-auto">
            <HeroParticles />
          </div>
        </Suspense>
      </ClientOnly>
      <HeroOrbs />

      <motion.div style={{ y }} className="container-prose relative z-10 pt-32 pb-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.4em] text-gold mb-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold inline-block" />
            Creative Event Studio · Est. 2019
          </motion.p>

          <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] text-burgundy">
            <AnimatedHeadingWords text={HERO_LINE_1} delay={0.3} />
            <span className="block italic text-burgundy/90">
              <AnimatedHeadingWords text={HERO_LINE_2} delay={0.7} />
            </span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 1.5 }}
            style={{ transformOrigin: "left" }}
            className="mt-8 h-px bg-gradient-to-r from-gold via-gold to-transparent w-[60%]"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-8 max-w-xl text-ink/80 text-lg leading-relaxed"
          >
            We design weddings, intimate celebrations and brand moments as
            editorial stories — composed with light, scent, sound and the quiet
            details only you remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 2.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-ivory hover:bg-burgundy-deep transition">
                Let's Begin <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border border-burgundy/30 px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-burgundy hover:bg-burgundy hover:text-ivory transition">
                Explore Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="hidden md:block md:col-span-5" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-mute">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="block h-10 w-px bg-burgundy/60"
        />
      </motion.div>
    </section>
  );
}

/* ---------------- CATEGORIES ---------------- */
const CATEGORIES = [
  { n: "01", label: "Weddings" },
  { n: "02", label: "Birthdays" },
  { n: "03", label: "Baby Showers" },
  { n: "04", label: "Corporate Events" },
  { n: "05", label: "Custom Celebrations" },
];

function CategoriesStrip() {
  return (
    <section className="bg-burgundy-deep text-ivory">
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-gold/20"
      >
        {CATEGORIES.map((c) => (
          <motion.li
            key={c.label}
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
            className="group relative overflow-hidden"
          >
            <div className="relative z-10 px-6 py-10 flex flex-col items-center text-center transition-colors duration-500 group-hover:text-burgundy">
              <span className="text-gold text-lg">✦</span>
              <span className="mt-3 text-[11px] uppercase tracking-[0.3em]">{c.label}</span>
              <span className="mt-2 text-[10px] tracking-[0.4em] text-ivory/40 group-hover:text-burgundy/60">{c.n}</span>
            </div>
            <motion.span
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="absolute inset-0 bg-gold"
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

/* ---------------- WHY VARNANA ---------------- */
function WhyVarnana() {
  return (
    <section className="bg-burgundy-deep text-ivory py-28 md:py-36 overflow-hidden">
      <div className="container-prose grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[480px]">
          <ClientOnly>
            <Suspense fallback={null}>
              <OrbitalRings />
            </Suspense>
          </ClientOnly>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-gold inline-block" /> Why Varnana
          </p>
          <AnimatedHeading
            as="h2"
            text="We don't just plan events — we feel them first."
            className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] text-ivory"
          />
          <p className="mt-8 text-ivory/75 leading-relaxed">
            Every gathering starts as a conversation about atmosphere. We believe that true luxury is not about excess, but about the quiet intention behind every choice.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PLACEHOLDERS FOR REMAINING ---------------- */
const STEPS = [
  { n: "01", title: "Atmosphere", desc: "We begin with the feeling you want to evoke, not just the theme." },
  { n: "02", title: "Composition", desc: "Every vendor and detail is curated like a piece of art." },
  { n: "03", title: "Refinement", desc: "We polish the edges until the vision is crystal clear." },
  { n: "04", title: "The Moment", desc: "Flawless execution while you live the story we've built." },
];

function ProcessTimeline() {
  return (
    <section className="py-32 bg-ivory">
      <div className="container-prose">
        <div className="grid md:grid-cols-4 gap-12">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <span className="font-display text-6xl text-burgundy/5 absolute -top-8 -left-4 select-none">{s.n}</span>
              <h3 className="font-display text-xl text-burgundy mb-4 relative z-10">{s.title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
const TESTIMONIALS = [
  {
    name: "Ananya & Vikram",
    role: "Wedding",
    content: "Varnana didn't just plan our wedding; they choreographed a dream. Every detail felt like it was plucked from our own hearts.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "TechNova Solutions",
    role: "Corporate Gala",
    content: "The atmosphere was electric. They managed to make a corporate event feel intimate, sophisticated, and entirely unique.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "The Kapoor Family",
    role: "Golden Anniversary",
    content: "A masterclass in elegance. They honored our traditions while bringing a fresh, editorial perspective that wowed everyone.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=400",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 bg-ivory overflow-hidden">
      <div className="container-prose">
        <div className="text-center mb-20">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4">Voices of Varnana</p>
          <h2 className="font-display text-4xl md:text-5xl text-burgundy">Kind Words</h2>
        </div>

        <div className="relative h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {TESTIMONIALS.map((t, i) => (
              i === active && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotateY: 45, z: -100, x: 100 }}
                  animate={{ opacity: 1, rotateY: 0, z: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: -45, z: -100, x: -100 }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative mb-10">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold p-1"
                    >
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full" />
                    </motion.div>
                    <span className="absolute -bottom-2 -right-2 bg-burgundy text-ivory w-8 h-8 rounded-full flex items-center justify-center text-xl">“</span>
                  </div>
                  
                  <p className="font-display text-2xl md:text-3xl text-ink/90 leading-relaxed max-w-2xl mb-8 italic">
                    {t.content}
                  </p>
                  
                  <div>
                    <h4 className="text-burgundy font-semibold tracking-widest uppercase text-sm">{t.name}</h4>
                    <p className="text-gold text-[10px] uppercase tracking-[0.3em] mt-1">{t.role}</p>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-12 h-1 bg-burgundy/10 overflow-hidden relative transition-all duration-500 ${i === active ? 'w-20' : ''}`}
              >
                {i === active && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute inset-0 bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function FinalCTA() {
  return (
    <section className="py-28 bg-burgundy-deep text-ivory overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
      </div>
      
      <div className="container-prose relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold mb-8">Ready to create your story?</p>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.1] mb-12">
            Let's craft a moment <br /> 
            <span className="italic text-gold/90">that lasts forever.</span>
          </h2>
          
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 rounded-full bg-ivory px-10 py-5 text-[13px] uppercase tracking-[0.25em] text-burgundy font-semibold hover:bg-gold hover:text-burgundy transition-all duration-500 shadow-2xl"
            >
              Start Your Journey <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
