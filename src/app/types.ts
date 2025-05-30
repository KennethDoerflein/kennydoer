// src/app/types.ts
export interface Credential {
  label: string;
  password: string;
  username?: string;
  email?: string;
}

export interface CredentialsProps {
  creds: Credential[];
}

export interface Project {
  title: string;
  img: string;
  alt: string;
  tech: string[];
  description: string;
  demo: string;
  creds?: Credential[];
  onImageClick: (src: string) => void;
  isFirst?: boolean; // Optional prop to indicate if it's the first card
}

export interface TechBadgesProps {
  tech: string[];
}
