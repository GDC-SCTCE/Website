import React from "react";

// ── Exact skeleton clone of LeaderCard ──────────────────────────────────────
export function LeadersDynamicSkeleton() {
  return (
    <div className="px-6 md:px-8 xl:px-16 mt-[40px] flex flex-col lg:flex-row gap-[32px] xl:gap-[57px] items-center lg:items-start">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="w-full flex-1"
        >
          {/* Mirrors: w-full h-auto lg:h-[553px] bg-[#1C1B1C] border border-[#201F20] flex flex-col lg:flex-row overflow-hidden */}
          <div className="w-full h-auto lg:h-[553px] bg-[#1C1B1C] border border-[#201F20] flex flex-col lg:flex-row overflow-hidden relative">
            {/* Top orange bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7A00]/30 to-transparent z-20" />

            {/* Left: Photo — w-full lg:w-1/2, aspect-square */}
            <div className="w-full lg:w-1/2 h-auto lg:h-full bg-[#131314] flex items-center justify-center">
              <div className="w-full aspect-square bg-[#1C1B1C] animate-pulse" />
            </div>

            {/* Right: Info — w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center */}
            <div className="w-full lg:w-1/2 bg-[#1C1B1C] p-6 lg:p-10 flex flex-col justify-center gap-4">
              {/* PARTY LEADER badge row */}
              <div className="flex items-center gap-2">
                <div className="w-[9px] h-[12px] bg-[#353436] animate-pulse" />
                <div className="h-3 w-28 bg-[#353436] animate-pulse" />
              </div>

              {/* Name */}
              <div className="h-10 w-4/5 bg-[#353436] animate-pulse" />
              <div className="h-8 w-3/5 bg-[#353436] animate-pulse" />

              {/* Role tag */}
              <div className="h-3 w-24 bg-[#353436] animate-pulse" />

              {/* Game preview strip */}
              <div className="mt-auto bg-[#353436]/30 p-[12px] flex gap-[16px] items-center min-h-[87px]">
                <div className="w-[80px] h-[48px] bg-[#353436] animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-2 w-20 bg-[#353436] animate-pulse" />
                  <div className="h-4 w-32 bg-[#353436] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Exact skeleton clone of MemberCard ───────────────────────────────────────
export function MembersGridDynamicSkeleton() {
  return (
    <div className="px-6 md:px-8 xl:px-16 pb-[80px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[40px_20px] lg:gap-[80px_20px] justify-items-center sm:justify-items-start justify-between mt-8">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="w-full max-w-[270px] shrink-0 flex">
          {/* Mirrors: w-full max-w-[270px] h-[376px] bg-[#131314] border border-transparent flex flex-col */}
          <div className="w-full max-w-[270px] h-[376px] bg-[#131314] border border-[#201F20] relative flex flex-col">
            {/* Top white divider */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#353436] to-transparent z-10 opacity-50" />

            {/* Photo area — flex-1 */}
            <div className="flex-1 w-full bg-[#1C1B1C] animate-pulse" />

            {/* Info strip — mirrors bg-[#0E0E0F] p-[20px_16px] */}
            <div className="w-full shrink-0 bg-[#0E0E0F] p-[20px_16px] flex flex-col gap-2">
              {/* Name — font-sora text-[20px] leading-[30px] */}
              <div className="h-[30px] w-3/4 bg-[#1C1B1C] animate-pulse" />
              {/* Role — font-mono text-[10px] leading-[15px] */}
              <div className="h-[12px] w-2/5 bg-[#1C1B1C] animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
