import { getSiteImageUrl } from "./site-images";

export const propertyMediaUsesRemoteUrls = true;

export function resolvePropertyMediaSrc(path: string) {
  const normalizedPath = path.trim().replace(/^\/+/, "");
  return getSiteImageUrl(normalizedPath);
}

export function createPropertySlide(
  path: string,
  alt: string,
  options?: { position?: string; query?: string },
) {
  const resolvedSrc = resolvePropertyMediaSrc(path);

  return {
    src: options?.query ? `${resolvedSrc}?${options.query}` : resolvedSrc,
    alt,
    position: options?.position,
  };
}
