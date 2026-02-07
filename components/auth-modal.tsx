"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

type Tab = "signin" | "signup";
type Method = "email" | "phone";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle, signInWithPhone, isLoading } =
    useAuth();

  const [tab, setTab] = useState<Tab>("signin");
  const [method, setMethod] = useState<Method>("email");
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (method === "phone") {
      await signInWithPhone(phone);
    } else if (tab === "signin") {
      await signIn(email, password);
    } else {
      await signUp(name, email, password);
    }
    onClose();
  }

  async function handleGoogle() {
    await signInWithGoogle();
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md border border-border/30 bg-background/80 p-10 shadow-2xl backdrop-blur-xl">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="text-center">
                <p className="font-sans text-[10px] font-medium tracking-[0.4em] uppercase text-accent">
                  Mystical Beach
                </p>
                <h2 className="mt-3 font-serif text-3xl font-light tracking-[0.04em] text-foreground">
                  {tab === "signin"
                    ? "Welcome Back"
                    : "Begin Your Journey"}
                </h2>
                <div className="mx-auto mt-3 h-px w-12 bg-accent/40" />
              </div>

              {/* Tabs */}
              <div className="mt-8 flex border-b border-border/50">
                {(["signin", "signup"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 pb-3 font-sans text-[10px] font-medium tracking-[0.25em] uppercase transition-all ${
                      tab === t
                        ? "border-b-2 border-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "signin" ? "Sign In" : "Create Account"}
                  </button>
                ))}
              </div>

              {/* Google Auth */}
              <button
                onClick={handleGoogle}
                disabled={isLoading}
                className="mt-8 flex w-full items-center justify-center gap-3 border border-border/60 bg-card/50 py-3.5 font-sans text-xs tracking-[0.1em] text-foreground transition-all duration-300 hover:border-accent/50 hover:bg-card disabled:opacity-50"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border/50" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  or
                </span>
                <div className="h-px flex-1 bg-border/50" />
              </div>

              {/* Method Switch */}
              <div className="mt-6 flex gap-6 justify-center">
                {(["email", "phone"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-all ${
                      method === m
                        ? "text-accent underline underline-offset-4"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "email" ? "Email" : "Phone"}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {tab === "signup" && method === "email" && (
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-2 w-full border-0 border-b border-border/60 bg-transparent pb-2 font-serif text-lg tracking-wide text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-accent"
                      placeholder="Your name"
                    />
                  </div>
                )}

                {method === "email" ? (
                  <>
                    <div>
                      <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2 w-full border-0 border-b border-border/60 bg-transparent pb-2 font-serif text-lg tracking-wide text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-accent"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="mt-2 w-full border-0 border-b border-border/60 bg-transparent pb-2 pr-10 font-serif text-lg tracking-wide text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-accent"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 bottom-2.5 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mt-2 w-full border-0 border-b border-border/60 bg-transparent pb-2 font-serif text-lg tracking-wide text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-accent"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 w-full bg-primary py-3.5 font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-primary-foreground transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10 disabled:opacity-50"
                >
                  {isLoading
                    ? "Please wait..."
                    : tab === "signin"
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </form>

              {/* Footer */}
              <p className="mt-8 text-center font-sans text-[10px] leading-relaxed tracking-wider text-muted-foreground">
                {tab === "signin"
                  ? "Not yet part of our circle? "
                  : "Already have an account? "}
                <button
                  onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
                  className="text-accent underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  {tab === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
