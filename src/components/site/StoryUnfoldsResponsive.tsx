import { useEffect, useState } from "react";
import { StoryUnfolds } from "./StoryUnfolds";
import { StoryUnfoldsMobile } from "./StoryUnfoldsMobile";

/**
 * StoryUnfoldsResponsive - Switches between desktop and mobile versions
 * based on viewport width for optimal performance
 */
export function StoryUnfoldsResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return null;
  }

  return isMobile ? <StoryUnfoldsMobile /> : <StoryUnfolds />;
}
