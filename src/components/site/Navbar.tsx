import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/varnana.jpeg";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
];

const BRAND = "VARNANA EVENTS";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Determine if we're in the mandap hero section (approximately 480vh tall)
  // After ~480vh, transition to ivory background
  const heroSectionHeight = typeof window !== 'undefined' ? window.innerHeight * 4.8 : 0;
  const isInHeroSection = useTransform(
    scrollY,
    [0, heroSectionHeight * 0.8, heroSectionHeight],
    [true, true, false]
  );

  // Background opacity: transparent over hero, solid after
  const bgOpacity = useTransform(
    scrollY,
    [heroSectionHeight * 0.7, heroSectionHeight * 0.95],
    [0, 1]
  );

  // Text color: ivory over hero, burgundy after
  const textColor = useTransform(
    scrollY,
    [heroSectionHeight * 0.7, heroSectionHeight * 0.95],
    ["#F0EDE8", "#6B1A1A"]
  );

  const logoColor = useTransform(
    scrollY,
    [heroSectionHeight * 0.7, heroSectionHeight * 0.95],
    ["#F0EDE8", "#6B1A1A"]
  );

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 18 }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (opacity) => `rgba(240, 237, 232, ${opacity})`
        ),
        backdropFilter: useTransform(
          bgOpacity,
          (opacity) => opacity > 0.5 ? "blur(12px)" : "blur(0px)"
        ),
        borderBottomColor: useTransform(
          bgOpacity,
          (opacity) => `rgba(196, 168, 130, ${opacity * 0.3})`
        ),
      }}
      className="border-b"
    >
      <div className="container-prose flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img 
            src={logo} 
            alt="Varnana Events" 
            className="h-10 w-auto rounded-sm" 
            style={{
              filter: useTransform(
                logoColor,
                (color) => color === "#F0EDE8" ? "brightness(1)" : "brightness(0.8)"
              )
            }}
          />
          <motion.span
            className="hidden sm:flex font-display text-lg tracking-[0.22em]"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
            style={{ color: textColor }}
          >
            {BRAND.split("").map((ch, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } },
                }}
                className="inline-block"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n, i) => (
            <motion.div
              key={n.to}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.6 + i * 0.08 }}
            >
              <Link
                to={n.to}
                className="text-[13px] uppercase tracking-[0.22em] transition-colors"
                style={{ color: textColor }}
                activeProps={{ className: "text-burgundy" }}
              >
                {n.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 16, delay: 1.0 }}
          className="hidden md:block"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] uppercase tracking-[0.22em] transition-all"
            style={{
              backgroundColor: useTransform(
                scrollY,
                [heroSectionHeight * 0.7, heroSectionHeight * 0.95],
                ["rgba(107, 26, 26, 0.3)", "#6B1A1A"]
              ),
              color: useTransform(
                scrollY,
                [heroSectionHeight * 0.7, heroSectionHeight * 0.95],
                ["#F0EDE8", "#F0EDE8"]
              ),
            }}
          >
            Plan Your Event
          </Link>
        </motion.div>

        <motion.button
          onClick={() => setOpen(true)}
          className="md:hidden"
          style={{ color: textColor }}
          aria-label="Open menu"
        >
          <Menu size={26} />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed inset-0 z-50 bg-ivory md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between h-20 container-prose">
              <span className="font-display text-burgundy text-lg tracking-[0.22em]">VARNANA</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-burgundy">
                <X size={26} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl text-burgundy"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-burgundy px-8 py-3 text-[12px] uppercase tracking-[0.22em] text-ivory"
              >
                Plan Your Event
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
