"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    src: "/videos/cinematics.mp4",
    label: "Latest Reel",
  },
  {
    src: "/videos/cinematics-2.mp4",
    label: "Highlight Reel",
  },
  {
    src: "/videos/cinematics-3.mp4",
    label: "Wedding Reel",
  },
  {
    src: "/videos/cinematics-4.mp4",
    label: "Moments Reel",
  },
];

export default function Cinematics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".cine-reveal"),
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    reelRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-bg overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 px-2">
          <span className="cine-reveal text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em]">
            Signature Shots
          </span>
          <h2 className="cine-reveal text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mt-3 sm:mt-4 text-balance">
            Our{" "}
            <span className="italic text-gold">Highlights</span>
          </h2>
          <p className="cine-reveal text-muted-text text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
            Every session deserves a story. Watch how we turn weddings and
            newborn moments into frames you&apos;ll love forever.
          </p>
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reels.map((reel, i) => (
            <div
              key={reel.src}
              className="cine-reveal relative rounded-2xl overflow-hidden bg-black border border-gold/10 aspect-[16/9]"
              style={{ containerType: "inline-size" }}
            >
              <video
                ref={(el) => {
                  reelRefs.current[i] = el;
                }}
                src={reel.src}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={reel.label}
                disablePictureInPicture={false}
                className="absolute top-1/2 left-1/2 bg-black block"
                style={{
                  height: "100cqw",
                  width: "auto",
                  aspectRatio: "9 / 16",
                  transform: "translate(-50%, -50%) rotate(-90deg)",
                }}
              />
              <span className="absolute top-4 left-4 z-10 bg-gold/90 text-dark-bg text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider pointer-events-none">
                {reel.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
