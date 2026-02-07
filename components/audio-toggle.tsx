"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { YouTubePlayerRef } from "@/components/youtube-background";

interface AudioToggleProps {
  playerRef: YouTubePlayerRef;
}

export function AudioToggle({ playerRef }: AudioToggleProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  function toggle() {
    const player = playerRef.current;
    if (!player) return;

    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none hidden whitespace-nowrap rounded-sm border border-accent/20 bg-foreground/80 px-4 py-2 font-serif text-xs italic tracking-wide text-background/90 backdrop-blur-md sm:block"
          >
            Experience the Sound of Serenity
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-foreground/20 backdrop-blur-xl transition-all duration-500 hover:border-accent/60 hover:bg-foreground/30 hover:shadow-[0_0_24px_-4px_hsl(38,60%,50%,0.2)]"
      >
        {/* Breathing pulse ring */}
        <span className="absolute inset-0 animate-[audio-breathe_3s_ease-in-out_infinite] rounded-full border border-accent/10" />

        {/* Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] text-background/90 transition-colors duration-300 group-hover:text-accent"
        >
          {/* Speaker body -- always visible */}
          <path d="M11 5L6 9H2v6h4l5 4V5z" />

          {isMuted ? (
            /* Muted: diagonal slash */
            <path d="M23 9l-6 6M17 9l6 6" className="text-background/70" />
          ) : (
            /* Unmuted: sound waves */
            <>
              <path
                d="M15.54 8.46a5 5 0 0 1 0 7.07"
                className="text-background/80"
              />
              <path
                d="M19.07 4.93a10 10 0 0 1 0 14.14"
                className="text-background/60"
              />
            </>
          )}
        </svg>
      </motion.button>
    </motion.div>
  );
}
