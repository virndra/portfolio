"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExperienceItem } from "@/lib/experiences-data";
import { getTechBadgeStyle } from "@/lib/projects-data";

interface ExperienceCardProps {
  experience: ExperienceItem;
  isLast?: boolean;
}

export default function ExperienceCard({ experience, isLast = false }: ExperienceCardProps) {
  // Parse simple markdown bold syntax (**text**) into JSX with bold white span
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const getTypeBadgeStyle = (type: ExperienceItem["type"]) => {
    switch (type) {
      case "Internship":
        return "bg-amber-950/50 text-amber-300 border-amber-600/40";
      case "Freelance":
        return "bg-emerald-950/50 text-emerald-300 border-emerald-600/40";
      case "Client Work":
        return "bg-purple-950/50 text-purple-300 border-purple-600/40";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  return (
    <div className="relative flex gap-4 sm:gap-6 group">
      {/* Left Timeline Line & Dot Container */}
      <div className="relative flex flex-col items-center">
        {/* Timeline Dot */}
        <div className="w-3.5 h-3.5 rounded-full bg-neutral-600 border-2 border-[#0a0a0a] group-hover:bg-white group-hover:scale-125 transition-all duration-300 z-10 mt-1" />
        
        {/* Vertical Line */}
        {!isLast && (
          <div className="w-[1px] bg-neutral-800 group-hover:bg-neutral-700 transition-colors duration-300 flex-1 my-1" />
        )}
      </div>

      {/* Main Experience Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex-1 pt-4 pb-12"
      >
        {/* Top Header: Logo, Name, Badge, Date & Location */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          {/* Left Header Info */}
          <div className="flex items-center gap-2.5">
            {/* Company Logo */}
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#121214] border border-white/10 flex-shrink-0">
              <Image
                src={experience.logo}
                alt={experience.company}
                fill
                className="object-cover p-0.5"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-mono font-bold text-sm sm:text-base text-white">
                  {experience.company}
                </h3>
                <span
                  className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full border ${getTypeBadgeStyle(
                    experience.type
                  )}`}
                >
                  {experience.type}
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                {experience.role}
              </p>
            </div>
          </div>

          {/* Right Header Info: Date & Work Mode */}
          <div className="text-left sm:text-right font-mono flex-shrink-0">
            <div className="text-[11px] font-medium text-neutral-300">
              {experience.startDate} - {experience.endDate}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">
              {experience.workMode}
            </div>
          </div>
        </div>

        {/* Work Responsibilities Section */}
        <div className="mt-3">
          <h4 className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase mb-2">
            WORK
          </h4>
          <ul className="space-y-2 text-[11px] font-mono text-neutral-300 leading-relaxed">
            {experience.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-neutral-500 select-none mt-0.5">•</span>
                <span className="flex-1">{renderFormattedText(resp)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Used Section */}
        <div className="mt-4">
          <h4 className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase mb-2">
            TECHNOLOGY USED
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors flex items-center gap-1 ${getTechBadgeStyle(
                  tech
                )}`}
              >
                <span className="text-[8px] opacity-60 font-sans">&lt;/&gt;</span>
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
