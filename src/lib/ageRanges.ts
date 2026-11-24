// Non-overlapping age bands (the reference page's "55-65" and "65+" both included 65).
export const AGE_RANGES = [
  { id: "18-24", label: "18–24" },
  { id: "25-34", label: "25–34" },
  { id: "35-44", label: "35–44" },
  { id: "45-54", label: "45–54" },
  { id: "55-64", label: "55–64" },
  { id: "65-plus", label: "65+" },
] as const;

// The allowed ids: "18-24" | "25-34" | ... | "65-plus". Read from the list above,
// so adding a range to AGE_RANGES updates this type too.
export type AgeRangeId = (typeof AGE_RANGES)[number]["id"];
