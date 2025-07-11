// Animation variants for project cards (Framer Motion)
// Framer Motion expects 'ease' to be an array or function, not a string
// easeOut: [0.4, 0, 0.2, 1], easeIn: [0.4, 0, 1, 1]
import { easeIn, easeOut } from "framer-motion";

export const getProjectCardVariants = (totalItems: number, index: number) => ({
  initial: { opacity: 0, x: 100, y: 20 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      ease: easeOut,
      duration: 0.5,
      delay: index * 0.07,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    y: -20,
    transition: {
      ease: easeIn,
      duration: 0.3,
      delay: (totalItems - 1 - index) * 0.04,
    },
  },
});
