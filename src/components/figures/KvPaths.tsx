"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Stages, type Stage } from "./Stages";

type Path = { id: string; label: string; stages: Stage[]; note?: string };

const paths: Path[] = [
  {
    id: "write",
    label: "Write path",
    stages: [
      { name: "PUT", detail: "key, value" },
      { name: "WAL", detail: "Append, fsync, CRC32 per record" },
      { name: "Memtable", detail: "Sorted skip list in memory" },
      { name: "Flush", detail: "At 8 MB, one sequential write" },
      { name: "SSTable", detail: "Immutable: data, Bloom filter, sparse index, 28-byte footer" },
      { name: "Compaction", detail: "Size-tiered k-way merge, in the background" },
    ],
  },
  {
    id: "read",
    label: "Read path",
    stages: [
      { name: "GET", detail: "key" },
      { name: "LRU cache", detail: "Hit returns immediately", exit: "hit → value" },
      { name: "Memtable", detail: "Newest data still in memory", exit: "value · tombstone" },
      { name: "Bloom filter", detail: "Per SSTable, 1% false positives; a miss skips the file" },
      { name: "Sparse index", detail: "Key to block offset, then binary search" },
      { name: "Scan", detail: "Short linear scan inside the block", exit: "value · deleted · not found" },
    ],
  },
  {
    id: "replicate",
    label: "Replication",
    stages: [
      { name: "Client", detail: "PUT /api/v1/kv/{key}" },
      { name: "Coordinator", detail: "Sends writes to the cached leader; on NOT_LEADER:<id> it updates the cache and retries" },
      { name: "Leader", detail: "Appends the entry and sends AppendEntries to both followers in parallel" },
      { name: "Followers", detail: "Check the entry is consistent with their log, then acknowledge" },
      { name: "Commit", detail: "Majority (2 of 3) acknowledged: apply, reply 200 OK" },
    ],
    note: "Elections use randomized 150–300 ms timeouts and 50 ms heartbeats. A node persists its term and vote to disk, so a restart can't make it vote twice.",
  },
];

export function KvPaths() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + paths.length) % paths.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const path = paths[active];

  return (
    <div>
      <div role="tablist" aria-label="Request paths" className="flex gap-6 border-b border-line" onKeyDown={onKeyDown}>
        {paths.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${base}-tab-${p.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 pb-2.5 font-mono text-[13px] transition-colors ${
              i === active ? "border-accent text-fg" : "border-transparent text-fg-3 hover:text-fg"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${path.id}`}
        className="pt-7"
        key={path.id}
      >
        <Stages stages={path.stages} />
        {path.note && (
          <p className="mt-7 max-w-[64ch] border-l-2 border-hi/60 pl-3 font-mono text-[12px] leading-relaxed text-fg-2">
            {path.note}
          </p>
        )}
      </div>
    </div>
  );
}
