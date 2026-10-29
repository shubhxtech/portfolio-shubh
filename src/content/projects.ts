export type FigureId = "hash-ring" | "kv-paths" | "shorts-pipeline" | "render-times";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  stack: string[];
  links: { label: string; href: string }[];
  problem: string;
  approach: string[];
  figures: FigureId[];
  decisions: { choice: string; why: string }[];
  tradeoffs: string[];
  // Optional: what you learned or would change next. Rendered only when present.
  next?: string[];
};

export const projects: Project[] = [
  {
    slug: "kv-store",
    title: "Distributed key-value store",
    summary:
      "A three-node key-value database written from scratch in Java: its own LSM-tree storage engine, a consistent-hash router, and a Raft implementation for leader election and replicated writes.",
    period: "Jul 2026 – present",
    stack: ["Java 21", "Spring Boot", "gRPC / Protobuf", "Raft", "Docker Compose", "Prometheus", "React"],
    links: [
      { label: "Source", href: "https://github.com/shubhxtech/Distributed-NoSQL-Key-Value-Database" },
    ],
    problem:
      "Databases like RocksDB, Cassandra and etcd are easy to use and hard to understand from the outside. I wanted to build the parts myself — the storage engine, the routing layer and the consensus protocol — to understand why each one is designed the way it is.",
    approach: [
      "Every write goes to a write-ahead log first (CRC32 per record, fsync), then into a sorted in-memory memtable. When the memtable reaches 8 MB it is flushed to an immutable SSTable on disk. Each SSTable carries a Bloom filter, so a read can skip files that don't hold the key without touching them, and a sparse index to find the right block in the ones that might. An LRU cache sits in front of it all.",
      "A stateless coordinator places keys on a consistent-hash ring with 150 virtual nodes per storage node, and talks to the nodes over gRPC. Writes go through the Raft leader and commit only once a majority of the three nodes has them.",
    ],
    figures: ["hash-ring", "kv-paths"],
    decisions: [
      {
        choice: "ConcurrentSkipListMap as the memtable",
        why: "Already sorted, so a flush is a straight sequential write; reads are lock-free.",
      },
      {
        choice: "CRC32 on every WAL record",
        why: "Detects torn writes after a crash. Replay stops at the first corrupt record instead of loading garbage.",
      },
      {
        choice: "Raft as a transport-agnostic state machine",
        why: "The state machine only sees RequestVote and AppendEntries calls, so it is unit-tested without a network.",
      },
      {
        choice: "A dedicated port for Raft traffic",
        why: "Client load can't starve heartbeats and trigger needless elections.",
      },
      {
        choice: "Raft term and vote persisted to disk",
        why: "A restarted node can't regress its term or vote twice in the same election.",
      },
    ],
    tradeoffs: [
      "The cluster is CP: when a majority is unreachable, it refuses writes rather than accept ones it might lose.",
      "Compaction is size-tiered, which favours write throughput over read amplification.",
    ],
  },
  {
    slug: "autoshorts",
    title: "AutoShorts",
    summary:
      "An open-source studio that turns long videos into vertical Shorts and Reels, and makes faceless videos from a topic. Every model — speech, language, voice and image — runs on the user's own machine.",
    period: "Oct 2026 – present",
    stack: ["Python", "FastAPI", "SQLite", "React", "Whisper", "wav2vec2", "Qwen (Ollama / MLX)", "FFmpeg", "OpenCV", "MCP"],
    links: [{ label: "Source", href: "https://github.com/shubhxtech/AutoShorts" }],
    problem:
      "Cloud clipping tools charge per minute and require uploading unpublished footage. Doing the same work locally means fitting transcription, an LLM and video rendering onto one laptop, and still keeping editing fast enough to be pleasant.",
    approach: [
      "The engine is two processes that talk only through SQLite: an API that never runs a model, so the dashboard stays responsive, and a worker with one heavy slot (transcription, rendering) and three light slots (publishing, metrics). The job queue is a table; a conditional UPDATE inside a transaction makes sure two workers never claim the same job.",
      "The LLM is used where judgement is needed — which moment stands on its own, where it should start and end — and deterministic code places every cut, zoom and caption. Forced alignment with wav2vec2 keeps cuts from splitting words.",
    ],
    figures: ["shorts-pipeline", "render-times"],
    decisions: [
      {
        choice: "SQLite as both database and job queue",
        why: "Nothing extra for non-developers to install, and jobs survive restarts. The cost is single-machine only, which suits the product.",
      },
      {
        choice: "Text is never baked into review drafts",
        why: "The browser draws captions live from an overlay spec, so text edits are instant; text is burned in only on approval.",
      },
      {
        choice: "One designed voice, cloned for every line",
        why: "Re-designing the voice per call made the narrator drift between scenes; pitch spread across lines fell from about 28 Hz to 1 Hz.",
      },
      {
        choice: "Secure by default on localhost",
        why: "A Host-header check against DNS rebinding, a per-install access token, and a public tunnel that can only serve one signed clip.",
      },
    ],
    tradeoffs: [
      "Running every model locally sets a floor of roughly a 16 GB laptop, and memory has to be managed deliberately: idle models are unloaded after a few minutes.",
      "SQLite keeps it to a single machine. A multi-user server would need Postgres and a real message broker.",
    ],
  },
];
