import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { productionGalleryImages } from '@/data/galleryImages';
import { trpc } from '@/lib/trpc';

interface GalleryImage {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  eventType: string;
}

export const GalleryWithLightbox = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);

  const eventTypes = [
    'All',
    'Weddings',
    'Corporate Events',
    'Birthdays',
    'Anniversaries',
    'Social Events',
    'Cultural Events',
  ];

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await trpc.gallery.getPublished.query();
        
        // If backend has images, use them; otherwise fallback to production images
        if (data && data.length > 0) {
          setImages(data as GalleryImage[]);
          setFilteredImages(data as GalleryImage[]);
        } else {
          setImages(productionGalleryImages as GalleryImage[]);
          setFilteredImages(productionGalleryImages as GalleryImage[]);
        }
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
        // Fallback to production images on error
        setImages(productionGalleryImages as GalleryImage[]);
        setFilteredImages(productionGalleryImages as GalleryImage[]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Filter images by event type
  const handleFilter = (type: string) => {
    setSelectedEventType(type === 'All' ? null : type);
    if (type === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.eventType === type));
    }
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + filteredImages.length) % filteredImages.length));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredImages.length));
  };

  const currentImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  if (loading) {
    return (
      <section className="py-28 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="animate-spin text-burgundy mb-4" size={48} />
          <p className="text-burgundy/60 uppercase tracking-[0.2em] text-xs font-bold">Curating Gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 px-4 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold mb-4 block">Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-display text-burgundy mb-6">Our Gallery</h2>
          <div className="w-24 h-px bg-gold mx-auto mb-8" />
          <p className="text-xl text-ink/70 max-w-2xl mx-auto">
            A curated collection of moments captured across our most distinguished celebrations.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {eventTypes.map((type) => (
            <motion.button
              key={type}
              onClick={() => handleFilter(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                (type === 'All' && selectedEventType === null) || selectedEventType === type
                  ? 'bg-burgundy text-ivory shadow-lg'
                  : 'bg-white text-burgundy border border-burgundy/20 hover:border-burgundy/60'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -12 }}
                onClick={() => setSelectedIndex(index)}
                className="cursor-pointer group relative aspect-[4/5] overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Sophisticated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/90 via-burgundy-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-gold text-xs uppercase tracking-[0.3em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {image.eventType}
                  </span>
                  <h3 className="text-ivory font-display text-2xl mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {image.title}
                  </h3>
                  <div className="w-12 h-px bg-gold/50 mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No images message */}
        {filteredImages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-burgundy/20"
          >
            <p className="text-burgundy/60 uppercase tracking-[0.2em] text-sm font-bold">No moments found in this category</p>
          </motion.div>
        )}
      </div>

      {/* Cinematic Lightbox Modal */}
      <AnimatePresence>
        {currentImage && selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-burgundy-deep/98 z-[100] flex items-center justify-center p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 text-ivory/60 hover:text-gold transition-colors z-[110]"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={40} strokeWidth={1} />
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative max-w-6xl w-full max-h-[85vh] flex flex-col md:flex-row bg-ivory rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main image area */}
              <div className="relative flex-grow bg-black flex items-center justify-center overflow-hidden group">
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Navigation arrows (desktop) */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-gold transition-all opacity-0 group-hover:opacity-100 p-4 rounded-full bg-black/20 backdrop-blur-sm"
                    >
                      <ChevronLeft size={32} strokeWidth={1} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-gold transition-all opacity-0 group-hover:opacity-100 p-4 rounded-full bg-black/20 backdrop-blur-sm"
                    >
                      <ChevronRight size={32} strokeWidth={1} />
                    </button>
                  </>
                )}
              </div>

              {/* Info Sidebar (desktop) */}
              <div className="w-full md:w-80 p-8 md:p-10 flex flex-col justify-center bg-ivory">
                <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 font-bold block">
                  {currentImage.eventType}
                </span>
                <h3 className="text-burgundy font-display text-3xl md:text-4xl mb-6 leading-tight">
                  {currentImage.title}
                </h3>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="text-ink/70 text-sm leading-relaxed mb-8">
                  {currentImage.description || 'A timeless moment captured with editorial precision.'}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-mute font-bold">
                    {selectedIndex + 1} / {filteredImages.length}
                  </span>
                  <div className="flex gap-4">
                    <button onClick={handlePrevious} className="text-burgundy hover:text-gold transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNext} className="text-burgundy hover:text-gold transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
