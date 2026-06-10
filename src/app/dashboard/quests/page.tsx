"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGameForge } from "@/context/GameForgeContext";
import { Search, ExternalLink } from "lucide-react";

import { CARD1_TARGET_MS, CARD2_TARGET_MS, filters, pastQuests } from "./constants";
import { QuestCard } from "./components/QuestCard";

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function QuestBoard() {
  const { user } = useGameForge();
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
          <QuestCard
            user={user}
            imageSrc="/quest_cyberpunk_level.png"
            imageAlt="Cyberpunk Level Design Workshop"
            title="Cyberpunk Level Design"
            subtitle="May 14-16 · Virtual"
            targetMs={CARD1_TARGET_MS}
            isUpcoming={false}
            seatsTaken={12}
            seatsTotal={50}
            progressPct={(12 / 50) * 100}
          />
        </div>
        <div className="flex-1 flex">
          <QuestCard
            user={user}
            imageSrc="/quest_sound_design.png"
            imageAlt="Sound Design Masterclass"
            title="Sound Design Masterclass"
            subtitle="June 02 · Main Hall"
            targetMs={CARD2_TARGET_MS}
            isUpcoming={true}
            seatsTaken={0}
            seatsTotal={30}
          />
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
