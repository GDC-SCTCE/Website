
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useGameForge } from "@/context/GameForgeContext";
import { Search, ExternalLink } from "lucide-react";

import { CARD1_TARGET_MS, CARD2_TARGET_MS, filters, pastQuests } from "./constants";
import { QuestCard } from "./components/QuestCard";

// ─── Intersection Observer Hook ──────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ──────────────────────────────────────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────────────────────────────────────
export default function QuestBoard() {
  const { user } = useGameForge();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  // Observer ref for the past conquered quests section
  const { ref: pastRef, inView: pastVisible } = useInView(0.15);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* ── PAGE HEADER ── */}
        <div className="px-6 md:px-8 xl:px-16 pt-24 md:pt-32 pb-0">
        {/* "All quests" label */}
        <p
          className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B] transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
          }}
        >
          All quests
        </p>

        {/* THE QUEST BOARD. */}
        <h1
          className="mt-7 uppercase font-sora font-extrabold text-[clamp(36px,5.5vw,80px)] leading-none tracking-[-3.2px] text-[#E5E2E3] transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "100ms",
          }}
        >
          THE QUEST BOARD.
        </h1>

        {/* Filter bar border container */}
        <div
          className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-[36px] border-t border-b border-[#584235] transition-all duration-500"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "200ms",
          }}
        >
          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`cursor-pointer transition-colors duration-200 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] bg-transparent border-none p-0 ${activeFilter === f ? "text-[#FFB68B]" : "text-[#E0C0AF] hover:text-[#FFB68B]"
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
              className="w-full md:w-[256px] h-[34px] bg-[#1C1B1C] border-none border-b-2 border-[#584235] pl-[40px] font-mono font-bold text-[12px] leading-[16px] tracking-[1.2px] text-[#E0C0AF] outline-none transition-colors duration-200 focus:border-[#FFB68B]"
            />
          </div>
        </div>
      </div>

      {/* ── ACTIVE QUEST CARDS ── */}
      <div className="px-6 md:px-8 xl:px-16 mt-10 flex flex-col md:flex-row gap-[44px]">
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
            delay={100}
            visible={mounted}
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
            delay={250}
            visible={mounted}
          />
        </div>
      </div>

      {/* ── QUESTS CONQUERED ── */}
      <div ref={pastRef} className="px-6 md:px-16 mt-16 pb-16">
        {/* "Completed" label */}
        <p
          className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2] transition-all duration-700"
          style={{
            opacity: pastVisible ? 1 : 0,
            transform: pastVisible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          Completed
        </p>

        {/* QUESTS CONQUERED. */}
        <h2
          className="mt-7 uppercase font-sora font-bold text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.96px] text-[#E5E2E3] transition-all duration-700"
          style={{
            opacity: pastVisible ? 1 : 0,
            transform: pastVisible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "100ms",
          }}
        >
          QUESTS CONQUERED.
        </h2>

        {/* Past Quests List */}
        <div
          className="mt-8 transition-all duration-700"
          style={{
            opacity: pastVisible ? 1 : 0,
            transitionDelay: "200ms",
          }}
        >
          {pastQuests
            .filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))
            .map((quest, idx) => (
              <div
                key={quest.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-[25px] border-t border-[#584235] transition-all duration-300 hover:bg-[#201F20]/30 hover:px-4 group cursor-pointer"
                style={{
                  opacity: pastVisible ? 1 : 0,
                  transform: pastVisible ? "translateX(0)" : "translateX(-24px)",
                  transition: "all 0.6s ease",
                  transitionDelay: `${idx * 80}ms`,
                }}
              >
                {/* Left: thumbnail + info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7">
                  {/* Thumbnail */}
                  <div className="relative shrink-0 overflow-hidden w-[96px] h-[64px] bg-white transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={quest.image}
                      alt={quest.title}
                      fill
                      sizes="96px"
                      className="object-cover mix-blend-saturation group-hover:mix-blend-normal transition-all duration-300"
                    />
                  </div>

                  {/* Title + meta */}
                  <div>
                    <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E5E2E3] transition-colors duration-200 group-hover:text-[#FFB68B]">
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
                  className="flex items-center gap-2 hover:opacity-100 transition-all duration-200 self-start sm:self-auto group/report"
                >
                  <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2] group-hover:text-[#FFB68B] transition-colors duration-200">
                    View Report
                  </span>
                  <ExternalLink className="w-[10.67px] h-[10.67px] text-[#FFF3D2] group-hover:text-[#FFB68B] group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            ))}

          {/* Bottom border of last row */}
          <div className="border-b border-[#584235]" />
        </div>
      </div>
      </div>
    </div>
  );
}
