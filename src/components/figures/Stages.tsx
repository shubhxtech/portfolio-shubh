export type Stage = { name: string; detail: string; exit?: string };

// A left-to-right pipeline on wide screens, a top-to-bottom one on narrow screens.
export function Stages({ stages }: { stages: Stage[] }) {
  return (
    <ol className="grid gap-0 lg:auto-cols-fr lg:grid-flow-col">
      {stages.map((s, i) => (
        <li key={s.name} className="group relative flex gap-4 lg:block">
          <div className="flex flex-col items-center lg:flex-row" aria-hidden>
            <span className="mt-[5px] size-2 shrink-0 rounded-full border border-ink bg-paper lg:mt-0" />
            {i < stages.length - 1 && <span className="my-1 w-px flex-1 bg-rule-strong lg:my-0 lg:ml-1 lg:h-px lg:w-auto" />}
          </div>
          <div className="min-w-0 pb-6 group-last:pb-0 lg:mt-3 lg:pr-5 lg:pb-0">
            <p className="font-mono text-[13px] text-ink">
              <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span> {s.name}
            </p>
            <p className="mt-1 text-[15px] leading-snug text-ink-2">{s.detail}</p>
            {s.exit && <p className="mt-1.5 font-mono text-[11.5px] text-signal">{s.exit}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
