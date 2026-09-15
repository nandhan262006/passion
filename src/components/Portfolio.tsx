"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  "All",
  "Weddings",
  "Newborn",
  "Portraits",
  "Pre-Weddings",
];

const portfolioItems = [
  // Weddings
  { category: "Weddings", image: "/images/gallery-02.jpg", title: "Blessed Union" },
  { category: "Weddings", image: "/images/gallery-09.jpg", title: "Grand Entrance" },
  { category: "Weddings", image: "/images/gallery-16.jpg", title: "Traditional Elegance" },
  { category: "Weddings", image: "/images/gallery-17.jpg", title: "Royal Celebration" },
  { category: "Weddings", image: "/images/gallery-19.jpg", title: "First Dance" },

  // Pre-Weddings
  { category: "Pre-Weddings", image: "/images/gallery-03.jpg", title: "Misty Romance" },
  { category: "Pre-Weddings", image: "/images/gallery-11.jpg", title: "Golden Promise" },
  { category: "Pre-Weddings", image: "/images/gallery-15.jpg", title: "Sunlit Romance" },
  { category: "Pre-Weddings", image: "/images/gallery-18.jpg", title: "Whispered Vows" },
  { category: "Pre-Weddings", image: "/images/gallery-20.jpg", title: "Eternal Bond" },
  { category: "Pre-Weddings", image: "/images/gallery-21.jpg", title: "Ethereal Moments" },

  // Newborn
  { category: "Newborn", image: "/images/gallery-05.jpg", title: "Tiny Toes" },
  { category: "Newborn", image: "/images/gallery-06.jpg", title: "First Sleep" },
  { category: "Newborn", image: "/images/gallery-12.jpg", title: "Little Bundle" },
  { category: "Newborn", image: "/images/gallery-14.jpg", title: "Sweet Dreams" },
  { category: "Newborn", image: "/images/gallery-22.jpg", title: "New Beginnings" },

  // Portraits
  { category: "Portraits", image: "/images/gallery-04.jpg", title: "Timeless Portrait" },
  { category: "Portraits", image: "/images/gallery-07.jpg", title: "Quiet Light" },
  { category: "Portraits", image: "/images/gallery-08.jpg", title: "Family Love" },
  { category: "Portraits", image: "/images/gallery-10.jpg", title: "Golden Hour" },
  { category: "Portraits", image: "/images/gallery-13.jpg", title: "Bold Elegance" },
  { category: "Portraits", image: "/images/gallery-23.jpg", title: "Portrait Legacy" },
  { category: "Portraits", image: "/images/gallery-24.jpg", title: "Artistic Flair" },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) {
          setLightbox((prev) =>
            prev !== null ? (prev + 1) % filtered.length : null
          );
        } else {
          setLightbox((prev) =>
            prev !== null
              ? (prev - 1 + filtered.length) % filtered.length
              : null
          );
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    },
    [filtered.length]
  );

  useEffect(() => {
    if (lightbox === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightbox((prev) =>
          prev !== null ? (prev + 1) % filtered.length : null
        );
      if (e.key === "ArrowLeft")
        setLightbox((prev) =>
          prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
        );
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length, closeLightbox]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".portfolio-header"),
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

  useEffect(() => {
    if (!gridRef.current && !mobileGridRef.current) return;

    const grids = [gridRef.current, mobileGridRef.current].filter(
      Boolean
    ) as HTMLDivElement[];

    grids.forEach((grid) => {
      if (!grid.hasChildNodes()) return;
      gsap.fromTo(
        grid.children,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        }
      );
    });
  }, [activeFilter]);

  const renderCard = (
    item: (typeof portfolioItems)[number],
    i: number,
    mobile: boolean
  ) => (
    <button
      key={`${item.category}-${i}`}
      onClick={() => setLightbox(i)}
      className={`group relative break-inside-avoid ${
        mobile ? "mb-0 block w-full" : "mb-4"
      } p-1 overflow-hidden cursor-pointer border-0 bg-dark-bg rounded-lg`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- masonry columns require intrinsic sizing; next/image has no explicit width/height here */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 z-10" />

      <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
        <span className="bg-gold/90 text-dark-bg text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {item.category}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
        <div className="flex items-end justify-between">
          <p className="text-white font-semibold text-sm drop-shadow-lg">
            {item.title}
          </p>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 z-20 pointer-events-none rounded-lg" />
    </button>
  );

  return (
    <section id="portfolio" className="py-24 bg-dark-bg">
      <div ref={sectionRef}>
        <div className="text-center mb-12 px-6">
          <span className="portfolio-header text-gold text-sm font-semibold uppercase tracking-[0.3em]">
            Our Work
          </span>
          <h2 className="portfolio-header text-4xl md:text-5xl font-bold text-warm-white mt-4">
            Portfolios
          </h2>
          <p className="portfolio-header text-muted-text text-lg mt-4 max-w-2xl mx-auto">
            From intimate newborn sessions to grand weddings — explore the full
            spectrum of our craft across Kurnool and nearby areas.
          </p>
        </div>

        <div className="portfolio-header flex flex-wrap justify-center gap-3 mb-12 px-6">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tab
                  ? "bg-gold text-dark-bg scale-105"
                  : "border border-warm-white/15 text-muted-text hover:border-gold/40 hover:text-gold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="hidden md:block columns-3 lg:columns-4 px-6 [column-gap:1rem]"
        >
          {filtered.map((item, i) => renderCard(item, i, false))}
        </div>

        <div ref={mobileGridRef} className="md:hidden flex gap-2 px-2 items-start">
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {filtered.map((item, i) =>
              i % 2 === 0 ? renderCard(item, i, true) : null
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {filtered.map((item, i) =>
              i % 2 !== 0 ? renderCard(item, i, true) : null
            )}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + filtered.length) % filtered.length);
            }}
            className="absolute left-4 md:left-8 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic containment sizing, no fixed dims */}
            <img
              src={filtered[lightbox].image}
              alt={filtered[lightbox].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg p-5">
              <p className="text-white font-semibold text-lg">
                {filtered[lightbox].title}
              </p>
              <p className="text-white/60 text-sm">
                {filtered[lightbox].category}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % filtered.length);
            }}
            className="absolute right-4 md:right-8 z-[110] w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110]">
            <p className="text-white/50 text-sm font-medium">
              {lightbox + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}