import type { ReactNode } from "react";

export function Figure({ n, title, caption, children }: { n: number; title: string; caption: string; children: ReactNode }) {
  return (
    <figure data-reveal className="my-12">
      <div className="rounded-[3px] border border-rule bg-paper px-5 py-7 sm:px-8 sm:py-9">{children}</div>
      <figcaption className="mt-3 max-w-[72ch] text-[14.5px] leading-snug text-ink-3">
        <span className="font-mono text-[12px] text-ink-2">Fig. {n}</span>
        <span className="mx-2 text-rule-strong" aria-hidden>
          /
        </span>
        <span className="text-ink-2">{title}.</span> {caption}
      </figcaption>
    </figure>
  );
}
