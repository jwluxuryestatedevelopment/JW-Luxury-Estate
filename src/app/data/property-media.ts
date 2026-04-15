import { getSiteImageUrl } from "./site-images";

export const propertyMediaUsesRemoteUrls = true;

export function resolvePropertyMediaSrc(path: string) {
  const normalizedPath = path.trim().replace(/^\/+/, "");
  return getSiteImageUrl(normalizedPath);
}

export function createPropertySlide(
  path: string,
  alt: string,
  options?: { position?: string },
) {
  return {
    src: resolvePropertyMediaSrc(path),
    alt,
    position: options?.position,
  };
}
