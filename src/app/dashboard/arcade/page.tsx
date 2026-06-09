"use client";

import React, { useState } from "react";
import { useGameForge } from "@/context/GameForgeContext";
import { Button } from "@/components/ui/Button";
import { Game } from "@/types";
import { Gamepad2, Award, Star, Play, X, ShieldAlert, Cpu, Sparkles } from "lucide-react";

export default function ArcadeWall() {
  const { user, games, submitScore } = useGameForge();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Game session simulation states
  const [simulating, setSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simResult, setSimResult] = useState<number | null>(null);

  if (!user) return null;

  // Custom game card background styles representing retro game cartridge colors
  const getGameGradients = (gameId: string) => {
    switch (gameId) {
      case "g1": return "from-pink-900 via-purple-900 to-black";
      case "g2": return "from-emerald-950 via-teal-900 to-black";
      case "g3": return "from-cyan-950 via-blue-900 to-black";
      default: return "from-zinc-900 via-neutral-900 to-black";
    }
  };

  const handleLaunchGame = (game: Game) => {
    setSelectedGame(game);
    setSimResult(null);
    setSimulating(false);
    setSimLog([]);
  };

  const handleSimulateGame = async (game: Game) => {
    setSimulating(true);
    setSimResult(null);
    setSimLog(["[SYSTEM] INITIALIZING GAME PROTOCOL...", "[SYSTEM] LOADING CORE ENGINE MODULES..."]);

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(500);
    setSimLog((prev) => [...prev, "[LOADER] LOADING GRAPHICS / SHADER BUFFER..."]);
    
    await delay(600);
    setSimLog((prev) => [...prev, "[LOADER] MOUNTING CONTROLS AND AUDIO CHANNELS..."]);
    
    await delay(500);
    setSimLog((prev) => [...prev, "[PLAY] GAME LAUNCHED! SIMULATING ACTION SESSIONS..."]);

    await delay(800);
    setSimLog((prev) => [...prev, "[PLAY] USER COMPLETED 3 SECTIONS ON GRID INTERCEPT."]);

    await delay(600);
    // Generate scores based on game specs
    let generatedScore = 0;
    if (game.id === "g1") {
      generatedScore = Math.floor(Math.random() * 5000) + 5000; // 5k - 10k
    } else if (game.id === "g2") {
      generatedScore = Number((Math.random() * 40 + 60).toFixed(1)); // 60.0 - 100.0
    } else {
      generatedScore = Math.floor(Math.random() * 6000) + 4000; // 4k - 10k
    }

    setSimLog((prev) => [
      ...prev,
      "[SYSTEM] GAME OVER REACHED.",
      `[STATS] FINAL SCORE GENERATED: ${generatedScore}`,
      `[DATABASE] BROADCASTING COMPOSITE HIGH SCORES TO GAMEFORGE BOARD...`
    ]);

    await delay(400);
    setSimResult(generatedScore);
    submitScore(game.id, generatedScore);
    setSimulating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-widest uppercase flex items-center gap-3">
          <Gamepad2 className="w-7 h-7 text-neon-orange" />
          The Arcade Wall
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-2 uppercase tracking-wider">
          Play retro games compiled by club developers and conquer the high scores board.
        </p>
      </div>

      {/* Games list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game) => {
          const userBest = user.highScores[game.id];
          return (
            <div
              key={game.id}
              className="bg-cyber-card border border-cyber-border rounded-lg clip-cyber p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 relative group shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
              {/* Cover Art Box placeholder - Cyber style */}
              <div className={`w-full h-40 bg-gradient-to-br ${getGameGradients(game.id)} rounded border border-zinc-800 flex flex-col justify-between p-4 mb-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
                
                {/* Tech logo badge */}
                <div className="flex justify-between items-start z-10">
                  <span className="font-mono text-[8px] bg-black/80 px-2 py-0.5 rounded border border-zinc-800 text-zinc-500">
                    ID: {game.id.toUpperCase()}
                  </span>
                  {game.playable ? (
                    <span className="font-mono text-[8px] bg-neon-green/10 text-neon-green px-2 py-0.5 rounded border border-neon-green/30 tracking-widest uppercase animate-pulse">
                      PLAYABLE
                    </span>
                  ) : (
                    <span className="font-mono text-[8px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded border border-zinc-800 tracking-widest uppercase">
                      IN DEVELOPMENT
                    </span>
                  )}
                </div>

                {/* Big retro style typography for title */}
                <div className="z-10 text-center">
                  <h3 className="font-display font-black text-2xl md:text-3xl tracking-widest uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-all duration-300">
                    {game.title}
                  </h3>
                </div>

                {/* Cover Footer specs */}
                <div className="flex justify-between items-center z-10 font-mono text-[9px] text-zinc-500">
                  <span>DEV: {game.developer.split(" & ")[0]}</span>
                  <span>{game.releaseYear} {"// PORTAL"}</span>
                </div>
              </div>

              {/* Game Metadata and Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 uppercase">{game.genre}</span>
                  <div className="flex items-center gap-1 font-mono text-xs text-yellow-500">
                    <Star className="w-3.5 h-3.5 fill-yellow-500" />
                    <span>{game.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed min-h-[48px]">
                  {game.description}
                </p>

                {/* Score panel */}
                <div className="flex justify-between items-center p-3 bg-black/50 border border-zinc-900 rounded font-mono text-[10px]">
                  <span className="text-zinc-500">YOUR BEST SCORE:</span>
                  <span className={`font-bold ${userBest ? "text-neon-orange" : "text-zinc-600"}`}>
                    {userBest !== undefined ? userBest : "NO RECORD"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-zinc-900/60 flex justify-end">
                <Button
                  variant={game.playable ? "primary" : "outline"}
                  onClick={() => handleLaunchGame(game)}
                  className="cursor-pointer"
                >
                  {game.playable ? "Launch Arcade" : "Review Details"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Detail Modal overlay */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-cyber-card border border-zinc-800 rounded-lg clip-cyber shadow-[0_0_30px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left side: Cartridge style and Play Simulator */}
            <div className={`w-full md:w-1/2 bg-gradient-to-b ${getGameGradients(selectedGame.id)} p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-zinc-800`}>
              <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <span className="inline-block bg-black/80 px-2 py-0.5 border border-zinc-800 rounded font-mono text-[9px] text-zinc-500 uppercase">
                  {selectedGame.genre}
                </span>
                <h2 className="font-display font-black text-3xl uppercase tracking-widest text-white">
                  {selectedGame.title}
                </h2>
                <div className="font-mono text-[10px] text-zinc-400">
                  <div>BY: {selectedGame.developer}</div>
                  <div>RELEASE: {selectedGame.releaseYear}</div>
                </div>
              </div>

              {/* Simulation Box */}
              <div className="mt-8 bg-black/75 border border-zinc-850 p-4 rounded relative z-10 font-mono text-center min-h-[160px] flex flex-col justify-center">
                {selectedGame.playable ? (
                  !simulating && simResult === null ? (
                    <div className="space-y-4">
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-widest">ARCADE_INTERFACE</span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSimulateGame(selectedGame)}
                        className="w-full cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-black mr-1" /> RUN SIMULATOR
                      </Button>
                    </div>
                  ) : simulating ? (
                    <div className="text-left space-y-1 text-[9px] text-neon-blue h-28 overflow-y-auto">
                      {simLog.map((log, index) => (
                        <div key={index} className="truncate">
                          {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-1.5 text-neon-green text-[10px] uppercase font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SESSION COMPLETE</span>
                      </div>
                      
                      <div>
                        <span className="block text-[8px] text-zinc-500 uppercase">SCORE SUBMITTED</span>
                        <span className="text-2xl font-black text-neon-orange font-mono animate-pulse">
                          {simResult}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLaunchGame(selectedGame)}
                        className="w-full cursor-pointer"
                      >
                        PLAY AGAIN
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="space-y-3">
                    <ShieldAlert className="w-8 h-8 text-zinc-500 mx-auto" />
                    <span className="block text-[9px] text-zinc-500 uppercase">SYSTEMS_OFFLINE</span>
                    <span className="block text-[10px] text-zinc-400 leading-relaxed">
                      Cartridge compiling. Source code commits pending.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Roster / details and high scores */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-2">
                    Description
                  </h3>
                  <p className="text-xs text-zinc-450 leading-relaxed">
                    {selectedGame.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-1.5 font-mono text-[10px] text-zinc-450">
                    {selectedGame.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Cpu className="w-3 h-3 text-neon-blue" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scoreboard List */}
                <div>
                  <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-neon-orange" />
                    Leaderboard
                  </h3>

                  {selectedGame.highScores.length === 0 ? (
                    <div className="text-[10px] font-mono text-zinc-500 uppercase p-2 border border-dashed border-zinc-850 rounded text-center">
                      No session scores recorded.
                    </div>
                  ) : (
                    <div className="border border-zinc-900 rounded bg-black/30 overflow-hidden font-mono text-[10px]">
                      {selectedGame.highScores.map((score, index) => (
                        <div
                          key={index}
                          className={`
                            flex items-center justify-between px-3 py-2 border-b border-zinc-900/60
                            ${score.player === user.nickname ? "bg-neon-orange/5 text-neon-orange font-bold" : "text-zinc-400"}
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-650">#{index + 1}</span>
                            <span className="uppercase">{score.player}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span>{score.score}</span>
                            <span className="text-[8px] text-zinc-600 hidden sm:inline">{score.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
