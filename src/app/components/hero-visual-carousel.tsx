"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroVisualSlide = {
  alt: string;
  src: string;
};

type HeroVisualCarouselProps = {
  intervalMs?: number;
  slides: HeroVisualSlide[];
};

export default function HeroVisualCarousel({
  intervalMs = 3000,
  slides,
}: HeroVisualCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setShouldReduceMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, shouldReduceMotion, slides.length]);

  return (
    <div className="lux-hero-carousel" aria-label="Luxury residence gallery">
      <div className="lux-hero-carousel-stage">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1280px) 58vw, (min-width: 781px) 52vw, 100vw"
            className={[
              "object-cover lux-hero-carousel-image",
              index === activeIndex ? "is-active" : "",
            ].join(" ")}
          />
        ))}
      </div>
      <div className="lux-hero-carousel-caption">
        <span>Five-star feel</span>
        <strong>Private residence control across every stay.</strong>
      </div>
    </div>
  );
}
