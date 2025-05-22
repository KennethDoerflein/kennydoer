// src/app/components/Credentials.tsx
import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Credential } from "../types";

interface CredentialsProps {
  creds: Credential[];
}

const formatLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, " $1")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

const isEmailFormat = (value?: string | null): boolean =>
  !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Credentials = ({ creds }: CredentialsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (idx: number) => setOpenIndex((cur) => (cur === idx ? null : idx));

  return (
    <div className="d-flex flex-column align-items-start gap-0">
      {creds.map((c, idx) => {
        const id = c.username ?? c.email;
        const isEmail = isEmailFormat(id);
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
              className="card-header border-info bg-dark text-primary d-flex justify-content-between align-items-center"
              aria-expanded={isOpen}
              aria-controls={`collapse-body-${idx}`}
              style={{
                // full rounding when closed, square bottom when open
                borderRadius: isOpen ? "1rem 1rem 0 0" : "1rem",
              }}>
              <span>{formatLabel(c.label)} Credentials</span>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(90deg)" : undefined,
                }}>
                ▶
              </span>
            </button>

            <Collapse in={isOpen} unmountOnExit>
              <div
                id={`collapse-body-${idx}`}
                className="p-0 m-0"
                style={{
                  overflow: "hidden",
                  borderRadius: "0 0 0.75rem 0.75rem",
                }}>
                <div
                  className="card-body p-3"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    marginTop: "-1px",
                  }}>
                  <div className="mb-2">
                    <div className="text-muted small">{isEmail ? "Email" : "Username"}</div>
                    <div className="fw-semibold">{id}</div>
                  </div>
                  <div>
                    <div className="text-muted small">Password</div>
                    <div className="fw-semibold">{c.password}</div>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

export default Credentials;
