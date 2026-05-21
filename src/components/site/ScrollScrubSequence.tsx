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
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ultra-smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.0001
  });

  // Map smooth progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Cinematic Zoom Effect
  const cinematicScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
  
  // Hero text opacity and subtle movement
  const heroOpacity = useTransform(smoothProgress, [0, 0.08, 0.75, 1], [0, 1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.1, 0.7, 1], [15, 0, 0, -15]);
  const heroScale = useTransform(smoothProgress, [0, 0.1, 0.7, 1], [0.98, 1, 1, 1.02]);

  // Progress bar width
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const firstImg = new Image();
    const firstFrameNum = startFrame.toString().padStart(3, "0");
    firstImg.src = `${baseUrl}${firstFrameNum}${extension}`;
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      renderFrame(0, [firstImg]);
    };

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

  const renderFrame = (index: number, imgs: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const currentFrame = Math.floor(index);
    const img = imgs[currentFrame] || imgs[0];

    if (img && (img.complete || imgs.length === 1)) {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      
      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
      }

      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      const scale = cinematicScale.get();
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.scale(scale, scale);
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
      ctx.drawImage(img, x, y, newWidth, newHeight);
      ctx.restore();
    }
  };

  useEffect(() => {
    const render = () => renderFrame(frameIndex.get(), images);
    render();
    const unsubscribe = frameIndex.on("change", render);
    window.addEventListener("resize", render);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", render);
    };
  }, [images, frameIndex, cinematicScale]);

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "800vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover transition-opacity duration-1000"
          style={{
            filter: "brightness(0.75) contrast(1.05) saturate(1.05)",
            opacity: firstFrameLoaded ? 1 : 0
          }}
        />

        {showHeroOverlay && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Refined Vignette: More subtle, focused on text area */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
            <div className="absolute inset-0 bg-black/10" />

            {/* Main Hero Text: Scaled down for editorial elegance */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div className="text-center max-w-4xl">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-[10px] md:text-[12px] uppercase tracking-[0.6em] text-gold/80 mb-8 font-medium"
                >
                  — Creative Event Studio —
                </motion.p>
                
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-ivory italic" style={{
                  textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)',
                }}>
                  We craft moments
                  <br />
                  <span className="text-gold" style={{
                    textShadow: '0 4px 30px rgba(196,168,130,0.3), 0 2px 15px rgba(0,0,0,0.5)',
                  }}>
                    that linger forever.
                  </span>
                </h1>

                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
                  className="h-px w-24 bg-gold/40 mx-auto mt-12"
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Progress Bar: Thinner and more subtle */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-20">
          <motion.div
            className="h-full bg-gold/60"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  );
}
