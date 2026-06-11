"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/constants/navigation";
import { useGameForge } from "@/context/GameForgeContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "";
  const router = useRouter();
  const { user, logout, loading } = useGameForge();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Determine what type of navbar to render based on pathname
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");
  const isOnboarding = pathname === "/onboarding";
  const isSuccess = pathname === "/onboarding/success";

  // For home page smooth scroll
  const handleNavLink = (href: string) => {
    if (isHome && href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
    setMobileOpen(false);
  };

  // Determine CTA Node
  let ctaNode;
  if (isAdmin) {
    ctaNode = (
      <button
        onClick={() => router.push("/")}
        className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200"
      >
        Sign Out
      </button>
    );
  } else if (isSuccess) {
    ctaNode = (
      <Link href="/dashboard/quests">
        <button className="bg-[#FF7A00] px-4 h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200 flex items-center justify-center">
          DASHBOARD
        </button>
      </Link>
    );
  } else if (isOnboarding) {
    ctaNode = (
      <button
        className="bg-[#FF7A00]/50 w-[98.41px] h-[28px] font-mono font-semibold text-[12px] tracking-[1.2px] text-[#5C2800]/60 border-none cursor-not-allowed flex items-center justify-center"
        disabled
      >
        Join Us
      </button>
    );
  } else if (isHome) {
    ctaNode = (
      <Link href={!loading && user ? "/dashboard/quests" : "/onboarding"}>
        <button className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-300 relative overflow-hidden group/btn-nav flex items-center justify-center">
          <span className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn-nav:translate-x-[300%] transition-transform duration-500 ease-in-out" />
          <span className="relative z-10">{!loading && user ? "Terminal" : "Join Us"}</span>
        </button>
      </Link>
    );
  } else {
    // Standard Dashboard CTA
    ctaNode = user ? (
      <button
        onClick={handleLogout}
        className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200 flex items-center justify-center"
      >
        Sign Out
      </button>
    ) : (
      <Link href="/onboarding">
        <button className="bg-[#FF7A00] w-[98.41px] h-[28px] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#5C2800] border-none cursor-pointer hover:brightness-110 transition-all duration-200 flex items-center justify-center">
          Join Us
        </button>
      </Link>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHome
          ? "bg-[#131314] border-b border-[#584235]/30 ease-out"
          : isOnboarding
          ? "bg-[#131314]/96 border-b border-[#584235]/30 backdrop-blur-md"
          : isAdmin
          ? "bg-[#131314] border-b border-[#FF7A00]/40"
          : "bg-[#131314] border-b border-[#584235]/40"
      }`}
      style={
        isHome
          ? {
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-10px)",
            }
          : {}
      }
    >
      <div className="w-full max-w-[1440px] mx-auto h-[79px] flex items-center justify-between px-4 md:px-6 lg:px-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[12px] no-underline shrink-0">
          <div className="w-[39px] h-[40px] relative">
            <Image src="/gdclogo.png" alt="GDC Logo" fill className="object-contain" sizes="39px" />
          </div>
          <span className={`font-sora font-extrabold text-[20px] md:text-[24px] leading-[32px] tracking-[-1.2px] ${isAdmin ? "text-[#FF7A00]" : "text-[#FFB68B]"} hidden min-[420px]:inline-block`}>
            {isAdmin ? "ADMIN OVERRIDE" : "GAME DEV CLUB"}
          </span>
        </Link>

        {/* Desktop Nav */}
        {!isAdmin && (
          <nav className="hidden md:flex items-center gap-[40px]">
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.href;
              if (isHome) {
                return (
                  <button
                    key={l.label}
                    onClick={() => handleNavLink(l.href)}
                    className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] bg-transparent border-none cursor-pointer p-0 hover:text-[#FFB68B] transition-colors duration-300 relative group"
                  >
                    {l.label}
                    <span className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-[#FFB68B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                );
              }
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`font-mono text-[12px] leading-[12px] tracking-[1.2px] no-underline transition-colors duration-200 ${
                    isActive ? "font-bold text-[#FFB68B]" : "font-semibold text-[#E0C0AF] hover:text-[#FFB68B]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right side: CTA + mobile toggle */}
        <div className="flex items-center gap-[16px] shrink-0">
          {ctaNode}
          {!isAdmin && (
            <button
              className="md:hidden text-[#E0C0AF] bg-transparent border-none cursor-pointer p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
                <rect y="3" width="22" height="2" rx="1" />
                <rect y="10" width="22" height="2" rx="1" />
                <rect y="17" width="22" height="2" rx="1" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isAdmin && mobileOpen && (
        <div className="absolute top-[79px] left-0 right-0 bg-[#131314] border-t border-[#584235]/40 py-[16px] z-60 px-4 md:px-8 md:hidden flex flex-col gap-[16px]">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            if (isHome) {
              return (
                <button
                  key={l.label}
                  onClick={() => handleNavLink(l.href)}
                  className="block w-full text-left font-mono text-[12px] tracking-[1.2px] text-[#E0C0AF] bg-transparent border-none cursor-pointer hover:text-[#FFB68B] transition-colors duration-200"
                >
                  {l.label}
                </button>
              );
            }
            return (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block font-mono text-[12px] tracking-[1.2px] no-underline ${
                  isActive ? "text-[#FFB68B]" : "text-[#E0C0AF] hover:text-[#FFB68B]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
