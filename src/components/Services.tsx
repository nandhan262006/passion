"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { services, type ServiceCard } from "@/lib/services";

const ROTATE_MS = 5000;

const CARD_W = "min(300px, 72vw)";
const CARD_H = "min(400px, 100vw)";

export default function Services() {
  const visible = services.filter((s) => s.imageUrl);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragX = useRef<number | null>(null);
  const n = Math.max(visible.length, 1);

  const go = useCallback(
    (i: number) => setActive(((i % n) + n) % n),
    [n]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1), ROTATE_MS);
    return () => clearInterval(id);
  }, [active, paused, go]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="services"
      className="relative py-16 sm:py-24 bg-dark-bg overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="ember-orb left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(13,74,55,0.07), transparent)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <Reveal>
          <div className="text-center px-2">
            <p className="eyebrow">
              What We Offer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-warm-white mt-5 text-balance">
              Tailored{" "}
              <span className="italic text-gold-light">Experiences</span>
            </h2>
            <div className="ember-divider mx-auto mt-5 w-44" />
          </div>
        </Reveal>

        <div
          className="relative mt-10 sm:mt-14 overflow-hidden"
          style={{
            height: CARD_H,
            perspective: 1400,
            touchAction: "pan-y",
          }}
          onPointerDown={(e) => {
            dragX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragX.current === null) return;
            const dx = e.clientX - dragX.current;
            if (dx < -40) go(active + 1);
            if (dx > 40) go(active - 1);
            dragX.current = null;
          }}
          onPointerCancel={() => {
            dragX.current = null;
          }}
        >
          {visible.map((service: ServiceCard, i: number) => {
            const diff = ((i - active) % n + n) % n;
            const offset = diff > n / 2 ? diff - n : diff;
            const abs = Math.abs(offset);
            // On mobile only show immediate neighbours to avoid clutter/overflow.
            const hidden = isMobile ? abs > 1 : abs > 2;
            const spread = isMobile ? 52 : 62;
            const tilt = isMobile ? -22 : -32;
            const scale = isMobile ? 1 - abs * 0.1 : 1 - abs * 0.14;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`View ${service.title}`}
                tabIndex={hidden ? -1 : 0}
                aria-hidden={hidden}
                className="absolute top-0 outline-none"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: "50%",
                  transform: `translateX(calc(-50% + ${offset * spread}%)) rotateY(${offset * tilt}deg) scale(${scale})`,
                  opacity: hidden ? 0 : 1 - abs * 0.35,
                  zIndex: 20 - abs * 5,
                  transition: "all 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: hidden ? "default" : "pointer",
                  visibility: hidden ? "hidden" : "visible",
                  pointerEvents: hidden ? "none" : "auto",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-2xl border border-gold/20"
                  style={{
                    boxShadow: "0 25px 50px rgba(18,41,31,0.22)",
                  }}
                >
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 65vw, 400px"
                    className="w-full h-full object-cover block saturate-[1.1]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a241b]/90 via-[#0a241b]/25 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gold/10 to-transparent opacity-60" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-left">
                    <span className="inline-block rounded-full border border-gold/30 bg-dark-bg/60 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">
                      {service.category}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-white mt-2 drop-shadow-lg">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Reveal>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-12">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-gold/30 bg-gold/[0.06] flex items-center justify-center text-gold-light hover:border-gold hover:bg-gold/15 hover:shadow-[0_4px_18px_rgba(13,74,55,0.18)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap max-w-[60vw] sm:max-w-none">
              {visible.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="rounded-full border-none cursor-pointer transition-all duration-400 p-0"
                  style={{
                    height: 8,
                    width: i === active ? 32 : 8,
                    background:
                      i === active
                        ? "linear-gradient(90deg, #14604a, #083325)"
                        : "rgba(13,74,55,0.22)",
                    boxShadow:
                      i === active
                        ? "0 2px 12px rgba(13,74,55,0.4)"
                        : "none",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-gold/30 bg-gold/[0.06] flex items-center justify-center text-gold-light hover:border-gold hover:bg-gold/15 hover:shadow-[0_4px_18px_rgba(13,74,55,0.18)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}