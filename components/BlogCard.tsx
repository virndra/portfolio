"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BlogItem } from "@/lib/blogs-data";

interface BlogCardProps {
  blog: BlogItem;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.a
      href={blog.url}
      target={blog.external ? "_blank" : "_self"}
      rel={blog.external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.99 }}
      className="group relative block p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--card-hover-border)] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
    >
      <div className="flex flex-col space-y-3">
        {/* Top Row: Title & Type Badge */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-mono font-bold text-base sm:text-lg text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {blog.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 uppercase tracking-wider">
              {blog.type}
            </span>
            <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
        </div>

        {/* Subheader: Date & Author Attribution */}
        <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)]">
          <span>{blog.displayDate}</span>
          <span>•</span>
          <span>By {blog.author}</span>
        </div>

        {/* Short Description Excerpt */}
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] leading-relaxed">
          {blog.description}
        </p>
      </div>
    </motion.a>
  );
}
