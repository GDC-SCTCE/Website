"use client";

import React, { useState, useEffect, useRef, use, Suspense } from "react";
import { Game } from "@prisma/client";
import { GameColumn } from "./components/GameColumn";
import { FeaturedGame } from "./components/FeaturedGame";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArcadeDynamicSkeleton } from "./components/ArcadeDynamicSkeleton";

// ─── Dynamic Content Component ──────────────────────────────────────────────

function DynamicArcadeContent({ gamesPromise }: { gamesPromise: Promise<Game[]> }) {
  const games = use(gamesPromise);
  
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [gridVisible, setGridVisible] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicators, setShowScrollIndicators] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Dynamic tags
  const engines = Array.from(new Set(games.map(g => g.engine?.toUpperCase()).filter(Boolean)));
  const years = Array.from(new Set(games.map(g => g.year).filter(Boolean)));
  const FILTER_TAGS = ["ALL", ...engines, ...years];

  // Featured game
  const featuredGame = games.find(g => g.isEditorsChoice) || games[0];

  useEffect(() => {
    let resetTimer: NodeJS.Timeout;
    const t2 = setTimeout(() => setGridVisible(true), 300);

    const nudgeTimer = setTimeout(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        if (scrollWidth > clientWidth) {
          scrollRef.current.scrollTo({ left: 60, behavior: "smooth" });
          resetTimer = setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
            }
          }, 500);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(t2);
      clearTimeout(nudgeTimer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);

  const handleFilter = (tag: string) => {
    if (tag === activeFilter) return;
    setGridVisible(false);
    setTimeout(() => {
      setActiveFilter(tag);
      setGridVisible(true);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 300);
  };

  const filtered = React.useMemo(() => {
    return games.filter((game) => {
      if (activeFilter === "ALL") return true;
      if (game.engine?.toUpperCase() === activeFilter) return true;
      if (game.year === activeFilter) return true;
      return false;
    });
  }, [games, activeFilter]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const progress = (scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < maxScroll - 2);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollable = scrollWidth > clientWidth;
      setShowScrollIndicators(scrollable);
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < maxScroll - 2);
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    const timer = setTimeout(checkScroll, 150);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filtered.length, gridVisible]);

  return (
    <>
      {/* Filter Row — fade up last */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-0">
        <div
          className="border-y border-[#584235] py-[17px] overflow-x-auto animate-fade-in"
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
          <div className="relative group/scroll-container">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              tabIndex={0}
              role="region"
              aria-label="Arcade games"
              className="flex overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            >
              {filtered.map((game, idx) => (
                <div key={`${activeFilter}-${game.id}`} className="w-[85vw] sm:w-[50%] lg:w-[33.333%] shrink-0 snap-start snap-always flex">
                  <GameColumn
                    game={game}
                    isLast={idx === filtered.length - 1}
                    delay={idx * 100}
                    visible={gridVisible}
                  />
                </div>
              ))}
            </div>

            {/* Floating Left Arrow Overlay (Middle Left) */}
            {showScrollIndicators && canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-4 lg:left-8 top-[calc(50%-16px)] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#131314]/90 border border-[#584235] text-[#E0C0AF] hover:text-[#FFB68B] hover:border-[#FFB68B] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10 opacity-0 md:group-hover/scroll-container:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Floating Right Arrow Overlay (Middle Right) */}
            {showScrollIndicators && canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className={`absolute right-4 lg:right-8 top-[calc(50%-16px)] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#131314]/90 border border-[#584235] text-[#E0C0AF] hover:text-[#FFB68B] hover:border-[#FFB68B] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10 ${
                  !canScrollLeft ? "animate-nudge-horizontal border-[#FFB68B] text-[#FFB68B] opacity-100" : "opacity-0 md:group-hover/scroll-container:opacity-100"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight className={`w-6 h-6 ${!canScrollLeft ? "scale-110" : ""}`} />
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex items-center justify-center py-32 font-mono text-[12px] text-[#584235] uppercase tracking-widest transition-opacity duration-300"
            style={{ opacity: gridVisible ? 1 : 0 }}
          >
            {games.length === 0
              ? "No games available yet"
              : "No games matching this filter"}
          </div>
        )}
      </div>

      {/* Scroll Progress Bar at the bottom (aligned with Header Section boundaries) */}
      {filtered.length > 0 && showScrollIndicators && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-6">
          <div className="flex items-center justify-end border-b border-[#584235]/40 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#A78B7C] uppercase tracking-wider font-semibold">
                Scroll to explore
              </span>
              <div className="w-[100px] sm:w-[140px] h-[2px] bg-[#2E2B2A] relative rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB68B] transition-all duration-75 rounded-full"
                  style={{
                    width: "30%",
                    left: `${Math.min(scrollProgress * 0.7, 70)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Featured Game Section ─────────────────────────────────────────── */}
      {featuredGame && <FeaturedGame featuredGame={featuredGame} />}
    </>
  );
}

// ─── Wrapper Client Component (Static Shell) ────────────────────────────────

export function ArcadeClient({ gamesPromise }: { gamesPromise: Promise<Game[]> }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div className="bg-[#131314] min-h-screen">
      {/* ── Header Section (Instantly visible) ───────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-[120px] pb-0">
        <p
          className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFB68B] mb-7 transition-all duration-500"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
          }}
        >
          ALL BUILDS
        </p>

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
      </div>

      <Suspense fallback={<ArcadeDynamicSkeleton />}>
        <DynamicArcadeContent gamesPromise={gamesPromise} />
      </Suspense>
    </div>
  );
}
