// src/app/components/WelcomeModal.tsx
"use client";

import { useEffect, useState } from "react";
import { themes, themeGradients } from "./ThemedLayout";
import { useTheme } from "../context/ThemeContext";
import styles from "./WelcomeModal.module.css";
import { themeOptions } from "../data/themes";

type Theme = (typeof themes.options)[number];

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const { theme, setTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [originalTheme, setOriginalTheme] = useState<Theme | null>(null);

  // When the modal opens, store the original theme.
  useEffect(() => {
    if (isOpen && !originalTheme) {
      setOriginalTheme(theme);
    }
    // Reset preview when modal is closed/opened
    if (!isOpen) {
      setOriginalTheme(null);
      setPreviewTheme(null);
    }
  }, [isOpen, theme, originalTheme]);

  const handlePreview = (selectedTheme: Theme) => {
    setPreviewTheme(selectedTheme);
    setTheme(selectedTheme); // Apply theme for live preview
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} data-testid="welcome-modal">
        <h2 className={styles.title}>Welcome!</h2>
        <p className={styles.subtitle}>Choose a theme to personalize your experience.</p>
        <div className={styles.themeGrid}>
          {themes.options.map((themeKey) => (
            <div
              key={themeKey}
              className={`${styles.themeOption} ${themeKey === theme ? styles.selected : ""}`}
              onClick={() => handlePreview(themeKey)}>
              <div
                className={styles.themePreview}
                style={{ background: themeGradients[themeKey] }}
              />
              <span className={styles.themeOption}>
                {themeOptions[themeKey as keyof typeof themeOptions]}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelButton}
            onClick={() => {
              if (originalTheme) {
                setTheme(originalTheme); // Revert to original theme
              }
              localStorage.setItem("hasVisitedBefore", "true");
              onClose();
            }}>
            Maybe Later
          </button>
          <button
            className={styles.confirmButton}
            onClick={() => {
              localStorage.setItem("hasVisitedBefore", "true");
              onClose();
            }}
            disabled={!previewTheme}>
            Confirm
          </button>
        </div>
        <div className={`${styles.footer} mt-3`}>
          <p>
            * The theme can be changed at any time in the future from the theme picker in the page
            footer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
