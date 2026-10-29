import type { ReactNode } from "react";

export function Section({
  id,
  index,
  kicker,
  title,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <header data-reveal className="mb-12 sm:mb-16">
          <div className="flex items-center gap-4 font-mono text-[12px]">
            <span className="text-accent">{index}</span>
            <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-line-strong via-line to-transparent" />
            <span className="kicker">{kicker}</span>
          </div>
          <h2
            id={`${id}-title`}
            className="mt-6 max-w-[20ch] font-display text-[36px] leading-[1.05] font-medium tracking-[-0.03em] text-fg sm:text-[52px]"
          >
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <h4 className="kicker mb-4 flex items-center gap-2">
      <span aria-hidden className="size-1 bg-accent" />
      {children}
    </h4>
  );
}
