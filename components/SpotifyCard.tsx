"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C13.62 9.9 19.08 10.56 22.8 12.84c.36.18.54.78.161 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.62.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function SpotifyCard() {
  const [track, setTrack] = useState<SpotifyTrack>({
    isPlaying: false,
    title: "Hall of Fame",
    artist: "The Script",
    album: "#3",
    albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    songUrl: "https://open.spotify.com/track/7CH1sfLfcA38mWRyR4KZjM",
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchSpotify() {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = await res.json();
          setTrack(data);
        }
      } catch (err) {
        console.error("Failed to load Spotify track:", err);
      }
    }

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-10"
    >
      <a
        href={track.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {/* Solid / Borderless Card Container without dotted borders */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            borderColor: isHovered ? "transparent" : "var(--card-border)",
            borderStyle: "solid",
          }}
          className="w-full p-4 sm:p-5 rounded-xl flex items-center justify-between shadow-sm group cursor-pointer relative bg-[var(--card-bg)] border hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          {/* Card Content */}
          <div className="flex items-center justify-between w-full">
            {/* Left Side: Track Details */}
            <div className="flex flex-col space-y-2.5">
              {/* Header row */}
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
                <SpotifyIcon className={`w-4 h-4 transition-colors duration-500 ease-out ${track.isPlaying ? "text-[#1DB954]" : "text-[var(--muted)] group-hover:text-[#1DB954]"}`} />
                <span className="tracking-widest uppercase text-[11px] font-semibold text-[var(--muted)]">
                  {track.isPlaying ? "CURRENTLY PLAYING" : "LAST PLAYED"}
                </span>
              </div>

              {/* Track Title & Artist */}
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-[var(--foreground)] font-sans tracking-tight leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] font-mono mt-0.5">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* Right Side: Album Art Thumbnail */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border border-[var(--card-border)] group-hover:border-transparent flex-shrink-0 bg-[var(--card-bg)] shadow-md">
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                fill
                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
              />
            </div>
          </div>
        </motion.div>
      </a>
    </motion.section>
  );
}
