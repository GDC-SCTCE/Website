"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quest } from "@prisma/client";
import { useAuth } from "@/context/AuthContext";
import { useInView } from "@/hooks/useInView";
import { useCountdown } from "@/hooks/useCountdown";
import GDCPlaceholder from "@/components/GDCPlaceholder";

function LandingQuestTimer({ targetDate }: { targetDate: Date }) {
  const targetMs = new Date(targetDate).getTime();
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

export default function ActiveQuestsSection({ activeQuests, isAdmin = false }: { activeQuests: Quest[], isAdmin?: boolean }) {
  const { user, loading } = useAuth();
  const [currentQuestIdx, setCurrentQuestIdx] = useState(0);
  const { ref: jamRef, inView: jamVisible } = useInView(0.15);

  const currentQuest = activeQuests[currentQuestIdx];

  useEffect(() => {
    if (activeQuests.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentQuestIdx((prev) => (prev + 1) % activeQuests.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeQuests.length]);

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
          {activeQuests.length === 1 ? (
            <div key={currentQuest.id} className="animate-slide-right w-full flex flex-col items-center lg:items-end">
              <div className="w-[518.39px] max-w-full h-[699.33px] bg-[#201F20] border-2 border-[#FF7A00]/30 rounded-[8px] relative overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#FF7A00] hover:shadow-[#FF7A00]/10 group/jam-poster">
                <div className="absolute inset-[14px] rounded-[4px] overflow-hidden">
                  {currentQuest.image ? (
                    <Image
                      src={currentQuest.image}
                      alt={currentQuest.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover transition-transform duration-[8s] ease-out group-hover/jam-poster:scale-102"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1B] flex flex-col items-center justify-center border border-[#584235] relative">
                      <GDCPlaceholder textClassName="text-[120px]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Below poster: labels + progress */}
              <div className="mt-[16px] flex justify-between items-center w-[518.39px] max-w-full px-2">
                <span className="font-mono font-normal text-[11px] leading-[16px] tracking-[1.1px] text-[#E0C0AF]">
                  Registrations
                </span>
                <span className="font-mono font-bold text-[11px] leading-[16px] text-[#FF7A00]">
                  {currentQuest.seatsTaken} / {currentQuest.capacity}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-[8px] w-[502.39px] max-w-full h-[4px] bg-[#584235]/20 rounded-full overflow-hidden mx-auto lg:mx-0">
                <div
                  className="h-full bg-[#FF7A00] rounded-full transition-all duration-[1200ms] ease-out"
                  style={{ width: jamVisible ? `${Math.min(100, Math.round((currentQuest.seatsTaken / currentQuest.capacity) * 100))}%` : "0%" }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center lg:items-end select-none overflow-visible">
              <div 
                className="w-full h-[580px] relative flex items-center justify-center overflow-visible"
                style={{ perspective: "1200px" }}
              >
                {activeQuests.map((quest, idx) => {
                  let offset = idx - currentQuestIdx;
                  const total = activeQuests.length;
                  if (offset < -total / 2) offset += total;
                  if (offset > total / 2) offset -= total;

                  const isActive = offset === 0;
                  const isVisible = Math.abs(offset) <= 2 || total <= 3;

                  if (!isVisible) return null;

                  let zIndex = 30 - Math.abs(offset) * 10;
                  let opacity = 1;
                  if (Math.abs(offset) === 1) opacity = 0.65;
                  if (Math.abs(offset) > 1) opacity = 0;

                  let translateX = "0px";
                  let translateY = "0px";
                  let rotateY = "0deg";
                  let scale = 1;

                  if (offset !== 0) {
                    translateX = `${offset * 75}px`;
                    translateY = `10px`;
                    rotateY = `${offset * -20}deg`;
                    scale = 0.82;
                  }

                  return (
                    <div
                      key={quest.id}
                      onClick={() => setCurrentQuestIdx(idx)}
                      className={`absolute w-[360px] sm:w-[400px] max-w-[80vw] h-[500px] sm:h-[540px] bg-[#201F20] border-2 rounded-[8px] overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer ${
                        isActive
                          ? "border-[#FF7A00] shadow-[#FF7A00]/20"
                          : "border-[#FF7A00]/20 hover:border-[#FF7A00]/50 hover:opacity-90"
                      }`}
                      style={{
                        transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`,
                        zIndex,
                        opacity,
                        pointerEvents: "auto",
                      }}
                    >
                      <div className="absolute inset-[10px] rounded-[4px] overflow-hidden">
                        {quest.image ? (
                          <Image
                            src={quest.image}
                            alt={quest.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover"
                            draggable={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1A1A1B] flex flex-col items-center justify-center border border-[#584235] relative">
                            <GDCPlaceholder textClassName="text-[100px]" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dot Navigation */}
              <div className="flex items-center gap-3 mt-4 mb-2 justify-center w-full max-w-[400px] lg:mr-[50px]">
                {activeQuests.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                      currentQuestIdx === idx ? "w-8 bg-[#FF7A00]" : "w-2.5 bg-[#584235]/40 hover:bg-[#FF7A00]/40"
                    }`}
                    aria-label={`Go to quest ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Progress details */}
              <div className="w-full max-w-[400px] lg:mr-[50px] transition-all duration-300">
                <div className="mt-[16px] flex justify-between items-center w-full px-2">
                  <span className="font-mono font-normal text-[11px] leading-[16px] tracking-[1.1px] text-[#E0C0AF]">
                    Registrations
                  </span>
                  <span className="font-mono font-bold text-[11px] leading-[16px] text-[#FF7A00]">
                    {currentQuest.seatsTaken} / {currentQuest.capacity}
                  </span>
                </div>
                <div className="mt-[8px] w-full h-[4px] bg-[#584235]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF7A00] rounded-full transition-all duration-[800ms] ease-out"
                    style={{ width: `${Math.min(100, Math.round((currentQuest.seatsTaken / currentQuest.capacity) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
