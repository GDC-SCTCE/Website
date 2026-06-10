import React from "react";
import Avatar from "@/components/Avatar";
import { StatBar } from "./StatBar";

export function LeaderCard({ member, isFirst }: { member: any; isFirst: boolean }) {
  const cardWidth = isFirst ? "lg:w-[632px]" : "lg:w-[617px]";
  const photoWidth = isFirst ? "lg:w-[316px]" : "lg:w-[308.5px]";
  const photoHeight = isFirst ? "lg:h-[316px]" : "lg:h-[308.5px]";
  const photoTop = isFirst ? "lg:top-[118.5px]" : "lg:top-[122.25px]";
  const infoLeft = isFirst ? "lg:left-[316px]" : "lg:left-[308.5px]";
  const infoWidth = isFirst ? "lg:w-[316px]" : "lg:w-[308.5px]";

  return (
    <div
      className={`w-full ${cardWidth} h-auto lg:h-[553px] bg-[#1C1B1C] border border-[#201F20] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(255,122,0,0.15)] hover:border-[#FF7A00] shrink-0 flex flex-col lg:flex-row relative`}
    >
      {/* Left: Photo container */}
      <div
        className={`w-full ${photoWidth} aspect-square ${photoHeight} lg:absolute lg:left-0 ${photoTop} overflow-hidden`}
      >
        {/* Horizontal Divider */}
        <div
          className="absolute w-full h-[2px] left-0 top-0 bg-gradient-to-r from-[#FF7A00] to-transparent z-10"
        />
        <div className="w-full h-full">
          {member.avatarSeed && (member.avatarSeed.startsWith('http') || member.avatarSeed.includes('.')) ? (
             <img src={member.avatarSeed} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <Avatar name={member.name} size={300} />
          )}
        </div>
      </div>

      {/* Right: Info container */}
      <div
        className={`w-full ${infoWidth} h-auto lg:h-[553px] lg:absolute ${infoLeft} lg:top-0 bg-gradient-to-br from-[#1C1B1C] to-black p-6 lg:p-[81px_32px_32px] flex flex-col`}
      >
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
          <div className="mb-[20px]">
            {member.stats.map((s: any) => (
              <StatBar key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}

        {/* Game preview panel */}
        {member.gamePreview && (
          <div className="bg-[#353436]/30 p-[12px] flex gap-[16px] items-center mt-auto h-[87px] box-border">
            {/* Play Button Thumbnail */}
            <div className="w-[80px] h-[48px] bg-[#FF7A00]/10 border border-[#584235] shrink-0 flex items-center justify-center cursor-pointer hover:bg-[#FF7A00]/25 transition-all duration-200">
              <span className="font-mono text-[10px] text-[#FF7A00] font-bold">
                ▶ PLAY
              </span>
            </div>
            <div>
              <p className="font-mono text-[10px] leading-[15px] text-[#E0C0AF] opacity-60 m-0 mb-[2px]">
                {member.gamePreview.label}
              </p>
              <p className="font-sora font-bold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#FF7A00] m-0">
                {member.gamePreview.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
