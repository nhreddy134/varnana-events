import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedHeading } from "@/components/site/AnimatedHeading";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Image as ImageIcon } from "lucide-react";

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

function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await trpc.gallery.getAll.query();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="bg-ivory min-h-screen">
      <section className="pt-40 pb-16">
        <div className="container-prose">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold mb-6">— Selected Work —</p>
          <AnimatedHeading
            as="h1"
            text="A quiet archive of recent moments."
            className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.05] text-burgundy max-w-5xl"
          />
        </div>
      </section>

      <section className="pb-32">
        <div className="container-prose">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-burgundy mb-4" />
              <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">Loading Archive...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-burgundy/20 rounded-lg">
              <ImageIcon className="mx-auto text-burgundy/20 mb-4" size={48} />
              <p className="text-burgundy/40 font-display text-xl">Our archive is currently being curated.</p>
              <p className="text-mute text-sm mt-2">Please check back soon for new stories.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {items.map((it, i) => (
                  <motion.figure
                    key={it.id || i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } }
                    }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-sm aspect-[4/5] bg-burgundy-deep/5 shadow-xl transition-all duration-700 group-hover:shadow-burgundy/10">
                      {it.imageUrl ? (
                        <img 
                          src={it.imageUrl} 
                          alt={it.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-burgundy-deep/10">
                          <ImageIcon size={32} className="text-burgundy/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-burgundy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                         <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-ivory text-[10px] uppercase tracking-[0.4em] font-bold mb-2">View Story</p>
                            <div className="h-px w-8 bg-gold mx-auto" />
                         </div>
                      </div>
                    </div>
                    <figcaption className="mt-6">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display text-2xl text-burgundy">{it.title}</h3>
                        <span className="h-px w-8 bg-gold/30" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-mute font-bold">{it.category || 'Event'} · {it.location || 'Selected'}</p>
                    </figcaption>
                  </motion.figure>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
