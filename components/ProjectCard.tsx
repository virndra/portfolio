"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ProjectItem, getTechBadgeStyle } from "@/lib/projects-data";

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "LIVE":
        return "text-emerald-700 bg-emerald-100/80 border-emerald-300 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-500/40";
      case "BUILDING":
        return "text-amber-700 bg-amber-100/80 border-amber-300 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-500/40";
      case "ACTIVE":
        return "text-emerald-700 bg-emerald-100/80 border-emerald-300 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-500/40";
      case "OPEN SOURCE":
        return "text-sky-700 bg-sky-100/80 border-sky-300 dark:text-sky-400 dark:bg-sky-950/60 dark:border-sky-500/40";
      default:
        return "text-purple-700 bg-purple-100/80 border-purple-300 dark:text-purple-400 dark:bg-purple-950/60 dark:border-purple-500/40";
    }
  };

  return (
    <motion.a
      href={project.live || project.github}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.98 }}
      className="relative dashed-card rounded-none p-4 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-dashed hover:border-black/60 dark:hover:border-white/60 hover:shadow-[0_0_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
    >
      {/* Light Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] dark:from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Corner Bracket Accents: Visible on Hover */}
      <span className="absolute -top-[3px] -left-[3px] w-3.5 h-3.5 border-t-2 border-l-2 border-neutral-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      <span className="absolute -top-[3px] -right-[3px] w-3.5 h-3.5 border-t-2 border-r-2 border-neutral-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      <span className="absolute -bottom-[3px] -left-[3px] w-3.5 h-3.5 border-b-2 border-l-2 border-neutral-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      <span className="absolute -bottom-[3px] -right-[3px] w-3.5 h-3.5 border-b-2 border-r-2 border-neutral-900 dark:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      <div>
        {/* Top Image Preview Banner */}
        <div className="relative w-full h-[180px] rounded-none overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Category & Status Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono text-neutral-600 dark:text-[#8a8a93] truncate">
            {project.category}
          </span>
          <span
            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-none tracking-wider uppercase whitespace-nowrap ${getStatusBadge(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-sans font-bold text-base sm:text-lg text-[var(--foreground)] mb-2 tracking-tight flex items-center justify-between">
          <span>{project.title}</span>
          <ExternalLink className="w-4 h-4 text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--foreground)] transition-all duration-200" />
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--muted)] font-mono leading-relaxed mb-4 min-h-[56px]">
          {project.description}
        </p>
      </div>

      {/* Technology Badges Row */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/10 dark:border-white/5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-none border transition-colors ${getTechBadgeStyle(
              tech
            )}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
