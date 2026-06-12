"use client";

import React, { useState, useEffect, useRef } from "react";
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

const FILTER_TAGS: FilterTag[] = ["ALL", "UNITY", "GODOT", "WEB", "UNREAL", "2024", "2023"];

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

// ─── Hooks ────────────────────────────────────────────────────────────────────

import { useInView } from "@/hooks/useInView";

// ─── Game Column Card ─────────────────────────────────────────────────────────

function GameColumn({
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
      className={`flex flex-col group cursor-pointer transition-all duration-700 ${
        !isLast ? "border-r border-[#584235]/30" : ""
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[479/400] overflow-hidden">
        <Image
          src={game.image}
          alt={game.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

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
          <div className="w-14 h-14 rounded-full bg-[#FFB68B]/90 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 fill-[#522300] text-[#522300] ml-1" />
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="px-6 py-6 flex flex-col gap-3">
        <div className="flex items-end justify-between gap-4">
          {/* Title — slides up on load */}
          <h3 className="font-sora font-bold text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0 flex-1 group-hover:text-[#FFB68B] transition-colors duration-300">
            {game.title}
          </h3>
          {/* Play link */}
          <a
            href="#"
            className="flex items-center gap-1.5 shrink-0 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B] no-underline hover:gap-3 hover:text-white transition-all duration-200 self-end pb-1"
          >
            Play <Play className="w-3 h-3 fill-current transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
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
  const [mounted, setMounted] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [prevFilter, setPrevFilter] = useState<FilterTag>("ALL");
  const [filterTransition, setFilterTransition] = useState(false);

  // Featured section scroll-in
  const { ref: featuredRef, inView: featuredVisible } = useInView(0.15);

  // Mount entrance animation
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setGridVisible(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Filter change with fade-out/fade-in transition
  const handleFilter = (tag: FilterTag) => {
    if (tag === activeFilter) return;
    setFilterTransition(true);
    setGridVisible(false);
    setTimeout(() => {
      setActiveFilter(tag);
      setFilterTransition(false);
      setTimeout(() => setGridVisible(true), 60);
    }, 220);
  };

  const filtered = GAMES.filter((g) => g.tags.includes(activeFilter));

  return (
    <div className="bg-[#131314] min-h-screen">

      {/* ── Header Section ───────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-[120px] pb-0">

        {/* Label — fade up first */}
        <p
          className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFB68B] mb-7 transition-all duration-500"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
          }}
        >
          ALL BUILDS
        </p>

        {/* Heading — glitch animation + delayed fade up */}
        <h1
          className="font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0 mb-8 transition-all duration-600"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "100ms",
            animationName: mounted ? "glitch" : "none",
            animationDuration: "6s",
            animationTimingFunction: "steps(1)",
            animationIterationCount: "infinite",
            animationDelay: "3s",
          }}
        >
          THE ARCADE WALL.
        </h1>

        {/* Filter Row — fade up last */}
        <div
          className="border-y border-[#584235] py-[17px] overflow-x-auto transition-all duration-500"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "200ms",
          }}
        >
          <div className="flex items-center gap-8 min-w-max">
            {FILTER_TAGS.map((tag) => {
              const isActive = activeFilter === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handleFilter(tag)}
                  className={`flex items-center gap-2 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase border-none bg-transparent cursor-pointer transition-all duration-200 p-0 ${
                    isActive
                      ? "text-[#FFB68B]"
                      : "text-[#E0C0AF] hover:text-[#FFB68B]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="w-[6px] h-[6px] rounded-full bg-[#FFB68B] shrink-0"
                      style={{ animation: "dot-pulse 1.5s ease-in-out infinite" }}
                    />
                  )}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Game Grid Section ─────────────────────────────────────────────── */}
      <div className="w-full mt-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game, idx) => (
              <GameColumn
                key={`${activeFilter}-${game.id}`}
                game={game}
                isLast={idx === filtered.length - 1}
                delay={idx * 100}
                visible={gridVisible}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex items-center justify-center py-32 font-mono text-[12px] text-[#584235] uppercase tracking-widest transition-opacity duration-300"
            style={{ opacity: gridVisible ? 1 : 0 }}
          >
            No games matching this filter yet
          </div>
        )}
      </div>

      {/* ── Featured Game Section ─────────────────────────────────────────── */}
      <div ref={featuredRef} className="w-full bg-[#131314] mt-8">
        <div className="flex flex-col lg:flex-row min-h-[600px]">

          {/* Left: content — slides in from left */}
          <div
            className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16 max-w-[720px] transition-all duration-700"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transform: featuredVisible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            {/* Editor's pick label */}
            <p
              className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-10 transition-all duration-500"
              style={{
                opacity: featuredVisible ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              EDITOR&apos;S PICK
            </p>

            {/* Title */}
            <h2
              className="font-sora font-extrabold text-[56px] sm:text-[72px] lg:text-[80px] leading-[56px] sm:leading-[72px] lg:leading-[80px] tracking-[-3.2px] text-[#E5E2E3] m-0 mb-10 transition-all duration-600"
              style={{
                opacity: featuredVisible ? 1 : 0,
                transform: featuredVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "150ms",
              }}
            >
              {FEATURED.title}
            </h2>

            {/* Description */}
            <p
              className="font-sora font-normal text-[16px] leading-[26px] text-[#E0C0AF] max-w-[510px] mb-10 transition-all duration-500"
              style={{
                opacity: featuredVisible ? 1 : 0,
                transitionDelay: "250ms",
              }}
            >
              {FEATURED.description}
            </p>

            {/* Metadata row */}
            <div
              className="border-y border-[#584235]/30 py-6 mb-10 flex items-start gap-12 flex-wrap transition-all duration-500"
              style={{
                opacity: featuredVisible ? 1 : 0,
                transitionDelay: "350ms",
              }}
            >
              {[
                { label: "ENGINE",   value: FEATURED.engine },
                { label: "GENRE",    value: FEATURED.genre },
                { label: "DURATION", value: FEATURED.duration },
                { label: "YEAR",     value: FEATURED.year },
              ].map((m) => (
                <div key={m.label}>
                  <p className="font-mono font-normal text-[10px] leading-[15px] uppercase text-[#A78B7C] mb-2">
                    {m.label}
                  </p>
                  <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3]">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div
              className="flex items-center gap-6 flex-wrap transition-all duration-500"
              style={{
                opacity: featuredVisible ? 1 : 0,
                transform: featuredVisible ? "translateY(0)" : "translateY(12px)",
                transitionDelay: "450ms",
              }}
            >
              <a
                href={FEATURED.playUrl}
                className="flex items-center gap-3 h-12 px-6 bg-[#FFB68B] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#522300] no-underline hover:brightness-110 hover:gap-4 transition-all duration-200 relative overflow-hidden group/btn"
              >
                {/* Button shimmer */}
                <span className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-500 ease-in-out" />
                PLAY NOW <Play className="w-3.5 h-3.5 fill-current relative z-10" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 h-12 px-6 border-2 border-[#FFF3D2] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFF3D2] no-underline hover:bg-[#FFF3D2]/5 hover:gap-4 transition-all duration-200"
              >
                TEAM INFO <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right: game image — slides in from right */}
          <div
            className="w-full lg:w-[720px] h-[400px] lg:h-auto shrink-0 relative overflow-hidden transition-all duration-800"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transform: featuredVisible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "100ms",
            }}
          >
            <Image
              src={FEATURED.image}
              alt={FEATURED.title}
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover transition-transform duration-[8s] hover:scale-105"
            />

            {/* Figma-spec overlays */}
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
              style={{ background: "rgba(255,122,0,0.1)", mixBlendMode: "color" }}
            />

            {/* Animated scanline sweep on the featured image */}
            <div
              className="absolute left-0 right-0 h-[2px] bg-white/15 blur-[1px] pointer-events-none"
              style={{ animation: "scanline-sweep 5s linear infinite" }}
            />

            {/* Left edge gradient */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#131314] to-transparent pointer-events-none hidden lg:block" />
          </div>

        </div>
      </div>

    </div>
  );
}
