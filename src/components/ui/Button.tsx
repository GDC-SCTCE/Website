"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "purple" | "green" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  cyberClip?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  glow = false,
  cyberClip = true,
  className = "",
  disabled,
  ...props
}) => {
  // Variant styles
  const variantStyles = {
    primary: "bg-neon-orange text-black font-semibold border-none hover:bg-orange-500 shadow-[0_0_10px_rgba(255,107,0,0.4)] hover:shadow-[0_0_20px_rgba(255,107,0,0.7)] active:scale-[0.98]",
    secondary: "bg-neon-blue text-black font-semibold border-none hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.4)] hover:shadow-[0_0_20px_rgba(0,240,255,0.7)] active:scale-[0.98]",
    purple: "bg-neon-purple text-white font-semibold border-none hover:bg-purple-500 shadow-[0_0_10px_rgba(185,35,255,0.4)] hover:shadow-[0_0_20px_rgba(185,35,255,0.7)] active:scale-[0.98]",
    green: "bg-neon-green text-black font-semibold border-none hover:bg-green-400 shadow-[0_0_10px_rgba(57,255,20,0.4)] hover:shadow-[0_0_20px_rgba(57,255,20,0.7)] active:scale-[0.98]",
    danger: "bg-red-600 text-white font-semibold border-none hover:bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.4)] active:scale-[0.98]",
    outline: "bg-transparent border border-cyan-500/50 text-neon-blue hover:bg-cyan-950/30 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,240,255,0.25)] active:scale-[0.98]",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-mono tracking-wider",
    md: "px-6 py-2.5 text-sm uppercase font-display tracking-widest",
    lg: "px-8 py-3.5 text-base uppercase font-display tracking-widest",
  };

  // Cyberclip classes (creates sliced corners)
  const clipClass = cyberClip ? (size === "sm" ? "clip-cyber-sm" : "clip-cyber") : "";

  // Animations
  const animationClass = glow && variant === "primary" ? "animate-pulse-glow" : "";

  return (
    <button
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${clipClass}
        ${animationClass}
        ${className}
      `}
      {...props}
    >
      {/* Visual cyber details: small neon orange corner accent lines or indicators */}
      {cyberClip && variant !== "outline" && (
        <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-white opacity-40 rounded-bl-sm" />
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
