"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-10"
    >
      {/* Section Title */}
      <h2 className="font-heading text-lg text-[var(--foreground)] mb-3">About Me</h2>

      {/* Bio Content without card background or border */}
      <div className="font-mono text-xs sm:text-sm text-[var(--muted)] leading-relaxed space-y-3 px-1 py-1">
        {/* Header Comment Line */}
        <div className="text-[var(--muted)] opacity-80 select-none">I am Veerendra, </div>

        {/* Paragraph 1 */}
        <p>
          a 21 year old guy, who was passionate about software engineering, currently learning CUDA and ML Infra and currently working on llm's.
        </p>

        {/* Paragraph 2 */}
        <p>
          TECH STACK: Python, C, C++, JavaScript/TypeScript, React, Next.js, Node.js, SQL, Supabase, Cloudflare, GenAI, Machine Learning, LLM's, Rust, Go.
        </p>
      </div>
    </motion.section>
  );
}
