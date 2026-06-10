"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";

// Stable timestamp constant — avoids new Date() creating a new reference on every render
const JAM_TARGET_MS = new Date("2026-07-20T09:00:00").getTime();

// ─────────────────────────────────────────────
// COUNTDOWN HOOK  (accepts number, not Date)
// ─────────────────────────────────────────────
function useCountdown(targetMs: number) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = targetMs - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
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

// ─────────────────────────────────────────────
// NAV LINKS  (all protected — redirect to onboarding if no user)
// ─────────────────────────────────────────────
const navLinks = [
  { label: "Quest Board", href: "/dashboard/quests" },
  { label: "Arcade Wall", href: "/dashboard/arcade" },
  { label: "Character Select", href: "/dashboard/team" },
  { label: "Hall Of Fame", href: "/dashboard/leaderboard" },
  { label: "Inventory", href: "/dashboard/inventory" },
];

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
  { value: "847", label: "Members", color: "#FF7A00" },
  { value: "156", label: "Links Up", color: "#E9C400" },
  { value: "12K", label: "In Game", color: "#FF7A00" },
  { value: "2,340", label: "First Base", color: "#E9C400" },
];

// Shared font styles
const mono = "var(--font-jetbrains-mono), monospace";
const sora = "var(--font-sora), sans-serif";

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
    <div style={{ background: "#131314", color: "#E5E2E3", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#131314",
          borderBottom: "1px solid rgba(88,66,53,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 64px",
            height: "79px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: "39px", height: "40px", position: "relative", flexShrink: 0 }}>
              <Image src="/gdclogo.png" alt="GDC Logo" fill style={{ objectFit: "contain" }} />
            </div>
            <span
              style={{
                fontFamily: sora,
                fontWeight: 800,
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-1.2px",
                color: "#FFB68B",
              }}
            >
              GAME DEV CLUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNavLink(l.href)}
                style={{
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                className="hover:text-[#FFB68B] transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
              <button
                style={{
                  background: "#FF7A00",
                  width: "98.41px",
                  height: "28px",
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#5C2800",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {!loading && user ? "Terminal" : "Join Us"}
              </button>
            </Link>
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "#E0C0AF", background: "none", border: "none", cursor: "pointer" }}
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
          <div style={{ background: "#131314", borderTop: "1px solid rgba(88,66,53,0.3)", padding: "16px 64px" }}>
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => { handleNavLink(l.href); setMobileOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontFamily: mono, fontSize: "12px", letterSpacing: "1.2px", color: "#E0C0AF", background: "none", border: "none", cursor: "pointer" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", paddingTop: "208px", paddingBottom: "128px", position: "relative", overflow: "hidden" }}>
        {/* Ambient glow */}
        <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", borderRadius: "50%", background: "rgba(255,122,0,0.06)", filter: "blur(120px)", pointerEvents: "none" }} />

        <h1
          style={{
            fontFamily: sora,
            fontWeight: 400,
            fontSize: "clamp(48px, 6.67vw, 96px)",
            lineHeight: "1",
            color: "#E5E2E3",
            margin: "0 auto 32px",
            maxWidth: "640px",
          }}
        >
          Welcome to Game Dev Collective.
        </h1>

        <p
          style={{
            fontFamily: sora,
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#E0C0AF",
            maxWidth: "600px",
            margin: "0 auto 48px",
          }}
        >
          Step into a world where code becomes art and creativity fuels the arcade. Build games, earn XP, and rise through the ranks.
        </p>

        <div style={{ display: "flex", gap: "24px", justifyContent: "center", alignItems: "center" }}>
          <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
            <button
              style={{
                background: "#FF7A00",
                width: "211.66px",
                height: "52px",
                fontFamily: mono,
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#5C2800",
                border: "none",
                cursor: "pointer",
              }}
            >
              {!loading && user ? "ENTER FORGE →" : "INITIATE PROTOCOL →"}
            </button>
          </Link>
          <a href="#jam">
            <button
              style={{
                background: "transparent",
                border: "1px solid #FF7A00",
                width: "195.6px",
                height: "54px",
                fontFamily: mono,
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#FF7A00",
                cursor: "pointer",
              }}
            >
              DOX SOURCE →
            </button>
          </a>
        </div>
      </section>

      {/* ── THREE WAYS ── */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 96px",
          borderLeft: "2px solid rgba(88,66,53,0.2)",
          borderRight: "2px solid rgba(88,66,53,0.2)",
        }}
        id="sprint"
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: mono,
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "1.2px",
              color: "#FFB68B",
              textTransform: "uppercase",
              marginBottom: "26px",
            }}
          >
            FEATURES
          </p>
          <h2
            style={{
              fontFamily: sora,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.33vw, 48px)",
              lineHeight: "53px",
              letterSpacing: "-0.96px",
              color: "#E5E2E3",
              margin: "0 auto 16px",
              maxWidth: "672px",
            }}
          >
            Three ways to level up your craft.
          </h2>
          <p
            style={{
              fontFamily: sora,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#E0C0AF",
              maxWidth: "672px",
              margin: "0 auto",
            }}
          >
            Give every discipline a forge for growth, collaboration, and high-community activity.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 340px)", gap: "24px", justifyContent: "center" }}>
          {features.map((f) => (
            <div key={f.title}>
              {/* Image card */}
              <div
                style={{
                  width: "340px",
                  height: "191.25px",
                  background: "#201F20",
                  border: "1px solid #584235",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image src={f.img} alt={f.title} fill style={{ objectFit: "cover" }} />
              </div>
              {/* Title */}
              <h3
                style={{
                  fontFamily: sora,
                  fontWeight: 400,
                  fontSize: "24px",
                  lineHeight: "32px",
                  color: "#FFB68B",
                  marginTop: "24px",
                  marginBottom: "16px",
                }}
              >
                {f.title}
              </h3>
              {/* Desc */}
              <p
                style={{
                  fontFamily: sora,
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#E0C0AF",
                  marginBottom: "16px",
                  maxWidth: "322px",
                }}
              >
                {f.desc}
              </p>
              {/* Explore link */}
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "1.2px",
                  color: "#FF7A00",
                  textDecoration: "none",
                }}
              >
                Explore →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px 96px" }} id="meets">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          {/* Left */}
          <div style={{ paddingLeft: "64px" }}>
            <p
              style={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#FDD400",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              LIVE
            </p>
            <h2
              style={{
                fontFamily: sora,
                fontWeight: 700,
                fontSize: "clamp(32px, 3.33vw, 48px)",
                lineHeight: "53px",
                letterSpacing: "-0.96px",
                color: "#E5E2E3",
                marginBottom: "24px",
              }}
            >
              The collective keeps growing.
            </h2>
            <p
              style={{
                fontFamily: sora,
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#E0C0AF",
                maxWidth: "448px",
                marginBottom: "40px",
              }}
            >
              Real-time metrics from our distributed global network of creators and players.
            </p>
            <Link href="/onboarding">
              <button
                style={{
                  background: "#FDD400",
                  width: "130.41px",
                  height: "44px",
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "1.2px",
                  color: "#6F5C00",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Enlist
              </button>
            </Link>
          </div>

          {/* Right: 2×2 Stats grid */}
          <div
            style={{
              borderLeft: "1px solid rgba(88,66,53,0.3)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "48px",
                  borderRight: i % 2 === 0 ? "1px solid rgba(88,66,53,0.3)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(88,66,53,0.3)" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: sora,
                    fontWeight: 400,
                    fontSize: "48px",
                    lineHeight: "48px",
                    color: s.color,
                    marginBottom: "8px",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: mono,
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#A78B7C",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY / ABOUT ── */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          borderTop: "1px solid rgba(88,66,53,0.5)",
          borderBottom: "1px solid rgba(88,66,53,0.5)",
          padding: "0 80px",
          minHeight: "580px",
          display: "flex",
          alignItems: "stretch",
        }}
        id="community"
      >
        {/* Left vertical label */}
        <div
          style={{
            width: "48px",
            borderRight: "1px solid rgba(88,66,53,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "15px",
              color: "#A78B7C",
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
            }}
          >
            GDSC SCT — GAME DEV CLUB
          </span>
        </div>

        {/* Left content */}
        <div style={{ flex: 1, padding: "80px 80px 80px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p
            style={{
              fontFamily: mono,
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "1.2px",
              color: "#FF7A00",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            CONNECTED
          </p>
          <h2
            style={{
              fontFamily: sora,
              fontWeight: 700,
              fontSize: "clamp(32px, 3.33vw, 48px)",
              lineHeight: "60px",
              letterSpacing: "-0.96px",
              color: "#E5E2E3",
              maxWidth: "373px",
              marginBottom: "24px",
            }}
          >
            Build alongside creators who understand the grind.
          </h2>
          <p
            style={{
              fontFamily: sora,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "24px",
              color: "#E0C0AF",
              maxWidth: "394px",
              marginBottom: "40px",
            }}
          >
            We believe in radical transparency and cross-disciplinary mentorship for all members.
          </p>
          <Link href="/onboarding">
            <button
              style={{
                background: "transparent",
                border: "1px solid #FF7A00",
                width: "124.81px",
                height: "38px",
                fontFamily: mono,
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#FF7A00",
                cursor: "pointer",
              }}
            >
              Connect
            </button>
          </Link>
        </div>

        {/* Right image */}
        <div style={{ width: "677.59px", position: "relative", flexShrink: 0 }}>
          <Image
            src="/community_grind.png"
            alt="Game dev community working together"
            fill
            style={{ objectFit: "cover" }}
          />
          {/* Left-fade gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "128px",
              height: "100%",
              background: "linear-gradient(90deg, #131314 0%, rgba(19,19,20,0) 100%)",
            }}
          />
        </div>
      </section>

      {/* ── SPRING JAM ── */}
      <section
        id="jam"
        style={{
          background: "#1C1B1C",
          borderBottom: "1px solid rgba(88,66,53,0.3)",
          padding: "96px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 64px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div style={{ maxWidth: "633.59px" }}>
            <p
              style={{
                fontFamily: mono,
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#FFE170",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              NEXT QUEST
            </p>
            <h2
              style={{
                fontFamily: sora,
                fontWeight: 400,
                fontSize: "clamp(36px, 4.17vw, 60px)",
                lineHeight: "60px",
                color: "#E5E2E3",
                marginBottom: "40px",
              }}
            >
              Spring Game Jam 2025.
            </h2>

            {/* Date + Countdown row */}
            <div style={{ display: "flex", gap: "48px", marginBottom: "48px" }}>
              <div>
                <p style={{ fontFamily: mono, fontWeight: 400, fontSize: "10px", lineHeight: "15px", color: "#A78B7C", textTransform: "uppercase", marginBottom: "12px" }}>
                  Date
                </p>
                <p style={{ fontFamily: sora, fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#E5E2E3" }}>
                  April 18–20, 2025
                </p>
              </div>
              <div>
                <p style={{ fontFamily: mono, fontWeight: 400, fontSize: "10px", lineHeight: "15px", color: "#A78B7C", textTransform: "uppercase", marginBottom: "12px" }}>
                  Countdown
                </p>
                <p style={{ fontFamily: mono, fontWeight: 700, fontSize: "24px", lineHeight: "32px", color: "#FF7A00" }}>
                  {pad(countdown.d)}d : {pad(countdown.h)}h : {pad(countdown.m)}m
                </p>
              </div>
            </div>

            <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
              <button
                style={{
                  background: "#FF7A00",
                  width: "213.61px",
                  height: "60px",
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "1.4px",
                  color: "#5C2800",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ACCEPT QUEST →
              </button>
            </Link>
          </div>

          {/* Right: Poster */}
          <div>
            <div
              style={{
                width: "518.39px",
                height: "699.33px",
                background: "#201F20",
                border: "2px solid rgba(255,122,0,0.3)",
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
              }}
            >
              <div style={{ position: "absolute", inset: "14px", borderRadius: "4px", overflow: "hidden" }}>
                <Image
                  src="/game_jam_poster.png"
                  alt="Spring Game Jam 2025 poster"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Below poster: labels + progress */}
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "518.39px" }}>
              <span style={{ fontFamily: mono, fontWeight: 400, fontSize: "11px", lineHeight: "16px", letterSpacing: "1.1px", color: "#E0C0AF" }}>
                Registrations
              </span>
              <span style={{ fontFamily: mono, fontWeight: 700, fontSize: "11px", lineHeight: "16px", color: "#FF7A00" }}>
                24 / 100
              </span>
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: "8px", width: "502.39px", height: "4px", background: "rgba(88,66,53,0.2)", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ width: "24%", height: "100%", background: "#FF7A00", borderRadius: "9999px" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#131314",
          borderTop: "1px solid #584235",
          padding: "49px 64px",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Left: logo + copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ width: "32px", height: "32px", position: "relative", opacity: 0.8, flexShrink: 0 }}>
              <Image src="/gdclogo.png" alt="GDC Logo" fill style={{ objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: mono, fontWeight: 400, fontSize: "12px", lineHeight: "16px", color: "#A78B7C" }}>
              © 2025 Game Dev Collective // GDSC SCT. All rights reserved.
            </span>
          </div>

          {/* Right: footer links */}
          <div style={{ display: "flex", gap: "32px" }}>
            {["Privacy Policy", "Term of Service", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: mono,
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#A78B7C",
                  textDecoration: "none",
                }}
                className="hover:text-[#E0C0AF] transition-colors"
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
