"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCountdown } from "@/hooks/useCountdown";
import { Bell } from "lucide-react";
import { Quest } from "@/types";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { QuestDetailsModal } from "./QuestDetailsModal";

export interface QuestCardProps {
  quest: Quest;
  user: any; // Using any for simplicity as per original
  isAdmin?: boolean;
  delay?: number;
  visible?: boolean;
}

export function QuestCard({
  quest,
  user,
  isAdmin = false,
  delay = 0,
  visible = true,
}: QuestCardProps) {
  const router = useRouter();
  const isUpcoming = quest.status === "UPCOMING";
  const imageAlt = quest.title;
  const targetMs = quest.targetDate ? new Date(quest.targetDate).getTime() : Date.now();
  const seatsTaken = quest.seatsTaken || 0;
  const seatsTotal = quest.capacity || 30;
  const progressPct = seatsTotal > 0 ? (seatsTaken / seatsTotal) * 100 : 0;
  const timer = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");

  const [showDetails, setShowDetails] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(() => {
    if (quest.registrations && quest.registrations.length > 0) {
      const regStatus = quest.registrations[0].status;
      if (regStatus === "PENDING") return "PENDING APPROVAL";
      if (regStatus === "REJECTED") return "REJECTED";
      if (regStatus === "NOT_ATTENDED") return "NOT ATTENDED";
      return "REGISTERED ✓";
    }
    return "";
  });

  return (
    <div 
      className={`flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00] ${isUpcoming ? "opacity-90" : ""} relative cursor-pointer hover:border-[#FFB68B] transition-colors`}
      onClick={() => setShowDetails(true)}
    >
      {/* Image area */}
      <div className="relative mx-4 md:mx-6 mt-4 md:mt-6 h-[200px] md:h-[290px]">
        {quest.image ? (
          <Image
            src={quest.image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1C1B1C] flex items-center justify-center overflow-hidden">
            <GDCPlaceholder />
          </div>
        )}
        {/* Badge */}
        {isUpcoming ? (
          <div className="absolute top-[16px] left-[16px] flex items-center gap-1.5 px-[13px] h-[25px] bg-[#131314]/80 border border-[#A78B7C] backdrop-blur-[2px] box-border">
            <span className="text-[10px] leading-[15px]">🔒</span>
            <span className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF] flex items-center">
              Soon
            </span>
          </div>
        ) : (
          <div className="absolute top-[16px] left-[16px] flex items-center gap-1.5 px-[13px] h-[25px] bg-[#131314]/80 border border-[#FFB68B] backdrop-blur-[2px] box-border">
            <span className="text-[10px] leading-[15px]">⚡</span>
            <span className="font-mono font-normal text-[10px] leading-[15px] text-[#FFB68B] flex items-center">
              Active
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="mx-4 md:mx-6 mt-4 md:mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-sora font-normal text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] text-[#E5E2E3]">
          {quest.title}
        </h3>

        {/* Date / Location */}
        <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#E0C0AF]">
          {quest.dateText} · {quest.location}
        </p>

        {/* Separator */}
        <div className="mt-6 border-t border-[#584235]" />

        {/* Timer + Stats */}
        <div className="flex items-start justify-between mt-4 md:mt-6">
          <div>
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              {isUpcoming ? "Unlocks In" : "Time Remaining"}
            </p>
            <p className={`mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] ${isUpcoming ? "text-[#E5E2E3]" : "text-[#FFB68B]"}`}>
              {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              {isUpcoming ? "Reservation" : "Seats Available"}
            </p>
            <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#E5E2E3]">
              {seatsTaken} / {seatsTotal}
            </p>
          </div>
        </div>

        {/* Progress or Divider */}
        {isUpcoming ? (
          <div className="mt-4 h-[2px] bg-[#353436]" />
        ) : (
          <div className="mt-4 relative h-[2px] bg-[#353436]">
            {/* Active fill with gradient */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#93000A] via-[#FF7A00] to-[#FDD400]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}

        {!isAdmin && (
          isUpcoming ? (
            <button 
              onClick={() => { if (!user) router.push("/onboarding"); }}
              className="mt-4 md:mt-6 mb-4 md:mb-6 w-full h-[56px] border-2 border-[#FFB68B] bg-transparent flex items-center justify-center gap-2 transition-colors hover:bg-[#FFB68B]/5 cursor-pointer"
            >
              <Bell className="w-4 h-5 text-[#FFB68B]" />
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B]">
                Notify Me
              </span>
            </button>
          ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
                disabled={!!successMsg}
                className="mt-4 md:mt-6 mb-4 md:mb-6 w-full h-[56px] bg-[#FF7A00] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800]">
                  {successMsg ? successMsg : "VIEW DETAILS"}
                </span>
              </button>
          )
        )}
      </div>

      {showDetails && (
        <QuestDetailsModal 
          quest={{
            ...quest,
            registrations: successMsg 
              ? [{ 
                  id: "temp", 
                  userId: user?.id || "", 
                  questId: quest.id, 
                  status: (successMsg === "PENDING APPROVAL" ? "PENDING" : "REGISTERED") as any,
                  createdAt: new Date()
                }] 
              : quest.registrations
          }}
          user={user}
          isAdmin={isAdmin}
          onClose={() => setShowDetails(false)}
          onSuccess={(msg) => setSuccessMsg(msg)}
        />
      )}
    </div>
  );
}
