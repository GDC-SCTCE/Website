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

export async function fetchActiveQuests() {
  const quests = await prisma.quest.findMany({
    where: { status: "ACTIVE" },
    orderBy: { targetDate: "asc" },
  });
  return quests;
}

export async function getQuestWinners(questId: string) {
  const registrations = (await prisma.registration.findMany({
    where: {
      questId,
      status: "ATTENDED",
      pointsAwarded: { gt: 0 },
    } as any,
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
          rollNo: true,
          xpLevel: true,
        },
      },
    },
  })) as any[];

  const groups: {
    [key: string]: {
      name: string;
      isTeam: boolean;
      points: number;
      members: Array<{
        fullName: string;
        email: string;
        rollNo: string;
        xpLevel: string;
      }>;
    };
  } = {};

  for (const reg of registrations) {
    const key = reg.teamName ? `team:${reg.teamName}` : `user:${reg.userId}`;
    if (!groups[key]) {
      groups[key] = {
        name: reg.teamName || reg.user.fullName,
        isTeam: !!reg.teamName,
        points: 0,
        members: [],
      };
    }
    groups[key].members.push({
      fullName: reg.user.fullName,
      email: reg.user.email,
      rollNo: reg.user.rollNo,
      xpLevel: reg.user.xpLevel,
    });
    
    // Sum the points of all individuals in the team
    groups[key].points += reg.pointsAwarded;
  }

  const sorted = Object.values(groups).sort((a, b) => b.points - a.points);
  return sorted.slice(0, 3);
}

