"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Users, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { sendInquiry } from "@/app/actions/send-inquiry";
import type { InquiryFormState } from "@/app/actions/send-inquiry";

/* ------------------------------------------------------------------ */
/*  Animation presets                                                   */
/* ------------------------------------------------------------------ */
const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const slideLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0, transition: spring },
};

const slideRight = {
  hidden: { opacity: 0, x: 35 },
  visible: { opacity: 1, x: 0, transition: spring },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const eventTypes = [
  "Mindful Union",
  "Private Retreat",
  "Holistic Banquet",
  "Vow Renewal Ceremony",
  "Anniversary Celebration",
  "Bespoke Experience",
];

const features = [
  {
    icon: CalendarDays,
    title: "Unhurried Planning",
    text: "Year-round availability with exclusive golden-hour time slots and seasonal highlights.",
  },
  {
    icon: Users,
    title: "Intimate to Grand",
    text: "From private elopements for two to lavish celebrations of two hundred -- every scale, equal devotion.",
  },
  {
    icon: Sparkles,
    title: "Dedicated Concierge",
    text: "A personal liaison from first conversation to final farewell, attending to every detail.",
  },
];

/* ------------------------------------------------------------------ */
/*  Floating-label input                                               */
/* ------------------------------------------------------------------ */
function FloatingInput({
  id,
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left font-sans transition-all duration-300 ease-out ${
          active
            ? "top-0 -translate-y-full scale-[0.7] text-[10px] tracking-[0.2em] uppercase text-accent"
            : "top-1/2 -translate-y-1/2 text-sm tracking-wide text-muted-foreground/60"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border-b bg-transparent pb-3 pt-4 font-sans text-sm tracking-wide text-foreground outline-none transition-all duration-500 placeholder:text-transparent ${
          error ? "border-red-400/70" : "border-foreground/10 focus:border-accent/70"
        }`}
        style={{
          boxShadow: focused
            ? "0 2px 8px -2px hsl(38, 60%, 50%, 0.15)"
            : "none",
        }}
      />
      {error && (
        <p className="mt-1.5 font-sans text-[10px] tracking-wide text-red-400">{error}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating-label select                                              */
/* ------------------------------------------------------------------ */
function FloatingSelect({
  id,
  label,
  name,
  required = false,
  value,
  onChange,
  options,
  error,
}: {
  id: string;
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left font-sans transition-all duration-300 ease-out ${
          active
            ? "top-0 -translate-y-full scale-[0.7] text-[10px] tracking-[0.2em] uppercase text-accent"
            : "top-1/2 -translate-y-1/2 text-sm tracking-wide text-muted-foreground/60"
        }`}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full appearance-none border-b bg-transparent pb-3 pt-4 font-sans text-sm tracking-wide text-foreground outline-none transition-all duration-500 ${
          error ? "border-red-400/70" : "border-foreground/10 focus:border-accent/70"
        }`}
        style={{
          boxShadow: focused
            ? "0 2px 8px -2px hsl(38, 60%, 50%, 0.15)"
            : "none",
        }}
      >
        <option value="" />
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
      {error && (
        <p className="mt-1.5 font-sans text-[10px] tracking-wide text-red-400">{error}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating-label textarea                                            */
/* ------------------------------------------------------------------ */
function FloatingTextarea({
  id,
  label,
  name,
  value,
  onChange,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left font-sans transition-all duration-300 ease-out ${
          active
            ? "top-0 -translate-y-full scale-[0.7] text-[10px] tracking-[0.2em] uppercase text-accent"
            : "top-4 text-sm tracking-wide text-muted-foreground/60"
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full resize-none border-b border-foreground/10 bg-transparent pb-3 pt-4 font-sans text-sm tracking-wide text-foreground outline-none transition-all duration-500 focus:border-accent/70"
        style={{
          boxShadow: focused
            ? "0 2px 8px -2px hsl(38, 60%, 50%, 0.15)"
            : "none",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mouse-tracking shimmer button                                      */
/* ------------------------------------------------------------------ */
function ShimmerSubmitButton({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    function handleMove(e: MouseEvent) {
      const rect = btn!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    }

    btn.addEventListener("mousemove", handleMove);
    return () => btn.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      disabled={isPending}
      className="relative mt-10 w-full overflow-hidden bg-[#2a2a2a] px-8 py-5 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-background transition-colors duration-500 hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-70"
      whileHover={isPending ? {} : { scale: 1.02, y: -2 }}
      whileTap={isPending ? {} : { scale: 0.98 }}
      transition={spring}
    >
      {/* Mouse-tracking shimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, hsl(38, 60%, 50%, 0.2), transparent 60%)`,
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {isPending ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Sending Your Vision...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export function ReservationsSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });
  const [result, setResult] = useState<InquiryFormState | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function updateField(field: string, value: string) {
    setFormState((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error on change
    if (result?.fieldErrors?.[field]) {
      setResult((prev) => {
        if (!prev) return prev;
        const newFieldErrors = { ...prev.fieldErrors };
        delete newFieldErrors[field];
        return { ...prev, fieldErrors: newFieldErrors };
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData(formRef.current!);

    startTransition(async () => {
      const res = await sendInquiry(fd);
      setResult(res);

      if (res.success) {
        setFormState({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          date: "",
          message: "",
        });
      }
    });
  }

  const fieldError = (field: string) => result?.fieldErrors?.[field]?.[0];

  return (
    <section
      id="reservations"
      className="relative overflow-hidden py-28 md:py-40"
    >
      {/* Soft-focus background */}
      <div className="absolute inset-0">
        <Image
          src="/images/reservations-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* -- Left Column: Info -- */}
          <motion.div
            className="flex flex-col justify-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              variants={fadeUp}
              className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent md:text-xs"
            >
              Private Consultations
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-4xl font-light leading-[1.1] tracking-[0.06em] text-foreground md:text-5xl lg:text-6xl"
            >
              <span className="text-balance">Begin Your Journey</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="mt-5 h-px w-14 bg-accent/40"
            />

            <motion.p
              variants={fadeUp}
              className="mt-7 font-sans text-sm leading-[1.95] tracking-wide text-muted-foreground md:text-base md:leading-[2]"
            >
              Every celebration at Mystical Beach is as singular as the love it
              honours. Share your vision with our concierge, and we will compose
              a bespoke experience worthy of the occasion.
            </motion.p>

            <motion.div
              variants={sectionVariants}
              className="mt-14 space-y-10"
            >
              {features.map((item) => (
                <motion.div
                  key={item.title}
                  className="flex gap-5"
                  variants={slideLeft}
                  whileHover={{ x: 5 }}
                  transition={spring}
                >
                  <motion.div
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/25 text-accent/80"
                    whileHover={{
                      scale: 1.1,
                      borderColor: "hsl(38, 60%, 50%)",
                    }}
                    transition={spring}
                  >
                    <item.icon size={17} strokeWidth={1.3} />
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-lg font-medium tracking-wide text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-sm leading-[1.85] tracking-wide text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* -- Right Column: Form / Success -- */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {result?.success ? (
                <motion.div
                  key="confirmation"
                  className="flex h-full min-h-[500px] flex-col items-center justify-center border border-accent/15 bg-card/70 p-12 text-center backdrop-blur-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={spring}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                  >
                    <Sparkles
                      size={30}
                      strokeWidth={1.2}
                      className="text-accent"
                    />
                  </motion.div>

                  <motion.h3
                    className="mt-8 font-serif text-2xl font-light tracking-[0.04em] text-foreground md:text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, ...spring }}
                  >
                    Thank You
                  </motion.h3>

                  <motion.div
                    className="mx-auto mt-4 h-px w-12 bg-accent/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0.5 }}
                  />

                  <motion.p
                    className="mt-6 max-w-sm font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, ...spring }}
                  >
                    Your vision has been received. Our concierge will reach out
                    to you shortly to begin composing your celebration.
                  </motion.p>

                  <motion.button
                    className="mt-10 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-accent transition-colors hover:text-foreground"
                    onClick={() => setResult(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Submit Another Inquiry
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="border border-foreground/[0.06] bg-card/60 p-8 backdrop-blur-xl md:p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    boxShadow:
                      "0 8px 60px -12px hsl(30, 20%, 30%, 0.08), inset 0 1px 0 hsl(38, 60%, 50%, 0.06)",
                  }}
                >
                  {/* Form heading */}
                  <p className="mb-10 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-muted-foreground/60">
                    Inquiry Form
                  </p>

                  {/* Global error */}
                  <AnimatePresence>
                    {result?.error && !result.success && (
                      <motion.div
                        className="mb-8 flex items-start gap-3 border border-red-400/20 bg-red-400/5 px-5 py-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-400" />
                        <p className="font-sans text-xs leading-relaxed tracking-wide text-red-400">
                          {result.error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <FloatingInput
                        id="name"
                        name="name"
                        label="Full Name"
                        required
                        value={formState.name}
                        onChange={(v) => updateField("name", v)}
                        error={fieldError("name")}
                      />
                    </div>

                    {/* Email */}
                    <FloatingInput
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(v) => updateField("email", v)}
                      error={fieldError("email")}
                    />

                    {/* Phone */}
                    <FloatingInput
                      id="phone"
                      name="phone"
                      label="Phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(v) => updateField("phone", v)}
                    />

                    {/* Event Type */}
                    <FloatingSelect
                      id="eventType"
                      name="eventType"
                      label="Event Type"
                      required
                      value={formState.eventType}
                      onChange={(v) => updateField("eventType", v)}
                      options={eventTypes}
                      error={fieldError("eventType")}
                    />

                    {/* Preferred Date */}
                    <FloatingInput
                      id="date"
                      name="date"
                      label="Preferred Date"
                      type="date"
                      value={formState.date}
                      onChange={(v) => updateField("date", v)}
                    />

                    {/* Message */}
                    <div className="md:col-span-2">
                      <FloatingTextarea
                        id="message"
                        name="message"
                        label="Share Your Vision"
                        value={formState.message}
                        onChange={(v) => updateField("message", v)}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <ShimmerSubmitButton isPending={isPending}>
                    Request a Private Consultation
                  </ShimmerSubmitButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
