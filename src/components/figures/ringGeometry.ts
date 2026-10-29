import type { NodeId } from "@/lib/ring";

export const nodeColor: Record<NodeId, string> = {
  "node-1": "var(--color-node-1)",
  "node-2": "var(--color-node-2)",
  "node-3": "var(--color-node-3)",
};

// Rounded so server and browser trig results serialize identically during hydration.
const round = (n: number) => Math.round(n * 100) / 100;

export function point(c: number, fraction: number, radius: number) {
  const a = fraction * 2 * Math.PI - Math.PI / 2;
  return [round(c + radius * Math.cos(a)), round(c + radius * Math.sin(a))] as const;
}

export function arcPath(c: number, r: number, from: number, to: number) {
  const span = (to - from + 1) % 1;
  const [x1, y1] = point(c, from, r);
  const [x2, y2] = point(c, to, r);
  return `M ${x1} ${y1} A ${r} ${r} 0 ${span > 0.5 ? 1 : 0} 1 ${x2} ${y2}`;
}
