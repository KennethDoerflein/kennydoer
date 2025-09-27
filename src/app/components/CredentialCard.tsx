// src/app/components/CredentialCard.tsx

import { easeInOut, motion, useAnimationControls, Variants } from "framer-motion";
import { useEffect } from "react";
import { useTooltip } from "../hooks/useTooltip";
import { CredentialCardProps } from "../types";
import { formatLabel, isEmailFormat } from "../utils";
import CopyableField from "./CopyableField";
import { useHoverEffect } from "../hooks/useHoverEffect";

// Get the hover status from our primary hook
const CredentialCard = ({
  credential,
  index,
  isOpen,
  toggleOpen,
  isCopied,
  handleCopy,
  isLast,
  anyOpen,
}: CredentialCardProps) => {
  const id = credential.username ?? credential.email;
  const isEmail = isEmailFormat(id);
  const isHoverEnabled = useHoverEffect();
  const {
    isVisible: isTooltipVisible,
    triggerProps,
    tooltipStyle,
    resetTooltip,
  } = useTooltip(isHoverEnabled, 1000, {
    disableMovement: true,
    location: "top",
  });

  const controls = useAnimationControls();

  // Variants for the button's border-radius and hover effect
  const buttonVariants: Variants = {
    open: {
      borderRadius: "1rem 1rem 0 0",
      transition: { borderRadius: { duration: 5, ease: easeInOut, delay: 0.05 } },
    },
    closed: {
      borderRadius: "1rem",
      transition: { borderRadius: { duration: 0.1, ease: easeInOut, delay: 0.25 } },
    },
  };

  const chevronVariants: Variants = {
    closed: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
    open: {
      rotate: 90,
      transition: { duration: 0.3 },
    },
    wiggle: {
      rotate: [0, 20, -15, 10, -5, 0],
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  const cardBodyVariants: Variants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: easeInOut },
        opacity: { duration: 0.2, ease: "linear", delay: 0.15 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: easeInOut },
        opacity: { duration: 0.2, ease: "linear" },
      },
    },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen) {
      controls.start("open");
    } else if (!anyOpen) {
      controls.start("closed");
      interval = setInterval(() => {
        controls.start("wiggle");
      }, 4000);
      resetTooltip(); // Reset tooltip logic after closing
    } else {
      controls.start("closed"); // Pause wiggle if any card is open
    }

    return () => clearInterval(interval);
  }, [isOpen, controls, anyOpen, resetTooltip]);

  return (
    <div
      className={`card bg-dark text-light border-0 w-100 shadow-sm ${!isLast ? "mb-0" : "mb-3"}`}
      style={{
        maxWidth: "220px",
        borderRadius: "1.3rem",
        overflow: "visible",
      }}>
      <motion.button
        onClick={toggleOpen}
        className="card-header text-light d-flex justify-content-between align-items-center border-0 p-3 "
        aria-expanded={isOpen}
        style={{
          backgroundColor: "#5c4685",
          fontWeight: 600,
        }}
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ backgroundColor: "#6c5695" }}
        {...triggerProps}>
        {isTooltipVisible && (
          <div style={tooltipStyle}>{isOpen ? "Click to collapse" : "Click to expand"}</div>
        )}
        <span style={{ fontSize: "1.2rem" }}>{formatLabel(credential.label)} Credentials</span>
        <motion.i
          className="bi bi-chevron-right"
          animate={controls}
          variants={chevronVariants}
          style={{ display: "inline-block" }}
        />
      </motion.button>

      <motion.div initial="closed" animate={isOpen ? "open" : "closed"} variants={cardBodyVariants}>
        <div className="card-body p-3 border-0">
          <CopyableField
            label={isEmail ? "Email" : "Username"}
            value={id!}
            copied={isCopied(index, "id")}
            onCopy={() => handleCopy(id!, index, "id")}
          />
          <CopyableField
            label="Password"
            value={credential.password}
            copied={isCopied(index, "password")}
            onCopy={() => handleCopy(credential.password, index, "password")}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CredentialCard;
