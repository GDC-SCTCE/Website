"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Game } from "@prisma/client";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export function GameColumn({
  game,
  isLast,
  delay,
  visible,
}: {
  game: Game;
  isLast: boolean;
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className={`w-full flex flex-col group cursor-pointer transition-all duration-700 ${
        !isLast ? "border-r border-[#584235]/30" : ""
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[479/400] overflow-hidden bg-[#1e1e1e] flex items-center justify-center">
        {game.coverUrl ? (
          <Image
            src={game.coverUrl}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <GDCPlaceholder textClassName="text-[64px]" />
        )}

        {/* Scanline sweep — slides top→bottom on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute left-0 right-0 h-[3px] bg-white/20 blur-[1px]"
            style={{
              animation: "scanline-sweep 4s linear infinite",
              animationPlayState: "paused",
            }}
          />
        </div>
        {/* on-hover: activate scanline */}
        <style>{`
          .group:hover .scanline-bar { animation-play-state: running !important; }
        `}</style>

        {/* Shimmer flash on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-y-0 w-[60%] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
            style={{
              animation: "shimmer 1.2s ease-in-out",
              animationPlayState: "paused",
            }}
          />
        </div>

        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Play icon center on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a href={game.playUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-[#FFB68B]/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-[#522300] text-[#522300] ml-1" />
          </a>
        </div>
      </div>

      {/* Info strip */}
      <div className="px-6 py-6 flex flex-col flex-1">
        {/* Title — slides up on load */}
        <h3 className="font-sora font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0 mb-4 flex-1 group-hover:text-[#FFB68B] transition-colors duration-300">
          {game.title}
        </h3>
        
        {/* Footer info: engine/dimension on left, play on right */}
        <div className="flex items-end justify-between gap-4 mt-auto">
          <span className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
            {game.engine} {game.dimension ? `· ${game.dimension}` : ""}
          </span>
          {/* Play link */}
          <a
            href={game.playUrl || "#"}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 shrink-0 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B] no-underline hover:gap-3 hover:text-white transition-all duration-200"
          >
            Play <Play className="w-3 h-3 fill-current transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
