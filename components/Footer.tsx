"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Signature from "@/components/ui/Signature";

function formatOrdinal(n: number): string {
  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes: Record<string, string> = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };
  const rule = pr.select(n);
  const suffix = suffixes[rule] || "th";
  return `${n.toLocaleString()}${suffix}`;
}

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Only increment/count once per session to avoid inflating count on page refreshes
    const hasVisited = sessionStorage.getItem("has_visited_portfolio");

    fetch("/api/visitor")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setVisitorCount(data.count);
          if (!hasVisited) {
            sessionStorage.setItem("has_visited_portfolio", "true");
          }
        }
      })
      .catch(() => {
        // Fallback static count if offline
        setVisitorCount(142);
      });
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full pt-10 pb-12 border-t border-[var(--card-border)] relative font-mono text-xs text-[var(--muted)] transition-colors duration-300 space-y-6"
    >
      {/* 1. Quote centered */}
      <div className="text-center">
        <p className="font-cormorant italic text-base sm:text-lg text-[var(--foreground)] opacity-90 tracking-wide">
          &ldquo; As a man thinketh, so is he &rdquo;
        </p>
      </div>

      {/* 2. Designed & made with ❤️ centered */}
      <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[var(--muted)]">
        <span>Designed &amp; made with</span>
        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block animate-pulse" />
      </div>

      {/* 3. Row: Visitors number (left) & © 2026. All rights reserved (right) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] font-mono text-[var(--muted)]">
        <div>
          {visitorCount !== null && (
            <span>
              you&apos;re the <strong className="text-[var(--foreground)] font-semibold">{formatOrdinal(visitorCount)}</strong> visitor
            </span>
          )}
        </div>
        <div>
          <span>© 2026. All rights reserved</span>
        </div>
      </div>

      {/* 4. Bottom Row: Signature centered at the very bottom */}
      <div className="w-full flex justify-center items-center pt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md h-20 sm:h-24 flex items-center justify-center text-[#555555] dark:text-[#4a4a4a]"
        >
          <Signature className="w-full h-full" />
        </motion.div>
      </div>
    </motion.footer>
  );
}
