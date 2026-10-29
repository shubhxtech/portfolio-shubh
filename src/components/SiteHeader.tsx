"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(atBottom ? sections[sections.length - 1]?.id ?? current : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5 font-display text-[16px] font-medium tracking-[-0.01em] text-fg">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-[3px] border border-accent/50 font-mono text-[10.5px] text-accent transition-colors group-hover:bg-accent group-hover:text-bg"
          >
            SS
          </span>
          {site.name}
        </a>
        <nav aria-label="Sections" className="flex items-center gap-4 font-mono text-[12.5px] sm:gap-6">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "location" : undefined}
              className={`relative py-1 transition-colors ${n.id === "about" ? "hidden sm:inline" : ""} ${
                active === n.id ? "text-fg" : "text-fg-3 hover:text-fg"
              }`}
            >
              {n.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                  active === n.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </a>
          ))}
          <a
            href={site.resume}
            className="hidden rounded-[3px] border border-line-strong px-2.5 py-1 text-fg-2 transition-colors hover:border-accent hover:text-accent sm:inline"
            target="_blank"
            rel="noopener"
          >
            Résumé
            <span aria-hidden className="arrow arrow-ne ml-[0.3em]">
              ↗
            </span>
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
