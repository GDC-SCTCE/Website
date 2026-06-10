"use client";

import React from "react";
import { useGameForge } from "@/context/GameForgeContext";
import { Award, Terminal, Trophy, Flame } from "lucide-react";

export default function HighScores() {
  const { user, leaderboard } = useGameForge();

  // Visual classes for Top 3 ranks
  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          row: "bg-neon-orange/5 border-l-2 border-neon-orange text-white font-bold shadow-[inset_4px_0_12px_rgba(255,107,0,0.04)]",
          rankBadge: "bg-neon-orange text-black border-neon-orange shadow-[0_0_10px_rgba(255,107,0,0.4)]",
          scoreText: "text-neon-orange text-shadow-orange"
        };
      case 2:
        return {
          row: "bg-neon-blue/5 border-l-2 border-neon-blue text-zinc-200 shadow-[inset_4px_0_12px_rgba(0,240,255,0.04)]",
          rankBadge: "bg-neon-blue text-black border-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.4)]",
          scoreText: "text-neon-blue text-shadow-blue"
        };
      case 3:
        return {
          row: "bg-neon-purple/5 border-l-2 border-neon-purple text-zinc-300 shadow-[inset_4px_0_12px_rgba(185,35,255,0.04)]",
          rankBadge: "bg-neon-purple text-white border-neon-purple shadow-[0_0_10px_rgba(185,35,255,0.4)]",
          scoreText: "text-neon-purple"
        };
      default:
        return {
          row: "border-l border-zinc-900 text-zinc-400 hover:bg-zinc-950/40",
          rankBadge: "bg-zinc-900 text-zinc-500 border-zinc-850",
          scoreText: "text-zinc-300"
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-widest uppercase flex items-center gap-3">
          <Award className="w-7 h-7 text-neon-orange" />
          High Scores
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-2 uppercase tracking-wider">
          Global rankings of compiled games and top-performing club developers.
        </p>
      </div>

      {/* Ranks showcase layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Top 3 Podiums */}
        <div className="lg:col-span-1 bg-cyber-card border border-cyber-border rounded-lg clip-cyber p-6 flex flex-col justify-between shadow-lg relative min-h-[300px]">
          <div className="absolute inset-0 bg-cyber-grid-dots opacity-20 pointer-events-none" />
          
          <div>
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Trophy className="w-4.5 h-4.5 text-neon-orange" />
              Podium Units
            </h2>
            
            <p className="text-xs text-zinc-455 font-sans leading-relaxed mb-6">
              The highest scores registered dynamically from simulated developer session environments. Complete quests and play cartridges to claim high rankings.
            </p>
          </div>

          {/* Simple podium graphic */}
          <div className="flex items-end justify-center gap-3 font-mono text-center pt-8 border-t border-zinc-900/60">
            {/* 2nd Place */}
            {leaderboard[1] && (
              <div className="space-y-2 w-20">
                <div className="text-[9px] text-neon-blue font-bold uppercase truncate px-1">
                  {leaderboard[1].player}
                </div>
                <div className="bg-gradient-to-t from-zinc-900 to-zinc-950 border border-neon-blue/30 h-20 flex items-center justify-center font-display font-black text-xl text-neon-blue glow-blue">
                  2ND
                </div>
              </div>
            )}
            
            {/* 1st Place */}
            {leaderboard[0] && (
              <div className="space-y-2 w-24">
                <div className="text-[10px] text-neon-orange font-bold uppercase truncate px-1 flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 text-neon-orange animate-pulse" />
                  {leaderboard[0].player}
                </div>
                <div className="bg-gradient-to-t from-zinc-900 to-zinc-950 border-t-2 border-x border-neon-orange h-28 flex items-center justify-center font-display font-black text-2xl text-neon-orange glow-orange">
                  1ST
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {leaderboard[2] && (
              <div className="space-y-2 w-20">
                <div className="text-[9px] text-neon-purple font-bold uppercase truncate px-1">
                  {leaderboard[2].player}
                </div>
                <div className="bg-gradient-to-t from-zinc-900 to-zinc-950 border border-neon-purple/30 h-16 flex items-center justify-center font-display font-black text-lg text-neon-purple">
                  3RD
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Ranks Board List */}
        <div className="lg:col-span-2 bg-cyber-card border border-cyber-border rounded-lg clip-cyber shadow-lg p-6">
          <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <Terminal className="w-4.5 h-4.5 text-neon-blue" />
            Ranks database table
          </h2>

          <div className="border border-zinc-900 rounded bg-black/40 overflow-hidden font-mono text-xs">
            {/* Table Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-black/70 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-6">
                <span className="w-8 text-center">RANK</span>
                <span>PLAYER</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="w-28 text-left hidden sm:inline">CARTRIDGE</span>
                <span className="w-20 text-right">SCORE</span>
              </div>
            </div>

            {/* Table Rows */}
            {leaderboard.length === 0 ? (
              <div className="text-[10px] font-mono text-zinc-650 uppercase p-12 text-center border-t border-zinc-950">
                No high scores stored.
              </div>
            ) : (
              leaderboard.map((entry) => {
                const styles = getRankStyles(entry.rank);
                const isCurrentUser = user ? entry.player === user.nickname : false;
                return (
                  <div
                    key={`${entry.player}-${entry.gameTitle}-${entry.rank}`}
                    className={`
                      flex items-center justify-between px-4 py-3 border-b border-zinc-900/60 transition-colors
                      ${styles.row}
                      ${isCurrentUser ? "bg-neon-orange/[0.03] border-l-2 border-l-neon-orange font-bold text-white" : ""}
                    `}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-8 h-5 rounded border flex items-center justify-center font-bold font-display text-[9px] uppercase ${styles.rankBadge}`}>
                        #{entry.rank}
                      </div>
                      <span className="uppercase tracking-widest text-[11px] truncate max-w-[120px] sm:max-w-none">
                        {entry.player} {isCurrentUser && <span className="text-[8px] font-bold text-neon-orange">(YOU)</span>}
                      </span>
                    </div>

                    <div className="flex items-center gap-8 font-bold">
                      <span className="w-28 text-left text-[10px] text-zinc-500 truncate hidden sm:inline uppercase">
                        {entry.gameTitle}
                      </span>
                      <span className={`w-20 text-right font-black ${styles.scoreText}`}>
                        {entry.score}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
