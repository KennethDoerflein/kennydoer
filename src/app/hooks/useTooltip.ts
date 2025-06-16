import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export const useTooltip = (delay = 850) => {
  // Detect mobile/touch device
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));

  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to hold the dynamic transform style
  const [transform, setTransform] = useState("translate(-50%, 24px)");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hide tooltip on scroll
    const handleScroll = () => setIsVisible(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

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

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Update the raw position
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Use a fixed max width of 700px for tooltip positioning logic, centered in the viewport
    const maxWidth = 700;
    const viewportWidth = window.innerWidth;
    const contentLeft = viewportWidth > maxWidth ? (viewportWidth - maxWidth) / 2 : 0;
    const relativeX = e.clientX - contentLeft;
    const effectiveWidth = Math.min(viewportWidth, maxWidth);
    const percent = relativeX / effectiveWidth;

    let translateX = -50; // default center
    if (percent < 0.2) {
      // Interpolate from -50% to +2% as cursor moves from 50% to 0%
      translateX = -50 + (52 * (0.2 - percent)) / 0.2;
    } else if (percent > 0.8) {
      // Interpolate from -50% to -105% as cursor moves from 80% to 100%
      translateX = -50 - (55 * (percent - 0.8)) / 0.2;
    }
    setTransform(`translate(${translateX}%, 24px)`);
  }, []);

  // If on mobile, always hide tooltip and return no-op handlers
  if (isTouchDevice) {
    return {
      isVisible: false,
      triggerProps: {
        onMouseEnter: () => {},
        onMouseLeave: () => {},
        onMouseMove: () => {},
      },
      tooltipStyle: {},
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
  };

  return { isVisible, triggerProps, tooltipStyle };
};
