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
  const [isClosing, setIsClosing] = useState(false);
  const [initialTheme, setInitialTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInitialTheme(theme);
      setIsClosing(false);
    }
  }, [isOpen, theme]);

  const handleThemeSelection = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem("hasVisitedBefore", "false");
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (initialTheme) {
      setTheme(initialTheme);
    }
    handleClose();
    localStorage.setItem("hasVisitedBefore", "false");
  };

  const handleConfirm = () => {
    localStorage.setItem("hasVisitedBefore", "true");
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}>
      <div
        className={`${styles.modal} ${isClosing ? styles.fadeOutRight : ""}`}
        onAnimationEnd={handleAnimationEnd}
        data-testid="welcome-modal">
        <h2 className={styles.title}>Welcome!</h2>
        <p className={styles.subtitle}>Choose a theme to personalize your experience.</p>
        <div className={styles.themeGrid}>
          {themes.options.map((themeKey) => (
            <div
              key={themeKey}
              className={`${styles.themeOption} ${themeKey === theme ? styles.selected : ""}`}
              onClick={() => handleThemeSelection(themeKey)}>
              <div
                className={styles.themePreview}
                style={{ background: themeGradients[themeKey] }}
              />
              <span className={styles.themeName}>
                {themeOptions[themeKey as keyof typeof themeOptions]}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Maybe Later
          </button>
          <button className={styles.confirmButton} onClick={handleConfirm}>
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
