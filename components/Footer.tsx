"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Signature from "@/components/ui/Signature";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full pt-8 pb-12 border-t border-[var(--card-border)] relative font-mono text-xs text-[var(--muted)] transition-colors duration-300"
    >
      {/* Row 1: Designed & made with ♥ (left) / © 2026 All rights reserved (right) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-8 text-center sm:text-left">
        <div className="flex items-center gap-1">
          <span>Designed &amp; made with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline-block animate-pulse" />
        </div>
        <div>
          <span>© 2026 All rights reserved</span>
        </div>
      </div>

      {/* Center Row: Signature centered */}
      <div className="w-full flex justify-center items-center my-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl h-24 sm:h-32 flex items-center justify-center text-[#555555] dark:text-[#4a4a4a]"
        >
          <Signature className="w-full h-full" />
        </motion.div>
      </div>
    </motion.footer>
  );
}
