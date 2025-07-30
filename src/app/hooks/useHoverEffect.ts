import { useEffect, useState } from "react";

const CAN_HOVER_CLASS = "can-hover";
const NO_HOVER_CLASS = "no-hover";

/**
 * A React hook that detects if the primary input mechanism allows for hover effects.
 * It listens for the first `mousemove` or `touchstart` event to determine capability.
 * @returns {boolean} `true` if a mouse is detected as the primary input, otherwise `false`.
 */
export const useHoverEffect = (): boolean => {
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    // This effect should only run on the client side.
    if (typeof window === "undefined") {
      return;
    }

    // Check if detection has already run to avoid re-running on component re-renders
    // or navigation within a single-page app.
    if (
      document.body.classList.contains(CAN_HOVER_CLASS) ||
      document.body.classList.contains(NO_HOVER_CLASS)
    ) {
      setIsHoverEnabled(document.body.classList.contains(CAN_HOVER_CLASS));
      return;
    }

    let hasFired = false;
    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };

    // If a mouse is used, we can assume hover is enabled.
    const handleMouseMove = () => {
      if (hasFired) return;
      hasFired = true;
      setIsHoverEnabled(true);
      document.body.classList.add(CAN_HOVER_CLASS);
      cleanup();
    };

    // If a touch event happens first, we can assume hover is not the primary input.
    const handleTouchStart = () => {
      if (hasFired) return;
      hasFired = true;
      setIsHoverEnabled(false);
      document.body.classList.add(NO_HOVER_CLASS);
      cleanup();
    };

    // Add passive listeners for performance. The `once` option ensures they are
    // automatically removed after firing, preventing memory leaks.
    window.addEventListener("mousemove", handleMouseMove, { once: true, passive: true });
    window.addEventListener("touchstart", handleTouchStart, { once: true, passive: true });

    // Return a cleanup function in case the component unmounts before an event fires.
    return cleanup;
  }, []);

  return isHoverEnabled;
};
