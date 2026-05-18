import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/varnana.jpeg";

const NAV = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Journal" },
];

const BRAND = "VARNANA EVENTS";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 18 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(240,237,232,0.92)] backdrop-blur-xl border-b border-gold/30"
          : "bg-transparent"
      }`}
    >
      <div className="container-prose flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Varnana Events" className="h-10 w-auto rounded-sm" />
          <motion.span
            className="hidden sm:flex font-display text-burgundy text-lg tracking-[0.22em]"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
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
                className="text-[13px] uppercase tracking-[0.22em] text-ink hover:text-burgundy transition-colors"
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
            className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-[12px] uppercase tracking-[0.22em] text-ivory hover:bg-burgundy-deep transition-colors"
          >
            Let's Begin
          </Link>
        </motion.div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-burgundy"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
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
                Let's Begin
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
