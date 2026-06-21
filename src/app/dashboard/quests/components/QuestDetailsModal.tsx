"use client";

import React from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Quest } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";
import { QuestRegistrationFlow } from "./QuestRegistrationFlow";

interface QuestDetailsModalProps {
  quest: Quest;
  user: any;
  isAdmin: boolean;
  onClose: () => void;
  onSuccess: (status: string) => void;
}

export function QuestDetailsModal({ quest, user, isAdmin, onClose, onSuccess }: QuestDetailsModalProps) {
  const isUpcoming = quest.status === "UPCOMING";

  const targetMs = quest.targetDate ? new Date(quest.targetDate).getTime() : Date.now();
  const timer = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");

  const existingRegStatus = quest.registrations && quest.registrations.length > 0 
    ? quest.registrations[0].status 
    : null;

  const isTeamQuest = (quest.maxTeamSize || 1) > 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="bg-[#1C1B1C] border border-[#584235] w-full max-w-4xl my-auto shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-[#584235] shrink-0 sticky top-0 bg-[#1C1B1C] z-10">
          <h2 className="font-sora font-bold text-[20px] text-white">QUEST DOSSIER</h2>
          <button onClick={onClose} className="text-[#A78B7C] hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-8">
          
          {/* Main Content Area */}
          <div className="flex flex-col gap-8">
            
            {/* Header Area */}
            <div>
              <h1 className="font-sora font-extrabold text-[28px] md:text-[40px] text-[#FFB68B] leading-tight mb-4">
                {quest.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="font-mono text-[12px] bg-[#584235] text-[#FFB68B] px-3 py-1 rounded-sm uppercase tracking-wider">
                  {quest.category}
                </span>
                <span className="font-mono text-[12px] text-[#E0C0AF] border border-[#584235] px-3 py-1 rounded-sm">
                  {quest.dateText}
                </span>
                <span className="font-mono text-[12px] text-[#E0C0AF] border border-[#584235] px-3 py-1 rounded-sm">
                  {quest.location}
                </span>
              </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#131314] border border-[#584235] p-5">
              <div>
                <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] mb-1">
                  {isUpcoming ? "UNLOCKS IN" : "TIME REMAINING"}
                </p>
                <p className={`font-mono text-[16px] md:text-[20px] ${isUpcoming ? "text-[#E5E2E3]" : "text-[#FFB68B]"}`}>
                  {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] mb-1">SEATS AVAILABLE</p>
                <p className="font-mono text-[16px] md:text-[20px] text-[#E5E2E3]">
                  {quest.seatsTaken || 0} / {quest.capacity || 30}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] mb-1">TEAM SIZE</p>
                <p className="font-mono text-[16px] md:text-[20px] text-[#E5E2E3]">
                  {isTeamQuest ? `${quest.minTeamSize || 1} - ${quest.maxTeamSize || 1} Members` : "Solo"}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] mb-1">FEE / MEMBER</p>
                <p className="font-mono text-[16px] md:text-[20px] text-[#E5E2E3]">
                  {quest.price ? `₹${quest.price}` : "Free"}
                </p>
              </div>
            </div>

            {/* Markdown Description */}
            <div className="bg-[#1A1A1B] p-6 border border-[#2d2a29]">
              <div className="prose prose-invert prose-sm md:prose-base max-w-none text-zinc-300">
                {quest.description ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{quest.description}</ReactMarkdown>
                ) : (
                  <p>No description provided for this quest.</p>
                )}
              </div>
            </div>

            {/* Registration Box */}
            {!isAdmin && existingRegStatus && (
              <div className="bg-[#131314] border border-[#584235] p-6 text-center mt-4">
                <p className="font-mono text-[#E5E2E3] text-[14px]">
                  YOUR STATUS: <span className={`font-bold ml-2 ${existingRegStatus === 'REJECTED' ? 'text-red-500' : 'text-emerald-400'}`}>{existingRegStatus.replace('_', ' ')}</span>
                </p>
              </div>
            )}

            {!isAdmin && !existingRegStatus && (
              <QuestRegistrationFlow
                quest={quest}
                user={user}
                isUpcoming={isUpcoming}
                onClose={onClose}
                onSuccess={onSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
