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
    <ol className="grid lg:grid-cols-4">
      {phases.map((p, i) => (
        <li
          key={p.name}
          className="border-t border-rule py-5 first:border-t-0 first:pt-0 last:pb-0 lg:border-t-0 lg:border-l lg:px-5 lg:py-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
        >
          <p className="font-mono text-[13px] text-ink">
            <span className="text-ink-3">{String(i + 1).padStart(2, "0")}</span> {p.name}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-ink-3">{p.lane}</p>
          <ul className="mt-4 space-y-2 text-[15px] leading-snug text-ink-2">
            {p.steps.map((s) => (
              <li key={s} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-rule-strong" />
                {s}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
