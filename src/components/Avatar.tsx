import React from "react";

export default function Avatar({ name, size = 300 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div className={`w-full h-full bg-[#131314] flex items-center justify-center`}>
      <span
        className={`font-sora font-extrabold text-[#FF7A00]/15 tracking-[-2px] select-none ${
          size > 200 ? "text-[96px]" : size > 100 ? "text-[48px]" : "text-[32px]"
        }`}
      >
        {initials}
      </span>
    </div>
  );
}
