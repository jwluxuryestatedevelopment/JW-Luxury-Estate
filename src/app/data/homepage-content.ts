import { supabase } from "../../../lib/supabase/client";
import {
  propertyShowcase as fallbackPropertyShowcase,
  type PropertyShowcaseItem,
} from "./property-showcase";
import {
  fallbackPropertyListings,
  type PropertyListingCollection,
} from "./property-listings";
import { isHeroStoragePath } from "./hero-slides";
import { getSiteImageUrl, siteImagePaths } from "./site-images";

export type HeroSlide = {
  alt: string;
  id: string;
  position?: string;
  src: string;
};

type HeroSlideRow = {
  alt: string | null;
  id: string;
  image_path: string;
  object_position: string | null;
};

type PropertyGroupRow = {
  description: string | null;
  eyebrow: string | null;
  highlights: string[] | null;
  id: string;
  slug: string;
  title: string | null;
};

type PropertyImageRow = {
  alt: string | null;
  image_path: string;
  object_position: string | null;
  property_group_id: string;
};

type PropertyListingCollectionRow = {
  id: string;
  slug: string;
  subtitle: string | null;
  title: string | null;
};

type PropertyListingCardRow = {
  badge: string | null;
  collection_id: string;
  highlights: string[] | null;
  id: string;
  image_alt: string | null;
  image_path: string;
  interest_message: string | null;
  location_label: string | null;
  object_position: string | null;
  short_description: string | null;
  slug: string;
  title: string | null;
};

export type HomepageContent = {
  heroSlides: HeroSlide[];
  propertyListings: PropertyListingCollection[];
  propertyShowcase: PropertyShowcaseItem[];
  propertyShowcaseUsesRemoteMedia: boolean;
};

const PRIMARY_LISTING_COLLECTION_SLUG = "featured-stays";

export const fallbackHeroSlides: HeroSlide[] = [
  {
    id: "fallback-hero-featured-property",
    src: getSiteImageUrl(siteImagePaths.hero.featuredProperty),
    alt: "JW Luxury Estate furnished residence prepared for long-stay professionals",
  },
];

const fallbackHomepageContent: HomepageContent = {
  heroSlides: fallbackHeroSlides,
  propertyListings: fallbackPropertyListings,
  propertyShowcase: fallbackPropertyShowcase,
  propertyShowcaseUsesRemoteMedia: true,
};

function resolveStorageImage(path: string) {
  return getSiteImageUrl(path);
}

function resolveHeroImage(path: string) {
  const trimmedPath = path.trim();

  if (trimmedPath.startsWith("/") || /^https?:\/\//.test(trimmedPath)) {
    return trimmedPath;
  }

  return resolveStorageImage(trimmedPath);
}

function mapHeroSlides(rows: HeroSlideRow[] | null): HeroSlide[] {
  return (rows ?? [])
    .filter((row) => row.image_path && isHeroStoragePath(row.image_path))
    .map((row) => ({
      id: row.id,
      src: resolveHeroImage(row.image_path),
      alt: row.alt?.trim() || "JW Luxury Estate furnished property",
      position: row.object_position?.trim() || undefined,
    }));
}

function mapPropertyShowcase(
  groups: PropertyGroupRow[] | null,
  images: PropertyImageRow[] | null,
): PropertyShowcaseItem[] {
  const imagesByGroupId = new Map<string, PropertyImageRow[]>();

  for (const image of images ?? []) {
    if (!imagesByGroupId.has(image.property_group_id)) {
      imagesByGroupId.set(image.property_group_id, []);
    }

    imagesByGroupId.get(image.property_group_id)?.push(image);
  }

  return (groups ?? []).map((group) => ({
    eyebrow: group.eyebrow?.trim() || group.slug,
    title: group.title?.trim() || "Property Collection",
    description: group.description?.trim() || "",
    highlights: group.highlights?.filter(Boolean) ?? [],
    slides: (imagesByGroupId.get(group.id) ?? [])
      .filter((image) => image.image_path)
      .map((image) => ({
        src: resolveStorageImage(image.image_path),
        alt: image.alt?.trim() || `${group.title ?? "JW Luxury Estate"} image`,
        position: image.object_position?.trim() || undefined,
      })),
  }));
}

