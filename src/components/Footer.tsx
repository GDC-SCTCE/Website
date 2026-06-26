"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [showSupportCard, setShowSupportCard] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setShowSupportCard(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = ["Support", "GitHub", "Discord", "Terms"];

  return (
    <footer className="bg-[#131314] border-t-2 border-[#353436] w-full mt-auto">
      <div className="w-full px-6 md:px-[64px] py-[32px] md:h-[144px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 box-border">

        {/* Mobile: Title & Copyright -> Desktop: Title & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 md:gap-[8px]">
          <h2 className="font-sora font-bold text-[18px] leading-[28px] tracking-[1.8px] text-[#FFB68B] m-0">
            IGNITION COLLECTIVE
          </h2>
          <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] m-0 opacity-80 md:opacity-100 hidden md:block">
            © 2024 IGNITION COLLECTIVE. BUILT FOR PERFORMANCE.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-[16px] md:gap-[32px]">
          <div className="flex flex-wrap justify-center gap-[24px] md:gap-[32px] items-center">
            {links.map((l) => {
              if (l === "Support") {
                return (
                  <div key={l} ref={supportRef} className="relative inline-flex items-center">
                    <button
                      onClick={() => setShowSupportCard((prev) => !prev)}
                      className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] no-underline hover:text-[#FFB68B] transition-colors duration-200 bg-transparent border-none p-0 cursor-pointer outline-none focus:outline-none"
                    >
                      {l}
                    </button>
                    
                    {showSupportCard && (
                      <>
                        {/* Backdrop for mobile screens to dim background and close on tap */}
                        <div
                          onClick={() => setShowSupportCard(false)}
                          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        
                        {/* Popover card: centered modal on mobile, absolute tooltip on desktop */}
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-32px)] max-w-[300px] bg-[#131314]/95 backdrop-blur-md border border-[#FFB68B]/30 rounded-md p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,182,139,0.08)] text-left md:absolute md:top-auto md:bottom-[calc(100%+16px)] md:left-1/2 md:-translate-x-1/2 md:translate-y-0 md:w-[280px] md:p-4 md:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,182,139,0.08)]">
                          {/* Support Email */}
                          <div>
                            <div className="font-mono text-[9px] tracking-[1.5px] text-[#FFB68B]/70 uppercase mb-1 font-bold">
                              SUPPORT PROTOCOL
                            </div>
                            <a
                              href="mailto:gdcsctce@gmail.com"
                              className="font-mono text-[12px] text-[#E0C0AF] hover:text-[#FFB68B] transition-colors duration-200 break-all no-underline block"
                            >
                              gdcsctce@gmail.com
                            </a>
                          </div>

                          {/* Divider */}
                          <div className="h-[1px] bg-[#353436] w-full my-3" />

                          {/* Club Lead details */}
                          <div className="flex flex-col gap-1">
                            <div className="font-mono text-[9px] tracking-[1.5px] text-[#FFB68B]/70 uppercase mb-1 font-bold">
                              GAME DEV CLUB LEAD
                            </div>
                            <div className="font-sora font-bold text-[13px] text-[#FFB68B] leading-tight">
                              Gagandeep M
                            </div>
                            <a
                              href="mailto:gagandeepgcsj2023@gmail.com"
                              className="font-mono text-[11px] text-[#E0C0AF] hover:text-[#FFB68B] transition-colors duration-200 break-all no-underline block"
                            >
                              gagandeepgcsj2023@gmail.com
                            </a>
                            <a
                              href="tel:+917736910925"
                              className="font-mono text-[11px] text-[#E0C0AF] hover:text-[#FFB68B] transition-colors duration-200 no-underline block mt-0.5"
                            >
                              +91 7736910925
                            </a>
                          </div>

                          {/* Down-pointing arrow - desktop only */}
                          <div className="hidden md:block absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#131314] border-r border-b border-[#FFB68B]/30" />
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              const href = l === "Terms" ? "/terms" : "#";
              return (
                <Link
                  key={l}
                  href={href}
                  className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] no-underline hover:text-[#FFB68B] transition-colors duration-200"
                >
                  {l}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Copyright (shown at bottom on mobile only) */}
        <p className="font-mono font-semibold text-[10px] sm:text-[12px] leading-[16px] tracking-[1.2px] text-[#E0C0AF] m-0 text-center opacity-60 md:hidden max-w-[280px]">
          © 2024 IGNITION COLLECTIVE. BUILT FOR PERFORMANCE.
        </p>

      </div>
    </footer>
  );
}
