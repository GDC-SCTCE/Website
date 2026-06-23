"use client";
import React, { useState, useEffect, useRef, use, Suspense } from "react";
import { QuestCard } from "./QuestCard";
import { QuestFilterBar } from "./QuestFilterBar";
import { ConqueredQuests } from "./ConqueredQuests";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QuestsDynamicSkeleton } from "./QuestsDynamicSkeleton";
import { Quest, QuestFilterCategory } from "@/types";

interface DashboardData {
  quests: Quest[];
  isAdmin: boolean;
  user: any;
}

interface QuestBoardClientProps {
  dashboardDataPromise: Promise<DashboardData>;
}

function DynamicQuestList({ dashboardDataPromise, activeFilter, search }: { dashboardDataPromise: Promise<DashboardData>, activeFilter: QuestFilterCategory, search: string }) {
  const { quests, isAdmin, user } = use(dashboardDataPromise);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicators, setShowScrollIndicators] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { activeQuests, upcomingQuests } = React.useMemo(() => {
    const filtered = quests.filter((q: Quest) => {
      const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === "All" || q.category === activeFilter;
      return matchesSearch && matchesFilter;
    });

    return {
      activeQuests: filtered.filter((q: Quest) => q.status === "ACTIVE"),
      upcomingQuests: filtered.filter((q: Quest) => q.status === "UPCOMING")
    };
  }, [quests, activeFilter, search]);

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
    let resetTimer: NodeJS.Timeout;
    
    // Subtle scroll nudge hint after component mounts to show that it is scrollable
    const nudgeTimer = setTimeout(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth } = scrollRef.current;
        if (scrollWidth > clientWidth) {
          scrollRef.current.scrollTo({ left: 60, behavior: "smooth" });
          resetTimer = setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
            }
          }, 500);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(nudgeTimer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const scrollable = scrollWidth > clientWidth;
      setShowScrollIndicators(scrollable);
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
  }, [activeQuests.length, upcomingQuests.length]);

  return (
    <>
      {/* ── ACTIVE & UPCOMING QUEST CARDS ── */}
      <div className="px-6 md:px-8 xl:px-16 mt-10">
        {activeQuests.length === 0 && upcomingQuests.length === 0 ? (
          <div className="py-[40px] border-t border-b border-[#584235] text-center">
            <p className="font-mono text-[12px] text-[#E0C0AF] tracking-[1.2px] uppercase">
              No active or upcoming quests found.
            </p>
          </div>
        ) : (
          <>
            <div className="relative group/scroll-container">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                tabIndex={0}
                role="region"
                aria-label="Quest cards"
                className="flex overflow-x-auto gap-[44px] pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
              >
                {[...activeQuests, ...upcomingQuests].map((quest) => (
                  <div key={quest.id} className="w-full md:w-[calc(50%-22px)] shrink-0 snap-start snap-always flex">
                    <QuestCard
                      quest={quest}
                      user={user}
                      isAdmin={isAdmin}
                    />
                  </div>
                ))}
              </div>

              {/* Floating Left Arrow Overlay */}
              {showScrollIndicators && canScrollLeft && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 md:-left-6 top-[calc(50%-16px)] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#131314]/90 border border-[#584235] text-[#E0C0AF] hover:text-[#FFB68B] hover:border-[#FFB68B] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10 opacity-0 md:group-hover/scroll-container:opacity-100"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Floating Right Arrow Overlay */}
              {showScrollIndicators && canScrollRight && (
                <button
                  onClick={() => scroll("right")}
                  className={`absolute right-2 md:-right-6 top-[calc(50%-16px)] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[#131314]/90 border border-[#584235] text-[#E0C0AF] hover:text-[#FFB68B] hover:border-[#FFB68B] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] backdrop-blur-sm z-10 ${
                    !canScrollLeft ? "animate-nudge-horizontal border-[#FFB68B] text-[#FFB68B] opacity-100" : "opacity-0 md:group-hover/scroll-container:opacity-100"
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className={`w-6 h-6 ${!canScrollLeft ? "scale-110" : ""}`} />
                </button>
              )}
            </div>

            {/* Scroll Progress Bar */}
            {showScrollIndicators && (
              <div className="flex items-center justify-end mt-2 pb-6 border-b border-[#584235]/40">
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
        )}
      </div>

      {/* ── QUESTS CONQUERED ── */}
      <ConqueredQuests
        user={user}
        isAdmin={isAdmin}
        search={search}
        category={activeFilter}
      />
    </>
  );
}

export function QuestBoardClient({ dashboardDataPromise }: QuestBoardClientProps) {
  const [activeFilter, setActiveFilter] = useState<QuestFilterCategory>("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* ── PAGE HEADER ── */}
        <div className="px-6 md:px-8 xl:px-16 pt-24 md:pt-32 pb-0">
          <p
            className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B] transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
            }}
          >
            All quests
          </p>

          <h1
            className="mt-7 uppercase font-sora font-extrabold text-[clamp(36px,5.5vw,80px)] leading-none tracking-[-3.2px] text-[#E5E2E3] transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            THE QUEST BOARD.
          </h1>

          <QuestFilterBar
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter as any}
            search={search}
            setSearch={setSearch}
            mounted={mounted}
          />
        </div>

        {/* ── DYNAMIC CONTENT (Suspended while fetching) ── */}
        <Suspense fallback={<QuestsDynamicSkeleton />}>
          <DynamicQuestList 
            dashboardDataPromise={dashboardDataPromise} 
            activeFilter={activeFilter} 
            search={search} 
          />
        </Suspense>
      </div>
    </div>
  );
}
