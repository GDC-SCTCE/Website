"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Hexagon,
  Triangle,
  Layers,
  PaletteIcon,
  Palette,
  Music,
  GitBranch,
  Clock,
  Wifi,
  ExternalLink,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "ALL" | "ENGINES" | "ART" | "AUDIO" | "COLLAB" | "LEARNING";

interface Tool {
  id: string;
  name: string;
  category: Category;
  rating: number; // 1-5
  pricing: "Free" | "Freemium" | "Paid";
  platforms: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TOOLS: Tool[] = [
  {
    id: "unity",
    name: "Unity",
    category: "ENGINES",
    rating: 4,
    pricing: "Free",
    platforms: "Win / Mac / Linux",
    description:
      "The world's leading platform for creating and operating interactive, real-time 3D content.",
    url: "https://unity.com",
    icon: <Box strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "godot",
    name: "Godot",
    category: "ENGINES",
    rating: 5,
    pricing: "Free",
    platforms: "Win / Mac / Linux",
    description:
      "Free and open source 2D and 3D game engine, community-driven and MIT licensed.",
    url: "https://godotengine.org",
    icon: <Hexagon strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "unreal",
    name: "Unreal",
    category: "ENGINES",
    rating: 5,
    pricing: "Freemium",
    platforms: "Win / Mac",
    description:
      "AAA-grade engine with Nanite, Lumen real-time GI, and Blueprint visual scripting.",
    url: "https://www.unrealengine.com",
    icon: <Triangle strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "blender",
    name: "Blender",
    category: "ART",
    rating: 5,
    pricing: "Free",
    platforms: "Win / Mac / Linux",
    description:
      "A complete 3D toolkit for modeling, sculpting, rigging, animation, VFX, and rendering.",
    url: "https://www.blender.org",
    icon: <Layers strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "figma",
    name: "Figma",
    category: "ART",
    rating: 4,
    pricing: "Freemium",
    platforms: "Web / Win / Mac",
    description:
      "Collaborative design and prototyping tool. Perfect for HUD design and game UI mockups.",
    url: "https://figma.com",
    icon: <PaletteIcon strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "aseprite",
    name: "Aseprite",
    category: "ART",
    rating: 4,
    pricing: "Paid",
    platforms: "Win / Mac / Linux",
    description:
      "Professional pixel art editor and sprite animator. Industry standard for 2D game assets.",
    url: "https://www.aseprite.org",
    icon: <Palette strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "fmod",
    name: "FMOD",
    category: "AUDIO",
    rating: 4,
    pricing: "Freemium",
    platforms: "Win / Mac",
    description:
      "Professional adaptive audio middleware used in AAA titles. Parameter-driven sound design.",
    url: "https://www.fmod.com",
    icon: <Music strokeWidth={1.25} className="w-16 h-16" />,
  },
  {
    id: "git",
    name: "Git",
    category: "COLLAB",
    rating: 5,
    pricing: "Free",
    platforms: "Win / Mac / Linux",
    description:
      "Distributed version control system. Essential for tracking code changes in every game project.",
    url: "https://git-scm.com",
    icon: <GitBranch strokeWidth={1.25} className="w-16 h-16" />,
  },
];

const CATEGORIES: Category[] = [
  "ALL",
  "ENGINES",
  "ART",
  "AUDIO",
  "COLLAB",
  "LEARNING",
];

// ─── Countdown ────────────────────────────────────────────────────────────────

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [selectedTool, setSelectedTool] = useState<Tool>(TOOLS[0]);
  const [loadout, setLoadout] = useState<Set<string>>(new Set(["unity"]));

  // Next Sunday as deadline
  const nextSunday = (() => {
    const d = new Date();
    d.setDate(d.getDate() + (7 - d.getDay()));
    d.setHours(23, 59, 59, 0);
    return d;
  })();
  const countdown = useCountdown(nextSunday);
  const pad = (n: number) => String(n).padStart(2, "0");

  const filtered =
    activeCategory === "ALL"
      ? TOOLS
      : TOOLS.filter((t) => t.category === activeCategory);

  const isEquipped = loadout.has(selectedTool.id);

  const toggleEquip = () => {
    setLoadout((prev) => {
      const next = new Set(prev);
      if (next.has(selectedTool.id)) next.delete(selectedTool.id);
      else next.add(selectedTool.id);
      return next;
    });
  };

