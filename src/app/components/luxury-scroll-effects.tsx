"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryScrollEffects() {
  useGSAP(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.utils.toArray<HTMLElement>(".lux-stack-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0.76,
            scale: 0.94,
            y: 84,
          },
          {
            autoAlpha: 1,
            ease: "none",
            scale: 1,
            scrollTrigger: {
              end: "top 34%",
              scrub: true,
              start: "top 86%",
              trigger: card,
            },
            y: 0,
          },
        );
      });
    });

    gsap.utils.toArray<HTMLElement>(".lux-reveal-media").forEach((image) => {
      gsap.fromTo(
        image,
        {
          autoAlpha: 0.82,
          scale: 0.92,
        },
        {
          autoAlpha: 1,
          ease: "none",
          scale: 1,
          scrollTrigger: {
            end: "bottom 42%",
            scrub: true,
            start: "top 92%",
            trigger: image,
          },
        },
      );
    });

    return () => mm.revert();
  });

  return null;
}
