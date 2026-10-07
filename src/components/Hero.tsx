"use client";

import * as React from "react";
import { motion } from "motion/react";

/* Fanned deck — uses our own gallery so no external assets are needed. */
const CARDS = [
  {
    src: "/images/gallery-09.jpg",
    alt: "Wedding reception celebration",
    rotate: -22,
    delay: 0.9,
    z: 10,
  },
  {
    src: "/images/gallery-03.jpg",
    alt: "Pre-wedding couple portrait",
    rotate: -11,
    delay: 0.75,
    z: 20,
  },
  {
    src: "/images/about.jpg",
    alt: "Signature Passion Photography portrait",
    rotate: 0,
    delay: 0.6,
    z: 30,
  },
  {
    src: "/images/gallery-05.jpg",
    alt: "Newborn baby session",
    rotate: 11,
    delay: 0.75,
    z: 20,
  },
  {
    src: "/images/gallery-02.jpg",
    alt: "Traditional wedding moment",
    rotate: 22,
    delay: 0.9,
    z: 10,
  },
];

export default function Hero() {
  const [spacing, setSpacing] = React.useState(120);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setSpacing(mq.matches ? 84 : 120);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-svh w-full flex-col overflow-hidden"
    >
      {/* Soft luxury aura glows */}
      <div
        aria-hidden="true"
        className="ember-orb left-1/2 top-[4%] h-[320px] w-[560px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,138,60,0.14), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="ember-orb -left-24 bottom-[10%] h-[280px] w-[280px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(13,74,55,0.08), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="ember-orb -right-24 top-[30%] h-[300px] w-[300px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(20,51,60,0.9), transparent)",
        }}
      />

      <div className="relative flex flex-1 flex-col items-center px-4 pb-0 pt-28 text-center sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="eyebrow">★ 5.0 · 104 Google reviews · Kurnool</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="chrome-text font-display mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          Capture{" "}
          <em className="font-bold italic text-gold-light">
            Love &amp; Beginnings
          </em>
          <br />
          that&apos;s ready to treasure
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          className="text-silver-glow mt-5 max-w-sm text-base leading-relaxed"
        >
          Weddings, newborns, maternity &amp; portraits in Kurnool — styled,
          shot and delivered with passion.
        </motion.p>

        {/* Fanned card deck */}
        <div
          className="relative mt-10 flex h-[320px] w-full items-end justify-center sm:h-[380px]"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.src}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: card.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-0 origin-bottom"
              style={{
                rotate: card.rotate,
                zIndex: card.z,
                translateX: `${(i - 2) * spacing}px`,
              }}
            >
              <div className="h-60 w-40 overflow-hidden rounded-2xl border border-gold/30 shadow-[0_25px_50px_rgba(18,41,31,0.2)] ring-2 ring-gold-light/50 sm:h-72 sm:w-48 md:h-80 md:w-56">
                {/* eslint-disable-next-line @next/next/no-img-element -- fan cards need plain img for motion transforms */}
                <img
                  src={card.src}
                  alt={card.alt}
                  loading={i === 2 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover saturate-[1.1]"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.05 }}
          className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5"
        >
          <a
            href="#contact"
            className="btn-silver group relative overflow-hidden rounded-full px-8 py-3.5 text-center text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 sm:px-10 sm:py-4 sm:text-base"
          >
            <span className="relative z-10">Book Your Session</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-white/50 blur-md"
              style={{ animation: "ember-sheen 2.8s ease-in-out infinite" }}
            />
          </a>
          <a
            href="#portfolio"
            className="btn-silver-outline rounded-full px-8 py-3.5 text-center text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 sm:px-10 sm:py-4 sm:text-base"
          >
            Explore Portfolio
          </a>
        </motion.div>

        <p className="mt-6 pb-8 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted-text">
          Wedding <span className="text-gold mx-1">·</span> Newborn{" "}
          <span className="text-ember mx-1">·</span> Studio Kurnool
        </p>
      </div>

      {/* Melt into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-bg to-transparent" />
    </section>
  );
}
