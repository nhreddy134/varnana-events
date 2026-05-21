import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Bell, X } from "lucide-react";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { ClientOnly } from "@/components/site/ClientOnly";
import { GalleryCarousel } from "@/components/site/GalleryCarousel";
import ScrollScrubSequence from "@/components/site/ScrollScrubSequence";
import { GalleryWithLightbox } from "@/components/site/GalleryWithLightbox";
import { HorizontalMarquee } from "@/components/site/ScrollEffects";
import { ServicesEnhanced } from "@/components/site/ServicesEnhanced";
import TestimonialsCarousel from "@/components/site/TestimonialsCarousel";
import { trpc } from '@/lib/trpc';

const OrbitalRings = lazy(() => import("@/components/three/OrbitalRings").then(m => ({ default: m.OrbitalRings })));

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

      {/* Hero Section: Mandap Scroll-Scrub with Text Overlay */}
      <ScrollScrubSequence showHeroOverlay={true} />

      {/* Bridge Section: Transition from dark mandap to ivory */}
      <HeroContext />

      {/* Categories Strip */}
      <CategoriesStrip />

      {/* Services */}
      <ServicesEnhanced />

      {/* Gallery */}
      <GalleryWithLightbox />

      {/* Marquee */}
      <HorizontalMarquee />

      {/* Why Varnana */}
      <WhyVarnana />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}

/* ============ HERO CONTEXT / BRIDGE ============ */
function HeroContext() {
  return (
    <section className="bg-[#F0EDE8] py-20 md:py-32 relative overflow-hidden">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold inline-block" />
            Creative Event Studio · Est. 2019
            <span className="h-px w-10 bg-gold inline-block" />
          </p>
          <p className="text-xl md:text-2xl text-ink/80 leading-relaxed font-serif italic">
            We design weddings, intimate celebrations and brand moments as editorial stories — composed with light, scent, sound and the quiet details only you remember.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
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
        </motion.div>
      </div>

      {/* Subtle gradient bridge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}

/* ============ CATEGORIES STRIP ============ */
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

/* ============ WHY VARNANA ============ */
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

/* ============ PROCESS TIMELINE ============ */
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

/* ============ FINAL CTA ============ */
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
