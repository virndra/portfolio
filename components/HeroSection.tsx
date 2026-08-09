"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-row items-center justify-between gap-3 sm:gap-6 mb-8 sm:mb-12">
      {/* Left Column: Name & Badges */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 flex flex-col items-start min-w-0"
      >
        {/* E-Rank Dev Badge */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-0.5 mb-2 sm:mb-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] text-[11px] sm:text-xs font-mono tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>E-Rank Dev</span>
        </div>

        {/* Heading Name */}
        <h1 className="text-xl sm:text-3xl lg:text-4xl tracking-wide text-[var(--foreground)] mb-2 sm:mb-3 font-sans font-bold leading-snug">
          <span className="inline-block sm:inline">𝐕𝐄𝐄𝐑𝐄𝐍𝐃𝐑𝐀&nbsp;</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span>𝐏𝐑𝐀𝐃𝐄𝐄𝐏</span>
            <Heart className="w-[0.9em] h-[0.9em] text-red-500 fill-red-500 inline-block sm:hidden animate-pulse select-none flex-shrink-0 ml-0.5" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[var(--muted)] font-mono text-xs sm:text-sm tracking-wide">
          aka <span className="text-[var(--foreground)] font-semibold">Vir</span>&nbsp;|&nbsp;21
          <span className="hidden sm:inline">&nbsp;|&nbsp;<span className="text-[var(--foreground)] font-semibold">Full Stack Developer</span></span>
        </p>
      </motion.div>

      {/* Right Column: Profile Picture (Full color on mobile, grayscale to color on desktop hover) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex-shrink-0 self-center"
      >
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center group cursor-pointer">
          {/* Outer Ring: Exactly 13 dashed segments rotating smoothly */}
          <svg
            className="absolute inset-0 w-full h-full text-white/30 opacity-90 animate-[spin_45s_linear_infinite]"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="14.77 7.95"
            />
          </svg>

          {/* Inner Ring: Exactly 3 inner arc segments rotating in reverse */}
          <svg
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-white/30 opacity-70 animate-[spin_35s_linear_infinite_reverse]"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.0"
              strokeDasharray="44.30 54.14"
            />
          </svg>

          {/* Profile Image Container */}
          <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-full p-1 bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl overflow-hidden">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src="/profile_pic.jpeg"
                alt="Veerendra Pradeep"
                fill
                className="object-cover filter-none grayscale-0 sm:filter sm:grayscale sm:group-hover:grayscale-0 transition-all duration-300 ease-in-out"
                priority
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
