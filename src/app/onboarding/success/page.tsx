"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { NAV_LINKS } from "@/constants/navigation";

export default function OnboardingSuccess() {
  const { user, loading } = useGameForge();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // If no user and done loading, redirect to onboarding
    if (!loading && !user) {
      router.push("/onboarding");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#131314] flex items-center justify-center">
        <span className="font-mono text-[12px] text-[#FF7A00] tracking-[1.2px]">
          INITIALIZING PROTOCOL...
        </span>
      </div>
    );
  }

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
      <header className="sticky top-0 z-50 bg-[#131314] border-b border-[#584235]/30 h-[79px] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[12px] no-underline shrink-0">
            <div className="w-[39px] h-[40px] relative">
              <Image
                src="/gdclogo.png"
                alt="GDC Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-sora font-extrabold text-[20px] md:text-[24px] leading-[32px] tracking-[-1.2px] text-[#FFB68B] hidden min-[420px]:inline-block">
              GAME DEV CLUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[40px]">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] no-underline hover:text-[#FFB68B] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA — already logged in, show "Dashboard" */}
          <div className="flex items-center gap-[16px] shrink-0">
            <Link href="/dashboard/quests">
              <button className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200">
                DASHBOARD
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-[#E0C0AF] bg-transparent border-none cursor-pointer p-1"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <rect y="3" width="22" height="2" rx="1" />
                <rect y="10" width="22" height="2" rx="1" />
                <rect y="17" width="22" height="2" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute top-[79px] left-0 right-0 bg-[#131314] border-t border-[#584235]/30 py-[16px] z-60 px-4 md:px-16 md:hidden flex flex-col gap-[16px]">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-[12px] tracking-[1.2px] text-[#E0C0AF] no-underline hover:text-[#FFB68B]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex flex-col items-center pt-[100px] pb-[60px] md:pt-[178px] md:pb-[80px] px-4 md:px-16 max-w-[1440px] mx-auto box-border">
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
            <span className="text-[#FF7A00]">{user.nickname}.</span>
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
                {user.nickname}
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

      {/* ── FOOTER ── */}
      <footer className="bg-[#131314] border-t-2 border-[#353436] py-8 md:h-[142px] flex items-center box-border relative z-10">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-[12px] mb-[8px]">
              <div className="w-[32px] h-[32px] relative shrink-0">
                <Image
                  src="/gdclogo.png"
                  alt="GDC Logo"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              <span className="font-sora font-bold text-[16px] leading-[24px] text-[#FFB68B]">
                GAME DEV CLUB
              </span>
            </div>
            <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] m-0">
              © 2024 GAME DEV COLLECTIVE. BUILT FOR PERFORMANCE.
            </p>
          </div>

          {/* Right: Footer nav links */}
          <div className="flex gap-[32px]">
            {["Support", "GitHub", "Discord", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] no-underline hover:text-[#FFB68B]"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
