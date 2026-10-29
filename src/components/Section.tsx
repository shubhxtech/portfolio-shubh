import type { ReactNode } from "react";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule">
      <div className="mx-auto grid max-w-[1120px] gap-x-12 gap-y-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div>
          <div className="lg:sticky lg:top-24">
            <p className="meta">{index}</p>
            <h2 id={`${id}-title`} className="mt-1.5 font-serif text-[28px] leading-tight tracking-[-0.015em] text-ink lg:text-[24px]">
              {title}
            </h2>
          </div>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <h4 className="meta mb-3 uppercase tracking-[0.08em]">{children}</h4>;
}
