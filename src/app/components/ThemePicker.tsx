"use client";

import { useTheme } from "../context/ThemeContext";

const ThemePicker = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value as "glassy-blue" | "glassy-light" | "forest");
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-3">
      <label htmlFor="theme-picker" className="me-2">
        Theme:
      </label>
      <select
        id="theme-picker"
        value={theme}
        onChange={handleThemeChange}
        className="form-select form-select-sm w-auto theme-picker"
        style={{
          minWidth: 160,
          fontWeight: 500,
          boxShadow: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}>
        <option value="glassy-blue">Glassy Blue</option>
        <option value="glassy-light">Glassy Light</option>
        <option value="forest">Forest</option>
      </select>
    </div>
  );
};

export default ThemePicker;
