"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panel = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 200, damping: 28 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const contentAnim = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function LegalPanel({ isOpen, onClose, title, content }: LegalPanelProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <motion.aside
            className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-lg flex-col border-l border-accent/15 bg-foreground/80 backdrop-blur-xl sm:w-[460px]"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-background/[0.06] px-8 py-6">
              <h2 className="font-serif text-lg font-light tracking-[0.15em] uppercase text-background/90">
                {title}
              </h2>

              {/* Gold X close button */}
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="group flex h-8 w-8 items-center justify-center transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-accent/70 transition-colors group-hover:text-accent"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 overflow-y-auto px-8 py-10"
              variants={contentAnim}
              initial="hidden"
              animate="visible"
            >
              {/* Decorative flourish */}
              <div className="mb-8 flex items-center gap-3">
                <span className="block h-px w-8 bg-accent/30" />
                <span className="block h-1 w-1 rotate-45 bg-accent/40" />
                <span className="block h-px w-8 bg-accent/30" />
              </div>

              <p className="font-serif text-sm font-light leading-[2] tracking-wide text-background/65">
                {content}
              </p>

              {/* Bottom flourish */}
              <div className="mt-10 flex items-center gap-3">
                <span className="block h-px w-8 bg-accent/30" />
                <span className="block h-1 w-1 rotate-45 bg-accent/40" />
                <span className="block h-px w-8 bg-accent/30" />
              </div>

              <p className="mt-6 font-sans text-[10px] tracking-[0.3em] uppercase text-background/25">
                Mystical Beach
              </p>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
