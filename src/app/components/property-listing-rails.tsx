"use client";

import Image from "next/image";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import type {
  PropertyListingCard,
  PropertyListingCollection,
} from "../data/property-listings";
import Reveal from "./reveal";

type PropertyListingRailsProps = {
  collections: PropertyListingCollection[];
};

const LISTING_INTEREST_EVENT = "jw:listing-interest";
const LISTING_INTEREST_STORAGE_KEY = "jw:listing-interest";
const DRAG_THRESHOLD_PX = 8;

type DragState = {
  collectionSlug: string;
  didDrag: boolean;
  pointerId: number | null;
  startScrollLeft: number;
  startX: number;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 fill-none stroke-current stroke-[1.5]"
    >
      {direction === "left" ? (
        <>
          <path d="m12.5 4.5-5 5 5 5" />
          <path d="M7.8 9.5h8.7" />
        </>
      ) : (
        <>
          <path d="m7.5 4.5 5 5-5 5" />
          <path d="M3.5 9.5h8.7" />
        </>
      )}
    </svg>
  );
}

function buildListingInterest(
  collection: PropertyListingCollection,
  card: PropertyListingCard,
) {
  return {
    collectionSlug: collection.slug,
    collectionTitle: collection.title,
    message:
      card.interestMessage.trim() ||
      `Hi, I'm interested in ${card.title}. Please share availability, fit, and next steps.`,
    slug: card.slug,
    title: card.title,
  };
}

export default function PropertyListingRails({
  collections,
}: PropertyListingRailsProps) {
  const railRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const dragStateRef = useRef<DragState>({
    collectionSlug: "",
    didDrag: false,
    pointerId: null,
    startScrollLeft: 0,
    startX: 0,
  });
  const suppressNextClickRef = useRef(false);
  const [draggingCollectionSlug, setDraggingCollectionSlug] = useState<
    string | null
  >(null);

  useEffect(() => {
    return () => {
      dragCleanupRef.current?.();
    };
  }, []);

  if (collections.length === 0) {
    return null;
  }

  const scrollRail = (collectionSlug: string, direction: -1 | 1) => {
    const rail = railRefs.current[collectionSlug];

    if (!rail) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    rail.scrollBy({
      behavior: reduceMotion ? "auto" : "smooth",
      left: rail.clientWidth * 0.82 * direction,
    });
  };

  const startRailDrag = (
    collectionSlug: string,
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragCleanupRef.current?.();

    const rail = event.currentTarget;
    const pointerId = event.pointerId;

    dragStateRef.current = {
      collectionSlug,
      didDrag: false,
      pointerId,
      startScrollLeft: rail.scrollLeft,
      startX: event.clientX,
    };

    const cleanup = () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerEnd);
      window.removeEventListener("pointercancel", handleWindowPointerEnd);
      dragCleanupRef.current = null;
    };

    const resetDrag = () => {
      cleanup();
      dragStateRef.current = {
        collectionSlug: "",
        didDrag: false,
        pointerId: null,
        startScrollLeft: 0,
        startX: 0,
      };
      setDraggingCollectionSlug(null);

      if (suppressNextClickRef.current) {
        window.setTimeout(() => {
          suppressNextClickRef.current = false;
        }, 0);
      }
    };

    function handleWindowPointerMove(moveEvent: globalThis.PointerEvent) {
      const dragState = dragStateRef.current;

      if (dragState.pointerId !== moveEvent.pointerId) {
        return;
      }

      const deltaX = moveEvent.clientX - dragState.startX;

      if (Math.abs(deltaX) < DRAG_THRESHOLD_PX && !dragState.didDrag) {
        return;
      }

      if (!dragState.didDrag) {
        dragState.didDrag = true;
        suppressNextClickRef.current = true;
        setDraggingCollectionSlug(dragState.collectionSlug);
      }

      moveEvent.preventDefault();
      rail.scrollLeft = dragState.startScrollLeft - deltaX;
    }

    function handleWindowPointerEnd(endEvent: globalThis.PointerEvent) {
      if (dragStateRef.current.pointerId !== endEvent.pointerId) {
        return;
      }

      resetDrag();
    }

    dragCleanupRef.current = cleanup;
    window.addEventListener("pointermove", handleWindowPointerMove, {
      passive: false,
    });
    window.addEventListener("pointerup", handleWindowPointerEnd);
    window.addEventListener("pointercancel", handleWindowPointerEnd);
  };

  const selectListing = (
    collection: PropertyListingCollection,
    card: PropertyListingCard,
  ) => {
    const interest = buildListingInterest(collection, card);
    const contactSection = document.getElementById("contact");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.sessionStorage.setItem(
      LISTING_INTEREST_STORAGE_KEY,
      JSON.stringify(interest),
    );
    window.dispatchEvent(
      new CustomEvent(LISTING_INTEREST_EVENT, {
        detail: interest,
      }),
    );
    window.history.replaceState(null, "", "#contact");
    contactSection?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="listings"
      className="lux-section lux-listings"
      aria-labelledby="listings-heading"
    >
      <div className="lux-shell">
        <Reveal className="lux-section-heading lux-section-heading-wide lux-listings-heading">
          <div>
            <p className="lux-eyebrow">Available stay options</p>
            <h2 id="listings-heading">
              Browse JW-style stays without losing the estate-level feel.
            </h2>
          </div>
          <p>
            A more direct way to explore housing formats: image-first, swipeable,
            and connected to the contact form so the JW team knows what caught
            your attention.
          </p>
        </Reveal>

        <div className="lux-listing-collections">
          {collections.map((collection) => (
            <Reveal
              as="article"
              key={collection.id}
              className="lux-listing-collection"
            >
              <div className="lux-listing-collection-head">
                <div>
                  <h3>{collection.title}</h3>
                  <p>{collection.subtitle}</p>
                </div>
                <div className="lux-listing-controls" aria-hidden="false">
                  <button
                    type="button"
                    aria-label={`Scroll ${collection.title} left`}
                    onClick={() => scrollRail(collection.slug, -1)}
                  >
                    <ArrowIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Scroll ${collection.title} right`}
                    onClick={() => scrollRail(collection.slug, 1)}
                  >
                    <ArrowIcon direction="right" />
                  </button>
                </div>
              </div>

              <div
                ref={(node) => {
                  railRefs.current[collection.slug] = node;
                }}
                className={[
                  "lux-listing-track",
                  draggingCollectionSlug === collection.slug
                    ? "is-dragging"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${collection.title} listings`}
                onDragStart={(event) => event.preventDefault()}
                onPointerDown={(event) =>
                  startRailDrag(collection.slug, event)
                }
              >
                {collection.cards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    className="lux-listing-card lux-stack-card"
                    onClick={() => {
                      if (suppressNextClickRef.current) {
                        suppressNextClickRef.current = false;
                        return;
                      }

                      selectListing(collection, card);
                    }}
                  >
                    <span className="lux-listing-media">
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 780px) 38vw, 86vw"
                        className="object-cover"
                        draggable={false}
                        unoptimized
                        style={
                          card.image.position
                            ? {
                                objectPosition: card.image.position,
                              }
                            : undefined
                        }
                      />
                      <span className="lux-listing-badge">{card.badge}</span>
                    </span>
                    <span className="lux-listing-body">
                      <span className="lux-listing-meta">
                        {card.locationLabel}
                      </span>
                      <strong>{card.title}</strong>
                      <span className="lux-listing-copy">
                        {card.shortDescription}
                      </span>
                      <span className="lux-listing-tags">
                        {card.highlights.slice(0, 3).map((highlight) => (
                          <span key={highlight}>{highlight}</span>
                        ))}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
