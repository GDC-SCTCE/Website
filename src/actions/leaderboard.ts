"use server";

import prisma from "@/lib/prisma";

export async function fetchLeaderboard(skip: number, take: number, search: string = "") {
  return await prisma.user.findMany({
    where: {
      score: { gt: -1 }, // Only users with scores >= 0
      ...(search ? {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { rollNo: { contains: search, mode: "insensitive" } }
        ]
      } : {})
    },
    orderBy: { score: "desc" },
    skip,
    take
  });
}
