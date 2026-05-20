import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollScrubSequenceProps {
  frameCount?: number;
  baseUrl?: string;
  extension?: string;
  startFrame?: number;
}

export default function ScrollScrubSequence({
  frameCount = 120,
  baseUrl = "https://raw.githubusercontent.com/nhreddy134/varnana-assets/main/frames/frame_",
  extension = ".jpg",
  startFrame = 1,
}: ScrollScrubSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = (startFrame + i).toString().padStart(4, "0");
      img.src = `${baseUrl}${frameNum}${extension}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, baseUrl, extension, startFrame]);

  // Draw current frame to canvas
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || images.length === 0) return;

      const currentFrame = Math.floor(frameIndex.get());
      const img = images[currentFrame];

      if (img && img.complete) {
        // Handle object-fit: cover logic in canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, x, y, newWidth, newHeight);
      }
    };

    // Initial render
    render();

    // Subscribe to frameIndex changes
    const unsubscribe = frameIndex.on("change", render);

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas for high-performance rendering */}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.9) contrast(1.1)",
          }}
        />

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              <p className="font-serif text-ivory/60 uppercase tracking-[0.3em] text-[10px]">
                Crafting the Story...
              </p>
            </div>
          </div>
        )}

        {/* Narrative Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.1, 0.2], [20, 0, -20]),
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center italic leading-tight">
              Every event is a <br /> <span className="text-gold">living story.</span>
            </h2>
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
              y: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [20, 0, -20]),
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center italic leading-tight">
              Composed with <br /> <span className="text-gold">quiet intention.</span>
            </h2>
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 0]),
              y: useTransform(scrollYProgress, [0.8, 0.9, 1], [20, 0, -20]),
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center italic leading-tight">
              And details only <br /> <span className="text-gold">you remember.</span>
            </h2>
          </motion.div>
        </div>

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
      </div>
    </div>
  );
}
