import { createPropertySlide } from "./property-media";

export type PropertyListingCard = {
  badge: string;
  collectionId: string;
  collectionSlug: string;
  highlights: string[];
  id: string;
  image: {
    alt: string;
    position?: string;
    src: string;
  };
  interestMessage: string;
  locationLabel: string;
  shortDescription: string;
  slug: string;
  title: string;
};

export type PropertyListingCollection = {
  cards: PropertyListingCard[];
  id: string;
  slug: string;
  subtitle: string;
  title: string;
};

const fallbackCollections = [
  {
    id: "fallback-featured-stays",
    slug: "featured-stays",
    title: "Featured JW stay formats",
    subtitle:
      "Swipe through housing setups shaped for teams, professionals, and longer assignments.",
    cards: [
      {
        badge: "Team favorite",
        image: createPropertySlide(
          "gallery/shared-home-woodlawn-exterior-optimized.jpg",
          "Exterior view of a furnished residence prepared for team housing",
        ),
        locationLabel: "Carrollton, GA",
        shortDescription:
          "A furnished home base for coworkers who need shared living areas and private sleeping space.",
        highlights: ["Shared home", "Team stay", "Parking"],
        slug: "team-ready-residence",
        title: "Team-Ready Residence",
      },
      {
        badge: "Private room",
        image: createPropertySlide(
          "gallery/private-bedroom-omaha-primary.jpg",
          "Large private bedroom with lounge seating for a longer professional stay",
        ),
        locationLabel: "U.S. markets",
        shortDescription:
          "A calmer private-room setup for professionals who need consistency during longer assignments.",
        highlights: ["Private room", "Furnished", "30+ days"],
        slug: "private-professional-suite",
        title: "Private Professional Suite",
      },
      {
        badge: "Daily living",
        image: createPropertySlide(
          "gallery/daily-living-omaha-kitchen-island.jpg",
          "Bright kitchen with an island prepared for everyday cooking",
          { query: "v=20260426" },
        ),
        locationLabel: "Team housing",
        shortDescription:
          "A practical stay format with kitchen access, laundry flow, and room for a weekly routine.",
        highlights: ["Kitchen", "Laundry", "Long stay"],
        slug: "daily-living-home",
        title: "Daily Living Home",
      },
      {
        badge: "Crew-ready",
        image: createPropertySlide(
          "gallery/private-bedroom-woodlawn-team-room-optimized.jpg",
          "Team room with multiple beds for coordinated workforce stays",
        ),
        locationLabel: "Project crews",
        shortDescription:
          "A coordinated bedroom mix for crews that need predictable arrival and sleeping arrangements.",
        highlights: ["Crew fit", "Smart access", "Flexible"],
        slug: "crew-bedroom-setup",
        title: "Crew Bedroom Setup",
      },
      {
        badge: "Shared lounge",
        image: createPropertySlide(
          "gallery/shared-home-omaha-living-room.jpg",
          "Shared living room with multiple seating areas in a furnished home",
        ),
        locationLabel: "Corporate stays",
        shortDescription:
          "A lounge-forward residence where teams can reset, coordinate, and live beyond a hotel room.",
        highlights: ["Lounge", "WiFi", "Managed"],
        slug: "shared-lounge-residence",
        title: "Shared Lounge Residence",
      },
      {
        badge: "Outdoor reset",
        image: createPropertySlide(
          "gallery/shared-home-woodlawn-deck-lounge-optimized.jpg",
          "Outdoor deck lounge that extends the shared living space",
        ),
        locationLabel: "Extended stays",
        shortDescription:
          "A furnished home option with outdoor space that supports a more comfortable long-stay rhythm.",
        highlights: ["Outdoor area", "Furnished", "Support"],
        slug: "outdoor-living-base",
        title: "Outdoor Living Base",
      },
    ],
  },
] satisfies Array<
  Omit<PropertyListingCollection, "cards"> & {
    cards: Array<
      Omit<
        PropertyListingCard,
        "collectionId" | "collectionSlug" | "id" | "interestMessage"
      >
    >;
  }
>;

export const fallbackPropertyListings: PropertyListingCollection[] =
  fallbackCollections.map((collection) => ({
    ...collection,
    cards: collection.cards.map((card) => ({
      ...card,
      collectionId: collection.id,
      collectionSlug: collection.slug,
      id: `fallback-${collection.slug}-${card.slug}`,
      interestMessage: `Hi, I'm interested in ${card.title}. Please share availability, fit, and next steps.`,
    })),
  }));
