import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { productionGalleryImages } from '@/data/galleryImages';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
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
        // TODO: Replace with actual tRPC call
        // const response = await trpc.gallery.getPublished.query();
        // setImages(response);

        // Use production gallery images
        setImages(productionGalleryImages);
        setFilteredImages(productionGalleryImages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
        // Fallback to production images on error
        setImages(productionGalleryImages);
        setFilteredImages(productionGalleryImages);
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

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + filteredImages.length) % filteredImages.length));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredImages.length));
  };

  const currentImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  if (loading) {
    return (
      <section className="py-20 px-4 bg-ivory">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-96">
          <Loader2 className="animate-spin text-burgundy" size={40} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display text-burgundy mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600">
            Explore moments from our most memorable events
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {eventTypes.map((type) => (
            <motion.button
              key={type}
              onClick={() => handleFilter(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                (type === 'All' && selectedEventType === null) || selectedEventType === type
                  ? 'bg-burgundy text-ivory'
                  : 'bg-white text-burgundy border-2 border-burgundy hover:bg-burgundy/10'
              }`}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Image */}
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=800&q=80';
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-white/80 text-sm">{image.eventType}</p>
              </div>

              {/* Play icon for hover effect */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-8 border-l-white border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* No images message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No images found for this category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentImage && selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-gold transition z-60"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            {/* Image container */}
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main image */}
              <img
                src={currentImage.imageUrl}
                alt={currentImage.title}
                className="w-full rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=1200&q=80';
                }}
              />

              {/* Image info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{currentImage.title}</h3>
                <p className="text-white/80 mb-2">{currentImage.description}</p>
                <p className="text-gold font-semibold">{currentImage.eventType}</p>
              </motion.div>

              {/* Navigation arrows */}
              {filteredImages.length > 1 && (
                <>
                  <motion.button
                    onClick={handlePrevious}
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gold transition bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gold transition bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>

                  {/* Image counter */}
                  <div className="absolute top-6 left-6 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    {selectedIndex + 1} / {filteredImages.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
