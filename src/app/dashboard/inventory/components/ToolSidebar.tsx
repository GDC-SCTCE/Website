"use client";

import { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tool as DbTool } from "@prisma/client";
import { toggleToolEquip } from "@/actions/inventoryActions";
import GDCPlaceholder from "@/components/GDCPlaceholder";

export default function ToolSidebar({
  selectedTool,
  loadout,
  onEquipChange,
  isSignedIn,
  isAdmin = false,
}: {
  selectedTool: DbTool;
  loadout: Set<string>;
  onEquipChange: (newLoadout: string[]) => void;
  isSignedIn: boolean;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEquipped = loadout.has(selectedTool.name);

  const handleToggleEquip = async () => {
    if (!isSignedIn) {
      router.push("/onboarding");
      return;
    }
    
    setLoading(true);
    try {
      const newTools = await toggleToolEquip(selectedTool.name);
      onEquipChange(newTools);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="w-full lg:w-[400px] shrink-0 bg-gradient-to-b from-[#1C1B1C] to-[#131314] border-t border-[#FF7A00] flex flex-col overflow-hidden">
      {/* The detail updates reload with animation key-ed by selectedTool.id */}
      <div key={selectedTool.id} className="p-8 flex flex-col flex-1 animate-slide-left">
        {/* Label */}
        <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#E0C0AF] mb-9 uppercase">
          SELECTED ITEM
        </p>

        {/* Tool name + badge */}
        <div className="flex items-center gap-6 mb-6">
          {/* Icon thumbnail */}
          <div className="w-[80px] h-[80px] bg-[#353436] flex items-center justify-center shrink-0 overflow-hidden relative">
            <div className="w-full h-full p-2 transition-transform duration-300 hover:scale-110">
              {selectedTool.iconUrl ? (
                <img src={selectedTool.iconUrl} alt={selectedTool.name} className="w-full h-full object-contain" />
              ) : (
                <GDCPlaceholder textClassName="text-[14px]" />
              )}
            </div>
          </div>
          {/* Name + category badge */}
          <div>
            <h2 className="font-sora font-normal text-[32px] leading-[32px] uppercase text-[#E5E2E3] m-0">
              {selectedTool.name}
            </h2>
            <span className="inline-flex items-center mt-[8px] bg-[#00B1BC] px-2 h-5 font-mono text-[10px] leading-[16px] text-[#003E42]">
              {selectedTool.category}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#353436] mb-6" />

        {/* Description */}
        <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E0C0AF] mb-8">
          {selectedTool.description}
        </p>

        {/* Metadata: Difficulty + Price */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Difficulty */}
          <div>
            <p className="font-mono font-bold text-[10px] leading-[16px] text-[#E0C0AF] mb-[8px] uppercase">
              DIFFICULTY
            </p>
            <div className="flex gap-[4px] items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className={i <= selectedTool.rating ? "fill-[#FFB68B] text-[#FFB68B]" : "text-[#FFB68B]"}
                />
              ))}
            </div>
          </div>
          {/* Price */}
          <div>
            <p className="font-mono font-bold text-[10px] leading-[16px] text-[#E0C0AF] mb-[8px] uppercase">
              PRICE
            </p>
            <p className="font-sora font-bold text-[16px] leading-[26px] text-[#E5E2E3]">
              {selectedTool.pricing === "FREE"
                ? "Free"
                : selectedTool.pricing === "FREEMIUM"
                ? "Freemium"
                : "Paid"}
            </p>
          </div>
        </div>

        {/* Platform */}
        <div className="mb-8">
          <p className="font-mono font-bold text-[10px] leading-[16px] text-[#E0C0AF] mb-1 uppercase">
            PLATFORM
          </p>
          <p className="font-sora font-normal text-[14px] leading-[20px] text-[#E5E2E3]">
            {selectedTool.platforms}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-4">
          <a
            href={selectedTool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-[58px] bg-[#FF7A00] flex items-center justify-center gap-2 font-sora font-bold text-[16px] leading-[26px] tracking-[-0.4px] uppercase text-[#522300] hover:brightness-110 transition-all duration-200 no-underline relative overflow-hidden group/btn"
          >
            <span className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-500 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              OPEN TOOL <ExternalLink className="w-4 h-4" />
            </span>
          </a>
          {!isAdmin && (
            <button
              onClick={handleToggleEquip}
              disabled={loading}
              className={`w-full h-[62px] border-2 flex items-center justify-center font-sora font-bold text-[16px] leading-[26px] tracking-[-0.4px] uppercase transition-all duration-200 cursor-pointer ${
                loading ? "opacity-50" : "hover:scale-[1.01]"
              } ${
                isEquipped
                  ? "border-[#39ff14] text-[#39ff14] bg-[#39ff14]/5"
                  : "border-[#FF7A00] text-[#FF7A00] bg-transparent hover:bg-[#FF7A00]/5"
              }`}
            >
              {loading ? "SAVING..." : isEquipped ? "✓ EQUIPPED" : "ADD TO LOADOUT"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
