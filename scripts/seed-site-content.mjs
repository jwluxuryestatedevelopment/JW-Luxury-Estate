import { createClient } from "@supabase/supabase-js";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const bucket = "site-images";

function loadEnvFile(fileName) {
  const envPath = path.join(projectRoot, fileName);

  if (!existsSync(envPath)) {
    return;
  }

  const file = existsSync(envPath) ? envPath : null;

  if (!file) {
    return;
  }

  const contents = existsSync(file) ? readFile(file, "utf8") : null;

  return contents;
}

async function loadLocalEnv() {
  for (const fileName of [".env.local", ".env"]) {
    const pendingContents = loadEnvFile(fileName);

    if (!pendingContents) {
      continue;
    }

    const contents = await pendingContents;

    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const [rawKey, ...rawValueParts] = trimmed.split("=");
      const key = rawKey.trim();
      const value = rawValueParts.join("=").trim().replace(/^['"]|['"]$/g, "");

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

function contentTypeFor(fileName) {
  const extension = path.extname(fileName).toLowerCase();

  if (extension === ".png") {
    return "image/png";
  }

  if (extension === ".webp") {
    return "image/webp";
  }

  return "image/jpeg";
}

async function uploadImage(supabase, localPath, storagePath) {
  const absolutePath = path.join(projectRoot, localPath);

  if (!existsSync(absolutePath)) {
    console.warn(`Skipping missing file: ${localPath}`);
    return;
  }

  const file = await readFile(absolutePath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, {
    cacheControl: "3600",
    contentType: contentTypeFor(storagePath),
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
  }

  console.log(`Uploaded ${storagePath}`);
}

const heroSlides = [
  {
    imagePath: "hero/jw-hero-exterior.png",
    localPath: "public/generated/luxury-estate/jw-hero-exterior.png",
    alt: "Luxury estate exterior with warm evening hospitality lighting",
    objectPosition: null,
    sortOrder: 0,
  },
  {
    imagePath: "hero/jw-lounge.png",
    localPath: "public/generated/luxury-estate/jw-lounge.png",
    alt: "Premium lounge and work-ready living environment for long-stay teams",
    objectPosition: null,
    sortOrder: 1,
  },
  {
    imagePath: "hero/jw-kitchen-dining.png",
    localPath: "public/generated/luxury-estate/jw-kitchen-dining.png",
    alt: "Luxury kitchen and dining space prepared for corporate team housing",
    objectPosition: null,
    sortOrder: 2,
  },
  {
    imagePath: "hero/jw-bedroom-suite.png",
    localPath: "public/generated/luxury-estate/jw-bedroom-suite.png",
    alt: "Private luxury bedroom suite prepared for a longer professional stay",
    objectPosition: null,
    sortOrder: 3,
  },
  {
    imagePath: "hero/jw-arrival-foyer.png",
    localPath: "public/generated/luxury-estate/jw-arrival-foyer.png",
    alt: "Hotel-inspired private residence arrival foyer and lounge",
    objectPosition: null,
    sortOrder: 4,
  },
];

const propertyGroups = [
  {
    slug: "shared-homes",
    eyebrow: "Shared Homes",
    title: "Worker-Ready Homes for Team Stays",
    description:
      "Fully furnished shared homes prepared for coworkers, supervisors, and project teams who need a more stable setup than nightly lodging.",
    highlights: ["Furnished", "Team-Oriented", "30+ Day Stays"],
    sortOrder: 0,
    images: [
      {
        imagePath: "gallery/shared-home-woodlawn-exterior-optimized.jpg",
        localPath:
          "public/properties/shared-homes/shared-home-woodlawn-exterior-optimized.jpg",
        alt: "Exterior view of a larger furnished home prepared for team-based stays",
      },
      {
        imagePath: "gallery/shared-home-woodlawn-open-plan-optimized.jpg",
        localPath:
          "public/properties/shared-homes/shared-home-woodlawn-open-plan-optimized.jpg",
        alt: "Open-plan living and kitchen area arranged for longer workforce stays",
      },
      {
        imagePath: "gallery/shared-home-omaha-dining-room.jpg",
        localPath:
          "public/properties/shared-homes/shared-home-omaha-dining-room.jpg",
        alt: "Dining room inside a shared furnished home for project teams",
      },
      {
        imagePath: "gallery/shared-home-omaha-living-room.jpg",
        localPath:
          "public/properties/shared-homes/shared-home-omaha-living-room.jpg",
        alt: "Shared living room with multiple seating areas in a furnished home",
      },
      {
        imagePath: "gallery/shared-home-woodlawn-deck-lounge-optimized.jpg",
        localPath:
          "public/properties/shared-homes/shared-home-woodlawn-deck-lounge-optimized.jpg",
        alt: "Outdoor deck lounge that extends the shared living space",
      },
    ],
  },
  {
    slug: "private-bedrooms",
    eyebrow: "Private Bedrooms",
    title: "Comfortable Rooms Designed for Longer Stays",
    description:
      "Private bedrooms prepared to feel calm, clean, and functional for professionals who need consistency throughout a longer stay.",
    highlights: ["Private Rooms", "Move-In Ready", "Worker-Friendly"],
    sortOrder: 1,
    images: [
      {
        imagePath: "gallery/private-bedroom-omaha-primary.jpg",
        localPath:
          "public/properties/private-bedrooms/private-bedroom-omaha-primary.jpg",
        alt: "Large private bedroom with lounge seating prepared for a longer stay",
      },
      {
        imagePath: "gallery/private-bedroom-omaha-queen-room.jpg",
        localPath:
          "public/properties/private-bedrooms/private-bedroom-omaha-queen-room.jpg",
        alt: "Clean queen bedroom in a worker-friendly furnished home",
      },
      {
        imagePath: "gallery/private-bedroom-woodlawn-double-room-optimized.jpg",
        localPath:
          "public/properties/private-bedrooms/private-bedroom-woodlawn-double-room-optimized.jpg",
        alt: "Double-bed room prepared for team housing or paired stays",
      },
      {
        imagePath: "gallery/private-bedroom-woodlawn-standard-room-optimized.jpg",
        localPath:
          "public/properties/private-bedrooms/private-bedroom-woodlawn-standard-room-optimized.jpg",
        alt: "Standard private bedroom with neutral furnishings for a longer assignment",
      },
      {
        imagePath: "gallery/private-bedroom-woodlawn-team-room-optimized.jpg",
        localPath:
          "public/properties/private-bedrooms/private-bedroom-woodlawn-team-room-optimized.jpg",
        alt: "Team room with multiple beds for coordinated workforce stays",
      },
    ],
  },
  {
    slug: "daily-living",
    eyebrow: "Daily Living",
    title: "Equipped Kitchens and Shared Essentials",
    description:
      "Kitchens and shared-use spaces are prepared for real day-to-day living, not just overnight stays or short visits.",
    highlights: ["Equipped Kitchens", "Shared Spaces", "Everyday Use"],
    sortOrder: 2,
    images: [
      {
        imagePath: "gallery/daily-living-omaha-kitchen-island.jpg",
        localPath:
          "public/properties/daily-living/daily-living-omaha-kitchen-island.jpg",
        alt: "Bright kitchen with an island set up for everyday cooking",
      },
      {
        imagePath: "gallery/daily-living-woodlawn-main-kitchen-optimized.jpg",
        localPath:
          "public/properties/daily-living/daily-living-woodlawn-main-kitchen-optimized.jpg",
        alt: "Main kitchen with generous prep space for shared living",
      },
      {
        imagePath: "gallery/daily-living-laundry-room.jpg",
        localPath:
          "public/properties/daily-living/daily-living-laundry-room.jpg",
        alt: "In-home laundry room included for longer stays",
      },
      {
        imagePath: "gallery/daily-living-glassware-cabinet-optimized.jpg",
        localPath:
          "public/properties/daily-living/daily-living-glassware-cabinet-optimized.jpg",
        alt: "Stocked glassware cabinet showing daily-living readiness",
      },
      {
        imagePath: "gallery/daily-living-outdoor-dining-optimized.jpg",
        localPath:
          "public/properties/daily-living/daily-living-outdoor-dining-optimized.jpg",
        alt: "Outdoor dining setup that supports everyday shared routines",
      },
    ],
  },
];

const propertyListingCollections = [
  {
    slug: "featured-stays",
    title: "Featured JW stay formats",
    subtitle:
      "Swipe through housing setups shaped for teams, professionals, and longer assignments.",
    sortOrder: 0,
    cards: [
      {
        slug: "team-ready-residence",
        title: "Team-Ready Residence",
        locationLabel: "Carrollton, GA",
        shortDescription:
          "A furnished home base for coworkers who need shared living areas and private sleeping space.",
        badge: "Team favorite",
        highlights: ["Shared home", "Team stay", "Parking"],
        imagePath: "gallery/shared-home-woodlawn-exterior-optimized.jpg",
        imageAlt:
          "Exterior view of a furnished residence prepared for team housing",
        interestMessage:
          "Hi, I'm interested in Team-Ready Residence. Please share availability, fit, and next steps.",
      },
      {
        slug: "private-professional-suite",
        title: "Private Professional Suite",
        locationLabel: "U.S. markets",
        shortDescription:
          "A calmer private-room setup for professionals who need consistency during longer assignments.",
        badge: "Private room",
        highlights: ["Private room", "Furnished", "30+ days"],
        imagePath: "gallery/private-bedroom-omaha-primary.jpg",
        imageAlt:
          "Large private bedroom with lounge seating for a longer professional stay",
        interestMessage:
          "Hi, I'm interested in Private Professional Suite. Please share availability, fit, and next steps.",
      },
      {
        slug: "daily-living-home",
        title: "Daily Living Home",
        locationLabel: "Team housing",
        shortDescription:
          "A practical stay format with kitchen access, laundry flow, and room for a weekly routine.",
        badge: "Daily living",
        highlights: ["Kitchen", "Laundry", "Long stay"],
        imagePath: "gallery/daily-living-omaha-kitchen-island.jpg",
        imageAlt: "Bright kitchen with an island prepared for everyday cooking",
        interestMessage:
          "Hi, I'm interested in Daily Living Home. Please share availability, fit, and next steps.",
      },
      {
        slug: "crew-bedroom-setup",
        title: "Crew Bedroom Setup",
        locationLabel: "Project crews",
        shortDescription:
          "A coordinated bedroom mix for crews that need predictable arrival and sleeping arrangements.",
        badge: "Crew-ready",
        highlights: ["Crew fit", "Smart access", "Flexible"],
        imagePath: "gallery/private-bedroom-woodlawn-team-room-optimized.jpg",
        imageAlt: "Team room with multiple beds for coordinated workforce stays",
        interestMessage:
          "Hi, I'm interested in Crew Bedroom Setup. Please share availability, fit, and next steps.",
      },
      {
        slug: "shared-lounge-residence",
        title: "Shared Lounge Residence",
        locationLabel: "Corporate stays",
        shortDescription:
          "A lounge-forward residence where teams can reset, coordinate, and live beyond a hotel room.",
        badge: "Shared lounge",
        highlights: ["Lounge", "WiFi", "Managed"],
        imagePath: "gallery/shared-home-omaha-living-room.jpg",
        imageAlt:
          "Shared living room with multiple seating areas in a furnished home",
        interestMessage:
          "Hi, I'm interested in Shared Lounge Residence. Please share availability, fit, and next steps.",
      },
      {
        slug: "outdoor-living-base",
        title: "Outdoor Living Base",
        locationLabel: "Extended stays",
        shortDescription:
          "A furnished home option with outdoor space that supports a more comfortable long-stay rhythm.",
        badge: "Outdoor reset",
        highlights: ["Outdoor area", "Furnished", "Support"],
        imagePath: "gallery/shared-home-woodlawn-deck-lounge-optimized.jpg",
        imageAlt: "Outdoor deck lounge that extends the shared living space",
        interestMessage:
          "Hi, I'm interested in Outdoor Living Base. Please share availability, fit, and next steps.",
      },
    ],
  },
];

async function main() {
  await loadLocalEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  const adminEmail = process.env.SITE_ADMIN_EMAIL;
  const adminPassword = process.env.SITE_ADMIN_PASSWORD;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local before seeding.",
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  const { error: bucketError } = await supabase.storage.createBucket(bucket, {
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    fileSizeLimit: 10485760,
    public: true,
  });

  if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) {
    throw bucketError;
  }

  for (const slide of heroSlides) {
    await uploadImage(supabase, slide.localPath, slide.imagePath);
  }

  for (const group of propertyGroups) {
    for (const image of group.images) {
      await uploadImage(supabase, image.localPath, image.imagePath);
    }
  }

  if (adminEmail) {
    const normalizedAdminEmail = adminEmail.trim().toLowerCase();
    if (adminPassword) {
      const { error: createUserError } =
        await supabase.auth.admin.createUser({
          email: normalizedAdminEmail,
          password: adminPassword,
          email_confirm: true,
          user_metadata: {
            role: "site_admin",
          },
        });

      if (
        createUserError &&
        !createUserError.message.toLowerCase().includes("already")
      ) {
        throw createUserError;
      }

      console.log(
        createUserError
          ? `Admin auth user already exists: ${normalizedAdminEmail}`
          : `Created admin auth user: ${normalizedAdminEmail}`,
      );
    }

    const { error } = await supabase.from("site_admins").upsert({
      email: normalizedAdminEmail,
    });

    if (error) {
      throw error;
    }

    console.log(`Registered admin email: ${normalizedAdminEmail}`);
  }

  const { error: heroError } = await supabase.from("hero_slides").upsert(
    heroSlides.map((slide) => ({
      image_path: slide.imagePath,
      alt: slide.alt,
      object_position: slide.objectPosition,
      sort_order: slide.sortOrder,
      is_active: true,
    })),
    { onConflict: "image_path" },
  );

  if (heroError) {
    throw heroError;
  }

  const { data: groups, error: groupsError } = await supabase
    .from("property_groups")
    .upsert(
      propertyGroups.map((group) => ({
        slug: group.slug,
        eyebrow: group.eyebrow,
        title: group.title,
        description: group.description,
        highlights: group.highlights,
        sort_order: group.sortOrder,
        is_active: true,
      })),
      { onConflict: "slug" },
    )
    .select("id, slug");

  if (groupsError) {
    throw groupsError;
  }

  const groupIdBySlug = new Map(groups.map((group) => [group.slug, group.id]));
  const propertyImages = propertyGroups.flatMap((group) => {
    const groupId = groupIdBySlug.get(group.slug);

    if (!groupId) {
      return [];
    }

    return group.images.map((image, index) => ({
      property_group_id: groupId,
      image_path: image.imagePath,
      alt: image.alt,
      object_position: null,
      sort_order: index,
      is_active: true,
    }));
  });

  const { error: imagesError } = await supabase.from("property_images").upsert(
    propertyImages,
    { onConflict: "property_group_id,image_path" },
  );

  if (imagesError) {
    throw imagesError;
  }

  const { data: listingCollections, error: listingCollectionsError } =
    await supabase
      .from("property_listing_collections")
      .upsert(
        propertyListingCollections.map((collection) => ({
          slug: collection.slug,
          title: collection.title,
          subtitle: collection.subtitle,
          sort_order: collection.sortOrder,
          is_active: true,
        })),
        { onConflict: "slug" },
      )
      .select("id, slug");

  if (listingCollectionsError) {
    throw listingCollectionsError;
  }

  const listingCollectionIdBySlug = new Map(
    listingCollections.map((collection) => [collection.slug, collection.id]),
  );
  const listingCards = propertyListingCollections.flatMap((collection) => {
    const collectionId = listingCollectionIdBySlug.get(collection.slug);

    if (!collectionId) {
      return [];
    }

    return collection.cards.map((card, index) => ({
      collection_id: collectionId,
      slug: card.slug,
      title: card.title,
      location_label: card.locationLabel,
      short_description: card.shortDescription,
      badge: card.badge,
      highlights: card.highlights,
      image_path: card.imagePath,
      image_alt: card.imageAlt,
      object_position: null,
      interest_message: card.interestMessage,
      sort_order: index,
      is_active: true,
    }));
  });

  const { error: listingCardsError } = await supabase
    .from("property_listing_cards")
    .upsert(listingCards, { onConflict: "collection_id,slug" });

  if (listingCardsError) {
    throw listingCardsError;
  }

  console.log("Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
