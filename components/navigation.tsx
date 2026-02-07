"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { AuthModal } from "@/components/auth-modal";
import { FullScreenMenu } from "@/components/fullscreen-menu";

/* ------------------------------------------------------------------ */
/*  Minimal hamburger icon (two thin asymmetric lines)                 */
/* ------------------------------------------------------------------ */
function HamburgerIcon({ isScrolled }: { isScrolled: boolean }) {
  const lineColor = isScrolled ? "bg-foreground" : "bg-background";
  return (
    <div className="flex flex-col gap-[5px]">
      <span
        className={`block h-px w-5 ${lineColor} transition-colors duration-500`}
      />
      <span
        className={`block h-px w-3.5 ${lineColor} transition-colors duration-500`}
      />
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 py-3 shadow-sm backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        {/* Three-column grid: MENU | LOGO | CTA */}
        <nav className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 lg:px-10">
          {/* Left: MENU trigger */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`group flex items-center gap-3 transition-colors duration-300 hover:text-accent ${
                isScrolled ? "text-foreground" : "text-background"
              }`}
              aria-label="Open menu"
            >
              <HamburgerIcon isScrolled={isScrolled} />
              <span className="hidden font-sans text-[10px] font-medium tracking-[0.25em] uppercase sm:inline">
                Menu
              </span>
            </button>
          </div>

          {/* Center: Brand logo */}
          <div className="flex items-center justify-center">
            <a href="/" className="flex flex-col items-center">
              <span
                className={`font-serif text-xl font-light tracking-[0.25em] transition-colors duration-500 sm:text-2xl ${
                  isScrolled ? "text-foreground" : "text-background"
                }`}
              >
                MYSTICAL
              </span>
              <span className="font-serif text-[9px] tracking-[0.4em] uppercase text-accent sm:text-[10px]">
                Beach
              </span>
            </a>
          </div>

          {/* Right: Domain CTA */}
          <div className="flex items-center justify-end">
            <MagneticButton
              href="https://www.namecheap.com/domains/registration/results/?domain=Mysticalbeach.com"
              variant="ghost"
              delay={0.5}
              magneticStrength={0.25}
              className="block border border-accent/60 bg-accent/5 px-4 py-2 text-center font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-accent backdrop-blur-sm hover:border-accent hover:bg-accent hover:text-foreground sm:px-6 sm:py-2.5 sm:text-[10px]"
            >
              Buy This Domain
            </MagneticButton>
          </div>
        </nav>
      </header>

      {/* Full-Screen Overlay Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
