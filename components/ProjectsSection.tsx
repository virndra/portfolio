"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/projects-data";

export default function ProjectsSection() {
  const featuredProjects = PROJECTS_DATA.slice(0, 2);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-12 select-none"
    >
      <h2 className="font-heading text-lg text-[var(--foreground)] mb-4">Projects</h2>

      {/* Grid of featured projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {featuredProjects.map((project) => (
          <motion.a
            key={project.id}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="relative dashed-card rounded-none p-3.5 flex flex-col justify-between group cursor-pointer transition-all duration-300 sm:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            {/* Light Overlay: Always visible on mobile, hover on desktop */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Corner Bracket Accents */}
            <span className="absolute -top-[3px] -left-[3px] w-3.5 h-3.5 border-t-2 border-l-2 border-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <span className="absolute -top-[3px] -right-[3px] w-3.5 h-3.5 border-t-2 border-r-2 border-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <span className="absolute -bottom-[3px] -left-[3px] w-3.5 h-3.5 border-b-2 border-l-2 border-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <span className="absolute -bottom-[3px] -right-[3px] w-3.5 h-3.5 border-b-2 border-r-2 border-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

            <div>
              {/* Preview Image */}
              <div className="relative w-full h-36 rounded-none overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] mb-3">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover filter-none grayscale-0 sm:filter sm:grayscale sm:group-hover:grayscale-0 sm:group-hover:scale-105 transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Title Row */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-sans font-bold text-base text-[var(--foreground)] flex items-center gap-1.5">
                  {project.title}
                  <ExternalLink className="w-3.5 h-3.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-[var(--muted)]" />
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-[var(--muted)] font-mono leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* View all -> Link centered beneath grid pointing to /projects */}
      <div className="w-full flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 py-1 px-3 rounded-none border border-transparent hover:border-[var(--card-border)]"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.section>
  );
}
