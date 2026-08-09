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
        return "text-emerald-400 bg-emerald-950/60 border border-emerald-500/40";
      case "BUILDING":
        return "text-amber-400 bg-amber-950/60 border border-amber-500/40";
      case "ACTIVE":
        return "text-emerald-400 bg-emerald-950/60 border border-emerald-500/40";
      case "OPEN SOURCE":
        return "text-sky-400 bg-sky-950/60 border border-sky-500/40";
      default:
        return "text-purple-400 bg-purple-950/60 border border-purple-500/40";
    }
  };

  return (
    <motion.a
      href={project.live || project.github}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.98 }}
      className="relative bg-[#121214] border border-white/10 rounded-xl p-4 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-dashed hover:border-white/40 hover:bg-[#161619]"
    >
      <div>
        {/* Top Image Preview Banner */}
        <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-white/10 bg-[#09090b] mb-4">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>

        {/* Category & Status Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono text-[#8a8a93] truncate">
            {project.category}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase whitespace-nowrap ${getStatusBadge(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-sans font-bold text-base sm:text-lg text-white mb-2 tracking-tight group-hover:text-white flex items-center justify-between">
          <span>{project.title}</span>
          <ExternalLink className="w-4 h-4 text-[#8a8a93] group-hover:text-white transition-colors duration-200" />
        </h3>

        {/* Description */}
        <p className="text-xs text-[#909095] font-sans leading-relaxed mb-4 min-h-[56px] opacity-90">
          {project.description}
        </p>
      </div>

      {/* Technology Badges Row */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border transition-colors ${getTechBadgeStyle(
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
