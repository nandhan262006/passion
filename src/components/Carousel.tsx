"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    number: "01",
    title: "Golden Hour Magic",
    description:
      "We chase the light. Our signature golden hour shots capture that ethereal warmth that makes every frame feel like a painting.",
    color: "from-gold/25 via-ember/10 to-transparent",
  },
  {
    number: "02",
    title: "Tender Newborn Frames",
    description:
      "Newborn sessions are our specialty — safe, calm, and oh-so-soft. Tiny hands, tiny toes, and the quietest moments of new parenthood.",
    color: "from-peacock/60 via-secondary-teal/30 to-transparent",
  },
  {
    number: "03",
    title: "Raw Emotions",
    description:
      "The stolen glances, the happy tears, the unscripted laughter — we live for the moments you didn't know were happening.",
    color: "from-ember/20 via-gold/10 to-transparent",
  },
  {
    number: "04",
    title: "All Occasions, One Studio",
    description:
      "From intimate newborn and maternity shoots to grand weddings and cultural events — one trusted studio for every celebration.",
    color: "from-blush/15 via-gold/10 to-transparent",
  },
  {
    number: "05",
    title: "Heirloom Quality",
    description:
      "Your moments become family heirlooms — documented with the care, color, and reverence they truly deserve.",
    color: "from-secondary-teal/50 via-ember/10 to-transparent",
  },
];

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".carousel-reveal"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-dark-bg via-peacock-deep/60 to-dark-bg overflow-hidden">
      <div
        aria-hidden="true"
        className="ember-orb left-[8%] top-[12%] h-[260px] w-[260px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(13,74,55,0.07), transparent)",
        }}
      />
      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="carousel-reveal flex items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="min-w-0">
            <span className="eyebrow">
              Our Craft
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-warm-white mt-5 text-balance">
              The Passion Touch
            </h2>
            <div className="ember-divider mt-4 w-32" />
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gold/30 bg-gold/[0.06] flex items-center justify-center text-gold-light hover:bg-gold/15 hover:border-gold hover:shadow-[0_8px_28px_rgba(13,74,55,0.18)] transition-all duration-300 active:scale-90"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gold/30 bg-gold/[0.06] flex items-center justify-center text-gold-light hover:bg-gold/15 hover:border-gold hover:shadow-[0_8px_28px_rgba(13,74,55,0.18)] transition-all duration-300 active:scale-90"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-6 pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {highlights.map((item, i) => (
          <div
            key={i}
            className={`carousel-reveal card-luxe flex-none w-[78vw] max-w-[320px] sm:max-w-none sm:w-[320px] md:w-[400px] snap-center rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${item.color} hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_12px_34px_rgba(13,74,55,0.14)] group cursor-default`}
          >
            <span className="font-display text-5xl sm:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-gold-light/50 to-ember/20 group-hover:from-gold-light/80 group-hover:to-ember/40 transition-all duration-500">
              {item.number}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-warm-white mt-4 mb-3 group-hover:text-gold-light transition-colors duration-500">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-text leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}