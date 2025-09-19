"use client";

import { useEffect, useState, ReactNode, useCallback } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Theme = "deep-space" | "glassy-blue" | "glassy-light" | "forest";

export const themeGradients: Record<Theme, string> = {
  "deep-space": "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #2a1a3e 100%)",
  "glassy-blue": "linear-gradient(to right top, #0f2027, #203a43, #2c5364)",
  "glassy-light": "linear-gradient(to right top, #e0eafc, #cfdef3)",
  forest: "linear-gradient(to right top, #28372c, #3a5a40, #2c4031)",
};

export const themes = {
  defaultTheme: "deep-space" as Theme,
  options: ["deep-space", "glassy-blue", "glassy-light", "forest"] as Theme[],
};

export const getTheme = () => themes;

// This component handles the layout and animation
export const ThemedLayout = ({ children }: { children: ReactNode }) => {
  const [theme, rawSetTheme] = useState<Theme>(themes.defaultTheme);
  const [mounted, setMounted] = useState(false);

  // State for background layers
  const [activeLayer, setActiveLayer] = useState(1);
  const [bgLayer1, setBgLayer1] = useState({});
  const [bgLayer2, setBgLayer2] = useState({});

  useEffect(() => {
    setMounted(true);
    const storedTheme = (localStorage.getItem("theme") as Theme) || themes.defaultTheme;
    rawSetTheme(storedTheme);
    setBgLayer1({ backgroundImage: themeGradients[storedTheme] });
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (newTheme !== theme) {
        if (activeLayer === 1) {
          setBgLayer2({ backgroundImage: themeGradients[newTheme] });
          setActiveLayer(2);
        } else {
          setBgLayer1({ backgroundImage: themeGradients[newTheme] });
          setActiveLayer(1);
        }
        rawSetTheme(newTheme);
      }
    },
    [theme, activeLayer]
  );

  return (
    <>
      <div
        id="background-layer-1"
        className="background-layer"
        style={{ ...bgLayer1, opacity: activeLayer === 1 ? 1 : 0 }}
      />
      <div
        id="background-layer-2"
        className="background-layer"
        style={{ ...bgLayer2, opacity: activeLayer === 2 ? 1 : 0 }}
      />
      <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
    </>
  );
};
