"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  LogOut,
  Calendar,
  Users,
  TrendingUp,
  Inbox,
  Check,
  Clock,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

/* ------------------------------------------------------------------ */
/*  Mock Data -- replace with real API / database queries later         */
/* ------------------------------------------------------------------ */
interface Inquiry {
  id: string;
  name: string;
  email: string;
  eventType: string;
  date: string;
  guests: number;
  status: "new" | "reviewed" | "confirmed" | "declined";
  submitted: string;
}

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-001",
    name: "Sophia Laurent",
    email: "sophia@example.com",
    eventType: "Mindful Union",
    date: "Sep 2026",
    guests: 85,
    status: "new",
    submitted: "2 hours ago",
  },
  {
    id: "INQ-002",
    name: "James & Elena Hartwell",
    email: "hartwell@example.com",
    eventType: "Vow Renewal Ceremony",
    date: "Nov 2026",
    guests: 40,
    status: "new",
    submitted: "5 hours ago",
  },
  {
    id: "INQ-003",
    name: "Aoun Mohamed Moncif",
    email: "aoun@mysticalbeach.com",
    eventType: "Mindful Union",
    date: "Jun 2026",
    guests: 120,
    status: "confirmed",
    submitted: "3 days ago",
  },
  {
    id: "INQ-004",
    name: "Clara Beaumont",
    email: "clara@example.com",
    eventType: "Holistic Banquet",
    date: "Aug 2026",
    guests: 60,
    status: "reviewed",
    submitted: "1 day ago",
  },
  {
    id: "INQ-005",
    name: "Khalid Al-Rashid",
    email: "khalid@example.com",
    eventType: "Private Retreat",
    date: "Jul 2026",
    guests: 12,
    status: "declined",
    submitted: "5 days ago",
  },
];

const STATS = [
  {
    label: "Total Inquiries",
    value: "47",
    change: "+12%",
    icon: Inbox,
  },
  {
    label: "Confirmed Bookings",
    value: "23",
    change: "+8%",
    icon: Calendar,
  },
  {
    label: "Expected Guests",
    value: "1,840",
    change: "+15%",
    icon: Users,
  },
  {
    label: "Revenue Forecast",
    value: "$2.4M",
    change: "+22%",
    icon: TrendingUp,
  },
];

const statusConfig = {
  new: {
    label: "New",
    icon: Clock,
    bg: "bg-accent/10",
    text: "text-accent",
    border: "border-accent/30",
  },
  reviewed: {
    label: "Reviewed",
    icon: Clock,
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
  },
  confirmed: {
    label: "Confirmed",
    icon: Check,
    bg: "bg-emerald-500/10",
    text: "text-emerald-700",
    border: "border-emerald-500/30",
  },
  declined: {
    label: "Declined",
    icon: XCircle,
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function AdminPage() {
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | Inquiry["status"]>("all");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || user.role !== "admin") {
    return null;
  }

  const filtered =
    filter === "all"
      ? MOCK_INQUIRIES
      : MOCK_INQUIRIES.filter((i) => i.status === filter);

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
            Return to Site
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

      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
            Administration
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light tracking-[0.04em] text-foreground md:text-5xl">
            Resort Management
          </h1>
          <div className="mt-4 h-px w-16 bg-accent/40" />
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="border border-border/40 bg-card/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <Icon size={16} className="text-accent" />
                  <span className="font-sans text-[10px] font-medium tracking-wider text-emerald-700">
                    {stat.change}
                  </span>
                </div>
                <p className="mt-4 font-serif text-3xl font-light tracking-wide text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="border border-border/40 bg-card/60 backdrop-blur-sm"
        >
          {/* Table Header */}
          <div className="flex flex-col items-start justify-between gap-4 border-b border-border/40 px-8 py-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
                Inquiries
              </p>
              <p className="mt-1 font-serif text-xl font-light tracking-wide text-foreground">
                Recent Submissions
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {(["all", "new", "reviewed", "confirmed", "declined"] as const).map(
                (f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 font-sans text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                      filter === f
                        ? "border border-accent bg-accent/10 text-accent"
                        : "border border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  {["ID", "Guest", "Event", "Date", "Guests", "Status", "Received"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-8 py-4 text-left font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq, i) => {
                  const sc = statusConfig[inq.status];
                  const StatusIcon = sc.icon;
                  return (
                    <motion.tr
                      key={inq.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="border-b border-border/20 transition-colors last:border-b-0 hover:bg-accent/5"
                    >
                      <td className="px-8 py-4 font-sans text-xs tracking-wider text-muted-foreground">
                        {inq.id}
                      </td>
                      <td className="px-8 py-4">
                        <p className="font-serif text-sm tracking-wide text-foreground">
                          {inq.name}
                        </p>
                        <p className="mt-0.5 font-sans text-[10px] tracking-wider text-muted-foreground">
                          {inq.email}
                        </p>
                      </td>
                      <td className="px-8 py-4 font-sans text-xs tracking-wide text-foreground">
                        {inq.eventType}
                      </td>
                      <td className="px-8 py-4 font-sans text-xs tracking-wide text-muted-foreground">
                        {inq.date}
                      </td>
                      <td className="px-8 py-4 font-serif text-sm text-foreground">
                        {inq.guests}
                      </td>
                      <td className="px-8 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-sans text-[10px] font-medium tracking-[0.1em] uppercase ${sc.bg} ${sc.text} ${sc.border}`}
                        >
                          <StatusIcon size={10} />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-8 py-4 font-sans text-xs tracking-wide text-muted-foreground">
                        {inq.submitted}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="px-8 py-16 text-center">
                <p className="font-serif text-lg text-muted-foreground">
                  No inquiries match this filter.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
