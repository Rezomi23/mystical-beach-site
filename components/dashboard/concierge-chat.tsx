"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "concierge";
  text: string;
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "concierge",
    text: "Welcome to Mystical Beach. I am your dedicated concierge. How may I assist you with your celebration?",
    time: "Now",
  },
];

export function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate concierge reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "concierge",
        text: "Thank you for your message. Our team will review this and respond shortly. In the meantime, is there anything else I can assist with?",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center bg-primary text-primary-foreground shadow-xl transition-all duration-500 hover:-translate-y-0.5 hover:shadow-2xl"
            aria-label="Open concierge chat"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-6 bottom-6 z-50 flex h-[480px] w-[360px] flex-col border border-border/40 bg-background/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-accent">
                  Concierge
                </p>
                <p className="mt-0.5 font-serif text-sm tracking-wide text-foreground">
                  Private Assistance
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/40 bg-card text-foreground"
                    }`}
                  >
                    <p className="font-sans text-xs leading-[1.7] tracking-wide">
                      {msg.text}
                    </p>
                    <p
                      className={`mt-1 font-sans text-[9px] tracking-wider ${
                        msg.sender === "user"
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-3 border-t border-border/40 px-6 py-4"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent font-sans text-sm tracking-wide text-foreground outline-none placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-foreground transition-colors hover:bg-accent/80"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
