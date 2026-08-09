"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, ExternalLink, Volume2, VolumeX } from "lucide-react";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  previewUrl: string;
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C13.62 9.9 19.08 10.56 22.8 12.84c.36.18.54.78.161 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.62.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

// Bouncing equalizer bars when audio is playing
function EqualizerBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-3.5 px-1">
      <span
        className={`w-[3px] rounded-full bg-[#1DB954] transition-all duration-300 ${
          isPlaying ? "animate-[bounce_0.6s_ease-in-out_infinite] h-3.5" : "h-1.5 opacity-60"
        }`}
      />
      <span
        className={`w-[3px] rounded-full bg-[#1DB954] transition-all duration-300 ${
          isPlaying ? "animate-[bounce_0.8s_ease-in-out_infinite_0.15s] h-3" : "h-2.5 opacity-60"
        }`}
      />
      <span
        className={`w-[3px] rounded-full bg-[#1DB954] transition-all duration-300 ${
          isPlaying ? "animate-[bounce_0.5s_ease-in-out_infinite_0.3s] h-3.5" : "h-1 opacity-60"
        }`}
      />
      <span
        className={`w-[3px] rounded-full bg-[#1DB954] transition-all duration-300 ${
          isPlaying ? "animate-[bounce_0.7s_ease-in-out_infinite_0.1s] h-2.5" : "h-2 opacity-60"
        }`}
      />
    </div>
  );
}

export default function SpotifyCard() {
  const [track, setTrack] = useState<SpotifyTrack>({
    isPlaying: false,
    title: "Hall of Fame",
    artist: "The Script ft. will.i.am",
    album: "#3",
    albumImageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0244287246ea331e6f7b0ef8a9",
    songUrl: "https://open.spotify.com/track/0FB5ILDICqwK6xj7W1RP9u?si=129f5a6e22c94e8c",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7e/13/22/7e1322c7-980d-160f-8c68-dc9b9863a559/mzaf_1440735671923738990.plus.aac.p.m4a",
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch track data from API
  useEffect(() => {
    async function fetchSpotify() {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = await res.json();
          setTrack((prev) => ({
            ...prev,
            ...data,
            previewUrl: data.previewUrl || prev.previewUrl,
          }));
        }
      } catch (err) {
        console.error("Failed to load Spotify track:", err);
      }
    }

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  // Handle Play/Pause
  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch((err) => console.error("Audio playback error:", err));
    }
  };

  // Handle Mute toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle Seek / Timebar scrubbing
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-10 select-none font-sans"
    >
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={track.previewUrl}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            if (audioRef.current.duration) {
              setDuration(audioRef.current.duration);
            }
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsAudioPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div className="w-full rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
        {/* Header Row */}
        <div className="flex items-center justify-between px-4 sm:px-5 pt-3.5 pb-2 border-b border-[var(--card-border)]/50 bg-black/5 dark:bg-black/20 text-xs font-mono text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <SpotifyIcon className={`w-4 h-4 text-[#1DB954] ${isAudioPlaying ? "animate-pulse" : ""}`} />
            <span className="tracking-widest uppercase text-[11px] font-semibold text-[var(--muted)]">
              {isAudioPlaying ? "NOW PLAYING" : "SPOTIFY TRACK"}
            </span>
            <EqualizerBars isPlaying={isAudioPlaying || track.isPlaying} />
          </div>

          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[var(--muted)] hover:text-[#1DB954] transition-colors text-xs font-mono"
            title="Open in Spotify"
          >
            <span>Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5 flex flex-col space-y-4">
          {/* Track Info & Play Button */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Album Cover Thumbnail */}
              <div
                onClick={togglePlayPause}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-[var(--card-border)] flex-shrink-0 bg-[var(--card-bg)] shadow-md group/album cursor-pointer"
              >
                <Image
                  src={track.albumImageUrl}
                  alt={track.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover/album:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
                    isAudioPlaying ? "opacity-100" : "opacity-0 group-hover/album:opacity-100"
                  }`}
                >
                  {isAudioPlaying ? (
                    <Pause className="w-6 h-6 text-white fill-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  )}
                </div>
              </div>

              {/* Title & Artist */}
              <div className="min-w-0">
                <h3 className="font-semibold text-base sm:text-lg text-[var(--foreground)] tracking-tight leading-snug truncate">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] font-mono truncate mt-0.5">
                  {track.artist}
                </p>
                <p className="text-[11px] text-[var(--muted)]/70 font-mono truncate mt-0.5 hidden sm:block">
                  Album: {track.album}
                </p>
              </div>
            </div>

            {/* Play/Pause Button & Mute Control */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={togglePlayPause}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
                  isAudioPlaying
                    ? "bg-[#1DB954] text-black shadow-[#1DB954]/30"
                    : "bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-[#1DB954]/20"
                }`}
                title={isAudioPlaying ? "Pause Track" : "Play Track"}
              >
                {isAudioPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </motion.button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-full text-[var(--muted)] hover:text-neutral-900 dark:hover:text-white transition-colors"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Scrubbable Timebar */}
          <div className="w-full flex flex-col space-y-1.5 pt-1">
            <div className="relative w-full flex items-center group/scrub cursor-pointer">
              {/* Custom Track Background */}
              <div className="absolute inset-0 h-1.5 rounded-lg bg-[var(--card-border)] overflow-hidden">
                <div
                  className="h-full bg-[#1DB954] transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Range Input for Scrubbing */}
              <input
                type="range"
                min="0"
                max={duration || 30}
                step="0.01"
                value={currentTime}
                onChange={handleSeek}
                className="relative z-10 w-full h-1.5 opacity-0 cursor-pointer"
              />

              {/* Scrub Handle Thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#1DB954] border-2 border-white shadow-md pointer-events-none transition-transform group-hover/scrub:scale-125"
                style={{ left: `calc(${progressPercent}% - 7px)` }}
              />
            </div>

            {/* Time counters */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted)] pt-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
