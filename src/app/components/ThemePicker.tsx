"use client";

import { useTheme } from "../context/ThemeContext";
import { getTheme } from "./ThemedLayout";
import { useEffect, useState } from "react";

const themeOptions = {
  "deep-space": "Deep Space",
  "glassy-blue": "Ocean Blue",
  "glassy-light": "Purple Mist",
  "forest": "Forest Green",
};

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const themes = getTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as keyof typeof themeOptions);
  };

  // Prevent the dropdown from rendering on the server and initial client render
  // to avoid showing the default theme before the correct one is loaded.
  if (!mounted) {
    // Render a placeholder to prevent layout shift
    return (
      <div
        className="d-flex justify-content-center align-items-center my-3"
        style={{ minHeight: "40px" }}>
        <div style={{ width: "230px" }} />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <label htmlFor="theme-picker" className="me-2">
        Theme:
      </label>
      <select
        id="theme-picker"
        value={theme}
        onChange={handleThemeChange}
        className="themed-dropdown w-auto"
        style={{
          minWidth: 160,
          fontWeight: 500,
          boxShadow: "none",
          cursor: "pointer",
        }}>
        {themes.options.map((themeKey) => (
          <option key={themeKey} value={themeKey}>
            {themeOptions[themeKey as keyof typeof themeOptions]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemePicker;
