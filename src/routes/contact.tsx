import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Varnana Events" },
      { name: "description", content: "Start a conversation with Varnana Events." },
      { property: "og:title", content: "Contact — Varnana Events" },
      { property: "og:description", content: "Tell us about your event. We respond within two working days." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="bg-ivory pt-40 pb-16">
        <div className="container-prose">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— Begin —</p>
          <AnimatedHeading
            as="h1"
            text="Tell us about your event."
            className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-burgundy"
          />
          <p className="mt-8 max-w-2xl text-ink/75 text-lg leading-relaxed">
            Share a few details and we'll reply within two working days. We take on a limited number of events each season.
          </p>
        </div>
      </section>

      <section className="bg-ivory pb-32">
        <div className="container-prose grid md:grid-cols-12 gap-12">
          <motion.form
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            onSubmit={(e) => { e.preventDefault(); alert("Thank you — we'll be in touch within two working days."); }}
            className="md:col-span-7 space-y-8"
          >
            {[
              { label: "Your Name", type: "text", name: "name" },
              { label: "Email", type: "email", name: "email" },
              { label: "Event Type & Date", type: "text", name: "event" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-mute mb-3">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  required
                  className="w-full bg-transparent border-b border-burgundy/30 focus:border-burgundy outline-none py-3 text-lg text-burgundy placeholder:text-mute/50 transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-mute mb-3">A Few Words</label>
              <textarea
                rows={5}
                required
                className="w-full bg-transparent border-b border-burgundy/30 focus:border-burgundy outline-none py-3 text-lg text-burgundy resize-none transition"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-burgundy px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-ivory hover:bg-burgundy-deep transition"
            >
              Send Inquiry <ArrowRight size={16} />
            </motion.button>
          </motion.form>

          <aside className="md:col-span-5 md:pl-12 md:border-l border-beige space-y-8">
            {[
              { Icon: Mail, label: "Email", value: "studio@varnanaevents.com" },
              { Icon: Phone, label: "Phone", value: "+91 98 2050 1010" },
              { Icon: MapPin, label: "Studio", value: "Lower Parel, Mumbai" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="mt-1 h-10 w-10 rounded-full bg-burgundy/5 flex items-center justify-center text-burgundy">
                  <Icon size={16} />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-mute">{label}</div>
                  <div className="mt-1 font-display text-xl text-burgundy">{value}</div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
