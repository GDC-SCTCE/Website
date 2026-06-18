"use client";

import React, { useState, useEffect } from "react";
import { Game } from "@prisma/client";
import { GameColumn } from "./components/GameColumn";
import { FeaturedGame } from "./components/FeaturedGame";

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ArcadeClient({ games }: { games: Game[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [mounted, setMounted] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [filterTransition, setFilterTransition] = useState(false);

  // Dynamic tags
  const engines = Array.from(new Set(games.map(g => g.engine?.toUpperCase()).filter(Boolean)));
  const years = Array.from(new Set(games.map(g => g.year).filter(Boolean)));
  const FILTER_TAGS = ["ALL", ...engines, ...years];

  // Featured game
  const featuredGame = games.find(g => g.isEditorsChoice) || games[0];

  // Mount entrance animation
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setGridVisible(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Filter change with fade-out/fade-in transition
  const handleFilter = (tag: string) => {
    if (tag === activeFilter) return;
    setFilterTransition(true);
    setGridVisible(false);
    setTimeout(() => {
      setActiveFilter(tag);
      setFilterTransition(false);
      setTimeout(() => setGridVisible(true), 60);
    }, 220);
  };

  const filtered = games.filter((g) => {
    if (featuredGame && g.id === featuredGame.id) return false;
    if (activeFilter === "ALL") return true;
    return g.engine?.toUpperCase() === activeFilter || g.year === activeFilter;
  });

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
                  onClick={() => handleFilter(tag as string)}
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
          <div className="flex overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
            {filtered.map((game, idx) => (
              <div key={`${activeFilter}-${game.id}`} className="w-[85vw] sm:w-[50%] lg:w-[33.333%] shrink-0 snap-start flex">
                <GameColumn
                  game={game}
                  isLast={idx === filtered.length - 1}
                  delay={idx * 100}
                  visible={gridVisible}
                />
              </div>
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
      {featuredGame && <FeaturedGame featuredGame={featuredGame} />}
    </div>
  );
}
