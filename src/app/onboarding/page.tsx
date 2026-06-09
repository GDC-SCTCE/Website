"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameForge } from "@/context/GameForgeContext";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft, Plus, Minus, Terminal, CheckCircle } from "lucide-react";

export default function Onboarding() {
  const { user, login, loading } = useGameForge();
  const router = useRouter();

  // Onboarding steps: 1 = Name, 2 = Loadout, 3 = Stats
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [loadout, setLoadout] = useState<"Developer" | "Artist" | "Musician" | "Designer" | "">("");
  
  // Stats distribution
  const [points, setPoints] = useState(10);
  const [stats, setStats] = useState({
    tech: 10,
    design: 10,
    agility: 10,
    strength: 10,
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard/quests");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center font-mono">
        <div className="text-neon-orange animate-pulse text-sm">CONNECTING TO COMPILER...</div>
      </div>
    );
  }

  const handleNext = () => {
    if (step === 1 && nickname.trim().length < 3) return;
    if (step === 2 && !loadout) return;
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  // Stats operations
  const adjustStat = (stat: keyof typeof stats, amount: number) => {
    if (amount > 0 && points > 0) {
      setStats({ ...stats, [stat]: stats[stat] + 1 });
      setPoints(points - 1);
    } else if (amount < 0 && stats[stat] > 10) {
      setStats({ ...stats, [stat]: stats[stat] - 1 });
      setPoints(points + 1);
    }
  };

  const handleFinalize = () => {
    if (points > 0) return; // Must distribute all points
    login(nickname, loadout, stats);
    router.push("/dashboard/quests");
  };

  return (
    <div className="min-h-screen bg-cyber-dark cyber-grid flex items-center justify-center p-6 relative font-sans">
      <div className="absolute inset-0 bg-cyber-grid-dots opacity-30 pointer-events-none" />
      
      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-neon-orange/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-lg bg-black/80 border border-cyber-border rounded-lg clip-cyber p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] relative z-10 scanlines">
        
        {/* Terminal Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 pb-4 border-b border-zinc-900">
          <Terminal className="w-4 h-4 text-neon-orange" />
          <span>USER_INITIALIZATION_PROTOCOL_EXE // STEP 0{step}</span>
        </div>

        {/* STEP 1: Nickname Input */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                Select Your Handle
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Enter your terminal moniker. This is how you will appear in the high scores board.
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                maxLength={12}
                value={nickname}
                onChange={(e) => setNickname(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                placeholder="NICKNAME_PROMPT"
                className="w-full bg-cyber-dark border border-zinc-800 focus:border-neon-orange px-5 py-4 font-mono text-white text-base rounded uppercase focus:outline-none tracking-widest focus:shadow-[0_0_12px_rgba(255,107,0,0.25)] transition-all duration-300"
              />
              <span className="absolute right-4 top-4 font-mono text-xs text-zinc-600">
                {nickname.length}/12
              </span>
            </div>

            {nickname.trim().length > 0 && nickname.trim().length < 3 && (
              <p className="text-xs text-red-500 font-mono">
                ! MONIKER MUST BE AT LEAST 3 CHARACTERS
              </p>
            )}

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={nickname.trim().length < 3}
              >
                Next Option <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Loadout Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                Choose Your Loadout
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Select your core specialization. This alters your starter inventory badge.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {([
                { id: "Developer", desc: "Engine compiler, mechanics scripter, bug hunter." },
                { id: "Artist", desc: "Pixel painting, asset voxel modeller, layout designer." },
                { id: "Musician", desc: "Synthwave loop engineer, SFX composer." },
                { id: "Designer", desc: "Interactive builder, narrative playtester." },
              ] as const).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLoadout(item.id)}
                  className={`
                    p-5 text-left border rounded transition-all duration-300 relative
                    ${loadout === item.id 
                      ? "bg-neon-orange/10 border-neon-orange shadow-[0_0_15px_rgba(255,107,0,0.2)]" 
                      : "bg-cyber-dark/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-cyber-dark"}
                  `}
                >
                  <span className={`
                    block font-display text-sm font-bold uppercase tracking-wider mb-2
                    ${loadout === item.id ? "text-neon-orange text-shadow-orange" : "text-white"}
                  `}>
                    {item.id}
                  </span>
                  <span className="block text-[10px] text-zinc-500 font-sans leading-relaxed">
                    {item.desc}
                  </span>
                  {loadout === item.id && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-neon-orange" />
                  )}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrev}>
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button variant="primary" onClick={handleNext} disabled={!loadout}>
                Next Option <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Stats Allocation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                Distribute Stats
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Allocate your 10 remaining memory blocks to configure your base abilities.
              </p>
            </div>

            {/* Point Pool indicator */}
            <div className="p-4 bg-cyber-dark border border-zinc-800 rounded flex justify-between items-center font-mono">
              <span className="text-xs text-zinc-500 uppercase">MEMORY_BLOCKS_LEFT</span>
              <span className={`text-xl font-bold ${points > 0 ? "text-neon-blue animate-pulse" : "text-neon-green"}`}>
                {points} PTS
              </span>
            </div>

            <div className="space-y-4">
              {([
                { key: "tech", label: "Tech (Scripting & Engine Math)" },
                { key: "design", label: "Design (Mechanics & Layout)" },
                { key: "agility", label: "Agility (Refactoring Speed)" },
                { key: "strength", label: "Strength (Bug Resilience)" },
              ] as const).map((stat) => {
                const currentVal = stats[stat.key];
                return (
                  <div key={stat.key} className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div className="space-y-0.5">
                      <span className="block text-xs uppercase font-display font-bold text-white tracking-wider">
                        {stat.label.split(" (")[0]}
                      </span>
                      <span className="block text-[9px] font-mono text-zinc-500">
                        {stat.label.split(" (")[1].replace(")", "")}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => adjustStat(stat.key, -1)}
                        disabled={currentVal <= 10}
                        className="w-8 h-8 rounded border border-zinc-800 hover:border-neon-orange flex items-center justify-center text-zinc-400 disabled:opacity-30 disabled:hover:border-zinc-800"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      
                      <span className="font-mono text-base font-bold text-neon-orange w-6 text-center">
                        {currentVal}
                      </span>

                      <button
                        onClick={() => adjustStat(stat.key, 1)}
                        disabled={points === 0}
                        className="w-8 h-8 rounded border border-zinc-800 hover:border-neon-blue flex items-center justify-center text-zinc-400 disabled:opacity-30 disabled:hover:border-zinc-800"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrev}>
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button
                variant={points === 0 ? "green" : "outline"}
                onClick={handleFinalize}
                disabled={points > 0}
                className="w-44"
              >
                {points === 0 ? (
                  <>
                    Finalize Compile <CheckCircle className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  `Distribute ${points} Pts`
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
