"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function createLeafSVG(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 40 60">
    <path d="M20 0 C30 10, 35 25, 35 40 C35 50, 28 58, 20 60 C12 58, 5 50, 5 40 C5 25, 10 10, 20 0Z" fill="${color}" opacity="0.5"/>
    <path d="M20 10 L20 55" stroke="${color}" stroke-width="0.5" opacity="0.3"/>
  </svg>`;
}

export default function LeafAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ["#2e2e2e", "#6f6f6f", "#b8b8b8"];
    const leafCount = 12;

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      leaf.innerHTML = createLeafSVG(colors[i % colors.length]);
      leaf.style.left = `${Math.random() * 100}vw`;
      leaf.style.top = `-60px`;
      container.appendChild(leaf);

      const size = 0.3 + Math.random() * 0.5;
      const duration = 10 + Math.random() * 15;
      const delay = Math.random() * 20;

      gsap.fromTo(
        leaf,
        {
          y: -60,
          x: 0,
          rotation: Math.random() * 360,
          scale: size,
          opacity: 0,
        },
        {
          y: window.innerHeight + 100,
          x: `+=${(Math.random() - 0.5) * 150}`,
          rotation: `+=${180 + Math.random() * 360}`,
          opacity: 0.3 + Math.random() * 0.2,
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: "none",
          onRepeat: function () {
            gsap.set(leaf, {
              left: `${Math.random() * 100}vw`,
              top: "-60px",
            });
          },
        }
      );
    }

    return () => {
      gsap.killTweensOf(".leaf");
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[45] overflow-hidden"
      aria-hidden="true"
    />
  );
}