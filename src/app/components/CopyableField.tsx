// src/app/components/CopyableField.tsx

import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

interface Props {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

const CopyableField = ({ label, value, copied, onCopy }: Props) => (
  <div className="mb-2">
    <div className="text-muted small mb-1">{label}</div>
    <InputGroup size="sm">
      <FormControl
        disabled
        value={value}
        title={value}
        style={{ fontWeight: 650, userSelect: "text", textAlign: "center" }}
        aria-label={label}
      />
      <Button variant="outline-info" onClick={onCopy} style={{ fontSize: "0.85rem" }}>
        {copied ? "Copied!" : "Copy"}
      </Button>
    </InputGroup>
  </div>
);

export default CopyableField;
