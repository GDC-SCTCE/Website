"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/admin/login");
        router.refresh();
      } else if (event === "SIGNED_IN") {
        if (pathname === "/admin/login") router.push("/admin");
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, supabase]);

  // If on login page, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#131314] flex flex-col font-sans text-zinc-100">
      {/* ── ADMIN NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#131314] border-b border-[#FF7A00]/40 h-[79px] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 md:px-16">
          <Link href="/admin" className="flex items-center gap-[12px] no-underline shrink-0">
            <div className="w-[39px] h-[40px] relative">
              <Image src="/gdclogo.png" alt="GDC Logo" fill className="object-contain" />
            </div>
            <span className="font-sora font-extrabold text-[20px] md:text-[24px] leading-[32px] tracking-[-1.2px] text-[#FF7A00]">
              ADMIN OVERRIDE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-[40px]">
            <Link href="/admin/quests" className={`font-mono text-[12px] tracking-[1.2px] no-underline transition-colors ${pathname.includes('/quests') ? "font-bold text-[#FFB68B]" : "font-semibold text-[#E0C0AF] hover:text-[#FFB68B]"}`}>Quests</Link>
            <Link href="/admin/games" className={`font-mono text-[12px] tracking-[1.2px] no-underline transition-colors ${pathname.includes('/games') ? "font-bold text-[#FFB68B]" : "font-semibold text-[#E0C0AF] hover:text-[#FFB68B]"}`}>Games</Link>
            <Link href="/admin/team" className={`font-mono text-[12px] tracking-[1.2px] no-underline transition-colors ${pathname.includes('/team') ? "font-bold text-[#FFB68B]" : "font-semibold text-[#E0C0AF] hover:text-[#FFB68B]"}`}>Team</Link>
          </nav>

          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-transparent border border-[#FF7A00] text-[#FF7A00] px-4 py-2 font-mono text-[12px] tracking-[1.2px] hover:bg-[#FF7A00] hover:text-[#131314] transition-colors"
          >
            DISCONNECT
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-16">
        {children}
      </main>
    </div>
  );
}
