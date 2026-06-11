"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTag = "ALL" | "UNITY" | "GODOT" | "WEB" | "UNREAL" | "2024" | "2023";

interface Game {
  id: string;
  title: string;
  engine: string;
  genre: string;
  image: string;
  tags: FilterTag[];
}

interface FeaturedGame {
  title: string;
  description: string;
  engine: string;
  genre: string;
  duration: string;
  year: string;
  image: string;
  playUrl: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const GAMES: Game[] = [
  {
    id: "neon-drift",
    title: "NEON DRIFT",
    engine: "Unity · 2D",
    genre: "Racing",
    image: "/game_neon_drift.png",
    tags: ["ALL", "UNITY", "2024"],
  },
  {
    id: "hollow-maze",
    title: "HOLLOW MAZE",
    engine: "Godot · 3D",
    genre: "Puzzle",
    image: "/game_hollow_maze.png",
    tags: ["ALL", "GODOT", "2024"],
  },
  {
    id: "grid-runner",
    title: "GRID RUNNER",
    engine: "Web · Custom",
    genre: "Arcade",
    image: "/game_grid_runner.png",
    tags: ["ALL", "WEB", "2023"],
  },
];

const FEATURED: FeaturedGame = {
  title: "Coda: The Last Protocol",
  description:
    "A deep-space terminal simulation where every keystroke determines the fate of the colony. Decode the signal before the clock hits zero.",
  engine: "Custom",
  genre: "Thriller",
  duration: "2h",
  year: "2025",
  image: "/game_coda_protocol.png",
  playUrl: "#",
};

const FILTER_TAGS: FilterTag[] = [
  "ALL",
  "UNITY",
  "GODOT",
  "WEB",
  "UNREAL",
  "2024",
  "2023",
];

// ─── Game Column Card ─────────────────────────────────────────────────────────

function GameColumn({
  game,
  isLast,
}: {
  game: Game;
  isLast: boolean;
}) {
  return (
    <div
      className={`flex flex-col group cursor-pointer ${!isLast ? "border-r border-[#584235]/30" : ""}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[479/400] overflow-hidden">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>

      {/* Info strip */}
      <div className="px-6 py-6 flex flex-col gap-4 flex-1">
        <div className="flex items-end justify-between gap-4">
          {/* Title */}
          <h3 className="font-sora font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0 flex-1">
            {game.title}
          </h3>
          {/* Play link */}
          <a
            href="#"
            className="flex items-center gap-1.5 shrink-0 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B] no-underline hover:text-white transition-colors duration-200 self-end pb-1"
          >
            Play <Play className="w-3 h-3 fill-current" />
          </a>
        </div>
        {/* Engine tag */}
        <span className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
          {game.engine}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArcadeWallPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("ALL");

  const filtered = GAMES.filter((g) => g.tags.includes(activeFilter));

  return (
    <div className="bg-[#131314] min-h-screen">

      {/* ── Header Section ───────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-[120px] pb-0">
        {/* Label */}
        <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFB68B] mb-7">
          ALL BUILDS
        </p>

        {/* Heading */}
        <h1 className="font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0 mb-8">
          THE ARCADE WALL.
        </h1>

        {/* Filter Row */}
        <div className="border-y border-[#584235] py-[17px] overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            {FILTER_TAGS.map((tag) => {
              const isActive = activeFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`flex items-center gap-2 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase border-none bg-transparent cursor-pointer transition-colors duration-200 p-0 ${
                    isActive ? "text-[#FFB68B]" : "text-[#E0C0AF] hover:text-[#FFB68B]"
                  }`}
                >
                  {isActive && (
                    <span className="w-[6px] h-[6px] rounded-full bg-[#FFB68B] shrink-0" />
                  )}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Game Grid Section (3-column, edge-to-edge) ───────────────────── */}
      <div className="w-full mt-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game, idx) => (
              <GameColumn
                key={game.id}
                game={game}
                isLast={idx === filtered.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-32 font-mono text-[12px] text-[#584235] uppercase tracking-widest">
            No games matching this filter yet
          </div>
        )}
      </div>

      {/* ── Featured Game Section (Full-bleed spotlight) ─────────────────── */}
      <div className="w-full bg-[#131314] mt-8">
        <div className="flex flex-col lg:flex-row min-h-[600px]">

          {/* Left: content */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16 lg:py-[64px] max-w-[720px]">
            {/* Editor's pick label */}
            <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-10">
              EDITOR&apos;S PICK
            </p>

            {/* Title */}
            <h2 className="font-sora font-extrabold text-[56px] sm:text-[72px] lg:text-[80px] leading-[56px] sm:leading-[72px] lg:leading-[80px] tracking-[-3.2px] text-[#E5E2E3] m-0 mb-10">
              {FEATURED.title}
            </h2>

            {/* Description */}
            <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E0C0AF] max-w-[510px] mb-10">
              {FEATURED.description}
            </p>

            {/* Metadata row */}
            <div className="border-y border-[#584235]/30 py-6 mb-10 flex items-start gap-12 flex-wrap">
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] uppercase text-[#A78B7C] mb-2">
                  ENGINE
                </p>
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3]">
                  {FEATURED.engine}
                </p>
              </div>
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] uppercase text-[#A78B7C] mb-2">
                  GENRE
                </p>
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3]">
                  {FEATURED.genre}
                </p>
              </div>
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] uppercase text-[#A78B7C] mb-2">
                  DURATION
                </p>
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3]">
                  {FEATURED.duration}
                </p>
              </div>
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] uppercase text-[#A78B7C] mb-2">
                  YEAR
                </p>
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3]">
                  {FEATURED.year}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-6 flex-wrap">
              <a
                href={FEATURED.playUrl}
                className="flex items-center gap-3 h-12 px-6 bg-[#FFB68B] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#522300] no-underline hover:brightness-110 transition-all duration-200"
              >
                PLAY NOW <Play className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 h-12 px-6 border-2 border-[#FFF3D2] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFF3D2] no-underline hover:bg-[#FFF3D2]/5 transition-all duration-200"
              >
                TEAM INFO <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: game image */}
          <div className="w-full lg:w-[720px] h-[400px] lg:h-auto shrink-0 relative overflow-hidden">
            <Image
              src={FEATURED.image}
              alt={FEATURED.title}
              fill
              className="object-cover"
            />
            {/* Overlays matching Figma spec */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06) 0%, rgba(0,255,0,0.02) 50%, rgba(0,0,255,0.06) 100%)",
              }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,182,139,0) 0%, rgba(255,182,139,0.1) 50%, rgba(255,182,139,0) 100%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "rgba(255,122,0,0.1)",
                mixBlendMode: "color",
              }}
            />
            {/* Left edge gradient fade into content */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#131314] to-transparent pointer-events-none lg:block hidden" />
          </div>

        </div>
      </div>

    </div>
  );
}
