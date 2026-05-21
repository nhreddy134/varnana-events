import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
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
  const heroSectionHeight = typeof window !== 'undefined' ? window.innerHeight * 4.8 : 0;

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

  const accentColor = useTransform(
    scrollY,
    [heroSectionHeight * 0.7, heroSectionHeight * 0.95],
    ["#C4A882", "#C4A882"]
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
        borderBottom: useTransform(
          bgOpacity,
          (opacity) => `1px solid rgba(196, 168, 130, ${opacity * 0.2})`
        ),
      }}
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex h-24 items-center justify-between">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <motion.img 
                src={logo} 
                alt="Varnana Events" 
                className="h-12 w-auto rounded-sm relative z-10" 
                style={{
                  filter: useTransform(
                    bgOpacity,
                    (opacity) => opacity > 0.5 ? "brightness(0.9)" : "brightness(1)"
                  )
                }}
              />
              <motion.div 
                className="absolute -inset-2 bg-gold/10 rounded-full blur-xl -z-10"
                style={{ opacity: useTransform(bgOpacity, [0, 0.5], [0.4, 0]) }}
              />
            </div>
            <div className="flex flex-col">
              <motion.span
                className="font-display text-xl tracking-[0.25em] leading-none"
                style={{ color: textColor }}
              >
                VARNANA
              </motion.span>
              <motion.span 
                className="text-[9px] uppercase tracking-[0.4em] mt-1.5 opacity-60"
                style={{ color: textColor }}
              >
                Events & Design
              </motion.span>
            </div>
          </Link>

          {/* Location Indicator - Editorial Detail */}
          <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-gold/20 h-8">
            <motion.div 
              className="flex items-center gap-2"
              style={{ color: textColor }}
            >
              <Globe size={12} className="opacity-40" />
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">NYC / Worldwide</span>
            </motion.div>
          </div>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          {NAV.map((n, i) => (
            <motion.div
              key={n.to}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.4 + i * 0.08 }}
              className="relative group"
            >
              <Link
                to={n.to}
                className="text-[12px] uppercase tracking-[0.3em] transition-colors font-medium"
                style={{ color: textColor }}
                activeProps={{ className: "!text-gold" }}
              >
                {n.label}
              </Link>
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full"
                style={{ backgroundColor: accentColor }}
              />
            </motion.div>
          ))}
        </nav>

        {/* Right: CTA & Social/Menu */}
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.8 }}
            className="hidden md:block"
          >
            <Link
              to="/contact"
              className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[11px] uppercase tracking-[0.3em] transition-all duration-500"
              style={{
                backgroundColor: useTransform(
                  bgOpacity,
                  [0, 1],
                  ["rgba(240, 237, 232, 0.1)", "#6B1A1A"]
                ),
                color: useTransform(
                  bgOpacity,
                  [0, 1],
                  ["#F0EDE8", "#F0EDE8"]
                ),
                border: useTransform(
                  bgOpacity,
                  [0, 1],
                  ["1px solid rgba(240, 237, 232, 0.3)", "1px solid transparent"]
                ),
              }}
            >
              <span className="relative z-10">Plan Your Event</span>
              <motion.div 
                className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              />
            </Link>
          </motion.div>

          <motion.button
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
            style={{ color: textColor }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </motion.button>
        </div>
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
            <div className="flex items-center justify-between h-24 px-6">
              <span className="font-display text-burgundy text-xl tracking-[0.25em]">VARNANA</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-burgundy p-2">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-10">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl text-burgundy italic"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-8 rounded-full bg-burgundy px-10 py-4 text-[12px] uppercase tracking-[0.3em] text-ivory"
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
