"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import BrandLockup from "../components/brand-lockup";
import { supabase } from "../../../lib/supabase/client";
import {
  CUSTOM_HERO_STORAGE_PREFIX,
  isHeroStoragePath,
} from "../data/hero-slides";

const SITE_IMAGES_BUCKET = "site-images";
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";
const PRIMARY_LISTING_COLLECTION = {
  is_active: true,
  slug: "featured-stays",
  sort_order: 0,
  subtitle:
    "Swipe through housing setups shaped for teams, professionals, and longer assignments.",
  title: "Featured JW stay formats",
};

type AdminTab = "hero" | "properties" | "listings";
type StatusKind = "idle" | "info" | "success" | "error";

type StatusState = {
  kind: StatusKind;
  message: string;
};

type HeroSlideRow = {
  alt: string;
  created_at: string;
  id: string;
  image_path: string;
  is_active: boolean;
  object_position: string | null;
  sort_order: number;
  updated_at: string;
};

type PropertyGroupRow = {
  created_at: string;
  description: string;
  eyebrow: string;
  highlights: string[];
  id: string;
  is_active: boolean;
  slug: string;
  sort_order: number;
  title: string;
  updated_at: string;
};

type PropertyImageRow = {
  alt: string;
  created_at: string;
  id: string;
  image_path: string;
  is_active: boolean;
  object_position: string | null;
  property_group_id: string;
  sort_order: number;
  updated_at: string;
};

type HeroPanelSlide = HeroSlideRow & {
  panelId: string;
  previewSrc: string;
};

type PropertyListingCollectionRow = {
  created_at: string;
  id: string;
  is_active: boolean;
  slug: string;
  sort_order: number;
  subtitle: string;
  title: string;
  updated_at: string;
};

type PropertyListingCardRow = {
  badge: string;
  collection_id: string;
  created_at: string;
  highlights: string[];
  id: string;
  image_alt: string;
  image_path: string;
  interest_message: string;
  is_active: boolean;
  location_label: string;
  object_position: string | null;
  short_description: string;
  slug: string;
  sort_order: number;
  title: string;
  updated_at: string;
};

type ListingCardDraft = {
  badge: string;
  highlights: string;
  imageAlt: string;
  interestMessage: string;
  locationLabel: string;
  shortDescription: string;
  title: string;
};

const emptyListingCardDraft: ListingCardDraft = {
  badge: "",
  highlights: "",
  imageAlt: "",
  interestMessage: "",
  locationLabel: "",
  shortDescription: "",
  title: "",
};

function sortByOrder<T extends { created_at: string; sort_order: number }>(
  rows: T[],
) {
  return [...rows].sort((first, second) => {
    if (first.sort_order !== second.sort_order) {
      return first.sort_order - second.sort_order;
    }

    return first.created_at.localeCompare(second.created_at);
  });
}

function getPublicImageUrl(imagePath: string, updatedAt?: string) {
  const { data } = supabase.storage
    .from(SITE_IMAGES_BUCKET)
    .getPublicUrl(imagePath);

  if (!data.publicUrl) {
    return "";
  }

  return updatedAt
    ? `${data.publicUrl}?v=${encodeURIComponent(updatedAt)}`
    : data.publicUrl;
}

function cleanNullable(value: string | null) {
  const trimmed = value?.trim() ?? "";

  return trimmed ? trimmed : null;
}

