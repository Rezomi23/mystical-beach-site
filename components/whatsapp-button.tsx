"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/213656920839";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-3"
    >
      {/* Button with floating animation */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          y: {
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        aria-label="Chat with our Concierge on WhatsApp"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-foreground/20 backdrop-blur-xl transition-all duration-500 hover:border-accent/60 hover:bg-foreground/30 hover:shadow-[0_0_24px_-4px_hsl(38,60%,50%,0.25)] sm:h-12 sm:w-12"
      >
        {/* Breathing pulse ring */}
        <span className="absolute inset-0 animate-[audio-breathe_3.5s_ease-in-out_infinite] rounded-full border border-accent/10" />

        {/* WhatsApp fine-line icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] text-background/85 transition-colors duration-300 group-hover:text-accent sm:h-5 sm:w-5"
        >
          {/* Phone body outline */}
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      </motion.a>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none hidden whitespace-nowrap rounded-sm border border-accent/20 bg-foreground/80 px-4 py-2 font-serif text-xs italic tracking-wide text-background/90 backdrop-blur-md sm:block"
          >
            Chat with our Concierge
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