function mapPropertyListings(
  collections: PropertyListingCollectionRow[] | null,
  cards: PropertyListingCardRow[] | null,
): PropertyListingCollection[] {
  const cardsByCollectionId = new Map<string, PropertyListingCardRow[]>();

  for (const card of cards ?? []) {
    if (!cardsByCollectionId.has(card.collection_id)) {
      cardsByCollectionId.set(card.collection_id, []);
    }

    cardsByCollectionId.get(card.collection_id)?.push(card);
  }

  const primaryCollection =
    (collections ?? []).find(
      (collection) => collection.slug === PRIMARY_LISTING_COLLECTION_SLUG,
    ) ??
    (collections ?? [])[0] ??
    null;

  return (primaryCollection ? [primaryCollection] : [])
    .map((collection) => ({
      id: collection.id,
      slug: collection.slug,
      subtitle: collection.subtitle?.trim() || "",
      title: collection.title?.trim() || "JW Listing Collection",
      cards: (cardsByCollectionId.get(collection.id) ?? [])
        .filter((card) => card.image_path)
        .map((card) => {
          const cardTitle = card.title?.trim() || "JW Luxury Estate listing";

          return {
            badge: card.badge?.trim() || "JW stay",
            collectionId: collection.id,
            collectionSlug: collection.slug,
            highlights: card.highlights?.filter(Boolean) ?? [],
            id: card.id,
            image: {
              src: resolveStorageImage(card.image_path),
              alt: card.image_alt?.trim() || `${cardTitle} image`,
              position: card.object_position?.trim() || undefined,
            },
            interestMessage:
              card.interest_message?.trim() ||
              `Hi, I'm interested in ${cardTitle}. Please share availability, fit, and next steps.`,
            locationLabel: card.location_label?.trim() || "JW Luxury Estate",
            shortDescription: card.short_description?.trim() || "",
            slug: card.slug,
            title: cardTitle,
          };
        }),
    }))
    .filter((collection) => collection.cards.length > 0);
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const [
      heroResult,
      groupsResult,
      imagesResult,
      listingCollectionsResult,
      listingCardsResult,
    ] = await Promise.all([
      supabase
        .from("hero_slides")
        .select("id, image_path, alt, object_position")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_groups")
        .select("id, slug, eyebrow, title, description, highlights")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_images")
        .select("property_group_id, image_path, alt, object_position")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_listing_collections")
        .select("id, slug, title, subtitle")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_listing_cards")
        .select(
          "id, collection_id, slug, title, location_label, short_description, badge, highlights, image_path, image_alt, object_position, interest_message",
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);

    if (heroResult.error || groupsResult.error || imagesResult.error) {
      return fallbackHomepageContent;
    }

    const heroSlides = mapHeroSlides(heroResult.data);
    const propertyShowcase = mapPropertyShowcase(
      groupsResult.data,
      imagesResult.data,
    );
    const propertyListings =
      listingCollectionsResult.error || listingCardsResult.error
        ? fallbackPropertyListings
        : mapPropertyListings(
            listingCollectionsResult.data,
            listingCardsResult.data,
          );

    return {
      heroSlides: heroSlides.length > 0 ? heroSlides : fallbackHeroSlides,
      propertyListings:
        propertyListings.length > 0 ? propertyListings : fallbackPropertyListings,
      propertyShowcase:
        propertyShowcase.length > 0
          ? propertyShowcase
          : fallbackPropertyShowcase,
      propertyShowcaseUsesRemoteMedia: true,
    };
  } catch {
    return fallbackHomepageContent;
  }
}
