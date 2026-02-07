"use client";

import { motion } from "framer-motion";
import { Flower2, UtensilsCrossed, Dumbbell, Check } from "lucide-react";

const milestones = [
  {
    icon: Flower2,
    title: "Spa Appointments",
    date: "March 15, 2026",
    description:
      "Couples aromatherapy session followed by a private oceanfront massage ritual.",
    status: "completed" as const,
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Tasting",
    date: "April 8, 2026",
    description:
      "Five-course tasting with our executive chef, paired with curated wines from the cellar.",
    status: "upcoming" as const,
  },
  {
    icon: Dumbbell,
    title: "Yoga Schedule",
    date: "Ongoing through June 2026",
    description:
      "Weekly dawn meditation and movement sessions on the private shore, led by our resident yogi.",
    status: "upcoming" as const,
  },
];

export function WellnessRoadmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="border border-border/40 bg-card/60 p-8 backdrop-blur-sm lg:p-10"
    >
      <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
        Wellness Roadmap
      </p>
      <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-muted-foreground">
        Your journey to the altar, body and mind
      </p>

      {/* Timeline */}
      <div className="mt-8 space-y-0">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const isLast = i === milestones.length - 1;

          return (
            <div key={m.title} className="flex gap-5">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    m.status === "completed"
                      ? "border-accent bg-accent/15"
                      : "border-border bg-card"
                  }`}
                >
                  {m.status === "completed" ? (
                    <Check size={14} className="text-accent" />
                  ) : (
                    <Icon size={14} className="text-muted-foreground" />
                  )}
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-border/60" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {m.date}
                </p>
                <h4 className="mt-1 font-serif text-lg font-medium tracking-wide text-foreground">
                  {m.title}
                </h4>
                <p className="mt-2 font-sans text-xs leading-[1.8] tracking-wide text-muted-foreground">
                  {m.description}
                </p>
                {m.status === "completed" && (
                  <span className="mt-2 inline-block font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-accent">
                    Completed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
