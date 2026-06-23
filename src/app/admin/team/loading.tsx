"use client";

import React from "react";

export default function TeamLoading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Real Heading */}
      <div>
        <h1 className="font-sora font-extrabold text-[32px] text-[#FF7A00] mb-2">TEAM REGISTRY</h1>
        <p className="font-mono text-[14px] text-[#E0C0AF] tracking-[1.2px]">
          MANAGE ALL MEMBERS OF THE GAME DEV COLLECTIVE.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Real Filter Tabs (Mockup, disabled) */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#584235]/30">
          {["ALL", "DESIGN", "DEVELOPMENT", "MARKETING", "OPERATIONS"].map((dept) => (
            <button
              key={dept}
              disabled
              className={`px-4 py-2 font-mono text-[11px] tracking-[1.2px] border ${
                dept === "ALL" ? "border-[#FF7A00] text-[#FF7A00]/70" : "border-[#584235] text-[#A78B7C]/50"
              } cursor-not-allowed uppercase`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          {/* LEFT COLUMN: CARDS SKELETON */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#1A1A1B] border border-[#584235]/30 p-4 flex gap-4 items-center"
              >
                {/* Avatar Skeleton */}
                <div className="w-[64px] h-[64px] shrink-0 border border-[#584235]/20 bg-[#1C1B1C] rounded" />

                {/* Details Skeleton */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-36 bg-[#584235]/40 rounded" />
                    <div className="h-5 w-24 bg-[#584235]/30 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: EDIT FORM SKELETON */}
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
