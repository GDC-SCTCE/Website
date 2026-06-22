import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [questCount, gameCount, teamCount, toolCount, alumniCount] = await Promise.all([
    prisma.quest.count(),
    prisma.game.count(),
    prisma.teamMember.count(),
    prisma.tool.count(),
    prisma.alumni.count(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">SYSTEM OVERVIEW</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          SELECT A MODULE TO UPDATE DATABASE RECORDS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "QUESTS", href: "/admin/quests", count: questCount },
          { title: "GAMES", href: "/admin/games", count: gameCount },
          { title: "TEAM MEMBERS", href: "/admin/team", count: teamCount },
          { title: "ALUMNI", href: "/admin/alumni", count: alumniCount },
          { title: "TOOLS & INVENTORY", href: "/admin/tools", count: toolCount },
        ].map((module) => (
          <Link key={module.href} href={module.href} className="bg-[#1A1A1B] border border-[#584235] p-6 hover:border-[#FF7A00] transition-colors group no-underline">
            <h2 className="font-sora font-bold text-[20px] text-white group-hover:text-[#FF7A00] transition-colors mb-4">{module.title}</h2>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[12px] text-[#A78B7C]">TOTAL RECORDS</span>
              <span className="font-mono text-[24px] text-[#FFB68B]">{module.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
