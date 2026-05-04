"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BrandLockup from "../components/brand-lockup";
import { supabase } from "../../../lib/supabase/client";

const SITE_IMAGES_BUCKET = "site-images";
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

type AdminTab = "hero" | "properties";
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
  const heroFileInputRef = useRef<HTMLInputElement | null>(null);

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
  const [newHeroAlt, setNewHeroAlt] = useState("");
  const [propertyImageAltDrafts, setPropertyImageAltDrafts] = useState<
    Record<string, string>
  >({});
  const [heroSlides, setHeroSlides] = useState<HeroSlideRow[]>([]);
  const [propertyGroups, setPropertyGroups] = useState<PropertyGroupRow[]>([]);
  const [propertyImages, setPropertyImages] = useState<PropertyImageRow[]>([]);

  const sortedHeroSlides = useMemo(
    () => sortByOrder(heroSlides),
    [heroSlides],
  );
  const sortedPropertyGroups = useMemo(
    () => sortByOrder(propertyGroups),
    [propertyGroups],
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

  const loadContent = useCallback(async () => {
    setIsRefreshing(true);

    const [heroResult, groupsResult, imagesResult] = await Promise.all([
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

  function updateHeroSlide(id: string, changes: Partial<HeroSlideRow>) {
    setHeroSlides((slides) =>
      slides.map((slide) =>
        slide.id === id
          ? {
              ...slide,
              ...changes,
            }
          : slide,
      ),
    );
  }

  async function saveHeroSlide(slide: HeroSlideRow) {
    setWorkingId(slide.id);
    setStatus({ kind: "info", message: "Saving hero slide..." });

    const { error } = await supabase
      .from("hero_slides")
      .update({
        alt: slide.alt.trim(),
        object_position: cleanNullable(slide.object_position),
        sort_order: slide.sort_order,
        is_active: slide.is_active,
      })
      .eq("id", slide.id);

    setWorkingId(null);

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }

    setStatus({ kind: "success", message: "Hero slide saved." });
    await loadContent();
  }

  async function handleHeroUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setWorkingId("hero-upload");
    setStatus({ kind: "info", message: "Uploading hero image..." });

    try {
      const imagePath = await uploadImage(file, "hero");
      const { error } = await supabase.from("hero_slides").insert({
        image_path: imagePath,
        alt: newHeroAlt.trim() || "JW Luxury Estate furnished property",
        object_position: null,
        sort_order: nextSortOrder(heroSlides),
        is_active: true,
      });

      if (error) {
        throw error;
      }

      setNewHeroAlt("");
      setStatus({ kind: "success", message: "Hero image uploaded." });
      await loadContent();
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error ? error.message : "Unable to upload image.",
      });
    } finally {
      setWorkingId(null);

      if (heroFileInputRef.current) {
        heroFileInputRef.current.value = "";
      }
    }
  }

  async function deleteHeroSlide(slide: HeroSlideRow) {
    if (!window.confirm("Delete this hero slide?")) {
      return;
    }

    setWorkingId(slide.id);

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
    setStatus({ kind: "success", message: "Hero slide deleted." });
    await loadContent();
  }

  async function moveHeroSlide(id: string, direction: -1 | 1) {
    const currentIndex = sortedHeroSlides.findIndex((slide) => slide.id === id);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= sortedHeroSlides.length) {
      return;
    }

    const current = sortedHeroSlides[currentIndex];
    const target = sortedHeroSlides[nextIndex];

    setWorkingId(id);

    const [currentResult, targetResult] = await Promise.all([
      supabase
        .from("hero_slides")
        .update({ sort_order: target.sort_order })
        .eq("id", current.id),
      supabase
        .from("hero_slides")
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
          "Unable to reorder hero slides.",
      });
      return;
    }

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
    setStatus({ kind: "info", message: "Saving property content..." });

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

    setStatus({ kind: "success", message: "Property content saved." });
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
    setStatus({ kind: "info", message: "Saving property image..." });

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

    setStatus({ kind: "success", message: "Property image saved." });
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
    setStatus({ kind: "info", message: "Uploading property image..." });

    try {
      const imagePath = await uploadImage(file, `gallery/${group.slug}`);
      const { error } = await supabase.from("property_images").insert({
        property_group_id: group.id,
        image_path: imagePath,
        alt:
          propertyImageAltDrafts[group.id]?.trim() ||
          `${group.title} property image`,
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
      setStatus({ kind: "success", message: "Property image uploaded." });
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
    if (!window.confirm("Delete this property image?")) {
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
    setStatus({ kind: "success", message: "Property image deleted." });
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
          "Unable to reorder property images.",
      });
      return;
    }

    await loadContent();
  }

  if (isBooting) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <BrandLockup href="/" />
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.28em] text-muted">
            Loading Admin
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-8">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <BrandLockup href="/" />
          <div className="border border-border-subtle bg-surface px-6 py-8">
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
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface/94 px-5 py-4 backdrop-blur-xl sm:px-8">
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

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-7 lg:grid-cols-[minmax(240px,0.26fr)_minmax(0,0.74fr)]">
          <aside className="space-y-5">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Content Manager
              </p>
              <h1 className="max-w-[18rem] font-display text-[3.1rem] leading-[0.92] tracking-[-0.04em]">
                Photos & Properties
              </h1>
            </div>

            <div className="grid gap-2 border border-border-subtle bg-surface p-2">
              {(["hero", "properties"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "h-12 px-4 text-left text-[10px] font-bold uppercase tracking-[0.26em] transition-colors duration-200",
                    activeTab === tab
                      ? "bg-foreground text-surface"
                      : "text-muted hover:bg-background hover:text-foreground",
                  ].join(" ")}
                >
                  {tab === "hero" ? "Hero" : "Our Properties"}
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

          <section className="min-w-0">
            {activeTab === "hero" ? (
              <div className="space-y-6">
                <div className="border border-border-subtle bg-surface px-5 py-5 sm:px-6">
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="space-y-2">
                      <label
                        htmlFor="hero-alt"
                        className="block text-[10px] font-bold uppercase tracking-[0.26em] text-muted"
                      >
                        New Hero Alt Text
                      </label>
                      <input
                        id="hero-alt"
                        type="text"
                        value={newHeroAlt}
                        onChange={(event) => setNewHeroAlt(event.target.value)}
                        className="h-12 w-full border border-border-subtle bg-background px-4 text-sm"
                        placeholder="Describe the image"
                      />
                    </div>
                    <label className="button-sheen inline-flex h-12 cursor-pointer items-center justify-center bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-opacity duration-150 hover:bg-accent-strong">
                      Upload Image
                      <input
                        ref={heroFileInputRef}
                        type="file"
                        accept={IMAGE_ACCEPT}
                        onChange={handleHeroUpload}
                        disabled={workingId === "hero-upload"}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid gap-4">
                  {sortedHeroSlides.map((slide, index) => (
                    <article
                      key={slide.id}
                      className="grid gap-5 border border-border-subtle bg-surface p-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:p-5"
                    >
                      <div className="relative aspect-[1.35] overflow-hidden bg-dark">
                        <Image
                          src={getPublicImageUrl(
                            slide.image_path,
                            slide.updated_at,
                          )}
                          alt={slide.alt}
                          fill
                          sizes="220px"
                          className="object-cover"
                          unoptimized
                          style={
                            slide.object_position
                              ? { objectPosition: slide.object_position }
                              : undefined
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="grid gap-4">
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              Alt Text
                            </span>
                            <input
                              type="text"
                              value={slide.alt}
                              onChange={(event) =>
                                updateHeroSlide(slide.id, {
                                  alt: event.target.value,
                                })
                              }
                              className="h-11 w-full border border-border-subtle bg-background px-3 text-sm"
                            />
                          </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex h-10 items-center gap-2 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                            <input
                              type="checkbox"
                              checked={slide.is_active}
                              onChange={(event) =>
                                updateHeroSlide(slide.id, {
                                  is_active: event.target.checked,
                                })
                              }
                              className="h-4 w-4 accent-[#9d7738]"
                            />
                            Active
                          </label>
                          <button
                            type="button"
                            onClick={() => moveHeroSlide(slide.id, -1)}
                            disabled={index === 0 || workingId === slide.id}
                            className="h-10 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted disabled:opacity-40"
                          >
                            Up
                          </button>
                          <button
                            type="button"
                            onClick={() => moveHeroSlide(slide.id, 1)}
                            disabled={
                              index === sortedHeroSlides.length - 1 ||
                              workingId === slide.id
                            }
                            className="h-10 border border-border-subtle bg-background px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted disabled:opacity-40"
                          >
                            Down
                          </button>
                          <button
                            type="button"
                            onClick={() => saveHeroSlide(slide)}
                            disabled={workingId === slide.id}
                            className="h-10 bg-[#17120f] px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteHeroSlide(slide)}
                            disabled={workingId === slide.id}
                            className="h-10 border border-red-950/15 bg-red-50 px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-red-900 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
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
                              Eyebrow
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
                              Title
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
                              Description
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
                              Highlights
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
                            Active
                          </label>
                          <button
                            type="button"
                            onClick={() => savePropertyGroup(group)}
                            disabled={workingId === group.id}
                            className="h-10 bg-[#17120f] px-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white disabled:opacity-50"
                          >
                            Save Content
                          </button>
                        </div>
                      </div>

                      <div className="px-5 py-5 sm:px-6">
                        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                          <label className="space-y-2">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                              New Image Alt Text
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
                              placeholder="Describe the image"
                            />
                          </label>
                          <label className="button-sheen inline-flex h-11 cursor-pointer items-center justify-center bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white hover:bg-accent-strong">
                            Upload Photo
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
                                    Active
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
