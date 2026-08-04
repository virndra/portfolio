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
          setTotalContributions(data.totalContributions || 39);
        }
      } catch (err) {
        console.error("Failed to load GitHub calendar:", err);
      }
    }
    fetchGitHubData();
  }, []);

  // Filter or generate 364 days specifically for calendar year 2026 starting Jan 1, 2026
  const daysToDisplay: ContributionDay[] = contributions.length > 0
    ? contributions.filter((d) => d.date.startsWith("2026")).length > 0
      ? contributions.filter((d) => d.date.startsWith("2026"))
      : contributions.slice(-364)
    : Array.from({ length: 364 }).map((_, i) => {
        const d = new Date(Date.UTC(2026, 0, 1 + i));
        const count = i % 19 === 0 ? 9 : i % 11 === 0 ? 5 : i % 7 === 0 ? 3 : i % 4 === 0 ? 1 : 0;
        const level = count > 8 ? 4 : count > 4 ? 3 : count > 2 ? 2 : count > 0 ? 1 : 0;
        return {
          date: d.toISOString().split("T")[0],
          count,
          level,
        };
      });

  // Calculate month label positions matching exact react-activity-calendar 16px column steps
  const weeksCount = Math.floor(daysToDisplay.length / 7);
  const monthLabelPositions: { monthName: string; pixelX: number }[] = [];
  let lastMonth = "";

  for (let w = 0; w < weeksCount; w++) {
    const day = daysToDisplay[w * 7];
    if (day && day.date) {
      const [year, month, dayNum] = day.date.split("-").map(Number);
      const dateObj = new Date(Date.UTC(year, month - 1, dayNum));
      const monthName = dateObj.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
      if (monthName !== lastMonth) {
        monthLabelPositions.push({ monthName, pixelX: w * 16 });
        lastMonth = monthName;
      }
    }
  }

  // Exact colors & stroke matching react-activity-calendar HTML snippet:
  // Level 0: #383838, Level 1: #606060, Level 2: #8C8C8C, Level 3: #BABABA, Level 4: #EBEBEB
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#606060] border border-white/[0.04]";
      case 2:
        return "bg-[#8C8C8C] border border-white/[0.04]";
      case 3:
        return "bg-[#BABABA] border border-white/[0.04]";
      case 4:
        return "bg-[#EBEBEB] border border-white/[0.04] shadow-[0_0_6px_rgba(255,255,255,0.3)]";
      default:
        return "bg-[#383838] border border-white/[0.04]";
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
                <strong className="font-semibold text-white">
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
            <div className="w-[12px] h-[12px] rounded-[2px] bg-[#383838] border border-white/[0.04]" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-[#606060] border border-white/[0.04]" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-[#8C8C8C] border border-white/[0.04]" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-[#BABABA] border border-white/[0.04]" />
            <div className="w-[12px] h-[12px] rounded-[2px] bg-[#EBEBEB] border border-white/[0.04]" />
            <span className="text-[var(--foreground)]">More</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
