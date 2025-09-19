// src/app/components/TechBadges.tsx

import { motion, Variants } from "framer-motion";
import { TechBadgesProps } from "../types";

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const TechBadges = ({ tech }: TechBadgesProps) => {
  const colors = ["primary", "secondary", "success", "danger", "warning", "info", "light"];
  return (
    <>
      {tech.map((t, i) => {
        const color = colors[i % colors.length];
        const className = `badge me-1 mb-1 tech-badge-glass tech-badge-${color}`;
        return (
          <motion.span
            key={t}
            className={className}
            variants={badgeVariants}
            custom={i}
            whileHover={{ scale: 1.15, rotate: 5 }}>
            {t}
          </motion.span>
        );
      })}
    </>
  );
};

export default TechBadges;
