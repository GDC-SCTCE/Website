"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGameForge } from "@/context/GameForgeContext";

import { XPLevel } from "./types";
import { DEV_TOOLS, YEAR_OPTIONS, XP_LEVELS } from "./constants";

export default function OnboardingPage() {
  const { user, login, loading } = useGameForge();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("1st");
  const [selectedTools, setSelectedTools] = useState<string[]>(["Unity"]);
  const [xpLevel, setXpLevel] = useState<XPLevel>("Newbie");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && !submitting) {
      // Already logged in — go directly to dashboard
      router.push("/dashboard/quests");
    }
  }, [user, loading, router, submitting]);

  const toggleTool = (tool: string) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleJoin = () => {
    if (!fullName.trim()) return;
    setSubmitting(true);
    // Map XP level → loadout for the context
    const loadoutMap: Record<XPLevel, "Developer" | "Artist" | "Musician" | "Designer"> = {
      Newbie: "Developer",
      Apprentice: "Artist",
      Veteran: "Designer",
    };
    const stats = { tech: 10, design: 10, agility: 10, strength: 10 };
    login(fullName.trim(), loadoutMap[xpLevel], stats);
    router.push("/onboarding/success");
  };

  if (loading || (user && !submitting)) {
    return (
      <div className="min-h-screen bg-[#131314] flex items-center justify-center">
        <span className="font-mono text-[12px] text-[#FF7A00] tracking-[1.2px]">
          CONNECTING TO COMPILER...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131314] to-[#1C1B1C] text-[#E5E2E3] relative overflow-x-hidden">
      {/* ── Ambient blobs ── */}
      <div className="absolute w-[512px] h-[746px] left-[-136px] top-[79px] bg-[#FFB68B]/3 blur-[60px] rotate-12 pointer-events-none" />
      <div className="absolute w-[640px] h-[622px] left-[870px] top-[242px] bg-[#00DBE9]/3 blur-[75px] -rotate-12 pointer-events-none" />

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── MAIN ── */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-[64px] pb-[80px]">
        {/* ── PROGRESS HEADER ── */}
        <div className="text-center pt-[96px] mb-[56px]">
          {/* Phase label */}
          <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#00DBE9] mb-[28px]">
            PHASE 02 / CHARACTER DATA
          </p>

          {/* Heading */}
          <h1 className="font-sora font-bold text-[48px] leading-[53px] tracking-[-2.4px] uppercase text-[#FFB68B] mb-[24px]">
            Initialize Protocol
          </h1>

          {/* Progress bar */}
          <div className="inline-block w-[128px] relative">
            {/* Shadow layer */}
            <div className="absolute w-[128px] h-[4px] top-0 left-0 bg-transparent shadow-[0_4px_20px_-5px_rgba(255,182,139,0.6)]" />
            {/* Fill */}
            <div className="w-[128px] h-[4px] bg-[#FFB68B] mt-[4px]" />
          </div>
        </div>

        {/* ── TWO COLUMN FORM ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[64px] items-start max-w-[1280px] mx-auto">
          {/* ───── LEFT: BASE STATS ───── */}
          <div>
            {/* Section title */}
            <div className="flex items-baseline gap-[16px] mb-[48px]">
              <span className="font-sora font-bold text-[48px] leading-[53px] tracking-[-0.96px] text-[#353436]">
                03
              </span>
              <span className="font-sora font-bold text-[32px] leading-[48px] uppercase text-[#E5E2E3]">
                BASE STATS
              </span>
            </div>

            {/* Row 1: Full Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[36px] w-full">
              {/* Full Name */}
              <div>
                <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                  FULL NAME
                </label>
                <div className="border-b border-[#D0D0D0] pb-[13px]">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jaxen Sterling"
                    className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                  EMAIL ADDRESS
                </label>
                <div className="border-b border-[#D0D0D0] pb-[13px]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jaxen@ignition.hub"
                    className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Roll No + Academic Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
              {/* Roll No */}
              <div>
                <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                  ROLL NO.
                </label>
                <div className="border-b border-[#D0D0D0] pb-[13px]">
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="IH-8829-X"
                    className="w-full bg-transparent border-none outline-none font-sora font-normal text-[16px] leading-[20px] text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"
                  />
                </div>
              </div>

              {/* Academic Year */}
              <div>
                <label className="block font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[20px] pl-[4px]">
                  ACADEMIC YEAR
                </label>
                <div className="flex flex-wrap border border-[#353436]">
                  {YEAR_OPTIONS.map((y) => {
                    const isActive = year === y;
                    return (
                      <button
                        key={y}
                        onClick={() => setYear(y)}
                        className={`w-[83.33px] h-[48px] font-mono font-normal text-[10px] leading-[15px] cursor-pointer uppercase transition-all duration-150 border-none ${isActive ? "bg-[#FF7A00] text-[#522300]" : "bg-transparent text-[#E5E2E3] hover:bg-white/5"}`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ───── RIGHT: LOADOUT ───── */}
          <div>
            {/* Section title */}
            <div className="flex items-baseline gap-[16px] mb-[48px]">
              <span className="font-sora font-bold text-[48px] leading-[53px] tracking-[-0.96px] text-[#353436]">
                04
              </span>
              <span className="font-sora font-bold text-[32px] leading-[48px] uppercase text-[#E5E2E3]">
                LOADOUT
              </span>
            </div>

            {/* Development Tools */}
            <div className="mb-[56px]">
              <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[28px]">
                DEVELOPMENT TOOLS
              </p>
              <div className="flex gap-[8px] flex-wrap">
                {DEV_TOOLS.map((tool) => {
                  const isSelected = selectedTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={`h-[33px] px-[16px] font-mono font-normal text-[10px] leading-[15px] cursor-pointer transition-all duration-150 ${isSelected ? "bg-[#FFB68B] text-[#522300] border-none shadow-[0_4px_20px_-5px_rgba(255,182,139,0.6)]" : "bg-transparent text-[#E0C0AF] border border-[#353436] hover:border-[#FFB68B]"}`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* XP Classification */}
            <div>
              <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-[28px]">
                XP CLASSIFICATION
              </p>
              <div className="flex flex-col gap-[12px]">
                {XP_LEVELS.map((lvl) => {
                  const isSelected = xpLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => setXpLevel(lvl.id)}
                      className={`w-full h-[69px] bg-[#1C1B1C] pl-[49px] pr-[17px] py-[17px] text-left cursor-pointer relative box-border transition-colors duration-150 border ${isSelected ? "border-[#FFB68B]" : "border-[#353436] hover:border-[#FFB68B]/50"}`}
                    >
                      {/* Radio circle */}
                      <span className={`absolute left-[17px] top-[26.5px] w-[16px] h-[16px] border-2 border-[#353436] rounded-full inline-block box-border ${isSelected ? "bg-[#FFB68B]" : "bg-transparent"}`} />
                      <p className="font-mono font-normal text-[12px] leading-[18px] text-[#FFB68B] m-0 mb-[2px]">
                        {lvl.label}
                      </p>
                      <p className="font-sora font-normal text-[11px] leading-[16px] text-[#E0C0AF] m-0 truncate">
                        {lvl.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA BUTTON ── */}
        <div className="text-center mt-[96px]">
          <div className="inline-block relative">
            {/* Glow behind button */}
            <div className="absolute inset-[-4px] bg-gradient-to-r from-[#FFB68B] to-[#FDD400] opacity-25 blur-[4px] pointer-events-none" />
            <button
              onClick={handleJoin}
              disabled={submitting || !fullName.trim()}
              className={`relative w-full max-w-[469.81px] h-[78px] border-none font-sora font-normal text-[20px] leading-[30px] tracking-[4px] uppercase text-[#522300] transition-all duration-200 ${!fullName.trim() ? "bg-[#584235] opacity-60 cursor-not-allowed" : "bg-[#FFB68B] cursor-pointer hover:scale-[1.01]"}`}
            >
              {submitting ? "INITIALIZING..." : "JOIN THE COLLECTIVE →"}
            </button>
          </div>
          <p className="font-mono font-normal text-[10px] leading-[15px] text-[#353436] mt-[20px]">
            By joining, you agree to the Terms of Service
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
