const MAX = 100;

const rows = [
  { label: "Before", note: "every setting change re-rendered the whole clip", from: 80, to: 100, muted: true },
  { label: "Master", note: "once per moment: face tracking, framing, grade, voice cleanup", from: 55 },
  { label: "Assembly", note: "each variant or edit: cuts, zooms, B-roll, music", from: 15, accent: true },
  { label: "Text burn", note: "once, when a clip is approved", from: 20 },
];

const ticks = [0, 25, 50, 75, 100];

export function RenderTimes() {
  return (
    <div className="font-mono text-[12.5px]">
      <ul className="space-y-5">
        {rows.map((r) => (
          <li key={r.label} className="grid gap-x-6 gap-y-1.5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
            <div>
              <p className="text-ink">
                {r.label}{" "}
                <span className="tabular-nums text-ink-3">
                  ~{r.from}
                  {r.to ? `–${r.to}` : ""} s
                </span>
              </p>
              <p className="font-serif text-[14px] leading-snug text-ink-3">{r.note}</p>
            </div>
            <div className="relative h-2.5 bg-paper-2" aria-hidden>
              <span
                className={`absolute inset-y-0 left-0 ${r.accent ? "bg-signal" : r.muted ? "bg-ink-3" : "bg-ink"}`}
                style={{ width: `${(r.from / MAX) * 100}%` }}
              />
              {r.to && (
                <span
                  className="absolute inset-y-0 bg-ink-3/35"
                  style={{ left: `${(r.from / MAX) * 100}%`, width: `${((r.to - r.from) / MAX) * 100}%` }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-x-6" aria-hidden>
        <span />
        <div className="relative h-4 text-[11px] text-ink-3">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute top-0 -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
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
