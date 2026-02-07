"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  weddingDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CelebrationCountdown({ weddingDate }: CountdownProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(weddingDate));

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft(weddingDate)), 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  // Circle progress (days out of 365)
  const totalDays =
    (new Date(weddingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  const progress = Math.max(0, Math.min(1, 1 - totalDays / 365));
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="flex flex-col items-center border border-border/40 bg-card/60 p-8 backdrop-blur-sm lg:p-10"
    >
      <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
        Celebration Countdown
      </p>

      {/* Circular Timer */}
      <div className="relative mt-8 flex h-52 w-52 items-center justify-center">
        <svg
          className="absolute inset-0 -rotate-90"
          width="208"
          height="208"
          viewBox="0 0 208 208"
        >
          <circle
            cx="104"
            cy="104"
            r="90"
            fill="none"
            stroke="hsl(30, 15%, 85%)"
            strokeWidth="1"
          />
          <circle
            cx="104"
            cy="104"
            r="90"
            fill="none"
            stroke="hsl(38, 60%, 50%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="text-center">
          <span className="font-serif text-5xl font-light tracking-wide text-foreground">
            {time.days}
          </span>
          <p className="mt-1 font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Days Remaining
          </p>
        </div>
      </div>

      {/* Small counters */}
      <div className="mt-8 flex gap-8">
        {[
          { value: time.hours, label: "Hours" },
          { value: time.minutes, label: "Minutes" },
          { value: time.seconds, label: "Seconds" },
        ].map((unit) => (
          <div key={unit.label} className="text-center">
            <span className="font-serif text-2xl font-light tracking-wide text-foreground">
              {String(unit.value).padStart(2, "0")}
            </span>
            <p className="mt-1 font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
              {unit.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 font-serif text-sm italic tracking-wide text-muted-foreground">
        {new Date(weddingDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </motion.div>
  );
}
