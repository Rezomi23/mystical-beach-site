"use client";

import React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";

/* ------------------------------------------------------------------ */
/*  Menu data with preview images                                      */
/* ------------------------------------------------------------------ */
const primaryLinks = [
  {
    label: "Philosophy",
    href: "#philosophy",
    image: "/images/philosophy.jpg",
    alt: "Serene ocean sunrise with meditation cabana",
  },
  {
    label: "Experiences",
    href: "#experiences",
    image: "/images/experience-ceremony.jpg",
    alt: "Beachfront wedding ceremony at golden hour",
  },
  {
    label: "Amenities",
    href: "#amenities",
    image: "/images/experience-spa.jpg",
    alt: "Luxury open-air spa pavilion",
  },
  {
    label: "Reservations",
    href: "#reservations",
    image: "/images/vision-1.jpg",
    alt: "Elegant reception with crystal chandeliers",
  },
  {
    label: "Gallery",
    href: "#gallery",
    image: "/images/gallery/wedding-ceremony.jpg",
    alt: "Ethereal beach wedding ceremony at golden hour",
  },
];

const DEFAULT_IMAGE = "/images/menu-default.jpg";
const DEFAULT_ALT = "Crystal clear ocean meeting white sand";

const contactInfo = [
  { label: "Phone", value: "+213 656 920 839" },
  { label: "Email", value: "hello@mysticalbeach.com" },
  { label: "Location", value: "Oran, Alg\u00e9rie" },
];

/* ------------------------------------------------------------------ */
/*  Delicate fine-line social SVGs (14px)                              */
/* ------------------------------------------------------------------ */
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/ouassim_ao?igsh=MWVzZDdrc3A2eGw0Ng==", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ouassim-aoun-14075a395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", Icon: LinkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/share/18Jof71cP3/", Icon: FacebookIcon },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const overlayVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const staggerContainer = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const slideFromLeft = {
  closed: { opacity: 0, x: -30 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -15,
    transition: { duration: 0.2 },
  },
};

