"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useGameForge } from "@/context/GameForgeContext";


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
    </div>
  );
}
