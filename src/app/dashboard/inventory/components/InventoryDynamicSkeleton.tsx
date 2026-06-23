import React from "react";

export function InventoryDynamicSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Tool Grid Skeleton */}
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center aspect-square bg-gradient-to-b from-[#1C1B1C] to-[#131314] border-t border-[#584235] overflow-hidden"
            >
              {/* Inner bg offset matching inset-[4px_4px_0_4px] bg-[#0E0E0F] */}
              <div className="absolute inset-[4px_4px_0_4px] bg-[#0E0E0F]" />
              {/* Icon area */}
              <div className="relative z-10 w-12 h-12 bg-[#1C1B1C] animate-pulse rounded" />
              {/* Name label */}
              <div className="relative z-10 mt-2 h-[9px] w-12 bg-[#1C1B1C] animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Skeleton */}
      <div className="w-full lg:w-[400px] shrink-0 border-t border-[#FF7A00]/30 bg-gradient-to-b from-[#1C1B1C] to-[#131314]">
        <div className="p-8 flex flex-col flex-1">
          {/* "SELECTED ITEM" label */}
          <div className="h-3 w-28 bg-[#353436] animate-pulse mb-9" />

          {/* Icon + Name row */}
          <div className="flex items-center gap-6 mb-6">
            <div className="w-[80px] h-[80px] bg-[#353436] animate-pulse shrink-0" />
            <div className="flex flex-col gap-2">
              <div className="h-8 w-32 bg-[#353436] animate-pulse" />
              <div className="h-5 w-20 bg-[#353436] animate-pulse" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#353436] mb-6" />

          {/* Description */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="h-4 w-full bg-[#1C1B1C] animate-pulse" />
            <div className="h-4 w-full bg-[#1C1B1C] animate-pulse" />
            <div className="h-4 w-3/4 bg-[#1C1B1C] animate-pulse" />
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-20 bg-[#353436] animate-pulse" />
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <div key={s} className="w-3.5 h-3.5 bg-[#353436] animate-pulse rounded-sm" />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 bg-[#353436] animate-pulse" />
              <div className="h-5 w-10 bg-[#353436] animate-pulse" />
            </div>
          </div>

          {/* Platform */}
          <div className="mb-8 flex flex-col gap-2">
            <div className="h-3 w-16 bg-[#353436] animate-pulse" />
            <div className="h-4 w-24 bg-[#1C1B1C] animate-pulse" />
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-4">
            <div className="w-full h-[58px] bg-[#FF7A00]/20 animate-pulse" />
            <div className="w-full h-[62px] border-2 border-[#584235] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
