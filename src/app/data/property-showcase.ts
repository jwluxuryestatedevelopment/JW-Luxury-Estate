import {
  createPropertySlide,
  propertyMediaUsesRemoteUrls,
} from "./property-media";

export type PropertyShowcaseItem = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  slides: {
    alt: string;
    position?: string;
    src: string;
  }[];
};

export const propertyShowcaseUsesRemoteMedia = propertyMediaUsesRemoteUrls;

export const propertyShowcase: PropertyShowcaseItem[] = [
  {
    eyebrow: "Shared Homes",
    title: "Worker-Ready Homes for Team Stays",
    description:
      "Fully furnished shared homes prepared for coworkers, supervisors, and project teams who need a more stable setup than nightly lodging.",
    highlights: ["Furnished", "Team-Oriented", "30+ Day Stays"],
    slides: [
      createPropertySlide(
        "gallery/shared-home-woodlawn-exterior-optimized.jpg",
        "Exterior view of a larger furnished home prepared for team-based stays",
      ),
      createPropertySlide(
        "gallery/shared-home-woodlawn-open-plan-optimized.jpg",
        "Open-plan living and kitchen area arranged for longer workforce stays",
      ),
      createPropertySlide(
        "gallery/shared-home-omaha-dining-room.jpg",
        "Dining room inside a shared furnished home for project teams",
      ),
      createPropertySlide(
        "gallery/shared-home-omaha-living-room.jpg",
        "Shared living room with multiple seating areas in a furnished home",
      ),
      createPropertySlide(
        "gallery/shared-home-woodlawn-deck-lounge-optimized.jpg",
        "Outdoor deck lounge that extends the shared living space",
      ),
    ],
  },
  {
    eyebrow: "Private Bedrooms",
    title: "Comfortable Rooms Designed for Longer Stays",
    description:
      "Private bedrooms prepared to feel calm, clean, and functional for professionals who need consistency throughout a longer stay.",
    highlights: ["Private Rooms", "Move-In Ready", "Worker-Friendly"],
    slides: [
      createPropertySlide(
        "gallery/private-bedroom-omaha-primary.jpg",
        "Large private bedroom with lounge seating prepared for a longer stay",
      ),
      createPropertySlide(
        "gallery/private-bedroom-omaha-queen-room.jpg",
        "Clean queen bedroom in a worker-friendly furnished home",
      ),
      createPropertySlide(
        "gallery/private-bedroom-woodlawn-double-room-optimized.jpg",
        "Double-bed room prepared for team housing or paired stays",
      ),
      createPropertySlide(
        "gallery/private-bedroom-woodlawn-standard-room-optimized.jpg",
        "Standard private bedroom with neutral furnishings for a longer assignment",
      ),
      createPropertySlide(
        "gallery/private-bedroom-woodlawn-team-room-optimized.jpg",
        "Team room with multiple beds for coordinated workforce stays",
      ),
    ],
  },
  {
    eyebrow: "Daily Living",
    title: "Equipped Kitchens and Shared Essentials",
    description:
      "Kitchens and shared-use spaces are prepared for real day-to-day living, not just overnight stays or short visits.",
    highlights: ["Equipped Kitchens", "Shared Spaces", "Everyday Use"],
    slides: [
      createPropertySlide(
        "gallery/daily-living-omaha-kitchen-island.jpg",
        "Bright kitchen with an island set up for everyday cooking",
        { query: "v=20260426" },
      ),
      createPropertySlide(
        "gallery/daily-living-woodlawn-main-kitchen-optimized.jpg",
        "Main kitchen with generous prep space for shared living",
      ),
      createPropertySlide(
        "gallery/daily-living-laundry-room.jpg",
        "In-home laundry room included for longer stays",
      ),
      createPropertySlide(
        "gallery/daily-living-glassware-cabinet-optimized.jpg",
        "Stocked glassware cabinet showing daily-living readiness",
      ),
      createPropertySlide(
        "gallery/daily-living-outdoor-dining-optimized.jpg",
        "Outdoor dining setup that supports everyday shared routines",
      ),
    ],
  },
];
