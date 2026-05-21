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
      {/* Hero Section - More Impactful */}
      <section className="bg-[#6B1A1A] pt-56 pb-40 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/30 rounded-full blur-[150px]" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12px] uppercase tracking-[0.5em] text-gold mb-10 font-medium"
          >
            — Begin Your Story —
          </motion.p>
          <AnimatedHeading
            as="h1"
            text="Tell us about your event."
            className="font-serif text-6xl md:text-9xl leading-[1] text-[#F0EDE8] italic"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 max-w-2xl mx-auto text-[#F0EDE8]/80 text-xl md:text-2xl leading-relaxed font-light italic"
          >
            Share a few details and we'll reply within two working days. We take on a limited number of events each season to ensure editorial care for every client.
          </motion.p>
        </div>
      </section>

      {/* Main Content - Centered & Spacious */}
      <section className="py-40 px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Form Container - Centered and Large */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-20 rounded-[40px] shadow-[0_20px_80px_rgba(107,26,26,0.08)] border border-[#6B1A1A]/5 relative z-20"
          >
            <div className="text-center mb-16">
              <h3 className="text-[12px] uppercase tracking-[0.5em] text-[#C4A882] font-bold mb-4">— Inquiry Form —</h3>
              <p className="text-[#4A3728] font-serif text-2xl italic">We look forward to hearing your vision.</p>
            </div>
            <ContactInquiryForm />
          </motion.div>

          {/* Studio Details - Below Form, Centered Grid */}
          <div className="mt-40">
            <div className="text-center mb-20">
              <h3 className="text-[12px] uppercase tracking-[0.5em] text-[#C4A882] font-bold mb-4">— Studio Details —</h3>
              <div className="h-px w-20 bg-gold/30 mx-auto" />
            </div>

            {loading ? (
              <div className="flex justify-center items-center gap-3 text-[#9B8878]">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-[11px] uppercase tracking-widest">Loading Studio Info...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-16 md:gap-8">
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
              </div>
            )}
          </div>

          {/* Philosophy Quote - Centered Bottom */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40 text-center max-w-2xl mx-auto pt-20 border-t border-[#C4A882]/20"
          >
            <p className="text-2xl md:text-4xl text-[#4A3728] leading-relaxed italic font-serif">
              "We believe that true luxury is not about excess, but about the quiet intention behind every choice."
            </p>
            <p className="mt-10 text-[11px] uppercase tracking-[0.4em] text-[#C4A882] font-bold">— The Varnana Philosophy</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ Icon, label, value, href }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <span className="mb-6 h-16 w-16 rounded-full bg-[#6B1A1A]/5 flex items-center justify-center text-[#6B1A1A] transition-all duration-500 group-hover:bg-[#6B1A1A] group-hover:text-white group-hover:scale-110">
        <Icon size={24} />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#9B8878] font-bold mb-3">{label}</div>
        {href ? (
          <a href={href} className="font-serif text-xl md:text-2xl text-[#6B1A1A] hover:text-[#C4A882] transition-colors block">
            {value}
          </a>
        ) : (
          <div className="font-serif text-xl md:text-2xl text-[#6B1A1A]">{value}</div>
        )}
      </div>
    </motion.div>
  );
}
