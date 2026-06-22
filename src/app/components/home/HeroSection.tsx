"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="text-center pt-[15dvh] pb-[10dvh] relative overflow-hidden px-4">
      {/* Background Loop Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-[#131314]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131314]/80 via-transparent to-[#131314]" />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[400px] rounded-full bg-[#FF7A00]/5 blur-[120px] pointer-events-none" />

      <h1
        className="font-sora font-normal text-[clamp(48px,6.67vw,96px)] leading-none text-[#E5E2E3] mx-auto mb-[32px] max-w-[640px] transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transitionDelay: "100ms",
        }}
      >
        Welcome to <span className="text-neon-orange">Game Dev Collective.</span>
      </h1>

      <p
        className="font-sora font-normal text-[18px] leading-[28px] text-[#E0C0AF] max-w-[600px] mx-auto mb-[48px] transition-all duration-700 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transitionDelay: "250ms",
        }}
      >
        Step into a world where code becomes art and creativity fuels the arcade. Build games, earn XP, and rise through the ranks.
      </p>

      <div
        className="flex flex-col sm:flex-row gap-[24px] justify-center items-center transition-all duration-700 ease-out relative z-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transitionDelay: "400ms",
        }}
      >
        <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"} className="w-full sm:w-auto">
          <button className="bg-[#FF7A00] w-full sm:w-[248.48px] h-[52px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-300 relative overflow-hidden group/btn-hero shadow-lg hover:shadow-[#FF7A00]/20">
            <span className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn-hero:translate-x-[300%] transition-transform duration-700 ease-in-out" />
            <span className="relative z-10">{!loading && user ? "ENTER THE CLUB →" : "JOIN US →"}</span>
          </button>
        </Link>

        <a href="#jam" className="w-full sm:w-auto">
          <button className="bg-transparent border border-[#FF7A00] w-full sm:w-[248.48px] h-[52px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#FF7A00] cursor-pointer hover:bg-[#FF7A00]/10 hover:shadow-md hover:shadow-[#FF7A00]/10 transition-all duration-300">
            View Quest →
          </button>
        </a>
      </div>
    </section>
  );
}
