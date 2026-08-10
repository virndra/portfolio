"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import ResumeModal from "@/components/ResumeModal";

interface TopBarProps {
  title?: string;
  subtitle?: React.ReactNode;
  showGreeting?: boolean;
}

export default function TopBar({ title, subtitle, showGreeting = true }: TopBarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-start justify-between py-6 mb-8 text-sm"
      >
        {/* Left side: Greeting OR Custom Title/Subtitle */}
        {title ? (
          <div>
            <h1 className="font-heading text-xl sm:text-2xl text-[var(--foreground)] tracking-wider">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[10px] sm:text-xs font-mono text-[var(--muted)] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        ) : showGreeting ? (
          <div className="flex items-center gap-2 text-[var(--foreground)] font-mono">
            <span>Hey, I&apos;m</span>
            <span>👋</span>
          </div>
        ) : (
          <div />
        )}

        {/* Right side: Resume button (Opens interactive ResumeModal) */}
        <div className="flex items-center gap-3">
          {isHome ? (
            <button
              onClick={() => setIsResumeOpen(true)}
              id="resume-button"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] text-xs font-mono hover:border-[var(--card-hover-border)] transition-all duration-200 shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={() => setIsResumeOpen(true)}
              id="resume-button"
              title="View Resume"
              aria-label="View Resume"
              className="w-8 h-8 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--card-hover-border)] transition-all duration-200 shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.header>

      {/* Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
