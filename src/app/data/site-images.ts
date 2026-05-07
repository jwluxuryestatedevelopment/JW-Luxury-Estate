import { getPublicImageUrl } from "../../../lib/supabase/storage";

const SITE_IMAGES_BUCKET = "site-images";

export const siteImagePaths = {
  hero: {
    featuredProperty: "hero/jw-hero-exterior.png",
  },
  gallery: {
    sharedHomes: [
      "gallery/shared-home-woodlawn-exterior-optimized.jpg",
      "gallery/shared-home-woodlawn-open-plan-optimized.jpg",
      "gallery/shared-home-omaha-dining-room.jpg",
      "gallery/shared-home-omaha-living-room.jpg",
      "gallery/shared-home-woodlawn-deck-lounge-optimized.jpg",
    ],
    privateBedrooms: [
      "gallery/private-bedroom-omaha-primary.jpg",
      "gallery/private-bedroom-omaha-queen-room.jpg",
      "gallery/private-bedroom-woodlawn-double-room-optimized.jpg",
      "gallery/private-bedroom-woodlawn-standard-room-optimized.jpg",
      "gallery/private-bedroom-woodlawn-team-room-optimized.jpg",
    ],
    dailyLiving: [
      "gallery/daily-living-omaha-kitchen-island.jpg",
      "gallery/daily-living-woodlawn-main-kitchen-optimized.jpg",
      "gallery/daily-living-laundry-room.jpg",
      "gallery/daily-living-glassware-cabinet-optimized.jpg",
      "gallery/daily-living-outdoor-dining-optimized.jpg",
    ],
  },
  services: {
    corporateHousing: "services/service-corporate-housing-real.jpg",
    rentalManagement: "services/service-rental-management-real.jpg",
    midtermStays: "services/service-midterm-stays-real.jpg",
  },
  logos: {
    primary: "logos/logo-jw-transparent-clean-v2.png",
  },
} as const;

export function getSiteImageUrl(path: string) {
  return getPublicImageUrl(SITE_IMAGES_BUCKET, path);
}

export const siteImageUrls = {
  hero: {
    featuredProperty: getSiteImageUrl(siteImagePaths.hero.featuredProperty),
  },
  services: {
    corporateHousing: getSiteImageUrl(siteImagePaths.services.corporateHousing),
    rentalManagement: getSiteImageUrl(siteImagePaths.services.rentalManagement),
    midtermStays: getSiteImageUrl(siteImagePaths.services.midtermStays),
  },
  logos: {
    primary: getSiteImageUrl(siteImagePaths.logos.primary),
  },
} as const;
