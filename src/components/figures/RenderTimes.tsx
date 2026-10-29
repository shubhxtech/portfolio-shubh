const MAX = 100;

const rows = [
  { label: "Before", note: "every setting change re-rendered the whole clip", from: 80, to: 100, tone: "muted" },
  { label: "Master", note: "once per moment: face tracking, framing, grade, voice cleanup", from: 55, tone: "base" },
  { label: "Assembly", note: "each variant or edit: cuts, zooms, B-roll, music", from: 15, tone: "hi" },
  { label: "Text burn", note: "once, when a clip is approved", from: 20, tone: "base" },
] as const;

const ticks = [0, 25, 50, 75, 100];

const toneClass = { muted: "bg-fg-3/70", base: "bg-accent/80", hi: "bg-hi" };

export function RenderTimes() {
  return (
    <div className="font-mono text-[12.5px]">
      <ul className="space-y-5">
        {rows.map((r) => (
          <li key={r.label} className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
            <div>
              <p className="text-fg">
                {r.label}{" "}
                <span className="tabular-nums text-fg-3">
                  ~{r.from}
                  {"to" in r ? `–${r.to}` : ""} s
                </span>
              </p>
              <p className="font-sans text-[13.5px] leading-snug text-fg-3">{r.note}</p>
            </div>
            <div className="relative h-2.5 rounded-full bg-raised" aria-hidden>
              <span
                className={`absolute inset-y-0 left-0 rounded-full ${toneClass[r.tone]}`}
                style={{ width: `${(r.from / MAX) * 100}%` }}
              />
              {"to" in r && (
                <span
                  className="absolute inset-y-0 rounded-r-full bg-fg-3/30"
                  style={{ left: `${(r.from / MAX) * 100}%`, width: `${((r.to - r.from) / MAX) * 100}%` }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-x-6" aria-hidden>
        <span />
        <div className="relative h-4 border-t border-dashed border-line-strong pt-1 text-[11px] text-fg-3">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute top-1 -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
              style={{ left: `${(t / MAX) * 100}%` }}
            >
              {t}s
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
