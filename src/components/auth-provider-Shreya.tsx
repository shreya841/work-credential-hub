import { createContext, useContext, type ReactNode } from "react";
import type { AuthUser } from "@/lib/types";

interface AuthContextValue {
  user: AuthUser;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ user, children }: { user: AuthUser; children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function useOptionalAuth(): AuthContextValue | null {
  return useContext(AuthContext);
}
