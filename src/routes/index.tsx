import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { Counter } from "@/components/site/Counter";
import { ClientOnly } from "@/components/site/ClientOnly";
import { HeroOrbs } from "@/components/site/HeroOrbs";
import { GalleryCarousel } from "@/components/site/GalleryCarousel";
import { StoryUnfoldsResponsive } from "@/components/site/StoryUnfoldsResponsive";
import { StoryUnfolds3D } from "@/components/site/StoryUnfolds3D";
import { GalleryWithLightbox } from "@/components/site/GalleryWithLightbox";
import { HorizontalMarquee, TextReveal, ScaleOnScroll } from "@/components/site/ScrollEffects";
import { ServicesEnhanced } from "@/components/site/ServicesEnhanced";

const HeroParticles = lazy(() => import("@/components/three/HeroParticles").then(m => ({ default: m.HeroParticles })));
const OrbitalRings = lazy(() => import("@/components/three/OrbitalRings").then(m => ({ default: m.OrbitalRings })));
const CTAParticles = lazy(() => import("@/components/three/CTAParticles").then(m => ({ default: m.CTAParticles })));

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
  return (
    <>
      <Hero />
      <StoryUnfolds3D />
      {/* <StoryUnfoldsResponsive /> */}
      <CategoriesStrip />
      <ServicesEnhanced />
      {/* <FeaturedServices /> */}
      <GalleryWithLightbox />
      {/* <GalleryPreview /> */}
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
                Plan Your Event <ArrowRight size={16} />
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

/* ---------------- FEATURED SERVICES ---------------- */
const SERVICES = [
  { n: "01", title: "Full Event Design", desc: "End-to-end creative direction — narrative, mood, palette and every textural detail." },
  { n: "02", title: "Venue Curation", desc: "We source spaces that tell a story before a single guest arrives." },
  { n: "03", title: "Floral & Decor", desc: "Sculptural florals and layered tablescapes composed like still-life paintings." },
  { n: "04", title: "Guest Experience", desc: "Welcomes, scents, soundscapes — the invisible craft that lingers in memory." },
  { n: "05", title: "Production & AV", desc: "Cinematic lighting, sound and stagecraft delivered with technical precision." },
  { n: "06", title: "Day-Of Coordination", desc: "A calm, exacting hand on the day itself so you can simply be present." },
];

function FeaturedServices() {
  return (
    <section className="bg-ivory py-28 md:py-36">
      <div className="container-prose">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold inline-block" /> Featured Services
        </motion.p>
        <AnimatedHeading
          as="h2"
          text="What we do, with intention."
          className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-burgundy max-w-3xl"
        />

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-beige"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.n}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative border-r border-b border-beige p-10 bg-ivory"
            >
              <span className="absolute left-0 top-0 h-0 w-[2px] bg-burgundy transition-all duration-500 group-hover:h-full" />
              <div className="flex items-baseline justify-between">
                <span className="font-display text-6xl text-beige group-hover:text-gold transition-colors duration-500">{s.n}</span>
                <ArrowUpRight className="text-mute group-hover:text-burgundy transition-colors" size={20} />
              </div>
              <h3 className="mt-6 font-display text-2xl text-burgundy">{s.title}</h3>
              <p className="mt-4 text-ink/75 text-sm leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY PREVIEW ---------------- */
function GalleryPreview() {
  return (
    <section className="bg-beige/40 py-28 md:py-36">
      <div className="container-prose">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gold inline-block" /> Selected Work
            </motion.p>
            <AnimatedHeading
              as="h2"
              text="Stories told in still frames."
              className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-burgundy max-w-3xl"
            />
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-burgundy-deep/95 overflow-hidden">
          <ClientOnly fallback={<div className="h-[520px]" />}>
            <Suspense fallback={<div className="h-[520px]" />}>
              <GalleryCarousel />
            </Suspense>
          </ClientOnly>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[11px] uppercase tracking-[0.3em] text-mute"
          >
            ◂ Drag to explore ▸
          </motion.span>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-burgundy hover:gap-3 transition-all">
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
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
            Every gathering starts as a conversation — about people, place,
            history and the small, specific feeling you want guests to carry
            home. From there we shape a creative direction that is yours alone.
          </p>
          <p className="mt-4 text-ivory/65 leading-relaxed">
            Editorial taste. Cinematic craft. A studio small enough to obsess
            over every detail, large enough to deliver flawlessly at scale.
          </p>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-12 grid grid-cols-2 gap-x-10 gap-y-8"
          >
            {[
              { v: 340, s: "+", l: "Events Crafted" },
              { v: 12, s: "", l: "Cities" },
              { v: 98, s: "%", l: "Satisfaction" },
              { v: 6, s: "+", l: "Years in Studio" },
            ].map((stat) => (
              <motion.div
                key={stat.l}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
              >
                <div className="font-display text-5xl text-gold">
                  <Counter to={stat.v} suffix={stat.s} />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.3em] text-ivory/60">{stat.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS TIMELINE ---------------- */
const STEPS = [
  { n: "01", title: "Consultation", desc: "We listen. We learn the story you want to tell." },
  { n: "02", title: "Concept", desc: "A creative direction — mood, palette, narrative." },
  { n: "03", title: "Design", desc: "Detailed visual language, layouts and sourcing." },
  { n: "04", title: "Execution", desc: "Production, vendors, logistics — quietly orchestrated." },
  { n: "05", title: "Celebration", desc: "Your day, lived fully. We handle everything else." },
];

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 30%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-burgundy text-ivory py-28 md:py-36">
      <div className="container-prose text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— The Process —</p>
        <AnimatedHeading
          as="h2"
          text="From whisper to celebration."
          className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-ivory mx-auto"
        />

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-0 right-0 top-6 h-px bg-ivory/15 hidden md:block" />
          <motion.div
            style={{ scaleX, transformOrigin: "left" }}
            className="absolute left-0 right-0 top-6 h-px bg-gold hidden md:block"
          />
          <motion.ol
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="relative grid grid-cols-1 md:grid-cols-5 gap-12"
          >
            {STEPS.map((s) => (
              <motion.li
                key={s.n}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
                className="text-center"
              >
                <motion.span
                  whileHover={{ scale: 1.4 }}
                  className="block mx-auto h-3 w-3 rounded-full bg-gold"
                />
                <div className="mt-6 font-display text-3xl text-gold">{s.n}</div>
                <div className="mt-2 text-[12px] uppercase tracking-[0.3em] text-ivory">{s.title}</div>
                <p className="mt-4 text-ivory/65 text-sm leading-relaxed max-w-[18ch] mx-auto">{s.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const TESTIMONIALS = [
  { quote: "Varnana didn't plan our wedding — they translated it. Every detail felt like it had always been ours.", who: "Aanya & Vihaan", event: "Wedding · Udaipur", initials: "AV" },
  { quote: "The studio's restraint is its superpower. Nothing extra. Everything intentional. Guests still write to us.", who: "Maya Iyer", event: "Brand Launch · Mumbai", initials: "MI" },
  { quote: "We trusted them with our most important day. We would do it again, exactly, without changing a thing.", who: "The Mehra Family", event: "Anniversary · Goa", initials: "MF" },
];

function Testimonials() {
  return (
    <section className="bg-beige/60 py-28 md:py-36">
      <div className="container-prose text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— In Their Words —</p>
        <AnimatedHeading
          as="h2"
          text="The kindest things our couples have written."
          className="font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] text-burgundy max-w-4xl mx-auto"
        />

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <motion.figure
              key={t.who}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative bg-ivory p-10 text-left"
            >
              <span className="absolute left-0 top-0 h-[2px] w-12 bg-gold transition-all duration-500 group-hover:w-full" />
              <Quote className="text-gold" size={26} />
              <blockquote className="mt-6 font-display italic text-xl text-burgundy leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="h-11 w-11 rounded-full bg-burgundy text-ivory flex items-center justify-center text-xs tracking-[0.2em]">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm text-burgundy">{t.who}</span>
                  <span className="block text-[11px] uppercase tracking-[0.3em] text-mute">{t.event}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative bg-burgundy-deep text-ivory overflow-hidden">
      <div className="container-prose pt-12">
        <svg viewBox="0 0 600 30" className="mx-auto w-64 h-8 text-gold opacity-70">
          <path d="M10 15 Q 150 -10 300 15 T 590 15" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="300" cy="15" r="2.5" fill="currentColor" />
        </svg>
      </div>
      <ClientOnly>
        <Suspense fallback={null}>
          <CTAParticles />
        </Suspense>
      </ClientOnly>
      <div className="container-prose relative z-10 py-28 md:py-40 text-center">
        <AnimatedHeading
          as="h2"
          text="Your story deserves to be beautifully told."
          className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-ivory max-w-4xl mx-auto"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 text-ivory/70 max-w-xl mx-auto"
        >
          We take on a limited number of events each season. If the timing feels right, we'd love to hear from you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-burgundy-deep hover:bg-gold-light transition">
              Plan Your Event <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full border border-ivory/40 px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-ivory hover:bg-ivory hover:text-burgundy transition">
              See Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
