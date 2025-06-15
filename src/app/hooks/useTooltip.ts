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

    // Check against the viewport width to dynamically set the transform
    const viewportWidth = window.innerWidth;

    // If cursor is in the right 30% of the viewport, anchor tooltip to the right
    if (e.clientX > viewportWidth * 0.7) {
      setTransform("translate(-100%, 24px)");
    }
    // If cursor is in the left 30% of the viewport, anchor tooltip to the left
    else if (e.clientX < viewportWidth * 0.3) {
      setTransform("translate(0, 24px)");
    }
    // Otherwise, use the default centering
    else {
      setTransform("translate(-50%, 24px)");
    }
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
    transition: "opacity 0.2s ease-in-out",
    // Add nowrap to prevent the text from wrapping
    whiteSpace: "nowrap",
  };

  return { isVisible, triggerProps, tooltipStyle };
};
