import type { Role } from "@/content/experience";

export function ExperienceEntry({ role }: { role: Role }) {
  return (
    <article data-reveal className="grid gap-x-10 gap-y-4 py-10 first:pt-0 last:pb-0 md:grid-cols-[9.5rem_minmax(0,1fr)]">
      <div className="meta md:pt-2.5">
        <p className="text-ink-2">{role.period}</p>
        <p>{role.location}</p>
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-[30px] leading-tight tracking-[-0.015em] text-ink">{role.org}</h3>
        <p className="mt-1 font-mono text-[13px] text-ink-2">
          {role.title}
          {role.team && <span className="text-ink-3"> · {role.team}</span>}
        </p>
        <p className="mt-4 max-w-[62ch] text-ink-2">{role.summary}</p>
        <dl className="mt-6 space-y-4">
          {role.work.map((w) => (
            <div key={w.heading} className="grid gap-x-6 gap-y-0.5 lg:grid-cols-[13rem_minmax(0,1fr)]">
              <dt className="text-[16.5px] leading-snug text-ink">{w.heading}</dt>
              <dd className="max-w-[62ch] text-[16.5px] leading-snug text-ink-2">{w.detail}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-mono text-[12.5px] text-ink-3">{role.tools.join("  ·  ")}</p>
      </div>
    </article>
  );
}
