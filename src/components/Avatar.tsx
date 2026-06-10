import React from "react";

export default function Avatar({ name, size = 300 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const bgClasses = [
    "bg-[linear-gradient(135deg,#1a0a00_0%,#000_100%)]",
    "bg-[linear-gradient(135deg,#0a0a1a_0%,#000_100%)]",
    "bg-[linear-gradient(135deg,#0a1a0a_0%,#000_100%)]",
    "bg-[linear-gradient(135deg,#1a0a1a_0%,#000_100%)]",
    "bg-[linear-gradient(135deg,#0a1a1a_0%,#000_100%)]",
  ];
  const bgClass = bgClasses[name.charCodeAt(0) % bgClasses.length];
  return (
    <div className={`w-full h-full ${bgClass} flex items-center justify-center`}>
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
