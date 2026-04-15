import { supabase } from "./client";

function normalizeStoragePath(bucket: string, path: string) {
  const trimmedPath = path.trim().replace(/^\/+/, "");
  const bucketPrefix = `${bucket}/`;

  if (trimmedPath.startsWith(bucketPrefix)) {
    return trimmedPath.slice(bucketPrefix.length);
  }

  return trimmedPath;
}

export function getPublicImageUrl(bucket: string, path: string) {
  const normalizedPath = normalizeStoragePath(bucket, path);

  if (!normalizedPath) {
    return "";
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(normalizedPath);

  return data.publicUrl;
}

export async function listImagesInFolder(bucket: string, folder: string) {
  const normalizedFolder = folder.trim().replace(/^\/+|\/+$/g, "");
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(normalizedFolder, {
      limit: 100,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((file) => ({
    ...file,
    publicUrl: getPublicImageUrl(bucket, `${normalizedFolder}/${file.name}`),
  }));
}
