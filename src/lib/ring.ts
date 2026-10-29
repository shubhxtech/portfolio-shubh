import { md5 } from "./md5";

// Mirrors coordinator/routing/ConsistentHashRouter.java in the KV store repository.
export const VIRTUAL_NODES_PER_NODE = 150;
export const NODE_IDS = ["node-1", "node-2", "node-3"] as const;
export type NodeId = (typeof NODE_IDS)[number];

const RING_SIZE = 1n << 128n;

export type VNode = { hash: string; value: bigint; node: NodeId; index: number; fraction: number };

export function buildRing(): VNode[] {
  const ring: VNode[] = [];
  for (const node of NODE_IDS) {
    for (let i = 0; i < VIRTUAL_NODES_PER_NODE; i++) {
      const hash = md5(`${node}#${i}`);
      const value = BigInt(`0x${hash}`);
      ring.push({ hash, value, node, index: i, fraction: toFraction(value) });
    }
  }
  return ring.sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
}

export function toFraction(value: bigint): number {
  return Number((value * 1_000_000n) / RING_SIZE) / 1_000_000;
}

export type Route = { keyHash: string; keyFraction: number; vnode: VNode | null; wrapped: boolean };

// tailMap(keyHash, inclusive) → first live vnode; otherwise wrap around to the start of the ring.
export function route(ring: VNode[], key: string, down: ReadonlySet<NodeId>): Route {
  const keyHash = md5(key);
  const value = BigInt(`0x${keyHash}`);
  const keyFraction = toFraction(value);
  for (const v of ring) {
    if (v.value >= value && !down.has(v.node)) return { keyHash, keyFraction, vnode: v, wrapped: false };
  }
  for (const v of ring) {
    if (!down.has(v.node)) return { keyHash, keyFraction, vnode: v, wrapped: true };
  }
  return { keyHash, keyFraction, vnode: null, wrapped: true };
}

// Share of the hash space each live node receives: every vnode owns the arc back to the previous live vnode.
export function ownership(ring: VNode[], down: ReadonlySet<NodeId>): Record<NodeId, number> {
  const live = ring.filter((v) => !down.has(v.node));
  const share = { "node-1": 0n, "node-2": 0n, "node-3": 0n } as Record<NodeId, bigint>;
  for (let i = 0; i < live.length; i++) {
    const prev = live[(i - 1 + live.length) % live.length].value;
    const arc = (live[i].value - prev + RING_SIZE) % RING_SIZE;
    share[live[i].node] += live.length === 1 ? RING_SIZE : arc;
  }
  const out = {} as Record<NodeId, number>;
  for (const id of NODE_IDS) out[id] = Number((share[id] * 100_000n) / RING_SIZE) / 1000;
  return out;
}
