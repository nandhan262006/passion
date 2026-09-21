"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".about-text-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-bg overflow-hidden">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="about-text-reveal text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
            Our Story
          </span>
          <h2 className="about-text-reveal text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mt-3 sm:mt-4 px-2 text-balance">
            About Passion Photography
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div ref={visualRef}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/about.jpg"
                alt="Passion Photography — wedding & newborn studio in Kurnool"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 min-w-0">
            <p className="about-text-reveal text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
              Honest · Warm · Detailed
            </p>
            <h3 className="about-text-reveal text-2xl sm:text-3xl md:text-4xl font-bold text-warm-white leading-tight text-balance">
              From Passion to Premium
              <br />
              Kurnool&apos;s Wedding &amp; Newborn Studio
            </h3>
            <p className="about-text-reveal text-muted-text text-base sm:text-lg leading-relaxed">
              What began as a passion for capturing life&apos;s most precious
              moments has grown into one of Kurnool&apos;s most trusted
              photography studios. Passion Photography serves families across
              Gandhi Nagar and nearby areas — from intimate newborn and
              maternity shoots to grand weddings and cultural events.
            </p>
            <p className="about-text-reveal text-muted-text text-base sm:text-lg leading-relaxed">
              Our signature aesthetic blends natural light, warm color, and
              honest emotion — no cookie-cutter packages. Rated 5.0 on Google,
              families choose us for quality they can feel and prices that are
              genuinely fair.
            </p>

            <div className="about-text-reveal flex flex-col min-[420px]:flex-row gap-4 min-[420px]:gap-8 pt-4 sm:pt-6">
              <div>
                <p className="text-gold font-bold text-lg">Photography</p>
                <p className="text-muted-text text-sm">
                  Weddings · Newborns · Maternity · Portraits
                </p>
              </div>
              <div className="w-px bg-gold/20" />
              <div>
                <p className="text-gold font-bold text-lg">Studio</p>
                <p className="text-muted-text text-sm">
                  Open 24 hours · TJ Shopping Mall
                </p>
              </div>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gold/10"
            >
              <div className="stat-item min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gold">5.0★</p>
                <p className="text-muted-text text-xs sm:text-sm mt-1">Google Rating</p>
              </div>
              <div className="stat-item min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gold">104+</p>
                <p className="text-muted-text text-xs sm:text-sm mt-1">Google Reviews</p>
              </div>
              <div className="stat-item min-w-0">
                <p className="text-2xl sm:text-3xl font-bold text-gold">10+</p>
                <p className="text-muted-text text-xs sm:text-sm mt-1">Photo Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}