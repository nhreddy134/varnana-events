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
    <div className="bg-[#F0EDE8] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#6B1A1A] pt-48 pb-32 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.4em] text-gold mb-8"
          >
            — Begin Your Story —
          </motion.p>
          <AnimatedHeading
            as="h1"
            text="Tell us about your event."
            className="font-serif text-5xl md:text-8xl leading-[1.05] text-[#F0EDE8] italic"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 max-w-2xl mx-auto text-[#F0EDE8]/70 text-lg md:text-xl leading-relaxed font-light italic"
          >
            Share a few details and we'll reply within two working days. We take on a limited number of events each season to ensure editorial care for every client.
          </motion.p>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-24 items-start">
          {/* Form Side - More Room */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-[0_10px_50px_rgba(107,26,26,0.05)] border border-[#6B1A1A]/5">
            <h3 className="text-[11px] uppercase tracking-[0.4em] text-[#C4A882] font-bold mb-10">— Inquiry Form —</h3>
            <ContactInquiryForm />
          </div>

          {/* Info Side */}
          <aside className="lg:col-span-5 space-y-16 lg:pl-10">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] text-[#C4A882] font-bold mb-12">— Studio Details —</h3>
              {loading ? (
                <div className="flex items-center gap-3 text-[#9B8878]">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest">Loading Studio Info...</span>
                </div>
              ) : (
                <div className="space-y-12">
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

            <div className="pt-16 border-t border-[#C4A882]/20">
              <p className="text-xl md:text-2xl text-[#4A3728] leading-relaxed italic font-serif">
                "We believe that true luxury is not about excess, but about the quiet intention behind every choice."
              </p>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[#C4A882] font-bold">— The Varnana Philosophy</p>
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
      className="flex items-start gap-8 group"
    >
      <span className="mt-1 h-14 w-14 rounded-full bg-[#6B1A1A]/5 flex items-center justify-center text-[#6B1A1A] transition-all duration-500 group-hover:bg-[#6B1A1A] group-hover:text-white group-hover:scale-110">
        <Icon size={20} />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#9B8878] font-bold mb-2">{label}</div>
        {href ? (
          <a href={href} className="font-serif text-2xl md:text-3xl text-[#6B1A1A] hover:text-[#C4A882] transition-colors">
            {value}
          </a>
        ) : (
          <div className="font-serif text-2xl md:text-3xl text-[#6B1A1A]">{value}</div>
        )}
      </div>
    </motion.div>
  );
}
