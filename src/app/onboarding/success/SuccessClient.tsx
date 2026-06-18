"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SuccessClient({ actualName }: { actualName: string }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#131314] to-[#1C1B1C] text-[#E5E2E3] overflow-x-hidden">
      {/* ── ATMOSPHERIC ELEMENTS ── */}
      {/* Orange ambient glow centre */}
      <div
        aria-hidden
        className="fixed w-[384px] h-[384px] left-1/2 top-[22%] -translate-x-1/2 bg-[#FFB68B] opacity-5 blur-[60px] rounded-full pointer-events-none z-0"
      />
      {/* Cyan ambient glow bottom-right */}
      <div
        aria-hidden
        className="fixed w-[256px] h-[256px] right-[10%] bottom-[20%] bg-[#00DBE9] opacity-5 blur-[50px] rounded-full pointer-events-none z-0"
      />
      {/* Canvas particle grid */}
      <div
        aria-hidden
        className="fixed inset-0 bg-[linear-gradient(180deg,#FF7A00_1.25%,rgba(255,122,0,0)_1.25%),linear-gradient(90deg,#FF7A00_1.25%,rgba(255,122,0,0)_1.25%)] bg-[size:80px_80px] opacity-[0.03] pointer-events-none z-0"
      />

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex flex-col items-center pt-[100px] pb-[60px] md:pt-32 lg:pt-40 md:pb-[80px] px-4 md:px-16 max-w-[1440px] mx-auto box-border">
        {/* ── SUCCESS INDICATOR ── */}
        <div className="relative w-[128px] h-[128px] mb-[48px]">
          {/* Outer decorative border — rotated 45° */}
          <div
            aria-hidden
            className="absolute w-[160px] h-[160px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#FFB68B]/20 pointer-events-none"
          />
          {/* Inner decorative border — rotated -12° */}
          <div
            aria-hidden
            className="absolute w-[144px] h-[144px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border border-[#00DBE9]/20 pointer-events-none"
          />
          {/* Main indicator box */}
          <div className="absolute inset-0 bg-[#1C1B1C] border-2 border-[#FF7A00] shadow-[0px_0px_15px_rgba(255,122,0,0.6)] flex items-center justify-center">
            {/* Checkmark SVG */}
            <svg
              width="40"
              height="32"
              viewBox="0 0 40 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Success checkmark"
            >
              <path
                d="M3 16L14 27L37 4"
                stroke="#FFB68B"
                strokeWidth="4"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
        </div>

        {/* ── PAGE HEADER TEXT ── */}
        <div className="w-full max-w-[842px] flex flex-col items-center mb-[48px]">
          {/* "CHARACTER CREATED" label */}
          <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[2.4px] uppercase text-[#FFB68B] m-0 mb-[28px] text-center">
            Character Created
          </p>

          {/* Main heading */}
          <h1 className="font-sora font-extrabold text-[clamp(40px,7vw,80px)] leading-none tracking-[-3.2px] text-[#E5E2E3] text-center m-0">
            Welcome to the party,{" "}
            <span className="text-[#FF7A00]">{actualName}.</span>
          </h1>
        </div>

        {/* ── DESCRIPTION ── */}
        <p className="font-sora font-normal text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-[#E0C0AF] text-center max-w-[570px] m-0 mb-[60px] md:mb-[80px]">
          Check your email. Your adventure starts now. Your inventory is
          synchronized, and your initial tools are ready for deployment in the
          engine.
        </p>

        {/* ── CTA BUTTONS ── */}
        <div className="flex flex-col sm:flex-row gap-[24px] justify-center items-center w-full mb-[60px] md:mb-[80px]">
          {/* Primary: JOIN OUR DISCORD */}
          <a
            id="success-join-discord"
            href="https://discord.gg/gdcsct"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-[12px] w-full sm:w-[365px] h-[80px] bg-[#FF7A00] shadow-[0px_0px_15px_rgba(255,122,0,0.6)] no-underline shrink-0 hover:brightness-110 transition-all duration-200"
          >
            <span className="font-sora font-bold text-[18px] md:text-[20px] leading-[28px] tracking-[2px] uppercase text-[#522300]">
              Join Our Discord
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="#522300"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </a>

          {/* Secondary: GO TO INVENTORY */}
          <Link
            id="success-go-inventory"
            href="/dashboard/inventory"
            className="flex items-center justify-center w-full sm:w-[326px] h-[80px] border-2 border-[#FF7A00] no-underline shrink-0 hover:bg-[rgba(255,122,0,0.05)] transition-all duration-200"
          >
            <span className="font-sora font-bold text-[18px] md:text-[20px] leading-[28px] tracking-[2px] uppercase text-[#FFB68B]">
              Go To Inventory
            </span>
          </Link>
        </div>

        {/* ── BENTO-LITE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] w-full max-w-[896px] mb-[80px] md:mb-[120px]">
          {/* Card 1 — Hardware Sync */}
          <div className="bg-[#1C1B1C] border-t-2 border-[#FFB68B] p-[26px_24px_28px] min-h-[144px] relative">
            {/* Icon — rect placeholder */}
            <div className="w-[18px] h-[18px] bg-[#FFB68B] mb-[10px]" />
            <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3] m-0 mb-[16px] uppercase">
              Hardware Sync
            </p>
            <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E0C0AF] m-0">
              Vitals and system performance linked to your neural link profile.
            </p>
          </div>

          {/* Card 2 — Season Zero Pass */}
          <div className="bg-[#1C1B1C] border-t-2 border-[#00DBE9] p-[26px_24px_28px] min-h-[144px] relative">
            <div className="w-[10px] h-[20px] bg-[#00DBE9] mb-[10px]" />
            <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3] m-0 mb-[16px] uppercase">
              Season Zero Pass
            </p>
            <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E0C0AF] m-0">
              Exclusive legacy content unlocked for{" "}
              <span className="text-[#FFB68B] font-semibold">
                {actualName}
              </span>
              .
            </p>
          </div>

          {/* Card 3 — Team Channel */}
          <div className="bg-[#1C1B1C] border-t-2 border-[#753400] p-[26px_24px_28px] min-h-[144px] relative">
            <div className="w-[20px] h-[20px] bg-[#753400] mb-[10px]" />
            <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3] m-0 mb-[16px] uppercase">
              Team Channel
            </p>
            <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E0C0AF] m-0">
              Assigned to Collective Vanguard for the upcoming campaign.
            </p>
          </div>
        </div>

        {/* ── SUCCESS VISUAL ELEMENT ── */}
        <div className="w-full max-w-[1312px] h-[256px] relative overflow-hidden flex items-center justify-center mb-[48px]">
          {/* Glowing platform visual */}
          <div className="absolute bottom-[20px] w-full max-w-[440px] h-[40px] bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(255,122,0,0.55)_0%,rgba(255,122,0,0)_80%)] rounded-full blur-[4px]" />
          <div className="absolute bottom-[32px] w-full max-w-[520px] h-[6px] bg-[rgba(255,122,0,0.25)] rounded-full blur-[2px]" />
          {/* Central trophy / gear ring */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 opacity-70"
            aria-label="Success gear"
          >
            <circle
              cx="80"
              cy="80"
              r="72"
              stroke="#FF7A00"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.4"
            />
            <circle
              cx="80"
              cy="80"
              r="56"
              stroke="#FFB68B"
              strokeWidth="1.5"
              opacity="0.3"
            />
            <circle
              cx="80"
              cy="80"
              r="40"
              stroke="#FF7A00"
              strokeWidth="2"
              opacity="0.6"
            />
            <path
              d="M80 52 L80 40 M80 120 L80 108 M52 80 L40 80 M120 80 L108 80 M61.5 61.5L53 53 M107 107L98.5 98.5 M98.5 61.5L107 53 M53 107L61.5 98.5"
              stroke="#FF7A00"
              strokeWidth="2"
              strokeLinecap="square"
              opacity="0.5"
            />
            <circle cx="80" cy="80" r="18" fill="#FF7A00" opacity="0.15" />
            <circle cx="80" cy="80" r="10" fill="#FF7A00" opacity="0.8" />
          </svg>
        </div>
      </main>
    </div>
  );
}
