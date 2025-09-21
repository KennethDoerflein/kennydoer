// src/app/components/TechBadges.tsx

import { motion } from "framer-motion";
import { TechBadgesProps } from "../types";

// import { motion, Variants } from "framer-motion";
// const badgeVariants: Variants = {
//   hidden: { opacity: 0, y: 20, rotateX: -90 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     rotateX: 0,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 10,
//     },
//   },
// };

const TechBadges = ({ tech }: TechBadgesProps) => {
  const colors = ["primary", "secondary", "success", "danger", "warning", "info"];
  return (
    <>
      {tech.map((t, i) => {
        const color = colors[i % colors.length];
        const className = `badge me-1 mb-1 tech-badge-glass tech-badge-${color}`;
        return (
          <motion.span
            key={t}
            className={className}
            // variants={badgeVariants}
            custom={i}
            whileHover={{ scale: 1.25, rotate: i % 2 === 0 ? 5 : -5 }}>
            {t}
          </motion.span>
        );
      })}
    </>
  );
};

export default TechBadges;
