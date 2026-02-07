"use client";

import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { LegalPanel } from "@/components/legal-panel";

const legalContent: Record<string, { title: string; content: string }> = {
  Privacy: {
    title: "Privacy",
    content:
      "At Mystical Beach, we value your discretion. Any information shared via our inquiry form is used solely for acquisition discussions and concierge services. We do not share your data with third parties. Your digital footprint on this site is protected under standard encryption protocols.",
  },
  Terms: {
    title: "Terms",
    content:
      "By accessing MysticalBeach.com, you acknowledge that this platform serves as a showcase for a premium digital asset. Inquiries are handled directly by the owner in Oran, Algeria. Any acquisition agreements are subject to international domain transfer regulations.",
  },
  Accessibility: {
    title: "Accessibility",
    content:
      "We are committed to ensuring a seamless digital experience for all. Mystical Beach strives to meet WCAG 2.1 accessibility standards, ensuring our ethereal sanctuary is navigable and inclusive for every visitor.",
  },
};

/* ------------------------------------------------------------------ */
/*  Fine-line social SVG icons (stroke-only, luxury aesthetic)         */
/* ------------------------------------------------------------------ */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Single social icon with Framer Motion spring hover                 */
/* ------------------------------------------------------------------ */
const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/ouassim_ao?igsh=MWVzZDdrc3A2eGw0Ng==", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ouassim-aoun-14075a395?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", Icon: LinkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/share/18Jof71cP3/", Icon: FacebookIcon },
];

function SocialIcon({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-background/20 transition-colors duration-300 hover:border-accent/50"
    >
      {/* Glow aura */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.3 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background:
            "radial-gradient(circle, hsl(38, 60%, 50%, 0.2) 0%, transparent 70%)",
        }}
      />
      {/* Icon */}
      <motion.div
        animate={{
          color: isHovered
            ? "hsl(38, 60%, 55%)"
            : "hsl(38, 30%, 75%)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Icon className="relative z-10 h-6 w-6" />
      </motion.div>
    </motion.a>
  );
}

const footerLinks = {
  Explore: [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Experiences", href: "#experiences" },
    { label: "Amenities", href: "#amenities" },
    { label: "Reservations", href: "#reservations" },
  ],
  Services: [
    { label: "Mindful Unions", href: "#" },
    { label: "Holistic Banquets", href: "#" },
    { label: "The Bridal Sanctuary", href: "#" },
    { label: "Private Retreats", href: "#" },
  ],
};

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const footerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export function Footer() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  return (
    <footer className="bg-foreground py-20 text-background">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-10"
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div className="lg:col-span-2" variants={fadeUp}>
            <div className="flex flex-col items-start">
              <span className="font-serif text-3xl font-light tracking-widest text-background">
                MYSTICAL
              </span>
              <span className="font-serif text-xs tracking-[0.4em] uppercase text-accent">
                Beach
              </span>
            </div>
            <p className="mt-6 max-w-sm font-sans text-sm leading-[1.9] tracking-wide text-background/55">
              An ethereal sanctuary where the rhythm of the tide guides every
              detail. Devoted to love, stillness, and the quiet art of
              celebration.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-background/50">
                <MapPin size={14} className="shrink-0" />
                <span className="font-sans text-xs tracking-wider">
                  {"Oran, Alg\u00e9rie"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-background/50">
                <Phone size={14} className="shrink-0" />
                <span className="font-sans text-xs tracking-wide">
                  +213 656 920 839
                </span>
              </div>
              <div className="flex items-center gap-3 text-background/50">
                <Mail size={14} className="shrink-0" />
                <span className="font-sans text-xs tracking-wide">
                  hello@mysticalbeach.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={fadeUp}>
              <h4 className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-background/40">
                {title}
              </h4>
              <ul className="mt-6 space-y-4">
                {links.map((link) => (
                  <motion.li key={link.label} variants={fadeUp}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          const el = document.getElementById(link.href.slice(1));
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }
                      }}
                      className="font-sans text-sm text-background/60 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Divider */}
        <motion.div className="mt-16 border-t border-background/10 pt-10" variants={fadeUp}>
          <motion.div className="flex flex-col items-center gap-4" variants={fadeUp}>
            <motion.p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-background/25" variants={fadeUp}>
              Follow Our Journey
            </motion.p>
            <motion.div className="flex items-center gap-8" variants={fadeUp}>
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  Icon={link.Icon}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div className="mt-10 border-t border-background/[0.06] pt-8" variants={fadeUp}>
          <motion.div className="flex flex-col items-center justify-between gap-4 md:flex-row" variants={fadeUp}>
            <motion.p className="font-sans text-[10px] tracking-wide text-background/30" variants={fadeUp}>
              {`\u00A9 ${new Date().getFullYear()} Mystical Beach. All rights reserved.`}
            </motion.p>
            <motion.div className="flex gap-6" variants={fadeUp}>
              {["Privacy", "Terms", "Accessibility"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setActivePanel(item)}
                  className="font-sans text-[10px] tracking-wide text-background/30 transition-colors hover:text-background/60"
                  variants={fadeUp}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Legal slide-over panels */}
      {activePanel && legalContent[activePanel] && (
        <LegalPanel
          isOpen={!!activePanel}
          onClose={() => setActivePanel(null)}
          title={legalContent[activePanel].title}
          content={legalContent[activePanel].content}
        />
      )}
    </footer>
  );
}
