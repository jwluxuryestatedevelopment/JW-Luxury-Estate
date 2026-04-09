"use client";

import { useEffect, useMemo, useState } from "react";
import BrandLockup from "./brand-lockup";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navigation: NavigationItem[];
};

export default function SiteHeader({ navigation }: SiteHeaderProps) {
  const sectionIds = useMemo(
    () => navigation.map((item) => item.href.replace("#", "")),
    [navigation],
  );
  const [activeHref, setActiveHref] = useState(navigation[0]?.href ?? "#");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHasMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScrollState = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScrollState();
    window.addEventListener("scroll", handleScrollState, { passive: true });

    return () => window.removeEventListener("scroll", handleScrollState);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const currentHash = window.location.hash;

      if (navigation.some((item) => item.href === currentHash)) {
        setActiveHref(currentHash);
      }
    });

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;

          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        }

        const topVisible = [...visibleSections.entries()].sort(
          (a, b) => b[1] - a[1],
        )[0];

        if (topVisible) {
          setActiveHref(topVisible[0]);
        }
      },
      {
        rootMargin: "-26% 0px -58% 0px",
        threshold: [0.15, 0.3, 0.55, 0.75],
      },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [navigation, sectionIds]);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300",
        isScrolled
          ? "border-border-strong/80 bg-surface/88 shadow-[0_10px_30px_rgba(17,12,9,0.06)] backdrop-blur-xl"
          : "border-border-subtle bg-surface/95 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="flex w-full items-center justify-between gap-6 px-6 py-5 lg:px-7">
        <BrandLockup />

        <nav className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted md:flex">
          {navigation.map((item) => {
            const isActive = hasMounted && activeHref === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setActiveHref(item.href);
                  setIsMenuOpen(false);
                }}
                className={[
                  "border-b pb-[0.35rem] transition-colors duration-200 hover:text-foreground",
                  isActive
                    ? "border-accent text-foreground"
                    : "border-transparent",
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface text-foreground transition-[transform,border-color,background-color] duration-200 ease-out active:scale-[0.97]"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={[
                  "absolute left-0 top-0 h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-out",
                  isMenuOpen ? "translate-y-[6px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity duration-150 ease-out",
                  isMenuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-3 h-px w-4 bg-current transition-[transform,opacity] duration-200 ease-out",
                  isMenuOpen ? "-translate-y-[6px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>

        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          className="button-sheen hidden h-11 min-w-[138px] items-center justify-center bg-[#17120f] px-5 text-[10px] font-bold uppercase tracking-[0.28em] !text-white transition-transform duration-150 ease-out hover:bg-[#27211d] active:scale-[0.98] md:inline-flex"
        >
          Inquire Now
        </a>
      </div>

      <div
        className={[
          "fixed inset-0 top-[77px] bg-[rgba(17,12,9,0.14)] backdrop-blur-[2px] transition-opacity duration-200 ease-out md:hidden",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={[
          "absolute inset-x-0 top-full px-4 pt-3 transition-[opacity,transform] duration-200 ease-out md:hidden",
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div
          id="mobile-navigation"
          className="overflow-hidden rounded-[1.5rem] border border-border-strong/70 bg-surface/96 p-3 shadow-[0_20px_50px_rgba(17,12,9,0.14)] backdrop-blur-xl"
        >
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = hasMounted && activeHref === item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActiveHref(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={[
                    "block rounded-2xl border px-4 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] transition-[transform,border-color,background-color,color,opacity] duration-200 ease-out active:scale-[0.98]",
                    isActive
                      ? "border-border-strong bg-background text-foreground"
                      : "border-transparent bg-transparent text-muted",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="mt-3 border-t border-border-subtle pt-3">
            <a
              href="#contact"
              onClick={() => {
                setActiveHref("#contact");
                setIsMenuOpen(false);
              }}
              className="button-sheen inline-flex h-12 w-full items-center justify-center rounded-full bg-[#17120f] px-5 text-[10px] font-bold uppercase tracking-[0.28em] !text-white transition-transform duration-150 ease-out active:scale-[0.98]"
            >
              Inquire Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
