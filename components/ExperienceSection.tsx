"use client";

import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import { EXPERIENCES_DATA } from "@/lib/experiences-data";

interface ExperienceSectionProps {
  hideHeader?: boolean;
}

export default function ExperienceSection({ hideHeader = false }: ExperienceSectionProps) {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-16 select-none scroll-mt-24"
    >
      {/* Heading & Subtitle matching Reference Screenshot */}
      {!hideHeader && (
        <div className="mb-8">
          <h2 className="font-heading text-lg sm:text-xl text-[var(--foreground)] tracking-wider mb-1.5">
            EXPERIENCES
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)]">
            My journey as a software developer over 1+ years
          </p>
        </div>
      )}

      {/* Vertical Timeline Container */}
      <div className="relative pl-1 sm:pl-2">
        {EXPERIENCES_DATA.map((item, index) => (
          <ExperienceCard
            key={item.id}
            experience={item}
            isLast={index === EXPERIENCES_DATA.length - 1}
          />
        ))}
      </div>
    </motion.section>
  );
}
