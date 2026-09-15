"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { services, type ServiceCard } from "@/lib/services";

const ROTATE_MS = 5000;

const CARD_W = "min(300px, 65vw)";
const CARD_H = "min(400px, 87vw)";

export default function Services() {
  const visible = services.filter((s) => s.imageUrl);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
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

  return (
    <section
      id="services"
      className="py-24 bg-dark-bg overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <div className="text-center">
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.3em]">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-warm-white mt-4">
              Tailored{" "}
              <span className="italic text-gold">Experiences</span>
            </h2>
          </div>
        </Reveal>

        <div
          className="relative mt-14 overflow-hidden"
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
            const hidden = abs > 2;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`View ${service.title}`}
                className="absolute top-0 outline-none"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: "50%",
                  transform: `translateX(calc(-50% + ${offset * 62}%)) rotateY(${offset * -32}deg) scale(${1 - abs * 0.14})`,
                  opacity: hidden ? 0 : 1 - abs * 0.35,
                  zIndex: 20 - abs * 5,
                  transition: "all 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: hidden ? "default" : "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden rounded-2xl"
                  style={{
                    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                  }}
                >
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 65vw, 400px"
                    className="w-full h-full object-cover block"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-left">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {service.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Reveal>
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border border-gold/20 bg-transparent flex items-center justify-center text-warm-white/70 hover:border-gold hover:text-gold transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
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
                        ? "#E5E5E5"
                        : "rgba(184,184,184,0.25)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full border border-gold/20 bg-transparent flex items-center justify-center text-warm-white/70 hover:border-gold hover:text-gold transition-all duration-300"
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