"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check, Sparkles } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { BLOGS_DATA, BlogItem } from "@/lib/blogs-data";

interface BlogsSectionProps {
  hideHeader?: boolean;
}

export default function BlogsSection({ hideHeader = false }: BlogsSectionProps) {
  const [activeTab, setActiveTab] = useState<"technical" | "personal">("technical");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    return BLOGS_DATA.filter((item) => {
      if (item.category !== activeTab) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
      );
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [activeTab, searchQuery, sortOrder]);

  return (
    <motion.section
      id="blogs"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-16 select-none scroll-mt-24"
    >
      {/* Header & Subtitle */}
      {!hideHeader && (
        <div className="mb-6">
          <h2 className="font-heading text-lg sm:text-xl text-[var(--foreground)] tracking-wider mb-1.5">
            BLOGS
          </h2>
          <p className="text-[10px] sm:text-xs font-mono text-[var(--muted)]">
            Latest articles and tutorials
          </p>
        </div>
      )}

      {/* Category Tabs: [ technical ] [ personal ] */}
      <div className="flex items-center gap-2 mb-6 border-b border-[var(--card-border)] pb-3">
        {(["technical", "personal"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] font-bold shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card-bg)]"
              }`}
            >
              [ {tab} ]
            </button>
          );
        })}
      </div>

      {/* Toolbar Row: Search Input & Sort Control */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search articles..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] placeholder-[var(--muted)] rounded-lg focus:outline-none focus:border-[var(--card-hover-border)] transition-colors"
          />
        </div>

        {/* Sort Dropdown / Control */}
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center justify-between gap-2 px-3 py-2 text-xs font-mono bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] rounded-lg hover:border-[var(--card-hover-border)] transition-colors min-w-[120px] cursor-pointer"
          >
            <span>✓ {sortOrder}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--muted)]" />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1.5 w-36 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-xl z-20 py-1"
              >
                {(["newest", "oldest"] as const).map((order) => (
                  <button
                    key={order}
                    onClick={() => {
                      setSortOrder(order);
                      setIsSortOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono text-[var(--foreground)] hover:bg-[var(--card-border)]/40 transition-colors cursor-pointer"
                  >
                    <span className="capitalize">{order}</span>
                    {sortOrder === order && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <BlogCard key={article.id} blog={article} />
          ))}
        </div>
      ) : searchQuery.trim() ? (
        /* Empty Search Results State */
        <div className="p-8 text-center rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
          <p className="text-xs font-mono text-[var(--muted)]">
            No {activeTab} articles found matching &quot;{searchQuery}&quot;.
          </p>
        </div>
      ) : (
        /* Personal Tab — Minimal Coming Soon Card */
        <div className="p-8 sm:p-10 text-center rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--card-border)] text-xs font-mono text-[var(--muted)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>PERSONAL</span>
          </div>

          <h3 className="font-mono font-bold text-base sm:text-lg text-[var(--foreground)]">
            Coming Soon
          </h3>

          <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md mx-auto leading-relaxed">
            I&apos;m working on something worth writing about. More personal thoughts, experiences, and lessons learned will be published here soon.
          </p>
        </div>
      )}
    </motion.section>
  );
}
