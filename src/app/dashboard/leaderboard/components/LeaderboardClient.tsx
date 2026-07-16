"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import type { User, Alumni } from "@prisma/client";
import { fetchLeaderboard } from "@/actions/leaderboard";
import { LeaderboardDynamicSkeleton } from "./LeaderboardDynamicSkeleton";

export type LeaderboardUser = Pick<User, "id" | "fullName" | "rollNo" | "academicYear" | "xpLevel" | "score"> & { rank?: number };

// ─── Score opacity by rank ─────────────────────────────────────────────────
const SCORE_OPACITY: Record<number, string> = {
  1: "text-[#E5E2E3]",
  2: "text-[#E5E2E3]/80",
  3: "text-[#E5E2E3]/60",
  4: "text-[#E5E2E3]/40",
};

// ─── Rank Medal ───────────────────────────────────────────────────────────────
function RankDisplay({ rank }: { rank: number }) {
  if (rank <= 3) {
    return (
      <span
        className="font-serif text-[36px] leading-[40px] text-[#E5E2E3] select-none transition-transform duration-300 group-hover:scale-110"
        aria-label={`Rank ${rank}`}
      >
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
      </span>
    );
  }
  return (
    <span className="font-sora font-black text-[24px] leading-[32px] text-[#E0C0AF] pl-2 transition-colors duration-300 group-hover:text-[#FF7A00]">
      {String(rank).padStart(2, "0")}
    </span>
  );
}

// ─── Leaderboard Row ──────────────────────────────────────────────────────────
function LeaderRow({ user, rank, delay, visible }: { user: LeaderboardUser; rank: number; delay: number; visible: boolean }) {
  const isTopThree = rank <= 3;

  return (
    <div
      className="flex items-center border-b border-[#353436]/30 py-0 min-h-[171px] transition-all duration-700 hover:bg-[#201F20]/30 hover:border-b-[#FF7A00]/50 group"
      style={{
        minWidth: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Rank */}
      <div className="w-[140px] shrink-0 flex items-center pl-4">
        <RankDisplay rank={rank} />
      </div>

      {/* Name + XP */}
      <div className="flex-[2] min-w-[300px] flex items-center py-10 pl-0 pr-4">
        <div>
          <h3 className="font-sora font-black text-[24px] leading-[32px] tracking-[-0.6px] uppercase text-[#E5E2E3] m-0 transition-colors duration-200 group-hover:text-[#FFB68B]">
            {user.fullName}
          </h3>
          <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E0C0AF] mt-1">
            {user.xpLevel}
          </p>
        </div>
      </div>

      {/* Engine + Team */}
      <div className="flex-1 min-w-[180px] shrink-0 flex flex-col gap-2 py-10">
        <div className="flex gap-1 flex-wrap">
          <span className="inline-flex items-center h-[26px] px-2 bg-[#2A2A2B] border border-[#353436] font-mono text-[12px] leading-[16px] text-[#FFB68B] transition-colors duration-200 hover:bg-[#FFB68B]/10">
            {user.academicYear}
          </span>
        </div>
        <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E5E2E3] transition-colors duration-200 group-hover:text-white">
          {user.rollNo}
        </p>
      </div>

      {/* Score */}
      <div className="flex-[0.8] min-w-[140px] shrink-0 flex items-center justify-end py-10 pr-8">
        <span
          className={`font-sora font-black text-[48px] leading-[48px] transition-all duration-300 group-hover:scale-105 ${
            SCORE_OPACITY[rank] ?? "text-[#E5E2E3]/30"
          }`}
        >
          {user.score}
        </span>
      </div>
    </div>
  );
}

