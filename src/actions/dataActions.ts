"use server";

import prisma from "@/lib/prisma";
import { verifyUser, verifyAdmin } from "./authActions";

export async function fetchDashboardData() {
  const user = await verifyUser();
  const isAdmin = await verifyAdmin();
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

  return { quests, isAdmin, user };
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


