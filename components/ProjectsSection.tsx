"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  name: string;
  stars: number;
  description: string;
  image: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: "initium",
    name: "initium",
    stars: 883,
    description: "High-performance CLI application starter kit and build scaffolding system.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    link: "https://github.com/virndra/initium",
  },
  {
    id: "cinematch",
    name: "CineMatch",
    stars: 2762,
    description: "Full-stack intelligent movie recommendation engine (Flask, MySQL, Cosine Similarity).",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    link: "https://github.com/virndra",
  },
];

export default function ProjectsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-12"
    >
      <h2 className="font-heading text-lg text-[var(--foreground)] mb-4">Projects</h2>

      {/* Grid of 2 projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative dashed-card rounded-none p-3.5 flex flex-col justify-between group cursor-pointer transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
          >
            {/* Minimal Light Effect Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Corner Bracket Accents placed OUTSIDE the card border */}
            <span className="absolute -top-[3px] -left-[3px] w-3.5 h-3.5 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <span className="absolute -top-[3px] -right-[3px] w-3.5 h-3.5 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <span className="absolute -bottom-[3px] -left-[3px] w-3.5 h-3.5 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
            <span className="absolute -bottom-[3px] -right-[3px] w-3.5 h-3.5 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

            <div>
              {/* Preview Image: Sharp corners */}
              <div className="relative w-full h-36 rounded-none overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] mb-3">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 ease-in-out"
                />
              </div>

              {/* Title Row */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-sans font-bold text-base text-[var(--foreground)] group-hover:text-[var(--foreground)] flex items-center gap-1.5">
                  {project.name}
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted)]" />
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-[var(--muted)] font-mono leading-relaxed">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* View all -> Link centered beneath grid */}
      <div className="w-full flex justify-center">
        <a
          href="https://github.com/virndra?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200 py-1 px-3 rounded-none border border-transparent hover:border-[var(--card-border)]"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.section>
  );
}
