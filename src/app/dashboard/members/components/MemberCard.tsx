import React from "react";
import Avatar from "@/components/Avatar";

export function MemberCard({
  member,
  delay,
  visible,
}: {
  member: any;
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className="w-full max-w-[270px] shrink-0 flex transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
        width: "auto",
      }}
    >
      <div className="w-full max-w-[270px] h-[376px] bg-[#1C1B1C] border border-transparent transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.6)] hover:border-[#FF7A00] relative shrink-0 box-border mx-auto group/member">
        {/* Orange gradient top divider */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white to-transparent z-10" />
        {/* Photo container */}
        <div className="w-full h-[300px] relative overflow-hidden">
          <div className="w-full h-full transition-transform duration-700 group-hover/member:scale-105">
            {member.avatarSeed && (member.avatarSeed.startsWith('http') || member.avatarSeed.includes('.')) ? (
                 <img src={member.avatarSeed} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <Avatar name={member.name} size={100} />
            )}
          </div>
        </div>
        {/* Info strip container */}
        <div className="absolute w-full h-[74px] left-0 top-[300px] bg-gradient-to-t from-black to-transparent p-[15px_16px] box-border">
          {/* Name */}
          <h3 className="font-sora font-normal text-[20px] leading-[30px] uppercase text-[#E5E2E3] m-0 white-space-nowrap overflow-hidden text-ellipsis transition-colors duration-200 group-hover/member:text-[#FF7A00]">
            {member.name}
          </h3>
          {/* Role */}
          <p className="font-mono font-bold text-[10px] leading-[15px] tracking-[1px] uppercase text-[#FF7A00] m-0">
            {member.role.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
