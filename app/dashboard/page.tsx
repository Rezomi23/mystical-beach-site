"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { CelebrationCountdown } from "@/components/dashboard/celebration-countdown";
import { VisionGallery } from "@/components/dashboard/vision-gallery";
import { WellnessRoadmap } from "@/components/dashboard/wellness-roadmap";
import { ConciergeChat } from "@/components/dashboard/concierge-chat";

export default function DashboardPage() {
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border/40 bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Return to Shore
          </Link>

          <a href="/" className="flex flex-col items-center">
            <span className="font-serif text-lg font-light tracking-widest text-foreground">
              MYSTICAL
            </span>
            <span className="font-serif text-[9px] tracking-[0.4em] uppercase text-accent">
              Beach
            </span>
          </a>

          <button
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign Out
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Welcome */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
            Your Private Sanctuary
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.2] tracking-[0.04em] text-foreground md:text-5xl">
            <span className="text-balance">
              Welcome back to your Sanctuary,
              <br />
              <span className="text-primary">{user.name}</span>
            </span>
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-accent/40" />
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-[1.8] tracking-wide text-muted-foreground">
            Everything you need to prepare for your celebration,
            gathered in one serene space.
          </p>
        </motion.div>
      </div>

      {/* Dashboard Grid */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <CelebrationCountdown
              weddingDate={user.weddingDate || "2026-06-15T00:00:00Z"}
            />
            <WellnessRoadmap />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <VisionGallery />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="border border-border/40 bg-card/60 p-8 backdrop-blur-sm lg:p-10"
            >
              <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
                Quick Actions
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Update Guest List", href: "#" },
                  { label: "View Menu Options", href: "#" },
                  { label: "Floral Selections", href: "#" },
                  { label: "Travel Details", href: "#" },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="border border-border/50 bg-background/50 px-4 py-3.5 text-center font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-foreground transition-all duration-300 hover:border-accent/50 hover:bg-accent/5"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Concierge Chat */}
      <ConciergeChat />
    </div>
  );
}
