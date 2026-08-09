import React from "react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS_DATA } from "@/lib/projects-data";

export const metadata = {
  title: "Projects | Veerendra Pradeep",
  description: "A collection of AI, LLM, Computer Vision, and Full Stack projects built by Veerendra Pradeep.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] bg-dot-pattern transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-between pt-4 pb-32">
        <div>
          {/* Header Row: PROJECTS title & subtitle on left, Resume & Theme toggle on same line on right */}
          <TopBar
            title="PROJECTS"
            subtitle={
              <>
                <span className="text-pink-400 font-semibold">A</span>{" "}
                <span>collection of things I&apos;ve built.</span>
              </>
            }
          />

          {/* 3-Column Desktop Grid with Sharp Edge Cards & Corner Bracket Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {PROJECTS_DATA.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
