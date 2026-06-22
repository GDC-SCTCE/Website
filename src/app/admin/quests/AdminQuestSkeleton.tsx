import React from "react";

export function AdminQuestSkeleton() {
  return (
    <div className="bg-[#1A1A1B] border border-[#584235] p-4 flex gap-4 items-center relative overflow-hidden">
      {/* Shimmer animation */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-[#1A1A1B] via-[#262424] to-[#1A1A1B]" />

      {/* Thumbnail Skeleton */}
      <div className="w-[96px] h-[64px] bg-[#131314] shrink-0 border border-[#584235] relative z-10" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col gap-1 relative z-10">
        <div className="flex justify-between items-start">
          <div className="h-5 bg-[#131314] rounded-sm w-[200px]" />
          <div className="flex gap-2">
            <div className="w-[60px] h-5 bg-[#131314] rounded-sm" />
            <div className="w-[60px] h-5 bg-[#131314] rounded-sm" />
            <div className="w-5 h-5 bg-[#131314] rounded-sm" />
          </div>
        </div>
        
        <div className="h-3 bg-[#131314] rounded-sm w-[150px] mt-1" />
        
        <div className="mt-2 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4">
            <div className="h-4 bg-[#131314] rounded-sm w-[80px]" />
            <div className="h-4 bg-[#131314] rounded-sm w-[100px]" />
          </div>
          <div className="h-8 bg-[#131314] rounded-sm w-[140px] border border-[#584235]" />
        </div>
      </div>
    </div>
  );
}
