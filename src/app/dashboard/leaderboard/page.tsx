"use client";

import React, { useState } from "react";
import { Play, ChevronDown, ExternalLink } from "lucide-react";
import Avatar from "@/components/Avatar";

// ─── Types ───────────────────────────────────────────────────────────────────

interface EngineBadge {
  label: string;
}

interface LeaderboardEntry {
  rank: number;
  gameTitle: string;
  gameSubtitle: string;
  engineBadges: EngineBadge[];
  teamName: string;
  score: number;
  thumbnail?: string;
}

interface Legend {
  name: string;
  role: string;
  company: string;
  companyLink: string;
  avatar?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    gameTitle: "NEON DRIFT",
    gameSubtitle: "S04 Grand Prix Winner",
    engineBadges: [{ label: "C++" }, { label: "UNREAL" }],
    teamName: "Team Velocity",
    score: 98.4,
  },
  {
    rank: 2,
    gameTitle: "HOLLOW MAZE",
    gameSubtitle: "Best Environment Art",
    engineBadges: [{ label: "VULKAN" }, { label: "CUSTOM" }],
    teamName: "Deep Forge Inc.",
    score: 96.8,
  },
  {
    rank: 3,
    gameTitle: "GRID RUNNER",
    gameSubtitle: "Innovation Award",
    engineBadges: [{ label: "RUST" }, { label: "DEVY" }],
    teamName: "Iron Logic",
    score: 94.1,
  },
  {
    rank: 4,
    gameTitle: "AETHERIA",
    gameSubtitle: "Community Favorite",
    engineBadges: [{ label: "GODOT" }],
    teamName: "Wildwoods Team",
    score: 91.5,
  },
];

const LEGENDS: Legend[] = [
  {
    name: "MARCUS VANE",
    role: "Founder, Studio X",
    company: "NOW AT STUDIO X",
    companyLink: "#",
  },
  {
    name: "SARAH CHEN",
    role: "Lead Designer",
    company: "NOW AT UBISOFT",
    companyLink: "#",
  },
  {
    name: "KAELEN WRIGHT",
    role: "Systems Architect",
    company: "NOW AT ROCKSTAR",
    companyLink: "#",
  },
  {
    name: "ELENA FROST",
    role: "Creative Director",
    company: "NOW AT RIOT",
    companyLink: "#",
  },
];

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
        className="font-serif text-[36px] leading-[40px] text-[#E5E2E3] select-none"
        aria-label={`Rank ${rank}`}
      >
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
      </span>
    );
  }
  return (
    <span className="font-sora font-black text-[24px] leading-[32px] text-[#E0C0AF] pl-2">
      {String(rank).padStart(2, "0")}
    </span>
  );
}

// ─── Play Button ─────────────────────────────────────────────────────────────

function PlayBtn({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <button className="w-12 h-12 bg-[#FFB68B] flex items-center justify-center hover:brightness-110 transition-all duration-200 cursor-pointer border-none shrink-0">
        <Play className="w-[11px] h-[14px] fill-black text-black" />
      </button>
    );
  }
  return (
    <button className="w-12 h-12 bg-[#201F20] border border-[#FFB68B] flex items-center justify-center hover:bg-[#FFB68B]/10 transition-all duration-200 cursor-pointer shrink-0">
      <Play
        className="w-[11px] h-[14px]"
        style={{ fill: "#FFB68B", color: "#FFB68B" }}
      />
    </button>
  );
}

// ─── Dropdown ────────────────────────────────────────────────────────────────

function Dropdown({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="relative">
      <p className="font-mono text-[10px] leading-[16px] text-[#E0C0AF] mb-1 absolute -top-5 left-0">
        {label}
      </p>
      <div className="flex items-center bg-[#0E0E0F] border-b-2 border-[#353436] h-[50px] px-4 gap-3 min-w-[160px] cursor-pointer hover:border-[#FF7A00] transition-colors duration-200">
        <span className="font-sora font-normal text-[16px] leading-[24px] text-[#E5E2E3] flex-1">
          {value}
        </span>
        <ChevronDown className="w-3 h-[7.4px] text-[#E0C0AF] shrink-0" />
      </div>
    </div>
  );
}

// ─── Leaderboard Row ──────────────────────────────────────────────────────────

