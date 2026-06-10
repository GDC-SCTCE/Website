"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { NAV_LINKS } from "@/constants/navigation";
import { MONO, SORA } from "@/constants/fonts";

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
            fontFamily: MONO,
            fontSize: "12px",
            color: "#FF7A00",
            letterSpacing: "1.2px",
          }}
        >
          INITIALIZING PROTOCOL...
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(142.68deg, #131314 0%, #1C1B1C 100%)",
        color: "#E5E2E3",
        overflowX: "hidden",
      }}
    >
      {/* ── ATMOSPHERIC ELEMENTS ── */}
      {/* Orange ambient glow centre */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          width: "384px",
          height: "384px",
          left: "50%",
          top: "22%",
          transform: "translateX(-50%)",
          background: "#FFB68B",
          opacity: 0.05,
          filter: "blur(60px)",
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Cyan ambient glow bottom-right */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          width: "256px",
          height: "256px",
          right: "10%",
          bottom: "20%",
          background: "#00DBE9",
          opacity: 0.05,
          filter: "blur(50px)",
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Canvas particle grid */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(180deg, #FF7A00 1.25%, rgba(255,122,0,0) 1.25%), linear-gradient(90deg, #FF7A00 1.25%, rgba(255,122,0,0) 1.25%)",
          backgroundSize: "80px 80px",
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

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
            height: "79px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="px-4 md:px-16"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "39px",
                height: "40px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src="/gdclogo.png"
                alt="GDC Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: SORA,
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  textDecoration: "none",
                }}
                className="hover:text-[#FFB68B] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA — already logged in, show "Dashboard" */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/dashboard/quests">
              <button
                style={{
                  background: "#FF7A00",
                  width: "98px",
                  height: "28px",
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "12px",
                  letterSpacing: "1.2px",
                  color: "#5C2800",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                DASHBOARD
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              style={{ color: "#E0C0AF", background: "none", border: "none", cursor: "pointer" }}
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
          <div
            style={{
              background: "#131314",
              borderTop: "1px solid rgba(88,66,53,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
            className="px-4 md:px-16 md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: MONO,
                  fontSize: "12px",
                  letterSpacing: "1.2px",
                  color: "#E0C0AF",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT ── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "178px 64px 80px",
          maxWidth: "1440px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* ── SUCCESS INDICATOR ── */}
        <div
          style={{
            position: "relative",
            width: "128px",
            height: "128px",
            marginBottom: "48px",
          }}
        >
          {/* Outer decorative border — rotated 45° */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              width: "160px",
              height: "160px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%) rotate(45deg)",
              border: "1px solid rgba(255,182,139,0.2)",
              pointerEvents: "none",
            }}
          />
          {/* Inner decorative border — rotated -12° */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              width: "144px",
              height: "144px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%) rotate(-12deg)",
              border: "1px solid rgba(0,219,233,0.2)",
              pointerEvents: "none",
            }}
          />
          {/* Main indicator box */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#1C1B1C",
              border: "2px solid #FF7A00",
              boxShadow: "0px 0px 15px rgba(255,122,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
        <div
          style={{
            width: "100%",
            maxWidth: "842px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          {/* "CHARACTER CREATED" label */}
          <p
            style={{
              fontFamily: MONO,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "2.4px",
              textTransform: "uppercase",
              color: "#FFB68B",
              margin: "0 0 28px",
              textAlign: "center",
            }}
          >
            Character Created
          </p>

          {/* Main heading */}
          <h1
            style={{
              fontFamily: SORA,
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 80px)",
              lineHeight: 1,
              letterSpacing: "-3.2px",
              color: "#E5E2E3",
              textAlign: "center",
              margin: 0,
            }}
          >
            Welcome to the party,{" "}
            <span style={{ color: "#FF7A00" }}>{user.nickname}.</span>
          </h1>
        </div>

        {/* ── DESCRIPTION ── */}
        <p
          style={{
            fontFamily: SORA,
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#E0C0AF",
            textAlign: "center",
            maxWidth: "570px",
            margin: "0 0 80px",
          }}
        >
          Check your email. Your adventure starts now. Your inventory is
          synchronized, and your initial tools are ready for deployment in the
          engine.
        </p>

        {/* ── CTA BUTTONS ── */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "80px",
          }}
        >
          {/* Primary: JOIN OUR DISCORD */}
          <a
            id="success-join-discord"
            href="https://discord.gg/gdcsct"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              width: "365px",
              height: "80px",
              background: "#FF7A00",
              boxShadow: "0px 0px 15px rgba(255,122,0,0.6)",
              textDecoration: "none",
              flexShrink: 0,
            }}
            className="hover:brightness-110 transition-all duration-200"
          >
            <span
              style={{
                fontFamily: SORA,
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "28px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#522300",
              }}
            >
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "326px",
              height: "80px",
              border: "2px solid #FF7A00",
              textDecoration: "none",
              flexShrink: 0,
            }}
            className="hover:bg-[rgba(255,122,0,0.05)] transition-all duration-200"
          >
            <span
              style={{
                fontFamily: SORA,
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "28px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#FFB68B",
              }}
            >
              Go To Inventory
            </span>
          </Link>
        </div>

        {/* ── BENTO-LITE CARDS ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            width: "100%",
            maxWidth: "896px",
            marginBottom: "120px",
          }}
        >
          {/* Card 1 — Hardware Sync */}
          <div
            style={{
              background: "#1C1B1C",
              borderTop: "2px solid #FFB68B",
              padding: "26px 24px 28px",
              minHeight: "144px",
              position: "relative",
            }}
          >
            {/* Icon — rect placeholder */}
            <div
              style={{
                width: "18px",
                height: "18px",
                background: "#FFB68B",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "12px",
                letterSpacing: "1.2px",
                color: "#E5E2E3",
                margin: "0 0 16px",
                textTransform: "uppercase",
              }}
            >
              Hardware Sync
            </p>
            <p
              style={{
                fontFamily: SORA,
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#E0C0AF",
                margin: 0,
              }}
            >
              Vitals and system performance linked to your neural link profile.
            </p>
          </div>

          {/* Card 2 — Season Zero Pass */}
          <div
            style={{
              background: "#1C1B1C",
              borderTop: "2px solid #00DBE9",
              padding: "26px 24px 28px",
              minHeight: "144px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "20px",
                background: "#00DBE9",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "12px",
                letterSpacing: "1.2px",
                color: "#E5E2E3",
                margin: "0 0 16px",
                textTransform: "uppercase",
              }}
            >
              Season Zero Pass
            </p>
            <p
              style={{
                fontFamily: SORA,
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#E0C0AF",
                margin: 0,
              }}
            >
              Exclusive legacy content unlocked for{" "}
              <span style={{ color: "#FFB68B", fontWeight: 600 }}>
                {user.nickname}
              </span>
              .
            </p>
          </div>

          {/* Card 3 — Team Channel */}
          <div
            style={{
              background: "#1C1B1C",
              borderTop: "2px solid #753400",
              padding: "26px 24px 28px",
              minHeight: "144px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#753400",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "12px",
                letterSpacing: "1.2px",
                color: "#E5E2E3",
                margin: "0 0 16px",
                textTransform: "uppercase",
              }}
            >
              Team Channel
            </p>
            <p
              style={{
                fontFamily: SORA,
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#E0C0AF",
                margin: 0,
              }}
            >
              Assigned to Collective Vanguard for the upcoming campaign.
            </p>
          </div>
        </div>

        {/* ── SUCCESS VISUAL ELEMENT ── */}
        <div
          style={{
            width: "100%",
            maxWidth: "1312px",
            height: "256px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "48px",
          }}
        >
          {/* Glowing platform visual */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "440px",
              height: "40px",
              background:
                "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,122,0,0.55) 0%, rgba(255,122,0,0) 80%)",
              borderRadius: "50%",
              filter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              width: "520px",
              height: "6px",
              background: "rgba(255,122,0,0.25)",
              borderRadius: "50%",
              filter: "blur(2px)",
            }}
          />
          {/* Central trophy / gear ring */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", zIndex: 1, opacity: 0.7 }}
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
      <footer
        style={{
          background: "#131314",
          borderTop: "2px solid #353436",
          height: "142px",
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/gdclogo.png"
                  alt="GDC Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="32px"
                />
              </div>
              <span
                style={{
                  fontFamily: SORA,
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
                fontFamily: MONO,
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

          {/* Right: Footer nav links */}
          <div style={{ display: "flex", gap: "32px" }}>
            {["Support", "GitHub", "Discord", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontFamily: MONO,
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
