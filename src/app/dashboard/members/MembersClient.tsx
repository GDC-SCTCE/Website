"use client";

import React, { useState, useEffect, useRef } from "react";
import Avatar from "@/components/Avatar";

import { Department } from "@/types";
import { LeaderCard } from "./components/LeaderCard";
import { MemberCard } from "./components/MemberCard";
import DepartmentFilter from "@/components/DepartmentFilter";
import { StatBar } from "./components/StatBar";

import { LeadersDynamicSkeleton, MembersGridDynamicSkeleton } from "./components/MembersDynamicSkeleton";

// ── DYNAMIC LEADERS CONTENT ──
function DynamicLeadersContent({
  membersPromise,
  mounted,
  handleMemberClick,
}: {
  membersPromise: Promise<any[]>;
  mounted: boolean;
  handleMemberClick: (member: any, event: React.MouseEvent) => void;
}) {
  const initialMembers = React.use(membersPromise);
  const leads = initialMembers.filter((m: any) => m.department === "ALL");

  return (
    <div className="px-6 md:px-8 xl:px-16 mt-[40px] flex flex-col lg:flex-row gap-[32px] xl:gap-[57px] items-center lg:items-start">
      {leads.map((lead: any, idx: number) => (
        <LeaderCard 
          key={lead.id} 
          member={lead} 
          delay={idx * 150} 
          visible={mounted} 
          onClick={(e) => handleMemberClick(lead, e)} 
        />
      ))}
    </div>
  );
}

