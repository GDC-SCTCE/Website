import React from "react";

interface GDCPlaceholderProps {
  textClassName?: string;
}

export default function GDCPlaceholder({ textClassName = "text-[48px]" }: GDCPlaceholderProps) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A2A2B] to-[#131314] opacity-30" />
      <div className={`relative font-sora font-extrabold text-[#353436] tracking-tighter select-none ${textClassName}`}>
        GDC
      </div>
    </>
  );
}
