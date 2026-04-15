"use client";

import Image from "next/image";
import {
  startTransition,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

type PropertyCarouselSlide = {
  alt: string;
  position?: string;
  src: string;
};

type PropertyImageCarouselProps = {
  intervalMs?: number;
  label: string;
  slides: PropertyCarouselSlide[];
  sizes: string;
  unoptimized?: boolean;
};

type DragState = {
  pointerId: number | null;
  startX: number;
};

const DRAG_THRESHOLD_RATIO = 0.14;
const DRAG_THRESHOLD_MIN = 48;
const EDGE_RESISTANCE = 0.34;

export default function PropertyImageCarousel({
  intervalMs = 4200,
  label,
  slides,
  sizes,
  unoptimized = false,
}: PropertyImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    startX: 0,
  });

  const totalSlides = slides.length;
  const canRotate = totalSlides > 1;
  const isPaused = isHovered || isFocusWithin || isDragging;
  const trackWidthPercentage = totalSlides * 100;
  const slideWidthPercentage = totalSlides > 0 ? 100 / totalSlides : 100;

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

  const goToSlide = (nextIndex: number) => {
    if (!canRotate) {
      return;
    }

    startTransition(() => {
      setActiveIndex((nextIndex + totalSlides) % totalSlides);
    });
  };

  const advanceSlide = useEffectEvent(() => {
    if (!canRotate || isPaused) {
      return;
    }

    startTransition(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
    });
  });

  const endDrag = (clientX?: number) => {
    if (dragStateRef.current.pointerId === null) {
      return;
    }

    const viewportWidth = viewportRef.current?.clientWidth ?? 0;
    const rawDelta =
      typeof clientX === "number" ? clientX - dragStateRef.current.startX : 0;
    const dragThreshold = Math.max(
      DRAG_THRESHOLD_MIN,
      viewportWidth * DRAG_THRESHOLD_RATIO,
    );

    if (rawDelta <= -dragThreshold && activeIndex < totalSlides - 1) {
      goToSlide(activeIndex + 1);
    } else if (rawDelta >= dragThreshold && activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }

    dragStateRef.current.pointerId = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  useEffect(() => {
    if (!canRotate || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      advanceSlide();
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [canRotate, intervalMs, isPaused]);

  const slideLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(totalSlides).padStart(2, "0")}`;
  const trackTransform = `translate3d(calc(-${activeIndex * slideWidthPercentage}% + ${dragOffset}px), 0, 0)`;

  return (
    <div
      className="relative aspect-[1.22] overflow-hidden bg-[#181818] sm:aspect-[1.28]"
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
      aria-label={label}
      aria-roledescription="carousel"
    >
      <div
        ref={viewportRef}
        className={[
          "absolute inset-0 overflow-hidden select-none touch-pan-y",
          canRotate ? "cursor-grab" : "",
          isDragging ? "cursor-grabbing" : "",
        ].join(" ")}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (!canRotate) {
            return;
          }

          if (event.pointerType === "mouse" && event.button !== 0) {
            return;
          }

          dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
          };

          setIsDragging(true);
          setDragOffset(0);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (
            !isDragging ||
            dragStateRef.current.pointerId === null ||
            dragStateRef.current.pointerId !== event.pointerId
          ) {
            return;
          }

          const rawDelta = event.clientX - dragStateRef.current.startX;
          const isPullingPastFirst = activeIndex === 0 && rawDelta > 0;
          const isPullingPastLast =
            activeIndex === totalSlides - 1 && rawDelta < 0;

          setDragOffset(
            isPullingPastFirst || isPullingPastLast
              ? rawDelta * EDGE_RESISTANCE
              : rawDelta,
          );
        }}
        onPointerUp={(event) => {
          if (dragStateRef.current.pointerId !== event.pointerId) {
            return;
          }

          endDrag(event.clientX);
        }}
        onPointerCancel={() => {
          endDrag();
        }}
        onLostPointerCapture={() => {
          endDrag();
        }}
      >
        <div
          className={[
            "flex h-full will-change-transform",
            !isDragging && !shouldReduceMotion
              ? "transition-transform duration-[260ms] [transition-timing-function:var(--ease-out)]"
              : "",
          ].join(" ")}
          style={{
            width: `${trackWidthPercentage}%`,
            transform: trackTransform,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={`${slide.src}-${slide.position ?? "center"}-${index}`}
              className="relative h-full shrink-0"
              style={{ width: `${slideWidthPercentage}%` }}
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                className="object-cover"
                draggable={false}
                unoptimized={unoptimized}
                style={
                  slide.position
                    ? {
                        objectPosition: slide.position,
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/34 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent" />

      {canRotate ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-4">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${slide.src}-dot-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1} of ${totalSlides} for ${label}`}
                  aria-pressed={isActive}
                  onClick={() => {
                    goToSlide(index);
                  }}
                  className={[
                    "h-1 rounded-full transition-[width,background-color,transform,opacity] duration-200 ease-out active:scale-[0.97]",
                    isActive
                      ? "w-8 bg-white/92"
                      : "w-4 bg-white/34 hover:bg-white/54",
                  ].join(" ")}
                />
              );
            })}
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/82">
            {slideLabel}
          </p>
        </div>
      ) : null}
    </div>
  );
}
