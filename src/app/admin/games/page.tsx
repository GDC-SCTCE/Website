import React from "react";
import prisma from "@/lib/prisma";
import GameForm from "./GameForm";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {games.map((game) => (
            <div key={game.id} className="bg-[#1A1A1B] border border-[#584235] p-6 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <h3 className="font-sora font-bold text-[18px] text-[#FFB68B]">{game.title}</h3>
                <span className="font-mono text-[10px] bg-[#584235] text-[#FFB68B] px-2 py-1 rounded-sm">
                  {game.status}
                </span>
              </div>
              <p className="font-sans text-[14px] text-zinc-300">{game.description}</p>
              <div className="mt-4 pt-4 border-t border-[#584235]/40 flex flex-wrap gap-4">
                <span className="font-mono text-[12px] text-[#A78B7C]">GENRE: <span className="text-[#FF7A00]">{game.genre}</span></span>
                <span className="font-mono text-[12px] text-[#A78B7C]">ENGINE: <span className="text-[#FF7A00]">{game.engine}</span></span>
                {game.playUrl && (
                  <a href={game.playUrl} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-[#FF7A00] hover:underline">
                    PLAY LINK
                  </a>
                )}
              </div>
            </div>
          ))}
          {games.length === 0 && (
            <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
              NO GAMES FOUND IN DATABASE.
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235] p-6 h-fit sticky top-24">
          <h2 className="font-sora font-bold text-[20px] text-white mb-6">ADD NEW GAME</h2>
          <GameForm />
        </div>
      </div>
    </div>
  );
}
