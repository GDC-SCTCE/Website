"use client";
import React, { useState, useEffect } from "react";
import { QuestCard } from "./QuestCard";
import { QuestFilterBar } from "./QuestFilterBar";
import { ConqueredQuests } from "./ConqueredQuests";

interface QuestBoardClientProps {
  initialQuests: any[];
  isAdmin: boolean;
  user: any;
}

export function QuestBoardClient({ initialQuests, isAdmin, user }: QuestBoardClientProps) {
  const [quests] = useState<any[]>(initialQuests);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredQuests = quests.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || q.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const activeQuests = filteredQuests.filter((q) => q.status === "ACTIVE");
  const upcomingQuests = filteredQuests.filter((q) => q.status === "UPCOMING");
  const completedQuests = filteredQuests.filter((q) => {
    if (q.status !== "COMPLETED") return false;
    
    // If admin or guest, show all past quests as a portfolio
    if (isAdmin || !user) {
      return true;
    }
    
    // If normal logged in user, only show quests they successfully registered for
    return q.registrations && q.registrations.some((r: any) => r.status === "REGISTERED");
  });

  return (
    <div className="bg-[#131314] text-[#E5E2E3] min-h-screen">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* ── PAGE HEADER ── */}
        <div className="px-6 md:px-8 xl:px-16 pt-24 md:pt-32 pb-0">
          {/* "All quests" label */}
          <p
            className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFB68B] transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
            }}
          >
            All quests
          </p>

          {/* THE QUEST BOARD. */}
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
            setActiveFilter={setActiveFilter}
            search={search}
            setSearch={setSearch}
            mounted={mounted}
          />
        </div>

        {/* ── ACTIVE & UPCOMING QUEST CARDS ── */}
        <div className="px-6 md:px-8 xl:px-16 mt-10">
          {activeQuests.length === 0 && upcomingQuests.length === 0 ? (
            <div className="py-[40px] border-t border-b border-[#584235] text-center">
              <p className="font-mono text-[12px] text-[#E0C0AF] tracking-[1.2px] uppercase">
                No active or upcoming quests found.
              </p>
            </div>
          ) : (
            <div className="flex overflow-x-auto gap-[44px] pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
              {activeQuests.map((quest, idx) => (
                <div key={quest.id} className="w-full md:w-[calc(50%-22px)] shrink-0 snap-start flex">
                  <QuestCard
                    quest={quest}
                    user={user}
                    isAdmin={isAdmin}
                    delay={100 + (idx * 50)}
                    visible={mounted}
                  />
                </div>
              ))}
              {upcomingQuests.map((quest, idx) => (
                <div key={quest.id} className="w-full md:w-[calc(50%-22px)] shrink-0 snap-start flex">
                  <QuestCard
                    quest={quest}
                    user={user}
                    isAdmin={isAdmin}
                    delay={250 + (idx * 50)}
                    visible={mounted}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── QUESTS CONQUERED ── */}
        <ConqueredQuests completedQuests={completedQuests} isLoading={false} />
      </div>
    </div>
  );
}
