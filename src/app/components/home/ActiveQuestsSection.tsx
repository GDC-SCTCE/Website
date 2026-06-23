"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Quest } from "@prisma/client";
import { useAuth } from "@/context/AuthContext";
import { useInView } from "@/hooks/useInView";
import { useCountdown } from "@/hooks/useCountdown";
import { checkIsAdminEmail } from "@/actions/authActions";
import ActiveQuestsCarousel from "./ActiveQuestsCarousel";

function LandingQuestTimer({ targetDate }: { targetDate: Date }) {
  const targetMs = targetDate ? new Date(targetDate).getTime() : 0;
  const countdown = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      <p className="font-mono font-normal text-[10px] leading-[15px] text-[#A78B7C] uppercase mb-[12px]">
        Countdown
      </p>
      <p className="font-mono font-bold text-[24px] leading-[32px] text-[#FF7A00] animate-pulse">
        {pad(countdown.d)}d : {pad(countdown.h)}h : {pad(countdown.m)}m
      </p>
    </div>
  );
}

export default function ActiveQuestsSection({ activeQuestsPromise }: { activeQuestsPromise: Promise<Quest[]> }) {
  const activeQuests = use(activeQuestsPromise);
  
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(true); // Default true to hide initially
  const [currentQuestIdx, setCurrentQuestIdx] = useState(0);
  const { ref: jamRef, inView: jamVisible } = useInView(0.15);

  useEffect(() => {
    if (user?.email) {
      checkIsAdminEmail(user.email).then(setIsAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const currentQuest = activeQuests[currentQuestIdx];

  useEffect(() => {
    if (activeQuests.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentQuestIdx((prev) => (prev + 1) % activeQuests.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeQuests.length, currentQuestIdx]);

  if (activeQuests.length === 0 || !currentQuest) return null;

  return (
    <section
      ref={jamRef}
      id="jam"
      className="bg-[#1C1B1C] border-b border-[#584235]/30 py-[96px] px-0 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
        {/* Left */}
        <div
          className="px-6 md:pl-[80px] max-w-[633.59px] text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0 transition-all duration-700 ease-out"
          style={{
            opacity: jamVisible ? 1 : 0,
            transform: jamVisible ? "translateX(0)" : "translateX(-40px)",
          }}
        >
          <div key={currentQuest.id} className="animate-slide-left w-full flex flex-col items-center lg:items-start">
            <p className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFE170] uppercase mb-[16px]">
              NEXT QUEST
            </p>
            <h2 className="font-sora font-normal text-[clamp(36px,4.17vw,60px)] leading-[48px] md:leading-[60px] text-[#E5E2E3] mb-[40px]">
              {currentQuest.title}
            </h2>

            {/* Date + Countdown row */}
            <div className="flex gap-[48px] mb-[48px] justify-center lg:justify-start">
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] text-[#A78B7C] uppercase mb-[12px]">
                  Date
                </p>
                <p className="font-sora font-normal text-[20px] leading-[28px] text-[#E5E2E3]">
                  {currentQuest.dateText}
                </p>
              </div>
              {currentQuest.targetDate && (
                <LandingQuestTimer targetDate={currentQuest.targetDate} />
              )}
            </div>

            {!isAdmin && (
              <Link href={!loading && user ? `/dashboard/quests?open=${currentQuest.id}` : `/onboarding?redirect=${encodeURIComponent('/dashboard/quests?open=' + currentQuest.id)}`}>
                <button className="bg-[#FF7A00] w-[213.61px] h-[60px] font-mono font-semibold text-[14px] leading-[20px] tracking-[1.4px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-300 relative overflow-hidden group/btn-jam shadow-lg hover:shadow-[#FF7A00]/20">
                  <span className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn-jam:translate-x-[300%] transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">ACCEPT QUEST →</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Right: Carousel Poster / 3D revolving deck */}
        <div
          className="flex flex-col items-center lg:items-end mx-auto lg:mx-0 lg:ml-auto w-[518.39px] max-w-full transition-all duration-700 ease-out"
          style={{
            opacity: jamVisible ? 1 : 0,
            transform: jamVisible ? "translateX(0)" : "translateX(40px)",
            transitionDelay: "150ms",
          }}
        >
          <ActiveQuestsCarousel 
            activeQuests={activeQuests}
            currentQuestIdx={currentQuestIdx}
            setCurrentQuestIdx={setCurrentQuestIdx}
            jamVisible={jamVisible}
          />
        </div>
      </div>
    </section>
  );
}
