"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useGameForge } from "@/context/GameForgeContext";
import { Search, Bell, ExternalLink } from "lucide-react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

// ─────────────────────────────────────────────
// COUNTDOWN HOOK
// Uses a timestamp (number) to avoid new Date() object reference changing every render
// ─────────────────────────────────────────────
function useCountdown(targetMs: number): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  return timeLeft;
}

// Date constants defined OUTSIDE components so they never change reference
const CARD1_TARGET_MS = new Date("2025-05-16T23:59:00").getTime();
const CARD2_TARGET_MS = new Date("2025-06-02T09:00:00").getTime();

// ─────────────────────────────────────────────
// FILTER TABS
// ─────────────────────────────────────────────
const filters = ["All", "Workshops", "Base Jams", "Talks"];

// ─────────────────────────────────────────────
// PAST QUESTS DATA
// ─────────────────────────────────────────────
const pastQuests = [
  {
    id: "p1",
    image: "/past_game_jam.png",
    title: "Game Jam #1 · April 2025",
    meta: "#1 attended  🏆 1.0",
  },
  {
    id: "p2",
    image: "/past_unity_workshop.png",
    title: "Unity Workshop · March 2025",
    meta: "#1 attended  🏆 3",
  },
];

// ─────────────────────────────────────────────
// CARD 1 — Cyberpunk Level Design (Active)
// ─────────────────────────────────────────────
function Card1() {
  const timer = useCountdown(CARD1_TARGET_MS);
  const pad = (n: number) => String(n).padStart(2, "0");
  const seatsTotal = 50;
  const seatsTaken = 12;
  const progressPct = (seatsTaken / seatsTotal) * 100;

  return (
    <div
      className="flex flex-col"
      style={{
        background: "linear-gradient(180deg, #161618 0%, #131314 100%)",
        borderTop: "1px solid #FF7A00",
        flex: 1,
      }}
    >
      {/* Image area */}
      <div className="relative mx-6 mt-6" style={{ height: "290px" }}>
        <Image
          src="/quest_cyberpunk_level.png"
          alt="Cyberpunk Level Design Workshop"
          fill
          className="object-cover"
        />
        {/* Active badge */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1"
          style={{
            background: "rgba(19,19,20,0.8)",
            border: "1px solid #FFB68B",
            backdropFilter: "blur(2px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#FF7A00" }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "15px",
              color: "#FFB68B",
            }}
          >
            Active
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="mx-6 mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "48px",
            color: "#E5E2E3",
          }}
        >
          Cyberpunk Level Design
        </h3>

        {/* Date / Location */}
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#E0C0AF",
          }}
        >
          May 14-16 · Virtual
        </p>

        {/* Separator */}
        <div className="mt-6" style={{ borderTop: "1px solid #584235" }} />

        {/* Timer + Seats */}
        <div className="flex items-start justify-between mt-6">
          <div>
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "10px",
                lineHeight: "15px",
                color: "#E0C0AF",
              }}
            >
              Time Remaining
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#FFB68B",
              }}
            >
              {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
            </p>
          </div>
          <div className="text-right">
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "10px",
                lineHeight: "15px",
                color: "#E0C0AF",
              }}
            >
              Seats Available
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#E5E2E3",
              }}
            >
              {seatsTaken} / {seatsTotal}
            </p>
          </div>
        </div>

        {/* Progress bar track */}
        <div className="mt-4 relative" style={{ height: "2px", background: "#353436" }}>
          {/* Active fill with gradient */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, #93000A 0%, #FF7A00 50%, #FDD400 100%)",
            }}
          />
        </div>

        {/* CTA Button */}
        <button
          className="mt-6 mb-6 w-full flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
          style={{
            height: "48px",
            background: "#FF7A00",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#5C2800",
            }}
          >
            Accept Quest →
          </span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD 2 — Sound Design Masterclass (Soon)
