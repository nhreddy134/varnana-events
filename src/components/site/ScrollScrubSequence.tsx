import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollScrubSequenceProps {
  frameCount?: number;
  baseUrl?: string;
  extension?: string;
  startFrame?: number;
  showHeroOverlay?: boolean;
}

export default function ScrollScrubSequence({
  frameCount = 240,
  baseUrl = "/frames/ezgif-frame-",
  extension = ".jpg",
  startFrame = 1,
  showHeroOverlay = true,
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

  // Hero text opacity: fade in at 5%, stay visible until 70%, fade out by 100%
  const heroOpacity = useTransform(smoothProgress, [0, 0.05, 0.7, 1], [0, 1, 1, 0]);

  // Progress bar width (0-100% as user scrolls through sequence)
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
    <div ref={containerRef} className="relative bg-black" style={{ height: "480vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.75) contrast(1.1)",
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

        {/* Hero Text Overlay */}
        {showHeroOverlay && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Vignette for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

            {/* Main Hero Text */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div className="text-center max-w-4xl">
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[1.1] text-ivory italic" style={{
                  textShadow: '0 4px 40px rgba(0,0,0,0.6), 0 2px 20px rgba(0,0,0,0.4)',
                  WebkitTextStroke: '0.5px rgba(255,255,255,0.2)',
                }}>
                  We craft moments
                  <br />
                  <span className="text-gold" style={{
                    textShadow: '0 4px 40px rgba(196,168,130,0.5), 0 2px 20px rgba(0,0,0,0.6)',
                    WebkitTextStroke: '0.5px rgba(196,168,130,0.3)',
                  }}>
                    that linger forever.
                  </span>
                </h1>
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold via-gold to-gold/60 z-20"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}
