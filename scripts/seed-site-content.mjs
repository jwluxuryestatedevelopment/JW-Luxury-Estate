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
    imagePath: "hero/hero-featured-property.jpg",
    localPath: "public/hero-featured-property.jpg",
    alt: "JW Luxury Estate furnished residence prepared for long-stay professionals",
    objectPosition: null,
    sortOrder: 0,
  },
  {
    imagePath: "hero/herojwlux1.png",
    localPath: "public/herojwlux1.png",
    alt: "Luxury home exterior used by JW Luxury Estate",
    objectPosition: null,
    sortOrder: 1,
  },
  {
    imagePath: "hero/herojwlux.png",
    localPath: "public/herojwlux.png",
    alt: "Premium residential property for JW Luxury Estate housing",
    objectPosition: null,
    sortOrder: 2,
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

  console.log("Seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
