import Image from "next/image";

type BrandLockupProps = {
  href?: string;
  variant?: "header" | "footer";
  className?: string;
};

export default function BrandLockup({
  href = "#",
  variant = "header",
  className = "",
}: BrandLockupProps) {
  const isFooter = variant === "footer";

  return (
    <a
      href={href}
      aria-label="JW Luxury Estate"
      className={[
        "brand-lockup inline-flex items-center text-foreground transition-opacity duration-200",
        isFooter
          ? "w-fit items-end gap-4 text-white sm:gap-5"
          : "gap-3 hover:opacity-100 sm:gap-4",
        className,
      ].join(" ")}
    >
      {!isFooter ? (
        <>
          <span className="brand-plaque relative h-[3.2rem] w-[3.2rem] shrink-0 sm:h-[3.75rem] sm:w-[3.75rem]">
            <Image
              src="/logo-jw-transparent-clean-v2.png"
              alt=""
              fill
              sizes="(max-width: 640px) 52px, 60px"
              className="object-contain drop-shadow-[0_12px_22px_rgba(17,12,9,0.18)]"
            />
          </span>
          <span className="brand-wordmark min-w-0 font-display text-[11px] tracking-[0.08em] text-foreground sm:text-[13px] sm:tracking-[0.11em]">
            JW LUXURY ESTATE.
          </span>
        </>
      ) : (
        <>
          <span className="brand-plaque relative h-[5.7rem] w-[5.7rem] shrink-0 sm:h-[7rem] sm:w-[7rem]">
            <Image
              src="/logo-jw-transparent-clean-v2.png"
              alt=""
              fill
              sizes="(max-width: 640px) 92px, 112px"
              className="object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.26)]"
            />
          </span>
          <div className="space-y-1">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.32em] text-accent/88">
              JW Luxury Estate
            </span>
            <span className="brand-wordmark block font-display text-[1.35rem] leading-[0.92] tracking-[0.02em] text-white/96 sm:text-[1.72rem]">
              Premium Housing
              <br />
              Solutions
            </span>
          </div>
        </>
      )}
    </a>
  );
}
