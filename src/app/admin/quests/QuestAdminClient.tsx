"use client";

import React, { useState } from "react";
import QuestForm from "./QuestForm";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { Search, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { filters as questFilters } from "@/constants/quests";
import { deleteQuest, deleteAllQuests, getPaginatedAdminQuests } from "@/actions/admin/quests";
import { Quest, QuestFilterCategory } from "@/types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminQuestSkeleton } from "./AdminQuestSkeleton";
import Image from "next/image";
import { QuestStatus } from "@prisma/client";

export default function QuestAdminClient() {
  const [activeFilter, setActiveFilter] = useState<QuestFilterCategory>("All");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const PAGE_SIZE = 10;

  // Debounce search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0); // Reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Handle filter changes (reset page)
  const handleCategoryChange = (val: QuestFilterCategory) => {
    setActiveFilter(val);
    setPage(0);
  };
  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    setPage(0);
  };

  // Fetch data
  React.useEffect(() => {
    let isMounted = true;
    async function loadQuests() {
      setIsLoading(true);
      try {
        const data = await getPaginatedAdminQuests(page, PAGE_SIZE, debouncedSearch, activeFilter, statusFilter);
        if (isMounted) {
          setQuests(data.quests as any);
          setTotalCount(data.totalCount);
        }
      } catch (err) {
        console.error("Failed to load admin quests:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadQuests();
    return () => { isMounted = false; };
  }, [page, debouncedSearch, activeFilter, statusFilter, refreshTrigger]);

  const handleDeleteAll = async () => {
    if (window.confirm("WARNING: Are you sure you want to delete ALL quests? This cannot be undone!")) {
      setIsDeleting(true);
      await deleteAllQuests();
      setSelectedQuest(null);
      setRefreshTrigger(prev => prev + 1);
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
      setRefreshTrigger(prev => prev + 1);
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

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

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
              onChange={(e) => handleCategoryChange(e.target.value as QuestFilterCategory)}
              className="bg-[#131314] border border-[#584235] h-[36px] px-2 text-[#FFB68B] font-mono text-[12px] outline-none focus:border-[#FF7A00] min-w-[140px]"
            >
              {questFilters.map(f => (
                <option key={f.id} value={f.id}>{f.label.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px]">STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-[#131314] border border-[#584235] h-[36px] px-2 text-[#FFB68B] font-mono text-[12px] outline-none focus:border-[#FF7A00] min-w-[120px]"
            >
              {["ALL", ...Object.values(QuestStatus)].map(status => (
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
      
      <div className="flex flex-col gap-4">
        {/* TOP BAR WITH ADD NEW BUTTON */}
        <div className="flex justify-end mb-2">
          <button 
            onClick={() => setSelectedQuest({} as Quest)}
            className="font-mono text-[12px] bg-[#FF7A00] text-[#5C2800] px-4 py-2 hover:brightness-110 transition-colors font-bold tracking-[1.2px]"
          >
            + ADD NEW QUEST
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[...Array(PAGE_SIZE)].map((_, i) => <AdminQuestSkeleton key={`skel-${i}`} />)}
          </div>
        ) : quests.length > 0 ? (
          quests.map((quest) => (
            <div 
              key={quest.id} 
              onClick={() => setSelectedQuest(quest)}
              className={`bg-[#1A1A1B] border ${selectedQuest?.id === quest.id ? 'border-[#FF7A00]' : 'border-[#584235] hover:border-[#FF7A00]/50'} p-4 flex flex-col sm:flex-row gap-4 cursor-pointer transition-colors items-start sm:items-center`}
            >
              <div className="w-full sm:w-[96px] h-[120px] sm:h-[64px] shrink-0 border border-[#584235] overflow-hidden relative flex items-center justify-center bg-[#1C1B1C]">
                {quest.image ? (
                  <Image src={quest.image} alt={quest.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 96px" />
                ) : (
                  <GDCPlaceholder textClassName="text-[20px]" />
                )}
              </div>
              
              <div className="flex-1 flex flex-col gap-2 sm:gap-1 w-full">
                <div className="flex flex-col xl:flex-row justify-between items-start gap-2 xl:gap-0">
                  <h3 className="font-sora font-bold text-[18px] text-[#FFB68B]">{quest.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono text-[10px] bg-[#584235] text-[#FFB68B] px-2 py-1 rounded-sm flex items-center">
                      {quest.category}
                    </span>
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-sm border flex items-center ${
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
                <p className="font-sans text-[14px] text-zinc-300 mt-1 sm:mt-0">{quest.dateText} | {quest.location}</p>
                <div className="mt-3 sm:mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-wrap">
                  <div className="flex gap-4 items-center">
                    <span className="font-mono text-[12px] text-[#A78B7C]">SEATS: <span className="text-[#FF7A00]">{quest.seatsTaken}/{quest.capacity}</span></span>
                    <span className="font-mono text-[12px] text-[#A78B7C]">
                      RATING: <span className="text-[#FF7A00]">
                        {quest.ratings?.length 
                          ? `${(quest.ratings.reduce((s: number, r: any) => s + (r.rating || 0), 0) / quest.ratings.length).toFixed(1)} ★ (${quest.ratings.length})` 
                          : "NO RATINGS"}
                      </span>
                    </span>
                  </div>
                  <Link
                    href={`/admin/quests/${quest.id}/registrations`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 font-mono text-[10px] bg-[#584235]/50 hover:bg-[#FF7A00]/20 text-[#E0C0AF] hover:text-[#FF7A00] px-3 py-1.5 border border-[#584235] hover:border-[#FF7A00]/50 transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    VIEW REGISTRATIONS
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center font-mono text-[12px] text-[#A78B7C] p-8 border border-dashed border-[#584235]">
            NO QUESTS FOUND.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0 || isLoading}
            className="flex items-center gap-1 font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" /> PREV
          </button>
          <span className="font-mono text-[12px] text-[#E0C0AF] tracking-[1.2px]">
            PAGE {page + 1} OF {totalPages}
          </span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1 || isLoading}
            className="flex items-center gap-1 font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MODAL OVERLAY FOR QUEST FORM */}
      {selectedQuest && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#1A1A1B] border border-[#584235] w-full max-w-3xl my-auto shadow-2xl relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-[#584235] shrink-0 sticky top-0 bg-[#1A1A1B] z-10">
              <h2 className="font-sora font-bold text-[20px] text-white">
                {selectedQuest.id ? "EDIT QUEST" : "ADD NEW QUEST"}
              </h2>
              <button 
                onClick={() => setSelectedQuest(null)}
                className="text-[#A78B7C] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <QuestForm key={selectedQuest.id || "new"} quest={selectedQuest.id ? selectedQuest : undefined} onComplete={() => { setSelectedQuest(null); setRefreshTrigger(prev => prev + 1); }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
