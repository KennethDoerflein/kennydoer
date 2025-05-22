// src/app/components/Credentials.tsx
import React, { useState } from "react";
import { Credential } from "../types";

interface CredentialsProps {
  creds: Credential[];
}

const formatLabel = (label: string) => {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
};

const isEmailFormat = (value: string | undefined | null): boolean => {
  return !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const Credentials = ({ creds }: CredentialsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <div className={`d-flex flex-column align-items-start ${creds.length > 1 ? "gap-0" : ""}`}>
      {creds.map((c, idx) => {
        const identifier = c.username ?? c.email;
        const isEmail = isEmailFormat(identifier);
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`card bg-dark text-light border-0 w-100 shadow-sm ${
              idx < creds.length - 1 ? "mb-1" : ""
            }`}
            style={{ maxWidth: "320px" }}>
            <button
              type="button"
              onClick={() => toggleOpen(idx)}
              className="card-header border-1 border-info bg-dark text-primary d-flex justify-content-between align-items-center"
              style={{
                cursor: "pointer",
                borderRadius: "1rem 1rem 1rem 1rem",
                paddingRight: "1rem",
                paddingLeft: "1rem",
                userSelect: "none",
                boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.1)",
              }}
              aria-expanded={isOpen}
              aria-controls={`collapse-body-${idx}`}
              id={`collapse-header-${idx}`}>
              <span>{formatLabel(c.label)} Credentials</span>
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
                aria-hidden="true">
                ▶
              </span>
            </button>

            <div
              id={`collapse-body-${idx}`}
              role="region"
              aria-labelledby={`collapse-header-${idx}`}
              className={`card-body p-3 ${isOpen ? "d-block" : "d-none"}`}
              style={{
                borderRadius: "0 0 0.75rem 0.75rem",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                marginTop: "-1px",
              }}>
              <div className="mb-2">
                <div className="text-muted small">{isEmail ? "Email" : "Username"}</div>
                <div className="fw-semibold">{identifier}</div>
              </div>
              <div>
                <div className="text-muted small">Password</div>
                <div className="fw-semibold">{c.password}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Credentials;
