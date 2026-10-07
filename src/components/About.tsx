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
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-dark-bg overflow-hidden">
      <div
        aria-hidden="true"
        className="ember-orb right-[-120px] top-[10%] h-[320px] w-[320px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,138,60,0.12), transparent)",
        }}
      />
      <div ref={sectionRef} className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <span className="about-text-reveal eyebrow">
            Our Story
          </span>
          <h2 className="about-text-reveal font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-warm-white mt-5 sm:mt-6 px-2 text-balance">
            About Passion Photography
          </h2>
          <div className="about-text-reveal ember-divider mx-auto mt-5 w-40" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div ref={visualRef}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.4rem] bg-gradient-to-br from-gold/40 via-ember/20 to-peacock/40 blur-[1px]"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/25 shadow-[0_30px_70px_rgba(18,41,31,0.22)]">
                <Image
                  src="/images/about.jpg"
                  alt="Passion Photography — wedding & newborn studio in Kurnool"
                  fill
                  className="object-cover saturate-[1.12]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/55 via-transparent to-gold/10" />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 sm:left-8 sm:right-auto rounded-2xl border border-gold/25 bg-dark-bg/85 px-5 py-4 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.55)]">
                <p className="font-display italic text-gold-light text-lg leading-none">
                  ★ 5.0 rated studio
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-text">
                  104 Google reviews · Kurnool
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 min-w-0 pt-4 md:pt-0">
            <p className="about-text-reveal inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 text-gold-light text-[0.68rem] sm:text-xs font-bold uppercase tracking-[0.25em]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-gold-light to-ember shadow-[0_0_10px_rgba(13,74,55,0.4)]" />
              Honest · Warm · Detailed
            </p>
            <h3 className="about-text-reveal font-display text-2xl sm:text-3xl md:text-4xl font-medium text-warm-white leading-tight text-balance">
              From Passion to Premium —
              <span className="italic text-gold-light"> Kurnool&apos;s</span>
              <br />
              Wedding &amp; Newborn Studio
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
              <div className="rounded-xl border border-gold/15 bg-gold/[0.06] px-4 py-3">
                <p className="text-gold-light font-bold text-lg font-display italic">Photography</p>
                <p className="text-muted-text text-sm">
                  Weddings · Newborns · Maternity · Portraits
                </p>
              </div>
              <div className="rounded-xl border border-ember/20 bg-ember/[0.07] px-4 py-3">
                <p className="text-gold-light font-bold text-lg font-display italic">Studio</p>
                <p className="text-muted-text text-sm">
                  Open 24 hours · TJ Shopping Mall
                </p>
              </div>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gold/20"
            >
              <div className="stat-item min-w-0">
                <p className="font-display text-2xl sm:text-3xl font-semibold text-gold-light drop-shadow-[0_2px_10px_rgba(13,74,55,0.18)]">5.0★</p>
                <p className="text-muted-text text-xs sm:text-sm mt-1">Google Rating</p>
              </div>
              <div className="stat-item min-w-0">
                <p className="font-display text-2xl sm:text-3xl font-semibold text-gold-light drop-shadow-[0_2px_10px_rgba(13,74,55,0.18)]">104+</p>
                <p className="text-muted-text text-xs sm:text-sm mt-1">Google Reviews</p>
              </div>
              <div className="stat-item min-w-0">
                <p className="font-display text-2xl sm:text-3xl font-semibold text-gold-light drop-shadow-[0_2px_10px_rgba(13,74,55,0.18)]">10+</p>
                <p className="text-muted-text text-xs sm:text-sm mt-1">Photo Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}