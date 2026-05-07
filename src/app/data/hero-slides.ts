export const HERO_STORAGE_PREFIX = "hero/";
export const CUSTOM_HERO_STORAGE_PREFIX = "hero/custom/";

export function isCustomHeroPath(path: string) {
  return path.trim().startsWith(CUSTOM_HERO_STORAGE_PREFIX);
}

export function isHeroStoragePath(path: string) {
  const trimmedPath = path.trim();

  return (
    trimmedPath.startsWith(HERO_STORAGE_PREFIX) &&
    !trimmedPath.startsWith("/") &&
    !/^https?:\/\//.test(trimmedPath)
  );
}
