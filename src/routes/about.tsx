import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Varnana Events" },
      { name: "description", content: "A small creative studio with editorial taste, designing weddings and brand moments since 2019." },
      { property: "og:title", content: "About — Varnana Events" },
      { property: "og:description", content: "Meet the studio behind Varnana — editorial taste, cinematic craft." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-ivory pt-40 pb-24">
        <div className="container-prose">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— Our Studio —</p>
          <AnimatedHeading
            as="h1"
            text="A small studio, obsessed with the quiet details."
            className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-burgundy max-w-5xl"
          />
        </div>
      </section>

      <section className="bg-ivory pb-28">
        <div className="container-prose grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7 space-y-6 text-ink/80 leading-relaxed text-lg">
            <p>
              Varnana was founded in 2019 by a creative director who believed
              events deserved the same intentionality as a fashion editorial or
              a film. Six years later, our studio designs roughly thirty events
              a year — by deliberate choice, never more.
            </p>
            <p>
              We work across weddings, brand experiences and private
              celebrations. The throughline is not a style — it is a way of
              listening. Every gathering starts with a long conversation and
              ends with details only you remember.
            </p>
            <p>
              The team is small, multidisciplinary, and tightly held: designers,
              florists, producers and a network of trusted craftspeople we have
              built relationships with over years.
            </p>
          </div>
          <aside className="md:col-span-5 md:pl-12 md:border-l border-beige">
            <dl className="space-y-8">
              {[
                ["Founded", "2019, Mumbai"],
                ["Studio", "8 full-time / 30+ partners"],
                ["Capacity", "~30 events / year"],
                ["Travel", "India · Asia · Europe"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-mute">{k}</dt>
                  <dd className="mt-2 font-display text-2xl text-burgundy">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-burgundy-deep text-ivory py-24 text-center">
        <div className="container-prose">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display italic text-3xl md:text-5xl max-w-4xl mx-auto leading-tight"
          >
            "We design events the way a writer drafts a story — slowly, carefully, with revisions."
          </motion.p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-gold">— The Varnana Studio</p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-burgundy-deep hover:bg-gold-light transition">
            Work With Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
