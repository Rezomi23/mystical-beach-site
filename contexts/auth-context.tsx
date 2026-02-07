"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Types – designed to match NextAuth / Clerk session shapes easily   */
/* ------------------------------------------------------------------ */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "guest" | "admin";
  weddingDate?: string; // ISO string
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phone: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Mock users – replace with real API calls / NextAuth / Clerk later  */
/* ------------------------------------------------------------------ */
const MOCK_USERS: Record<string, User> = {
  guest: {
    id: "u_001",
    name: "Aoun Mohamed Moncif",
    email: "aoun@mysticalbeach.com",
    phone: "+212 600 000 000",
    avatar: undefined,
    role: "guest",
    weddingDate: "2026-06-15T00:00:00Z",
  },
  admin: {
    id: "u_admin",
    name: "Resort Administrator",
    email: "admin@mysticalbeach.com",
    role: "admin",
  },
};

/* ------------------------------------------------------------------ */
/*  Provider                                                            */
/* ------------------------------------------------------------------ */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    if (email.toLowerCase().includes("admin")) {
      setUser(MOCK_USERS.admin);
    } else {
      setUser(MOCK_USERS.guest);
    }
    setIsLoading(false);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser(MOCK_USERS.guest);
    setIsLoading(false);
  }, []);

  const signInWithPhone = useCallback(async (_phone: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser(MOCK_USERS.guest);
    setIsLoading(false);
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, _password: string) => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      setUser({
        ...MOCK_USERS.guest,
        name,
        email,
      });
      setIsLoading(false);
    },
    []
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signInWithGoogle,
      signInWithPhone,
      signUp,
      signOut,
    }),
    [user, isLoading, signIn, signInWithGoogle, signInWithPhone, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
