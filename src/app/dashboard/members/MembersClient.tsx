"use client";

import React, { useState } from "react";
import Avatar from "@/components/Avatar";

import { Department, filters } from "./types";
import { LeaderCard } from "./components/LeaderCard";
import { MemberCard } from "./components/MemberCard";

// ── PAGE ──
export default function MembersClient({ initialMembers }: { initialMembers: any[] }) {
  const [activeFilter, setActiveFilter] = useState<Department>("ALL");

  const leads = initialMembers.filter((m) => m.isLead);
  const members = initialMembers.filter((m) => !m.isLead);

  const filteredMembers =
    activeFilter === "ALL"
      ? members
      : members.filter((m) => m.department === activeFilter);

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      {/* ── PAGE HEADER ── */}
      <div className="pt-[60px] md:pt-[100px] px-6 md:px-16 pb-0">
        {/* Section label */}
        <div className="flex items-center gap-0 mb-[28px]">
          <div className="w-[32px] h-[2px] bg-[#FF7A00] mr-[8px]" />
          <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FF7A00]">
            MEET THE CLUB
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-sora font-extrabold text-[40px] md:text-[80px] leading-[48px] md:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0 mb-[40px] md:mb-[60px]">
          MEET THE <span className="text-[#FF7A00]">GANG</span>.
        </h1>

      </div>

      {/* ── LEADER CARDS ── */}
      <div className="px-6 md:px-16 mt-[40px] flex flex-col lg:flex-row gap-[57px] items-center lg:items-start">
        {leads.map((lead, idx) => (
          <LeaderCard key={lead.id} member={lead} isFirst={idx === 0} />
        ))}
      </div>

      {/* ── EVERYONE BUILDING ── */}
      <div className="pt-[100px] md:pt-[156px] px-6 md:px-16 pb-0">
        <h2 className="font-sora font-bold text-[32px] md:text-[48px] leading-[40px] md:leading-[53px] tracking-[-2.4px] uppercase text-[#E5E2E3] m-0 mb-[30px] md:mb-[40px]">
          EVERYONE BUILDING.
        </h2>

        {/* Filter row */}
        <div className="pb-[60px] md:pb-[80px]">
          <div className="flex items-center gap-[12px] flex-wrap">
            {filters.map((f) => {
              const isActive = activeFilter === f;
              // Specific width mapping matching Figma specs
              const widthMap: Record<Department, string> = {
                ALL: "w-[73.2px]",
                DESIGN: "w-[98px]",
                TECH: "w-[81px]",
                MEDIA: "w-[89px]",
                COMMUNITY: "w-[123px]",
                EVENT: "w-[89px]",
                MARKETING: "w-[123px]",
                "E-SPORTS": "w-[114px]",
              };
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`h-[30px] border-none font-mono text-[12px] leading-[12px] tracking-[1.2px] cursor-pointer transition-all duration-200 text-center px-0 ${widthMap[f]} ${
                    isActive
                      ? "bg-[#FF7A00] text-[#5C2800] font-semibold"
                      : "bg-[#2A2A2B] border-b-2 border-[#584235] text-[#E0C0AF] font-bold hover:bg-[#3e3e40] hover:border-b-[#FF7A00] hover:text-white"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MEMBER CARDS GRID ── */}
      <div className="px-6 md:px-16 pb-[80px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[80px_20px] justify-between">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
        {filteredMembers.length === 0 && (
          <div className="col-span-full py-[80px] text-center">
            <p className="font-mono text-[12px] tracking-[1.2px] text-[#584235]">
              NO MEMBERS IN THIS DEPARTMENT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
