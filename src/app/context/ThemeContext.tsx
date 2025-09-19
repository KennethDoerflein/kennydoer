"use client";

import { createContext, useContext } from "react";
import { themes } from "../components/ThemedLayout";

// This type is now based on the exported themes object
type Theme = (typeof themes.options)[number];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// The actual context is defined here, and provided in ThemedLayout
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // The error message correctly points developers to the new layout component
    throw new Error("useTheme must be used within a ThemedLayout");
  }
  return context;
};
