import React from "react";
import Avatar from "@/components/Avatar";
import { StatBar } from "./StatBar";

export function LeaderCard({
  member,
  delay,
  visible,
  onClick,
}: {
  member: any;
  delay: number;
  visible: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="w-full flex-1 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div 
        onClick={onClick}
        className="w-full h-auto lg:h-[553px] bg-[#1C1B1C] border border-[#201F20] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,122,0,0.15)] hover:border-[#FF7A00] flex flex-col lg:flex-row relative group/card overflow-hidden cursor-pointer"
      >
        
        {/* Left: Photo container */}
        <div className="w-full lg:w-1/2 h-auto lg:h-full relative flex items-center justify-center bg-[#131314]">
          <div className="w-full aspect-square relative">
            {/* Horizontal Divider */}
            <div className="absolute w-full h-[2px] left-0 top-0 bg-gradient-to-r from-[#FF7A00] to-transparent z-20 pointer-events-none" />

            <div className="w-full h-full relative overflow-hidden transition-transform duration-700 group-hover/card:scale-105">
              {member.avatar ? (
                 <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-700" />
              ) : (
                <Avatar name={member.name} size={300} />
              )}
            </div>
          </div>
        </div>

        {/* Right: Info container */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#1C1B1C] to-black p-6 lg:p-10 flex flex-col lg:h-full justify-center relative">

          {/* Party Leader Badge */}
          <div className="flex items-center gap-[8px] mb-[8px]">
            <span className="w-[9.33px] h-[12.25px] bg-[#FDD400] inline-block" />
            <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FDD400]">
              PARTY LEADER
            </span>
          </div>

          {/* Name */}
          <h2 className="font-sora font-bold text-[32px] sm:text-[40px] xl:text-[48px] leading-[1.1] tracking-[-0.96px] uppercase text-[#E5E2E3] m-0 mb-[8px] break-words whitespace-normal">
            {member.name}
          </h2>

          {/* Role */}
          <p className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FF7A00] m-0 mb-[32px]">
            {member.role.toUpperCase()}
          </p>

          {/* Stats */}
          {member.stats && (
            <div className="mb-[20px] w-full max-w-[250px]">
              {member.stats.map((s: any) => (
                <StatBar key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          )}

          {/* Game preview panel */}
          {member.gamePreview && (
            <div className="bg-[#353436]/30 p-[12px] flex gap-[16px] items-center mt-auto h-auto min-h-[87px] box-border w-full">
              {/* Play Button Thumbnail */}
              <div className="w-[80px] h-[48px] bg-[#FF7A00]/10 border border-[#584235] shrink-0 flex items-center justify-center cursor-pointer hover:bg-[#FF7A00]/25 transition-all duration-200 overflow-hidden relative">
                {member.gamePreview.image && member.gamePreview.image.trim() !== "" ? (
                  <img src={member.gamePreview.image} alt={member.gamePreview.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-[10px] text-[#FF7A00] font-bold">
                    ▶ PLAY
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] leading-[15px] text-[#E0C0AF] opacity-60 m-0 mb-[2px]">
                  SIGNATURE GAME
                </p>
                <p className="font-sora font-bold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#FF7A00] m-0 whitespace-normal break-words">
                  {member.gamePreview.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
