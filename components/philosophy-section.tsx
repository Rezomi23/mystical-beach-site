"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* Shared spring physics */
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

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: spring },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: spring },
};

export function PhilosophySection() {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <section id="philosophy" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Text Content */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p
              variants={fadeUp}
              className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent md:text-xs"
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-4xl font-light leading-[1.15] tracking-[0.04em] text-foreground md:text-5xl lg:text-6xl"
            >
              <span className="text-balance">
                Where Nature Whispers
                <br className="hidden lg:block" />
                {" "}and the Soul Listens
              </span>
            </motion.h2>
            <motion.div variants={fadeUp} className="mt-4 h-px w-12 bg-accent/40" />
            <motion.div variants={sectionVariants} className="mt-8 space-y-7">
              <motion.p
                variants={fadeUp}
                className="font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground md:text-base md:leading-[1.9]"
              >
                Nestled where the ocean meets the soul, Mystical Beach
                reimagines the wedding experience. We blend timeless elegance
                with mindful serenity to craft celebrations that transcend the
                ordinary.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground md:text-base md:leading-[1.9]"
              >
                Every detail has been considered with reverent intention -- from
                the curated botanicals that frame each ceremony to the private
                shoreline reserved exclusively for our guests. This is not
                simply a venue. It is a passage into something extraordinary.
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={sectionVariants} className="mt-14 flex gap-14">
              {[
                { number: "12+", label: "Years of Distinction" },
                { number: "500+", label: "Sacred Celebrations" },
                { number: "100%", label: "Bespoke by Nature" },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <p className="font-serif text-3xl font-light tracking-wide text-primary md:text-4xl">
                    {stat.number}
                  </p>
                  <p className="mt-2 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image with parallax hover zoom */}
          <motion.div
            className="relative"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden"
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ scale: imgHovered ? 1.06 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/images/philosophy-beach.jpg"
                  alt="Pristine luxury beach at golden hour with calm crystal-clear water and palm tree silhouettes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>
            {/* Decorative accent */}
            <motion.div
              className="absolute -bottom-4 -left-4 h-24 w-24 border border-accent/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.4 }}
            />
            <motion.div
              className="absolute -right-4 -top-4 h-24 w-24 border border-primary/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
