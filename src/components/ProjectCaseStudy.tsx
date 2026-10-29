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
      <header data-reveal className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12px]">
            <span className="rounded-[3px] border border-accent/40 bg-accent/10 px-2 py-0.5 text-accent">
              P.{String(index).padStart(2, "0")}
            </span>
            <span className="text-fg-3">{project.period}</span>
          </div>
          <h3
            id={`${project.slug}-title`}
            className="mt-5 font-display text-[34px] leading-[1.05] font-medium tracking-[-0.03em] text-fg sm:text-[46px]"
          >
            {project.title}
          </h3>
          <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.6] text-fg-2 sm:text-[19px]">{project.summary}</p>
        </div>
        <aside className="flex flex-col gap-5 lg:border-l lg:border-line lg:pl-8">
          <div>
            <p className="kicker mb-2.5">Stack</p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <ul className="font-mono text-[13px]">
            {project.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-2 rounded-[3px] border border-line-strong px-3 py-2 text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  {l.label} on GitHub
                  <span aria-hidden className="arrow arrow-ne">
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </header>

      {first && <Figure n={n++} {...figures[first]}>{figures[first].render()}</Figure>}

      <div data-reveal className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14">
        <div>
          <Label>Problem</Label>
          <p className="text-fg-2">{project.problem}</p>
        </div>
        <div className="prose-body">
          <Label>Approach</Label>
          {project.approach.map((p) => (
            <p key={p.slice(0, 32)} className="text-fg">
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

      <div data-reveal>
        <Label>Decisions</Label>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.decisions.map((d, i) => (
            <div
              key={d.choice}
              className="group rounded-[3px] border border-line bg-surface/80 p-4 transition-colors hover:border-line-strong"
            >
              <dt className="flex gap-2.5 text-[15.5px] leading-snug font-medium text-fg">
                <span className="font-mono text-[11px] leading-[1.9] text-accent">{String(i + 1).padStart(2, "0")}</span>
                {d.choice}
              </dt>
              <dd className="mt-2 pl-[26px] text-[14.5px] leading-snug text-fg-2">{d.why}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div data-reveal className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Label>Trade-offs</Label>
          <ul className="space-y-3 text-[15.5px] leading-snug text-fg-2">
            {project.tradeoffs.map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-hi" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        {project.next && project.next.length > 0 && (
          <div>
            <Label>Next</Label>
            <ul className="space-y-3 text-[15.5px] leading-snug text-fg-2">
              {project.next.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
