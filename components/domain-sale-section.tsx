"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export function DomainSaleSection() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Subtle textured marble background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(30, 20%, 95%) 0%, hsl(30, 15%, 93%) 25%, hsl(30, 20%, 96%) 50%, hsl(30, 12%, 92%) 75%, hsl(30, 18%, 95%) 100%)",
          }}
        />
        {/* Faint marble veining via radial gradients */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 600px 200px at 20% 30%, hsl(220, 10%, 50%) 0%, transparent 70%),
              radial-gradient(ellipse 400px 150px at 70% 60%, hsl(220, 10%, 55%) 0%, transparent 70%),
              radial-gradient(ellipse 500px 100px at 50% 80%, hsl(220, 8%, 50%) 0%, transparent 70%)
            `,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        {/* Gold frame border */}
        <motion.div
          className="border border-accent/25 px-8 py-16 sm:px-14 md:px-20 md:py-24"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Inner decorative corners */}
          <div className="absolute left-[calc(1.5rem+4px)] top-[calc(6rem+4px)] hidden h-4 w-4 border-l border-t border-accent/40 sm:left-[calc(3.5rem+4px)] sm:block md:left-[calc(5rem+4px)]" />
          <div className="absolute right-[calc(1.5rem+4px)] top-[calc(6rem+4px)] hidden h-4 w-4 border-r border-t border-accent/40 sm:right-[calc(3.5rem+4px)] sm:block md:right-[calc(5rem+4px)]" />
          <div className="absolute bottom-[calc(6rem+4px)] left-[calc(1.5rem+4px)] hidden h-4 w-4 border-b border-l border-accent/40 sm:left-[calc(3.5rem+4px)] sm:block md:left-[calc(5rem+4px)]" />
          <div className="absolute bottom-[calc(6rem+4px)] right-[calc(1.5rem+4px)] hidden h-4 w-4 border-b border-r border-accent/40 sm:right-[calc(3.5rem+4px)] sm:block md:right-[calc(5rem+4px)]" />

          <motion.div
            className="flex flex-col items-center text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Decorative flourish */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="h-px w-8 bg-accent/40" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 text-accent/50"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" />
              </svg>
              <div className="h-px w-8 bg-accent/40" />
            </motion.div>

            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="mt-6 font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent md:text-xs"
            >
              A Rare Opportunity
            </motion.p>

            {/* Main heading */}
            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-3xl font-light leading-[1.15] tracking-[0.06em] text-foreground sm:text-4xl md:text-5xl"
            >
              <span className="text-balance">Own This Exclusive Legacy</span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              className="mx-auto mt-6 h-px w-16 bg-accent/40"
            />

            {/* Sub-heading */}
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground md:text-base md:leading-[1.9]"
            >
              The premium domain{" "}
              <span className="font-medium text-foreground">
                MysticalBeach.com
              </span>{" "}
              is currently available for acquisition. Elevate your brand with a
              name that defines luxury and serenity.
            </motion.p>

            {/* CTA Button with shimmer */}
            <motion.div variants={fadeUp} className="mt-12">
              <MagneticButton
                href="https://www.namecheap.com/domains/registration/results/?domain=Mysticalbeach.com"
                variant="solid"
                delay={0.6}
                magneticStrength={0.2}
                className="shimmer-btn relative block overflow-hidden border border-accent/50 bg-accent/10 px-10 py-4 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-accent backdrop-blur-sm hover:border-accent hover:bg-accent hover:text-foreground sm:px-14 sm:text-xs"
              >
                <span className="relative z-10">Acquire on Namecheap</span>
              </MagneticButton>
            </motion.div>

            {/* Subtle note */}
            <motion.p
              variants={fadeUp}
              className="mt-8 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60"
            >
              Serious inquiries only
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
