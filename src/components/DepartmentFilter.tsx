"use client";

import { Department } from "@/types";
import { filters } from "@/constants/members";

interface DepartmentFilterProps {
  activeFilter: Department;
  onFilterChange: (f: Department) => void;
}

export default function DepartmentFilter({ activeFilter, onFilterChange }: DepartmentFilterProps) {
  return (
    <div className="flex items-center gap-[12px] flex-wrap">
      {filters.map((f) => {
        const isActive = activeFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id as Department)}
            className={`h-[30px] border-none font-mono text-[12px] leading-[12px] tracking-[1.2px] cursor-pointer transition-all duration-200 text-center px-4 ${
              isActive
                ? "bg-[#FF7A00] text-[#5C2800] font-semibold"
                : "bg-[#2A2A2B] border-b-2 border-[#584235] text-[#E0C0AF] font-bold hover:bg-[#3e3e40] hover:border-b-[#FF7A00] hover:text-white"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
