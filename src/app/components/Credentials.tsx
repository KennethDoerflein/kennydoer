// src/app/components/Credentials.tsx
import { Credential } from "../types"; // adjust path

interface CredentialsProps {
  creds: Credential[];
}

const Credentials = ({ creds }: CredentialsProps) => (
  <>
    {creds.map((c, idx) => (
      <div key={idx} className="mt-3">
        <strong>{c.label} Credentials:</strong>
        <p className="mb-1">
          <strong>Username/Email: </strong>
          {c.username ?? c.email}
        </p>
        <p className="mb-0">
          <strong>Password: </strong>
          {c.password}
        </p>
      </div>
    ))}
  </>
);

export default Credentials;
