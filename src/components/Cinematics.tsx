"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    src: "/videos/cinematics.mp4",
    poster: "/images/gallery-09.jpg",
    label: "Latest Reel",
  },
  {
    src: "/videos/cinematics-2.mp4",
    poster: "/images/gallery-05.jpg",
    label: "Highlight Reel",
  },
  {
    src: "/videos/cinematics-3.mp4",
    poster: "/images/gallery-16.jpg",
    label: "Wedding Reel",
  },
  {
    src: "/videos/cinematics-4.mp4",
    poster: "/images/gallery-17.jpg",
    label: "Moments Reel",
  },
];

const shots = [
  {
    id: 1,
    title: "A Wedding Story",
    category: "Wedding Highlights",
    src: "/images/gallery-17.jpg",
    ratio: "portrait",
  },
  {
    id: 2,
    title: "First Moments",
    category: "Newborn Session",
    src: "/images/gallery-05.jpg",
    ratio: "landscape",
  },
  {
    id: 3,
    title: "Timeless Vows",
    category: "Wedding Highlights",
    src: "/images/gallery-16.jpg",
    ratio: "landscape",
  },
  {
    id: 4,
    title: "Grand Celebration",
    category: "Reception",
    src: "/images/gallery-09.jpg",
    ratio: "landscape",
  },
];

export default function Cinematics() {
  const [activeShot, setActiveShot] = useState<number | null>(null);
  const [startedVideos, setStartedVideos] = useState<Record<number, boolean>>(
    {}
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const closeLightbox = useCallback(() => setActiveShot(null), []);

  useEffect(() => {
    if (activeShot === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setActiveShot((prev) =>
          prev !== null ? (prev + 1) % shots.length : null
        );
      if (e.key === "ArrowLeft")
        setActiveShot((prev) =>
          prev !== null ? (prev - 1 + shots.length) % shots.length : null
        );
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [activeShot, closeLightbox]);

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

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 bg-dark-bg overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="cine-reveal text-gold text-sm font-semibold uppercase tracking-[0.3em]">
            Signature Shots
          </span>
          <h2 className="cine-reveal text-4xl md:text-5xl font-bold text-warm-white mt-4">
            Our{" "}
            <span className="italic text-gold">Highlights</span>
          </h2>
          <p className="cine-reveal text-muted-text text-lg mt-4 max-w-2xl mx-auto">
            Every session deserves a story. Watch how we turn weddings and
            newborn moments into frames you&apos;ll love forever.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reels.map((reel, i) => (
            <div
              key={reel.src}
              className="cine-reveal relative rounded-2xl overflow-hidden bg-black border border-gold/10"
            >
              <video
                ref={(el) => {
                  reelRefs.current[i] = el;
                }}
                src={reel.src}
                poster={reel.poster}
                controls={!!startedVideos[i]}
                loop
                playsInline
                preload="metadata"
                onPlay={() =>
                  setStartedVideos((prev) => ({ ...prev, [i]: true }))
                }
                className="w-full aspect-[9/16] object-contain bg-black block"
              />
              {!startedVideos[i] && (
                <button
                  onClick={() => reelRefs.current[i]?.play()}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors cursor-pointer"
                  aria-label={`Play ${reel.label}`}
                >
                  <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gold/90 text-dark-bg flex items-center justify-center shadow-2xl border border-gold-light/50">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              )}
              <span className="absolute top-4 left-4 z-10 bg-gold/90 text-dark-bg text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {reel.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {shots.map((shot, i) => (
            <button
              key={shot.id}
              onClick={() => setActiveShot(i)}
              className="cine-reveal group relative rounded-2xl overflow-hidden cursor-pointer border-0 p-0 text-left"
            >
              <div
                className={`relative ${
                  shot.ratio === "portrait"
                    ? "aspect-[9/16] mx-auto w-full max-w-[240px]"
                    : "aspect-video"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-500" />

                <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                  <span className="bg-gold/90 text-dark-bg text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {shot.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
                  <h3 className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-lg">
                    {shot.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    {shot.category}
                  </p>
                  <span className="inline-block mt-2 text-gold text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click here →
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 z-20 pointer-events-none" />
            </button>
          ))}
        </div>
      </div>

      {activeShot !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Close"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveShot(
                (activeShot - 1 + shots.length) % shots.length
              );
            }}
            className="absolute left-4 md:left-8 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous shot"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={shots[activeShot].src}
                alt={shots[activeShot].title}
                width={1600}
                height={1000}
                unoptimized
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg p-5">
              <p className="text-white font-semibold text-lg">
                {shots[activeShot].title}
              </p>
              <p className="text-white/60 text-sm">
                {shots[activeShot].category}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveShot((activeShot + 1) % shots.length);
            }}
            className="absolute right-4 md:right-8 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next shot"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110]">
            <p className="text-white/50 text-sm font-medium">
              {activeShot + 1} / {shots.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}