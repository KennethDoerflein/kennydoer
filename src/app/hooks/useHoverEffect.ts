import { useEffect, useState } from "react";

const CAN_HOVER_CLASS = "can-hover";
const NO_HOVER_CLASS = "no-hover";

/**
 * A React hook that detects if the primary input mechanism allows for hover effects.
 * - It adds a 'can-hover' or 'no-hover' class to the body for CSS styling.
 * - It returns a boolean `isHoverEnabled` for conditional logic in components.
 * * @returns {boolean} `true` if a mouse is detected, otherwise `false`.
 */
export const useHoverEffect = (): boolean => {
  // State to hold the hover capability status, assuming no hover by default.
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    // This effect should only run on the client side.
    if (typeof window === "undefined") {
      return;
    }

    // If the class is already set (e.g., from a previous page navigation),
    // sync the state and exit early.
    if (document.body.classList.contains(CAN_HOVER_CLASS)) {
      setIsHoverEnabled(true);
      return;
    }

    // Set the default class assuming no hover capability.
    document.body.classList.add(NO_HOVER_CLASS);

    const handleFirstMouseMove = () => {
      document.body.classList.remove(NO_HOVER_CLASS);
      document.body.classList.add(CAN_HOVER_CLASS);

      // Update the state for React components to use.
      setIsHoverEnabled(true);

      // Clean up the listener after it has run once.
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };

    // Listen for the first mouse movement.
    window.addEventListener("mousemove", handleFirstMouseMove, { once: true });

    // Cleanup function for React's lifecycle.
    return () => {
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };
  }, []); // The empty dependency array ensures this effect runs only once.

  return isHoverEnabled;
};
