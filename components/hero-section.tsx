"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import {
  YouTubeBackground,
  type YTPlayerInstance,
} from "@/components/youtube-background";
import { AudioToggle } from "@/components/audio-toggle";

/* ------------------------------------------------------------------ */
/*  Spring-physics transition used globally                            */
/* ------------------------------------------------------------------ */
const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

/* ------------------------------------------------------------------ */
/*  Letter-by-letter heading component                                 */
/* ------------------------------------------------------------------ */
function AnimatedHeading({ lines }: { lines: string[] }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.025, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: spring,
    },
  };

  return (
    <motion.h1
      className="mt-8 font-serif text-4xl font-light leading-[1.2] tracking-[0.08em] text-background md:text-6xl md:leading-[1.15] lg:text-7xl lg:leading-[1.1]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <span className="text-balance">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line.split("").map((char, charIndex) => (
              <motion.span
                key={`${lineIndex}-${charIndex}`}
                variants={letterVariants}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : undefined }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </motion.h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      {/* Video / Fallback Image Background with Parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offsetY * 0.15}px)` }}
      >
        <YouTubeBackground
          videoId="RAaF7ES83UA"
          fallbackImage="/images/hero-golden-hour.jpg"
          fallbackAlt="Luxury tropical resort infinity pool at golden hour sunset"
          externalPlayerRef={ytPlayerRef}
        />

        {/* Cinematic overlays — vignette + warm tone + gradient */}
        <div className="absolute inset-0 bg-foreground/40" />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: "hsl(25, 40%, 20%, 0.2)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/60" />
        {/* Radial vignette for cinematic depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, hsl(220, 20%, 8%, 0.45) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Ornate calligraphic brand title */}
        <motion.h2
          className="text-glow-gold text-gold-gradient font-display text-7xl leading-[1.1] md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
            delay: 0.15,
          }}
        >
          Mystical Beach
        </motion.h2>

        {/* Decorative flourish divider */}
        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
        >
          <span className="block h-px w-10 bg-accent/40 md:w-16" />
          <span className="block h-1 w-1 rotate-45 bg-accent/50" />
          <span className="block h-px w-10 bg-accent/40 md:w-16" />
        </motion.div>

        {/* Subtitle heading */}
        <div className="mt-6">
          <AnimatedHeading
            lines={["An Ethereal Sanctuary", "for Eternal Promises"]}
          />
        </div>

        <motion.p
          className="mt-10 max-w-lg font-sans text-sm font-light leading-[1.8] tracking-wide text-background/70 md:text-base md:leading-[1.9]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.6 }}
        >
          Where ancient shores meet timeless devotion. A private beachfront
          retreat for weddings, wellness, and celebrations of the most
          discerning kind.
        </motion.p>

        <div className="mt-14 flex flex-col items-center gap-5 sm:flex-row">
          <MagneticButton
            href="#reservations"
            variant="solid"
            pulse
            delay={1.9}
            className="block bg-accent px-11 py-4 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-foreground hover:bg-accent/90"
          >
            Begin Your Journey
          </MagneticButton>
          <MagneticButton
            href="#philosophy"
            variant="ghost"
            delay={2.1}
            className="block border border-background/30 bg-background/5 px-11 py-4 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-background backdrop-blur-sm hover:bg-background/15"
          >
            Explore the Vision
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => {
          const el = document.getElementById("philosophy");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 0.8 },
          y: { delay: 2.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-label="Scroll to content"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-background/60">
          Scroll
        </span>
        <ChevronDown size={16} className="text-background/60" />
      </motion.button>

      {/* Audio Toggle */}
      <AudioToggle playerRef={ytPlayerRef} />
    </section>
  );
}
