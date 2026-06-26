"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, Users, User, CreditCard, Calendar, MapPin } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Quest } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";
import { QuestRegistrationFlow } from "./QuestRegistrationFlow";
import { QuestChampionsList, WinnerGroup } from "./QuestChampionsList";
import { getQuestWinners } from "@/actions/dataActions";


function TimerDisplay({ targetDate, status }: { targetDate: Date | null; status: string }) {
  const targetMs = targetDate ? new Date(targetDate).getTime() : 0;
  const timer = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");
  const isZero = timer.d === 0 && timer.h === 0 && timer.m === 0 && timer.s === 0;

  if (isZero) {
    return (
      <div className="bg-[#1C1B1C] border border-[#3A2D25] p-4 flex items-center gap-4">
        <div className="p-3 bg-[#131314] border border-[#3A2D25] text-[#FF7A00] shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">Status</p>
          <p className="font-mono text-[14px] font-bold text-[#E5E2E3] mt-0.5">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1C1B1C] border border-[#3A2D25] hover:border-[#FF7A00]/30 transition-colors p-4 flex items-center gap-4">
      <div className="p-3 bg-[#131314] border border-[#3A2D25] text-[#FFB68B] shrink-0">
        <Clock className="w-5 h-5" />
      </div>
      <div>
        <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">
          Time Remaining
        </p>
        <p className="font-mono text-[14px] font-bold mt-0.5 text-[#FFB68B]">
          {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
        </p>
      </div>
    </div>
  );
}

interface QuestDetailsModalProps {
  quest: Quest;
  user: any;
  isAdmin?: boolean;
  onClose: () => void;
  onSuccess?: (msg: string, newSeatsTaken: number) => void;
}

// WinnerGroup interface moved to QuestChampionsList

export function QuestDetailsModal({ quest, user, isAdmin, onClose, onSuccess }: QuestDetailsModalProps) {
  const isCompleted = quest.status === "COMPLETED";

  const existingRegStatus = quest.registrations && quest.registrations.length > 0
    ? quest.registrations[0].status
    : null;

  const isTeamQuest = (quest.maxTeamSize || 1) > 1;
  const [winners, setWinners] = useState<WinnerGroup[]>([]);
  const [loadingWinners, setLoadingWinners] = useState(false);

  React.useEffect(() => {
    // Disable background page scrolling when modal is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Restore background scrolling when modal is closed
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    // Fetch winners only if quest is completed
    async function loadWinners() {
      if (!isCompleted) return;
      
      setLoadingWinners(true);
      try {
        const data = await getQuestWinners(quest.id);
        setWinners(data);
      } catch (err) {
        console.error("Failed to load winners:", err);
      } finally {
        setLoadingWinners(false);
      }
    }
    loadWinners();
  }, [quest.id, isCompleted]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div
        className="bg-[#1C1B1C] border border-[#584235] w-full max-w-5xl my-auto shadow-2xl relative flex flex-col md:flex-row h-auto md:h-[600px] md:max-h-[85vh] overflow-y-auto md:overflow-hidden shrink-0"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Left Visual Panel: Cover Image & Hero Title */}
        <div className="w-full md:w-5/12 relative min-h-[220px] md:h-full flex flex-col justify-end p-6 md:p-8 overflow-hidden md:border-r border-[#584235] shrink-0">
          {quest.image ? (
            <>
              <img
                src={quest.image}
                alt={quest.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1C] via-[#1C1B1C]/65 to-[#1C1B1C]/35" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2E2018] to-[#131314]" />
          )}

          {/* Left panel text overlay */}
          <div className="relative z-10 flex flex-col gap-4">
            <div>
              <span className="font-mono text-[10px] bg-[#FF7A00]/25 text-[#FFB68B] border border-[#FF7A00]/50 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                {quest.category}
              </span>
            </div>

            <h1 className="font-sora font-extrabold text-[26px] md:text-[32px] text-white leading-tight">
              {quest.title}
            </h1>

            <div className="flex flex-col gap-2 mt-1">
              <span className="font-mono text-[11px] text-[#E0C0AF] flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#FF7A00]" /> {quest.dateText}
              </span>
              <span className="font-mono text-[11px] text-[#E0C0AF] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" /> {quest.location}
              </span>
              {isTeamQuest ? (
                <span className="font-mono text-[11px] text-[#FFB68B] flex items-center gap-2 font-bold">
                  <Users className="w-3.5 h-3.5 text-[#FF7A00]" /> Team Event ({quest.minTeamSize}-{quest.maxTeamSize} Members)
                </span>
              ) : (
                <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-zinc-500" /> Solo Event
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Info and Registration Panel */}
        <div className="w-full md:w-7/12 flex flex-col h-auto md:h-full md:min-h-0 overflow-visible md:overflow-hidden bg-[#161618]">
          {/* Header */}
          <div className="flex justify-between items-center p-4 md:p-6 border-b border-[#3A2D25] shrink-0 bg-[#161618] z-10">
            <span className="font-mono text-[11px] text-[#A78B7C] tracking-[1.5px] uppercase">Dossier Details</span>
            <button onClick={onClose} className="text-[#A78B7C] hover:text-white transition-colors p-1 hover:bg-[#1C1C1E] rounded-sm">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content container */}
          <div className="flex-1 overflow-visible md:overflow-y-auto md:min-h-0 p-4 md:p-6 flex flex-col gap-6 transform-gpu will-change-transform overscroll-contain">

            {/* WINNERS SECTION (For Completed Quests Only) */}
            {isCompleted && (
              <QuestChampionsList winners={winners} loadingWinners={loadingWinners} />
            )}

            {/* Special Highlight for Team Quests */}
            {isTeamQuest && !isCompleted && (
              <div className="bg-[#1C1B1C] border border-l-4 border-[#3A2D25] border-l-[#FF7A00] p-4 flex gap-4 items-start">
                <div className="p-2 bg-[#FF7A00]/10 rounded-sm text-[#FF7A00] shrink-0 mt-0.5">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sora font-semibold text-[13px] text-white uppercase tracking-wider">Team Event Notice</h4>
                  <p className="font-mono text-[11px] text-[#A78B7C] mt-1 leading-relaxed">
                    A team of <span className="text-[#FFB68B] font-bold">{quest.minTeamSize || 1}</span> to <span className="text-[#FFB68B] font-bold">{quest.maxTeamSize || 1}</span> members is required. Provide a team name and teammate emails below to register.
                  </p>
                </div>
              </div>
            )}

            {/* Redesigned 2x2 Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Card 1: Time Remaining */}
              <TimerDisplay targetDate={quest.targetDate} status={quest.status} />

              {/* Card 2: Seats Available */}
              <div className="bg-[#1C1B1C] border border-[#3A2D25] hover:border-[#FF7A00]/30 transition-colors p-4 flex items-center gap-4">
                <div className="p-3 bg-[#131314] border border-[#3A2D25] text-[#E0C0AF] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">Seats Available</p>
                  <p className="font-mono text-[14px] font-bold text-[#E5E2E3] mt-0.5">
                    {quest.seatsTaken || 0} / {quest.capacity || 30}
                  </p>
                </div>
              </div>

              {/* Card 3: Team Size */}
              <div className="bg-[#1C1B1C] border border-[#3A2D25] hover:border-[#FF7A00]/30 transition-colors p-4 flex items-center gap-4">
                <div className="p-3 bg-[#131314] border border-[#3A2D25] text-[#E0C0AF] shrink-0">
                  {isTeamQuest ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">Team Size</p>
                  <p className="font-mono text-[14px] font-bold text-[#E5E2E3] mt-0.5">
                    {isTeamQuest ? `${quest.minTeamSize || 1}-${quest.maxTeamSize || 1} Members` : "Solo"}
                  </p>
                </div>
              </div>

              {/* Card 4: Fee */}
              <div className="bg-[#1C1B1C] border border-[#3A2D25] hover:border-[#FF7A00]/30 transition-colors p-4 flex items-center gap-4">
                <div className="p-3 bg-[#131314] border border-[#3A2D25] text-[#E0C0AF] shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">Fee / Member</p>
                  <p className="font-mono text-[14px] font-bold text-[#E5E2E3] mt-0.5">
                    {quest.price ? `₹${quest.price}` : "Free"}
                  </p>
                </div>
              </div>

            </div>

            {/* Markdown Description */}
            {quest.description && quest.description.trim() !== "" && (
              <div className="bg-[#1C1B1C] p-6 border border-[#3A2D25] relative">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent" />
                <h3 className="font-sora font-semibold text-[13px] text-white uppercase tracking-wider mb-4">Quest Briefing</h3>
                <MarkdownRenderer content={quest.description} />
              </div>
            )}

            {/* Registration Box (Only display if NOT completed) */}
            {!isCompleted && (
              <>
                {!isAdmin && existingRegStatus && (
              <div className="bg-[#1C1B1C] border border-[#584235] p-6 text-center">
                <p className="font-mono text-[#E5E2E3] text-[14px]">
                  YOUR STATUS: <span className={`font-bold ml-2 ${existingRegStatus === 'REJECTED' ? 'text-red-500' : 'text-emerald-400'}`}>{existingRegStatus.replace('_', ' ')}</span>
                </p>
              </div>
            )}

            {!isAdmin && !existingRegStatus && (
               quest.capacity !== null && quest.capacity !== undefined && (quest.seatsTaken || 0) >= quest.capacity ? (
                <div className="bg-[#1C1B1C] border border-[#584235] p-6 text-center shrink-0">
                  <p className="font-mono text-[#E5E2E3] text-[14px] uppercase">
                    QUEST STATUS: <span className="font-bold ml-2 text-[#FFB68B]">MAX CAPACITY REACHED</span>
                  </p>
                </div>
              ) : (
                <QuestRegistrationFlow
                  quest={quest}
                  user={user}
                  onClose={onClose}
                  onSuccess={(msg, newSeatsTaken) => {
                    if (onSuccess) onSuccess(msg, newSeatsTaken);
                  }}
                />
              )
            )}
            </>
          )}
            {/* Spacer to ensure padding-bottom works in all browsers */}
            <div className="h-4 md:h-6 shrink-0" />
          </div>
        </div>

      </div>
    </div>
  );
}
