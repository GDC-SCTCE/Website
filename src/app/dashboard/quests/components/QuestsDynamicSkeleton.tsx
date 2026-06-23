import React from "react";
import { ConqueredQuestSkeleton } from "./ConqueredQuestSkeleton";

export function QuestsDynamicSkeleton() {
  return (
    <>
      {/* Active Quests Cards */}
      <div className="px-6 md:px-8 xl:px-16 mt-16 flex gap-8 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-[300px] md:min-w-[420px] h-[450px] bg-[#1C1B1C] rounded-md animate-pulse" />
        ))}
      </div>

      {/* Conquered Quests List */}
      <div className="px-6 md:px-8 xl:px-16 mt-20 pb-16">
        <div className="h-10 w-[250px] bg-[#1C1B1C] rounded-md animate-pulse mb-8" />
        {[1, 2].map((i) => (
          <ConqueredQuestSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
