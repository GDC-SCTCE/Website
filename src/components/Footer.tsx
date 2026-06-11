import React from "react";
import Link from "next/link";

export default function Footer() {
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
          <div className="flex flex-wrap justify-center gap-[24px] md:gap-[32px]">
            {links.map((l) => (
              <Link
                key={l}
                href="#"
                className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] no-underline hover:text-[#FFB68B] transition-colors duration-200"
              >
                {l}
              </Link>
            ))}
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
