import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import { useScreenshotDeterrent } from "@/hooks/useScreenshotDeterrent";

export function MemberCard({
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
  const preventActions = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  const [isBlurred, setIsBlurred] = useState(false);
  useScreenshotDeterrent(setIsBlurred);
  return (
    <div
      className="w-full max-w-[270px] shrink-0 flex transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        onClick={onClick}
        className="w-full max-w-[270px] h-[376px] bg-[#131314] border border-transparent transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.6)] hover:border-[#FF7A00] relative shrink-0 box-border mx-auto group/member cursor-pointer flex flex-col"
      >
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white to-transparent z-10 opacity-50" />

        {/* Photo container */}
        <div className="flex-1 w-full overflow-hidden relative">
          <div className={`no-print ${isBlurred ? 'blur-2xl pointer-events-none' : 'blur-none'} w-full h-full transition-transform duration-700 group-hover/member:scale-105 flex items-center justify-center`}>
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} onContextMenu={preventActions} onDragStart={preventActions} className="w-full h-full object-cover" />
            ) : (
              <Avatar name={member.name} size={150} />
            )}
          </div>
        </div>

        {/* Info strip container */}
        <div className="w-full shrink-0 bg-[#0E0E0F] p-[20px_16px] box-border flex flex-col">
          {/* Name */}
          <h3 className="font-sora font-normal text-[20px] leading-[30px] uppercase text-[#E5E2E3] m-0 whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-200 group-hover/member:text-[#FF7A00]">
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
