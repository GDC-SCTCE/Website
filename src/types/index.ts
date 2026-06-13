export type Department = "ALL" | "DESIGN" | "TECH" | "MEDIA" | "COMMUNITY" | "EVENT" | "MARKETING" | "E-SPORTS";

export interface UserStats {
  strength: number;
  agility: number;
  tech: number;
  design: number;
}

export interface User {
  nickname: string;
  loadout: "Designer" | "Artist" | "Musician" | "Developer" | "";
  level: number;
  xp: number;
  stats: UserStats;
  inventory: string[];
  completedQuests: string[];
  highScores: Record<string, number>;
}

export interface Quest {
  id: string;
  title: string;
  category: string;
  status: string;
  dateText: string;
  location?: string | null;
  image?: string | null;
  capacity: number;
  seatsTaken: number;
  targetDate?: string | Date | null;
  endDate?: string | Date | null;
  price?: number;
  upiLink?: string | null;
  recapUrl?: string | null;
  createdAt: string | Date;
  registrations?: { status: string }[];
}

export interface GameHighScore {
  player: string;
  score: number;
  date: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  genre: string;
  developer: string;
  rating: number;
  coverUrl: string;
  releaseYear: string;
  features: string[];
  playable: boolean;
  highScores: GameHighScore[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  subRole: string;
  bio: string;
  avatar?: string | null;
  department: "ALL" | "DESIGN" | "TECH" | "MEDIA" | "COMMUNITY" | "EVENT" | "MARKETING" | "E-SPORTS";
  stats?: { label: string; value: number }[];
  gamePreview?: { title: string; label: string };
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface LeaderboardEntry {
  rank: number;
  player: string;
  score: number;
  gameTitle: string;
  date: string;
}
