"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { NAV_LINKS } from "@/constants/navigation";

import { useCountdown } from "@/hooks/useCountdown";

// Stable timestamp constant — avoids new Date() creating a new reference on every render
const JAM_TARGET_MS = new Date("2026-07-20T09:00:00").getTime();

const navLinks = NAV_LINKS;

// ─────────────────────────────────────────────
// FEATURE CARDS
// ─────────────────────────────────────────────
const features = [
  {
    img: "/game_jams.png",
    title: "Game jams and quests",
    desc: "Collaborative sprints where high-speed dev meets narrative depth.",
  },
  {
    img: "/arcade_showcase.png",
    title: "Arcade showcases",
    desc: "Feature your playable builds in our interactive neon-lit virtual lobby.",
  },
  {
    img: "/dev_toolkit.png",
    title: "Dev toolkit access",
    desc: "Proprietary assets and shared libraries for collective innovation.",
  },
];

// ─────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────
const stats = [
  { value: "847", label: "Members", textColor: "text-[#FF7A00]" },
  { value: "156", label: "Links Up", textColor: "text-[#E9C400]" },
  { value: "12K", label: "In Game", textColor: "text-[#FF7A00]" },
  { value: "2,340", label: "First Base", textColor: "text-[#E9C400]" },
];




// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const { user, loading } = useGameForge();
  const router = useRouter();
  const countdown = useCountdown(JAM_TARGET_MS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pad = (n: number) => String(n).padStart(2, "0");

  // Navigate directly to the route (accessible for both guest and authenticated users)
  const handleNavLink = (href: string) => {
    router.push(href);
  };

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#131314] border-b border-[#584235]/30">
        <div className="max-w-[1440px] mx-auto h-[79px] flex items-center justify-between px-4 md:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[12px] no-underline">
            <div className="w-[39px] h-[40px] relative shrink-0">
              <Image src="/gdclogo.png" alt="GDC Logo" fill className="object-contain" />
            </div>
            <span className="font-sora font-extrabold text-[20px] md:text-[24px] leading-[32px] tracking-[-1.2px] text-[#FFB68B] hidden min-[420px]:inline-block">
              GAME DEV CLUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNavLink(l.href)}
                className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] bg-none border-none cursor-pointer p-0 hover:text-[#FFB68B] transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-[16px]">
            <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
              <button className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200">
                {!loading && user ? "Terminal" : "Join Us"}
              </button>
            </Link>
            <button
              className="md:hidden text-[#E0C0AF] bg-none border-none cursor-pointer p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <rect y="3" width="22" height="2" rx="1" />
                <rect y="10" width="22" height="2" rx="1" />
                <rect y="17" width="22" height="2" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="bg-[#131314] border-t border-[#584235]/30 py-[16px] px-4 md:px-16 md:hidden">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => { handleNavLink(l.href); setMobileOpen(false); }}
                className="block w-full text-left py-[10px] font-mono text-[12px] tracking-[1.2px] text-[#E0C0AF] bg-none border-none cursor-pointer hover:text-[#FFB68B] transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="text-center pt-[15dvh] pb-[10dvh] relative overflow-hidden px-4">
        {/* Ambient glow */}
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[400px] rounded-full bg-[#FF7A00]/5 blur-[120px] pointer-events-none" />

        <h1 className="font-sora font-normal text-[clamp(48px,6.67vw,96px)] leading-none text-[#E5E2E3] mx-auto mb-[32px] max-w-[640px]">
          Welcome to Game Dev Collective.
        </h1>

        <p className="font-sora font-normal text-[18px] leading-[28px] text-[#E0C0AF] max-w-[600px] mx-auto mb-[48px]">
          Step into a world where code becomes art and creativity fuels the arcade. Build games, earn XP, and rise through the ranks.
        </p>

        <div className="flex flex-col sm:flex-row gap-[24px] justify-center items-center">
          <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
            <button className="bg-[#FF7A00] w-full sm:w-[211.66px] h-[52px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200">
              {!loading && user ? "ENTER FORGE →" : "INITIATE PROTOCOL →"}
            </button>
          </Link>
          <a href="#jam" className="w-full sm:w-auto">
            <button className="bg-transparent border border-[#FF7A00] w-full sm:w-[195.6px] h-[54px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FF7A00] cursor-pointer hover:bg-[#FF7A00]/5 transition-colors duration-200">
              DOX SOURCE →
            </button>
          </a>
        </div>
      </section>

      {/* ── THREE WAYS ── */}
      <section
        className="max-w-[1200px] mx-auto px-[24px] pb-[96px] md:border-l md:border-r md:border-[#584235]/20"
        id="sprint"
      >
        {/* Header */}
        <div className="text-center mb-[48px] pt-[48px]">
          <p className="font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FFB68B] uppercase mb-[26px]">
            FEATURES
          </p>
          <h2 className="font-sora font-bold text-[clamp(32px,3.33vw,48px)] leading-[53px] tracking-[-0.96px] text-[#E5E2E3] mx-auto mb-[16px] max-w-[672px]">
            Three ways to level up your craft.
          </h2>
          <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] max-w-[672px] mx-auto">
            Give every discipline a forge for growth, collaboration, and high-community activity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] justify-center max-w-[1020px] mx-auto">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center md:items-start md:text-left mx-auto max-w-[340px]">
              {/* Image card */}
              <div className="w-[340px] max-w-full h-[191.25px] bg-[#201F20] border border-[#584235] rounded-[8px] overflow-hidden relative">
                <Image src={f.img} alt={f.title} fill className="object-cover" />
              </div>
              {/* Title */}
              <h3 className="font-sora font-normal text-[24px] leading-[32px] text-[#FFB68B] mt-[24px] mb-[16px]">
                {f.title}
              </h3>
              {/* Desc */}
              <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] mb-[16px] max-w-[322px]">
                {f.desc}
              </p>
              {/* Explore link */}
              <a
                href="#"
                className="inline-flex items-center gap-[8px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FF7A00] no-underline hover:text-[#FFB68B] transition-colors duration-200"
              >
                Explore →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-[80px] pb-[96px] pt-[48px]" id="meets">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
          {/* Left */}
          <div className="px-0 md:px-[64px] text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FDD400] uppercase mb-[16px]">
              LIVE
            </p>
            <h2 className="font-sora font-bold text-[clamp(32px,3.33vw,48px)] leading-[53px] tracking-[-0.96px] text-[#E5E2E3] mb-[24px]">
              The collective keeps growing.
            </h2>
            <p className="font-sora font-normal text-[16px] leading-[24px] text-[#E0C0AF] max-w-[448px] mb-[40px]">
              Real-time metrics from our distributed global network of creators and players.
            </p>
            <Link href="/onboarding">
              <button className="bg-[#FDD400] w-[130.41px] h-[44px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#6F5C00] border-none rounded-[2px] cursor-pointer hover:brightness-110 transition-all duration-200">
                Enlist
              </button>
            </Link>
          </div>

          {/* Right: 2×2 Stats grid */}
          <div className="border-t lg:border-t-0 lg:border-l border-[#584235]/30 grid grid-cols-2">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-6 md:p-[48px] ${i % 2 === 0 ? "border-r border-[#584235]/30" : ""} ${i < 2 ? "border-b border-[#584235]/30" : ""}`}
              >
                <p
                  className={`font-sora font-normal text-[48px] leading-[48px] mb-[8px] ${s.textColor}`}
                >
                  {s.value}
                </p>
                <p className="font-mono font-normal text-[14px] leading-[21px] text-[#A78B7C] uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY / ABOUT ── */}
      <section
        className="max-w-[1280px] mx-auto border-t border-b border-[#584235]/50 px-4 md:px-[80px] min-h-[580px] flex flex-col md:flex-row items-stretch"
        id="community"
      >
        {/* Left vertical label */}
        <div className="hidden md:flex w-[48px] border-r border-[#584235]/30 items-center justify-center shrink-0">
          <span className="font-mono font-normal text-[10px] leading-[15px] text-[#A78B7C] -rotate-90 whitespace-nowrap">
            GDSC SCT — GAME DEV CLUB
          </span>
        </div>

        {/* Left content */}
        <div className="flex-1 p-6 md:p-[80px] flex flex-col justify-center text-center md:text-left items-center md:items-start">
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
            <button className="bg-transparent border border-[#FF7A00] w-[124.81px] h-[38px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FF7A00] cursor-pointer hover:bg-[#FF7A00]/5 transition-colors duration-200">
              Connect
            </button>
          </Link>
        </div>

        {/* Right image */}
        <div className="w-full md:w-[677.59px] h-[300px] md:h-auto relative shrink-0 overflow-hidden">
          <Image
            src="/community_grind.png"
            alt="Game dev community working together"
            fill
            className="object-cover"
          />
          {/* Left-fade gradient overlay */}
          <div className="absolute inset-0 md:left-0 md:w-[128px] md:h-full bg-gradient-to-b md:bg-gradient-to-r from-[#131314] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ── SPRING JAM ── */}
      <section
        id="jam"
        className="bg-[#1C1B1C] border-b border-[#584235]/30 py-[96px] px-4"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-[64px] grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
          {/* Left */}
          <div className="max-w-[633.59px] text-center lg:text-left flex flex-col items-center lg:items-start mx-auto lg:mx-0">
            <p className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFE170] uppercase mb-[16px]">
              NEXT QUEST
            </p>
            <h2 className="font-sora font-normal text-[clamp(36px,4.17vw,60px)] leading-[48px] md:leading-[60px] text-[#E5E2E3] mb-[40px]">
              Spring Game Jam 2025.
            </h2>

            {/* Date + Countdown row */}
            <div className="flex gap-[48px] mb-[48px] justify-center lg:justify-start">
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] text-[#A78B7C] uppercase mb-[12px]">
                  Date
                </p>
                <p className="font-sora font-normal text-[20px] leading-[28px] text-[#E5E2E3]">
                  April 18–20, 2025
                </p>
              </div>
              <div>
                <p className="font-mono font-normal text-[10px] leading-[15px] text-[#A78B7C] uppercase mb-[12px]">
                  Countdown
                </p>
                <p className="font-mono font-bold text-[24px] leading-[32px] text-[#FF7A00]">
                  {pad(countdown.d)}d : {pad(countdown.h)}h : {pad(countdown.m)}m
                </p>
              </div>
            </div>

            <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
              <button className="bg-[#FF7A00] w-[213.61px] h-[60px] font-mono font-semibold text-[14px] leading-[20px] tracking-[1.4px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200">
                ACCEPT QUEST →
              </button>
            </Link>
          </div>

          {/* Right: Poster */}
          <div className="flex flex-col items-center lg:items-start mx-auto w-[518.39px] max-w-full">
            <div className="w-[518.39px] max-w-full h-[699.33px] bg-[#201F20] border-2 border-[#FF7A00]/30 rounded-[8px] relative overflow-hidden shadow-2xl">
              <div className="absolute inset-[14px] rounded-[4px] overflow-hidden">
                <Image
                  src="/game_jam_poster.png"
                  alt="Spring Game Jam 2025 poster"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Below poster: labels + progress */}
            <div className="mt-[16px] flex justify-between items-center w-[518.39px] max-w-full px-2">
              <span className="font-mono font-normal text-[11px] leading-[16px] tracking-[1.1px] text-[#E0C0AF]">
                Registrations
              </span>
              <span className="font-mono font-bold text-[11px] leading-[16px] text-[#FF7A00]">
                24 / 100
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-[8px] w-[502.39px] max-w-full h-[4px] bg-[#584235]/20 rounded-full overflow-hidden mx-auto lg:mx-0">
              <div className="w-[24%] h-full bg-[#FF7A00] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#131314] border-t border-[#584235] py-[49px] px-4 md:px-[64px]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: logo + copyright */}
          <div className="flex flex-col md:flex-row items-center gap-[24px] text-center md:text-left">
            <div className="w-[32px] h-[32px] relative opacity-80 shrink-0">
              <Image src="/gdclogo.png" alt="GDC Logo" fill className="object-contain" />
            </div>
            <span className="font-mono font-normal text-[12px] leading-[16px] text-[#A78B7C]">
              © 2025 Game Dev Collective // GDSC SCT. All rights reserved.
            </span>
          </div>

          {/* Right: footer links */}
          <div className="flex gap-[32px] flex-wrap justify-center">
            {["Privacy Policy", "Term of Service", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="font-mono font-normal text-[12px] leading-[16px] text-[#A78B7C] no-underline hover:text-[#E0C0AF] transition-colors duration-200"
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
