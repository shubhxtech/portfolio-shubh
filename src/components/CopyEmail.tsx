"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`rounded-[3px] border px-3 py-2 font-mono text-[12.5px] transition-colors ${
        copied ? "border-node-2/60 text-node-2" : "border-line-strong text-fg-2 hover:border-accent hover:text-accent"
      }`}
    >
      <span aria-live="polite">{copied ? "✓ Copied" : "Copy address"}</span>
    </button>
  );
}
