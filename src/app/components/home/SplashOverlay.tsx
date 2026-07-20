"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SplashOverlay() {
  const [showSplash, setShowSplash] = useState(false);
  const [splashEnding, setSplashEnding] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("gdc_intro_played");
    if (!played) {
      setShowSplash(true);
    }
  }, []);

  const handleDismissSplash = () => {
    if (splashEnding) return; 
    
    setSplashEnding(true);
    sessionStorage.setItem("gdc_intro_played", "true");
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  };

  if (!showSplash) return null;

  return (
    <div
      onClick={handleDismissSplash}
      className={`fixed inset-0 z-[100] bg-[#131314] flex flex-col items-center justify-center transition-all duration-100 ease-in-out cursor-pointer ${
        splashEnding ? "opacity-0 pointer-events-none scale-110 blur-md" : "opacity-100"
      }`}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={handleDismissSplash}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-[#131314]/70" />
        <div className="absolute inset-0 bg-[#131314]/30" />
      </div>

      {/* Content overlay on splash */}
      {/* Removed pointer-events-none so the whole area registers clicks cleanly */}
      <div className="relative z-10 w-full max-w-[1440px] h-full flex flex-col justify-between p-8 md:p-16">
        {/* Top row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[12px]">
            <div className="w-[39px] h-[40px] relative">
              <Image src="/gdclogo.png" alt="GDC Logo" fill sizes="40px" className="object-contain" />
            </div>
            <span className="font-sora font-extrabold text-[20px] md:text-[24px] tracking-[-1.2px] text-[#FFB68B]">
              GAME DEV CLUB
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[1.1px] text-[#A78B7C] uppercase">
            // System Initialize
          </span>
        </div>

        {/* Middle logo / title */}
        <div className="text-center flex flex-col items-center gap-4 select-none">
          <span className="font-mono text-[#FF7A00] tracking-[4px] uppercase text-[12px] animate-pulse">
            Entering Collective Sandbox
          </span>
          <h2 className="font-sora font-bold text-4xl md:text-6xl text-white tracking-tight">
            THE FORGE AWAITS
          </h2>
        </div>

        {/* Bottom Row - Hint text telling users they can click anywhere */}
        <div className="flex justify-end w-full select-none">
          <span className="font-mono text-[11px] tracking-[2px] text-white/40 uppercase animate-pulse">
            Tap anywhere to skip ➔
          </span>
        </div>
      </div>
    </div>
  );
}