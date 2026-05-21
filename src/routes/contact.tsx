import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ContactInquiryForm } from "@/components/site/ContactInquiryForm";
import { Mail, Phone, MapPin, Loader2, Globe, Instagram } from "lucide-react";
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
    <div className="bg-[#F0EDE8] min-h-screen flex flex-col">
      {/* Editorial Header */}
      <header className="pt-48 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6B1A1A]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] uppercase tracking-[0.5em] text-gold mb-12 font-medium"
          >
            — Begin Your Story —
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-6xl md:text-8xl leading-[1.1] text-[#6B1A1A] italic mb-12"
          >
            Tell us about <br className="hidden md:block" /> your event.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px w-24 bg-gold/40 mx-auto mb-12"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-[#4A3728] text-xl md:text-2xl leading-relaxed font-serif italic"
          >
            Share a few details and we'll reply within two working days. We take on a limited number of events each season to ensure editorial care for every client.
          </motion.p>
        </div>
      </header>

      {/* Form Section - Centered & Spacious */}
      <main className="flex-grow pb-48 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/40 backdrop-blur-sm p-12 md:p-24 rounded-[60px] border border-gold/10 shadow-[0_40px_100px_rgba(107,26,26,0.03)]"
          >
            <ContactInquiryForm />
          </motion.div>

          {/* Studio Details - Centered Grid */}
          <div className="mt-48">
            <div className="text-center mb-24">
              <h3 className="text-[11px] uppercase tracking-[0.5em] text-gold font-bold mb-6">— Studio Details —</h3>
              <div className="h-px w-16 bg-gold/30 mx-auto" />
            </div>

            {loading ? (
              <div className="flex justify-center items-center gap-4 text-[#9B8878]">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-[10px] uppercase tracking-[0.3em]">Gathering details...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-20 md:gap-12">
                {/* Email */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#6B1A1A] group-hover:border-[#6B1A1A] transition-all duration-500">
                    <Mail size={18} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9B8878] mb-4">Inquiries</h4>
                  <p className="text-[#6B1A1A] font-serif text-lg italic">{contactInfo?.email || "hello@varnana.com"}</p>
                </motion.div>

                {/* Social */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#6B1A1A] group-hover:border-[#6B1A1A] transition-all duration-500">
                    <Instagram size={18} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9B8878] mb-4">Social</h4>
                  <p className="text-[#6B1A1A] font-serif text-lg italic">@varnanaevents</p>
                </motion.div>

                {/* Location */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#6B1A1A] group-hover:border-[#6B1A1A] transition-all duration-500">
                    <Globe size={18} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#9B8878] mb-4">Presence</h4>
                  <p className="text-[#6B1A1A] font-serif text-lg italic">{contactInfo?.address || "New York & Worldwide"}</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white/40 to-transparent pointer-events-none" />
    </div>
  );
}
