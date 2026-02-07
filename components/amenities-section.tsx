"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Waves, Sparkles, Wine, Sun, Leaf, Music } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const amenities = [
  {
    icon: Waves,
    title: "Private Shoreline",
    description:
      "An exclusive stretch of untouched coast, reserved solely for our guests.",
  },
  {
    icon: Sparkles,
    title: "Infinity Horizon Pool",
    description:
      "A vanishing-edge sanctuary where water dissolves into the sea.",
  },
  {
    icon: Wine,
    title: "The Cellar & Terrace",
    description:
      "Rare vintages and artisanal spirits, guided by our resident sommelier.",
  },
  {
    icon: Sun,
    title: "Dawn Meditation",
    description:
      "Guided breathwork and movement on the sand as the sun rises.",
  },
  {
    icon: Leaf,
    title: "Botanical Labyrinth",
    description:
      "Winding paths through curated tropical gardens and reflection pools.",
  },
  {
    icon: Music,
    title: "Cultural Evenings",
    description:
      "Intimate acoustic performances, storytelling, and fireside ceremony.",
  },
];

export function AmenitiesSection() {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <section id="amenities" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image with hover zoom */}
          <motion.div
            className="relative"
            variants={slideLeft}
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
                  src="/images/amenities.jpg"
                  alt="Luxury resort infinity pool overlooking the ocean at twilight"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 h-24 w-24 border border-accent/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: 0.4 }}
            />
          </motion.div>

          {/* Content */}
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
              The Grounds
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-6 font-serif text-4xl font-light leading-[1.15] tracking-[0.04em] text-foreground md:text-5xl"
            >
              <span className="text-balance">Every Detail, Perfected</span>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              className="mt-4 h-px w-12 bg-accent/40"
            />
            <motion.p
              variants={fadeUp}
              className="mt-6 font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground md:text-base md:leading-[1.9]"
            >
              From first light to starfall, every touchpoint has been composed
              with quiet intention -- world-class amenities that honour both
              indulgence and inner stillness.
            </motion.p>

            {/* Amenity Grid with stagger */}
            <motion.div
              className="mt-12 grid grid-cols-2 gap-8"
              variants={sectionVariants}
            >
              {amenities.map((amenity) => (
                <motion.div
                  key={amenity.title}
                  className="group"
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={spring}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={spring}
                    className="inline-block"
                  >
                    <amenity.icon size={24} className="text-accent" />
                  </motion.div>
                  <h3 className="mt-3 font-serif text-lg font-medium tracking-wide text-foreground">
                    {amenity.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs leading-[1.8] tracking-wide text-muted-foreground">
                    {amenity.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
