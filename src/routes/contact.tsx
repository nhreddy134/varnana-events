import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { ContactInquiryForm } from "@/components/site/ContactInquiryForm";
import { Mail, Phone, MapPin, Loader2, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

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
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await trpc.contact.get.query();
        setContactInfo(data);
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="bg-ivory min-h-screen">
      <section className="bg-burgundy-deep pt-40 pb-24 relative overflow-hidden">
        {/* Decorative Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-burgundy/20 rounded-full blur-[120px]" />

        <div className="container-prose relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6"
          >
            — Begin Your Story —
          </motion.p>
          <AnimatedHeading
            as="h1"
            text="Tell us about your event."
            className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-ivory"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-2xl text-ivory/70 text-lg leading-relaxed font-light"
          >
            Share a few details and we'll reply within two working days. We take on a limited number of events each season to ensure editorial care for every client.
          </motion.p>
        </div>
      </section>

      <section className="py-32">
        <div className="container-prose grid md:grid-cols-12 gap-20">
          <div className="md:col-span-7">
            <ContactInquiryForm />
          </div>

          <aside className="md:col-span-5 space-y-12">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-8">— Studio Details —</h3>
              {loading ? (
                <div className="flex items-center gap-3 text-mute">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest">Loading...</span>
                </div>
              ) : (
                <div className="space-y-10">
                  <ContactItem 
                    Icon={Mail} 
                    label="Email" 
                    value={contactInfo?.email || "hello@varnana-events.com"} 
                    href={`mailto:${contactInfo?.email || "hello@varnana-events.com"}`}
                  />
                  <ContactItem 
                    Icon={Phone} 
                    label="Phone" 
                    value={contactInfo?.phone || "+1 (555) 123-4567"} 
                    href={`tel:${contactInfo?.phone}`}
                  />
                  <ContactItem 
                    Icon={MapPin} 
                    label="Studio" 
                    value={contactInfo?.address || "New York, NY 10001"} 
                  />
                  {contactInfo?.socialLinks?.instagram && (
                    <ContactItem 
                      Icon={Globe} 
                      label="Instagram" 
                      value={`@${contactInfo.socialLinks.instagram.split('/').pop()}`} 
                      href={contactInfo.socialLinks.instagram}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="pt-12 border-t border-beige">
              <p className="text-sm text-ink/60 leading-relaxed italic">
                "We believe that true luxury is not about excess, but about the quiet intention behind every choice."
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ Icon, label, value, href }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start gap-6 group"
    >
      <span className="mt-1 h-12 w-12 rounded-full bg-burgundy-deep/5 flex items-center justify-center text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-ivory">
        <Icon size={18} />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-mute font-bold mb-1">{label}</div>
        {href ? (
          <a href={href} className="font-display text-2xl text-burgundy hover:text-gold transition-colors">
            {value}
          </a>
        ) : (
          <div className="font-display text-2xl text-burgundy">{value}</div>
        )}
      </div>
    </motion.div>
  );
}
