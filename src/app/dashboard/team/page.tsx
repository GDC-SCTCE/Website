import React from "react";
import prisma from "@/lib/prisma";
import { Users, Monitor } from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const dynamic = "force-dynamic";

export default async function MeetTheClub() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Color presets for avatar profiles based on roles
  const getRoleColors = (role: string) => {
    if (role.includes("Lead") && !role.includes("Co-Lead")) {
      return {
        border: "border-neon-orange glow-border-orange",
        badge: "bg-neon-orange/10 border-neon-orange/30 text-neon-orange",
        avatar: "from-orange-950/40 via-red-950/20 to-black text-neon-orange"
      };
    } else if (role.includes("Co-Lead")) {
      return {
        border: "border-neon-purple glow-border-purple",
        badge: "bg-neon-purple/10 border-neon-purple/30 text-neon-purple",
        avatar: "from-purple-950/40 via-violet-950/20 to-black text-neon-purple"
      };
    } else {
      return {
        border: "border-neon-blue glow-border-blue",
        badge: "bg-neon-blue/10 border-neon-blue/30 text-neon-blue",
        avatar: "from-cyan-950/40 via-blue-950/20 to-black text-neon-blue"
      };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-widest uppercase flex items-center gap-3">
          <Users className="w-7 h-7 text-neon-orange" />
          Meet The Gang
        </h1>
        <p className="text-xs text-zinc-400 font-mono mt-2 uppercase tracking-wider">
          The developers, designers, and organizers building the collective.
        </p>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => {
          const colors = getRoleColors(member.role);
          return (
            <div
              key={member.id}
              className="bg-cyber-card border border-cyber-border rounded-lg clip-cyber p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.65)] relative overflow-hidden group"
            >
              {/* Scanline overlay for that premium feel */}
              <div className="absolute inset-0 bg-cyber-grid-dots opacity-20 pointer-events-none" />
              
              <div>
                {/* Header profile info */}
                <div className="flex items-center gap-4 mb-5 pb-4 border-b border-zinc-900/60">
                  {/* Styled Avatar Placeholder */}
                  <div className={`w-14 h-14 rounded-full border-2 ${colors.border} flex items-center justify-center bg-gradient-to-br ${colors.avatar} font-display font-black text-lg uppercase shadow-lg group-hover:scale-105 transition-all duration-300`}>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                      {member.name}
                    </h3>
                    <span className={`inline-block mt-1.5 px-2.5 py-0.5 border rounded font-mono text-[8px] uppercase tracking-wider font-bold ${colors.badge}`}>
                      {member.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Subrole & Bio */}
                <div className="space-y-3">
                  <span className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    DEPT: {member.subRole}
                  </span>
                  <p className="text-xs text-zinc-450 leading-relaxed min-h-[54px] font-sans">
                    {member.bio}
                  </p>
                </div>

                {/* Speciality list tags */}
                <div className="mt-5 space-y-1.5">
                  <span className="block font-mono text-[8px] text-zinc-650 font-bold uppercase">Abilities //</span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.speciality.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-black/50 border border-zinc-850 rounded font-mono text-[8px] text-zinc-400 uppercase tracking-wide"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social / contact buttons */}
              <div className="pt-6 mt-6 border-t border-zinc-900/60 flex items-center justify-between text-zinc-550 font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://github.com/${member.avatarSeed}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded hover:bg-zinc-900 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.avatarSeed}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded hover:bg-zinc-900 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                
                <span className="text-[8px] tracking-wider uppercase font-bold text-zinc-650 flex items-center gap-1">
                  <Monitor className="w-2.5 h-2.5" />
                  UNIT_ACTIVE
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
