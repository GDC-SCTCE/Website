import prisma from "@/lib/prisma";
import LeaderboardClient from "./components/LeaderboardClient";
import AlumniSection from "./components/AlumniSection";

// Revalidate this page occasionally or rely on the Server Action to revalidate it
export const revalidate = 60; // optionally revalidate every 60s

export default function HallOfFamePage() {
  const leaderboardDataPromise = Promise.all([
    prisma.user.findMany({
      orderBy: { score: "desc" },
      take: 10,
      where: { score: { gt: -1 } }
    }),
    prisma.alumni.findMany({
      orderBy: { createdAt: "asc" }
    })
  ]).then(([users, alumni]) => ({ users, alumni }));

  return (
    <div className="bg-[#131314] min-h-screen">
      <LeaderboardClient leaderboardDataPromise={leaderboardDataPromise} />
      <AlumniSection leaderboardDataPromise={leaderboardDataPromise} />
    </div>
  );
}
