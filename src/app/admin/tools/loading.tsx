"use client";

import React from "react";
import { Search, Trash2 } from "lucide-react";

export default function ToolsLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Real Heading */}
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">TOOLS DATABASE</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE DEVELOPMENT TOOLS AVAILABLE IN THE INVENTORY.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Real Filter Bar Structure (Mockup, disabled) */}
        <div className="bg-[#1A1A1B] border border-[#584235] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A78B7C]" />
            <input
              type="text"
              placeholder="Search tools..."
              disabled
              className="w-full bg-[#131314] border border-[#584235] h-[36px] pl-10 pr-4 text-white font-mono text-[12px] outline-none opacity-50 cursor-not-allowed"
            />
          </div>
          <button
            disabled
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500/50 px-3 h-[36px] font-mono text-[10px] tracking-[1.2px] ml-auto shrink-0 cursor-not-allowed"
          >
            <Trash2 className="w-[14px] h-[14px]" /> DELETE ALL TOOLS
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-pulse">
          {/* LEFT COLUMN: LIST SKELETON */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#1A1A1B] border border-[#584235]/30 p-4 flex gap-4 items-center"
              >
                {/* Thumbnail Skeleton */}
                <div className="w-[64px] h-[64px] shrink-0 border border-[#584235]/20 bg-[#1C1B1C] rounded" />

                {/* Details Skeleton */}
                <div className="flex-1 min-w-0 gap-2 flex flex-col justify-center">
                  <div className="h-5 w-40 bg-[#584235]/40 rounded" />
                  <div className="flex gap-3">
                    <div className="h-3.5 w-20 bg-[#584235]/30 rounded" />
                    <div className="h-3.5 w-24 bg-[#584235]/20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: FORM SKELETON */}
          <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235]/30 p-6 rounded flex flex-col gap-4">
            <div className="h-6 w-32 bg-[#584235]/40 rounded mb-4" />
            <div className="space-y-4">
              <div>
                <div className="h-3 w-16 bg-[#584235]/30 mb-2 rounded" />
                <div className="h-10 w-full bg-[#131314] border border-[#584235]/20 rounded" />
              </div>
              <div>
                <div className="h-3 w-20 bg-[#584235]/30 mb-2 rounded" />
                <div className="h-10 w-full bg-[#131314] border border-[#584235]/20 rounded" />
              </div>
              <div className="h-10 w-full bg-[#FF7A00]/20 border border-[#FF7A00]/30 rounded mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
