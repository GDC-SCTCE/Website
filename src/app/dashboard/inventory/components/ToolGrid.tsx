"use client";

import { Tool as DbTool } from "@prisma/client";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export default function ToolGrid({
  tools,
  selectedToolId,
  onSelectTool,
  gridVisible,
  loadout,
}: {
  tools: DbTool[];
  selectedToolId: string;
  onSelectTool: (tool: DbTool) => void;
  gridVisible: boolean;
  loadout: Set<string>;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[16px]">
      {tools.map((tool, idx) => {
        const isSelected = selectedToolId === tool.id;
        return (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className={`relative flex flex-col items-center justify-center aspect-square bg-gradient-to-b from-[#1C1B1C] to-[#131314] cursor-pointer transition-all duration-300 overflow-hidden group border-t ${
              isSelected
                ? "border-t-[#FF7A00]"
                : "border-t-[#584235] hover:border-t-[#FF7A00]"
            }`}
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible
                ? "translateY(0) scale(1)"
                : "translateY(16px) scale(0.98)",
              transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 40}ms`,
            }}
          >
            {/* Dark inner bg */}
            <div className="absolute inset-[4px_4px_0_4px] bg-[#0E0E0F]" />

            {/* Icon */}
            <div
              className={`relative z-10 w-30 h-30 transition-all duration-300 transform group-hover:scale-110 flex items-center justify-center ${
                isSelected
                  ? "grayscale-0 opacity-100"
                  : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
              }`}
            >
              {tool.iconUrl ? (
                <img src={tool.iconUrl} alt={tool.name} className="w-full h-full object-contain" />
              ) : (
                <GDCPlaceholder textClassName="text-[12px]" />
              )}
            </div>

            {/* Tool name label */}
            <span className="relative z-10 mt-2 font-mono text-[9px] tracking-[1.2px] uppercase text-[#E0C0AF]/50 group-hover:text-[#E0C0AF]/80 transition-colors duration-200">
              {tool.name}
            </span>

            {/* Equipped dot */}
            {loadout.has(tool.name) && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#39ff14] rounded-full z-20 shadow-[0_0_8px_#39ff14] animate-pulse" />
            )}
          </button>
        );
      })}

      {tools.length === 0 && (
        <div className="col-span-full py-20 text-center font-mono text-[12px] text-[#584235] uppercase tracking-widest">
          No tools in this category yet
        </div>
      )}
    </div>
  );
}
