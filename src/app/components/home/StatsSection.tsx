"use client";

import React from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { value: "847", label: "Members", textColor: "text-[#FF7A00]" },
  { value: "156", label: "Links Up", textColor: "text-[#E9C400]" },
  { value: "12K", label: "In Game", textColor: "text-[#FF7A00]" },
  { value: "2,340", label: "First Base", textColor: "text-[#E9C400]" },
];

export default function StatsSection() {
  const { ref: statsRef, inView: statsVisible } = useInView(0.15);
  const { user, loading } = useAuth();

  return (
    <section
      ref={statsRef}
      className="max-w-[1280px] mx-auto px-4 md:px-0 pb-[96px] pt-[48px] overflow-hidden"
      id="meets"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
        {/* Left */}
        <div
          className="px-6 md:pl-[80px] md:pr-[64px] text-center lg:text-left flex flex-col items-center lg:items-start transition-all duration-700 ease-out"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateX(0)" : "translateX(-40px)",
          }}
        >
          <p className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FDD400] uppercase mb-[16px]">
            LIVE
          </p>
          <h2 className="font-sora font-bold text-[clamp(32px,3.33vw,48px)] leading-[53px] tracking-[-0.96px] text-[#E5E2E3] mb-[24px]">
            The collective keeps growing.
          </h2>
          <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] max-w-[448px] mb-[40px]">
            Real-time metrics from our distributed global network of creators and players.
          </p>
          <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
            <button className="bg-[#FDD400] w-[130.41px] h-[44px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#6F5C00] border-none rounded-[2px] cursor-pointer hover:brightness-110 transition-all duration-200 shadow-md hover:shadow-[#FDD400]/20">
              {!loading && user ? "Dashboard" : "Enlist"}
            </button>
          </Link>
        </div>

        {/* Right: 2×2 Stats grid */}
        <div
          className="border-t lg:border-t-0 lg:border-l border-[#584235]/30 grid grid-cols-2 transition-all duration-700 ease-out"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateX(0)" : "translateX(40px)",
            transitionDelay: "150ms",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 md:p-[48px] transition-all duration-300 hover:bg-[#201F20]/40 group/stat ${
                i % 2 === 0 ? "border-r border-[#584235]/30" : ""
              } ${i < 2 ? "border-b border-[#584235]/30" : ""}`}
            >
              <p
                className={`font-sora font-normal text-[48px] leading-[48px] mb-[8px] transition-all duration-300 group-hover/stat:scale-105 ${s.textColor}`}
              >
                {s.value}
              </p>
              <p className="font-mono font-normal text-[14px] leading-[21px] text-[#A78B7C] uppercase transition-colors duration-300 group-hover/stat:text-[#E0C0AF]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
