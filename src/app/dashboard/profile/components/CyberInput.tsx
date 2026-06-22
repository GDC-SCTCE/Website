import React from "react";

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export default function CyberInput({ label, required, icon, className = "", disabled, ...props }: CyberInputProps) {
  return (
    <div>
      <label className="block font-mono font-bold text-[11px] tracking-[1.2px] text-[#E0C0AF] mb-3 uppercase pl-0.5 flex items-center gap-1.5">
        {label} {required && !disabled && <span className="text-[#FF7A00]">*</span>}
        {icon}
      </label>
      <div className={`border-b pb-2 transition-colors duration-200 ${disabled ? "border-[#353436]/40" : "border-[#353436] focus-within:border-[#FF7A00]"}`}>
        <input
          disabled={disabled}
          className={`w-full bg-transparent border-none outline-none font-sora text-[15px] ${disabled ? "text-[#584235] cursor-not-allowed" : "text-[#E5E2E3] placeholder:text-[#353436] caret-[#FFB68B]"} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
