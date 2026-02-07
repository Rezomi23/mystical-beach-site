"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles } from "lucide-react";

const visionImages = [
  {
    src: "/images/vision-1.jpg",
    alt: "Beach wedding reception with crystal chandeliers",
    caption: "Reception Under the Stars",
  },
  {
    src: "/images/vision-2.jpg",
    alt: "Minimalist ceremony arch on the beach",
    caption: "The Ceremony Arch",
  },
  {
    src: "/images/vision-3.jpg",
    alt: "Luxury table setting detail",
    caption: "Table Elegance",
  },
  {
    src: "/images/vision-4.jpg",
    alt: "Cascading floral arrangement",
    caption: "Floral Artistry",
  },
];

export function VisionGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="border border-border/40 bg-card/60 p-8 backdrop-blur-sm lg:p-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
            My Vision Gallery
          </p>
          <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-muted-foreground">
            AI-curated decor inspiration for your celebration
          </p>
        </div>
        <Sparkles size={16} className="text-accent/60" />
      </div>

      {/* Image Grid */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {visionImages.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setSelectedImage(i)}
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 45vw, 250px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all duration-500 group-hover:bg-foreground/30">
              <ZoomIn
                size={20}
                className="text-background opacity-0 transition-all duration-300 group-hover:opacity-100"
              />
            </div>
            <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent px-3 pb-2 pt-6 font-sans text-[10px] tracking-[0.15em] uppercase text-background/90">
              {img.caption}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-foreground/80 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 z-[201] flex items-center justify-center"
            >
              <div className="relative max-h-[80vh] max-w-3xl w-full aspect-[4/3]">
                <Image
                  src={visionImages[selectedImage].src || "/placeholder.svg"}
                  alt={visionImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="80vw"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center bg-background text-foreground shadow-lg transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Close lightbox"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
