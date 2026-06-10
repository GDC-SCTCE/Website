"use client";

import React from "react";
import Link from "next/link";
import { useGameForge } from "@/context/GameForgeContext";
import { Button } from "@/components/ui/Button";
import { Shield, Sparkles, Award, Zap, Package } from "lucide-react";

export default function Inventory() {
  const { user } = useGameForge();

  const guestStats = { tech: 10, design: 10, agility: 10, strength: 10 };
  const completedQuests = user ? user.completedQuests : [];
  const stats = user ? user.stats : guestStats;
  const loadout = user ? user.loadout : "None";

  // Custom visual loadout details
  const getLoadoutGear = (loadout: string) => {
    switch (loadout) {
      case "Developer":
        return {
          itemName: "Mechanical Compile Rig (H-1)",
          itemDesc: "A cybernetic keyboard and debugger node. Increases coding speed and eliminates null pointers.",
          rating: "LEGENDARY ITEM",
          multiplier: "+3 Tech, +1 Agility"
        };
      case "Artist":
        return {
          itemName: "Pressure Voxel Stylus (V-4)",
          itemDesc: "A multi-spectral brush for canvas painting and sprite texture rendering. Translates ideas directly to pixel grids.",
          rating: "EPIC ITEM",
          multiplier: "+3 Design, +1 Strength"
        };
      case "Musician":
        return {
          itemName: "Dual-Oscillator Synthwave Deck",
          itemDesc: "A customized synthesizer and foley capture deck. Loops clean wave signals directly to audio buffers.",
          rating: "RARE ITEM",
          multiplier: "+3 Sound, +1 Tech"
        };
      case "Designer":
        return {
          itemName: "Figma Grid Interceptor",
          itemDesc: "An advanced HUD controller mapping layout variables and user triggers in real-time.",
          rating: "UNCOMMON ITEM",
          multiplier: "+3 Design, +1 Agility"
        };
      default:
        return {
          itemName: "Standard Issue Terminal Deck",
          itemDesc: "A basic terminal casing with command line access. Reliable but standard.",
          rating: "COMMON ITEM",
          multiplier: "+1 All Stats"
        };
    }
  };

  const gear = getLoadoutGear(loadout);



  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-widest uppercase flex items-center gap-3">
          <Shield className="w-7 h-7 text-neon-orange" />
          The Inventory
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-2 uppercase tracking-wider">
          Inspect your gear, track statistics progress, and view unlocked achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Stats and Character Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Base Stats Profile */}
          <div className="bg-cyber-card border border-cyber-border p-6 rounded-lg clip-cyber shadow-lg relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-neon-orange/5 blur-lg rounded-full pointer-events-none" />
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Zap className="w-4.5 h-4.5 text-neon-orange" />
              Attributes Node
            </h2>

            <div className="space-y-5">
              {[
                { key: "tech", label: "Tech Core", color: "bg-neon-blue", val: stats.tech },
                { key: "design", label: "Design Matrix", color: "bg-neon-purple", val: stats.design },
                { key: "agility", label: "Agility Code", color: "bg-neon-orange", val: stats.agility },
                { key: "strength", label: "Endurance Spec", color: "bg-neon-green", val: stats.strength },
              ].map((stat) => {
                // Calculate percentage out of maximum (e.g. 20)
                const percentage = Math.min(100, Math.floor((stat.val / 20) * 100));
                return (
                  <div key={stat.key} className="space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between items-center text-zinc-400">
                      <span className="uppercase text-white tracking-wider font-bold">{stat.label}</span>
                      <span className="text-neon-orange font-bold">{stat.val} PTS</span>
                    </div>
                    <div className="w-full bg-zinc-950 h-2 rounded overflow-hidden border border-zinc-900">
                      <div
                        className={`h-full ${stat.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-900 font-mono text-[9px] text-zinc-550 leading-relaxed">
              <span>COMPILE_LOG // Base stats configure code efficiency and project speed. Completing legendary quests adds attributes.</span>
            </div>
          </div>

          {/* Active Equipment */}
          <div className="bg-cyber-card border border-cyber-border p-6 rounded-lg clip-cyber shadow-lg">
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Package className="w-4.5 h-4.5 text-neon-blue" />
              Active Equipment
            </h2>

            <div className="border border-zinc-850 p-4 bg-black/60 rounded relative overflow-hidden group">
              <div className="absolute top-2 right-2 text-[8px] font-mono text-neon-blue font-bold px-1.5 py-0.5 border border-neon-blue/20 bg-neon-blue/5 uppercase">
                {gear.rating}
              </div>

              <span className="block font-display text-xs font-bold text-white uppercase mb-1.5">
                {gear.itemName}
              </span>
              
              <p className="text-[10px] text-zinc-400 leading-relaxed mb-4">
                {gear.itemDesc}
              </p>

              <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 mt-3 font-mono text-[9px]">
                <span className="text-zinc-650 font-bold uppercase">EQUIP_BUFFS:</span>
                <span className="text-neon-green font-bold">{gear.multiplier}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Badges List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-cyber-card border border-cyber-border p-6 rounded-lg clip-cyber shadow-lg min-h-[480px]">
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-neon-purple" />
              Unlocked Badges ({completedQuests.length})
            </h2>

            {completedQuests.length === 0 ? (
              <div className="h-96 border border-dashed border-zinc-900 bg-black/20 rounded flex flex-col items-center justify-center text-zinc-550 font-mono text-xs uppercase p-6 text-center space-y-3">
                <Shield className="w-10 h-10 text-zinc-800" />
                <span>NO BADGES RETRIEVED</span>
                <p className="text-[10px] text-zinc-600 lowercase max-w-xs leading-relaxed">
                  Badges are awarded automatically upon resolving quests. Access the quest board to begin challenges.
                </p>
                {!user && (
                  <div className="pt-4 font-sans">
                    <Link href="/onboarding">
                      <Button variant="primary" size="sm" className="cursor-pointer">
                        INITIATE PROTOCOL TO UNLOCK
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {completedQuests.map((questId) => {
                  // Resolve badge details directly
                  // Let's resolve the badge name.
                  // Each quest completion maps to `badgeAwarded` in MOCK_QUESTS.
                  // E.g. "q1" maps to "Protocol Initiated".
                  // Let's find the quest definition:
                  let badgeName = "Developer Merit";
                  let category = "General";
                  let description = "Unlocked by resolving related Quest Board challenges.";

                  if (questId === "q1") {
                    badgeName = "Protocol Initiated";
                    category = "General";
                    description = "Successfully bootstrapped your first blank project and environment.";
                  } else if (questId === "q2") {
                    badgeName = "Code Cadet";
                    category = "Coding";
                    description = "Written movement scripts handling character inputs and vectors.";
                  } else if (questId === "q3") {
                    badgeName = "Pixel Pioneer";
                    category = "Graphics";
                    description = "Constructed custom animated spritesheets with transparency grids.";
                  } else if (questId === "q4") {
                    badgeName = "Frequency Wave";
                    category = "Audio";
                    description = "Generated custom laser firing sounds using synthetic waves.";
                  } else if (questId === "q5") {
                    badgeName = "Pathfinder Master";
                    category = "Algorithm";
                    description = "Programmed optimized A* grids handling dynamic obstacle avoidance.";
                  } else if (questId === "q6") {
                    badgeName = "Architect Prime";
                    category = "Design";
                    description = "Grey-boxed arena levels emphasizing engagement heights.";
                  } else if (questId === "q7") {
                    badgeName = "Audio Overlord";
                    category = "Audio";
                    description = "Orchestrated looping synthwave tracks matching exact BPM targets.";
                  }

                  return (
                    <div
                      key={questId}
                      className="bg-black/45 border border-zinc-900 rounded p-4 flex gap-4 hover:border-zinc-800 transition-all duration-200 relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 text-[8px] font-mono text-neon-green font-bold">
                        UNLOCKED
                      </div>

                      <div className="w-10 h-10 rounded border border-neon-green/30 bg-neon-green/5 text-neon-green flex items-center justify-center shrink-0 self-start shadow-[0_0_8px_rgba(57,255,20,0.1)]">
                        <Sparkles className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <span className="block font-display text-xs font-bold text-white uppercase tracking-wider">
                          {badgeName}
                        </span>
                        <span className="block font-mono text-[8.5px] text-zinc-650 uppercase font-bold">
                          CAT: {category}
                        </span>
                        <p className="text-[10px] text-zinc-450 leading-relaxed font-sans mt-1">
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
