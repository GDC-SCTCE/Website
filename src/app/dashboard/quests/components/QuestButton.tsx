"use client";

import { useEffect, useRef, useState } from "react";

interface QuestButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function QuestButton({
  label,
  onClick,
  disabled = false,
  isLoading = false,
  className = "",
}: QuestButtonProps) {
  const letters = label.split("");
  const [phase, setPhase] = useState<"idle" | "collapsing" | "loading">("idle");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (isLoading && phaseRef.current === "idle") {
      setPhase("collapsing");
      const t = setTimeout(() => setPhase("loading"), 450);
      return () => clearTimeout(t);
    }
    if (!isLoading) {
      setPhase("idle");
    }
  }, [isLoading]);

  const isActive = phase !== "idle";

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        aria-label={label}
        className={`relative w-full h-[56px] overflow-hidden flex items-center justify-center font-mono font-bold text-[13px] tracking-[2px] uppercase cursor-pointer transition-all duration-200 active:scale-[0.97] select-none ${className}`}
      >
        {/* ── CORNER BRACKETS (idle only) ───────────────────────────── */}
        {!isActive && (
          <>
            <span className="qbtn-bracket qbtn-bracket--tl" />
            <span className="qbtn-bracket qbtn-bracket--tr" />
            <span className="qbtn-bracket qbtn-bracket--bl" />
            <span className="qbtn-bracket qbtn-bracket--br" />
          </>
        )}

        {/* ── LETTERS ───────────────────────────────────────────────── */}
        <span
          className="relative flex items-center justify-center"
          style={{
            gap: "0.01em",
            opacity: phase === "loading" ? 0 : 1,
            transition: "opacity 0.1s ease",
            pointerEvents: "none",
          }}
        >
          {letters.map((char, i) => {
            const total = letters.length;
            const distFromCenter = i - (total - 1) / 2;
            const collapseX = -distFromCenter * 9;
            const collapseY = Math.abs(distFromCenter) * 2.5;

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  transition: `transform ${0.32 + Math.abs(distFromCenter) * 0.018}s cubic-bezier(0.6, 0, 0.9, 0.5),
                               opacity 0.32s ease,
                               filter 0.32s ease`,
                  transform:
                    phase === "collapsing" || phase === "loading"
                      ? `translate(${collapseX}px, ${collapseY}px) scale(0.1)`
                      : "translate(0,0) scale(1)",
                  opacity: phase === "loading" ? 0 : 1,
                  filter: phase === "collapsing" ? "blur(1.5px)" : "blur(0px)",
                  willChange: "transform",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>

        {/* ── LOADING LAYER ─────────────────────────────────────────── */}
        {phase === "loading" && (
          <div className="absolute inset-0 flex flex-col items-start justify-center px-5 gap-[6px] pointer-events-none overflow-hidden">
            {/* Status text */}
            <span
              className="font-mono text-[9px] tracking-[2.5px] uppercase"
              style={{
                color: "rgba(255,182,139,0.75)",
                animation: "qbtn-status-fadein 0.2s ease forwards",
              }}
            >
              PROCESSING
            </span>

            {/* Progress bar track */}
            <div className="relative w-full h-[3px]" style={{ background: "rgba(255,122,0,0.15)" }}>
              {/* Fill bar */}
              <div
                className="absolute left-0 top-0 h-full"
                style={{
                  background: "linear-gradient(to right, #7A3800, #FF7A00, #FFB68B)",
                  animation: "qbtn-bar-fill 1.8s cubic-bezier(0.25, 0.1, 0.1, 1) forwards",
                }}
              />
              {/* Glowing dot that rides the leading edge */}
              <div
                className="absolute top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                  width: 6,
                  height: 6,
                  background: "#FFD580",
                  boxShadow: "0 0 8px 3px rgba(255,180,80,0.9), 0 0 20px 6px rgba(255,122,0,0.5)",
                  animation: "qbtn-dot-ride 1.8s cubic-bezier(0.25, 0.1, 0.1, 1) forwards",
                }}
              />
            </div>

            {/* Scanline sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ animation: "qbtn-scanline 1.8s ease forwards" }}
            >
              <div
                className="absolute top-0 bottom-0 w-[2px]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,182,139,0.18) 30%, rgba(255,122,0,0.35) 50%, rgba(255,182,139,0.18) 70%, transparent)",
                  filter: "blur(1px)",
                }}
              />
            </div>
          </div>
        )}
      </button>

      <style>{`
        @keyframes qbtn-status-fadein {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes qbtn-bar-fill {
          0%   { width: 0%; }
          8%   { width: 4%; }
          30%  { width: 38%; }
          55%  { width: 62%; }
          75%  { width: 80%; }
          90%  { width: 94%; }
          100% { width: 100%; }
        }
        @keyframes qbtn-dot-ride {
          0%   { left: 0%; }
          8%   { left: 4%; }
          30%  { left: 38%; }
          55%  { left: 62%; }
          75%  { left: 80%; }
          90%  { left: 94%; }
          100% { left: calc(100% - 3px); }
        }
        @keyframes qbtn-scanline {
          0%   { transform: translateX(-4px); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .qbtn-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          opacity: 0.5;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        button:hover .qbtn-bracket { opacity: 1; }
        .qbtn-bracket--tl { top: 5px; left: 5px; border-top: 1.5px solid currentColor; border-left: 1.5px solid currentColor; }
        .qbtn-bracket--tr { top: 5px; right: 5px; border-top: 1.5px solid currentColor; border-right: 1.5px solid currentColor; }
        .qbtn-bracket--bl { bottom: 5px; left: 5px; border-bottom: 1.5px solid currentColor; border-left: 1.5px solid currentColor; }
        .qbtn-bracket--br { bottom: 5px; right: 5px; border-bottom: 1.5px solid currentColor; border-right: 1.5px solid currentColor; }
      `}</style>
    </>
  );
}
