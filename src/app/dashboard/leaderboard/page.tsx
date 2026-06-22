import React from "react";
import prisma from "@/lib/prisma";
import LeaderboardClient from "./components/LeaderboardClient";
import AlumniSection from "./components/AlumniSection";

// Revalidate this page occasionally or rely on the Server Action to revalidate it
export const revalidate = 60; // optionally revalidate every 60s

export default async function HallOfFamePage() {
  // Fetch top users sorted by score
  const users = await prisma.user.findMany({
    orderBy: { score: "desc" },
    take: 10,
    where: {
      score: { gt: -1 } // Only show users who have earned points
    }
  });

  // Fetch alumni
  const alumni = await prisma.alumni.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="bg-[#131314] min-h-screen">
      <LeaderboardClient users={users} />
      <AlumniSection alumni={alumni} />
    </div>
  );
}
