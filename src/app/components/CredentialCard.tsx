import { AnimationControls, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Collapse, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Credential } from "../types";
import { formatLabel, isEmailFormat } from "../utils";
import CopyableField from "./CopyableField";

interface Props {
  credential: Credential;
  index: number;
  isOpen: boolean;
  toggleOpen: () => void;
  isCopied: (index: number, field: "id" | "password") => boolean;
  handleCopy: (text: string, index: number, field: "id" | "password") => void;
  isLast: boolean;
}

const CredentialCard = ({
  credential,
  index,
  isOpen,
  toggleOpen,
  isCopied,
  handleCopy,
  isLast,
}: Props) => {
  const id = credential.username ?? credential.email;
  const isEmail = isEmailFormat(id);

  const controls: AnimationControls = useAnimationControls();
  const chevronVariants = {
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
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen) {
      // Snap to 90° rotation when open
      controls.start("open");
    } else {
      // Snap to 0° and start wiggle loop
      controls.start("closed");
      interval = setInterval(() => {
        controls.start("wiggle");
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [isOpen, controls]);

  return (
    <div
      className={`card bg-dark text-light border-0 w-100 shadow-sm ${!isLast ? "mb-0" : "mb-3"}`}
      style={{
        maxWidth: "220px",
        borderRadius: "1.3rem",
      }}>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={index + "-tooltip"}>
            {isOpen ? "Click to collapse" : "Click to expand"}
          </Tooltip>
        }>
        <button
          onClick={toggleOpen}
          className="card-header text-light d-flex justify-content-between align-items-center border-0"
          aria-expanded={isOpen}
          style={{
            borderRadius: isOpen ? "1rem 1rem 0 0" : "1.3rem",
            transition: "border-radius 0.1s ease",
            transitionDelay: isOpen ? "0s" : "0.5s",
            backgroundColor: "#5c4685",
            fontWeight: 600,
          }}>
          <span style={{ fontSize: "1.2rem" }}>{formatLabel(credential.label)} Credentials</span>
          <motion.i
            className="bi bi-chevron-right"
            animate={controls}
            variants={chevronVariants}
            style={{ display: "inline-block" }}
          />
        </button>
      </OverlayTrigger>

      <Collapse in={isOpen} unmountOnExit>
        <div className="p-0 m-0" style={{ borderRadius: "0 0 1rem 1rem", overflow: "hidden" }}>
          <div
            className="card-body p-3 border-0"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
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
        </div>
      </Collapse>
    </div>
  );
};

export default CredentialCard;