function parseHighlights(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function sanitizeFileName(fileName: string) {
  const extension = fileName.includes(".")
    ? `.${fileName.split(".").pop()?.toLowerCase()}`
    : "";
  const baseName = fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${baseName || "image"}${extension}`;
}

function heroAltFromFileName(fileName: string) {
  const label = fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return label
    ? `${label} hero image`
    : "JW Luxury Estate custom hero image";
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function nextSortOrder<T extends { sort_order: number }>(rows: T[]) {
  return rows.reduce((max, row) => Math.max(max, row.sort_order), -1) + 1;
}

function statusClasses(kind: StatusKind) {
  if (kind === "error") {
    return "border-red-950/15 bg-red-50 text-red-900";
  }

  if (kind === "success") {
    return "border-emerald-950/15 bg-emerald-50 text-emerald-900";
  }

  return "border-border-subtle bg-surface text-muted";
}

export default function AdminPanel() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<AdminTab>("hero");
  const [email, setEmail] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [workingId, setWorkingId] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusState>({
    kind: "idle",
    message: "",
  });
  const [listingCardDrafts, setListingCardDrafts] = useState<
    Record<string, ListingCardDraft>
  >({});
  const [listingLoadError, setListingLoadError] = useState("");
  const [propertyImageAltDrafts, setPropertyImageAltDrafts] = useState<
    Record<string, string>
  >({});
  const [heroSlides, setHeroSlides] = useState<HeroSlideRow[]>([]);
  const [listingCollections, setListingCollections] = useState<
    PropertyListingCollectionRow[]
  >([]);
  const [listingCards, setListingCards] = useState<PropertyListingCardRow[]>(
    [],
  );
  const [propertyGroups, setPropertyGroups] = useState<PropertyGroupRow[]>([]);
  const [propertyImages, setPropertyImages] = useState<PropertyImageRow[]>([]);

  const heroPanelSlides = useMemo(() => {
    return heroSlides
      .filter((slide) => isHeroStoragePath(slide.image_path))
      .map(
        (slide) =>
          ({
            ...slide,
            panelId: slide.id,
            previewSrc: getPublicImageUrl(slide.image_path, slide.updated_at),
          }) satisfies HeroPanelSlide,
      )
      .sort((first, second) => {
        if (first.sort_order !== second.sort_order) {
          return first.sort_order - second.sort_order;
        }

        return first.created_at.localeCompare(second.created_at);
      });
  }, [heroSlides]);
  const selectedHeroSlidesCount = useMemo(
    () => heroPanelSlides.filter((slide) => slide.is_active).length,
    [heroPanelSlides],
  );
  const sortedPropertyGroups = useMemo(
    () => sortByOrder(propertyGroups),
    [propertyGroups],
  );
  const sortedListingCollections = useMemo(
    () => sortByOrder(listingCollections),
    [listingCollections],
  );
  const primaryListingCollection = useMemo(
    () =>
      sortedListingCollections.find(
        (collection) => collection.slug === PRIMARY_LISTING_COLLECTION.slug,
      ) ??
      sortedListingCollections[0] ??
      null,
    [sortedListingCollections],
  );
  const propertyImagesByGroup = useMemo(() => {
    const map = new Map<string, PropertyImageRow[]>();

    for (const image of propertyImages) {
      const list = map.get(image.property_group_id) ?? [];
      list.push(image);
      map.set(image.property_group_id, list);
    }

    for (const [groupId, images] of map.entries()) {
      map.set(groupId, sortByOrder(images));
    }

    return map;
  }, [propertyImages]);
  const listingCardsByCollection = useMemo(() => {
    const map = new Map<string, PropertyListingCardRow[]>();

    for (const card of listingCards) {
      const list = map.get(card.collection_id) ?? [];
      list.push(card);
      map.set(card.collection_id, list);
    }

    for (const [collectionId, cards] of map.entries()) {
      map.set(collectionId, sortByOrder(cards));
    }

    return map;
  }, [listingCards]);

  const loadContent = useCallback(async () => {
    setIsRefreshing(true);

    const [
      heroResult,
      groupsResult,
      imagesResult,
      listingCollectionsResult,
      listingCardsResult,
    ] = await Promise.all([
      supabase
        .from("hero_slides")
        .select(
          "id, image_path, alt, object_position, sort_order, is_active, created_at, updated_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_groups")
        .select(
          "id, slug, eyebrow, title, description, highlights, sort_order, is_active, created_at, updated_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_images")
        .select(
          "id, property_group_id, image_path, alt, object_position, sort_order, is_active, created_at, updated_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_listing_collections")
        .select(
          "id, slug, title, subtitle, sort_order, is_active, created_at, updated_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("property_listing_cards")
        .select(
          "id, collection_id, slug, title, location_label, short_description, badge, highlights, image_path, image_alt, object_position, interest_message, sort_order, is_active, created_at, updated_at",
        )
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);

    setIsRefreshing(false);

    if (heroResult.error || groupsResult.error || imagesResult.error) {
      const error =
        heroResult.error ?? groupsResult.error ?? imagesResult.error;
      throw new Error(error?.message ?? "Unable to load admin content.");
    }

    setHeroSlides((heroResult.data ?? []) as HeroSlideRow[]);
    setPropertyGroups((groupsResult.data ?? []) as PropertyGroupRow[]);
    setPropertyImages((imagesResult.data ?? []) as PropertyImageRow[]);

    if (listingCollectionsResult.error || listingCardsResult.error) {
      const error =
        listingCollectionsResult.error ?? listingCardsResult.error;

      setListingLoadError(
        error?.message ??
          "Listings tables are not available. Run the latest Supabase migration.",
      );
      setListingCollections([]);
      setListingCards([]);
      return;
    }

    setListingLoadError("");

    let listingCollectionsData =
      (listingCollectionsResult.data ?? []) as PropertyListingCollectionRow[];

    if (listingCollectionsData.length === 0) {
      const { data: createdCollection, error: createCollectionError } =
        await supabase
          .from("property_listing_collections")
          .upsert(PRIMARY_LISTING_COLLECTION, { onConflict: "slug" })
          .select(
            "id, slug, title, subtitle, sort_order, is_active, created_at, updated_at",
          )
          .single();

      if (createCollectionError) {
        setListingLoadError(createCollectionError.message);
        setListingCollections([]);
        setListingCards([]);
        return;
      }

      listingCollectionsData = [createdCollection as PropertyListingCollectionRow];
    }

    const primaryCollection =
      listingCollectionsData.find(
        (collection) => collection.slug === PRIMARY_LISTING_COLLECTION.slug,
      ) ?? listingCollectionsData[0];

    const listingCardsData =
      (listingCardsResult.data ?? []) as PropertyListingCardRow[];

    setListingCollections(primaryCollection ? [primaryCollection] : []);
    setListingCards(
      primaryCollection
        ? listingCardsData.filter(
            (card) => card.collection_id === primaryCollection.id,
          )
        : [],
    );
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function bootAdmin() {
      setIsBooting(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setEmail(session.user.email ?? "");

      const { data: isAdmin, error } = await supabase.rpc("is_site_admin");

      if (!isMounted) {
        return;
      }

      if (error || !isAdmin) {
        setIsAuthorized(false);
        setIsBooting(false);
        setStatus({
          kind: "error",
          message: error
            ? error.message
            : "This account is not listed as a site admin.",
        });
        return;
      }

      setIsAuthorized(true);

      try {
        await loadContent();
      } catch (loadError) {
        setStatus({
          kind: "error",
          message:
            loadError instanceof Error
              ? loadError.message
              : "Unable to load admin content.",
        });
      } finally {
        if (isMounted) {
          setIsBooting(false);
        }
      }
    }

    bootAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadContent, router]);

  async function uploadImage(file: File, folder: string) {
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }

    const storagePath = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`;
    const { error } = await supabase.storage
      .from(SITE_IMAGES_BUCKET)
      .upload(storagePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return storagePath;
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function setHeroSlideActive(
    slide: HeroPanelSlide,
    isActive: boolean,
  ) {
    if (!isActive && selectedHeroSlidesCount <= 1) {
      setStatus({
        kind: "error",
        message: "Keep at least one hero photo selected.",
      });
      return;
    }

    setWorkingId(slide.panelId);
    setStatus({
      kind: "info",
      message: isActive
        ? "Adding photo to the hero..."
        : "Removing photo from the hero...",
    });

    const { error } = await supabase
      .from("hero_slides")
      .update({
        alt: slide.alt,
        object_position: cleanNullable(slide.object_position),
        sort_order: slide.sort_order,
        is_active: isActive,
      })
      .eq("id", slide.id);

    setWorkingId(null);

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }

    setStatus({
      kind: "success",
      message: isActive ? "Photo selected for hero." : "Photo hidden from hero.",
    });
    await loadContent();
  }

  async function moveHeroSlide(panelId: string, direction: -1 | 1) {
    const currentIndex = heroPanelSlides.findIndex(
      (slide) => slide.panelId === panelId,
    );
    const nextIndex = currentIndex + direction;

    if (
      currentIndex < 0 ||
      nextIndex < 0 ||
      nextIndex >= heroPanelSlides.length
    ) {
      return;
    }

    const reorderedSlides = [...heroPanelSlides];
    const [currentSlide] = reorderedSlides.splice(currentIndex, 1);
    reorderedSlides.splice(nextIndex, 0, currentSlide);

    setWorkingId(panelId);
    setStatus({ kind: "info", message: "Updating hero photo order..." });

    const { error } = await supabase.from("hero_slides").upsert(
      reorderedSlides.map((slide, index) => ({
        image_path: slide.image_path,
        alt: slide.alt,
        object_position: cleanNullable(slide.object_position),
        sort_order: index,
        is_active: slide.is_active,
      })),
      { onConflict: "image_path" },
    );

    setWorkingId(null);

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }

    setStatus({ kind: "success", message: "Hero photo order updated." });
    await loadContent();
  }

  async function handleHeroUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setWorkingId("hero-upload");
    setStatus({ kind: "info", message: "Uploading custom hero photo..." });

    try {
      const imagePath = await uploadImage(
        file,
        CUSTOM_HERO_STORAGE_PREFIX.replace(/\/$/, ""),
      );
      const { error } = await supabase.from("hero_slides").insert({
        image_path: imagePath,
        alt: heroAltFromFileName(file.name),
        object_position: null,
        sort_order: nextSortOrder(heroPanelSlides),
        is_active: true,
      });

      if (error) {
        throw error;
      }

      setStatus({ kind: "success", message: "Custom hero photo uploaded." });
      await loadContent();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to upload custom hero photo.",
      });
    } finally {
      setWorkingId(null);
      event.currentTarget.value = "";
    }
  }

  async function deleteHeroSlide(slide: HeroPanelSlide) {
    if (slide.is_active && selectedHeroSlidesCount <= 1) {
      setStatus({
        kind: "error",
        message: "Keep at least one hero photo selected.",
      });
      return;
    }

    if (!window.confirm("Delete this hero photo?")) {
      return;
    }

    setWorkingId(slide.panelId);

    const { error } = await supabase
      .from("hero_slides")
      .delete()
      .eq("id", slide.id);

    if (error) {
      setWorkingId(null);
      setStatus({ kind: "error", message: error.message });
      return;
    }

    await supabase.storage.from(SITE_IMAGES_BUCKET).remove([slide.image_path]);
    setWorkingId(null);
    setStatus({ kind: "success", message: "Hero photo deleted." });
    await loadContent();
  }

  function updatePropertyGroup(id: string, changes: Partial<PropertyGroupRow>) {
    setPropertyGroups((groups) =>
      groups.map((group) =>
        group.id === id
          ? {
              ...group,
              ...changes,
            }
          : group,
      ),
    );
  }

  async function savePropertyGroup(group: PropertyGroupRow) {
    setWorkingId(group.id);
    setStatus({ kind: "info", message: "Saving marketing card..." });

    const { error } = await supabase
      .from("property_groups")
      .update({
        eyebrow: group.eyebrow.trim(),
        title: group.title.trim(),
        description: group.description.trim(),
        highlights: group.highlights,
        sort_order: group.sort_order,
        is_active: group.is_active,
      })
      .eq("id", group.id);

    setWorkingId(null);

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }

    setStatus({ kind: "success", message: "Marketing card saved." });
    await loadContent();
  }

  function updatePropertyImage(id: string, changes: Partial<PropertyImageRow>) {
    setPropertyImages((images) =>
      images.map((image) =>
        image.id === id
          ? {
              ...image,
              ...changes,
            }
          : image,
      ),
    );
  }

  async function savePropertyImage(image: PropertyImageRow) {
    setWorkingId(image.id);
    setStatus({ kind: "info", message: "Saving marketing card image..." });

    const { error } = await supabase
      .from("property_images")
      .update({
        alt: image.alt.trim(),
        object_position: cleanNullable(image.object_position),
        sort_order: image.sort_order,
        is_active: image.is_active,
      })
      .eq("id", image.id);

    setWorkingId(null);

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }

    setStatus({ kind: "success", message: "Marketing card image saved." });
    await loadContent();
  }

  async function uploadPropertyImage(
    group: PropertyGroupRow,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const groupImages = propertyImagesByGroup.get(group.id) ?? [];
    setWorkingId(`${group.id}-upload`);
    setStatus({ kind: "info", message: "Uploading marketing card image..." });

    try {
      const imagePath = await uploadImage(file, `gallery/${group.slug}`);
      const { error } = await supabase.from("property_images").insert({
        property_group_id: group.id,
        image_path: imagePath,
        alt:
          propertyImageAltDrafts[group.id]?.trim() ||
          `${group.title} marketing card image`,
        object_position: null,
        sort_order: nextSortOrder(groupImages),
        is_active: true,
      });

      if (error) {
        throw error;
      }

      setPropertyImageAltDrafts((drafts) => ({
        ...drafts,
        [group.id]: "",
      }));
      setStatus({ kind: "success", message: "Marketing card image uploaded." });
      await loadContent();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error ? error.message : "Unable to upload image.",
      });
    } finally {
      setWorkingId(null);
      event.target.value = "";
    }
  }

  async function deletePropertyImage(image: PropertyImageRow) {
    if (!window.confirm("Delete this marketing card image?")) {
      return;
    }

    setWorkingId(image.id);

    const { error } = await supabase
      .from("property_images")
      .delete()
      .eq("id", image.id);

    if (error) {
      setWorkingId(null);
      setStatus({ kind: "error", message: error.message });
      return;
    }

    await supabase.storage.from(SITE_IMAGES_BUCKET).remove([image.image_path]);
    setWorkingId(null);
    setStatus({ kind: "success", message: "Marketing card image deleted." });
    await loadContent();
  }

  async function movePropertyImage(image: PropertyImageRow, direction: -1 | 1) {
    const images = propertyImagesByGroup.get(image.property_group_id) ?? [];
    const currentIndex = images.findIndex((item) => item.id === image.id);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= images.length) {
      return;
    }

    const current = images[currentIndex];
    const target = images[nextIndex];

    setWorkingId(image.id);

    const [currentResult, targetResult] = await Promise.all([
      supabase
        .from("property_images")
        .update({ sort_order: target.sort_order })
        .eq("id", current.id),
      supabase
        .from("property_images")
        .update({ sort_order: current.sort_order })
        .eq("id", target.id),
    ]);

    setWorkingId(null);

    if (currentResult.error || targetResult.error) {
      setStatus({
        kind: "error",
        message:
          currentResult.error?.message ??
          targetResult.error?.message ??
          "Unable to reorder marketing card images.",
      });
      return;
    }

    await loadContent();
  }

  function updateListingCard(id: string, changes: Partial<PropertyListingCardRow>) {
    setListingCards((cards) =>
      cards.map((card) =>
        card.id === id
          ? {
              ...card,
              ...changes,
            }
          : card,
      ),
    );
  }

  function updateListingCardDraft(
    collectionId: string,
    changes: Partial<ListingCardDraft>,
  ) {
    setListingCardDrafts((drafts) => ({
      ...drafts,
      [collectionId]: {
        ...emptyListingCardDraft,
        ...(drafts[collectionId] ?? {}),
        ...changes,
      },
    }));
  }

  async function createListingCard(
    collection: PropertyListingCollectionRow,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    const draft = listingCardDrafts[collection.id] ?? emptyListingCardDraft;
    const title = draft.title.trim();

    if (!title) {
      setStatus({ kind: "error", message: "Add a title before uploading a card." });
      event.target.value = "";
      return;
    }

    if (!file) {
      return;
    }

    const collectionCards = listingCardsByCollection.get(collection.id) ?? [];
    setWorkingId(`${collection.id}-listing-upload`);
    setStatus({ kind: "info", message: "Uploading listing card..." });

    try {
      const imagePath = await uploadImage(file, `listings/${collection.slug}`);
      const { error } = await supabase.from("property_listing_cards").insert({
        collection_id: collection.id,
        slug: slugify(title) || `listing-${Date.now()}`,
        title,
        location_label: draft.locationLabel.trim(),
        short_description: draft.shortDescription.trim(),
        badge: draft.badge.trim() || "JW stay",
        highlights: parseHighlights(draft.highlights),
        image_path: imagePath,
        image_alt: draft.imageAlt.trim() || `${title} listing image`,
        object_position: null,
        interest_message:
          draft.interestMessage.trim() ||
          `Hi, I'm interested in ${title}. Please share availability, fit, and next steps.`,
        sort_order: nextSortOrder(collectionCards),
        is_active: true,
      });

      if (error) {
        throw error;
      }

      setListingCardDrafts((drafts) => ({
        ...drafts,
        [collection.id]: emptyListingCardDraft,
      }));
      setStatus({ kind: "success", message: "Listing card uploaded." });
      await loadContent();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error ? error.message : "Unable to upload listing.",
      });
    } finally {
      setWorkingId(null);
      event.target.value = "";
    }
  }

  async function saveListingCard(card: PropertyListingCardRow) {
    setWorkingId(card.id);
    setStatus({ kind: "info", message: "Saving listing card..." });

    const { error } = await supabase
      .from("property_listing_cards")
      .update({
        title: card.title.trim(),
        location_label: card.location_label.trim(),
        short_description: card.short_description.trim(),
        badge: card.badge.trim(),
        highlights: card.highlights,
        image_alt: card.image_alt.trim(),
        object_position: cleanNullable(card.object_position),
        interest_message: card.interest_message.trim(),
        sort_order: card.sort_order,
        is_active: card.is_active,
      })
      .eq("id", card.id);

    setWorkingId(null);

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }

    setStatus({ kind: "success", message: "Listing card saved." });
    await loadContent();
  }

  async function replaceListingCardImage(
    card: PropertyListingCardRow,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setWorkingId(`${card.id}-replace-image`);
    setStatus({ kind: "info", message: "Replacing listing image..." });

    try {
      const imagePath = await uploadImage(file, `listings/${card.slug}`);
      const { error } = await supabase
        .from("property_listing_cards")
        .update({
          image_path: imagePath,
          image_alt: card.image_alt.trim() || `${card.title} listing image`,
        })
        .eq("id", card.id);

      if (error) {
        throw error;
      }

      setStatus({ kind: "success", message: "Listing image replaced." });
      await loadContent();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error ? error.message : "Unable to replace image.",
      });
    } finally {
      setWorkingId(null);
      event.target.value = "";
    }
  }

  async function deleteListingCard(card: PropertyListingCardRow) {
    if (!window.confirm("Delete this listing card?")) {
      return;
    }

    setWorkingId(card.id);

    const { error } = await supabase
      .from("property_listing_cards")
      .delete()
      .eq("id", card.id);

    if (error) {
      setWorkingId(null);
      setStatus({ kind: "error", message: error.message });
      return;
    }

    await supabase.storage.from(SITE_IMAGES_BUCKET).remove([card.image_path]);
    setWorkingId(null);
    setStatus({ kind: "success", message: "Listing card deleted." });
    await loadContent();
  }

  async function moveListingCard(card: PropertyListingCardRow, direction: -1 | 1) {
    const cards = listingCardsByCollection.get(card.collection_id) ?? [];
    const currentIndex = cards.findIndex((item) => item.id === card.id);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= cards.length) {
      return;
    }

    const current = cards[currentIndex];
    const target = cards[nextIndex];

    setWorkingId(card.id);

    const [currentResult, targetResult] = await Promise.all([
      supabase
        .from("property_listing_cards")
        .update({ sort_order: target.sort_order })
        .eq("id", current.id),
      supabase
        .from("property_listing_cards")
        .update({ sort_order: current.sort_order })
        .eq("id", target.id),
    ]);

    setWorkingId(null);

    if (currentResult.error || targetResult.error) {
      setStatus({
        kind: "error",
        message:
          currentResult.error?.message ??
          targetResult.error?.message ??
          "Unable to reorder listing cards.",
      });
      return;
    }

    await loadContent();
  }

  if (isBooting) {
    return (
      <main className="admin-panel-page min-h-screen px-5 py-6 text-foreground sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <BrandLockup href="/" />
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Loading Admin
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="admin-panel-page min-h-screen px-5 py-6 text-foreground sm:px-8">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <BrandLockup href="/" />
          <div className="admin-auth-card border border-border-subtle px-6 py-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Access
            </p>
            <h1 className="mt-4 font-display text-[3rem] leading-[0.94] tracking-[-0.04em]">
              Admin access is not enabled for this account.
            </h1>
            {status.message ? (
              <p className="mt-5 text-sm leading-7 text-muted">
                {status.message}
              </p>
            ) : null}
            <button
              type="button"
              onClick={signOut}
              className="button-sheen mt-7 inline-flex h-11 items-center justify-center bg-[#17120f] px-5 text-[10px] font-bold uppercase tracking-[0.28em] !text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-panel-page min-h-screen text-foreground">
      <header className="admin-topbar sticky top-0 z-30 border-b border-border-subtle px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <BrandLockup href="/" />
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
              {email}
            </p>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex h-10 items-center justify-center border border-border-subtle bg-background px-4 text-[10px] font-bold uppercase tracking-[0.24em] text-foreground transition-colors duration-200 hover:border-border-strong"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="admin-panel-wrap mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="admin-layout grid gap-7 lg:grid-cols-[minmax(250px,0.28fr)_minmax(0,0.72fr)]">
          <aside className="admin-sidebar space-y-5">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Content Manager
              </p>
              <h1 className="max-w-[18rem] font-display text-[3.1rem] leading-[0.92] tracking-[-0.04em]">
                Photos, Marketing Cards & Listings
              </h1>
            </div>

            <div className="admin-tab-list grid gap-2 border border-border-subtle bg-surface p-2">
              {(["hero", "properties", "listings"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "admin-tab-button h-12 px-4 text-left text-[10px] font-bold uppercase tracking-[0.26em] transition-colors duration-200",
                    activeTab === tab
                      ? "bg-foreground text-surface"
                      : "text-muted hover:bg-background hover:text-foreground",
                  ].join(" ")}
                >
                  {tab === "hero"
                    ? "Hero"
                    : tab === "properties"
                      ? "Marketing Cards"
                      : "Listings"}
                </button>
              ))}
            </div>

            {status.message ? (
              <p
                className={[
                  "border px-4 py-3 text-sm leading-6",
                  statusClasses(status.kind),
                ].join(" ")}
              >
                {status.message}
              </p>
            ) : null}
          </aside>

          <section className="admin-content-panel min-w-0">
            {activeTab === "hero" ? (
              <div className="space-y-6">
                <div className="border border-border-subtle bg-surface px-5 py-5 sm:px-6">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                        Hero Image Selection
                      </p>
                      <h2 className="mt-3 font-display text-[2.6rem] leading-[0.92] tracking-[-0.04em]">
                        Control the editorial photos in the homepage hero.
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                        These photos load from Supabase Storage and are the same
                        images the homepage hero carousel uses. Upload new hero
                        photos here, turn them on or off, then use Up and Down
                        to control the carousel order.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex h-9 items-center border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                          {selectedHeroSlidesCount} selected
                        </span>
                        <span className="inline-flex h-9 items-center border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                          {heroPanelSlides.length} hero photos
                        </span>
                      </div>
                    </div>
                    <label className="button-sheen inline-flex h-12 cursor-pointer items-center justify-center bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-opacity duration-150 hover:bg-accent-strong">
                      Upload Photo
                      <input
                        type="file"
                        accept={IMAGE_ACCEPT}
                        onChange={handleHeroUpload}
                        disabled={workingId === "hero-upload"}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {heroPanelSlides.map((slide, index) => (
                    <article
                      key={slide.panelId}
                      className={[
                        "overflow-hidden border bg-surface",
                        slide.is_active
                          ? "border-accent/45"
                          : "border-border-subtle",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[1.28] overflow-hidden bg-dark">
                        <Image
                          src={slide.previewSrc}
                          alt={slide.alt}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                          unoptimized
                          style={
                            slide.object_position
                              ? { objectPosition: slide.object_position }
                              : undefined
                          }
                        />
                        <div className="absolute left-3 top-3">
                          <span
                            className={[
                              "inline-flex rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]",
                              slide.is_active
                                ? "bg-accent text-white"
                                : "bg-black/58 text-white/78",
                            ].join(" ")}
                          >
                            {slide.is_active ? "Selected" : "Hidden"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 p-4 sm:p-5">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                            Supabase hero photo
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground">
                            {slide.alt || "JW Luxury Estate furnished property"}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex h-10 items-center gap-2 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                            <input
                              type="checkbox"
                              checked={slide.is_active}
                              onChange={(event) =>
                                setHeroSlideActive(
                                  slide,
                                  event.target.checked,
                                )
                              }
                              className="h-4 w-4 accent-[#9d7738]"
                            />
                            Use in Hero
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              moveHeroSlide(slide.panelId, -1)
                            }
                            disabled={
                              index === 0 || workingId === slide.panelId
                            }
                            className="h-10 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted disabled:opacity-40"
                          >
                            Up
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              moveHeroSlide(slide.panelId, 1)
                            }
                            disabled={
                              index === heroPanelSlides.length - 1 ||
                              workingId === slide.panelId
                            }
                            className="h-10 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted disabled:opacity-40"
                          >
                            Down
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteHeroSlide(slide)}
                            disabled={workingId === slide.panelId}
                            className="h-10 border border-red-950/15 bg-red-50 px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-red-900 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                  {heroPanelSlides.length === 0 ? (
                    <div className="border border-dashed border-border-subtle bg-surface px-5 py-10 text-sm leading-7 text-muted md:col-span-2">
                      No Supabase hero photos are registered yet. Upload a hero
                      photo to add it to the carousel.
                    </div>
                  ) : null}
                </div>
              </div>
            ) : activeTab === "properties" ? (
              <div className="space-y-6">
                <div className="border border-border-subtle bg-surface px-5 py-5 sm:px-6">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:items-end">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                        Marketing Cards
                      </p>
                      <h2 className="mt-3 font-display text-[2.45rem] leading-[0.92] tracking-[-0.04em]">
                        Shape the homepage cards that sell the JW standard.
                      </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-muted lg:justify-self-end">
                      Edit each card headline, supporting copy, badges, active
                      state, and image carousel for the curated marketing-card
                      showcase section.
                    </p>
                  </div>
                </div>

                {sortedPropertyGroups.map((group) => {
                  const images = propertyImagesByGroup.get(group.id) ?? [];

                  return (
                    <article
                      key={group.id}
                      className="border border-border-subtle bg-surface"
                    >
                      <div className="border-b border-border-subtle px-5 py-5 sm:px-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              Card Eyebrow
                            </span>
                            <input
                              type="text"
                              value={group.eyebrow}
                              onChange={(event) =>
                                updatePropertyGroup(group.id, {
                                  eyebrow: event.target.value,
                                })
                              }
                              className="h-11 w-full border border-border-subtle bg-background px-3 text-sm"
                            />
                          </label>
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              Card Headline
                            </span>
                            <input
                              type="text"
                              value={group.title}
                              onChange={(event) =>
                                updatePropertyGroup(group.id, {
                                  title: event.target.value,
                                })
                              }
                              className="h-11 w-full border border-border-subtle bg-background px-3 text-sm"
                            />
                          </label>
                        </div>

                        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.66fr)_minmax(260px,0.34fr)]">
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              Card Copy
                            </span>
                            <textarea
                              value={group.description}
                              onChange={(event) =>
                                updatePropertyGroup(group.id, {
                                  description: event.target.value,
                                })
                              }
                              rows={4}
                              className="w-full resize-none border border-border-subtle bg-background px-3 py-3 text-sm leading-6"
                            />
                          </label>
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              Card Badges
                            </span>
                            <textarea
                              value={group.highlights.join(", ")}
                              onChange={(event) =>
                                updatePropertyGroup(group.id, {
                                  highlights: parseHighlights(
                                    event.target.value,
                                  ),
                                })
                              }
                              rows={4}
                              className="w-full resize-none border border-border-subtle bg-background px-3 py-3 text-sm leading-6"
                            />
                          </label>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <label className="inline-flex h-10 items-center gap-2 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                            <input
                              type="checkbox"
                              checked={group.is_active}
                              onChange={(event) =>
                                updatePropertyGroup(group.id, {
                                  is_active: event.target.checked,
                                })
                              }
                              className="h-4 w-4 accent-[#9d7738]"
                            />
                            Show Card
                          </label>
                          <button
                            type="button"
                            onClick={() => savePropertyGroup(group)}
                            disabled={workingId === group.id}
                            className="h-10 bg-[#17120f] px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white disabled:opacity-50"
                          >
                            Save Card
                          </button>
                        </div>
                      </div>

                      <div className="px-5 py-5 sm:px-6">
                        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              New Card Image Alt Text
                            </span>
                            <input
                              type="text"
                              value={propertyImageAltDrafts[group.id] ?? ""}
                              onChange={(event) =>
                                setPropertyImageAltDrafts((drafts) => ({
                                  ...drafts,
                                  [group.id]: event.target.value,
                                }))
                              }
                              className="h-11 w-full border border-border-subtle bg-background px-3 text-sm"
                              placeholder="Describe the card image"
                            />
                          </label>
                          <label className="button-sheen inline-flex h-11 cursor-pointer items-center justify-center bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white hover:bg-accent-strong">
                            Upload Card Photo
                            <input
                              type="file"
                              accept={IMAGE_ACCEPT}
                              onChange={(event) =>
                                uploadPropertyImage(group, event)
                              }
                              disabled={workingId === `${group.id}-upload`}
                              className="sr-only"
                            />
                          </label>
                        </div>

                        <div className="mt-5 grid gap-3">
                          {images.map((image, index) => (
                            <div
                              key={image.id}
                              className="grid gap-4 border-t border-border-subtle pt-4 sm:grid-cols-[150px_minmax(0,1fr)]"
                            >
                              <div className="relative aspect-[1.25] overflow-hidden bg-dark">
                                <Image
                                  src={getPublicImageUrl(
                                    image.image_path,
                                    image.updated_at,
                                  )}
                                  alt={image.alt}
                                  fill
                                  sizes="150px"
                                  className="object-cover"
                                  unoptimized
                                  style={
                                    image.object_position
                                      ? {
                                          objectPosition:
                                            image.object_position,
                                        }
                                      : undefined
                                  }
                                />
                              </div>

                              <div className="space-y-3">
                                <div className="grid gap-3">
                                  <label className="space-y-2">
                                    <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                      Alt Text
                                    </span>
                                    <input
                                      type="text"
                                      value={image.alt}
                                      onChange={(event) =>
                                        updatePropertyImage(image.id, {
                                          alt: event.target.value,
                                        })
                                      }
                                      className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                    />
                                  </label>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  <label className="inline-flex h-9 items-center gap-2 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                                    <input
                                      type="checkbox"
                                      checked={image.is_active}
                                      onChange={(event) =>
                                        updatePropertyImage(image.id, {
                                          is_active: event.target.checked,
                                        })
                                      }
                                      className="h-4 w-4 accent-[#9d7738]"
                                    />
                                    Show Image
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      movePropertyImage(image, -1)
                                    }
                                    disabled={
                                      index === 0 || workingId === image.id
                                    }
                                    className="h-9 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted disabled:opacity-40"
                                  >
                                    Up
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => movePropertyImage(image, 1)}
                                    disabled={
                                      index === images.length - 1 ||
                                      workingId === image.id
                                    }
                                    className="h-9 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted disabled:opacity-40"
                                  >
                                    Down
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => savePropertyImage(image)}
                                    disabled={workingId === image.id}
                                    className="h-9 bg-[#17120f] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deletePropertyImage(image)}
                                    disabled={workingId === image.id}
                                    className="h-9 border border-red-950/15 bg-red-50 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-red-900 disabled:opacity-50"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {listingLoadError ? (
                  <div className="border border-red-950/15 bg-red-50 px-5 py-5 text-red-900 sm:px-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.26em]">
                      Listings setup needed
                    </p>
                    <p className="mt-3 text-sm leading-6">
                      {listingLoadError} Run the latest Supabase migration, then
                      refresh this admin panel.
                    </p>
                  </div>
                ) : null}

                {!listingLoadError ? (
                  <>
                    {primaryListingCollection ? [primaryListingCollection].map((collection) => {
                      const cards =
                        listingCardsByCollection.get(collection.id) ?? [];
                      const draft =
                        listingCardDrafts[collection.id] ??
                        emptyListingCardDraft;

                      return (
                        <article
                          key={collection.id}
                          className="border border-border-subtle bg-surface"
                        >
                          <div className="border-b border-border-subtle px-5 py-5 sm:px-6">
                            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-end">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                                  Listings Cards
                                </p>
                                <h2 className="mt-3 font-display text-[2.45rem] leading-[0.92] tracking-[-0.04em]">
                                  Manage the single homepage listings row.
                                </h2>
                              </div>
                              <p className="max-w-xl text-sm leading-7 text-muted lg:justify-self-end">
                                This section always uses one row on the
                                homepage. Add, edit, reorder, activate, or
                                remove cards inside that row.
                              </p>
                            </div>
                            <p className="mt-3 text-xs leading-6 text-muted">
                              Keep at least 5 active cards for the desktop
                              layout to show 4 cards plus a partial fifth card.
                            </p>
                          </div>

                          <div className="border-b border-border-subtle px-5 py-5 sm:px-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                              Add Listing Card
                            </p>
                            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                              <label className="space-y-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Title
                                </span>
                                <input
                                  type="text"
                                  value={draft.title}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      title: event.target.value,
                                    })
                                  }
                                  className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Location Label
                                </span>
                                <input
                                  type="text"
                                  value={draft.locationLabel}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      locationLabel: event.target.value,
                                    })
                                  }
                                  className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Badge
                                </span>
                                <input
                                  type="text"
                                  value={draft.badge}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      badge: event.target.value,
                                    })
                                  }
                                  className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Image Alt Text
                                </span>
                                <input
                                  type="text"
                                  value={draft.imageAlt}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      imageAlt: event.target.value,
                                    })
                                  }
                                  className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                />
                              </label>
                            </div>
                            <div className="mt-4 grid gap-4 lg:grid-cols-3">
                              <label className="space-y-2 lg:col-span-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Short Description
                                </span>
                                <textarea
                                  value={draft.shortDescription}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      shortDescription: event.target.value,
                                    })
                                  }
                                  rows={3}
                                  className="w-full resize-none border border-border-subtle bg-background px-3 py-3 text-sm leading-6"
                                />
                              </label>
                              <label className="space-y-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Highlights
                                </span>
                                <textarea
                                  value={draft.highlights}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      highlights: event.target.value,
                                    })
                                  }
                                  rows={3}
                                  className="w-full resize-none border border-border-subtle bg-background px-3 py-3 text-sm leading-6"
                                  placeholder="Shared home, Parking, 30+ days"
                                />
                              </label>
                            </div>
                            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                              <label className="space-y-2">
                                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                                  Contact Message
                                </span>
                                <input
                                  type="text"
                                  value={draft.interestMessage}
                                  onChange={(event) =>
                                    updateListingCardDraft(collection.id, {
                                      interestMessage: event.target.value,
                                    })
                                  }
                                  className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                  placeholder="Optional custom message for the form."
                                />
                              </label>
                              <label className="button-sheen inline-flex h-10 cursor-pointer items-center justify-center bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:bg-accent-strong">
                                Upload Card
                                <input
                                  type="file"
                                  accept={IMAGE_ACCEPT}
                                  onChange={(event) =>
                                    createListingCard(collection, event)
                                  }
                                  disabled={
                                    workingId ===
                                    `${collection.id}-listing-upload`
                                  }
                                  className="sr-only"
                                />
                              </label>
                            </div>
                          </div>

                          <div className="px-5 py-5 sm:px-6">
                            <div className="grid gap-4">
                              {cards.map((card, index) => (
                                <article
                                  key={card.id}
                                  className="grid gap-4 border-t border-border-subtle pt-4 sm:grid-cols-[170px_minmax(0,1fr)]"
                                >
                                  <div className="relative aspect-[0.92] overflow-hidden bg-dark">
                                    <Image
                                      src={getPublicImageUrl(
                                        card.image_path,
                                        card.updated_at,
                                      )}
                                      alt={card.image_alt}
                                      fill
                                      sizes="170px"
                                      className="object-cover"
                                      unoptimized
                                      style={
                                        card.object_position
                                          ? {
                                              objectPosition:
                                                card.object_position,
                                            }
                                          : undefined
                                      }
                                    />
                                  </div>

                                  <div className="space-y-4">
                                    <div className="grid gap-3 lg:grid-cols-2">
                                      <label className="space-y-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Title
                                        </span>
                                        <input
                                          type="text"
                                          value={card.title}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              title: event.target.value,
                                            })
                                          }
                                          className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                        />
                                      </label>
                                      <label className="space-y-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Location Label
                                        </span>
                                        <input
                                          type="text"
                                          value={card.location_label}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              location_label:
                                                event.target.value,
                                            })
                                          }
                                          className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                        />
                                      </label>
                                      <label className="space-y-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Badge
                                        </span>
                                        <input
                                          type="text"
                                          value={card.badge}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              badge: event.target.value,
                                            })
                                          }
                                          className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                        />
                                      </label>
                                      <label className="space-y-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Image Alt
                                        </span>
                                        <input
                                          type="text"
                                          value={card.image_alt}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              image_alt: event.target.value,
                                            })
                                          }
                                          className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                        />
                                      </label>
                                    </div>

                                    <div className="grid gap-3 lg:grid-cols-3">
                                      <label className="space-y-2 lg:col-span-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Short Description
                                        </span>
                                        <textarea
                                          value={card.short_description}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              short_description:
                                                event.target.value,
                                            })
                                          }
                                          rows={3}
                                          className="w-full resize-none border border-border-subtle bg-background px-3 py-3 text-sm leading-6"
                                        />
                                      </label>
                                      <label className="space-y-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Highlights
                                        </span>
                                        <textarea
                                          value={card.highlights.join(", ")}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              highlights: parseHighlights(
                                                event.target.value,
                                              ),
                                            })
                                          }
                                          rows={3}
                                          className="w-full resize-none border border-border-subtle bg-background px-3 py-3 text-sm leading-6"
                                        />
                                      </label>
                                    </div>

                                    <div className="grid gap-3">
                                      <label className="space-y-2">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                                          Contact Message
                                        </span>
                                        <input
                                          type="text"
                                          value={card.interest_message}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              interest_message:
                                                event.target.value,
                                            })
                                          }
                                          className="h-10 w-full border border-border-subtle bg-background px-3 text-sm"
                                        />
                                      </label>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                      <label className="inline-flex h-9 items-center gap-2 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                                        <input
                                          type="checkbox"
                                          checked={card.is_active}
                                          onChange={(event) =>
                                            updateListingCard(card.id, {
                                              is_active: event.target.checked,
                                            })
                                          }
                                          className="h-4 w-4 accent-[#9d7738]"
                                        />
                                        Active
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          moveListingCard(card, -1)
                                        }
                                        disabled={
                                          index === 0 ||
                                          workingId === card.id
                                        }
                                        className="h-9 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted disabled:opacity-40"
                                      >
                                        Up
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => moveListingCard(card, 1)}
                                        disabled={
                                          index === cards.length - 1 ||
                                          workingId === card.id
                                        }
                                        className="h-9 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted disabled:opacity-40"
                                      >
                                        Down
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => saveListingCard(card)}
                                        disabled={workingId === card.id}
                                        className="h-9 bg-[#17120f] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50"
                                      >
                                        Save
                                      </button>
                                      <label className="inline-flex h-9 cursor-pointer items-center justify-center border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                                        Replace Image
                                        <input
                                          type="file"
                                          accept={IMAGE_ACCEPT}
                                          onChange={(event) =>
                                            replaceListingCardImage(
                                              card,
                                              event,
                                            )
                                          }
                                          disabled={
                                            workingId ===
                                            `${card.id}-replace-image`
                                          }
                                          className="sr-only"
                                        />
                                      </label>
                                      <button
                                        type="button"
                                        onClick={() => deleteListingCard(card)}
                                        disabled={workingId === card.id}
                                        className="h-9 border border-red-950/15 bg-red-50 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-red-900 disabled:opacity-50"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </article>
                              ))}
                            </div>
                          </div>
                        </article>
                      );
                    }) : (
                      <div className="border border-dashed border-border-subtle bg-surface px-5 py-10 text-sm leading-7 text-muted sm:px-6">
                        Preparing the single listings row. Refresh the admin
                        panel if this message stays visible.
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            )}

            {isRefreshing ? (
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-muted">
                Refreshing
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
