const phases = [
  {
    name: "Understand",
    lane: "worker",
    steps: ["Download the source (yt-dlp)", "Transcribe (Whisper)", "Align every word (wav2vec2)", "Find complete moments (local LLM)"],
  },
  {
    name: "Render",
    lane: "heavy lane",
    steps: ["Render a master once per moment", "Assemble variants in seconds", "Quality checks, e.g. no mid-word cuts"],
  },
  {
    name: "Review",
    lane: "browser",
    steps: ["Captions drawn live over the draft", "Burn text in only on approval"],
  },
  {
    name: "Publish",
    lane: "light lane",
    steps: ["Schedule per account", "Post through official APIs", "Learn from views"],
  },
];

export function ShortsPipeline() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {phases.map((p, i) => (
        <li key={p.name} className="relative rounded-[3px] border border-line bg-raised/60 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mono text-[12.5px] text-fg">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {p.name}
            </p>
            <p className="font-mono text-[10.5px] tracking-wide text-fg-3 uppercase">{p.lane}</p>
          </div>
          <ul className="mt-4 space-y-2 text-[14.5px] leading-snug text-fg-2">
            {p.steps.map((s) => (
              <li key={s} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-accent/60" />
                {s}
              </li>
            ))}
          </ul>
          {i < phases.length - 1 && (
            <span
              aria-hidden
              className="absolute top-1/2 -right-[9px] z-10 hidden size-4 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg font-mono text-[10px] text-accent lg:grid"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
