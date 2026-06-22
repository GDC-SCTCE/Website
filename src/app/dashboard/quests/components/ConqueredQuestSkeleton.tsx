import React from "react";

export function ConqueredQuestSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-[25px] border-t border-[#584235]">
      {/* Left: thumbnail + info skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7 w-full max-w-[400px]">
        {/* Thumbnail skeleton */}
        <div className="shrink-0 w-[96px] h-[64px] bg-[#1C1B1C] rounded-sm overflow-hidden relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-[#1C1B1C] via-[#2A2828] to-[#1C1B1C]" />
        </div>

        {/* Title + meta skeleton */}
        <div className="w-full flex flex-col gap-2">
          <div className="h-4 bg-[#1C1B1C] rounded-sm w-[80%] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-[#1C1B1C] via-[#2A2828] to-[#1C1B1C]" />
          </div>
          <div className="h-3 bg-[#1C1B1C] rounded-sm w-[40%] mt-1 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-[#1C1B1C] via-[#2A2828] to-[#1C1B1C]" />
          </div>
        </div>
      </div>

      {/* Right: View Report link skeleton */}
      <div className="flex flex-col sm:items-end gap-3 self-start sm:self-auto w-[100px]">
        <div className="h-3 bg-[#1C1B1C] rounded-sm w-full relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-[#1C1B1C] via-[#2A2828] to-[#1C1B1C]" />
        </div>
      </div>
    </div>
  );
}
