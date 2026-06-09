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
  description: string;
  category: "Code" | "Design" | "Sound" | "General";
  difficulty: "Beginner" | "Intermediate" | "Legendary";
  xpReward: number;
  badgeAwarded?: string;
  objective: string;
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
  speciality: string[];
  avatarSeed: string; // Used to generate placeholder avatar avatars
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
