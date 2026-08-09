"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS_DATA } from "@/lib/projects-data";

export default function ProjectsSection() {
  const featuredProjects = PROJECTS_DATA.filter(
    (p) => p.id === "initium" || p.id === "ig-agent"
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-12 select-none"
    >
      <h2 className="font-heading text-lg text-[var(--foreground)] mb-4">Projects</h2>

      {/* Grid of featured projects using ProjectCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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