const fadeIn = {
  closed: { opacity: 0, y: 10 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* About section enters late with its own stagger */
const aboutStagger = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.65 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const aboutItem = {
  closed: { opacity: 0, y: 14 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const imageReveal = {
  closed: { opacity: 0, scale: 1.1 },
  open: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ------------------------------------------------------------------ */
/*  Close button (compact, 7px lines)                                  */
/* ------------------------------------------------------------------ */
function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex h-7 w-7 items-center justify-center"
      aria-label="Close menu"
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="absolute h-px w-3.5 rotate-45 bg-foreground/40 transition-colors duration-300 group-hover:bg-accent" />
      <span className="absolute h-px w-3.5 -rotate-45 bg-foreground/40 transition-colors duration-300 group-hover:bg-accent" />
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Primary nav link -- downsized serif, thinner weight                */
/* ------------------------------------------------------------------ */
function PrimaryNavItem({
  label,
  href,
  onNavClick,
  onHoverStart,
  onHoverEnd,
}: {
  label: string;
  href: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.li variants={slideFromLeft}>
      <a
        href={href}
        onClick={(e) => onNavClick(e, href)}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className="group relative inline-block overflow-hidden py-2"
      >
        <span className="font-serif text-2xl font-extralight tracking-[0.08em] uppercase text-foreground/70 transition-all duration-500 group-hover:tracking-[0.14em] group-hover:text-foreground sm:text-3xl md:text-4xl">
          {label}
        </span>
        {/* Gold underline reveal */}
        <span className="absolute bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent/50 transition-transform duration-500 ease-out group-hover:scale-x-100" />
      </a>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/*  Dynamic Image Preview with slow zoom "breathing" effect            */
/* ------------------------------------------------------------------ */
function MenuImagePreview({
  imageSrc,
  imageAlt,
}: {
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <motion.div
      className="relative h-full w-full overflow-hidden rounded-sm"
      variants={imageReveal}
    >
      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(36, 33%, 97%, 0.5) 100%)",
        }}
      />

      {/* Film grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Animated image with slow breathing zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imageSrc}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{
            opacity: 1,
            scale: [1.0, 1.04, 1.0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            scale: {
              duration: 12,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            },
          }}
        >
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 0vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle warm tint */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-foreground/[0.04] mix-blend-multiply" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Full Screen Menu                                                   */
/* ------------------------------------------------------------------ */
interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export function FullScreenMenu({
  isOpen,
  onClose,
  onOpenAuth,
}: FullScreenMenuProps) {
  const { user, isAuthenticated } = useAuth();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Determine which image to show
  const activeLink = primaryLinks.find((l) => l.label === hoveredLink);
  const currentImage = activeLink?.image ?? DEFAULT_IMAGE;
  const currentAlt = activeLink?.alt ?? DEFAULT_ALT;

  // Close menu first, then smooth scroll to section after exit animation
  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  }

  // "Contact Me" button handler -- scrolls to reservations/inquire
  function handleContactClick() {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("reservations");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  }

  // Lock body scroll
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

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="exit"
        >
          {/* Light cream glassmorphism backdrop */}
          <div
            className="fixed inset-0 backdrop-blur-xl"
            style={{ backgroundColor: "hsl(36, 33%, 97%, 0.93)" }}
          />

          {/* Palm leaf watermark (mobile) */}
          <div
            className="pointer-events-none fixed inset-0 bg-center bg-no-repeat opacity-[0.03] lg:opacity-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none'%3E%3Cpath d='M100 10 C60 40 20 90 30 180 C40 160 50 120 100 90 C150 120 160 160 170 180 C180 90 140 40 100 10Z' stroke='%23B8860B' strokeWidth='0.5' fill='none'/%3E%3Cpath d='M100 30 C100 30 70 70 60 140' stroke='%23B8860B' strokeWidth='0.3' fill='none'/%3E%3Cpath d='M100 30 C100 30 130 70 140 140' stroke='%23B8860B' strokeWidth='0.3' fill='none'/%3E%3Cpath d='M100 10 L100 180' stroke='%23B8860B' strokeWidth='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "60%",
            }}
          />

          {/* Header bar: brand + close */}
          <motion.div
            className="relative z-10 flex flex-shrink-0 items-center justify-between px-8 py-6 lg:px-14 lg:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                setTimeout(
                  () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  500,
                );
              }}
              className="flex flex-col items-start"
            >
              <span className="font-serif text-lg font-light tracking-[0.25em] text-foreground sm:text-xl">
                MYSTICAL
              </span>
              <span className="font-serif text-[8px] tracking-[0.4em] uppercase text-accent sm:text-[9px]">
                Beach
              </span>
            </a>
            <CloseButton onClick={onClose} />
          </motion.div>

          {/* Main content: Nav left + Image right */}
          <div className="relative z-10 flex flex-1 flex-col px-8 pb-8 lg:flex-row lg:items-stretch lg:gap-14 lg:px-14 lg:pb-12">
            {/* LEFT column */}
            <div className="flex flex-1 flex-col justify-between">
              {/* Primary links */}
              <motion.div
                className="flex flex-1 flex-col justify-center"
                variants={staggerContainer}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <nav>
                  <motion.ul
                    className="flex flex-col gap-1"
                    variants={staggerContainer}
                  >
                    {primaryLinks.map((link) => (
                      <PrimaryNavItem
                        key={link.href}
                        label={link.label}
                        href={link.href}
                        onNavClick={handleNavClick}
                        onHoverStart={() => setHoveredLink(link.label)}
                        onHoverEnd={() => setHoveredLink(null)}
                      />
                    ))}

                    {/* Dashboard link */}
                    {isAuthenticated && user && (
                      <motion.li variants={slideFromLeft}>
                        <Link
                          href={
                            user.role === "admin" ? "/admin" : "/dashboard"
                          }
                          onClick={() => onClose()}
                          className="group relative inline-block overflow-hidden py-2"
                        >
                          <span className="font-serif text-2xl font-extralight tracking-[0.08em] uppercase text-foreground/70 transition-all duration-500 group-hover:tracking-[0.14em] group-hover:text-foreground sm:text-3xl md:text-4xl">
                            Dashboard
                          </span>
                          <span className="absolute bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent/50 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        </Link>
                      </motion.li>
                    )}
                  </motion.ul>
                </nav>

                {/* Sign In + Contact Me row */}
                <motion.div
                  className="mt-8 flex items-center gap-8"
                  variants={fadeIn}
                >
                  {isAuthenticated && user ? (
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground/60">
                      Welcome, {user.name.split(" ")[0]}
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        setTimeout(onOpenAuth, 400);
                      }}
                      className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-muted-foreground/60 transition-colors duration-300 hover:text-accent"
                    >
                      Sign In
                    </button>
                  )}

                  {/* Divider */}
                  <div className="h-3 w-px bg-border/40" />

                  {/* Contact Me CTA */}
                  <button
                    onClick={handleContactClick}
                    className="group flex items-center gap-2"
                  >
                    <span className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-accent/80 transition-colors duration-300 group-hover:text-accent">
                      Contact Me
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.2}
                      className="h-2.5 w-2.5 text-accent/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>

              {/* About the Asset -- domain sale pitch */}
              <motion.div
                className="mt-10 max-w-md border-t border-border/30 pt-8 lg:mt-8"
                variants={aboutStagger}
                initial="closed"
                animate="open"
                exit="exit"
              >
                <motion.p
                  className="font-sans text-[8px] font-medium tracking-[0.4em] uppercase text-accent/60"
                  variants={aboutItem}
                >
                  About the Asset
                </motion.p>
                <motion.p
                  className="mt-3 font-sans text-[11px] leading-[2] tracking-wide text-muted-foreground/60"
                  variants={aboutItem}
                >
                  MysticalBeach.com is a premier digital asset, perfectly
                  positioned for luxury resorts, wellness sanctuaries, or
                  high-end wedding destinations. This evocative name captures
                  the essence of serenity and exclusive coastal living, offering
                  immediate brand authority in the global hospitality market.
                </motion.p>
                <motion.div className="mt-4" variants={aboutItem}>
                  <a
                    href="https://www.namecheap.com/domains/registration/results/?domain=Mysticalbeach.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-accent/70 underline decoration-accent/30 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent/60"
                  >
                    Acquire on Namecheap
                  </a>
                </motion.div>
              </motion.div>

              {/* Contact details + socials row */}
              <motion.div
                className="mt-8 flex flex-wrap items-end justify-between gap-6 lg:mt-6"
                variants={staggerContainer}
                initial="closed"
                animate="open"
                exit="exit"
              >
                {/* Contact details */}
                <div className="flex flex-wrap gap-8">
                  {contactInfo.map((item) => (
                    <motion.div key={item.label} variants={fadeIn}>
                      <p className="font-sans text-[8px] font-medium tracking-[0.3em] uppercase text-muted-foreground/40">
                        {item.label}
                      </p>
                      <p className="mt-1 font-sans text-[11px] tracking-wide text-foreground/55">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Social icons */}
                <motion.div
                  className="flex items-center gap-4"
                  variants={fadeIn}
                >
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      onMouseEnter={() => setHoveredSocial(link.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                        hoveredSocial === link.label
                          ? "border-accent/50 text-accent shadow-[0_0_12px_hsl(38,60%,50%,0.15)]"
                          : "border-foreground/15 text-foreground/50"
                      }`}
                    >
                      <link.Icon />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT: Dynamic image preview (desktop only) */}
            <motion.div
              className="hidden lg:flex lg:w-[42%] lg:flex-shrink-0"
              variants={imageReveal}
              initial="closed"
              animate="open"
              exit="exit"
            >
              <MenuImagePreview imageSrc={currentImage} imageAlt={currentAlt} />
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="relative z-10 mx-8 mb-6 h-px flex-shrink-0 bg-border/30 lg:mx-14"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ originX: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
