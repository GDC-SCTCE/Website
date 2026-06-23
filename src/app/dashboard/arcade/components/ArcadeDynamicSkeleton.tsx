import React from "react";

// Exact skeleton clone of GameColumn:
// - w-[85vw] sm:w-[50%] lg:w-[33.333%] shrink-0 per item
// - flex flex-col inside
// - aspect-[479/400] thumbnail area
// - px-6 py-6 info strip with h2 title + footer row (engine tag + play link)
// Also mirrors the filter row: border-y border-[#584235] py-[17px], flex gap-8

export function ArcadeDynamicSkeleton() {
  return (
    <>
      {/* Filter Row Skeleton — border-y border-[#584235] py-[17px] */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pb-0">
        <div className="border-y border-[#584235] py-[17px] overflow-x-auto">
          <div className="flex items-center gap-8 min-w-max">
            {/* Active tag with dot */}
            <div className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-[#FFB68B]/40" />
              <div className="h-3 w-8 bg-[#1C1B1C] animate-pulse" />
            </div>
            {["w-16", "w-20", "w-14", "w-10"].map((w, i) => (
              <div key={i} className={`h-3 ${w} bg-[#1C1B1C] animate-pulse`} />
            ))}
          </div>
        </div>
      </div>

      {/* Game Grid Skeleton */}
      <div className="w-full mt-8">
        <div className="flex overflow-hidden pb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-[85vw] sm:w-[50%] lg:w-[33.333%] shrink-0 flex flex-col ${
                i < 2 ? "border-r border-[#584235]/30" : ""
              }`}
            >
              {/* Thumbnail — aspect-[479/400] */}
              <div className="relative w-full bg-[#1C1B1C] animate-pulse" style={{ aspectRatio: "479/400" }} />

              {/* Info strip — px-6 py-6 flex flex-col flex-1 */}
              <div className="px-6 py-6 flex flex-col flex-1 gap-4">
                {/* Title — font-sora text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] */}
                <div className="h-12 w-4/5 bg-[#1C1B1C] animate-pulse" />
                <div className="h-10 w-3/5 bg-[#1C1B1C] animate-pulse" />

                {/* Footer row — flex items-end justify-between mt-auto */}
                <div className="flex items-end justify-between mt-auto">
                  <div className="h-3 w-24 bg-[#1C1B1C] animate-pulse" />
                  <div className="h-3 w-12 bg-[#1C1B1C] animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Game Skeleton (Editor's Choice) */}
      <div className="w-full bg-[#131314] mt-8">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left: content */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16 max-w-[720px]">
            {/* Editor's pick label */}
            <div className="h-[12px] w-[100px] bg-[#00DBE9]/30 animate-pulse mb-10" />

            {/* Title */}
            <div className="h-[60px] sm:h-[80px] w-4/5 bg-[#1C1B1C] animate-pulse mb-10" />

            {/* Description */}
            <div className="h-[20px] w-full max-w-[510px] bg-[#1C1B1C] animate-pulse mb-3" />
            <div className="h-[20px] w-4/5 max-w-[510px] bg-[#1C1B1C] animate-pulse mb-3" />
            <div className="h-[20px] w-2/3 max-w-[510px] bg-[#1C1B1C] animate-pulse mb-10" />

            {/* Metadata row */}
            <div className="border-y border-[#584235]/30 py-6 mb-10 flex items-start gap-12 flex-wrap">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-[10px] w-[50px] bg-[#353436] animate-pulse mb-3" />
                  <div className="h-[12px] w-[80px] bg-[#1C1B1C] animate-pulse" />
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="h-[48px] w-[140px] bg-[#FFB68B]/30 animate-pulse" />
          </div>

          {/* Right: game image */}
          <div className="w-full lg:w-[720px] h-[400px] lg:h-auto shrink-0 relative overflow-hidden bg-[#1C1B1C] animate-pulse">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#131314] to-transparent pointer-events-none hidden lg:block" />
          </div>
        </div>
      </div>
    </>
  );
}
