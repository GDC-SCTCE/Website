"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { NAV_LINKS } from "@/constants/navigation";
import { MONO, SORA } from "@/constants/fonts";

const mono = MONO;
const sora = SORA;

const DEV_TOOLS = ["Unity", "Godot", "Unreal", "Blender", "Figma"];
const YEAR_OPTIONS = ["1st", "2nd", "3rd", "4th"];

const XP_LEVELS = [
  {
    id: "Newbie" as const,
    label: "Newbie",
    desc: "Fresh onto the grid. Ready to learn the fundamentals of the hub.",
  },
  {
    id: "Apprentice" as const,
    label: "Apprentice",
    desc: "Active contributor with basic project deployment experience.",
  },
  {
    id: "Veteran" as const,
    label: "Veteran",
    desc: "Elite architect of the Ignition ecosystem. Multi-project leads.",
  },
] as const;

type XPLevel = "Newbie" | "Apprentice" | "Veteran";

const navLinks = NAV_LINKS;


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
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div
        style={{
          minHeight: "100vh",
          background: "#131314",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: "12px",
            color: "#FF7A00",
            letterSpacing: "1.2px",
          }}
        >
          CONNECTING TO COMPILER...
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135.04deg, #131314 0%, #1C1B1C 100%)",
        color: "#E5E2E3",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* ── Ambient blobs ── */}
      <div
        style={{
          position: "absolute",
          width: "512px",
          height: "746px",
          left: "-136px",
          top: "79px",
          background: "#FFB68B",
          opacity: 0.03,
          filter: "blur(60px)",
          transform: "rotate(12deg)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "640px",
          height: "622px",
          left: "870px",
          top: "242px",
          background: "#00DBE9",
          opacity: 0.03,
          filter: "blur(75px)",
          transform: "rotate(-12deg)",
          pointerEvents: "none",
        }}
      />

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(19,19,20,0.96)",
          borderBottom: "1px solid rgba(88,66,53,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            height: "79px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="px-4 md:px-16"
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: "39px", height: "40px", position: "relative", flexShrink: 0 }}>
              <Image src="/gdclogo.png" alt="GDC Logo" fill style={{ objectFit: "contain" }} sizes="39px" />
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

          {/* Desktop nav */}
          <nav
            style={{ alignItems: "center", gap: "40px" }}
            className="hidden md:flex"
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              style={{
                background: "#FF7A00",
                width: "98.41px",
                height: "28px",
                fontFamily: mono,
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#5C2800",
                border: "none",
                cursor: "pointer",
              }}
              disabled
            >
              Join Us
            </button>
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
        {mobileOpen && (
          <div
            style={{
              background: "#131314",
              borderTop: "1px solid rgba(88,66,53,0.3)",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
            className="px-4 md:px-16 md:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "10px 0", fontFamily: mono, fontSize: "12px", letterSpacing: "1.2px", color: "#E0C0AF", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 64px 80px",
        }}
      >
        {/* ── PROGRESS HEADER ── */}
        <div style={{ textAlign: "center", paddingTop: "96px", marginBottom: "56px" }}>
          {/* Phase label */}
          <p
            style={{
              fontFamily: mono,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#00DBE9",
              marginBottom: "28px",
            }}
          >
            PHASE 02 / CHARACTER DATA
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: sora,
              fontWeight: 700,
              fontSize: "48px",
              lineHeight: "53px",
              letterSpacing: "-2.4px",
              textTransform: "uppercase",
              color: "#FFB68B",
              margin: "0 0 24px 0",
            }}
          >
            Initialize Protocol
          </h1>

          {/* Progress bar */}
          <div
            style={{
              display: "inline-block",
              width: "128px",
              position: "relative",
            }}
          >
            {/* Shadow layer */}
            <div
              style={{
                position: "absolute",
                width: "128px",
                height: "4px",
                top: 0,
                left: 0,
                background: "rgba(255,255,255,0.002)",
                boxShadow: "0px 4px 20px -5px rgba(255,182,139,0.6)",
              }}
            />
            {/* Fill */}
            <div
              style={{
                width: "128px",
                height: "4px",
                background: "#FFB68B",
                marginTop: "4px",
              }}
            />
          </div>
        </div>

        {/* ── TWO COLUMN FORM ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "738.67px 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* ───── LEFT: BASE STATS ───── */}
          <div>
            {/* Section title */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "48px" }}>
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: "48px",
                  lineHeight: "53px",
                  letterSpacing: "-0.96px",
                  color: "#353436",
                }}
              >
                03
              </span>
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: "32px",
                  lineHeight: "48px",
                  textTransform: "uppercase",
                  color: "#E5E2E3",
                }}
              >
                BASE STATS
              </span>
            </div>

            {/* Row 1: Full Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "357.33px 357.33px", gap: "24px", marginBottom: "36px" }}>
              {/* Full Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: mono,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "12px",
                    letterSpacing: "1.2px",
                    color: "#E0C0AF",
                    marginBottom: "20px",
                    paddingLeft: "4px",
                  }}
                >
                  FULL NAME
                </label>
                <div style={{ borderBottom: "1px solid #D0D0D0", paddingBottom: "13px" }}>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jaxen Sterling"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: sora,
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#353436",
                      caretColor: "#FFB68B",
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: mono,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "12px",
                    letterSpacing: "1.2px",
                    color: "#E0C0AF",
                    marginBottom: "20px",
                    paddingLeft: "4px",
                  }}
                >
                  EMAIL ADDRESS
                </label>
                <div style={{ borderBottom: "1px solid #D0D0D0", paddingBottom: "13px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jaxen@ignition.hub"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: sora,
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#353436",
                      caretColor: "#FFB68B",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Roll No + Academic Year */}
            <div style={{ display: "grid", gridTemplateColumns: "357.33px 357.33px", gap: "24px" }}>
              {/* Roll No */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: mono,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "12px",
                    letterSpacing: "1.2px",
                    color: "#E0C0AF",
                    marginBottom: "20px",
                    paddingLeft: "4px",
                  }}
                >
                  ROLL NO.
                </label>
                <div style={{ borderBottom: "1px solid #D0D0D0", paddingBottom: "13px" }}>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="IH-8829-X"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: sora,
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#353436",
                      caretColor: "#FFB68B",
                    }}
                  />
                </div>
              </div>

              {/* Academic Year */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: mono,
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "12px",
                    letterSpacing: "1.2px",
                    color: "#E0C0AF",
                    marginBottom: "20px",
                    paddingLeft: "4px",
                  }}
                >
                  ACADEMIC YEAR
                </label>
                <div style={{ display: "flex" }}>
                  {YEAR_OPTIONS.map((y) => {
                    const isActive = year === y;
                    return (
                      <button
                        key={y}
                        onClick={() => setYear(y)}
                        style={{
                          width: "83.33px",
                          height: "48px",
                          background: isActive ? "#FF7A00" : "transparent",
                          border: isActive ? "1px solid #FF7A00" : "1px solid #353436",
                          fontFamily: mono,
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "15px",
                          color: isActive ? "#522300" : "#E5E2E3",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          transition: "all 0.15s ease",
                        }}
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
            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "48px" }}>
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: "48px",
                  lineHeight: "53px",
                  letterSpacing: "-0.96px",
                  color: "#353436",
                }}
              >
                04
              </span>
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: "32px",
                  lineHeight: "48px",
                  textTransform: "uppercase",
                  color: "#E5E2E3",
                }}
              >
                LOADOUT
              </span>
            </div>

            {/* Development Tools */}
            <div style={{ marginBottom: "56px" }}>
              <p
                style={{
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  marginBottom: "28px",
                }}
              >
                DEVELOPMENT TOOLS
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {DEV_TOOLS.map((tool) => {
                  const isSelected = selectedTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      style={{
                        height: "33px",
                        padding: "0 16px",
                        background: isSelected ? "#FFB68B" : "transparent",
                        border: isSelected ? "none" : "1px solid #353436",
                        fontFamily: mono,
                        fontWeight: 400,
                        fontSize: "10px",
                        lineHeight: "15px",
                        color: isSelected ? "#522300" : "#E0C0AF",
                        cursor: "pointer",
                        boxShadow: isSelected ? "0px 4px 20px -5px rgba(255,182,139,0.6)" : "none",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* XP Classification */}
            <div>
              <p
                style={{
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  marginBottom: "28px",
                }}
              >
                XP CLASSIFICATION
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {XP_LEVELS.map((lvl) => {
                  const isSelected = xpLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => setXpLevel(lvl.id)}
                      style={{
                        width: "100%",
                        height: "69px",
                        background: "#1C1B1C",
                        border: isSelected ? "1px solid #FFB68B" : "1px solid #353436",
                        padding: "17px 17px 17px 49px",
                        textAlign: "left",
                        cursor: "pointer",
                        position: "relative",
                        boxSizing: "border-box",
                        transition: "border-color 0.15s ease",
                      }}
                    >
                      {/* Radio circle */}
                      <span
                        style={{
                          position: "absolute",
                          left: "17px",
                          top: "26.5px",
                          width: "16px",
                          height: "16px",
                          border: "2px solid #353436",
                          borderRadius: "50%",
                          display: "inline-block",
                          background: isSelected ? "#FFB68B" : "transparent",
                          boxSizing: "border-box",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: mono,
                          fontWeight: 400,
                          fontSize: "12px",
                          lineHeight: "18px",
                          color: "#FFB68B",
                          margin: "0 0 2px 0",
                        }}
                      >
                        {lvl.label}
                      </p>
                      <p
                        style={{
                          fontFamily: sora,
                          fontWeight: 400,
                          fontSize: "11px",
                          lineHeight: "16px",
                          color: "#E0C0AF",
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
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
        <div style={{ textAlign: "center", marginTop: "96px" }}>
          <div style={{ display: "inline-block", position: "relative" }}>
            {/* Glow behind button */}
            <div
              style={{
                position: "absolute",
                inset: "-4px",
                background: "linear-gradient(90deg, #FFB68B 0%, #FDD400 100%)",
                opacity: 0.25,
                filter: "blur(4px)",
                pointerEvents: "none",
              }}
            />
            <button
              onClick={handleJoin}
              disabled={submitting || !fullName.trim()}
              style={{
                position: "relative",
                width: "469.81px",
                height: "78px",
                background: !fullName.trim() ? "#584235" : "#FFB68B",
                border: "none",
                fontFamily: sora,
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "30px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#522300",
                cursor: fullName.trim() ? "pointer" : "not-allowed",
                transition: "background 0.2s ease, transform 0.15s ease",
                opacity: !fullName.trim() ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (fullName.trim()) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {submitting ? "INITIALIZING..." : "JOIN THE COLLECTIVE →"}
            </button>
          </div>
          <p
            style={{
              fontFamily: mono,
              fontWeight: 400,
              fontSize: "10px",
              lineHeight: "15px",
              color: "#353436",
              marginTop: "20px",
            }}
          >
            By joining, you agree to the Terms of Service
          </p>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#131314",
          borderTop: "2px solid #353436",
          height: "142px",
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            width: "100%",
            margin: "0 auto",
            padding: "0 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo + Tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <div style={{ width: "32px", height: "32px", position: "relative", flexShrink: 0 }}>
                <Image src="/gdclogo.png" alt="GDC Logo" fill style={{ objectFit: "contain" }} sizes="32px" />
              </div>
              <span
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#FFB68B",
                }}
              >
                GAME DEV CLUB
              </span>
            </div>
            <p
              style={{
                fontFamily: mono,
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "12px",
                letterSpacing: "1.2px",
                color: "#E0C0AF",
                margin: 0,
              }}
            >
              © 2024 GAME DEV COLLECTIVE. BUILT FOR PERFORMANCE.
            </p>
          </div>

          {/* Right: Footer links */}
          <div style={{ display: "flex", gap: "32px" }}>
            {["Support", "GitHub", "Discord", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: mono,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  textDecoration: "none",
                }}
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
