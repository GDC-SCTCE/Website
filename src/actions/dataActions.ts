"use server";

import prisma from "@/lib/prisma";

export async function fetchInitialData() {
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" },
    include: { highScores: true },
  });

  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: { score: "desc" },
    take: 10,
  });

  return { quests, games, leaderboard };
}
