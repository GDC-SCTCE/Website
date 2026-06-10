"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Quest, Game, LeaderboardEntry } from "../types";
import { MOCK_QUESTS, MOCK_GAMES, MOCK_LEADERBOARD } from "../constants/mockData";

interface GameForgeContextType {
  user: User | null;
  quests: Quest[];
  games: Game[];
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  login: (nickname: string, loadout: User["loadout"], stats: User["stats"]) => void;
  logout: () => void;
  completeQuest: (questId: string) => void;
  submitScore: (gameId: string, score: number) => void;
}

const GameForgeContext = createContext<GameForgeContextType | undefined>(undefined);

const XP_PER_LEVEL = 300;

export const GameForgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [quests] = useState<Quest[]>(MOCK_QUESTS);
  const [games, setGames] = useState<Game[]>(MOCK_GAMES);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [loading, setLoading] = useState(true);

  // Load user data on mount
  useEffect(() => {
    let savedUser = null;
    let savedGames = null;
    let savedLeaderboard = null;

    try {
      savedUser = localStorage.getItem("gameforge_user");
      savedGames = localStorage.getItem("gameforge_games");
      savedLeaderboard = localStorage.getItem("gameforge_leaderboard");
    } catch (e) {
      console.warn("localStorage is disabled or not accessible:", e);
    }

    setTimeout(() => {
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Error parsing saved user", e);
        }
      }
      
      if (savedGames) {
        try {
          setGames(JSON.parse(savedGames));
        } catch (e) {
          console.error("Error parsing saved games", e);
        }
      }
      
      if (savedLeaderboard) {
        try {
          setLeaderboard(JSON.parse(savedLeaderboard));
        } catch (e) {
          console.error("Error parsing saved leaderboard", e);
        }
      }
      
      setLoading(false);
    }, 0);
  }, []);

  // Sync helpers to localStorage
  const saveUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("gameforge_user", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("gameforge_user");
    }
  };

  const login = (nickname: string, loadout: User["loadout"], stats: User["stats"]) => {
    const newUser: User = {
      nickname,
      loadout,
      level: 1,
      xp: 0,
      stats,
      inventory: ["Starter Deck"],
      completedQuests: [],
      highScores: {},
    };
    saveUser(newUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const completeQuest = (questId: string) => {
    if (!user) return;
    if (user.completedQuests.includes(questId)) return; // already completed

    const quest = quests.find((q) => q.id === questId);
    if (!quest) return;

    const updatedCompleted = [...user.completedQuests, questId];
    const newXp = user.xp + quest.xpReward;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
    
    // Unlocks badge/items as inventory
    const updatedInventory = [...user.inventory];
    if (quest.badgeAwarded && !updatedInventory.includes(quest.badgeAwarded)) {
      updatedInventory.push(quest.badgeAwarded);
    }

    const updatedUser: User = {
      ...user,
      completedQuests: updatedCompleted,
      xp: newXp,
      level: newLevel,
      inventory: updatedInventory,
    };

    saveUser(updatedUser);
  };

  const submitScore = (gameId: string, score: number) => {
    if (!user) return;

    // 1. Update user high scores
    const updatedUserScores = {
      ...user.highScores,
      [gameId]: Math.max(user.highScores[gameId] || 0, score),
    };
    
    // Gain 50 XP for submitting a score
    const scoreXpReward = 50;
    const isFirstScoreForThisGame = !user.highScores[gameId];
    const newXp = user.xp + (isFirstScoreForThisGame ? scoreXpReward : 10);
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

    const updatedUser: User = {
      ...user,
      highScores: updatedUserScores,
      xp: newXp,
      level: newLevel,
    };
    saveUser(updatedUser);

    // 2. Update specific game's high score board
    const updatedGames = games.map((game) => {
      if (game.id === gameId) {
        const scores = [...game.highScores];
        const playerIndex = scores.findIndex((s) => s.player === user.nickname);
        
        if (playerIndex !== -1) {
          if (scores[playerIndex].score < score) {
            scores[playerIndex] = {
              player: user.nickname,
              score: score,
              date: new Date().toISOString().split("T")[0],
            };
          }
        } else {
          scores.push({
            player: user.nickname,
            score: score,
            date: new Date().toISOString().split("T")[0],
          });
        }
        
        // Sort descending
        scores.sort((a, b) => b.score - a.score);
        return { ...game, highScores: scores.slice(0, 5) };
      }
      return game;
    });

    setGames(updatedGames);
    localStorage.setItem("gameforge_games", JSON.stringify(updatedGames));

    // 3. Update global leaderboard
    const game = games.find((g) => g.id === gameId);
    const gameTitle = game ? game.title : "Unknown Game";

    const newLeaderboardEntry: LeaderboardEntry = {
      rank: 0, // Will recalculate ranks below
      player: user.nickname,
      score: score,
      gameTitle: gameTitle,
      date: new Date().toISOString().split("T")[0],
    };

    // Replace existing entry by this player for this game, or push
    let updatedLeaderboard = [...leaderboard];
    const existingIndex = updatedLeaderboard.findIndex(
      (entry) => entry.player === user.nickname && entry.gameTitle === gameTitle
    );

    if (existingIndex !== -1) {
      if (updatedLeaderboard[existingIndex].score < score) {
        updatedLeaderboard[existingIndex] = newLeaderboardEntry;
      }
    } else {
      updatedLeaderboard.push(newLeaderboardEntry);
    }

    // Sort leaderboard desc
    updatedLeaderboard.sort((a, b) => b.score - a.score);
    
    // Reassign ranks
    updatedLeaderboard = updatedLeaderboard.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    })).slice(0, 10); // Limit to top 10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem("gameforge_leaderboard", JSON.stringify(updatedLeaderboard));
  };

  return (
    <GameForgeContext.Provider
      value={{
        user,
        quests,
        games,
        leaderboard,
        loading,
        login,
        logout,
        completeQuest,
        submitScore,
      }}
    >
      {children}
    </GameForgeContext.Provider>
  );
};

export const useGameForge = () => {
  const context = useContext(GameForgeContext);
  if (context === undefined) {
    throw new Error("useGameForge must be used within a GameForgeProvider");
  }
  return context;
};
