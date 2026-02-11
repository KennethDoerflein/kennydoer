// src/app/components/TechBadges.tsx

import { motion } from "framer-motion";
import { TechBadgesProps } from "../types";
import styles from "./TechBadges.module.css";

// Moved outside the component to prevent re-creation on every render.
const COLORS = ["primary", "secondary", "success", "danger", "warning", "info"];

import { useHoverEffect } from "../hooks/useHoverEffect";

/**
 * A component that displays a list of technologies as animated badges.
 */
const TechBadges = ({ tech }: TechBadgesProps) => {
  const isHoverEnabled = useHoverEffect();

  return (
    <>
      {tech.map((t, i) => {
        // 1. Determine the color and capitalize it once.
        const colorName = COLORS[i % COLORS.length];
        const capitalizedColor = colorName.charAt(0).toUpperCase() + colorName.slice(1);

        // 2. Build the className string in a more readable way.
        const badgeClasses = [
          "badge",
          "me-1",
          "mb-1",
          styles.techBadgeGlass,
          styles[`techBadge${capitalizedColor}`],
        ].join(" ");

        return (
          <motion.span
            key={t}
            className={badgeClasses}
            custom={i}
            whileHover={isHoverEnabled ? { scale: 1.25, rotate: i % 2 === 0 ? 5 : -5 } : {}}>
            {t}
          </motion.span>
        );
      })}
    </>
  );
};

export default TechBadges;
