import { Search } from "lucide-react";
import { filters } from "@/constants/quests";
import { QuestFilterCategory } from "@/types";

interface FilterBarProps {
  activeFilter: QuestFilterCategory;
  setActiveFilter: (filter: QuestFilterCategory) => void;
  search: string;
  setSearch: (s: string) => void;
  mounted: boolean;
}

export function QuestFilterBar({ activeFilter, setActiveFilter, search, setSearch, mounted }: FilterBarProps) {
  return (
    <div
      className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-[36px] border-t border-b border-[#584235] transition-all duration-500"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transitionDelay: "200ms",
      }}
    >
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-10">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`cursor-pointer transition-colors duration-200 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] bg-transparent border-none p-0 ${activeFilter === f.id ? "text-[#FFB68B]" : "text-[#E0C0AF] hover:text-[#FFB68B]"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="relative w-full md:w-auto">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E0C0AF]">
          <Search className="w-[15px] h-[15px] text-[#E0C0AF]" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[256px] h-[34px] bg-[#1C1B1C] border-none border-b-2 border-[#584235] pl-[40px] font-mono font-bold text-[12px] leading-[16px] tracking-[1.2px] text-[#E0C0AF] outline-none transition-colors duration-200 focus:border-[#FFB68B]"
        />
      </div>
    </div>
  );
}
