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
      className="font-mono text-[12.5px] text-ink-3 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-signal"
    >
      <span aria-live="polite">{copied ? "Copied to clipboard" : "Copy address"}</span>
    </button>
  );
}
