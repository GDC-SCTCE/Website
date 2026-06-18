import { Quest as PrismaQuest, QuestCategory, Department, Registration, QuestRating } from "@prisma/client";

export { QuestCategory, Department };

// UI Filter Types (Combines DB Enums with "All" option)
export type QuestFilterCategory = QuestCategory | "All";
export type DepartmentFilter = Department | "ALL";

// Remove old manual types
export interface Quest extends PrismaQuest {
  registrations?: Partial<Registration>[];
  ratings?: Partial<QuestRating>[];
}
