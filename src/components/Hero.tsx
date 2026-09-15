"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const GRID_IMAGES = [
  "/images/about.jpg",
  "/images/gallery-02.jpg",
  "/images/gallery-03.jpg",
  "/images/gallery-04.jpg",
  "/images/gallery-05.jpg",
  "/images/gallery-06.jpg",
  "/images/gallery-07.jpg",
  "/images/gallery-08.jpg",
  "/images/gallery-09.jpg",
  "/images/gallery-10.jpg",
  "/images/gallery-11.jpg",
  "/images/gallery-12.jpg",
  "/images/gallery-13.jpg",
  "/images/gallery-14.jpg",
  "/images/gallery-15.jpg",
  "/images/gallery-16.jpg",
  "/images/gallery-17.jpg",
  "/images/gallery-18.jpg",
  "/images/gallery-19.jpg",
  "/images/gallery-20.jpg",
  "/images/gallery-21.jpg",
  "/images/gallery-22.jpg",
  "/images/gallery-23.jpg",
  "/images/gallery-24.jpg",
];

export default function Hero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loaderShown");
    const delay = alreadyShown ? 100 : 2400;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, []);

  const reveal = (delay: number, amount = 24): CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? "translateY(0)" : `translateY(${amount}px)`,
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      id="home"
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ minHeight: 700, height: "100vh", padding: "0 2rem" }}
    >
      <div
        className="hero-grid absolute inset-0 z-0 grid"
        style={{
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 0,
        }}
      >
        {GRID_IMAGES.map((src, i) => (
          <div
            key={i}
            style={{
              overflow: "hidden",
              background: "#1a1714",
              width: "100%",
              height: "100%",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- grid tiles require plain fill styling */}
            <img
              src={src}
              alt=""
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                filter: "brightness(0.6)",
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-dark-bg/25 to-dark-bg/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,13,15,0.4)_100%)]" />

      <div
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
        style={reveal(200)}
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div>
          <h1 className="chrome-text text-[clamp(2.4rem,8vw,4.5rem)] font-bold tracking-tight">
            Passion Photography
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.5em] pl-[0.5em] text-warm-white/80">
            Wedding &amp; Newborn Studio · Kurnool
          </p>
        </div>

        <p className="text-silver-glow text-lg sm:text-xl md:text-2xl max-w-3xl font-light leading-relaxed tracking-wide italic">
          &ldquo;Every wedding and newborn moment — captured with passion, care,
          and a signature touch.&rdquo;
        </p>

        <div className="flex flex-col items-center gap-5 sm:flex-row mt-4">
          <a
            href="#portfolio"
            className="btn-silver group relative px-10 py-4 text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <div className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a
            href="#contact"
            className="btn-silver-outline group relative px-10 py-4 text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-warm-white/50" style={{ writingMode: "vertical-lr" }}>
        <span className="text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
        <div
          className="relative overflow-hidden"
          style={{ width: 1, height: 60, background: "rgba(245,245,245,0.2)" }}
        >
          <div
            className="absolute left-0 w-full"
            style={{
              top: "-100%",
              height: "100%",
              background: "var(--color-gold)",
              animation: "scrollDown 2s ease infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}