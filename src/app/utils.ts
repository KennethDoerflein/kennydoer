export const isEmailFormat = (value?: string | null): boolean =>
  !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const formatLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, " $1")
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
