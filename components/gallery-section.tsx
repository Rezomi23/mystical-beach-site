"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Gallery data -- 50% weddings, 50% culinary                         */
/* ------------------------------------------------------------------ */
const galleryItems = [
  {
    src: "/images/gallery/wedding-ceremony.jpg",
    alt: "Ethereal beach wedding ceremony at golden hour",
    caption: "Oceanfront Vows",
    category: "wedding" as const,
    aspect: "tall" as const,
  },
  {
    src: "/images/gallery/culinary-plated.jpg",
    alt: "Exquisite fine dining plated dish",
    caption: "Culinary Artistry",
    category: "culinary" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/wedding-decor.jpg",
    alt: "Luxury wedding table centerpiece with orchids",
    caption: "Floral Poetry",
    category: "wedding" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/culinary-table.jpg",
    alt: "Elegant beachside dining table at sunset",
    caption: "Seaside Dining",
    category: "culinary" as const,
    aspect: "tall" as const,
  },
  {
    src: "/images/gallery/wedding-rings.jpg",
    alt: "Wedding rings on a tropical leaf",
    caption: "Eternal Promises",
    category: "wedding" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/culinary-dessert.jpg",
    alt: "Artisanal chocolate dessert with gold leaf",
    caption: "Sweet Reverie",
    category: "culinary" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/wedding-aisle.jpg",
    alt: "Beach wedding aisle lined with petals and lanterns",
    caption: "The Procession",
    category: "wedding" as const,
    aspect: "tall" as const,
  },
  {
    src: "/images/gallery/culinary-fruits.jpg",
    alt: "Exotic tropical fruit arrangement",
    caption: "Nature's Palette",
    category: "culinary" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/wedding-bouquet.jpg",
    alt: "Bridal bouquet of peonies and garden roses",
    caption: "The Bouquet",
    category: "wedding" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/culinary-wine.jpg",
    alt: "Crystal wine glasses with rose at sunset",
    caption: "A Toast at Dusk",
    category: "culinary" as const,
    aspect: "tall" as const,
  },
  {
    src: "/images/gallery/wedding-reception.jpg",
    alt: "Luxury beach wedding reception at twilight",
    caption: "Reception Details",
    category: "wedding" as const,
    aspect: "square" as const,
  },
  {
    src: "/images/gallery/culinary-chef.jpg",
    alt: "Chef plating an elegant dish with precision",
    caption: "The Craft",
    category: "culinary" as const,
    aspect: "square" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                             */
/* ------------------------------------------------------------------ */
const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: spring },
};

const headingVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring },
};

/* ------------------------------------------------------------------ */
/*  Single gallery image tile                                          */
/* ------------------------------------------------------------------ */
function GalleryTile({
  item,
  onOpen,
}: {
  item: (typeof galleryItems)[0];
  onOpen: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative cursor-pointer overflow-hidden ${
        item.aspect === "tall" ? "row-span-2" : ""
      }`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      aria-label={`View: ${item.caption}`}
    >
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={item.src || "/placeholder.svg"}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/40" />

      {/* Caption slide-up */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full px-4 pb-5 pt-8 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <div className="bg-gradient-to-t from-foreground/60 via-foreground/30 to-transparent absolute inset-0" />
        <p className="relative font-serif text-sm italic tracking-wide text-background/90 md:text-base">
          {item.caption}
        </p>
        <p className="relative mt-1 font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-accent/80">
          {item.category === "wedding" ? "Celebrations" : "Gastronomy"}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox overlay                                                   */
/* ------------------------------------------------------------------ */
function Lightbox({
  item,
  onClose,
}: {
  item: (typeof galleryItems)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
    >
      <motion.div
        className="relative mx-4 max-h-[85vh] max-w-4xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src || "/placeholder.svg"}
          alt={item.alt}
          width={1200}
          height={800}
          className="h-auto max-h-[80vh] w-full object-contain"
        />

        {/* Caption bar */}
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent px-6 pb-5 pt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-serif text-lg italic tracking-wide text-background/90">
            {item.caption}
          </p>
          <p className="mt-1 font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-accent/70">
            {item.category === "wedding"
              ? "Ethereal Celebrations"
              : "Culinary Experiences"}
          </p>
        </motion.div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-background/20 bg-background/5 text-background/70 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:text-accent"
        aria-label="Close lightbox"
      >
        <X size={18} strokeWidth={1.2} />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main gallery section                                               */
/* ------------------------------------------------------------------ */
export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-background py-28 md:py-36">
      {/* Heading */}
      <motion.div
        className="mx-auto mb-16 max-w-3xl px-6 text-center md:mb-20"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent md:text-xs"
        >
          A Visual Odyssey
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-6 font-serif text-4xl font-light leading-[1.15] tracking-[0.04em] text-foreground md:text-5xl lg:text-6xl"
        >
          <span className="text-balance">Captured Moments</span>
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mx-auto mt-5 h-px w-16 bg-accent/40"
        />
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl font-sans text-sm leading-[1.9] tracking-wide text-muted-foreground md:text-base md:leading-[1.9]"
        >
          Explore the textures and tastes of your future celebration -- an
          intimate glimpse into ceremonies composed with devotion and cuisine
          crafted with soul.
        </motion.p>
      </motion.div>

      {/* Masonry Grid */}
      <motion.div
        className="mx-auto grid max-w-7xl auto-rows-[180px] grid-cols-2 gap-2 px-4 sm:auto-rows-[220px] md:grid-cols-3 md:gap-3 lg:auto-rows-[260px] lg:grid-cols-4 lg:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {galleryItems.map((item, i) => (
          <GalleryTile
            key={item.src}
            item={item}
            onOpen={() => setLightboxIndex(i)}
          />
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            item={galleryItems[lightboxIndex]}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