  return (
    <div className="bg-[#131314] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 space-y-16">

        {/* ── Section 5.1: Header ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: Title */}
          <div>
            <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#00DBE9] mb-5 uppercase">
              YOUR LOADOUT
            </p>
            <h1 className="font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0">
              THE
              <br />
              INVENTORY.
            </h1>
          </div>

          {/* Right: Category filter buttons */}
          <div className="flex flex-wrap gap-[12px]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`h-[28px] px-6 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] border-none cursor-pointer transition-all duration-200 ${activeCategory === cat
                  ? "bg-[#FF7A00] text-[#522300] shadow-[0_0_20px_rgba(255,122,0,0.2)]"
                  : "bg-[#201F20] text-[#E0C0AF] hover:bg-[#2e2d2e] hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section 5.2: Inventory Grid + Inspector ─────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Inventory Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
              {filtered.map((tool) => {
                const isSelected = selectedTool.id === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`relative flex flex-col items-center justify-center aspect-square bg-gradient-to-b from-[#1C1B1C] to-[#131314] cursor-pointer transition-all duration-200 overflow-hidden group border-t ${isSelected
                      ? "border-t-[#FF7A00]"
                      : "border-t-[#584235] hover:border-t-[#FF7A00]"
                      }`}
                  >
                    {/* Dark inner bg */}
                    <div className="absolute inset-[4px_4px_0_4px] bg-[#0E0E0F]" />

                    {/* Icon */}
                    <div
                      className={`relative z-10 transition-colors duration-200 ${isSelected
                        ? "text-[#FF7A00]"
                        : "text-[#00DBE9]/60 group-hover:text-[#00DBE9]"
                        }`}
                    >
                      {tool.icon}
                    </div>

                    {/* Tool name label */}
                    <span className="relative z-10 mt-2 font-mono text-[9px] tracking-[1.2px] uppercase text-[#E0C0AF]/50 group-hover:text-[#E0C0AF]/80 transition-colors duration-200">
                      {tool.name}
                    </span>

                    {/* Equipped dot */}
                    {loadout.has(tool.id) && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#39ff14] rounded-full z-20" />
                    )}
                  </button>
                );
              })}

              {filtered.length === 0 && (
                <div className="col-span-full py-20 text-center font-mono text-[12px] text-[#584235] uppercase tracking-widest">
                  No tools in this category yet
                </div>
              )}
            </div>
          </div>

          {/* Right: Inspector Panel */}
          <div className="w-full lg:w-[400px] shrink-0 bg-gradient-to-b from-[#1C1B1C] to-[#131314] border-t border-[#FF7A00] flex flex-col">
            <div className="p-8 flex flex-col flex-1">
              {/* Label */}
              <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-9 uppercase">
                SELECTED ITEM
              </p>

              {/* Tool name + badge */}
              <div className="flex items-center gap-6 mb-6">
                {/* Icon thumbnail */}
                <div className="w-[80px] h-[80px] bg-[#353436] flex items-center justify-center shrink-0 overflow-hidden relative">
                  <div className="text-[#00DBE9]">{selectedTool.icon}</div>
                </div>
                {/* Name + pricing badge */}
                <div>
                  <h2 className="font-sora font-normal text-[32px] leading-[32px] uppercase text-[#E5E2E3] m-0">
                    {selectedTool.name}
                  </h2>
                  <span className="inline-flex items-center mt-[8px] bg-[#00B1BC] px-2 h-5 font-mono text-[10px] leading-[16px] text-[#003E42]">
                    {selectedTool.pricing}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#353436] mb-6" />

              {/* Description */}
              <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E0C0AF] mb-8">
                {selectedTool.description}
              </p>

              {/* Metadata: Difficulty + Price */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Difficulty */}
                <div>
                  <p className="font-mono font-bold text-[10px] leading-[16px] text-[#E0C0AF] mb-[8px] uppercase">
                    DIFFICULTY
                  </p>
                  <div className="flex gap-[2px]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-[11.67px] h-[11.08px]"
                        style={{
                          background:
                            i <= selectedTool.rating ? "#FFB68B" : "#353436",
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <p className="font-mono font-bold text-[10px] leading-[16px] text-[#E0C0AF] mb-[8px] uppercase">
                    PRICE
                  </p>
                  <p className="font-sora font-bold text-[16px] leading-[26px] text-[#E5E2E3]">
                    {selectedTool.pricing}
                  </p>
                </div>
              </div>

              {/* Platform */}
              <div className="mb-8">
                <p className="font-mono font-bold text-[10px] leading-[16px] text-[#E0C0AF] mb-1 uppercase">
                  PLATFORM
                </p>
                <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E5E2E3]">
                  {selectedTool.platforms}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-4">
                <a
                  href={selectedTool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[58px] bg-[#FF7A00] flex items-center justify-center gap-2 font-sora font-bold text-[16px] leading-[26px] tracking-[-0.4px] uppercase text-[#522300] hover:brightness-110 transition-all duration-200 no-underline"
                >
                  OPEN TOOL <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={toggleEquip}
                  className={`w-full h-[62px] border-2 flex items-center justify-center font-sora font-bold text-[16px] leading-[26px] tracking-[-0.4px] uppercase transition-all duration-200 cursor-pointer ${isEquipped
                    ? "border-[#39ff14] text-[#39ff14] bg-[#39ff14]/5"
                    : "border-[#FF7A00] text-[#FF7A00] bg-transparent hover:bg-[#FF7A00]/5"
                    }`}
                >
                  {isEquipped ? "✓ EQUIPPED" : "ADD TO LOADOUT"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 5.3: Path Selection ──────────────────────────────────── */}
        <div>
          {/* Centered heading */}
          <div className="text-center mb-16">
            <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFB68B] mb-7">
              CHOOSE YOUR PATH
            </p>
            <h2 className="font-sora font-bold text-[40px] sm:text-[48px] leading-[53px] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0">
              WHERE DO YOU WANT TO GO?
            </h2>
          </div>

          {/* 3 Path Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 lg:gap-0 lg:grid-cols-3">
            {[
              {
                icon: <Palette strokeWidth={1.25} className="w-[27px] h-[31.5px] text-[#FFB68B]" />,
                title: "2D Platformer",
                desc: "Master the fundamentals of sprites, physics, and level design.",
                skills: "4 SKILLS →",
                pct: 40,
                complete: "40% COMPLETE",
                badge: "RECOMMENDED FOR BEGINNERS",
                badgeColor: "#353436",
                badgeTextColor: "#FFB68B",
              },
              {
                icon: <Layers strokeWidth={1.25} className="w-[30px] h-[30px] text-[#FFB68B]" />,
                title: "3D Environments",
                desc: "Deep dive into vertex shaders, lighting, and modular asset creation.",
                skills: "12 SKILLS →",
                pct: 12,
                complete: "12% COMPLETE",
                badge: "INTERMEDIATE LEVEL",
                badgeColor: "#353436",
                badgeTextColor: "#E0C0AF",
              },
              {
                icon: <Wifi strokeWidth={1.25} className="w-[30px] h-[24px] text-[#FFB68B]" />,
                title: "Network Pro",
                desc: "Synchronize world states and handle latency in real-time battles.",
                skills: "6 SKILLS →",
                pct: 0,
                complete: "0% COMPLETE",
                badge: "ADVANCED MASTERY",
                badgeColor: "#353436",
                badgeTextColor: "#FFB4AB",
              },
            ].map((path) => (
              <div
                key={path.title}
                className="bg-gradient-to-b from-[#1C1B1C] to-[#131314] border-t border-[#FF7A00] p-8 relative flex flex-col"
              >
                {/* Icon box */}
                <div className="w-16 h-16 bg-[#2A2A2B] flex items-center justify-center mb-8 shrink-0">
                  {path.icon}
                </div>

                {/* Title + desc */}
                <div className="mb-8 flex-1">
                  <h3 className="font-sora font-normal text-[24px] leading-[32px] text-[#E5E2E3] m-0 mb-2">
                    {path.title}
                  </h3>
                  <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E0C0AF] m-0 max-w-[260px]">
                    {path.desc}
                  </p>
                </div>

                {/* Progress row */}
                <div className="mb-6">
                  <div className="flex justify-between items-center font-mono text-[10px] leading-[16px] mb-[8px]">
                    <span className="text-[#00DBE9]">{path.skills}</span>
                    <span className="text-[#E0C0AF]">{path.complete}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-[#353436] relative">
                    {path.pct > 0 && (
                      <div
                        className="absolute top-0 left-0 h-full"
                        style={{
                          width: `${path.pct}%`,
                          background:
                            "linear-gradient(91.88deg, #B91C1C 0%, #FF7A00 50%, #FFE170 100%)",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Badge */}
                <div
                  className="inline-flex px-3 h-6 items-center font-mono text-[10px] leading-[16px] self-start"
                  style={{
                    background: path.badgeColor,
                    color: path.badgeTextColor,
                  }}
                >
                  {path.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 5.4: Weekly Challenge Banner ─────────────────────────── */}
        <div className="relative overflow-hidden border-2 border-[#FF7A00] bg-[#0D0D0D]">
          {/* Right decorative gradient */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-10"
            style={{
              background:
                "linear-gradient(117.72deg, #B91C1C 0%, #FF7A00 50%, #FFE170 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between px-[50px] py-[50px] gap-8">
            {/* Left: challenge info */}
            <div className="max-w-[649px]">
              {/* Label */}
              <div className="flex items-center gap-4 mb-9">
                <div className="w-3 h-3 bg-[#FF7A00] shrink-0" />
                <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#FFB68B]">
                  THIS WEEK
                </span>
              </div>

              {/* Heading */}
              <h3 className="font-sora font-bold text-[40px] sm:text-[48px] leading-[60px] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0 mb-9">
                MAKE A MECHANIC USING ONLY ONE BUTTON.
              </h3>

              {/* Countdown */}
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-[#FFB68B] shrink-0" />
                <span className="font-mono font-bold text-[16px] leading-[26px] tracking-[1.6px] text-[#E0C0AF]">
                  Ends in:{" "}
                  {pad(countdown.d)}d : {pad(countdown.h)}h :{" "}
                  {pad(countdown.m)}m : {pad(countdown.s)}s
                </span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col items-center lg:items-end gap-5 shrink-0">
              <button className="w-full lg:w-[251px] h-[68px] bg-[#FF7A00] font-sora font-black text-[20px] leading-[28px] uppercase text-[#522300] hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(255,122,0,0.2)] border-none cursor-pointer">
                SUBMIT ENTRY
              </button>
              <span className="font-mono font-normal text-[14px] leading-[20px] text-[#E0C0AF]">
                34 submissions so far
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
