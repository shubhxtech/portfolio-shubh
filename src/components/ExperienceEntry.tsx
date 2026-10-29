import type { Role } from "@/content/experience";

export function ExperienceEntry({ role, latest }: { role: Role; latest: boolean }) {
  return (
    <article data-reveal className="relative grid gap-x-14 gap-y-3 pb-14 pl-8 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)] md:pl-0">
      <span
        aria-hidden
        className={`absolute top-[9px] left-0 size-2.5 rotate-45 border md:left-[calc(10rem+1.75rem-5px)] ${
          latest ? "border-accent bg-accent" : "border-line-strong bg-bg"
        }`}
      />
      <div className="font-mono text-[12px] md:pt-1.5">
        <p className="text-fg-2">{role.period}</p>
        <p className="text-fg-3">{role.location}</p>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-[30px] leading-tight font-medium tracking-[-0.025em] text-fg sm:text-[34px]">
          {role.org}
        </h3>
        <p className="mt-1 font-mono text-[12.5px] text-accent">
          {role.title}
          {role.team && <span className="text-fg-3"> · {role.team}</span>}
        </p>
        <p className="mt-4 max-w-[64ch] text-fg-2">{role.summary}</p>
        <dl className="mt-6 grid gap-3 lg:grid-cols-3">
          {role.work.map((w) => (
            <div key={w.heading} className="rounded-[3px] border border-line bg-surface/80 p-4">
              <dt className="text-[15px] leading-snug font-medium text-fg">{w.heading}</dt>
              <dd className="mt-2 text-[14.5px] leading-snug text-fg-2">{w.detail}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {role.tools.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
