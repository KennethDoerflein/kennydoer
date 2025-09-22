"use client";

import { useTheme } from "../context/ThemeContext";
import { getTheme } from "./ThemedLayout";
import { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown";

const themeOptions = {
  "deep-space": "Deep Space",
  "glassy-blue": "Ocean Blue",
  "glassy-light": "Purple Mist",
  forest: "Forest Green",
};

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const themes = getTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newValue: string) => {
    setTheme(newValue as keyof typeof themeOptions);
  };

  const dropdownOptions = themes.options.map((themeKey) => ({
    value: themeKey,
    label: themeOptions[themeKey as keyof typeof themeOptions],
  }));

  // Prevent the dropdown from rendering on the server and initial client render
  // to avoid showing the default theme before the correct one is loaded.
  if (!mounted) {
    // Render a placeholder to prevent layout shift
    return (
      <div
        className="d-flex justify-content-center align-items-center my-3"
        style={{ minHeight: "40px" }}>
        <div style={{ width: "125px" }} />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <label htmlFor="theme-picker" className="me-2 fw-bold">
        Theme:
      </label>
      <CustomDropdown
        id="theme-picker"
        options={dropdownOptions}
        value={theme}
        onChange={handleThemeChange}
        width="125px"
      />
    </div>
  );
};

export default ThemePicker;
