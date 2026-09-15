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
    color: "from-gold/20 to-gold/5",
  },
  {
    number: "02",
    title: "Tender Newborn Frames",
    description:
      "Newborn sessions are our specialty — safe, calm, and oh-so-soft. Tiny hands, tiny toes, and the quietest moments of new parenthood.",
    color: "from-deep-teal/20 to-accent/5",
  },
  {
    number: "03",
    title: "Raw Emotions",
    description:
      "The stolen glances, the happy tears, the unscripted laughter — we live for the moments you didn't know were happening.",
    color: "from-gold/15 to-deep-teal/10",
  },
  {
    number: "04",
    title: "All Occasions, One Studio",
    description:
      "From intimate newborn and maternity shoots to grand weddings and cultural events — one trusted studio for every celebration.",
    color: "from-accent/15 to-gold/10",
  },
  {
    number: "05",
    title: "Heirloom Quality",
    description:
      "Your moments become family heirlooms — documented with the care, color, and reverence they truly deserve.",
    color: "from-deep-teal/15 to-gold/5",
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
    <section className="py-24 bg-gradient-to-b from-dark-bg via-deep-teal/5 to-dark-bg overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">
        <div className="carousel-reveal flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.3em]">
              Our Craft
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-warm-white mt-4">
              The Passion Touch
            </h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-300 active:scale-90"
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
              className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-300 active:scale-90"
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
        className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {highlights.map((item, i) => (
          <div
            key={i}
            className={`carousel-reveal flex-none w-[320px] md:w-[400px] snap-center rounded-2xl p-8 bg-gradient-to-br ${item.color} border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:scale-[1.02] group cursor-default`}
          >
            <span className="text-6xl font-bold text-gold/10 group-hover:text-gold/20 transition-colors duration-500">
              {item.number}
            </span>
            <h3 className="text-2xl font-bold text-warm-white mt-4 mb-3 group-hover:text-gold-light transition-colors duration-500">
              {item.title}
            </h3>
            <p className="text-muted-text leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}