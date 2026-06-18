import { QuestFilterCategory } from "@/types";

export const filters: { id: QuestFilterCategory; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Workshops", label: "Workshops" },
  { id: "Game_Jams", label: "Game Jams" },
  { id: "Talks", label: "Talks" }
];
