"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Portfolios", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-bg/95 backdrop-blur-lg border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center select-none">
          <Image
            src="/logo.png"
            alt="Passion Photography"
            width={80}
            height={80}
            priority
            className="h-10 w-auto md:h-12 brightness-0 invert"
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-gold"
                  : "text-warm-white/70 hover:text-gold"
              }`}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
              )}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#portfolio"
            className="btn-silver px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Explore Portfolio
          </a>
          <a
            href="#contact"
            className="btn-silver-outline px-5 py-2.5 text-sm font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
          >
            Book Now
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-warm-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-gold transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gold transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gold transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-dark-bg/98 backdrop-blur-xl border-t border-gold/10">
          <div className="flex flex-col items-center gap-6 py-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`transition-colors text-lg font-medium tracking-wide uppercase ${
                  activeSection === link.href.slice(1)
                    ? "text-gold"
                    : "text-warm-white/70 hover:text-gold"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-4 w-full px-8">
              <a
                href="#portfolio"
                onClick={() => setIsOpen(false)}
                className="btn-silver py-3 text-center text-sm font-semibold rounded-full transition-all"
              >
                Explore Portfolio
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="btn-silver-outline py-3 text-center text-sm font-semibold rounded-full transition-all"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}