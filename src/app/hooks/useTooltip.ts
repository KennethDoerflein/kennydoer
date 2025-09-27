import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export type TooltipLocation = "top" | "bottom" | "left" | "right";

export const useTooltip = (
  isHoverEnabled: boolean, // Accept hover status as a required argument
  delay = 850,
  options?: {
    disableInterpolation?: boolean;
    disableMovement?: boolean;
    location?: TooltipLocation;
  }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState("translate(-50%, 24px)");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If hover isn't enabled, there's nothing to do.
    if (!isHoverEnabled) {
      return;
    }

    const handleScroll = () => {
      // When the user scrolls, hide the tooltip...
      setIsVisible(false);
      // ...and clear any pending timer that was about to show it.
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };

    // Add the listener. Using the capture phase ensures it runs early.
    window.addEventListener("scroll", handleScroll, { capture: true });

    // Cleanup function to remove the listener.
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [isHoverEnabled]); // Reruns if hover capability changes.

  const handleMouseEnter = useCallback(
    (e?: MouseEvent<HTMLElement>) => {
      if (e) {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    },
    [delay]
  );

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null; // Prevent potential leaks or stale logic
    }
    setIsVisible(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const getTransform = (translateX: number = -50, translateY: number = 24) => {
        switch (options?.location) {
          case "top":
            return `translate(${translateX}%, -${translateY}px)`;
          case "left":
            return `translate(-${translateY}px, -5%)`;
          case "right":
            return `translate(${translateY}px, -5%)`;
          case "bottom":
          default:
            return `translate(${translateX}%, ${translateY}px)`;
        }
      };
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      if (options?.disableMovement) {
        setTransform(getTransform());
        return;
      }
      const elementWidth = rect.width;
      const relativeX = e.clientX - rect.left;
      const percent = relativeX / elementWidth;
      let translateX = -50; // default center
      if (options?.disableInterpolation) {
        if (percent < 0.2) {
          translateX = 0;
        } else if (percent > 0.8) {
          translateX = -100;
        } else {
          translateX = -50;
        }
      } else {
        if (percent < 0.2) {
          translateX = -50 + (52 * (0.2 - percent)) / 0.2;
        } else if (percent > 0.8) {
          translateX = -50 - (52 * (percent - 0.8)) / 0.2;
        }
      }
      setTransform(getTransform(translateX));
    },
    [options?.disableInterpolation, options?.disableMovement, options?.location]
  );

  // Hide tooltip and clear timeout
  const hideTooltip = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  // Reset tooltip logic (clears timeout, does not show tooltip)
  const resetTooltip = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  // If on mobile, always hide tooltip and return an empty triggerProps object
  if (!isHoverEnabled) {
    return {
      isVisible: false,
      triggerProps: {}, // Return empty object to avoid overwriting handlers
      tooltipStyle: { display: "none" }, // Explicitly hide
      hideTooltip,
      resetTooltip,
    };
  }

  // Props to be spread onto the element that triggers the tooltip
  const triggerProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
  };

  // Style object to be applied to the tooltip element itself
  const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    transform: transform, // Use the dynamic transform
    zIndex: 1000,
    pointerEvents: "none",
    // Add nowrap to prevent the text from wrapping
    whiteSpace: "nowrap",
    overflow: "visible",
    fontSize: "0.8rem",
    fontWeight: "bold",
    transition: "opacity 0.2s ease, transform 0.1s ease",
    willChange: "transform",
    userSelect: "none", // Prevent text selection
    backgroundColor: "#1bb1d6",
    color: "rgb(41, 7, 63)",
    padding: "2px 6px",
    borderRadius: "10px",
  };

  return { isVisible, triggerProps, tooltipStyle, hideTooltip, resetTooltip };
};
