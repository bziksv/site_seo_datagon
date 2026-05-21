"use client";

import { useEffect, useState } from "react";

export function MonitoringV3ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setP(max > 0 ? doc.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/10" aria-hidden>
      <div
        className="h-full origin-left bg-brand-500 transition-[transform] duration-150 ease-out"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
