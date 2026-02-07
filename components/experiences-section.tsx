"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const experiences = [
  {
    title: "Mindful Unions",
    description:
      "A ceremony unlike any other -- where barefoot elegance meets the rhythm of the tide. Our planners choreograph every moment with poetic precision, honoring your love story against a canvas of ocean and sky.",
    image: "/images/experience-ceremony.jpg",
    alt: "Beautiful beach wedding ceremony setup with floral archway on white sand",
  },
  {
    title: "Holistic Banquets",
    description:
      "Dine beneath a cathedral of stars. Our culinary artisans compose multi-course journeys from sustainably sourced ingredients, each dish a meditation on flavor, presented on the shore with curated wines and quiet ceremony.",
    image: "/images/experience-dining.jpg",
    alt: "Elegant beach fine dining setup at sunset with candles and floral centerpieces",
  },
  {
    title: "The Bridal Sanctuary",
    description:
      "A private haven of restoration before the sacred moment. Ancient botanicals, warm stone therapies, and bespoke rituals prepare the body and still the mind, so you arrive at the altar radiant and wholly present.",
    image: "/images/experience-spa.jpg",
    alt: "Luxury tropical spa pavilion surrounded by lush plants and candles",
  },
];

/* ------------------------------------------------------------------ */
/*  Single Experience Card with hover zoom                             */
/* ------------------------------------------------------------------ */
function ExperienceCard({
  exp,
}: {
  exp: (typeof experiences)[number];
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group cursor-pointer"
      whileHover={{ y: -6 }}
      transition={spring}
    >
      {/* Image with slow hover zoom */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={exp.image || "/placeholder.svg"}
            alt={exp.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-foreground/10 transition-all duration-500 group-hover:bg-foreground/0" />
      </div>

      {/* Text */}
      <div className="mt-8">
        <h3 className="font-serif text-2xl font-light tracking-[0.04em] text-primary-foreground">
          {exp.title}
        </h3>
        <p className="mt-4 font-sans text-sm leading-[1.9] tracking-wide text-primary-foreground/55">
          {exp.description}
        </p>
        <div className="mt-5 flex items-center gap-2 text-accent transition-all duration-300 group-hover:gap-3">
          <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase">
            Discover
          </span>
          <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Experiences Section                                                */
/* ------------------------------------------------------------------ */
export function ExperiencesSection() {
  return (
    <section id="experiences" className="bg-primary py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent md:text-xs"
          >
            Signature Experiences
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-4xl font-light leading-[1.15] tracking-[0.04em] text-primary-foreground md:text-5xl lg:text-6xl"
          >
            <span className="text-balance">Rituals Crafted for Eternity</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-5 h-px w-16 bg-accent/40"
          />
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-[1.9] tracking-wide text-primary-foreground/65 md:text-base md:leading-[1.9]"
          >
            Each experience is an act of devotion -- a considered fusion of
            artistry and nature, composed to honor the significance of your most
            cherished moments.
          </motion.p>
        </motion.div>

        {/* Experience Cards with stagger */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experiences.map((exp) => (
            <ExperienceCard key={exp.title} exp={exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
