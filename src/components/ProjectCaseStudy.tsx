import type { ReactNode } from "react";
import type { FigureId, Project } from "@/content/projects";
import { Figure } from "./Figure";
import { Label } from "./Section";
import { HashRing } from "./figures/HashRing";
import { KvPaths } from "./figures/KvPaths";
import { ShortsPipeline } from "./figures/ShortsPipeline";
import { RenderTimes } from "./figures/RenderTimes";

const figures: Record<FigureId, { title: string; caption: string; render: () => ReactNode }> = {
  "hash-ring": {
    title: "Routing a key",
    caption:
      "The coordinator's router, running in your browser. As in ConsistentHashRouter.java, each node is hashed onto the ring 150 times as MD5(\"node-id#i\"), and a key goes to the first live virtual node clockwise from its own hash. Take a node down and only its keys move.",
    render: () => <HashRing />,
  },
  "kv-paths": {
    title: "Three paths through the system",
    caption: "How a write is made durable, how a read avoids the disk, and how a write is replicated before it is acknowledged.",
    render: () => <KvPaths />,
  },
  "shorts-pipeline": {
    title: "From a long video to a posted clip",
    caption:
      "Model and render jobs share a single heavy worker slot so they never compete for memory; publishing and metrics run in three light slots alongside.",
    render: () => <ShortsPipeline />,
  },
  "render-times": {
    title: "Why rendering is split in two",
    caption:
      "The slow work is cached in a master render; style changes only re-run the fast assembly. Approximate times, from the project's design notes.",
    render: () => <RenderTimes />,
  },
};

export function ProjectCaseStudy({
  project,
  index,
  figureStart,
}: {
  project: Project;
  index: number;
  figureStart: number;
}) {
  const [first, ...rest] = project.figures;
  let n = figureStart;

  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} className="scroll-mt-20">
      <header data-reveal>
        <p className="meta">
          P.{String(index).padStart(2, "0")} <span className="mx-1.5 text-rule-strong">·</span> {project.period}
        </p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h3 id={`${project.slug}-title`} className="font-serif text-[34px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[42px]">
            {project.title}
          </h3>
          <ul className="flex gap-5 font-mono text-[13px]">
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener" className="link">
                  {l.label} on GitHub
                  <span aria-hidden className="arrow arrow-ne ml-[0.3em]">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5 max-w-[62ch] text-[20px] leading-[1.5] text-ink-2 sm:text-[21px]">{project.summary}</p>
        <p className="mt-5 max-w-[80ch] font-mono text-[12.5px] leading-relaxed text-ink-3">
          {project.stack.join("  ·  ")}
        </p>
      </header>

      {first && <Figure n={n++} {...figures[first]}>{figures[first].render()}</Figure>}

      <div data-reveal className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] md:gap-12">
        <div>
          <Label>Problem</Label>
          <p className="text-ink-2">{project.problem}</p>
        </div>
        <div className="prose-body">
          <Label>Approach</Label>
          {project.approach.map((p) => (
            <p key={p.slice(0, 32)} className="text-ink">
              {p}
            </p>
          ))}
        </div>
      </div>

      {rest.map((id) => (
        <Figure key={id} n={n++} {...figures[id]}>
          {figures[id].render()}
        </Figure>
      ))}

      <div data-reveal className="grid gap-10 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-12">
        <div>
          <Label>Decisions</Label>
          <dl className="divide-y divide-rule border-y border-rule">
            {project.decisions.map((d) => (
              <div key={d.choice} className="py-3.5">
                <dt className="text-ink">{d.choice}</dt>
                <dd className="mt-0.5 text-[16px] leading-snug text-ink-2">{d.why}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-10">
          <div>
            <Label>Trade-offs</Label>
            <ul className="space-y-3 text-[16px] leading-snug text-ink-2">
              {project.tradeoffs.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-signal" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {project.next && project.next.length > 0 && (
            <div>
              <Label>Next</Label>
              <ul className="space-y-3 text-[16px] leading-snug text-ink-2">
                {project.next.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-rule-strong" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
