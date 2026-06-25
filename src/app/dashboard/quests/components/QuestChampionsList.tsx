import { Trophy, Crown, Medal, Award, Sparkles } from "lucide-react";

export interface WinnerGroup {
  name: string;
  isTeam: boolean;
  points: number;
  members: Array<{
    fullName: string;
    rollNo: string;
    xpLevel: string;
  }>;
}

interface QuestChampionsListProps {
  winners: WinnerGroup[];
  loadingWinners: boolean;
}

export function QuestChampionsList({ winners, loadingWinners }: QuestChampionsListProps) {
  return (
    <div className="bg-[#1C1B1C] h-fit flex flex-col border border-[#FF7A00]/40 p-6 relative overflow-hidden rounded-sm shrink-0">
      {/* Visual accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF7A00] via-[#FFB68B] to-[#FF7A00]" />

      <h3 className="font-sora font-semibold text-[14px] text-[#FFB68B] uppercase tracking-wider mb-5 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-[#FF7A00] animate-pulse" />
        Quest Champions
        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
      </h3>

      {loadingWinners ? (
        <div className="py-8 flex flex-col items-center justify-center gap-2">
          <div className="w-8 h-8 border-2 border-t-[#FF7A00] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          <p className="font-mono text-[10px] text-[#A78B7C] tracking-[1px] uppercase">Retrieving standings...</p>
        </div>
      ) : winners.length > 0 ? (
        <div className="flex flex-col gap-4">
          {/* Scrollable Champions List */}
          <div className="max-h-[420px] overflow-y-auto pr-2 flex flex-col gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#131314] [&::-webkit-scrollbar-thumb]:bg-[#353436] [&::-webkit-scrollbar-thumb]:rounded-full hover:[::-webkit-scrollbar-thumb]:bg-[#584235]">
            {winners.map((winner, index) => {
              let borderStyle = "border-[#3A2D25]";
              let bgStyle = "bg-[#131314]";
              let textStyle = "text-[#E5E2E3]";
              let badgeIcon = null;
              let rankText = "";

              if (index === 0) {
                borderStyle = "border-[#FFD700]/50 shadow-[0_0_12px_rgba(255,215,0,0.1)]";
                bgStyle = "bg-[#1E1C15]";
                textStyle = "text-[#FFF3D2]";
                rankText = "1st Place";
                badgeIcon = <Trophy className="w-5 h-5 text-[#FFD700]" />;
              } else if (index === 1) {
                borderStyle = "border-[#C0C0C0]/40 shadow-[0_0_8px_rgba(192,192,192,0.05)]";
                bgStyle = "bg-[#181819]";
                textStyle = "text-[#E5E2E3]";
                rankText = "2nd Place";
                badgeIcon = <Crown className="w-5 h-5 text-[#C0C0C0]" />;
              } else if (index === 2) {
                borderStyle = "border-[#CD7F32]/30 shadow-[0_0_8px_rgba(205,127,50,0.05)]";
                bgStyle = "bg-[#171513]";
                textStyle = "text-[#E0C0AF]";
                rankText = "3rd Place";
                badgeIcon = <Medal className="w-5 h-5 text-[#CD7F32]" />;
              } else {
                borderStyle = "border-[#3A2D25]";
                bgStyle = "bg-[#131314]";
                textStyle = "text-[#E5E2E3]";
                rankText = `${index + 1}th Place`;
                badgeIcon = <Award className="w-5 h-5 text-[#A78B7C]" />;
              }

              return (
                <div
                  key={index}
                  className={`border ${borderStyle} ${bgStyle} p-4 flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-[#3A2D25]">
                      {badgeIcon}
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-[#A78B7C]">{rankText}</p>
                      <h4 className={`font-sora font-bold text-[15px] ${textStyle} tracking-wide mt-0.5`}>
                        {winner.name}
                      </h4>
                      {winner.isTeam && (
                        <p className="font-mono text-[10px] text-[#A78B7C] mt-1 leading-relaxed">
                          Members: {winner.members.map(m => m.fullName).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] text-[#A78B7C] tracking-[1.2px] uppercase block">SCORE</span>
                    <span className={`font-mono text-[16px] font-extrabold ${index === 0 ? "text-[#FFD700]" : "text-[#FFB68B]"} block mt-0.5`}>
                      {winner.points} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-[#3A2D25] p-5 text-center rounded-sm">
          <p className="font-mono text-[11px] text-[#E0C0AF] leading-relaxed">
            Standings will be finalized and announced shortly. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
}
