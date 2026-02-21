export type Theme = "deep-space" | "glassy-blue" | "glassy-light" | "forest";

export const themeOptions = {
  "deep-space": "Deep Space",
  "glassy-blue": "Ocean Blue",
  "glassy-light": "Purple Mist",
  forest: "Forest Green",
};

export const themeGradients: Record<Theme, string> = {
  "deep-space": "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 50%, #2a1a3e 100%)",
  "glassy-blue": "linear-gradient(to right top, #0f2027, #203a43, #2c5364)",
  "glassy-light": "linear-gradient(to right top, #e0eafc, #cfdef3)",
  forest: "linear-gradient(to right top, #28372c, #3a5a40, #2c4031)",
};

export const themes = {
  defaultTheme: "glassy-blue" as Theme,
  options: ["deep-space", "glassy-blue", "glassy-light", "forest"] as Theme[],
};
