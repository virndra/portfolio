"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

export default function GitContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          setContributions(data.days || []);
          setTotalContributions(typeof data.totalContributions === "number" ? data.totalContributions : 0);
        }
      } catch (err) {
        console.error("Failed to load GitHub calendar:", err);
      }
    }
    fetchGitHubData();
  }, []);

  const currentYear = new Date().getFullYear();
  const yearStr = currentYear.toString();

  // Filter and pad days for current calendar year so Jan 1 aligns with its exact weekday
  const { daysToDisplay, monthLabelPositions } = React.useMemo(() => {
    let yearDays: ContributionDay[] = [];
    if (contributions.length > 0) {
      yearDays = contributions.filter((d) => d.date.startsWith(yearStr));
      if (yearDays.length > 0) {
        yearDays = [...yearDays].sort((a, b) => a.date.localeCompare(b.date));
      }
    }

    if (yearDays.length === 0) {
      yearDays = Array.from({ length: 365 }).map((_, i) => {
        const d = new Date(Date.UTC(currentYear, 0, 1 + i));
        return {
          date: d.toISOString().split("T")[0],
          count: 0,
          level: 0,
        };
      });
    }

    // Pad beginning of year so Jan 1 sits on its correct weekday row (0=Sun, 1=Mon, ..., 6=Sat)
    const firstDateStr = yearDays[0].date;
    const [y, m, dn] = firstDateStr.split("-").map(Number);
    const firstDate = new Date(Date.UTC(y, m - 1, dn));
    const padCount = firstDate.getUTCDay();

    const padded: ContributionDay[] = [];
    for (let i = padCount; i > 0; i--) {
      const dt = new Date(Date.UTC(y, m - 1, dn - i));
      padded.push({
        date: dt.toISOString().split("T")[0],
        count: 0,
        level: 0,
      });
    }
    padded.push(...yearDays);

    // Calculate month label positions matching 16px column steps
    const weeksCount = Math.ceil(padded.length / 7);
    const monthPositions: { monthName: string; pixelX: number }[] = [];
    let lastMonth = "";

    for (let w = 0; w < weeksCount; w++) {
      const day = padded[w * 7];
      if (day && day.date) {
        const [year, month, dayNum] = day.date.split("-").map(Number);
        const dateObj = new Date(Date.UTC(year, month - 1, dayNum));
        const monthName = dateObj.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
        if (monthName !== lastMonth) {
          if (year === currentYear) {
            monthPositions.push({ monthName, pixelX: w * 16 });
          }
          lastMonth = monthName;
        }
      }
    }

    return { daysToDisplay: padded, monthLabelPositions: monthPositions };
  }, [contributions, yearStr, currentYear]);

  // Enhanced high-contrast level colors:
  // Level 0: subtle dark gray (#222226)
  // Level 1-4: distinct bright gray/white levels that pop out clearly
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#d4d4d8] border border-black/[0.08] dark:bg-[#52525b] dark:border-white/[0.08]";
      case 2:
        return "bg-[#a1a1aa] border border-black/[0.12] dark:bg-[#a1a1aa] dark:border-white/[0.12]";
      case 3:
        return "bg-[#52525b] border border-black/[0.2] dark:bg-[#e4e4e7] dark:border-white/[0.2]";
      case 4:
        return "bg-[#18181b] border border-black dark:bg-[#ffffff] dark:border-white dark:shadow-[0_0_8px_rgba(255,255,255,0.6)]";
      default:
        return "bg-[#ebedf0] border border-black/[0.05] dark:bg-[#222226] dark:border-white/[0.03]";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, dayNum] = dateStr.split("-").map(Number);
      const dateObj = new Date(Date.UTC(year, month - 1, dayNum));
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-12"
    >
      {/* Outer Section Heading matching Projects */}
      <h2 className="font-heading text-lg text-[var(--foreground)] mb-4">
        GITHUB Contributions
      </h2>

      {/* Container */}
      <div className="w-full space-y-3 overflow-hidden px-1 py-1">
        {/* Unified Scrollable Wrapper: Month Headers and Heatmap Grid scroll together */}
        <div className="w-full pt-1 pb-1 overflow-x-auto no-scrollbar">
          <div className="min-w-[832px] space-y-1.5 relative">
            {/* Month Labels Row (Exact 16px pixel column alignment for Year 2026) */}
            <div className="relative w-full h-4 text-[12px] font-sans text-[var(--foreground)] opacity-90 select-none">
              {monthLabelPositions.map((item, idx) => (
                <span
                  key={idx}
                  className="absolute top-0 whitespace-nowrap"
                  style={{ left: `${item.pixelX}px` }}
                >
                  {item.monthName}
                </span>
              ))}
            </div>

            {/* Heatmap Grid for Year 2026 (12px tiles + 4px gap = 16px per column matching react-activity-calendar) */}
            <div className="grid grid-rows-7 grid-flow-col gap-[4px] justify-start min-w-[832px]">
              {daysToDisplay.map((day, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${day.count} contributions on ${formatDate(day.date)}`}
                  className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-150 cursor-pointer hover:scale-125 hover:z-20 ${getLevelColor(
                    day.level
                  )}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm font-sans text-[var(--foreground)] pt-2">
          <div className="font-medium min-h-[20px] flex items-center">
            {hoveredDay ? (
              <span className="transition-opacity duration-200">
                <strong className="font-semibold text-neutral-900 dark:text-white">
                  {hoveredDay.count === 0 ? "No" : hoveredDay.count}
                </strong>{" "}
                {hoveredDay.count === 1 ? "contribution" : "contributions"} on{" "}
                <span className="text-[var(--muted)]">{formatDate(hoveredDay.date)}</span>
              </span>
            ) : (
              <span className="transition-opacity duration-200">
                This year, I achieved {totalContributions} contributions
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] self-end sm:self-auto">
            <span className="text-[var(--foreground)]">Less</span>
            <div className={`w-[12px] h-[12px] rounded-[2px] ${getLevelColor(0)}`} />
            <div className={`w-[12px] h-[12px] rounded-[2px] ${getLevelColor(1)}`} />
            <div className={`w-[12px] h-[12px] rounded-[2px] ${getLevelColor(2)}`} />
            <div className={`w-[12px] h-[12px] rounded-[2px] ${getLevelColor(3)}`} />
            <div className={`w-[12px] h-[12px] rounded-[2px] ${getLevelColor(4)}`} />
            <span className="text-[var(--foreground)]">More</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