// ─── Dynamic Rows Content ────────────────────────────────────────────────────
function DynamicLeaderboardRows({ 
  leaderboardDataPromise, 
  searchQuery, 
  mounted 
}: { 
  leaderboardDataPromise: Promise<{ users: LeaderboardUser[], alumni: Alumni[] }>; 
  searchQuery: string;
  mounted: boolean;
}) {
  const { users } = React.use(leaderboardDataPromise);
  const [loadedUsers, setLoadedUsers] = useState<LeaderboardUser[]>(users);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(users.length === 10);
  const [isLoading, setIsLoading] = useState(false);

  const prevSearchRef = React.useRef<string | null>(null);

  // Debounced server-side search
  useEffect(() => {
    if (!mounted) return;
    
    // Skip the redundant fetch on initial mount and Strict Mode re-mounts
    if (prevSearchRef.current === null && searchQuery === "") {
      prevSearchRef.current = searchQuery;
      return;
    }
    if (prevSearchRef.current === searchQuery) {
      return;
    }
    prevSearchRef.current = searchQuery;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchLeaderboard(0, 10, searchQuery);
        setLoadedUsers(results);
        setPage(1);
        setHasMore(results.length === 10);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, mounted]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const results = await fetchLeaderboard(page * 10, 10, searchQuery);
      setLoadedUsers(prev => [...prev, ...results]);
      setPage(prev => prev + 1);
      setHasMore(results.length === 10);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {loadedUsers.map((user, idx) => (
        <LeaderRow key={user.id} user={user} rank={user.rank!} delay={idx * 80} visible={mounted} />
      ))}
      {loadedUsers.length === 0 && !isLoading && (
          <div className="py-20 text-center font-mono text-[#E0C0AF]">No scores found.</div>
      )}
      {isLoading && <LeaderboardDynamicSkeleton />}
      {hasMore && !isLoading && (
        <div className="py-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-[#1C1B1C] border border-[#584235] hover:border-[#FF7A00] text-[#FFB68B] px-8 py-3 font-mono text-[12px] tracking-[1.2px] uppercase transition-all duration-300 disabled:opacity-50"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default function LeaderboardClient({ leaderboardDataPromise }: { leaderboardDataPromise: Promise<{ users: LeaderboardUser[], alumni: Alumni[] }> }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div
            className="transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-7">
              ALL TIME
            </p>
            <h1 className={`font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0 ${
              mounted ? "animate-glitch" : ""
            }`}>
              HIGH SCORES.
            </h1>
          </div>

          <div
            className="flex items-end gap-4 pb-1 flex-wrap transition-all duration-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "150ms",
            }}
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A78B7C]">
                <Search className="w-[14px] h-[14px]" />
              </div>
              <input
                type="text"
                placeholder="Search player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[280px] h-[50px] bg-[#0E0E0F] border-b-2 border-[#353436] pl-9 pr-4 font-sora font-normal text-[16px] text-[#E5E2E3] outline-none focus:border-[#FF7A00] transition-colors placeholder:text-[#A78B7C]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 min-w-[900px]">
          <div className="max-h-[70vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#131314] [&::-webkit-scrollbar-thumb]:bg-[#353436] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#584235]">
            <div 
              className="flex items-center border-b border-[#353436]/30 h-[61px] sticky top-0 bg-[#131314] z-10 transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transitionDelay: "250ms",
              }}
            >
              <div className="w-[140px] shrink-0 pl-4">
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                  RANK
                </span>
              </div>
              <div className="flex-[2] min-w-[300px] pl-0 pr-4">
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                  PLAYER / XP LEVEL
                </span>
              </div>
              <div className="flex-1 min-w-[180px] shrink-0">
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                  YEAR / ROLL NO
                </span>
              </div>
              <div className="flex-[0.8] min-w-[140px] shrink-0 text-right pr-8">
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                  SCORE
                </span>
              </div>
            </div>

            <React.Suspense fallback={<LeaderboardDynamicSkeleton />}>
              <DynamicLeaderboardRows leaderboardDataPromise={leaderboardDataPromise} searchQuery={searchQuery} mounted={mounted} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
