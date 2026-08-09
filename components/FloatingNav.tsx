"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Terminal, Briefcase, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { liquidGlass } from "@/lib/liquid-glass";

export default function FloatingNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (navRef.current && mounted) {
      const glass = liquidGlass(navRef.current, {
        scale: -12, // Subtle, clean edge refraction without text distortion
        blur: 0, // 100% transparent, crisp text inside
        mapBlur: 12, // Smooth curve on the edge
        saturate: 1, // Clean natural colors
      });
      return () => glass.destroy();
    }
  }, [mounted]);

  const navItems = [
    { name: "Home", icon: <Home className="w-[18px] h-[18px] mb-1" />, href: "/" },
    { name: "Projects", icon: <Terminal className="w-[18px] h-[18px] mb-1" />, href: "/projects" },
    { name: "Experience", icon: <Briefcase className="w-[18px] h-[18px] mb-1" />, href: "/#experience" },
    { name: "Blogs", icon: <BookOpen className="w-[18px] h-[18px] mb-1" />, href: "/#blogs" },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        ref={navRef}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-1 p-2 rounded-full"
        style={{
          background: "transparent", // 100% transparent background
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.2),
            inset 0 1px 1px rgba(255, 255, 255, 0.5),
            inset 0 0 0 1px rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-16 h-[52px] rounded-2xl transition-all duration-300 ${isActive
                ? "text-white font-bold -translate-y-1 scale-110 drop-shadow-md"
                : "text-neutral-500 font-medium hover:text-white/80"
                }`}
            >
              {item.icon}
              <span className="text-[9px] uppercase tracking-wider mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
