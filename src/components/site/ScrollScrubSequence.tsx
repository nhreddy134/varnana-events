import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollScrubSequenceProps {
  frameCount?: number;
  baseUrl?: string;
  extension?: string;
  startFrame?: number;
}

export default function ScrollScrubSequence({
  frameCount = 240,
  baseUrl = "/frames/ezgif-frame-",
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

  // Add smoothing to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map smooth progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = (startFrame + i).toString().padStart(3, "0");
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

    render();
    const unsubscribe = frameIndex.on("change", render);

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
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.75) contrast(1.1)", // Darkened slightly for better text contrast
          }}
        />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              <p className="font-serif text-ivory/60 uppercase tracking-[0.3em] text-[10px]">
                Composing the Vision...
              </p>
            </div>
          </div>
        )}

        {/* Narrative Overlays with Improved Visibility */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top & Bottom Vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 0.2], [0, 1, 0]),
              y: useTransform(smoothProgress, [0, 0.1, 0.2], [40, 0, -40]),
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <h2 className="font-serif text-4xl md:text-7xl text-white italic leading-tight drop-shadow-2xl">
                Every event is a <br /> 
                <span className="text-gold drop-shadow-[0_2px_10px_rgba(196,168,130,0.4)]">living story.</span>
              </h2>
              <div className="mt-6 h-px w-24 bg-gold/50 mx-auto" />
            </div>
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.4, 0.5, 0.6], [0, 1, 0]),
              y: useTransform(smoothProgress, [0.4, 0.5, 0.6], [40, 0, -40]),
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <h2 className="font-serif text-4xl md:text-7xl text-white italic leading-tight drop-shadow-2xl">
                Composed with <br /> 
                <span className="text-gold drop-shadow-[0_2px_10px_rgba(196,168,130,0.4)]">quiet intention.</span>
              </h2>
              <div className="mt-6 h-px w-24 bg-gold/50 mx-auto" />
            </div>
          </motion.div>

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 0]),
              y: useTransform(smoothProgress, [0.8, 0.9, 1], [40, 0, -40]),
            }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="text-center">
              <h2 className="font-serif text-4xl md:text-7xl text-white italic leading-tight drop-shadow-2xl">
                And details only <br /> 
                <span className="text-gold drop-shadow-[0_2px_10px_rgba(196,168,130,0.4)]">you remember.</span>
              </h2>
              <div className="mt-6 h-px w-24 bg-gold/50 mx-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
