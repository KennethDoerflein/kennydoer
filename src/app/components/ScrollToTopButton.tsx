// src/app/components/ScrollToTopButton.tsx
"use client";
import { useState, useEffect } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "./ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`text-center mt-4 goToBtnWrapper ${isVisible ? "visible" : ""}`}>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id="scroll-to-top-tooltip">Back to Top</Tooltip>}>
        <Button
          variant="info"
          className={`rounded-circle ${styles.goToBtn}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="bi bi-arrow-up"></i>
        </Button>
      </OverlayTrigger>
    </div>
  );
};
export default ScrollToTopButton;
