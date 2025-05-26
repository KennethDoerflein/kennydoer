import React from "react";
import { Collapse } from "react-bootstrap";
import CopyableField from "./CopyableField";
import { isEmailFormat, formatLabel } from "../utils";
import { Credential } from "../types";

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

  return (
    <div
      className={`card bg-dark text-light border-0 w-100 shadow-sm ${!isLast ? "mb-0" : "mb-3"}`}
      style={{
        maxWidth: "220px",
        borderRadius: isOpen ? "1rem 1rem 0 0" : "1.3rem",
        transition: "border-radius 0.5s ease",
      }}>
      <button
        onClick={toggleOpen}
        className="card-header text-light d-flex justify-content-between align-items-center border-0"
        aria-expanded={isOpen}
        style={{
          borderRadius: isOpen ? "1rem 1rem 0 0" : "1.3rem",
          transition: "border-radius 0.5s ease",
          backgroundColor: "#5c4685",
          fontWeight: 600,
        }}>
        <span style={{ fontSize: "0.9rem" }}>{formatLabel(credential.label)} Credentials</span>
        <i
          className={`bi bi-chevron-right ${!isOpen ? "chevron-wiggle" : ""}`}
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </button>

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
