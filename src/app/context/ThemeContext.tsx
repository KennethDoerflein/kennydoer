"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const themes = {
  defaultTheme: "deep-space",
  options: ["deep-space", "glassy-blue", "glassy-light", "forest"],
};

export const getTheme = () => themes;

type Theme = (typeof themes.options)[number];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme;
      if (storedTheme && themes.options.includes(storedTheme)) {
        return storedTheme;
      }
    }
    return themes.defaultTheme;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // To prevent ssr mismatch, we return null on the server and first client render.
  // After hydration, the component will re-render and show the children.
  if (!mounted) {
    return null;
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
