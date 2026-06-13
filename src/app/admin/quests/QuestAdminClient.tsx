"use client";

import React, { useState } from "react";
import QuestForm from "./QuestForm";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { Search, Trash2 } from "lucide-react";
import { filters as questFilters } from "@/constants/quests";
import { deleteQuest, deleteAllQuests } from "@/actions/adminActions";

export default function QuestAdminClient({ quests }: { quests: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedQuest, setSelectedQuest] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAll = async () => {
    if (window.confirm("WARNING: Are you sure you want to delete ALL quests? This cannot be undone!")) {
      setIsDeleting(true);
      await deleteAllQuests();
      setSelectedQuest(null);
      setIsDeleting(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this quest?")) {
      setIsDeleting(true);
      await deleteQuest(id);
      if (selectedQuest?.id === id) {
        setSelectedQuest(null);
      }
      setIsDeleting(false);
    }
  };

  // keep selected up to date if items change
  React.useEffect(() => {
    if (selectedQuest) {
      const updated = quests.find(q => q.id === selectedQuest.id);
      if (updated) setSelectedQuest(updated);
    }
  }, [quests, selectedQuest]);

  const filteredQuests = quests.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeFilter === "All" || q.category === activeFilter;
    const matchesStatus = statusFilter === "ALL" || q.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Admin Unified Filter Bar */}
      <div className="bg-[#1A1A1B] border border-[#584235] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A78B7C]">
            <Search className="w-[14px] h-[14px]" />
          </div>
          <input
            type="text"
            placeholder="Search quests by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[36px] bg-[#131314] border border-[#584235] pl-9 pr-4 font-mono text-[12px] text-white outline-none focus:border-[#FF7A00] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">CATEGORY:</span>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-[#131314] border border-[#584235] h-[36px] px-2 text-[#FFB68B] font-mono text-[12px] outline-none focus:border-[#FF7A00] min-w-[140px]"
            >
              {questFilters.map(f => (
                <option key={f} value={f}>{f.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#131314] border border-[#584235] h-[36px] px-2 text-[#FFB68B] font-mono text-[12px] outline-none focus:border-[#FF7A00] min-w-[120px]"
            >
              {["ALL", "ACTIVE", "UPCOMING", "COMPLETED"].map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleDeleteAll}
            disabled={isDeleting || quests.length === 0}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 px-3 h-[36px] font-mono text-[10px] tracking-[1.2px] transition-colors disabled:opacity-50 ml-auto"
          >
            <Trash2 className="w-[14px] h-[14px]" /> DELETE ALL
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">

          {filteredQuests.map((quest) => (
            <div 
              key={quest.id} 
              onClick={() => setSelectedQuest(quest)}
              className={`bg-[#1A1A1B] border ${selectedQuest?.id === quest.id ? 'border-[#FF7A00]' : 'border-[#584235] hover:border-[#FF7A00]/50'} p-4 flex gap-4 cursor-pointer transition-colors items-center`}
            >
              <div className="w-[96px] h-[64px] shrink-0 border border-[#584235] overflow-hidden relative flex items-center justify-center bg-[#1C1B1C]">
                {quest.image ? (
                  <img src={quest.image} alt={quest.title} className="w-full h-full object-cover" />
                ) : (
                  <GDCPlaceholder textClassName="text-[20px]" />
                )}
              </div>
              
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-sora font-bold text-[18px] text-[#FFB68B]">{quest.title}</h3>
                  <div className="flex gap-2">
                    <span className="font-mono text-[10px] bg-[#584235] text-[#FFB68B] px-2 py-1 rounded-sm">
                      {quest.category}
                    </span>
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-sm border ${
                      quest.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      quest.status === 'UPCOMING' ? 'bg-[#FF7A00]/10 text-[#FF7A00] border-[#FF7A00]/20' :
                      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}>
                      {quest.status}
                    </span>
                    <button
                      onClick={(e) => handleDelete(e, quest.id)}
                      disabled={isDeleting}
                      className="text-[#A78B7C] hover:text-red-500 p-1 transition-colors disabled:opacity-50 ml-1"
                      title="Delete Quest"
                    >
                      <Trash2 className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </div>
                <p className="font-sans text-[14px] text-zinc-300">{quest.dateText} | {quest.location}</p>
                <div className="mt-2 flex gap-4">
                  <span className="font-mono text-[12px] text-[#A78B7C]">SEATS: <span className="text-[#FF7A00]">{quest.seatsTaken}/{quest.capacity}</span></span>
                  {quest.status === "COMPLETED" && (
                    <span className="font-mono text-[12px] text-[#A78B7C]">RATING: <span className="text-[#FF7A00]">{quest.rating || 0}/5.0</span></span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredQuests.length === 0 && (
            <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
              NO QUESTS FOUND.
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-[#1A1A1B] border border-[#584235] p-6 h-fit sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sora font-bold text-[20px] text-white">
              {selectedQuest ? "EDIT QUEST" : "ADD NEW QUEST"}
            </h2>
            {selectedQuest && (
              <button 
                onClick={() => setSelectedQuest(null)}
                className="font-mono text-[10px] bg-[#FF7A00]/10 text-[#FF7A00] px-2 py-1 hover:bg-[#FF7A00]/20 transition-colors"
              >
                + NEW
              </button>
            )}
          </div>
          <QuestForm quest={selectedQuest} onComplete={() => setSelectedQuest(null)} />
        </div>
      </div>
    </div>
  );
}
