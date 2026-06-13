"use server";

import prisma from "@/lib/prisma";
import { verifyUser } from "./authActions";

export async function fetchDashboardData() {
  const user = await verifyUser();
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      registrations: user
        ? { where: { userId: user.id } }
        : false,
    },
  });

  return { quests };
}

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
