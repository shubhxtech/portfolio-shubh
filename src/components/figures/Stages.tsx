export type Stage = { name: string; detail: string; exit?: string };

// A left-to-right pipeline on wide screens, a top-to-bottom one on narrow screens.
export function Stages({ stages }: { stages: Stage[] }) {
  return (
    <ol className="grid gap-0 lg:auto-cols-fr lg:grid-flow-col">
      {stages.map((s, i) => (
        <li key={s.name} className="group relative flex gap-4 lg:block">
          <div className="flex flex-col items-center lg:flex-row" aria-hidden>
            <span className="mt-[5px] size-2.5 shrink-0 rotate-45 border border-accent bg-bg lg:mt-0" />
            {i < stages.length - 1 && (
              <span className="my-1 w-px flex-1 bg-gradient-to-b from-accent/50 to-line-strong lg:my-0 lg:ml-1.5 lg:h-px lg:w-auto lg:bg-gradient-to-r" />
            )}
          </div>
          <div className="min-w-0 pb-6 group-last:pb-0 lg:mt-3.5 lg:pr-5 lg:pb-0">
            <p className="font-mono text-[12.5px] text-fg">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {s.name}
            </p>
            <p className="mt-1 text-[14.5px] leading-snug text-fg-2">{s.detail}</p>
            {s.exit && <p className="mt-1.5 font-mono text-[11.5px] text-hi">{s.exit}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
