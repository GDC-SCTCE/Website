import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Quest } from "@/types";
import { useInView } from "@/hooks/useInView";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { QuestRatingStars } from "./QuestRatingStars";
import { QuestDetailsModal } from "./QuestDetailsModal";

interface ConqueredQuestsProps {
  completedQuests: Quest[];
  isLoading?: boolean;
  user: any;
  isAdmin: boolean;
}

export function ConqueredQuests({ completedQuests, isLoading = false, user, isAdmin }: ConqueredQuestsProps) {
  const [completedPage, setCompletedPage] = useState(0);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "attended" | "not_attended">("all");
  const COMPLETED_PER_PAGE = 5;

  const { ref: pastRef, inView: pastVisible } = useInView(0.15);

  const handleFilterChange = (filter: "all" | "attended" | "not_attended") => {
    setAttendanceFilter(filter);
    setCompletedPage(0);
  };

  const filteredCompletedQuests = completedQuests.filter((quest) => {
    if (attendanceFilter === "all") return true;
    const userReg = quest.registrations && quest.registrations[0];
    if (!userReg) return false;
    if (attendanceFilter === "attended") {
      return userReg.status === "ATTENDED";
    }
    if (attendanceFilter === "not_attended") {
      return userReg.status === "NOT_ATTENDED" || userReg.status === "REGISTERED";
    }
    return true;
  });

  const totalCompletedPages = Math.ceil(filteredCompletedQuests.length / COMPLETED_PER_PAGE);
  const displayedCompletedQuests = filteredCompletedQuests.slice(
    completedPage * COMPLETED_PER_PAGE,
    (completedPage + 1) * COMPLETED_PER_PAGE
  );

  const totalCount = completedQuests.length;
  const attendedCount = completedQuests.filter(
    (q) => q.registrations?.[0]?.status === "ATTENDED"
  ).length;
  const notAttendedCount = completedQuests.filter(
    (q) =>
      q.registrations?.[0]?.status === "NOT_ATTENDED" ||
      q.registrations?.[0]?.status === "REGISTERED"
  ).length;

  return (
    <div ref={pastRef} className="px-6 md:px-16 mt-16 pb-16">
      {/* "Completed" label */}
      <p
        className="font-mono font-bold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2] transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transform: pastVisible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        Completed
      </p>

      {/* QUESTS CONQUERED. */}
      <h2
        className="mt-7 uppercase font-sora font-bold text-[clamp(28px,3.5vw,48px)] leading-[1.1] tracking-[-0.96px] text-[#E5E2E3] transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transform: pastVisible ? "translateY(0)" : "translateY(24px)",
          transitionDelay: "100ms",
        }}
      >
        QUESTS CONQUERED.
      </h2>

      {/* Attendance Filter Tabs */}
      {user && !isAdmin && (
        <div className="mt-8 grid grid-cols-3 gap-2 p-1 bg-[#1C1B1C]/65 border border-[#3A2D25] rounded-lg w-[340px] sm:w-[390px] md:w-[460px] relative backdrop-blur-md">
          {/* Sliding indicator background */}
          <div
            className={`absolute top-1 bottom-1 transition-all duration-300 rounded-md ${
              attendanceFilter === "all"
                ? "bg-[#FF7A00] shadow-[0_0_12px_rgba(255,122,0,0.35)]"
                : attendanceFilter === "attended"
                ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.35)]"
            }`}
            style={{
              width: "calc(33.33% - 8px)",
              left:
                attendanceFilter === "all"
                  ? "4px"
                  : attendanceFilter === "attended"
                  ? "calc(33.33% + 4px)"
                  : "calc(66.66% + 4px)",
            }}
          />

          <button
            onClick={() => handleFilterChange("all")}
            className={`font-mono text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-wider py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer relative z-10 w-full ${
              attendanceFilter === "all"
                ? "text-[#131314] font-extrabold"
                : "text-[#A78B7C] hover:text-white hover:bg-[#201F20]/30"
            }`}
          >
            <span>All</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
              attendanceFilter === "all" ? "bg-black/20 text-[#131314]" : "bg-[#131314] text-[#A78B7C]"
            }`}>{totalCount}</span>
          </button>
          <button
            onClick={() => handleFilterChange("attended")}
            className={`font-mono text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-wider py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer relative z-10 w-full ${
              attendanceFilter === "attended"
                ? "text-[#131314] font-extrabold"
                : "text-[#A78B7C] hover:text-white hover:bg-[#201F20]/30"
            }`}
          >
            <span>Attended</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
              attendanceFilter === "attended" ? "bg-black/20 text-[#131314]" : "bg-[#131314] text-[#A78B7C]"
            }`}>{attendedCount}</span>
          </button>
          <button
            onClick={() => handleFilterChange("not_attended")}
            className={`font-mono text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-wider py-2 rounded-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer relative z-10 w-full ${
              attendanceFilter === "not_attended"
                ? "text-white font-extrabold"
                : "text-[#A78B7C] hover:text-white hover:bg-[#201F20]/30"
            }`}
          >
            <span>Not Attended</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
              attendanceFilter === "not_attended" ? "bg-black/20 text-white" : "bg-[#131314] text-[#A78B7C]"
            }`}>{notAttendedCount}</span>
          </button>
        </div>
      )}

      {/* Past Quests List */}
      <div
        key={`${attendanceFilter}-${completedPage}`}
        className="mt-8 transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        {displayedCompletedQuests.length > 0 ? (
          displayedCompletedQuests.map((quest, idx) => (
            <div
              key={quest.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-[25px] border-t border-[#584235] transition-all duration-300 hover:bg-[#201F20]/30 hover:px-4 group cursor-pointer ${
                pastVisible ? "animate-fade-up" : "opacity-0"
              }`}
              onClick={() => setSelectedQuest(quest)}
              style={{
                animationDelay: `${idx * 60}ms`,
                animationFillMode: "both"
              }}
            >
              {/* Left: thumbnail + info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-7">
                {/* Thumbnail */}
                <div className="relative shrink-0 overflow-hidden w-[96px] h-[64px] bg-[#1C1B1C] transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                  {quest.image ? (
                    <Image
                      src={quest.image}
                      alt={quest.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-all duration-300"
                    />
                  ) : (
                    <GDCPlaceholder textClassName="text-[24px]" />
                  )}
                </div>

                {/* Title + meta */}
                <div>
                  <p className="font-sora font-normal text-[16px] leading-[26px] text-[#E5E2E3] transition-colors duration-200 group-hover:text-[#FFB68B]">
                    {quest.title}
                  </p>
                  <p className="mt-1 font-mono font-normal text-[10px] leading-[15px] text-[#E0C0AF]">
                    {quest.seatsTaken || 0} Attendees
                  </p>
                </div>
              </div>

              {/* Right: View Report link & Ratings */}
              <div className="flex flex-col sm:items-end gap-3 self-start sm:self-auto">
                {/* View Report Link */}
                <a
                  href={quest.recapUrl || "#"}
                  onClick={(e) => {
                    if (quest.recapUrl) {
                      e.stopPropagation();
                    } else {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedQuest(quest);
                    }
                  }}
                  className="flex items-center gap-2 hover:opacity-100 transition-all duration-200 group/report"
                >
                  <span className="font-mono font-semibold text-[12px] leading-[12px] tracking-[1.2px] text-[#FFF3D2] group-hover:text-[#FFB68B] transition-colors duration-200">
                    View Report
                  </span>
                  <ExternalLink className="w-[10.67px] h-[10.67px] text-[#FFF3D2] group-hover:text-[#FFB68B] group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                {/* Star Rating (Only for attended registrations) */}
                {quest.registrations && quest.registrations.some(r => r.status === "ATTENDED") && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <QuestRatingStars 
                      questId={quest.id} 
                      initialRating={quest.ratings && quest.ratings.length > 0 ? quest.ratings[0].rating : undefined} 
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-[40px] border-t border-[#584235] text-center">
            <p className="font-mono text-[12px] text-[#E0C0AF] tracking-[1.2px] uppercase">
              No completed quests found.
            </p>
          </div>
        )}

        {/* Bottom border of last row */}
        {displayedCompletedQuests.length > 0 && <div className="border-b border-[#584235]" />}

        {/* Pagination Controls */}
        {totalCompletedPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-2 pb-8">
            <button 
              onClick={() => setCompletedPage(p => Math.max(0, p - 1))}
              disabled={completedPage === 0}
              className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              &lt; PREV
            </button>
            <span className="font-mono text-[10px] text-[#E0C0AF] tracking-[1.2px]">
              PAGE {completedPage + 1} OF {totalCompletedPages}
            </span>
            <button 
              onClick={() => setCompletedPage(p => Math.min(totalCompletedPages - 1, p + 1))}
              disabled={completedPage === totalCompletedPages - 1}
              className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              NEXT &gt;
            </button>
          </div>
        )}
      </div>

      {selectedQuest && (
        <QuestDetailsModal
          quest={selectedQuest}
          user={user}
          isAdmin={isAdmin}
          onClose={() => setSelectedQuest(null)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}
