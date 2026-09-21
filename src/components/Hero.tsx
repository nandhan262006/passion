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

function getGrid() {
  // Guarded: only ever called inside useEffect (client-only), never during render.
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cols = w < 640 ? 4 : w < 1024 ? 6 : 8;
  const tileH = w / cols / 0.8;
  const rows = Math.min(6, Math.max(3, Math.ceil(h / tileH)));
  return { cols, rows };
}

// SSR-safe default — must match server render exactly to avoid hydration mismatch.
const SSR_GRID = { cols: 8, rows: 3 };

export default function Hero() {
  const [started, setStarted] = useState(false);
  const [grid, setGrid] = useState(SSR_GRID);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("loaderShown");
    const delay = alreadyShown ? 100 : 2400;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Sync grid to real viewport after hydration — deferred to rAF so the
    // first client render matches SSR exactly (no hydration mismatch).
    const raf = requestAnimationFrame(() => setGrid(getGrid()));
    const onResize = () => setGrid(getGrid());
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const reveal = (delay: number, amount = 24): CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? "translateY(0)" : `translateY(${amount}px)`,
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <section
      id="home"
      className="relative flex w-full items-center justify-center overflow-hidden px-4 py-24 sm:px-8"
      style={{ minHeight: "100svh" }}
    >
      <div
        className="hero-grid absolute inset-x-0 top-1/2 z-0 grid -translate-y-1/2"
        aria-hidden="true"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gap: 0,
        }}
      >
        {Array.from({ length: grid.cols * grid.rows }, (_, i) => (
          <div
            key={i}
            style={{
              overflow: "hidden",
              background: "#1a1714",
              aspectRatio: "4 / 5",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- grid tiles require plain fill styling */}
            <img
              src={GRID_IMAGES[i % GRID_IMAGES.length]}
              alt=""
              loading={i < 8 ? "eager" : "lazy"}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
        className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 px-2 text-center sm:gap-8 sm:px-6"
        style={reveal(200)}
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="w-full">
          <h1 className="chrome-text text-[clamp(2rem,9vw,4.5rem)] font-bold tracking-tight leading-[1.05] break-words">
            Passion Photography
          </h1>
          <p className="mt-3 text-[0.65rem] sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.5em] sm:pl-[0.5em] text-warm-white/80 leading-relaxed">
            Wedding &amp; Newborn Studio · Kurnool
          </p>
        </div>

        <p className="text-silver-glow text-base sm:text-xl md:text-2xl max-w-3xl font-light leading-relaxed tracking-wide italic px-1">
          &ldquo;Every wedding and newborn moment — captured with passion, care,
          and a signature touch.&rdquo;
        </p>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5 mt-2 sm:mt-4 px-1">
          <a
            href="#portfolio"
            className="btn-silver group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-center"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <div className="absolute inset-0 bg-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a
            href="#contact"
            className="btn-silver-outline group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-center"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-6 right-4 sm:bottom-8 sm:right-8 z-10 hidden min-[400px]:flex flex-col items-center gap-2 text-warm-white/50" style={{ writingMode: "vertical-lr" }}>
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