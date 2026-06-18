import { Department } from "@/types";

export const filters: { id: Department | "ALL"; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "DESIGN", label: "DESIGN" },
  { id: "TECH", label: "TECH" },
  { id: "MEDIA", label: "MEDIA" },
  { id: "COMMUNITY", label: "COMMUNITY" },
  { id: "EVENT", label: "EVENT" },
  { id: "MARKETING", label: "MARKETING" },
  { id: "E_SPORTS", label: "E-SPORTS" }
];
