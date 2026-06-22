import prisma from "@/lib/prisma";
import GameAdminClient from "./GameAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminGames() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">GAMES DATABASE</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE ALL GAMES DEVELOPED BY THE COLLECTIVE.
        </p>
      </div>

      <GameAdminClient games={games} />
    </div>
  );
}
