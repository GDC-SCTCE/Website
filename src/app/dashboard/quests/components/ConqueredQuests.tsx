import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Quest } from "@/types";
import { useInView } from "@/hooks/useInView";
import GDCPlaceholder from "@/components/GDCPlaceholder";
import { QuestRatingStars } from "./QuestRatingStars";
import { QuestDetailsModal } from "./QuestDetailsModal";
import { getPaginatedConqueredQuests } from "@/actions/dataActions";
import { ConqueredQuestSkeleton } from "./ConqueredQuestSkeleton";

interface ConqueredQuestsProps {
  user: any;
  isAdmin: boolean;
  search: string;
  category: string;
}

export function ConqueredQuests({ user, isAdmin, search, category }: ConqueredQuestsProps) {
  const [completedPage, setCompletedPage] = useState(0);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "attended" | "not_attended">("all");
  
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedState, setFetchedState] = useState({
    category,
    attendanceFilter: "all",
    page: 0,
  });
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [attendedCount, setAttendedCount] = useState(0);
  const [notAttendedCount, setNotAttendedCount] = useState(0);

  const COMPLETED_PER_PAGE = 5;

  const { ref: pastRef, inView: pastVisible } = useInView(0.15);

  const handleFilterChange = (filter: "all" | "attended" | "not_attended") => {
    setAttendanceFilter(filter);
    setCompletedPage(0);
  };

  // Debounce the search term to prevent rapid API calls
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCompletedPage(0); // Reset page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset page on category change
  useEffect(() => {
    setCompletedPage(0);
  }, [category]);

  useEffect(() => {
    async function loadQuests() {
      setIsLoading(true);
      try {
        const data = await getPaginatedConqueredQuests(completedPage, COMPLETED_PER_PAGE, attendanceFilter, debouncedSearch, category);
        setQuests(data.quests as any);
        setTotalFilteredCount(data.filteredCount);
        setTotalCount(data.totalCount);
        setAttendedCount(data.attendedCount);
        setNotAttendedCount(data.notAttendedCount);
        setFetchedState({
          category,
          attendanceFilter,
          page: completedPage,
        });
      } catch (err) {
        console.error("Failed to load conquered quests", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuests();
  }, [completedPage, attendanceFilter, debouncedSearch, category]);

  const totalCompletedPages = Math.ceil(totalFilteredCount / COMPLETED_PER_PAGE);

  const showSkeleton = 
    isLoading || 
    search !== debouncedSearch || 
    category !== fetchedState.category || 
    attendanceFilter !== fetchedState.attendanceFilter || 
    completedPage !== fetchedState.page;

  // If we have finished initial load and there are 0 completed quests in the entire system, don't show the section.
  if (!isLoading && totalCount === 0 && attendanceFilter === "all") {
    return null;
  }

  return (
    <div ref={pastRef} className="px-6 md:px-16 mt-16 pb-16 min-h-[400px]">
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
        <div 
          className="mt-8 grid grid-cols-3 gap-2 p-1 bg-[#1C1B1C]/65 border border-[#3A2D25] rounded-lg w-[340px] sm:w-[390px] md:w-[460px] relative backdrop-blur-md transition-all duration-700"
          style={{
            opacity: pastVisible ? 1 : 0,
            transform: pastVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "150ms",
          }}
        >
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
                  ? "calc(33.33% + 2px)"
                  : "calc(66.66% - 0px)",
            }}
          />

          <button
            onClick={() => handleFilterChange("all")}
            className={`relative z-10 font-mono text-[10px] sm:text-[11px] py-2 sm:py-2.5 rounded-md transition-colors duration-200 uppercase tracking-wider ${
              attendanceFilter === "all" ? "text-white font-bold" : "text-[#A78B7C] hover:text-[#E0C0AF]"
            }`}
          >
            All <span className="opacity-75">({totalCount})</span>
          </button>
          <button
            onClick={() => handleFilterChange("attended")}
            className={`relative z-10 font-mono text-[10px] sm:text-[11px] py-2 sm:py-2.5 rounded-md transition-colors duration-200 uppercase tracking-wider ${
              attendanceFilter === "attended" ? "text-white font-bold" : "text-[#A78B7C] hover:text-[#E0C0AF]"
            }`}
          >
            Attended <span className="opacity-75">({attendedCount})</span>
          </button>
          <button
            onClick={() => handleFilterChange("not_attended")}
            className={`relative z-10 font-mono text-[10px] sm:text-[11px] py-2 sm:py-2.5 rounded-md transition-colors duration-200 uppercase tracking-wider ${
              attendanceFilter === "not_attended" ? "text-white font-bold" : "text-[#A78B7C] hover:text-[#E0C0AF]"
            }`}
          >
            Missed <span className="opacity-75">({notAttendedCount})</span>
          </button>
        </div>
      )}

      {/* QUESTS LIST */}
      <div
        key={`${attendanceFilter}-${completedPage}`}
        className="mt-8 transition-all duration-700"
        style={{
          opacity: pastVisible ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        {showSkeleton ? (
          <div className="flex flex-col">
            {[...Array(COMPLETED_PER_PAGE)].map((_, idx) => (
              <ConqueredQuestSkeleton key={idx} />
            ))}
          </div>
        ) : quests.length > 0 ? (
          quests.map((quest, idx) => (
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
        {(quests.length > 0 || isLoading) && <div className="border-b border-[#584235]" />}

        {/* Pagination Controls */}
        {totalCompletedPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-2 pb-8">
            <button 
              onClick={() => setCompletedPage(p => Math.max(0, p - 1))}
              disabled={completedPage === 0 || isLoading}
              className="font-mono font-bold text-[12px] tracking-[1.2px] text-[#FFB68B] disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              &lt; PREV
            </button>
            <span className="font-mono text-[10px] text-[#E0C0AF] tracking-[1.2px]">
              PAGE {completedPage + 1} OF {totalCompletedPages}
            </span>
            <button 
              onClick={() => setCompletedPage(p => Math.min(totalCompletedPages - 1, p + 1))}
              disabled={completedPage === totalCompletedPages - 1 || isLoading}
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
