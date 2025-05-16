interface Credential {
  label: string;
  password: string;
  username?: string;
  email?: string;
}

const Credentials = ({ creds }: { creds: Credential[] }) => (
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
