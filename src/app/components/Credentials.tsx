// src/app/components/Credentials.tsx

import { useState } from "react";
import { CredentialsProps } from "../types";
import CredentialCard from "./CredentialCard";

const Credentials = ({ credentials }: CredentialsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copiedStates, setCopiedStates] = useState<Set<string>>(new Set());

  const toggleOpen = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  const handleCopy = (text: string, index: number, field: "id" | "password") => {
    navigator.clipboard.writeText(text).then(() => {
      const key = `${index}-${field}`;
      setCopiedStates((prev) => new Set(prev).add(key));
      setTimeout(() => {
        setCopiedStates((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }, 500);
    });
  };

  const isCopied = (index: number, field: "id" | "password") =>
    copiedStates.has(`${index}-${field}`);

  return (
    <div className="d-flex flex-column align-items-start gap-0 mt-0 border-0">
      {credentials.map((c, idx) => (
        <CredentialCard
          key={idx}
          credential={c}
          index={idx}
          isOpen={openIndex === idx}
          toggleOpen={() => toggleOpen(idx)}
          isCopied={isCopied}
          handleCopy={handleCopy}
          isLast={idx === credentials.length - 1}
          anyOpen={openIndex !== null} // Pass if any card is open
        />
      ))}
    </div>
  );
};

export default Credentials;
