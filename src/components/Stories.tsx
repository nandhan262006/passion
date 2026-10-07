"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Google Review",
    role: "Newborn Photography",
    quote:
      "We have given our newborn shoot and the output was superb. Very patient and caring with our little one!",
    rating: 5,
  },
  {
    name: "Google Review",
    role: "Photo Shoot Customer",
    quote:
      "We have enjoyed the photo shoot and it is value for money.",
    rating: 5,
  },
  {
    name: "Google Review",
    role: "Wedding Customer",
    quote:
      "Very cooperative and best reasonable price with good quality.",
    rating: 5,
  },
  {
    name: "Passion Photography",
    role: "5.0 ★ · 104 Google Reviews",
    quote:
      "Rated 5.0 on Google by 104 happy clients — Kurnool's trusted wedding & newborn studio for weddings, newborns, portraits and events.",
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="card-luxe flex-none w-[78vw] max-w-[350px] sm:max-w-none sm:w-[350px] md:w-[420px] p-6 sm:p-8 rounded-2xl transition-all duration-500 group cursor-default snap-center">
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, j) => (
          <svg
            key={j}
            className="w-4 h-4 text-gold drop-shadow-[0_1px_4px_rgba(13,74,55,0.3)]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="font-display text-base sm:text-lg text-warm-white/85 leading-relaxed mb-6 italic group-hover:text-warm-white transition-colors duration-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-light via-gold to-ember flex items-center justify-center text-[#f7f4ec] font-bold text-sm group-hover:scale-110 group-hover:shadow-[0_4px_16px_rgba(13,74,55,0.35)] transition-all duration-300">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-semibold text-warm-white">{testimonial.name}</p>
          <p className="text-gold-light/70 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const positionRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".story-reveal"),
        { y: 40, opacity: 0 },
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

    const track = trackRef.current;
    const speed = 0.5;

    function tick() {
      if (!pausedRef.current) {
        positionRef.current -= speed;
        const totalWidth = track.scrollWidth / 2;
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <section id="stories" className="relative py-16 sm:py-24 bg-dark-bg overflow-hidden">
      <div
        aria-hidden="true"
        className="ember-orb left-1/2 top-[10%] h-[240px] w-[520px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,138,60,0.1), transparent)",
        }}
      />
      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <span className="story-reveal eyebrow">
            Love Stories
          </span>
          <h2 className="story-reveal font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-warm-white mt-5 text-balance">
            Client Stories
          </h2>
          <div className="ember-divider mx-auto mt-5 w-40" />
          <p className="story-reveal text-muted-text text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Every couple and family has a story worth telling. Here&apos;s what
            clients say about the Passion Photography experience.
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex gap-4 sm:gap-6 px-4 sm:px-6 will-change-transform">
          {testimonials.map((t, i) => (
            <TestimonialCard key={`a-${i}`} testimonial={t} />
          ))}
          {testimonials.map((t, i) => (
            <TestimonialCard key={`b-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mt-10 sm:mt-16">
          <p className="text-muted-text text-sm mb-4">See our work on</p>
          <div className="flex justify-center gap-6">
            <a
              href="tel:+919959990503"
              className="text-gold hover:text-gold-light transition-colors text-sm font-medium border-b border-gold/30 hover:border-gold pb-0.5"
            >
              +91 99599 90503
            </a>
            <a
              href="https://wa.me/919959990503"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors text-sm font-medium border-b border-gold/30 hover:border-gold pb-0.5"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}