"use client";

import React, { useState, useEffect } from "react";
import { FileText, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check initial theme or system preference
    if (document.documentElement.classList.contains("light")) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex items-center justify-between py-6 mb-8 text-sm"
    >
      {/* Left side: Hey, I'm 👋 */}
      <div className="flex items-center gap-2 text-[var(--foreground)] font-mono">
        <span>Hey, I&apos;m</span>
        <span>👋</span>
      </div>

      {/* Right side: Resume button + Theme toggle button */}
      <div className="flex items-center gap-3">
        <a
          href="/RESUMEE.pdf"
          target="_blank"
          rel="noopener noreferrer"
          id="resume-button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] text-xs font-mono hover:border-[var(--card-hover-border)] transition-all duration-200 shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          id="theme-toggle-button"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
          aria-label="Toggle Theme"
          className="w-8 h-8 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--card-hover-border)] transition-all duration-200 group"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>
      </div>
    </motion.header>
  );
}
