"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Game } from "@prisma/client";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export function FeaturedGame({ featuredGame }: { featuredGame: Game }) {
  const { ref: featuredRef, inView: featuredVisible } = useInView(0.15);

  return (
    <div ref={featuredRef} className="w-full bg-[#131314] mt-8">
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        {/* Left: content — slides in from left */}
        <div
          className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-16 max-w-[720px] transition-all duration-700"
          style={{
            opacity: featuredVisible ? 1 : 0,
            transform: featuredVisible ? "translateX(0)" : "translateX(-40px)",
          }}
        >
          {/* Editor's pick label */}
          <p
            className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-10 transition-all duration-500"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transitionDelay: "100ms",
            }}
          >
            EDITOR&apos;S PICK
          </p>

          {/* Title */}
          <h2
            className="font-sora font-extrabold text-[56px] sm:text-[72px] lg:text-[80px] leading-[56px] sm:leading-[72px] lg:leading-[80px] tracking-[-3.2px] text-[#E5E2E3] m-0 mb-10 transition-all duration-600"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transform: featuredVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "150ms",
            }}
          >
            {featuredGame.title}
          </h2>

          {/* Description */}
          <p
            className="font-sora font-normal text-[16px] leading-[26px] text-[#E0C0AF] max-w-[510px] mb-10 transition-all duration-500"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transitionDelay: "250ms",
            }}
          >
            {featuredGame.description}
          </p>

          {/* Metadata row */}
          <div
            className="border-y border-[#584235]/30 py-6 mb-10 flex items-start gap-12 flex-wrap transition-all duration-500"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transitionDelay: "350ms",
            }}
          >
            {[
              { label: "ENGINE",   value: featuredGame.engine },
              { label: "GENRE",    value: featuredGame.genre },
              { label: "DURATION", value: featuredGame.duration || "-" },
              { label: "YEAR",     value: featuredGame.year || "-" },
            ].map((m) => (
              <div key={m.label}>
                <p className="font-mono font-normal text-[10px] leading-[15px] uppercase text-[#A78B7C] mb-2">
                  {m.label}
                </p>
                <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#E5E2E3] uppercase">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div
            className="flex items-center gap-6 flex-wrap transition-all duration-500"
            style={{
              opacity: featuredVisible ? 1 : 0,
              transform: featuredVisible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "450ms",
            }}
          >
            <a
              href={featuredGame.playUrl || "#"}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 h-12 px-6 bg-[#FFB68B] font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#522300] no-underline hover:brightness-110 hover:gap-4 transition-all duration-200 relative overflow-hidden group/btn"
            >
              {/* Button shimmer */}
              <span className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-500 ease-in-out" />
              PLAY NOW <Play className="w-3.5 h-3.5 fill-current relative z-10" />
            </a>
          </div>
        </div>

        {/* Right: game image — slides in from right */}
        <div
          className="w-full lg:w-[720px] h-[400px] lg:h-auto shrink-0 relative overflow-hidden transition-all duration-800 bg-[#1e1e1e] flex items-center justify-center"
          style={{
            opacity: featuredVisible ? 1 : 0,
            transform: featuredVisible ? "translateX(0)" : "translateX(40px)",
            transitionDelay: "100ms",
          }}
        >
          {featuredGame.coverUrl ? (
            <Image
              src={featuredGame.coverUrl}
              alt={featuredGame.title}
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover transition-transform duration-[8s] hover:scale-105"
            />
          ) : (
            <GDCPlaceholder textClassName="text-[96px]" />
          )}

          {/* Figma-spec overlays */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06) 0%, rgba(0,255,0,0.02) 50%, rgba(0,0,255,0.06) 100%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,182,139,0) 0%, rgba(255,182,139,0.1) 50%, rgba(255,182,139,0) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(255,122,0,0.1)", mixBlendMode: "color" }}
          />

          {/* Animated scanline sweep on the featured image */}
          <div
            className="absolute left-0 right-0 h-[2px] bg-white/15 blur-[1px] pointer-events-none"
            style={{ animation: "scanline-sweep 5s linear infinite" }}
          />

          {/* Left edge gradient */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#131314] to-transparent pointer-events-none hidden lg:block" />
        </div>

      </div>
    </div>
  );
}
