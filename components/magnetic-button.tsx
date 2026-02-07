"use client";

import React from "react";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void;
  variant?: "solid" | "ghost" | "primary";
  pulse?: boolean;
  delay?: number;
  magneticStrength?: number;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
};

export function MagneticButton({
  children,
  className = "",
  href,
  type,
  onClick,
  variant = "solid",
  pulse = false,
  delay = 0,
  magneticStrength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const magSpringConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, magSpringConfig);
  const springY = useSpring(y, magSpringConfig);

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    x.set(deltaX);
    y.set(deltaY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  // Variant-specific glow / border effects
  const glowClasses =
    variant === "ghost" && isHovered
      ? "border-accent/80 shadow-[0_0_20px_-4px_hsl(38,60%,50%,0.25)]"
      : "";

  const pulseClasses = pulse ? "animate-gentle-pulse" : "";

  const combinedClasses =
    `transition-colors duration-500 ${glowClasses} ${pulseClasses} ${className}`.trim();

  const hoverShadow =
    variant === "ghost"
      ? "0 12px 40px -8px hsl(38, 60%, 50%, 0.2)"
      : "0 12px 40px -8px hsl(38, 60%, 50%, 0.15)";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className="inline-block"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          y: -4,
          boxShadow: hoverShadow,
        }}
        whileTap={{ scale: 0.95 }}
        transition={springTransition}
      >
        {href ? (
          <a
            href={href}
            className={combinedClasses}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={(e) => {
              if (href.startsWith("#")) {
                e.preventDefault();
                const el = document.getElementById(href.slice(1));
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }
            }}
          >
            {children}
          </a>
        ) : (
          <button
            type={type || "button"}
            onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
            className={combinedClasses}
          >
            {children}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
