import { createContext, useContext, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme: "light", toggle: () => {} }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
