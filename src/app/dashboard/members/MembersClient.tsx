"use client";

import React, { useState, useEffect } from "react";
import Avatar from "@/components/Avatar";

import { Department, filters } from "./types";
import { LeaderCard } from "./components/LeaderCard";
import { MemberCard } from "./components/MemberCard";

// ── PAGE ──
export default function MembersClient({ initialMembers }: { initialMembers: any[] }) {
  const [activeFilter, setActiveFilter] = useState<Department>("ALL");
  const [mounted, setMounted] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setGridVisible(true), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleFilterChange = (f: Department) => {
    if (f === activeFilter) return;
    setGridVisible(false);
    setTimeout(() => {
      setActiveFilter(f);
      setTimeout(() => {
        setGridVisible(true);
      }, 60);
    }, 220);
  };

  const leads = initialMembers.filter((m) => m.department === "ALL");
  const members = initialMembers.filter((m) => m.department !== "ALL");

  const filteredMembers =
    activeFilter === "ALL" // In case the activeFilter defaults to ALL initially
      ? members
      : members.filter((m) => m.department === activeFilter);

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* ── PAGE HEADER ── */}
        <div className="pt-[60px] md:pt-[100px] px-6 md:px-8 xl:px-16 pb-0">
          {/* Section label */}
          <div
            className="flex items-center gap-0 mb-[28px] transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div className="w-[32px] h-[2px] bg-[#FF7A00] mr-[8px]" />
            <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FF7A00]">
              MEET THE CLUB
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-sora font-extrabold text-[40px] md:text-[80px] leading-[48px] md:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0 mb-[40px] md:mb-[60px] transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            MEET THE <span className="text-[#FF7A00]">GANG</span>.
          </h1>

        </div>

        {/* ── LEADER CARDS ── */}
        <div className="px-6 md:px-8 xl:px-16 mt-[40px] flex flex-col lg:flex-row gap-[32px] xl:gap-[57px] items-center lg:items-start">
          {leads.map((lead, idx) => (
            <LeaderCard key={lead.id} member={lead} isFirst={idx === 0} delay={idx * 150} visible={mounted} />
          ))}
        </div>

        {/* ── EVERYONE BUILDING ── */}
        <div className="pt-24 md:pt-32 px-6 md:px-8 xl:px-16 pb-0">
          <h2
            className="font-sora font-bold text-[32px] md:text-[48px] leading-[40px] md:leading-[53px] tracking-[-2.4px] uppercase text-[#E5E2E3] m-0 mb-[30px] md:mb-[40px] transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "150ms",
            }}
          >
            EVERYONE BUILDING.
          </h2>

          {/* Filter row */}
          <div
            className="pb-[60px] md:pb-[80px] transition-all duration-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "250ms",
            }}
          >
            <div className="flex items-center gap-[12px] flex-wrap">
              {filters.map((f) => {
                const isActive = activeFilter === f;
                // Fluid padding instead of hardcoded width
                if (f === "ALL") return null; // "ALL" is now reserved for Campus Leads at the top
                return (
                  <button
                    key={f}
                    onClick={() => handleFilterChange(f)}
                    className={`h-[30px] border-none font-mono text-[12px] leading-[12px] tracking-[1.2px] cursor-pointer transition-all duration-200 text-center px-4 ${
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
        <div className="px-6 md:px-8 xl:px-16 pb-[80px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[40px_20px] lg:gap-[80px_20px] justify-items-center sm:justify-items-start justify-between">
          {filteredMembers.map((member, idx) => (
            <MemberCard key={member.id} member={member} delay={idx * 60} visible={gridVisible} />
          ))}
          {filteredMembers.length === 0 && (
            <div
              className="col-span-full py-[80px] text-center transition-opacity duration-300"
              style={{ opacity: gridVisible ? 1 : 0 }}
            >
              <p className="font-mono text-[12px] tracking-[1.2px] text-[#584235]">
                NO MEMBERS IN THIS DEPARTMENT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
