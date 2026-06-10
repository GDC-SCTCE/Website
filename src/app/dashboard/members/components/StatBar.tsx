import React from "react";

export function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-[16px] h-[22px] relative">
      <div className="flex justify-between h-[15px] items-center mb-[4px]">
        <span className="font-mono text-[10px] leading-[15px] text-[#E0C0AF] uppercase">
          {label}
        </span>
        <span className="font-mono text-[10px] leading-[15px] text-[#E0C0AF]">
          {value}
        </span>
      </div>
      {/* Track */}
      <div className="relative h-[3px] bg-white/10">
        {/* Fill */}
        <div
          style={{ width: `${value}%` }}
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#FF7A00] to-[#FDD400] shadow-[0px_0px_10px_rgba(255,122,0,0.6)]"
        />
      </div>
    </div>
  );
}
