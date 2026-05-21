import { Link } from "@tanstack/react-router";
import { Instagram, Pin } from "lucide-react";
import logo from "@/assets/varnana.jpeg";

export function Footer() {
  return (
    <footer className="bg-burgundy-deep text-ivory border-t border-gold/40 mt-0">
      <div className="container-prose py-20 flex flex-col items-center gap-10 text-center">
        <img src={logo} alt="Varnana Events" className="h-14 w-auto rounded-sm opacity-95" />
        <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[12px] uppercase tracking-[0.24em] text-ivory/80">
          <Link to="/about" className="hover:text-gold transition">About</Link>
          <Link to="/services" className="hover:text-gold transition">Services</Link>
          <Link to="/gallery" className="hover:text-gold transition">Gallery</Link>
          <Link to="/contact" className="hover:text-gold transition">Contact</Link>
          <Link to="/admin/login" className="opacity-0 hover:opacity-100 transition-opacity duration-500 text-[8px]">Admin</Link>
        </nav>
        <div className="flex items-center gap-5 text-gold">
          <a href="#" aria-label="Instagram" className="hover:text-gold-light transition"><Instagram size={20} /></a>
          <a href="#" aria-label="Pinterest" className="hover:text-gold-light transition"><Pin size={20} /></a>
        </div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/50">
          © {new Date().getFullYear()} Varnana Events · Crafted with intention
        </p>
      </div>
    </footer>
  );
}
