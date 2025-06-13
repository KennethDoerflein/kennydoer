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
  intrinsicWidth: number;
  intrinsicHeight: number;
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

export interface CredentialCardProps {
  credential: Credential;
  index: number;
  isOpen: boolean;
  toggleOpen: () => void;
  isCopied: (index: number, field: "id" | "password") => boolean;
  handleCopy: (text: string, index: number, field: "id" | "password") => void;
  isLast: boolean;
  anyOpen: boolean;
}
