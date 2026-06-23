"use client";

import React, { useState } from "react";
import ToolForm from "./ToolForm";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { Search, Trash2 } from "lucide-react";
import { deleteTool, deleteAllTools } from "@/actions/admin/tools";
import { Tool } from "@prisma/client";

export default function ToolAdminClient({ tools }: { tools: Tool[] }) {
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (window.confirm("WARNING: Are you sure you want to delete ALL tools? This cannot be undone!")) {
      setIsDeleting(true);
      await deleteAllTools();
      setSelectedTool(null);
      setIsDeleting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this tool?")) {
      setIsDeleting(true);
      await deleteTool(id);
      if (selectedTool?.id === id) {
        setSelectedTool(null);
      }
      setIsDeleting(false);
    }
  };

  React.useEffect(() => {
    if (selectedTool) {
      const updated = tools.find(t => t.id === selectedTool.id);
      if (updated) setSelectedTool(updated);
    }
  }, [tools, selectedTool]);

  const filteredTools = tools.filter((t) => {
    return t.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Admin Unified Filter Bar */}
      <div className="bg-[#1A1A1B] border border-[#584235] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A78B7C]" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#131314] border border-[#584235] h-[36px] pl-10 pr-4 text-white font-mono text-[12px] outline-none focus:border-[#FF7A00]"
          />
        </div>

        {/* Delete All Action */}
        <button
          onClick={handleDeleteAll}
          disabled={isDeleting || tools.length === 0}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 px-3 h-[36px] font-mono text-[10px] tracking-[1.2px] transition-colors disabled:opacity-50 ml-auto shrink-0"
        >
          <Trash2 className="w-[14px] h-[14px]" /> DELETE ALL TOOLS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT COLUMN: LIST */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          {filteredTools.length === 0 ? (
            <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
              NO TOOLS MATCHING YOUR FILTERS.
            </div>
          ) : (
            filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`bg-[#1A1A1B] border ${selectedTool?.id === tool.id ? 'border-[#FF7A00]' : 'border-[#584235] hover:border-[#FF7A00]/50'} p-4 flex gap-4 cursor-pointer transition-colors items-center`}
              >
                {/* Thumbnail */}
                <div className="w-[64px] h-[64px] shrink-0 border border-[#584235] overflow-hidden relative flex items-center justify-center bg-[#1C1B1C]">
                  {tool.iconUrl ? (
                    <img src={tool.iconUrl} alt={tool.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <GDCPlaceholder textClassName="text-[14px]" />
                  )}
                </div>

                {/* Info & Actions */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <div className="min-w-0 flex-1 w-full">
                    <h3 className="font-sora font-bold text-[16px] text-white truncate mb-1">
                      {tool.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono text-[10px] tracking-[1.2px] text-[#A78B7C] uppercase shrink-0">
                        {tool.category}
                      </span>
                      <span className="font-mono text-[10px] tracking-[1.2px] text-[#A78B7C] uppercase truncate">
                        • {tool.pricing}
                      </span>
                    </div>
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, tool.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 transition-colors shrink-0 self-end sm:self-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235] p-6 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sora font-bold text-[20px] text-white uppercase">
              {selectedTool ? `EDIT TOOL` : "ADD NEW TOOL"}
            </h2>
            {selectedTool && (
              <button 
                onClick={() => setSelectedTool(null)}
                className="font-mono text-[10px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-1 hover:bg-[#FF7A00]/20 transition-colors"
              >
                + NEW
              </button>
            )}
          </div>
          <ToolForm 
            key={selectedTool?.id || "new"}
            tool={selectedTool} 
            onComplete={() => setSelectedTool(null)} 
          />
        </div>
      </div>
    </div>
  );
}
