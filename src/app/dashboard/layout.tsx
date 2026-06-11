"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useGameForge } from "@/context/GameForgeContext";

const footerLinks = [
  { label: "Privacy_Protocol", href: "#" },
  { label: "Terms_of_Service", href: "#" },
  { label: "Debug_Logs", href: "#" },
];


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useGameForge();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131314] flex items-center justify-center">
        <span className="font-mono text-[12px] text-[#FF7A00] tracking-[1.2px]">
          AUTHENTICATING TERMINAL PROTOCOL...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131314] flex flex-col">

      {/* ── NAVBAR ── */}
      <Navbar />

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
