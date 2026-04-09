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
          ? "w-fit gap-5 text-white"
          : "gap-3.5 hover:opacity-100 sm:gap-4",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "brand-plaque relative shrink-0 overflow-hidden",
          isFooter
            ? "h-[122px] w-[122px] rounded-[1.9rem] shadow-[0_22px_50px_rgba(0,0,0,0.28)]"
            : "h-[3.4rem] w-[3.4rem] rounded-[1.12rem] shadow-[0_14px_30px_rgba(17,12,9,0.14)]",
        ].join(" ")}
      >
        <Image
          src="/logojwluxury.jpeg"
          alt={isFooter ? "JW Luxury Estate logo" : ""}
          fill
          sizes={isFooter ? "122px" : "54px"}
          className="object-cover saturate-[1.06] contrast-[1.05]"
        />
      </span>

      {!isFooter ? (
        <span className="brand-wordmark min-w-0 font-display text-[13px] tracking-[0.14em] text-foreground sm:text-[15px] sm:tracking-[0.16em]">
          JW LUXURY ESTATE.
        </span>
      ) : (
        <span className="space-y-1">
          <span className="brand-wordmark block font-display text-[1.5rem] leading-[0.9] tracking-[0.12em] text-white/92 sm:text-[1.7rem]">
            JW LUXURY
          </span>
          <span className="brand-wordmark block font-display text-[2.5rem] leading-[0.9] tracking-[-0.045em] text-white sm:text-[2.9rem]">
            ESTATE
          </span>
        </span>
      )}
    </a>
  );
}
