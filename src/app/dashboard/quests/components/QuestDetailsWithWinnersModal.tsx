"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, Users, User, CreditCard, Calendar, MapPin, Trophy, Crown, Medal, Award, Sparkles } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Quest } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";
import { QuestRegistrationFlow } from "./QuestRegistrationFlow";
import { getQuestWinners } from "@/actions/dataActions";

function TimerDisplay({ targetDate, isUpcoming }: { targetDate: Date | null; isUpcoming: boolean }) {
  const targetMs = targetDate ? new Date(targetDate).getTime() : Date.now();
  const timer = useCountdown(targetMs);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="bg-[#1C1B1C] border border-[#3A2D25] hover:border-[#FF7A00]/30 transition-colors p-4 flex items-center gap-4">
      <div className="p-3 bg-[#131314] border border-[#3A2D25] text-[#FFB68B] shrink-0">
        <Clock className="w-5 h-5" />
      </div>
      <div>
        <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">
          {isUpcoming ? "Unlocks In" : "Time Remaining"}
        </p>
        <p className={`font-mono text-[14px] font-bold mt-0.5 ${isUpcoming ? "text-[#E5E2E3]" : "text-[#FFB68B]"}`}>
          {pad(timer.d)}d : {pad(timer.h)}h : {pad(timer.m)}m
        </p>
      </div>
    </div>
  );
}

interface QuestDetailsWithWinnersModalProps {
  quest: Quest;
  user: any;
  isAdmin: boolean;
  onClose: () => void;
  onSuccess: (status: string) => void;
}

interface WinnerGroup {
  name: string;
  isTeam: boolean;
  points: number;
  members: Array<{
    fullName: string;
    email: string;
    rollNo: string;
    xpLevel: string;
  }>;
}

export function QuestDetailsWithWinnersModal({
  quest,
  user,
  isAdmin,
  onClose,
  onSuccess,
}: QuestDetailsWithWinnersModalProps) {
  const isUpcoming = quest.status === "UPCOMING";
  const isCompleted = quest.status === "COMPLETED";

  const existingRegStatus = quest.registrations && quest.registrations.length > 0
    ? quest.registrations[0].status
    : null;

  const isTeamQuest = (quest.maxTeamSize || 1) > 1;
  const [winners, setWinners] = useState<WinnerGroup[]>([]);
  const [loadingWinners, setLoadingWinners] = useState(false);

  useEffect(() => {
    // Disable background page scrolling when modal is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Restore background scrolling when modal is closed
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    // Fetch winners
    async function loadWinners() {
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
  }, [quest.id]);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div
        className="bg-[#1C1B1C] border border-[#584235] w-full max-w-5xl my-auto shadow-2xl relative flex flex-col md:flex-row h-auto md:h-[650px] md:max-h-[90vh] overflow-y-auto md:overflow-hidden shrink-0"
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

            {/* WINNERS SECTION (For Completed Quests, or if winners exist) */}
            {(isCompleted || winners.length > 0) && (
              <div className="bg-[#1C1B1C] border border-[#FF7A00]/40 p-6 relative overflow-hidden rounded-sm">
                {/* Visual accent lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#FFB68B] to-[#FF7A00]" />
                
                <h3 className="font-sora font-semibold text-[14px] text-[#FFB68B] uppercase tracking-wider mb-5 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#FF7A00] animate-pulse" />
                  Quest Champions
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                </h3>

                {loadingWinners ? (
                  <div className="py-8 flex flex-col items-center justify-center gap-2">
                    <div className="w-8 h-8 border-2 border-t-[#FF7A00] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1px] uppercase">Retrieving standings...</p>
                  </div>
                ) : winners.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {/* Podium Layout */}
                    <div className="grid grid-cols-1 gap-3">
                      {winners.map((winner, index) => {
                        let borderStyle = "border-[#3A2D25]";
                        let bgStyle = "bg-[#131314]";
                        let textStyle = "text-[#E5E2E3]";
                        let badgeIcon = null;
                        let rankText = "";

                        if (index === 0) {
                          borderStyle = "border-[#FFD700]/50 shadow-[0_0_12px_rgba(255,215,0,0.1)]";
                          bgStyle = "bg-[#1E1C15]";
                          textStyle = "text-[#FFF3D2]";
                          rankText = "1st Place";
                          badgeIcon = <Crown className="w-5 h-5 text-[#FFD700]" />;
                        } else if (index === 1) {
                          borderStyle = "border-[#C0C0C0]/40 shadow-[0_0_8px_rgba(192,192,192,0.05)]";
                          bgStyle = "bg-[#181819]";
                          textStyle = "text-[#E5E2E3]";
                          rankText = "2nd Place";
                          badgeIcon = <Medal className="w-5 h-5 text-[#C0C0C0]" />;
                        } else if (index === 2) {
                          borderStyle = "border-[#CD7F32]/30 shadow-[0_0_8px_rgba(205,127,50,0.05)]";
                          bgStyle = "bg-[#171513]";
                          textStyle = "text-[#E0C0AF]";
                          rankText = "3rd Place";
                          badgeIcon = <Award className="w-5 h-5 text-[#CD7F32]" />;
                        }

                        return (
                          <div
                            key={index}
                            className={`border ${borderStyle} ${bgStyle} p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01]`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-[#3A2D25]">
                                {badgeIcon}
                              </div>
                              <div>
                                <p className="font-mono text-[9px] uppercase tracking-wider text-[#A78B7C]">{rankText}</p>
                                <h4 className={`font-sora font-bold text-[15px] ${textStyle} tracking-wide mt-0.5`}>
                                  {winner.name}
                                </h4>
                                {winner.isTeam && (
                                  <p className="font-mono text-[10px] text-[#A78B7C] mt-1 leading-relaxed">
                                    Members: {winner.members.map(m => m.fullName).join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase block">SCORE</span>
                              <span className={`font-mono text-[16px] font-extrabold ${index === 0 ? "text-[#FFD700]" : "text-[#FFB68B]"} block mt-0.5`}>
                                {winner.points} XP
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-[#3A2D25] p-5 text-center rounded-sm">
                    <p className="font-mono text-[11px] text-[#E0C0AF] leading-relaxed">
                      Standings will be finalized and announced shortly. Stay tuned!
                    </p>
                  </div>
                )}
              </div>
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

              {/* Card 1: Time Remaining / Completed */}
              {isCompleted ? (
                <div className="bg-[#1C1B1C] border border-[#3A2D25] p-4 flex items-center gap-4">
                  <div className="p-3 bg-[#131314] border border-[#3A2D25] text-zinc-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase">Status</p>
                    <p className="font-mono text-[14px] font-bold text-zinc-400 mt-0.5">COMPLETED</p>
                  </div>
                </div>
              ) : (
                <TimerDisplay targetDate={quest.targetDate} isUpcoming={isUpcoming} />
              )}

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
                      isUpcoming={isUpcoming}
                      onClose={onClose}
                      onSuccess={onSuccess}
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
