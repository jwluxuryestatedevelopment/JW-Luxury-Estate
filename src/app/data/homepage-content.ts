import { supabase } from "../../../lib/supabase/client";
import {
  propertyShowcase as fallbackPropertyShowcase,
  type PropertyShowcaseItem,
} from "./property-showcase";
import { getSiteImageUrl, siteImageUrls } from "./site-images";

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

export type HomepageContent = {
  heroSlides: HeroSlide[];
  propertyShowcase: PropertyShowcaseItem[];
  propertyShowcaseUsesRemoteMedia: boolean;
};

export const fallbackHeroSlides: HeroSlide[] = [
  {
    id: "fallback-hero-featured-property",
    src: siteImageUrls.hero.featuredProperty,
    alt: "JW Luxury Estate luxury residence",
  },
];

const fallbackHomepageContent: HomepageContent = {
  heroSlides: fallbackHeroSlides,
  propertyShowcase: fallbackPropertyShowcase,
  propertyShowcaseUsesRemoteMedia: true,
};

function resolveStorageImage(path: string) {
  return getSiteImageUrl(path);
}

function mapHeroSlides(rows: HeroSlideRow[] | null): HeroSlide[] {
  return (rows ?? [])
    .filter((row) => row.image_path)
    .map((row) => ({
      id: row.id,
      src: resolveStorageImage(row.image_path),
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

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const [heroResult, groupsResult, imagesResult] = await Promise.all([
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
    ]);

    if (heroResult.error || groupsResult.error || imagesResult.error) {
      return fallbackHomepageContent;
    }

    const heroSlides = mapHeroSlides(heroResult.data);
    const propertyShowcase = mapPropertyShowcase(
      groupsResult.data,
      imagesResult.data,
    );

    return {
      heroSlides: heroSlides.length > 0 ? heroSlides : fallbackHeroSlides,
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
