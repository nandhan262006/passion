"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 1,
    delay = 0,
    stagger = 0,
    ease = "power3.out",
    start = "top 85%",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const children = ref.current!.children;
      const targets = stagger ? Array.from(children) : ref.current!;

      gsap.fromTo(
        targets,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          delay,
          stagger: stagger || undefined,
          ease,
          scrollTrigger: {
            trigger: ref.current!,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, x, opacity, duration, delay, stagger, ease, start]);

  return ref;
}

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current!, {
        y: `${speed * 100}px`,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current!,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}