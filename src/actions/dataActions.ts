"use server";

import prisma from "@/lib/prisma";
import { verifyUser, verifyAdmin } from "./authActions";

export async function fetchDashboardData() {
  const user = await verifyUser();
  const isAdmin = await verifyAdmin();
  const quests = await prisma.quest.findMany({
    where: {
      status: { in: ["ACTIVE", "UPCOMING"] }
    },
    orderBy: { createdAt: "desc" },
    include: {
      registrations: user
        ? { where: { userId: user.id }, select: { status: true } }
        : false,
    },
  });

  return { quests, isAdmin, user };
}

export async function getPaginatedConqueredQuests(
  page: number,
  pageSize: number,
  attendanceFilter: "all" | "attended" | "not_attended",
  search?: string,
  category?: string
) {
  const user = await verifyUser();
  
  // Base query: Only COMPLETED quests, plus search/category filters
  const baseWhereClause: any = { 
    status: "COMPLETED",
    ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    ...(category && category !== "All" ? { category: category as any } : {})
  };

  const whereClause: any = { ...baseWhereClause };

  if (user) {
    if (attendanceFilter === "attended") {
      whereClause.registrations = { some: { userId: user.id, status: "ATTENDED" } };
    } else if (attendanceFilter === "not_attended") {
      // Only quests they registered for but didn't attend
      whereClause.registrations = { some: { userId: user.id, status: { in: ["NOT_ATTENDED", "REGISTERED"] } } };
    }
  }

  const [quests, filteredCount, totalCount, attendedCount, notAttendedCount] = await Promise.all([
    // Fetch paginated quests
    prisma.quest.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: page * pageSize,
      take: pageSize,
      include: {
        registrations: user ? { where: { userId: user.id }, select: { status: true, pointsAwarded: true } } : false,
        ratings: user ? { where: { userId: user.id }, select: { rating: true } } : false,
      },
    }),
    // Count based on current filter
    prisma.quest.count({ where: whereClause }),
    // Count ALL completed with search/category
    // Count ALL completed with search/category
    prisma.quest.count({ where: baseWhereClause }),
    
    // Count ATTENDED completed with search/category
    user ? prisma.quest.count({
      where: {
        ...baseWhereClause,
        registrations: { some: { userId: user.id, status: "ATTENDED" } }
      }
    }) : 0,

    // Count NOT ATTENDED completed with search/category
    user ? prisma.quest.count({
      where: {
        ...baseWhereClause,
        registrations: { some: { userId: user.id, status: { in: ["NOT_ATTENDED", "REGISTERED"] } } }
      }
    }) : 0,
  ]);

  return {
    quests,
    filteredCount,
    totalCount,
    attendedCount,
    notAttendedCount
  };
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
      rollNo: reg.user.rollNo,
      xpLevel: reg.user.xpLevel,
    });
    
    // Sum the points of all individuals in the team
    groups[key].points += reg.pointsAwarded;
  }

  const sorted = Object.values(groups).sort((a, b) => b.points - a.points);
  return sorted.slice(0, 3);
}

