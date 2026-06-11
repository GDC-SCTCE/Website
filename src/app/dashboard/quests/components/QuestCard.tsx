import React from "react";
import Image from "next/image";
import { useCountdown } from "@/hooks/useCountdown";
import { Bell } from "lucide-react";

export interface QuestCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  targetMs: number;
  isUpcoming?: boolean;
  seatsTaken?: number;
  seatsTotal?: number;
  progressPct?: number;
  user: any; // Using any for simplicity as per original
  delay?: number;
  visible?: boolean;
}

export function QuestCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  targetMs,
  isUpcoming = false,
  seatsTaken = 0,
  seatsTotal = 30,
  progressPct = 0,
  user,
  delay = 0,
  visible = true,
}: QuestCardProps) {
  const timer = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={`flex flex-col flex-1 bg-gradient-to-b from-[#161618] to-[#131314] border-t border-[#FF7A00] ${isUpcoming ? "opacity-90" : ""}`}>
      {/* Image area */}
      <div className="relative mx-6 mt-6 h-[290px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover"
        />
        {/* Badge */}
        {isUpcoming ? (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#131314]/80 border border-[#A78B7C] backdrop-blur-[2px]">
            <span className="font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
              Soon
            </span>
          </div>
        ) : (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#131314]/80 border border-[#FFB68B] backdrop-blur-[2px]">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#FF7A00]" />
            <span className="font-mono font-normal text-[10px] leading-[15px] text-[#FFB68B]">
              Active
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="mx-6 mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-sora font-normal text-[24px] sm:text-[32px] leading-[36px] sm:leading-[48px] text-[#E5E2E3]">
          {title}
        </h3>

        {/* Date / Location */}
        <p className="mt-1 font-mono font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#E0C0AF]">
          {subtitle}
        </p>

        {/* Separator */}
        <div className="mt-6 border-t border-[#584235]" />

        {/* Timer + Stats */}
        <div className="flex items-start justify-between mt-6">
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

        {/* CTA Button */}
        {user && (
          isUpcoming ? (
            <button className="mt-6 mb-6 w-full h-[56px] border-2 border-[#FFB68B] bg-transparent flex items-center justify-center gap-2 transition-colors hover:bg-[#FFB68B]/5 cursor-pointer">
              <Bell className="w-4 h-5 text-[#FFB68B]" />
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B]">
                Notify Me
              </span>
            </button>
          ) : (
            <button className="mt-6 mb-6 w-full h-[48px] bg-[#FF7A00] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer border-none">
              <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800]">
                Accept Quest →
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
}
