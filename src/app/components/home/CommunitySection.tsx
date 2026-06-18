"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function CommunitySection() {
  const { ref: communityRef, inView: communityVisible } = useInView(0.15);

  return (
    <section
      ref={communityRef}
      className="max-w-[1280px] mx-auto border-t border-b border-[#584235]/30 px-4 md:px-0 min-h-[580px] flex flex-col md:flex-row items-stretch overflow-hidden"
      id="community"
    >
      {/* Left vertical label */}
      <div className="hidden md:flex w-[48px] border-r border-[#584235]/30 items-center justify-center shrink-0">
        <span className="font-mono font-normal text-[10px] leading-[15px] text-[#A78B7C] -rotate-90 whitespace-nowrap">
          GDSC SCT — GAME DEV CLUB
        </span>
      </div>

      {/* Left content */}
      <div
        className="flex-1 p-6 md:py-[80px] md:pr-[80px] md:pl-[80px] flex flex-col justify-center text-center md:text-left items-center md:items-start transition-all duration-700 ease-out"
        style={{
          opacity: communityVisible ? 1 : 0,
          transform: communityVisible ? "translateX(0)" : "translateX(-40px)",
        }}
      >
        <p className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FF7A00] uppercase mb-[16px]">
          CONNECTED
        </p>
        <h2 className="font-sora font-bold text-[clamp(32px,3.33vw,48px)] leading-[48px] md:leading-[60px] tracking-[-0.96px] text-[#E5E2E3] max-w-[373px] mb-[24px]">
          Build alongside creators who understand the grind.
        </h2>
        <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] max-w-[394px] mb-[40px]">
          We believe in radical transparency and cross-disciplinary mentorship for all members.
        </p>
        <Link href="/onboarding">
          <button className="bg-transparent border border-[#FF7A00] w-[124.81px] h-[38px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FF7A00] cursor-pointer hover:bg-[#FF7A00] hover:text-[#5C2800] transition-all duration-300">
            Connect
          </button>
        </Link>
      </div>

      {/* Right image */}
      <div
        className="w-full md:w-[677.59px] h-[300px] md:h-auto relative shrink-0 overflow-hidden transition-all duration-700 ease-out group/community"
        style={{
          opacity: communityVisible ? 1 : 0,
          transform: communityVisible ? "translateX(0)" : "translateX(40px)",
          transitionDelay: "150ms",
        }}
      >
        <Image
          src="/community_grind.png"
          alt="Game dev community working together"
          fill
          sizes="(max-width: 768px) 100vw, 680px"
          className="object-cover transition-transform duration-[8s] ease-out group-hover/community:scale-105"
        />
        {/* Left-fade gradient overlay */}
        <div className="absolute inset-0 md:left-0 md:w-[128px] md:h-full bg-gradient-to-b md:bg-gradient-to-r from-[#131314] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
