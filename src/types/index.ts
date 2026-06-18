import { Quest as PrismaQuest, Registration, QuestRating } from "@prisma/client";

export type Department = "ALL" | "DESIGN" | "TECH" | "MEDIA" | "COMMUNITY" | "EVENT" | "MARKETING" | "E-SPORTS";

export type QuestCategory = "All" | "Workshops" | "Game Jams" | "Talks";

export interface Quest extends PrismaQuest {
  registrations?: Partial<Registration>[];
  ratings?: Partial<QuestRating>[];
}
