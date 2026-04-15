import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const propertyMediaBaseUrl = process.env.NEXT_PUBLIC_PROPERTY_MEDIA_BASE_URL?.trim();

const supabasePattern = (() => {
  if (!supabaseUrl) {
    return undefined;
  }

  try {
    const url = new URL(supabaseUrl);

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: "/storage/v1/object/public/**",
    };
  } catch {
    return undefined;
  }
})();

const propertyMediaPattern = (() => {
  if (!propertyMediaBaseUrl) {
    return undefined;
  }

  try {
    const url = new URL(propertyMediaBaseUrl);

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: `${url.pathname.replace(/\/$/, "")}/**`,
    };
  } catch {
    return undefined;
  }
})();

const remotePatterns = [
  ...(supabasePattern ? [supabasePattern] : []),
  {
    protocol: "https" as const,
    hostname: "*.supabase.co",
    pathname: "/storage/v1/object/public/**",
  },
  ...(propertyMediaPattern ? [propertyMediaPattern] : []),
];

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns,
  },
};

export default nextConfig;
