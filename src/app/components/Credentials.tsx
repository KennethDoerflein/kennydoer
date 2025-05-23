// src/app/components/Credentials.tsx
import React, { useState } from "react";
import { Collapse, InputGroup, Button, FormControl } from "react-bootstrap";
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
  const [copiedStates, setCopiedStates] = useState<Set<string>>(new Set());

  const toggleOpen = (idx: number) => setOpenIndex((cur) => (cur === idx ? null : idx));

  const handleCopy = (text: string, index: number, field: "id" | "password") => {
    navigator.clipboard.writeText(text).then(() => {
      const copiedKey = `${index}-${field}`;

      setCopiedStates((prevStates) => new Set(prevStates).add(copiedKey));

      setTimeout(() => {
        setCopiedStates((prevStates) => {
          const newSet = new Set(prevStates);
          newSet.delete(copiedKey);
          return newSet;
        });
      }, 500);
    });
  };

  const isCopied = (index: number, field: "id" | "password"): boolean => {
    return copiedStates.has(`${index}-${field}`);
  };

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
              idx < creds.length - 1 ? "mb-0" : "mb-3"
            }`}
            style={{
              maxWidth: "220px",
            }}>
            <button
              type="button"
              onClick={() => toggleOpen(idx)}
              className="card-header bg-dark text-primary d-flex justify-content-between align-items-center"
              aria-expanded={isOpen}
              aria-controls={`collapse-body-${idx}`}
              style={{
                border: "1.5px solid #0dcaf0",
                borderRadius: isOpen ? "1rem 1rem 0 0" : "1.3rem",
                transition: "border-radius 0.5s ease",
              }}>
              <span style={{ fontSize: "0.9rem" }}>{formatLabel(c.label)} Credentials</span>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  transform: isOpen ? "rotate(90deg)" : undefined,
                }}>
                <i
                  className={`bi bi-chevron-right`}
                  style={{
                    transition: "transform 0.3s ease",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                />
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
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                  <div className="mb-2">
                    <div className="text-muted small mb-1">{isEmail ? "Email" : "Username"}</div>

                    <InputGroup size="sm">
                      <FormControl
                        disabled
                        value={id}
                        title={id}
                        style={{ fontWeight: 650, userSelect: "text", textAlign: "center" }}
                        aria-label={isEmail ? "Email" : "Username"}
                      />

                      <Button
                        variant="outline-info"
                        onClick={() => handleCopy(id!, idx, "id")}
                        style={{ fontSize: "0.85rem" }}>
                        {isCopied(idx, "id") ? "Copied!" : "Copy"}
                      </Button>
                    </InputGroup>
                  </div>
                  <div>
                    <div className="text-muted small mb-1">Password</div>

                    <InputGroup size="sm">
                      <FormControl
                        disabled
                        value={c.password}
                        title={c.password}
                        style={{ fontWeight: 650, userSelect: "text", textAlign: "center" }}
                        aria-label="Password"
                      />

                      <Button
                        variant="outline-info"
                        onClick={() => handleCopy(c.password, idx, "password")}
                        style={{ fontSize: "0.85rem" }}>
                        {isCopied(idx, "password") ? "Copied!" : "Copy"}
                      </Button>
                    </InputGroup>
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
