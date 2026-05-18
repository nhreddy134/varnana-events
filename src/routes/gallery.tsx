import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Varnana Events" },
      { name: "description", content: "A selection of recent events designed and produced by Varnana." },
      { property: "og:title", content: "Gallery — Varnana Events" },
      { property: "og:description", content: "Selected work — weddings, celebrations, brand moments." },
    ],
  }),
  component: Gallery,
});

const ITEMS = [
  { name: "Aanya & Vihaan", place: "Udaipur · 2024", color: "#6B1A1A", h: "tall" },
  { name: "Ritz Gala", place: "Mumbai · 2024", color: "#3D0F0F", h: "short" },
  { name: "Maya Turns One", place: "Goa · 2023", color: "#C4A882", h: "short" },
  { name: "Lumen Launch", place: "Delhi · 2024", color: "#5C2018", h: "tall" },
  { name: "Saanvi's Mehndi", place: "Jaipur · 2023", color: "#8B5A3C", h: "tall" },
  { name: "Atrium Soirée", place: "Bangalore · 2024", color: "#A0522D", h: "short" },
  { name: "Devika & Kabir", place: "Florence · 2023", color: "#6B1A1A", h: "short" },
  { name: "House of Indu", place: "Mumbai · 2024", color: "#D4B896", h: "tall" },
];

function Gallery() {
  return (
    <>
      <section className="bg-ivory pt-40 pb-16">
        <div className="container-prose">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— Selected Work —</p>
          <AnimatedHeading
            as="h1"
            text="A quiet archive of recent moments."
            className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-burgundy max-w-5xl"
          />
        </div>
      </section>

      <section className="bg-ivory pb-32">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="container-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ITEMS.map((it, i) => (
            <motion.figure
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } } }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group"
            >
              <div
                className={`relative overflow-hidden rounded-sm ${it.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                style={{ backgroundColor: it.color }}
              >
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition">
                  <span className="text-ivory text-[11px] uppercase tracking-[0.3em]">{it.place}</span>
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-xl text-burgundy">{it.name}</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-mute">{it.place}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </section>
    </>
  );
}
