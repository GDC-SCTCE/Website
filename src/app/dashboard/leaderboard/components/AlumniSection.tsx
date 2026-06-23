"use client";

import React, { useState, useEffect, useRef, use, Suspense } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Avatar from "@/components/Avatar";
import { useInView } from "@/hooks/useInView";
import type { Alumni, User } from "@prisma/client";
import { AlumniDynamicSkeleton } from "./LeaderboardDynamicSkeleton";

// ─── Legend Card ─────────────────────────────────────────────────────────────
function LegendCard({ legend, delay, visible }: { legend: Alumni; delay: number; visible: boolean }) {
  return (
    <div
      className="flex flex-col transition-all duration-700 group/legend"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Photo */}
      <div className="w-full aspect-square bg-[#201F20] border-2 border-[#353436] hover:border-[#FF7A00] transition-colors duration-300 relative overflow-hidden">
        <div className="w-full h-full transition-transform duration-700 group-hover/legend:scale-105">
          {legend.avatar ? (
            <img src={legend.avatar} alt={legend.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar name={legend.name} size={400} />
          )}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 group-hover/legend:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Name */}
      <h4 className="font-sora font-bold text-[20px] leading-[28px] uppercase text-[#E5E2E3] mt-5 mb-0 transition-colors duration-200 group-hover/legend:text-[#FFB68B]">
        {legend.name}
      </h4>

      {/* Role */}
      <p className="font-mono font-bold text-[12px] leading-[16px] text-[#FFB68B] mt-1">
        {legend.role}
      </p>

      {/* Company link */}
      {legend.companyLink ? (
        <a
          href={legend.companyLink}
          className="flex items-center gap-2 mt-3 no-underline group"
        >
          <span className="font-mono font-normal text-[10px] leading-[16px] text-[#E0C0AF] group-hover:text-white transition-colors duration-200 uppercase tracking-widest">
            {legend.company}
          </span>
          <ExternalLink className="w-[8.75px] h-[8.75px] text-[#E0C0AF] group-hover:text-white transition-colors duration-200 shrink-0" />
        </a>
      ) : (
        <div className="flex items-center gap-2 mt-3">
          <span className="font-mono font-normal text-[10px] leading-[16px] text-[#E0C0AF] uppercase tracking-widest">
            {legend.company}
          </span>
        </div>
      )}
    </div>
  );
}

function DynamicAlumniContent({ leaderboardDataPromise, legendsVisible }: { leaderboardDataPromise: Promise<{ users: User[], alumni: Alumni[] }>, legendsVisible: boolean }) {
  const { alumni } = use(leaderboardDataPromise);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicators, setShowScrollIndicators] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const progress = (scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < maxScroll - 2);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setShowScrollIndicators(scrollWidth > clientWidth);
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < maxScroll - 2);
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    const timer = setTimeout(checkScroll, 150);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [alumni]);

  return (
    <>
      {/* Scrollable Alumni Container */}
        <div className="relative group/scroll-container">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
          >
            {alumni.map((legend, idx) => (
              <div key={legend.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start snap-always">
                <LegendCard legend={legend} delay={idx * 120} visible={legendsVisible} />
              </div>
            ))}
            {alumni.length === 0 && (
               <div className="w-full py-20 text-center font-mono text-[#E0C0AF]">No legends found yet. Become the first!</div>
            )}
          </div>

          {/* Floating Left Arrow */}
          {showScrollIndicators && canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 md:-left-6 top-[180px] lg:top-[160px] xl:top-[165px] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#131314]/90 border border-[#584235] text-[#E0C0AF] hover:text-[#FFB68B] hover:border-[#FFB68B] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10 opacity-0 md:group-hover/scroll-container:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Floating Right Arrow */}
          {showScrollIndicators && canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className={`absolute right-2 md:-right-6 top-[180px] lg:top-[160px] xl:top-[165px] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#131314]/90 border border-[#584235] text-[#E0C0AF] hover:text-[#FFB68B] hover:border-[#FFB68B] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10 ${
                !canScrollLeft ? "animate-nudge-horizontal border-[#FFB68B] text-[#FFB68B] opacity-100" : "opacity-0 md:group-hover/scroll-container:opacity-100"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className={`w-6 h-6 ${!canScrollLeft ? "scale-110" : ""}`} />
            </button>
          )}
        </div>

        {/* Scroll Progress Bar at the bottom */}
        {showScrollIndicators && (
          <div className="flex items-center justify-end mt-2 pb-6 border-b border-[#584235]/40">
            {/* Sleek Progress Track */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#A78B7C] uppercase tracking-wider font-semibold">
                Scroll to explore
              </span>
              <div className="w-[100px] sm:w-[140px] h-[2px] bg-[#2E2B2A] relative rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB68B] transition-all duration-75 rounded-full"
                  style={{
                    width: "30%",
                    left: `${Math.min(scrollProgress * 0.7, 70)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
  );
}

export default function AlumniSection({ leaderboardDataPromise }: { leaderboardDataPromise: Promise<{ users: User[], alumni: Alumni[] }> }) {
  const { ref: legendsRef, inView: legendsVisible } = useInView(0.15);

  return (
    <div ref={legendsRef as React.RefObject<HTMLDivElement>} className="bg-[#0E0E0F] mt-24 py-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section label + heading */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: legendsVisible ? 1 : 0,
            transform: legendsVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] uppercase text-[#00DBE9] mb-7">
            LEGENDS (ALUMNI)
          </p>
          <h2 className="font-sora font-black text-[40px] sm:text-[48px] leading-[53px] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0">
            THEY BUILT HERE FIRST.
          </h2>
        </div>

        <Suspense fallback={<AlumniDynamicSkeleton />}>
          <DynamicAlumniContent leaderboardDataPromise={leaderboardDataPromise} legendsVisible={legendsVisible} />
        </Suspense>
      </div>
    </div>
  );
}