function LeaderRow({ entry }: { entry: LeaderboardEntry }) {
  const isTopThree = entry.rank <= 3;

  return (
    <div
      className="flex items-center border-b border-[#353436]/30 py-0 min-h-[171px]"
      style={{ minWidth: 0 }}
    >
      {/* Rank */}
      <div className="w-[100px] shrink-0 flex items-center pl-4">
        <RankDisplay rank={entry.rank} />
      </div>

      {/* Thumbnail + Game Info */}
      <div className="flex-1 min-w-0 flex items-center gap-8 py-10">
        {/* Thumbnail */}
        <div
          className={`w-[160px] h-[90px] shrink-0 relative overflow-hidden border-t-2 ${
            isTopThree ? "border-[#FFB68B]" : "border-[#353436]"
          } ${!isTopThree ? "opacity-60" : ""}`}
        >
          {/* Placeholder game art */}
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
            <span
              className="font-mono text-[8px] uppercase tracking-widest"
              style={{ color: isTopThree ? "#FFB68B" : "#584235" }}
            >
              {entry.gameTitle.split(" ")[0]}
            </span>
          </div>
          {/* Scan overlay for top 3 */}
          {isTopThree && (
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.002] to-transparent pointer-events-none" />
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="font-sora font-black text-[24px] leading-[32px] tracking-[-0.6px] uppercase text-[#E5E2E3] m-0">
            {entry.gameTitle}
          </h3>
          <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E0C0AF] mt-1">
            {entry.gameSubtitle}
          </p>
        </div>
      </div>

      {/* Engine + Team */}
      <div className="w-[240px] shrink-0 flex flex-col gap-2 py-10">
        {/* Engine badges */}
        <div className="flex gap-1 flex-wrap">
          {entry.engineBadges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center h-[26px] px-2 bg-[#2A2A2B] border border-[#353436] font-mono text-[12px] leading-[16px] text-[#FFB68B]"
            >
              {b.label}
            </span>
          ))}
        </div>
        {/* Team */}
        <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E5E2E3]">
          {entry.teamName}
        </p>
      </div>

      {/* Score */}
      <div className="w-[193px] shrink-0 flex items-center justify-end py-10">
        <span
          className={`font-sora font-black text-[48px] leading-[48px] ${
            SCORE_OPACITY[entry.rank] ?? "text-[#E5E2E3]/30"
          }`}
        >
          {entry.score.toFixed(1)}
        </span>
      </div>

      {/* Play button */}
      <div className="w-[84px] shrink-0 flex items-center justify-end pr-0 py-10">
        <PlayBtn rank={entry.rank} />
      </div>
    </div>
  );
}

// ─── Legend Card ─────────────────────────────────────────────────────────────

function LegendCard({ legend }: { legend: Legend }) {
  return (
    <div className="flex flex-col">
      {/* Photo */}
      <div className="w-full aspect-square bg-[#201F20] border-2 border-[#353436] relative overflow-hidden">
        <Avatar name={legend.name} size={400} />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Name */}
      <h4 className="font-sora font-bold text-[20px] leading-[28px] uppercase text-[#E5E2E3] mt-5 mb-0">
        {legend.name}
      </h4>

      {/* Role */}
      <p className="font-mono font-bold text-[12px] leading-[16px] text-[#FFB68B] mt-1">
        {legend.role}
      </p>

      {/* Company link */}
      <a
        href={legend.companyLink}
        className="flex items-center gap-2 mt-3 no-underline group"
      >
        <span className="font-mono font-normal text-[10px] leading-[16px] text-[#E0C0AF] group-hover:text-white transition-colors duration-200 uppercase tracking-widest">
          {legend.company}
        </span>
        <ExternalLink className="w-[8.75px] h-[8.75px] text-[#E0C0AF] group-hover:text-white transition-colors duration-200 shrink-0" />
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HallOfFamePage() {
  const [season, setSeason] = useState("Season 04");
  const [category, setCategory] = useState("Grand Prix Overall");

  return (
    <div className="bg-[#131314] min-h-screen">

      {/* ── Section 6.1: Header ──────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[144px] pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: label + heading */}
          <div>
            <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-7">
              ALL TIME
            </p>
            <h1 className="font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0">
              HIGH SCORES.
            </h1>
          </div>

          {/* Right: dropdowns */}
          <div className="flex items-end gap-4 pb-1 flex-wrap">
            <Dropdown label="Season" value={season} />
            <Dropdown label="Category" value={category} />
          </div>
        </div>
      </div>

      {/* ── Section 6.2: Leaderboard Table ──────────────────────────────── */}
      <div className="w-full overflow-x-auto mt-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 min-w-[900px]">
          {/* Table header row */}
          <div className="flex items-center border-b border-[#353436]/30 h-[61px]">
            <div className="w-[100px] shrink-0 pl-4">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                RANK
              </span>
            </div>
            <div className="flex-1 pl-0">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                PRODUCTION
              </span>
            </div>
            <div className="w-[240px] shrink-0">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                ENGINE / TEAM
              </span>
            </div>
            <div className="w-[193px] shrink-0 text-right">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF]">
                SCORE
              </span>
            </div>
            <div className="w-[84px] shrink-0" />
          </div>

          {/* Rows */}
          {LEADERBOARD.map((entry) => (
            <LeaderRow key={entry.rank} entry={entry} />
          ))}
        </div>
      </div>

      {/* ── Section 6.3: Legends (Alumni) ───────────────────────────────── */}
      <div className="bg-[#0E0E0F] mt-24 py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          {/* Section label + heading */}
          <div className="mb-16">
            <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-7">
              LEGENDS (ALUMNI)
            </p>
            <h2 className="font-sora font-black text-[40px] sm:text-[48px] leading-[53px] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0">
              THEY BUILT HERE FIRST.
            </h2>
          </div>

          {/* 4-column legend grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEGENDS.map((legend) => (
              <LegendCard key={legend.name} legend={legend} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
