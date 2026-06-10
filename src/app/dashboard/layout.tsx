"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { NAV_LINKS } from "@/constants/navigation";


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
      <div className="min-h-screen bg-[#131314] flex items-center justify-center">
        <span className="font-mono text-[12px] text-[#FF7A00] tracking-[1.2px]">
          AUTHENTICATING TERMINAL PROTOCOL...
        </span>
      </div>
    );
  }

  const handleLogout = () => { logout(); router.push("/"); };

  return (
    <div className="min-h-screen bg-[#131314] flex flex-col">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#131314] border-b border-[#584235]/40 h-[79px] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-[12px] no-underline shrink-0">
            <div className="w-[39px] h-[40px] relative">
              <Image src="/gdclogo.png" alt="GDC Logo" fill className="object-contain" />
            </div>
            <span className="font-sora font-extrabold text-[20px] md:text-[24px] leading-[32px] tracking-[-1.2px] text-[#FFB68B] hidden min-[420px]:inline-block">
              GAME DEV CLUB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[40px]">
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`font-mono text-[12px] leading-[12px] tracking-[1.2px] no-underline transition-colors duration-200 ${isActive ? "font-bold text-[#FFB68B]" : "font-semibold text-[#E0C0AF] hover:text-[#FFB68B]"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-[16px] shrink-0">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/onboarding">
                <button
                  className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200"
                >
                  Join Us
                </button>
              </Link>
            )}
            <button
              className="md:hidden text-[#E0C0AF] bg-transparent border-none cursor-pointer p-1"
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

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="absolute top-[79px] left-0 right-0 bg-[#131314] border-t border-[#584235]/40 py-[16px] z-60 px-4 md:px-16 md:hidden">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-[10px] font-mono text-[12px] tracking-[1.2px] no-underline ${pathname === l.href ? "text-[#FFB68B]" : "text-[#E0C0AF] hover:text-[#FFB68B]"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="h-[66px] bg-[#131314] border-t border-[#584235] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-16">
          {/* Left: brand */}
          <span className="font-sora font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3]">
            GAME FORGE COLLECTIVE
          </span>

          {/* Center: footer nav */}
          <nav className="flex items-center gap-[32px]">
            {footerLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono font-normal text-[11px] leading-[16px] text-[#A78B7C] no-underline hover:text-[#E0C0AF] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: copyright */}
          <span className="font-sora font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#A78B7C]">
            © 2024 GAME FORGE COLLECTIVE // SYSTEM_READY
          </span>
        </div>
      </footer>
    </div>
  );
}
