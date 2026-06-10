"use client";

import React, { useState } from "react";
import Avatar from "@/components/Avatar";

type Department = "ALL" | "DESIGN" | "TECH" | "MEDIA" | "COMMUNITY" | "EVENT" | "MARKETING" | "E-SPORTS";

const filters: Department[] = ["ALL", "DESIGN", "TECH", "MEDIA", "COMMUNITY", "EVENT", "MARKETING", "E-SPORTS"];



// ── Stat bar row ──
function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-[16px] h-[22px] relative">
      <div className="flex justify-between h-[15px] items-center mb-[4px]">
        <span className="font-mono text-[10px] leading-[15px] text-[#E0C0AF] uppercase">
          {label}
        </span>
        <span className="font-mono text-[10px] leading-[15px] text-[#E0C0AF]">
          {value}
        </span>
      </div>
      {/* Track */}
      <div className="relative h-[3px] bg-white/10">
        {/* Fill */}
        <div
          style={{ width: `${value}%` }}
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#FF7A00] to-[#FDD400] shadow-[0px_0px_10px_rgba(255,122,0,0.6)]"
        />
      </div>
    </div>
  );
}

// ── Leader featured card ──
function LeaderCard({ member, isFirst }: { member: any; isFirst: boolean }) {
  const cardWidth = isFirst ? "lg:w-[632px]" : "lg:w-[617px]";
  const photoWidth = isFirst ? "lg:w-[316px]" : "lg:w-[308.5px]";
  const photoHeight = isFirst ? "lg:h-[316px]" : "lg:h-[308.5px]";
  const photoTop = isFirst ? "lg:top-[118.5px]" : "lg:top-[122.25px]";
  const infoLeft = isFirst ? "lg:left-[316px]" : "lg:left-[308.5px]";
  const infoWidth = isFirst ? "lg:w-[316px]" : "lg:w-[308.5px]";

  return (
    <div
      className={`w-full ${cardWidth} h-auto lg:h-[553px] bg-[#1C1B1C] border border-[#201F20] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,122,0,0.15)] hover:border-[#FF7A00] shrink-0 flex flex-col lg:flex-row relative`}
    >
      {/* Left: Photo container */}
      <div
        className={`w-full ${photoWidth} aspect-square ${photoHeight} lg:absolute lg:left-0 ${photoTop} overflow-hidden`}
      >
        {/* Horizontal Divider */}
        <div
          className="absolute w-full h-[2px] left-0 top-0 bg-gradient-to-r from-[#FF7A00] to-transparent z-10"
        />
        <div className="w-full h-full">
          {member.avatarSeed && (member.avatarSeed.startsWith('http') || member.avatarSeed.includes('.')) ? (
             <img src={member.avatarSeed} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar name={member.name} size={300} />
          )}
        </div>
      </div>

      {/* Right: Info container */}
      <div
        className={`w-full ${infoWidth} h-auto lg:h-[553px] lg:absolute ${infoLeft} lg:top-0 bg-gradient-to-br from-[#1C1B1C] to-black p-6 lg:p-[81px_32px_32px] flex flex-col`}
      >
        {/* Party Leader Badge */}
        <div className="flex items-center gap-[8px] mb-[8px]">
          <span className="w-[9.33px] h-[12.25px] bg-[#FDD400] inline-block" />
          <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FDD400]">
            PARTY LEADER
          </span>
        </div>

        {/* Name */}
        <h2 className="font-sora font-bold text-[32px] sm:text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0 mb-[8px] break-words whitespace-normal">
          {member.name}
        </h2>

        {/* Role */}
        <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FF7A00] m-0 mb-[32px]">
          {member.role.toUpperCase()}
        </p>

        {/* Stats */}
        {member.stats && (
          <div className="mb-[20px]">
            {member.stats.map((s: any) => (
              <StatBar key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}

        {/* Game preview panel */}
        {member.gamePreview && (
          <div className="bg-[#353436]/30 p-[12px] flex gap-[16px] items-center mt-auto h-[87px] box-border">
            {/* Play Button Thumbnail */}
            <div className="w-[80px] h-[48px] bg-[#FF7A00]/10 border border-[#584235] shrink-0 flex items-center justify-center cursor-pointer hover:bg-[#FF7A00]/25 transition-all duration-200">
              <span className="font-mono text-[10px] text-[#FF7A00] font-bold">
                ▶ PLAY
              </span>
            </div>
            <div>
              <p className="font-mono text-[10px] leading-[15px] text-[#E0C0AF] opacity-60 m-0 mb-[2px]">
                {member.gamePreview.label}
              </p>
              <p className="font-sora font-bold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#FF7A00] m-0">
                {member.gamePreview.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Regular member card ──
function MemberCard({ member }: { member: any }) {
  return (
    <div className="w-full max-w-[270px] h-[376px] bg-[#1C1B1C] border border-transparent transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.6)] hover:border-[#FF7A00] relative shrink-0 box-border mx-auto">
      {/* Orange gradient top divider */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white to-transparent z-10" />
      {/* Photo container */}
      <div className="w-full h-[300px] relative overflow-hidden">
        {member.avatarSeed && (member.avatarSeed.startsWith('http') || member.avatarSeed.includes('.')) ? (
             <img src={member.avatarSeed} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <Avatar name={member.name} size={100} />
        )}
      </div>
      {/* Info strip container */}
      <div className="absolute w-full h-[74px] left-0 top-[300px] bg-gradient-to-t from-black to-transparent p-[15px_16px] box-border">
        {/* Name */}
        <h3 className="font-sora font-normal text-[20px] leading-[30px] uppercase text-[#E5E2E3] m-0 white-space-nowrap overflow-hidden text-ellipsis">
          {member.name}
        </h3>
        {/* Role */}
        <p className="font-mono font-bold text-[10px] leading-[15px] tracking-[1px] uppercase text-[#FF7A00] m-0">
          {member.role.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

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
