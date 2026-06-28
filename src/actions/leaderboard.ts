"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { LeaderboardUser } from "@/app/dashboard/leaderboard/components/LeaderboardClient";

export async function fetchLeaderboard(skip: number, take: number, search: string = "") {
  // Use a CTE to calculate global ranks for all eligible users first.
  // This ensures that when we search, the user retains their actual global rank,
  // instead of becoming "Rank 1" among the search results.
  
  const query = Prisma.sql`
    WITH RankedUsers AS (
      SELECT id, "fullName", "rollNo", "academicYear", "xpLevel", score,
             (RANK() OVER (ORDER BY score DESC))::int as rank
      FROM "User"
      WHERE score > -1
    )
    SELECT * FROM RankedUsers
    ${search ? Prisma.sql`WHERE "fullName" ILIKE ${`%${search}%`} OR "rollNo" ILIKE ${`%${search}%`}` : Prisma.empty}
    ORDER BY rank ASC
    OFFSET ${skip} LIMIT ${take}
  `;

  const rankedUsers = await prisma.$queryRaw<LeaderboardUser[]>(query);
  return rankedUsers;
}
