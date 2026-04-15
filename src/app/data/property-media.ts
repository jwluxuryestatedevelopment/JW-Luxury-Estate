const propertyMediaBaseUrl =
  process.env.NEXT_PUBLIC_PROPERTY_MEDIA_BASE_URL?.trim().replace(/\/$/, "") ??
  "";

export const propertyMediaUsesRemoteUrls =
  propertyMediaBaseUrl.startsWith("http://") ||
  propertyMediaBaseUrl.startsWith("https://");

export function resolvePropertyMediaSrc(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!propertyMediaBaseUrl) {
    return normalizedPath;
  }

  return `${propertyMediaBaseUrl}${normalizedPath}`;
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
