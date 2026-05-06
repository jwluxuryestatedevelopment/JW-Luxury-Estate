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
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const handleScrollState = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress =
          scrollableHeight > 0
            ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
            : 0;

        setScrollProgress(nextProgress);
        setIsScrolled(window.scrollY > 14);
      });
    };

    handleScrollState();
    window.addEventListener("scroll", handleScrollState, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScrollState);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860) {
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
        rootMargin: "-24% 0px -60% 0px",
        threshold: [0.16, 0.34, 0.56, 0.78],
      },
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  const closeMenu = (href: string) => {
    setActiveHref(href);
    setIsMenuOpen(false);
  };

  return (
    <header className="lux-nav-shell" data-scrolled={isScrolled}>
      <div className="lux-nav">
        <BrandLockup href="#" className="!text-white" />

        <nav className="lux-nav-links" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => closeMenu(item.href)}
                className={isActive ? "is-active" : ""}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href="#contact" onClick={() => closeMenu("#contact")} className="lux-nav-cta">
          Talk to Team
        </a>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="lux-menu-button"
        >
          <span className="lux-menu-button-mark" aria-hidden="true">
            <span className={isMenuOpen ? "is-top-open" : ""} />
            <span className={isMenuOpen ? "is-bottom-open" : ""} />
          </span>
        </button>

        <span
          aria-hidden="true"
          className="lux-nav-progress"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div
        className={["lux-mobile-scrim", isMenuOpen ? "is-open" : ""].join(" ")}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-navigation"
        className={["lux-mobile-panel", isMenuOpen ? "is-open" : ""].join(" ")}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => closeMenu(item.href)}
              style={{ transitionDelay: isMenuOpen ? `${index * 42 + 60}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" onClick={() => closeMenu("#contact")} className="lux-mobile-cta">
          Talk to Our Team
        </a>
      </div>
    </header>
  );
}
