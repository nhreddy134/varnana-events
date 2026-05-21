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

  // Scroll progress for the entire section - Increased height for more "frames per scroll"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ultra-smooth spring physics for "liquid" movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40, // Lower stiffness for more fluid, cinematic feel
    damping: 25,   // Balanced damping for smooth deceleration
    restDelta: 0.0001
  });

  // Map smooth progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Cinematic Zoom Effect: Subtle scale-up as you scroll deeper into the mandap
  const cinematicScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  
  // Hero text opacity: fade in at 5%, stay visible until 75%, fade out by 100%
  const heroOpacity = useTransform(smoothProgress, [0, 0.08, 0.75, 1], [0, 1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.1, 0.7, 1], [20, 0, 0, -20]);

  // Progress bar width
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Preload images with priority for the first frame
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Load first frame immediately
    const firstImg = new Image();
    const firstFrameNum = startFrame.toString().padStart(3, "0");
    firstImg.src = `${baseUrl}${firstFrameNum}${extension}`;
    firstImg.onload = () => {
      setFirstFrameLoaded(true);
      // Trigger initial render
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
    const img = imgs[currentFrame] || imgs[0]; // Fallback to first frame if current not loaded

    if (img && (img.complete || imgs.length === 1)) {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      
      // Update canvas size if needed
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
      
      // Apply the cinematic scale transformation
      const scale = cinematicScale.get();
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.scale(scale, scale);
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
      ctx.drawImage(img, x, y, newWidth, newHeight);
      ctx.restore();
    }
  };

  // Draw current frame to canvas
  useEffect(() => {
    const render = () => renderFrame(frameIndex.get(), images);
    
    render();
    const unsubscribe = frameIndex.on("change", render);

    const handleResize = () => {
      render();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex, cinematicScale]);

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "800vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover transition-opacity duration-700"
          style={{
            filter: "brightness(0.8) contrast(1.05) saturate(1.1)",
            opacity: firstFrameLoaded ? 1 : 0
          }}
        />

        {/* Loading State - Only show if first frame isn't ready */}
        {!firstFrameLoaded && (
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

            {/* Main Hero Text */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <div className="text-center max-w-5xl">
                <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.95] text-ivory italic" style={{
                  textShadow: '0 10px 60px rgba(0,0,0,0.8), 0 2px 20px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '0.5px rgba(255,255,255,0.1)',
                }}>
                  We craft moments
                  <br />
                  <span className="text-gold" style={{
                    textShadow: '0 10px 60px rgba(196,168,130,0.4), 0 2px 30px rgba(0,0,0,0.7)',
                    WebkitTextStroke: '0.5px rgba(196,168,130,0.2)',
                  }}>
                    that linger forever.
                  </span>
                </h1>
              </div>
            </motion.div>
          </div>
        )}

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-gold via-gold to-gold/60"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  );
}
