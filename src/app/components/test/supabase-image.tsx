import Image from "next/image";
import { siteImagePaths, siteImageUrls } from "../../data/site-images";

const heroImagePath = siteImagePaths.hero.featuredProperty;
const heroImageUrl = siteImageUrls.hero.featuredProperty;

export default function SupabaseImage() {
  if (!heroImageUrl) {
    return (
      <div className="rounded-sm border border-border-subtle bg-surface px-6 py-5 text-[0.95rem] leading-7 text-muted">
        Supabase image URL could not be generated for <code>{heroImagePath}</code>.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
          Supabase Storage
        </p>
        <h1 className="font-display text-[2.4rem] leading-[0.94] tracking-[-0.04em] text-foreground sm:text-[3rem]">
          Remote image example
        </h1>
        <p className="max-w-2xl text-[0.98rem] leading-8 text-muted">
          This isolated example loads a public image from{" "}
          <code>site-images/{heroImagePath}</code> using Supabase Storage and{" "}
          <code>next/image</code>. The generated URL is rendered below for quick
          verification.
        </p>
      </div>

      <div className="overflow-hidden border border-border-subtle bg-surface shadow-[0_18px_40px_rgba(17,12,9,0.06)]">
        <div className="relative aspect-[1.5]">
          <Image
            src={heroImageUrl}
            alt="Example hero image loaded from Supabase Storage"
            fill
            sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>

      <p className="break-all text-[0.84rem] leading-7 text-muted">
        Public URL: {heroImageUrl}
      </p>
    </div>
  );
}
