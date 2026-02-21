"use client";

import { createContext, useContext } from "react";
import { Theme } from "../data/themes";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// The actual context is defined here, and provided in ThemedLayout
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemedLayout");
  }
  return context;
};
