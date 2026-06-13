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
      ratings: user
        ? { where: { userId: user.id } }
        : false,
    },
  });

  return { quests };
}

export async function submitQuestRating(questId: string, rating: number) {
  const user = await verifyUser();
  if (!user) throw new Error("Unauthorized");

  // Verify registration
  const registration = await prisma.registration.findFirst({
    where: { userId: user.id, questId: questId, status: "REGISTERED" },
  });

  if (!registration) {
    throw new Error("You must be a registered attendee to rate this quest.");
  }

  // Upsert rating
  await prisma.questRating.upsert({
    where: {
      userId_questId: { userId: user.id, questId },
    },
    update: { rating },
    create: {
      userId: user.id,
      questId,
      rating,
    },
  });

  return { success: true };
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
