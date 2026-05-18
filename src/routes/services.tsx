import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Varnana Events" },
      { name: "description", content: "From full creative direction to day-of coordination — the services Varnana offers." },
      { property: "og:title", content: "Services — Varnana Events" },
      { property: "og:description", content: "Full event design, venue curation, floral, production and more." },
    ],
  }),
  component: Services,
});

const ALL = [
  { n: "01", title: "Full Event Design", desc: "Creative direction from the first idea to the last guest leaving — narrative, palette, mood, every textural detail." },
  { n: "02", title: "Venue Curation", desc: "We source spaces — heritage homes, ateliers, hidden gardens — that tell a story before guests arrive." },
  { n: "03", title: "Floral & Decor", desc: "Sculptural florals and layered tablescapes composed like still-life paintings." },
  { n: "04", title: "Guest Experience", desc: "Welcomes, scents, soundscapes, hand-written keepsakes — the invisible craft of memory." },
  { n: "05", title: "Production & AV", desc: "Cinematic lighting, sound and stagecraft delivered with technical precision." },
  { n: "06", title: "Day-Of Coordination", desc: "A calm, exacting hand on the day so you can simply be present." },
  { n: "07", title: "Wedding Films & Stills", desc: "We brief and direct trusted photographers and filmmakers to match the visual language of the day." },
  { n: "08", title: "Brand Activations", desc: "Editorial-grade brand launches, dinners and press moments." },
];

function Services() {
  return (
    <>
      <section className="bg-ivory pt-40 pb-16">
        <div className="container-prose">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— What We Do —</p>
          <AnimatedHeading
            as="h1"
            text="Services, end to end."
            className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-burgundy"
          />
          <p className="mt-8 max-w-2xl text-ink/75 text-lg leading-relaxed">
            We can lead the entire creative direction, or step in for a specific
            chapter. Either way, the standard is the same.
          </p>
        </div>
      </section>

      <section className="bg-ivory pb-28">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="container-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-beige"
        >
          {ALL.map((s) => (
            <motion.article
              key={s.n}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group relative border-r border-b border-beige p-8 min-h-[260px]"
            >
              <span className="absolute left-0 top-0 h-0 w-[2px] bg-burgundy transition-all duration-500 group-hover:h-full" />
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-beige group-hover:text-gold transition">{s.n}</span>
                <ArrowUpRight className="text-mute group-hover:text-burgundy transition" size={18} />
              </div>
              <h3 className="mt-5 font-display text-xl text-burgundy">{s.title}</h3>
              <p className="mt-3 text-ink/70 text-sm leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="container-prose mt-16 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-ivory hover:bg-burgundy-deep transition">
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
