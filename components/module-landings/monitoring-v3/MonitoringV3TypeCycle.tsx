"use client";

import { useEffect, useState } from "react";

export function MonitoringV3TypeCycle({ words }: { words: readonly string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx] ?? "";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setText(word);
      return;
    }

    const tick = () => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        const next = word.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIdx((i) => (i + 1) % words.length);
        }
      }
    };

    const delay = deleting ? 45 : 85;
    const t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [words, idx, text, deleting]);

  return (
    <span className="font-mono text-brand-300">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-brand-400 align-middle motion-reduce:animate-none">
        &nbsp;
      </span>
    </span>
  );
}