// ─────────────────────────────────────────────
function Card2() {
  const timer = useCountdown(CARD2_TARGET_MS);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="flex flex-col"
      style={{
        background: "linear-gradient(180deg, #161618 0%, #131314 100%)",
        borderTop: "1px solid #FF7A00",
        opacity: 0.9,
        flex: 1,
      }}
    >
      {/* Image area */}
      <div className="relative mx-6 mt-6" style={{ height: "290px" }}>
        <Image
          src="/quest_sound_design.png"
          alt="Sound Design Masterclass"
          fill
          className="object-cover"
        />
        {/* Soon badge */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1"
          style={{
            background: "rgba(19,19,20,0.8)",
            border: "1px solid #A78B7C",
            backdropFilter: "blur(2px)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "15px",
              color: "#E0C0AF",
            }}
          >
            Soon
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="mx-6 mt-6 flex flex-col flex-1">
        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            lineHeight: "48px",
            color: "#E5E2E3",
          }}
        >
          Sound Design Masterclass
        </h3>

        {/* Date / Location */}
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#E0C0AF",
          }}
        >
          June 02 · Main Hall
        </p>

        {/* Separator */}
        <div className="mt-6" style={{ borderTop: "1px solid #584235" }} />

        {/* Timer + Reservation */}
        <div className="flex items-start justify-between mt-6">
          <div>
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "10px",
                lineHeight: "15px",
                color: "#E0C0AF",
              }}
            >
              Unlocks In
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#E5E2E3",
              }}
            >
              {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
            </p>
          </div>
          <div className="text-right">
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "10px",
                lineHeight: "15px",
                color: "#E0C0AF",
              }}
            >
              Reservation
            </p>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "26px",
                color: "#E5E2E3",
              }}
            >
              0 / 30
            </p>
          </div>
        </div>

        {/* Divider grey */}
        <div className="mt-4" style={{ height: "2px", background: "#353436" }} />

        {/* CTA Button — outlined */}
        <button
          className="mt-6 mb-6 w-full flex items-center justify-center gap-2 transition-colors hover:bg-[#FFB68B]/5 cursor-pointer"
          style={{
            height: "56px",
            border: "2px solid #FFB68B",
            background: "transparent",
          }}
        >
          <Bell
            className="w-4 h-5"
            style={{ color: "#FFB68B" }}
          />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#FFB68B",
            }}
          >
            Notify Me
          </span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function QuestBoard() {
  const { user } = useGameForge();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  if (!user) return null;

  return (
    <div
      style={{ background: "#131314", color: "#E5E2E3" }}
    >
      {/* ── PAGE HEADER ── */}
      <div className="px-16 pt-[120px] pb-0">
        {/* "All quests" label */}
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: "1.2px",
            color: "#FFB68B",
          }}
        >
          All quests
        </p>

        {/* THE QUEST BOARD. */}
        <h1
          className="mt-7 uppercase"
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(48px, 5.5vw, 80px)",
            lineHeight: "1",
            letterSpacing: "-3.2px",
            color: "#E5E2E3",
          }}
        >
          THE QUEST BOARD.
        </h1>

        {/* Filter bar border container */}
        <div
          className="mt-10 flex items-center justify-between"
          style={{
            borderTop: "1px solid #584235",
            borderBottom: "1px solid #584235",
            paddingTop: "36px",
            paddingBottom: "36px",
          }}
        >
          {/* Filter tabs */}
          <div className="flex items-center gap-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="cursor-pointer transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: activeFilter === f ? "#FFB68B" : "#E0C0AF",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative">
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "#E0C0AF" }}
            >
              <Search className="w-[15px] h-[15px]" style={{ color: "#E0C0AF" }} />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none"
              style={{
                width: "256px",
                height: "34px",
                background: "#1C1B1C",
                borderBottom: "2px solid #584235",
                paddingLeft: "40px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "16px",
                letterSpacing: "1.2px",
                color: "#E0C0AF",
              }}
            />
            {/* Placeholder color via inline style workaround */}
          </div>
        </div>
      </div>

      {/* ── ACTIVE QUEST CARDS ── */}
      <div
        className="flex gap-0 mt-0"
        style={{ paddingLeft: "64px", paddingRight: "64px", gap: "44px" }}
      >
        <div style={{ flex: 1 }}>
          <Card1 />
        </div>
        <div style={{ flex: 1 }}>
          <Card2 />
        </div>
      </div>

      {/* ── QUESTS CONQUERED ── */}
      <div className="px-16 mt-16 pb-16">
        {/* "Completed" label */}
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: "1.2px",
            color: "#FFF3D2",
          }}
        >
          Completed
        </p>

        {/* QUESTS CONQUERED. */}
        <h2
          className="mt-7 uppercase"
          style={{
            fontFamily: "var(--font-sora), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 3.5vw, 48px)",
            lineHeight: "1.1",
            letterSpacing: "-0.96px",
            color: "#E5E2E3",
          }}
        >
          QUESTS CONQUERED.
        </h2>

        {/* Past Quests List */}
        <div className="mt-8">
          {pastQuests
            .filter((q) =>
              q.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((quest) => (
              <div
                key={quest.id}
                className="flex items-center justify-between"
                style={{
                  borderTop: "1px solid #584235",
                  paddingTop: "25px",
                  paddingBottom: "25px",
                }}
              >
                {/* Left: thumbnail + info */}
                <div className="flex items-center gap-7">
                  {/* Thumbnail */}
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{
                      width: "96px",
                      height: "64px",
                      background: "#fff",
                      mixBlendMode: "normal",
                    }}
                  >
                    <Image
                      src={quest.image}
                      alt={quest.title}
                      fill
                      className="object-cover"
                      style={{ mixBlendMode: "saturation" }}
                    />
                  </div>

                  {/* Title + meta */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-sora), sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "26px",
                        color: "#E5E2E3",
                      }}
                    >
                      {quest.title}
                    </p>
                    <p
                      className="mt-1"
                      style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontWeight: 400,
                        fontSize: "10px",
                        lineHeight: "15px",
                        color: "#E0C0AF",
                      }}
                    >
                      {quest.meta}
                    </p>
                  </div>
                </div>

                {/* Right: View Report link */}
                <a
                  href="#"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono), monospace",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "12px",
                      letterSpacing: "1.2px",
                      color: "#FFF3D2",
                    }}
                  >
                    View Report
                  </span>
                  <ExternalLink
                    className="w-[10.67px] h-[10.67px]"
                    style={{ color: "#FFF3D2" }}
                  />
                </a>
              </div>
            ))}

          {/* Bottom border of last row */}
          <div style={{ borderBottom: "1px solid #584235" }} />
        </div>
      </div>
    </div>
  );
}