// ── DYNAMIC MEMBERS GRID ──
function DynamicMembersGrid({
  membersPromise,
  activeFilter,
  gridVisible,
  handleMemberClick,
}: {
  membersPromise: Promise<any[]>;
  activeFilter: Department;
  gridVisible: boolean;
  handleMemberClick: (member: any, event: React.MouseEvent) => void;
}) {
  const initialMembers = React.use(membersPromise);
  const members = initialMembers.filter((m: any) => m.department !== "ALL");
  const filteredMembers =
    activeFilter === "ALL"
      ? members
      : members.filter((m: any) => m.department === activeFilter);

  return (
    <div className="px-6 md:px-8 xl:px-16 pb-[80px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[40px_20px] lg:gap-[80px_20px] justify-items-center sm:justify-items-start justify-between">
      {filteredMembers.map((member: any, idx: number) => (
        <MemberCard 
          key={member.id} 
          member={member} 
          delay={idx * 60} 
          visible={gridVisible} 
          onClick={(e) => handleMemberClick(member, e)} 
        />
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
  );
}

// ── PAGE ──
export default function MembersClient({ membersPromise }: { membersPromise: Promise<any[]> }) {
  const [activeFilter, setActiveFilter] = useState<Department>("ALL");
  const [mounted, setMounted] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [clickedRect, setClickedRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setGridVisible(true), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Handle member card selection (saves the source card's layout metrics)
  const handleMemberClick = (member: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setClickedRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setSelectedMember(member);
  };

  // Helper to calculate the morph transform from the clicked card to the modal's center stage
  const getMorphTransform = (modalElement: HTMLElement) => {
    if (!clickedRect) return "none";
    const finalRect = modalElement.getBoundingClientRect();
    const scaleX = clickedRect.width / finalRect.width;
    const scaleY = clickedRect.height / finalRect.height;
    const translateX = (clickedRect.left + clickedRect.width / 2) - (finalRect.left + finalRect.width / 2);
    const translateY = (clickedRect.top + clickedRect.height / 2) - (finalRect.top + finalRect.height / 2);
    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
  };

  // Close animation with fluid morph reverse FLIP transition
  const handleClose = () => {
    if (!modalRef.current || !clickedRect || !overlayRef.current) {
      setSelectedMember(null);
      return;
    }
    const modalElement = modalRef.current;
    const overlayElement = overlayRef.current;

    // Animate card back to original position
    modalElement.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
    modalElement.style.transform = getMorphTransform(modalElement);
    modalElement.style.opacity = "0";

    // Animate overlay blur and opacity out
    overlayElement.style.transition = "opacity 0.3s ease, backdrop-filter 0.3s ease";
    overlayElement.style.opacity = "0";
    overlayElement.style.backdropFilter = "blur(0px)";

    const onTransitionEnd = () => {
      setSelectedMember(null);
    };
    modalElement.addEventListener("transitionend", onTransitionEnd, { once: true });
  };

  // Opening animation (morph FLIP zoom from clicked card to center stage)
  useEffect(() => {
    if (!selectedMember || !clickedRect || !modalRef.current || !overlayRef.current) return;

    const modalElement = modalRef.current;
    const overlayElement = overlayRef.current;

    // 1. Set starting position (shrink to original card size/position)
    modalElement.style.transition = "none";
    modalElement.style.transform = getMorphTransform(modalElement);
    modalElement.style.transformOrigin = "center center";
    modalElement.style.opacity = "0.5";

    // Set starting position for overlay (hidden and unblurred)
    overlayElement.style.transition = "none";
    overlayElement.style.opacity = "0";
    overlayElement.style.backdropFilter = "blur(0px)";

    // 4. Trigger reflow to apply the initial styles instantly
    modalElement.offsetHeight;

    // 5. Animate to full size center stage
    modalElement.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    modalElement.style.transform = "translate(0, 0) scale(1)";
    modalElement.style.opacity = "1";

    // Smoothly fade-in and blur the overlay
    overlayElement.style.transition = "opacity 0.4s ease, backdrop-filter 0.4s ease";
    overlayElement.style.opacity = "1";
    overlayElement.style.backdropFilter = "blur(12px)";
  }, [selectedMember, clickedRect]);

  // Escape listener registered only when a member dialog is open
  useEffect(() => {
    if (!selectedMember) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember, clickedRect]);

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
            className={`font-sora font-extrabold text-[40px] md:text-[80px] leading-[48px] md:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0 mb-[40px] md:mb-[60px] transition-all duration-700 ${
              mounted ? "animate-glitch" : ""
            }`}
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
        <React.Suspense fallback={<LeadersDynamicSkeleton />}>
          <DynamicLeadersContent 
            membersPromise={membersPromise} 
            mounted={mounted} 
            handleMemberClick={handleMemberClick} 
          />
        </React.Suspense>

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
            <DepartmentFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* ── MEMBER CARDS GRID ── */}
        <React.Suspense fallback={<MembersGridDynamicSkeleton />}>
          <DynamicMembersGrid 
            membersPromise={membersPromise} 
            activeFilter={activeFilter} 
            gridVisible={gridVisible} 
            handleMemberClick={handleMemberClick} 
          />
        </React.Suspense>
      </div>

      {/* ── MEMBER DETAIL DIALOG (MODAL) ── */}
      {selectedMember && (
        <div 
          ref={overlayRef}
          onClick={handleClose}
          className="fixed inset-0 z-[250] bg-black/80 flex items-center justify-center p-4"
        >
          {/* Modal Card */}
          <div 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1C1B1C] border border-[#201F20] relative w-full max-w-[680px] shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-none"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-[#E5E2E3] hover:text-[#FF7A00] transition-colors duration-200 z-50 p-2 cursor-pointer bg-black/40 hover:bg-black/80 rounded-none border border-transparent hover:border-[#FF7A00]/50"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Avatar/Image container */}
            <div className="w-full md:w-[280px] shrink-0 bg-[#131314] relative flex items-center justify-center aspect-square md:aspect-auto md:h-[450px]">
              {selectedMember.avatar ? (
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="scale-75 md:scale-100">
                  <Avatar name={selectedMember.name} size={200} />
                </div>
              )}
              {/* Highlight divider line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7A00] to-transparent z-20" />
            </div>

            {/* Right: Info details */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between h-full bg-[#1C1B1C] relative">
              <div>
                {/* Department badge */}
                <div className="flex items-center gap-[8px] mb-[8px]">
                  <span className={`w-[8px] h-[8px] inline-block ${selectedMember.department === 'ALL' ? 'bg-[#FDD400]' : 'bg-[#FF7A00]'}`} />
                  <span className={`font-mono font-bold text-[10px] leading-[10px] tracking-[1.2px] uppercase ${selectedMember.department === 'ALL' ? 'text-[#FDD400]' : 'text-[#FF7A00]'}`}>
                    {selectedMember.department === 'ALL' ? 'CORE LEAD' : `${selectedMember.department} DIVISION`}
                  </span>
                </div>

                {/* Name */}
                <h2 className="font-sora font-extrabold text-[28px] md:text-[36px] leading-[1.1] tracking-[-1.2px] uppercase text-[#E5E2E3] m-0 mb-[6px]">
                  {selectedMember.name}
                </h2>

                {/* Role */}
                <p className="font-mono font-semibold text-[11px] leading-[11px] tracking-[1px] text-[#E0C0AF] opacity-80 uppercase m-0 mb-[24px]">
                  {selectedMember.role}
                </p>

                {/* Stats */}
                {selectedMember.stats && Array.isArray(selectedMember.stats) && selectedMember.stats.length > 0 && (
                  <div className="mb-[24px]">
                    <p className="font-mono font-bold text-[10px] tracking-[1px] text-[#584235] uppercase mb-[12px]">
                      CHARACTER ATTRIBUTES
                    </p>
                    <div className="w-full max-w-[320px]">
                      {selectedMember.stats.map((s: any) => (
                        <StatBar key={s.label} label={s.label} value={s.value} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Signature Game */}
              {selectedMember.gamePreview && selectedMember.gamePreview.title && (
                <div className="bg-[#353436]/20 border border-[#353436]/40 p-[12px] flex gap-[12px] items-center mt-auto w-full">
                  <div className="w-[64px] h-[38px] bg-[#FF7A00]/10 border border-[#584235]/60 shrink-0 flex items-center justify-center overflow-hidden relative">
                    {selectedMember.gamePreview.image ? (
                      <img
                        src={selectedMember.gamePreview.image}
                        alt={selectedMember.gamePreview.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-[8px] text-[#FF7A00] font-bold">
                        ▶ PLAY
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[8px] leading-[10px] text-[#E0C0AF] opacity-60 m-0 mb-[2px] uppercase tracking-[0.5px]">
                      SIGNATURE GAME
                    </p>
                    <p className="font-sora font-bold text-[12px] leading-[16px] text-[#FF7A00] m-0 truncate">
                      {selectedMember.gamePreview.title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
