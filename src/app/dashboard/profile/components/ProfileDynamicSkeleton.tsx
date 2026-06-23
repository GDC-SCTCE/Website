import React from "react";

export function ProfileDynamicSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 xl:gap-[64px] items-start">
      
      {/* ── LEFT SIDEBAR: PROFILE SUMMARY SKELETON ── */}
      <div className="bg-[#1C1B1C] border border-[#201F20] relative p-6 md:p-8 flex flex-col items-center clip-cyber">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7A00]/30 to-transparent" />
        <div className="absolute top-3 right-3 h-[20px] w-[56px] bg-[#1C1B1C] border border-[#353436] animate-pulse" />

        {/* Avatar */}
        <div className="w-[120px] h-[120px] mt-4 mb-6 bg-[#353436] animate-pulse" />

        {/* Name + xpLevel + email */}
        <div className="h-[22px] w-3/5 bg-[#353436] animate-pulse mb-2" />
        <div className="h-[11px] w-28 bg-[#353436] animate-pulse mb-2" />
        <div className="h-3 w-2/3 bg-[#1C1B1C] animate-pulse mt-2" />

        {/* Divider + attribute rows */}
        <div className="w-full border-b border-[#201F20] pb-6 mb-6 mt-6" />
        <div className="w-full space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="flex justify-between border-b border-[#201F20]/50 pb-2">
              <div className="h-3 w-16 bg-[#1C1B1C] animate-pulse" />
              <div className="h-3 w-20 bg-[#353436] animate-pulse" />
            </div>
          ))}
        </div>

        {/* Score card */}
        <div className="w-full mt-8 bg-[#131314] border border-[#FF7A00]/20 p-5 clip-cyber-sm">
          <div className="h-[10px] w-28 bg-[#353436] animate-pulse mb-2" />
          <div className="h-9 w-20 bg-[#FF7A00]/20 animate-pulse" />
        </div>
      </div>

      {/* ── RIGHT SIDEBAR: FORM SKELETON ── */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1C1B1C] border border-[#201F20] p-6 md:p-8 clip-cyber relative">
          {/* Top cyan status line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00DBE9]/30 to-transparent z-20" />

          {/* Left Column: Form inputs Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center gap-[12px] mb-4">
              <div className="h-[24px] w-[30px] bg-[#353436] animate-pulse" />
              <div className="h-[18px] w-[120px] bg-[#353436] animate-pulse" />
            </div>

            {/* Inputs */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-[12px] w-[80px] bg-[#353436] animate-pulse" />
                <div className="h-[48px] w-full bg-[#1C1B1C] border border-[#353436] animate-pulse" />
              </div>
            ))}

            {/* Academic Year Group */}
            <div>
              <div className="h-[12px] w-[100px] bg-[#353436] animate-pulse mb-3" />
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-[65px] h-[38px] border border-[#353436] bg-[#1C1B1C] animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Loadout controls Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center gap-[12px] mb-4">
              <div className="h-[24px] w-[30px] bg-[#353436] animate-pulse" />
              <div className="h-[18px] w-[100px] bg-[#353436] animate-pulse" />
            </div>

            {/* Dev Tools display */}
            <div>
              <div className="h-[12px] w-[150px] bg-[#353436] animate-pulse mb-4" />
              <div className="flex gap-2 flex-wrap">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-[30px] w-[80px] bg-[#353436] animate-pulse" />
                ))}
              </div>
            </div>

            {/* XP Levels Radio List */}
            <div>
              <div className="h-[12px] w-[140px] bg-[#353436] animate-pulse mb-4" />
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-full p-4 border border-[#353436] bg-[#131314]/30 animate-pulse flex items-start gap-4">
                    {/* Bullet dot indicator */}
                    <div className="w-3.5 h-3.5 border border-[#353436] rounded-full mt-0.5" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-[12px] w-[100px] bg-[#353436]" />
                      <div className="h-[10px] w-full bg-[#201F20]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Row Skeleton */}
        <div className="flex items-center gap-6 mt-8">
          <div className="w-[200px] h-[52px] bg-[#FF7A00]/20 animate-pulse clip-cyber-sm" />
        </div>
      </div>
    </div>
  );
}
