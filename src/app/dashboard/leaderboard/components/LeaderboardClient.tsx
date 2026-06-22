"use client";

import React, { useState, useEffect } from "react";
import { Play, Search } from "lucide-react";
import type { User } from "@prisma/client";

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
function LeaderRow({ user, rank, delay, visible }: { user: User; rank: number; delay: number; visible: boolean }) {
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
      <div className="flex-1 min-w-0 flex items-center py-10 pl-0">
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
      <div className="w-[240px] shrink-0 flex flex-col gap-2 py-10">
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
      <div className="w-[193px] shrink-0 flex items-center justify-end py-10 pr-8">
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

export default function LeaderboardClient({ users }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredUsers = users.filter((u) => 
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (u.rollNo && u.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <h1 className="font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0">
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

      <div
        className="w-full overflow-x-auto mt-16 transition-all duration-700"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "250ms",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 min-w-[900px]">
          <div className="flex items-center border-b border-[#353436]/30 h-[61px]">
            <div className="w-[140px] shrink-0 pl-4">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                RANK
              </span>
            </div>
            <div className="flex-1 pl-0">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                PLAYER / XP LEVEL
              </span>
            </div>
            <div className="w-[240px] shrink-0">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                YEAR / ROLL NO
              </span>
            </div>
            <div className="w-[193px] shrink-0 text-right pr-8">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                SCORE
              </span>
            </div>
          </div>

          {filteredUsers.map((user, idx) => (
            <LeaderRow key={user.id} user={user} rank={idx + 1} delay={idx * 80} visible={mounted} />
          ))}
          {filteredUsers.length === 0 && (
             <div className="py-20 text-center font-mono text-[#E0C0AF]">No scores found.</div>
          )}
        </div>
      </div>
    </>
  );
}
