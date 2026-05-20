import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface StoryUnfolds3DProps {
  videoUrl?: string;
  imageUrl?: string;
}

export const StoryUnfolds3D = ({ 
  videoUrl = 'https://videos.pexels.com/video-files/3571936/3571936-sd_640_360_30fps.mp4',
  imageUrl = 'https://images.unsplash.com/photo-1519671482677-504be0ffec60?w=1200&q=80'
}: StoryUnfolds3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 3D perspective transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 15, 0, -15, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-20, 0, 20, 0, -20]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.2, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.3]);

  // Parallax depth layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Video/Image scale and position
  const videoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.1, 1.3, 1.2, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.8, 0.8, 0.3]);

  // Scroll progress for text reveals
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.15, 0.35], [0, 0, 1]);
  const textOpacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.55], [0, 0, 1]);
  const textOpacity3 = useTransform(scrollYProgress, [0.4, 0.55, 0.75], [0, 0, 1]);
  const textOpacity4 = useTransform(scrollYProgress, [0.6, 0.75, 0.95], [0, 0, 1]);

  return (
    <div ref={containerRef} className="relative w-full bg-black overflow-hidden">
      {/* Main scroll container - 5x viewport height for 5 moments */}
      <div className="relative h-[500vh]">
        {/* Sticky container for 3D scene */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-burgundy via-burgundy/80 to-black">
          {/* 3D perspective wrapper */}
          <motion.div
            style={{
              perspective: 1200,
              rotateX,
              rotateY,
              rotateZ,
              scale,
              opacity,
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background layers with parallax */}
            <motion.div
              style={{ y: layer1Y }}
              className="absolute inset-0 bg-gradient-to-b from-burgundy to-burgundy/60"
            />

            {/* Video/Image layer */}
            <motion.div
              style={{
                scale: videoScale,
                opacity: videoOpacity,
              }}
              className="absolute inset-0 overflow-hidden"
            >
              {videoUrl ? (
                <video
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={imageUrl}
                  alt="Event moment"
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-burgundy/60" />
            </motion.div>

            {/* Parallax layer 2 */}
            <motion.div
              style={{ y: layer2Y }}
              className="absolute inset-0 bg-gradient-to-t from-burgundy/40 to-transparent"
            />

            {/* Parallax layer 3 */}
            <motion.div
              style={{ y: layer3Y }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/10 to-transparent"
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              {/* Moment 1: Burgundy background with tulip stem */}
              <motion.div
                style={{ opacity: textOpacity1 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="text-center">
                  <motion.h2
                    className="text-6xl md:text-7xl font-display text-gold mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    The Story
                  </motion.h2>
                  <motion.p
                    className="text-xl text-ivory/80"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Unfolds
                  </motion.p>
                </div>
              </motion.div>

              {/* Moment 2: Background transition with bloom effect */}
              <motion.div
                style={{ opacity: textOpacity2 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="text-center">
                  <motion.h3
                    className="text-5xl md:text-6xl font-display text-gold mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    Moments of Magic
                  </motion.h3>
                  <motion.div
                    className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
              </motion.div>

              {/* Moment 3: Grid cards fly in */}
              <motion.div
                style={{ opacity: textOpacity3 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="grid grid-cols-3 gap-4 max-w-2xl">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-gold/20 to-burgundy/20 rounded-lg backdrop-blur-sm border border-gold/30"
                      initial={{
                        opacity: 0,
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Moment 4: Fullscreen card collapse */}
              <motion.div
                style={{ opacity: textOpacity4 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <motion.div
                  className="w-full max-w-xl aspect-video bg-gradient-to-br from-gold/30 to-burgundy/30 rounded-2xl backdrop-blur-md border border-gold/40 flex items-center justify-center shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gold to-burgundy rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-display text-white">V</span>
                    </div>
                    <p className="text-ivory text-lg font-light">Varnana Events</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-gold" size={32} />
        </motion.div>
      </div>

      {/* CTA Section after scroll */}
      <div className="relative bg-ivory py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-6xl font-display text-burgundy mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Create Your Story?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let us craft moments that linger forever
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-burgundy text-ivory rounded-lg font-semibold hover:bg-burgundy/90 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start Your Journey
          </motion.button>
        </div>
      </div>
    </div>
  );
};
