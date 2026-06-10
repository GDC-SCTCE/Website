"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGameForge } from "@/context/GameForgeContext";
import { Search, Bell, ExternalLink } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

// Date constants defined OUTSIDE components so they never change reference
const CARD1_TARGET_MS = new Date("2025-05-16T23:59:00").getTime();
const CARD2_TARGET_MS = new Date("2025-06-02T09:00:00").getTime();

// ─────────────────────────────────────────────
// FILTER TABS
// ─────────────────────────────────────────────
const filters = ["All", "Workshops", "Base Jams", "Talks"];

// ─────────────────────────────────────────────
// PAST QUESTS DATA
// ─────────────────────────────────────────────
const pastQuests = [
  {
    id: "p1",
    image: "/past_game_jam.png",
    title: "Game Jam #1 · April 2025",
    meta: "#1 attended  🏆 1.0",
  },
  {
    id: "p2",
    image: "/past_unity_workshop.png",
    title: "Unity Workshop · March 2025",
    meta: "#1 attended  🏆 3",
  },
];

// ─────────────────────────────────────────────
// CARD 1 — Cyberpunk Level Design (Active)
// ─────────────────────────────────────────────
function Card1() {
  const { user } = useGameForge();
  const timer = useCountdown(CARD1_TARGET_MS);
  const pad = (n: number) => String(n).padStart(2, "0");
  const seatsTotal = 50;
  const seatsTaken = 12;
  const progressPct = (seatsTaken / seatsTotal) * 100;

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00]">
      {/* Image area */}
      <div className="relative mx-6 mt-6 h-[290px]">
        <Image
          src="/quest_cyberpunk_level.png"
          alt="Cyberpunk Level Design Workshop"
          fill
          className="object-cover"
        />
        {/* Active badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#131314]/80 border border-[#FFB68B] backdrop-blur-[2px]">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#FF7A00]" />
          <span className="font-mono font-normal text-[10px] leading-[15px] text-[#FFB68B]">
            Active
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="mx-6 mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-sora font-normal text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] text-[#E5E2E3]">
          Cyberpunk Level Design
        </h3>

        {/* Date / Location */}
        <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#E0C0AF]">
          May 14-16 · Virtual
        </p>

        {/* Separator */}
        <div className="mt-6 border-t border-[#584235]" />

        {/* Timer + Seats */}
        <div className="flex items-start justify-between mt-6">
          <div>
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              Time Remaining
            </p>
            <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#FFB68B]">
              {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              Seats Available
            </p>
            <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#E5E2E3]">
              {seatsTaken} / {seatsTotal}
            </p>
          </div>
        </div>

        {/* Progress bar track */}
        <div className="mt-4 relative h-[2px] bg-[#353436]">
          {/* Active fill with gradient */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#93000A] via-[#FF7A00] to-[#FDD400]"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* CTA Button */}
        {user && (
          <button className="mt-6 mb-6 w-full h-[48px] bg-[#FF7A00] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer border-none">
            <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800]">
              Accept Quest →
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD 2 — Sound Design Masterclass (Soon)
// ─────────────────────────────────────────────
function Card2() {
  const { user } = useGameForge();
  const timer = useCountdown(CARD2_TARGET_MS);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00] opacity-90">
      {/* Image area */}
      <div className="relative mx-6 mt-6 h-[290px]">
        <Image
          src="/quest_sound_design.png"
          alt="Sound Design Masterclass"
          fill
          className="object-cover"
        />
        {/* Soon badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#131314]/80 border border-[#A78B7C] backdrop-blur-[2px]">
          <span className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
            Soon
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="mx-6 mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-sora font-normal text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] text-[#E5E2E3]">
          Sound Design Masterclass
        </h3>

        {/* Date / Location */}
        <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#E0C0AF]">
          June 02 · Main Hall
        </p>

        {/* Separator */}
        <div className="mt-6 border-t border-[#584235]" />

        {/* Timer + Reservation */}
        <div className="flex items-start justify-between mt-6">
          <div>
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              Unlocks In
            </p>
            <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#E5E2E3]">
              {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              Reservation
            </p>
            <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#E5E2E3]">
              0 / 30
            </p>
          </div>
        </div>

        {/* Divider grey */}
        <div className="mt-4 h-[2px] bg-[#353436]" />

        {/* CTA Button — outlined */}
        {user && (
          <button className="mt-6 mb-6 w-full h-[56px] border-2 border-[#FFB68B] bg-transparent flex items-center justify-center gap-2 transition-colors hover:bg-[#FFB68B]/5 cursor-pointer">
            <Bell className="w-4 h-5 text-[#FFB68B]" />
            <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B]">
              Notify Me
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function QuestBoard() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      {/* ── PAGE HEADER ── */}
      <div className="px-6 md:px-16 pt-[100px] md:pt-[120px] pb-0">
        {/* "All quests" label */}
        <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B]">
          All quests
        </p>

        {/* THE QUEST BOARD. */}
        <h1 className="mt-7 uppercase font-sora font-extrabold text-[clamp(36px,5.5vw,80px)] leading-none tracking-[-3.2px] text-[#E5E2E3]">
          THE QUEST BOARD.
        </h1>

        {/* Filter bar border container */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-[36px] border-t border-b border-[#584235]">
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`cursor-pointer transition-colors duration-200 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] bg-transparent border-none p-0 ${
                  activeFilter === f ? "text-[#FFB68B]" : "text-[#E0C0AF]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-auto">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E0C0AF]">
              <Search className="w-[15px] h-[15px] text-[#E0C0AF]" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[256px] h-[34px] bg-[#1C1B1C] border-none border-b-2 border-[#584235] pl-[40px] font-mono font-bold text-[12px] leading-[16px] tracking-[1.2px] text-[#E0C0AF] outline-none"
            />
          </div>
        </div>
      </div>

      {/* ── ACTIVE QUEST CARDS ── */}
      <div className="px-6 md:px-16 mt-10 flex flex-col md:flex-row gap-[44px]">
        <div className="flex-1 flex">
          <Card1 />
        </div>
        <div className="flex-1 flex">
          <Card2 />
        </div>
      </div>

      {/* ── QUESTS CONQUERED ── */}
      <div className="px-6 md:px-16 mt-16 pb-16">
        {/* "Completed" label */}
        <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2]">
          Completed
        </p>

        {/* QUESTS CONQUERED. */}
        <h2 className="mt-7 uppercase font-sora font-bold text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.96px] text-[#E5E2E3]">
          QUESTS CONQUERED.
        </h2>

        {/* Past Quests List */}
        <div className="mt-8">
          {pastQuests
            .filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))
            .map((quest) => (
              <div
                key={quest.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-[25px] border-t border-[#584235]"
              >
                {/* Left: thumbnail + info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7">
                  {/* Thumbnail */}
                  <div className="relative shrink-0 overflow-hidden w-[96px] h-[64px] bg-white">
                    <Image
                      src={quest.image}
                      alt={quest.title}
                      fill
                      className="object-cover mix-blend-saturation"
                    />
                  </div>

                  {/* Title + meta */}
                  <div>
                    <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E5E2E3]">
                      {quest.title}
                    </p>
                    <p className="mt-1 font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
                      {quest.meta}
                    </p>
                  </div>
                </div>

                {/* Right: View Report link */}
                <a
                  href="#"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity self-start sm:self-auto"
                >
                  <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2]">
                    View Report
                  </span>
                  <ExternalLink className="w-[10.67px] h-[10.67px] text-[#FFF3D2]" />
                </a>
              </div>
            ))}

          {/* Bottom border of last row */}
          <div className="border-b border-[#584235]" />
        </div>
      </div>
    </div>
  );
}
