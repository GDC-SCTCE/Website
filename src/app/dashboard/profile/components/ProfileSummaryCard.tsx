interface ProfileSummaryCardProps {
  fullName: string;
  email: string;
  rollNo: string;
  year: string;
  xpLevel: string;
  score: number;
  mounted: boolean;
}

export default function ProfileSummaryCard({
  fullName,
  email,
  rollNo,
  year,
  xpLevel,
  score,
  mounted
}: ProfileSummaryCardProps) {
  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";
  };

  return (
    <div
      className="bg-[#1C1B1C] border border-[#201F20] relative p-6 md:p-8 flex flex-col items-center clip-cyber transition-all duration-500 delay-100"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {/* Top orange status light line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF7A00] to-transparent z-20" />

      {/* Locked Badge corner indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-[#353436] px-2 py-0.5 font-mono text-[9px] text-[#E0C0AF] opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00DBE9]" />
        ONLINE
      </div>

      {/* Avatar block */}
      <div className="w-[120px] h-[120px] relative flex items-center justify-center mb-6 mt-4 group">
        <span className="font-sora font-extrabold text-[48px] leading-none text-[#FFB68B]/80 tracking-[-2px] select-none glow-orange transition-transform duration-300 group-hover:scale-105">
          {getInitials(fullName)}
        </span>
      </div>

      {/* Text Summary */}
      <div className="text-center w-full border-b border-[#201F20] pb-6 mb-6">
        <h2 className="font-sora font-extrabold text-[22px] leading-snug tracking-[-0.5px] uppercase text-[#E5E2E3] m-0 mb-1">
          {fullName || "RECRUIT"}
        </h2>
        <span className="font-mono text-[11px] text-[#00DBE9] uppercase tracking-[1.5px] font-semibold">
          {xpLevel} DIVISION
        </span>
        <p className="font-mono text-[12px] text-[#E0C0AF] opacity-50 m-0 mt-2 truncate">
          {email}
        </p>
      </div>

      {/* Static Attribute details */}
      <div className="w-full space-y-4">
        <div className="flex justify-between border-b border-[#201F20]/50 pb-2">
          <span className="font-mono text-[10px] tracking-[1px] text-[#584235] uppercase">ROLL ID</span>
          <span className="font-mono text-[11px] text-[#E5E2E3] uppercase">{rollNo || "PENDING"}</span>
        </div>
        <div className="flex justify-between border-b border-[#201F20]/50 pb-2">
          <span className="font-mono text-[10px] tracking-[1px] text-[#584235] uppercase">CLASS YEAR</span>
          <span className="font-mono text-[11px] text-[#E5E2E3] uppercase">{year || "PENDING"}</span>
        </div>
      </div>

      {/* Character Score Card */}
      <div className="w-full mt-8 bg-[#131314] border border-[#FF7A00]/20 p-5 relative overflow-hidden clip-cyber-sm">
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#FF7A00]/10 to-transparent pointer-events-none" />
        <p className="font-mono font-bold text-[10px] tracking-[1.5px] text-[#584235] uppercase mb-2">
          TOTAL HUB SCORE
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-sora font-extrabold text-[36px] leading-none text-[#FF7A00] tracking-tight glow-orange">
            {score ?? 0}
          </span>
          <span className="font-mono text-[10px] text-[#E0C0AF] opacity-50 uppercase tracking-[1px]">
            XP PTS
          </span>
        </div>
      </div>
    </div>
  );
}
