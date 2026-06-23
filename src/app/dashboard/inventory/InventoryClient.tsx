"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import { Tool as DbTool, ToolCategory } from "@prisma/client";
import ToolGrid from "./components/ToolGrid";
import ToolSidebar from "./components/ToolSidebar";
import { InventoryDynamicSkeleton } from "./components/InventoryDynamicSkeleton";

type Category = "ALL" | ToolCategory;
const CATEGORIES: Category[] = ["ALL", ...Object.values(ToolCategory)];

interface InventoryData {
  dbTools: DbTool[];
  initialUserTools: string[];
  isSignedIn: boolean;
  isAdmin: boolean;
}

// ── DYNAMIC CONTENT ──
function DynamicInventoryContent({
  inventoryDataPromise,
  activeCategory,
  gridVisible
}: {
  inventoryDataPromise: Promise<InventoryData>;
  activeCategory: Category;
  gridVisible: boolean;
}) {
  const { dbTools, initialUserTools, isSignedIn, isAdmin } = use(inventoryDataPromise);

  const [selectedTool, setSelectedTool] = useState<DbTool | null>(dbTools[0] || null);
  const [loadout, setLoadout] = useState<Set<string>>(new Set(initialUserTools));

  // Default to first tool if selected one gets filtered out?
  // Usually, keeping the selected tool visible in the sidebar is fine even if not in grid.

  const filtered =
    activeCategory === "ALL"
      ? dbTools
      : dbTools.filter((t) => t.category === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 min-w-0">
        <ToolGrid
          tools={filtered}
          selectedToolId={selectedTool?.id || ""}
          onSelectTool={setSelectedTool}
          gridVisible={gridVisible}
          loadout={loadout}
        />
      </div>

      {selectedTool && (
        <ToolSidebar
          selectedTool={selectedTool}
          loadout={loadout}
          onEquipChange={(newLoadout) => setLoadout(new Set(newLoadout))}
          isSignedIn={isSignedIn}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}

// ── STATIC SHELL ──
export default function InventoryClient({
  inventoryDataPromise
}: {
  inventoryDataPromise: Promise<InventoryData>;
}) {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [mounted, setMounted] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  // Entrance mount animation
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 50);
    const t2 = setTimeout(() => setGridVisible(true), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Filter change transition (fade-out, swap data, fade-in)
  const handleCategoryChange = (cat: Category) => {
    if (cat === activeCategory) return;
    setGridVisible(false);
    setTimeout(() => {
      setActiveCategory(cat);
      setTimeout(() => {
        setGridVisible(true);
      }, 60);
    }, 220);
  };

  return (
    <div className="bg-[#131314] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 space-y-16">
        {/* ── Section 5.1: Header ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          {/* Left: Title */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <p className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#00DBE9] mb-5 uppercase">
              YOUR LOADOUT
            </p>
            <h1 className="font-sora font-extrabold text-[56px] sm:text-[80px] leading-[56px] sm:leading-[80px] tracking-[-3.2px] uppercase text-[#E5E2E3] m-0">
              THE
              <br />
              INVENTORY.
            </h1>
          </div>

          {/* Right: Category filter buttons */}
          <div
            className="flex flex-wrap gap-[12px] transition-all duration-500"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transitionDelay: "150ms",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`h-[28px] px-6 font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] border-none cursor-pointer transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#FF7A00] text-[#522300] shadow-[0_0_20px_rgba(255,122,0,0.2)]"
                    : "bg-[#201F20] text-[#E0C0AF] hover:bg-[#2e2d2e] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section 5.2: Inventory Grid + Inspector ─────────────────────── */}
        <Suspense fallback={<InventoryDynamicSkeleton />}>
          <DynamicInventoryContent 
            inventoryDataPromise={inventoryDataPromise}
            activeCategory={activeCategory}
            gridVisible={gridVisible}
          />
        </Suspense>

      </div>
    </div>
  );
}
