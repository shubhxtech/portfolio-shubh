"use client";

import { useId, useMemo, useState } from "react";
import { buildRing, NODE_IDS, ownership, route, type NodeId } from "@/lib/ring";
import { arcPath, nodeColor, point } from "./ringGeometry";

const SIZE = 320;
const C = SIZE / 2;
const R = 124;
const SAMPLE_KEYS = ["user:1", "order:1042", "session:7f3a"];

export function HashRing() {
  const ring = useMemo(() => buildRing(), []);
  const [key, setKey] = useState("user:1");
  const [down, setDown] = useState<ReadonlySet<NodeId>>(new Set());
  const inputId = useId();

  const r = useMemo(() => route(ring, key, down), [ring, key, down]);
  const share = useMemo(() => ownership(ring, down), [ring, down]);

  const toggle = (id: NodeId) =>
    setDown((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const owner = r.vnode;
  const [kx, ky] = point(C, r.keyFraction, R);

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-12">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-[320px]"
        role="img"
        aria-label={`Hash ring with ${ring.length} virtual nodes. Key "${key}" routes to ${owner ? owner.node : "no node"}.`}
      >
        <circle cx={C} cy={C} r={R - 24} fill="none" stroke="var(--color-line)" strokeDasharray="2 4" />
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-line-strong)" />
        {ring.map((v) => {
          const isOwner = owner === v;
          const [x1, y1] = point(C, v.fraction, R - (isOwner ? 10 : 4));
          const [x2, y2] = point(C, v.fraction, R + (isOwner ? 14 : 6));
          return (
            <line
              key={v.hash}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={nodeColor[v.node]}
              strokeWidth={isOwner ? 2.5 : 1}
              strokeLinecap="round"
              opacity={down.has(v.node) ? 0.1 : isOwner ? 1 : 0.55}
              style={{ transition: "opacity 200ms" }}
            />
          );
        })}
        {owner && (
          <path
            d={arcPath(C, R, r.keyFraction, owner.fraction)}
            fill="none"
            stroke="var(--color-hi)"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}
        <circle cx={kx} cy={ky} r={5} fill="var(--color-bg)" stroke="var(--color-hi)" strokeWidth={2} />
        <text x={C} y={C - 12} textAnchor="middle" className="fill-fg-3 font-mono text-[10px] tracking-[0.14em]">
          ROUTED TO
        </text>
        <text
          x={C}
          y={C + 13}
          textAnchor="middle"
          className="font-display text-[24px] font-medium"
          fill={owner ? nodeColor[owner.node] : "var(--color-hi)"}
        >
          {owner ? owner.node : "none"}
        </text>
        <text x={C} y={C + 32} textAnchor="middle" className="fill-fg-3 font-mono text-[10px]">
          {owner ? `vnode #${owner.index}` : "all nodes down"}
        </text>
      </svg>

      <div className="min-w-0 font-mono text-[13px] leading-relaxed">
        <label htmlFor={inputId} className="kicker block">
          Key
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-[3px] border border-line-strong bg-raised px-3 transition-colors focus-within:border-accent">
          <span aria-hidden className="text-accent">
            $
          </span>
          <input
            id={inputId}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className="w-full bg-transparent py-2 text-[16px] text-fg outline-none"
          />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-fg-3">
          <span>try</span>
          {SAMPLE_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKey(k)}
              className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              {k}
            </button>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2" aria-live="polite">
          <dt className="text-fg-3">md5</dt>
          <dd className="break-all text-fg">{r.keyHash}</dd>
          <dt className="text-fg-3">position</dt>
          <dd className="text-fg">{r.keyFraction.toFixed(4)} of the ring</dd>
          <dt className="text-fg-3">owner</dt>
          <dd className="text-fg">
            {owner ? (
              <>
                <span style={{ color: nodeColor[owner.node] }}>
                  {owner.node}#{owner.index}
                </span>
                <span className="text-fg-3">{r.wrapped ? " — wrapped past the top" : " — next live vnode clockwise"}</span>
              </>
            ) : (
              <span className="text-hi">no live node — the coordinator rejects the request</span>
            )}
          </dd>
        </dl>

        <fieldset className="mt-7">
          <legend className="kicker">Nodes · click to take one out of rotation</legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {NODE_IDS.map((id) => {
              const isDown = down.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isDown}
                  onClick={() => toggle(id)}
                  className={`inline-flex items-center gap-2 rounded-[3px] border px-2.5 py-1.5 transition-colors ${
                    isDown
                      ? "border-line bg-transparent text-fg-3 line-through"
                      : "border-line-strong bg-raised text-fg hover:border-accent"
                  }`}
                >
                  <span
                    aria-hidden
                    className="size-2 rounded-full"
                    style={{ background: nodeColor[id], opacity: isDown ? 0.3 : 1 }}
                  />
                  {id}
                  <span className="sr-only">{isDown ? "(down)" : "(up)"}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-7">
          <p className="kicker">Share of the key space</p>
          <ul className="mt-2.5 space-y-2">
            {NODE_IDS.map((id) => (
              <li key={id} className="grid grid-cols-[4.5rem_minmax(0,1fr)_3.75rem] items-center gap-3">
                <span className={down.has(id) ? "text-fg-3" : "text-fg"}>{id}</span>
                <span className="h-1.5 rounded-full bg-raised">
                  <span
                    className="block h-full rounded-full transition-[width] duration-300 ease-out"
                    style={{ width: `${share[id]}%`, background: nodeColor[id] }}
                  />
                </span>
                <span className="text-right tabular-nums text-fg-2">{share[id].toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
