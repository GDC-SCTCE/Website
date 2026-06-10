"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { NAV_LINKS } from "@/constants/navigation";
import { MONO, SORA } from "@/constants/fonts";

const sora = SORA;
const mono = MONO;

const navLinks = NAV_LINKS;

const footerLinks = [
  { label: "Privacy_Protocol", href: "#" },
  { label: "Terms_of_Service", href: "#" },
  { label: "Debug_Logs", href: "#" },
];


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useGameForge();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#131314", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: mono, fontSize: "12px", color: "#FF7A00", letterSpacing: "1.2px" }}>
          AUTHENTICATING TERMINAL PROTOCOL...
        </span>
      </div>
    );
  }

  const handleLogout = () => { logout(); router.push("/"); };

  return (
    <div style={{ minHeight: "100vh", background: "#131314", display: "flex", flexDirection: "column" }}>

      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#131314",
          borderBottom: "1px solid rgba(88,66,53,0.4)",
          height: "79px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="px-4 md:px-16"
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: "39px", height: "40px", position: "relative" }}>
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
          <nav style={{ alignItems: "center", gap: "40px" }} className="hidden md:flex">
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontFamily: mono,
                    fontWeight: isActive ? 700 : 600,
                    fontSize: "12px",
                    lineHeight: "12px",
                    letterSpacing: "1.2px",
                    color: isActive ? "#FFB68B" : "#E0C0AF",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: CTA + mobile toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            {user ? (
              <button
                onClick={handleLogout}
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
                Sign Out
              </button>
            ) : (
              <Link href="/onboarding">
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
                  Join Us
                </button>
              </Link>
            )}
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

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            style={{
              position: "absolute",
              top: "79px",
              left: 0,
              right: 0,
              background: "#131314",
              borderTop: "1px solid rgba(88,66,53,0.4)",
              paddingTop: "16px",
              paddingBottom: "16px",
              zIndex: 60,
            }}
            className="px-4 md:px-16 md:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "10px 0", fontFamily: mono, fontSize: "12px", letterSpacing: "1.2px", color: pathname === l.href ? "#FFB68B" : "#E0C0AF", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer
        style={{
          height: "66px",
          background: "#131314",
          borderTop: "1px solid #584235",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: brand */}
          <span
            style={{
              fontFamily: sora,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#E5E2E3",
            }}
          >
            GAME FORGE COLLECTIVE
          </span>

          {/* Center: footer nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: mono,
                  fontWeight: 400,
                  fontSize: "11px",
                  lineHeight: "16px",
                  color: "#A78B7C",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: copyright */}
          <span
            style={{
              fontFamily: sora,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#A78B7C",
            }}
          >
            © 2024 GAME FORGE COLLECTIVE // SYSTEM_READY
          </span>
        </div>
      </footer>
    </div>
  );
}
