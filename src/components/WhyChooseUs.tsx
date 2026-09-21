"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Signature Aesthetic",
    description:
      "Fun, classy, and natural — our images balance dramatic golden hour lighting with the tender, raw emotion of every celebration.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Emotional Storytelling",
    description:
      "We don't just capture moments — we immortalize family legacies through modern lenses with genuine emotion.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Every Celebration Covered",
    description:
      "Weddings, newborns, maternity, portraits, engagements and events — the same quality standard for every occasion you love.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fair, Transparent Pricing",
    description:
      "Straightforward packages and honest advice. Great quality at a genuinely fair price — exactly as our reviewers describe.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".why-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-bg overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <span className="why-reveal text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
            Our Promise
          </span>
          <h2 className="why-reveal text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mt-3 sm:mt-4 text-balance">
            Why Choose Passion Photography
          </h2>
          <p className="why-reveal text-muted-text text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            We don&apos;t just take photos. We create visual prestige that
            stands the test of time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="why-reveal flex gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl border border-gold/10 hover:border-gold/30 bg-gradient-to-br from-gold/5 to-transparent transition-all duration-500 group cursor-default min-w-0"
            >
              <div className="metal-chip flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
                {reason.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-warm-white mb-1.5 sm:mb-2 group-hover:text-gold-light transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}