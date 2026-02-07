"use client";

import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(195, 50%, 28%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        className="relative mx-auto max-w-3xl px-6 text-center lg:px-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent md:text-xs"
        >
          From Our Shores
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-4xl font-light leading-[1.15] tracking-[0.04em] text-foreground md:text-5xl"
        >
          <span className="text-balance">
            Receive Whispers from the Shore
          </span>
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-5 h-px w-16 bg-accent/40"
        />
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground md:text-base md:leading-[1.9]"
        >
          Join an intimate circle of kindred spirits. Receive seasonal
          inspiration, private event previews, and quiet reflections from life
          at the water{"'"}s edge.
        </motion.p>

        {isSubscribed ? (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={spring}
          >
            <p className="font-serif text-xl tracking-wide text-primary">
              Welcome to our shores.
            </p>
            <p className="mt-3 font-sans text-sm leading-[1.8] tracking-wide text-muted-foreground">
              {"You'll receive your first letter with the next tide."}
            </p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-border bg-card px-6 py-4 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent sm:border-r-0"
              placeholder="Enter your email"
            />
            <MagneticButton
              type="submit"
              variant="primary"
              delay={0.4}
              magneticStrength={0.2}
              className="flex items-center justify-center gap-2 bg-primary px-8 py-4 font-sans text-xs font-medium tracking-[0.15em] uppercase text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
              <Send size={14} />
            </MagneticButton>
          </motion.form>
        )}

        <motion.p
          variants={fadeUp}
          className="mt-4 font-sans text-[10px] tracking-wide text-muted-foreground/60"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </motion.div>
    </section>
  );
}
