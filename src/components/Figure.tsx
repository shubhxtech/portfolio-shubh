import type { ReactNode } from "react";

export function Figure({ n, title, caption, children }: { n: number; title: string; caption: string; children: ReactNode }) {
  return (
    <figure data-reveal className="my-14">
      <div className="panel">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-2.5 sm:px-7">
          <p className="kicker !text-fg-2">
            <span className="text-accent">Fig. {n}</span>
            <span aria-hidden className="mx-2 text-line-strong">
              /
            </span>
            {title}
          </p>
          <span aria-hidden className="hidden font-mono text-[10.5px] text-fg-3 sm:inline">
            {String(n).padStart(2, "0")}
          </span>
        </div>
        <div className="px-5 py-7 sm:px-8 sm:py-9">{children}</div>
      </div>
      <figcaption className="mt-3 max-w-[78ch] text-[14px] leading-snug text-fg-3">{caption}</figcaption>
    </figure>
  );
}
