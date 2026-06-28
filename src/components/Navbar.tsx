"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import upaylesswhitelogo from "../../public/UpayLessLOGOtrans.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
        scrolled ? "bg-brand-dark/95 backdrop-blur-md" : "bg-brand-dark"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between mb-6 mt-6">
        <a href="#" aria-label="Back to top">
          <Image
            src={upaylesswhitelogo}
            alt="UPayLess Auto Repair Logo"
            width={200}
            height={200}
            className="hidden md:block"
          />
          <span className="block md:hidden text-brand-light font-heading font-semibold text-2xl">
            UPayLess Auto Repair
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xl font-body text-brand-light hover:text-brand-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:8053002996"
            className="flex items-center gap-2 bg-brand-blue text-white text-lg px-4 py-2 rounded-lg hover:bg-brand-blue-hover transition-colors font-body focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-dark"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-brand-light hover:text-brand-orange transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-dark rounded"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile slide-in panel */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-brand-dark flex flex-col p-8 shadow-2xl">
            <button
              className="self-end text-brand-light hover:text-brand-orange transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-body text-brand-light hover:text-brand-orange transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="tel:8053002996"
              className="mt-8 flex items-center justify-center gap-2 bg-brand-blue text-white px-4 py-3 rounded-lg hover:bg-brand-blue-hover transition-colors font-body"
              onClick={() => setMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
