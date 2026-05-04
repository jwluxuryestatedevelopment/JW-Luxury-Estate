"use client";

import Image from "next/image";
import { startTransition, useEffect, useEffectEvent, useState } from "react";
import type { HeroSlide } from "../data/homepage-content";

type HeroImageCarouselProps = {
  intervalMs?: number;
  slides: HeroSlide[];
};

export default function HeroImageCarousel({
  intervalMs = 5200,
  slides,
}: HeroImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  const totalSlides = slides.length;
  const canRotate = totalSlides > 1;
  const isPaused = isHovered || isFocusWithin || shouldReduceMotion;

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

  const advanceSlide = useEffectEvent(() => {
    if (!canRotate || isPaused) {
      return;
    }

    startTransition(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
    });
  });

  useEffect(() => {
    if (!canRotate || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      advanceSlide();
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [canRotate, intervalMs, isPaused]);

  return (
    <div
      className="hero-media-shell hero-stage-panel relative min-h-[320px] bg-[#7eb2d5] sm:min-h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        const nextFocusedNode = event.relatedTarget;

        if (
          nextFocusedNode instanceof Node &&
          event.currentTarget.contains(nextFocusedNode)
        ) {
          return;
        }

        setIsFocusWithin(false);
      }}
      aria-roledescription="carousel"
      aria-label="JW Luxury Estate hero images"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={slide.id}
            className={[
              "absolute inset-0 transition-opacity duration-[900ms] ease-out",
              isActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="hero-media-image object-cover object-center"
              sizes="(min-width: 1024px) 55vw, 100vw"
              unoptimized
              style={
                slide.position
                  ? {
                      objectPosition: slide.position,
                    }
                  : undefined
              }
            />
          </div>
        );
      })}

      {canRotate ? (
        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 sm:bottom-7 sm:left-7">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${slide.id}-dot`}
                type="button"
                aria-label={`Show hero image ${index + 1} of ${totalSlides}`}
                aria-pressed={isActive}
                onClick={() => {
                  startTransition(() => setActiveIndex(index));
                }}
                className={[
                  "carousel-dot h-1 rounded-full transition-[width,background-color,transform,opacity] duration-200 ease-out active:scale-[0.97]",
                  isActive
                    ? "w-8 bg-white/92"
                    : "w-4 bg-white/42 hover:bg-white/62",
                ].join(" ")}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
